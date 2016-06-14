<?php

namespace Fundator\Http\Controllers;

use Illuminate\Http\Request;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;

use Fundator\ProductCategory;
use Fundator\InnovationCategory;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($type)
    {
        $statusCode = 200;
        $response = [];

        $categories = [];

        switch ($type) {
            case 'innovation':
                $categories = InnovationCategory::where('visible', 1)->get();
                break;

            default:
                $categories = ProductCategory::where('visible', 1)->get();
                break;
        }

        $response = $categories;

        return response()->json($response, $statusCode, [], JSON_NUMERIC_CHECK);
    }
}
