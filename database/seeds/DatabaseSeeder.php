<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call(UserTableSeeder::class);

        // $this->call(ContestSeeder::class);
        // $this->command->info('Contests Seeded');

        // $this->call(ProjectSeeder::class);
        // $this->command->info('Project Seeded');

        // $this->call(EntrySeeder::class);
        // $this->command->info('Entries Seeded');

        // $this->call(SkillsSeeder::class);
        // $this->command->info('Skills Seeded');

        // $this->call(NotificationCategoriesSeeder::class);
        // $this->command->info('Notifications Category Seeded');

        $this->call(ProductCategorySeeder::class);
        $this->command->info('Product Category Seeded');

        Model::reguard();
    }
}
