<?php

namespace Fundator\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Fundator\Http\Controllers\Controller;
use Fundator\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class PasswordController extends Controller
{
    /*
    |--------------------a------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    public function __construct()
    {
        // $this->middleware('guest');
    }

    public function appRecoverPasswordSend(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            $findUser = User::where('email', $request->only('email'))->count();

            if($findUser > 0){
                $response = Password::sendResetLink($request->only('email'), function (Message $message) {
                    $message->subject($this->getEmailSubject());
                });

                switch ($response) {
                    case Password::RESET_LINK_SENT:
                        $response = ['success' => true];
                        break;
                    case Password::INVALID_USER:
                        $statusCode = 400;
                        $response['error'] = 'Invalid User';
                        break;
                }
            }else{
                $statusCode = 400;
                $response['error'] = 'Invalid User';
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    public function appRecoverPasswordProcess(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            $this->validate($request, [
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            $credentials = $request->only(
                'token', 'email', 'password', 'password_confirmation'
            );

            $resetPasswordResponse = Password::reset($credentials, function ($user, $password) {
                $this->appResetPassword($user, $password, false);
            });

            switch ($resetPasswordResponse) {
                case Password::PASSWORD_RESET:
                    $user = User::where('email', $request->only('email'))->first();

                    $userData = [
                        'role' => $user->role,
                        'email' => $user->email,
                        'needs_reset' => $user->needs_reset
                    ];

                    $token = JWTAuth::fromUser($user, $userData);

                    $response = ['token' => $token];
                    break;
                default:
                    $statusCode = 400;
                    $response['error'] = 'user_not_updated';
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

    public function appReset(Request $request)
    {
        $statusCode = 200;
        $response = [];

        $credentials = $request->only(
            'token', 'email', 'password'
        );

        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $resetPassword = $this->appResetPassword($user, $credentials['password'], true);

            if($resetPassword){
                $userData = [
                    'role' => $user->role,
                    'email' => $user->email,
                    'needs_reset' => $user->needs_reset
                ];

                $token = JWTAuth::fromUser($user, $userData);

                $response = ['token' => $token];
            }else{
                $response['error'] = 'user_not_updated';
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

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Contracts\Auth\CanResetPassword  $user
     * @param  string  $password
     * @return boolean
     */
    protected function appResetPassword($user, $password, $need_reset)
    {
        $user->password = bcrypt($password);
        $user->needs_reset = 0;

        return $user->save();
    }
}
