<?php

use Illuminate\Database\Seeder;
use Fenos\Notifynder\Models\NotificationCategory;

class NotificationCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Create the programs
         */

        $this->createCategory('user.created', 'Your account has been created!');
        $this->createCategory('user.jury', 'You have been invited to judge the contest {extra.contest_name}.');


    }

    public function createCategory($name,$text) {
        NotificationCategory::create([
            'name' => $name,
            'text' => $text
        ]);
    }

}