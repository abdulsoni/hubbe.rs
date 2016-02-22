(function() {
    "use strict";

    angular.module('fundator.controllers').controller('PageCtrl', function($rootScope, $scope, $state, $stateParams, $http) {
        console.log('Page View Started');

        $scope.page = {
        	title: '',
        	content: ''
        };

        $rootScope.$broadcast('startLoading');
        $http.get('/api/pages/' + $stateParams.slug).then(function(result){
        	console.log('Success');
        	console.log(result);
        	$scope.page = result.data;
        }, function(error){
			console.log('Error');
			console.log(error);

			if (error.status == '404') {
				console.log('load 404')
			};
        }).finally(function(){
        	$rootScope.$broadcast('stopLoading');
        });
    });

})();