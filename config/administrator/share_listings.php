<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Share Listings',

    'single' => 'Share Listing',

    'model' => 'Fundator\ShareListing',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'title' => array(
            'title' => 'Title'
        ),
        'user' => array(
            'title' => 'User',
            'relationship' => 'user',
            'select' => '(:table).name',
        ),
        'num_shares' => array(
            'title' => 'Number of Shares'
        ),
        'reserve_amount' => array(
            'title' => 'Reserve Amount (USD)',
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
        'user' => array(
            'type' => 'relationship',
            'title' => 'User',
            'name_field' => 'name'
        ),
        'title' => array(
            'title' => 'Name',
        ),
        'num_shares' => array(
            'title' => 'Number of Shares',
            'type' => 'number'
        ),
        'reserve_amount' => array(
            'title' => 'Reserve Amount (USD)',
            'type' => 'number',
            'decimals' => 2,
            'thousands_separator' => ',',
        ),
        'duration' => array(
            'title' => 'Duration',
            'type' => 'number'
        )
    ),

);