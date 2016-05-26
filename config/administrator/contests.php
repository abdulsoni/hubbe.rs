<?php
use Fundator\Events\AssignJury;

/**
 * Directors model config
 */

return array(

    'title' => 'Contests',

    'single' => 'Contest',

    'model' => 'Fundator\Contest',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name',
        ),
        'num_entries' => array(
            'title' => '# entries',
            'relationship' => 'entries',
            'select' => 'COUNT((:table).id)',
        ),
        'num_prizes' => array(
            'title' => '# prizes',
            'relationship' => 'prizes',
            'select' => 'COUNT((:table).id)',
        ),
        'visible' => array(
            'title' => 'Visible ?'
        )
    ),

    /**
     * The width of the model's edit form
     *
     * @type int
     */
    'form_width' => 500,

    /**
     * The editable fields
     */
    'edit_fields' => array(
        'id',
        'thumbnail' => array(
            'title' => 'Image (350 x 370)',
            'type' => 'image',
            'naming' => 'random',
            'location' => public_path() . '/',
            'size_limit' => 2,
            'sizes' => array(
                array(350, 370, 'crop', public_path() . '/contests/cropped/', 100),
            )
        ),
        'name' => array(
            'title' => 'Name',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        ),
        'rules' => array(
            'title' => 'Official Rules',
            'type' => 'wysiwyg'
        ),
        'start_time' => array(
            'title' => 'Start Date',
            'type' => 'date'
        ),
        'duration' => array(
            'title' => 'Duration',
            'type' => 'text'
        ),
        'visible' => array(
            'type' => 'bool',
            'title' => 'Visible ?',
        )
        // ,
        // 'jury' => array(
        //     'type' => 'relationship',
        //     'title' => 'Jury',
        //     'name_field' => 'name'
        // )
    ),

    /**
     * Notify Judges
     */
    // 'actions' => array(

    //     // Send Notifications to judges
    //     'notify_judges' => array(
    //         'title' => 'Notify Judges',
    //         'messages' => array(
    //             'active' => 'Notifying ...',
    //             'success' => 'All Judges were notified',
    //             'error' => 'There was an error while notifying the judges',
    //         ),
    //         'permission' => function($model)
    //         {
    //             return $model->jury->count() >= 1;
    //         },
    //         'action' => function($model)
    //         {
    //             // Notify the judges


    //             try{
    //                 foreach($model->jury as $judge){
    //                     Event::fire(new AssignJury($model, $judge));
    //                 }

    //                 return true;
    //             }catch (Exception $e){
    //                 Log::error($e);
    //             }

    //             return false;
    //         }
    //     )

    // ),
);