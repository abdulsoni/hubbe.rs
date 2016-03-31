(function() {
    "use strict";

    angular.module('fundator.controllers').controller('CreateCtrl', function($rootScope, $scope, $state, $resource, $timeout, FdScroller) {
        console.log('Create Started');
        $rootScope.$broadcast('startLoading');

        var Project = $resource('/api/projects/:projectId', {
            projectId: '@id'
        });

        if($rootScope.activeRole !== 'creator'){
            $timeout(function(){
                $rootScope.$broadcast('stopLoading');
                $state.go('app.home');
            }, 2000);
        }else{
            Project.query().$promise.then(function(result){
                $scope.allProjects = result;
            }).finally(function(){
                $rootScope.$broadcast('stopLoading');
            });
        }

        // Scroll to the top
        FdScroller.toTop();
    });

    angular.module('fundator.controllers').controller('CreateDetailsCtrl', function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('CreateDetailsCtrl Started');

        $scope.details = {
            name: '',
            geography: 'wherever'
        };

        FdScroller.toSection('projectSteps');
    });

    angular.module('fundator.controllers').controller('CreateSECtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateSECtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertiseCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateExpertCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateBudgetCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateBudgetCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateInvestorsCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateInvestorsCtrl Started');
    });
})();