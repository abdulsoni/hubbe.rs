<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Skills',

    'single' => 'Skill',

    'model' => 'Fundator\Skill',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name'
        ),
        'description' => array(
            'title' => 'Description'
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
        'name' => array(
            'title' => 'Name',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        ),
        'parent' => array(
            'type' => 'relationship',
            'title' => 'Parent',
            'name_field' => 'name',
        )
    ),

);