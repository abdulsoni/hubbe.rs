<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Pages',

    'single' => 'Page',

    'model' => 'Fundator\Page',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'title' => array(
            'title' => 'Title'
        ),
        'slug' => array(
            'title' => 'Slug'
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
        'title' => array(
            'title' => 'Title'
        ),
        'slug' => array(
            'title' => 'Slug'
        ),
        'content' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        )
    ),

);