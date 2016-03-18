(function(){
    "use strict";

    var fundator = angular.module('fundator',
        [
            'fundator.controllers',
            'fundator.filters',
            'fundator.services',
            'fundator.directives',
            'fundator.routes',
            'fundator.config'
        ]);

    angular.module('fundator.routes', ['ui.router', 'satellizer']);
    angular.module('fundator.controllers', ['ngResource', 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'satellizer', 'angularMoment', 'angular-owl-carousel', 'ngImgCrop', 'angularFileUpload', 'bootstrapLightbox']);
    angular.module('fundator.filters', ['ordinal']);
    angular.module('fundator.services', ['ui.router']);
    angular.module('fundator.directives', ['dibari.angular-ellipsis', 'localytics.directives', 'textAngular', 'flow']);
    angular.module('fundator.config', []);

})();
(function() {
    "use strict";

    angular.module('fundator.routes').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        var getView = function(viewName, secondaryName) {
            if (typeof secondaryName === 'undefined') {
                secondaryName = viewName;
            }

            return './views/app/app/' + viewName + '/' + secondaryName + '.html';
        };

        $urlRouterProvider.otherwise('/contest');

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    header: {
                        templateUrl: getView('header'),
                        controller: 'HeaderCtrl'
                    },
                    navigation: {
                        templateUrl: getView('header', 'navigation'),
                        controller: 'NavigationCtrl'
                    },
                    flashNotice: {
                        templateUrl: getView('header', 'flash-notice'),
                        controller: 'FlashNoticeCtrl'
                    },
                    footer: {
                        templateUrl: getView('footer'),
                        controller: 'FooterController'
                    },
                    notifications: {
                        templateUrl: getView('notifications', 'notifications'),
                        controller: 'NotificationsCtrl'
                    },
                    quickUpdate: {
                        templateUrl: getView('quick-update', 'quick-update')
                    },
                    main: {}
                }
            })
            .state('app.auth', {
                url: '/auth',
                abstract: true,
            })
            .state('app.auth.login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'login'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.auth.signup', {
                url: '/signup',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'signup'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.auth.forgot', {
                url: '/forgot',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'forgot'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.auth.recover', {
                url: '/recover?token&email',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'recover'),
                        controller: 'AuthRecoverCtrl'
                    }
                }
            })
            .state('app.auth.confirm', {
                url: '/confirm?code&email',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'confirm'),
                        controller: 'AuthConfirmCtrl'
                    }
                }
            })
            .state('app.auth.register', {
                url: '/register',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'register'),
                        controller: 'RegisterCtrl'
                    }
                }
            })
            .state('app.home', {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: getView('home'),
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.contest', {
                url: '/contest',
                views: {
                    'main@': {
                        templateUrl: getView('contest'),
                        controller: 'ContestCtrl'
                    }
                }
            })
            .state('app.contestsingle', {
                url: '/contest/:contestId',
                views: {
                    'main@': {
                        templateUrl: getView('contest', 'contest-single'),
                        controller: 'ContestSingleCtrl'
                    }
                }
            })
            .state('app.grabshare', {
                url: '/grab-a-share',
                views: {
                    'main@': {
                        templateUrl: getView('invest', 'grab-a-share'),
                        controller: 'InvestCtrl'
                    }
                }
            })
            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'main@': {
                        templateUrl: getView('contest'),
                        controller: 'ContestCtrl'
                    }
                }
            })
            .state('app.page', {
                url: '/:slug',
                views: {
                    'main@': {
                        templateUrl: getView('page'),
                        controller: 'PageCtrl'
                    }
                }
            })

    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.routes').run(["$rootScope", "$state", "$stateParams", "$auth", "$timeout", "$http", "$urlRouter", "$filter", "$cookies", "FdNotifications", "FdScroller", function($rootScope, $state, $stateParams, $auth, $timeout, $http, $urlRouter, $filter, $cookies, FdNotifications, FdScroller) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.initialLocationSetup = false;
        $rootScope.initialRoleAssignment = false;

        $rootScope.activeRole = '';
        $rootScope.activeState = null;
        $rootScope.activeStateParams = null;

        $rootScope.appLoading = true;
        $rootScope.isNavShown = false;

        $rootScope.toggleNavigation = function () {
            ($rootScope.isNavShown >= 0.5) ? $rootScope.isNavShown = 0 : $rootScope.isNavShown = 0.5;
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
                    console.log('going to register');
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
                            console.log('going to register');
                            $state.go('app.auth.register');
                        }else{
                            var orignalRole = $rootScope.user.role;
                            var activeRole = $rootScope.user.role;

                            if (typeof($cookies.get('fd_active_role')) !== 'undefined') {
                                activeRole = $cookies.get('fd_active_role');
                            }

                            var roles = $filter('filter')($rootScope.user.user_roles, {role: activeRole}, true);

                            if (typeof(roles) !== 'undefined' && roles.length > 0) {
                                var role = roles[0];
                                $rootScope.switchUserRole(role.role, role.id, true);
                            }else{
                                $rootScope.switchUserRole(orignalRole.role, orignalRole.id, true);
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
                } else if(!$rootScope.initialRoleAssignment && $rootScope.user.registered == 1) {
                    event.preventDefault();
                }
                return;
            } else {
                if (fromState.name.indexOf('auth') === -1 && toState.name.indexOf('auth') !== -1) {
                    return;
                } else if (fromState.name.indexOf('auth') === -1) {
                    $timeout(function() {
                        event.preventDefault();
                        $state.go('app.auth.login', {}, {reload: true});
                    });
                    return;
                } else if (toState.name.indexOf('auth') === -1 && fromState.name.indexOf('auth') !== -1) {
                    FdScroller.toTop();
                    event.preventDefault();
                    return;
                } else if (toState.name.indexOf('auth') === -1) {
                    $timeout(function() {
                        event.preventDefault();
                        $state.go('app.auth.login', {}, {reload: true});
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
            $cookies.put('fd_active_role', role);

            if (!$rootScope.initialRoleAssignment) {
                $rootScope.initialRoleAssignment = true;
            }

            if (typeof($rootScope.user) !== 'undefined') {
                if ($rootScope.user.user_roles.length === 0) {
                    $rootScope.user.user_roles.push({
                        id: null,
                        name: role,
                        role: role
                    });
                }
            }

            var userRoleViews = [{
                route: 'app',
                view: 'quickUpdate',
                roles: {
                    creator: getView('quick-update', 'quick-update-creator'),
                    expert: getView('quick-update', 'quick-update-expert'),
                    investor: getView('quick-update', 'quick-update-investor'),
                    jury: getView('quick-update', 'quick-update-jury'),
                },
                defaultTemplate: getView('quick-update')
            }, {
                route: 'app.contestsingle',
                view: 'main@',
                roles: {
                    creator: getView('contest', 'contest-single-creator'),
                    jury: getView('contest', 'contest-single-jury'),
                },
                defaultTemplate: getView('contest', 'contest-single')
            }, {
                route: 'app.contest',
                view: 'main@',
                roles: {
                    creator: getView('contest', 'contest-creator'),
                    jury: getView('contest', 'contest-jury')
                },
                defaultTemplate: getView('contest')
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

        // Has User Role

        $rootScope.hasUserRole = function(role) {
            if (typeof($rootScope.user) !== 'undefined') {
                var hasRoles = $filter('filter')($rootScope.user.user_roles, {role: role}, true);

                if (hasRoles.length > 0) {
                    return true;
                }
            }

            return false;
        }

    }]);

})();

(function() {
    "use strict";

	angular.module('fundator.directives')

	.directive('fdLoader', function() {
	  return {
	  	scope: {
	  		viewBox: '@'
	  	},
	    restrict: 'E',
	    template: '<div class="fd-loader la-ball-pulse"><div></div><div></div><div></div></div>',
	    link: function($scope, $element, $attrs) {
	    	$element.addClass($attrs.class);
	    }
	  };
	});

})();



(function() {
    "use strict";

	angular.module('fundator.filters').filter('stripTags', function() {
	    return function(text) {

			if (typeof(text) !== 'undefined') {
				var re = new RegExp(String.fromCharCode(160), "g");
				text = String(text).replace(re, " ");
				text = text.replace(/[^\x00-\x7F]/g, "");
				text = text.replace(/&nbsp;/gi,' ');
			}

	     	return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	    };
	  }
	);

	angular.module('fundator.filters').filter('cleanHtml', function() {
	    return function(text) {

			if (typeof(text) !== 'undefined') {
				text = text.replace(/[^\x00-\x7F]/g, "");
			}

	     	return text;
	    };
	  }
	);

})();
(function() {
    "use strict";

    angular.module('fundator.services').factory('FdNotifications', ["$rootScope", "$q", "$interval", "$http", "$state", function($rootScope, $q, $interval, $http, $state) {
        var globalNotifications = {
            notifications: [],
            unread: 0
        };

        var pushNotification = function(type, title, message) {
            globalNotifications.notifications.unshift({
                type: type,
                title: title,
                message: message
            });
        }

        return {
            init: function(notifications) {
                $rootScope.$watch('user', function(user){
                    if (typeof(user) === 'undefined') return;

                    if (typeof(notifications) !== 'undefined') {
                        globalNotifications = notifications;
                    }else{
                        $http.get('/api/notifications/' + user.id).then(function(result){
                            globalNotifications = result.data;
                        });
                    }
                });
            },
            getLatestNotifications: function() {
                var getLatestNotificationsDeferred = $q.defer();

                var notificationsInterval = $interval(function() {
                    if (globalNotifications.notifications.length > 0) {
                        var latestNotifications = angular.copy(globalNotifications);
                        latestNotifications.notifications = latestNotifications.notifications.slice(0, 5);

                        $interval.cancel(notificationsInterval);
                        getLatestNotificationsDeferred.resolve(latestNotifications)
                    }
                }, 1000);

                return getLatestNotificationsDeferred.promise;
            },
            readNotification: function(notification) {
                return $http.post('/api/notifications/' + notificationId + '/read').then(function(result){
                	notification.read = 1;
                });
            },
            readAllNotifications: function() {
                return $http.post('/api/notifications/user/' + $rootScope.user.id + '/read').then(function(result){
                    globalNotifications.unread = 0;
                });
            },
            // notificationTrigger: function(category) {
            //     switch(category){
            //         case 'download.new': $state.go('app.dashboard.downloads');
            //         break;
            //         case 'partner.paired': $state.go('app.dashboard.partner.details');
            //         break;
            //         case 'partner.study_periods': $state.go('app.dashboard.courses.periods');
            //         break;
            //         case 'user.created': $state.go(TasksService.nextTask().view);
            //         break;
            //     }
            // },
            getNotifications: function() {
                return notifications;
            },
            notify: function(type, title, message, push) {
                toaster.pop(type, title, message);

                if (push) {
                    pushNotification(type, title, message);
                }
            },
            notifyError: function() {
                toaster.pop('error', title, message);
                pushNotification(type, title, message);
            }
        };
    }]);
})();

(function() {
    "use strict";

    angular.module('fundator.services').factory('FdScroller', ["$window", function($window) {

        return {
            toTop: function() {
                var body = $('html, body');
                body.stop().animate({scrollTop: 0}, '500', 'swing');
            },
            toSection: function(identifier) {
            	var $section = $(identifier);
            	console.log($section);
            	if ($section.length > 0) {
            		var top = $section.offset().top - 70;

            		var body = $('html, body');
                	body.stop().animate({scrollTop: top}, '500', 'swing');
            	}
            }
        };

    }]);
})();

(function(){
    "use strict";

    angular.module('fundator.controllers').controller('AuthCtrl', ["$rootScope", "$scope", "$state", "$auth", "$http", "$timeout", "FdScroller", function($rootScope, $scope, $state, $auth, $http, $timeout, FdScroller){
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function(){
                $rootScope.appLoaded = true;
            }, 1000);
        });

        $rootScope.$broadcast('stopLoading');

        if ($auth.isAuthenticated()) {
            $state.go('app.contest', {});
        }

        $scope.data = {};

        $scope.signup = function() {
            var userInfo = {
                name: $scope.data.name,
                email: $scope.data.email,
                password: $scope.data.password
            }

            $http.post('/api/authenticate/signup', userInfo).then(function(result){
                if (typeof(result.data.error) === 'undefined') {

                    if (result.data.success === true && typeof(result.data.message) !== 'undefined') {
                        $scope.errorMessage = null;
                        $scope.successMessage = result.data.message;
                    }
                }
            }, function(error){
                if (typeof(error.data.message.email) !== 'undefined') {
                    console.log(error.data.message.email[0]);
                    $scope.successMessage = null;
                    $scope.errorMessage = error.data.message.email[0];
                }
            });
        }

        $scope.login = function() {
            $scope.errorMessage = '';
            $rootScope.$broadcast('startLoading');
            FdScroller.toTop();

            var credentials = {
                email: $scope.data.email,
                password: $scope.data.password
            };

            $auth.login(credentials).then(function(result) {
                console.log('result');
                console.log(result.data.token);
                $auth.setToken(result.data.token);
                $state.go('app.auth.signup');
            }, function(err){
                $rootScope.$broadcast('stopLoading');

                if (err.statusText === 'Unauthorized') {
                    $scope.errorMessage = 'The email or password you entered is incorrect.'
                }else{
                    $scope.errorMessage = err.statusText;
                }
            });
        };

        $scope.authenticate = function(provider) {
            $rootScope.$broadcast('startLoading');

            $auth.authenticate(provider).then(function(response) {
                console.log('Logged in ');
                console.log(response);
            }).catch(function(response) {
                console.log('Not Logged in ');
                console.log(response);
                $rootScope.$broadcast('stopLoading');
            })
        };

        $scope.logout = function(){
            $auth.logout().then(function() {
                localStorage.removeItem('fundator_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;

                $state.go('app.auth.login', {}, {reload: true});
            });
        }

    }]);

    angular.module('fundator.controllers').controller('AuthConfirmCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$timeout", "$http", function($rootScope, $scope, $state, $stateParams, $auth, $timeout, $http){
        $rootScope.$broadcast('stopLoading');

        if (typeof($stateParams.code) !== 'undefined' && typeof($stateParams.email) !== 'undefined') {
            var params = {
                confirmation_code: $stateParams.code,
                email: $stateParams.email
            };

            $scope.loading = true;

            $http.post('/api/authenticate/confirm', params).then(function(result) {
                console.log('result');
                console.log(result);
                $state.go('app.auth.login');
            }, function(error) {
                console.log('error');
                console.log(error);
                $scope.errorMessage = error.data.error;
            }).finally(function(){
                $scope.loading = false;
            });

        }else{
            $state.go('app.auth.login');
        }
    }]);

    angular.module('fundator.controllers').controller('AuthRecoverCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$timeout", "$http", function($rootScope, $scope, $state, $stateParams, $auth, $timeout, $http){
        $rootScope.$broadcast('stopLoading');

        $scope.data = {
            recoveryEmail: '',
            password: '',
            password_repeat: ''
        };

        if (typeof($stateParams.token) === 'undefined' && typeof($stateParams.email) === 'undefined') {
            $scope.viewState = 'recover';
        }else{
            $scope.viewState = 'set';
        }

        $scope.recover = function(){
            $scope.viewState = 'loading';

            // Reset Password
            var params = {
                email: $scope.data.recoveryEmail
            };

            $http.post('/api/authenticate/forgot', params).then(function(result) {

                if (typeof(result.data.error) === 'undefined') {
                    $scope.successMessage = 'A password reset link has been sent to your email.';
                    $scope.viewState = '';
                }else{
                    $scope.viewState = 'recover';

                    if (result.data.error === 'Invalid User') {
                        $scope.errorMessage = 'User does not exist';
                    }else{
                        $scope.errorMessage = 'Error in recovering password';
                    }
                }

            }, function(result){
                $scope.viewState = 'recover';

                if (result.data.error === 'Invalid User') {
                    $scope.errorMessage = 'User does not exist';
                }else{
                    $scope.errorMessage = 'Error in recovering password';
                }
            });
        }

        $scope.set = function(){

            // Reset Password
            if ($scope.data.password.length >= 6) {
                if ($scope.data.password === $scope.data.password_repeat) {
                    $scope.viewState = 'loading';
                    var params = {
                        token: $stateParams.token,
                        email: $stateParams.email,
                        password: $scope.data.password,
                        password_confirmation: $scope.data.password_repeat
                    };

                    $http.post('/api/authenticate/recover', params).then(function(result) {
                        if (typeof(result.data.error) === 'undefined') {
                            $auth.removeToken();
                            $auth.setToken(result.data);
                            $state.go('app.auth.login', {});
                            console.log('sending from here ...');
                        }else{
                            $scope.errorMessage = 'Error in resetting password';
                            $scope.viewState = 'set';
                        }
                    }, function(result){
                        $scope.errorMessage = 'Error in resetting password';
                        $scope.viewState = 'set';
                    });
                }else{
                    $scope.errorMessage = 'Passwords do not match!';
                }
            }else{
                $scope.errorMessage = 'Passwords need to be longer than 6 characters!';
            }
        }
    }]);

})();

