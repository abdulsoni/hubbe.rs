<?php

use Efriandika\LaravelSettings\Facades\Settings;

/**
 * The main site settings page
 */

return array(

    /**
     * Settings page title
     *
     * @type string
     */
    'title' => 'Site Settings',

    /**
     * The edit fields array
     *
     * @type array
     */
    'edit_fields' => array(
        'site_name' => array(
            'title' => 'Site Name',
            'type' => 'text',
            'limit' => 50,
        ),
        'logo' => array(
            'title' => 'Image (200 x 150)',
            'type' => 'image',
            'naming' => 'random',
            'location' => public_path(),
            'size_limit' => 2,
            'sizes' => array(
                array(200, 150, 'crop', public_path() . '/resize/', 100),
            )
        ),
        'share_value' => array(
            'title' => 'Share Value',
            'type' => 'number',
            'symbol' => '$',
            'decimals' => 2,
            'thousands_separator' => ',',
            'decimal_separator' => '.'
        ),
        'total_shares' => array(
            'title' => 'Total Shares',
            'type' => 'number'
        ),
    ),

    /**
     * The validation rules for the form, based on the Laravel validation class
     *
     * @type array
     */
    'rules' => array(
        'site_name' => 'required|max:50',
    ),

    /**
     * This is run prior to saving the JSON form data
     *
     * @type function
     * @param array		$data
     *
     * @return string (on error) / void (otherwise)
     */
    'before_save' => function(&$data)
    {
        Config::set('app.site_name', $data['site_name']);
        Settings::set('share_value', $data['share_value']);
    },

    /**
     * The permission option is an authentication check that lets you define a closure that should return true if the current user
     * is allowed to view this settings page. Any "falsey" response will result in a 404.
     *
     * @type closure
     */
    'permission'=> function()
    {
        return true;
        //return Auth::user()->hasRole('developer');
    }
);