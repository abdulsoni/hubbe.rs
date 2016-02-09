<?php

use Illuminate\Database\Seeder;
use Fundator\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $project = Project::create([
            'name' => 'Fundator',
            'description' => 'Lorem Ipsum',
            'start_time' => new DateTime(),
            'duration' => 365,
        ]);
    }
}
