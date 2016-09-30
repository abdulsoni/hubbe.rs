<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'AppController@serveApp');


Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

$api = app('Dingo\Api\Routing\Router');
$api->version('v1', ['prefix' => 'api/v1'], function ($api) {

    /*
     * Auth Providers
     */

    $api->get('users', 'Fundator\Http\Controllers\AuthenticateController@index');
    $api->post('users/becomeJudge', 'Fundator\Http\Controllers\UserController@becomeJudge');
    $api->post('users/becomeContestant', 'Fundator\Http\Controllers\UserController@becomeContestant');
    $api->get('users/sideNavigationData', 'Fundator\Http\Controllers\UserController@sideNavigationData');
    $api->post('users/store-device-token', 'Fundator\Http\Controllers\UserController@storeDeviceToken');

    $api->get('user', 'Fundator\Http\Controllers\UserController@show');
    $api->put('users/{id}', 'Fundator\Http\Controllers\UserController@update');
    $api->post('users/{id}', 'Fundator\Http\Controllers\UserController@update');

    // Profile API
    $api->get('users/profile', 'Fundator\Http\Controllers\UserController@getProfile');
    // Profile API

    $api->post('authenticate', 'Fundator\Http\Controllers\AuthenticateController@authenticate');
    $api->post('authenticate/signup', 'Fundator\Http\Controllers\AuthenticateController@signup');
    $api->post('authenticate/confirm', 'Fundator\Http\Controllers\AuthenticateController@confirm');

    $api->post('authenticate/reset', 'Fundator\Http\Controllers\Auth\PasswordController@appReset');
    $api->post('authenticate/forgot', 'Fundator\Http\Controllers\Auth\PasswordController@appRecoverPasswordSend');
    $api->post('authenticate/forgot-verify', 'Fundator\Http\Controllers\Auth\PasswordController@appRecoverPasswordVerify');
    $api->post('authenticate/recover', 'Fundator\Http\Controllers\Auth\PasswordController@appRecoverPasswordProcess');

    /*
     * Auth Providers
     */
    $api->post('authenticate/facebook', 'Fundator\Http\Controllers\AuthenticateController@facebook');
    $api->get('authenticate/facebook', 'Fundator\Http\Controllers\AuthenticateController@facebook');
    $api->post('authenticate/unlinkFacebook', 'Fundator\Http\Controllers\AuthenticateController@unlinkFacebook');
    $api->post('authenticate/google', 'Fundator\Http\Controllers\AuthenticateController@google');
    $api->post('authenticate/linkedin', 'Fundator\Http\Controllers\AuthenticateController@linkedin');
    $api->get('authenticate/linkedin', 'Fundator\Http\Controllers\AuthenticateController@linkedin');
    $api->post('authenticate/unlinkLinkedin', 'Fundator\Http\Controllers\AuthenticateController@unlinkLinkedin');

    /*
     * Verification
     */
    $api->post('verification/start', 'Fundator\Http\Controllers\VerificationController@requestVerificationCode');
    $api->post('verification/check', 'Fundator\Http\Controllers\VerificationController@processVerificationCode');

    /*
     * Contests
     */
    $api->get('contests/', 'Fundator\Http\Controllers\ContestController@index');
    $api->post('contests/', 'Fundator\Http\Controllers\ContestController@index');
    $api->get('contests/{id}', 'Fundator\Http\Controllers\ContestController@show');

    /*
     * Projects
     */
    $api->get('projects/', 'Fundator\Http\Controllers\ProjectController@index');
    $api->post('projects/', 'Fundator\Http\Controllers\ProjectController@store');
    $api->get('projects/{id}', 'Fundator\Http\Controllers\ProjectController@show');
    $api->put('projects/{id}', 'Fundator\Http\Controllers\ProjectController@update');

    $api->get('projects/{id}/expertise', 'Fundator\Http\Controllers\ProjectController@indexExpertise');
    $api->post('projects/{id}/expertise', 'Fundator\Http\Controllers\ProjectController@storeExpertise');

    $api->get('projects/{id}/investment-bids', 'Fundator\Http\Controllers\ProjectController@indexInvestmentBids');
    $api->post('projects/{id}/investment-bids', 'Fundator\Http\Controllers\ProjectController@storeInvestmentBids');
    $api->put('projects/{id}/investment-bids/{bidId}', 'Fundator\Http\Controllers\ProjectController@updateInvestmentBids');

    $api->get('project-finance/{id}', 'Fundator\Http\Controllers\ProjectFinanceController@show');
    $api->put('project-finance/{id}', 'Fundator\Http\Controllers\ProjectFinanceController@update');

    $api->get('project-expertise/{id}', 'Fundator\Http\Controllers\ProjectController@getExpertise');
    $api->post('project-expertise/{id}/bid', 'Fundator\Http\Controllers\ProjectController@storeExpertiseBid');
    $api->put('project-expertise/{projectExpertiseId}/bid/{bidId}', 'Fundator\Http\Controllers\ProjectController@selectProjectExpertiseBid');

    /*
     * Entries
     */
    $api->get('entries/', 'Fundator\Http\Controllers\EntryController@index');
    $api->get('entries/{id}', 'Fundator\Http\Controllers\EntryController@show');
    $api->get('entries/{id}/judge/{judgeId}', 'Fundator\Http\Controllers\EntryController@show');
    $api->post('entries/', 'Fundator\Http\Controllers\EntryController@store');
    $api->put('entries/{id}', 'Fundator\Http\Controllers\EntryController@update');

    $api->get('entries/contest/{contestId}/judge/{judgeId}', 'Fundator\Http\Controllers\EntryController@judgeEntries');
    $api->get('entries/contest/{contestId}/creator/{creatorId}', 'Fundator\Http\Controllers\EntryController@contestantEntries');

    $api->post('entries/{id}/messages', 'Fundator\Http\Controllers\EntryController@postEntryMessage');


    /*
     * Entry Ratings
     */
    $api->post('entry-ratings', 'Fundator\Http\Controllers\EntryRatingController@store');
    $api->put('entry-ratings/{id}', 'Fundator\Http\Controllers\EntryRatingController@update');

    /*
     * Creators
     */
    $api->get('creators/', 'Fundator\Http\Controllers\CreatorController@index');
    $api->get('creators/{id}', 'Fundator\Http\Controllers\CreatorController@show');

    /*
     * Experts
     */
    $api->get('experts', 'Fundator\Http\Controllers\ExpertController@index');
    $api->get('super-experts', 'Fundator\Http\Controllers\ExpertController@indexSups');
    $api->get('experts/{id}', 'Fundator\Http\Controllers\ExpertController@show');

    /*
     * Investors
     */
    // $api->get('investors/', 'Fundator\Http\Controllers\InvestorController@index')
    $api->get('investors/{id}', 'Fundator\Http\Controllers\InvestorController@show');
    $api->put('investors/{id}', 'Fundator\Http\Controllers\InvestorController@update');

    /*
     * Shares Listing
     */
    $api->get('share-listing', 'Fundator\Http\Controllers\ShareListingController@primary');
    $api->get('share-listing/{id}', 'Fundator\Http\Controllers\ShareListingController@show');

    /*
     * Shares Bid
     */
    $api->get('share-bids', 'Fundator\Http\Controllers\ShareBidController@index');
    $api->post('share-bids', 'Fundator\Http\Controllers\ShareBidController@store');
    $api->get('share-bids/{id}', 'Fundator\Http\Controllers\ShareBidController@show');

    /*
     * Files
     */
    $api->post('files/', 'Fundator\Http\Controllers\FileController@store');

    /*
     * Pages
     */
    $api->get('pages/{slug}', 'Fundator\Http\Controllers\PageController@show');

    /*
     * Expertise & Expertise Category
     */
    $api->get('expertise/', 'Fundator\Http\Controllers\ExpertiseController@index');
    $api->get('expertise/category/{category}', 'Fundator\Http\Controllers\ExpertiseController@index');
    $api->get('expertise/{id}/skills', 'Fundator\Http\Controllers\ExpertiseController@skills');
    $api->get('expertise-category/{parent?}', 'Fundator\Http\Controllers\ExpertiseCategoryController@index');

    $api->get('skills/', 'Fundator\Http\Controllers\SkillsController@index');

    $api->get('expertise/available', 'Fundator\Http\Controllers\ExpertiseController@availableIndex');
    $api->get('expertise/matching', 'Fundator\Http\Controllers\ExpertiseController@matchingIndex');

    /*
     * Generic Categories
     */
    $api->get('categories/{type}', 'Fundator\Http\Controllers\CategoryController@index');


    /*
     * Notifications
     */
    $api->get('notifications/{userId}', 'Fundator\Http\Controllers\NotificationController@index');
    $api->post('notifications/user/{userId}/read', 'Fundator\Http\Controllers\NotificationController@markAllAsRead');
    $api->post('notifications/{id}/read', 'Fundator\Http\Controllers\NotificationController@markAsRead');

    /*
     * Transactions
     */

    $api->get('transactions', 'Fundator\Http\Controllers\TransactionController@index');
    $api->get('transactions/earnings/{type}', 'Fundator\Http\Controllers\TransactionController@earnings');
    // $api->get('transactions/{transactionId}', 'Fundator\Http\Controllers\NotificationController@index');

    /*
     * Confirmation
     */
    $api->get('confirmation/{id}', 'Fundator\Http\Controllers\ConfirmController@show');
    $api->put('confirmation/{id}', 'Fundator\Http\Controllers\ConfirmController@update');

    /*
     * Messages
     */
    $api->post('messages/', 'Fundator\Http\Controllers\MessagesController@store');
    $api->get('messages/{id}', 'Fundator\Http\Controllers\MessagesController@show');

    /*
     * Innovation Category
     * @author Xipetech
     */
    $api->get('innovationList', 'Fundator\Http\Controllers\UserController@innovationList');
    /*
     * Innovation Category
     * @author Xipetech
     */
    $api->get('creationList/', 'Fundator\Http\Controllers\UserController@creationList');

    /*
     * Create Review
     */
    $api->post('review/create/', 'Fundator\Http\Controllers\ReviewController@store');

    /*
     * Feed
     */
    $api->get('feed/show/', 'Fundator\Http\Controllers\FeedCtrl@index');

    /*
     * Followers
     */
    $api->post('follow/', 'Fundator\Http\Controllers\FollowController@follow');
    $api->post('unfollow/', 'Fundator\Http\Controllers\FollowController@unfollow');
    $api->post('check-follow/', 'Fundator\Http\Controllers\FollowController@checkFollow');

    //Filter
    $api->get('filter-categories/{type}',function($type){
        $select=['id','name'];
        if($type=='product_categories') {
            $data = \Fundator\ProductCategory::get($select);
        }
        else{
            $data = \Fundator\InnovationCategory::get($select);
        }
        return $data;
    });
});

Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');