(function() {
    "use strict";

    function dataURItoBlob(dataURI) {
        console.log(dataURI);
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    angular.module('fundator.directives').directive('focusOn', function() {
        return {
            scope: { focusOn: '=' },
            link: function(scope, elem, attr) {
                console.log(scope.focusOn);

                if(scope.focusOn){
                    elem[0].focus();
                }
           }
       };
    });


    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "$resource", "FdScroller", "$filter", "FileUploader", function($rootScope, $scope, $state, $auth, $timeout, $http, $resource, FdScroller, $filter, FileUploader) {

        $scope.form = {
            currentStep: 1,
            totalSteps: 3
        };

        $scope.totalSteps = {
            creator: 3,
            expert: 4,
            investor: 4
        };

        $scope.changeFormStep = function(newStep){
            FdScroller.toTop();
            $scope.form.currentStep = newStep;
        }

        $scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'S Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People\'S Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'RWANDA', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

        $scope.contactTimes = [
            {name: 'Working hours (9am to 6 pm)', value: '9-6'},
            {name: 'Evening time (6am to 9 pm)', value: '6-9'}
        ];

        $scope.data = {
            selectedRole: 'creator',
            ageGate: 'yes',
            countryOrigin: '',
            countryResidence: '',
            contactTime: '',
            expertiseForm: {
                step: 1,
                loading: true
            },
            croppedThumbnail: null,
            email: ''
        };

        var payload = $auth.getPayload();

        $rootScope.$broadcast('stopLoading');

        $scope.changeRole = function() {
            $scope.form.totalSteps = $scope.totalSteps[$scope.data.selectedRole];
        }

        $scope.getProgress = function() {
            return Math.min(($scope.form.currentStep / $scope.form.totalSteps) * 100, 96);
        }

        $scope.getProgressInverted = function() {
            return Math.max(((1 - ($scope.form.currentStep / $scope.form.totalSteps)) * 100), 4);
        }

        $scope.thumbnail = null;
        $scope.croppedThumbnail = null;
        $scope.fileName = 'No file selected';
        $scope.imageError = null;

        $rootScope.$watch('user', function(user){
            if (typeof(user) === 'undefined') return;
            if (user.registered == 1) $state.go('app.contest');

            $scope.data.email = user.email;
        }, true);

        var handleFileSelect = function(evt, drop) {
            evt.stopPropagation();
            evt.preventDefault();

            $scope.$apply(function() {
                $scope.dropable = false;
            });

            if (evt.originalEvent.dataTransfer) {
                var file = evt.originalEvent.dataTransfer.files[0];
            } else {
                var file = evt.currentTarget.files[0];
            }

            var reader = new FileReader();

            if (file.type.indexOf('image') == -1) {
                $scope.$apply(function($scope) {
                    $scope.imageError = 'Please select a valid image to crop';
                });
                return;
            } else {
                $scope.imageError = null;
            }

            $scope.fileName = file.name;

            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    console.log(evt.target.result);
                    $scope.thumbnail = evt.target.result;
                });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        };

        $(document).on('dragover dragleave dragenter', '.img-upload-show', function(event) {
            event.stopPropagation();
            event.preventDefault();
        });

        $(document).on('dragenter', '.img-upload-show', function(event) {
            event.stopPropagation();
            event.preventDefault();

            $scope.$apply(function() {
                $scope.dropable = true;
            });
        });

        $(document).on('dragleave', '.img-upload-show', function(event) {
            event.stopPropagation();
            event.preventDefault();

            $scope.$apply(function() {
                $scope.dropable = false;
            });
        });

        $(document).on('change', '#fileInput', function(e) {
            handleFileSelect(e, false);
        });

        $(document).on('drop', '.img-upload-show', function(e) {
            handleFileSelect(e, true);
        });

        $scope.uploader = new FileUploader({
            url: '/api/files',
            removeAfterUpload: true
        });

        $scope.confirmImage = function(){
            var image = $scope.data.croppedThumbnail;

            $scope.uploader.onBeforeUploadItem = function(item) {
                item.file.name = 'thumbnail_' + $rootScope.user.id + '.png';

                item.formData = [];
                item.formData.push({attach: 'thumbnail'});
                item.formData.push({user_id: $rootScope.user.id});

                $scope.data.imageSuccess = null;
            };

            $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                if (typeof(response.file) !== 'undefined') {
                    $scope.data.imageSuccess = 'Your profile picture was successfully uploaded!';
                }else{
                    $scope.data.imageError = 'Profile picture failed to upload, please try again!';
                }
            };

            $scope.uploader.addToQueue(dataURItoBlob(image));
            $scope.uploader.uploadAll();
        }


        // Expert Related Functions

        $scope.allSkills = $resource('api/skills').query();

        $scope.inputtedExpertiseList = [];

        function addNewInputtedExpertise(){
            var lastInputtedExpertise = {selectedExpertise: 'null', otherExpertise: {status: 1}};

            if ($scope.inputtedExpertiseList.length > 0) {
                $scope.inputtedExpertiseList[$scope.inputtedExpertiseList.length -1];

            }

            console.log($scope.inputtedExpertiseList);
            console.log(lastInputtedExpertise);

            if ($scope.inputtedExpertiseList.length < 3 && (lastInputtedExpertise.selectedExpertise !== null && lastInputtedExpertise.otherExpertise.status !== 0)) {
                $scope.inputtedExpertiseList.push({
                    expertiseCategoryList: [],
                    expertiseSubCategoryList: [],
                    expertiseList: [],
                    skillsList: [],
                    selectedExpertiseCategory: null,
                    otherExpertiseCategory: {name: '', status: 0},
                    selectedExpertiseSubCategory: null,
                    otherExpertiseSubCategory: {name: '', status: 0},
                    selectedExpertise: null,
                    otherExpertise: {name: '', status: 0},
                    selectedSkills: [],
                    otherSkills: {list: [], status: 0},
                    step: 1,
                    loading: false
                })
            };

            $scope.fetchExpertiseCategory($scope.inputtedExpertiseList.length - 1);
        }

        $scope.selectExpertiseCategory = function(index, expertiseCategory, level){
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = expertiseCategory;
                $scope.inputtedExpertiseList[index].step = 2;
                $scope.fetchExpertiseSubCategory(index);
            }else{
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = expertiseCategory;
                $scope.inputtedExpertiseList[index].step = 3;
                $scope.fetchExpertiseList(index);
            }
        }

        $scope.deselectExpertiseCategory = function(e, index, level){
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedSkills = [];
            }else{
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedSkills = [];
            }
            e.stopPropagation();
        }

        $scope.saveOtherExpertiseCategory = function(index, level){
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = null;
                // $scope.inputtedExpertiseList[index].otherExpertiseCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedSkills = [];

                $scope.inputtedExpertiseList[index].otherExpertiseCategory.status = 1;
                $scope.inputtedExpertiseList[index].step = 2;
            }else{
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                // $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].selectedSkills = [];

                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory.status = 1;
                $scope.inputtedExpertiseList[index].step = 3;
            }
        }

        $scope.removeOtherExpertiseCategory = function(index, level){
            if (level === 0) {
                $scope.inputtedExpertiseList[index].otherExpertiseCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
            }else{
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = {name: '', status: 0};
                $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
            }
        }

        $scope.selectExpertise = function(index, expertise){
            $scope.inputtedExpertiseList[index].selectedExpertise = expertise;
            $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
            $scope.inputtedExpertiseList[index].step = 4;
            $scope.fetchSkillsList(index);
            addNewInputtedExpertise();
        }

        $scope.deselectExpertise = function(e, index){
            $scope.inputtedExpertiseList[index].selectedExpertise = null;
            $scope.inputtedExpertiseList[index].selectedSkills = [];
            e.stopPropagation(index);
        }

        $scope.saveOtherExpertise = function(index){
            $scope.inputtedExpertiseList[index].selectedExpertise = null;
            // $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
            $scope.inputtedExpertiseList[index].selectedSkills = [];

            $scope.inputtedExpertiseList[index].otherExpertise.status = 1;
            $scope.inputtedExpertiseList[index].step = 4;
            addNewInputtedExpertise();
        }

        $scope.removeOtherExpertise = function(index){
            $scope.inputtedExpertiseList[index].otherExpertise = {name: '', status: 0};
        }

        $scope.inSkills = function(index, skill){
            var foundSkill = $filter('filter')($scope.inputtedExpertiseList[index].selectedSkills, {id: skill.id}, true);

            if (typeof(foundSkill) !== 'undefined') {
                return foundSkill.length > 0;
            }

            return false;
        }

        $scope.selectSkill = function(index, skill){
            if(!$scope.inSkills(index, skill)){
                $scope.inputtedExpertiseList[index].selectedSkills.push(skill);
            }
            $scope.inputtedExpertiseList[index].step = 4;
        }

        $scope.deselectSkill = function(e, index, skill){
            $scope.inputtedExpertiseList[index].selectedSkills = $filter('filter')($scope.inputtedExpertiseList[index].selectedSkills, {id: skill.id}, function(actual, expected){
                return !angular.equals(actual, expected)
            });
            e.stopPropagation();
        }

        $scope.saveSkills = function(index){
            $scope.inputtedExpertiseList[index].skillsList = angular.copy($scope.inputtedExpertiseList[index].otherSkills.list);
            $scope.inputtedExpertiseList[index].selectedSkills = angular.copy($scope.inputtedExpertiseList[index].otherSkills.list);
            $scope.inputtedExpertiseList[index].otherSkills = {list: [], status: 0};
        }

        $scope.fetchExpertiseCategory = function(index){
            $scope.inputtedExpertiseList[index].expertiseCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise-category/0').then(function(result){
                $scope.inputtedExpertiseList[index].expertiseCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseSubCategory = function(index){
            $scope.expertiseSubCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise-category/' + $scope.inputtedExpertiseList[index].selectedExpertiseCategory.id).then(function(result){
                $scope.inputtedExpertiseList[index].expertiseSubCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseList = function(index){
            $scope.inputtedExpertiseList[index].expertiseList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise/category/' + $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory.id).then(function(result){
                $scope.inputtedExpertiseList[index].expertiseList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            }, 2000);
        }

        $scope.fetchSkillsList = function(index){
            $scope.inputtedExpertiseList[index].skillsList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise/' + $scope.inputtedExpertiseList[index].selectedExpertise.id + '/skills/').then(function(result){
                $scope.inputtedExpertiseList[index].skillsList = result.data;
                $scope.inputtedExpertiseList[index].selectedSkills = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            }, 2000);
        }

        addNewInputtedExpertise()

        // Expert Related Functions

        $scope.submitDetails = function(){
            var userData = {
                name: $scope.data.fname,
                last_name: $scope.data.lname,
                role: $scope.data.selectedRole,
                age_gate: $scope.data.ageGate,
                country_origin: $scope.data.countryOrigin,
                country_residence: $scope.data.countryResidence,
                contact_number: $scope.data.contactNumber,
                contact_time: $scope.data.contactTime.value
            };

            switch($scope.data.selectedRole){
                case 'investor':
                    var investmentBudget = $scope.data.selectedInvestmentBudget;

                    if (investmentBudget === 'other') {
                        investmentBudget = $scope.data.selectedInvestmentBudgetOther;
                    }
                    userData.investor = {};
                    userData.investor.investment_budget = investmentBudget;
                    userData.investor.investment_goal = $scope.data.selectedInvestmentGoal;
                    userData.investor.investment_reason = $scope.data.selectedInvestmentReason;
                break;
                case 'creator':
                    userData.creator = {};
                break;
                case 'expert':
                    userData.expert = { list: [] };

                    angular.forEach($scope.inputtedExpertiseList, function(inputtedExpertise){
                        if (inputtedExpertise.selectedExpertise !== null || inputtedExpertise.otherExpertise.status === 1) {
                            console.log(inputtedExpertise.selectedExpertise);
                            console.log(inputtedExpertise.otherExpertise);
                            userData.expert.list.push({
                                expertise_category: inputtedExpertise.selectedExpertiseCategory,
                                other_expertise_category: inputtedExpertise.otherExpertiseCategory,
                                expertise_sub_category: inputtedExpertise.selectedExpertiseSubCategory,
                                other_expertise_sub_category: inputtedExpertise.otherExpertiseSubCategory,
                                expertise: inputtedExpertise.selectedExpertise,
                                other_expertise: inputtedExpertise.otherExpertise,
                                skills: inputtedExpertise.selectedSkills
                            });
                        };
                    });
                break;
            }

            console.log(userData);

            $rootScope.$broadcast('startLoading');
            FdScroller.toTop();

            $http.put('/api/users/' + $rootScope.user.id, userData).then(function(result){
                if (result.data === 'Updated') {
                    $rootScope.user.name = $scope.data.fname;
                    $rootScope.user.last_name = $scope.data.lname;
                    $rootScope.user.role = $scope.data.selectedRole;
                    $rootScope.user.registered = 1;
                    $rootScope.initialRoleAssignment = true;

                    $rootScope.activeRole = $scope.data.selectedRole;
                    $state.go('app.contest');

                    $rootScope.switchUserRole($scope.data.selectedRole, null, true);
                }
            }, function(result){
                console.log('error');
                console.log(result);
            }).finally(function(){
                $rootScope.$broadcast('stopLoading');
            });
        }

    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ContestCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter) {

        $scope.contests = [];
        $rootScope.$broadcast('startLoading');

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.contests = result;
            $scope.ongoingContests = [];
            $scope.judgingContests = [];

            if ($rootScope.activeRole === 'creator' && typeof($rootScope.user.creator) !== 'undefined') {
                for(var ogc in $rootScope.user.creator.ongoing_contest){
                    var contest_id = $rootScope.user.creator.ongoing_contest[ogc];
                    var contest = $filter('filter')(result, {id: contest_id}, true)[0];

                    if (typeof(contest) !== 'undefined') {
                        $scope.ongoingContests.push(contest);

                        var ogcIndex = $scope.contests.indexOf(contest);
                        console.log('ogcIndex : ' + ogcIndex);
                        $scope.contests.splice(ogcIndex, 1);
                    }
                }
            }else if($rootScope.activeRole === 'jury' && $rootScope.user.judging.length > 0){
                for(var jc in $rootScope.user.judging){
                    var contest_id = $rootScope.user.judging[jc].contest_id;

                    var contest = $filter('filter')(result, {id: contest_id}, true)[0];

                    if (typeof(contest) !== 'undefined') {
                        $scope.judgingContests.push(contest);
                    }
                }
            }
        }).finally(function() {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
            }, 1000);
        });
    }]);

    angular.module('fundator.directives').directive('fdEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.fdEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    angular.module('fundator.controllers').controller('ContestSingleCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$filter", "$timeout", "FdScroller", "$http", "Lightbox", function($rootScope, $scope, $state, $stateParams, $resource, $filter, $timeout, FdScroller, $http, Lightbox) {
        $scope.contestId = $stateParams.contestId;
        $scope.data = {
            contestFullDescription: false,
            addEntry: false,
            addEntryForm: {
                description: '',
                attachedFiles: []
            },
            selectedEntry: null,
            rating: {
                design: '',
                creativity: '',
                industrial: '',
                market: ''
            }
        };

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        var Entry = $resource('/api/entries/:entryId', {
            entryId: '@id'
        }, {
            contestantEntries: {
                method: 'GET',
                url: '/api/entries/contest/:contestId/creator/:creatorId',
                isArray: true
            },
            judgeEntries: {
                method: 'GET',
                url: '/api/entries/contest/:contestId/judge/:judgeId',
                isArray: true
            },
            sendMessage: {
                method: 'POST',
                url: '/api/entries/:entryId/messages',
                isArray: false
            }
        });

        var EntryRating = $resource('/api/entry-ratings/:entryRatingId', function(){
            entryRatingId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        FdScroller.toTop();
        $rootScope.$broadcast('startLoading');

        $scope.showFullText = function() {
            FdScroller.toSection('.contest-single', 50);
            $scope.data.contestFullDescription = true;
        }

        $scope.hideFullText = function() {
            FdScroller.toTop();
            $scope.data.contestFullDescription = false;
        }

        Contest.get({
            contestId: $scope.contestId
        }).$promise.then(function(result) {
            $scope.contest = result;

            var judgeable = $filter('filter')($rootScope.user.judging, {
                contest_id: $scope.contestId,
                status: 1
            });

            var pendingJudgeable = $filter('filter')($rootScope.user.judging, {
                contest_id: $scope.contestId,
                status: 0
            });

            var contesting = $filter('filter')($rootScope.user.contesting, {
                contest_id: $scope.contestId,
                status: 1
            });

            var pendingContesting = $filter('filter')($rootScope.user.contesting, {
                contest_id: $scope.contestId,
                status: 0
            });

            if (typeof(judgeable) !== 'undefined') {
                if (judgeable.length > 0 && ($rootScope.activeRole !== 'jury' && $rootScope.activeRole !== 'creator')) {
                    $rootScope.flashNotices.juryView.show = true;
                    $rootScope.flashNotices.juryView.contestId = result.id;

                    $rootScope.flashNotices.juryView.onClick = function() {
                        $state.go('app.contestsingle', {
                            role: 'jury',
                            contestId: result.id
                        });
                    };
                } else if($rootScope.activeRole === 'jury' && judgeable.length > 0) {
                    $scope.loadEntries($rootScope.activeRole);
                }
            }

            if (typeof(pendingJudgeable) !== 'undefined') {
                if (pendingJudgeable.length > 0) {
                    $scope.data.showJudgeNdaPending = true;
                }
            }

            if (typeof(contesting) !== 'undefined') {
                if (contesting.length > 0 && $rootScope.activeRole === 'creator') {
                    $scope.loadEntries($rootScope.activeRole);
                }
            }

            if (typeof(pendingContesting) !== 'undefined') {
                if (pendingContesting.length > 0) {
                    $scope.data.showContestantNdaPending = true;
                }
            }

        }).finally(function() {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
            }, 1000);
        });

        $scope.loadEntries = function(role) {
            switch(role){
                case 'jury':
                    Entry.judgeEntries({
                        contestId: $scope.contestId,
                        judgeId: $rootScope.user.id
                    }).$promise.then(function(result){
                        $scope.contest.entries = angular.copy(result);
                    });
                    break;
                case 'creator':
                    var roles = $filter('filter')($rootScope.user.user_roles, {role: 'creator'}, true);

                    if (roles.length > 0) {
                        var creator = roles[0];

                        Entry.contestantEntries({
                            contestId: $scope.contestId,
                            creatorId: creator.id
                        }).$promise.then(function(result){
                            $scope.contest.entries = angular.copy(result);
                        });
                    }
                    break;
            }
        }

        $scope.selectEntry = function(entry) {
            $scope.data.addEntry = false;
            $scope.data.selectedEntry = entry;

            FdScroller.toSection('.entries-list');

            var judgeId = null;

            if ($rootScope.activeRole === 'jury') {
                judgeId = $rootScope.user.id;
            }

            if (judgeId !== null) {
                $http.get('/api/entries/' + entry.id + '/judge/' + judgeId).then(function(result){
                    $scope.data.selectedEntry = result.data;
                    $scope.data.selectedEntry.rating = result.data.rating;

                    $scope.data.selectedEntry.gallery = [
                        'images/1.png',
                        'images/2.png',
                        'images/3.png',
                    ];

                    $timeout(function(){
                        $('.chatbox').animate({scrollTop: 10000});
                    }, 100);
                });
            }else{
                Entry.get({
                    entryId: entry.id
                }).$promise.then(function(result) {
                    $scope.data.selectedEntry = result;
                    $scope.data.selectedEntry.gallery = [
                        'images/1.png',
                        'images/2.png',
                        'images/3.png',
                    ];

                    $timeout(function(){
                        $('.chatbox').animate({scrollTop: 10000});
                    }, 100);
                });
            }

        };

        $scope.openLightbox = function(item) {
            var allFiles = $scope.data.selectedEntry.files;
            var allImages = [];
            var currentIndex = 0;

            for(var aF in allFiles){
                var file = allFiles[aF];
                allImages.push(file.url);

                if (file.url === item.url) {
                    currentIndex = aF;
                }
            }

            Lightbox.openModal(allImages, currentIndex);
        }

        $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
            event.preventDefault();
            console.log('fileAdded');
            console.log($flow);
            console.log(flowFile);
        });

        $scope.entryFileSuccess = function($file, $message) {
            var message = JSON.parse($message);
            console.log($file);

            console.log('Adding files : ' + message.file.id);
            $file.ref_id = message.file.id;

            // var items = $filter('filter')($scope.data.addEntryForm.attachedFiles, {id: message.file.id});
            // var item = null;

            // if (typeof(items) !== 'undefined' && items.length > 0) {
            //     item = items[0];
            // }

            var index = $scope.data.addEntryForm.attachedFiles.indexOf(message.file.id);

            if (index === -1) {
                $scope.data.addEntryForm.attachedFiles.push({
                    id: message.file.id,
                    caption: ''
                });
            }

        }

        $scope.entryFileRemove = function(file, $flow) {
            // var items = $filter('filter')($scope.data.addEntryForm.attachedFiles, {id: file.id});
            // var item = null;

            // if (typeof(items) !== 'undefined' && items.length > 0) {
            //     item = items[0];
            // }

            var index = $scope.data.addEntryForm.attachedFiles.indexOf(file.ref_id);

            if (index !== -1) {
                $scope.data.addEntryForm.attachedFiles.splice(index, 1);
            }

            var filesIndex = $flow.files.indexOf(file);
            if (filesIndex !== -1) {
                console.log('remove files ... ' + filesIndex);
                $flow.files.splice(filesIndex, 1);
            }

            console.log($flow.files);
            console.log($scope.data.addEntryForm.attachedFiles);
        }

        $scope.showAddEntry = function() {
            FdScroller.toSection('.entries-list');

            $scope.data.selectedEntry = null;
            $scope.data.addEntry = true;
            $scope.data.addEntryForm.description = '';
            $scope.data.addEntryForm.attachedFiles = [];

            $scope.data.addEntryForm.description = $scope.contest.entries[$scope.contest.entries.length - 1].description;
        }

        $scope.submitEntry = function() {
            $scope.data.savingEntry = true;

            var attachedFiles = {};
            var thumbnail_id = null;

            angular.forEach($scope.data.addEntryForm.flow.files, function(file){
                attachedFiles[file.ref_id] = {
                    'caption': file.ref_caption
                };

                console.log('prepare to assign thumbnail');
                if (file.file.type.indexOf('image') !== -1 && thumbnail_id === null) {
                    console.log('whoopie it matches');
                    thumbnail_id = file.ref_id;
                }
            });

            var roles = $filter('filter')($rootScope.user.user_roles, {role: 'creator'}, true);

            if (roles.length > 0) {
                var role = roles[0];

                var entry = new Entry();
                entry.creator_id = role.id;
                entry.contest_id = $scope.contest.id;
                entry.thumbnail_id = thumbnail_id;

                entry.name = $rootScope.user.name + "'s Entry";
                entry.description = $scope.data.addEntryForm.description;
                entry.attached_files = attachedFiles;

                console.log(entry.thumbnail_id);

                entry.$save().then(function(result){
                    console.log('Entry Saved!');
                    console.log(result);

                    $scope.data.savingEntry = false;
                    $scope.data.savedEntry = true;

                    $timeout(function(){
                        $scope.data.selectedEntry =  false;
                        $scope.selectEntry(result);
                        $scope.loadEntries('creator');
                    }, 1000);
                });
            }

        }

        $scope.sendMessage = function(){
            var messageRequest = {
                message: $scope.data.messageToSend
            };

            Entry.sendMessage({entryId: $scope.data.selectedEntry.id}, messageRequest, function(result){
                $scope.data.selectedEntry.messages.push(result);
                $scope.data.messageToSend = '';

                $timeout(function(){
                    $('.chatbox').animate({scrollTop: 10000});
                }, 100);
            });
        };

        $scope.saveMarks = function(entryRatingId){
            $scope.data.savingMarks = true;

            var updatedRating = {
                design: $scope.data.selectedEntry.rating.design,
                creativity: $scope.data.selectedEntry.rating.creativity,
                industrial: $scope.data.selectedEntry.rating.industrial,
                market: $scope.data.selectedEntry.rating.market,
            };

            updatedRating.judge_id = $rootScope.user.id;
            updatedRating.entry_id = $scope.data.selectedEntry.id;

            if (typeof(entryRatingId) !== 'undefined') {
                EntryRating.update({
                    entryRatingId: entryRatingId
                }, updatedRating).$promise.then(function(result){
                    if (result !== 'error') {
                        console.log('entry rating saved!');
                        $scope.data.savingMarks = false;
                        $scope.data.savedMarks = true;

                        $scope.loadEntries('jury');

                        $timeout(function(){
                            $scope.data.savedMarks = false;
                        }, 1000);
                    }
                });

            }else{
                var entryRating = new EntryRating(updatedRating);
                entryRating.$save().then(function(result){
                    if (result !== 'error') {
                        console.log('entry rating created!');
                        $scope.data.savingMarks = false;
                        $scope.data.savedMarks = true;

                        $scope.loadEntries('jury');

                        $timeout(function(){
                            $scope.data.savedMarks = false;
                        }, 1000);
                    }
                });
            }

        }

        $scope.becomeJudge = function(){
            // Show NDA
            FdScroller.toSection('.contest-single', 50);
            $scope.data.showJudgeNda = true;
        }

        $scope.acceptJudge = function(){
            $scope.data.showJudgeNdaLoading = true;

            $http.post('/api/users/becomeJudge', {contest_id: $scope.contest.id}).then(function(result){
                console.log(result)
                if (typeof(result.data.error) === 'undefined') {
                    $scope.data.showJudgeNdaSuccess = true;

                    $timeout(function(){
                        FdScroller.toTop();
                        $scope.data.showJudgeNda = false;
                    }, 1000);
                }
            }).finally(function(){
                $scope.data.showJudgeNdaLoading = false;
            });
        }

        $scope.becomeContestant = function(){
            // Show NDA
            FdScroller.toSection('.contest-single', 50);
            $scope.data.showContestantNda = true;
        }

        $scope.acceptContestant = function(){
            $scope.data.showContestantNdaLoading = true;

            $http.post('/api/users/becomeContestant', {contest_id: $scope.contest.id}).then(function(result){
                console.log(result)
                if (typeof(result.data.error) === 'undefined') {
                    $scope.data.showContestantNdaSuccess = true;

                    $timeout(function(){
                        FdScroller.toTop();
                        $scope.data.showContestantNda = false;
                    }, 1000);
                }
            }).finally(function(){
                $scope.data.showContestantNdaLoading = false;
            });
        }
    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('FooterController', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter) {
        $scope.notifications = null;

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.ongoingContests = result;
        });
    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('FlashNoticeCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", function($rootScope, $scope, $state, $stateParams, $resource, $timeout) {
        $rootScope.flashNotices = {};

        $rootScope.flashNotices.juryView = {
        	show: false,
        	contestId: 0,
        	onClick: function(){
        		console.log('onClick');
        		$rootScope.switchUserRole('jury', 5, true);
        	}
        };
    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HeaderCtrl', ["$rootScope", "$scope", "$state", "$auth", function($rootScope, $scope, $state, $auth) {

    }]);

})();

