
(function (){
    "use strict";

    angular.module('fundator.config').config(function (flowFactoryProvider){

        flowFactoryProvider.defaults = {
        	uploadMethod: 'POST',
            target: '/api/files/',
            permanentErrors:[404, 500, 501]
        };

    });

})();
