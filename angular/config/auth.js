(function (){
    "use strict";

    angular.module('fundator.config').config(function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate';
    });

})();
