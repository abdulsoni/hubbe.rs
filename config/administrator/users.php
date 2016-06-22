<?php

/**
 * Directors model config
 */

use Fundator\Events\Signup;
use Illuminate\Support\Facades\Event;

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
        ),
        'created_at' => array(
            'title' => 'Registration Date',
        ),
       'rating'=> array(
            'title' => 'Rating'
        ),
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
            'title' => 'Primary Role',
            'options' => array(
                'creator' => 'Creator',
                'expert' => 'Expert',
                'super_expert' => 'Super Expert',
                'investor' => 'Investor'
            ),
        ),
        'roles' => array(
            'type' => 'relationship',
            'title' => 'All Roles',
            'name_field' => 'display_name'
        ),
        'rating'=> array(
            'title' => 'Rating'
        ),
    ),

    'actions' => array(
        'send_password' => array(
            'title' => 'Send Password',
            'messages' => array(
                'active' => 'Sending ...',
                'success' => 'Password Sent',
                'error' => 'Cannot send password to the user',
            ),
            'permission' => function($model)
            {
                return $model->confirmed === 1;
            },
            'action' => function($model)
            {
                // Send the password

                try{

                    $model->password = bcrypt(str_random(8));
                    $model->confirmation_code = str_random(30);
                    $model->save();

                    Event::fire(new Signup($model));

                    return true;
                }catch (Exception $e){
                    Log::error($e);
                }

                return false;
            }
        ),
        'suspend_user' => array(
            'title' => 'Suspend User',
            'messages' => array(
                'active' => 'Suspending ...',
                'success' => 'User Suspended',
                'error' => 'Cannot suspend the user',
            ),
            'permission' => function($model)
            {
                return $model->suspended === 0;
            },
            'action' => function($model)
            {
                // Send the password
                try{

                    $model->suspended = 1;
                    $model->save();

                    return true;
                }catch (Exception $e){
                    Log::error($e);
                }

                return false;
            }
        ),
        'unsuspend_user' => array(
            'title' => 'Restore User',
            'messages' => array(
                'active' => 'Restoreing ...',
                'success' => 'User Restore',
                'error' => 'Cannot restore the user',
            ),
            'permission' => function($model)
            {
                return $model->suspended === 1;
            },
            'action' => function($model)
            {
                // Send the password
                try{

                    $model->suspended = 0;
                    $model->save();

                    return true;
                }catch (Exception $e){
                    Log::error($e);
                }

                return false;
            }
        )
    )

);