(function() {
    "use strict";

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    angular.module('fundator.controllers').controller('NavigationCtrl', ["$rootScope", "$scope", "$state", "$auth", "$log", "$timeout", "$http", "$resource", "$uibModal", "FileUploader", function($rootScope, $scope, $state, $auth, $log, $timeout, $http, $resource, $uibModal, FileUploader) {

        $scope.allSkills = $resource('api/skills').query();

        $scope.uploader = new FileUploader({
            url: '/api/files',
            removeAfterUpload: true
        });

        $scope.data = {
            userSettingsMode: 'view',
            userSettingsSave: -1
        };

        $scope.saveProfile = function(){
            var userData = angular.copy($rootScope.user);
            delete userData['creator'];
            delete userData['investor'];
            delete userData['judging'];

            console.log('saving');
            console.log(userData);

            $scope.data.userSettingsSave = 0;

            $http.put('/api/users/' + $rootScope.user.id, userData).then(function(result){
                if (result.data === 'Updated') {

                    $scope.data.userSettingsSave = 1;
                    $scope.data.userSettingsMode = 'view';

                    $timeout(function(){
                        $scope.data.userSettingsSave = -1;
                    }, 1000);
                }
            }, function(result){
                console.log('error');
                console.log(result);
            }).finally(function(){
                $timeout(function(){
                    $scope.data.userSettingsSave = -1;
                }, 1000);
            });
        }

        // Change user thumbnail
        $scope.changeThumbnail = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './views/app/app/header/user-thumbnail.html',
                controller: 'UserThumbnailCtrl',
                size: 'md'
            });

            modalInstance.result.then(function (thumbnail) {
                $rootScope.user.thumbnail = angular.copy(thumbnail);

                $scope.uploader.onBeforeUploadItem = function(item) {
                    item.file.name = 'thumbnail_' + $rootScope.user.id + '.png';

                    item.formData = [];
                    item.formData.push({attach: 'thumbnail'});
                    item.formData.push({user_id: $rootScope.user.id});
                };

                $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    console.log('updated user thumbnail');
                    console.log(response);
                };

                // Start uploading the file
                $scope.uploader.addToQueue(dataURItoBlob(thumbnail));
                $scope.uploader.uploadAll();

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        // Logout
        $scope.logout = function(){
            console.log('actually logging out! ...');
            $auth.logout().then(function() {
                localStorage.removeItem('fundator_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;
                $rootScope.isNavShown = false;

                $state.go('app.auth.login', {}, {reload: true});
            });
        }

        // Populate side navigation
        $scope.populateSideNavigation = function(){
            $http.get('/api/users/sideNavigationData').then(function(result){
                if (typeof(result.data.error) === 'undefined') {
                    $scope.sideNavigationData = result.data;
                }
            });
        }
        $scope.populateSideNavigation();

        $scope.openFullMenu = function(){
            $rootScope.isNavShown = 1;
        }
    }]);

})();

