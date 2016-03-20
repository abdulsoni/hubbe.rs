<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /**
     * @var string
     */
    protected $table = 'transactions';

    /**
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function user()
    {
        return $this->belongsTo('Fundator\User');
    }

    /**
     * @param Model $user
     *
     * @return static
     */
     public function getCurrentAmount(User $user)
     {
        $currentAmount = Transaction::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->pluck('current');

        if (!$currentAmount) {
            $currentAmount = 0.0;
        }

        return $currentAmount;
     }

    /**
     * @param Model $user
     * @param $amount
     * @param $message
     * @param $data
     *
     * @return static
     */
    public function addTransaction(User $user, $amount, $message, $data = null)
    {
        $transaction = new static();
        $transaction->amount = $amount;

        $transaction->current = $this->getCurrentAmount($user) + $amount;
        $transaction->message = $message;

        $transaction->save();
        $user->amountTransactions()->associate($transaction);

        return $transaction;
    }

    /**
     * Auto save the current amount
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function($model){
            $user = User::find($model->user_id);
            $model->current = $model->getCurrentAmount($user) + $model->amount;
        });
    }
}
