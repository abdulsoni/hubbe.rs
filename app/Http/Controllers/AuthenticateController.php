<?php

namespace Fundator\Http\Controllers;

use Fundator\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Fundator\Http\Controllers\Controller;
use Fundator\User;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthenticateController extends Controller
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    /**
     * Retrieve all the users in the database and return them
     *
     * @return \Fundator\User
     */
    public function index()
    {
        $users = User::all();
        return $users;
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

            $response = [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
                'needs_reset' => $user->needs_reset
            ];

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
            $response['error'] = $e->errorInfo;
        }finally{
            return new Response($response, $statusCode);
        }
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

            if($user->role === 'student'){
                $userData['name'] = $user->student->name;
            }

            $token = JWTAuth::fromUser($user, $userData);
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
}
