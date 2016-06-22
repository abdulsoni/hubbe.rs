<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Prizes',

    'single' => 'Prize',

    'model' => 'Fundator\Prize',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'contest' => array(
            'title' => 'Contest',
            'relationship' => 'contest',
            'select' => '(:table).name',
        ),
        'description' => array(
            'title' => 'Description'
        ),
        'prize' => array(
            'title' => 'Prize'
        ),
        'royalty' => array(
            'title' => 'Royalty'
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
        'contest' => array(
            'type' => 'relationship',
            'title' => 'Contest',
            'name_field' => 'name',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        ),
        'prize' =>  array(
            'type' => 'number',
            'title' => 'Price',
            'decimals' => 2,
            'thousands_separator' => ',',
            'decimal_separator' => '.',
        ),
        'royalty' =>  array(
            'type' => 'number',
            'title' => 'Royalty',
            'symbol' => '%',
            'decimals' => 0,
        )
    ),

);