<?php

namespace Fundator\Http\Controllers;

use Fundator\Page;
use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Response;

class PageController extends Controller
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
     * Display the specified resource.
     *
     * @param  String  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $statusCode = 200;

        try{
            $page = Page::where('slug', $slug)->first();

            if(!is_null($page)){
                $response = $page->getAttributes();
            }else{
                $statusCode = 404;
                $response = ['error' => 'Page not Found'];
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response = ['error' => $e->getMessage()];
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

}
