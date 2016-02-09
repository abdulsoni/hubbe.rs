<?php

use Illuminate\Database\Seeder;
use Fundator\User;
use Fundator\Investor;
use Fundator\Creator;
use Fundator\Role;
use Fundator\Permission;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create permissions
        $judge = new Permission();
        $judge->name            = 'judge';
        $judge->display_name    = 'Can Judge ?';
        $judge->description  = 'This permission is given to a user who can judge a contest';
        $judge->save();


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
        $superExpert->attachPermission($judge);

        $investor = new Role();
        $investor->name         = 'investor';
        $investor->display_name = 'Investor';
        $investor->description  = '';
        $investor->save();
        $investor->attachPermission($judge);


        User::create([
            'name' => 'Udit',
            'email' => 'udit@eskaytech.com',
            'password' => bcrypt('etech'),
            'role' => 'creator'
        ])->roles()->attach($creator->id);

        User::create([
            'name' => 'Benjamin Vignon',
            'email' => 'benjamin@komprom.com',
            'password' => bcrypt('fundator'),
            'role' => 'creator'
        ])->roles()->attach($creator->id);

        User::create([
            'name' => 'Christophe Brissiaud',
            'email' => 'christophe@fundator.co',
            'password' => bcrypt('fundator'),
            'role' => 'investor'
        ])->roles()->attach($investor->id);

        User::create([
            'name' => 'Laura C.',
            'last_name' => 'Wilton',
            'email' => 'LauraCWilton@teleworm.us',
            'password' => bcrypt('fundator'),
            'role' => 'investor',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'us',
            'country_residence' => 'us',
            'contact_number' => '+1-510-489-3184',
            'contact_time' => '9-6'
        ])->roles()->attach($investor->id);


        User::create([
            'name' => 'Kristy R.',
            'last_name' => 'Black',
            'email' => 'KristyRBlack@armyspy.com',
            'password' => bcrypt('fundator'),
            'role' => 'investor',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'france',
            'country_residence' => 'france',
            'contact_number' => '+33 03.54.10.61.10',
            'contact_time' => '9-6'
        ])->roles()->attach($investor->id);


        User::create([
            'name' => 'Marcus R.',
            'last_name' => 'Didomenico',
            'email' => 'MarcusRDidomenico@dayrep.com',
            'password' => bcrypt('fundator'),
            'role' => 'investor',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'france',
            'country_residence' => 'france',
            'contact_number' => '+33 03.54.10.61.10',
            'contact_time' => '9-6'
        ])->roles()->attach($investor->id);

        User::create([
            'name' => 'Rosalie L.',
            'last_name' => 'Silva',
            'email' => 'RosalieLSilva@jourrapide.com',
            'password' => bcrypt('fundator'),
            'role' => 'investor',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'france',
            'country_residence' => 'france',
            'contact_number' => '+33 03.54.10.61.10',
            'contact_time' => '9-6'
        ])->roles()->attach($investor->id);

    }
}
