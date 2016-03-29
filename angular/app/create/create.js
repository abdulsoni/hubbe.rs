(function() {
    "use strict";

    angular.module('fundator.controllers').controller('CreateCtrl', function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Create Started');
        $rootScope.$broadcast('stopLoading');

        $scope.details = {
            name: '',
            geography: 'wherever'
        };

        // Scroll to the top
        FdScroller.toTop();
    });

    angular.module('fundator.controllers').controller('CreateDetailsCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateDetailsCtrl Started');
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