<?php

namespace Fundator\Http\Controllers;

use Fenos\Notifynder\Models\Notification;
use Fundator\Creator;
use Fundator\Events\Register;
use Fundator\Investor;
use Fundator\Role;
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

            $response['judging'] = $user->judging;
            $response['user_roles'] = $user->user_roles;

//            $notifications = $user->getNotifications();
//
//            foreach($notifications as $notification){
//                unset($notification['from']);
//                $extra = $notification->extra->toArray();
//                $notification['extras'] = $extra;
//            }
//
//            $response['notifications'] = $notifications;

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
            $response['error'] = $e;
        }

        return new Response($response, $statusCode);
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
     * List all the investors
     */
    public function indexInvestors()
    {
        return response()->json([], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Show a perticular investor
     */
    public function showInvestor($id)
    {
        $statusCode = 200;

        try{
            $investor = Investor::find($id);

            $response = [];
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
