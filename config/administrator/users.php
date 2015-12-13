<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Users',

    'single' => 'User',

    'model' => 'Fundator\User',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name',
        ),
        'email' => array(
            'title' => 'Email',
        ),
        'role' => array(
            'title' => 'Role',
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
        'email' => array(
            'title' => 'Email'
        ),
        'role' => array(
            'type' => 'enum',
            'title' => 'Role',
            'options' => array('Creator', 'Expert', 'Super Expert', 'Investor'),
        ),
    ),

);