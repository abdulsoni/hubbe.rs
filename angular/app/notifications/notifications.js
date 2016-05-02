(function() {
    "use strict";

    angular.module('fundator.controllers').controller('NotificationsCtrl', function($rootScope, $scope, $state, $stateParams, $http, FdNotifications) {
        $scope.notifications = null;
        $scope.notificationsLoading = true;

        if ($rootScope.initialRoleAssignment) {
	        FdNotifications.getLatestNotifications().then(function(result){
	        	$scope.notifications = result.notifications;
	        }).finally(function(){
	        	$scope.notificationsLoading = false;
	        });
        }
    });

})();