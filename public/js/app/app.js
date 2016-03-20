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
            .state('app.contests', {
                url: '/contest',
                views: {
                    'main@': {
                        templateUrl: getView('contest'),
                        controller: 'ContestCtrl'
                    }
                }
            })
            .state('app.contest', {
                url: '/contest/:contestId',
                views: {
                    'main@': {
                        templateUrl: getView('contest', 'contest-single'),
                        controller: 'ContestSingleCtrl'
                    }
                }
            })
            .state('app.transaction', {
                url: '/transaction',
                views: {
                    'main@': {
                        templateUrl: getView('transaction', 'transaction'),
                        controller: 'TransactionCtrl'
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
                route: 'app.contest',
                view: 'main@',
                roles: {
                    creator: getView('contest', 'contest-single-creator'),
                    jury: getView('contest', 'contest-single-jury'),
                },
                defaultTemplate: getView('contest', 'contest-single')
            }, {
                route: 'app.contests',
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
            $state.go('app.contests', {});
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
            if (user.registered == 1) $state.go('app.contests');

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
                    $state.go('app.contests');

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
                        $state.go('app.contest', {
                            role: 'jury',
                            contestId: result.id
                        });
                    };
                } else if($rootScope.activeRole === 'jury' && judgeable.length > 0) {
                    $scope.data.showJudgeNdaCompleted = true;
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
                    $scope.data.showContestantNdaCompleted = true;
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

        $scope.goToLink = function(page, data){
            $rootScope.isNavShown = 0;
            $state.go(page, data);
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
        $state.go('app.contests');
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
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('TransactionCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$timeout", "FdScroller", function($rootScope, $scope, $state, $stateParams, $http, $timeout, FdScroller) {

    	console.log('TransactionCtrl');
    	$rootScope.$broadcast('startLoading');
    	FdScroller.toTop();

    	$timeout(function(){
    		$rootScope.$broadcast('stopLoading');
    	}, 2000);

    }]);

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJjb25maWcvZmxvdy5qcyIsImRpcmVjdGl2ZXMvbG9hZGVyLmRpcmVjdGl2ZS5qcyIsImZpbHRlcnMvc3RyaXBIdG1sLmpzIiwic2VydmljZXMvbm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvc2Nyb2xsZXIuc2VydmljZS5qcyIsImFwcC9hdXRoL2F1dGguanMiLCJhcHAvYXV0aC9yZWdpc3Rlci5qcyIsImFwcC9jb250ZXN0L2NvbnRlc3QuanMiLCJhcHAvZm9vdGVyL2Zvb3Rlci5qcyIsImFwcC9oZWFkZXIvZmxhc2gtbm90aWNlLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuanMiLCJhcHAvaGVhZGVyL25hdmlnYXRpb24uanMiLCJhcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmpzIiwiYXBwL2hvbWUvaG9tZS5qcyIsImFwcC9pbnZlc3QvaW52ZXN0LmpzIiwiYXBwL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9ucy5qcyIsImFwcC9wYWdlL3BhZ2UuanMiLCJhcHAvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUEscUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBLENBQUEsMkJBQUEseUJBQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQTs7O0FDbEJBLENBQUEsV0FB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QTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsV0FBQSxXQUFBOzs7O1FBSUEsT0FBQSxTQUFBLFVBQUE7WUFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO2dCQUNBLGFBQUEsV0FBQTtnQkFDQSxXQUFBLGdCQUFBO2dCQUNBLFdBQUEsT0FBQTs7Z0JBRUEsT0FBQSxHQUFBLGtCQUFBLElBQUEsQ0FBQSxRQUFBOzs7Ozs7SUFNQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxvR0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLE1BQUE7UUFDQSxXQUFBLFdBQUE7O1FBRUEsSUFBQSxPQUFBLGFBQUEsVUFBQSxlQUFBLE9BQUEsYUFBQSxXQUFBLGFBQUE7WUFDQSxJQUFBLFNBQUE7Z0JBQ0EsbUJBQUEsYUFBQTtnQkFDQSxPQUFBLGFBQUE7OztZQUdBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLEtBQUEsNkJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsR0FBQTtlQUNBLFNBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsZUFBQSxNQUFBLEtBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsT0FBQSxVQUFBOzs7YUFHQTtZQUNBLE9BQUEsR0FBQTs7OztJQUlBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG9HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFVBQUEsTUFBQTtRQUNBLFdBQUEsV0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxlQUFBO1lBQ0EsVUFBQTtZQUNBLGlCQUFBOzs7UUFHQSxJQUFBLE9BQUEsYUFBQSxXQUFBLGVBQUEsT0FBQSxhQUFBLFdBQUEsYUFBQTtZQUNBLE9BQUEsWUFBQTthQUNBO1lBQ0EsT0FBQSxZQUFBOzs7UUFHQSxPQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsWUFBQTs7O1lBR0EsSUFBQSxTQUFBO2dCQUNBLE9BQUEsT0FBQSxLQUFBOzs7WUFHQSxN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QSxPQUFBLHNCQUFBLFNBQUE7OztRQUdBLE9BQUEsMEJBQUEsU0FBQSxPQUFBLG1CQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSwwQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSxtQkFBQTs7OztRQUlBLE9BQUEsNEJBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLDZCQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLHVCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsMEJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7OztRQUlBLE9BQUEsK0JBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7OztRQUlBLE9BQUEsa0JBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0EsT0FBQSxnQkFBQTtZQUNBOzs7UUFHQSxPQUFBLG9CQUFBLFNBQUEsR0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO1lBQ0EsRUFBQSxnQkFBQTs7O1FBR0EsT0FBQSxxQkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLFNBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtZQUNBOzs7UUFHQSxPQUFBLHVCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7UUFHQSxPQUFBLFdBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLGFBQUEsUUFBQSxVQUFBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsTUFBQSxLQUFBOztZQUVBLElBQUEsT0FBQSxnQkFBQSxhQUFBO2dCQUNBLE9BQUEsV0FBQSxTQUFBOzs7WUFHQSxPQUFBOzs7UUFHQSxPQUFBLGNBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxHQUFBLENBQUEsT0FBQSxTQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsZUFBQSxLQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7UUFHQSxPQUFBLGdCQUFBLFNBQUEsR0FBQSxPQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxVQUFBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsTUFBQSxLQUFBLFNBQUEsUUFBQSxTQUFBO2dCQUNBLE9BQUEsQ0FBQSxRQUFBLE9BQUEsUUFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLGFBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGFBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLFFBQUEsS0FBQSxPQUFBLHNCQUFBLE9BQUEsWUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxjQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7OztRQUdBLE9BQUEs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LGtCQUFBLFNBQUEsTUFBQSxPQUFBOzs7Ozs7OztZQVFBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsS0FBQTs7WUFFQSxJQUFBLFVBQUEsQ0FBQSxHQUFBO2dCQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUEsT0FBQSxPQUFBOzs7WUFHQSxJQUFBLGFBQUEsTUFBQSxNQUFBLFFBQUE7WUFDQSxJQUFBLGVBQUEsQ0FBQSxHQUFBO2dCQUNBLFFBQUEsSUFBQSxzQkFBQTtnQkFDQSxNQUFBLE1BQUEsT0FBQSxZQUFBOzs7WUFHQSxRQUFBLElBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxPQUFBLEtBQUEsYUFBQTs7O1FBR0EsT0FBQSxlQUFBLFdBQUE7WUFDQSxXQUFBLFVBQUE7O1lBRUEsT0FBQSxLQUFBLGdCQUFBO1lBQ0EsT0FBQSxLQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxjQUFBO1lBQ0EsT0FBQSxLQUFBLGFBQUEsZ0JBQUE7O1lBRUEsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLFFBQUEsUUFBQSxPQUFBLFFBQUEsUUFBQSxTQUFBLEdBQUE7OztRQUdBLE9BQUEsY0FBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGNBQUE7O1lBRUEsSUFBQSxnQkFBQTtZQUNBLElBQUEsZUFBQTs7WUFFQSxRQUFBLFFBQUEsT0FBQSxLQUFBLGFBQUEsS0FBQSxPQUFBLFNBQUEsS0FBQTtnQkFDQSxjQUFBLEtBQUEsVUFBQTtvQkFDQSxXQUFBLEtBQUE7OztnQkFHQSxRQUFBLElBQUE7Z0JBQ0EsSUFBQSxLQUFBLEtBQUEsS0FBQSxRQUFBLGFBQUEsQ0FBQSxLQUFBLGlCQUFBLE1BQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLGVBQUEsS0FBQTs7OztZQUlBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLFlBQUE7O1lBRUEsSUFBQSxNQUFBLFNBQUEsR0FBQTtnQkFDQSxJQUFBLE9BQUEsTUFBQTs7Z0JBRUEsSUFBQSxRQUFBLElBQUE7Z0JBQ0EsTUFBQSxhQUFB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Q25GQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx3RUFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQTtRQUNBLFFBQUEsSUFBQTs7O1FBR0EsT0FBQSxHQUFBOzs7O0FDUEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsNEVBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxXQUFBLFlBQUE7UUFDQSxRQUFBLElBQUE7UUFDQSxXQUFBLFdBQUE7OztRQUdBLFdBQUE7O1FBRUEsT0FBQSxZQUFBO1lBQ0EsQ0FBQSxNQUFBLGtCQUFBLFNBQUEsVUFBQSxPQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSwwQkFBQSxTQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsd0JBQUEsU0FBQSxTQUFBLE9BQUEsU0FBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLHdCQUFBLFNBQUEsU0FBQSxPQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSxpQkFBQSxTQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsZUFBQSxTQUFBLGFBQUEsT0FBQSxTQUFBLE9BQUE7Ozs7SUFJQSxRQUFBLE9BQUEsdUJBQUEsT0FBQSxlQUFBLENBQUEsUUFBQSxTQUFBLE1BQUE7UUFDQSxPQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsS0FBQSxZQUFBOzs7O0lBSUEsUUFBQSxPQUFBOztLQUVBLFVBQUEsV0FBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQSxNQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7O2dCQUVBLE9BQUEsUUFBQSxPQUFBO2dCQUNBLE9BQUEsU0FBQSxPQUFBOzs7Z0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQSxPQUFBO2dCQUNBLFNBQUEsS0FBQSxVQUFBLE9BQUEsT0FBQTs7Z0JBRUEsSUFBQSxXQUFBLENBQUE7b0JBQ0EsT0FBQTtvQkFDQSxPQUFBO29CQUNBLFdBQUE7b0JBQ0EsT0FBQTttQkFDQTtvQkFDQSxPQUFBO29CQUNBLE9BQUE7b0JBQ0EsV0FBQTtvQkFDQSxPQUFBOzs7Z0JBR0EsSUFBQSxZQUFBO29CQUNBLFFBQUEsQ0FBQSxXQUFBLFlBQUEsU0FBQSxTQUFBLE9BQUEsUUFBQSxRQUFBLFVBQUEsYUFBQSxXQUFBLFlBQUE7b0JBQ0EsVUFBQTt3QkFDQTs0QkFDQSxPQUFBOzRCQUNBLFdBQUE7NEJBQ0EsYUFBQTs0QkFDQSxZQUFBOzRCQUNBLGtCQUFBOzRCQUNBLG9CQUFBOzRCQUNBLHNCQUFBOzRCQUNBLE1BQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7O3dCQUVBOzRCQUNBLE9BQUE7NEJBQ0EsV0FBQTs0QkFDQSxhQUFBOzRCQUNBLFlBQUE7NEJBQ0Esa0JBQUE7NEJBQ0Esb0JBQUE7NEJBQ0Esc0JBQUE7NEJBQ0EsTUFBQSxDQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTs7Ozs7Z0JBS0EsR0FBQSxPQUFBLFNBQUEsSUFBQTtvQkFDQSxJQUFBLE1BQUEsU0FBQSxLQUFBLFVBQUEsR0FBQSxXQUFBOztvQkFFQSxJQUFBLFVBQUEsSUFBQSxNQUFBLEtBQUEsSUFBQSxVQUFBO3dCQUNBLG9CQUFBO3dCQUNBLGlCQUFBOzs7b0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQTtvQkFDQSxPQUFBLFVBQUEsS0FBQSxTQUFBLEdBQUEsVUFBQTt3QkFDQSxTQUFBLEtBQUEsOEJBQUEsUUFBQSwrREFBQSxTQUFBLE1BQUEsY0FBQSxTQUFBLE1BQUEsS0FBQSxTQUFBLE1BQUE7O3FCQUVBO29CQUNBLElBQUEsTUFBQSxTQUFBLEtBQUEsVUFBQSxHQUFBLFdBQUE7O29CQUVBLElBQUEsVUFBQSxJQUFBLE1BQUEsS0FBQSxLQUFBLFdBQUE7d0JBQ0Esb0JBQUE7d0JBQ0EsaUJBQUE7OztvQkFHQSxTQUFBLEtBQUEsVUFBQSxNQUFBO29CQUNBLFNBQUEsS0FBQSwrQkFBQSxRQUFBO29CQUNBLFNBQUEsS0FBQSwrQkFBQSxRQUFBOzs7Ozs7O0FDekdBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG9HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLGlCQUFBO1FBQ0EsT0FBQSxnQkFBQTs7UUFFQSxnQkFBQSx5QkFBQSxLQUFBLFNBQUEsT0FBQTtTQUNBLE9BQUEsZ0JBQUEsT0FBQTs7Ozs7QUNQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxzRkFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxZQUFBO1FBQ0EsV0FBQSxXQUFBO1FBQ0EsV0FBQTs7UUFFQSxPQUFBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsU0FBQTs7O1FBR0EsTUFBQSxJQUFBLGdCQUFBLGFBQUEsTUFBQSxLQUFBLFNBQUEsT0FBQTtTQUNBLFFBQUEsSUFBQTtTQUNBLFFBQUEsSUFBQTtTQUNBLE9BQUEsT0FBQSxPQUFBO1dBQ0EsU0FBQSxNQUFBO0dBQ0EsUUFBQSxJQUFBO0dBQ0EsUUFBQSxJQUFBOztHQUVBLElBQUEsTUFBQSxVQUFBLE9BQUE7SUFDQSxRQUFBLElBQUE7SUFDQTtXQUNBLFFBQUEsVUFBQTtTQUNBLFdBQUEsV0FBQTs7Ozs7QUN4QkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEseUdBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLE9BQUEsVUFBQSxZQUFBOztLQUVBLFFBQUEsSUFBQTtLQUNBLFdBQUEsV0FBQTtLQUNBLFdBQUE7O0tBRUEsU0FBQSxVQUFBO01BQ0EsV0FBQSxXQUFBO1FBQ0E7Ozs7S0FJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBmdW5kYXRvciA9IGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvcicsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdmdW5kYXRvci5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZmlsdGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnJvdXRlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29uZmlnJ1xuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycsIFsnbmdSZXNvdXJjZScsICduZ0Nvb2tpZXMnLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplcicsICdhbmd1bGFyTW9tZW50JywgJ2FuZ3VsYXItb3dsLWNhcm91c2VsJywgJ25nSW1nQ3JvcCcsICdhbmd1bGFyRmlsZVVwbG9hZCcsICdib290c3RyYXBMaWdodGJveCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycsIFsnb3JkaW5hbCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycsIFsnZGliYXJpLmFuZ3VsYXItZWxsaXBzaXMnLCAnbG9jYWx5dGljcy5kaXJlY3RpdmVzJywgJ3RleHRBbmd1bGFyJywgJ2Zsb3cnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdCcpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ25hdmlnYXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOYXZpZ2F0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmxhc2hOb3RpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnZmxhc2gtbm90aWNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRmxhc2hOb3RpY2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGb290ZXJDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnbm90aWZpY2F0aW9ucycsICdub3RpZmljYXRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTm90aWZpY2F0aW9uc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHF1aWNrVXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguc2lnbnVwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ3NpZ251cCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguZm9yZ290Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9mb3Jnb3QnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2ZvcmdvdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVjb3ZlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVjb3Zlcj90b2tlbiZlbWFpbCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVjb3ZlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhSZWNvdmVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmNvbmZpcm0nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm0/Y29kZSZlbWFpbCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnY29uZmlybScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDb25maXJtQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnJlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3RzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3QvOmNvbnRlc3RJZCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0U2luZ2xlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC50cmFuc2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1RyYW5zYWN0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ncmFic2hhcmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2dyYWItYS1zaGFyZScsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2ludmVzdCcsICdncmFiLWEtc2hhcmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdJbnZlc3RDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLm5vdGlmaWNhdGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL25vdGlmaWNhdGlvbnMnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAucGFnZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvOnNsdWcnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwYWdlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCAkdXJsUm91dGVyLCAkZmlsdGVyLCAkY29va2llcywgRmROb3RpZmljYXRpb25zLCBGZFNjcm9sbGVyKSB7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID0gZmFsc2U7XG4gICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gZmFsc2U7XG5cbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gJyc7XG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSBudWxsO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gbnVsbDtcblxuICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSB0cnVlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLnRvZ2dsZU5hdmlnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAoJHJvb3RTY29wZS5pc05hdlNob3duID49IDAuNSkgPyAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAwIDogJHJvb3RTY29wZS5pc05hdlNob3duID0gMC41O1xuICAgICAgICB9O1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdGFydExvYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3N0b3BMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ29pbmcgdG8gcmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlclNlcnZpY2UgaXMgYW4gZXhhbXBsZSBzZXJ2aWNlIGZvciBtYW5hZ2luZyB1c2VyIHN0YXRlXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50ICR1cmxSb3V0ZXIncyBkZWZhdWx0IGhhbmRsZXIgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmRcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdXNlciBvYmplY3QgYW5kIHRhc2tzXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXI/dG9rZW49JyArICRhdXRoLmdldFRva2VuKCkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBGZE5vdGlmaWNhdGlvbnMuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb2luZyB0byByZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgucmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnbmFsUm9sZSA9ICRyb290U2NvcGUudXNlci5yb2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVJvbGUgPSAkY29va2llcy5nZXQoJ2ZkX2FjdGl2ZV9yb2xlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiBhY3RpdmVSb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUob3JpZ25hbFJvbGUucm9sZSwgb3JpZ25hbFJvbGUuaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIuc3luYygpO1xuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIubGlzdGVuKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpID09PSAndW5kZWZpbmVkJyAmJiBmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdyZWNvdmVyJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCAmJiAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEgJiYgdG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xICYmIGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3dpdGNoIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlLCByb2xlSWQsIHJlbG9hZCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gcm9sZTtcbiAgICAgICAgICAgICRjb29raWVzLnB1dCgnZmRfYWN0aXZlX3JvbGUnLCByb2xlKTtcblxuICAgICAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHVzZXJSb2xlVmlld3MgPSBbe1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwJyxcbiAgICAgICAgICAgICAgICB2aWV3OiAncXVpY2tVcGRhdGUnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnQ6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgIGludmVzdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWludmVzdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdxdWljay11cGRhdGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgdmlldzogJ21haW5AJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3QtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3QtanVyeScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ2NvbnRlc3QnKVxuICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh1c2VyUm9sZVZpZXdzLCBmdW5jdGlvbihyb2xlVmlldykge1xuICAgICAgICAgICAgICAgIHZhciByb2xlVGVtcGxhdGVWaWV3ID0gcm9sZVZpZXcucm9sZXNbcm9sZV07XG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSAkc3RhdGUuZ2V0KHJvbGVWaWV3LnJvdXRlKS52aWV3c1tyb2xlVmlldy52aWV3XTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZVRlbXBsYXRlVmlldykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcudGVtcGxhdGVVcmwgPSByb2xlVGVtcGxhdGVWaWV3O1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVZpZXcuZGVmYXVsdFRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2gocm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6IG1vZGVsID0gJy9hcGkvY3JlYXRvcnMvJyArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzogbW9kZWwgPSAnL2FwaS9pbnZlc3RvcnMvJyArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQobW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3JvbGVdID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzdGF0ZS5jdXJyZW50Lm5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuY3VycmVudC5uYW1lID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQucGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuY3VycmVudC5uYW1lLCAkc3RhdGUuY3VycmVudC5wYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYgKCRzdGF0ZS5jdXJyZW50Lm5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5jdXJyZW50Lm5hbWUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5jdXJyZW50LnBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCRzdGF0ZS5jdXJyZW50Lm5hbWUsICRzdGF0ZS5jdXJyZW50LnBhcmFtcywge3JlbG9hZDogcmVsb2FkfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBIYXMgVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5oYXNVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzUm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IHJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKCRhdXRoUHJvdmlkZXIpe1xuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXG4gICAgICAgIC8vIHJvdXRlIHRoZSBKV1Qgc2hvdWxkIGJlIHJldHJpZXZlZCBmcm9tXG4gICAgICAgICRhdXRoUHJvdmlkZXIubG9naW5VcmwgPSAnL2FwaS9hdXRoZW50aWNhdGUnO1xuICAgICAgICAkYXV0aFByb3ZpZGVyLnRva2VuUHJlZml4ID0gJ2Z1bmRhdG9yJztcblxuICAgICAgICB2YXIgcmVkaXJlY3RVcmlQYXRoID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxpbmtlZGluKHtcbiAgICAgICAgXHRjbGllbnRJZDogJzc3emp4ZmJoMjkyOHJlJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvYXV0aGVudGljYXRlL2xpbmtlZGluJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydzdGF0ZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3NlbGYnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnMTA0MjI0NzcyNzA5MS1kbXFjNTVhZjd0bDU4aDJycXYzcHFucm1qamJiOTczMy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc2NvcGUnXSxcbiAgICAgICAgICAgIG9wdGlvbmFsVXJsUGFyYW1zOiBbJ2Rpc3BsYXknXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlUHJlZml4OiAnb3BlbmlkJyxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnOTAwNTMzMTIzMzk1OTIwJyxcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydkaXNwbGF5JywgJ3Njb3BlJ10sXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XG4gICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoZmxvd0ZhY3RvcnlQcm92aWRlcil7XG5cbiAgICAgICAgZmxvd0ZhY3RvcnlQcm92aWRlci5kZWZhdWx0cyA9IHtcbiAgICAgICAgXHR1cGxvYWRNZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHRhcmdldDogJy9hcGkvZmlsZXMvJyxcbiAgICAgICAgICAgIHBlcm1hbmVudEVycm9yczpbNDA0LCA1MDAsIDUwMV1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuXHQuZGlyZWN0aXZlKCdmZExvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiB7XG5cdCAgXHRzY29wZToge1xuXHQgIFx0XHR2aWV3Qm94OiAnQCdcblx0ICBcdH0sXG5cdCAgICByZXN0cmljdDogJ0UnLFxuXHQgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZmQtbG9hZGVyIGxhLWJhbGwtcHVsc2VcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nLFxuXHQgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdCAgICBcdCRlbGVtZW50LmFkZENsYXNzKCRhdHRycy5jbGFzcyk7XG5cdCAgICB9XG5cdCAgfTtcblx0fSk7XG5cbn0pKCk7XG5cbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignc3RyaXBUYWdzJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKFN0cmluZy5mcm9tQ2hhckNvZGUoMTYwKSwgXCJnXCIpO1xuXHRcdFx0XHR0ZXh0ID0gU3RyaW5nKHRleHQpLnJlcGxhY2UocmUsIFwiIFwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLyZuYnNwOy9naSwnICcpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dCA/IFN0cmluZyh0ZXh0KS5yZXBsYWNlKC88W14+XSs+L2dtLCAnJykgOiAnJztcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdjbGVhbkh0bWwnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dDtcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkTm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRxLCAkaW50ZXJ2YWwsICRodHRwLCAkc3RhdGUpIHtcbiAgICAgICAgdmFyIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zOiBbXSxcbiAgICAgICAgICAgIHVucmVhZDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdXNoTm90aWZpY2F0aW9uID0gZnVuY3Rpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG5vdGlmaWNhdGlvbnMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL25vdGlmaWNhdGlvbnMvJyArIHVzZXIuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnNJbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ZXN0Tm90aWZpY2F0aW9ucyA9IGFuZ3VsYXIuY29weShnbG9iYWxOb3RpZmljYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucyA9IGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5zbGljZSgwLCA1KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChub3RpZmljYXRpb25zSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnJlc29sdmUobGF0ZXN0Tm90aWZpY2F0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWROb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL25vdGlmaWNhdGlvbnMvJyArIG5vdGlmaWNhdGlvbklkICsgJy9yZWFkJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIFx0bm90aWZpY2F0aW9uLnJlYWQgPSAxO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWRBbGxOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9ub3RpZmljYXRpb25zL3VzZXIvJyArICRyb290U2NvcGUudXNlci5pZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucy51bnJlYWQgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG5vdGlmaWNhdGlvblRyaWdnZXI6IGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoKGNhdGVnb3J5KXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAnZG93bmxvYWQubmV3JzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmRvd25sb2FkcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5wYWlyZWQnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQucGFydG5lci5kZXRhaWxzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdwYXJ0bmVyLnN0dWR5X3BlcmlvZHMnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQuY291cnNlcy5wZXJpb2RzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICd1c2VyLmNyZWF0ZWQnOiAkc3RhdGUuZ28oVGFza3NTZXJ2aWNlLm5leHRUYXNrKCkudmlldyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBnZXROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlLCBwdXNoKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AodHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHB1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmeUVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0b2FzdGVyLnBvcCgnZXJyb3InLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmRTY3JvbGxlcicsIGZ1bmN0aW9uKCR3aW5kb3cpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sICc1MDAnLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1NlY3Rpb246IGZ1bmN0aW9uKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIFx0dmFyICRzZWN0aW9uID0gJChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJHNlY3Rpb24pO1xuICAgICAgICAgICAgXHRpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXHRcdHZhciB0b3AgPSAkc2VjdGlvbi5vZmZzZXQoKS50b3AgLSA3MDtcblxuICAgICAgICAgICAgXHRcdHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIFx0Ym9keS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICBcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcil7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnLCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgICRzY29wZS5zaWdudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvc2lnbnVwJywgdXNlckluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSAmJiB0eXBlb2YocmVzdWx0LmRhdGEubWVzc2FnZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9IHJlc3VsdC5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWxbMF0pO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhLnRva2VuKTtcbiAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YS50b2tlbik7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5zaWdudXAnKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXNUZXh0ID09PSAnVW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1RoZSBlbWFpbCBvciBwYXNzd29yZCB5b3UgZW50ZXJlZCBpcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aENvbmZpcm1DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICBpZiAodHlwZW9mKCRzdGF0ZVBhcmFtcy5jb2RlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1hdGlvbl9jb2RlOiAkc3RhdGVQYXJhbXMuY29kZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHN0YXRlUGFyYW1zLmVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL2NvbmZpcm0nLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEuZXJyb3I7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoUmVjb3ZlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcmVjb3ZlcnlFbWFpbDogJycsXG4gICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICBwYXNzd29yZF9yZXBlYXQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMudG9rZW4pID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YoJHN0YXRlUGFyYW1zLmVtYWlsKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlY292ZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdsb2FkaW5nJztcblxuICAgICAgICAgICAgLy8gUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLnJlY292ZXJ5RW1haWxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL2ZvcmdvdCcsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSAnQSBwYXNzd29yZCByZXNldCBsaW5rIGhhcyBiZWVuIHNlbnQgdG8geW91ciBlbWFpbC4nO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJyc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuZXJyb3IgPT09ICdJbnZhbGlkIFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVjb3ZlcmluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgLy8gUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5wYXNzd29yZC5sZW5ndGggPj0gNikge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5wYXNzd29yZCA9PT0gJHNjb3BlLmRhdGEucGFzc3dvcmRfcmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJHN0YXRlUGFyYW1zLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogJHNjb3BlLmRhdGEucGFzc3dvcmRfcmVwZWF0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvcmVjb3ZlcicsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnJlbW92ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGF1dGguc2V0VG9rZW4ocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgZnJvbSBoZXJlIC4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZXNldHRpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmRzIGRvIG5vdCBtYXRjaCEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmRzIG5lZWQgdG8gYmUgbG9uZ2VyIHRoYW4gNiBjaGFyYWN0ZXJzISc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhVVJJKTtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmb2N1c09uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZTogeyBmb2N1c09uOiAnPScgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2NvcGUuZm9jdXNPbik7XG5cbiAgICAgICAgICAgICAgICBpZihzY29wZS5mb2N1c09uKXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgIH07XG4gICAgfSk7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIsICRmaWx0ZXIsIEZpbGVVcGxvYWRlcikge1xuXG4gICAgICAgICRzY29wZS5mb3JtID0ge1xuICAgICAgICAgICAgY3VycmVudFN0ZXA6IDEsXG4gICAgICAgICAgICB0b3RhbFN0ZXBzOiAzXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvdGFsU3RlcHMgPSB7XG4gICAgICAgICAgICBjcmVhdG9yOiAzLFxuICAgICAgICAgICAgZXhwZXJ0OiA0LFxuICAgICAgICAgICAgaW52ZXN0b3I6IDRcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlRm9ybVN0ZXAgPSBmdW5jdGlvbihuZXdTdGVwKXtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLmN1cnJlbnRTdGVwID0gbmV3U3RlcDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb3VudHJpZXMgPSBbJ0FmZ2hhbmlzdGFuJywgJ8OFbGFuZCBJc2xhbmRzJywgJ0FsYmFuaWEnLCAnQWxnZXJpYScsICdBbWVyaWNhbiBTYW1vYScsICdBbmRvcnJBJywgJ0FuZ29sYScsICdBbmd1aWxsYScsICdBbnRhcmN0aWNhJywgJ0FudGlndWEgYW5kIEJhcmJ1ZGEnLCAnQXJnZW50aW5hJywgJ0FybWVuaWEnLCAnQXJ1YmEnLCAnQXVzdHJhbGlhJywgJ0F1c3RyaWEnLCAnQXplcmJhaWphbicsICdCYWhhbWFzJywgJ0JhaHJhaW4nLCAnQmFuZ2xhZGVzaCcsICdCYXJiYWRvcycsICdCZWxhcnVzJywgJ0JlbGdpdW0nLCAnQmVsaXplJywgJ0JlbmluJywgJ0Jlcm11ZGEnLCAnQmh1dGFuJywgJ0JvbGl2aWEnLCAnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYScsICdCb3Rzd2FuYScsICdCb3V2ZXQgSXNsYW5kJywgJ0JyYXppbCcsICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknLCAnQnJ1bmVpIERhcnVzc2FsYW0nLCAnQnVsZ2FyaWEnLCAnQnVya2luYSBGYXNvJywgJ0J1cnVuZGknLCAnQ2FtYm9kaWEnLCAnQ2FtZXJvb24nLCAnQ2FuYWRhJywgJ0NhcGUgVmVyZGUnLCAnQ2F5bWFuIElzbGFuZHMnLCAnQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJywgJ0NoYWQnLCAnQ2hpbGUnLCAnQ2hpbmEnLCAnQ2hyaXN0bWFzIElzbGFuZCcsICdDb2NvcyAoS2VlbGluZykgSXNsYW5kcycsICdDb2xvbWJpYScsICdDb21vcm9zJywgJ0NvbmdvJywgJ0NvbmdvLCBUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUnLCAnQ29vayBJc2xhbmRzJywgJ0Nvc3RhIFJpY2EnLCAnQ290ZSBEXFwnSXZvaXJlJywgJ0Nyb2F0aWEnLCAnQ3ViYScsICdDeXBydXMnLCAnQ3plY2ggUmVwdWJsaWMnLCAnRGVubWFyaycsICdEamlib3V0aScsICdEb21pbmljYScsICdEb21pbmljYW4gUmVwdWJsaWMnLCAnRWN1YWRvcicsICdFZ3lwdCcsICdFbCBTYWx2YWRvcicsICdFcXVhdG9yaWFsIEd1aW5lYScsICdFcml0cmVhJywgJ0VzdG9uaWEnLCAnRXRoaW9waWEnLCAnRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpJywgJ0Zhcm9lIElzbGFuZHMnLCAnRmlqaScsICdGaW5sYW5kJywgJ0ZyYW5jZScsICdGcmVuY2ggR3VpYW5hJywgJ0ZyZW5jaCBQb2x5bmVzaWEnLCAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJywgJ0dhYm9uJywgJ0dhbWJpYScsICdHZW9yZ2lhJywgJ0dlcm1hbnknLCAnR2hhbmEnLCAnR2licmFsdGFyJywgJ0dyZWVjZScsICdHcmVlbmxhbmQnLCAnR3JlbmFkYScsICdHdWFkZWxvdXBlJywgJ0d1YW0nLCAnR3VhdGVtYWxhJywgJ0d1ZXJuc2V5JywgJ0d1aW5lYScsICdHdWluZWEtQmlzc2F1JywgJ0d1eWFuYScsICdIYWl0aScsICdIZWFyZCBJc2xhbmQgYW5kIE1jZG9uYWxkIElzbGFuZHMnLCAnSG9seSBTZWUgKFZhdGljYW4gQ2l0eSBTdGF0ZSknLCAnSG9uZHVyYXMnLCAnSG9uZyBLb25nJywgJ0h1bmdhcnknLCAnSWNlbGFuZCcsICdJbmRpYScsICdJbmRvbmVzaWEnLCAnSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBPZicsICdJcmFxJywgJ0lyZWxhbmQnLCAnSXNsZSBvZiBNYW4nLCAnSXNyYWVsJywgJ0l0YWx5JywgJ0phbWFpY2EnLCAnSmFwYW4nLCAnSmVyc2V5JywgJ0pvcmRhbicsICdLYXpha2hzdGFuJywgJ0tlbnlhJywgJ0tpcmliYXRpJywgJ0tvcmVhLCBEZW1vY3JhdGljIFBlb3BsZVxcJ1MgUmVwdWJsaWMgb2YnLCAnS29yZWEsIFJlcHVibGljIG9mJywgJ0t1d2FpdCcsICdLeXJneXpzdGFuJywgJ0xhbyBQZW9wbGVcXCdTIERlbW9jcmF0aWMgUmVwdWJsaWMnLCAnTGF0dmlhJywgJ0xlYmFub24nLCAnTGVzb3RobycsICdMaWJlcmlhJywgJ0xpYnlhbiBBcmFiIEphbWFoaXJpeWEnLCAnTGllY2h0ZW5zdGVpbicsICdMaXRodWFuaWEnLCAnTHV4ZW1ib3VyZycsICdNYWNhbycsICdNYWNlZG9uaWEsIFRoZSBGb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2YnLCAnTWFkYWdhc2NhcicsICdNYWxhd2knLCAnTWFsYXlzaWEnLCAnTWFsZGl2ZXMnLCAnTWFsaScsICdNYWx0YScsICdNYXJzaGFsbCBJc2xhbmRzJywgJ01hcnRpbmlxdWUnLCAnTWF1cml0YW5pYScsICdNYXVyaXRpdXMnLCAnTWF5b3R0ZScsICdNZXhpY28nLCAnTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZicsICdNb2xkb3ZhLCBSZXB1YmxpYyBvZicsICdNb25hY28nLCAnTW9uZ29saWEnLCAnTW9udHNlcnJhdCcsICdNb3JvY2NvJywgJ01vemFtYmlxdWUnLCAnTXlhbm1hcicsICdOYW1pYmlhJywgJ05hdXJ1JywgJ05lcGFsJywgJ05ldGhlcmxhbmRzJywgJ05ldGhlcmxhbmRzIEFudGlsbGVzJywgJ05ldyBDYWxlZG9uaWEnLCAnTmV3IFplYWxhbmQnLCAnTmljYXJhZ3VhJywgJ05pZ2VyJywgJ05pZ2VyaWEnLCAnTml1ZScsICdOb3Jmb2xrIElzbGFuZCcsICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLCAnTm9yd2F5JywgJ09tYW4nLCAnUGFraXN0YW4nLCAnUGFsYXUnLCAnUGFsZXN0aW5pYW4gVGVycml0b3J5LCBPY2N1cGllZCcsICdQYW5hbWEnLCAnUGFwdWEgTmV3IEd1aW5lYScsICdQYXJhZ3VheScsICdQZXJ1JywgJ1BoaWxpcHBpbmVzJywgJ1BpdGNhaXJuJywgJ1BvbGFuZCcsICdQb3J0dWdhbCcsICdQdWVydG8gUmljbycsICdRYXRhcicsICdSZXVuaW9uJywgJ1JvbWFuaWEnLCAnUnVzc2lhbiBGZWRlcmF0aW9uJywgJ1JXQU5EQScsICdTYWludCBIZWxlbmEnLCAnU2FpbnQgS2l0dHMgYW5kIE5ldmlzJywgJ1NhaW50IEx1Y2lhJywgJ1NhaW50IFBpZXJyZSBhbmQgTWlxdWVsb24nLCAnU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXMnLCAnU2Ftb2EnLCAnU2FuIE1hcmlubycsICdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnLCAnU2F1ZGkgQXJhYmlhJywgJ1NlbmVnYWwnLCAnU2VyYmlhIGFuZCBNb250ZW5lZ3JvJywgJ1NleWNoZWxsZXMnLCAnU2llcnJhIExlb25lJywgJ1NpbmdhcG9yZScsICdTbG92YWtpYScsICdTbG92ZW5pYScsICdTb2xvbW9uIElzbGFuZHMnLCAnU29tYWxpYScsICdTb3V0aCBBZnJpY2EnLCAnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnLCAnU3BhaW4nLCAnU3JpIExhbmthJywgJ1N1ZGFuJywgJ1N1cmluYW1lJywgJ1N2YWxiYXJkIGFuZCBKYW4gTWF5ZW4nLCAnU3dhemlsYW5kJywgJ1N3ZWRlbicsICdTd2l0emVybGFuZCcsICdTeXJpYW4gQXJhYiBSZXB1YmxpYycsICdUYWl3YW4sIFByb3ZpbmNlIG9mIENoaW5hJywgJ1RhamlraXN0YW4nLCAnVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZicsICdUaGFpbGFuZCcsICdUaW1vci1MZXN0ZScsICdUb2dvJywgJ1Rva2VsYXUnLCAnVG9uZ2EnLCAnVHJpbmlkYWQgYW5kIFRvYmFnbycsICdUdW5pc2lhJywgJ1R1cmtleScsICdUdXJrbWVuaXN0YW4nLCAnVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzJywgJ1R1dmFsdScsICdVZ2FuZGEnLCAnVWtyYWluZScsICdVbml0ZWQgQXJhYiBFbWlyYXRlcycsICdVbml0ZWQgS2luZ2RvbScsICdVbml0ZWQgU3RhdGVzJywgJ1VuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kcycsICdVcnVndWF5JywgJ1V6YmVraXN0YW4nLCAnVmFudWF0dScsICdWZW5lenVlbGEnLCAnVmlldCBOYW0nLCAnVmlyZ2luIElzbGFuZHMsIEJyaXRpc2gnLCAnVmlyZ2luIElzbGFuZHMsIFUuUy4nLCAnV2FsbGlzIGFuZCBGdXR1bmEnLCAnV2VzdGVybiBTYWhhcmEnLCAnWWVtZW4nLCAnWmFtYmlhJywgJ1ppbWJhYndlJ107XG5cbiAgICAgICAgJHNjb3BlLmNvbnRhY3RUaW1lcyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnV29ya2luZyBob3VycyAoOWFtIHRvIDYgcG0pJywgdmFsdWU6ICc5LTYnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnRXZlbmluZyB0aW1lICg2YW0gdG8gOSBwbSknLCB2YWx1ZTogJzYtOSd9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFJvbGU6ICdjcmVhdG9yJyxcbiAgICAgICAgICAgIGFnZUdhdGU6ICd5ZXMnLFxuICAgICAgICAgICAgY291bnRyeU9yaWdpbjogJycsXG4gICAgICAgICAgICBjb3VudHJ5UmVzaWRlbmNlOiAnJyxcbiAgICAgICAgICAgIGNvbnRhY3RUaW1lOiAnJyxcbiAgICAgICAgICAgIGV4cGVydGlzZUZvcm06IHtcbiAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcm9wcGVkVGh1bWJuYWlsOiBudWxsLFxuICAgICAgICAgICAgZW1haWw6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHBheWxvYWQgPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5jaGFuZ2VSb2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzID0gJHNjb3BlLnRvdGFsU3RlcHNbJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlXTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKCgkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCAvICRzY29wZS5mb3JtLnRvdGFsU3RlcHMpICogMTAwLCA5Nik7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3NJbnZlcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KCgoMSAtICgkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCAvICRzY29wZS5mb3JtLnRvdGFsU3RlcHMpKSAqIDEwMCksIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodXNlci5yZWdpc3RlcmVkID09IDEpICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUltYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICRzY29wZS5kYXRhLmNyb3BwZWRUaHVtYm5haWw7XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZS5maWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gJ1lvdXIgcHJvZmlsZSBwaWN0dXJlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWQhJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VFcnJvciA9ICdQcm9maWxlIHBpY3R1cmUgZmFpbGVkIHRvIHVwbG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IoaW1hZ2UpKTtcbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCl7XG4gICAgICAgICAgICB2YXIgbGFzdElucHV0dGVkRXhwZXJ0aXNlID0ge3NlbGVjdGVkRXhwZXJ0aXNlOiAnbnVsbCcsIG90aGVyRXhwZXJ0aXNlOiB7c3RhdHVzOiAxfX07XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0xXTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RJbnB1dHRlZEV4cGVydGlzZSk7XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA8IDMgJiYgKGxhc3RJbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCAmJiBsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBza2lsbHNMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsczogW10sXG4gICAgICAgICAgICAgICAgICAgIG90aGVyU2tpbGxzOiB7bGlzdDogW10sIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeShpbmRleCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QoaW5kZXgpO1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGUsIGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaW5Ta2lsbHMgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgdmFyIGZvdW5kU2tpbGwgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGZvdW5kU2tpbGwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZFNraWxsLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICBpZighJHNjb3BlLmluU2tpbGxzKGluZGV4LCBza2lsbCkpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLnB1c2goc2tpbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGUsIGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhbmd1bGFyLmVxdWFscyhhY3R1YWwsIGV4cGVjdGVkKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVTa2lsbHMgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscyA9IHtsaXN0OiBbXSwgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8wJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlL2NhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZS5pZCArICcvc2tpbGxzLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKClcblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuc3VibWl0RGV0YWlscyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEuZm5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkc2NvcGUuZGF0YS5sbmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsXG4gICAgICAgICAgICAgICAgYWdlX2dhdGU6ICRzY29wZS5kYXRhLmFnZUdhdGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9vcmlnaW46ICRzY29wZS5kYXRhLmNvdW50cnlPcmlnaW4sXG4gICAgICAgICAgICAgICAgY291bnRyeV9yZXNpZGVuY2U6ICRzY29wZS5kYXRhLmNvdW50cnlSZXNpZGVuY2UsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXI6ICRzY29wZS5kYXRhLmNvbnRhY3ROdW1iZXIsXG4gICAgICAgICAgICAgICAgY29udGFjdF90aW1lOiAkc2NvcGUuZGF0YS5jb250YWN0VGltZS52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoKCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52ZXN0bWVudEJ1ZGdldCA9PT0gJ290aGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldE90aGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yID0ge307XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0ID0gaW52ZXN0bWVudEJ1ZGdldDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9nb2FsID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50R29hbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9yZWFzb24gPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRSZWFzb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmNyZWF0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdleHBlcnQnOlxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5leHBlcnQgPSB7IGxpc3Q6IFtdIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QsIGZ1bmN0aW9uKGlucHV0dGVkRXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCB8fCBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydC5saXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX2V4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZFNraWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJEYXRhKTtcblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLm5hbWUgPSAkc2NvcGUuZGF0YS5mbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLmxhc3RfbmFtZSA9ICRzY29wZS5kYXRhLmxuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUoJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlcikge1xuXG4gICAgICAgICRzY29wZS5jb250ZXN0cyA9IFtdO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cyA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicgJiYgdHlwZW9mKCRyb290U2NvcGUudXNlci5jcmVhdG9yKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIG9nYyBpbiAkcm9vdFNjb3BlLnVzZXIuY3JlYXRvci5vbmdvaW5nX2NvbnRlc3Qpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdFtvZ2NdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKHJlc3VsdCwge2lkOiBjb250ZXN0X2lkfSwgdHJ1ZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMucHVzaChjb250ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9nY0luZGV4ID0gJHNjb3BlLmNvbnRlc3RzLmluZGV4T2YoY29udGVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2djSW5kZXggOiAnICsgb2djSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3RzLnNwbGljZShvZ2NJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZigkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5JyAmJiAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGpjIGluICRyb290U2NvcGUudXNlci5qdWRnaW5nKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3RfaWQgPSAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZ1tqY10uY29udGVzdF9pZDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKHJlc3VsdCwge2lkOiBjb250ZXN0X2lkfSwgdHJ1ZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qdWRnaW5nQ29udGVzdHMucHVzaChjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmZEVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgZWxlbWVudC5iaW5kKFwia2V5ZG93biBrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMuZmRFbnRlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0U2luZ2xlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGZpbHRlciwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsICRodHRwLCBMaWdodGJveCkge1xuICAgICAgICAkc2NvcGUuY29udGVzdElkID0gJHN0YXRlUGFyYW1zLmNvbnRlc3RJZDtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBjb250ZXN0RnVsbERlc2NyaXB0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGFkZEVudHJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGFkZEVudHJ5Rm9ybToge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50cnk6IG51bGwsXG4gICAgICAgICAgICByYXRpbmc6IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICcnLFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICcnLFxuICAgICAgICAgICAgICAgIG1hcmtldDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnkgPSAkcmVzb3VyY2UoJy9hcGkvZW50cmllcy86ZW50cnlJZCcsIHtcbiAgICAgICAgICAgIGVudHJ5SWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvbnRlc3RhbnRFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2NyZWF0b3IvOmNyZWF0b3JJZCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGp1ZGdlRW50cmllczoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzL2NvbnRlc3QvOmNvbnRlc3RJZC9qdWRnZS86anVkZ2VJZCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzLzplbnRyeUlkL21lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnlSYXRpbmcgPSAkcmVzb3VyY2UoJy9hcGkvZW50cnktcmF0aW5ncy86ZW50cnlSYXRpbmdJZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuc2hvd0Z1bGxUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuY29udGVzdEZ1bGxEZXNjcmlwdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaGlkZUZ1bGxUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBDb250ZXN0LmdldCh7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWRcbiAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB2YXIganVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZW5kaW5nSnVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBjb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZW5kaW5nQ29udGVzdGluZyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5jb250ZXN0aW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGp1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGp1ZGdlYWJsZS5sZW5ndGggPiAwICYmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09ICdqdXJ5JyAmJiAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09ICdjcmVhdG9yJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LmNvbnRlc3RJZCA9IHJlc3VsdC5pZDtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5vbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICdqdXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IHJlc3VsdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmIGp1ZGdlYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygkcm9vdFNjb3BlLmFjdGl2ZVJvbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwZW5kaW5nSnVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0p1ZGdlYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVzdGluZy5sZW5ndGggPiAwICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2NyZWF0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdDb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0NvbnRlc3RpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5sb2FkRW50cmllcyA9IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHN3aXRjaChyb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdqdXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgRW50cnkuanVkZ2VFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlSWQ6ICRyb290U2NvcGUudXNlci5pZFxuICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiAnY3JlYXRvcid9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0b3IgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW50cnkuY29udGVzdGFudEVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3IuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICB2YXIganVkZ2VJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5Jykge1xuICAgICAgICAgICAgICAgIGp1ZGdlSWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChqdWRnZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2VudHJpZXMvJyArIGVudHJ5LmlkICsgJy9qdWRnZS8nICsganVkZ2VJZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nID0gcmVzdWx0LmRhdGEucmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBFbnRyeS5nZXQoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeUlkOiBlbnRyeS5pZFxuICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3BlbkxpZ2h0Ym94ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgdmFyIGFsbEZpbGVzID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5maWxlcztcbiAgICAgICAgICAgIHZhciBhbGxJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSAwO1xuXG4gICAgICAgICAgICBmb3IodmFyIGFGIGluIGFsbEZpbGVzKXtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGFsbEZpbGVzW2FGXTtcbiAgICAgICAgICAgICAgICBhbGxJbWFnZXMucHVzaChmaWxlLnVybCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsZS51cmwgPT09IGl0ZW0udXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGFGO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGlnaHRib3gub3Blbk1vZGFsKGFsbEltYWdlcywgY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uIChldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGVBZGRlZCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmxvd0ZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBmaWxlcyA6ICcgKyBtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgJGZpbGUucmVmX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuXG4gICAgICAgICAgICAvLyB2YXIgaXRlbXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcywge2lkOiBtZXNzYWdlLmZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YobWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5maWxlLmlkLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlUmVtb3ZlID0gZnVuY3Rpb24oZmlsZSwgJGZsb3cpIHtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IGZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YoZmlsZS5yZWZfaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZpbGVzSW5kZXggPSAkZmxvdy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICAgICAgaWYgKGZpbGVzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSBmaWxlcyAuLi4gJyArIGZpbGVzSW5kZXgpO1xuICAgICAgICAgICAgICAgICRmbG93LmZpbGVzLnNwbGljZShmaWxlc0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cuZmlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNob3dBZGRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5lbnRyaWVzLWxpc3QnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb24gPSAnJztcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICRzY29wZS5jb250ZXN0LmVudHJpZXNbJHNjb3BlLmNvbnRlc3QuZW50cmllcy5sZW5ndGggLSAxXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWRGaWxlcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHRodW1ibmFpbF9pZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZmxvdy5maWxlcywgZnVuY3Rpb24oZmlsZSl7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRGaWxlc1tmaWxlLnJlZl9pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICdjYXB0aW9uJzogZmlsZS5yZWZfY2FwdGlvblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlcGFyZSB0byBhc3NpZ24gdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgIT09IC0xICYmIHRodW1ibmFpbF9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2hvb3BpZSBpdCBtYXRjaGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbF9pZCA9IGZpbGUucmVmX2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBuZXcgRW50cnkoKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5jcmVhdG9yX2lkID0gcm9sZS5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS5jb250ZXN0X2lkID0gJHNjb3BlLmNvbnRlc3QuaWQ7XG4gICAgICAgICAgICAgICAgZW50cnkudGh1bWJuYWlsX2lkID0gdGh1bWJuYWlsX2lkO1xuXG4gICAgICAgICAgICAgICAgZW50cnkubmFtZSA9ICRyb290U2NvcGUudXNlci5uYW1lICsgXCIncyBFbnRyeVwiO1xuICAgICAgICAgICAgICAgIGVudHJ5LmRlc2NyaXB0aW9uID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGVudHJ5LmF0dGFjaGVkX2ZpbGVzID0gYXR0YWNoZWRGaWxlcztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LnRodW1ibmFpbF9pZCk7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VudHJ5IFNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ0VudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2NyZWF0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRW50cnkuc2VuZE1lc3NhZ2Uoe2VudHJ5SWQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWR9LCBtZXNzYWdlUmVxdWVzdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5Lm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNhdmVNYXJrcyA9IGZ1bmN0aW9uKGVudHJ5UmF0aW5nSWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlZFJhdGluZyA9IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmRlc2lnbixcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5jcmVhdGl2aXR5LFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmluZHVzdHJpYWwsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5tYXJrZXQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmp1ZGdlX2lkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5lbnRyeV9pZCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZW50cnlSYXRpbmdJZCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgRW50cnlSYXRpbmcudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogZW50cnlSYXRpbmdJZFxuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZWRSYXRpbmcpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBzYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5UmF0aW5nID0gbmV3IEVudHJ5UmF0aW5nKHVwZGF0ZWRSYXRpbmcpO1xuICAgICAgICAgICAgICAgIGVudHJ5UmF0aW5nLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIGNyZWF0ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnanVyeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTaG93IE5EQVxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0SnVkZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMvYmVjb21lSnVkZ2UnLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVDb250ZXN0YW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFjY2VwdENvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy9iZWNvbWVDb250ZXN0YW50Jywge2NvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0LmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlcikge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdGbGFzaE5vdGljZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcgPSB7XG4gICAgICAgIFx0c2hvdzogZmFsc2UsXG4gICAgICAgIFx0Y29udGVzdElkOiAwLFxuICAgICAgICBcdG9uQ2xpY2s6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICBcdFx0JHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgnanVyeScsIDUsIHRydWUpO1xuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgpIHtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdOYXZpZ2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGxvZywgJHRpbWVvdXQsICRodHRwLCAkcmVzb3VyY2UsICR1aWJNb2RhbCwgRmlsZVVwbG9hZGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLnVwbG9hZGVyID0gbmV3IEZpbGVVcGxvYWRlcih7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2ZpbGVzJyxcbiAgICAgICAgICAgIHJlbW92ZUFmdGVyVXBsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgdXNlclNldHRpbmdzTW9kZTogJ3ZpZXcnLFxuICAgICAgICAgICAgdXNlclNldHRpbmdzU2F2ZTogLTFcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2ZpbGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0gYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlcik7XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2NyZWF0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnaW52ZXN0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnanVkZ2luZyddO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2aW5nJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyRGF0YSk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAwO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvdXNlcnMvJyArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NNb2RlID0gJ3ZpZXcnO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gLTE7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoYW5nZSB1c2VyIHRodW1ibmFpbFxuICAgICAgICAkc2NvcGUuY2hhbmdlVGh1bWJuYWlsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vdmlld3MvYXBwL2FwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJUaHVtYm5haWxDdHJsJyxcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAodGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnRodW1ibmFpbCA9IGFuZ3VsYXIuY29weSh0aHVtYm5haWwpO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe2F0dGFjaDogJ3RodW1ibmFpbCd9KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlZCB1c2VyIHRodW1ibmFpbCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHVwbG9hZGluZyB0aGUgZmlsZVxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IodGh1bWJuYWlsKSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGxvZy5pbmZvKCdNb2RhbCBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9nb3V0XG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdHVhbGx5IGxvZ2dpbmcgb3V0ISAuLi4nKTtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBvcHVsYXRlIHNpZGUgbmF2aWdhdGlvblxuICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdXNlcnMvc2lkZU5hdmlnYXRpb25EYXRhJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2lkZU5hdmlnYXRpb25EYXRhID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24oKTtcblxuICAgICAgICAkc2NvcGUub3BlbkZ1bGxNZW51ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub0xpbmsgPSBmdW5jdGlvbihwYWdlLCBkYXRhKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDA7XG4gICAgICAgICAgICAkc3RhdGUuZ28ocGFnZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdVc2VyVGh1bWJuYWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHVpYk1vZGFsSW5zdGFuY2Upe1xuICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnNldFRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5jcm9wcGVkVGh1bWJuYWlsKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfVxuICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIb21lIFZpZXcgU3RhcnRlZCcpO1xuXG4gICAgICAgIC8vIFJlZGlyZWN0IHRvIGNvbnRlc3RcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdJbnZlc3RDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSW52ZXN0IFN0YXJ0ZWQnKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc2NvcGUuaW52ZXN0b3JzID0gW1xuICAgICAgICAgICAge25hbWU6ICdBbGFpbiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYSBldmVuaWV0IGRlc2VydW50IGFkIHBhcmlhdHVyIHByYWVzZW50aXVtLCBpbmNpZHVudCBtb2xlc3RpYWUgYmVhdGFlIHF1YW0gcXVhc2kgcmVpY2llbmRpcyBtb2xsaXRpYSBhY2N1c2FudGl1bSB2b2x1cHRhdGUgcXVhZXJhdCBzZXF1aSBvZmZpY2lhIGEgZmFjZXJlIHJlcGVsbGF0IGFkaXBpc2NpLid9LFxuICAgICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgZGlnbmlzc2ltb3MgbmVtbywgc2VxdWkgZG9sb3JpYnVzIGFjY3VzYW50aXVtLCBvYmNhZWNhdGkgbmF0dXMgaXVyZSBxdWFtIGVzc2UgZXggbGFib3JlIG5lcXVlIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZSBpbiwgbmloaWwgZWEsIGN1bSByZWN1c2FuZGFlIHV0Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaHJpc3RvcGhlIEJyaXNzaWF1ZCcsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnMy5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBsaWNhYm8gZW5pbSBvZmZpY2lhIG9wdGlvIGRvbG9ydW0gaGFydW0sIHNvbHV0YSBjdWxwYSB1bmRlIHZlbmlhbSBub2JpcyBlb3MsIGR1Y2ltdXMgcXVvZCBwcmFlc2VudGl1bSB2ZXJpdGF0aXMgYXRxdWUgbm9uIG5vc3RydW0gaXBzYW0uIE5vc3RydW0sIGV0ISd9LFxuICAgICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUXVpYSByZWN1c2FuZGFlIGFsaXF1aWQgcXVvcyBhcGVyaWFtIG1vbGVzdGlhZSBxdWlidXNkYW0gcXVpIGVvcyBpdXJlIHNhZXBlIG9wdGlvIHZpdGFlIGZ1Z2l0IHVuZGUgbmFtLCBhdHF1ZSBleGNlcHR1cmkgZGVzZXJ1bnQgZXN0LCByZXBlbGxhdCBhbGlhcy4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaW5keSBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9XG4gICAgICAgIF07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cbiAgICAuZGlyZWN0aXZlKCdmZENoYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjYW52YXMgaWQ9XCJmZENoYXJ0XCIgd2lkdGg9XCJ7e3dpZHRofX1cIiBoZWlnaHQ9XCJ7e2hlaWdodH19XCI+PC9jYW52YXM+JyxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS53aWR0aCA9ICRhdHRycy53aWR0aDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGVpZ2h0ID0gJGF0dHJzLmhlaWdodDtcblxuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykud2lkdGgoJGF0dHJzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5oZWlnaHQoJGF0dHJzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGllRGF0YUEgPSBbe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzAyNzUzZlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdWJsaWNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDk2LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjOTRjNDRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjOGNiYTQ3XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZ1bmRhdG9yXCJcbiAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lRGF0YUEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGxhbm5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDYwLCA1OSwgNjMsIDU5LCA1OCwgNjMsIDY0LCA2NSwgNjYsIDcwLCA3OV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVhbGl6ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCAyMiwgMTYsIDIxLCAxNywgMjAsIDI3LCAyNSwgMjMsIDMyLCA0MCwgNDVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYoJGF0dHJzLmRhdGEgPT09ICdBJyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKHBpZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHBpZURhdGFBKS5lYWNoKGZ1bmN0aW9uKGksIHRoZV9pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLnBpZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyt0aGVfaXRlbS5jb2xvcisnO1wiPjwvc3Bhbj4gJyt0aGVfaXRlbS52YWx1ZSsnJSAnK3RoZV9pdGVtLmxhYmVsKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuTGluZShsaW5lRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzAwNjgzNztcIj48L3NwYW4+IFJlYWxpemVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM5M0M2NTg7XCI+PC9zcGFuPiBQbGFubmVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05vdGlmaWNhdGlvbnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgRmROb3RpZmljYXRpb25zLmdldExhdGVzdE5vdGlmaWNhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQYWdlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc2NvcGUucGFnZSA9IHtcbiAgICAgICAgXHR0aXRsZTogJycsXG4gICAgICAgIFx0Y29udGVudDogJydcbiAgICAgICAgfTtcblxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcGFnZXMvJyArICRzdGF0ZVBhcmFtcy5zbHVnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcbiAgICAgICAgXHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdCRzY29wZS5wYWdlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXG5cdFx0XHRpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDQnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdsb2FkIDQwNCcpXG5cdFx0XHR9O1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUcmFuc2FjdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcblxuICAgIFx0Y29uc29sZS5sb2coJ1RyYW5zYWN0aW9uQ3RybCcpO1xuICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICBcdEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgIFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgIFx0fSwgMjAwMCk7XG5cbiAgICB9KTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
