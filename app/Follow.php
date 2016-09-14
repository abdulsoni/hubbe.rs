<?php

namespace Fundator;
use Illuminate\Database\Eloquent\Model;
class Follow extends Model
{
    use \GetStream\StreamLaravel\Eloquent\ActivityTrait;
    protected $table = 'follows';
    protected $guarded = ['id'];

    public function user(){
        return $this->belongsTo('Fundator\User');
    }
    public function target()    {
        return $this->belongsTo('Fundator\User');
    }
    public function activityVerb(){
        return 'follow';
    }
    public function activityActor(){
        return 'User:'.$this->user_id;
    }
    public function activityObject(){
        return 'Follow:'.$this->id;
    }
    public function activityForeignId(){
        return 'Follow:'.$this->id;
    }
}
