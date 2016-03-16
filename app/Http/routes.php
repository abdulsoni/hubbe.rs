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

/*
 * Authentication Routes
 */
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

    /*
     * Authentication
     */
    $api->get('users', 'Fundator\Http\Controllers\AuthenticateController@index');
    $api->get('user', 'Fundator\Http\Controllers\UserController@show');
    $api->put('users/{id}', 'Fundator\Http\Controllers\UserController@update');

    $api->post('users/becomeJudge', 'Fundator\Http\Controllers\UserController@becomeJudge');
    $api->post('users/becomeContestant', 'Fundator\Http\Controllers\UserController@becomeContestant');

    $api->get('users/sideNavigationData', 'Fundator\Http\Controllers\UserController@sideNavigationData');

    $api->post('authenticate', 'Fundator\Http\Controllers\AuthenticateController@authenticate');
    $api->post('authenticate/signup', 'Fundator\Http\Controllers\AuthenticateController@signup');
    $api->post('authenticate/confirm', 'Fundator\Http\Controllers\AuthenticateController@confirm');

    $api->post('authenticate/reset', 'Fundator\Http\Controllers\Auth\PasswordController@appReset');
    $api->post('authenticate/forgot', 'Fundator\Http\Controllers\Auth\PasswordController@appRecoverPasswordSend');
    $api->post('authenticate/recover', 'Fundator\Http\Controllers\Auth\PasswordController@appRecoverPasswordProcess');

    // Providers
    $api->post('authenticate/facebook', 'Fundator\Http\Controllers\AuthenticateController@facebook');
    $api->post('authenticate/google', 'Fundator\Http\Controllers\AuthenticateController@google');
    $api->post('authenticate/linkedin', 'Fundator\Http\Controllers\AuthenticateController@linkedin');
    $api->get('authenticate/linkedin', 'Fundator\Http\Controllers\AuthenticateController@linkedin');

    /*
     * Contests
     */
    $api->get('contests/', 'Fundator\Http\Controllers\ContestController@index');
    $api->get('contests/{id}', 'Fundator\Http\Controllers\ContestController@show');

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
     * Investors
     */
    $api->get('investors/', 'Fundator\Http\Controllers\UserController@indexInvestor');
    $api->get('investors/{id}', 'Fundator\Http\Controllers\UserController@showInvestor');

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
    $api->get('expertise/category/{category}', 'Fundator\Http\Controllers\ExpertiseController@index');
    $api->get('expertise/{id}/skills', 'Fundator\Http\Controllers\ExpertiseController@skills');
    $api->get('expertise-category/{parent?}', 'Fundator\Http\Controllers\ExpertiseCategoryController@index');

    $api->get('skills/', 'Fundator\Http\Controllers\SkillsController@index');


    /*
     * Notifications
     */
    $api->get('notifications/{userId}', 'Fundator\Http\Controllers\NotificationController@index');
    $api->post('notifications/user/{userId}/read', 'Fundator\Http\Controllers\NotificationController@markAllAsRead');
    $api->post('notifications/{id}/read', 'Fundator\Http\Controllers\NotificationController@markAsRead');
});