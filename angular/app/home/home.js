(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', function($rootScope, $scope, $state, $stateParams, $http) {
        console.log('Home View Started');

        // Redirect to contest
        $state.go('app.contests');
    });

})();