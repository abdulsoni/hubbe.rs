<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Share Bids',

    'single' => 'Share Bid',

    'model' => 'Fundator\ShareBid',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'user' => array(
            'title' => 'User',
            'relationship' => 'user',
            'select' => '(:table).name',
        ),
        'shareListing' => array(
            'title' => 'Share Listing',
            'relationship' => 'ShareListing',
            'select' => '(:table).title',
        ),
        'num_shares' => array(
            'title' => 'Number of Shares'
        ),
        'bid_amount' => array(
            'title' => 'Bid Amount (USD)',
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
        'shareListing' => array(
            'type' => 'relationship',
            'title' => 'Share Listing',
            'name_field' => 'title'
        ),
        'num_shares' => array(
            'title' => 'Number of Shares',
            'type' => 'number'
        ),
        'bid_amount' => array(
            'title' => 'Bid Amount (USD)',
            'type' => 'number',
            'decimals' => 2,
            'thousands_separator' => ',',
        )
    ),

);