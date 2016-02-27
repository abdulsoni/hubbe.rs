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
            'role' => 'creator',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'us',
            'country_residence' => 'us',
            'contact_number' => '+1-510-489-3184',
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis error dolor similique dolorum ratione fugit quam fuga modi, dignissimos deserunt libero accusantium esse sequi accusamus nam reiciendis ut odit hic!'
        ])->roles()->attach($creator->id);

        User::create([
            'name' => 'Benjamin Vignon',
            'email' => 'benjamin@komprom.com',
            'password' => bcrypt('fundator'),
            'role' => 'creator',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'us',
            'country_residence' => 'us',
            'contact_number' => '+1-510-489-3184',
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet eaque libero incidunt accusamus quaerat cumque ullam perferendis officia consectetur atque, quis blanditiis. Voluptatem eius quibusdam aut atque explicabo cum cupiditate.'
        ])->roles()->attach($creator->id);

        User::create([
            'name' => 'Christophe Brissiaud',
            'email' => 'christophe@fundator.co',
            'password' => bcrypt('fundator'),
            'role' => 'investor',
            'gender' => 'female',
            'age_gate' => true,
            'country_origin' => 'us',
            'country_residence' => 'us',
            'contact_number' => '+1-510-489-3184',
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa perspiciatis perferendis hic eaque sed fuga, id. A repellat consequuntur adipisci, saepe dolore dignissimos, odio, expedita officiis totam inventore commodi nemo?'
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
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur minima, sit sequi dolore nesciunt officiis ullam neque harum, rem, perspiciatis exercitationem, ipsa perferendis ratione eos. Nisi ut quod, perferendis atque!'
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
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fuga eius accusamus veniam odio ab iure. Delectus, voluptas tempore! Ex doloribus velit corporis placeat officiis aliquid deleniti ipsam, illo obcaecati.'
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
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aliquam consequatur dolor aperiam, nobis provident ipsa sint, voluptates a nihil ducimus dolorum sed molestias praesentium, tenetur at corporis error facere.'
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
            'contact_time' => '9-6',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae voluptate magni iusto esse amet veritatis tempora, doloremque minima deleniti ex, facere dignissimos suscipit nobis praesentium harum voluptas? Veniam, aliquid, eius.'
        ])->roles()->attach($investor->id);

    }
}
