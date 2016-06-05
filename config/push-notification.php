<?php

return array(

    'appNameIOS'     => array(
        'environment' =>'distribution',
        'certificate' => app_path() . '/config/cert/pushcert.pem',
        'passPhrase'  =>'04021993',
        'service'     =>'apns'
    ),

    'appNameAndroid' => array(
        'environment' =>'production',
        'apiKey'      =>'AIzaSyDmZFQpESOLKhFsgA80zf11j_SE2orGEhM',
        'service'     =>'gcm'
    )

);