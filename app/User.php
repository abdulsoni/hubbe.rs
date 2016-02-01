<?php

namespace Fundator;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
//use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
//use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

use Cmgmyr\Messenger\Traits\Messagable;
use Cmgmyr\Messenger\Models\Thread;

use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends Model implements AuthenticatableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, EntrustUserTrait, Messagable;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'last_name', 'email', 'role', 'needs_reset', 'registered', 'linkedin', 'dob', 'age_gate', 'country_origin', 'country_residence', 'contact_number', 'contact_time'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];


    public function thumbnail()
    {
        return $this->belongsTo('Fundator\File', 'thumbnail_id');
    }

    /**
     * Relationship between users and creators
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function creator()
    {
        return $this->hasOne('Fundator\Creator');
    }

    /**
     * Relationship between users and investors
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function investor()
    {
        return $this->hasOne('Fundator\Investor');
    }

    /**
     * Relationship between users and creators
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function judging()
    {
        return $this->belongsToMany('Fundator\Contest', 'contest_jury', 'judge_id');
    }

    // Helper functions

    /**
     * Return all users with their user roles
     *
     */
    public static function allWithRoles()
    {
        $users = User::all();
        $allUsers = [];

        foreach ($users as $user) {
            $roles = $user->roles;
            $userRoles = [];

            foreach ($roles as $role) {

                $model = null;

                switch ($role->name) {
                    case 'creator':
                        $model = Creator::class;
                        break;
                    case 'investor':
                        $model = Investor::class;
                        break;
                }

                $relatedUserObject = $model->where('user_id', $user->id)->first();

                if (!is_null($relatedUserObject)) {
                    $userRoles[$role->name] = $relatedUserObject;
                }
            }

            $user['user_roles'] = $userRoles;

            unset($user->roles);

            $allUsers[] = $user;
        }

        return $allUsers;
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::created(function (User $user)
        {
            switch($user->role){
                case 'creator':
                    $user->creator()->create([
                        'first_name' => $user->name
                    ]);
                    break;
            }
        });
    }
}
