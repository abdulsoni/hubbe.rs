Fundator
===

### Installation

Download and install [Vagrant](http://vagrantup.com).
Download and install [Oracle Virual Box](https://www.virtualbox.org/wiki/Downloads).

Run the command `vagrant box add laravel/homestead` to install the Homestead box.
or, if the download fails, you can manually download the box from
https://atlas.hashicorp.com/laravel/boxes/homestead/versions/0.3.0/providers/virtualbox.box
and then run the command `vagrant box add laravel/homestead path/to/your.box`

Clone the repository.

Note : If you do not have NPM or Composer, please download the required software
before proceeding to the next step.

https://getcomposer.org/
https://www.npmjs.com

Install Composer dependencies   - `composer install`
Initialize vagrant              - `php vendor/bin/homestead make`

Copy the environment file       - `cp .env.example .env`
Create the application key      - `php artisan key:generate`

Install NPM dependencies        - `npm install`
Install Bower dependencies      - `bower install`

Run Gulp `gulp`

Finally, run the command `vagrant up` to run the app.


### Migration

Run the command in the project's root directory :

`php artisan migrate`
`php artisan db:seed`

Now you should have a working database with preseeded entries.


### Development Tips

Whenever you need to work on the project, run the command `vagrant up` to start
the virtual machine, and once you are done, run the command `vagrant halt` to
stop the virtual machine.

Always pull the changes before commiting your own changes.

### Switch from HHVM to PHP7.0

Add the PHP respository and update apt

`sudo add-apt-repository ppa:ondrej/php`
`sudo apt-get update`

Install PHP7.0, PHP7.0-FPM and PHP7.0-Mysql 
`sudo apt-get install php7.0-fpm`
`sudo apt-get install php7.0-mysql`

Replace the php5-fmp sock with php7-fpm sock

`sudo nano /etc/nginx/sites-enabled/default`

`fastcgi_pass unix:/var/run/php/php5-fpm.sock;`
to replace with
`fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;`