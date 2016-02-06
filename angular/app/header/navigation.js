(function() {
    "use strict";

    angular.module('fundator.controllers').controller('NavigationCtrl', function($rootScope, $scope, $state, $auth) {

        // Logout
        $scope.logout = function(){
            console.log('actually logging out! ...');
            $auth.logout().then(function() {
                localStorage.removeItem('fundator_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;
                $rootScope.isNavShown = false;

                $state.go('app.login', {}, {reload: true});
            });
        }
    });

})();
