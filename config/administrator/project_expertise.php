<?php

use Fundator\Confirm;

/**
 * Directors model config
 */

return array(

    'title' => 'Project Expertise',

    'single' => 'Project Expertise',

    'model' => 'Fundator\ProjectExpertise',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'project' => array(
            'title' => 'Project',
            'relationship' => 'project',
            'select' => 'name',
        ),
        'expertise' => array(
            'title' => 'Expertise',
            'relationship' => 'expertise',
            'select' => 'name',
        ),
        'task' => array(
            'title' => 'Name',
        ),
        'budget' => array(
            'title' => 'Budget',
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
        'project' => array(
            'type' => 'relationship',
            'title' => 'Project',
            'name_field' => 'name'
        ),
        'expertise' => array(
            'type' => 'relationship',
            'title' => 'Expertise',
            'name_field' => 'name'
        ),
        'task' => array(
            'title' => 'Description',
            'type' => 'textarea'
        ),
        'budget' => array(
            'title' => 'Name',
        ),
        'lead_time' => array(
            'title' => 'Name',
        ),
        'start_date' => array(
            'title' => 'Start Date',
            'type' => 'date'
        )
    ),

    /**
     * Project Expertise Actions
     */
    'actions' => array(
        // Send Notifications to judges
        'confirm' => array(
            'title' => 'Confirm (as Super Expert)',
            'messages' => array(
                'active' => 'Confirming ...',
                'success' => 'Confirmed',
                'error' => 'There was an error while confirming this expertise',
            ),
            'permission' => function($model)
            {
                return !is_null($model->confirmation) && $model->confirmation->confirm_status == 0;
            },
            'action' => function($model)
            {
                // Notify the judges
                Log::info('Project Expertise Confirmed');

                try{
                    $confirm = Confirm::find($model->confirmation->id);

                    $confirm->confirm_status = 1;
                    $confirm->confirm_time = Carbon\Carbon::now();

                    if ($confirm->save()) {
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