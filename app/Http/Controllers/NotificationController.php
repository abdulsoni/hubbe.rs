<?php

namespace Fundator\Http\Controllers;

use Fenos\Notifynder\Models\Notification;
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
                $notifications = $user->getNotificationsNotRead(); //Notification::where('to_id', $id)->where('read', 0)->get();

                foreach($notifications as $notification){
                    unset($notification['from']);
                    $extra = $notification->extra->toArray();
                    $notification['extras'] = $extra;
                }

                $response['notifications'] = $notifications;
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Mark a single notification as read
     *
     * @param Request $request
     * @param $id
     */
    public function markSingleRead(Request $request, $id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $notification = Notification::find($id);
            $notification->read = 1;

            if($notification->save()){
                $response = 'Updated';
            }
        }catch (Exception $e){
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
    public function markAllAsRead(Request $request, $userId)
    {
        $statusCode = 200;
        $response = [];

        try{
            $user = User::find($userId);
            $response = $user->readAllNotifications();
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
