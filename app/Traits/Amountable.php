<?php

namespace Fundator\Traits;

use Fundator\Transaction;
use Illuminate\Database\Eloquent\Model;

trait Amountable
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function amountTransactions($amount = null)
    {
        return $this->morphMany(Transaction::class, 'amountable')->orderBy('created_at','desc')->take($amount);
    }

    /**
     *
     * @return mix
     */
    public function countAmountTransactions(){
      return $this->amountTransactions()
          ->count();
    }

    /**
     *
     * @return double
     */
    public function currentAmount()
    {
        return (new Transaction())->getCurrentAmount($this);
    }

    /**
     * @param $amount
     * @param $message
     * @param $data
     *
     * @return static
     */
    public function addAmount($amount, $message, $data = null)
    {
        return (new Transaction())->addTransaction($this, $amount, $message, $data = null);
    }
}
