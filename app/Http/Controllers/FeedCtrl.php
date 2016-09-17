<?php

namespace Fundator\Http\Controllers;

use Fundator\User;

use Fundator\Feeds;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use GetStream\StreamLaravel\Facades\FeedManager;
use GetStream\Stream\Client;
use Tymon\JWTAuth\Facades\JWTAuth;

class FeedCtrl extends Controller
{

    protected $feeds;

    /**
     * Create a new controller instance.
     *
     * @param  TaskRepository  $tasks
     */
    // public function __construct()
    // {
    //     $feeds = Feed::orderBy('created_at', 'asc')->get();
    //     $this->feeds = $feeds;
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statusCode = 200;
        $response = [];

        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }

        // Get your timeline:
        $feed = FeedManager::getNewsFeeds($user->id)['timeline'];
        // Get your timeline activities from Stream:
        $activities = $feed->getActivities(0,25)['results'];
        $response= $activities;
        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Create a new task.
     *
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'name' => 'required|max:255',
        // ]);
        // $request->user()->tasks()->create([
        //     'name' => $request->name,
        //     'display_name' => $request->user()->name
        // ]);
        // return redirect('/tasks');
    }
    /**
     * Destroy the given task.
     *
     * @param  Request  $request
     * @param  Task  $task
     * @return Response
     */
    public function destroy(Request $request, Task $task)
    {
        // $this->authorize('destroy', $task);
        // $task->delete();
        // return redirect('/tasks');
    }
}