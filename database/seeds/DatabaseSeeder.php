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

        $this->call(UserTableSeeder::class);

        $this->call(ContestSeeder::class);
        $this->command->info('Contests Seeded');

        $this->call(EntrySeeder::class);
        $this->command->info('Entries Seeded');

//        $this->call(CurrencySeeder::class);
//        $this->command->info('Currency Seeded');

        Model::reguard();
    }
}
