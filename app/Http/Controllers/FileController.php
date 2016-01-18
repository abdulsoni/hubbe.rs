<?php

namespace Fundator\Http\Controllers;

use Fundator\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Input;

use Fundator\Http\Requests;
use Fundator\Http\Controllers\Controller;
use Fundator\File;
use Exception;

class FileController extends Controller
{

    private $destinationPath = 'uploads';

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
        $statusCode = 200;
        $response = [];

        try {
            if (Input::hasFile('file')) {
                $file = Input::file('file');

                $extension = $file->getClientOriginalExtension();
                $fileName = Str::slug($file->getClientOriginalName()) . '-' . rand(11111,99999) . '.' . $extension;

                $file->move($this->destinationPath, $fileName);

                $fileTitle = $request->title !== null ? $request->title : $file->getClientOriginalName();

                $fileEntry = File::create([
                    'title' => $fileTitle,
                    'file_name' => $fileName,
                    'extension' => $extension,
                    'file_size' => $file->getClientSize(),
                    'file_url' => $this->destinationPath . '/' . $fileName
                ]);

                if(isset($request->attach))
                {
                    switch($request->attach)
                    {
                        case 'thumbnail':
                            $user = User::where('id', $request->user_id)->first();
                            $user->thumbnail()->associate($fileEntry);
                            $user->save();
                            break;
                    }
                }

                $response = $fileEntry;
            }
        }catch (Exception $e){
            $statusCode = 400;
            $response['error'] = $e;
        }

        return new Response($response, $statusCode);
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
