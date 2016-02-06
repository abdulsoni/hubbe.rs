<?php

use Fundator\Investor;

/**
 * Directors model config
 */

return array(

    'title' => 'Investments',

    'single' => 'Investment',

    'model' => 'Fundator\Investment',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'investor' => array(
            'title' => 'Investor',
            'relationship' => 'investor.user',
            'select' => '(:table).name',
        ),
        'project' => array(
            'title' => 'Project',
            'relationship' => 'project',
            'select' => 'name',
        ),
        'type' => array(
            'title' => 'Type',
        ),
        'amount' => array(
            'title' => 'Amount (USD)',
        ),
        'equity' => array(
            'title' => 'Equity (%)',
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
        'investor' => array(
            'type' => 'relationship',
            'title' => 'Investor',
            'name_field' => 'name'
        ),
        'project' => array(
            'type' => 'relationship',
            'title' => 'Project',
            'name_field' => 'name'
        ),
        'type' => array(
            'title' => 'Type',
            'type' => 'enum',
            'options' => [
                'amount' => 'Amount',
                'equity' => 'Equity'
            ]
        ),
        'amount' => array(
            'title' => 'Amount (USD)',
            'type' => 'number',
            'decimals' => 2,
            'thousands_separator' => ',',
            'decimal_separator' => '.'
        ),
        'equity' => array(
            'title' => 'Equity (%)',
            'type' => 'number',
            'decimals' => 2
        ),
    ),

);