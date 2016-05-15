<?php

namespace Fundator\Http\Controllers;

use Fundator\ProjectExpertise;
use Fundator\Expert;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Exception;

class ExpertController extends Controller
{
    public function __construct()
    {
        // Token Based Access
        // $this->middleware('jwt.auth', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statusCode = 200;

        try{
            $experts = Expert::all();

            foreach($experts as $expert)
            {
                $expert_data = $expert->getAttributes();

                $response[] = $expert_data;
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexSups()
    {
        $statusCode = 200;
        $response = [];

        try{
            $experts = Expert::where('super_expert', 1)->get();

            foreach($experts as $expert)
            {
                $expert_data = $expert->getAttributes();
                $expert_data['user'] = $expert->user;

                $response[] = $expert_data;
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

        try{
            $expert = Expert::find($id);

            $expert_data = [];
            $expert_data = $expert->getAttributes();
            $ongoing_payments = 0;
            $pending_payments = 0;

            $projectBids = ProjectExpertise::join('project_expertise_bids as peb', 'peb.project_expertise_id', '=', 'project_expertise.id')
                ->where('expert_id', $expert->id)->whereNotNull('selected_bid_id')->get(['peb.id', 'bid_amount']);

            $pendingProjectBids = ProjectExpertise::join('project_expertise_bids as peb', 'peb.project_expertise_id', '=', 'project_expertise.id')
                ->where('expert_id', $expert->id)->whereNull('selected_bid_id')->get(['peb.id', 'bid_amount']);

            $expert_data['num_projects'] = sizeof($projectBids);

            foreach ($projectBids as $bid) {
                $ongoing_payments+= $bid->bid_amount;
            }

            foreach ($pendingProjectBids as $bid) {
                $pending_payments+= $bid->bid_amount;
            }

            $expert_data['ongoing_payments'] = $ongoing_payments;
            $expert_data['pending_payments'] = $pending_payments;

            $response = $expert_data;

        }catch (Exception $e){
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
