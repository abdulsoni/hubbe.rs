<?php


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
        // 'project' => array(
        //     'title' => 'Creator',
        //     'relationship' => 'project',
        //     'select' => 'name',
        // ),
        // 'expertise' => array(
        //     'title' => 'Expertise',
        //     'relationship' => 'expertise',
        //     'select' => 'name',
        // ),
        'task' => array(
            'title' => 'Name',
        ),
        'budget' => array(
            'title' => 'State',
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
);