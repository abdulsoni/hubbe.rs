<?php

namespace Fundator\Http\Controllers;

use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Thread;
use Fundator\Contest;
use Fundator\Entry;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        $entry_data['messages'] = [];

        $thread = $entry->getThread();

        if(!is_null($thread)){
            $entry_data['messages'] = $thread->messages;

            foreach($entry_data['messages'] as $message){
                $user = User::find($message->user_id);

                if(!is_null($user)){
                    $message['user'] = [
                        'id' => $user->id,
                        'name' => $user->name
                    ];
                }
            }
        }

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

    public function judgeEntries($contestId, $judgeId)
    {
        $statusCode = 200;
        $response = [];

        $entries = Entry::where('contest_id', $contestId)->get();
        $judge = User::find($judgeId);


        foreach($entries as $entry)
        {
            $entry_data = $entry->getAttributes();
            $type = '';

            if($entry->ratings->where('judge_id', $judge->id)->count() === 0 && Entry::where('name', $entry->name)->first()->id === $entry->id){
                $type = 'new';
            }

            if($entry->ratings->where('judge_id', $judge->id)->count() === 0 && Entry::where('name', $entry->name)->first()->id !== $entry->id) {
                $type = 'ammended';
            }

            $entry_data['type'] = $type;
            $entry_data['rating'] = $entry->ratings->where('judge_id', $judge->id)->first();

            $response[] = $entry_data;
        }

        return new Response($response, $statusCode);
    }

    /**
     * API function to post a message
     */
    public function postEntryMessage(Request $request, $id)
    {
        $statusCode = 200;

        $entry = Entry::find($id);

        if (! $user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }

        $message = Message::create([
            'thread_id' => $entry->getThreadId(),
            'user_id'   => $user->id,
            'body'      => $request->message,
        ]);

        $response = $message;

        unset($response['thread']);
        unset($response['thread_id']);

        $user = User::find($message->user_id);

        if(!is_null($user)){
            $response['user'] = [
                'id' => $user->id,
                'name' => $user->name
            ];
        }

        return new Response($response, $statusCode);
    }
}
