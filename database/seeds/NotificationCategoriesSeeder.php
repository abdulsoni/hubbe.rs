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


        // Jury Related Notifications
        $this->createCategory('jury.invited', 'You have been invited to judge the contest - <a ui-sref="app.contestsingle({contestId: extra.contest.id})">{extra.contest.name}</a>.');
        $this->createCategory('jury.removed', 'You have been removed as a judge from the contest - <a ui-sref="app.contestsingle({contestId: extra.contest.id})">{extra.contest.name}</a>.');

        $this->createCategory('jury.entry.new', 'There is a new entry by {} under the contest {}');
        $this->createCategory('jury.entry.revised', 'There is a revised entry by {} under the contest {}');

        // Contestant related notifications
        $this->createCategory('contestant.accepted', 'There is a new rating on your entry on {}');
        $this->createCategory('contestant.rating', 'There is a new rating on your entry on {}');
    }

    public function createCategory($name,$text) {
        NotificationCategory::create([
            'name' => $name,
            'text' => $text
        ]);
    }

}