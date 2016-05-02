<?php

namespace Fundator\Http\Controllers;

use Fenos\Notifynder\Models\Notification;
use Fundator\Events\Signup;
use Fundator\Exceptions\InvalidConfirmationCodeException;
use Fundator\Http\Requests;
use Fundator\Role;
use Fundator\LinkedinProfile;
use Fundator\FacebookProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Fundator\Http\Controllers\Controller;
use Fundator\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
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
                'role_id' => $user->getRoleId($user->role),
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
     * Unlink Facebook
     */
    public function unlinkFacebook(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $facebookProfile = FacebookProfile::where('user_id', $user->id)->first();

            if (!is_null($facebookProfile)) {
                $facebookProfile->delete();
            }

            $user->facebook = null;
            $response = $user->save();
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Unlink Linkedin
     */
    public function unlinkLinkedin() {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $linkedinProfile = LinkedinProfile::where('user_id', $user->id)->first();
            if (!is_null($linkedinProfile)) {
                $linkedinProfile->delete();
            }

            $user->linkedin = null;
            $response = $user->save();
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
            'client_id' => Config::get('app.facebook_id'),
            // 'redirect_uri' => $request->input('redirectUri'),
            'redirect_uri' => 'http://desk.fundator.co/api/v1/authenticate/facebook',
            'client_secret' => Config::get('app.facebook_secret')
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,picture.type(large),link,bio,website,birthday,currency,gender,work';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);
        // var_dump($profile);
        // die();
        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $facebookProfile = FacebookProfile::where('facebook_id', $profile['id'])->first();

            if (!is_null($facebookProfile))
            {
                $facebookProfile->facebook_token = $accessToken['access_token'];
                $facebookProfile->save();
                return response()->json(['message' => 'There is already a Facebook account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = JWTAuth::getPayload($token);
            $user = User::find($payload['sub']);

            // Save Facebook Details
            $facebookProfile = FacebookProfile::create([
                'thumbnail_url' => isset($profile['picture']['data']['url']) ? $profile['picture']['data']['url'] : null,
                'first_name' => $profile['first_name'],
                'last_name' => $profile['last_name'],
                'email' => $profile['email'],
                'profile_url' => isset($profile['profile_url']) ? $profile['profile_url'] : '',
                'website' => isset($profile['website']) ? $profile['website'] : '',
                'birthday' => isset($profile['birthday']) ? $profile['birthday'] : '',
                'currency' => isset($profile['currency']['user_currency']) ? $profile['currency']['user_currency'] : '',
                'gender' => isset($profile['gender']) ? $profile['gender'] : '',
                'summary' => isset($profile['about']) ? $profile['about'] : '',
                'bio' => isset($profile['bio']) ? $profile['bio'] : '',
            ]);

            $facebookProfile->facebook_id = $profile['id'];
            $facebookProfile->facebook_token = $accessToken['access_token'];
            $facebookProfile->user()->associate($user);
            $facebookProfile->save();

            $user->facebook = $profile['id'];
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $facebookProfile = FacebookProfile::where('facebook_id', $profile['id'])->first();

            if (!is_null($facebookProfile))
            {
                $user = User::find($facebookProfile->user_id);
                $facebookProfile->facebook_token = $accessToken['access_token'];
                $facebookProfile->save();
                return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
            }

            $user = User::where('email', $profile['email'])->first();

            if (is_null($user)) {
                $user = new User;
                $user->name =  $profile['first_name'] . ' ' . $profile['last_name'];
                $user->email = $profile['email'];
                $user->position = '';
                $user->confirmed = 1;
                $user->facebook = $profile['id'];
                $user->save();
            }

            $facebookProfile = FacebookProfile::create([
                'thumbnail_url' => isset($profile['picture']['data']['url']) ? $profile['picture']['data']['url'] : null,
                'first_name' => $profile['first_name'],
                'last_name' => $profile['last_name'],
                'email' => $profile['email'],
                'profile_url' => isset($profile['profile_url']) ? $profile['profile_url'] : '',
                'website' => isset($profile['website']) ? $profile['website'] : '',
                'birthday' => isset($profile['birthday']) ? $profile['birthday'] : '',
                'currency' => isset($profile['currency']['user_currency']) ? $profile['currency']['user_currency'] : '',
                'gender' => isset($profile['gender']) ? $profile['gender'] : '',
                'summary' => isset($profile['about']) ? $profile['about'] : '',
                'bio' => isset($profile['bio']) ? $profile['bio'] : '',
            ]);

            $facebookProfile->facebook_id = $profile['id'];
            $facebookProfile->facebook_token = $accessToken['access_token'];
            $facebookProfile->user()->associate($user);
            $facebookProfile->save();

            $user->facebook = $profile['id'];
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
            $payload = JWTAuth::getPayload($token);
            $user = User::find($payload['sub']);

            $user->google = $profile['sub'];
            $user->name = $user->name ? $user->name : $profile['given_name'];
            $user->last_name = $user->last_name ? $user->last_name : $profile['family_name'];
            $user->email = $profile['email'];
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
            $user->name = $profile['given_name'];
            $user->last_name = $profile['family_name'];
            $user->email = $profile['email'];
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
            'client_id' => Config::get('app.linkedin_id'),
            'client_secret' => Config::get('app.linkedin_secret'),
            // 'redirect_uri' => $request->input('redirectUri'),
            'redirect_uri' => 'http://desk.fundator.co/api/v1/authenticate/linkedin',
            'grant_type' => 'authorization_code',
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://www.linkedin.com/uas/oauth2/accessToken', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);
        // Step 2. Retrieve profile information about the current user.
        // $profileResponse = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)', [
        $profileResponse = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,picture-url,industry,formatted-name,headline,location,summary,specialties,positions,public-profile-url,email-address)', [
            'query' => [
                'oauth2_access_token' => $accessToken['access_token'],
                'format' => 'json'
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $linkedinProfile = LinkedinProfile::where('linkedin_id', $profile['id'])->first();

            if (!is_null($linkedinProfile))
            {
                $linkedinProfile->linkedin_token = $accessToken['access_token'];
                $linkedinProfile->save();
                $user = User::find($linkedinProfile->user_id);
                return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = JWTAuth::getPayload($token);
            $user = User::find($payload['sub']);

            // Save Linkedin Details
            $linkedinProfile = LinkedinProfile::create([
                'thumbnail_url' => isset($profile['pictureUrl']) ? $profile['pictureUrl'] : null,
                'first_name' => $profile['firstName'],
                'last_name' => $profile['lastName'],
                'email' => $profile['emailAddress'],
                'position' => isset($profile['headline']) ? $profile['headline'] : '',
                'industry' => isset($profile['industry']) ? $profile['industry'] : '',
                'country' => isset($profile['location']['country']['code']) ? $profile['location']['country']['code'] : '',
                'city' => isset($profile['location']['name']) ? $profile['location']['name'] : '',
                'summary' => isset($profile['summary']) ? $profile['summary'] : '',
                'specialties' => isset($profile['specialties']) ? $profile['specialties'] : '',
                'profile_url' => $profile['publicProfileUrl']
            ]);

            $linkedinProfile->linkedin_id = $profile['id'];
            $linkedinProfile->linkedin_token = $accessToken['access_token'];
            $linkedinProfile->user()->associate($user);
            $linkedinProfile->save();

            $user->linkedin = $profile['id'];
            $user->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $linkedinProfile = LinkedinProfile::where('linkedin_id', $profile['id'])->first();

            if (!is_null($linkedinProfile))
            {
                $user = User::find($linkedinProfile->user_id);
                $linkedinProfile->linkedin_token = $accessToken['access_token'];
                $linkedinProfile->save();
                return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
            }

            $user = User::where('email', $profile['emailAddress'])->first();

            if (is_null($user)) {
                $user = new User;
                $user->name =  $profile['firstName'] . ' ' . $profile['lastName'];
                $user->email = $profile['emailAddress'];
                $user->position = isset($profile['headline']) ? $profile['headline'] : '';
                $user->confirmed = 1;
                $user->linkedin = $profile['id'];
                $user->save();
            }

            // Save Linkedin Details
            $linkedinProfile = LinkedinProfile::create([
                'thumbnail_url' => isset($profile['pictureUrl']) ? $profile['pictureUrl'] : null,
                'first_name' => $profile['firstName'],
                'last_name' => $profile['lastName'],
                'email' => $profile['emailAddress'],
                'position' => isset($profile['headline']) ? $profile['headline'] : '',
                'industry' => isset($profile['industry']) ? $profile['industry'] : '',
                'country' => isset($profile['location']['country']['code']) ? $profile['location']['country']['code'] : '',
                'city' => isset($profile['location']['name']) ? $profile['location']['name'] : '',
                'summary' => isset($profile['summary']) ? $profile['summary'] : '',
                'specialties' => isset($profile['specialties']) ? $profile['specialties'] : '',
                'profile_url' => $profile['publicProfileUrl']
            ]);

            $linkedinProfile->linkedin_id = $profile['id'];
            $linkedinProfile->linkedin_token = $accessToken['access_token'];
            $linkedinProfile->user()->associate($user);
            $linkedinProfile->save();

            return response()->json(['token' => $user->getToken()], 200, [], JSON_NUMERIC_CHECK);
        }
    }
}
