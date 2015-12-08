<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class File extends Model
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
    protected $table = 'files';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'file_name', 'extension', 'file_size', 'file_url'];
}
