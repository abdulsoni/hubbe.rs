(function() {
    "use strict";

    angular.module('fundator.controllers').controller('FooterController', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $scope.notifications = null;

        var Contest = $resource(API.path('/contests/:contestId'), {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.ongoingContests = result;
        });
    });

})();