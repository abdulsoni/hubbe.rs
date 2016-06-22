<?php

use Illuminate\Database\Seeder;
use Fundator\Currency;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Currency::create([
            'name' => 'USD',
            'symbol' => '$'
        ]);

        Currency::create([
            'name' => 'RMB',
            'symbol' => '¥'
        ]);

        Currency::create([
            'name' => 'HKD',
            'symbol' => 'HK$'
        ]);
    }
}
