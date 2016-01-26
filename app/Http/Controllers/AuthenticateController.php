<?php

namespace Fundator\Http\Controllers;

use Fundator\Http\Requests;
use Fundator\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Fundator\Http\Controllers\Controller;
use Fundator\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

use GuzzleHttp;

class AuthenticateController extends Controller
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index', 'authenticate', 'linkedin']]);
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
                $userRoles[] = ['role' => $role->name, 'id' => $role->id];
            }

            $response['user_roles'] = $userRoles;

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

        return new Response($response, $statusCode);
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
     */
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'displayName' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }
        $user = new User;
        $user->name = $request->input('displayName');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return response()->json(['token' => $this->createToken($user)]);
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
            $user->name = $user->displayName ?: $profile['firstName'] . ' ' . $profile['lastName'];
            $user->email = $profile['emailAddress'];
            $user->save();
            return response()->json(['token' => $this->createToken($user)]);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $user = User::where('linkedin', '=', $profile['id']);
            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }
            $user = new User;
            $user->linkedin = $profile['id'];
            $user->name =  $profile['firstName'] . ' ' . $profile['lastName'];
            $user->email = $profile['emailAddress'];
            $user->save();
            return response()->json(['token' => $this->createToken($user)]);
        }
    }

    protected function createToken($user)
    {
        $userData = [
            'role' => $user->role,
            'email' => $user->email,
            'registered' => $user->registered,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];

        return JWTAuth::fromUser($user, $userData);
    }
}
