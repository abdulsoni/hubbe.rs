(function(){
    "use strict";

    angular.module('fundator.controllers').controller('AuthCtrl', function($rootScope, $scope, $state, $auth, $timeout){
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function(){
                $rootScope.appLoaded = true;
            }, 1000);
        });

        if ($auth.isAuthenticated()) {
            $state.go('app.contest', {});
        }

        $scope.login = function() {
            $scope.errorMessage = '';

            var credentials = {
                email: $scope.email,
                password: $scope.password
            };

            $auth.login(credentials).then(function(data) {
                $state.go('app.contest', {}, {reload: true});
            }, function(err){
                console.log(err);
                if (err.statusText === 'Unauthorized') {
                    $scope.errorMessage = 'The email or password you entered is incorrect.'
                }else{
                    $scope.errorMessage = err.statusText;
                }
            });
        };

        $scope.logout = function(){
            $auth.logout().then(function() {
                localStorage.removeItem('satellizer_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;

                $state.go('app.login', {}, {reload: true});
            });
        }

    });

})();