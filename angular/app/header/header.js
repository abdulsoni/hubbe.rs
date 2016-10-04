(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HeaderCtrl', function($rootScope, $scope, $state, $auth, $uibModal) {

        $scope.triggerLogin = function() {
        	console.log('trigger login!');

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'login.html',
                controller: 'LoginCtrl',
                size: 'md',
                windowClass: 'login-modal'
            });

            modalInstance.result.then(function() {
                console.log('Got close feedback!');
            }, function() {
            	console.log('Modal dismissed at: ' + new Date());
            });
        };
    });

    angular.module('fundator.controllers').controller('LoginCtrl', function($scope, $uibModalInstance) {
    	$scope.login = function(){
    		console.log('logging in now !');
    	};

    	$scope.authenticate = function(){
    		console.log('auth in now !');
    	};
    });

})();
