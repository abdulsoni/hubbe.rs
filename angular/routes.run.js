(function() {
    "use strict";

    angular.module('fundator.routes').run(function($rootScope, $state, $stateParams, $auth, $timeout, $http, $urlRouter, $filter, FdNotifications, FdScroller) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.initialLocationSetup = false;

        $rootScope.activeRole = '';
        $rootScope.activeState = null;
        $rootScope.activeStateParams = null;

        $rootScope.appLoading = true;
        $rootScope.isNavShown = false;

        $rootScope.toggleNavigation = function () {
            $rootScope.isNavShown ? $rootScope.isNavShown = false : $rootScope.isNavShown = true;
        };

        $rootScope.$on('startLoading', function(){
            $rootScope.appLoading = true;
        });

        $rootScope.$on('stopLoading', function(){
            $rootScope.appLoading = false;
        });

        $rootScope.$on('$locationChangeSuccess', function(e) {
            if (typeof($rootScope.user) !== 'undefined') {
                if ($rootScope.user.registered == 0) {
                    $state.go('app.auth.register');
                }
            }

            // UserService is an example service for managing user state
            if (typeof($rootScope.user) !== 'undefined') return;
            if ($rootScope.initialLocationSetup === true) return;

            // Prevent $urlRouter's default handler from firing
            e.preventDefault();

            // Check if the user is authenticated and
            // get the user object and tasks
            if ($auth.isAuthenticated()) {
                $rootScope.authenticated = true;

                $http.get('/api/user?token=' + $auth.getToken()).then(function(result) {
                    if (typeof(result.error) === 'undefined') {
                        $rootScope.user = result.data;

                        FdNotifications.init();

                        if ($rootScope.user.registered == 0) {
                            $state.go('app.auth.register');
                        }else{
                            var roles = $filter('filter')($rootScope.user.user_roles, {role: $rootScope.user.role}, true);

                            if (typeof(roles) !== 'undefined' && roles.length > 0) {
                                var role = roles[0];
                                $rootScope.switchUserRole(role.role, role.id, true);
                            }
                        }
                    }
                }, function(){
                    $auth.logout().then(function() {
                        localStorage.removeItem('fundator_token');
                        $rootScope.authenticated = false;
                        $rootScope.user = undefined;
                    });
                });

                $urlRouter.sync();
                $urlRouter.listen();
            }else{
                $rootScope.authenticated = false;
            }

        }, function(error){
            $auth.logout().then(function() {
                localStorage.removeItem('fundator_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;
            });
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if ($auth.isAuthenticated()) {
                if (typeof($rootScope.user) === 'undefined' && fromState.name.indexOf('recover') === -1) {
                    $rootScope.activeState = toState;
                    $rootScope.activeStateParams = toParams;
                    // event.preventDefault();
                }
                return;
            } else {
                if (fromState.name.indexOf('auth') === -1 && toState.name.indexOf('auth') !== -1) {
                    return;
                } else if (fromState.name.indexOf('auth') === -1) {
                    $timeout(function() {
                        event.preventDefault();
                        $state.go('app.auth.login', {});
                    });
                    return;
                } else if (toState.name.indexOf('auth') === -1 && fromState.name.indexOf('auth') !== -1) {
                    FdScroller.toTop();
                    event.preventDefault();
                    return;
                } else if (toState.name.indexOf('auth') === -1) {
                    $timeout(function() {
                        event.preventDefault();
                        $state.go('app.auth.login', {});
                        return;
                    });
                } else {
                    return;
                }
            }
        });

        var getView = function(viewName, secondaryName) {
            if (typeof secondaryName === 'undefined') {
                secondaryName = viewName;
            }

            return './views/app/app/' + viewName + '/' + secondaryName + '.html';
        };

        // Switch User Role

        $rootScope.switchUserRole = function(role, roleId, reload) {
            $rootScope.activeRole = role;
            console.log(role);
            console.log(roleId);

            if (typeof($rootScope.user) !== 'undefined') {
                if ($rootScope.user.user_roles.length === 0) {
                    $rootScope.user.user_roles.push({
                        id: null,
                        name: role,
                        role: null
                    });
                }
            }

            var userRoleViews = [{
                route: 'app',
                view: 'quickUpdate',
                roles: {
                    creator: getView('quick-update', 'quick-update-creator'),
                    investor: getView('quick-update', 'quick-update-investor'),
                    jury: getView('quick-update', 'quick-update-jury'),
                },
                defaultTemplate: getView('quick-update')
            }, {
                route: 'app.contestsingle',
                view: 'main@',
                roles: {
                    jury: getView('contest', 'contest-single-jury'),
                },
                defaultTemplate: getView('contest', 'contest-single')
            }];

            angular.forEach(userRoleViews, function(roleView) {
                var roleTemplateView = roleView.roles[role];
                var view = $state.get(roleView.route).views[roleView.view];

                if (typeof(roleTemplateView) !== 'undefined') {
                    view.templateUrl = roleTemplateView;
                }else{
                    view.templateUrl = roleView.defaultTemplate;
                }
            });

            var model = null;

            switch(role){
                case 'creator': model = '/api/creators/' + roleId
                break;
                case 'investor': model = '/api/investors/' + roleId
                break;
            }

            if (model !== null) {
                $http.get(model).then(function(result){
                    $rootScope.user[role] = result.data;

                    if ($state.current.name === '') {
                        $state.current.name = $rootScope.activeState.name;
                        $state.current.params = $rootScope.activeStateParams;
                    }

                    $state.go($state.current.name, $state.current.params, {reload: reload});
                });
            }else{
                if ($state.current.name === '') {
                    $state.current.name = $rootScope.activeState.name;
                    $state.current.params = $rootScope.activeStateParams;
                }

                $state.go($state.current.name, $state.current.params, {reload: reload});
            }

        };

    });

})();
