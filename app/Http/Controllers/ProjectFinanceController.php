<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Fundator\ProjectFinance;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Event;


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

            $project_finance->fill([
                'fob_manufacturing_cost' => $request->fob_manufacturing_cost,
                'fob_selling_price' => $request->fob_selling_price,
                'gross_margin' => $request->gross_margin,
                'adjustment_margin' => $request->adjustment_margin,
                'self_funding_amount' => $request->self_funding_amount,
                'funding_amount' => $request->funding_amount,
                'payable_intrest' => $request->payable_intrest,
                'payback_duration' => $request->payback_duration,
                'payback_duration_extended' => $request->payback_duration_extended,
                'investors_min' => $request->investors_min,
                'investors_max' => $request->investors_max,
                'investors_type' => $request->investors_type,
                'investors_message_creator' => $request->investors_message_creator,
                'investors_message_se' => $request->investors_message_se
            ]);

            $response = $project_finance->save();
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }


        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
