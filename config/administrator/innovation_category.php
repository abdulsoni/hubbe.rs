<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Innovation Categories',

    'single' => 'Innovation Category',

    'model' => 'Fundator\InnovationCategory',

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
        )
    ),
);