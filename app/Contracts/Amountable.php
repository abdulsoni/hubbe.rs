<?php
namespace Fundator\Contracts;
use Illuminate\Database\Eloquent\Model;

interface Amountable
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function amountTransactions();

    /**
     *
     * @return mix
     */
    public function countAmountTransactions();
    /**
     * @param $amount
     * @param $message
     * @param $data
     *
     * @return static
     */
    public function addAmount($amount, $message, $data = null);
}