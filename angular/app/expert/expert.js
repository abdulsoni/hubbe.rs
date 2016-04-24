(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ExpertCtrl', function($rootScope, $scope, $state, $resource, $filter, FdScroller, API) {
        console.log('Expert Started');
        $scope.expertiseSource = null;
        $scope.availableExpertise = [];
        $scope.matchingExpertise = [];
        $scope.data = {};

        var AvailableExpertise = $resource(API.path('expertise/available'));

        var MatchingExpertise = $resource(API.path('expertise/matching'), {}, {
        	query: {
        		method: 'GET',
        		isArray: false
        	}
        });

        var requiredRole = 'expert';
        var matchingRoles = $filter('filter')($rootScope.user.user_roles, { role: requiredRole }, true);

        var access = false;

        if (typeof(matchingRoles) !== 'undefined' && matchingRoles.length > 0) {
            var matchingRole = matchingRoles[0];

            if ($rootScope.activeRole !== requiredRole) {
                $rootScope.switchUserRole(requiredRole, matchingRole.id, true);
            } else {
                access = true;
            }
        } else {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
                $state.go('app.home');
            }, 2000);
        }

        if (access) {
        	$rootScope.$broadcast('stopLoading');

        	AvailableExpertise.query().$promise.then(function(result){
                $scope.availableExpertise = result;
                $scope.expertiseSource = $scope.availableExpertise;
            });

            MatchingExpertise.query().$promise.then(function(result){
                $scope.matchingExpertise = result.expertise;
            });

        }
    });

    angular.module('fundator.controllers').controller('ExpertiseCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, FdScroller, API) {
        console.log('Expertise Started');

        FdScroller.toTop();

        $scope.data = {};
        $scope.expertise = null;

        var ProjectExpertise = $resource(API.path('/project-expertise/:expertiseId'), {
        	expertiseId: '@id'
        });

        ProjectExpertise.get({expertiseId: $stateParams.expertiseId}).$promise.then(function(result){
        	$scope.expertise = result;
        	$rootScope.$broadcast('stopLoading');
        });

        $scope.submitBid = function(){
            $scope.data.bidLoading = true;

            var bidData = {
                'bid_amount': $scope.data.bid_amount,
                'description': $scope.data.bid_description
            };

            $http.post(API.path('/project-expertise/') + $stateParams.expertiseId + '/bid', bidData).then(function(result){
                $scope.expertise.bid = result.data;
            }).finally(function(){
                $scope.data.bidLoading = false;
            });
        }
    });

})();
