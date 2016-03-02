<?php

namespace Fundator\Http\Controllers;

use Fundator\Creator;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Contest;

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

            // Calculated rank
            $contest_data['rank'] = $i;

            $response[] = $contest_data;
        }

        return new Response($response, $statusCode);
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
            // $contest_data['entries'] = $contest->entries;
            $contest_data['rating'] = $contest->rating;
            $contest_data['contestants'] = [];
            $contest_data['judges'] = $contest->jury;

            $contestants = $contest->entries->groupBy('creator_id');

            foreach($contestants as $creator_id => $entry){
                $creator_obj = Creator::find($creator_id);

                if (!is_null($creator_obj)) {
                    $creator = $creator_obj->user;

                    if(!is_null($creator) && !is_null($creator->thumbnail)){
                        $creator['thumbnail'] = $creator->thumbnail->getUrl();
                    }

                    $contest_data['contestants'][] = $creator;
                }
            }
        }


//        $entries = $contest->entries;
//        $existingJudges = [];

//        foreach($entries as $entry){
//            $judges = $entry->ratings->groupBy('judge_id');
//
//            foreach($judges as $judge_id => $rating){
//                if(!in_array($judge_id, $existingJudges)){
//                    $judge = User::find($judge_id);
//
//                    if(!is_null($judge->thumbnail)){
//                        $judge['thumbnail'] = $judge->thumbnail->getUrl();
//                    }
//
//                    $contest_data['judges'][] = $judge;
//                    $existingJudges[] = $judge_id;
//                }
//            }
//        }

        $response = $contest_data;

        return new Response($response, $statusCode);
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
