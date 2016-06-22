<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Confirm extends Model
{

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'confirms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['confirm_status', 'confirm_time'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['sender_id', 'receiver_id'];

    /**
     * Appended Attributes
     *
     * @var array
     */
    protected $appends = ['sender', 'receiver'];

    /**
     * Sender
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sender(){
        return $this->belongsTo('Fundator\User', 'sender_id')->select('id', 'name', 'last_name');
    }

    /**
     * Receiver
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function receiver(){
        return $this->belongsTo('Fundator\User', 'receiver_id')->select('id', 'name', 'last_name');
    }

    /**
     * Confirmable
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function confirmable(){
        return $this->morphTo('confirmable');
    }

    public function getSenderAttribute()
    {
        $sender = User::find($this->sender_id);

        return [
            'id' => $sender->id,
            'name' => $sender->name,
            'last_name' => $sender->last_name,
            'thumbnail_url' => $sender->thumbnail_url
        ];
    }

    public function getReceiverAttribute()
    {
    	$receiver = User::find($this->receiver_id);

        return [
            'id' => $receiver->id,
            'name' => $receiver->name,
            'last_name' => $receiver->last_name,
            'thumbnail_url' => $receiver->thumbnail_url
        ];
    }
}
