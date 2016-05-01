<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Fundator\User;
use Fundator\ShareListing;
use Fundator\ShareBid;
use Tymon\JWTAuth\Facades\JWTAuth;

class ShareBidController extends Controller
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
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $shareListing = ShareListing::find($request->share_listing_id);
            $shareBid = ShareBid::where('share_listing_id', $request->share_listing_id)->where('bid_amount', $request->bid_amount)->first();

            if (!is_null($shareBid)) {
                $shareBid->num_shares = $shareBid->num_shares + $request->num_shares;
            }else{
                $shareBid = ShareBid::create([
                    'num_shares' => $request->num_shares,
                    'bid_amount' => $request->bid_amount
                ]);

                $shareBid->user()->associate($user);
                $shareBid->shareListing()->associate($shareListing);
            }

            if ($shareBid->save()) {
                $response = $shareBid;
            }else{
                throw new Exception('Bid can not be placed', 1);
            }
        }catch(Exception $e){
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
