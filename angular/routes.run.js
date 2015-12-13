(function() {
    "use strict";

    angular.module('fundator.routes').run(function($rootScope, $state, $auth, $timeout) {

        $rootScope.$state = $state;
        $rootScope.initialLocationSetup = false;

        //$rootScope.$on('$stateChangeStart', function(event, toState) {
        //    if ($auth.isAuthenticated()) {
        //        return;
        //    } else {
        //        if (toState.name.indexOf('login') === -1) {
        //            $timeout(function() {
        //                $state.go('app.login', {});
        //            });
        //        } else {
        //            return;
        //        }
        //    }
        //});

    });

})();
