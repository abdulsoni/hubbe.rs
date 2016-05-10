<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

class ProjectFinanceController extends Controller
{
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
            $project_finance = ProjectFinance::find($id);

            $project_finance_data = [];

            if (!is_null($project_finance)) {
                $project_finance_data = $project_finance->getAttributes();
            }else{
                throw new Exception('Project Finance not found', 1);
            }

            $response = $project_finance_data;
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

            $project_finance = ProjectFinance::find($id);

            // Update Logic Happens here
            // $project->thumbnail = $request->thumbnail;
            // $project->name = $request->name;
            // $project->description = $request->description;
            // $project->market = $request->market;
            // $project->price = floatval($request->price);
            // $project->geography = $request->geography;
            // $project->language = $request->language;

            // if (is_null($project->super_expert_id) && isset($request->super_expert_id)) {
            //     $superExpert = Expert::find($request->super_expert_id);
            //     Event::fire(new ProjectSuperExpertSelected($project, $superExpert));

            //     $project->super_expert_id = $request->super_expert_id;
            //     $project->state = 2;
            // }

            $response = $project_finance->save();
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }


        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
