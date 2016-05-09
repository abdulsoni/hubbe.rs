<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Project;
use Fundator\Expert;
use Fundator\Expertise;
use Fundator\ExpertiseCategory;
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

            if (!is_null($user)) {
                $response = ProjectController::projectsByRole($user, $_REQUEST['fd_active_role']);
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
            $project->thumbnail = $request->thumbnail;
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

    /*
     * Projects by Role
     *
     */
    public function projectsByRole($user, $role)
    {
        $projects_data = [];

        switch ($role) {
            case 'creator':
                $creator = $user->creator;
                $projects_data = [
                    'draft' => [],
                    'ongoing' => []
                ];

                if (!is_null($creator)) {
                    $projects = Project::where('creator_id', $creator->id)->where('display', 1)->get();

                    foreach($projects as $project)
                    {
                        $type = $project->draft ? 'draft' : 'ongoing';
                        $projects_data[$type][] = $project->projectCreatorAttributes();
                    }
                }
            break;
            case 'expert':
                $expert = $user->expert;

                $projects_data = [
                    'ongoing' => [],
                    'bids' => [],
                    'available' => [],
                    'matching' => []
                ];

                if (!is_null($expert)) {
                    $projectExpertise = ProjectExpertise::join('project_expertise_bids as peb', 'peb.project_expertise_id', '=', 'project_expertise.id')
                        ->where('expert_id', $expert->id)->whereNotNull('selected_bid_id')->get(['project_expertise.id', 'bid_amount', 'task', 'budget', 'start_date', 'lead_time']);

                    $projectBids = ProjectExpertise::join('project_expertise_bids as peb', 'peb.project_expertise_id', '=', 'project_expertise.id')
                        ->where('expert_id', $expert->id)->whereNull('selected_bid_id')->get(['peb.id', 'bid_amount', 'task', 'budget', 'start_date', 'lead_time', 'peb.created_at']);

                    $availableExpertise = ProjectExpertise::leftJoin('project_expertise_bids as peb', 'peb.project_expertise_id', '=', 'project_expertise.id')
                        ->where('selected_bid_id', null)->whereNull('peb.id')->get(['project_expertise.id', 'project_expertise.project_id', 'project_expertise.expertise_id', 'project_expertise.task', 'project_expertise.budget', 'project_expertise.lead_time', 'project_expertise.start_date', 'project_expertise.created_at']);

                    $projects_data['ongoing'] = $projectExpertise;
                    $projects_data['bids'] = $projectBids;

                    foreach($availableExpertise as $expertise)
                    {
                        $expertise_item_data = $expertise->getAttributes();
                        $expertise_item_data['project'] = $expertise->project()->select('id', 'name', 'thumbnail')->first();
                        $expertise_item_data['expertise'] = $expertise->expertise;

                        $projects_data['available'][] = $expertise_item_data;
                    }

                    if (!is_null($expert->skills)) {
                        $userSkills = $expert->skills->lists('id')->toArray();

                        foreach($availableExpertise as $expertise_item) {
                            $matchingSkills = [];

                            if (!is_null($expertise->expertise)) {
                                $matchingSkills = array_intersect($expertise->expertise->skills->lists('id')->toArray(), $userSkills);
                            }

                            if (sizeof($matchingSkills) > 0) {
                                $expertise_item_data = $expertise->getAttributes();
                                $expertise_item_data['project'] = $expertise->project()->select('id', 'name', 'thumbnail')->first();
                                $expertise_item_data['expertise'] = $expertise->expertise;
                                $expertise_item_data['matching_skills'] = $matchingSkills;

                                $projects_data['matching'][] = $expertise_item_data;
                                // $response['matching'] = array_unique(array_merge($response['matching'], $matchingSkills), SORT_REGULAR);
                            }
                        }
                    }
                }

            break;
            case 'investor':
                $projects_data = [
                    'ongoing' => [],
                    'available' => []
                ];
            break;
        }

        return $projects_data;
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
                    }else{
                        $project_expertise['selected_bid'] = null;
                    }

                    $project_expertise['average_bid'] = $project_expertise->bids->avg('bid_amount');
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
                // $response['project']['description'] = $expertise->project->description;
                $response['expertise'] = $expertise->getExpertise();
                $response['selected_bid'] = $expertise->selectedBid;

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
            // $selectedExpertise = Expertise::find($request->expertise_id);

            $expertiseCategory = null;
            $expertiseSubCategory = null;
            $expertise = null;
            $allSkills = [];

            if (!empty($request->other_expertise_category['name'])) {
                $expertiseCategory = ExpertiseCategory::create([
                    'name' => $request->other_expertise_category['name'],
                    'visible' => false
                ]);
            }else{
                $expertiseCategory = ExpertiseCategory::find($request->expertise_category['id']);
            }

            if(!empty($request->other_expertise_sub_category['name'])){
                $expertiseSubCategory = ExpertiseCategory::create([
                    'name' => $request->other_expertise_sub_category['name'],
                    'visible' => false
                ]);
                $expertiseSubCategory->parent()->associate($expertiseCategory);
                $expertiseSubCategory->save();
            }else{
                $expertiseSubCategory = ExpertiseCategory::find($request->expertise_sub_category['id']);
            }

            if (!empty($request->other_expertise['name'])) {
                $expertise = Expertise::create([
                    'name' => $request->other_expertise['name'],
                    'description' => '',
                    'visible' => false
                ]);

                $expertise->expertiseCategory()->associate($expertiseSubCategory);
                $expertise->save();

                $selectedExpertise = $expertise;
            }else{
                $expertise = Expertise::find($request->expertise['id']);

                if (!is_null($expertiseSubCategory)) {
                    $expertise->expertiseCategory()->associate($expertiseSubCategory);
                }

                $selectedExpertise = $expertise;
            }


            if (!is_null($project) && !is_null($expertise)) {
                $projectExpertise = ProjectExpertise::create([
                    'task' => $request->task,
                    'budget' => $request->budget,
                    'lead_time' => $request->lead_time,
                    'start_date' => $request->start_date
                ]);

                $projectExpertise->project()->associate($project);
                $projectExpertise->expertise()->associate($selectedExpertise);

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
