(function() {
    "use strict";

    angular.module('fundator.controllers').controller('FlashNoticeCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $timeout) {
        $rootScope.flashNotices = {};

        $rootScope.flashNotices.juryView = {
        	show: false,
        	contestId: 0,
        	onClick: function(){}
        };

        console.log('flash notice controller');
    });

})();
