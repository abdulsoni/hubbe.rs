<?php

namespace Fundator\Http\Controllers;

use Fundator\Creator;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Contest;
use Fundator\Entry;
use Fundator\EntryRating;
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

            $unmarkedEntries = $contest->unmarkedEntries();

            if (!is_null($unmarkedEntries)) {
                $contest_data['unmarked_entries'] = $unmarkedEntries;
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

            $unmarkedEntries = $contest->unmarkedEntries();

            if (!is_null($unmarkedEntries)) {
                $contest_data['unmarked_entries'] = $unmarkedEntries;
            }

            $contest_data['rating'] = $contest->rating;
            $contest_data['contestants'] = [];
            $contest_data['num_contestants'] = $contest->num_contestants;
            $contest_data['judges'] = $contest->jury;

            $entries = Entry::WHERE('contest_id',$id)->groupBy('creator_id')->orderBy('created_at', 'desc')->get();
            foreach($entries as $entry){
                $enryrating = EntryRating::WHERE('entry_id',$entry->id)->orderBy('created_at', 'desc')->first();
                $average = ($enryrating->design+$enryrating->creativity+$enryrating->industrial+$enryrating->market)/4;
                // $rank[$entry->creator_id] = $average;
            }

            // $r = 1;
            // foreach ($rank as $key => $value) {
            //     $newrank[$key] = $r;
            //     $r++;
            // }

            $contestants = $contest->contestants;
            foreach($contestants as $contestant){

                $creator = $contestant->user;

                // if(isset($newrank[$contestant->user->id])){
                //     $creator['rank'] = $newrank[$contestant->user->id];

                // }else{ $creator['rank'] = 0; }

                $contest_data['contestants'][] = $creator;
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
