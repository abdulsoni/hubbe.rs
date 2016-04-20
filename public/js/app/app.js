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
    angular.module('fundator.directives', ['dibari.angular-ellipsis', 'localytics.directives', 'textAngular', 'flow', 'angular-ladda', 'ngFlag']);
    angular.module('fundator.config', []);

})();
(function() {
    "use strict";

    angular.module('fundator.routes').config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

        // Remove the # for the non html5 browsers
        // $locationProvider.html5Mode(true)

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
            // .state('app.home', {
            //     url: '/',
            //     data: {
            //         bodyClass: 'homepage',
            //         needLogin: false
            //     },
            //     views: {
            //         'main@': {
            //             templateUrl: getView('home'),
            //             controller: 'HomeCtrl'
            //         }
            //     }
            // })
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
            .state('app.expertise', {
                url: '/expertise/:expertiseId',
                data: {
                    needLogin: true
                },
                views: {
                    'main@': {
                        templateUrl: getView('expert', 'expertise'),
                        controller: 'ExpertiseCtrl'
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
        $rootScope.activeState = {name: 'app.contest'};
        $rootScope.activeStateParams = {};

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
                            $rootScope.initialRoleAssignment = true;
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
            console.log('Is Authenticated');
            console.log($auth.isAuthenticated());
            console.log($rootScope.initialRoleAssignment);

            if ($auth.isAuthenticated()) {
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


    angular.module('fundator.directives')

    .directive('fdMessenger', ["$rootScope", "$resource", "$timeout", function($rootScope, $resource, $timeout) {
        return {
            template: '<div class="chatbox" ng-if="threadId">' +
                '<div class="chatRow" ng-repeat="message in messages">' +
                    '<div class="chat-userSendbox" ng-class="{\'chat-send\': user.id == message.user.id, \'chat-comein\': user.id != message.user.id}">' +
                        '<div class="chat-content">{{message.body}}</div>' +
                    '</div>' +
                    '<div class="caht-label" ng-class=\'{"text-right": user.id == message.user.id}\'>' +
                        '{{message.user.name}} <span>{{message.created_at | amDateFormat:"MMM Do YYYY"}}:</span>' +
                    '</div>' +
                '</div>' +
                '<p class="no-have no-margin" ng-if="messages.length === 0">There are currently no messages.</p>' +
            '</div>' +
            '<form class="chatsendform" ng-if="threadId">' +
                '<div class="input-group">' +
                    '<input type="text" class="form-control" placeholder="Enter your message here ..." ng-model="data.messageToSend" fd-enter="sendMessage()">' +
                    '<span class="input-group-addon sendbtn" ng-click="sendMessage()"><span class="glyphicon">Send</span></span>' +
                '</div>' +
            '</form>',
            restrict: 'E',
            scope: {
                threadId: '='
            },
            link: function($scope, $element, $attrs) {
                $scope.data = {};
                $scope.messages = [];

                $scope.user = $rootScope.user;

                var Message = $resource('/api/messages/:threadId', {
                    threadId: '@id'
                }, {
                    get: {
                        method: 'GET',
                        isArray: true
                    }
                });

                $scope.$watch('threadId', function(threadId){
                    if (typeof(threadId) === 'undefined' || threadId === null) return;

                    Message.get({threadId: $scope.threadId}).$promise.then(function(result){
                        console.log('retriving the thread : ' + $scope.threadId);
                        $scope.messages = result;
                        $('.chatbox').animate({scrollTop: 10000});
                    });
                });

                $scope.sendMessage = function(){
                    var message = new Message();
                    message.thread_id = $scope.threadId;
                    message.message = $scope.data.messageToSend;

                    message.$save().then(function(result){
                        $scope.messages.push(result);
                        $scope.data.messageToSend = '';

                        $timeout(function(){
                            $('.chatbox').animate({scrollTop: 10000});
                        }, 100);
                    });
                }
            }
        };
    }]);

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
                    console.log('minValidator');
    				var min = scope.$eval(attr.ngMin) || 0;
                    console.log(min);
                    console.log(value);
                    console.log(!isEmpty(value) && value < min);
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
                    console.log('maxValidator');
    				var max = scope.$eval(attr.ngMax) || Infinity;
                    console.log(max);
                    console.log(value);
                    console.log(!isEmpty(value) && value > max);
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

    angular.module('fundator.directives').directive('fdProfileInput', ["$compile", "$timeout", function($compile, $timeout) {

        return {
            restrict: 'E',
            scope: {
                form: '@',
                type: '@',
                required: '@',
                label: '@',
                ngModel: '=',
                placeholder: '@',
                facebookValue: '=',
                linkedinValue: '='
            },

            controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                $scope.formError = '';
                $scope.conditions = [];

                $scope.isPristine = true;
                $scope.validation = null;

                $scope.validationMessage = '';

                $scope.replaceValue = function(value){
                	$scope.ngModel = value;
                }
            }],
            link: function($scope, $element, $attrs) {
                var fields = {
                    'text': '<input type="{{type}}" class="form-control" placeholder="{{placeholder}}" ng-model="ngModel">',
                    'textarea': '<textarea class="textarea form-control" placeholder="{{placeholder}}" ng-model="ngModel" rows="6"></textarea>',
                    // 'email': '<input name="{{field}}" type="{{type}}" class="form-control input-lg" ng-disabled="isDisabled" ng-model="ngModel" ng-blur="update()"> ',
                    // 'dropdown': '<div class="select-wraper full"><span class="icon icon-arrow-bottom"></span><select class="form-control input-lg" ng-options="value.value as value.name for value in values" ng-model="ngModel" ng-change="update()"></select></div>',
                }

                var field = fields[$scope.type];

                var socialAlternative = '';

                if ($scope.type !== 'textarea') {
                	socialAlternative = '<div class="social-alternative">' +
                	'<span class="icon icon-facebook" uib-tooltip="{{facebookValue}}" ng-class="{\'checked\': (ngModel === facebookValue) && ngModel !== \'\'}" ng-disabled="!facebookValue" ng-click="replaceValue(facebookValue)"></span>' +
                	'<span class="icon icon-linkedin2" uib-tooltip="{{linkedinValue}}" ng-class="{\'checked\': (ngModel === linkedinValue) && ngModel !== \'\'}" ng-disabled="!linkedinValue" ng-click="replaceValue(linkedinValue)"></span>' +
                	'</div>';
                }

                var template =
	                '<div>' +
	                '<label>{{label}}:</label>' +
	                '<div class="form-group">' +
	                	field +
	                	socialAlternative +
	                '</div></div>';

                $element.html($compile(template)($scope));
            }
        };
    }])

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

    angular.module('fundator.config').config(["laddaProvider", function(laddaProvider) {

        laddaProvider.setOption({
            style: 'expand-right',
            spinnerSize: 35,
            spinnerColor: '#ffffff'
        });

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


    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "$resource", "FdScroller", "$filter", "FileUploader", "Countries", "CountryCodes", function($rootScope, $scope, $state, $auth, $timeout, $http, $resource, FdScroller, $filter, FileUploader, Countries, CountryCodes) {

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

        $scope.countries = Countries();
        $scope.countryCodes = CountryCodes();

        console.log('$scope.countries');
        console.log($scope.countries);
        console.log('$scope.countryCodes');
        console.log($scope.countryCodes);

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

        addNewInputtedExpertise();

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
                contact_number_country_code: $scope.data.contactNumberCountryCode.code,
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

    angular.module('fundator.services').value('Countries', function() {
        return [
            { "name": "Afghanistan", "code": "AF" },
            { "name": "Åland Islands", "code": "AX" },
            { "name": "Albania", "code": "AL" },
            { "name": "Algeria", "code": "DZ" },
            { "name": "American Samoa", "code": "AS" },
            { "name": "AndorrA", "code": "AD" },
            { "name": "Angola", "code": "AO" },
            { "name": "Anguilla", "code": "AI" },
            { "name": "Antarctica", "code": "AQ" },
            { "name": "Antigua and Barbuda", "code": "AG" },
            { "name": "Argentina", "code": "AR" },
            { "name": "Armenia", "code": "AM" },
            { "name": "Aruba", "code": "AW" },
            { "name": "Australia", "code": "AU" },
            { "name": "Austria", "code": "AT" },
            { "name": "Azerbaijan", "code": "AZ" },
            { "name": "Bahamas", "code": "BS" },
            { "name": "Bahrain", "code": "BH" },
            { "name": "Bangladesh", "code": "BD" },
            { "name": "Barbados", "code": "BB" },
            { "name": "Belarus", "code": "BY" },
            { "name": "Belgium", "code": "BE" },
            { "name": "Belize", "code": "BZ" },
            { "name": "Benin", "code": "BJ" },
            { "name": "Bermuda", "code": "BM" },
            { "name": "Bhutan", "code": "BT" },
            { "name": "Bolivia", "code": "BO" },
            { "name": "Bosnia and Herzegovina", "code": "BA" },
            { "name": "Botswana", "code": "BW" },
            { "name": "Bouvet Island", "code": "BV" },
            { "name": "Brazil", "code": "BR" },
            { "name": "Brunei Darussalam", "code": "BN" },
            { "name": "Bulgaria", "code": "BG" },
            { "name": "Burkina Faso", "code": "BF" },
            { "name": "Burundi", "code": "BI" },
            { "name": "Cambodia", "code": "KH" },
            { "name": "Cameroon", "code": "CM" },
            { "name": "Canada", "code": "CA" },
            { "name": "Cape Verde", "code": "CV" },
            { "name": "Cayman Islands", "code": "KY" },
            { "name": "Central African Republic", "code": "CF" },
            { "name": "Chad", "code": "TD" },
            { "name": "Chile", "code": "CL" },
            { "name": "China", "code": "CN" },
            { "name": "Christmas Island", "code": "CX" },
            { "name": "Cocos (Keeling) Islands", "code": "CC" },
            { "name": "Colombia", "code": "CO" },
            { "name": "Comoros", "code": "KM" },
            { "name": "Congo", "code": "CG" },
            { "name": "Congo, The Democratic Republic of the", "code": "CD" },
            { "name": "Cook Islands", "code": "CK" },
            { "name": "Costa Rica", "code": "CR" },
            { "name": "Cote D\"Ivoire", "code": "CI" },
            { "name": "Croatia", "code": "HR" },
            { "name": "Cuba", "code": "CU" },
            { "name": "Cyprus", "code": "CY" },
            { "name": "Czech Republic", "code": "CZ" },
            { "name": "Denmark", "code": "DK" },
            { "name": "Djibouti", "code": "DJ" },
            { "name": "Dominica", "code": "DM" },
            { "name": "Dominican Republic", "code": "DO" },
            { "name": "Ecuador", "code": "EC" },
            { "name": "Egypt", "code": "EG" },
            { "name": "El Salvador", "code": "SV" },
            { "name": "Equatorial Guinea", "code": "GQ" },
            { "name": "Eritrea", "code": "ER" },
            { "name": "Estonia", "code": "EE" },
            { "name": "Ethiopia", "code": "ET" },
            { "name": "Falkland Islands (Malvinas)", "code": "FK" },
            { "name": "Faroe Islands", "code": "FO" },
            { "name": "Fiji", "code": "FJ" },
            { "name": "Finland", "code": "FI" },
            { "name": "France", "code": "FR" },
            { "name": "French Guiana", "code": "GF" },
            { "name": "French Polynesia", "code": "PF" },
            { "name": "French Southern Territories", "code": "TF" },
            { "name": "Gabon", "code": "GA" },
            { "name": "Gambia", "code": "GM" },
            { "name": "Georgia", "code": "GE" },
            { "name": "Germany", "code": "DE" },
            { "name": "Ghana", "code": "GH" },
            { "name": "Gibraltar", "code": "GI" },
            { "name": "Greece", "code": "GR" },
            { "name": "Greenland", "code": "GL" },
            { "name": "Grenada", "code": "GD" },
            { "name": "Guadeloupe", "code": "GP" },
            { "name": "Guam", "code": "GU" },
            { "name": "Guatemala", "code": "GT" },
            { "name": "Guernsey", "code": "GG" },
            { "name": "Guinea", "code": "GN" },
            { "name": "Guinea-Bissau", "code": "GW" },
            { "name": "Guyana", "code": "GY" },
            { "name": "Haiti", "code": "HT" },
            { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
            { "name": "Holy See (Vatican City State)", "code": "VA" },
            { "name": "Honduras", "code": "HN" },
            { "name": "Hong Kong", "code": "HK" },
            { "name": "Hungary", "code": "HU" },
            { "name": "Iceland", "code": "IS" },
            { "name": "India", "code": "IN" },
            { "name": "Indonesia", "code": "ID" },
            { "name": "Iran, Islamic Republic Of", "code": "IR" },
            { "name": "Iraq", "code": "IQ" },
            { "name": "Ireland", "code": "IE" },
            { "name": "Isle of Man", "code": "IM" },
            { "name": "Israel", "code": "IL" },
            { "name": "Italy", "code": "IT" },
            { "name": "Jamaica", "code": "JM" },
            { "name": "Japan", "code": "JP" },
            { "name": "Jersey", "code": "JE" },
            { "name": "Jordan", "code": "JO" },
            { "name": "Kazakhstan", "code": "KZ" },
            { "name": "Kenya", "code": "KE" },
            { "name": "Kiribati", "code": "KI" },
            { "name": "Korea, Democratic People\"S Republic of", "code": "KP" },
            { "name": "Korea, Republic of", "code": "KR" },
            { "name": "Kuwait", "code": "KW" },
            { "name": "Kyrgyzstan", "code": "KG" },
            { "name": "Lao People\"S Democratic Republic", "code": "LA" },
            { "name": "Latvia", "code": "LV" },
            { "name": "Lebanon", "code": "LB" },
            { "name": "Lesotho", "code": "LS" },
            { "name": "Liberia", "code": "LR" },
            { "name": "Libyan Arab Jamahiriya", "code": "LY" },
            { "name": "Liechtenstein", "code": "LI" },
            { "name": "Lithuania", "code": "LT" },
            { "name": "Luxembourg", "code": "LU" },
            { "name": "Macao", "code": "MO" },
            { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
            { "name": "Madagascar", "code": "MG" },
            { "name": "Malawi", "code": "MW" },
            { "name": "Malaysia", "code": "MY" },
            { "name": "Maldives", "code": "MV" },
            { "name": "Mali", "code": "ML" },
            { "name": "Malta", "code": "MT" },
            { "name": "Marshall Islands", "code": "MH" },
            { "name": "Martinique", "code": "MQ" },
            { "name": "Mauritania", "code": "MR" },
            { "name": "Mauritius", "code": "MU" },
            { "name": "Mayotte", "code": "YT" },
            { "name": "Mexico", "code": "MX" },
            { "name": "Micronesia, Federated States of", "code": "FM" },
            { "name": "Moldova, Republic of", "code": "MD" },
            { "name": "Monaco", "code": "MC" },
            { "name": "Mongolia", "code": "MN" },
            { "name": "Montserrat", "code": "MS" },
            { "name": "Morocco", "code": "MA" },
            { "name": "Mozambique", "code": "MZ" },
            { "name": "Myanmar", "code": "MM" },
            { "name": "Namibia", "code": "NA" },
            { "name": "Nauru", "code": "NR" },
            { "name": "Nepal", "code": "NP" },
            { "name": "Netherlands", "code": "NL" },
            { "name": "Netherlands Antilles", "code": "AN" },
            { "name": "New Caledonia", "code": "NC" },
            { "name": "New Zealand", "code": "NZ" },
            { "name": "Nicaragua", "code": "NI" },
            { "name": "Niger", "code": "NE" },
            { "name": "Nigeria", "code": "NG" },
            { "name": "Niue", "code": "NU" },
            { "name": "Norfolk Island", "code": "NF" },
            { "name": "Northern Mariana Islands", "code": "MP" },
            { "name": "Norway", "code": "NO" },
            { "name": "Oman", "code": "OM" },
            { "name": "Pakistan", "code": "PK" },
            { "name": "Palau", "code": "PW" },
            { "name": "Palestinian Territory, Occupied", "code": "PS" },
            { "name": "Panama", "code": "PA" },
            { "name": "Papua New Guinea", "code": "PG" },
            { "name": "Paraguay", "code": "PY" },
            { "name": "Peru", "code": "PE" },
            { "name": "Philippines", "code": "PH" },
            { "name": "Pitcairn", "code": "PN" },
            { "name": "Poland", "code": "PL" },
            { "name": "Portugal", "code": "PT" },
            { "name": "Puerto Rico", "code": "PR" },
            { "name": "Qatar", "code": "QA" },
            { "name": "Reunion", "code": "RE" },
            { "name": "Romania", "code": "RO" },
            { "name": "Russian Federation", "code": "RU" },
            { "name": "RWANDA", "code": "RW" },
            { "name": "Saint Helena", "code": "SH" },
            { "name": "Saint Kitts and Nevis", "code": "KN" },
            { "name": "Saint Lucia", "code": "LC" },
            { "name": "Saint Pierre and Miquelon", "code": "PM" },
            { "name": "Saint Vincent and the Grenadines", "code": "VC" },
            { "name": "Samoa", "code": "WS" },
            { "name": "San Marino", "code": "SM" },
            { "name": "Sao Tome and Principe", "code": "ST" },
            { "name": "Saudi Arabia", "code": "SA" },
            { "name": "Senegal", "code": "SN" },
            { "name": "Serbia and Montenegro", "code": "CS" },
            { "name": "Seychelles", "code": "SC" },
            { "name": "Sierra Leone", "code": "SL" },
            { "name": "Singapore", "code": "SG" },
            { "name": "Slovakia", "code": "SK" },
            { "name": "Slovenia", "code": "SI" },
            { "name": "Solomon Islands", "code": "SB" },
            { "name": "Somalia", "code": "SO" },
            { "name": "South Africa", "code": "ZA" },
            { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
            { "name": "Spain", "code": "ES" },
            { "name": "Sri Lanka", "code": "LK" },
            { "name": "Sudan", "code": "SD" },
            { "name": "Suriname", "code": "SR" },
            { "name": "Svalbard and Jan Mayen", "code": "SJ" },
            { "name": "Swaziland", "code": "SZ" },
            { "name": "Sweden", "code": "SE" },
            { "name": "Switzerland", "code": "CH" },
            { "name": "Syrian Arab Republic", "code": "SY" },
            { "name": "Taiwan, Province of China", "code": "TW" },
            { "name": "Tajikistan", "code": "TJ" },
            { "name": "Tanzania, United Republic of", "code": "TZ" },
            { "name": "Thailand", "code": "TH" },
            { "name": "Timor-Leste", "code": "TL" },
            { "name": "Togo", "code": "TG" },
            { "name": "Tokelau", "code": "TK" },
            { "name": "Tonga", "code": "TO" },
            { "name": "Trinidad and Tobago", "code": "TT" },
            { "name": "Tunisia", "code": "TN" },
            { "name": "Turkey", "code": "TR" },
            { "name": "Turkmenistan", "code": "TM" },
            { "name": "Turks and Caicos Islands", "code": "TC" },
            { "name": "Tuvalu", "code": "TV" },
            { "name": "Uganda", "code": "UG" },
            { "name": "Ukraine", "code": "UA" },
            { "name": "United Arab Emirates", "code": "AE" },
            { "name": "United Kingdom", "code": "GB" },
            { "name": "United States", "code": "US" },
            { "name": "United States Minor Outlying Islands", "code": "UM" },
            { "name": "Uruguay", "code": "UY" },
            { "name": "Uzbekistan", "code": "UZ" },
            { "name": "Vanuatu", "code": "VU" },
            { "name": "Venezuela", "code": "VE" },
            { "name": "Viet Nam", "code": "VN" },
            { "name": "Virgin Islands, British", "code": "VG" },
            { "name": "Virgin Islands, U.S.", "code": "VI" },
            { "name": "Wallis and Futuna", "code": "WF" },
            { "name": "Western Sahara", "code": "EH" },
            { "name": "Yemen", "code": "YE" },
            { "name": "Zambia", "code": "ZM" },
            { "name": "Zimbabwe", "code": "ZW" }
        ];
    });
})();

(function() {
    "use strict";

    angular.module('fundator.services').value('CountryCodes', function() {
        return [
            { code: '1', country: 'US' },
            { code: '1', country: 'CA' },
            { code: '7', country: 'RU' },
            { code: '7', country: 'KZ' },
            { code: '20', country: 'EG' },
            { code: '27', country: 'ZA' },
            { code: '30', country: 'GR' },
            { code: '31', country: 'NL' },
            { code: '32', country: 'BE' },
            { code: '33', country: 'FR' },
            { code: '34', country: 'ES' },
            { code: '36', country: 'HU' },
            { code: '39', country: 'IT' },
            { code: '40', country: 'RO' },
            { code: '41', country: 'CH' },
            { code: '43', country: 'AT' },
            { code: '44', country: 'GB' },
            { code: '45', country: 'DK' },
            { code: '46', country: 'SE' },
            { code: '47', country: 'NO' },
            { code: '47', country: 'SJ' },
            { code: '48', country: 'PL' },
            { code: '49', country: 'DE' },
            { code: '51', country: 'PE' },
            { code: '52', country: 'MX' },
            { code: '53', country: 'CU' },
            { code: '54', country: 'AR' },
            { code: '55', country: 'BR' },
            { code: '56', country: 'CL' },
            { code: '57', country: 'CO' },
            { code: '58', country: 'VE' },
            { code: '60', country: 'MY' },
            { code: '61', country: 'AU' },
            { code: '61', country: 'CC' },
            { code: '61', country: 'CX' },
            { code: '62', country: 'ID' },
            { code: '63', country: 'PH' },
            { code: '64', country: 'NZ' },
            { code: '64', country: 'PN' },
            { code: '65', country: 'SG' },
            { code: '66', country: 'TH' },
            { code: '81', country: 'JP' },
            { code: '82', country: 'KR' },
            { code: '84', country: 'VN' },
            { code: '86', country: 'CN' },
            { code: '90', country: 'TR' },
            { code: '91', country: 'IN' },
            { code: '92', country: 'PK' },
            { code: '93', country: 'AF' },
            { code: '94', country: 'LK' },
            { code: '95', country: 'MM' },
            { code: '98', country: 'IR' },
            { code: '211', country: 'SS' },
            { code: '212', country: 'MA' },
            { code: '212', country: 'EH' },
            { code: '213', country: 'DZ' },
            { code: '216', country: 'TN' },
            { code: '218', country: 'LY' },
            { code: '220', country: 'GM' },
            { code: '221', country: 'SN' },
            { code: '222', country: 'MR' },
            { code: '223', country: 'ML' },
            { code: '224', country: 'GN' },
            { code: '225', country: 'CI' },
            { code: '226', country: 'BF' },
            { code: '227', country: 'NE' },
            { code: '228', country: 'TG' },
            { code: '229', country: 'BJ' },
            { code: '230', country: 'MU' },
            { code: '231', country: 'LR' },
            { code: '232', country: 'SL' },
            { code: '233', country: 'GH' },
            { code: '234', country: 'NG' },
            { code: '235', country: 'TD' },
            { code: '236', country: 'CF' },
            { code: '237', country: 'CM' },
            { code: '238', country: 'CV' },
            { code: '239', country: 'ST' },
            { code: '240', country: 'GQ' },
            { code: '241', country: 'GA' },
            { code: '242', country: 'CG' },
            { code: '243', country: 'CD' },
            { code: '244', country: 'AO' },
            { code: '245', country: 'GW' },
            { code: '246', country: 'IO' },
            { code: '248', country: 'SC' },
            { code: '249', country: 'SD' },
            { code: '250', country: 'RW' },
            { code: '251', country: 'ET' },
            { code: '252', country: 'SO' },
            { code: '253', country: 'DJ' },
            { code: '254', country: 'KE' },
            { code: '255', country: 'TZ' },
            { code: '256', country: 'UG' },
            { code: '257', country: 'BI' },
            { code: '258', country: 'MZ' },
            { code: '260', country: 'ZM' },
            { code: '261', country: 'MG' },
            { code: '262', country: 'YT' },
            { code: '262', country: 'RE' },
            { code: '263', country: 'ZW' },
            { code: '264', country: 'NA' },
            { code: '265', country: 'MW' },
            { code: '266', country: 'LS' },
            { code: '267', country: 'BW' },
            { code: '268', country: 'SZ' },
            { code: '269', country: 'KM' },
            { code: '290', country: 'SH' },
            { code: '291', country: 'ER' },
            { code: '297', country: 'AW' },
            { code: '298', country: 'FO' },
            { code: '299', country: 'GL' },
            { code: '350', country: 'GI' },
            { code: '351', country: 'PT' },
            { code: '352', country: 'LU' },
            { code: '353', country: 'IE' },
            { code: '354', country: 'IS' },
            { code: '355', country: 'AL' },
            { code: '356', country: 'MT' },
            { code: '357', country: 'CY' },
            { code: '358', country: 'FI' },
            { code: '359', country: 'BG' },
            { code: '370', country: 'LT' },
            { code: '371', country: 'LV' },
            { code: '372', country: 'EE' },
            { code: '373', country: 'MD' },
            { code: '374', country: 'AM' },
            { code: '375', country: 'BY' },
            { code: '376', country: 'AD' },
            { code: '377', country: 'MC' },
            { code: '378', country: 'SM' },
            { code: '379', country: 'VA' },
            { code: '380', country: 'UA' },
            { code: '381', country: 'RS' },
            { code: '382', country: 'ME' },
            { code: '383', country: 'XK' },
            { code: '385', country: 'HR' },
            { code: '386', country: 'SI' },
            { code: '387', country: 'BA' },
            { code: '389', country: 'MK' },
            { code: '420', country: 'CZ' },
            { code: '421', country: 'SK' },
            { code: '423', country: 'LI' },
            { code: '500', country: 'FK' },
            { code: '501', country: 'BZ' },
            { code: '502', country: 'GT' },
            { code: '503', country: 'SV' },
            { code: '504', country: 'HN' },
            { code: '505', country: 'NI' },
            { code: '506', country: 'CR' },
            { code: '507', country: 'PA' },
            { code: '508', country: 'PM' },
            { code: '509', country: 'HT' },
            { code: '590', country: 'BL' },
            { code: '590', country: 'MF' },
            { code: '591', country: 'BO' },
            { code: '592', country: 'GY' },
            { code: '593', country: 'EC' },
            { code: '595', country: 'PY' },
            { code: '597', country: 'SR' },
            { code: '598', country: 'UY' },
            { code: '599', country: 'CW' },
            { code: '599', country: 'AN' },
            { code: '670', country: 'TL' },
            { code: '672', country: 'AQ' },
            { code: '673', country: 'BN' },
            { code: '674', country: 'NR' },
            { code: '675', country: 'PG' },
            { code: '676', country: 'TO' },
            { code: '677', country: 'SB' },
            { code: '678', country: 'VU' },
            { code: '679', country: 'FJ' },
            { code: '680', country: 'PW' },
            { code: '681', country: 'WF' },
            { code: '682', country: 'CK' },
            { code: '683', country: 'NU' },
            { code: '685', country: 'WS' },
            { code: '686', country: 'KI' },
            { code: '687', country: 'NC' },
            { code: '688', country: 'TV' },
            { code: '689', country: 'PF' },
            { code: '690', country: 'TK' },
            { code: '691', country: 'FM' },
            { code: '692', country: 'MH' },
            { code: '850', country: 'KP' },
            { code: '852', country: 'HK' },
            { code: '853', country: 'MO' },
            { code: '855', country: 'KH' },
            { code: '856', country: 'LA' },
            { code: '880', country: 'BD' },
            { code: '886', country: 'TW' },
            { code: '960', country: 'MV' },
            { code: '961', country: 'LB' },
            { code: '962', country: 'JO' },
            { code: '963', country: 'SY' },
            { code: '964', country: 'IQ' },
            { code: '965', country: 'KW' },
            { code: '966', country: 'SA' },
            { code: '967', country: 'YE' },
            { code: '968', country: 'OM' },
            { code: '970', country: 'PS' },
            { code: '971', country: 'AE' },
            { code: '972', country: 'IL' },
            { code: '973', country: 'BH' },
            { code: '974', country: 'QA' },
            { code: '975', country: 'BT' },
            { code: '976', country: 'MN' },
            { code: '977', country: 'NP' },
            { code: '992', country: 'TJ' },
            { code: '993', country: 'TM' },
            { code: '994', country: 'AZ' },
            { code: '995', country: 'GE' },
            { code: '996', country: 'KG' },
            { code: '998', country: 'UZ' },
            { code: '1-242', country: 'BS' },
            { code: '1-246', country: 'BB' },
            { code: '1-264', country: 'AI' },
            { code: '1-268', country: 'AG' },
            { code: '1-284', country: 'VG' },
            { code: '1-340', country: 'VI' },
            { code: '1-345', country: 'KY' },
            { code: '1-441', country: 'BM' },
            { code: '1-473', country: 'GD' },
            { code: '1-649', country: 'TC' },
            { code: '1-664', country: 'MS' },
            { code: '1-670', country: 'MP' },
            { code: '1-671', country: 'GU' },
            { code: '1-684', country: 'AS' },
            { code: '1-721', country: 'SX' },
            { code: '1-758', country: 'LC' },
            { code: '1-767', country: 'DM' },
            { code: '1-784', country: 'VC' },
            { code: '1-939', country: 'PR' },
            { code: '1-849', country: 'DO' },
            { code: '1-868', country: 'TT' },
            { code: '1-869', country: 'KN' },
            { code: '1-876', country: 'JM' },
            { code: '44-1481', country: 'GG' },
            { code: '44-1534', country: 'JE' },
            { code: '44-1624', country: 'IM' }
        ];
    });
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

    angular.module('fundator.controllers').controller('CreateCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", "$filter", "FdScroller", function($rootScope, $scope, $state, $stateParams, $resource, $timeout, $filter, FdScroller) {
        console.log('Create Started');
        // $rootScope.$broadcast('startLoading');

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
        var matchingRoles = $filter('filter')($rootScope.user.user_roles, { role: requiredRole }, true);

        if (typeof(matchingRoles) !== 'undefined' && matchingRoles.length > 0) {
            var matchingRole = matchingRoles[0];

            if ($rootScope.activeRole !== requiredRole) {
                $rootScope.switchUserRole(requiredRole, matchingRole.id, true);
            }

            var projectId = parseInt($stateParams.projectId);

            if (typeof(projectId) === 'undefined' || isNaN(projectId)) {
                Project.query().$promise.then(function(result) {
                    $scope.allProjects = result;
                }).finally(function() {
                    $rootScope.$broadcast('stopLoading');
                });
            } else if (angular.isNumber(projectId) && isFinite(projectId)) {
                Project.get({ projectId: projectId }).$promise.then(function(result) {
                    $scope.project = result;

                    switch (result.state) {
                        case 0:
                            $state.go('app.create.details', { projectId: projectId });
                            break;
                        case 1:
                            $state.go('app.create.details', { projectId: projectId });
                            break;
                        case 2:
                            $state.go('app.create.superexpert', { projectId: projectId });
                            break;
                        case 3:
                            $state.go('app.create.expertise', { projectId: projectId });
                            break;
                        case 4:
                            $state.go('app.create.experts', { projectId: projectId });
                            break;
                        default:
                            $state.go('app.create.details', { projectId: projectId });
                    }
                }).finally(function() {
                    $rootScope.$broadcast('stopLoading');
                });
            } else {
                console.log('Make up your mind you peice of shit');
            }
        } else {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
                $state.go('app.home');
            }, 2000);
        }

        $scope.goToProject = function(project) {
            $state.go('app.create.details', { projectId: project.id });
        }

        $scope.createNewProject = function() {
            $scope.data.newProjectLoading = true;

            var newProject = new Project().$save().then(function(result) {
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

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $rootScope.$broadcast('stopLoading');
                $scope.details = project;
            } else {
                console.log('project still loading');
            }
        });

        $scope.$on('flow::fileAdded', function(event, $flow, flowFile) {
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

        $http.get('/api/super-experts').then(function(result) {
            $scope.superExperts = result.data;
        });

        $scope.chooseSuperExpert = function(superExpert) {
            $scope.project.super_expert_id = superExpert.id;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $state.go('app.create.expertise');
            }, 300);
        }
    }]);

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', ["$rootScope", "$scope", "$state", "$resource", "$http", "$timeout", "FdScroller", function($rootScope, $scope, $state, $resource, $http, $timeout, FdScroller) {
        console.log('CreateExpertiseCtrl Started');

        $scope.inputtedExpertiseList = [];
        $scope.expertiseList = [];

        var ProjectExpertise = $resource('/api/projects/:projectId/expertise', {
            projectId: '@id'
        });


        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.$broadcast('stopLoading');
            });
        }

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            $scope.fetchExpertise();
        });

        $scope.saveExpertise = function(expertise){
            var projectExpertiseData = {
                'expertise_id': expertise.selectedExpertise.id,
                'task': expertise.mainTask,
                'budget': expertise.budget,
                'lead_time': expertise.leadTime,
                'start_date': expertise.startDate
            };

            $http.post('/api/projects/' + $scope.project.id + '/expertise', projectExpertiseData)
            .then(function(result) {
                console.log(result.data);
                $scope.expertiseList.push(result.data);
            });

            // $scope.expertiseList.push({
            //     expertiseCategory: expertise.selectedExpertiseCategory.name,
            //     expertiseSubCategory: expertise.selectedExpertiseSubCategory.name,
            //     expertise: expertise.selectedExpertise.name,
            //     mainTask: expertise.mainTask,
            //     budget: expertise.budget,
            //     leadTime: expertise.leadTime,
            //     startDate: expertise.startDate,
            // });

            $scope.inputtedExpertiseList = [];
        }

        $scope.saveExpertiseSelection = function(){
            $scope.project.state = 4;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $state.go('app.create.expertise');
            }, 300);

        }

        $scope.addNewInputtedExpertise = function() {
            var lastInputtedExpertise = { selectedExpertise: 'null', otherExpertise: { status: 1 } };

            if ($scope.inputtedExpertiseList.length > 0) {
                $scope.inputtedExpertiseList[$scope.inputtedExpertiseList.length - 1];
            }

            if ($scope.inputtedExpertiseList.length < 3 && (lastInputtedExpertise.selectedExpertise !== null && lastInputtedExpertise.otherExpertise.status !== 0)) {
                $scope.inputtedExpertiseList.push({
                    expertiseCategoryList: [],
                    expertiseSubCategoryList: [],
                    expertiseList: [],
                    selectedExpertiseCategory: null,
                    otherExpertiseCategory: { name: '', status: 0 },
                    selectedExpertiseSubCategory: null,
                    otherExpertiseSubCategory: { name: '', status: 0 },
                    selectedExpertise: null,
                    otherExpertise: { name: '', status: 0 },
                    mainTask: '',
                    budget: '',
                    leadTime: '',
                    startDate: '',
                    step: 1,
                    loading: false
                })
            };

            $scope.fetchExpertiseCategory($scope.inputtedExpertiseList.length - 1);
        }

        $scope.selectExpertiseCategory = function(index, expertiseCategory, level) {
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = expertiseCategory;
                $scope.inputtedExpertiseList[index].step = 2;
                $scope.fetchExpertiseSubCategory(index);
            } else {
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = expertiseCategory;
                $scope.inputtedExpertiseList[index].step = 3;
                $scope.fetchExpertiseList(index);
            }
        }

        $scope.deselectExpertiseCategory = function(e, index, level) {
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            } else {
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            }
            e.stopPropagation();
        }

        $scope.saveOtherExpertiseCategory = function(index, level) {
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = null;
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };

                $scope.inputtedExpertiseList[index].otherExpertiseCategory.status = 1;
                $scope.inputtedExpertiseList[index].step = 2;
            } else {
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };

                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory.status = 1;
                $scope.inputtedExpertiseList[index].step = 3;
            }
        }

        $scope.removeOtherExpertiseCategory = function(index, level) {
            if (level === 0) {
                $scope.inputtedExpertiseList[index].otherExpertiseCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            } else {
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            }
        }

        $scope.selectExpertise = function(index, expertise) {
            $scope.inputtedExpertiseList[index].selectedExpertise = expertise;
            $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            $scope.inputtedExpertiseList[index].step = 4;
        }

        $scope.deselectExpertise = function(e, index) {
            $scope.inputtedExpertiseList[index].selectedExpertise = null;
            e.stopPropagation(index);
        }

        $scope.saveOtherExpertise = function(index) {
            $scope.inputtedExpertiseList[index].selectedExpertise = null;

            $scope.inputtedExpertiseList[index].otherExpertise.status = 1;
            $scope.inputtedExpertiseList[index].step = 4;
        }

        $scope.removeOtherExpertise = function(index) {
            $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
        }

        $scope.fetchExpertiseCategory = function(index) {
            $scope.inputtedExpertiseList[index].expertiseCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise-category/0').then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseSubCategory = function(index) {
            $scope.expertiseSubCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise-category/' + $scope.inputtedExpertiseList[index].selectedExpertiseCategory.id).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseSubCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseList = function(index) {
            $scope.inputtedExpertiseList[index].expertiseList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get('/api/expertise/category/' + $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory.id).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            }, 2000);
        }
    }]);

    angular.module('fundator.controllers').controller('CreateExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertCtrl Started');

        $scope.data = {};

        var ProjectExpertise = $resource('/api/projects/:projectId/expertise', {
            projectId: '@id'
        });

        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.$broadcast('stopLoading');
            });
        }

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            $scope.fetchExpertise();
        });

        $scope.shortlistExpert = function(expertise, bid){
            if (typeof(expertise.shortlist) === 'undefined') {
                expertise.shortlist = [];
            }

            expertise.shortlist.push(bid);
        }

        $scope.discussExpert = function(expertise, bid){
            $scope.data.selectedBid = bid
        }

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

    angular.module('fundator.controllers').controller('NavigationCtrl', ["$rootScope", "$scope", "$state", "$auth", "$log", "$timeout", "$filter", "$http", "$resource", "$uibModal", "FileUploader", "CountryCodes", function($rootScope, $scope, $state, $auth, $log, $timeout, $filter, $http, $resource, $uibModal, FileUploader, CountryCodes) {

        $scope.allSkills = $resource('api/skills').query();

        $scope.uploader = new FileUploader({
            url: '/api/files',
            removeAfterUpload: true
        });

        $scope.data = {
            userSettingsMode: 'view',
            userSettingsSave: -1,
            socialConnect: {
                facebook: {},
                linkedin: {}
            },
            twoFA: {}
        };

        if (typeof($rootScope.user) !== 'undefined') {
            $scope.data.twoFA = {
                countryCode: angular.copy($rootScope.user.contact_number_country_code),
                number: angular.copy($rootScope.user.contact_number),
                verificationCode: ''
            }
        }

        $scope.countryCodes = CountryCodes();

        $scope.startTwoFAVerify = function() {
            $scope.data.twoFA.loading = true;

            var verificationData = {
                via: 'sms',
                country_code: parseInt($scope.data.twoFA.countryCode),
                phone_number: parseInt($scope.data.twoFA.number),
                locale: 'en'
            };

            $http.post('/api/verification/start', verificationData).then(function(result){
                console.log(result.data);

                if (result.data.success) {
                    $scope.data.twoFA.loading = false;
                    $scope.data.twoFA.codeSent = true;
                }
            });
        }

        $scope.completeTwoFAVerfiy = function() {
            $scope.data.twoFA.loading = true;

            var verificationData = {
                country_code: parseInt($scope.data.twoFA.countryCode),
                phone_number: parseInt($scope.data.twoFA.number),
                verification_code: parseInt($scope.data.twoFA.verificationCode)
            };

            $http.post('/api/verification/check', verificationData).then(function(result){
                console.log('verification data');
                console.log(result.data);

                if (result.data.success) {
                    $scope.data.twoFA.codeSent = false;
                    $scope.data.twoFA.verify = false;
                    $rootScope.user.phone_verified = 1;
                }
            });
        }

        $scope.socialConnect = function(provider) {
            $scope.data.socialConnect[provider].loading = true;

            $auth.authenticate(provider).then(function(response) {
                console.log('Logged in ');
                console.log(response);
                $rootScope.user[provider] = true;
                $scope.data.socialConnect[provider].loading = false;
            }).catch(function(response) {
                console.log('Not Logged in ');
                console.log(response);
                $scope.data.socialConnect[provider].loading = false;
            });
        }

        $scope.socialUnlink = function(provider) {
            var method = null;

            $scope.data.socialConnect[provider].loading = true;

            switch(provider){
                case 'facebook': method = 'unlinkFacebook';
                break;
                case 'linkedin': method = 'unlinkLinkedin';
                break;
            }

            $http.post('/api/authenticate/' + method, {}).then(function(result){
                console.log(result);
                $rootScope.user[provider] = null;
            }).finally(function(){
                $scope.data.socialConnect[provider].loading = false;
            });
        }

        $scope.saveProfile = function(){
            var userData = angular.copy($rootScope.user);
            delete userData['creator'];
            delete userData['investor'];
            delete userData['judging'];

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

    angular.module('fundator.controllers').controller('ExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", "$filter", "FdScroller", function($rootScope, $scope, $state, $resource, $filter, FdScroller) {
        console.log('Expert Started');

        var AvailableExpertise = $resource('/api/expertise/available');

        var MatchingExpertise = $resource('/api/expertise/matching', {}, {
        	query: {
        		method: 'GET',
        		isArray: false
        	}
        });

        var requiredRole = 'expert';
        var matchingRoles = $filter('filter')($rootScope.user.user_roles, { role: requiredRole }, true);

        var access = false;

        if (typeof(matchingRoles) !== 'undefined' && matchingRoles.length > 0) {
            var matchingRole = matchingRoles[0];

            if ($rootScope.activeRole !== requiredRole) {
                $rootScope.switchUserRole(requiredRole, matchingRole.id, true);
            } else {
                access = true;
            }
        } else {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
                $state.go('app.home');
            }, 2000);
        }

        if (access) {
        	$rootScope.$broadcast('stopLoading');

        	AvailableExpertise.query().$promise.then(function(result){
        		console.log('All available expertise');
        		console.log(result);
        	});

        	MatchingExpertise.query().$promise.then(function(result){
        		console.log('All matching expertise');
        		console.log(result);

        		$scope.matchingExpertise = result.expertise;
        	});
        }
    }]);

    angular.module('fundator.controllers').controller('ExpertiseCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", function($rootScope, $scope, $state, $stateParams, $resource, $http) {
        console.log('Expertise Started');
        console.log($stateParams.expertiseId);

        $scope.data = {};

        var ProjectExpertise = $resource('/api/project-expertise/:expertiseId', {
        	expertiseId: '@id'
        });

        ProjectExpertise.get({expertiseId: $stateParams.expertiseId}).$promise.then(function(result){
        	$scope.expertise = result;
        	$rootScope.$broadcast('stopLoading');
        });

        $scope.submitBid = function(){
            var bidData = {
                'bid_amount': $scope.data.bid_amount,
                'description': $scope.data.bid_description
            };

            $http.post('/api/project-expertise/' + $stateParams.expertiseId + '/bid', bidData).then(function(result){
                $scope.expertise.bid = result;
            });
        }
    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$resource", "FdScroller", function($rootScope, $scope, $state, $stateParams, $http, $resource, FdScroller) {
        console.log('Home View Started');
        FdScroller.toTop();

        $state.go('app.contests');

   //      $scope.contests = [];
   //      $rootScope.$broadcast('startLoading');

   //      var Contest = $resource('/api/contests/:contestId', {
   //      	contestId: '@id'
   //      });

   //      Contest.query().$promise.then(function(result) {
   //      	$scope.contests = result;
   //      	$rootScope.$broadcast('stopLoading');
   //      }).finally(function() {
			// $rootScope.$broadcast('stopLoading');
   //      });

   //      // Query Expertise

   //      $http.get('/api/expertise/').then(function(result){
   //          $scope.expertises = result.data;
   //      }, 2000);

   //      $scope.investors = [
   //          {name: 'Alain Amoretti', country: 'France', image: '1.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eveniet deserunt ad pariatur praesentium, incidunt molestiae beatae quam quasi reiciendis mollitia accusantium voluptate quaerat sequi officia a facere repellat adipisci.'},
   //          {name: 'Charles d\'anterroches', country: 'France', image: '2.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dignissimos nemo, sequi doloribus accusantium, obcaecati natus iure quam esse ex labore neque consequatur voluptate in, nihil ea, cum recusandae ut.'},
   //          {name: 'Christophe Brissiaud', country: 'China', image: '3.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo enim officia optio dolorum harum, soluta culpa unde veniam nobis eos, ducimus quod praesentium veritatis atque non nostrum ipsam. Nostrum, et!'},
   //          {name: 'Jean-Bernard Antoine', country: 'China', image: '4.jpeg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia recusandae aliquid quos aperiam molestiae quibusdam qui eos iure saepe optio vitae fugit unde nam, atque excepturi deserunt est, repellat alias.'},
   //          {name: 'Xavier Paulin', country: 'Taiwan', image: '5.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'},
   //          {name: 'Cindy Chung', country: 'Hong Kong', image: '6.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'}
   //      ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwic2VydmljZXMvbm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvc2Nyb2xsZXIuc2VydmljZS5qcyIsImRpcmVjdGl2ZXMvY2hhcnRzLmpzIiwiZGlyZWN0aXZlcy9sb2FkZXIuZGlyZWN0aXZlLmpzIiwiZGlyZWN0aXZlcy9tZXNzZW5nZXIuanMiLCJkaXJlY3RpdmVzL21pbk1heC5qcyIsImRpcmVjdGl2ZXMvbWlzYy5qcyIsImRpcmVjdGl2ZXMvcHJvZmlsZUZpZWxkLmpzIiwiZmlsdGVycy9zdHJpcEh0bWwuanMiLCJjb25maWcvYXV0aC5qcyIsImNvbmZpZy9mbG93LmpzIiwiY29uZmlnL2xhZGRhLmpzIiwiYXBwL2F1dGgvYXV0aC5qcyIsImFwcC9hdXRoL3JlZ2lzdGVyLmpzIiwiYXBwL2NvbnRlc3QvY29udGVzdC5qcyIsInZhbHVlcy9jb3VudHJpZXMuanMiLCJ2YWx1ZXMvY291bnRyeUNvZGVzLmpzIiwiYXBwL2Zvb3Rlci9mb290ZXIuanMiLCJhcHAvY3JlYXRlL2NyZWF0ZS5qcyIsImFwcC9oZWFkZXIvZmxhc2gtbm90aWNlLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuanMiLCJhcHAvaGVhZGVyL25hdmlnYXRpb24uanMiLCJhcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmpzIiwiYXBwL2V4cGVydC9leHBlcnQuanMiLCJhcHAvaG9tZS9ob21lLmpzIiwiYXBwL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9ucy5qcyIsImFwcC9wYWdlL3BhZ2UuanMiLCJhcHAvcXVpY2stdXBkYXRlL3F1aWNrLXVwZGF0ZS5qcyIsImFwcC90cmFuc2FjdGlvbi90cmFuc2FjdGlvbi5qcyIsImFwcC9pbnZlc3QvZ3JhYlNoYXJlLmpzIiwiYXBwL2ludmVzdC9pbnZlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUEscUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBLENBQUEsMkJBQUEseUJBQUEsZUFBQSxRQUFBLGlCQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBOzs7QUNsQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHFFQUFBLFNBQUEsZ0JBQUEsb0JBQUEsbUJBQUE7Ozs7O1FBS0EsSUFBQSxVQUFBLFNBQUEsVUFBQSxlQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLGFBQUE7Z0JBQ0EsZ0JBQUE7OztZQUdBLE9BQUEscUJBQUEsV0FBQSxNQUFBLGdCQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOztvQkFFQSxZQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7O29CQUVBLGFBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsZUFBQTt3QkFDQSxhQUFBLFFBQUEsaUJBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsYUFBQTt3QkFDQSxhQUFBLFFBQUEsZ0JBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsTUFBQTs7O2FBR0EsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsVUFBQTs7YUFFQSxNQUFBLGtCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsbUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxtQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG9CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsb0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxxQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLFlBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzthQWlCQSxNQUFBLGdCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsV0FBQTt3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QUEsT0FBQSx1QkFBQSxVQUFBLFNBQUEsWUFBQTtLQUNBLE9BQUE7TUFDQSxVQUFBO01BQ0EsU0FBQTtNQUNBLE1BQUEsVUFBQSxPQUFBLE1BQUEsTUFBQSxNQUFBO09BQ0EsTUFBQSxPQUFBLEtBQUEsT0FBQSxZQUFBO1FBQ0EsS0FBQSxjQUFBLEtBQUE7O09BRUEsSUFBQSxlQUFBLFVBQUEsT0FBQTtvQkFDQSxRQUFBLElBQUE7UUFDQSxJQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUEsVUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLFFBQUEsSUFBQSxDQUFBLFFBQUEsVUFBQSxRQUFBO1FBQ0EsSUFBQSxDQUFBLFFBQUEsVUFBQSxRQUFBLEtBQUE7U0FDQSxLQUFBLGFBQUEsU0FBQTtTQUNBLE9BQUE7ZUFDQTtTQUNBLEtBQUEsYUFBQSxTQUFBO1NBQ0EsT0FBQTs7OztPQUlBLEtBQUEsU0FBQSxLQUFBO09BQ0EsS0FBQSxZQUFBLEtBQUE7Ozs7OztBQzVEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsdUJBQUEsT0FBQSxlQUFBLENBQUEsUUFBQSxTQUFBLE1BQUE7UUFDQSxPQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsS0FBQSxZQUFBOzs7OztBQ0xBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx1QkFBQSxVQUFBLDJDQUFBLFNBQUEsVUFBQSxVQUFBOztRQUVBLE9BQUE7WUFDQSxVQUFBO1lBQ0EsT0FBQTtnQkFDQSxNQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxPQUFBO2dCQUNBLFNBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxlQUFBO2dCQUNBLGVBQUE7OztZQUdBLDZDQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7Z0JBQ0EsT0FBQSxZQUFBO2dCQUNBLE9BQUEsYUFBQTs7Z0JBRUEsT0FBQSxhQUFBO2dCQUNBLE9BQUEsYUFBQTs7Z0JBRUEsT0FBQSxvQkFBQTs7Z0JBRUEsT0FBQSxlQUFBLFNBQUEsTUFBQTtpQkFDQSxPQUFBLFVBQUE7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Q0EsT0FBQSxlQUFBOztpQkFFQTtnQkFDQSxPQUFBLGVBQUE7Ozs7Ozs7QUN0TkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsU0FBQSxjQUFBLFNBQUE7UUFDQSxRQUFBLElBQUE7O1FBRUEsSUFBQTtRQUNBLElBQUEsUUFBQSxNQUFBLEtBQUEsR0FBQSxRQUFBLGFBQUE7WUFDQSxhQUFBLEtBQUEsUUFBQSxNQUFBLEtBQUE7O1lBRUEsYUFBQSxTQUFBLFFBQUEsTUFBQSxLQUFBOzs7UUFHQSxJQUFBLGFBQUEsUUFBQSxNQUFBLEtBQUEsR0FBQSxNQUFBLEtBQUEsR0FBQSxNQUFBLEtBQUE7OztRQUdBLElBQUEsS0FBQSxJQUFBLFdBQUEsV0FBQTtRQUNBLEtBQUEsSUFBQSxJQUFBLEdBQUEsSUFBQSxXQUFBLFFBQUEsS0FBQTtZQUNBLEdBQUEsS0FBQSxXQUFBLFdBQUE7OztRQUdBLE9BQUEsSUFBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUE7OztJQUdBLFFBQUEsT0FBQSx1QkFBQSxVQUFBLFdBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxPQUFBLEVBQUEsU0FBQTtZQUNBLE1BQUEsU0FBQSxPQUFBLE1BQUEsTUFBQTtnQkFDQSxRQUFBLElBQUEsTUFBQTs7Z0JBRUEsR0FBQSxNQUFBLFFBQUE7b0JBQ0EsS0FBQSxHQUFBOzs7Ozs7O0lBT0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsb0tBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBLFVBQUEsT0FBQSxXQUFBLFlBQUEsU0FBQSxjQUFBLFdBQUEsY0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7O1FBR0EsT0FBQSxhQUFBO1lBQ0EsU0FBQTtZQUNBLFFBQUE7WUFDQSxVQUFBOzs7UUFHQSxPQUFBLGlCQUFBLFNBQUEsUUFBQTtZQUNBLFdBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7O1FBR0EsT0FBQSxZQUFBO1FBQ0EsT0FBQSxlQUFBOztRQUVBLFFBQUEsSUFBQTtRQUNBLFFBQUEsSUFBQSxPQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsUUFBQSxJQUFBLE9BQUE7O1FBRUEsT0FBQSxlQUFBO1lBQ0EsQ0FBQSxNQUFBLCtCQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsOEJBQUEsT0FBQTs7O1FBR0EsT0FBQSxPQUFBO1lBQ0EsY0FBQTtZQUNBLFNBQUE7WUFDQSxlQUFBO1lBQ0Esa0JBQUE7WUFDQSxhQUFBO1lBQ0EsZUFBQTtnQkFDQSxNQUFBO2dCQUNBLFNBQUE7O1lBRUEsa0JBQUE7WUFDQSxPQUFBOzs7UUFHQSxJQUFBLFVBQUEsTUFBQTs7UUFFQSxXQUFBLFdBQUE7O1FBRUEsT0FBQSxhQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxPQUFBLFdBQUEsT0FBQSxLQUFBOzs7UUFHQSxPQUFBLGNBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxJQUFBLENBQUEsT0FBQSxLQUFBLGNBQUEsT0FBQSxLQUFBLGNBQUEsS0FBQTs7O1FBR0EsT0FBQSxzQkFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLEtBQUEsQ0FBQSxLQUFBLE9BQUEsS0FBQSxjQUFBLE9BQUEsS0FBQSxlQUFBLE1BQUE7OztRQUdBLE9BQUEsWUFBQTtRQUNBLE9BQUEsbUJBQUE7UUFDQSxPQUFBLFdBQUE7UUFDQSxPQUFBLGFBQUE7O1FBRUEsV0FBQSxPQUFBLFFBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLFVBQUEsYUFBQTtZQUNBLElBQUEsS0FBQSxjQUFBLEdBQUEsT0FBQSxHQUFBOztZQUVBLE9BQUEsS0FBQSxRQUFBLEtBQUE7V0FDQTs7UUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQTtZQUNBLElBQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7WUFHQSxJQUFBLElBQUEsY0FBQSxjQUFBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO21CQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsTUFBQTs7O1lBR0EsSUFBQSxTQUFBLElBQUE7O1lBRUEsSUFBQSxLQUFBLEtBQUEsUUFB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O2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLG1CQUFBOzs7O1FBSUEsT0FBQSw0QkFBQSxTQUFBLEdBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsNkJBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsdUJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwwQkFBQSxTQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7O1FBSUEsT0FBQSwrQkFBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7O1FBSUEsT0FBQSxrQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7WUFDQSxPQUFBLGdCQUFBO1lBQ0E7OztRQUdBLE9BQUEsb0JBQUEsU0FBQSxHQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7WUFDQSxFQUFBLGdCQUFBOzs7UUFHQSxPQUFBLHFCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTs7WUFFQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGVBQUEsU0FBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0E7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7OztRQUdBLE9BQUEsV0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsYUFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUE7O1lBRUEsSUFBQSxPQUFBLGdCQUFBLGFBQUE7Z0JBQ0EsT0FBQSxXQUFBLFNBQUE7OztZQUdBLE9BQUE7OztRQUdBLE9BQUEsY0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLEdBQUEsQ0FBQSxPQUFBLFNBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLEtBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLE9BQUE7OztRQUdBLE9BQUEsZ0JBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxRQUFBLFNBQUE7Z0JBQ0EsT0FBQSxDQUFBLFFBQUEsT0FBQSxRQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsYUFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsYUFBQSxRQUFBLEtBQUEsT0FBQSxzQkFBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGNBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7O1FBR0EsT0FBQSx5QkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsd0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsNkJBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHdCQUFBLE9BQUE7Z0JBQ0EsT0FB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LENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxNQUFBLGFBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDJCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsc0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLCtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsK0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwwQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsOENBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsbUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDRCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1DQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0RBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDZCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw0QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsa0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBOzs7OztBQ3RQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEscUJBQUEsTUFBQSxnQkFBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsS0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLEtBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxXQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsV0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFdBQUEsU0FBQTs7Ozs7QUNwUEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsb0hBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsT0FBQSxVQUFBLFNBQUE7UUFDQSxPQUFBLGdCQUFBOztRQUVBLElBQUEsVUFBQSxVQUFBLDRCQUFBO1lBQ0EsV0FBQTs7O1FBR0EsUUFBQSxRQUFBLFNBQUEsS0FBQSxTQUFBLFFBQUE7WUFDQSxPQUFBLGtCQUFBOzs7OztBQ1hBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG1IQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBLFVBQUEsU0FBQSxZQUFBO1FBQ0EsUUFBQSxJQUFBOzs7O1FBSUEsT0FBQSxPQUFBO1FBQ0EsT0FBQSxPQUFBO1lBQ0EsbUJBQUE7OztRQUdBLE9BQUEsVUFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSw0QkFBQTtZQUNBLFdBQUE7V0FDQTtZQUNBLFFBQUE7Z0JBQ0EsUUFBQTs7OztRQUlBLElBQUEsZUFBQTtRQUNBLElBQUEsZ0JBQUEsUUFBQSxVQUFBLFdBQUEsS0FBQSxZQUFBLEVBQUEsTUFBQSxnQkFBQTs7UUFFQSxJQUFBLE9BQUEsbUJBQUEsZUFBQSxjQUFBLFNBQUEsR0FBQTtZQUNBLElBQUEsZUFBQSxjQUFBOztZQUVBLElBQUEsV0FBQSxlQUFBLGNBQUE7Z0JBQ0EsV0FBQSxlQUFBLGNBQUEsYUFBQSxJQUFBOzs7WUFHQSxJQUFBLFlBQUEsU0FBQSxhQUFBOztZQUVBLElBQUEsT0FBQSxlQUFBLGVBQUEsTUFBQSxZQUFBO2dCQUNBLFFBQUEsUUFBQSxTQUFBLEtBQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsY0FBQTttQkFDQSxRQUFBLFdBQUE7b0JBQ0EsV0FBQSxXQUFBOzttQkFFQSxJQUFBLFFBQUEsU0FBQSxjQUFBLFNBQUEsWUFBQTtnQkFDQSxRQUFBLElBQUEsRUFBQSxXQUFBLGFBQUEsU0FBQSxLQUFBLFNBQUEsUUFBQTtvQkFDQSxPQUFBLFVBQUE7O29CQUVBLFFBQUEsT0FBQTt3QkFDQSxLQUFBOzRCQUNBLE9BQUEsR0FBQSxzQkFBQSxFQUFBLFdBQUE7NEJBQ0E7d0JBQ0EsS0FBQTs0QkFDQSxPQUFBLEdBQUEsc0JBQUEsRUFBQSxXQUFBOzRCQUNBO3dCQUNBLEtBQUE7NEJBQ0EsT0FBQSxHQUFBLDBCQUFBLEVBQUEsV0FBQTs0QkFDQTt3QkFDQSxLQUFBOzRCQUNBLE9BQUEsR0FBQSx3QkFBQSxFQUFBLFdBQUE7NEJBQ0E7d0JBQ0EsS0FBQTs0QkFDQSxPQUFBLEdBQUEsc0JBQUEsRUFBQSxXQUFBOzRCQUNBO3dCQUNBOzRCQUNBLE9BQUEsR0FBQSxzQkFBQSxFQUFBLFdBQUE7O21CQUVBLFFBQUEsV0FBQTtvQkFDQSxXQUFBLFdBQUE7O21CQUVBO2dCQUNBLFFBQUEsSUFBQTs7ZUFFQTtZQUNBLFNBQUEsV0FBQTtnQkFDQSxXQUFBLFdBQUE7Z0JBQ0EsT0FBQSxHQUFBO2VBQ0E7OztRQUdBLE9BQUEsY0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLEdBQUEsc0JBQUEsRUFBQSxXQUFBLFFBQUE7OztRQUdBLE9BQUEsbUJBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxvQkFBQTs7WUFFQSxJQUFBLGFBQUEsSUFBQSxVQUFBLFFBQUEsS0FBQSxTQUFBLFFBQUE7Z0JBQ0EsT0FBQSxZQUFBO2dCQUNBLE9BQUEsS0FBQSxvQkFBQTs7OztRQUlBLE9BQUEsZUFBQSxXQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsSUFBQSxVQUFBLFFBQUEsS0FBQSxPQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLElBQUEsT0FBQSxPQUFBLGFBQUEsYUFBQTtnQkFDQSxRQUFBLE9BQUE7b0JBQ0EsV0FBQSxPQUFBLFFBQUE7bUJBQ0EsU0FBQSxTQUFBLEtBQUEsU0FBQSxRQUFBO29CQUNBLFFBQUEsSUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7OztRQU1BLFdBQUE7OztJQUdBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG1HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBLFlBQUE7UUFDQSxRQUFBLElBQUE7O1FBRUEsT0FBQSxPQUFBO1lBQ0EsZUFBQTs7O1FBR0EsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFdBQUE7OztRQUdBLE9BQUEsT0FBQSxXQUFBLFNBQUEsU0FBQTtZQUNBLElBQUEsWUFBQSxNQUFBO2dCQUNBLFdBQUEsV0FBQTtnQkFDQSxPQUFBLFVBQUE7bUJBQ0E7Z0JBQ0EsUUFBQSxJQUFBOzs7O1FBSUEsT0FBQSxJQUFBLG1CQUFBLFNBQUEsT0FBQSxPQUFBLFVBQUE7WUFDQSxNQUFBO1lBQ0EsUUFBQSxJQUFBOzs7UUFHQSxPQUFBLHVCQUFBLFNBQUEsT0FBQSxVQUFBO1lBQ0EsSUFBQSxVQUFBLEtBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQTs7WUFFQSxRQUFBLElBQUEsb0JBQUEs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RUEsT0FBQSxzQkFBQSxPQUFBLHVCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7bUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsRUFBQSxNQUFBLElBQUEsUUFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLDBCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Ozs7UUFJQSxPQUFBLCtCQUFBLFNBQUEsT0FBQSxPQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHlCQUFBLEVBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLEVBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLEVBQUEsTUFBQSxJQUFBLFFBQUE7bUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLEVBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLEVBQUEsTUFBQSxJQUFBLFFBQUE7Ozs7UUFJQSxPQUFBLGtCQUFBLFNBQUEsT0FBQSxXQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLEVBQUEsTUFBQSxJQUFBLFFBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7O1FBR0EsT0FBQSxvQkFBQSxTQUFBLEdBQUEsT0FBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLEVBQUEsZ0JBQUE7OztRQUdBLE9BQUEscUJBQUEsU0FBQSxPQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLFNBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEs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QUFBLFFBQUEsVUFBQTtNQUNBLFFBQUEsSUFBQTs7O0tBR0EsT0FBQSxlQUFBLFVBQUE7TUFDQSxRQUFBLElBQUE7Ozs7OztBQzlCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxTQUFBLGNBQUEsU0FBQTs7UUFFQSxJQUFBO1FBQ0EsSUFBQSxRQUFBLE1BQUEsS0FBQSxHQUFBLFFBQUEsYUFBQTtZQUNBLGFBQUEsS0FBQSxRQUFBLE1BQUEsS0FBQTs7WUFFQSxhQUFBLFNBQUEsUUFBQSxNQUFBLEtBQUE7OztRQUdBLElBQUEsYUFBQSxRQUFBLE1BQUEsS0FBQSxHQUFBLE1BQUEsS0FBQSxHQUFBLE1BQUEsS0FBQTs7O1FBR0EsSUFBQSxLQUFBLElBQUEsV0FBQSxXQUFBO1FBQ0EsS0FBQSxJQUFBLElBQUEsR0FBQSxJQUFBLFdBQUEsUUFBQSxLQUFBO1lBQ0EsR0FBQSxLQUFBLFdBQUEsV0FBQTs7O1FBR0EsT0FBQSxJQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQTs7O0lBR0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsZ0tBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBLE1BQUEsVUFBQSxTQUFBLE9BQUEsV0FBQSxXQUFBLGNBQUEsY0FBQTs7UUFFQSxPQUFBLFlBQUEsVUFBQSxjQUFBOztRQUVBLE9BQUEsV0FBQSxJQUFBLGFBQUE7WUFDQSxLQUFBO1lBQ0EsbUJBQUE7OztRQUdBLE9BQUEsT0FBQTtZQUNBLGtCQUFBO1lBQ0Esa0JBQUEsQ0FBQTtZQUNBLGVBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxVQUFBOztZQUVBLE9BQUE7OztRQUdBLElBQUEsT0FBQSxXQUFBLFVBQUEsYUFBQTtZQUNBLE9BQUEsS0FBQSxRQUFBO2dCQUNBLGFBQUEsUUFBQSxLQUFBLFdBQUEsS0FBQTtnQkFDQSxRQUFBLFFBQUEsS0FBQSxXQUFBLEtBQUE7Z0JBQ0Esa0JBQUE7Ozs7UUFJQSxPQUFBLGVBQUE7O1FBRUEsT0FBQSxtQkFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLE1BQUEsVUFBQTs7WUFFQSxJQUFBLG1CQUFBO2dC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IjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZnVuZGF0b3IgPSBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3InLFxuICAgICAgICBbXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbmZpZydcbiAgICAgICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnLCBbJ25nUmVzb3VyY2UnLCAnbmdDb29raWVzJywgJ25nQW5pbWF0ZScsICd1aS5ib290c3RyYXAnLCAndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInLCAnYW5ndWxhck1vbWVudCcsICdhbmd1bGFyLW93bC1jYXJvdXNlbCcsICduZ0ltZ0Nyb3AnLCAnYW5ndWxhckZpbGVVcGxvYWQnLCAnYm9vdHN0cmFwTGlnaHRib3gnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnLCBbJ29yZGluYWwnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLCBbJ2RpYmFyaS5hbmd1bGFyLWVsbGlwc2lzJywgJ2xvY2FseXRpY3MuZGlyZWN0aXZlcycsICd0ZXh0QW5ndWxhcicsICdmbG93JywgJ2FuZ3VsYXItbGFkZGEnLCAnbmdGbGFnJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgIyBmb3IgdGhlIG5vbiBodG1sNSBicm93c2Vyc1xuICAgICAgICAvLyAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdHMnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICduYXZpZ2F0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTmF2aWdhdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZsYXNoTm90aWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ2ZsYXNoLW5vdGljZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZsYXNoTm90aWNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRm9vdGVyQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ25vdGlmaWNhdGlvbnMnLCAnbm90aWZpY2F0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05vdGlmaWNhdGlvbnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBxdWlja1VwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdRdWlja1VwZGF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2xvZ2luJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5zaWdudXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdzaWdudXAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmZvcmdvdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZm9yZ290JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2ZvcmdvdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVjb3ZlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVjb3Zlcj90b2tlbiZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWNvdmVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aFJlY292ZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguY29uZmlybScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybT9jb2RlJmVtYWlsJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2NvbmZpcm0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ29uZmlybUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5yZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWdpc3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICAvLyAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAvLyAgICAgZGF0YToge1xuICAgICAgICAgICAgLy8gICAgICAgICBib2R5Q2xhc3M6ICdob21lcGFnZScsXG4gICAgICAgICAgICAvLyAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdob21lJyksXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3RzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jb250ZXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cy86Y29udGVzdElkLzpjb250ZXN0TmFtZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdFNpbmdsZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRXhwZXJ0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5leHBlcnRpc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cGVydGlzZS86ZXhwZXJ0aXNlSWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZXhwZXJ0JywgJ2V4cGVydGlzZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydGlzZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaW52ZXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9pbnZlc3QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSW52ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NyZWF0ZT9wcm9qZWN0SWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZGV0YWlscycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZGV0YWlscycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWRldGFpbHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVEZXRhaWxzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuc3VwZXJleHBlcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3N1cGVyLWV4cGVydCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLXN1cGVyLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZVNFQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1leHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5leHBlcnRzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0cycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUV4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmJ1ZGdldCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYnVkZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtYnVkZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQnVkZ2V0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuaW52ZXN0b3JzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9pbnZlc3RvcnMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1pbnZlc3RvcnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVJbnZlc3RvcnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnRyYW5zYWN0aW9uJywge1xuICAgICAgICAgICAgICAgIHVybDogJy90cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1RyYW5zYWN0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ncmFic2hhcmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2dyYWItYS1zaGFyZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnZlc3QnLCAnZ3JhYi1hLXNoYXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnR3JhYlNoYXJlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ub3RpZmljYXRpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5wYWdlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy86c2x1ZycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncGFnZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHVybFJvdXRlciwgJGZpbHRlciwgJGNvb2tpZXMsIEZkTm90aWZpY2F0aW9ucywgRmRTY3JvbGxlcikge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0ge25hbWU6ICdhcHAuY29udGVzdCd9O1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmNvbGxhcHNlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKCRyb290U2NvcGUuaXNOYXZTaG93biA+PSAwLjUpID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gMCA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAuNTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBVc2VyU2VydmljZSBpcyBhbiBleGFtcGxlIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgJHVybFJvdXRlcidzIGRlZmF1bHQgaGFuZGxlciBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZFxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB1c2VyIG9iamVjdCBhbmQgdGFza3NcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdXNlcj90b2tlbj0nICsgJGF1dGguZ2V0VG9rZW4oKSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZkTm90aWZpY2F0aW9ucy5pbml0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgucmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnbmFsUm9sZSA9ICRyb290U2NvcGUudXNlci5yb2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVJvbGUgPSAkY29va2llcy5nZXQoJ2ZkX2FjdGl2ZV9yb2xlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiBhY3RpdmVSb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShvcmlnbmFsUm9sZS5yb2xlLCBvcmlnbmFsUm9sZS5pZCwgISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkdXJsUm91dGVyLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAkdXJsUm91dGVyLmxpc3RlbigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJcyBBdXRoZW50aWNhdGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCk7XG5cbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBuZWVkTG9naW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodG9TdGF0ZS5kYXRhLm5lZWRMb2dpbikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbiA9IHRvU3RhdGUuZGF0YS5uZWVkTG9naW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRMb2dpbikge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAoZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSAmJiB0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmICh0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSAmJiBmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3dpdGNoIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlLCByb2xlSWQsIHJlbG9hZCwgc3RhdGUsIHN0YXRlUGFyYW1zKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSByb2xlO1xuICAgICAgICAgICAgJGNvb2tpZXMucHV0KCdmZF9hY3RpdmVfcm9sZScsIHJvbGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHN0YXRlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICRzdGF0ZS5jdXJyZW50Lm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RhdGVQYXJhbXMpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHN0YXRlLmN1cnJlbnQucGFyYW1zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclJvbGVWaWV3cyA9IFt7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdxdWlja1VwZGF0ZScsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydDogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW52ZXN0b3I6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtaW52ZXN0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1qdXJ5JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdCcsXG4gICAgICAgICAgICAgICAgdmlldzogJ21haW5AJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZS1qdXJ5JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3RzJyxcbiAgICAgICAgICAgICAgICB2aWV3OiAnbWFpbkAnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1qdXJ5JylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygnY29udGVzdCcpXG4gICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHVzZXJSb2xlVmlld3MsIGZ1bmN0aW9uKHJvbGVWaWV3KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGVUZW1wbGF0ZVZpZXcgPSByb2xlVmlldy5yb2xlc1tyb2xlXTtcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9ICRzdGF0ZS5nZXQocm9sZVZpZXcucm91dGUpLnZpZXdzW3JvbGVWaWV3LnZpZXddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyb2xlVGVtcGxhdGVWaWV3KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVUZW1wbGF0ZVZpZXc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcudGVtcGxhdGVVcmwgPSByb2xlVmlldy5kZWZhdWx0VGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IG51bGw7XG5cbiAgICAgICAgICAgIHN3aXRjaChyb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzogbW9kZWwgPSAnL2FwaS9jcmVhdG9ycy8nICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOiBtb2RlbCA9ICcvYXBpL2ludmVzdG9ycy8nICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldChtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcm9sZV0gPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFzIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuaGFzVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5mYWN0b3J5KCdGZE5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcSwgJGludGVydmFsLCAkaHR0cCwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBnbG9iYWxOb3RpZmljYXRpb25zID0ge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uczogW10sXG4gICAgICAgICAgICB1bnJlYWQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcHVzaE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24obm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihub3RpZmljYXRpb25zKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSBub3RpZmljYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9ub3RpZmljYXRpb25zLycgKyB1c2VyLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYXRlc3ROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb25zSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGVzdE5vdGlmaWNhdGlvbnMgPSBhbmd1bGFyLmNvcHkoZ2xvYmFsTm90aWZpY2F0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMgPSBsYXRlc3ROb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMuc2xpY2UoMCwgNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwobm90aWZpY2F0aW9uc0ludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5yZXNvbHZlKGxhdGVzdE5vdGlmaWNhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9ub3RpZmljYXRpb25zLycgKyBub3RpZmljYXRpb25JZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBcdG5vdGlmaWNhdGlvbi5yZWFkID0gMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkQWxsTm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvbm90aWZpY2F0aW9ucy91c2VyLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnL3JlYWQnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMudW5yZWFkID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBub3RpZmljYXRpb25UcmlnZ2VyOiBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICAgICAgLy8gICAgIHN3aXRjaChjYXRlZ29yeSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ2Rvd25sb2FkLm5ldyc6ICRzdGF0ZS5nbygnYXBwLmRhc2hib2FyZC5kb3dubG9hZHMnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ3BhcnRuZXIucGFpcmVkJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLnBhcnRuZXIuZGV0YWlscycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5zdHVkeV9wZXJpb2RzJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmNvdXJzZXMucGVyaW9kcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAndXNlci5jcmVhdGVkJzogJHN0YXRlLmdvKFRhc2tzU2VydmljZS5uZXh0VGFzaygpLnZpZXcpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgZ2V0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSwgcHVzaCkge1xuICAgICAgICAgICAgICAgIHRvYXN0ZXIucG9wKHR5cGUsIHRpdGxlLCBtZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwdXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnlFcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AoJ2Vycm9yJywgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkU2Nyb2xsZXInLCBmdW5jdGlvbigkd2luZG93KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvVG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBib2R5LnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TZWN0aW9uOiBmdW5jdGlvbihpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBcdHZhciAkc2VjdGlvbiA9ICQoaWRlbnRpZmllcik7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCRzZWN0aW9uKTtcbiAgICAgICAgICAgIFx0aWYgKCRzZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFx0XHR2YXIgdG9wID0gJHNlY3Rpb24ub2Zmc2V0KCkudG9wIC0gNzA7XG5cbiAgICAgICAgICAgIFx0XHR2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBcdGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgJzUwMCcsICdzd2luZycpO1xuICAgICAgICAgICAgXHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuXHQuZGlyZWN0aXZlKCdmZExvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiB7XG5cdCAgXHRzY29wZToge1xuXHQgIFx0XHR2aWV3Qm94OiAnQCdcblx0ICBcdH0sXG5cdCAgICByZXN0cmljdDogJ0UnLFxuXHQgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZmQtbG9hZGVyIGxhLWJhbGwtcHVsc2VcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nLFxuXHQgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdCAgICBcdCRlbGVtZW50LmFkZENsYXNzKCRhdHRycy5jbGFzcyk7XG5cdCAgICB9XG5cdCAgfTtcblx0fSk7XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkTWVzc2VuZ2VyJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiY2hhdGJveFwiIG5nLWlmPVwidGhyZWFkSWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXRSb3dcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluIG1lc3NhZ2VzXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hhdC11c2VyU2VuZGJveFwiIG5nLWNsYXNzPVwie1xcJ2NoYXQtc2VuZFxcJzogdXNlci5pZCA9PSBtZXNzYWdlLnVzZXIuaWQsIFxcJ2NoYXQtY29tZWluXFwnOiB1c2VyLmlkICE9IG1lc3NhZ2UudXNlci5pZH1cIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+e3ttZXNzYWdlLmJvZHl9fTwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FodC1sYWJlbFwiIG5nLWNsYXNzPVxcJ3tcInRleHQtcmlnaHRcIjogdXNlci5pZCA9PSBtZXNzYWdlLnVzZXIuaWR9XFwnPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3t7bWVzc2FnZS51c2VyLm5hbWV9fSA8c3Bhbj57e21lc3NhZ2UuY3JlYXRlZF9hdCB8IGFtRGF0ZUZvcm1hdDpcIk1NTSBEbyBZWVlZXCJ9fTo8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxwIGNsYXNzPVwibm8taGF2ZSBuby1tYXJnaW5cIiBuZy1pZj1cIm1lc3NhZ2VzLmxlbmd0aCA9PT0gMFwiPlRoZXJlIGFyZSBjdXJyZW50bHkgbm8gbWVzc2FnZXMuPC9wPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxmb3JtIGNsYXNzPVwiY2hhdHNlbmRmb3JtXCIgbmctaWY9XCJ0aHJlYWRJZFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIG1lc3NhZ2UgaGVyZSAuLi5cIiBuZy1tb2RlbD1cImRhdGEubWVzc2FnZVRvU2VuZFwiIGZkLWVudGVyPVwic2VuZE1lc3NhZ2UoKVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBzZW5kYnRuXCIgbmctY2xpY2s9XCJzZW5kTWVzc2FnZSgpXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb25cIj5TZW5kPC9zcGFuPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9mb3JtPicsXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICB0aHJlYWRJZDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyID0gJHJvb3RTY29wZS51c2VyO1xuXG4gICAgICAgICAgICAgICAgdmFyIE1lc3NhZ2UgPSAkcmVzb3VyY2UoJy9hcGkvbWVzc2FnZXMvOnRocmVhZElkJywge1xuICAgICAgICAgICAgICAgICAgICB0aHJlYWRJZDogJ0BpZCdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgndGhyZWFkSWQnLCBmdW5jdGlvbih0aHJlYWRJZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodGhyZWFkSWQpID09PSAndW5kZWZpbmVkJyB8fCB0aHJlYWRJZCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIE1lc3NhZ2UuZ2V0KHt0aHJlYWRJZDogJHNjb3BlLnRocmVhZElkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JldHJpdmluZyB0aGUgdGhyZWFkIDogJyArICRzY29wZS50aHJlYWRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGhyZWFkX2lkID0gJHNjb3BlLnRocmVhZElkO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLm1lc3NhZ2UgPSAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICAgIFx0cmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWU7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ25nTWluJywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0cmVzdHJpY3Q6ICdBJyxcbiAgICBcdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcbiAgICBcdFx0XHRzY29wZS4kd2F0Y2goYXR0ci5uZ01pbiwgZnVuY3Rpb24gKCkge1xuICAgIFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgXHRcdFx0fSk7XG4gICAgXHRcdFx0dmFyIG1pblZhbGlkYXRvciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWluVmFsaWRhdG9yJyk7XG4gICAgXHRcdFx0XHR2YXIgbWluID0gc2NvcGUuJGV2YWwoYXR0ci5uZ01pbikgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWluKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPCBtaW4pO1xuICAgIFx0XHRcdFx0aWYgKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA8IG1pbikge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNaW4nLCBmYWxzZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG4gICAgXHRcdFx0XHR9IGVsc2Uge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNaW4nLCB0cnVlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH07XG5cbiAgICBcdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gobWluVmFsaWRhdG9yKTtcbiAgICBcdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2gobWluVmFsaWRhdG9yKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCduZ01heCcsIGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHJlc3RyaWN0OiAnQScsXG4gICAgXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgXHRcdFx0c2NvcGUuJHdhdGNoKGF0dHIubmdNYXgsIGZ1bmN0aW9uICgpIHtcbiAgICBcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShjdHJsLiR2aWV3VmFsdWUpO1xuICAgIFx0XHRcdH0pO1xuICAgIFx0XHRcdHZhciBtYXhWYWxpZGF0b3IgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21heFZhbGlkYXRvcicpO1xuICAgIFx0XHRcdFx0dmFyIG1heCA9IHNjb3BlLiRldmFsKGF0dHIubmdNYXgpIHx8IEluZmluaXR5O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtYXgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA+IG1heCk7XG4gICAgXHRcdFx0XHRpZiAoIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlID4gbWF4KSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01heCcsIGZhbHNlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcbiAgICBcdFx0XHRcdH0gZWxzZSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01heCcsIHRydWUpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fTtcblxuICAgIFx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChtYXhWYWxpZGF0b3IpO1xuICAgIFx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChtYXhWYWxpZGF0b3IpO1xuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZmlsdGVyKCd0cnVzdGVkSHRtbCcsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuICAgICAgICB9O1xuICAgIH1dKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZmRQcm9maWxlSW5wdXQnLCBmdW5jdGlvbigkY29tcGlsZSwgJHRpbWVvdXQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgZm9ybTogJ0AnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdAJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ0AnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQCcsXG4gICAgICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICAgICAgZmFjZWJvb2tWYWx1ZTogJz0nLFxuICAgICAgICAgICAgICAgIGxpbmtlZGluVmFsdWU6ICc9J1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZvcm1FcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb25kaXRpb25zID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNQcmlzdGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbGlkYXRpb24gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbGlkYXRpb25NZXNzYWdlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUucmVwbGFjZVZhbHVlID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIFx0JHNjb3BlLm5nTW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBuZy1tb2RlbD1cIm5nTW9kZWxcIj4nLFxuICAgICAgICAgICAgICAgICAgICAndGV4dGFyZWEnOiAnPHRleHRhcmVhIGNsYXNzPVwidGV4dGFyZWEgZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiByb3dzPVwiNlwiPjwvdGV4dGFyZWE+JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2VtYWlsJzogJzxpbnB1dCBuYW1lPVwie3tmaWVsZH19XCIgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbGdcIiBuZy1kaXNhYmxlZD1cImlzRGlzYWJsZWRcIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1ibHVyPVwidXBkYXRlKClcIj4gJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2Ryb3Bkb3duJzogJzxkaXYgY2xhc3M9XCJzZWxlY3Qtd3JhcGVyIGZ1bGxcIj48c3BhbiBjbGFzcz1cImljb24gaWNvbi1hcnJvdy1ib3R0b21cIj48L3NwYW4+PHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBpbnB1dC1sZ1wiIG5nLW9wdGlvbnM9XCJ2YWx1ZS52YWx1ZSBhcyB2YWx1ZS5uYW1lIGZvciB2YWx1ZSBpbiB2YWx1ZXNcIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJ1cGRhdGUoKVwiPjwvc2VsZWN0PjwvZGl2PicsXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzWyRzY29wZS50eXBlXTtcblxuICAgICAgICAgICAgICAgIHZhciBzb2NpYWxBbHRlcm5hdGl2ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlICE9PSAndGV4dGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgXHRzb2NpYWxBbHRlcm5hdGl2ZSA9ICc8ZGl2IGNsYXNzPVwic29jaWFsLWFsdGVybmF0aXZlXCI+JyArXG4gICAgICAgICAgICAgICAgXHQnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tZmFjZWJvb2tcIiB1aWItdG9vbHRpcD1cInt7ZmFjZWJvb2tWYWx1ZX19XCIgbmctY2xhc3M9XCJ7XFwnY2hlY2tlZFxcJzogKG5nTW9kZWwgPT09IGZhY2Vib29rVmFsdWUpICYmIG5nTW9kZWwgIT09IFxcJ1xcJ31cIiBuZy1kaXNhYmxlZD1cIiFmYWNlYm9va1ZhbHVlXCIgbmctY2xpY2s9XCJyZXBsYWNlVmFsdWUoZmFjZWJvb2tWYWx1ZSlcIj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgXHQnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tbGlua2VkaW4yXCIgdWliLXRvb2x0aXA9XCJ7e2xpbmtlZGluVmFsdWV9fVwiIG5nLWNsYXNzPVwie1xcJ2NoZWNrZWRcXCc6IChuZ01vZGVsID09PSBsaW5rZWRpblZhbHVlKSAmJiBuZ01vZGVsICE9PSBcXCdcXCd9XCIgbmctZGlzYWJsZWQ9XCIhbGlua2VkaW5WYWx1ZVwiIG5nLWNsaWNrPVwicmVwbGFjZVZhbHVlKGxpbmtlZGluVmFsdWUpXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgIFx0JzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID1cblx0ICAgICAgICAgICAgICAgICc8ZGl2PicgK1xuXHQgICAgICAgICAgICAgICAgJzxsYWJlbD57e2xhYmVsfX06PC9sYWJlbD4nICtcblx0ICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuXHQgICAgICAgICAgICAgICAgXHRmaWVsZCArXG5cdCAgICAgICAgICAgICAgICBcdHNvY2lhbEFsdGVybmF0aXZlICtcblx0ICAgICAgICAgICAgICAgICc8L2Rpdj48L2Rpdj4nO1xuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuaHRtbCgkY29tcGlsZSh0ZW1wbGF0ZSkoJHNjb3BlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSlcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignc3RyaXBUYWdzJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKFN0cmluZy5mcm9tQ2hhckNvZGUoMTYwKSwgXCJnXCIpO1xuXHRcdFx0XHR0ZXh0ID0gU3RyaW5nKHRleHQpLnJlcGxhY2UocmUsIFwiIFwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLyZuYnNwOy9naSwnICcpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dCA/IFN0cmluZyh0ZXh0KS5yZXBsYWNlKC88W14+XSs+L2dtLCAnJykgOiAnJztcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdjbGVhbkh0bWwnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dDtcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKCRhdXRoUHJvdmlkZXIpe1xuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXG4gICAgICAgIC8vIHJvdXRlIHRoZSBKV1Qgc2hvdWxkIGJlIHJldHJpZXZlZCBmcm9tXG4gICAgICAgICRhdXRoUHJvdmlkZXIubG9naW5VcmwgPSAnL2FwaS9hdXRoZW50aWNhdGUnO1xuICAgICAgICAkYXV0aFByb3ZpZGVyLnRva2VuUHJlZml4ID0gJ2Z1bmRhdG9yJztcblxuICAgICAgICB2YXIgcmVkaXJlY3RVcmlQYXRoID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxpbmtlZGluKHtcbiAgICAgICAgXHRjbGllbnRJZDogJzc3emp4ZmJoMjkyOHJlJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvYXV0aGVudGljYXRlL2xpbmtlZGluJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydzdGF0ZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3NlbGYnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnMTA0MjI0NzcyNzA5MS1kbXFjNTVhZjd0bDU4aDJycXYzcHFucm1qamJiOTczMy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9nb29nbGUnLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc2NvcGUnXSxcbiAgICAgICAgICAgIG9wdGlvbmFsVXJsUGFyYW1zOiBbJ2Rpc3BsYXknXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlUHJlZml4OiAnb3BlbmlkJyxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnOTAwNTMzMTIzMzk1OTIwJyxcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArICcvYXBpL2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydkaXNwbGF5JywgJ3Njb3BlJ10sXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XG4gICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoZmxvd0ZhY3RvcnlQcm92aWRlcil7XG5cbiAgICAgICAgZmxvd0ZhY3RvcnlQcm92aWRlci5kZWZhdWx0cyA9IHtcbiAgICAgICAgXHR1cGxvYWRNZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHRhcmdldDogJy9hcGkvZmlsZXMvJyxcbiAgICAgICAgICAgIHBlcm1hbmVudEVycm9yczpbNDA0LCA1MDAsIDUwMV1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbihsYWRkYVByb3ZpZGVyKSB7XG5cbiAgICAgICAgbGFkZGFQcm92aWRlci5zZXRPcHRpb24oe1xuICAgICAgICAgICAgc3R5bGU6ICdleHBhbmQtcmlnaHQnLFxuICAgICAgICAgICAgc3Bpbm5lclNpemU6IDM1LFxuICAgICAgICAgICAgc3Bpbm5lckNvbG9yOiAnI2ZmZmZmZidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcil7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScsIHt9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgICRzY29wZS5zaWdudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvc2lnbnVwJywgdXNlckluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSAmJiB0eXBlb2YocmVzdWx0LmRhdGEubWVzc2FnZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9IHJlc3VsdC5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWxbMF0pO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJGF1dGguc2V0VG9rZW4ocmVzdWx0LmRhdGEudG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU3RhdGUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoYWN0aXZlU3RhdGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5zaWdudXAnKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHBheWxvYWQucm9sZSwgcGF5bG9hZC5yb2xlX2lkLCB0cnVlLCBhY3RpdmVTdGF0ZSwgYWN0aXZlU3RhdGVQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXNUZXh0ID09PSAnVW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1RoZSBlbWFpbCBvciBwYXNzd29yZCB5b3UgZW50ZXJlZCBpcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aENvbmZpcm1DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICBpZiAodHlwZW9mKCRzdGF0ZVBhcmFtcy5jb2RlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1hdGlvbl9jb2RlOiAkc3RhdGVQYXJhbXMuY29kZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHN0YXRlUGFyYW1zLmVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL2NvbmZpcm0nLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEuZXJyb3I7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoUmVjb3ZlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcmVjb3ZlcnlFbWFpbDogJycsXG4gICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICBwYXNzd29yZF9yZXBlYXQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMudG9rZW4pID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YoJHN0YXRlUGFyYW1zLmVtYWlsKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlY292ZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdsb2FkaW5nJztcblxuICAgICAgICAgICAgLy8gUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLnJlY292ZXJ5RW1haWxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL2ZvcmdvdCcsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSAnQSBwYXNzd29yZCByZXNldCBsaW5rIGhhcyBiZWVuIHNlbnQgdG8geW91ciBlbWFpbC4nO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJyc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuZXJyb3IgPT09ICdJbnZhbGlkIFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVjb3ZlcmluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgLy8gUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5wYXNzd29yZC5sZW5ndGggPj0gNikge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5wYXNzd29yZCA9PT0gJHNjb3BlLmRhdGEucGFzc3dvcmRfcmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJHN0YXRlUGFyYW1zLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogJHNjb3BlLmRhdGEucGFzc3dvcmRfcmVwZWF0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvcmVjb3ZlcicsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnJlbW92ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGF1dGguc2V0VG9rZW4ocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgZnJvbSBoZXJlIC4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZXNldHRpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmRzIGRvIG5vdCBtYXRjaCEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmRzIG5lZWQgdG8gYmUgbG9uZ2VyIHRoYW4gNiBjaGFyYWN0ZXJzISc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhVVJJKTtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmb2N1c09uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZTogeyBmb2N1c09uOiAnPScgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2NvcGUuZm9jdXNPbik7XG5cbiAgICAgICAgICAgICAgICBpZihzY29wZS5mb2N1c09uKXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgIH07XG4gICAgfSk7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIsICRmaWx0ZXIsIEZpbGVVcGxvYWRlciwgQ291bnRyaWVzLCBDb3VudHJ5Q29kZXMpIHtcblxuICAgICAgICAkc2NvcGUuZm9ybSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiAxLFxuICAgICAgICAgICAgdG90YWxTdGVwczogM1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b3RhbFN0ZXBzID0ge1xuICAgICAgICAgICAgY3JlYXRvcjogMyxcbiAgICAgICAgICAgIGV4cGVydDogNCxcbiAgICAgICAgICAgIGludmVzdG9yOiA0XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZUZvcm1TdGVwID0gZnVuY3Rpb24obmV3U3RlcCl7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCA9IG5ld1N0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gQ291bnRyaWVzKCk7XG4gICAgICAgICRzY29wZS5jb3VudHJ5Q29kZXMgPSBDb3VudHJ5Q29kZXMoKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnJHNjb3BlLmNvdW50cmllcycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291bnRyaWVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJyRzY29wZS5jb3VudHJ5Q29kZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdW50cnlDb2Rlcyk7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRhY3RUaW1lcyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnV29ya2luZyBob3VycyAoOWFtIHRvIDYgcG0pJywgdmFsdWU6ICc5LTYnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnRXZlbmluZyB0aW1lICg2YW0gdG8gOSBwbSknLCB2YWx1ZTogJzYtOSd9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFJvbGU6ICdjcmVhdG9yJyxcbiAgICAgICAgICAgIGFnZUdhdGU6ICd5ZXMnLFxuICAgICAgICAgICAgY291bnRyeU9yaWdpbjogJycsXG4gICAgICAgICAgICBjb3VudHJ5UmVzaWRlbmNlOiAnJyxcbiAgICAgICAgICAgIGNvbnRhY3RUaW1lOiAnJyxcbiAgICAgICAgICAgIGV4cGVydGlzZUZvcm06IHtcbiAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcm9wcGVkVGh1bWJuYWlsOiBudWxsLFxuICAgICAgICAgICAgZW1haWw6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHBheWxvYWQgPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5jaGFuZ2VSb2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzID0gJHNjb3BlLnRvdGFsU3RlcHNbJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlXTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKCgkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCAvICRzY29wZS5mb3JtLnRvdGFsU3RlcHMpICogMTAwLCA5Nik7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3NJbnZlcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KCgoMSAtICgkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCAvICRzY29wZS5mb3JtLnRvdGFsU3RlcHMpKSAqIDEwMCksIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodXNlci5yZWdpc3RlcmVkID09IDEpICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUltYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICRzY29wZS5kYXRhLmNyb3BwZWRUaHVtYm5haWw7XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZS5maWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gJ1lvdXIgcHJvZmlsZSBwaWN0dXJlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWQhJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VFcnJvciA9ICdQcm9maWxlIHBpY3R1cmUgZmFpbGVkIHRvIHVwbG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IoaW1hZ2UpKTtcbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCl7XG4gICAgICAgICAgICB2YXIgbGFzdElucHV0dGVkRXhwZXJ0aXNlID0ge3NlbGVjdGVkRXhwZXJ0aXNlOiAnbnVsbCcsIG90aGVyRXhwZXJ0aXNlOiB7c3RhdHVzOiAxfX07XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0xXTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RJbnB1dHRlZEV4cGVydGlzZSk7XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA8IDMgJiYgKGxhc3RJbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCAmJiBsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBza2lsbHNMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsczogW10sXG4gICAgICAgICAgICAgICAgICAgIG90aGVyU2tpbGxzOiB7bGlzdDogW10sIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeShpbmRleCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QoaW5kZXgpO1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGUsIGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaW5Ta2lsbHMgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgdmFyIGZvdW5kU2tpbGwgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGZvdW5kU2tpbGwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZFNraWxsLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICBpZighJHNjb3BlLmluU2tpbGxzKGluZGV4LCBza2lsbCkpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLnB1c2goc2tpbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGUsIGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhbmd1bGFyLmVxdWFscyhhY3R1YWwsIGV4cGVjdGVkKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVTa2lsbHMgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscyA9IHtsaXN0OiBbXSwgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8wJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlL2NhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZS5pZCArICcvc2tpbGxzLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdERldGFpbHMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5kYXRhLmZuYW1lLFxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJHNjb3BlLmRhdGEubG5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlLFxuICAgICAgICAgICAgICAgIGFnZV9nYXRlOiAkc2NvcGUuZGF0YS5hZ2VHYXRlLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfb3JpZ2luOiAkc2NvcGUuZGF0YS5jb3VudHJ5T3JpZ2luLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfcmVzaWRlbmNlOiAkc2NvcGUuZGF0YS5jb3VudHJ5UmVzaWRlbmNlLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfbnVtYmVyOiAkc2NvcGUuZGF0YS5jb250YWN0TnVtYmVyLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfbnVtYmVyX2NvdW50cnlfY29kZTogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlckNvdW50cnlDb2RlLmNvZGUsXG4gICAgICAgICAgICAgICAgY29udGFjdF90aW1lOiAkc2NvcGUuZGF0YS5jb250YWN0VGltZS52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoKCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52ZXN0bWVudEJ1ZGdldCA9PT0gJ290aGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldE90aGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yID0ge307XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0ID0gaW52ZXN0bWVudEJ1ZGdldDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9nb2FsID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50R29hbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9yZWFzb24gPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRSZWFzb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmNyZWF0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdleHBlcnQnOlxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5leHBlcnQgPSB7IGxpc3Q6IFtdIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QsIGZ1bmN0aW9uKGlucHV0dGVkRXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCB8fCBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydC5saXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX2V4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZFNraWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS91c2Vycy8nICsgJHJvb3RTY29wZS51c2VyLmlkLCB1c2VyRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSA9PT0gJ1VwZGF0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5uYW1lID0gJHNjb3BlLmRhdGEuZm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5sYXN0X25hbWUgPSAkc2NvcGUuZGF0YS5sbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJvbGUgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkaHR0cCwgJHRpbWVvdXQsICRmaWx0ZXIpIHtcblxuICAgICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5qdWRnaW5nQ29udGVzdHMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2NyZWF0b3InICYmIHR5cGVvZigkcm9vdFNjb3BlLnVzZXIuY3JlYXRvcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBvZ2MgaW4gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0KXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3RfaWQgPSAkcm9vdFNjb3BlLnVzZXIuY3JlYXRvci5vbmdvaW5nX2NvbnRlc3Rbb2djXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3QgPSAkZmlsdGVyKCdmaWx0ZXInKShyZXN1bHQsIHtpZDogY29udGVzdF9pZH0sIHRydWUpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoY29udGVzdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzLnB1c2goY29udGVzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZ2NJbmRleCA9ICRzY29wZS5jb250ZXN0cy5pbmRleE9mKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29nY0luZGV4IDogJyArIG9nY0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0cy5zcGxpY2Uob2djSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYgJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBqYyBpbiAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmdbamNdLmNvbnRlc3RfaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3QgPSAkZmlsdGVyKCdmaWx0ZXInKShyZXN1bHQsIHtpZDogY29udGVzdF9pZH0sIHRydWUpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoY29udGVzdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzLnB1c2goY29udGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZmRFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLmZkRW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdFNpbmdsZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRmaWx0ZXIsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCAkaHR0cCwgTGlnaHRib3gpIHtcbiAgICAgICAgJHNjb3BlLmNvbnRlc3RJZCA9ICRzdGF0ZVBhcmFtcy5jb250ZXN0SWQ7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgY29udGVzdEZ1bGxEZXNjcmlwdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBhZGRFbnRyeTogZmFsc2UsXG4gICAgICAgICAgICBhZGRFbnRyeUZvcm06IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgYXR0YWNoZWRGaWxlczogW11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RlZEVudHJ5OiBudWxsLFxuICAgICAgICAgICAgcmF0aW5nOiB7XG4gICAgICAgICAgICAgICAgZGVzaWduOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAnJyxcbiAgICAgICAgICAgICAgICBpbmR1c3RyaWFsOiAnJyxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIEVudHJ5ID0gJHJlc291cmNlKCcvYXBpL2VudHJpZXMvOmVudHJ5SWQnLCB7XG4gICAgICAgICAgICBlbnRyeUlkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb250ZXN0YW50RW50cmllczoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzL2NvbnRlc3QvOmNvbnRlc3RJZC9jcmVhdG9yLzpjcmVhdG9ySWQnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBqdWRnZUVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvanVkZ2UvOmp1ZGdlSWQnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kTWVzc2FnZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy86ZW50cnlJZC9tZXNzYWdlcycsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIEVudHJ5UmF0aW5nID0gJHJlc291cmNlKCcvYXBpL2VudHJ5LXJhdGluZ3MvOmVudHJ5UmF0aW5nSWQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLnNob3dGdWxsVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmhpZGVGdWxsVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuY29udGVzdEZ1bGxEZXNjcmlwdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29udGVzdC5nZXQoe1xuICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkXG4gICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgdmFyIGp1ZGdlYWJsZSA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5qdWRnaW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcGVuZGluZ0p1ZGdlYWJsZSA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5qdWRnaW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgY29udGVzdGluZyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5jb250ZXN0aW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcGVuZGluZ0NvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihqdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChqdWRnZWFibGUubGVuZ3RoID4gMCAmJiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSAnanVyeScgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSAnY3JlYXRvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LnNob3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5jb250ZXN0SWQgPSByZXN1bHQuaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcub25DbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiAnanVyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiByZXN1bHQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5JyAmJiBqdWRnZWFibGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJHJvb3RTY29wZS5hY3RpdmVSb2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGVuZGluZ0p1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdKdWRnZWFibGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoY29udGVzdGluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlc3RpbmcubGVuZ3RoID4gMCAmJiAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygkcm9vdFNjb3BlLmFjdGl2ZVJvbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwZW5kaW5nQ29udGVzdGluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdDb250ZXN0aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBzd2l0Y2gocm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnanVyeSc6XG4gICAgICAgICAgICAgICAgICAgIEVudHJ5Lmp1ZGdlRW50cmllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBqdWRnZUlkOiAkcm9vdFNjb3BlLnVzZXIuaWRcbiAgICAgICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QuZW50cmllcyA9IGFuZ3VsYXIuY29weShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogJ2NyZWF0b3InfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdG9yID0gcm9sZXNbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEVudHJ5LmNvbnRlc3RhbnRFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9yLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QuZW50cmllcyA9IGFuZ3VsYXIuY29weShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RW50cnkgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSBlbnRyeTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5lbnRyaWVzLWxpc3QnKTtcblxuICAgICAgICAgICAgdmFyIGp1ZGdlSWQgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScpIHtcbiAgICAgICAgICAgICAgICBqdWRnZUlkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoanVkZ2VJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9lbnRyaWVzLycgKyBlbnRyeS5pZCArICcvanVkZ2UvJyArIGp1ZGdlSWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZyA9IHJlc3VsdC5kYXRhLnJhdGluZztcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmdhbGxlcnkgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzEucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8zLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgRW50cnkuZ2V0KHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlJZDogZW50cnkuaWRcbiAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmdhbGxlcnkgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzEucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8zLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm9wZW5MaWdodGJveCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBhbGxGaWxlcyA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZmlsZXM7XG4gICAgICAgICAgICB2YXIgYWxsSW1hZ2VzID0gW107XG4gICAgICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gMDtcblxuICAgICAgICAgICAgZm9yKHZhciBhRiBpbiBhbGxGaWxlcyl7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBhbGxGaWxlc1thRl07XG4gICAgICAgICAgICAgICAgYWxsSW1hZ2VzLnB1c2goZmlsZS51cmwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGUudXJsID09PSBpdGVtLnVybCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSBhRjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExpZ2h0Ym94Lm9wZW5Nb2RhbChhbGxJbWFnZXMsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJG9uKCdmbG93OjpmaWxlQWRkZWQnLCBmdW5jdGlvbiAoZXZlbnQsICRmbG93LCBmbG93RmlsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWxlQWRkZWQnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmbG93KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZsb3dGaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVudHJ5RmlsZVN1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmlsZSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgZmlsZXMgOiAnICsgbWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgICRmaWxlLnJlZl9pZCA9IG1lc3NhZ2UuZmlsZS5pZDtcblxuICAgICAgICAgICAgLy8gdmFyIGl0ZW1zID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMsIHtpZDogbWVzc2FnZS5maWxlLmlkfSk7XG4gICAgICAgICAgICAvLyB2YXIgaXRlbSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGlmICh0eXBlb2YoaXRlbXMpICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgaXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5pbmRleE9mKG1lc3NhZ2UuZmlsZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuZmlsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmVudHJ5RmlsZVJlbW92ZSA9IGZ1bmN0aW9uKGZpbGUsICRmbG93KSB7XG4gICAgICAgICAgICAvLyB2YXIgaXRlbXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcywge2lkOiBmaWxlLmlkfSk7XG4gICAgICAgICAgICAvLyB2YXIgaXRlbSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGlmICh0eXBlb2YoaXRlbXMpICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgaXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5pbmRleE9mKGZpbGUucmVmX2lkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBmaWxlc0luZGV4ID0gJGZsb3cuZmlsZXMuaW5kZXhPZihmaWxlKTtcbiAgICAgICAgICAgIGlmIChmaWxlc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmUgZmlsZXMgLi4uICcgKyBmaWxlc0luZGV4KTtcbiAgICAgICAgICAgICAgICAkZmxvdy5maWxlcy5zcGxpY2UoZmlsZXNJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmbG93LmZpbGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zaG93QWRkRW50cnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuZW50cmllcy1saXN0Jyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnkgPSB0cnVlO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uID0gJyc7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcyA9IFtdO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb24gPSAkc2NvcGUuY29udGVzdC5lbnRyaWVzWyRzY29wZS5jb250ZXN0LmVudHJpZXMubGVuZ3RoIC0gMV0uZGVzY3JpcHRpb247XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc3VibWl0RW50cnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ0VudHJ5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaGVkRmlsZXMgPSB7fTtcbiAgICAgICAgICAgIHZhciB0aHVtYm5haWxfaWQgPSBudWxsO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmZsb3cuZmlsZXMsIGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXNbZmlsZS5yZWZfaWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAnY2FwdGlvbic6IGZpbGUucmVmX2NhcHRpb25cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXBhcmUgdG8gYXNzaWduIHRodW1ibmFpbCcpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlLmZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpICE9PSAtMSAmJiB0aHVtYm5haWxfaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dob29waWUgaXQgbWF0Y2hlcycpO1xuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxfaWQgPSBmaWxlLnJlZl9pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiAnY3JlYXRvcid9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gbmV3IEVudHJ5KCk7XG4gICAgICAgICAgICAgICAgZW50cnkuY3JlYXRvcl9pZCA9IHJvbGUuaWQ7XG4gICAgICAgICAgICAgICAgZW50cnkuY29udGVzdF9pZCA9ICRzY29wZS5jb250ZXN0LmlkO1xuICAgICAgICAgICAgICAgIGVudHJ5LnRodW1ibmFpbF9pZCA9IHRodW1ibmFpbF9pZDtcblxuICAgICAgICAgICAgICAgIGVudHJ5Lm5hbWUgPSAkcm9vdFNjb3BlLnVzZXIubmFtZSArIFwiJ3MgRW50cnlcIjtcbiAgICAgICAgICAgICAgICBlbnRyeS5kZXNjcmlwdGlvbiA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBlbnRyeS5hdHRhY2hlZF9maWxlcyA9IGF0dGFjaGVkRmlsZXM7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeS50aHVtYm5haWxfaWQpO1xuXG4gICAgICAgICAgICAgICAgZW50cnkuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbnRyeSBTYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdFbnRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZEVudHJ5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9ICBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RFbnRyeShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdjcmVhdG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIEVudHJ5LnNlbmRNZXNzYWdlKHtlbnRyeUlkOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmlkfSwgbWVzc2FnZVJlcXVlc3QsIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5tZXNzYWdlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zYXZlTWFya3MgPSBmdW5jdGlvbihlbnRyeVJhdGluZ0lkKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZWRSYXRpbmcgPSB7XG4gICAgICAgICAgICAgICAgZGVzaWduOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5kZXNpZ24sXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuY3JlYXRpdml0eSxcbiAgICAgICAgICAgICAgICBpbmR1c3RyaWFsOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5pbmR1c3RyaWFsLFxuICAgICAgICAgICAgICAgIG1hcmtldDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcubWFya2V0LFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5qdWRnZV9pZCA9ICRyb290U2NvcGUudXNlci5pZDtcbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuZW50cnlfaWQgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmlkO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGVudHJ5UmF0aW5nSWQpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIEVudHJ5UmF0aW5nLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6IGVudHJ5UmF0aW5nSWRcbiAgICAgICAgICAgICAgICB9LCB1cGRhdGVkUmF0aW5nKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgc2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnanVyeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeVJhdGluZyA9IG5ldyBFbnRyeVJhdGluZyh1cGRhdGVkUmF0aW5nKTtcbiAgICAgICAgICAgICAgICBlbnRyeVJhdGluZy4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBjcmVhdGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2p1cnknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYmVjb21lSnVkZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gU2hvdyBOREFcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGEgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFjY2VwdEp1ZGdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzL2JlY29tZUp1ZGdlJywge2NvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0LmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhU3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYmVjb21lQ29udGVzdGFudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTaG93IE5EQVxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hY2NlcHRDb250ZXN0YW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMvYmVjb21lQ29udGVzdGFudCcsIHtjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdC5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhU3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS52YWx1ZSgnQ291bnRyaWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFmZ2hhbmlzdGFuXCIsIFwiY29kZVwiOiBcIkFGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiw4VsYW5kIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQVhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbGJhbmlhXCIsIFwiY29kZVwiOiBcIkFMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQWxnZXJpYVwiLCBcImNvZGVcIjogXCJEWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFtZXJpY2FuIFNhbW9hXCIsIFwiY29kZVwiOiBcIkFTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5kb3JyQVwiLCBcImNvZGVcIjogXCJBRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFuZ29sYVwiLCBcImNvZGVcIjogXCJBT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFuZ3VpbGxhXCIsIFwiY29kZVwiOiBcIkFJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW50YXJjdGljYVwiLCBcImNvZGVcIjogXCJBUVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFudGlndWEgYW5kIEJhcmJ1ZGFcIiwgXCJjb2RlXCI6IFwiQUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcmdlbnRpbmFcIiwgXCJjb2RlXCI6IFwiQVJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcm1lbmlhXCIsIFwiY29kZVwiOiBcIkFNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQXJ1YmFcIiwgXCJjb2RlXCI6IFwiQVdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBdXN0cmFsaWFcIiwgXCJjb2RlXCI6IFwiQVVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBdXN0cmlhXCIsIFwiY29kZVwiOiBcIkFUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQXplcmJhaWphblwiLCBcImNvZGVcIjogXCJBWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhaGFtYXNcIiwgXCJjb2RlXCI6IFwiQlNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCYWhyYWluXCIsIFwiY29kZVwiOiBcIkJIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFuZ2xhZGVzaFwiLCBcImNvZGVcIjogXCJCRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhcmJhZG9zXCIsIFwiY29kZVwiOiBcIkJCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVsYXJ1c1wiLCBcImNvZGVcIjogXCJCWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbGdpdW1cIiwgXCJjb2RlXCI6IFwiQkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZWxpemVcIiwgXCJjb2RlXCI6IFwiQlpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZW5pblwiLCBcImNvZGVcIjogXCJCSlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlcm11ZGFcIiwgXCJjb2RlXCI6IFwiQk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCaHV0YW5cIiwgXCJjb2RlXCI6IFwiQlRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb2xpdmlhXCIsIFwiY29kZVwiOiBcIkJPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYVwiLCBcImNvZGVcIjogXCJCQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJvdHN3YW5hXCIsIFwiY29kZVwiOiBcIkJXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm91dmV0IElzbGFuZFwiLCBcImNvZGVcIjogXCJCVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJyYXppbFwiLCBcImNvZGVcIjogXCJCUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJydW5laSBEYXJ1c3NhbGFtXCIsIFwiY29kZVwiOiBcIkJOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnVsZ2FyaWFcIiwgXCJjb2RlXCI6IFwiQkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdXJraW5hIEZhc29cIiwgXCJjb2RlXCI6IFwiQkZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdXJ1bmRpXCIsIFwiY29kZVwiOiBcIkJJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FtYm9kaWFcIiwgXCJjb2RlXCI6IFwiS0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYW1lcm9vblwiLCBcImNvZGVcIjogXCJDTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhbmFkYVwiLCBcImNvZGVcIjogXCJDQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhcGUgVmVyZGVcIiwgXCJjb2RlXCI6IFwiQ1ZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYXltYW4gSXNsYW5kc1wiLCBcImNvZGVcIjogXCJLWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNlbnRyYWwgQWZyaWNhbiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJDRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoYWRcIiwgXCJjb2RlXCI6IFwiVERcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDaGlsZVwiLCBcImNvZGVcIjogXCJDTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoaW5hXCIsIFwiY29kZVwiOiBcIkNOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hyaXN0bWFzIElzbGFuZFwiLCBcImNvZGVcIjogXCJDWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvY29zIChLZWVsaW5nKSBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIkNDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29sb21iaWFcIiwgXCJjb2RlXCI6IFwiQ09cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb21vcm9zXCIsIFwiY29kZVwiOiBcIktNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29uZ29cIiwgXCJjb2RlXCI6IFwiQ0dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb25nbywgVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlXCIsIFwiY29kZVwiOiBcIkNEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29vayBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIkNLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29zdGEgUmljYVwiLCBcImNvZGVcIjogXCJDUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvdGUgRFxcXCJJdm9pcmVcIiwgXCJjb2RlXCI6IFwiQ0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDcm9hdGlhXCIsIFwiY29kZVwiOiBcIkhSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3ViYVwiLCBcImNvZGVcIjogXCJDVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkN5cHJ1c1wiLCBcImNvZGVcIjogXCJDWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkN6ZWNoIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkNaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRGVubWFya1wiLCBcImNvZGVcIjogXCJES1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkRqaWJvdXRpXCIsIFwiY29kZVwiOiBcIkRKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRG9taW5pY2FcIiwgXCJjb2RlXCI6IFwiRE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEb21pbmljYW4gUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiRE9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFY3VhZG9yXCIsIFwiY29kZVwiOiBcIkVDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRWd5cHRcIiwgXCJjb2RlXCI6IFwiRUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFbCBTYWx2YWRvclwiLCBcImNvZGVcIjogXCJTVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVxdWF0b3JpYWwgR3VpbmVhXCIsIFwiY29kZVwiOiBcIkdRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXJpdHJlYVwiLCBcImNvZGVcIjogXCJFUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVzdG9uaWFcIiwgXCJjb2RlXCI6IFwiRUVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFdGhpb3BpYVwiLCBcImNvZGVcIjogXCJFVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKVwiLCBcImNvZGVcIjogXCJGS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZhcm9lIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiRk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGaWppXCIsIFwiY29kZVwiOiBcIkZKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmlubGFuZFwiLCBcImNvZGVcIjogXCJGSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyYW5jZVwiLCBcImNvZGVcIjogXCJGUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyZW5jaCBHdWlhbmFcIiwgXCJjb2RlXCI6IFwiR0ZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGcmVuY2ggUG9seW5lc2lhXCIsIFwiY29kZVwiOiBcIlBGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzXCIsIFwiY29kZVwiOiBcIlRGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2Fib25cIiwgXCJjb2RlXCI6IFwiR0FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHYW1iaWFcIiwgXCJjb2RlXCI6IFwiR01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHZW9yZ2lhXCIsIFwiY29kZVwiOiBcIkdFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2VybWFueVwiLCBcImNvZGVcIjogXCJERVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdoYW5hXCIsIFwiY29kZVwiOiBcIkdIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2licmFsdGFyXCIsIFwiY29kZVwiOiBcIkdJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3JlZWNlXCIsIFwiY29kZVwiOiBcIkdSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3JlZW5sYW5kXCIsIFwiY29kZVwiOiBcIkdMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3JlbmFkYVwiLCBcImNvZGVcIjogXCJHRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1YWRlbG91cGVcIiwgXCJjb2RlXCI6IFwiR1BcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWFtXCIsIFwiY29kZVwiOiBcIkdVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3VhdGVtYWxhXCIsIFwiY29kZVwiOiBcIkdUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3Vlcm5zZXlcIiwgXCJjb2RlXCI6IFwiR0dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWluZWFcIiwgXCJjb2RlXCI6IFwiR05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWluZWEtQmlzc2F1XCIsIFwiY29kZVwiOiBcIkdXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3V5YW5hXCIsIFwiY29kZVwiOiBcIkdZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSGFpdGlcIiwgXCJjb2RlXCI6IFwiSFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIZWFyZCBJc2xhbmQgYW5kIE1jZG9uYWxkIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiSE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIb2x5IFNlZSAoVmF0aWNhbiBDaXR5IFN0YXRlKVwiLCBcImNvZGVcIjogXCJWQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhvbmR1cmFzXCIsIFwiY29kZVwiOiBcIkhOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSG9uZyBLb25nXCIsIFwiY29kZVwiOiBcIkhLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSHVuZ2FyeVwiLCBcImNvZGVcIjogXCJIVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkljZWxhbmRcIiwgXCJjb2RlXCI6IFwiSVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJbmRpYVwiLCBcImNvZGVcIjogXCJJTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkluZG9uZXNpYVwiLCBcImNvZGVcIjogXCJJRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklyYW4sIElzbGFtaWMgUmVwdWJsaWMgT2ZcIiwgXCJjb2RlXCI6IFwiSVJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJcmFxXCIsIFwiY29kZVwiOiBcIklRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXJlbGFuZFwiLCBcImNvZGVcIjogXCJJRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklzbGUgb2YgTWFuXCIsIFwiY29kZVwiOiBcIklNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXNyYWVsXCIsIFwiY29kZVwiOiBcIklMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXRhbHlcIiwgXCJjb2RlXCI6IFwiSVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKYW1haWNhXCIsIFwiY29kZVwiOiBcIkpNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSmFwYW5cIiwgXCJjb2RlXCI6IFwiSlBcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKZXJzZXlcIiwgXCJjb2RlXCI6IFwiSkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKb3JkYW5cIiwgXCJjb2RlXCI6IFwiSk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLYXpha2hzdGFuXCIsIFwiY29kZVwiOiBcIktaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS2VueWFcIiwgXCJjb2RlXCI6IFwiS0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLaXJpYmF0aVwiLCBcImNvZGVcIjogXCJLSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZVxcXCJTIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIktQXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS29yZWEsIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIktSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS3V3YWl0XCIsIFwiY29kZVwiOiBcIktXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS3lyZ3l6c3RhblwiLCBcImNvZGVcIjogXCJLR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxhbyBQZW9wbGVcXFwiUyBEZW1vY3JhdGljIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkxBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGF0dmlhXCIsIFwiY29kZVwiOiBcIkxWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGViYW5vblwiLCBcImNvZGVcIjogXCJMQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxlc290aG9cIiwgXCJjb2RlXCI6IFwiTFNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaWJlcmlhXCIsIFwiY29kZVwiOiBcIkxSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGlieWFuIEFyYWIgSmFtYWhpcml5YVwiLCBcImNvZGVcIjogXCJMWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpZWNodGVuc3RlaW5cIiwgXCJjb2RlXCI6IFwiTElcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaXRodWFuaWFcIiwgXCJjb2RlXCI6IFwiTFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMdXhlbWJvdXJnXCIsIFwiY29kZVwiOiBcIkxVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFjYW9cIiwgXCJjb2RlXCI6IFwiTU9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWNlZG9uaWEsIFRoZSBGb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiTUtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWRhZ2FzY2FyXCIsIFwiY29kZVwiOiBcIk1HXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsYXdpXCIsIFwiY29kZVwiOiBcIk1XXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsYXlzaWFcIiwgXCJjb2RlXCI6IFwiTVlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxkaXZlc1wiLCBcImNvZGVcIjogXCJNVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbGlcIiwgXCJjb2RlXCI6IFwiTUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWx0YVwiLCBcImNvZGVcIjogXCJNVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hcnNoYWxsIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiTUhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYXJ0aW5pcXVlXCIsIFwiY29kZVwiOiBcIk1RXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF1cml0YW5pYVwiLCBcImNvZGVcIjogXCJNUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hdXJpdGl1c1wiLCBcImNvZGVcIjogXCJNVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1heW90dGVcIiwgXCJjb2RlXCI6IFwiWVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNZXhpY29cIiwgXCJjb2RlXCI6IFwiTVhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNaWNyb25lc2lhLCBGZWRlcmF0ZWQgU3RhdGVzIG9mXCIsIFwiY29kZVwiOiBcIkZNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW9sZG92YSwgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiTURcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb25hY29cIiwgXCJjb2RlXCI6IFwiTUNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb25nb2xpYVwiLCBcImNvZGVcIjogXCJNTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbnRzZXJyYXRcIiwgXCJjb2RlXCI6IFwiTVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb3JvY2NvXCIsIFwiY29kZVwiOiBcIk1BXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW96YW1iaXF1ZVwiLCBcImNvZGVcIjogXCJNWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk15YW5tYXJcIiwgXCJjb2RlXCI6IFwiTU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOYW1pYmlhXCIsIFwiY29kZVwiOiBcIk5BXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmF1cnVcIiwgXCJjb2RlXCI6IFwiTlJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXBhbFwiLCBcImNvZGVcIjogXCJOUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5ldGhlcmxhbmRzXCIsIFwiY29kZVwiOiBcIk5MXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV0aGVybGFuZHMgQW50aWxsZXNcIiwgXCJjb2RlXCI6IFwiQU5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXcgQ2FsZWRvbmlhXCIsIFwiY29kZVwiOiBcIk5DXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV3IFplYWxhbmRcIiwgXCJjb2RlXCI6IFwiTlpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOaWNhcmFndWFcIiwgXCJjb2RlXCI6IFwiTklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOaWdlclwiLCBcImNvZGVcIjogXCJORVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pZ2VyaWFcIiwgXCJjb2RlXCI6IFwiTkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOaXVlXCIsIFwiY29kZVwiOiBcIk5VXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTm9yZm9sayBJc2xhbmRcIiwgXCJjb2RlXCI6IFwiTkZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiTVBcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3J3YXlcIiwgXCJjb2RlXCI6IFwiTk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJPbWFuXCIsIFwiY29kZVwiOiBcIk9NXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFraXN0YW5cIiwgXCJjb2RlXCI6IFwiUEtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYWxhdVwiLCBcImNvZGVcIjogXCJQV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbGVzdGluaWFuIFRlcnJpdG9yeSwgT2NjdXBpZWRcIiwgXCJjb2RlXCI6IFwiUFNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYW5hbWFcIiwgXCJjb2RlXCI6IFwiUEFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYXB1YSBOZXcgR3VpbmVhXCIsIFwiY29kZVwiOiBcIlBHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFyYWd1YXlcIiwgXCJjb2RlXCI6IFwiUFlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQZXJ1XCIsIFwiY29kZVwiOiBcIlBFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGhpbGlwcGluZXNcIiwgXCJjb2RlXCI6IFwiUEhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQaXRjYWlyblwiLCBcImNvZGVcIjogXCJQTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBvbGFuZFwiLCBcImNvZGVcIjogXCJQTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBvcnR1Z2FsXCIsIFwiY29kZVwiOiBcIlBUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUHVlcnRvIFJpY29cIiwgXCJjb2RlXCI6IFwiUFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJRYXRhclwiLCBcImNvZGVcIjogXCJRQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlJldW5pb25cIiwgXCJjb2RlXCI6IFwiUkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSb21hbmlhXCIsIFwiY29kZVwiOiBcIlJPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUnVzc2lhbiBGZWRlcmF0aW9uXCIsIFwiY29kZVwiOiBcIlJVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUldBTkRBXCIsIFwiY29kZVwiOiBcIlJXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgSGVsZW5hXCIsIFwiY29kZVwiOiBcIlNIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgS2l0dHMgYW5kIE5ldmlzXCIsIFwiY29kZVwiOiBcIktOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgTHVjaWFcIiwgXCJjb2RlXCI6IFwiTENcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uXCIsIFwiY29kZVwiOiBcIlBNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXNcIiwgXCJjb2RlXCI6IFwiVkNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYW1vYVwiLCBcImNvZGVcIjogXCJXU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbiBNYXJpbm9cIiwgXCJjb2RlXCI6IFwiU01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYW8gVG9tZSBhbmQgUHJpbmNpcGVcIiwgXCJjb2RlXCI6IFwiU1RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYXVkaSBBcmFiaWFcIiwgXCJjb2RlXCI6IFwiU0FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZW5lZ2FsXCIsIFwiY29kZVwiOiBcIlNOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2VyYmlhIGFuZCBNb250ZW5lZ3JvXCIsIFwiY29kZVwiOiBcIkNTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2V5Y2hlbGxlc1wiLCBcImNvZGVcIjogXCJTQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNpZXJyYSBMZW9uZVwiLCBcImNvZGVcIjogXCJTTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNpbmdhcG9yZVwiLCBcImNvZGVcIjogXCJTR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNsb3Zha2lhXCIsIFwiY29kZVwiOiBcIlNLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2xvdmVuaWFcIiwgXCJjb2RlXCI6IFwiU0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb2xvbW9uIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiU0JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb21hbGlhXCIsIFwiY29kZVwiOiBcIlNPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU291dGggQWZyaWNhXCIsIFwiY29kZVwiOiBcIlpBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiR1NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTcGFpblwiLCBcImNvZGVcIjogXCJFU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNyaSBMYW5rYVwiLCBcImNvZGVcIjogXCJMS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN1ZGFuXCIsIFwiY29kZVwiOiBcIlNEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3VyaW5hbWVcIiwgXCJjb2RlXCI6IFwiU1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTdmFsYmFyZCBhbmQgSmFuIE1heWVuXCIsIFwiY29kZVwiOiBcIlNKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3dhemlsYW5kXCIsIFwiY29kZVwiOiBcIlNaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3dlZGVuXCIsIFwiY29kZVwiOiBcIlNFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3dpdHplcmxhbmRcIiwgXCJjb2RlXCI6IFwiQ0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTeXJpYW4gQXJhYiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJTWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRhaXdhbiwgUHJvdmluY2Ugb2YgQ2hpbmFcIiwgXCJjb2RlXCI6IFwiVFdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUYWppa2lzdGFuXCIsIFwiY29kZVwiOiBcIlRKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJUWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRoYWlsYW5kXCIsIFwiY29kZVwiOiBcIlRIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGltb3ItTGVzdGVcIiwgXCJjb2RlXCI6IFwiVExcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUb2dvXCIsIFwiY29kZVwiOiBcIlRHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVG9rZWxhdVwiLCBcImNvZGVcIjogXCJUS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRvbmdhXCIsIFwiY29kZVwiOiBcIlRPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVHJpbmlkYWQgYW5kIFRvYmFnb1wiLCBcImNvZGVcIjogXCJUVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1bmlzaWFcIiwgXCJjb2RlXCI6IFwiVE5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXJrZXlcIiwgXCJjb2RlXCI6IFwiVFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXJrbWVuaXN0YW5cIiwgXCJjb2RlXCI6IFwiVE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiVENcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXZhbHVcIiwgXCJjb2RlXCI6IFwiVFZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVZ2FuZGFcIiwgXCJjb2RlXCI6IFwiVUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVa3JhaW5lXCIsIFwiY29kZVwiOiBcIlVBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVW5pdGVkIEFyYWIgRW1pcmF0ZXNcIiwgXCJjb2RlXCI6IFwiQUVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgS2luZ2RvbVwiLCBcImNvZGVcIjogXCJHQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBTdGF0ZXNcIiwgXCJjb2RlXCI6IFwiVVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiVU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVcnVndWF5XCIsIFwiY29kZVwiOiBcIlVZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVXpiZWtpc3RhblwiLCBcImNvZGVcIjogXCJVWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZhbnVhdHVcIiwgXCJjb2RlXCI6IFwiVlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWZW5lenVlbGFcIiwgXCJjb2RlXCI6IFwiVkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWaWV0IE5hbVwiLCBcImNvZGVcIjogXCJWTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZpcmdpbiBJc2xhbmRzLCBCcml0aXNoXCIsIFwiY29kZVwiOiBcIlZHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHMsIFUuUy5cIiwgXCJjb2RlXCI6IFwiVklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLCBcImNvZGVcIjogXCJXRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIldlc3Rlcm4gU2FoYXJhXCIsIFwiY29kZVwiOiBcIkVIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiWWVtZW5cIiwgXCJjb2RlXCI6IFwiWUVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJaYW1iaWFcIiwgXCJjb2RlXCI6IFwiWk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJaaW1iYWJ3ZVwiLCBcImNvZGVcIjogXCJaV1wiIH1cbiAgICAgICAgXTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS52YWx1ZSgnQ291bnRyeUNvZGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IGNvZGU6ICcxJywgY291bnRyeTogJ1VTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMScsIGNvdW50cnk6ICdDQScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzcnLCBjb3VudHJ5OiAnUlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc3JywgY291bnRyeTogJ0taJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjAnLCBjb3VudHJ5OiAnRUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNycsIGNvdW50cnk6ICdaQScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMwJywgY291bnRyeTogJ0dSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzEnLCBjb3VudHJ5OiAnTkwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczMicsIGNvdW50cnk6ICdCRScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMzJywgY291bnRyeTogJ0ZSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzQnLCBjb3VudHJ5OiAnRVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNicsIGNvdW50cnk6ICdIVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzM5JywgY291bnRyeTogJ0lUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDAnLCBjb3VudHJ5OiAnUk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MScsIGNvdW50cnk6ICdDSCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQzJywgY291bnRyeTogJ0FUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQnLCBjb3VudHJ5OiAnR0InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NScsIGNvdW50cnk6ICdESycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ2JywgY291bnRyeTogJ1NFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDcnLCBjb3VudHJ5OiAnTk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NycsIGNvdW50cnk6ICdTSicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ4JywgY291bnRyeTogJ1BMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDknLCBjb3VudHJ5OiAnREUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MScsIGNvdW50cnk6ICdQRScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzUyJywgY291bnRyeTogJ01YJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTMnLCBjb3VudHJ5OiAnQ1UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NCcsIGNvdW50cnk6ICdBUicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU1JywgY291bnRyeTogJ0JSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTYnLCBjb3VudHJ5OiAnQ0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NycsIGNvdW50cnk6ICdDTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU4JywgY291bnRyeTogJ1ZFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjAnLCBjb3VudHJ5OiAnTVknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MScsIGNvdW50cnk6ICdBVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYxJywgY291bnRyeTogJ0NDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjEnLCBjb3VudHJ5OiAnQ1gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MicsIGNvdW50cnk6ICdJRCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYzJywgY291bnRyeTogJ1BIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjQnLCBjb3VudHJ5OiAnTlonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NCcsIGNvdW50cnk6ICdQTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzY1JywgY291bnRyeTogJ1NHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjYnLCBjb3VudHJ5OiAnVEgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4MScsIGNvdW50cnk6ICdKUCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzgyJywgY291bnRyeTogJ0tSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODQnLCBjb3VudHJ5OiAnVk4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NicsIGNvdW50cnk6ICdDTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkwJywgY291bnRyeTogJ1RSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTEnLCBjb3VudHJ5OiAnSU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5MicsIGNvdW50cnk6ICdQSycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkzJywgY291bnRyeTogJ0FGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTQnLCBjb3VudHJ5OiAnTEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NScsIGNvdW50cnk6ICdNTScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzk4JywgY291bnRyeTogJ0lSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjExJywgY291bnRyeTogJ1NTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjEyJywgY291bnRyeTogJ01BJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjEyJywgY291bnRyeTogJ0VIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjEzJywgY291bnRyeTogJ0RaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjE2JywgY291bnRyeTogJ1ROJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjE4JywgY291bnRyeTogJ0xZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIwJywgY291bnRyeTogJ0dNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIxJywgY291bnRyeTogJ1NOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIyJywgY291bnRyeTogJ01SJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIzJywgY291bnRyeTogJ01MJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI0JywgY291bnRyeTogJ0dOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI1JywgY291bnRyeTogJ0NJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI2JywgY291bnRyeTogJ0JGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI3JywgY291bnRyeTogJ05FJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI4JywgY291bnRyeTogJ1RHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI5JywgY291bnRyeTogJ0JKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMwJywgY291bnRyeTogJ01VJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMxJywgY291bnRyeTogJ0xSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMyJywgY291bnRyeTogJ1NMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMzJywgY291bnRyeTogJ0dIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM0JywgY291bnRyeTogJ05HJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM1JywgY291bnRyeTogJ1REJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM2JywgY291bnRyeTogJ0NGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM3JywgY291bnRyeTogJ0NNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM4JywgY291bnRyeTogJ0NWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM5JywgY291bnRyeTogJ1NUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQwJywgY291bnRyeTogJ0dRJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQxJywgY291bnRyeTogJ0dBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQyJywgY291bnRyeTogJ0NHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQzJywgY291bnRyeTogJ0NEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ0JywgY291bnRyeTogJ0FPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ1JywgY291bnRyeTogJ0dXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ2JywgY291bnRyeTogJ0lPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ4JywgY291bnRyeTogJ1NDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ5JywgY291bnRyeTogJ1NEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUwJywgY291bnRyeTogJ1JXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUxJywgY291bnRyeTogJ0VUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUyJywgY291bnRyeTogJ1NPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUzJywgY291bnRyeTogJ0RKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU0JywgY291bnRyeTogJ0tFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU1JywgY291bnRyeTogJ1RaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU2JywgY291bnRyeTogJ1VHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU3JywgY291bnRyeTogJ0JJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU4JywgY291bnRyeTogJ01aJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYwJywgY291bnRyeTogJ1pNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYxJywgY291bnRyeTogJ01HJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYyJywgY291bnRyeTogJ1lUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYyJywgY291bnRyeTogJ1JFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYzJywgY291bnRyeTogJ1pXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY0JywgY291bnRyeTogJ05BJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY1JywgY291bnRyeTogJ01XJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY2JywgY291bnRyeTogJ0xTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY3JywgY291bnRyeTogJ0JXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY4JywgY291bnRyeTogJ1NaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY5JywgY291bnRyeTogJ0tNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjkwJywgY291bnRyeTogJ1NIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjkxJywgY291bnRyeTogJ0VSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjk3JywgY291bnRyeTogJ0FXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjk4JywgY291bnRyeTogJ0ZPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjk5JywgY291bnRyeTogJ0dMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUwJywgY291bnRyeTogJ0dJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUxJywgY291bnRyeTogJ1BUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUyJywgY291bnRyeTogJ0xVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUzJywgY291bnRyeTogJ0lFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU0JywgY291bnRyeTogJ0lTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU1JywgY291bnRyeTogJ0FMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU2JywgY291bnRyeTogJ01UJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU3JywgY291bnRyeTogJ0NZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU4JywgY291bnRyeTogJ0ZJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU5JywgY291bnRyeTogJ0JHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzcwJywgY291bnRyeTogJ0xUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzcxJywgY291bnRyeTogJ0xWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzcyJywgY291bnRyeTogJ0VFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzczJywgY291bnRyeTogJ01EJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc0JywgY291bnRyeTogJ0FNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc1JywgY291bnRyeTogJ0JZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc2JywgY291bnRyeTogJ0FEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc3JywgY291bnRyeTogJ01DJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc4JywgY291bnRyeTogJ1NNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc5JywgY291bnRyeTogJ1ZBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgwJywgY291bnRyeTogJ1VBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgxJywgY291bnRyeTogJ1JTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgyJywgY291bnRyeTogJ01FJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgzJywgY291bnRyeTogJ1hLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg1JywgY291bnRyeTogJ0hSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg2JywgY291bnRyeTogJ1NJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg3JywgY291bnRyeTogJ0JBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg5JywgY291bnRyeTogJ01LJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDIwJywgY291bnRyeTogJ0NaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDIxJywgY291bnRyeTogJ1NLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDIzJywgY291bnRyeTogJ0xJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAwJywgY291bnRyeTogJ0ZLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAxJywgY291bnRyeTogJ0JaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAyJywgY291bnRyeTogJ0dUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAzJywgY291bnRyeTogJ1NWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA0JywgY291bnRyeTogJ0hOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA1JywgY291bnRyeTogJ05JJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA2JywgY291bnRyeTogJ0NSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA3JywgY291bnRyeTogJ1BBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA4JywgY291bnRyeTogJ1BNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA5JywgY291bnRyeTogJ0hUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkwJywgY291bnRyeTogJ0JMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkwJywgY291bnRyeTogJ01GJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkxJywgY291bnRyeTogJ0JPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkyJywgY291bnRyeTogJ0dZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkzJywgY291bnRyeTogJ0VDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk1JywgY291bnRyeTogJ1BZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk3JywgY291bnRyeTogJ1NSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk4JywgY291bnRyeTogJ1VZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk5JywgY291bnRyeTogJ0NXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk5JywgY291bnRyeTogJ0FOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjcwJywgY291bnRyeTogJ1RMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjcyJywgY291bnRyeTogJ0FRJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjczJywgY291bnRyeTogJ0JOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc0JywgY291bnRyeTogJ05SJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc1JywgY291bnRyeTogJ1BHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc2JywgY291bnRyeTogJ1RPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc3JywgY291bnRyeTogJ1NCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc4JywgY291bnRyeTogJ1ZVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc5JywgY291bnRyeTogJ0ZKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgwJywgY291bnRyeTogJ1BXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgxJywgY291bnRyeTogJ1dGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgyJywgY291bnRyeTogJ0NLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgzJywgY291bnRyeTogJ05VJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg1JywgY291bnRyeTogJ1dTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg2JywgY291bnRyeTogJ0tJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg3JywgY291bnRyeTogJ05DJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg4JywgY291bnRyeTogJ1RWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg5JywgY291bnRyeTogJ1BGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjkwJywgY291bnRyeTogJ1RLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjkxJywgY291bnRyeTogJ0ZNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjkyJywgY291bnRyeTogJ01IJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODUwJywgY291bnRyeTogJ0tQJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODUyJywgY291bnRyeTogJ0hLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODUzJywgY291bnRyeTogJ01PJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODU1JywgY291bnRyeTogJ0tIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODU2JywgY291bnRyeTogJ0xBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODgwJywgY291bnRyeTogJ0JEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODg2JywgY291bnRyeTogJ1RXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYwJywgY291bnRyeTogJ01WJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYxJywgY291bnRyeTogJ0xCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYyJywgY291bnRyeTogJ0pPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYzJywgY291bnRyeTogJ1NZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY0JywgY291bnRyeTogJ0lRJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY1JywgY291bnRyeTogJ0tXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY2JywgY291bnRyeTogJ1NBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY3JywgY291bnRyeTogJ1lFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY4JywgY291bnRyeTogJ09NJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTcwJywgY291bnRyeTogJ1BTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTcxJywgY291bnRyeTogJ0FFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTcyJywgY291bnRyeTogJ0lMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTczJywgY291bnRyeTogJ0JIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc0JywgY291bnRyeTogJ1FBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc1JywgY291bnRyeTogJ0JUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc2JywgY291bnRyeTogJ01OJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc3JywgY291bnRyeTogJ05QJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTkyJywgY291bnRyeTogJ1RKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTkzJywgY291bnRyeTogJ1RNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk0JywgY291bnRyeTogJ0FaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk1JywgY291bnRyeTogJ0dFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk2JywgY291bnRyeTogJ0tHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk4JywgY291bnRyeTogJ1VaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNDInLCBjb3VudHJ5OiAnQlMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI0NicsIGNvdW50cnk6ICdCQicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjY0JywgY291bnRyeTogJ0FJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNjgnLCBjb3VudHJ5OiAnQUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI4NCcsIGNvdW50cnk6ICdWRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMzQwJywgY291bnRyeTogJ1ZJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0zNDUnLCBjb3VudHJ5OiAnS1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTQ0MScsIGNvdW50cnk6ICdCTScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNDczJywgY291bnRyeTogJ0dEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NDknLCBjb3VudHJ5OiAnVEMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY2NCcsIGNvdW50cnk6ICdNUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjcwJywgY291bnRyeTogJ01QJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NzEnLCBjb3VudHJ5OiAnR1UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY4NCcsIGNvdW50cnk6ICdBUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzIxJywgY291bnRyeTogJ1NYJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03NTgnLCBjb3VudHJ5OiAnTEMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTc2NycsIGNvdW50cnk6ICdETScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzg0JywgY291bnRyeTogJ1ZDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS05MzknLCBjb3VudHJ5OiAnUFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg0OScsIGNvdW50cnk6ICdETycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODY4JywgY291bnRyeTogJ1RUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS04NjknLCBjb3VudHJ5OiAnS04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg3NicsIGNvdW50cnk6ICdKTScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ0LTE0ODEnLCBjb3VudHJ5OiAnR0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NC0xNTM0JywgY291bnRyeTogJ0pFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQtMTYyNCcsIGNvdW50cnk6ICdJTScgfVxuICAgICAgICBdO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlcikge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkdGltZW91dCwgJGZpbHRlciwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlIFN0YXJ0ZWQnKTtcbiAgICAgICAgLy8gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAvLyBBdmFpbGFibGUgVmlld3MgOiBMaXN0LCBDcmVhdGVcbiAgICAgICAgJHNjb3BlLnZpZXcgPSAnbGlzdCc7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgbmV3UHJvamVjdExvYWRpbmc6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnByb2plY3QgPSBudWxsO1xuXG4gICAgICAgIHZhciBQcm9qZWN0ID0gJHJlc291cmNlKCcvYXBpL3Byb2plY3RzLzpwcm9qZWN0SWQnLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkUm9sZSA9ICdjcmVhdG9yJztcbiAgICAgICAgdmFyIG1hdGNoaW5nUm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywgeyByb2xlOiByZXF1aXJlZFJvbGUgfSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZihtYXRjaGluZ1JvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgbWF0Y2hpbmdSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlID0gbWF0Y2hpbmdSb2xlc1swXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gcmVxdWlyZWRSb2xlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyZXF1aXJlZFJvbGUsIG1hdGNoaW5nUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcm9qZWN0SWQgPSBwYXJzZUludCgkc3RhdGVQYXJhbXMucHJvamVjdElkKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0SWQpID09PSAndW5kZWZpbmVkJyB8fCBpc05hTihwcm9qZWN0SWQpKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGxQcm9qZWN0cyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNOdW1iZXIocHJvamVjdElkKSAmJiBpc0Zpbml0ZShwcm9qZWN0SWQpKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC5nZXQoeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLnN1cGVyZXhwZXJ0JywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0cycsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01ha2UgdXAgeW91ciBtaW5kIHlvdSBwZWljZSBvZiBzaGl0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub1Byb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0LmlkIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNyZWF0ZU5ld1Byb2plY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLm5ld1Byb2plY3RMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCgpLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZ29Ub1Byb2plY3QocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5uZXdQcm9qZWN0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2F2aW5nIHByb2dyZXNzIG5vdyAhJyk7XG4gICAgICAgICAgICB2YXIgcHJvamVjdCA9IGFuZ3VsYXIuY29weSgkc2NvcGUucHJvamVjdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkc2NvcGUucHJvamVjdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkXG4gICAgICAgICAgICAgICAgfSwgcHJvamVjdCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRGV0YWlsc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZURldGFpbHNDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGZlYXR1cmVkSW1hZ2U6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRldGFpbHMgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGdlb2dyYXBoeTogJ3doZXJldmVyJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHByb2plY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IHN0aWxsIGxvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24oZXZlbnQsICRmbG93LCBmbG93RmlsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWxlIGFkZGVkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mZWF0dXJlZEltYWdlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBmaWxlcyA6ICcgKyBtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3QudGh1bWJuYWlsX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmF0dGFjaGVkRmlsZXNTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnByb2plY3QuYXR0YWNoZWRGaWxlcy5pbmRleE9mKG1lc3NhZ2UuZmlsZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdC5hdHRhY2hlZEZpbGVzLnB1c2gobWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXREcmFmdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcjcHJvamVjdFN0ZXBzJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVTRUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVTRUN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRodHRwLmdldCgnL2FwaS9zdXBlci1leHBlcnRzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5zdXBlckV4cGVydHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNob29zZVN1cGVyRXhwZXJ0ID0gZnVuY3Rpb24oc3VwZXJFeHBlcnQpIHtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN1cGVyX2V4cGVydF9pZCA9IHN1cGVyRXhwZXJ0LmlkO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRXhwZXJ0aXNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0aXNlQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IFtdO1xuXG4gICAgICAgIHZhciBQcm9qZWN0RXhwZXJ0aXNlID0gJHJlc291cmNlKCcvYXBpL3Byb2plY3RzLzpwcm9qZWN0SWQvZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLnF1ZXJ5KHtwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3QpID09PSAndW5kZWZpbmVkJyB8fCBwcm9qZWN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnNhdmVFeHBlcnRpc2UgPSBmdW5jdGlvbihleHBlcnRpc2Upe1xuICAgICAgICAgICAgdmFyIHByb2plY3RFeHBlcnRpc2VEYXRhID0ge1xuICAgICAgICAgICAgICAgICdleHBlcnRpc2VfaWQnOiBleHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UuaWQsXG4gICAgICAgICAgICAgICAgJ3Rhc2snOiBleHBlcnRpc2UubWFpblRhc2ssXG4gICAgICAgICAgICAgICAgJ2J1ZGdldCc6IGV4cGVydGlzZS5idWRnZXQsXG4gICAgICAgICAgICAgICAgJ2xlYWRfdGltZSc6IGV4cGVydGlzZS5sZWFkVGltZSxcbiAgICAgICAgICAgICAgICAnc3RhcnRfZGF0ZSc6IGV4cGVydGlzZS5zdGFydERhdGVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvcHJvamVjdHMvJyArICRzY29wZS5wcm9qZWN0LmlkICsgJy9leHBlcnRpc2UnLCBwcm9qZWN0RXhwZXJ0aXNlRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdC5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyAkc2NvcGUuZXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIC8vICAgICBleHBlcnRpc2VDYXRlZ29yeTogZXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkubmFtZSxcbiAgICAgICAgICAgIC8vICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeTogZXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkubmFtZSxcbiAgICAgICAgICAgIC8vICAgICBleHBlcnRpc2U6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZS5uYW1lLFxuICAgICAgICAgICAgLy8gICAgIG1haW5UYXNrOiBleHBlcnRpc2UubWFpblRhc2ssXG4gICAgICAgICAgICAvLyAgICAgYnVkZ2V0OiBleHBlcnRpc2UuYnVkZ2V0LFxuICAgICAgICAgICAgLy8gICAgIGxlYWRUaW1lOiBleHBlcnRpc2UubGVhZFRpbWUsXG4gICAgICAgICAgICAvLyAgICAgc3RhcnREYXRlOiBleHBlcnRpc2Uuc3RhcnREYXRlLFxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlRXhwZXJ0aXNlU2VsZWN0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN0YXRlID0gNDtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRpc2UnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hZGROZXdJbnB1dHRlZEV4cGVydGlzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dHRlZEV4cGVydGlzZSA9IHsgc2VsZWN0ZWRFeHBlcnRpc2U6ICdudWxsJywgb3RoZXJFeHBlcnRpc2U6IHsgc3RhdHVzOiAxIH0gfTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIDwgMyAmJiAobGFzdElucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsICYmIGxhc3RJbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnk6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpblRhc2s6ICcnLFxuICAgICAgICAgICAgICAgICAgICBidWRnZXQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBsZWFkVGltZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkoaW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2UpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvMCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0Q3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICB2YXIgUHJvamVjdEV4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0cy86cHJvamVjdElkL2V4cGVydGlzZScsIHtcbiAgICAgICAgICAgIHByb2plY3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFByb2plY3RFeHBlcnRpc2UucXVlcnkoe3Byb2plY3RJZDogJHNjb3BlLnByb2plY3QuaWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc2hvcnRsaXN0RXhwZXJ0ID0gZnVuY3Rpb24oZXhwZXJ0aXNlLCBiaWQpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihleHBlcnRpc2Uuc2hvcnRsaXN0KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBleHBlcnRpc2Uuc2hvcnRsaXN0ID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4cGVydGlzZS5zaG9ydGxpc3QucHVzaChiaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRpc2N1c3NFeHBlcnQgPSBmdW5jdGlvbihleHBlcnRpc2UsIGJpZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEJpZCA9IGJpZFxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUJ1ZGdldEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVCdWRnZXRDdHJsIFN0YXJ0ZWQnKTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUludmVzdG9yc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVJbnZlc3RvcnNDdHJsIFN0YXJ0ZWQnKTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdGbGFzaE5vdGljZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcgPSB7XG4gICAgICAgIFx0c2hvdzogZmFsc2UsXG4gICAgICAgIFx0Y29udGVzdElkOiAwLFxuICAgICAgICBcdG9uQ2xpY2s6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICBcdFx0JHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgnanVyeScsIDUsIHRydWUpO1xuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR1aWJNb2RhbCkge1xuXG4gICAgICAgICRzY29wZS50cmlnZ2VyTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXHRjb25zb2xlLmxvZygndHJpZ2dlciBsb2dpbiEnKTtcblxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgICAgICAgICB3aW5kb3dDbGFzczogJ2xvZ2luLW1vZGFsJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dvdCBjbG9zZSBmZWVkYmFjayEnKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXHRjb25zb2xlLmxvZygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSkge1xuICAgIFx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ2xvZ2dpbmcgaW4gbm93ICEnKTtcbiAgICBcdH1cblxuICAgIFx0JHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdhdXRoIGluIG5vdyAhJyk7XG4gICAgXHR9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05hdmlnYXRpb25DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkbG9nLCAkdGltZW91dCwgJGZpbHRlciwgJGh0dHAsICRyZXNvdXJjZSwgJHVpYk1vZGFsLCBGaWxlVXBsb2FkZXIsIENvdW50cnlDb2Rlcykge1xuXG4gICAgICAgICRzY29wZS5hbGxTa2lsbHMgPSAkcmVzb3VyY2UoJ2FwaS9za2lsbHMnKS5xdWVyeSgpO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc01vZGU6ICd2aWV3JyxcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc1NhdmU6IC0xLFxuICAgICAgICAgICAgc29jaWFsQ29ubmVjdDoge1xuICAgICAgICAgICAgICAgIGZhY2Vib29rOiB7fSxcbiAgICAgICAgICAgICAgICBsaW5rZWRpbjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0d29GQToge31cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQSA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlci5jb250YWN0X251bWJlcl9jb3VudHJ5X2NvZGUpLFxuICAgICAgICAgICAgICAgIG51bWJlcjogYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlci5jb250YWN0X251bWJlciksXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb3VudHJ5Q29kZXMgPSBDb3VudHJ5Q29kZXMoKTtcblxuICAgICAgICAkc2NvcGUuc3RhcnRUd29GQVZlcmlmeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB2ZXJpZmljYXRpb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIHZpYTogJ3NtcycsXG4gICAgICAgICAgICAgICAgY291bnRyeV9jb2RlOiBwYXJzZUludCgkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZSksXG4gICAgICAgICAgICAgICAgcGhvbmVfbnVtYmVyOiBwYXJzZUludCgkc2NvcGUuZGF0YS50d29GQS5udW1iZXIpLFxuICAgICAgICAgICAgICAgIGxvY2FsZTogJ2VuJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS92ZXJpZmljYXRpb24vc3RhcnQnLCB2ZXJpZmljYXRpb25EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5jb2RlU2VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY29tcGxldGVUd29GQVZlcmZpeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB2ZXJpZmljYXRpb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfY29kZTogcGFyc2VJbnQoJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGUpLFxuICAgICAgICAgICAgICAgIHBob25lX251bWJlcjogcGFyc2VJbnQoJHNjb3BlLmRhdGEudHdvRkEubnVtYmVyKSxcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25fY29kZTogcGFyc2VJbnQoJHNjb3BlLmRhdGEudHdvRkEudmVyaWZpY2F0aW9uQ29kZSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdmVyaWZpY2F0aW9uL2NoZWNrJywgdmVyaWZpY2F0aW9uRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2ZXJpZmljYXRpb24gZGF0YScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmNvZGVTZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLnZlcmlmeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucGhvbmVfdmVyaWZpZWQgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNvY2lhbENvbm5lY3QgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNvY2lhbFVubGluayA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gbnVsbDtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHN3aXRjaChwcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmFjZWJvb2snOiBtZXRob2QgPSAndW5saW5rRmFjZWJvb2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmtlZGluJzogbWV0aG9kID0gJ3VubGlua0xpbmtlZGluJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvJyArIG1ldGhvZCwge30pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSBudWxsO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9maWxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydjcmVhdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2ludmVzdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2p1ZGdpbmcnXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDA7XG5cbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS91c2Vycy8nICsgJHJvb3RTY29wZS51c2VyLmlkLCB1c2VyRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSA9PT0gJ1VwZGF0ZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc01vZGUgPSAndmlldyc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAtMTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hhbmdlIHVzZXIgdGh1bWJuYWlsXG4gICAgICAgICRzY29wZS5jaGFuZ2VUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9hcHAvYXBwL2hlYWRlci91c2VyLXRodW1ibmFpbC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlclRodW1ibmFpbEN0cmwnLFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uICh0aHVtYm5haWwpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudGh1bWJuYWlsID0gYW5ndWxhci5jb3B5KHRodW1ibmFpbCk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZpbGUubmFtZSA9ICd0aHVtYm5haWxfJyArICRyb290U2NvcGUudXNlci5pZCArICcucG5nJztcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe3VzZXJfaWQ6ICRyb290U2NvcGUudXNlci5pZH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIHVzZXIgdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgdXBsb2FkaW5nIHRoZSBmaWxlXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLmFkZFRvUXVldWUoZGF0YVVSSXRvQmxvYih0aHVtYm5haWwpKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkbG9nLmluZm8oJ01vZGFsIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2dvdXRcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWN0dWFsbHkgbG9nZ2luZyBvdXQhIC4uLicpO1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUG9wdWxhdGUgc2lkZSBuYXZpZ2F0aW9uXG4gICAgICAgICRzY29wZS5wb3B1bGF0ZVNpZGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS91c2Vycy9zaWRlTmF2aWdhdGlvbkRhdGEnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaWRlTmF2aWdhdGlvbkRhdGEgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUub3BlbkZ1bGxNZW51ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub0xpbmsgPSBmdW5jdGlvbihwYWdlLCBkYXRhLCByb2xlKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDA7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogcm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyb2xlLnJvbGUsIHJvbGUuaWQsIHRydWUsIHBhZ2UsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVXNlclRodW1ibmFpbEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKXtcbiAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICB9KTtcblxuICAgICRzY29wZS5zZXRUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH1cbiAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRmaWx0ZXIsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydCBTdGFydGVkJyk7XG5cbiAgICAgICAgdmFyIEF2YWlsYWJsZUV4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9leHBlcnRpc2UvYXZhaWxhYmxlJyk7XG5cbiAgICAgICAgdmFyIE1hdGNoaW5nRXhwZXJ0aXNlID0gJHJlc291cmNlKCcvYXBpL2V4cGVydGlzZS9tYXRjaGluZycsIHt9LCB7XG4gICAgICAgIFx0cXVlcnk6IHtcbiAgICAgICAgXHRcdG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIFx0XHRpc0FycmF5OiBmYWxzZVxuICAgICAgICBcdH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkUm9sZSA9ICdleHBlcnQnO1xuICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7IHJvbGU6IHJlcXVpcmVkUm9sZSB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgYWNjZXNzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZihtYXRjaGluZ1JvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgbWF0Y2hpbmdSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlID0gbWF0Y2hpbmdSb2xlc1swXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gcmVxdWlyZWRSb2xlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyZXF1aXJlZFJvbGUsIG1hdGNoaW5nUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWNjZXNzKSB7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIFx0QXZhaWxhYmxlRXhwZXJ0aXNlLnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdFx0Y29uc29sZS5sb2coJ0FsbCBhdmFpbGFibGUgZXhwZXJ0aXNlJyk7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdH0pO1xuXG4gICAgICAgIFx0TWF0Y2hpbmdFeHBlcnRpc2UucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnQWxsIG1hdGNoaW5nIGV4cGVydGlzZScpO1xuICAgICAgICBcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICBcdFx0JHNjb3BlLm1hdGNoaW5nRXhwZXJ0aXNlID0gcmVzdWx0LmV4cGVydGlzZTtcbiAgICAgICAgXHR9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0aXNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydGlzZSBTdGFydGVkJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZCk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICB2YXIgUHJvamVjdEV4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0LWV4cGVydGlzZS86ZXhwZXJ0aXNlSWQnLCB7XG4gICAgICAgIFx0ZXhwZXJ0aXNlSWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFByb2plY3RFeHBlcnRpc2UuZ2V0KHtleHBlcnRpc2VJZDogJHN0YXRlUGFyYW1zLmV4cGVydGlzZUlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdCRzY29wZS5leHBlcnRpc2UgPSByZXN1bHQ7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc3VibWl0QmlkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBiaWREYXRhID0ge1xuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAkc2NvcGUuZGF0YS5iaWRfZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvcHJvamVjdC1leHBlcnRpc2UvJyArICRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZCArICcvYmlkJywgYmlkRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2UuYmlkID0gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSG9tZSBWaWV3IFN0YXJ0ZWQnKTtcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgIC8vICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAvLyAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgIC8vICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgIC8vICAgICAgXHRjb250ZXN0SWQ6ICdAaWQnXG4gICAvLyAgICAgIH0pO1xuXG4gICAvLyAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgLy8gICAgICBcdCRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgIC8vICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAvLyAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAvLyAgICAgIH0pO1xuXG4gICAvLyAgICAgIC8vIFF1ZXJ5IEV4cGVydGlzZVxuXG4gICAvLyAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgLy8gICAgICAgICAgJHNjb3BlLmV4cGVydGlzZXMgPSByZXN1bHQuZGF0YTtcbiAgIC8vICAgICAgfSwgMjAwMCk7XG5cbiAgIC8vICAgICAgJHNjb3BlLmludmVzdG9ycyA9IFtcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQWxhaW4gQW1vcmV0dGknLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcxLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIElwc2EgZXZlbmlldCBkZXNlcnVudCBhZCBwYXJpYXR1ciBwcmFlc2VudGl1bSwgaW5jaWR1bnQgbW9sZXN0aWFlIGJlYXRhZSBxdWFtIHF1YXNpIHJlaWNpZW5kaXMgbW9sbGl0aWEgYWNjdXNhbnRpdW0gdm9sdXB0YXRlIHF1YWVyYXQgc2VxdWkgb2ZmaWNpYSBhIGZhY2VyZSByZXBlbGxhdCBhZGlwaXNjaS4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQ2hhcmxlcyBkXFwnYW50ZXJyb2NoZXMnLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcyLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGVkaXRhIGRpZ25pc3NpbW9zIG5lbW8sIHNlcXVpIGRvbG9yaWJ1cyBhY2N1c2FudGl1bSwgb2JjYWVjYXRpIG5hdHVzIGl1cmUgcXVhbSBlc3NlIGV4IGxhYm9yZSBuZXF1ZSBjb25zZXF1YXR1ciB2b2x1cHRhdGUgaW4sIG5paGlsIGVhLCBjdW0gcmVjdXNhbmRhZSB1dC4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQ2hyaXN0b3BoZSBCcmlzc2lhdWQnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzMuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwbGljYWJvIGVuaW0gb2ZmaWNpYSBvcHRpbyBkb2xvcnVtIGhhcnVtLCBzb2x1dGEgY3VscGEgdW5kZSB2ZW5pYW0gbm9iaXMgZW9zLCBkdWNpbXVzIHF1b2QgcHJhZXNlbnRpdW0gdmVyaXRhdGlzIGF0cXVlIG5vbiBub3N0cnVtIGlwc2FtLiBOb3N0cnVtLCBldCEnfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnSmVhbi1CZXJuYXJkIEFudG9pbmUnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzQuanBlZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIFF1aWEgcmVjdXNhbmRhZSBhbGlxdWlkIHF1b3MgYXBlcmlhbSBtb2xlc3RpYWUgcXVpYnVzZGFtIHF1aSBlb3MgaXVyZSBzYWVwZSBvcHRpbyB2aXRhZSBmdWdpdCB1bmRlIG5hbSwgYXRxdWUgZXhjZXB0dXJpIGRlc2VydW50IGVzdCwgcmVwZWxsYXQgYWxpYXMuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ1hhdmllciBQYXVsaW4nLCBjb3VudHJ5OiAnVGFpd2FuJywgaW1hZ2U6ICc1LmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEl1cmUgaW52ZW50b3JlIG5lc2NpdW50IGlsbHVtLCBwYXJpYXR1ciBtb2xlc3RpYXMgZGlnbmlzc2ltb3MgaXBzYSBpc3RlIGVzdC4gU2VkLCBhc3N1bWVuZGEgZG9sb3J1bT8gQWIgYmxhbmRpdGlpcyBxdWFzaSwgdm9sdXB0YXRlcyBpc3RlIGl1c3RvIHZlcm8gZGVzZXJ1bnQgc3VudC4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQ2luZHkgQ2h1bmcnLCBjb3VudHJ5OiAnSG9uZyBLb25nJywgaW1hZ2U6ICc2LmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEl1cmUgaW52ZW50b3JlIG5lc2NpdW50IGlsbHVtLCBwYXJpYXR1ciBtb2xlc3RpYXMgZGlnbmlzc2ltb3MgaXBzYSBpc3RlIGVzdC4gU2VkLCBhc3N1bWVuZGEgZG9sb3J1bT8gQWIgYmxhbmRpdGlpcyBxdWFzaSwgdm9sdXB0YXRlcyBpc3RlIGl1c3RvIHZlcm8gZGVzZXJ1bnQgc3VudC4nfVxuICAgLy8gICAgICBdO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05vdGlmaWNhdGlvbnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgRmROb3RpZmljYXRpb25zLmdldExhdGVzdE5vdGlmaWNhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQYWdlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc2NvcGUucGFnZSA9IHtcbiAgICAgICAgXHR0aXRsZTogJycsXG4gICAgICAgIFx0Y29udGVudDogJydcbiAgICAgICAgfTtcblxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcGFnZXMvJyArICRzdGF0ZVBhcmFtcy5zbHVnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcbiAgICAgICAgXHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdCRzY29wZS5wYWdlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXG5cdFx0XHRpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDQnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdsb2FkIDQwNCcpXG5cdFx0XHR9O1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdRdWlja1VwZGF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygncXVpY2t1cGRhdGUnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgXHRlZGl0TW9kZTogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgSW52ZXN0b3IgPSAkcmVzb3VyY2UoJy9hcGkvaW52ZXN0b3JzLzppbnZlc3RvcklkJywge1xuICAgICAgICAgICAgaW52ZXN0b3JJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQgPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgIFx0JHNjb3BlLmRhdGEuZWRpdE1vZGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5tb2RpZnlJbnZlc3RtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGludmVzdG9yRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaW52ZXN0bWVudF9idWRnZXQnOiAkcm9vdFNjb3BlLnVzZXIuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5lZGl0SW52ZXN0bWVudChmYWxzZSk7XG5cbiAgICAgICAgICAgIEludmVzdG9yLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgaW52ZXN0b3JJZDogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmlkXG4gICAgICAgICAgICB9LCBpbnZlc3RvckRhdGEpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUcmFuc2FjdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcblxuICAgIFx0Y29uc29sZS5sb2coJ1RyYW5zYWN0aW9uQ3RybCcpO1xuICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICBcdEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgIFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgIFx0fSwgMjAwMCk7XG5cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdHcmFiU2hhcmVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSW52ZXN0IFN0YXJ0ZWQnKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuTWF0aCA9IHdpbmRvdy5NYXRoO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcHJpbWFyeVNoYXJlTGlzdGluZzogbnVsbCxcbiAgICAgICAgICAgIHNob3dCaWROb3c6IGZhbHNlLFxuICAgICAgICAgICAgbXlCaWQ6IHtcbiAgICAgICAgICAgICAgICBiaWRfYW1vdW50OiAwLjcyLFxuICAgICAgICAgICAgICAgIG51bV9zaGFyZXM6IDEwLFxuICAgICAgICAgICAgICAgIHNhdmluZzogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBHZXQgYWxsIGxpc3RpbmdzXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQcmltYXJ5TGlzdGluZygpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvc2hhcmUtbGlzdGluZy8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUJpZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5teUJpZC5zYXZpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbXlCaWQgPSB7XG4gICAgICAgICAgICAgICAgJ3NoYXJlX2xpc3RpbmdfaWQnOiAkc2NvcGUuZGF0YS5wcmltYXJ5U2hhcmVMaXN0aW5nLmlkLFxuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEubXlCaWQuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnbnVtX3NoYXJlcyc6ICRzY29wZS5kYXRhLm15QmlkLm51bV9zaGFyZXNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvc2hhcmUtYmlkcycsIG15QmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0JpZE5vdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
