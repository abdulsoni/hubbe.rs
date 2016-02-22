<?php

namespace Fundator\Exceptions;

use Exception;

class InvalidConfirmationCodeException extends Exception {

    // you may add any custom methods
    public function __construct($message = '', $code = 0) {
        // $message = __('Invalid Confirmation Code', 'fundator');
        $message = 'Invalid Confirmation Code';

        return parent::__construct($message, $code);
    }
}