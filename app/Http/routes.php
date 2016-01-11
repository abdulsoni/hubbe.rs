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
    $api->post('authenticate', 'Fundator\Http\Controllers\AuthenticateController@authenticate');
    $api->get('user', 'Fundator\Http\Controllers\AuthenticateController@getUser');
    $api->get('users', 'Fundator\Http\Controllers\AuthenticateController@index');

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
    $api->post('entries/', 'Fundator\Http\Controllers\EntryController@store');
    $api->put('entries/{id}', 'Fundator\Http\Controllers\EntryController@update');

});