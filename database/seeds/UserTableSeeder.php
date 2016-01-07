<?php

use Illuminate\Database\Seeder;
use Fundator\User;
use Fundator\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Roles
        $creator = new Role();
        $creator->name         = 'creator';
        $creator->display_name = 'Creator';
        $creator->description  = 'User is the creator of projects on the website';
        $creator->save();

        $expert = new Role();
        $expert->name         = 'expert';
        $expert->display_name = 'Expert';
        $expert->description  = 'User is the expert who will work on the projects';
        $expert->save();

        $superExpert = new Role();
        $superExpert->name         = 'super_expert';
        $superExpert->display_name = 'Super Expert';
        $superExpert->description  = 'Super experts manage all projects while working with creators on each step';
        $superExpert->save();

        $investor = new Role();
        $investor->name         = 'investor';
        $investor->display_name = 'Investor';
        $investor->description  = '';
        $investor->save();

        User::create([
            'name' => 'Udit',
            'email' => 'udit@eskaytech.com',
            'password' => bcrypt('etech'),
        ])->roles()->attach($creator->id);

        User::create([
            'name' => 'Benjamin Vignon',
            'email' => 'benjamin@komprom.com',
            'password' => bcrypt('fundator'),
        ])->roles()->attach($creator->id);
    }
}
