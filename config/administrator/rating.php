<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Rating',

    'single' => 'Rating',

    'model' => 'willvincent\Rateable\Rateable',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'user_id',
        'rating',
        'rateable_id',
        'rateable_type'
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
        'user_id',
        'rating',
        'rateable_id',
        'rateable_type'
    ),

);