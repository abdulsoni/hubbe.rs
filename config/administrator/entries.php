<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Entries',

    'single' => 'Entry',

    'model' => 'Fundator\Entry',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name',
        ),
        'contest' => array(
            'title' => 'Contest',
            'relationship' => 'contest',
            'select' => 'name',
        ),
        'creator' => array(
            'title' => 'Creator',
            'relationship' => 'creator.user',
            'select' => 'name',
        ),
        'description' => array(
            'title' => 'Description',
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
        'contest' => array(
            'type' => 'relationship',
            'title' => 'Contest',
            'name_field' => 'name'
        ),
        'creator' => array(
            'type' => 'relationship',
            'title' => 'Creator',
            'name_field' => 'name'
        )
    ),

);