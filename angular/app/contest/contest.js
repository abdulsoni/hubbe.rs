(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ContestCtrl', function($rootScope, $scope, $state, $resource) {

        $scope.contests = [];

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result){
            console.log('all courses');
            console.log(result);
            $scope.contests = result;
        });
    });

})();
