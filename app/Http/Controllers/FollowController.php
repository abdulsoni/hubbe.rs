<?php

namespace Fundator\Http\Controllers;

use Fundator\Follow;
use Illuminate\Support\Facades\Request;
use Fundator\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use GetStream\StreamLaravel\Facades\FeedManager;

class FollowController extends Controller{
    public function follow(){
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }
        $userId = $user->id;
        $postData = Request::all();
        if(Request::has('userId')){
            $userId = $postData['userId'];
        }
        $targetId = $postData['targetId'];
        $insert = array(
            'user_id'=>$userId,
            'target_id'=>$targetId
        );
        Follow::create($insert);
        echo $userId." : ".$targetId;
        //Insert Into Feed
        FeedManager::followUser($userId,$targetId);
    }

    public function unfollow(){
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }

        $postData = Request::all();
        $userId = $user->id;
        $targetId = $postData['targetId'];

        Follow::where('user_id',$userId)->where('target_id',$targetId)->delete();
        FeedManager::unfollowUser($userId, $targetId);
    }
    public function checkFollow(){
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }
        $targetId = Request::get('id');
        $count = Follow::where('user_id',$user->id)->where('target_id',$targetId)->count();
        if ($count > 0) {
            $temp['areYouFollowed'] = 1;
            $temp['followClass'] = 'btn btn-sm btn-success';
            $temp['followText'] = 'Unfollow';
        }
        else{
            $temp['areYouFollowed'] = 0;
            $temp['followClass'] = 'btn btn-sm btn-danger';
            $temp['followText'] = 'Follow';
        }
        return response()->json($temp);
    }

}
