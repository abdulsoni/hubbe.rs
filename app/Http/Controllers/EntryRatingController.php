<?php

namespace Fundator\Http\Controllers;

use Fundator\Contest;
use Fundator\Entry;
use Fundator\EntryRating;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

class EntryRatingController extends Controller
{


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $statusCode = 200;

        $judge = User::find($request->judge_id);
        $entry = Entry::find($request->entry_id);

        $entryRating = EntryRating::create([
            'design' => $request->design,
            'creativity' => $request->creativity,
            'industrial' => $request->industrial,
            'market' => $request->market
        ]);

        $entryRating->judge()->associate($judge);
        $entryRating->entry()->associate($entry);

        $result = $entryRating->save();

        if($result){
            $response = 'success';
        }else{
            $response = 'error';
        }

        return new Response($response, $statusCode);
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

        $entryRating = EntryRating::find($id);

        $entryRating->design = $request->design;
        $entryRating->creativity = $request->creativity;
        $entryRating->industrial = $request->industrial;
        $entryRating->market = $request->market;

        $result = $entryRating->save();

        if($result){
            $response = 'success';
        }else{
            $response = 'error';
        }


        return new Response($response, $statusCode);
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
