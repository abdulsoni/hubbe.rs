<?php

use Illuminate\Database\Seeder;
use Fundator\Skill;
use Fundator\ExpertiseCategory;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $skills = [
            ['name' => 'Communication', 'description' => ''],
            ['name' => 'Relationship Management', 'description' => ''],
            ['name' => 'Marketing and Sales', 'description' => ''],
            ['name' => 'Project Management', 'description' => ''],
            ['name' => 'Problem-Solving', 'description' => ''],

            ['name' => 'Ruby ', 'description' => ''],
            ['name' => 'ASP.NET', 'description' => ''],
            ['name' => 'AJAX', 'description' => ''],
            ['name' => 'Objective-C', 'description' => ''],
            ['name' => 'PHP', 'description' => ''],
            ['name' => 'Python', 'description' => ''],
            ['name' => 'Perl ', 'description' => ''],
            ['name' => 'C', 'description' => ''],
            ['name' => 'C#', 'description' => ''],
            ['name' => 'XML', 'description' => ''],
            ['name' => 'C++', 'description' => ''],
            ['name' => 'JavaScript', 'description' => ''],
            ['name' => 'HTML', 'description' => ''],
            ['name' => 'Java', 'description' => ''],
            ['name' => 'SQL ', 'description' => ''],
        ];

        Skill::insert($skills);


        // Expertise Category

        $parent = ExpertiseCategory::create([
            'name' => 'Manage a team',
            'description' => ''
        ]);

        ExpertiseCategory::create([
            'name' => 'Manage a team of Front End developers',
            'description' => ''
        ])->parent()->associate($parent)->save();
    }
}
