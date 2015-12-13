<?php

/**
 * Directors model config
 */

return array(

    'title' => 'Entry Revision',

    'single' => 'Entry Revision',

    'model' => 'Fundator\EntryRevision',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'name' => array(
            'title' => 'Name',
        ),
        'description' => array(
            'title' => 'Description',
        ),
        'entry' => array(
            'title' => 'Entry',
            'relationship' => 'entry',
            'select' => '(:table).name',
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
        'entry' => array(
            'type' => 'relationship',
            'title' => 'Entry',
            'name_field' => 'name',
        )
    ),

);