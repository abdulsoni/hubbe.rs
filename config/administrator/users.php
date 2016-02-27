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
        'bio' => array(
            'title' => 'Short Bio',
            'type' => 'textarea'
        ),
        'role' => array(
            'type' => 'enum',
            'title' => 'Role',
            'options' => array(
                'creator' => 'Creator',
                'expert' => 'Expert',
                'super_expert' => 'Super Expert',
                'investor' => 'Investor'
            ),
        ),
    ),

);