<?php

namespace Fundator\Http\Controllers;

use Fenos\Notifynder\Models\Notification;
use Fundator\Events\Signup;
use Fundator\Exceptions\InvalidConfirmationCodeException;
use Fundator\Http\Requests;
use Fundator\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Fundator\Http\Controllers\Controller;
use Fundator\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Event;
use GuzzleHttp;

class AuthenticateController extends Controller
{

    public function __construct()
    {
        // Token Based Access
        $this->middleware('jwt.auth', ['except' => ['index', 'authenticate', 'signup', 'confirm', 'linkedin', 'facebook', 'google']]);
    }

    /**
     * Retrieve all the users in the database and return them
     *
     * @return \Fundator\User
     */
    public function index()
    {
        $users = User::all();
        $allUsers = [];

        foreach($users as $user){
            $roles = $user->roles;
            $userRoles = [];

            foreach($roles as $role){
                $userRoles[$role->name] = $role->id;
            }

            $user['user_roles'] = $userRoles;

            unset($user->roles);

            $allUsers[] = $user;
        }

        return $allUsers;
    }

    /**
     * Show a single user
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getUser()
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $response = $user->getAttributes();
            unset($response['password']);
            unset($response['remember_token']);

            $response['judging'] = $user->judging;

            $roles = $user->roles;
            $userRoles = [];

            foreach($roles as $role){
                $userRoles[] = ['role' => $role->name, 'name' => $role->display_name, 'id' => $role->id];
            }

            $response['user_roles'] = $userRoles;


            $notifications = $user->getNotifications();
            foreach($notifications as $notification){
                unset($notification['from']);
            }
            $response['notifications'] = $notifications;

            if(!is_null($user->thumbnail)){
                $response['thumbnail'] = $user->thumbnail->getUrl();
            }

        } catch (TokenExpiredException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_expired';
        } catch (TokenInvalidException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_invalid';
        } catch (JWTException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_absent';
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

            $user = User::where('email', $credentials['email'])->first();

            if (! $user->confirmed) {
                return response()->json(['success' => false, 'message' => 'Email not verified'], 401);
            }

            $userData = [
                'role' => $user->role,
                'email' => $user->email
            ];

            $token = JWTAuth::fromUser($user, $userData);
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    /**
     * Create Email and Password Account.
     *
     * @param Request $request
     * @return mixed
     */
    public function signup(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->messages()], 400);
            }

            Log::info($request->name);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email
            ]);

            $user->password = bcrypt($request->password);
            $user->confirmation_code = str_random(30);
            $user->save();

            Event::fire(new Signup($user));

            $response = ['success' => true, 'message' => 'Please confirm your email address'];
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Confirm the user's email address
     *
     * @param Request $request
     * @return mixed
     */
    public function confirm(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            $confirmation_code = $request->only('confirmation_code');

            if( ! $confirmation_code) {
                throw new InvalidConfirmationCodeException;
            }

            $user = User::where('confirmation_code', $confirmation_code)->first();

            if ( ! $user) {
                throw new InvalidConfirmationCodeException;
            }

            $user->confirmed = 1;
            $user->confirmation_code = null;
            $user->save();

            $response = ['success' => true, 'token' => $user->getToken()];
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Login with Facebook.
     */
    public function facebook(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => Config::get('app.facebook_secret')
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,link,name';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $user = User::where('facebook', '=', $profile['id']);

            if ($user->first())
            {
                return response()->json(['message' => 'There is already a Facebook account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->facebook = $profile['id'];
            $user->email = $user->email ?: $profile['email'];
            $user->name = $user->name ?: $profile['name'];
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $users = User::where('facebook', '=', $profile['id']);
            $user = $users->first();

            if ($user)
            {
                return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
            }

            $user = new User;
            $user->facebook = $profile['id'];
            $user->name = $profile['name'];
            $user->confirmed = 1;
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
    }

    /**
     * Login with Google.
     */
    public function google(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.google_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://accounts.google.com/o/oauth2/token', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://www.googleapis.com/plus/v1/people/me/openIdConnect', [
            'headers' => array('Authorization' => 'Bearer ' . $accessToken['access_token'])
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $user = User::where('google', '=', $profile['sub']);

            if ($user->first())
            {
                return response()->json(['message' => 'There is already a Google account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->google = $profile['sub'];
            $user->name = $user->name ?: $profile['name'];
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $users = User::where('google', '=', $profile['sub']);
            $user = $users->first();

            if ($user)
            {
                return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
            }

            $user = new User;
            $user->google = $profile['sub'];
            $user->name = $profile['name'];
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
    }

    /**
     * Login with LinkedIn.
     */
    public function linkedin(Request $request)
    {
        $client = new GuzzleHttp\Client();
        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.linkedin_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://www.linkedin.com/uas/oauth2/accessToken', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);
        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)', [
            'query' => [
                'oauth2_access_token' => $accessToken['access_token'],
                'format' => 'json'
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);
        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $user = User::where('linkedin', '=', $profile['id']);
            if ($user->first())
            {
                return response()->json(['message' => 'There is already a LinkedIn account that belongs to you'], 409);
            }
            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = JWTAuth::getPayload($token);
            $user = User::find($payload['sub']);
            $user->linkedin = $profile['id'];
            $user->name = $user->name ?: $profile['firstName'] . ' ' . $profile['lastName'];
            $user->email = $profile['emailAddress'];
            $user->save();
            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $users = User::where('linkedin', '=', $profile['id']);
            $user = $users->first();

            if ($user)
            {
                return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
            }

            $user = new User;
            $user->linkedin = $profile['id'];
            $user->name =  $profile['firstName'] . ' ' . $profile['lastName'];
            $user->email = $profile['emailAddress'];
            $user->confirmed = 1;
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
    }
}
