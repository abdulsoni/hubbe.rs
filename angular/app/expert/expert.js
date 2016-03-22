(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ExpertCtrl', function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Expert Started');
        $rootScope.$broadcast('stopLoading');

        // Scroll to the top
        FdScroller.toTop();
    });

})();