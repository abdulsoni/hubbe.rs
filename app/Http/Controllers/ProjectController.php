<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Project;
use Fundator\Expert;

use Fundator\Events\ProjectSuperExpertSelected;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Event;

use Exception;

class ProjectController extends Controller
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
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $creator = $user->creator;
            $projects = [];

            if (!is_null($creator)) {
                $projects = Project::where('creator_id', $creator->id)->get();
            }

            $i = 0;
            foreach($projects as $project)
            {
                $i++;
                $project_data = $project->getAttributes();

                $response[] = $project_data;
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
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $creator = $user->creator;

            if (!is_null($creator)) {
                $project = Project::create([
                    'draft' => 1,
                    'display' => 0,
                    'thumbnail' => 0,
                    'start_time' => date('Y-m-d H:i:s'),
                    'duration' => 60
                ]);

                $project->creator()->associate($creator);
                $project->save();

                $response = $project;
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
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $project = Project::find($id);

            $project_data = [];

            if (!is_null($project)) {
                $project_data = $project->getAttributes();
            }else{
                throw new Exception('Project not found', 1);
            }

            $response = $project_data;
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
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $creator = $user->creator;
            $project = Project::find($id);

            // Update Logic Happens here
            $project->name = $request->name;
            $project->description = $request->description;
            $project->market = $request->market;
            $project->price = floatval($request->price);
            $project->geography = $request->geography;
            $project->language = $request->language;

            $project->state = $request->state;

            if (is_null($project->super_expert_id) && isset($request->super_expert_id)) {
                $superExpert = Expert::find($request->super_expert_id);

                Event::fire(new ProjectSuperExpertSelected($project, $superExpert));
                $project->state = 3;
            }

            $response = $project->save();
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }


        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
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
