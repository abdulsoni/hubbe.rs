<?php

namespace Fundator\Http\Controllers;


use Fundator\User;

use Fundator\Feeds;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

class FeedCtrl extends Controller
{   
    /**
     * The task repository instance.
     *
     * @var TaskRepository
     */
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

        // Get your timeline:
        $feed = \FeedManager::getNewsFeeds()['timeline'];
        // Get your timeline activities from Stream:
        $activities = $feed->getActivities(0,25)['results'];

        $response['data'] = $activities;
        
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
