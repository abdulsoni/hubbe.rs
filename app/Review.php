<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
   /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'reviews';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['rec_user_id', 'rec_role_id', 'sender_user_id', 'rate1', 'rate2', 'rate3', 'rate4', 'comment'];

}
