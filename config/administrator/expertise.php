<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Expertise',

    'single' => 'Expertise',

    'model' => 'Fundator\Expertise',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name'
        ),
        'expertiseCategory' => array(
            'title' => 'Expertise Category',
            'relationship' => 'expertiseCategory',
            'select' => '(:table).name'
        ),
        'skills' => array(
            'title' => 'No. Skills',
            'relationship' => 'skills',
            'select' => 'COUNT((:table).id)'
        ),
        'visible' => array(
            'title' => 'Published ?'
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
        'expertiseCategory' => array(
            'type' => 'relationship',
            'title' => 'Expertise',
            'name_field' => 'name'
        ),
        'name' => array(
            'title' => 'Name'
        ),
        'skills' => array(
            'type' => 'relationship',
            'title' => 'Skills',
            'name_field' => 'name'
        ),
        'visible' => array(
            'type' => 'bool',
            'title' => 'Published ?',
        )
    ),

);