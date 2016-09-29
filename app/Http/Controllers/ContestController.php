<?php

namespace Fundator\Http\Controllers;

use Fundator\Creator;
use Fundator\Follow;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Contest;
use Fundator\Entry;
use Fundator\EntryRating;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use GetStream\StreamLaravel\Facades\FeedManager;
use GetStream\StreamLaravel\Enrich;

class ContestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $filters = $request->filters;
        $type = $request->type=='' ? 'product_categories' : $request->type;
        $statusCode = 200;
        $response = [];
        if($type=='product_categories'){
            $contests = Contest::join('contest_product_categories as cpc','cpc.contest_id','=','contests.id')
                ->join('product_categories as pc','cpc.product_category','=','pc.id')
                ->where(function($query) use ($filters){
                    if(count($filters)>0){
                        $query->whereIn('cpc.product_category',$filters);
                    }
                })
                ->where('contests.visible', 1)
                ->select('contests.*')
                ->get();
        }
        else if($type=='innovation_categories'){
            $contests = Contest::join('contest_innovation_categories as cnc','cnc.contest_id','=','contests.id')
                ->join('innovation_categories as ic','cnc.innovation_category','=','ic.id')
                ->where(function($query) use ($filters){
                    if(count($filters)>0){
                        $query->whereIn('cnc.innovation_category',$filters);
                    }
                })
                ->where('contests.visible', 1)
                ->select('contests.*')
                ->get();
        }
        $i = 0;
        foreach($contests as $contest){
            $i++;
            $contest_data = $contest->getAttributes();
            $contest_data['total_entries'] = $contest->entries->groupBy('creator_id')->count();

            $unmarkedEntries = $contest->unmarkedEntries();

            if (!is_null($unmarkedEntries)) {
                $contest_data['unmarked_entries'] = $unmarkedEntries;
            }
            $judges = $contest->jury;
            foreach($judges as $key=>$judge){
                $judges[$key]['user'] = User::find($judge->user_id);
            }

            $contestants = $contest->contestants;
            foreach($contestants as $key=>$contestant){
                $contestants[$key]['user'] = User::find($contestant->user_id);
            }

            $contest_data['judges'] = $judges;
            $contest_data['contestants'] = $contestants;

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
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }
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
//          $contest_data['judges'] = $contest->jury;
            $judges = $contest->jury;

            //Getting Following Data to Check is judge Followed By Current Logged In User
            foreach($judges as $judge){
                $count = Follow::where('user_id',$user->id)->where('target_id',$judge->user_id)->count();
                if ($count > 0) {
                    $judge->areYouFollowed = 1;
                    $judge->followClass = 'btn btn-sm btn-success';
                    $judge->followText = 'Following';
                }
                else{
                    $judge->areYouFollowed = 0;
                    $judge->followClass = 'btn btn-sm btn-danger';
                    $judge->followText = 'Follow';
                }
                $contest_data['judges'][]=$judge;
            }

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
