<?php

namespace Fundator\Http\Controllers;

use Fundator\User;

use Fundator\Review;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Tymon\JWTAuth\Facades\JWTAuth;

use Exception;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $statusCode = 200;
        $response = [];

        try{
            // if (! $user = JWTAuth::parseToken()->authenticate()) {
            //     throw new Exception('User not found', 1);
            // }

            $message = Review::create([
                'rec_user_id'    => $request->rec_user_id,
                'rec_role_id'    => $request->rec_role_id,
                'sender_user_id' => $request->sender_user_id,
                'rate1'         => $request->rate1,
                'rate2'         => $request->rate2,
                'rate3'         => $request->rate3,
                'rate4'         => $request->rate4,
                'comment'       => $request->comment,
            ]);

            $response = ['data' => $message];

        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
