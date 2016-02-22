(function() {
    "use strict";

    angular.module('fundator.controllers').controller('NotificationsCtrl', function($rootScope, $scope, $state, $stateParams, $http, FdNotifications) {
        $scope.notifications = null;

        FdNotifications.getLatestNotifications().then(function(result){
        	$scope.notifications = result.notifications;
        })
    });

})();