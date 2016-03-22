(function() {
    "use strict";

    angular.module('fundator.controllers').controller('InvestCtrl', function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Invest Started');
        $rootScope.$broadcast('stopLoading');

        // Scroll to the top
        FdScroller.toTop();
    });

})();