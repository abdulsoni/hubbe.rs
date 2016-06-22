<?php

namespace Fundator\Http\Controllers;

use Fundator\ExpertiseCategory;
use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Exception;

class ExpertiseCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param null $parent
     * @return \Illuminate\Http\Response
     */
    public function index($parent = null)
    {
        $statusCode = 200;
        $response = [];
        $categories = ExpertiseCategory::where('visible', true)->get();

        if(!is_null($parent)){
            if($parent == 0){
                $categories = ExpertiseCategory::whereNull('parent_id')->where('visible', true)->get();
            }else{
                $categories = ExpertiseCategory::where('parent_id', $parent)->where('visible', true)->get();
            }
        }

        try{
            foreach($categories as $category)
            {
                $category_data = $category->getAttributes();

                $response[] = $category_data;
            }
        }catch(Exception $e){
            $statusCode = 400;
            $response = $e;
        }

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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
}
