<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 26-08-2016
 * Time: 18:57
 */

namespace Fundator;


use Illuminate\Database\Eloquent\Model;

class Task extends Model{
    use \GetStream\StreamLaravel\Eloquent\ActivityTrait;
}