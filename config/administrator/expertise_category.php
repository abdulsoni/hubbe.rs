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
        ),
        'visible' => array(
            'type' => 'bool',
            'title' => 'Published ?',
        ),
        'background_color' => array(
            'type' => 'color',
            'title' => 'Background Color'
        ),
        'icon' => array(
            'title' => 'Icon',
            'type' => 'image',
            'location' => public_path() . '/uploads/expertise_categories/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2,
            'sizes' => array(
                array(100, 100, 'crop', public_path() . '/uploads/expertise_categories/cropped/', 100),
            )
        )
    ),
);