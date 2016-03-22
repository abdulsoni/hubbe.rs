<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Investor;

class InvestorController extends Controller
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

        try{
            $investor = Investor::find($id);

            $investor_data = $investor->getAttributes();

            $investor_data['current_investment'] = 0;
            $investor_data['average_return'] = 0;
            $investor_data['total_earnings'] = 0;
            $investor_data['rank'] = 0;

            $response = $investor_data;
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
        // Update Investment budget
        $statusCode = 200;
        $response = [];

        try{
            $investor = Investor::find($id);
            $investor->investment_budget = $request->investment_budget;
            $investor->investment_goal = $request->investment_goal;
            $investor->investment_reason = $request->investment_reason;

            $response = ['success' => $investor->save()];
        } catch (Exception $e) {
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
