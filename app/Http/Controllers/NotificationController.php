<?php

namespace Fundator\Http\Controllers;

use Fundator\User;
use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $user = User::find($id);
            if($user !== null){
                $response['notifications'] = $user->getNotifications();
                $response['unread'] = $user->countNotificationsNotRead();
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function markAsRead(Request $request, $id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $user = User::find($id);
            $response = $user->readAllNotifications();
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
