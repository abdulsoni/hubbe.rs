<?php

namespace Fundator\Http\Middleware;

use Closure;

class Cors
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // if ($request->isMethod('options')) {
        //     return response('', 200)
        //       ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
        //       ->header('Access-Control-Allow-Headers', 'accept, content-type,
        //         x-xsrf-token, x-csrf-token');
        // }

        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            // ->header('Access-Control-Allow-Credentials', 'true')
            // ->header('Access-Control-Max-Age', '10000')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            // ->header('Access-Control-Allow-Origin', '$_SERVER['HTTP_ORIGIN']')
            // Depending of your application you can't use '*'
            // Some security CORS concerns
    }
}