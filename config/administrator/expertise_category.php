<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Expertise Categories',

    'single' => 'Expertise Category',

    'model' => 'Fundator\ExpertiseCategory',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'parent' => array(
            'title' => 'Parent Category',
            'relationship' => 'parent',
            'select' => '(:table).name'
        ),
        'name' => array(
            'title' => 'Name'
        ),
        'description' => array(
            'title' => 'Description'
        ),
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
        'parent' => array(
            'type' => 'relationship',
            'title' => 'Parent',
            'name_field' => 'name'
        ),
        'name' => array(
            'title' => 'Name'
        ),
        'description' => array(
            'title' => 'Description'
        )
    ),

);