(function(){
  "use strict";

  angular.module('fundator.controllers').controller('UserThumbnailCtrl', ["$scope", "$rootScope", "$uibModalInstance", function($scope, $rootScope, $uibModalInstance){
    $scope.thumbnail = null;
    $scope.croppedThumbnail = null;
    $scope.fileName = 'No file selected';
    $scope.imageError = null;

    var handleFileSelect = function(evt, drop) {
        evt.stopPropagation();
        evt.preventDefault();

        $scope.$apply(function(){
            $scope.dropable = false;
        });

        if (evt.originalEvent.dataTransfer) {
            var file = evt.originalEvent.dataTransfer.files[0];
        }else{
            var file = evt.currentTarget.files[0];
        }

        var reader = new FileReader();

        if (file.type.indexOf('image') == -1) {
            $scope.$apply(function($scope){
                $scope.imageError = 'Please select a valid image to crop';
            });
            return;
        }else{
            $scope.imageError = null;
        }

        $scope.fileName = file.name;

        reader.onload = function(evt) {
            $scope.$apply(function($scope) {
                console.log(evt.target.result);
                $scope.thumbnail = evt.target.result;
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    $(document).on('dragover dragleave dragenter', '.img-upload-show', function(event) {
        event.stopPropagation();
        event.preventDefault();
    });

    $(document).on('dragenter', '.img-upload-show', function(event) {
        event.stopPropagation();
        event.preventDefault();

        $scope.$apply(function(){
            $scope.dropable = true;
        });
    });

    $(document).on('dragleave', '.img-upload-show', function(event) {
        event.stopPropagation();
        event.preventDefault();

        $scope.$apply(function(){
            $scope.dropable = false;
        });
    });

    $(document).on('change', '#fileInput', function(e){
        handleFileSelect(e, false);
    });
    $(document).on('drop', '.img-upload-show', function(e){
        handleFileSelect(e, true);
    });

    $scope.setThumbnail = function(){
        $uibModalInstance.close($scope.croppedThumbnail);
    }

    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
  }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", function($rootScope, $scope, $state, $stateParams, $http) {
        console.log('Home View Started');

        // Redirect to contest
        $state.go('app.contest');
    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('InvestCtrl', ["$rootScope", "$scope", "$state", "$resource", "FdScroller", function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Invest Started');
        $rootScope.$broadcast('stopLoading');

        // Scroll to the top
        FdScroller.toTop();

        $scope.investors = [
            {name: 'Alain Amoretti', country: 'France', image: '1.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eveniet deserunt ad pariatur praesentium, incidunt molestiae beatae quam quasi reiciendis mollitia accusantium voluptate quaerat sequi officia a facere repellat adipisci.'},
            {name: 'Charles d\'anterroches', country: 'France', image: '2.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dignissimos nemo, sequi doloribus accusantium, obcaecati natus iure quam esse ex labore neque consequatur voluptate in, nihil ea, cum recusandae ut.'},
            {name: 'Christophe Brissiaud', country: 'China', image: '3.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo enim officia optio dolorum harum, soluta culpa unde veniam nobis eos, ducimus quod praesentium veritatis atque non nostrum ipsam. Nostrum, et!'},
            {name: 'Jean-Bernard Antoine', country: 'China', image: '4.jpeg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia recusandae aliquid quos aperiam molestiae quibusdam qui eos iure saepe optio vitae fugit unde nam, atque excepturi deserunt est, repellat alias.'},
            {name: 'Xavier Paulin', country: 'Taiwan', image: '5.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'},
            {name: 'Cindy Chung', country: 'Hong Kong', image: '6.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'}
        ];
    }]);

    angular.module('fundator.directives').filter('trustedHtml', ['$sce', function($sce) {
        return function(html) {
            return $sce.trustAsHtml(html);
        };
    }]);

    angular.module('fundator.directives')

    .directive('fdChart', function() {
        return {
            template: '<canvas id="fdChart" width="{{width}}" height="{{height}}"></canvas>',
            restrict: 'E',
            transclude: true,
            scope: {
                data: '='
            },
            link: function($scope, $element, $attrs) {

                $scope.width = $attrs.width;
                $scope.height = $attrs.height;


                $element.find('canvas').width($attrs.width);
                $element.find('canvas').height($attrs.height);

                var pieDataA = [{
                    value: 4,
                    color: "#006837",
                    highlight: "#02753f",
                    label: "Public"
                }, {
                    value: 96,
                    color: "#94c44d",
                    highlight: "#8cba47",
                    label: "Fundator"
                }];

                var lineDataA = {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [
                        {
                            label: "Planned",
                            fillColor: "transparent",
                            strokeColor: "#A6A8AB",
                            pointColor: "#006837",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "#006837",
                            data: [65, 60, 59, 63, 59, 58, 63, 64, 65, 66, 70, 79]
                        },
                        {
                            label: "Realized",
                            fillColor: "transparent",
                            strokeColor: "#A6A8AB",
                            pointColor: "#93C658",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "#93C658",
                            data: [28, 22, 16, 21, 17, 20, 27, 25, 23, 32, 40, 45]
                        }
                    ]
                };

                if($attrs.data === 'A'){
                    var ctx = $element.find('canvas')[0].getContext('2d');

                    var fdChart = new Chart(ctx).Pie(pieDataA, {
                        segmentShowStroke : false,
                        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                    });

                    $element.find('canvas').after('<div class="pie-chart-labels"></div>');
                    jQuery(pieDataA).each(function(i, the_item) {
                        $element.find("canvas + .pie-chart-labels").prepend('<div class="pie-chart-label"><span style="background-color: '+the_item.color+';"></span> '+the_item.value+'% '+the_item.label+'</div>');
                    });
                }else{
                    var ctx = $element.find('canvas')[0].getContext('2d');

                    var fdChart = new Chart(ctx).Line(lineDataA, {
                        segmentShowStroke : false,
                        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                    });

                    $element.find('canvas').after('<div class="line-chart-labels"></div>');
                    $element.find("canvas + .line-chart-labels").prepend('<div class="line-chart-label"><span style="background-color: #006837;"></span> Realized</div>');
                    $element.find("canvas + .line-chart-labels").prepend('<div class="line-chart-label"><span style="background-color: #93C658;"></span> Planned</div>');
                }
            }
        };
    });

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('NotificationsCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "FdNotifications", function($rootScope, $scope, $state, $stateParams, $http, FdNotifications) {
        $scope.notifications = null;

        FdNotifications.getLatestNotifications().then(function(result){
        	$scope.notifications = result.notifications;
        })
    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('PageCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "FdScroller", function($rootScope, $scope, $state, $stateParams, $http, FdScroller) {
        $rootScope.$broadcast('startLoading');
        FdScroller.toTop();

        $scope.page = {
        	title: '',
        	content: ''
        };

        $http.get('/api/pages/' + $stateParams.slug).then(function(result){
        	console.log('Success');
        	console.log(result);
        	$scope.page = result.data;
        }, function(error){
			console.log('Error');
			console.log(error);

			if (error.status == '404') {
				console.log('load 404')
			};
        }).finally(function(){
        	$rootScope.$broadcast('stopLoading');
        });
    }]);

})();
(function (){
    "use strict";

    angular.module('fundator.config').config(["$authProvider", function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate';
        $authProvider.tokenPrefix = 'fundator';

        var redirectUriPath = window.location.protocol + '//' + window.location.hostname;

        $authProvider.linkedin({
        	clientId: '77zjxfbh2928re',
            url: '/api/authenticate/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: redirectUriPath + '/api/authenticate/linkedin',
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            display: 'self'
        });

        $authProvider.google({
            clientId: '1042247727091-dmqc55af7tl58h2rqv3pqnrmjjbb9733.apps.googleusercontent.com',
            url: '/api/authenticate/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: redirectUriPath + '/api/authenticate/google',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 452, height: 633 }
        });

        $authProvider.facebook({
            clientId: '900533123395920',
            name: 'facebook',
            url: '/api/authenticate/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: redirectUriPath + '/api/authenticate/facebook',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
      });
    }]);

})();


(function (){
    "use strict";

    angular.module('fundator.config').config(["flowFactoryProvider", function (flowFactoryProvider){

        flowFactoryProvider.defaults = {
        	uploadMethod: 'POST',
            target: '/api/files/',
            permanentErrors:[404, 500, 501]
        };

    }]);

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiZGlyZWN0aXZlcy9sb2FkZXIuZGlyZWN0aXZlLmpzIiwiZmlsdGVycy9zdHJpcEh0bWwuanMiLCJzZXJ2aWNlcy9ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9zY3JvbGxlci5zZXJ2aWNlLmpzIiwiYXBwL2F1dGgvYXV0aC5qcyIsImFwcC9hdXRoL3JlZ2lzdGVyLmpzIiwiYXBwL2NvbnRlc3QvY29udGVzdC5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuanMiLCJhcHAvaG9tZS9ob21lLmpzIiwiYXBwL2ludmVzdC9pbnZlc3QuanMiLCJhcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmpzIiwiYXBwL3BhZ2UvcGFnZS5qcyIsImNvbmZpZy9hdXRoLmpzIiwiY29uZmlnL2Zsb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUEscUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBLENBQUEsMkJBQUEseUJBQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQTs7O0FDbEJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxnREFB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QTs7WUFFQSxPQUFBLHVCQUFBLE9BQUEsc0JBQUEsU0FBQTs7O1FBR0EsT0FBQSwwQkFBQSxTQUFBLE9BQUEsbUJBQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLDBCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLG1CQUFBOzs7O1FBSUEsT0FBQSw0QkFBQSxTQUFBLEdBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsNkJBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsdUJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwwQkFBQSxTQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7O1FBSUEsT0FBQSwrQkFBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7O1FBSUEsT0FBQSxrQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7WUFDQSxPQUFBLGdCQUFBO1lBQ0E7OztRQUdBLE9BQUEsb0JBQUEsU0FBQSxHQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7WUFDQSxFQUFBLGdCQUFBOzs7UUFHQSxPQUFBLHFCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTs7WUFFQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGVBQUEsU0FBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0E7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7OztRQUdBLE9BQUEsV0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsYUFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUE7O1lBRUEsSUFBQSxPQUFBLGdCQUFBLGFBQUE7Z0JBQ0EsT0FBQSxXQUFBLFNBQUE7OztZQUdBLE9BQUE7OztRQUdBLE9BQUEsY0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLEdBQUEsQ0FBQSxPQUFBLFNBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLEtBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLE9BQUE7OztRQUdBLE9BQUEsZ0JBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxRQUFBLFNBQUE7Z0JBQ0EsT0FBQSxDQUFBLFFBQUEsT0FBQSxRQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsYUFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsYUFBQSxRQUFBLEtBQUEsT0FBQSxzQkFBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGNBQUEsQ0FBQSxNQUFBLElBQUEs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SUFBQTs7O1FBR0EsT0FBQSxHQUFBOzs7O0FDUEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsNEVBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxXQUFBLFlBQUE7UUFDQSxRQUFBLElBQUE7UUFDQSxXQUFBLFdBQUE7OztRQUdBLFdBQUE7O1FBRUEsT0FBQSxZQUFBO1lBQ0EsQ0FBQSxNQUFBLGtCQUFBLFNBQUEsVUFBQSxPQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSwwQkFBQSxTQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsd0JBQUEsU0FBQSxTQUFBLE9BQUEsU0FBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLHdCQUFBLFNBQUEsU0FBQSxPQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSxpQkFBQSxTQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsZUFBQSxTQUFBLGFBQUEsT0FBQSxTQUFBLE9BQUE7Ozs7SUFJQSxRQUFBLE9BQUEsdUJBQUEsT0FBQSxlQUFBLENBQUEsUUFBQSxTQUFBLE1BQUE7UUFDQSxPQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsS0FBQSxZQUFBOzs7O0lBSUEsUUFBQSxPQUFBOztLQUVBLFVBQUEsV0FBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQSxNQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7O2dCQUVBLE9BQUEsUUFBQSxPQUFBO2dCQUNBLE9BQUEsU0FBQSxPQUFBOzs7Z0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQSxPQUFBO2dCQUNBLFNBQUEsS0FBQSxVQUFBLE9BQUEsT0FBQTs7Z0JBRUEsSUFBQSxXQUFBLENBQUE7b0JBQ0EsT0FBQTtvQkFDQSxPQUFBO29CQUNBLFdBQUE7b0JBQ0EsT0FBQTttQkFDQTtvQkFDQSxPQUFBO29CQUNBLE9BQUE7b0JBQ0EsV0FBQTtvQkFDQSxPQUFBOzs7Z0JBR0EsSUFB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V0FBQTtZQUNBLGFBQUE7WUFDQSxnQkFBQTtZQUNBLFNBQUE7WUFDQSxNQUFBO1lBQ0EsY0FBQSxFQUFBLE9BQUEsS0FBQSxRQUFBOzs7UUFHQSxjQUFBLFNBQUE7WUFDQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLEtBQUE7WUFDQSx1QkFBQTtZQUNBLGFBQUEsa0JBQUE7WUFDQSxtQkFBQSxDQUFBLFdBQUE7WUFDQSxPQUFBLENBQUE7WUFDQSxnQkFBQTtZQUNBLFNBQUE7WUFDQSxNQUFBO1lBQ0EsY0FBQSxFQUFBLE9BQUEsS0FBQSxRQUFBOzs7Ozs7O0FDakRBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSwrQkFBQSxVQUFBLG9CQUFBOztRQUVBLG9CQUFBLFdBQUE7U0FDQSxjQUFBO1lBQ0EsUUFBQTtZQUNBLGdCQUFBLENBQUEsS0FBQSxLQUFBOzs7Ozs7QUFNQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBmdW5kYXRvciA9IGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvcicsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdmdW5kYXRvci5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZmlsdGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnJvdXRlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29uZmlnJ1xuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycsIFsnbmdSZXNvdXJjZScsICduZ0Nvb2tpZXMnLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplcicsICdhbmd1bGFyTW9tZW50JywgJ2FuZ3VsYXItb3dsLWNhcm91c2VsJywgJ25nSW1nQ3JvcCcsICdhbmd1bGFyRmlsZVVwbG9hZCcsICdib290c3RyYXBMaWdodGJveCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycsIFsnb3JkaW5hbCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycsIFsnZGliYXJpLmFuZ3VsYXItZWxsaXBzaXMnLCAnbG9jYWx5dGljcy5kaXJlY3RpdmVzJywgJ3RleHRBbmd1bGFyJywgJ2Zsb3cnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdCcpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ25hdmlnYXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOYXZpZ2F0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmxhc2hOb3RpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnZmxhc2gtbm90aWNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRmxhc2hOb3RpY2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGb290ZXJDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnbm90aWZpY2F0aW9ucycsICdub3RpZmljYXRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTm90aWZpY2F0aW9uc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHF1aWNrVXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguc2lnbnVwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ3NpZ251cCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguZm9yZ290Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9mb3Jnb3QnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2ZvcmdvdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVjb3ZlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVjb3Zlcj90b2tlbiZlbWFpbCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVjb3ZlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhSZWNvdmVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmNvbmZpcm0nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm0/Y29kZSZlbWFpbCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnY29uZmlybScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDb25maXJtQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnJlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdHNpbmdsZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdC86Y29udGVzdElkJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmdyYWJzaGFyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZ3JhYi1hLXNoYXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5wYWdlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy86c2x1ZycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3BhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIsICRmaWx0ZXIsICRjb29raWVzLCBGZE5vdGlmaWNhdGlvbnMsIEZkU2Nyb2xsZXIpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG4gICAgICAgICRyb290U2NvcGUuaW5pdGlhbExvY2F0aW9uU2V0dXAgPSBmYWxzZTtcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAnJztcbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IG51bGw7XG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUudG9nZ2xlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICgkcm9vdFNjb3BlLmlzTmF2U2hvd24gPj0gMC41KSA/ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAgOiAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAwLjU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3N0YXJ0TG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RvcExvYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb2luZyB0byByZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLnJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2VyU2VydmljZSBpcyBhbiBleGFtcGxlIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgJHVybFJvdXRlcidzIGRlZmF1bHQgaGFuZGxlciBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZFxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB1c2VyIG9iamVjdCBhbmQgdGFza3NcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdXNlcj90b2tlbj0nICsgJGF1dGguZ2V0VG9rZW4oKSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZkTm90aWZpY2F0aW9ucy5pbml0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvaW5nIHRvIHJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWduYWxSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVJvbGUgPSAkcm9vdFNjb3BlLnVzZXIucm9sZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoJGNvb2tpZXMuZ2V0KCdmZF9hY3RpdmVfcm9sZScpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUm9sZSA9ICRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IGFjdGl2ZVJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiByb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocm9sZS5yb2xlLCByb2xlLmlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShvcmlnbmFsUm9sZS5yb2xlLCBvcmlnbmFsUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgPT09ICd1bmRlZmluZWQnICYmIGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ3JlY292ZXInKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ICYmICRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSAmJiB0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEgJiYgZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSByb2xlO1xuICAgICAgICAgICAgJGNvb2tpZXMucHV0KCdmZF9hY3RpdmVfcm9sZScsIHJvbGUpO1xuXG4gICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclJvbGVWaWV3cyA9IFt7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdxdWlja1VwZGF0ZScsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydDogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW52ZXN0b3I6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtaW52ZXN0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1qdXJ5JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdHNpbmdsZScsXG4gICAgICAgICAgICAgICAgdmlldzogJ21haW5AJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZS1qdXJ5JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWp1cnknKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9ICcvYXBpL2NyZWF0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6IG1vZGVsID0gJy9hcGkvaW52ZXN0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltyb2xlXSA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc3RhdGUuY3VycmVudC5uYW1lID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQubmFtZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5jdXJyZW50LnBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJHN0YXRlLmN1cnJlbnQubmFtZSwgJHN0YXRlLmN1cnJlbnQucGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUuY3VycmVudC5uYW1lID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuY3VycmVudC5uYW1lID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuY3VycmVudC5wYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuY3VycmVudC5uYW1lLCAkc3RhdGUuY3VycmVudC5wYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFzIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuaGFzVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG5cdC5kaXJlY3RpdmUoJ2ZkTG9hZGVyJywgZnVuY3Rpb24oKSB7XG5cdCAgcmV0dXJuIHtcblx0ICBcdHNjb3BlOiB7XG5cdCAgXHRcdHZpZXdCb3g6ICdAJ1xuXHQgIFx0fSxcblx0ICAgIHJlc3RyaWN0OiAnRScsXG5cdCAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJmZC1sb2FkZXIgbGEtYmFsbC1wdWxzZVwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicsXG5cdCAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0ICAgIFx0JGVsZW1lbnQuYWRkQ2xhc3MoJGF0dHJzLmNsYXNzKTtcblx0ICAgIH1cblx0ICB9O1xuXHR9KTtcblxufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdzdHJpcFRhZ3MnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAoU3RyaW5nLmZyb21DaGFyQ29kZSgxNjApLCBcImdcIik7XG5cdFx0XHRcdHRleHQgPSBTdHJpbmcodGV4dCkucmVwbGFjZShyZSwgXCIgXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXlxceDAwLVxceDdGXS9nLCBcIlwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvJm5ic3A7L2dpLCcgJyk7XG5cdFx0XHR9XG5cblx0ICAgICBcdHJldHVybiB0ZXh0ID8gU3RyaW5nKHRleHQpLnJlcGxhY2UoLzxbXj5dKz4vZ20sICcnKSA6ICcnO1xuXHQgICAgfTtcblx0ICB9XG5cdCk7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnKS5maWx0ZXIoJ2NsZWFuSHRtbCcsIGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZih0ZXh0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHR9XG5cblx0ICAgICBcdHJldHVybiB0ZXh0O1xuXHQgICAgfTtcblx0ICB9XG5cdCk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmROb3RpZmljYXRpb25zJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHEsICRpbnRlcnZhbCwgJGh0dHAsICRzdGF0ZSkge1xuICAgICAgICB2YXIgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IFtdLFxuICAgICAgICAgICAgdW5yZWFkOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHB1c2hOb3RpZmljYXRpb24gPSBmdW5jdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSkge1xuICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yobm90aWZpY2F0aW9ucykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zID0gbm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvbm90aWZpY2F0aW9ucy8nICsgdXNlci5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uc0ludGVydmFsID0gJGludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsTm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXRlc3ROb3RpZmljYXRpb25zID0gYW5ndWxhci5jb3B5KGdsb2JhbE5vdGlmaWNhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zID0gbGF0ZXN0Tm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLnNsaWNlKDAsIDUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKG5vdGlmaWNhdGlvbnNJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQucmVzb2x2ZShsYXRlc3ROb3RpZmljYXRpb25zKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZE5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvbm90aWZpY2F0aW9ucy8nICsgbm90aWZpY2F0aW9uSWQgKyAnL3JlYWQnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgXHRub3RpZmljYXRpb24ucmVhZCA9IDE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZEFsbE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL25vdGlmaWNhdGlvbnMvdXNlci8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy9yZWFkJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zLnVucmVhZCA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbm90aWZpY2F0aW9uVHJpZ2dlcjogZnVuY3Rpb24oY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgIC8vICAgICBzd2l0Y2goY2F0ZWdvcnkpe1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdkb3dubG9hZC5uZXcnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQuZG93bmxvYWRzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdwYXJ0bmVyLnBhaXJlZCc6ICRzdGF0ZS5nbygnYXBwLmRhc2hib2FyZC5wYXJ0bmVyLmRldGFpbHMnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ3BhcnRuZXIuc3R1ZHlfcGVyaW9kcyc6ICRzdGF0ZS5nbygnYXBwLmRhc2hib2FyZC5jb3Vyc2VzLnBlcmlvZHMnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ3VzZXIuY3JlYXRlZCc6ICRzdGF0ZS5nbyhUYXNrc1NlcnZpY2UubmV4dFRhc2soKS52aWV3KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIGdldE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub3RpZmljYXRpb25zO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UsIHB1c2gpIHtcbiAgICAgICAgICAgICAgICB0b2FzdGVyLnBvcCh0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHVzaCkge1xuICAgICAgICAgICAgICAgICAgICBwdXNoTm90aWZpY2F0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90aWZ5RXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRvYXN0ZXIucG9wKCdlcnJvcicsIHRpdGxlLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBwdXNoTm90aWZpY2F0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5mYWN0b3J5KCdGZFNjcm9sbGVyJywgZnVuY3Rpb24oJHdpbmRvdykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJvZHkgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgICAgICAgICAgICAgYm9keS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgJzUwMCcsICdzd2luZycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU2VjdGlvbjogZnVuY3Rpb24oaWRlbnRpZmllcikge1xuICAgICAgICAgICAgXHR2YXIgJHNlY3Rpb24gPSAkKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgXHRjb25zb2xlLmxvZygkc2VjdGlvbik7XG4gICAgICAgICAgICBcdGlmICgkc2VjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBcdFx0dmFyIHRvcCA9ICRzZWN0aW9uLm9mZnNldCgpLnRvcCAtIDcwO1xuXG4gICAgICAgICAgICBcdFx0dmFyIGJvZHkgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgICAgICAgICAgICAgXHRib2R5LnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sICc1MDAnLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIFx0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKXtcbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jywge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICAkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL3NpZ251cCcsIHVzZXJJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MgPT09IHRydWUgJiYgdHlwZW9mKHJlc3VsdC5kYXRhLm1lc3NhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSByZXN1bHQuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRhdXRoLmxvZ2luKGNyZWRlbnRpYWxzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YS50b2tlbik7XG4gICAgICAgICAgICAgICAgJGF1dGguc2V0VG9rZW4ocmVzdWx0LmRhdGEudG9rZW4pO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGguc2lnbnVwJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzVGV4dCA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdUaGUgZW1haWwgb3IgcGFzc3dvcmQgeW91IGVudGVyZWQgaXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVyci5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAgICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb3QgTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDb25maXJtQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHApe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMuY29kZSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb25maXJtYXRpb25fY29kZTogJHN0YXRlUGFyYW1zLmNvZGUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9jb25maXJtJywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLmVycm9yO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aFJlY292ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHJlY292ZXJ5RW1haWw6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmRfcmVwZWF0OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLnRva2VuKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZWNvdmVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5yZWNvdmVyeUVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9mb3Jnb3QnLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gJ0EgcGFzc3dvcmQgcmVzZXQgbGluayBoYXMgYmVlbiBzZW50IHRvIHlvdXIgZW1haWwuJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQubGVuZ3RoID49IDYpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQgPT09ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICRzdGF0ZVBhcmFtcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL3JlY292ZXInLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5yZW1vdmVUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIGZyb20gaGVyZSAuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBkbyBub3QgbWF0Y2ghJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBuZWVkIHRvIGJlIGxvbmdlciB0aGFuIDYgY2hhcmFjdGVycyEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YVVSSSk7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZm9jdXNPbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHsgZm9jdXNPbjogJz0nIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3BlLmZvY3VzT24pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuZm9jdXNPbil7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICB9O1xuICAgIH0pO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHJlc291cmNlLCBGZFNjcm9sbGVyLCAkZmlsdGVyLCBGaWxlVXBsb2FkZXIpIHtcblxuICAgICAgICAkc2NvcGUuZm9ybSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiAxLFxuICAgICAgICAgICAgdG90YWxTdGVwczogM1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b3RhbFN0ZXBzID0ge1xuICAgICAgICAgICAgY3JlYXRvcjogMyxcbiAgICAgICAgICAgIGV4cGVydDogNCxcbiAgICAgICAgICAgIGludmVzdG9yOiA0XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZUZvcm1TdGVwID0gZnVuY3Rpb24obmV3U3RlcCl7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCA9IG5ld1N0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gWydBZmdoYW5pc3RhbicsICfDhWxhbmQgSXNsYW5kcycsICdBbGJhbmlhJywgJ0FsZ2VyaWEnLCAnQW1lcmljYW4gU2Ftb2EnLCAnQW5kb3JyQScsICdBbmdvbGEnLCAnQW5ndWlsbGEnLCAnQW50YXJjdGljYScsICdBbnRpZ3VhIGFuZCBCYXJidWRhJywgJ0FyZ2VudGluYScsICdBcm1lbmlhJywgJ0FydWJhJywgJ0F1c3RyYWxpYScsICdBdXN0cmlhJywgJ0F6ZXJiYWlqYW4nLCAnQmFoYW1hcycsICdCYWhyYWluJywgJ0JhbmdsYWRlc2gnLCAnQmFyYmFkb3MnLCAnQmVsYXJ1cycsICdCZWxnaXVtJywgJ0JlbGl6ZScsICdCZW5pbicsICdCZXJtdWRhJywgJ0JodXRhbicsICdCb2xpdmlhJywgJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnLCAnQm90c3dhbmEnLCAnQm91dmV0IElzbGFuZCcsICdCcmF6aWwnLCAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JywgJ0JydW5laSBEYXJ1c3NhbGFtJywgJ0J1bGdhcmlhJywgJ0J1cmtpbmEgRmFzbycsICdCdXJ1bmRpJywgJ0NhbWJvZGlhJywgJ0NhbWVyb29uJywgJ0NhbmFkYScsICdDYXBlIFZlcmRlJywgJ0NheW1hbiBJc2xhbmRzJywgJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycsICdDaGFkJywgJ0NoaWxlJywgJ0NoaW5hJywgJ0NocmlzdG1hcyBJc2xhbmQnLCAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLCAnQ29sb21iaWEnLCAnQ29tb3JvcycsICdDb25nbycsICdDb25nbywgVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlJywgJ0Nvb2sgSXNsYW5kcycsICdDb3N0YSBSaWNhJywgJ0NvdGUgRFxcJ0l2b2lyZScsICdDcm9hdGlhJywgJ0N1YmEnLCAnQ3lwcnVzJywgJ0N6ZWNoIFJlcHVibGljJywgJ0Rlbm1hcmsnLCAnRGppYm91dGknLCAnRG9taW5pY2EnLCAnRG9taW5pY2FuIFJlcHVibGljJywgJ0VjdWFkb3InLCAnRWd5cHQnLCAnRWwgU2FsdmFkb3InLCAnRXF1YXRvcmlhbCBHdWluZWEnLCAnRXJpdHJlYScsICdFc3RvbmlhJywgJ0V0aGlvcGlhJywgJ0ZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKScsICdGYXJvZSBJc2xhbmRzJywgJ0ZpamknLCAnRmlubGFuZCcsICdGcmFuY2UnLCAnRnJlbmNoIEd1aWFuYScsICdGcmVuY2ggUG9seW5lc2lhJywgJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycsICdHYWJvbicsICdHYW1iaWEnLCAnR2VvcmdpYScsICdHZXJtYW55JywgJ0doYW5hJywgJ0dpYnJhbHRhcicsICdHcmVlY2UnLCAnR3JlZW5sYW5kJywgJ0dyZW5hZGEnLCAnR3VhZGVsb3VwZScsICdHdWFtJywgJ0d1YXRlbWFsYScsICdHdWVybnNleScsICdHdWluZWEnLCAnR3VpbmVhLUJpc3NhdScsICdHdXlhbmEnLCAnSGFpdGknLCAnSGVhcmQgSXNsYW5kIGFuZCBNY2RvbmFsZCBJc2xhbmRzJywgJ0hvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpJywgJ0hvbmR1cmFzJywgJ0hvbmcgS29uZycsICdIdW5nYXJ5JywgJ0ljZWxhbmQnLCAnSW5kaWEnLCAnSW5kb25lc2lhJywgJ0lyYW4sIElzbGFtaWMgUmVwdWJsaWMgT2YnLCAnSXJhcScsICdJcmVsYW5kJywgJ0lzbGUgb2YgTWFuJywgJ0lzcmFlbCcsICdJdGFseScsICdKYW1haWNhJywgJ0phcGFuJywgJ0plcnNleScsICdKb3JkYW4nLCAnS2F6YWtoc3RhbicsICdLZW55YScsICdLaXJpYmF0aScsICdLb3JlYSwgRGVtb2NyYXRpYyBQZW9wbGVcXCdTIFJlcHVibGljIG9mJywgJ0tvcmVhLCBSZXB1YmxpYyBvZicsICdLdXdhaXQnLCAnS3lyZ3l6c3RhbicsICdMYW8gUGVvcGxlXFwnUyBEZW1vY3JhdGljIFJlcHVibGljJywgJ0xhdHZpYScsICdMZWJhbm9uJywgJ0xlc290aG8nLCAnTGliZXJpYScsICdMaWJ5YW4gQXJhYiBKYW1haGlyaXlhJywgJ0xpZWNodGVuc3RlaW4nLCAnTGl0aHVhbmlhJywgJ0x1eGVtYm91cmcnLCAnTWFjYW8nLCAnTWFjZWRvbmlhLCBUaGUgRm9ybWVyIFl1Z29zbGF2IFJlcHVibGljIG9mJywgJ01hZGFnYXNjYXInLCAnTWFsYXdpJywgJ01hbGF5c2lhJywgJ01hbGRpdmVzJywgJ01hbGknLCAnTWFsdGEnLCAnTWFyc2hhbGwgSXNsYW5kcycsICdNYXJ0aW5pcXVlJywgJ01hdXJpdGFuaWEnLCAnTWF1cml0aXVzJywgJ01heW90dGUnLCAnTWV4aWNvJywgJ01pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2YnLCAnTW9sZG92YSwgUmVwdWJsaWMgb2YnLCAnTW9uYWNvJywgJ01vbmdvbGlhJywgJ01vbnRzZXJyYXQnLCAnTW9yb2NjbycsICdNb3phbWJpcXVlJywgJ015YW5tYXInLCAnTmFtaWJpYScsICdOYXVydScsICdOZXBhbCcsICdOZXRoZXJsYW5kcycsICdOZXRoZXJsYW5kcyBBbnRpbGxlcycsICdOZXcgQ2FsZWRvbmlhJywgJ05ldyBaZWFsYW5kJywgJ05pY2FyYWd1YScsICdOaWdlcicsICdOaWdlcmlhJywgJ05pdWUnLCAnTm9yZm9sayBJc2xhbmQnLCAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgJ05vcndheScsICdPbWFuJywgJ1Bha2lzdGFuJywgJ1BhbGF1JywgJ1BhbGVzdGluaWFuIFRlcnJpdG9yeSwgT2NjdXBpZWQnLCAnUGFuYW1hJywgJ1BhcHVhIE5ldyBHdWluZWEnLCAnUGFyYWd1YXknLCAnUGVydScsICdQaGlsaXBwaW5lcycsICdQaXRjYWlybicsICdQb2xhbmQnLCAnUG9ydHVnYWwnLCAnUHVlcnRvIFJpY28nLCAnUWF0YXInLCAnUmV1bmlvbicsICdSb21hbmlhJywgJ1J1c3NpYW4gRmVkZXJhdGlvbicsICdSV0FOREEnLCAnU2FpbnQgSGVsZW5hJywgJ1NhaW50IEtpdHRzIGFuZCBOZXZpcycsICdTYWludCBMdWNpYScsICdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJywgJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJywgJ1NhbW9hJywgJ1NhbiBNYXJpbm8nLCAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJywgJ1NhdWRpIEFyYWJpYScsICdTZW5lZ2FsJywgJ1NlcmJpYSBhbmQgTW9udGVuZWdybycsICdTZXljaGVsbGVzJywgJ1NpZXJyYSBMZW9uZScsICdTaW5nYXBvcmUnLCAnU2xvdmFraWEnLCAnU2xvdmVuaWEnLCAnU29sb21vbiBJc2xhbmRzJywgJ1NvbWFsaWEnLCAnU291dGggQWZyaWNhJywgJ1NvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJywgJ1NwYWluJywgJ1NyaSBMYW5rYScsICdTdWRhbicsICdTdXJpbmFtZScsICdTdmFsYmFyZCBhbmQgSmFuIE1heWVuJywgJ1N3YXppbGFuZCcsICdTd2VkZW4nLCAnU3dpdHplcmxhbmQnLCAnU3lyaWFuIEFyYWIgUmVwdWJsaWMnLCAnVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYScsICdUYWppa2lzdGFuJywgJ1RhbnphbmlhLCBVbml0ZWQgUmVwdWJsaWMgb2YnLCAnVGhhaWxhbmQnLCAnVGltb3ItTGVzdGUnLCAnVG9nbycsICdUb2tlbGF1JywgJ1RvbmdhJywgJ1RyaW5pZGFkIGFuZCBUb2JhZ28nLCAnVHVuaXNpYScsICdUdXJrZXknLCAnVHVya21lbmlzdGFuJywgJ1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcycsICdUdXZhbHUnLCAnVWdhbmRhJywgJ1VrcmFpbmUnLCAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnLCAnVW5pdGVkIEtpbmdkb20nLCAnVW5pdGVkIFN0YXRlcycsICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnLCAnVXJ1Z3VheScsICdVemJla2lzdGFuJywgJ1ZhbnVhdHUnLCAnVmVuZXp1ZWxhJywgJ1ZpZXQgTmFtJywgJ1ZpcmdpbiBJc2xhbmRzLCBCcml0aXNoJywgJ1ZpcmdpbiBJc2xhbmRzLCBVLlMuJywgJ1dhbGxpcyBhbmQgRnV0dW5hJywgJ1dlc3Rlcm4gU2FoYXJhJywgJ1llbWVuJywgJ1phbWJpYScsICdaaW1iYWJ3ZSddO1xuXG4gICAgICAgICRzY29wZS5jb250YWN0VGltZXMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dvcmtpbmcgaG91cnMgKDlhbSB0byA2IHBtKScsIHZhbHVlOiAnOS02J30sXG4gICAgICAgICAgICB7bmFtZTogJ0V2ZW5pbmcgdGltZSAoNmFtIHRvIDkgcG0pJywgdmFsdWU6ICc2LTknfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRSb2xlOiAnY3JlYXRvcicsXG4gICAgICAgICAgICBhZ2VHYXRlOiAneWVzJyxcbiAgICAgICAgICAgIGNvdW50cnlPcmlnaW46ICcnLFxuICAgICAgICAgICAgY291bnRyeVJlc2lkZW5jZTogJycsXG4gICAgICAgICAgICBjb250YWN0VGltZTogJycsXG4gICAgICAgICAgICBleHBlcnRpc2VGb3JtOiB7XG4gICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JvcHBlZFRodW1ibmFpbDogbnVsbCxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0udG90YWxTdGVwcyA9ICRzY29wZS50b3RhbFN0ZXBzWyRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZV07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSAqIDEwMCwgOTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzSW52ZXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgoKDEgLSAoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSkgKiAxMDApLCA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHVzZXIucmVnaXN0ZXJlZCA9PSAxKSAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUltYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICRzY29wZS5kYXRhLmNyb3BwZWRUaHVtYm5haWw7XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZS5maWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gJ1lvdXIgcHJvZmlsZSBwaWN0dXJlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWQhJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VFcnJvciA9ICdQcm9maWxlIHBpY3R1cmUgZmFpbGVkIHRvIHVwbG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IoaW1hZ2UpKTtcbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCl7XG4gICAgICAgICAgICB2YXIgbGFzdElucHV0dGVkRXhwZXJ0aXNlID0ge3NlbGVjdGVkRXhwZXJ0aXNlOiAnbnVsbCcsIG90aGVyRXhwZXJ0aXNlOiB7c3RhdHVzOiAxfX07XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0xXTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RJbnB1dHRlZEV4cGVydGlzZSk7XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA8IDMgJiYgKGxhc3RJbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCAmJiBsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBza2lsbHNMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsczogW10sXG4gICAgICAgICAgICAgICAgICAgIG90aGVyU2tpbGxzOiB7bGlzdDogW10sIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeShpbmRleCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QoaW5kZXgpO1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGUsIGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaW5Ta2lsbHMgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgdmFyIGZvdW5kU2tpbGwgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGZvdW5kU2tpbGwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZFNraWxsLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICBpZighJHNjb3BlLmluU2tpbGxzKGluZGV4LCBza2lsbCkpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLnB1c2goc2tpbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGUsIGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhbmd1bGFyLmVxdWFscyhhY3R1YWwsIGV4cGVjdGVkKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVTa2lsbHMgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscyA9IHtsaXN0OiBbXSwgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8wJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlL2NhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZS5pZCArICcvc2tpbGxzLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKClcblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuc3VibWl0RGV0YWlscyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEuZm5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkc2NvcGUuZGF0YS5sbmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsXG4gICAgICAgICAgICAgICAgYWdlX2dhdGU6ICRzY29wZS5kYXRhLmFnZUdhdGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9vcmlnaW46ICRzY29wZS5kYXRhLmNvdW50cnlPcmlnaW4sXG4gICAgICAgICAgICAgICAgY291bnRyeV9yZXNpZGVuY2U6ICRzY29wZS5kYXRhLmNvdW50cnlSZXNpZGVuY2UsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXI6ICRzY29wZS5kYXRhLmNvbnRhY3ROdW1iZXIsXG4gICAgICAgICAgICAgICAgY29udGFjdF90aW1lOiAkc2NvcGUuZGF0YS5jb250YWN0VGltZS52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoKCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52ZXN0bWVudEJ1ZGdldCA9PT0gJ290aGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldE90aGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yID0ge307XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0ID0gaW52ZXN0bWVudEJ1ZGdldDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9nb2FsID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50R29hbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9yZWFzb24gPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRSZWFzb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmNyZWF0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdleHBlcnQnOlxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5leHBlcnQgPSB7IGxpc3Q6IFtdIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QsIGZ1bmN0aW9uKGlucHV0dGVkRXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCB8fCBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydC5saXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX2V4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZFNraWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJEYXRhKTtcblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLm5hbWUgPSAkc2NvcGUuZGF0YS5mbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLmxhc3RfbmFtZSA9ICRzY29wZS5kYXRhLmxuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gW107XG4gICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzID0gW107XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJyAmJiB0eXBlb2YoJHJvb3RTY29wZS51c2VyLmNyZWF0b3IpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgb2djIGluICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0W29nY107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2djSW5kZXggPSAkc2NvcGUuY29udGVzdHMuaW5kZXhPZihjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZ2NJbmRleCA6ICcgKyBvZ2NJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdHMuc3BsaWNlKG9nY0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmICRyb290U2NvcGUudXNlci5qdWRnaW5nLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgamMgaW4gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5qdWRnaW5nW2pjXS5jb250ZXN0X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5mZEVudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RTaW5nbGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkZmlsdGVyLCAkdGltZW91dCwgRmRTY3JvbGxlciwgJGh0dHAsIExpZ2h0Ym94KSB7XG4gICAgICAgICRzY29wZS5jb250ZXN0SWQgPSAkc3RhdGVQYXJhbXMuY29udGVzdElkO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnRlc3RGdWxsRGVzY3JpcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnk6IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnlGb3JtOiB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXM6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRyeTogbnVsbCxcbiAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJycsXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJycsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeSA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyaWVzLzplbnRyeUlkJywge1xuICAgICAgICAgICAgZW50cnlJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29udGVzdGFudEVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvY3JlYXRvci86Y3JlYXRvcklkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAganVkZ2VFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2p1ZGdlLzpqdWRnZUlkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvOmVudHJ5SWQvbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeVJhdGluZyA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyeS1yYXRpbmdzLzplbnRyeVJhdGluZ0lkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5zaG93RnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5oaWRlRnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbnRlc3QuZ2V0KHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZFxuICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdKdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGNvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdDb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoanVkZ2VhYmxlLmxlbmd0aCA+IDAgJiYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2p1cnknICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2NyZWF0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuY29udGVzdElkID0gcmVzdWx0LmlkO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3Lm9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzaW5nbGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2p1cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogcmVzdWx0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYganVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdKdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nSnVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXN0aW5nLmxlbmd0aCA+IDAgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdDb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0NvbnRlc3RpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5sb2FkRW50cmllcyA9IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHN3aXRjaChyb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdqdXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgRW50cnkuanVkZ2VFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlSWQ6ICRyb290U2NvcGUudXNlci5pZFxuICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiAnY3JlYXRvcid9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0b3IgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW50cnkuY29udGVzdGFudEVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3IuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICB2YXIganVkZ2VJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5Jykge1xuICAgICAgICAgICAgICAgIGp1ZGdlSWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChqdWRnZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2VudHJpZXMvJyArIGVudHJ5LmlkICsgJy9qdWRnZS8nICsganVkZ2VJZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nID0gcmVzdWx0LmRhdGEucmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBFbnRyeS5nZXQoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeUlkOiBlbnRyeS5pZFxuICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3BlbkxpZ2h0Ym94ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgdmFyIGFsbEZpbGVzID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5maWxlcztcbiAgICAgICAgICAgIHZhciBhbGxJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSAwO1xuXG4gICAgICAgICAgICBmb3IodmFyIGFGIGluIGFsbEZpbGVzKXtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGFsbEZpbGVzW2FGXTtcbiAgICAgICAgICAgICAgICBhbGxJbWFnZXMucHVzaChmaWxlLnVybCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsZS51cmwgPT09IGl0ZW0udXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGFGO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGlnaHRib3gub3Blbk1vZGFsKGFsbEltYWdlcywgY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uIChldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGVBZGRlZCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmxvd0ZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBmaWxlcyA6ICcgKyBtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgJGZpbGUucmVmX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuXG4gICAgICAgICAgICAvLyB2YXIgaXRlbXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcywge2lkOiBtZXNzYWdlLmZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YobWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5maWxlLmlkLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlUmVtb3ZlID0gZnVuY3Rpb24oZmlsZSwgJGZsb3cpIHtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IGZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YoZmlsZS5yZWZfaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZpbGVzSW5kZXggPSAkZmxvdy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICAgICAgaWYgKGZpbGVzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSBmaWxlcyAuLi4gJyArIGZpbGVzSW5kZXgpO1xuICAgICAgICAgICAgICAgICRmbG93LmZpbGVzLnNwbGljZShmaWxlc0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cuZmlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNob3dBZGRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5lbnRyaWVzLWxpc3QnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb24gPSAnJztcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICRzY29wZS5jb250ZXN0LmVudHJpZXNbJHNjb3BlLmNvbnRlc3QuZW50cmllcy5sZW5ndGggLSAxXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWRGaWxlcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHRodW1ibmFpbF9pZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZmxvdy5maWxlcywgZnVuY3Rpb24oZmlsZSl7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRGaWxlc1tmaWxlLnJlZl9pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICdjYXB0aW9uJzogZmlsZS5yZWZfY2FwdGlvblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlcGFyZSB0byBhc3NpZ24gdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgIT09IC0xICYmIHRodW1ibmFpbF9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2hvb3BpZSBpdCBtYXRjaGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbF9pZCA9IGZpbGUucmVmX2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBuZXcgRW50cnkoKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5jcmVhdG9yX2lkID0gcm9sZS5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS5jb250ZXN0X2lkID0gJHNjb3BlLmNvbnRlc3QuaWQ7XG4gICAgICAgICAgICAgICAgZW50cnkudGh1bWJuYWlsX2lkID0gdGh1bWJuYWlsX2lkO1xuXG4gICAgICAgICAgICAgICAgZW50cnkubmFtZSA9ICRyb290U2NvcGUudXNlci5uYW1lICsgXCIncyBFbnRyeVwiO1xuICAgICAgICAgICAgICAgIGVudHJ5LmRlc2NyaXB0aW9uID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGVudHJ5LmF0dGFjaGVkX2ZpbGVzID0gYXR0YWNoZWRGaWxlcztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LnRodW1ibmFpbF9pZCk7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VudHJ5IFNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ0VudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2NyZWF0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRW50cnkuc2VuZE1lc3NhZ2Uoe2VudHJ5SWQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWR9LCBtZXNzYWdlUmVxdWVzdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5Lm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNhdmVNYXJrcyA9IGZ1bmN0aW9uKGVudHJ5UmF0aW5nSWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlZFJhdGluZyA9IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmRlc2lnbixcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5jcmVhdGl2aXR5LFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmluZHVzdHJpYWwsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5tYXJrZXQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmp1ZGdlX2lkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5lbnRyeV9pZCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZW50cnlSYXRpbmdJZCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgRW50cnlSYXRpbmcudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogZW50cnlSYXRpbmdJZFxuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZWRSYXRpbmcpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBzYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5UmF0aW5nID0gbmV3IEVudHJ5UmF0aW5nKHVwZGF0ZWRSYXRpbmcpO1xuICAgICAgICAgICAgICAgIGVudHJ5UmF0aW5nLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIGNyZWF0ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnanVyeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTaG93IE5EQVxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0SnVkZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMvYmVjb21lSnVkZ2UnLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVDb250ZXN0YW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFjY2VwdENvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy9iZWNvbWVDb250ZXN0YW50Jywge2NvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0LmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlcikge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdGbGFzaE5vdGljZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcgPSB7XG4gICAgICAgIFx0c2hvdzogZmFsc2UsXG4gICAgICAgIFx0Y29udGVzdElkOiAwLFxuICAgICAgICBcdG9uQ2xpY2s6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICBcdFx0JHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgnanVyeScsIDUsIHRydWUpO1xuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgpIHtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdOYXZpZ2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGxvZywgJHRpbWVvdXQsICRodHRwLCAkcmVzb3VyY2UsICR1aWJNb2RhbCwgRmlsZVVwbG9hZGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLnVwbG9hZGVyID0gbmV3IEZpbGVVcGxvYWRlcih7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2ZpbGVzJyxcbiAgICAgICAgICAgIHJlbW92ZUFmdGVyVXBsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgdXNlclNldHRpbmdzTW9kZTogJ3ZpZXcnLFxuICAgICAgICAgICAgdXNlclNldHRpbmdzU2F2ZTogLTFcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2ZpbGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0gYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlcik7XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2NyZWF0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnaW52ZXN0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnanVkZ2luZyddO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2aW5nJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyRGF0YSk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAwO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvdXNlcnMvJyArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NNb2RlID0gJ3ZpZXcnO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gLTE7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoYW5nZSB1c2VyIHRodW1ibmFpbFxuICAgICAgICAkc2NvcGUuY2hhbmdlVGh1bWJuYWlsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vdmlld3MvYXBwL2FwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJUaHVtYm5haWxDdHJsJyxcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAodGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnRodW1ibmFpbCA9IGFuZ3VsYXIuY29weSh0aHVtYm5haWwpO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe2F0dGFjaDogJ3RodW1ibmFpbCd9KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlZCB1c2VyIHRodW1ibmFpbCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHVwbG9hZGluZyB0aGUgZmlsZVxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IodGh1bWJuYWlsKSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGxvZy5pbmZvKCdNb2RhbCBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9nb3V0XG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdHVhbGx5IGxvZ2dpbmcgb3V0ISAuLi4nKTtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBvcHVsYXRlIHNpZGUgbmF2aWdhdGlvblxuICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdXNlcnMvc2lkZU5hdmlnYXRpb25EYXRhJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2lkZU5hdmlnYXRpb25EYXRhID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24oKTtcblxuICAgICAgICAkc2NvcGUub3BlbkZ1bGxNZW51ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDE7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdVc2VyVGh1bWJuYWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHVpYk1vZGFsSW5zdGFuY2Upe1xuICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnNldFRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5jcm9wcGVkVGh1bWJuYWlsKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfVxuICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIb21lIFZpZXcgU3RhcnRlZCcpO1xuXG4gICAgICAgIC8vIFJlZGlyZWN0IHRvIGNvbnRlc3RcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcpO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ludmVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnZlc3QgU3RhcnRlZCcpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZmlsdGVyKCd0cnVzdGVkSHRtbCcsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuICAgICAgICB9O1xuICAgIH1dKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTm90aWZpY2F0aW9uc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgRmROb3RpZmljYXRpb25zKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgICBGZE5vdGlmaWNhdGlvbnMuZ2V0TGF0ZXN0Tm90aWZpY2F0aW9ucygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHQkc2NvcGUubm90aWZpY2F0aW9ucyA9IHJlc3VsdC5ub3RpZmljYXRpb25zO1xuICAgICAgICB9KVxuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1BhZ2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5wYWdlID0ge1xuICAgICAgICBcdHRpdGxlOiAnJyxcbiAgICAgICAgXHRjb250ZW50OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRodHRwLmdldCgnL2FwaS9wYWdlcy8nICsgJHN0YXRlUGFyYW1zLnNsdWcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHRjb25zb2xlLmxvZygnU3VjY2VzcycpO1xuICAgICAgICBcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIFx0JHNjb3BlLnBhZ2UgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cblx0XHRcdGlmIChlcnJvci5zdGF0dXMgPT0gJzQwNCcpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2xvYWQgNDA0Jylcblx0XHRcdH07XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKCRhdXRoUHJvdmlkZXIpe1xuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXG4gICAgICAgIC8vIHJvdXRlIHRoZSBKV1Qgc2hvdWxkIGJlIHJldHJpZXZlZCBmcm9tXG4gICAgICAgICRhdXRoUHJvdmlkZXIubG9naW5VcmwgPSAnL2FwaS9hdXRoZW50aWNhdGUnO1xuICAgICAgICAkYXV0aFByb3ZpZGVyLnRva2VuUHJlZml4ID0gJ2Z1bmRhdG9yJztcblxuICAgICAgICB2YXIgcmVkaXJlY3RVcmlQYXRoID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxpbmtlZGluKHtcbiAgICAgICAgXHRjbGllbnRJZDogJzc3emp4ZmJoMjkyOHJlJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvYXV0aGVudGljYXRlL2xpbmtlZGluJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydzdGF0ZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3NlbGYnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnMTA0MjI0NzcyNzA5MS1kbXFjNTVhZjd0bDU4aDJycXYzcHFucm1qamJiOTczMy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc2NvcGUnXSxcbiAgICAgICAgICAgIG9wdGlvbmFsVXJsUGFyYW1zOiBbJ2Rpc3BsYXknXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlUHJlZml4OiAnb3BlbmlkJyxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnOTAwNTMzMTIzMzk1OTIwJyxcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydkaXNwbGF5JywgJ3Njb3BlJ10sXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XG4gICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoZmxvd0ZhY3RvcnlQcm92aWRlcil7XG5cbiAgICAgICAgZmxvd0ZhY3RvcnlQcm92aWRlci5kZWZhdWx0cyA9IHtcbiAgICAgICAgXHR1cGxvYWRNZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHRhcmdldDogJy9hcGkvZmlsZXMvJyxcbiAgICAgICAgICAgIHBlcm1hbmVudEVycm9yczpbNDA0LCA1MDAsIDUwMV1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
