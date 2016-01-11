<?php

namespace Fundator;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
//use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
//use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends Model implements AuthenticatableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, EntrustUserTrait;

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
    protected $fillable = ['name', 'email', 'password', 'role', 'needs_reset'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Relationship between users and contests via contestants
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function contests()
    {
        return $this->belongsToMany('Fundator\Contest', 'contestants');
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
                    case 'jury':
                        $model = Jury::class;
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
