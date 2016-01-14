(function(){
    "use strict";

    angular.module('fundator.controllers').controller('RegisterCtrl', function($rootScope, $scope, $state, $auth, $timeout){

        $scope.form = {
            currentStep: 1,
            totalSteps: 4
        };

        var payload = $auth.getPayload();

        // if (payload.registered != false) {
        //     $state.go('app.contest', {});
        // }

        // $registrationSteps = [
        //     {
        //         id: 1,

        //     }
        // ]

    });

})();