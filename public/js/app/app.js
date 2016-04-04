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

        $urlRouterProvider.otherwise('/contests');

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
                        templateUrl: getView('quick-update', 'quick-update'),
                        controller: 'QuickUpdateCtrl'
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
                data: {
                    needLogin: false
                },
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'login'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.auth.signup', {
                url: '/signup',
                data: {
                    needLogin: false
                },
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'signup'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.auth.forgot', {
                url: '/forgot',
                data: {
                    needLogin: false
                },
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'forgot'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.auth.recover', {
                url: '/recover?token&email',
                data: {
                    needLogin: false
                },
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'recover'),
                        controller: 'AuthRecoverCtrl'
                    }
                }
            })
            .state('app.auth.confirm', {
                url: '/confirm?code&email',
                data: {
                    needLogin: false
                },
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'confirm'),
                        controller: 'AuthConfirmCtrl'
                    }
                }
            })
            .state('app.auth.register', {
                url: '/register',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'register'),
                        controller: 'RegisterCtrl'
                    }
                }
            })
            .state('app.home', {
                url: '/',
                data: {
                    bodyClass: 'homepage',
                    needLogin: false
                },
                views: {
                    'main@': {
                        templateUrl: getView('home'),
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.contests', {
                url: '/contests',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('contest'),
                        controller: 'ContestCtrl'
                    }
                }
            })
            .state('app.contest', {
                url: '/contests/:contestId/:contestName',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('contest', 'contest-single'),
                        controller: 'ContestSingleCtrl'
                    }
                }
            })
            .state('app.expert', {
                url: '/expert',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('expert'),
                        controller: 'ExpertCtrl'
                    }
                }
            })
            .state('app.invest', {
                url: '/invest',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('invest'),
                        controller: 'InvestCtrl'
                    }
                }
            })
            .state('app.create', {
                url: '/create?projectId',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('create'),
                        controller: 'CreateCtrl'
                    }
                }
            })
            .state('app.create.details', {
                url: '/details',
                data: {
                    needLogin: true
                },
                views: {
                    'steps': {
                        templateUrl: getView('create', 'create-details'),
                        controller: 'CreateDetailsCtrl'
                    }
                }
            })
            .state('app.create.superexpert', {
                url: '/super-expert',
                data: {
                    needLogin: true
                },
                views: {
                    'steps': {
                        templateUrl: getView('create', 'create-super-expert'),
                        controller: 'CreateSECtrl'
                    }
                }
            })
            .state('app.create.expertise', {
                url: '/expertise',
                data: {
                    needLogin: true
                },
                views: {
                    'steps': {
                        templateUrl: getView('create', 'create-expertise'),
                        controller: 'CreateExpertiseCtrl'
                    }
                }
            })
            .state('app.create.experts', {
                url: '/experts',
                data: {
                    needLogin: true
                },
                views: {
                    'steps': {
                        templateUrl: getView('create', 'create-experts'),
                        controller: 'CreateExpertCtrl'
                    }
                }
            })
            .state('app.create.budget', {
                url: '/budget',
                data: {
                    needLogin: true
                },
                views: {
                    'steps': {
                        templateUrl: getView('create', 'create-budget'),
                        controller: 'CreateBudgetCtrl'
                    }
                }
            })
            .state('app.create.investors', {
                url: '/investors',
                data: {
                    needLogin: true
                },
                views: {
                    'steps': {
                        templateUrl: getView('create', 'create-investors'),
                        controller: 'CreateInvestorsCtrl'
                    }
                }
            })
            .state('app.transaction', {
                url: '/transaction',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('transaction', 'transaction'),
                        controller: 'TransactionCtrl'
                    }
                }
            })
            .state('app.grabshare', {
                url: '/grab-a-share',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('invest', 'grab-a-share'),
                        controller: 'GrabShareCtrl'
                    }
                }
            })
            .state('app.notifications', {
                url: '/notifications',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('contest'),
                        controller: 'ContestCtrl'
                    }
                }
            })
            .state('app.page', {
                url: '/:slug',
                data: {
                    needLogin: false
                },
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
        $rootScope.notificationCollapse = false;
        $rootScope.isNavShown = false;

        $rootScope.collapseNotification = function(state){
            $rootScope.notificationCollapse = state;
        }

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
                                $rootScope.switchUserRole(role.role, role.id, !$rootScope.initialRoleAssignment);
                            }else{
                                $rootScope.switchUserRole(orignalRole.role, orignalRole.id, !$rootScope.initialRoleAssignment);
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
                // if (typeof($rootScope.user) === 'undefined' && fromState.name.indexOf('recover') === -1) {
                //     $rootScope.activeState = toState;
                //     $rootScope.activeStateParams = toParams;
                // }

                // if (typeof($rootScope.user) === 'undefined') {
                //     if (!$rootScope.initialRoleAssignment) {
                //         // event.preventDefault();
                //         return;
                //     }
                // }else if(!$rootScope.initialRoleAssignment && $rootScope.user.registered == 1){
                //     event.preventDefault();
                // }

                if (!$rootScope.initialRoleAssignment) {
                    $rootScope.activeState = toState;
                    $rootScope.activeStateParams = toParams;
                    event.preventDefault();
                }

                return;
            } else {
                var needLogin = false;

                if (typeof(toState.data.needLogin) === 'undefined') {
                    needLogin = true;
                }else{
                    needLogin = toState.data.needLogin;
                }

                if (needLogin) {
                    $rootScope.activeState = toState;
                    $rootScope.activeStateParams = toParams;
                    event.preventDefault();
                    $state.go('app.auth.login', {}, {reload: true});
                }

                return;

                // if (fromState.name.indexOf('auth') === -1 && toState.name.indexOf('auth') !== -1) {
                //     return;
                // } else if (fromState.name.indexOf('auth') === -1) {
                //     $timeout(function() {
                //         $rootScope.activeState = toState;
                //         $rootScope.activeStateParams = toParams;
                //         event.preventDefault();
                //         $state.go('app.auth.login', {}, {reload: true});
                //     });
                //     return;
                // } else if (toState.name.indexOf('auth') === -1 && fromState.name.indexOf('auth') !== -1) {
                //     FdScroller.toTop();
                //     event.preventDefault();
                //     return;
                // } else if (toState.name.indexOf('auth') === -1) {
                //     $timeout(function() {
                //         $rootScope.activeState = toState;
                //         $rootScope.activeStateParams = toParams;
                //         event.preventDefault();
                //         $state.go('app.auth.login', {}, {reload: true});
                //         return;
                //     });
                // } else {
                //     return;
                // }
            }
        });

        var getView = function(viewName, secondaryName) {
            if (typeof secondaryName === 'undefined') {
                secondaryName = viewName;
            }

            return './views/app/app/' + viewName + '/' + secondaryName + '.html';
        };

        // Switch User Role

        $rootScope.switchUserRole = function(role, roleId, reload, state, stateParams) {
            $rootScope.activeRole = role;
            $cookies.put('fd_active_role', role);

            if (typeof(state) === 'undefined') {
                state = $state.current.name;
            }

            if (typeof(stateParams) === 'undefined') {
                stateParams = $state.current.params;
            }

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

                    if (state === '') {
                        state = $rootScope.activeState.name;
                        stateParams = $rootScope.activeStateParams;
                    }

                    $state.go(state, stateParams, {reload: reload});
                });
            }else{
                if (state === '') {
                    state = $rootScope.activeState.name;
                    stateParams = $rootScope.activeStateParams;
                }

                $state.go(state, stateParams, {reload: reload});
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

    function isEmpty(value) {
    	return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    angular.module('fundator.directives').directive('ngMin', function () {
    	return {
    		restrict: 'A',
    		require: 'ngModel',
    		link: function (scope, elem, attr, ctrl) {
    			scope.$watch(attr.ngMin, function () {
    				ctrl.$setViewValue(ctrl.$viewValue);
    			});
    			var minValidator = function (value) {
    				var min = scope.$eval(attr.ngMin) || 0;
    				if (!isEmpty(value) && value < min) {
    					ctrl.$setValidity('ngMin', false);
    					return undefined;
    				} else {
    					ctrl.$setValidity('ngMin', true);
    					return value;
    				}
    			};

    			ctrl.$parsers.push(minValidator);
    			ctrl.$formatters.push(minValidator);
    		}
    	};
    });

    angular.module('fundator.directives').directive('ngMax', function () {
    	return {
    		restrict: 'A',
    		require: 'ngModel',
    		link: function (scope, elem, attr, ctrl) {
    			scope.$watch(attr.ngMax, function () {
    				ctrl.$setViewValue(ctrl.$viewValue);
    			});
    			var maxValidator = function (value) {
    				var max = scope.$eval(attr.ngMax) || Infinity;
    				if (!isEmpty(value) && value > max) {
    					ctrl.$setValidity('ngMax', false);
    					return undefined;
    				} else {
    					ctrl.$setValidity('ngMax', true);
    					return value;
    				}
    			};

    			ctrl.$parsers.push(maxValidator);
    			ctrl.$formatters.push(maxValidator);
    		}
    	};
    });

})();
(function() {
    "use strict";

    angular.module('fundator.directives').filter('trustedHtml', ['$sce', function($sce) {
        return function(html) {
            return $sce.trustAsHtml(html);
        };
    }]);

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
            $state.go('app.home', {});
        }else{
            FdScroller.toTop();
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
                $auth.setToken(result.data.token);

                var payload = $auth.getPayload();
                console.log(payload);

                var activeState = $rootScope.activeState.name;
                var activeStateParams = $rootScope.activeStateParams;

                $timeout(function(){
                    if (typeof(activeState) === 'undefined') {
                        $state.go('app.auth.signup');
                    }else{
                        $rootScope.switchUserRole(payload.role, payload.role_id, true, activeState, activeStateParams);
                    }
                }, 100);
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

    angular.module('fundator.controllers').controller('CreateCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", "$filter", "FdScroller", function($rootScope, $scope, $state, $stateParams, $resource, $timeout, $filter, FdScroller) {
        console.log('Create Started');
        $rootScope.$broadcast('startLoading');

        // Available Views : List, Create
        $scope.view = 'list';
        $scope.data = {
            newProjectLoading: false
        };

        $scope.project = null;

        var Project = $resource('/api/projects/:projectId', {
            projectId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        var requiredRole = 'creator';
        var matchingRoles = $filter('filter')($rootScope.user.user_roles, {role: requiredRole}, true);

        if (typeof(matchingRoles) !== 'undefined' && matchingRoles.length > 0) {
            var matchingRole = matchingRoles[0];

            if($rootScope.activeRole !== requiredRole){
                $rootScope.switchUserRole(requiredRole, matchingRole.id, true);
            }

            var projectId = parseInt($stateParams.projectId);

            if (typeof(projectId) === 'undefined' || isNaN(projectId)) {
                Project.query().$promise.then(function(result){
                    $scope.allProjects = result;
                }).finally(function(){
                    $rootScope.$broadcast('stopLoading');
                });
            }else if(angular.isNumber(projectId) && isFinite(projectId)){
                Project.get({projectId: projectId}).$promise.then(function(result){
                    $scope.project = result;

                    switch(result.state){
                        case 0: $state.go('app.create.details', {projectId: projectId});
                        break;
                        case 1: $state.go('app.create.details', {projectId: projectId});
                        break;
                        case 2: $state.go('app.create.superexpert', {projectId: projectId});
                        break;
                        case 3: $state.go('app.create.expertise', {projectId: projectId});
                        break;
                        default: $state.go('app.create.details', {projectId: projectId});
                    }
                }).finally(function(){
                    $rootScope.$broadcast('stopLoading');
                });
            }else{
                console.log('Make up your mind you peice of shit');
            }
        }else{
            $timeout(function(){
                $rootScope.$broadcast('stopLoading');
                $state.go('app.home');
            }, 2000);
        }

        $scope.goToProject = function(project) {
            $state.go('app.create.details', {projectId: project.id});
        }

        $scope.createNewProject = function() {
            $scope.data.newProjectLoading = true;

            var newProject = new Project().$save().then(function(result){
                $scope.goToProject(result);
                $scope.data.newProjectLoading = false;
            });
        }

        $scope.saveProgress = function() {
            console.log('Saving progress now !');
            var project = angular.copy($scope.project);
            console.log(project);

            if (typeof($scope.project) !== 'undefined') {
                Project.update({
                    projectId: $scope.project.id
                }, project).$promise.then(function(result) {
                    console.log('result');
                    console.log(result);
                });
            }
        }

        // Scroll to the top
        FdScroller.toTop();
    }]);

    angular.module('fundator.controllers').controller('CreateDetailsCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "FdScroller", function($rootScope, $scope, $state, $stateParams, $resource, FdScroller) {
        console.log('CreateDetailsCtrl Started');

        $scope.data = {
            featuredImage: {}
        };

        $scope.details = {
            name: '',
            geography: 'wherever'
        };

        $scope.$watch('project', function(project){
            if (project !== null) {
                $rootScope.$broadcast('stopLoading');
                $scope.details = project;
            }else{
                console.log('project still loading');
            }
        });

        $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
            event.preventDefault();
            console.log('file added');
        });

        $scope.featuredImageSuccess = function($file, $message) {
            var message = JSON.parse($message);
            console.log($file);

            console.log('Adding files : ' + message.file.id);
            $scope.project.thumbnail_id = message.file.id;
        }

        $scope.attachedFilesSuccess = function($file, $message) {
            var message = JSON.parse($message);
            console.log($file);

            console.log('Adding files : ' + message.file.id);

            var index = $scope.project.attachedFiles.indexOf(message.file.id);

            if (index === -1) {
                $scope.project.attachedFiles.push(message.file.id);
            }
        }

        $scope.submitDraft = function() {
            $scope.project.state = 1;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');
        }

        FdScroller.toSection('#projectSteps');
    }]);

    angular.module('fundator.controllers').controller('CreateSECtrl', ["$rootScope", "$scope", "$state", "$http", "$timeout", "FdScroller", function($rootScope, $scope, $state, $http, $timeout, FdScroller) {
        console.log('CreateSECtrl Started');

        $http.get('/api/super-experts').then(function(result){
            console.log('sups');
            console.log(result);
            $scope.superExperts = result.data;
        });

        $scope.chooseSuperExpert = function(superExpert){
            $scope.project.super_expert_id = superExpert.id;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function(){
                $state.go('app.create.expertise');
            }, 300);
        }
    }]);

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertiseCtrl Started');
    }]);

    angular.module('fundator.controllers').controller('CreateExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertCtrl Started');
    }]);

    angular.module('fundator.controllers').controller('CreateBudgetCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateBudgetCtrl Started');
    }]);

    angular.module('fundator.controllers').controller('CreateInvestorsCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateInvestorsCtrl Started');
    }]);
})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", "FdScroller", function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Expert Started');
        $rootScope.$broadcast('stopLoading');

        // Scroll to the top
        FdScroller.toTop();
    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$resource", "FdScroller", function($rootScope, $scope, $state, $stateParams, $http, $resource, FdScroller) {
        console.log('Home View Started');
        FdScroller.toTop();

        $scope.contests = [];
        $rootScope.$broadcast('startLoading');

        var Contest = $resource('/api/contests/:contestId', {
        	contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
        	$scope.contests = result;
        	$rootScope.$broadcast('stopLoading');
        }).finally(function() {
			$rootScope.$broadcast('stopLoading');
        });

        // Query Expertise

        $http.get('/api/expertise/').then(function(result){
            $scope.expertises = result.data;
        }, 2000);

        $scope.investors = [
            {name: 'Alain Amoretti', country: 'France', image: '1.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eveniet deserunt ad pariatur praesentium, incidunt molestiae beatae quam quasi reiciendis mollitia accusantium voluptate quaerat sequi officia a facere repellat adipisci.'},
            {name: 'Charles d\'anterroches', country: 'France', image: '2.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dignissimos nemo, sequi doloribus accusantium, obcaecati natus iure quam esse ex labore neque consequatur voluptate in, nihil ea, cum recusandae ut.'},
            {name: 'Christophe Brissiaud', country: 'China', image: '3.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo enim officia optio dolorum harum, soluta culpa unde veniam nobis eos, ducimus quod praesentium veritatis atque non nostrum ipsam. Nostrum, et!'},
            {name: 'Jean-Bernard Antoine', country: 'China', image: '4.jpeg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia recusandae aliquid quos aperiam molestiae quibusdam qui eos iure saepe optio vitae fugit unde nam, atque excepturi deserunt est, repellat alias.'},
            {name: 'Xavier Paulin', country: 'Taiwan', image: '5.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'},
            {name: 'Cindy Chung', country: 'Hong Kong', image: '6.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'}
        ];
    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('GrabShareCtrl', ["$rootScope", "$scope", "$state", "$http", "$timeout", "FdScroller", function($rootScope, $scope, $state, $http, $timeout, FdScroller) {
        console.log('Invest Started');
        $rootScope.$broadcast('startLoading');

        $scope.Math = window.Math;

        $scope.data = {
            primaryShareListing: null,
            showBidNow: false,
            myBid: {
                bid_amount: 0.72,
                num_shares: 10,
                saving: false
            },
        };

        // Scroll to the top
        FdScroller.toTop();

        $timeout(function(){
            $rootScope.$broadcast('stopLoading');
        }, 2000);

        $scope.investors = [
            {name: 'Alain Amoretti', country: 'France', image: '1.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eveniet deserunt ad pariatur praesentium, incidunt molestiae beatae quam quasi reiciendis mollitia accusantium voluptate quaerat sequi officia a facere repellat adipisci.'},
            {name: 'Charles d\'anterroches', country: 'France', image: '2.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dignissimos nemo, sequi doloribus accusantium, obcaecati natus iure quam esse ex labore neque consequatur voluptate in, nihil ea, cum recusandae ut.'},
            {name: 'Christophe Brissiaud', country: 'China', image: '3.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo enim officia optio dolorum harum, soluta culpa unde veniam nobis eos, ducimus quod praesentium veritatis atque non nostrum ipsam. Nostrum, et!'},
            {name: 'Jean-Bernard Antoine', country: 'China', image: '4.jpeg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia recusandae aliquid quos aperiam molestiae quibusdam qui eos iure saepe optio vitae fugit unde nam, atque excepturi deserunt est, repellat alias.'},
            {name: 'Xavier Paulin', country: 'Taiwan', image: '5.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'},
            {name: 'Cindy Chung', country: 'Hong Kong', image: '6.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'}
        ];

        // Get all listings
        function loadPrimaryListing() {
            $scope.data.primaryShareListing = null;

            $http.get('/api/share-listing/').then(function(result){
                $scope.data.primaryShareListing = result.data;
            });
        }

        loadPrimaryListing();

        $scope.confirmBid = function(){
            $scope.data.myBid.saving = true;

            var myBid = {
                'share_listing_id': $scope.data.primaryShareListing.id,
                'bid_amount': $scope.data.myBid.bid_amount,
                'num_shares': $scope.data.myBid.num_shares
            };

            $http.post('/api/share-bids', myBid).then(function(result){
                $scope.data.myBid.saving = false;

                if (typeof(result.error) === 'undefined') {
                    console.log(result.data);
                    $scope.data.showBidNow = false;
                    loadPrimaryListing();
                }
            });
        }

    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('InvestCtrl', ["$rootScope", "$scope", "$state", "$resource", "FdScroller", function($rootScope, $scope, $state, $resource, FdScroller) {
        console.log('Invest Started');
        $rootScope.$broadcast('stopLoading');

        // Scroll to the top
        FdScroller.toTop();
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

    angular.module('fundator.controllers').controller('NotificationsCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "FdNotifications", function($rootScope, $scope, $state, $stateParams, $http, FdNotifications) {
        $scope.notifications = null;

        FdNotifications.getLatestNotifications().then(function(result){
        	$scope.notifications = result.notifications;
        })
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

    angular.module('fundator.controllers').controller('HeaderCtrl', ["$rootScope", "$scope", "$state", "$auth", "$uibModal", function($rootScope, $scope, $state, $auth, $uibModal) {

        $scope.triggerLogin = function() {
        	console.log('trigger login!');

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'login.html',
                controller: 'LoginCtrl',
                size: 'md',
                windowClass: 'login-modal'
            });

            modalInstance.result.then(function() {
                console.log('Got close feedback!');
            }, function() {
            	console.log('Modal dismissed at: ' + new Date());
            });
        }
    }]);

    angular.module('fundator.controllers').controller('LoginCtrl', ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
    	$scope.login = function(){
    		console.log('logging in now !');
    	}

    	$scope.authenticate = function(){
    		console.log('auth in now !');
    	}
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

    angular.module('fundator.controllers').controller('NavigationCtrl', ["$rootScope", "$scope", "$state", "$auth", "$log", "$timeout", "$filter", "$http", "$resource", "$uibModal", "FileUploader", function($rootScope, $scope, $state, $auth, $log, $timeout, $filter, $http, $resource, $uibModal, FileUploader) {

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

        $rootScope.$watch('user', function(user){
            if (typeof(user) === 'undefined') return;

            $scope.populateSideNavigation();
        });

        $scope.openFullMenu = function(){
            $rootScope.isNavShown = 1;
        }

        $scope.goToLink = function(page, data, role){
            $rootScope.isNavShown = 0;

            var roles = $filter('filter')($rootScope.user.user_roles, {role: role}, true);

            if (typeof(roles) !== 'undefined' && roles.length > 0) {
                var role = roles[0];
                $rootScope.switchUserRole(role.role, role.id, true, page, data);
            }
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
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('QuickUpdateCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "FdNotifications", function($rootScope, $scope, $state, $stateParams, $resource, FdNotifications) {
        console.log('quickupdate');

        $scope.data = {
        	editMode: false
        };

        var Investor = $resource('/api/investors/:investorId', {
            investorId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        $scope.editInvestment = function(state){
        	$scope.data.editMode = state;
        }

        $scope.modifyInvestment = function(){

            var investorData = {
                'investment_budget': $rootScope.user.investor.investment_budget
            };

            $scope.editInvestment(false);

            Investor.update({
                investorId: $rootScope.user.investor.id
            }, investorData).$promise.then(function(result){
                if (typeof(result.error) === 'undefined') {
                    console.log(result);
                }
            });
        }
    }]);

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwic2VydmljZXMvbm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvc2Nyb2xsZXIuc2VydmljZS5qcyIsImNvbmZpZy9hdXRoLmpzIiwiY29uZmlnL2Zsb3cuanMiLCJkaXJlY3RpdmVzL2NoYXJ0cy5qcyIsImRpcmVjdGl2ZXMvbG9hZGVyLmRpcmVjdGl2ZS5qcyIsImRpcmVjdGl2ZXMvbWluTWF4LmpzIiwiZGlyZWN0aXZlcy9taXNjLmpzIiwiZmlsdGVycy9zdHJpcEh0bWwuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2NyZWF0ZS9jcmVhdGUuanMiLCJhcHAvZXhwZXJ0L2V4cGVydC5qcyIsImFwcC9ob21lL2hvbWUuanMiLCJhcHAvaW52ZXN0L2dyYWJTaGFyZS5qcyIsImFwcC9pbnZlc3QvaW52ZXN0LmpzIiwiYXBwL2Zvb3Rlci9mb290ZXIuanMiLCJhcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuanMiLCJhcHAvcGFnZS9wYWdlLmpzIiwiYXBwL3RyYW5zYWN0aW9uL3RyYW5zYWN0aW9uLmpzIiwiYXBwL3F1aWNrLXVwZGF0ZS9xdWljay11cGRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUEscUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBLENBQUEsMkJBQUEseUJBQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQTs7O0FDbEJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxnREFBQSxTQUFBLGdCQUFBLG9CQUFBOztRQUVBLElBQUEsVUFBQSxTQUFBLFVBQUEsZUFBQTtZQUNBLElBQUEsT0FBQSxrQkFBQSxhQUFBO2dCQUNBLGdCQUFBOzs7WUFHQSxPQUFBLHFCQUFBLFdBQUEsTUFBQSxnQkFBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsWUFBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOztvQkFFQSxhQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBO3dCQUNBLFlBQUE7O29CQUVBLGVBQUE7d0JBQ0EsYUFBQSxRQUFBLGlCQUFBO3dCQUNBLFlBQUE7O29CQUVBLGFBQUE7d0JBQ0EsYUFBQSxRQUFBLGdCQUFBO3dCQUNBLFlBQUE7O29CQUVBLE1BQUE7OzthQUdBLE1BQUEsWUFBQTtnQkFDQSxLQUFBO2dCQUNBLFVBQUE7O2FBRUEsTUFBQSxrQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG1CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsbUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxvQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG9CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEscUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsZ0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsZUFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxXQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JB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S0FFQSxVQUFBO0tBQ0EsVUFBQTtLQUNBLE1BQUEsU0FBQSxRQUFBLFVBQUEsUUFBQTtNQUNBLFNBQUEsU0FBQSxPQUFBOzs7Ozs7O0FDYkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsU0FBQSxRQUFBLE9BQUE7S0FDQSxPQUFBLFFBQUEsWUFBQSxVQUFBLFVBQUEsTUFBQSxVQUFBLFFBQUEsVUFBQTs7O0lBR0EsUUFBQSxPQUFBLHVCQUFBLFVBQUEsU0FBQSxZQUFBO0tBQ0EsT0FBQTtNQUNBLFVBQUE7TUFDQSxTQUFBO01BQ0EsTUFBQSxVQUFBLE9BQUEsTUFBQSxNQUFBLE1BQUE7T0FDQSxNQUFBLE9BQUEsS0FBQSxPQUFBLFlBQUE7UUFDQSxLQUFBLGNBQUEsS0FBQTs7T0FFQSxJQUFBLGVBQUEsVUFBQSxPQUFBO1FBQ0EsSUFBQSxNQUFBLE1BQUEsTUFBQSxLQUFBLFVBQUE7UUFDQSxJQUFBLENBQUEsUUFBQSxVQUFBLFFBQUEsS0FBQTtTQUNBLEtBQUEsYUFBQSxTQUFBO1NBQ0EsT0FBQTtlQUNBO1NBQ0EsS0FBQSxhQUFBLFNBQUE7U0FDQSxPQUFBOzs7O09BSUEsS0FBQSxTQUFBLEtBQUE7T0FDQSxLQUFBLFlBQUEsS0FBQTs7Ozs7SUFLQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxTQUFBLFlBQUE7S0FDQSxPQUFBO01BQ0EsVUFBQTtNQUNBLFNBQUE7TUFDQSxNQUFBLFVBQUEsT0FBQSxNQUFBLE1BQUEsTUFBQTtPQUNBLE1BQUEsT0FBQSxLQUFBLE9BQUEsWUFBQTtRQUNBLEtBQUEsY0FBQSxLQUFBOztPQUVBLElBQUEsZUFBQSxVQUFBLE9BQUE7UUFDQSxJQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUEsVUFBQTtRQUNBLElBQUEsQ0FBQSxRQUFBLFVBQUEsUUFBQSxLQUFBO1NBQ0EsS0FBQSxhQUFBLFNBQUE7U0FDQSxPQUFBO2VBQ0E7U0FDQSxLQUFBLGFBQUEsU0FBQTtTQUNBLE9BQUE7Ozs7T0FJQSxLQUFBLFNBQUEsS0FBQTtPQUNBLEtBQUEsWUFBQSxLQUFBOzs7Ozs7QUNwREEsQ0FBQSxX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QUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsV0FBQSxXQUFBOzs7O1FBSUEsT0FBQSxTQUFBLFVBQUE7WUFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO2dCQUNBLGFBQUEsV0FBQTtnQkFDQSxXQUFBLGdCQUFBO2dCQUNBLFdBQUEsT0FBQTs7Z0JBRUEsT0FBQSxHQUFBLGtCQUFBLElBQUEsQ0FBQSxRQUFBOzs7Ozs7SUFNQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxvR0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLE1BQUE7UUFDQSxXQUFBLFdBQUE7O1FBRUEsSUFBQSxPQUFBLGFBQUEsVUFBQSxlQUFBLE9BQUEsYUFBQSxXQUFBLGFBQUE7WUFDQSxJQUFBLFNBQUE7Z0JBQ0EsbUJBQUEsYUFBQTtnQkFDQSxPQUFBLGFBQUE7OztZQUdBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLEtBQUEsNkJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsR0FBQTtlQUNBLFNBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsZUFBQSxNQUFBLEtBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsT0FBQSxVQUFBOzs7YUFHQTtZQUNBLE9BQUEsR0FBQTs7OztJQUlBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG9HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFVBQUEsTUFBQTtRQUNBLFdBQUEsV0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxlQUFBO1lBQ0EsVUFBQTtZQUNBLGlCQUFBOzs7UUFHQSxJQUFBLE9BQUEsYUFBQSxXQUFBLGVBQUEsT0FBQSxhQUFBLFdBQUEsYUFBQTtZQUNBLE9BQUEsWUFBQTthQUNBO1lBQ0EsT0FBQSxZQUFBOzs7UUFHQSxPQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsWUFBQTs7O1lBR0EsSUFBQSxTQUFBO2dCQUNBLE9BQUEsT0FBQSxLQUFBOzs7WUFHQSxNQUFBLEtBQUEsNEJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTs7Z0JBRUEsSUFBQSxPQUFBLE9BQUEsS0FBQSxXQUFBLGFBQUE7b0JBQ0EsT0FBQSxpQkFBQTtvQkFDQSxPQUFBLFlBQUE7cUJBQ0E7b0JBQ0EsT0FBQSxZQUFBOztvQkFFQSxJQUFBLE9BQUEsS0FBQSxVQUFBLGdCQUFBO3dCQUNBLE9BQUEsZUFBQTt5QkFDQTt3QkFDQSxPQUFBLGVBQUE7Ozs7ZUFJQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxZQUFBOztnQkFFQSxJQUFBLE9BQUEsS0FBQSxVQUFBLGdCQUFBO29CQUNBLE9BQUEsZUFBQTtxQkFDQTtvQkFDQSxPQUFBLGVBQUE7Ozs7O1FBS0EsT0FBQSxNQUFBLFVBQUE7OztZQUdBLElBQUEsT0FBQSxLQUFBLFNBQUEsVUFBQSxHQUFBO2dCQUNBLElBQUEsT0FBQSxLQUFBLGFBQUEsT0FBQSxLQUFBLGlCQUFBO29CQUNBLE9BQUEsWUFBQTtvQkFDQSxJQUFBLFNBQUE7d0JBQ0EsT0FBQSxhQUFBO3dCQUNBLE9BQUEsYUFBQTt3QkFDQSxVQUFBLE9BQUEsS0FBQTt3QkFDQSx1QkFBQSxPQUFBLEtBQUE7OztvQkFHQSxNQUFBLEtBQUEsNkJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTt3QkFDQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsYUFBQTs0QkFDQSxNQUFBOzRCQUNBLE1BQUEsU0FBQSxPQUFBOzRCQUNBLE9BQUEsR0FBQSxrQkFBQTs0QkFDQSxRQUFBLElBQUE7NkJBQ0E7NEJBQ0EsT0FBQSxlQUFBOzRCQUNBLE9BQUEsWUFBQTs7dUJBRUEsU0FBQSxPQUFBO3dCQUNBLE9BQUEsZUFBQTt3QkFDQSxPQUFBLFlBQUE7O3FCQUVBO29CQUNBLE9BQUEsZUFBQTs7aUJBRUE7Z0JBQ0EsT0FBQSxlQUFBOzs7Ozs7O0FDdE5BLENBQUEsV0FBQTtJQUNBOztJQUVBLFNBQUEsY0FBQSxTQUFBO1FBQ0EsUUFBQSxJQUFBOztRQUVBLElBQUE7UUFDQSxJQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsUUFBQSxhQUFBO1lBQ0EsYUFBQSxLQUFBLFFBQUEsTUFBQSxLQUFBOztZQUVBLGFBQUEsU0FBQSxRQUFBLE1BQUEsS0FBQTs7O1FBR0EsSUFBQSxhQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBOzs7UUFHQSxJQUFBLEtBQUEsSUFBQSxXQUFBLFdBQUE7UUFDQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsV0FBQSxRQUFBLEtBQUE7WUFDQSxHQUFBLEtBQUEsV0FBQSxXQUFBOzs7UUFHQSxPQUFBLElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBOzs7SUFHQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxXQUFBLFdBQUE7UUFDQSxPQUFBO1lBQ0EsT0FBQSxFQUFBLFNBQUE7WUFDQSxNQUFBLFNBQUEsT0FBQSxNQUFBLE1BQUE7Z0JBQ0EsUUFBQSxJQUFBLE1BQUE7O2dCQUVBLEdBQUEsTUFBQSxRQUFBO29CQUNBLEtBQUEsR0FBQTs7Ozs7OztJQU9BLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHVJQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsT0FBQSxVQUFBLE9BQUEsV0FBQSxZQUFBLFNBQUEsY0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7O1FBR0EsT0FBQSxhQUFBO1lBQ0EsU0FBQTtZQUNBLFFBQUE7WUFDQSxVQUFBOzs7UUFHQSxPQUFBLGlCQUFBLFNBQUEsUUFBQTtZQUNBLFdBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7O1FBR0EsT0FBQSxZQUFBLENBQUEsZUFBQSxpQkFBQSxXQUFBLFdBQUEsa0JBQUEsV0FBQSxVQUFBLFlBQUEsY0FBQSx1QkFBQSxhQUFBLFdBQUEsU0FBQSxhQUFBLFdBQUEsY0FBQSxXQUFBLFdBQUEsY0FBQSxZQUFBLFdBQUEsV0FBQSxVQUFBLFNBQUEsV0FBQSxVQUFBLFdBQUEsMEJBQUEsWUFBQSxpQkFBQSxVQUFBLGtDQUFBLHFCQUFBLFlBQUEsZ0JBQUEsV0FBQSxZQUFBLFlBQUEs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RUEsT0FBQSx1QkFBQSxPQUFBLHNCQUFBLFNBQUE7OztRQUdBLE9BQUEsMEJBQUEsU0FBQSxPQUFBLG1CQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSwwQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSxtQkFBQTs7OztRQUlBLE9BQUEsNEJBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLDZCQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLHVCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsMEJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7OztRQUlBLE9BQUEsK0JBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7OztRQUlBLE9BQUEsa0JBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0EsT0FBQSxnQkFBQTtZQUNBOzs7UUFHQSxPQUFBLG9CQUFBLFNBQUEsR0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO1lBQ0EsRUFBQSxnQkFBQTs7O1FBR0EsT0FBQSxxQkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLFNBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtZQUNBOzs7UUFHQSxPQUFBLHVCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7UUFHQSxPQUFBLFdBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLGFBQUEsUUFBQSxVQUFBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsTUFBQSxLQUFBOztZQUVBLElBQUEsT0FBQSxnQkFBQSxhQUFBO2dCQUNBLE9BQUEsV0FBQSxTQUFBOzs7WUFHQSxPQUFBOzs7UUFHQSxPQUFBLGNBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxHQUFBLENBQUEsT0FBQSxTQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsZUFBQSxLQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7UUFHQSxPQUFBLGdCQUFBLFNBQUEsR0FBQSxPQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxVQUFBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsTUFBQSxLQUFBLFNBQUEsUUFBQSxTQUFBO2dCQUNBLE9BQUEsQ0FBQSxRQUFBLE9BQUEsUUFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLGFBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGFBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLFFBQUEsS0FBQSxPQUFBLHNCQUFBLE9BQUEsWUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxjQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7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Ozs7UUFNQSxPQUFBLGtCQUFBLFNBQUEsTUFBQSxPQUFBOzs7Ozs7OztZQVFBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsS0FBQTs7WUFFQSxJQUFBLFVBQUEsQ0FBQSxHQUFBO2dCQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUEsT0FBQSxPQUFBOzs7WUFHQSxJQUFBLGFBQUEsTUFBQSxNQUFBLFFBQUE7WUFDQSxJQUFBLGVBQUEsQ0FBQSxHQUFBO2dCQUNBLFFBQUEsSUFBQSxzQkFBQTtnQkFDQSxNQUFBLE1BQUEsT0FBQSxZQUFBOzs7WUFHQSxRQUFBLElBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxPQUFBLEtBQUEsYUFBQTs7O1FBR0EsT0FBQSxlQUFBLFdBQUE7WUFDQSxXQUFBLFVBQUE7O1lBRUEsT0FBQSxLQUFBLGdCQUFBO1lBQ0EsT0FBQSxLQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxjQUFBO1lBQ0EsT0FBQSxLQUFBLGFBQUEsZ0JBQUE7O1lBRUEsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLFFBQUEsUUFBQSxPQUFBLFFBQUEsUUFBQSxTQUFBLEdBQUE7OztRQUdBLE9BQUEsY0FBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGNBQUE7O1lBRUEsSUFBQSxnQkFBQTtZQUNBLElBQUEsZUFBQTs7WUFFQSxRQUFBLFFBQUEsT0FBQSxLQUFBLGFBQUEsS0FBQSxPQUFBLFNBQUEsS0FBQTtnQkFDQSxjQUFBLEtBQUEsVUFBQTtvQkFDQSxXQUFBLEtBQUE7OztnQkFHQSxRQUFBLElBQUE7Z0JBQ0EsSUFBQSxLQUFBLEtBQUEsS0FBQSxRQUFBLGFBQUEsQ0FBQSxLQUFBLGlCQUFBLE1BQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLGVBQUEsS0FBQTs7OztZQUlBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLFlBQUE7O1lBRUEsSUFBQSxNQUFBLFNBQUEsR0FBQTtnQkFDQSxJQUFBLE9BQUEsTUFBQTs7Z0JBRUEsSUFBQSxRQUFBLElBQUE7Z0JB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QSxJQUFBLFlBQUEsTUFBQTtnQkFDQSxXQUFBLFdBQUE7Z0JBQ0EsT0FBQSxVQUFBO2lCQUNBO2dCQUNBLFFBQUEsSUFBQTs7OztRQUlBLE9BQUEsSUFBQSxtQkFBQSxVQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFFBQUEsSUFBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsUUFBQSxJQUFBLG9CQUFBLFFBQUEsS0FBQTtZQUNBLE9BQUEsUUFBQSxlQUFBLFFBQUEsS0FBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsUUFBQSxJQUFBLG9CQUFBLFFBQUEsS0FBQTs7WUFFQSxJQUFBLFFBQUEsT0FBQSxRQUFBLGNBQUEsUUFBQSxRQUFBLEtBQUE7O1lBRUEsSUFBQSxVQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLFFBQUEsY0FBQSxLQUFBLFFBQUEsS0FBQTs7OztRQUlBLE9BQUEsY0FBQSxXQUFBO1lBQ0EsT0FBQSxRQUFBLFFBQUE7WUFDQSxPQUFBOztZQUVBLFdBQUEsVUFBQTs7O1FBR0EsV0FBQSxVQUFBOzs7SUFHQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxzRkFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLE9BQUEsVUFBQSxZQUFBO1FBQ0EsUUFBQSxJQUFBOztRQUVBLE1BQUEsSUFBQSxzQkFBQSxLQUFBLFNBQUEsT0FBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLE9BQUEsZUFBQSxPQUFBOzs7UUFHQSxPQUFBLG9CQUFBLFNBQUEsWUFBQTtZQUNBLE9BQUEsUUFBQSxrQkFBQSxZQUFBO1lBQ0EsT0FBQTs7WUFFQSxXQUFBLFVBQUE7O1lBRUEsU0FBQSxVQUFBO2dCQUNBLE9BQUEsR0FBQTtlQUNBOzs7O0lBSUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsdUVBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxXQUFBO1FBQ0EsUUFBQSxJQUFBOzs7SUFHQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxvRUFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLFdBQUE7UUFDQSxRQUFBLElBQUE7OztJQUdBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG9FQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsV0FBQTtRQUNBLFFBQUEsSUFBQTs7O0lBR0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsdUVBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxXQUFBO1FBQ0EsUUFBQSxJQUFBOzs7QUNoTUEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsNEVBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxXQUFBLFlBQUE7UUFDQSxRQUFBLElBQUE7UUFDQSxXQUFBLFdBQUE7OztRQUdBLFdBQUE7Ozs7QUNSQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxtR0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxXQUFBLFlBQUE7UUFDQSxRQUFBLElBQUE7UUFDQSxXQUFBOztRQUVBLE9BQUEsV0FBQTtRQUNBLFdBQUEsV0FBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSw0QkFBQTtTQUNBLFdBQUE7OztRQUdBLFFBQUEsUUFBQSxTQUFBLEtBQUEsU0FBQSxRQUFBO1NBQ0EsT0FBQSxXQUFBO1NBQ0EsV0FBQSxXQUFBO1dBQ0EsUUFBQSxXQUFBO0dBQ0EsV0FBQSxXQUFBOzs7OztRQUtBLE1BQUEsSUFBQSxtQkFBQSxLQUFBLFNBQUEsT0FBQTtZQUNBLE9BQUEsYUFBQSxPQUFBO1dBQ0E7O1FBRUEsT0FBQSxZQUFBO1lBQ0EsQ0FBQSxNQUFBLGtCQUFBLFNBQUEsVUFBQSxPQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSwwQkFBQSxTQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsd0JBQUEsU0FBQSxTQUFBLE9BQUEsU0FBQSxPQUFBO1lBQ0EsQ0FB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QUE7Ozs7Ozs7QUNYQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx1RUFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLE9BQUEsV0FBQTs7UUFFQSxPQUFBLGVBQUEsV0FBQTtTQUNBLFFBQUEsSUFBQTs7WUFFQSxJQUFBLGdCQUFBLFVBQUEsS0FBQTtnQkFDQSxXQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxNQUFBO2dCQUNBLGFBQUE7OztZQUdBLGNBQUEsT0FBQSxLQUFBLFdBQUE7Z0JBQ0EsUUFBQSxJQUFBO2VBQ0EsV0FBQTthQUNBLFFBQUEsSUFBQSx5QkFBQSxJQUFBOzs7OztJQUtBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLDZDQUFBLFNBQUEsUUFBQSxtQkFBQTtLQUNBLE9BQUEsUUFBQSxVQUFBO01BQ0EsUUFBQSxJQUFBOzs7S0FHQSxPQUFBLGVBQUEsVUFBQTtNQUNBLFFBQUEsSUFBQTs7Ozs7O0FDOUJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFNBQUEsY0FBQSxTQUFBOztRQUVBLElBQUE7UUFDQSxJQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsUUFBQSxhQUFBO1lBQ0EsYUFBQSxLQUFBLFFBQUEsTUFBQSxLQUFBOztZQUVBLGFBQUEsU0FBQSxRQUFBLE1BQUEsS0FBQTs7O1FBR0EsSUFBQSxhQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBOzs7UUFHQSxJQUFBLEtBQUEsSUFBQSxXQUFBLFdBQUE7UUFDQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsV0FBQSxRQUFBLEtBQUE7WUFDQSxHQUFBLEtBQUEsV0FBQSxXQUFBOzs7UUFHQSxPQUFBLElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBOzs7SUFHQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxnSkFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLE9BQUEsTUFBQSxVQUFBLFNBQUEsT0FBQSxXQUFBLFdBQUEsY0FBQTs7UUFFQSxPQUFBLFlBQUEsVUFBQSxjQUFBOztRQUVBLE9BQUEsV0FBQSxJQUFBLGFBQUE7WUFDQSxLQUFBO1lBQ0EsbUJBQUE7OztRQUdBLE9BQUEsT0FBQTtZQUNBLGtCQUFBO1lBQ0Esa0JBQUEsQ0FBQTs7O1FBR0EsT0FBQSxjQUFBLFVBQUE7WUFDQSxJQUFBLFdBQUEsUUFBQSxLQUFBLFdBQUE7WUFDQSxPQUFBLFNBQUE7WUFDQSxPQUFBLFNBQUE7WUFDQSxPQUFBLFNBQUE7O1lBRUEsUUFBQSxJQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLE9BQUEsS0FBQSxtQkFBQTs7WUFFQSxNQUFBLElBQUEsZ0JBQUEsV0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxXQUFBOztvQkFFQSxPQUFBLEtBQUEsbUJBQUE7b0JBQ0EsT0FBQSxLQUFBLG1CQUFBOztvQkFFQSxTQUFBLFVBQUE7d0JBQ0EsT0FBQSxLQUFBLG1CQUFBLENBQUE7dUJBQ0E7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsU0FBQSxVQUFBO29CQUNBLE9BQUEsS0FBQSxtQkFBQSxDQUFBO21CQUNBOzs7OztRQUtBLE9BQUEsa0JBQUEsVUFBQTtZQUNBLElBQUEsZ0JBQUEsVUFBQSxLQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxZQUFBO2dCQUNBLE1BQUE7OztZQUdBLGNBQUEsT0FBQSxLQUFBLFVBQUEsV0FBQTtnQkFDQSxXQUFBLEtBQUEsWUFBQSxRQUFBLEtBQUE7O2dCQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7b0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7b0JBRUEsS0FBQSxXQUFBO29CQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtvQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOzs7Z0JBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7O2dCQUlBLE9BQUEsU0FBQSxXQUFBLGNBQUE7Z0JBQ0EsT0FBQSxTQUFBOztlQUVBLFlBQUE7Z0JBQ0EsS0FBQSxLQUFBLHlCQUFBLElBQUE7Ozs7O1FBS0EsT0FBQSxTQUFBLFVBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO2dCQUNBLGFBQUEsV0FBQTtnQkFDQSxXQUFBLGdCQUFBO2dCQUNBLFdBQUEsT0FBQTtnQkFDQSxXQUFBLGFBQUE7O2dCQUVBLE9BQUEsR0FBQSxrQkFBQSxJQUFBLENBQUEsUUFBQTs7Ozs7UUFLQSxPQUFBLHlCQUFBLFVBQUE7WUFDQSxNQUFBLElBQUEsaUNBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxPQUFBLE9BQUEsS0FBQSxXQUFBLGFBQUE7b0JBQ0EsT0FBQSxxQkFBQSxPQUFBOzs7OztRQUtBLFdBQUEsT0FBQSxRQUFBLFNBQUEsS0FBQTtZQUNBLElBQUEsT0FBQSxVQUFBLGFBQUE7O1lBRUEsT0FBQTs7O1FBR0EsT0FBQSxlQUFBLFVBQUE7WUFDQSxXQUFBLGFBQUE7OztRQUdBLE9BQUEsV0FBQSxTQUFBLE1BQUEsTUFBQSxLQUFBO1lBQ0EsV0FBQSxhQUFBOztZQUVBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLE9BQUE7O1lBRUEsSUFBQSxPQUFBLFdBQUEsZUFBQSxNQUFBLFNBQUEsR0FBQTtnQkFDQSxJQUFBLE9BQUEsTUFBQTtnQkFDQSxXQUFBLGVBQUEsS0FBQSxNQUFBLEtBQUEsSUFBQSxNQUFBLE1BQUE7Ozs7Ozs7QUM3SUEsQ0FBQSxVQUFBO0VBQ0E7O0VBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsbUVBQUEsU0FBQSxRQUFBLFlBQUEsa0JBQUE7SUFDQSxPQUFBLFlBQUE7SUFDQSxPQUFBLG1CQUFBO0lBQ0EsT0FBQSxXQUFBO0lBQ0EsT0FBQSxhQUFBOztJQUVBLElBQUEsbUJBQUEsU0FBQSxLQUFBLE1BQUE7UUFDQSxJQUFBO1FBQ0EsSUFBQTs7UUFFQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsV0FBQTs7O1FBR0EsSUFBQSxJQUFBLGNBQUEsY0FBQTtZQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO2FBQ0E7WUFDQSxJQUFBLE9BQUEsSUFBQSxjQUFBLE1BQUE7OztRQUdBLElBQUEsU0FBQSxJQUFBOztRQUVBLElBQUEsS0FBQSxLQUFBLFFBQUEsWUFBQSxDQUFBLEdBQUE7WUFDQSxPQUFBLE9BQUEsU0FBQSxPQUFBO2dCQUNBLE9BQUEsYUFBQTs7WUFFQTthQUNBO1lBQ0EsT0FBQSxhQUFBOzs7UUFHQSxPQUFBLFdBQUEsS0FBQTs7UUFFQSxPQUFBLFNBQUEsU0FBQSxLQUFBO1lBQ0EsT0FBQSxPQUFBLFNBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUEsSUFBQSxPQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBLE9BQUE7Ozs7UUFJQSxJQUFBLE1BQUE7WUFDQSxPQUFBLGNBQUE7Ozs7SUFJQSxFQUFBLFVBQUEsR0FBQSxnQ0FBQSxvQkFBQSxTQUFBLE9BQUE7UUFDQSxNQUFBO1FBQ0EsTUFBQTs7O0lBR0EsRUFBQSxVQUFBLEdBQUEsYUFBQSxvQkFBQSxTQUFBLE9BQUE7UUFDQSxNQUFBO1FBQ0EsTUFBQTs7UUFFQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsV0FBQTs7OztJQUlBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1FBQ0EsTUFBQTtRQUNBLE1BQUE7O1FBRUEsT0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLFdBQUE7Ozs7SUFJQSxFQUFBLFVBQUEsR0FBQSxVQUFBLGNBQUEsU0FBQSxFQUFBO1FBQ0EsaUJBQUEsR0FBQTs7SUFFQSxFQUFBLFVBQUEsR0FBQSxRQUFBLG9CQUFBLFNBQUEsRUFBQTtRQUNBLGlCQUFBLEdBQUE7OztJQUdBLE9BQUEsZUFBQSxVQUFBO1FBQ0Esa0JBQUEsTUFBQSxPQUFBOzs7SUFHQSxPQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBLFFBQUE7Ozs7O0FDbkZBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHNGQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFlBQUE7UUFDQSxXQUFBLFdBQUE7UUFDQSxXQUFBOztRQUVBLE9BQUEsT0FBQTtTQUNBLE9BQUE7U0FDQSxTQUFBOzs7UUFHQSxNQUFBLElBQUEsZ0JBQUEsYUFBQSxNQUFBLEtBQUEsU0FBQSxPQUFBO1NBQ0EsUUFBQSxJQUFBO1NBQ0EsUUFBQSxJQUFBO1NBQ0EsT0FBQSxPQUFBLE9BQUE7V0FDQSxTQUFBLE1BQUE7R0FDQSxRQUFBLElBQUE7R0FDQSxRQUFBLElBQUE7O0dBRUEsSUFBQSxNQUFBLFVBQUEsT0FBQTtJQUNBLFFBQUEsSUFBQTtJQUNBO1dBQ0EsUUFBQSxVQUFBO1NBQ0EsV0FBQSxXQUFBOzs7OztBQ3hCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx5R0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLFlBQUE7O0tBRUEsUUFBQSxJQUFBO0tBQ0EsV0FBQSxXQUFBO0tBQ0EsV0FBQTs7S0FFQSxTQUFBLFVBQUE7TUFDQSxXQUFBLFdBQUE7UUFDQTs7Ozs7QUNYQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxzR0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsV0FBQSxpQkFBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxPQUFBLE9BQUE7U0FDQSxVQUFBOzs7UUFHQSxJQUFBLFdBQUEsVUFBQSw4QkFBQTtZQUNBLFlBQUE7V0FDQTtZQUNBLFFBQUE7Z0JBQ0EsUUFBQTs7OztRQUlBLE9BQUEsaUJBQUEsU0FBQSxNQUFBO1NBQ0EsT0FBQSxLQUFBLFdBQUE7OztRQUdBLE9BQUEsbUJBQUEsVUFBQTs7WUFFQSxJQUFBLGVBQUE7Z0JBQ0EscUJBQUEsV0FBQSxLQUFBLFNBQUE7OztZQUdBLE9BQUEsZUFBQTs7WUFFQSxTQUFBLE9BQUE7Z0JBQ0EsWUFBQSxXQUFBLEtBQUEsU0FBQTtlQUNBLGNBQUEsU0FBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsT0FBQSxXQUFBLGFBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7Ozs7S0FNQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBmdW5kYXRvciA9IGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvcicsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdmdW5kYXRvci5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZmlsdGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnJvdXRlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29uZmlnJ1xuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycsIFsnbmdSZXNvdXJjZScsICduZ0Nvb2tpZXMnLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplcicsICdhbmd1bGFyTW9tZW50JywgJ2FuZ3VsYXItb3dsLWNhcm91c2VsJywgJ25nSW1nQ3JvcCcsICdhbmd1bGFyRmlsZVVwbG9hZCcsICdib290c3RyYXBMaWdodGJveCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycsIFsnb3JkaW5hbCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycsIFsnZGliYXJpLmFuZ3VsYXItZWxsaXBzaXMnLCAnbG9jYWx5dGljcy5kaXJlY3RpdmVzJywgJ3RleHRBbmd1bGFyJywgJ2Zsb3cnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdHMnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICduYXZpZ2F0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTmF2aWdhdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZsYXNoTm90aWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ2ZsYXNoLW5vdGljZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZsYXNoTm90aWNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRm9vdGVyQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ25vdGlmaWNhdGlvbnMnLCAnbm90aWZpY2F0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05vdGlmaWNhdGlvbnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBxdWlja1VwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdRdWlja1VwZGF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2xvZ2luJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5zaWdudXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdzaWdudXAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmZvcmdvdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZm9yZ290JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2ZvcmdvdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVjb3ZlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVjb3Zlcj90b2tlbiZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWNvdmVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aFJlY292ZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguY29uZmlybScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybT9jb2RlJmVtYWlsJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2NvbmZpcm0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ29uZmlybUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5yZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWdpc3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3RzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdHMvOmNvbnRlc3RJZC86Y29udGVzdE5hbWUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmV4cGVydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaW52ZXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9pbnZlc3QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSW52ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NyZWF0ZT9wcm9qZWN0SWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZGV0YWlscycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZGV0YWlscycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWRldGFpbHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVEZXRhaWxzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuc3VwZXJleHBlcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3N1cGVyLWV4cGVydCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLXN1cGVyLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZVNFQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1leHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5leHBlcnRzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0cycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUV4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmJ1ZGdldCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYnVkZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtYnVkZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQnVkZ2V0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuaW52ZXN0b3JzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9pbnZlc3RvcnMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1pbnZlc3RvcnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVJbnZlc3RvcnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnRyYW5zYWN0aW9uJywge1xuICAgICAgICAgICAgICAgIHVybDogJy90cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1RyYW5zYWN0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ncmFic2hhcmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2dyYWItYS1zaGFyZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnZlc3QnLCAnZ3JhYi1hLXNoYXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnR3JhYlNoYXJlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ub3RpZmljYXRpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5wYWdlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy86c2x1ZycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncGFnZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHVybFJvdXRlciwgJGZpbHRlciwgJGNvb2tpZXMsIEZkTm90aWZpY2F0aW9ucywgRmRTY3JvbGxlcikge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gbnVsbDtcbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IG51bGw7XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmNvbGxhcHNlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKCRyb290U2NvcGUuaXNOYXZTaG93biA+PSAwLjUpID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gMCA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAuNTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvaW5nIHRvIHJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgucmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVzZXJTZXJ2aWNlIGlzIGFuIGV4YW1wbGUgc2VydmljZSBmb3IgbWFuYWdpbmcgdXNlciBzdGF0ZVxuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuaW5pdGlhbExvY2F0aW9uU2V0dXAgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gUHJldmVudCAkdXJsUm91dGVyJ3MgZGVmYXVsdCBoYW5kbGVyIGZyb20gZmlyaW5nXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQgYW5kXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHVzZXIgb2JqZWN0IGFuZCB0YXNrc1xuICAgICAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS91c2VyP3Rva2VuPScgKyAkYXV0aC5nZXRUb2tlbigpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRmROb3RpZmljYXRpb25zLmluaXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLnJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ25hbFJvbGUgPSAkcm9vdFNjb3BlLnVzZXIucm9sZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlUm9sZSA9ICRyb290U2NvcGUudXNlci5yb2xlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZigkY29va2llcy5nZXQoJ2ZkX2FjdGl2ZV9yb2xlJykpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVSb2xlID0gJGNvb2tpZXMuZ2V0KCdmZF9hY3RpdmVfcm9sZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogYWN0aXZlUm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyb2xlcykgIT09ICd1bmRlZmluZWQnICYmIHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyb2xlLnJvbGUsIHJvbGUuaWQsICEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUob3JpZ25hbFJvbGUucm9sZSwgb3JpZ25hbFJvbGUuaWQsICEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgPT09ICd1bmRlZmluZWQnICYmIGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ3JlY292ZXInKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgLy8gICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9ZWxzZSBpZighJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgJiYgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG5lZWRMb2dpbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZih0b1N0YXRlLmRhdGEubmVlZExvZ2luKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luID0gdG9TdGF0ZS5kYXRhLm5lZWRMb2dpbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmVlZExvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIGlmIChmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xICYmIHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xICYmIGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmICh0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkLCBzdGF0ZSwgc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9IHJvbGU7XG4gICAgICAgICAgICAkY29va2llcy5wdXQoJ2ZkX2FjdGl2ZV9yb2xlJywgcm9sZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RhdGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gJHN0YXRlLmN1cnJlbnQubmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihzdGF0ZVBhcmFtcykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkc3RhdGUuY3VycmVudC5wYXJhbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyUm9sZVZpZXdzID0gW3tcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcCcsXG4gICAgICAgICAgICAgICAgdmlldzogJ3F1aWNrVXBkYXRlJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICBpbnZlc3RvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1pbnZlc3RvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygncXVpY2stdXBkYXRlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0JyxcbiAgICAgICAgICAgICAgICB2aWV3OiAnbWFpbkAnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdHMnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWp1cnknKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9ICcvYXBpL2NyZWF0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6IG1vZGVsID0gJy9hcGkvaW52ZXN0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltyb2xlXSA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcywge3JlbG9hZDogcmVsb2FkfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcywge3JlbG9hZDogcmVsb2FkfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBIYXMgVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5oYXNVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzUm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IHJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkTm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRxLCAkaW50ZXJ2YWwsICRodHRwLCAkc3RhdGUpIHtcbiAgICAgICAgdmFyIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zOiBbXSxcbiAgICAgICAgICAgIHVucmVhZDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdXNoTm90aWZpY2F0aW9uID0gZnVuY3Rpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG5vdGlmaWNhdGlvbnMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL25vdGlmaWNhdGlvbnMvJyArIHVzZXIuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnNJbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ZXN0Tm90aWZpY2F0aW9ucyA9IGFuZ3VsYXIuY29weShnbG9iYWxOb3RpZmljYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucyA9IGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5zbGljZSgwLCA1KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChub3RpZmljYXRpb25zSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnJlc29sdmUobGF0ZXN0Tm90aWZpY2F0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWROb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL25vdGlmaWNhdGlvbnMvJyArIG5vdGlmaWNhdGlvbklkICsgJy9yZWFkJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIFx0bm90aWZpY2F0aW9uLnJlYWQgPSAxO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWRBbGxOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9ub3RpZmljYXRpb25zL3VzZXIvJyArICRyb290U2NvcGUudXNlci5pZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucy51bnJlYWQgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG5vdGlmaWNhdGlvblRyaWdnZXI6IGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoKGNhdGVnb3J5KXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAnZG93bmxvYWQubmV3JzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmRvd25sb2FkcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5wYWlyZWQnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQucGFydG5lci5kZXRhaWxzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdwYXJ0bmVyLnN0dWR5X3BlcmlvZHMnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQuY291cnNlcy5wZXJpb2RzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICd1c2VyLmNyZWF0ZWQnOiAkc3RhdGUuZ28oVGFza3NTZXJ2aWNlLm5leHRUYXNrKCkudmlldyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBnZXROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlLCBwdXNoKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AodHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHB1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmeUVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0b2FzdGVyLnBvcCgnZXJyb3InLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmRTY3JvbGxlcicsIGZ1bmN0aW9uKCR3aW5kb3cpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sICc1MDAnLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1NlY3Rpb246IGZ1bmN0aW9uKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIFx0dmFyICRzZWN0aW9uID0gJChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJHNlY3Rpb24pO1xuICAgICAgICAgICAgXHRpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXHRcdHZhciB0b3AgPSAkc2VjdGlvbi5vZmZzZXQoKS50b3AgLSA3MDtcblxuICAgICAgICAgICAgXHRcdHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIFx0Ym9keS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICBcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKCRhdXRoUHJvdmlkZXIpe1xuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXG4gICAgICAgIC8vIHJvdXRlIHRoZSBKV1Qgc2hvdWxkIGJlIHJldHJpZXZlZCBmcm9tXG4gICAgICAgICRhdXRoUHJvdmlkZXIubG9naW5VcmwgPSAnL2FwaS9hdXRoZW50aWNhdGUnO1xuICAgICAgICAkYXV0aFByb3ZpZGVyLnRva2VuUHJlZml4ID0gJ2Z1bmRhdG9yJztcblxuICAgICAgICB2YXIgcmVkaXJlY3RVcmlQYXRoID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxpbmtlZGluKHtcbiAgICAgICAgXHRjbGllbnRJZDogJzc3emp4ZmJoMjkyOHJlJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvYXV0aGVudGljYXRlL2xpbmtlZGluJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydzdGF0ZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3NlbGYnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnMTA0MjI0NzcyNzA5MS1kbXFjNTVhZjd0bDU4aDJycXYzcHFucm1qamJiOTczMy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc2NvcGUnXSxcbiAgICAgICAgICAgIG9wdGlvbmFsVXJsUGFyYW1zOiBbJ2Rpc3BsYXknXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlUHJlZml4OiAnb3BlbmlkJyxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnOTAwNTMzMTIzMzk1OTIwJyxcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydkaXNwbGF5JywgJ3Njb3BlJ10sXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XG4gICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoZmxvd0ZhY3RvcnlQcm92aWRlcil7XG5cbiAgICAgICAgZmxvd0ZhY3RvcnlQcm92aWRlci5kZWZhdWx0cyA9IHtcbiAgICAgICAgXHR1cGxvYWRNZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHRhcmdldDogJy9hcGkvZmlsZXMvJyxcbiAgICAgICAgICAgIHBlcm1hbmVudEVycm9yczpbNDA0LCA1MDAsIDUwMV1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cbiAgICAuZGlyZWN0aXZlKCdmZENoYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjYW52YXMgaWQ9XCJmZENoYXJ0XCIgd2lkdGg9XCJ7e3dpZHRofX1cIiBoZWlnaHQ9XCJ7e2hlaWdodH19XCI+PC9jYW52YXM+JyxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS53aWR0aCA9ICRhdHRycy53aWR0aDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGVpZ2h0ID0gJGF0dHJzLmhlaWdodDtcblxuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykud2lkdGgoJGF0dHJzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5oZWlnaHQoJGF0dHJzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGllRGF0YUEgPSBbe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzAyNzUzZlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdWJsaWNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDk2LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjOTRjNDRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjOGNiYTQ3XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZ1bmRhdG9yXCJcbiAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lRGF0YUEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGxhbm5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDYwLCA1OSwgNjMsIDU5LCA1OCwgNjMsIDY0LCA2NSwgNjYsIDcwLCA3OV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVhbGl6ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCAyMiwgMTYsIDIxLCAxNywgMjAsIDI3LCAyNSwgMjMsIDMyLCA0MCwgNDVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYoJGF0dHJzLmRhdGEgPT09ICdBJyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKHBpZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHBpZURhdGFBKS5lYWNoKGZ1bmN0aW9uKGksIHRoZV9pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLnBpZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyt0aGVfaXRlbS5jb2xvcisnO1wiPjwvc3Bhbj4gJyt0aGVfaXRlbS52YWx1ZSsnJSAnK3RoZV9pdGVtLmxhYmVsKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuTGluZShsaW5lRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzAwNjgzNztcIj48L3NwYW4+IFJlYWxpemVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM5M0M2NTg7XCI+PC9zcGFuPiBQbGFubmVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cblx0LmRpcmVjdGl2ZSgnZmRMb2FkZXInLCBmdW5jdGlvbigpIHtcblx0ICByZXR1cm4ge1xuXHQgIFx0c2NvcGU6IHtcblx0ICBcdFx0dmlld0JveDogJ0AnXG5cdCAgXHR9LFxuXHQgICAgcmVzdHJpY3Q6ICdFJyxcblx0ICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImZkLWxvYWRlciBsYS1iYWxsLXB1bHNlXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyxcblx0ICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHQgICAgXHQkZWxlbWVudC5hZGRDbGFzcygkYXR0cnMuY2xhc3MpO1xuXHQgICAgfVxuXHQgIH07XG5cdH0pO1xufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICAgIFx0cmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWU7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ25nTWluJywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0cmVzdHJpY3Q6ICdBJyxcbiAgICBcdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcbiAgICBcdFx0XHRzY29wZS4kd2F0Y2goYXR0ci5uZ01pbiwgZnVuY3Rpb24gKCkge1xuICAgIFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgXHRcdFx0fSk7XG4gICAgXHRcdFx0dmFyIG1pblZhbGlkYXRvciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIFx0XHRcdFx0dmFyIG1pbiA9IHNjb3BlLiRldmFsKGF0dHIubmdNaW4pIHx8IDA7XG4gICAgXHRcdFx0XHRpZiAoIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlIDwgbWluKSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01pbicsIGZhbHNlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcbiAgICBcdFx0XHRcdH0gZWxzZSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01pbicsIHRydWUpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fTtcblxuICAgIFx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChtaW5WYWxpZGF0b3IpO1xuICAgIFx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChtaW5WYWxpZGF0b3IpO1xuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ25nTWF4JywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0cmVzdHJpY3Q6ICdBJyxcbiAgICBcdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcbiAgICBcdFx0XHRzY29wZS4kd2F0Y2goYXR0ci5uZ01heCwgZnVuY3Rpb24gKCkge1xuICAgIFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgXHRcdFx0fSk7XG4gICAgXHRcdFx0dmFyIG1heFZhbGlkYXRvciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIFx0XHRcdFx0dmFyIG1heCA9IHNjb3BlLiRldmFsKGF0dHIubmdNYXgpIHx8IEluZmluaXR5O1xuICAgIFx0XHRcdFx0aWYgKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA+IG1heCkge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCBmYWxzZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG4gICAgXHRcdFx0XHR9IGVsc2Uge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCB0cnVlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH07XG5cbiAgICBcdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdzdHJpcFRhZ3MnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAoU3RyaW5nLmZyb21DaGFyQ29kZSgxNjApLCBcImdcIik7XG5cdFx0XHRcdHRleHQgPSBTdHJpbmcodGV4dCkucmVwbGFjZShyZSwgXCIgXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXlxceDAwLVxceDdGXS9nLCBcIlwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvJm5ic3A7L2dpLCcgJyk7XG5cdFx0XHR9XG5cblx0ICAgICBcdHJldHVybiB0ZXh0ID8gU3RyaW5nKHRleHQpLnJlcGxhY2UoLzxbXj5dKz4vZ20sICcnKSA6ICcnO1xuXHQgICAgfTtcblx0ICB9XG5cdCk7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnKS5maWx0ZXIoJ2NsZWFuSHRtbCcsIGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZih0ZXh0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHR9XG5cblx0ICAgICBcdHJldHVybiB0ZXh0O1xuXHQgICAgfTtcblx0ICB9XG5cdCk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKXtcbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5ob21lJywge30pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAgICAgJHNjb3BlLnNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9zaWdudXAnLCB1c2VySW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWNjZXNzID09PSB0cnVlICYmIHR5cGVvZihyZXN1bHQuZGF0YS5tZXNzYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gcmVzdWx0LmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXSk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWxbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgICAgIHZhciBjcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YS50b2tlbik7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihhY3RpdmVTdGF0ZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLnNpZ251cCcpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocGF5bG9hZC5yb2xlLCBwYXlsb2FkLnJvbGVfaWQsIHRydWUsIGFjdGl2ZVN0YXRlLCBhY3RpdmVTdGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1c1RleHQgPT09ICdVbmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVGhlIGVtYWlsIG9yIHBhc3N3b3JkIHlvdSBlbnRlcmVkIGlzIGluY29ycmVjdC4nXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnIuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IExvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoQ29uZmlybUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLmNvZGUpICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YoJHN0YXRlUGFyYW1zLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY29uZmlybWF0aW9uX2NvZGU6ICRzdGF0ZVBhcmFtcy5jb2RlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvY29uZmlybScsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyb3IuZGF0YS5lcnJvcjtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhSZWNvdmVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHApe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICByZWNvdmVyeUVtYWlsOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkX3JlcGVhdDogJydcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mKCRzdGF0ZVBhcmFtcy50b2tlbikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVjb3ZlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBQYXNzd29yZFxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEucmVjb3ZlcnlFbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvZm9yZ290JywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9ICdBIHBhc3N3b3JkIHJlc2V0IGxpbmsgaGFzIGJlZW4gc2VudCB0byB5b3VyIGVtYWlsLic7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuZXJyb3IgPT09ICdJbnZhbGlkIFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVjb3ZlcmluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAvLyBSZXNldCBQYXNzd29yZFxuICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnBhc3N3b3JkLmxlbmd0aCA+PSA2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnBhc3N3b3JkID09PSAkc2NvcGUuZGF0YS5wYXNzd29yZF9yZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiAkc3RhdGVQYXJhbXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogJHN0YXRlUGFyYW1zLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAkc2NvcGUuZGF0YS5wYXNzd29yZF9yZXBlYXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9yZWNvdmVyJywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGF1dGgucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyBmcm9tIGhlcmUgLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZXNldHRpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdQYXNzd29yZHMgZG8gbm90IG1hdGNoISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdQYXNzd29yZHMgbmVlZCB0byBiZSBsb25nZXIgdGhhbiA2IGNoYXJhY3RlcnMhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFVUkkpO1xuICAgICAgICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgICAgIHZhciBieXRlU3RyaW5nO1xuICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuICAgICAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgICAgIHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgICAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZvY3VzT24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7IGZvY3VzT246ICc9JyB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZS5mb2N1c09uKTtcblxuICAgICAgICAgICAgICAgIGlmKHNjb3BlLmZvY3VzT24pe1xuICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgfTtcbiAgICB9KTtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICRyZXNvdXJjZSwgRmRTY3JvbGxlciwgJGZpbHRlciwgRmlsZVVwbG9hZGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmZvcm0gPSB7XG4gICAgICAgICAgICBjdXJyZW50U3RlcDogMSxcbiAgICAgICAgICAgIHRvdGFsU3RlcHM6IDNcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG90YWxTdGVwcyA9IHtcbiAgICAgICAgICAgIGNyZWF0b3I6IDMsXG4gICAgICAgICAgICBleHBlcnQ6IDQsXG4gICAgICAgICAgICBpbnZlc3RvcjogNFxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jaGFuZ2VGb3JtU3RlcCA9IGZ1bmN0aW9uKG5ld1N0ZXApe1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNvdW50cmllcyA9IFsnQWZnaGFuaXN0YW4nLCAnw4VsYW5kIElzbGFuZHMnLCAnQWxiYW5pYScsICdBbGdlcmlhJywgJ0FtZXJpY2FuIFNhbW9hJywgJ0FuZG9yckEnLCAnQW5nb2xhJywgJ0FuZ3VpbGxhJywgJ0FudGFyY3RpY2EnLCAnQW50aWd1YSBhbmQgQmFyYnVkYScsICdBcmdlbnRpbmEnLCAnQXJtZW5pYScsICdBcnViYScsICdBdXN0cmFsaWEnLCAnQXVzdHJpYScsICdBemVyYmFpamFuJywgJ0JhaGFtYXMnLCAnQmFocmFpbicsICdCYW5nbGFkZXNoJywgJ0JhcmJhZG9zJywgJ0JlbGFydXMnLCAnQmVsZ2l1bScsICdCZWxpemUnLCAnQmVuaW4nLCAnQmVybXVkYScsICdCaHV0YW4nLCAnQm9saXZpYScsICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJywgJ0JvdHN3YW5hJywgJ0JvdXZldCBJc2xhbmQnLCAnQnJhemlsJywgJ0JyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeScsICdCcnVuZWkgRGFydXNzYWxhbScsICdCdWxnYXJpYScsICdCdXJraW5hIEZhc28nLCAnQnVydW5kaScsICdDYW1ib2RpYScsICdDYW1lcm9vbicsICdDYW5hZGEnLCAnQ2FwZSBWZXJkZScsICdDYXltYW4gSXNsYW5kcycsICdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnLCAnQ2hhZCcsICdDaGlsZScsICdDaGluYScsICdDaHJpc3RtYXMgSXNsYW5kJywgJ0NvY29zIChLZWVsaW5nKSBJc2xhbmRzJywgJ0NvbG9tYmlhJywgJ0NvbW9yb3MnLCAnQ29uZ28nLCAnQ29uZ28sIFRoZSBEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZScsICdDb29rIElzbGFuZHMnLCAnQ29zdGEgUmljYScsICdDb3RlIERcXCdJdm9pcmUnLCAnQ3JvYXRpYScsICdDdWJhJywgJ0N5cHJ1cycsICdDemVjaCBSZXB1YmxpYycsICdEZW5tYXJrJywgJ0RqaWJvdXRpJywgJ0RvbWluaWNhJywgJ0RvbWluaWNhbiBSZXB1YmxpYycsICdFY3VhZG9yJywgJ0VneXB0JywgJ0VsIFNhbHZhZG9yJywgJ0VxdWF0b3JpYWwgR3VpbmVhJywgJ0VyaXRyZWEnLCAnRXN0b25pYScsICdFdGhpb3BpYScsICdGYWxrbGFuZCBJc2xhbmRzIChNYWx2aW5hcyknLCAnRmFyb2UgSXNsYW5kcycsICdGaWppJywgJ0ZpbmxhbmQnLCAnRnJhbmNlJywgJ0ZyZW5jaCBHdWlhbmEnLCAnRnJlbmNoIFBvbHluZXNpYScsICdGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXMnLCAnR2Fib24nLCAnR2FtYmlhJywgJ0dlb3JnaWEnLCAnR2VybWFueScsICdHaGFuYScsICdHaWJyYWx0YXInLCAnR3JlZWNlJywgJ0dyZWVubGFuZCcsICdHcmVuYWRhJywgJ0d1YWRlbG91cGUnLCAnR3VhbScsICdHdWF0ZW1hbGEnLCAnR3Vlcm5zZXknLCAnR3VpbmVhJywgJ0d1aW5lYS1CaXNzYXUnLCAnR3V5YW5hJywgJ0hhaXRpJywgJ0hlYXJkIElzbGFuZCBhbmQgTWNkb25hbGQgSXNsYW5kcycsICdIb2x5IFNlZSAoVmF0aWNhbiBDaXR5IFN0YXRlKScsICdIb25kdXJhcycsICdIb25nIEtvbmcnLCAnSHVuZ2FyeScsICdJY2VsYW5kJywgJ0luZGlhJywgJ0luZG9uZXNpYScsICdJcmFuLCBJc2xhbWljIFJlcHVibGljIE9mJywgJ0lyYXEnLCAnSXJlbGFuZCcsICdJc2xlIG9mIE1hbicsICdJc3JhZWwnLCAnSXRhbHknLCAnSmFtYWljYScsICdKYXBhbicsICdKZXJzZXknLCAnSm9yZGFuJywgJ0themFraHN0YW4nLCAnS2VueWEnLCAnS2lyaWJhdGknLCAnS29yZWEsIERlbW9jcmF0aWMgUGVvcGxlXFwnUyBSZXB1YmxpYyBvZicsICdLb3JlYSwgUmVwdWJsaWMgb2YnLCAnS3V3YWl0JywgJ0t5cmd5enN0YW4nLCAnTGFvIFBlb3BsZVxcJ1MgRGVtb2NyYXRpYyBSZXB1YmxpYycsICdMYXR2aWEnLCAnTGViYW5vbicsICdMZXNvdGhvJywgJ0xpYmVyaWEnLCAnTGlieWFuIEFyYWIgSmFtYWhpcml5YScsICdMaWVjaHRlbnN0ZWluJywgJ0xpdGh1YW5pYScsICdMdXhlbWJvdXJnJywgJ01hY2FvJywgJ01hY2Vkb25pYSwgVGhlIEZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZicsICdNYWRhZ2FzY2FyJywgJ01hbGF3aScsICdNYWxheXNpYScsICdNYWxkaXZlcycsICdNYWxpJywgJ01hbHRhJywgJ01hcnNoYWxsIElzbGFuZHMnLCAnTWFydGluaXF1ZScsICdNYXVyaXRhbmlhJywgJ01hdXJpdGl1cycsICdNYXlvdHRlJywgJ01leGljbycsICdNaWNyb25lc2lhLCBGZWRlcmF0ZWQgU3RhdGVzIG9mJywgJ01vbGRvdmEsIFJlcHVibGljIG9mJywgJ01vbmFjbycsICdNb25nb2xpYScsICdNb250c2VycmF0JywgJ01vcm9jY28nLCAnTW96YW1iaXF1ZScsICdNeWFubWFyJywgJ05hbWliaWEnLCAnTmF1cnUnLCAnTmVwYWwnLCAnTmV0aGVybGFuZHMnLCAnTmV0aGVybGFuZHMgQW50aWxsZXMnLCAnTmV3IENhbGVkb25pYScsICdOZXcgWmVhbGFuZCcsICdOaWNhcmFndWEnLCAnTmlnZXInLCAnTmlnZXJpYScsICdOaXVlJywgJ05vcmZvbGsgSXNsYW5kJywgJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsICdOb3J3YXknLCAnT21hbicsICdQYWtpc3RhbicsICdQYWxhdScsICdQYWxlc3RpbmlhbiBUZXJyaXRvcnksIE9jY3VwaWVkJywgJ1BhbmFtYScsICdQYXB1YSBOZXcgR3VpbmVhJywgJ1BhcmFndWF5JywgJ1BlcnUnLCAnUGhpbGlwcGluZXMnLCAnUGl0Y2Fpcm4nLCAnUG9sYW5kJywgJ1BvcnR1Z2FsJywgJ1B1ZXJ0byBSaWNvJywgJ1FhdGFyJywgJ1JldW5pb24nLCAnUm9tYW5pYScsICdSdXNzaWFuIEZlZGVyYXRpb24nLCAnUldBTkRBJywgJ1NhaW50IEhlbGVuYScsICdTYWludCBLaXR0cyBhbmQgTmV2aXMnLCAnU2FpbnQgTHVjaWEnLCAnU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvbicsICdTYWludCBWaW5jZW50IGFuZCB0aGUgR3JlbmFkaW5lcycsICdTYW1vYScsICdTYW4gTWFyaW5vJywgJ1NhbyBUb21lIGFuZCBQcmluY2lwZScsICdTYXVkaSBBcmFiaWEnLCAnU2VuZWdhbCcsICdTZXJiaWEgYW5kIE1vbnRlbmVncm8nLCAnU2V5Y2hlbGxlcycsICdTaWVycmEgTGVvbmUnLCAnU2luZ2Fwb3JlJywgJ1Nsb3Zha2lhJywgJ1Nsb3ZlbmlhJywgJ1NvbG9tb24gSXNsYW5kcycsICdTb21hbGlhJywgJ1NvdXRoIEFmcmljYScsICdTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kcycsICdTcGFpbicsICdTcmkgTGFua2EnLCAnU3VkYW4nLCAnU3VyaW5hbWUnLCAnU3ZhbGJhcmQgYW5kIEphbiBNYXllbicsICdTd2F6aWxhbmQnLCAnU3dlZGVuJywgJ1N3aXR6ZXJsYW5kJywgJ1N5cmlhbiBBcmFiIFJlcHVibGljJywgJ1RhaXdhbiwgUHJvdmluY2Ugb2YgQ2hpbmEnLCAnVGFqaWtpc3RhbicsICdUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mJywgJ1RoYWlsYW5kJywgJ1RpbW9yLUxlc3RlJywgJ1RvZ28nLCAnVG9rZWxhdScsICdUb25nYScsICdUcmluaWRhZCBhbmQgVG9iYWdvJywgJ1R1bmlzaWEnLCAnVHVya2V5JywgJ1R1cmttZW5pc3RhbicsICdUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHMnLCAnVHV2YWx1JywgJ1VnYW5kYScsICdVa3JhaW5lJywgJ1VuaXRlZCBBcmFiIEVtaXJhdGVzJywgJ1VuaXRlZCBLaW5nZG9tJywgJ1VuaXRlZCBTdGF0ZXMnLCAnVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzJywgJ1VydWd1YXknLCAnVXpiZWtpc3RhbicsICdWYW51YXR1JywgJ1ZlbmV6dWVsYScsICdWaWV0IE5hbScsICdWaXJnaW4gSXNsYW5kcywgQnJpdGlzaCcsICdWaXJnaW4gSXNsYW5kcywgVS5TLicsICdXYWxsaXMgYW5kIEZ1dHVuYScsICdXZXN0ZXJuIFNhaGFyYScsICdZZW1lbicsICdaYW1iaWEnLCAnWmltYmFid2UnXTtcblxuICAgICAgICAkc2NvcGUuY29udGFjdFRpbWVzID0gW1xuICAgICAgICAgICAge25hbWU6ICdXb3JraW5nIGhvdXJzICg5YW0gdG8gNiBwbSknLCB2YWx1ZTogJzktNid9LFxuICAgICAgICAgICAge25hbWU6ICdFdmVuaW5nIHRpbWUgKDZhbSB0byA5IHBtKScsIHZhbHVlOiAnNi05J31cbiAgICAgICAgXTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkUm9sZTogJ2NyZWF0b3InLFxuICAgICAgICAgICAgYWdlR2F0ZTogJ3llcycsXG4gICAgICAgICAgICBjb3VudHJ5T3JpZ2luOiAnJyxcbiAgICAgICAgICAgIGNvdW50cnlSZXNpZGVuY2U6ICcnLFxuICAgICAgICAgICAgY29udGFjdFRpbWU6ICcnLFxuICAgICAgICAgICAgZXhwZXJ0aXNlRm9ybToge1xuICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyb3BwZWRUaHVtYm5haWw6IG51bGwsXG4gICAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZVJvbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLnRvdGFsU3RlcHMgPSAkc2NvcGUudG90YWxTdGVwc1skc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4oKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykgKiAxMDAsIDk2KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzc0ludmVydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoKCgxIC0gKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykpICogMTAwKSwgNCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh1c2VyLnJlZ2lzdGVyZWQgPT0gMSkgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgaGFuZGxlRmlsZVNlbGVjdCA9IGZ1bmN0aW9uKGV2dCwgZHJvcCkge1xuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGltYWdlIHRvIGNyb3AnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50aHVtYm5haWwgPSBldnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2ZpbGVJbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJvcCcsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnVwbG9hZGVyID0gbmV3IEZpbGVVcGxvYWRlcih7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2ZpbGVzJyxcbiAgICAgICAgICAgIHJlbW92ZUFmdGVyVXBsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jb25maXJtSW1hZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGltYWdlID0gJHNjb3BlLmRhdGEuY3JvcHBlZFRodW1ibmFpbDtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbGUubmFtZSA9ICd0aHVtYm5haWxfJyArICRyb290U2NvcGUudXNlci5pZCArICcucG5nJztcblxuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe2F0dGFjaDogJ3RodW1ibmFpbCd9KTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe3VzZXJfaWQ6ICRyb290U2NvcGUudXNlci5pZH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gbnVsbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3BvbnNlLmZpbGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSAnWW91ciBwcm9maWxlIHBpY3R1cmUgd2FzIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZCEnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZUVycm9yID0gJ1Byb2ZpbGUgcGljdHVyZSBmYWlsZWQgdG8gdXBsb2FkLCBwbGVhc2UgdHJ5IGFnYWluISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLmFkZFRvUXVldWUoZGF0YVVSSXRvQmxvYihpbWFnZSkpO1xuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKCdhcGkvc2tpbGxzJykucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKXtcbiAgICAgICAgICAgIHZhciBsYXN0SW5wdXR0ZWRFeHBlcnRpc2UgPSB7c2VsZWN0ZWRFeHBlcnRpc2U6ICdudWxsJywgb3RoZXJFeHBlcnRpc2U6IHtzdGF0dXM6IDF9fTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLTFdO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGFzdElucHV0dGVkRXhwZXJ0aXNlKTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIDwgMyAmJiAobGFzdElucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsICYmIGxhc3RJbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNraWxsc0xpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZUNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGxzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJTa2lsbHM6IHtsaXN0OiBbXSwgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2VDYXRlZ29yeSwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5KGluZGV4KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oZSwgaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2Upe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBleHBlcnRpc2U7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdChpbmRleCk7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5pblNraWxscyA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICB2YXIgZm91bmRTa2lsbCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZm91bmRTa2lsbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kU2tpbGwubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdFNraWxsID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIGlmKCEkc2NvcGUuaW5Ta2lsbHMoaW5kZXgsIHNraWxsKSl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMucHVzaChza2lsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdFNraWxsID0gZnVuY3Rpb24oZSwgaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFuZ3VsYXIuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVNraWxscyA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzID0ge2xpc3Q6IFtdLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LzAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlLmlkICsgJy9za2lsbHMvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKVxuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5zdWJtaXREZXRhaWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5mbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICRzY29wZS5kYXRhLmxuYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSxcbiAgICAgICAgICAgICAgICBhZ2VfZ2F0ZTogJHNjb3BlLmRhdGEuYWdlR2F0ZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X29yaWdpbjogJHNjb3BlLmRhdGEuY291bnRyeU9yaWdpbixcbiAgICAgICAgICAgICAgICBjb3VudHJ5X3Jlc2lkZW5jZTogJHNjb3BlLmRhdGEuY291bnRyeVJlc2lkZW5jZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X251bWJlcjogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlcixcbiAgICAgICAgICAgICAgICBjb250YWN0X3RpbWU6ICRzY29wZS5kYXRhLmNvbnRhY3RUaW1lLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2goJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlc3RtZW50QnVkZ2V0ID09PSAnb3RoZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0T3RoZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXQgPSBpbnZlc3RtZW50QnVkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2dvYWwgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRHb2FsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X3JlYXNvbiA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudFJlYXNvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuY3JlYXRvciA9IHt9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4cGVydCc6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydCA9IHsgbGlzdDogW10gfTtcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCwgZnVuY3Rpb24oaW5wdXR0ZWRFeHBlcnRpc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsIHx8IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJ0Lmxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHM6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkU2tpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRhdGEpO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvdXNlcnMvJyArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubmFtZSA9ICRzY29wZS5kYXRhLmZuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubGFzdF9uYW1lID0gJHNjb3BlLmRhdGEubG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGU7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gW107XG4gICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzID0gW107XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJyAmJiB0eXBlb2YoJHJvb3RTY29wZS51c2VyLmNyZWF0b3IpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgb2djIGluICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0W29nY107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2djSW5kZXggPSAkc2NvcGUuY29udGVzdHMuaW5kZXhPZihjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZ2NJbmRleCA6ICcgKyBvZ2NJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdHMuc3BsaWNlKG9nY0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmICRyb290U2NvcGUudXNlci5qdWRnaW5nLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgamMgaW4gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5qdWRnaW5nW2pjXS5jb250ZXN0X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5mZEVudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RTaW5nbGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkZmlsdGVyLCAkdGltZW91dCwgRmRTY3JvbGxlciwgJGh0dHAsIExpZ2h0Ym94KSB7XG4gICAgICAgICRzY29wZS5jb250ZXN0SWQgPSAkc3RhdGVQYXJhbXMuY29udGVzdElkO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnRlc3RGdWxsRGVzY3JpcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnk6IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnlGb3JtOiB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXM6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRyeTogbnVsbCxcbiAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJycsXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJycsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeSA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyaWVzLzplbnRyeUlkJywge1xuICAgICAgICAgICAgZW50cnlJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29udGVzdGFudEVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvY3JlYXRvci86Y3JlYXRvcklkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAganVkZ2VFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2p1ZGdlLzpqdWRnZUlkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvOmVudHJ5SWQvbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeVJhdGluZyA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyeS1yYXRpbmdzLzplbnRyeVJhdGluZ0lkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5zaG93RnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5oaWRlRnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbnRlc3QuZ2V0KHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZFxuICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdKdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGNvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdDb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoanVkZ2VhYmxlLmxlbmd0aCA+IDAgJiYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2p1cnknICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2NyZWF0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuY29udGVzdElkID0gcmVzdWx0LmlkO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3Lm9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2p1cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogcmVzdWx0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYganVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdKdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nSnVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXN0aW5nLmxlbmd0aCA+IDAgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJHJvb3RTY29wZS5hY3RpdmVSb2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGVuZGluZ0NvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nQ29udGVzdGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2p1cnknOlxuICAgICAgICAgICAgICAgICAgICBFbnRyeS5qdWRnZUVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAganVkZ2VJZDogJHJvb3RTY29wZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRvciA9IHJvbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBFbnRyeS5jb250ZXN0YW50RW50cmllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5ID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuZW50cmllcy1saXN0Jyk7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZUlkID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknKSB7XG4gICAgICAgICAgICAgICAganVkZ2VJZCA9ICRyb290U2NvcGUudXNlci5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGp1ZGdlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZW50cmllcy8nICsgZW50cnkuaWQgKyAnL2p1ZGdlLycgKyBqdWRnZUlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcgPSByZXN1bHQuZGF0YS5yYXRpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIEVudHJ5LmdldCh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5SWQ6IGVudHJ5LmlkXG4gICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5vcGVuTGlnaHRib3ggPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgYWxsRmlsZXMgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmZpbGVzO1xuICAgICAgICAgICAgdmFyIGFsbEltYWdlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgICAgIGZvcih2YXIgYUYgaW4gYWxsRmlsZXMpe1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gYWxsRmlsZXNbYUZdO1xuICAgICAgICAgICAgICAgIGFsbEltYWdlcy5wdXNoKGZpbGUudXJsKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlLnVybCA9PT0gaXRlbS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gYUY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMaWdodGJveC5vcGVuTW9kYWwoYWxsSW1hZ2VzLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24gKGV2ZW50LCAkZmxvdywgZmxvd0ZpbGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZUFkZGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmbG93RmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZpbGUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIGZpbGVzIDogJyArIG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICAkZmlsZS5yZWZfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG5cbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IG1lc3NhZ2UuZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihtZXNzYWdlLmZpbGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmZpbGUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVSZW1vdmUgPSBmdW5jdGlvbihmaWxlLCAkZmxvdykge1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW1zID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMsIHtpZDogZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihmaWxlLnJlZl9pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmlsZXNJbmRleCA9ICRmbG93LmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgICAgICBpZiAoZmlsZXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZlIGZpbGVzIC4uLiAnICsgZmlsZXNJbmRleCk7XG4gICAgICAgICAgICAgICAgJGZsb3cuZmlsZXMuc3BsaWNlKGZpbGVzSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdy5maWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2hvd0FkZEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uID0gJHNjb3BlLmNvbnRlc3QuZW50cmllc1skc2NvcGUuY29udGVzdC5lbnRyaWVzLmxlbmd0aCAtIDFdLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hlZEZpbGVzID0ge307XG4gICAgICAgICAgICB2YXIgdGh1bWJuYWlsX2lkID0gbnVsbDtcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5mbG93LmZpbGVzLCBmdW5jdGlvbihmaWxlKXtcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzW2ZpbGUucmVmX2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhcHRpb24nOiBmaWxlLnJlZl9jYXB0aW9uXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVwYXJlIHRvIGFzc2lnbiB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5maWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSAhPT0gLTEgJiYgdGh1bWJuYWlsX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3aG9vcGllIGl0IG1hdGNoZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsX2lkID0gZmlsZS5yZWZfaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogJ2NyZWF0b3InfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IG5ldyBFbnRyeSgpO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNyZWF0b3JfaWQgPSByb2xlLmlkO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNvbnRlc3RfaWQgPSAkc2NvcGUuY29udGVzdC5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS50aHVtYm5haWxfaWQgPSB0aHVtYm5haWxfaWQ7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS5uYW1lID0gJHJvb3RTY29wZS51c2VyLm5hbWUgKyBcIidzIEVudHJ5XCI7XG4gICAgICAgICAgICAgICAgZW50cnkuZGVzY3JpcHRpb24gPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgZW50cnkuYXR0YWNoZWRfZmlsZXMgPSBhdHRhY2hlZEZpbGVzO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkudGh1bWJuYWlsX2lkKTtcblxuICAgICAgICAgICAgICAgIGVudHJ5LiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cnkgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSAgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0RW50cnkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnY3JlYXRvcicpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBFbnRyeS5zZW5kTWVzc2FnZSh7ZW50cnlJZDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZH0sIG1lc3NhZ2VSZXF1ZXN0LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZU1hcmtzID0gZnVuY3Rpb24oZW50cnlSYXRpbmdJZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB1cGRhdGVkUmF0aW5nID0ge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuZGVzaWduLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmNyZWF0aXZpdHksXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuaW5kdXN0cmlhbCxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLm1hcmtldCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuanVkZ2VfaWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmVudHJ5X2lkID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihlbnRyeVJhdGluZ0lkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBFbnRyeVJhdGluZy51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiBlbnRyeVJhdGluZ0lkXG4gICAgICAgICAgICAgICAgfSwgdXBkYXRlZFJhdGluZykuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIHNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2p1cnknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlSYXRpbmcgPSBuZXcgRW50cnlSYXRpbmcodXBkYXRlZFJhdGluZyk7XG4gICAgICAgICAgICAgICAgZW50cnlSYXRpbmcuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgY3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUp1ZGdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hY2NlcHRKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy9iZWNvbWVKdWRnZScsIHtjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdC5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUNvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gU2hvdyBOREFcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0Q29udGVzdGFudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzL2JlY29tZUNvbnRlc3RhbnQnLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQsICRmaWx0ZXIsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZSBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gQXZhaWxhYmxlIFZpZXdzIDogTGlzdCwgQ3JlYXRlXG4gICAgICAgICRzY29wZS52aWV3ID0gJ2xpc3QnO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Byb2plY3RMb2FkaW5nOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gbnVsbDtcblxuICAgICAgICB2YXIgUHJvamVjdCA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0cy86cHJvamVjdElkJywge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXF1aXJlZFJvbGUgPSAnY3JlYXRvcic7XG4gICAgICAgIHZhciBtYXRjaGluZ1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByZXF1aXJlZFJvbGV9LCB0cnVlKTtcblxuICAgICAgICBpZiAodHlwZW9mKG1hdGNoaW5nUm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiBtYXRjaGluZ1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ1JvbGUgPSBtYXRjaGluZ1JvbGVzWzBdO1xuXG4gICAgICAgICAgICBpZigkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09IHJlcXVpcmVkUm9sZSl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyZXF1aXJlZFJvbGUsIG1hdGNoaW5nUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcm9qZWN0SWQgPSBwYXJzZUludCgkc3RhdGVQYXJhbXMucHJvamVjdElkKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0SWQpID09PSAndW5kZWZpbmVkJyB8fCBpc05hTihwcm9qZWN0SWQpKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsbFByb2plY3RzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2UgaWYoYW5ndWxhci5pc051bWJlcihwcm9qZWN0SWQpICYmIGlzRmluaXRlKHByb2plY3RJZCkpe1xuICAgICAgICAgICAgICAgIFByb2plY3QuZ2V0KHtwcm9qZWN0SWQ6IHByb2plY3RJZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHJlc3VsdC5zdGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6ICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywge3Byb2plY3RJZDogcHJvamVjdElkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7cHJvamVjdElkOiBwcm9qZWN0SWR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuc3VwZXJleHBlcnQnLCB7cHJvamVjdElkOiBwcm9qZWN0SWR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJywge3Byb2plY3RJZDogcHJvamVjdElkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywge3Byb2plY3RJZDogcHJvamVjdElkfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWtlIHVwIHlvdXIgbWluZCB5b3UgcGVpY2Ugb2Ygc2hpdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmhvbWUnKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdvVG9Qcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7cHJvamVjdElkOiBwcm9qZWN0LmlkfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY3JlYXRlTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubmV3UHJvamVjdExvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCkuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmdvVG9Qcm9qZWN0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubmV3UHJvamVjdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NhdmluZyBwcm9ncmVzcyBub3cgIScpO1xuICAgICAgICAgICAgdmFyIHByb2plY3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnByb2plY3QpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHNjb3BlLnByb2plY3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIFByb2plY3QudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZFxuICAgICAgICAgICAgICAgIH0sIHByb2plY3QpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZURldGFpbHNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVEZXRhaWxzQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBmZWF0dXJlZEltYWdlOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZXRhaWxzID0ge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBnZW9ncmFwaHk6ICd3aGVyZXZlcidcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAocHJvamVjdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHByb2plY3Q7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdCBzdGlsbCBsb2FkaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uIChldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGUgYWRkZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZlYXR1cmVkSW1hZ2VTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZpbGUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIGZpbGVzIDogJyArIG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC50aHVtYm5haWxfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYXR0YWNoZWRGaWxlc1N1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmlsZSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgZmlsZXMgOiAnICsgbWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnByb2plY3QuYXR0YWNoZWRGaWxlcy5pbmRleE9mKG1lc3NhZ2UuZmlsZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdC5hdHRhY2hlZEZpbGVzLnB1c2gobWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXREcmFmdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcjcHJvamVjdFN0ZXBzJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVTRUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVTRUN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRodHRwLmdldCgnL2FwaS9zdXBlci1leHBlcnRzJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1cHMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAkc2NvcGUuc3VwZXJFeHBlcnRzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jaG9vc2VTdXBlckV4cGVydCA9IGZ1bmN0aW9uKHN1cGVyRXhwZXJ0KXtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN1cGVyX2V4cGVydF9pZCA9IHN1cGVyRXhwZXJ0LmlkO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRpc2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0aXNlQ3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0Q3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVCdWRnZXRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlQnVkZ2V0Q3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVJbnZlc3RvcnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlSW52ZXN0b3JzQ3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0V4cGVydEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeHBlcnQgU3RhcnRlZCcpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSG9tZSBWaWV3IFN0YXJ0ZWQnKTtcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5jb250ZXN0cyA9IFtdO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgIFx0Y29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgXHQkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuXHRcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBRdWVyeSBFeHBlcnRpc2VcblxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdHcmFiU2hhcmVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSW52ZXN0IFN0YXJ0ZWQnKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuTWF0aCA9IHdpbmRvdy5NYXRoO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcHJpbWFyeVNoYXJlTGlzdGluZzogbnVsbCxcbiAgICAgICAgICAgIHNob3dCaWROb3c6IGZhbHNlLFxuICAgICAgICAgICAgbXlCaWQ6IHtcbiAgICAgICAgICAgICAgICBiaWRfYW1vdW50OiAwLjcyLFxuICAgICAgICAgICAgICAgIG51bV9zaGFyZXM6IDEwLFxuICAgICAgICAgICAgICAgIHNhdmluZzogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBHZXQgYWxsIGxpc3RpbmdzXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQcmltYXJ5TGlzdGluZygpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvc2hhcmUtbGlzdGluZy8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUJpZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5teUJpZC5zYXZpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbXlCaWQgPSB7XG4gICAgICAgICAgICAgICAgJ3NoYXJlX2xpc3RpbmdfaWQnOiAkc2NvcGUuZGF0YS5wcmltYXJ5U2hhcmVMaXN0aW5nLmlkLFxuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEubXlCaWQuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnbnVtX3NoYXJlcyc6ICRzY29wZS5kYXRhLm15QmlkLm51bV9zaGFyZXNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvc2hhcmUtYmlkcycsIG15QmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0JpZE5vdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRm9vdGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05vdGlmaWNhdGlvbnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgRmROb3RpZmljYXRpb25zLmdldExhdGVzdE5vdGlmaWNhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdGbGFzaE5vdGljZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcgPSB7XG4gICAgICAgIFx0c2hvdzogZmFsc2UsXG4gICAgICAgIFx0Y29udGVzdElkOiAwLFxuICAgICAgICBcdG9uQ2xpY2s6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICBcdFx0JHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgnanVyeScsIDUsIHRydWUpO1xuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR1aWJNb2RhbCkge1xuXG4gICAgICAgICRzY29wZS50cmlnZ2VyTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXHRjb25zb2xlLmxvZygndHJpZ2dlciBsb2dpbiEnKTtcblxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgICAgICAgICB3aW5kb3dDbGFzczogJ2xvZ2luLW1vZGFsJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dvdCBjbG9zZSBmZWVkYmFjayEnKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXHRjb25zb2xlLmxvZygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSkge1xuICAgIFx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ2xvZ2dpbmcgaW4gbm93ICEnKTtcbiAgICBcdH1cblxuICAgIFx0JHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdhdXRoIGluIG5vdyAhJyk7XG4gICAgXHR9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05hdmlnYXRpb25DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkbG9nLCAkdGltZW91dCwgJGZpbHRlciwgJGh0dHAsICRyZXNvdXJjZSwgJHVpYk1vZGFsLCBGaWxlVXBsb2FkZXIpIHtcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKCdhcGkvc2tpbGxzJykucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvZmlsZXMnLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICB1c2VyU2V0dGluZ3NNb2RlOiAndmlldycsXG4gICAgICAgICAgICB1c2VyU2V0dGluZ3NTYXZlOiAtMVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zYXZlUHJvZmlsZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSBhbmd1bGFyLmNvcHkoJHJvb3RTY29wZS51c2VyKTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnY3JlYXRvciddO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydpbnZlc3RvciddO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydqdWRnaW5nJ107XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZpbmcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJEYXRhKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDA7XG5cbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS91c2Vycy8nICsgJHJvb3RTY29wZS51c2VyLmlkLCB1c2VyRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSA9PT0gJ1VwZGF0ZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc01vZGUgPSAndmlldyc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAtMTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hhbmdlIHVzZXIgdGh1bWJuYWlsXG4gICAgICAgICRzY29wZS5jaGFuZ2VUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9hcHAvYXBwL2hlYWRlci91c2VyLXRodW1ibmFpbC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlclRodW1ibmFpbEN0cmwnLFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uICh0aHVtYm5haWwpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudGh1bWJuYWlsID0gYW5ndWxhci5jb3B5KHRodW1ibmFpbCk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZpbGUubmFtZSA9ICd0aHVtYm5haWxfJyArICRyb290U2NvcGUudXNlci5pZCArICcucG5nJztcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe3VzZXJfaWQ6ICRyb290U2NvcGUudXNlci5pZH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIHVzZXIgdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgdXBsb2FkaW5nIHRoZSBmaWxlXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLmFkZFRvUXVldWUoZGF0YVVSSXRvQmxvYih0aHVtYm5haWwpKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkbG9nLmluZm8oJ01vZGFsIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2dvdXRcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWN0dWFsbHkgbG9nZ2luZyBvdXQhIC4uLicpO1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUG9wdWxhdGUgc2lkZSBuYXZpZ2F0aW9uXG4gICAgICAgICRzY29wZS5wb3B1bGF0ZVNpZGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS91c2Vycy9zaWRlTmF2aWdhdGlvbkRhdGEnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaWRlTmF2aWdhdGlvbkRhdGEgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUub3BlbkZ1bGxNZW51ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub0xpbmsgPSBmdW5jdGlvbihwYWdlLCBkYXRhLCByb2xlKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDA7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogcm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyb2xlLnJvbGUsIHJvbGUuaWQsIHRydWUsIHBhZ2UsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVXNlclRodW1ibmFpbEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKXtcbiAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICB9KTtcblxuICAgICRzY29wZS5zZXRUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH1cbiAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUGFnZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgRmRTY3JvbGxlcikge1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHNjb3BlLnBhZ2UgPSB7XG4gICAgICAgIFx0dGl0bGU6ICcnLFxuICAgICAgICBcdGNvbnRlbnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3BhZ2VzLycgKyAkc3RhdGVQYXJhbXMuc2x1ZykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdGNvbnNvbGUubG9nKCdTdWNjZXNzJyk7XG4gICAgICAgIFx0Y29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgXHQkc2NvcGUucGFnZSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG5cdFx0XHRjb25zb2xlLmxvZygnRXJyb3InKTtcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblxuXHRcdFx0aWYgKGVycm9yLnN0YXR1cyA9PSAnNDA0Jykge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnbG9hZCA0MDQnKVxuXHRcdFx0fTtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVHJhbnNhY3Rpb25DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKCdUcmFuc2FjdGlvbkN0cmwnKTtcbiAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgXHRGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICBcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgXHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICBcdH0sIDIwMDApO1xuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUXVpY2tVcGRhdGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCBGZE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3F1aWNrdXBkYXRlJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgIFx0ZWRpdE1vZGU6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEludmVzdG9yID0gJHJlc291cmNlKCcvYXBpL2ludmVzdG9ycy86aW52ZXN0b3JJZCcsIHtcbiAgICAgICAgICAgIGludmVzdG9ySWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVkaXRJbnZlc3RtZW50ID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICBcdCRzY29wZS5kYXRhLmVkaXRNb2RlID0gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubW9kaWZ5SW52ZXN0bWVudCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBpbnZlc3RvckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2ludmVzdG1lbnRfYnVkZ2V0JzogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQoZmFsc2UpO1xuXG4gICAgICAgICAgICBJbnZlc3Rvci51cGRhdGUoe1xuICAgICAgICAgICAgICAgIGludmVzdG9ySWQ6ICRyb290U2NvcGUudXNlci5pbnZlc3Rvci5pZFxuICAgICAgICAgICAgfSwgaW52ZXN0b3JEYXRhKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
