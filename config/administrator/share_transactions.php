<?php
use Fundator\Events\AssignJury;

/**
 * Directors model config
 */

return array(

    'title' => 'Shares Transactions',

    'single' => 'Share Transaction',

    'model' => 'Trexology\Pointable\Models\Transaction',

    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'amount' => array(
            'title' => 'Amount',
        ),
        'message' => array(
            'title' => 'Message',
        ),
        'created_at' => array(
            'title' => 'Created At',
        ),
        'updated_at' => array(
            'title' => 'Updated At',
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
        'pointable' => array(
            'type' => 'relationship',
            'title' => 'User',
            'name_field' => 'name'
        ),
        'amount' => array(
            'title' => 'Amount',
        ),
        'message' => array(
            'title' => 'Message',
            'type' => 'wysiwyg'
        )
    ),
);