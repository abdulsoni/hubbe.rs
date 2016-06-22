<?php

use Illuminate\Database\Seeder;
use Fundator\Entry;
use Fundator\Contest;
use Fundator\Creator;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contests = Contest::all();

        $creator = Creator::where('user_id', 1)->first();

        foreach($contests as $contest){
            $entry1 = Entry::create([
                'name' => 'Entry #1 : ' . $contest->name,
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            ]);

            $entry1->contest()->associate($contest);
            $entry1->creator()->associate($creator)->save();

            $entry2 = Entry::create([
                'name' => 'Entry #1 : ' . $contest->name,
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            ]);

            $entry2->contest()->associate($contest);
            $entry2->creator()->associate($creator)->save();

            $entry1->ratings()->create([
                'judge_id' => '3',
                'design' => rand(1, 10),
                'creativity' => rand(1, 10),
                'industrial' => rand(1, 10),
                'market' => rand(1, 10)
            ]);

            $entry1->ratings()->create([
                'judge_id' => '4',
                'design' => rand(1, 10),
                'creativity' => rand(1, 10),
                'industrial' => rand(1, 10),
                'market' => rand(1, 10)
            ]);

            $entry1->ratings()->create([
                'judge_id' => '5',
                'design' => rand(1, 10),
                'creativity' => rand(1, 10),
                'industrial' => rand(1, 10),
                'market' => rand(1, 10)
            ]);

            $entry2->ratings()->create([
                'judge_id' => '3',
                'design' => rand(1, 10),
                'creativity' => rand(1, 10),
                'industrial' => rand(1, 10),
                'market' => rand(1, 10)
            ]);

            $entry2->ratings()->create([
                'judge_id' => '4',
                'design' => rand(1, 10),
                'creativity' => rand(1, 10),
                'industrial' => rand(1, 10),
                'market' => rand(1, 10)
            ]);

            $entry2->ratings()->create([
                'judge_id' => '5',
                'design' => rand(1, 10),
                'creativity' => rand(1, 10),
                'industrial' => rand(1, 10),
                'market' => rand(1, 10)
            ]);
        }
    }
}
