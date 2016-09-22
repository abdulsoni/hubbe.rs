(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', function($rootScope, $scope, $state, $stateParams, $http, $resource, FdScroller, API) {
        console.log('Home View Started');
        $rootScope.$broadcast('stopLoading');
        FdScroller.toTop();

        console.log('get the current user role');
        console.log($rootScope.activeRole);

        var Contest = $resource(API.path('contests/:contestId'), {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.contests = result;
        });
    });

})();