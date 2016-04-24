
(function (){
    "use strict";

    angular.module('fundator.config').config(function (flowFactoryProvider, APIProvider){

        flowFactoryProvider.defaults = {
        	uploadMethod: 'POST',
            target: APIProvider.$get().path('files'),
            permanentErrors:[404, 500, 501]
        };

    });

})();
