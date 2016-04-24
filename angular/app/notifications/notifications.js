(function() {
    "use strict";

    angular.module('fundator.controllers').controller('NotificationsCtrl', function($rootScope, $scope, $state, $stateParams, $http, FdNotifications) {
        $scope.notifications = null;
        $rootScope.$broadcast('stopLoading');

        if ($rootScope.initialRoleAssignment) {
	        FdNotifications.getLatestNotifications().then(function(result){
	        	$scope.notifications = result.notifications;
	        }).finally(function(){
	        	$rootScope.$broadcast('stopLoading');
	        });
        }
    });

})();