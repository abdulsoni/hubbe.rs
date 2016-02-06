<?php

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
        'name' => array(
            'title' => 'Name',
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

);