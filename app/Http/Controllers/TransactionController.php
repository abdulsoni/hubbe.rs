<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\User;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statusCode = 200;
        $response = [];

        try{
            // if (! $user = JWTAuth::parseToken()->authenticate()) {
            //     throw new Exception('User not found', 1);
            // }
            $user = User::find(1);

            $transactions = $user->amountTransactions;
            $response = $transactions;
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function earnings($type)
    {
        $statusCode = 200;
        $response = [];

        try{
            if ($type === 'prize') {
                $response = [
                [
                    "id" => 13,
                    "amount" => 600,
                    "progress" => 0.7,
                    "extras" => [
                        "position" => 2,
                        "completion_date" => '2016-03-20 04:08:56'
                    ]
                ]
            ];
            }else if($type === 'work'){
              $response = [
                [
                    "id" => 13,
                    "amount" => 600,
                    "progress" => 0.7,
                    "extras" => [
                        "initial_date" => '2016-03-20 04:08:56',
                        "initial_amount" => 140,
                        "completion_date" => '2016-03-20 04:08:56',
                        "completion_amount" => 260
                    ]
                ]
            ];
        }else if($type === 'investments'){
            $response = [
                [
                    "id" => 13,
                    "amount" => 600,
                    "progress" => 0.7,
                    "extras" => [
                        "investment" => 180,
                        "roi" => '13% - 30%',
                        "completion_date" => '2016-03-20 04:08:56',
                    ]
                ]
            ];
        }else{
            $response = [];
        }
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
