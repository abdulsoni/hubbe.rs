<?php

namespace Fundator\Http\Controllers;

use Fundator\Contest;
use Fundator\Entry;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

class EntryController extends Controller
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
        $entries = Entry::all();

        $i = 0;
        foreach($entries as $entry)
        {
            $i++;
            $entry_data = $entry->getAttributes();
            $entry_data['rating'] = $entry->rating;

            $response[] = $entry_data;
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
        $entry = Entry::find($id);

        $entry_data = $entry->getAttributes();
        $entry_data['ratings'] = $entry->ratings;

        foreach($entry_data['ratings'] as $rating){
            $judge = User::find($rating->judge_id);
            $rating->judge = $judge;
        }

        $response = $entry_data;

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
