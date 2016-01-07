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

    angular.module('fundator.controllers').controller('ContestSingleCtrl', function($rootScope, $scope, $state, $stateParams, $resource) {
        $scope.contestId = $stateParams.contestId;

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.get({contestId: $scope.contestId}).$promise.then(function(result){
            console.log('just one course');
            console.log(result);
            $scope.contest = result;
        });

        $scope.entries = [
            'Entry 1',
            'Entry 2',
            'Entry 3',
            'Entry 4',
            'Entry 5',
            'Entry 6'
        ];
    });

})();
