<?php

use Illuminate\Database\Seeder;
use Fundator\Entry;
use Fundator\Contest;
use Fundator\User;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $contest = Contest::find(1);
//
//        $user1 = User::find(1);
//        $user2 = User::find(2);

        $entry1 = Entry::create([
            'name' => 'Exercitation ullamco',
            'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ]);

        $entry2 = Entry::create([
            'name' => 'Exercitation ullamco',
            'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ]);

//        $contest->contestants()->attach($user1->id, [
//           'entry_id' => $entry1->id
//        ]);
//
//        $contest->contestants()->attach($user2->id, [
//            'entry_id' => $entry2->id
//        ]);
    }
}
