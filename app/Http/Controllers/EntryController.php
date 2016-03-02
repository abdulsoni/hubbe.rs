<?php

namespace Fundator\Http\Controllers;

use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Thread;
use Fundator\Contest;
use Fundator\Creator;
use Fundator\Entry;
use Fundator\File;
use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

use Exception;

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

        try{
            $entries = Entry::all();

            $i = 0;
            foreach($entries as $entry)
            {
                $i++;
                $entry_data = $entry->getAttributes();
                $entry_data['rating'] = $entry->getAverageRating();

                $response[] = $entry_data;
            }
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }


        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
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
            $creator = Creator::find($request->creator_id);
            $contest = Contest::find($request->contest_id);

            $entry = Entry::create([
                'name' => $request->name,
                'description' => $request->description
            ]);

            $entry->creator()->associate($creator);
            $entry->contest()->associate($contest);

            $entry->files()->sync($request->attached_files);

            if(!is_null($request->thumbnail_id)){
                $file = File::find($request->thumbnail_id);

                if(!is_null($file)){
                    $entry->thumbnail = $file->file_url;
                }
            }

            if ($entry->save()) {
                $response = $entry;
            }
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  int  $judgeId
     * @return \Illuminate\Http\Response
     */
    public function show($id, $judgeId = null)
    {
        $statusCode = 200;
        $response = [];

        try{
            $entry = Entry::find($id);

            $entry_data = $entry->getAttributes();

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

            if(is_null($judgeId)){
                $entry_data['ratings'] = $entry->ratings;

                foreach($entry_data['ratings'] as $rating){
                    $judge = User::find($rating->judge_id);
                    $rating->judge = $judge;
                }
            }else{
                $entry_data['rating'] = $entry->ratings->where('judge_id', $judgeId)->first();
            }

            $entry_data['revisions'] = [];
            $revisions = Entry::where('contest_id', $entry->contest_id)->where('name', $entry->name)->get();

            foreach ($revisions as $revision) {
                $entry_data['revisions'][] = [
                    'id' => $revision->id
                ];
            }

            $entry_data['files'] = $entry->files;

            $response = $entry_data;
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

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

        try{
            $entries = Entry::select('*', DB::raw('MAX(id) AS id'))->where('contest_id', $contestId)->orderBy('id', 'desc')->groupBy('name')->get();
            $judge = User::find($judgeId);

            if (is_null($judge) || is_null($entries)) {
                throw new Exception('Invalid Judge or Entry', 1);
            }

            foreach($entries as $entry)
            {
                $entry = Entry::find($entry->id);
                $entry_data = $entry->getAttributes();
                $type = '';

                $last_entry = Entry::where('name', $entry->name)->orderBy('id', 'desc')->first()->first();

                if($entry->ratings->where('judge_id', $judge->id)->count() === 0 && Entry::where('name', $entry->name)->count() === 1){
                    $type = 'new';
                }

                if(Entry::where('name', $entry->name)->count() > 1 && $last_entry->rating !== null) {
                    $type = 'ammended';
                }

                if(Entry::where('name', $entry->name)->count() > 1 && $last_entry->rating === null) {
                    $type = 'waiting review';
                }

                $entry_data['type'] = $type;

                $entry_data['revisions'] = [];
                $revisions = Entry::where('contest_id', $contestId)->where('name', $entry->name)->get();

                foreach ($revisions as $revision) {
                    $entry_data['revisions'][] = [
                        'id' => $revision->id
                    ];
                }

                $response[] = $entry_data;
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    public function contestantEntries($contestId, $creatorId)
    {
        $statusCode = 200;
        $response = [];

        try{
            $creator = Creator::find($creatorId);
            $entries = Entry::where('contest_id', $contestId)->where('creator_id', $creatorId)->get();

            if (is_null($creator) || is_null($entries)) {
                throw new Exception('Invalid Creator or Entry', 1);
            }

            foreach($entries as $entry)
            {
                $entry_data = $entry->getAttributes();
                $response[] = $entry_data;
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
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
