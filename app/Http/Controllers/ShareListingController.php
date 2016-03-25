<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Fundator\ShareListing;

class ShareListingController extends Controller
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
        $listings = ShareListing::all();

        try{
            foreach($listings as $listing)
            {
                $listing_data = $listing->getAttributes();

                $response[] = $listing_data;
            }
        }catch(Exception $e){
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
    public function primary()
    {
        $statusCode = 200;
        $response = [];
        $primaryListing = ShareListing::where('id', '>', 0)->first();

        try{
            $listing_data = $primaryListing->getAttributes();
            $listing_data['total_amount'] = $primaryListing->shareBids->sum('bid_amount');
            $listing_data['average_amount'] = $primaryListing->shareBids->avg('bid_amount');
            $listing_data['user'] = $primaryListing->user;
            $listing_data['bids'] = $primaryListing->shareBids()->orderBy('bid_amount', 'desc')->with(['user' => function($query){
                $query->addSelect(['id', 'name']);
            }])->get();
            $response = $listing_data;
        }catch(Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
