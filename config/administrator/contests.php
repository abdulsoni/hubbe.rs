<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Contests',

    'single' => 'Contest',

    'model' => 'Fundator\Contest',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name',
        ),
        'num_entries' => array(
            'title' => '# entries',
            'relationship' => 'entries',
            'select' => 'COUNT((:table).id)',
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
            'title' => 'Name',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        ),
        'start_time' => array(
            'title' => 'Start Date',
            'type' => 'date'
        ),
        'budget' => array(
            'title' => 'Budget',
            'type' => 'number',
            'decimals' => 2,
            'thousands_separator' => ',',
            'decimal_separator' => '.'
        ),
        'currency' => array(
            'title' => 'Currency',
            'type' => 'enum',
            'options' => array(
                'USD' => '$',
                'CNY' => '¥',
                'HKD' => 'HK$'
            ),
        )
    ),

);