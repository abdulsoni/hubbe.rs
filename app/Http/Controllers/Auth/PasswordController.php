<?php

namespace Fundator\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Fundator\Http\Controllers\Controller;
use Fundator\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Config;
use Tymon\JWTAuth\Facades\JWTAuth;
use GuzzleHttp;
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
            $via = 'email';

            if (isset($request->via)) {
                $via = $request->via;
            }

            switch ($via) {
                case 'sms':
                    $findUser = User::where('contact_number', $request->phone_number)->where('contact_number_country_code', $request->country_code)->count();

                    if($findUser > 0){
                        $client = new GuzzleHttp\Client();

                        $params = [
                            'api_key' => Config::get('app.authy_api_key'),
                            'via' => $request->via,
                            'country_code' => $request->country_code,
                            'phone_number' => $request->phone_number,
                            'locale' => $request->locale
                        ];

                        $api_endpoint = 'https://api.authy.com/protected/json/phones/verification/start';

                        $authy_response = $client->request('POST', $api_endpoint, [
                            'form_params' => $params
                        ]);

                        $response = json_decode($authy_response->getBody(), true);
                    }else{
                        throw new Exception('Invalid User', 1);
                    }
                    break;

                default:
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
                        throw new Exception('Invalid User', 1);
                    }
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = ['success' => false, 'message' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    public function appRecoverPasswordVerify(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try {
            $client = new GuzzleHttp\Client();

            $params = [
                'api_key' => Config::get('app.authy_api_key'),
                'country_code' => $request->country_code,
                'phone_number' => $request->phone_number,
                'verification_code' => $request->verification_code
            ];

            $api_endpoint = 'https://api.authy.com/protected/json/phones/verification/check?api_key=' . Config::get('app.authy_api_key') . '&country_code=' . $request->country_code . '&phone_number=' . $request->phone_number . '&verification_code=' . $request->verification_code;

            $authy_response = $client->get($api_endpoint);
            $response = json_decode($authy_response->getBody(), true);

            $user = User::where('contact_number_country_code', $request->country_code)->where('contact_number', $request->phone_number)->first();

            if (!is_null($user)) {
                $response['token'] = $user->getToken();
            }else{
                throw new Exception('Invalid User', 1);
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
