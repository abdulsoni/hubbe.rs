<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Roles',

    'single' => 'Role',

    'model' => 'Fundator\Role',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name',
        ),
        'display_name' => array(
            'title' => 'Display Name',
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
        'name' => array(
            'title' => 'Name'
        ),
        'display_name' => array(
            'title' => 'Display Name'
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'textarea'
        ),
    ),

);