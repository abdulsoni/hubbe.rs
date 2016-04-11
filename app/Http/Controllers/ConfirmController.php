<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Tymon\JWTAuth\Facades\JWTAuth;

class ConfirmController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $confirmation = Confirm::find($id);

            $response = $confirmation;
        }catch(Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $confirmation = Confirm::find($id);

            if ($confirmation->receiver->id === $user->id) {
                $confirmation->confirm_status === 1;
                $confirmation->confirm_time === date('Y-m-d H:i:s');

                if ($shareBid->save()) {
                    $response = $confirmation;
                }else{
                    throw new Exception('Confirmation can not be performed', 1);
                }
            }else{
                throw new Exception('Not Allowed', 1);
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
