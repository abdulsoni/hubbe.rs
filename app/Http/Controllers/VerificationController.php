<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use GuzzleHttp;
use Illuminate\Support\Facades\Config;
use Tymon\JWTAuth\Facades\JWTAuth;

class VerificationController extends Controller
{
    /**
     * Request Verification Code
     *
     * Requires to be Logged In
     *
     * @return \Illuminate\Http\Response
     */
    public function requestVerificationCode(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
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
        }catch (ClientErrorResponseException $exception) {
            $statusCode = 400;
            $response = ['error' => $exception->getResponse()->getBody(true)];
        }catch(Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Request Verification Code

     * Requires to be Logged In
     *
     * @return \Illuminate\Http\Response
     */
    public function processVerificationCode(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            $client = new GuzzleHttp\Client();

            $params = [
                'api_key' => Config::get('app.authy_api_key'),
                'country_code' => $request->country_code,
                'phone_number' => $request->phone_number,
                'verification_code' => $request->verification_code
            ];

            $api_endpoint = 'https://api.authy.com/protected/json/phones/verification/check?api_key=' . Config::get('app.authy_api_key') . '&country_code=' . $request->country_code . '&phone_number=' . $request->phone_number . '&verification_code=' . $request->verification_code;

            $authy_response = $client->get($api_endpoint);

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $user->phone_verified = true;
            $user->contact_number = $request->phone_number;
            $user->contact_number_country_code = $request->country_code;
            $user->save();

            $response = ['success' => true, 'data' => json_decode($authy_response->getBody(), true)]
        }catch (ClientErrorResponseException $exception) {
            // $statusCode = 400;
            // $response = ['error' => $exception->getResponse()->getBody(true)];
            $response = ['success' => true]
        }catch(Exception $e){
            // $statusCode = 400;
            // $response = ['error' => $e->getMessage()];
            $response = ['success' => true]
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
