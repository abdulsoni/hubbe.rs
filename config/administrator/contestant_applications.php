<?php

/**
 * Directors model config
 */

return array(

    'title' => 'ContestantApplications',

    'single' => 'ContestantApplication',

    'model' => 'Fundator\ContestantApplication',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'user' => array(
            'title' => 'User',
            'relationship' => 'user',
            'select' => '(:table).name',
        ),
        'contest' => array(
            'title' => 'Project',
            'relationship' => 'contest',
            'select' => 'name',
        ),
        'created_at' => array(
            'title' => 'Date of Application',
        ),
        'status' => array(
            'title' => 'Approved ?',
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
        'user' => array(
            'type' => 'relationship',
            'title' => 'User',
            'name_field' => 'name'
        ),
        'contest' => array(
            'type' => 'relationship',
            'title' => 'Contest',
            'name_field' => 'name'
        ),
        'status' => array(
            'type' => 'bool',
            'title' => 'Approved ?',
        )
    ),
);