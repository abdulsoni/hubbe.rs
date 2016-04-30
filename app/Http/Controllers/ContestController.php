<?php

namespace Fundator\Http\Controllers;

use Fundator\Creator;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Contest;
use Tymon\JWTAuth\Facades\JWTAuth;

use Exception;

class ContestController extends Controller
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
        $contests = Contest::where('visible', 1)->get();

        $i = 0;
        foreach($contests as $contest)
        {
            $i++;
            $contest_data = $contest->getAttributes();
            $contest_data['total_entries'] = $contest->entries->groupBy('creator_id')->count();

            if ($user = JWTAuth::parseToken()->authenticate()) {
                $unmarkedEntries = $this->unmarkedEntries($user->id);
                if (!is_null($unmarkedEntries)) {
                    $contest_data['unmarked_entries'] = $unmarkedEntries;
                }
            }

            $contest_data['num_contestants'] = $contest->num_contestants;
            $contest_data['rank'] = 1;

            unset($contest_data['description']);
            unset($contest_data['rules']);

            $response[] = $contest_data;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
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
        $statusCode = 200;
        $response = [];
        $contest = Contest::where('visible', 1)->where('id', $id)->first();

        $contest_data = [];

        if (!is_null($contest)) {
            $contest_data = $contest->getAttributes();
            $contest_data['total_entries'] = $contest->entries->groupBy('creator_id')->count();

            if ($user = JWTAuth::parseToken()->authenticate()) {
                $unmarkedEntries = $contest->unmarkedEntries($user->id);

                if (!is_null($unmarkedEntries)) {
                    $contest_data['unmarked_entries'] = $unmarkedEntries;
                }
            }

            $contest_data['rating'] = $contest->rating;
            $contest_data['contestants'] = [];
            $contest_data['num_contestants'] = $contest->num_contestants;
            $contest_data['judges'] = $contest->jury;
            $contest_data['rank'] = 1;

            $contestants = $contest->entries->groupBy('creator_id');

            foreach($contestants as $creator_id => $entry){
                $creator_obj = Creator::find($creator_id);

                if (!is_null($creator_obj)) {
                    $creator = $creator_obj->user;

                    $contest_data['contestants'][] = $creator;
                }
            }
        }

        $response = $contest_data;

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
