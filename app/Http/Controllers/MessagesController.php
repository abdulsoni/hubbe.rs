<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Thread;

use Fundator\User;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class MessagesController extends Controller
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
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $message = Message::create([
                'thread_id' => $request->thread_id,
                'user_id'   => $user->id,
                'body'      => $request->message,
            ]);

            $response = $message;

            unset($response['thread']);
            unset($response['thread_id']);

            if(!is_null($user)){
                $response['user'] = [
                    'id' => $user->id,
                    'name' => $user->name
                ];
            }
        }catch (Exception $e){
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
        $statusCode = 200;
        $response = [];

        try{
            $thread = Thread::find($id);

            if(!is_null($thread)){
                $message_data = $thread->messages;

                foreach($message_data as $message){
                    $user = User::find($message->user_id);

                    if(!is_null($user)){
                        $message['user'] = [
                        'id' => $user->id,
                        'name' => $user->name
                        ];
                    }
                }

                $response = $message_data;
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
