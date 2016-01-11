<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Entry Rating',

    'single' => 'Entry Rating',

    'model' => 'Fundator\EntryRating',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'entry' => array(
            'title' => 'Entry',
            'relationship' => 'entry',
            'select' => '(:table).name'
        ),
        'judge' => array(
            'title' => 'Judge',
            'relationship' => 'judge',
            'select' => '(:table).name'
        ),
        'design',
        'creativity',
        'industrial',
        'market'
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
        'entry' => array(
            'type' => 'relationship',
            'title' => 'Entry',
            'name_field' => 'name'
        ),
        'judge' => array(
            'type' => 'relationship',
            'title' => 'Judge',
            'name_field' => 'name'
        ),
        'design' => array(
            'title' => 'Design'
        ),
        'creativity' => array(
            'title' => 'Creativity'
        ),
        'industrial' => array(
            'title' => 'Industrial'
        ),
        'market' => array(
            'title' => 'Market P.'
        )
    ),

);