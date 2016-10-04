(function() {
    "use strict";

    angular.module('fundator.controllers').controller('PageCtrl', function($rootScope, $scope, $state, $stateParams, $http, FdScroller, API) {
        $rootScope.$broadcast('startLoading');
        FdScroller.toTop();

        $scope.page = {
        	title: '',
        	content: ''
        };

        $http.get(API.path('pages') + $stateParams.slug).then(function(result){
        	$scope.page = result.data;
        }, function(error){
			if (error.status == '404') {
				console.log('load 404');
			}
        }).finally(function(){
        	$rootScope.$broadcast('stopLoading');
        });
    });

})();