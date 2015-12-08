<?php

namespace Fundator\Http\Controllers;

use Fundator\Http\Controllers\Controller;

class AppController extends Controller
{
    public function serveApp()
    {
        return view('app');
    }
}
