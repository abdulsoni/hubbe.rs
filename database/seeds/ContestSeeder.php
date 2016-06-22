<?php

use Illuminate\Database\Seeder;
use Fundator\Contest;

class ContestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Create sample course
         */

        $contest1 = Contest::create([
            'name' => 'Thistle Wisent',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'start_time' => new DateTime(),
            'duration' => 60,
            'rules' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'visible' => 1
        ]);

        $contest2 = Contest::create([
            'name' => 'Tulip Ithomiid',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'start_time' => new DateTime(),
            'duration' => 60,
            'rules' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'visible' => 1
        ]);

        $contest3 = Contest::create([
            'name' => 'Iris Oystercatcher',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'start_time' => new DateTime(),
            'duration' => 60,
            'rules' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'visible' => 1
        ]);

        $contest4 = Contest::create([
            'name' => 'Poppy Acipenser',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'start_time' => new DateTime(),
            'duration' => 60,
            'rules' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'visible' => 1
        ]);

    }
}
