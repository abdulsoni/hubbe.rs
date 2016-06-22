<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\Investor;
use Fundator\ProjectInvestmentBid;

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

            $num_investments = 0;
            $current_investment = 0;
            $current_returns = [];
            $average_return = 0;
            $selectedBids = ProjectInvestmentBid::where('investor_id', $investor->id)->where('type', 'select')->get();

            if (sizeof($selectedBids) > 0) {
                foreach ($selectedBids as $bid) {
                    $current_investment+= $bid->bid_amount_max;
                    $current_returns[] = $bid->project->projectFinance->payable_intrest;
                }

                foreach ($current_returns as $return) {
                    $average_return+= $return;
                }

                $average_return = $average_return / sizeof($current_returns);
                $num_investments = sizeof($current_returns);
            }

            $investor_data['num_investments'] = $num_investments;
            $investor_data['current_investment'] = $current_investment;
            $investor_data['average_return'] = $average_return;
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
