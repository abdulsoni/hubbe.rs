<?php

use Fundator\Expert;
use Fundator\Events\ProjectApproved;
use Fundator\Events\ProjectBidSuperExpert;

/**
 * Directors model config
 */

return array(

    'title' => 'Projects',

    'single' => 'Project',

    'model' => 'Fundator\Project',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'creator' => array(
            'title' => 'Creator',
            'relationship' => 'creator.user',
            'select' => 'name',
        ),
        'name' => array(
            'title' => 'Name',
        ),
        'state' => array(
            'title' => 'State',
        ),
        'draft' => array(
            'title' => 'Is Draft ?',
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
        'creator' => array(
            'type' => 'relationship',
            'title' => 'Creator',
            'name_field' => 'name'
        ),
        'thumbnail' => array(
            'title' => 'Image (350 x 370)',
            'type' => 'image',
            'naming' => 'random',
            'location' => public_path() . '/',
            'size_limit' => 2,
            'sizes' => array(
                array(350, 370, 'crop', public_path() . '/resize/', 100),
            )
        ),
        'name' => array(
            'title' => 'Name',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        ),
        'start_time' => array(
            'title' => 'Start Date',
            'type' => 'date'
        ),
        'duration' => array(
            'title' => 'Duration',
            'type' => 'number'
        )
    ),

    /**
     * Notify Judges
     */
    'actions' => array(
        // Send Notifications to judges
        'approve_project' => array(
            'title' => 'Approve Project',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving the project',
            ),
            'permission' => function($model)
            {
                return $model->state == 1;
            },
            'action' => function($model)
            {
                // Notify the judges
                Log::info('Approved');

                try{
                    $model->state = 2;

                    $superExpert = Expert::where('super_expert', 1)->first();

                    Event::fire(new ProjectApproved($model));
                    Event::fire(new ProjectBidSuperExpert($model, $superExpert));

                    if ($model->save()) {
                        return true;
                    }
                }catch (Exception $e){
                    Log::error($e);
                }

                return false;
            }
        )
    ),
);