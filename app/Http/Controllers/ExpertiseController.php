<?php

namespace Fundator\Http\Controllers;

use Fundator\Expertise;
use Fundator\ProjectExpertise;
use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class ExpertiseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($category = null)
    {
        $statusCode = 200;
        $response = [];
        $expertise = Expertise::where('visible', true)->get();

        if(!is_null($category)){
            $expertise = Expertise::where('expertise_category_id', $category)->where('visible', true)->get();
        }

        try{
            foreach($expertise as $expertise_item)
            {
                $expertise_item_data = $expertise_item->getAttributes();

                $response[] = $expertise_item_data;
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function availableIndex()
    {
        $statusCode = 200;
        $response = [];
        $expertise = ProjectExpertise::where('selected_bid_id', null)->get();

        try{
            $expertise_item_data = [];

            foreach($expertise as $expertise_item)
            {
                $expertise_item_data = $expertise_item->getAttributes();

                // $expertise_item_data['project'] = [
                //     'id' => $expertise_item->project['id'],
                //     'name' => $expertise_item->project['name'],
                //     'thumbnail' => $expertise_item->project['thumbnail']
                // ];

                $expertise_item_data['project'] = $expertise_item->project()->select('id', 'name', 'thumbnail')->first();
                $expertise_item_data['expertise'] = $expertise_item->expertise;

                if (!is_null($expertise_item->expertise) && !is_null($expertise_item->expertise->expertiseCategory)) {
                    $expertise_item_data['expertise_category'] = $expertise_item->expertise->expertiseCategory->parent;
                    $expertise_item_data['background_color'] = $expertise_item_data['expertise_category']['background_color'];
                    $expertise_item_data['icon'] = $expertise_item_data['expertise_category']['icon'];
                }

                $response[] = $expertise_item_data;
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function matchingIndex()
    {
        $statusCode = 200;
        $response = [
            'expertise' => [],
            'matching' => []
        ];

        if (! $user = JWTAuth::parseToken()->authenticate()) {
            throw new Exception('User not found', 1);
        }

        try{
            $expertise = ProjectExpertise::where('selected_bid_id', null)->get();
            $userSkills = [];

            if (!is_null($user->expert) && !is_null($user->expert->skills)) {
                $userSkills = $user->expert->skills->lists('id')->toArray();
            }

            foreach($expertise as $expertise_item) {
                $matchingSkills = [];

                if (!is_null($expertise_item->expertise)) {
                    $matchingSkills = array_intersect($expertise_item->expertise->skills->lists('id')->toArray(), $userSkills);
                }

                if (sizeof($matchingSkills) > 0) {
                    $expertise_item_data = $expertise_item->getAttributes();
                    $expertise_item_data['project'] = $expertise_item->project()->select('id', 'name', 'thumbnail')->first();
                    $expertise_item_data['expertise'] = $expertise_item->expertise;
                    $expertise_item_data['matching_skills'] = $matchingSkills;

                    $response['expertise'][] = $expertise_item_data;
                    $response['matching'] = array_unique(array_merge($response['matching'], $matchingSkills), SORT_REGULAR);
                }
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display a list of skills for the selected expertise.
     *
     * @return \Illuminate\Http\Response
     */
    public function skills($id)
    {
        $statusCode = 200;
        $response = [];
        $expertise = Expertise::find($id);

        try{
            $skills = $expertise->skills;

            $response = $skills;
        }catch(Exception $e){
            $statusCode = 400;
            $response = $e;
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
        //
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
