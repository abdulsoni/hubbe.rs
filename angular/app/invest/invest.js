(function() {
    "use strict";

    angular.module('fundator.controllers').controller('InvestCtrl', function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Invest Started');
        $rootScope.$broadcast('stopLoading');

        // Scroll to the top
        FdScroller.toTop();
    });

    angular.module('fundator.controllers').controller('InvestmentCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, FdScroller, API) {
        console.log('Investment Started');

        FdScroller.toTop();

        $scope.data = {
            paybackDuration: []
        };
        $scope.investment = {};

        var Project = $resource(API.path('/projects/:projectId'), {
        	projectId: '@id'
        });

        var ProjectFinance = $resource(API.path('project-finance/:projectFinanceId'), {
            projectFinanceId: '@id'
        });

        Project.get({projectId: $stateParams.projectId, fd_active_role: $rootScope.activeRole}).$promise.then(function(result){
        	$scope.project = result;

        	ProjectFinance.get({projectFinanceId: result.project_finance_id}).$promise.then(function(result){
        		$scope.project.finance = result;
                $scope.data.paybackDuration = JSON.parse(result.mini_plan);
                console.log(JSON.parse(result.mini_plan));
        		$rootScope.$broadcast('stopLoading');
        	});
        });

        $scope.submitBid = function(){
            $scope.data.bidLoading = true;

            var bidData = {
                'bid_amount_min': $scope.data.bid_amount_min,
                'bid_amount_max': $scope.data.bid_amount_max,
                'description': $scope.data.bid_description
            };

            $http.post(API.path('/projects/' + $stateParams.projectId + '/investment-bids') , bidData).then(function(result){
                $scope.investment.bid = result.data;
            }).finally(function(){
                $scope.data.bidLoading = false;
            });
        }
    });

})();