<?php

namespace Fundator\Http\Controllers;

use Fenos\Notifynder\Models\Notification;
use Fundator\Contest;
use Fundator\Creator;
use Fundator\Events\Register;
use Fundator\Investor;
use Fundator\Expert;
use Fundator\ExpertiseCategory;
use Fundator\Expertise;
use Fundator\Role;
use Fundator\Skill;
use Fundator\JuryApplication;
use Fundator\ContestantApplication;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Illuminate\Support\Facades\Event;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $statusCode = 200;
        $response = [];

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $response = $user->getAttributes();
            unset($response['password']);
            unset($response['remember_token']);

            if(!is_null($user->thumbnail)){
                $response['thumbnail'] = $user->thumbnail_url;
            }

            $response['judging'] = $user->juryApplications;
            $response['contesting'] = $user->contestantApplications;
            $response['user_roles'] = $user->user_roles;
            $response['skills'] = Skill::where('id', '>', 1)->where('id', '<', 7)->get();

            // Social Profiles
            $response['facebook'] = null;
            $response['linkedin'] = null;

            if ($user->facebookProfile) {
                $response['facebook'] = $user->facebookProfile;
            }

            if ($user->linkedinProfile) {
                $response['linkedin'] = $user->linkedinProfile;
            }

            $response['amount'] = $user->currentAmount();
            $response['shares'] = $user->currentPoints();

        } catch (TokenExpiredException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_expired';
        } catch (TokenInvalidException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_invalid';
        } catch (JWTException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_absent';
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = $e->getMessage();
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

            // Update Attributes

            $user->name = $request->name;
            $user->last_name = $request->last_name;
            $user->role = $request->role;
            $user->age_gate = ($request->age_gate === 'yes');
            $user->country_origin = $request->country_origin;
            $user->country_residence = $request->country_residence;

            $user->contact_number = $request->contact_number;
            $user->contact_number_country_code = $request->contact_number_country_code;
            $user->contact_time = $request->contact_time;

            if (isset($request->bio)) {
                $user->bio = $request->bio;
            }

            if(isset($request->investor) && is_null($user->investor)){
                $investor = Investor::create([
                    'investment_budget' => $request->investor['investment_budget'],
                    'investment_goal' => $request->investor['investment_goal'],
                    'investment_reason' => $request->investor['investment_reason']
                ]);

                $investor->user()->associate($user)->save();

                $investorRole = Role::where('name', 'investor')->first();

                if(!is_null($investorRole)){
                    $user->roles()->attach($investorRole->id);
                }
            }

            if(isset($request->creator) && is_null($user->creator)){
                $creator = Creator::create([]);

                $creator->user()->associate($user)->save();

                $creatorRole = Role::where('name', 'creator')->first();

                if(!is_null($creatorRole)){
                    $user->roles()->attach($creatorRole->id);
                }
            }

            if(isset($request->expert) && is_null($user->expert)){
                $expert = Expert::create([]);

                $expertiseCategory = null;
                $expertiseSubCategory = null;
                $expertise = null;
                $allSkills = [];

                foreach ($request->expert['list'] as $expertData) {
                    if (!empty($expertData['other_expertise_category']['name'])) {
                        $expertiseCategory = ExpertiseCategory::create([
                            'name' => $expertData['other_expertise_category']['name'],
                            'visible' => false
                        ]);
                    }else{
                        $expertiseCategory = ExpertiseCategory::find($expertData['expertise_category']['id']);
                    }

                    if(!empty($expertData['other_expertise_sub_category']['name'])){
                        $expertiseSubCategory = ExpertiseCategory::create([
                            'name' => $expertData['other_expertise_sub_category']['name'],
                            'visible' => false
                        ]);
                        $expertiseSubCategory->parent()->associate($expertiseCategory);
                        $expertiseSubCategory->save();
                    }else{
                        $expertiseSubCategory = ExpertiseCategory::find($expertData['expertise_sub_category']['id']);
                    }

                    if (!empty($expertData['other_expertise']['name'])) {
                        $expertise = Expertise::create([
                            'name' => $expertData['other_expertise']['name'],
                            'description' => '',
                            'visible' => false
                        ]);

                        $expertise->expertiseCategory()->associate($expertiseSubCategory);
                        $expertise->save();

                        $expert->expertise()->attach($expertise->id);
                    }else{
                        $expertise = Expertise::find($expertData['expertise']['id']);
                        if (!is_null($expertiseSubCategory)) {
                            $expertise->expertiseCategory()->associate($expertiseSubCategory);
                        }
                        $expert->expertise()->attach($expertise->id);
                    }


                    if (sizeof($expertData['skills']) > 0) {
                        $skillIds = [];

                        foreach ($expertData['skills'] as $skill) {
                            $skillIds[] = intval($skill['id']);
                        }

                        $allSkills = array_merge($skillIds, $allSkills);

                        if (!empty($expertData['other_expertise']['name'])) {
                            $expertise->skills()->sync($skillIds);
                        }
                    }

                }

                $expert->skills()->sync($allSkills);

                $expert->save();
            }

            if($user->registered == 0){
                $user->registered = 1;
                Event::fire(new Register($user));
            }

            if($user->save()){
                $response = 'Updated';
            }
        } catch (TokenExpiredException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_expired';
        } catch (TokenInvalidException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_invalid';
        } catch (JWTException $e) {
            $statusCode = $e->getStatusCode();
            $response['error'] = 'token_absent';
        }catch (Exception $e){
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

    // /**
    //  * List all the investors
    //  */
    // public function indexInvestors()
    // {
    //     return response()->json([], 200, [], JSON_NUMERIC_CHECK);
    // }

    // /**
    //  * Show a perticular investor
    //  */
    // public function showInvestor($id)
    // {
    //     $statusCode = 200;

    //     try{
    //         $investor = Investor::find($id);

    //         $response = [];
    //     }catch (Exception $e){
    //         $statusCode = 400;
    //         $response = ['error' => $e->getMessage()];
    //     }

    //     return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    // }

    /**
     * Convert a user to a judge
     */
    public function becomeJudge(Request $request)
    {
        $statusCode = 200;

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $application = JuryApplication::where('user_id', $user->id)->first();

            if (is_null($application)) {
                $contest = Contest::find($request->contest_id);

                $application = JuryApplication::create([
                    'status' => 0
                ]);

                $application->user()->associate($user);
                $application->contest()->associate($contest);
                $application->save();
            }

            $response = $application;
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Convert a user to a creator
     */
    public function becomeContestant(Request $request)
    {
        $statusCode = 200;

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $application = ContestantApplication::where('user_id', $user->id)->first();

            if (is_null($application)) {
                $contest = Contest::find($request->contest_id);

                $application = ContestantApplication::create([
                    'status' => 0
                ]);

                $application->user()->associate($user);
                $application->contest()->associate($contest);
                $application->save();
            }

            $response = $application;
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Side Navigation
     */
    public function sideNavigationData()
    {
        $statusCode = 200;

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $contestantData = [
                'ongoing' => [],
                'past' => []
            ];

            if (!is_null($user->creator)) {
                $contestantData['ongoing'] = $user->contestantApplications;
                $contestantData['past'] = null;

                foreach ($contestantData['ongoing'] as $c) {
                    $contest = Contest::find($c->contest_id);
                    $c['name'] = $contest->name;
                    $c['thumbnail'] = $contest->thumbnail;
                }
            }

            $juryData = [
                'ongoing' => [],
                'past' => []
            ];

            $juryData['ongoing'] = $user->juryApplications;
            $juryData['past'] = null;

            foreach ($juryData['ongoing'] as $j) {
                $contest = Contest::find($j->contest_id);
                $j['name'] = $contest->name;
                $j['thumbnail'] = $contest->thumbnail;
            }

            // $creatorData = [
            //     'ongoing' => [],
            //     'past' => []
            // ]

            // $juryData['ongoing'] = $user->juryApplications;
            // $juryData['past'] = null;

            foreach ($juryData['ongoing'] as $j) {
                $contest = Contest::find($j->contest_id);
                $j['name'] = $contest->name;
                $j['thumbnail'] = $contest->thumbnail;
            }

            $response = [
                'contestant' => sizeof($contestantData['ongoing']) > 0 ? $contestantData : null,
                'jury' => sizeof($juryData['ongoing']) > 0 ? $juryData : null,
                'creator' => null,
                'expert' => null,
                'investor' => null
            ];

        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Store device token
     */
    public function storeDeviceToken(Request $request)
    {
        $statusCode = 200;

        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            $response = $user->storeDeviceToken($request->type, $request->app_token);
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
