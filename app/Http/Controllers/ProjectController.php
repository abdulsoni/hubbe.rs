<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Project;
use Fundator\Expert;
use Fundator\Expertise;
use Fundator\ProjectExpertise;
use Fundator\ProjectExpertiseBid;
use Fundator\Confirm;

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

                $project->super_expert_id = $request->super_expert_id;
                $project->state = 2;
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


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function indexExpertise($id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $project = Project::find($id);

            $project_data = [];

            if (!is_null($project)) {
                $project_data = $project->expertise;

                foreach ($project_data as $project_expertise) {
                    $project_expertise['project'] = $project_expertise->getProject();
                    $project_expertise['expertise'] = $project_expertise->getExpertise();

                    if (!is_null($project_expertise->selected_bid_id)) {
                        $projectExpertiseBid = ProjectExpertiseBid::find($project_expertise->selected_bid_id);
                        $project_expertise['selected_bid'] = $projectExpertiseBid;
                        $project_expertise['selected_bid']['expert'] = $projectExpertiseBid->expert;
                    }
                }
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getExpertise($id)
    {
        $statusCode = 200;
        $response = [];

        try{
            $expertise = ProjectExpertise::find($id);

            if (!is_null($expertise)) {
                $response = $expertise;
                $response['project'] = $expertise->getProject();
                $response['project']['description'] = $expertise->project->description;
                $response['expertise'] = $expertise->getExpertise();
                $response['selected_bid'] = $expertise->selectedBid();

                $user = JWTAuth::parseToken()->authenticate();

                if (!is_null($user) && !is_null($user->expert)) {
                    $response['bid'] = ProjectExpertiseBid::where('project_expertise_id', $expertise->id)->where('expert_id', $user->expert->id)->first();
                    $response['thread_id'] = $expertise->getThreadId($user->expert->id);
                }
            }else{
                throw new Exception('Project Expertise not found', 1);
            }
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
    public function storeExpertise(Request $request, $id)
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $project = Project::find($id);
            $expertise = Expertise::find($request->expertise_id);

            if (!is_null($project) && !is_null($expertise)) {
                $projectExpertise = ProjectExpertise::create([
                    'task' => $request->task,
                    'budget' => $request->budget,
                    'lead_time' => $request->lead_time,
                    'start_date' => $request->start_date
                ]);

                $projectExpertise->project()->associate($project);
                $projectExpertise->expertise()->associate($expertise);

                // Create double confirmation here ...

                $confirmation = Confirm::create([
                    'confirm_status' => 0,
                    'confirm_time' => null
                ]);

                $superExpert = $project->superExpert;

                if ($user->id !== $superExpert->id) {
                    $confirmation->sender()->associate($user);
                    $confirmation->receiver()->associate($superExpert);
                }else{
                    $confirmation->sender()->associate($superExpert);
                    $confirmation->receiver()->associate($user);
                }

                $projectExpertise->confirmation()->save($confirmation);
                $projectExpertise->save();

                $response = $projectExpertise;
            }else{
                throw new Exception('Project or Expertise not found', 1);
            }

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
    public function selectProjectExpertiseBid(Request $request, $projectExpertiseId, $bidId)
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $projectExpertise = ProjectExpertise::find($projectExpertiseId);
            $selectedBid = ProjectExpertiseBid::find($bidId);

            if ((!is_null($projectExpertise) && !is_null($selectedBid)) && $user->id === $projectExpertise->project->creator->user->id) {
                $projectExpertise->selectedBid()->associate($selectedBid);

                 if($projectExpertise->save()){
                    $response = $projectExpertise->selectedBid;
                 }
            }else{
                throw new Exception('ProjectExpertise or Bid not found', 1);
            }

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
    public function storeExpertiseBid(Request $request, $id)
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User not found', 1);
            }

            $projectExpertise = ProjectExpertise::find($id);

            if (!is_null($projectExpertise) && !is_null($user->expert)) {
                $projectExpertiseBid = ProjectExpertiseBid::create([
                    'bid_amount' => $request->bid_amount,
                    'description' => $request->description
                ]);

                $projectExpertiseBid->projectExpertise()->associate($projectExpertise);
                $projectExpertiseBid->expert()->associate($user->expert);

                $projectExpertiseBid->save();

                $response = $projectExpertiseBid;
            }else{
                throw new Exception('Project or Expert not found', 1);
            }

        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }


        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
