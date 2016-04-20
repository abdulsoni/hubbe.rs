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

            var countryCode = 1;

            if (typeof($scope.data.twoFA.countryCode.code) !== 'undefined') {
                countryCode = $scope.data.twoFA.countryCode.code;
            }else{
                countryCode = $scope.data.twoFA.countryCode;
            }

            var verificationData = {
                via: 'sms',
                country_code: parseInt(countryCode),
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

            var countryCode = 1;

            if (typeof($scope.data.twoFA.countryCode.code) !== 'undefined') {
                countryCode = $scope.data.twoFA.countryCode.code;
            }else{
                countryCode = $scope.data.twoFA.countryCode;
            }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJjb25maWcvZmxvdy5qcyIsImNvbmZpZy9sYWRkYS5qcyIsImRpcmVjdGl2ZXMvY2hhcnRzLmpzIiwiZGlyZWN0aXZlcy9sb2FkZXIuZGlyZWN0aXZlLmpzIiwiZGlyZWN0aXZlcy9tZXNzZW5nZXIuanMiLCJkaXJlY3RpdmVzL21pbk1heC5qcyIsImRpcmVjdGl2ZXMvbWlzYy5qcyIsImRpcmVjdGl2ZXMvcHJvZmlsZUZpZWxkLmpzIiwiZmlsdGVycy9zdHJpcEh0bWwuanMiLCJzZXJ2aWNlcy9ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9zY3JvbGxlci5zZXJ2aWNlLmpzIiwidmFsdWVzL2NvdW50cmllcy5qcyIsInZhbHVlcy9jb3VudHJ5Q29kZXMuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2NyZWF0ZS9jcmVhdGUuanMiLCJhcHAvZXhwZXJ0L2V4cGVydC5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuanMiLCJhcHAvaG9tZS9ob21lLmpzIiwiYXBwL2ludmVzdC9ncmFiU2hhcmUuanMiLCJhcHAvaW52ZXN0L2ludmVzdC5qcyIsImFwcC9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbnMuanMiLCJhcHAvcGFnZS9wYWdlLmpzIiwiYXBwL3F1aWNrLXVwZGF0ZS9xdWljay11cGRhdGUuanMiLCJhcHAvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUEscUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBLENBQUEsMkJBQUEseUJBQUEsZUFBQSxRQUFBLGlCQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBOzs7QUNsQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHFFQUFBLFNBQUEsZ0JBQUEsb0JBQUEsbUJBQUE7Ozs7O1FBS0EsSUFBQSxVQUFBLFNBQUEsVUFBQSxlQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLGFBQUE7Z0JBQ0EsZ0JBQUE7OztZQUdBLE9BQUEscUJBQUEsV0FBQSxNQUFBLGdCQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOztvQkFFQSxZQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7O29CQUVBLGFBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsZUFBQTt3QkFDQSxhQUFBLFFBQUEsaUJBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsYUFBQTt3QkFDQSxhQUFBLFFBQUEsZ0JBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsTUFBQTs7O2FBR0EsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsVUFBQTs7YUFFQSxNQUFBLGtCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsbUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxtQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG9CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsb0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxxQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLFlBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzthQWlCQSxNQUFBLGdCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsV0FBQTt3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TUFDQSxVQUFBO01BQ0EsU0FBQTtNQUNBLE1BQUEsVUFBQSxPQUFBLE1BQUEsTUFBQSxNQUFBO09BQ0EsTUFBQSxPQUFBLEtBQUEsT0FBQSxZQUFBO1FBQ0EsS0FBQSxjQUFBLEtBQUE7O09BRUEsSUFBQSxlQUFBLFVBQUEsT0FBQTtvQkFDQSxRQUFBLElBQUE7UUFDQSxJQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUEsVUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLFFBQUEsSUFBQSxDQUFBLFFBQUEsVUFBQSxRQUFBO1FBQ0EsSUFBQSxDQUFBLFFBQUEsVUFBQSxRQUFBLEtBQUE7U0FDQSxLQUFBLGFBQUEsU0FBQTtTQUNBLE9BQUE7ZUFDQTtTQUNBLEtBQUEsYUFBQSxTQUFBO1NBQ0EsT0FBQTs7OztPQUlBLEtBQUEsU0FBQSxLQUFBO09BQ0EsS0FBQSxZQUFBLEtBQUE7Ozs7O0lBS0EsUUFBQSxPQUFBLHVCQUFBLFVBQUEsU0FBQSxZQUFBO0tBQ0EsT0FBQTtNQUNBLFVBQUE7TUFDQSxTQUFBO01BQ0EsTUFBQSxVQUFBLE9BQUEsTUFBQSxNQUFBLE1BQUE7T0FDQSxNQUFBLE9BQUEsS0FBQSxPQUFBLFlBQUE7UUFDQSxLQUFBLGNBQUEsS0FBQTs7T0FFQSxJQUFBLGVBQUEsVUFBQSxPQUFBO29CQUNBLFFBQUEsSUFBQTtRQUNBLElBQUEsTUFBQSxNQUFBLE1BQUEsS0FBQSxVQUFBO29CQUNBLFFBQUEsSUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBLENBQUEsUUFBQSxVQUFBLFFBQUE7UUFDQSxJQUFBLENBQUEsUUFBQSxVQUFBLFFBQUEsS0FBQTtTQUNBLEtBQUEsYUFBQSxTQUFBO1NBQ0EsT0FBQTtlQUNBO1NBQ0EsS0FBQSxhQUFBLFNBQUE7U0FDQSxPQUFBOzs7O09BSUEsS0FBQSxTQUFBLEtBQUE7T0FDQSxLQUFBLFlBQUEsS0FBQTs7Ozs7O0FDNURBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx1QkFBQSxPQUFBLGVBQUEsQ0FBQSxRQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxLQUFBLFlBQUE7Ozs7O0FDTEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHVCQUFBLFVBQUEsMkNBQUEsU0FBQSxVQUFBLFVBQUE7O1FBRUEsT0FBQTtZQUNBLFVBQUE7WUFDQSxPQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxVQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsU0FBQTtnQkFDQSxhQUFBO2dCQUNBLGVBQUE7Z0JBQ0EsZUFBQTs7O1lBR0EsNkNBQUEsU0FBQSxRQUFBLFVBQUEsUUFBQTtnQkFDQSxPQUFBLFlBQUE7Z0JBQ0EsT0FBQSxhQUFBOztnQkFFQSxPQUFBLGFBQUE7Z0JBQ0EsT0FBQSxhQUFBOztnQkFFQSxPQUFBLG9CQUFBOztnQkFFQSxPQUFBLGVBQUEsU0FBQSxNQUFBO2lCQUNBLE9BQUEsVUFBQTs7O1lBR0EsTUFBQSxTQUFBLFFBQUEsVUFBQSxRQUFBO2dCQUNBLElBQUEsU0FBQTtvQkFDQSxRQUFBO29CQUNBLFlBQUE7Ozs7O2dCQUtBLElBQUEsUUFBQSxPQUFBLE9BQUE7O2dCQUVBLElBQUEsb0JBQUE7O2dCQUVBLElBQUEsT0FBQSxTQUFBLFlBQUE7aUJBQ0Esb0JBQUE7aUJBQ0E7aUJBQ0E7aUJBQ0E7OztnQkFHQSxJQUFBO2lCQUNBO2lCQUNBO2lCQUNBO2tCQUNBO2tCQUNBO2lCQUNBOztnQkFFQSxTQUFBLEtBQUEsU0FBQSxVQUFBOzs7Ozs7OztBQzFEQSxDQUFBLFdBQUE7SUFDQTs7Q0FFQSxRQUFBLE9BQUEsb0JBQUEsT0FBQSxhQUFBLFdBQUE7S0FDQSxPQUFBLFNBQUEsTUFBQTs7R0FFQSxJQUFBLE9BQUEsVUFBQSxhQUFBO0lBQ0EsSUFBQSxLQUFBLElBQUEsT0FBQSxPQUFBLGFBQUEsTUFBQTtJQUNBLE9BQUEsT0FBQSxNQUFBLFFBQUEsSUFBQTtJQUNBLE9BQUEsS0FBQSxRQUFBLGlCQUFBO0lBQ0EsT0FBQSxLQUFBLFFBQUEsV0FBQTs7O09BR0EsT0FBQSxP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WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHVCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwwQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsa0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw0QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5Q0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsa0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxzQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHFCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsK0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsb0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHFDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw2QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDJDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsc0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHFDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDBCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw4Q0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxtQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsbUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsb0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsc0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw2QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9DQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsbUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnREFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwwQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0NBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHVCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDRCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsd0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsd0NBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDJCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsd0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7Ozs7O0FDdFBBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxNQUFBLGdCQUFBLFdBQUE7UUFDQSxPQUFBO1lBQ0EsRUFBQSxNQUFBLEtBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsS0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLEtBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxN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QUFBLFFBQUEsS0FBQTtZQUNBLEdBQUEsS0FBQSxXQUFBLFdBQUE7OztRQUdBLE9BQUEsSUFBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUE7OztJQUdBLFFBQUEsT0FBQSx1QkFBQSxVQUFBLFdBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxPQUFBLEVBQUEsU0FBQTtZQUNBLE1BQUEsU0FBQSxPQUFBLE1BQUEsTUFBQTtnQkFDQSxRQUFBLElBQUEsTUFBQTs7Z0JBRUEsR0FBQSxNQUFBLFFBQUE7b0JBQ0EsS0FBQSxHQUFBOzs7Ozs7O0lBT0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsb0tBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBLFVBQUEsT0FBQSxXQUFBLFlBQUEsU0FBQSxjQUFBLFdBQUEsY0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7O1FBR0EsT0FBQSxhQUFBO1lBQ0EsU0FBQTtZQUNBLFFBQUE7WUFDQSxVQUFBOzs7UUFHQSxPQUFBLGlCQUFBLFNBQUEsUUFBQTtZQUNBLFdBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7O1FBR0EsT0FBQSxZQUFBO1FBQ0EsT0FBQSxlQUFBOztRQUVBLFFBQUEsSUFBQTtRQUNBLFFBQUEsSUFBQSxPQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsUUFBQSxJQUFBLE9BQUE7O1FBRUEsT0FBQSxlQUFBO1lBQ0EsQ0FBQSxNQUFBLCtCQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsOEJBQUEsT0FBQTs7O1FBR0EsT0FBQSxPQUFBO1lBQ0EsY0FBQTtZQUNBLFNBQUE7WUFDQSxlQUFBO1lBQ0Esa0JBQUE7WUFDQSxhQUFBO1lBQ0EsZUFBQTtnQkFDQSxNQUFBO2dCQUNBLFNBQUE7O1lBRUEsa0JBQUE7WUFDQSxPQUFBOzs7UUFHQSxJQUFBLFVBQUEsTUFBQTs7UUFFQSxXQUFBLFdBQUE7O1FBRUEsT0FBQSxhQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxPQUFBLFdBQUEsT0FBQSxLQUFBOzs7UUFHQSxPQUFBLGNBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxJQUFBLENBQUEsT0FBQSxLQUFBLGNBQUEsT0FBQSxLQUFBLGNBQUEsS0FBQTs7O1FBR0EsT0FBQSxzQkFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLEtBQUEsQ0FBQSxLQUFBLE9BQUEsS0FBQSxjQUFBLE9BQUEsS0FBQSxlQUFBLE1BQUE7OztRQUdBLE9BQUEsWUFBQTtRQUNBLE9BQUEsbUJBQUE7UUFDQSxPQUFBLFdBQUE7UUFDQSxPQUFBLGFBQUE7O1FBRUEsV0FBQSxPQUFBLFFBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLFVBQUEsYUFBQTtZQUNBLElBQUEsS0FBQSxjQUFBLEdBQUEsT0FBQSxHQUFBOztZQUVBLE9BQUEsS0FBQSxRQUFBLEtBQUE7V0FDQTs7UUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQTtZQUNBLElBQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7WUFHQSxJQUFBLElBQUEsY0FBQSxjQUFBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO21CQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsTUFBQTs7O1lBR0EsSUFBQSxTQUFBLElBQUE7O1lBRUEsSUFBQSxLQUFBLEtBQUEsUUFBQSxZQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLE9BQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUE7bUJBQ0E7Z0JBQ0EsT0FBQSxhQUFBOzs7WUFHQSxPQUFBLFdBQUEsS0FBQTs7WUFFQSxPQUFBLFNBQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsT0FBQSxTQUFBLFFBQUE7b0JBQ0EsUUFBQSxJQUFBLElBQUEsT0FBQTtvQkFDQSxPQUFBLFlBQUEsSUFBQSxPQUFBOzs7O1lBSUEsSUFBQSxNQUFBO2dCQUNBLE9BQUEsY0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGdDQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOzs7UUFHQSxFQUFBLFVBQUEsR0FBQSxhQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOztZQUVBLE9BQUEsT0FBQSxXQUFBO2dCQUNBLE9BQUEsV0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1lBQ0EsTUFBQTtZQUNBLE1BQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7O1FBSUEsRUFBQSxVQUFBLEdBQUEsVUFBQSxjQUFBLFNBQUEsR0FBQTtZQUNBLGlCQUFBLEdBQUE7OztRQUdBLEVBQUEsVUFBQSxHQUFBLFFBQUEsb0JBQUEsU0FBQSxHQUFBO1lBQ0EsaUJBQUEsR0FBQTs7O1FBR0EsT0FBQSxXQUFBLElBQUEsYUFBQTtZQUNBLEtBQUE7WUFDQSxtQkFBQTs7O1FBR0EsT0FBQSxlQUFBLFVBQUE7WUFDQSxJQUFBLFFBQUEsT0FBQSxLQUFBOztZQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7Z0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7Z0JBRUEsS0FBQSxXQUFBO2dCQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtnQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOztnQkFFQSxPQUFBLEtBQUEsZUFBQTs7O1lBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxVQUFBLGFBQUE7b0JBQ0EsT0FBQSxLQUFBLGVBQUE7cUJBQ0E7b0JBQ0EsT0FBQSxLQUFBLGFBQUE7Ozs7WUFJQSxPQUFBLFNBQUEsV0FBQSxjQUFBO1lBQ0EsT0FBQSxTQUFBOzs7Ozs7UUFNQSxPQUFBLFlBQUEsVUFBQSxjQUFBOztRQUVBLE9BQUEsd0JBQUE7O1FBRUEsU0FBQSx5QkFBQTtZQUNBLElBQUEsd0JBQUEsQ0FBQSxtQkFBQSxRQUFBLGdCQUFBLENBQUEsUUFBQTs7WUFFQSxJQUFBLE9BQUEsc0JBQUEsU0FBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxzQkFBQSxRQUFBOzs7O1lBSUEsUUFBQSxJQUFBLE9BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsSUFBQSxPQUFBLHNCQUFBLFNBQUEsTUFBQSxzQkFBQSxzQkFBQSxRQUFBLHNCQUFBLGVBQUEsV0FBQSxJQUFBO2dCQUNBLE9BQUEsc0JBQUEsS0FBQTtvQkFDQSx1QkFBQTtvQkFDQSwwQkFBQTtvQkFDQSxlQUFBO29CQUNBLFlBQUE7b0JBQ0EsMkJBQUE7b0JBQ0Esd0JBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtvQkFDQSw4QkFBQTtvQkFDQSwyQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO29CQUNBLG1CQUFBO29CQUNBLGdCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7b0JBQ0EsZ0JBQUE7b0JBQ0EsYUFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO29CQUNBLE1BQUE7b0JBQ0EsU0FBQTs7YUFFQTs7WUFFQSxPQUFBLHVCQUFBLE9BQUEsc0JBQUEsU0FBQTs7O1FBR0EsT0FBQSwwQkFBQSxTQUFBLE9BQUEsbUJBQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLDBCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLG1CQUFBOzs7O1FBSUEsT0FBQSw0QkFBQSxTQUFBLEdBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsNkJBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsdUJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwwQkFBQSxTQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7O1FBSUEsT0FBQSwrQkFBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7O1FBSUEsT0FBQSxrQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7WUFDQSxPQUFBLGdCQUFBO1lBQ0E7OztRQUdBLE9BQUEsb0JBQUEsU0FBQSxHQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7WUFDQSxFQUFBLGdCQUFBOzs7UUFHQSxPQUFBLHFCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTs7WUFFQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGVBQUEsU0FBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0E7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7OztRQUdBLE9BQUEsV0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsYUFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUE7O1lBRUEsSUFBQSxPQUFBLGdCQUFBLGFBQUE7Z0JBQ0EsT0FBQSxXQUFBLFNBQUE7OztZQUdBLE9BQUE7OztRQUdBLE9BQUEsY0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLEdBQUEsQ0FBQSxPQUFBLFNBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLEtBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLE9BQUE7OztRQUdBLE9BQUEsZ0JBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxRQUFBLFNBQUE7Z0JBQ0EsT0FBQSxDQUFBLFFBQUEsT0FBQSxRQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsYUFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsYUFBQSxRQUFBLEtBQUEsT0FBQSxzQkFBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGNBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7O1FBR0EsT0FBQSx5QkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsd0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsNkJBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHdCQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLFVBQUE7Ozs7UUFJQSxPQUFBLDRCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsMkJBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsNkJBQUEsT0FBQSxzQkFBQSxPQUFBLDBCQUFBLElBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDJCQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLFVBQUE7Ozs7UUFJQSxPQUFBLHFCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxVQUFBOztZQUVBLE1BQUEsSUFBQSw2QkFBQSxPQUFBLHNCQUFBLE9BQUEsNkJBQUEsSUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsZ0JBQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTtlQUNBOzs7UUFHQSxPQUFBLGtCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxhQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLFVBQUE7O1lBRUEsTUFBQSxJQUFBLG9CQUFBLE9BQUEsc0JBQUEsT0FBQSxrQkFBQSxLQUFBLFlBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGFBQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTtlQUNBOzs7UUFHQTs7OztRQUlBLE9BQUEsZ0JBQUEsVUFBQTtZQUNBLElBQUEsV0FBQTtnQkFDQSxNQUFBLE9BQUEsS0FBQTtnQkFDQSxXQUFBLE9BQUEsS0FBQTtnQkFDQSxNQUFBLE9BQUEsS0FBQTtnQkFDQSxVQUFBLE9BQUEsS0FBQTtnQkFDQSxnQkFBQSxPQUFBLEtBQUE7Z0JBQ0EsbUJBQUEsT0FBQSxLQUFBO2dCQUNBLGdCQUFBLE9BQUEsS0FBQTtnQkFDQSw2QkFBQSxPQUFBLEtBQUEseUJBQUE7Z0JBQ0EsY0FBQSxPQUFBLEtBQUEsWUFBQTs7O1lBR0EsT0FBQSxPQUFBLEtBQUE7Z0JBQ0EsS0FBQTtvQkFDQSxJQUFBLG1CQUFBLE9BQUEsS0FBQTs7b0JBRUEsSUFBQSxxQkFBQSxTQUFBO3dCQUNBLG1CQUFBLE9BQUEsS0FBQTs7b0JBRUEsU0FBQSxXQUFBO29CQUNBLFNBQUEsU0FBQSxvQkFBQTtvQkFDQSxTQUFBLFNBQUEsa0JBQUEsT0FBQSxLQUFBO29CQUNBLFNBQUEsU0FBQSxvQkFBQSxPQUFBLEtBQUE7Z0JBQ0E7Z0JBQ0EsS0FBQTtvQkFDQSxTQUFBLFVBQUE7Z0JBQ0E7Z0JBQ0EsS0FBQTtvQkFDQSxTQUFBLFNBQUEsRUFBQSxNQUFBOztvQkFFQSxRQUFBLFFBQUEsT0FBQSx1QkFBQSxTQUFBLGtCQUFBO3dCQUNBLElBQUEsa0JBQUEsc0JBQUEsUUFBQSxrQkFBQSxlQUFBLFdBQUEsR0FBQTs0QkFDQSxRQUFBLElBQUEsa0JBQUE7NEJBQ0EsUUFBQSxJQUFBLGtCQUFBOzRCQUNBLFNBQUEsT0FBQSxLQUFBLEtBQUE7Z0NBQ0Esb0JBQUEsa0JBQUE7Z0NBQ0EsMEJBQUEsa0JBQUE7Z0NBQ0Esd0JBQUEsa0JBQUE7Z0NBQ0EsOEJBQUEsa0JBQUE7Z0NBQ0EsV0FBQSxrQkFBQTtnQ0FDQSxpQkFBQSxrQkFBQTtnQ0FDQSxRQUFBLGtCQUFBOzt5QkFFQTs7Z0JBRUE7OztZQUdBLFdBQUEsV0FBQTtZQUNBLFdBQUE7O1lBRUEsTUFBQSxJQUFBLGdCQUFBLFdBQUEsS0FBQSxJQUFBLFVBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxPQUFBLFNBQUEsV0FBQTtvQkFDQSxXQUFBLEtBQUEsT0FBQSxPQUFBLEtBQUE7b0JBQ0EsV0FBQSxLQUFBLFlBQUEsT0FBQSxLQUFBO29CQUNBLFdBQUEsS0FBQSxPQUFBLE9BQUEsS0FBQTtvQkFDQSxXQUFBLEtBQUEsYUFBQTtvQkFDQSxXQUFBLHdCQUFBOztvQkFFQSxXQUFBLGFBQUEsT0FBQSxLQUFBO29CQUNBLE9BQUEsR0FBQTs7b0JBRUEsV0FBQSxlQUFBLE9BQUEsS0FBQSxjQUFBLE1BQUE7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsV0FBQSxXQUFBOzs7Ozs7OztBQ3plQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSwrR0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsV0FBQSxPQUFBLFVBQUEsU0FBQTs7UUFFQSxPQUFBLFdBQUE7UUFDQSxXQUFBLFdBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsNEJBQUE7WUFDQSxXQUFBOzs7UUFHQSxRQUFBLFFBQUEsU0FBQSxLQUFBLFNBQUEsUUFBQTtZQUNBLE9BQUEsV0FBQTtZQUNBLE9BQUEsa0JBQUE7WUFDQSxPQUFBLGtCQUFBOztZQUVBLElBQUEsV0FBQSxlQUFBLGFBQUEsT0FBQSxXQUFBLEtBQUEsYUFBQSxhQUFBO2dCQUNBLElBQUEsSUFBQSxPQUFBLFdBQUEsS0FBQSxRQUFBLGdCQUFBO29CQUNBLElBQUEsYUFBQSxXQUFBLEtBQUEsUUFBQSxnQkFBQTtvQkFDQSxJQUFBLFVBQUEsUUFBQSxVQUFBLFFBQUEsQ0FBQSxJQUFBLGFBQUEsTUFBQTs7b0JBRUEsSUFBQSxPQUFBLGFBQUEsYUFBQTt3QkFDQSxPQUFBLGdCQUFBLEtBQUE7O3dCQUVBLElBQUEsV0FBQSxPQUFBLFNBQUEsUUFBQTt3QkFDQSxRQUFBLElBQUEsZ0JBQUE7d0JBQ0EsT0FBQSxTQUFBLE9BQUEsVUFBQTs7O2tCQUdBLEdBQUEsV0FBQSxlQUFBLFVBQUEsV0FBQSxLQUFBLFFBQUEsU0FBQSxFQUFBO2dCQUNBLElBQUEsSUFBQSxNQUFBLFdBQUEsS0FBQSxRQUFBO29CQUNBLElBQUEsYUFBQSxXQUFBLEtBQUEsUUFBQSxJQUFBOztvQkFFQSxJQUFBLFVBQUEsUUFBQSxVQUFBLFFBQUEsQ0FBQSxJQUFBLGFBQUEsTUFBQTs7b0JBRUEsSUFBQSxPQUFBLGFBQUEsYUFBQTt3QkFDQSxPQUFBLGdCQUFBLEtBQUE7Ozs7V0FJQSxRQUFBLFdBQUE7WUFDQSxTQUFBLFdBQUE7Z0JBQ0EsV0FBQSxXQUFBO2VBQ0E7Ozs7SUFJQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxXQUFBLFlBQUE7UUFDQSxPQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7WUFDQSxRQUFBLEtBQUEsb0JBQUEsVUFBQSxPQUFBO2dCQUNBLEdBQUEsTUFBQSxVQUFBLElBQUE7b0JBQ0EsTUFBQSxPQUFBLFdBQUE7d0JBQ0EsTUFBQSxNQUFBLE1BQUE7OztvQkFHQSxNQUFBOzs7Ozs7SUFNQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSwrSUFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsV0FBQSxTQUFBLFVBQUEsWUFBQSxPQUFBLFVBQUE7UUFDQSxPQUFBLFlBQUEsYUFBQTtRQUNBLE9BQUEsT0FBQTtZQUNBLHdCQUFBO1lBQ0EsVUFBQTtZQUNBLGNBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxlQUFBOztZQUVBLGVBQUE7WUFDQSxRQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxZQUFBO2dCQUNBLFFBQUE7Ozs7UUFJQSxJQUFBLFVBQUEsVUFBQSw0QkFBQTtZQUNBLFdBQUE7OztRQUdBLElBQUEsUUFBQSxVQUFBLHlCQUFBO1lBQ0EsU0FBQTtXQUNBO1lBQ0EsbUJBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxLQUFBO2dCQUNBLFNBQUE7O1lBRUEsY0FBQTtnQkFDQSxRQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsU0FBQTs7WUFFQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxTQUFBOzs7O1FBSUEsSUFBQSxjQUFBLFVBQUEscUNBQUEsVUFBQTtZQUNBLGVBQUE7V0FDQTtZQUNBLFFBQUE7Z0JBQ0EsUUFBQTs7OztRQUlBLFdBQUE7UUFDQSxXQUFBLFdBQUE7O1FBRUEsT0FBQSxlQUFBLFdBQUE7WUFDQSxXQUFBLFVBQUEsbUJBQUE7WUFDQSxPQUFBLEtBQUEseUJBQUE7OztRQUdBLE9BQUEsZUFBQSxXQUFBO1lBQ0EsV0FBQTtZQUNBLE9BQUEsS0FBQSx5QkFBQTs7O1FBR0EsUUFBQSxJQUFBO1lBQ0EsV0FBQSxPQUFBO1dBQ0EsU0FBQSxLQUFBLFNBQUEsUUFBQTtZQUNBLE9BQUEsVUFBQTs7WUFFQSxJQUFBLFlBQUEsUUFBQSxVQUFBLFdBQUEsS0FBQSxTQUFBO2dCQUNBLFlBQUEsT0FBQTtnQkFDQSxRQUFBOzs7WUFHQSxJQUFBLG1CQUFBLFFBQUEsVUFBQSxXQUFBLEtBQUEsU0FBQTtnQkFDQSxZQUFBLE9BQUE7Z0JBQ0EsUUFBQTs7O1lBR0EsSUFBQSxhQUFBLFFBQUEsVUFBQSxXQUFBLEtBQUEsWUFBQTtnQkFDQSxZQUFBLE9BQUE7Z0JBQ0EsUUFBQTs7O1lBR0EsSUFBQSxvQkFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUE7Z0JBQ0EsWUFBQSxPQUFBO2dCQUNBLFFBQUE7OztZQUdBLElBQUEsT0FBQSxlQUFBLGFBQUE7Z0JBQ0EsSUFBQSxVQUFBLFNBQUEsTUFBQSxXQUFBLGVBQUEsVUFBQSxXQUFBLGVBQUEsWUFBQTtvQkFDQSxXQUFBLGFBQUEsU0FBQSxPQUFBO29CQUNBLFdBQUEsYUFBQSxTQUFBLFlBQUEsT0FBQTs7b0JBRUEsV0FBQSxhQUFBLFNBQUEsVUFBQSxXQUFBO3dCQUNBLE9BQUEsR0FBQSxlQUFBOzRCQUNBLE1BQUE7NEJBQ0EsV0FBQSxPQUFBOzs7dUJBR0EsR0FBQSxXQUFBLGVBQUEsVUFBQSxVQUFBLFNBQUEsR0FBQTtvQkFDQSxPQUFBLEtBQUEsd0JBQUE7b0JBQ0EsT0FBQSxZQUFBLFdBQUE7Ozs7WUFJQSxJQUFBLE9BQUEsc0JBQUEsYUFBQTtnQkFDQSxJQUFBLGlCQUFBLFNBQUEsR0FBQTtvQkFDQSxPQUFBLEtBQUEsc0JBQUE7Ozs7WUFJQSxJQUFBLE9BQUEsZ0JBQUEsYUFBQTtnQkFDQSxJQUFBLFdBQUEsU0FBQSxLQUFBLFdBQUEsZUFBQSxXQUFBO29CQUNBLE9BQUEsS0FBQSw2QkFBQTtvQkFDQSxPQUFBLFlBQUEsV0FBQTs7OztZQUlBLElBQUEsT0FBQSx1QkFBQSxhQUFBO2dCQUNBLElBQUEsa0JBQUEsU0FBQSxHQUFBO29CQUNBLE9BQUEsS0FBQSwyQkFBQTs7OztXQUlBLFFBQUEsV0FBQTtZQUNBLFNBQUEsV0FBQTtnQkFDQSxXQUFBLFdBQUE7ZUFDQTs7O1FBR0EsT0FBQSxjQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUE7Z0JBQ0EsS0FBQTtvQkFDQSxNQUFBLGFBQUE7d0JBQ0EsV0FBQSxPQUFBO3dCQUNBLFNBQUEsV0FBQSxLQUFBO3VCQUNBLFNBQUEsS0FBQSxTQUFBLE9BQUE7d0JBQ0EsT0FBQSxRQUFBLFVBQUEsUUFBQSxLQUFBOztvQkFFQTtnQkFDQSxLQUFBO29CQUNBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLFlBQUE7O29CQUVBLElBQUEsTUFBQSxTQUFBLEdBQUE7d0JBQ0EsSUFBQSxVQUFBLE1BQUE7O3dCQUVBLE1BQUEsa0JBQUE7NEJBQ0EsV0FBQSxPQUFBOzRCQUNBLFdBQUEsUUFBQTsyQkFDQSxTQUFBLEtBQUEsU0FBQSxPQUFBOzRCQUNBLE9BQUEsUUFBQSxVQUFBLFFBQUEsS0FBQTs7O29CQUdBOzs7O1FBSUEsT0FBQSxjQUFBLFNBQUEsT0FBQTtZQUNBLE9BQUEsS0FBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGdCQUFBOztZQUVBLFdBQUEsVUFBQTs7WUFFQSxJQUFBLFVBQUE7O1lBRUEsSUFBQSxXQUFBLGVBQUEsUUFBQTtnQkFDQSxVQUFBLFdBQUEsS0FBQTs7O1lBR0EsSUFBQSxZQUFBLE1BQUE7Z0JBQ0EsTUFBQSxJQUFBLGtCQUFBLE1BQUEsS0FBQSxZQUFBLFNBQUEsS0FBQSxTQUFBLE9BQUE7b0JBQ0EsT0FBQSxLQUFBLGdCQUFBLE9BQUE7b0JBQ0EsT0FBQSxLQUFBLGNBQUEsU0FBQSxPQUFBLEtBQUE7O29CQUVBLE9BQUEsS0FBQSxjQUFBLFVBQUE7d0JBQ0E7d0JBQ0E7d0JBQ0E7OztvQkFHQSxTQUFBLFVBQUE7d0JBQ0EsRUFBQSxZQUFBLFFBQUEsQ0FBQSxXQUFBO3VCQUNBOztpQkFFQTtnQkFDQSxNQUFBLElBQUE7b0JBQ0EsU0FBQSxNQUFBO21CQUNBLFNBQUEsS0FBQSxTQUFBLFFBQUE7b0JBQ0EsT0FBQSxLQUFBLGdCQUFBO29CQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUE7d0JBQ0E7d0JBQ0E7d0JBQ0E7OztvQkFHQSxTQUFBLFVBQUE7d0JBQ0EsRUFBQSxZQUFBLFFBQUEsQ0FBQSxXQUFBO3VCQUNBOzs7Ozs7UUFNQSxPQUFBLGVBQUEsU0FBQSxNQUFBO1lBQ0EsSUFBQSxXQUFBLE9BQUEsS0FBQSxjQUFBO1lBQ0EsSUFBQSxZQUFBO1lBQ0EsSUFBQSxlQUFBOztZQUVBLElBQUEsSUFBQSxNQUFBLFNBQUE7Z0JBQ0EsSUFBQSxPQUFBLFNBQUE7Z0JBQ0EsVUFBQSxLQUFBLEtBQUE7O2dCQUVBLElBQUEsS0FBQSxRQUFBLEtBQUEsS0FBQTtvQkFDQSxlQUFBOzs7O1lBSUEsU0FBQSxVQUFBLFdBQUE7OztRQUdBLE9BQUEsSUFBQSxtQkFBQSxVQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTs7O1FBR0EsT0FBQSxtQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsUUFBQSxJQUFBLG9CQUFBLFFBQUEsS0FBQTtZQUNBLE1BQUEsU0FBQSxRQUFBLEtBQUE7Ozs7Ozs7OztZQVNBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxLQUFBLGFBQUEsY0FBQSxLQUFBO29CQUNBLElBQUEsUUFBQSxLQUFBO29CQUNBLFNBQUE7Ozs7OztRQU1BLE9BQUEsa0JBQUEsU0FBQSxNQUFBLE9BQUE7Ozs7Ozs7O1lBUUEsSUFBQSxRQUFBLE9BQUEsS0FBQSxhQUFBLGNBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLE9BQUE7OztZQUdBLElBQUEsYUFBQSxNQUFBLE1BQUEsUUFBQTtZQUNBLElBQUEsZUFBQSxDQUFBLEdBQUE7Z0JBQ0EsUUFBQSxJQUFBLHNCQUFBO2dCQUNBLE1BQUEsTUFBQSxPQUFBLFlBQUE7OztZQUdBLFFBQUEsSUFBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUEsS0FBQSxhQUFBOzs7UUFHQSxPQUFBLGVBQUEsV0FBQTtZQUNBLFdBQUEsVUFBQTs7WUFFQSxPQUFBLEtBQUEsZ0JBQUE7WUFDQSxPQUFBLEtBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxnQkFBQTs7WUFFQSxPQUFBLEtBQUEsYUFBQSxjQUFBLE9BQUEsUUFBQSxRQUFBLE9BQUEsUUFB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QUEsUUFBQTtnQkFDQSxPQUFBLFlBQUE7Z0JBQ0EsT0FBQSxLQUFBLG9CQUFBOzs7O1FBSUEsT0FBQSxlQUFBLFdBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxJQUFBLFVBQUEsUUFBQSxLQUFBLE9BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsSUFBQSxPQUFBLE9BQUEsYUFBQSxhQUFBO2dCQUNBLFFBQUEsT0FBQTtvQkFDQSxXQUFBLE9BQUEsUUFBQTttQkFDQSxTQUFBLFNBQUEsS0FBQSxTQUFBLFFBQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLFFBQUEsSUFBQTs7Ozs7O1FBTUEsV0FBQTs7O0lBR0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsbUdBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsWUFBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxlQUFBOzs7UUFHQSxPQUFBLFVBQUE7WUFDQSxNQUFBO1lBQ0EsV0FBQTs7O1FBR0EsT0FBQSxPQUFBLFdBQUEsU0FBQSxTQUFBO1lBQ0EsSUFBQSxZQUFBLE1BQUE7Z0JBQ0EsV0FBQSxXQUFBO2dCQUNBLE9BQUEsVUFBQTttQkFDQTtnQkFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBLElBQUEsbUJBQUEsU0FBQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE1BQUE7WUFDQSxRQUFBLElBQUE7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLFFBQUEsSUFBQSxvQkFBQSxRQUFBLEtBQUE7WUFDQSxPQUFBLFFBQUEsZUFBQSxRQUFBLEtBQUE7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQSxRQUFBLE9BQUEsUUFBQSxjQUFBLFFBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxRQUFBLGNBQUEsS0FBQSxRQUFBLEtBQUE7Ozs7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QSxTQUFBO29CQUNBLE9BQUEsS0FBQSxNQUFBLFdBQUE7b0JBQ0EsT0FBQSxLQUFBLE1BQUEsU0FBQTtvQkFDQSxXQUFBLEtBQUEsaUJBQUE7Ozs7O1FBS0EsT0FBQSxnQkFBQSxTQUFBLFVBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQSxVQUFBLFVBQUE7O1lBRUEsTUFBQSxhQUFBLFVBQUEsS0FBQSxTQUFBLFVBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxXQUFBLEtBQUEsWUFBQTtnQkFDQSxPQUFBLEtBQUEsY0FBQSxVQUFBLFVBQUE7ZUFDQSxNQUFBLFNBQUEsVUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUEsVUFBQTs7OztRQUlBLE9BQUEsZUFBQSxTQUFBLFVBQUE7WUFDQSxJQUFBLFNBQUE7O1lBRUEsT0FBQSxLQUFBLGNBQUEsVUFBQSxVQUFBOztZQUVBLE9BQUE7Z0JBQ0EsS0FBQSxZQUFBLFNBQUE7Z0JBQ0E7Z0JBQ0EsS0FBQSxZQUFBLFNBQUE7Z0JBQ0E7OztZQUdBLE1BQUEsS0FBQSx1QkFBQSxRQUFBLElBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFdBQUEsS0FBQSxZQUFBO2VBQ0EsUUFBQSxVQUFBO2dCQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUEsVUFBQTs7OztRQUlBLE9BQUEsY0FBQSxVQUFBO1lBQ0EsSUFBQSxXQUFBLFFBQUEsS0FBQSxXQUFBO1lBQ0EsT0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBOztZQUVBLE9BQUEsS0FBQSxtQkFBQTs7WUFFQSxNQUFBLElBQUEsZ0JBQUEsV0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxXQUFBOztvQkFFQSxPQUFBLEtBQUEsbUJBQUE7b0JBQ0EsT0FBQSxLQUFBLG1CQUFBOztvQkFFQSxTQUFBLFVBQUE7d0JBQ0EsT0FBQSxLQUFBLG1CQUFBLENBQUE7dUJBQ0E7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsU0FBQSxVQUFBO29CQUNBLE9BQUEsS0FBQSxtQkFBQSxDQUFBO21CQUNBOzs7OztRQUtBLE9BQUEsa0JBQUEsVUFBQTtZQUNBLElBQUEsZ0JBQUEsVUFBQSxLQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxZQUFBO2dCQUNBLE1BQUE7OztZQUdBLGNBQUEsT0FBQSxLQUFBLFVBQUEsV0FBQTtnQkFDQSxXQUFBLEtBQUEsWUFBQSxRQUFBLEtBQUE7O2dCQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7b0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7b0JBRUEsS0FBQSxXQUFBO29CQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtvQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOzs7Z0JBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7O2dCQUlBLE9BQUEsU0FBQSxXQUFBLGNBQUE7Z0JBQ0EsT0FBQSxTQUFBOztlQUVBLFlBQUE7Z0JBQ0EsS0FBQSxLQUFBLHlCQUFBLElBQUE7Ozs7O1FBS0EsT0FBQSxTQUFBLFVBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO2dCQUNBLGFBQUEsV0FBQTtnQkFDQSxXQUFBLGdCQUFBO2dCQUNBLFdBQUEsT0FBQTtnQkFDQSxXQUFBLGFBQUE7O2dCQUVBLE9BQUEsR0FBQSxrQkFBQSxJQUFBLENBQUEsUUFBQTs7Ozs7UUFLQSxPQUFBLHlCQUFBLFVBQUE7WUFDQSxNQUFBLElBQUEsaUNBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxPQUFBLE9BQUEsS0FBQSxXQUFBLGFBQUE7b0JBQ0EsT0FBQSxxQkFBQSxPQUFBOzs7OztRQUtBLFdBQUEsT0FBQSxRQUFBLFNBQUEsS0FBQTtZQUNBLElBQUEsT0FBQSxVQUFBLGFBQUE7O1lBRUEsT0FBQTs7O1FBR0EsT0FBQSxlQUFBLFVBQUE7WUFDQSxXQUFBLGFBQUE7OztRQUdBLE9BQUEsV0FBQSxTQUFBLE1BQUEsTUFBQSxLQUFBO1lBQ0EsV0FBQSxhQUFBOztZQUVBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLE9BQUE7O1lBRUEsSUFBQSxPQUFBLFdBQUEsZUFBQSxNQUFBLFNBQUEsR0FBQTtnQkFDQSxJQUFBLE9BQUEsTUFBQTtnQkFDQSxXQUFBLGVBQUEsS0FBQSxNQUFBLEtBQUEsSUFBQSxNQUFBLE1BQUE7Ozs7Ozs7QUNyUEEsQ0FBQSxVQUFBO0VBQ0E7O0VBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsbUVBQUEsU0FBQSxRQUFBLFlBQUEsa0JBQUE7SUFDQSxPQUFBLFlBQUE7SUFDQSxPQUFBLG1CQUFBO0lBQ0EsT0FBQSxXQUFBO0lBQ0EsT0FBQSxhQUFBOztJQUVBLElBQUEsbUJBQUEsU0FBQSxLQUFBLE1BQUE7UUFDQSxJQUFBO1FBQ0EsSUFBQTs7UUFFQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsV0FBQTs7O1FBR0EsSUFBQSxJQUFBLGNBQUEsY0FBQTtZQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO2FBQ0E7WUFDQSxJQUFBLE9BQUEsSUFBQSxjQUFBLE1BQUE7OztRQUdBLElBQUEsU0FBQSxJQUFBOztRQUVBLElBQUEsS0FBQSxLQUFBLFFBQUEsWUFBQSxDQUFBLEdBQUE7WUFDQSxPQUFBLE9BQUEsU0FBQSxPQUFBO2dCQUNBLE9BQUEsYUFBQTs7WUFFQTthQUNBO1lBQ0EsT0FBQSxhQUFBOzs7UUFHQSxPQUFBLFdBQUEsS0FBQTs7UUFFQSxPQUFBLFNBQUEsU0FBQSxLQUFBO1lBQ0EsT0FBQSxPQUFBLFNBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUEsSUFBQSxPQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBLE9BQUE7Ozs7UUFJQSxJQUFBLE1BQUE7WUFDQSxPQUFBLGNBQUE7Ozs7SUFJQSxFQUFBLFVBQUEsR0FBQSxnQ0FBQSxvQkFBQSxTQUFBLE9BQUE7UUFDQSxNQUFBO1FBQ0EsTUFBQTs7O0lBR0EsRUFBQSxVQUFBLEdBQUEsYUFBQSxvQkFBQSxTQUFBLE9BQUE7UUFDQSxNQUFBO1FBQ0EsTUFBQTs7UUFFQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsV0FBQTs7OztJQUlBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1FBQ0EsTUFBQTtRQUNBLE1BQUE7O1FBRUEsT0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLFdBQUE7Ozs7SUFJQSxFQUFBLFVBQUEsR0FBQSxVQUFBLGNBQUEsU0FBQSxFQUFBO1FBQ0EsaUJBQUEsR0FBQTs7SUFFQSxFQUFBLFVBQUEsR0FBQSxRQUFBLG9CQUFBLFNBQUEsRUFBQTtRQUNBLGlCQUFBLEdBQUE7OztJQUdBLE9BQUEsZUFBQSxVQUFBO1FBQ0Esa0JBQUEsTUFBQSxPQUFBOzs7SUFHQSxPQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBLFFBQUE7Ozs7O0FDbkZBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG1HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFdBQUEsWUFBQTtRQUNBLFFBQUEsSUFBQTtRQUNBLFdBQUE7O1FBRUEsT0FBQSxHQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx1RkFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLE9BQUEsVUFBQSxZQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsV0FBQSxXQUFBOztRQUVBLE9BQUEsT0FBQSxPQUFBOztRQUVBLE9BQUEsT0FBQTtZQUNBLHFCQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsWUFBQTtnQkFDQSxZQUFBO2dCQUNBLFFBQUE7Ozs7O1FBS0EsV0FBQTs7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QkFDQSxJQUFBLE9BQUEsT0FBQSxXQUFBLGFBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7Ozs7O0FDbENBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHlHQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFVBQUEsWUFBQTs7S0FFQSxRQUFBLElBQUE7S0FDQSxXQUFBLFdBQUE7S0FDQSxXQUFBOztLQUVBLFNBQUEsVUFBQTtNQUNBLFdBQUEsV0FBQTtRQUNBOzs7O0tBSUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZnVuZGF0b3IgPSBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3InLFxuICAgICAgICBbXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbmZpZydcbiAgICAgICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnLCBbJ25nUmVzb3VyY2UnLCAnbmdDb29raWVzJywgJ25nQW5pbWF0ZScsICd1aS5ib290c3RyYXAnLCAndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInLCAnYW5ndWxhck1vbWVudCcsICdhbmd1bGFyLW93bC1jYXJvdXNlbCcsICduZ0ltZ0Nyb3AnLCAnYW5ndWxhckZpbGVVcGxvYWQnLCAnYm9vdHN0cmFwTGlnaHRib3gnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnLCBbJ29yZGluYWwnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLCBbJ2RpYmFyaS5hbmd1bGFyLWVsbGlwc2lzJywgJ2xvY2FseXRpY3MuZGlyZWN0aXZlcycsICd0ZXh0QW5ndWxhcicsICdmbG93JywgJ2FuZ3VsYXItbGFkZGEnLCAnbmdGbGFnJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgIyBmb3IgdGhlIG5vbiBodG1sNSBicm93c2Vyc1xuICAgICAgICAvLyAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdHMnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICduYXZpZ2F0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTmF2aWdhdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZsYXNoTm90aWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ2ZsYXNoLW5vdGljZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZsYXNoTm90aWNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRm9vdGVyQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ25vdGlmaWNhdGlvbnMnLCAnbm90aWZpY2F0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05vdGlmaWNhdGlvbnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBxdWlja1VwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdRdWlja1VwZGF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2xvZ2luJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5zaWdudXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdzaWdudXAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmZvcmdvdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZm9yZ290JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2ZvcmdvdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVjb3ZlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVjb3Zlcj90b2tlbiZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWNvdmVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aFJlY292ZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguY29uZmlybScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybT9jb2RlJmVtYWlsJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2NvbmZpcm0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ29uZmlybUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5yZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWdpc3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICAvLyAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAvLyAgICAgZGF0YToge1xuICAgICAgICAgICAgLy8gICAgICAgICBib2R5Q2xhc3M6ICdob21lcGFnZScsXG4gICAgICAgICAgICAvLyAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdob21lJyksXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3RzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jb250ZXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cy86Y29udGVzdElkLzpjb250ZXN0TmFtZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdFNpbmdsZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRXhwZXJ0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5leHBlcnRpc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cGVydGlzZS86ZXhwZXJ0aXNlSWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZXhwZXJ0JywgJ2V4cGVydGlzZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydGlzZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaW52ZXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9pbnZlc3QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSW52ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NyZWF0ZT9wcm9qZWN0SWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZGV0YWlscycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZGV0YWlscycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWRldGFpbHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVEZXRhaWxzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuc3VwZXJleHBlcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3N1cGVyLWV4cGVydCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLXN1cGVyLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZVNFQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1leHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5leHBlcnRzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0cycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUV4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmJ1ZGdldCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYnVkZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtYnVkZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQnVkZ2V0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuaW52ZXN0b3JzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9pbnZlc3RvcnMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1pbnZlc3RvcnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVJbnZlc3RvcnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnRyYW5zYWN0aW9uJywge1xuICAgICAgICAgICAgICAgIHVybDogJy90cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1RyYW5zYWN0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ncmFic2hhcmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2dyYWItYS1zaGFyZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnZlc3QnLCAnZ3JhYi1hLXNoYXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnR3JhYlNoYXJlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ub3RpZmljYXRpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5wYWdlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy86c2x1ZycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncGFnZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHVybFJvdXRlciwgJGZpbHRlciwgJGNvb2tpZXMsIEZkTm90aWZpY2F0aW9ucywgRmRTY3JvbGxlcikge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0ge25hbWU6ICdhcHAuY29udGVzdCd9O1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmNvbGxhcHNlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKCRyb290U2NvcGUuaXNOYXZTaG93biA+PSAwLjUpID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gMCA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAuNTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBVc2VyU2VydmljZSBpcyBhbiBleGFtcGxlIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgJHVybFJvdXRlcidzIGRlZmF1bHQgaGFuZGxlciBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZFxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB1c2VyIG9iamVjdCBhbmQgdGFza3NcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdXNlcj90b2tlbj0nICsgJGF1dGguZ2V0VG9rZW4oKSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZkTm90aWZpY2F0aW9ucy5pbml0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgucmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnbmFsUm9sZSA9ICRyb290U2NvcGUudXNlci5yb2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVJvbGUgPSAkY29va2llcy5nZXQoJ2ZkX2FjdGl2ZV9yb2xlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiBhY3RpdmVSb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShvcmlnbmFsUm9sZS5yb2xlLCBvcmlnbmFsUm9sZS5pZCwgISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkdXJsUm91dGVyLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAkdXJsUm91dGVyLmxpc3RlbigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJcyBBdXRoZW50aWNhdGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCk7XG5cbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBuZWVkTG9naW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodG9TdGF0ZS5kYXRhLm5lZWRMb2dpbikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbiA9IHRvU3RhdGUuZGF0YS5uZWVkTG9naW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRMb2dpbikge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAoZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSAmJiB0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmICh0b1N0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSAmJiBmcm9tU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3dpdGNoIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlLCByb2xlSWQsIHJlbG9hZCwgc3RhdGUsIHN0YXRlUGFyYW1zKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSByb2xlO1xuICAgICAgICAgICAgJGNvb2tpZXMucHV0KCdmZF9hY3RpdmVfcm9sZScsIHJvbGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHN0YXRlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICRzdGF0ZS5jdXJyZW50Lm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RhdGVQYXJhbXMpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHN0YXRlLmN1cnJlbnQucGFyYW1zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclJvbGVWaWV3cyA9IFt7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdxdWlja1VwZGF0ZScsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydDogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW52ZXN0b3I6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtaW52ZXN0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1qdXJ5JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdCcsXG4gICAgICAgICAgICAgICAgdmlldzogJ21haW5AJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZS1qdXJ5JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3RzJyxcbiAgICAgICAgICAgICAgICB2aWV3OiAnbWFpbkAnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1qdXJ5JylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygnY29udGVzdCcpXG4gICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHVzZXJSb2xlVmlld3MsIGZ1bmN0aW9uKHJvbGVWaWV3KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGVUZW1wbGF0ZVZpZXcgPSByb2xlVmlldy5yb2xlc1tyb2xlXTtcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9ICRzdGF0ZS5nZXQocm9sZVZpZXcucm91dGUpLnZpZXdzW3JvbGVWaWV3LnZpZXddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyb2xlVGVtcGxhdGVWaWV3KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVUZW1wbGF0ZVZpZXc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcudGVtcGxhdGVVcmwgPSByb2xlVmlldy5kZWZhdWx0VGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IG51bGw7XG5cbiAgICAgICAgICAgIHN3aXRjaChyb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzogbW9kZWwgPSAnL2FwaS9jcmVhdG9ycy8nICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOiBtb2RlbCA9ICcvYXBpL2ludmVzdG9ycy8nICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldChtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcm9sZV0gPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFzIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuaGFzVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcbiAgICAgICAgLy8gU2F0ZWxsaXplciBjb25maWd1cmF0aW9uIHRoYXQgc3BlY2lmaWVzIHdoaWNoIEFQSVxuICAgICAgICAvLyByb3V0ZSB0aGUgSldUIHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvYXV0aGVudGljYXRlJztcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc3RhdGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdzZWxmJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgICAgICAgICBjbGllbnRJZDogJzEwNDIyNDc3MjcwOTEtZG1xYzU1YWY3dGw1OGgycnF2M3BxbnJtampiYjk3MzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9hdXRoZW50aWNhdGUvZ29vZ2xlJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvZ29vZ2xlJyxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ3Njb3BlJ10sXG4gICAgICAgICAgICBvcHRpb25hbFVybFBhcmFtczogWydkaXNwbGF5J10sXG4gICAgICAgICAgICBzY29wZTogWydwcm9maWxlJywgJ2VtYWlsJ10sXG4gICAgICAgICAgICBzY29wZVByZWZpeDogJ29wZW5pZCcsXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgICAgICAgICBjbGllbnRJZDogJzkwMDUzMzEyMzM5NTkyMCcsXG4gICAgICAgICAgICBuYW1lOiAnZmFjZWJvb2snLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9hdXRoZW50aWNhdGUvZmFjZWJvb2snLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvZmFjZWJvb2snLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnZGlzcGxheScsICdzY29wZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKGZsb3dGYWN0b3J5UHJvdmlkZXIpe1xuXG4gICAgICAgIGZsb3dGYWN0b3J5UHJvdmlkZXIuZGVmYXVsdHMgPSB7XG4gICAgICAgIFx0dXBsb2FkTWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB0YXJnZXQ6ICcvYXBpL2ZpbGVzLycsXG4gICAgICAgICAgICBwZXJtYW5lbnRFcnJvcnM6WzQwNCwgNTAwLCA1MDFdXG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24obGFkZGFQcm92aWRlcikge1xuXG4gICAgICAgIGxhZGRhUHJvdmlkZXIuc2V0T3B0aW9uKHtcbiAgICAgICAgICAgIHN0eWxlOiAnZXhwYW5kLXJpZ2h0JyxcbiAgICAgICAgICAgIHNwaW5uZXJTaXplOiAzNSxcbiAgICAgICAgICAgIHNwaW5uZXJDb2xvcjogJyNmZmZmZmYnXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuXHQuZGlyZWN0aXZlKCdmZExvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiB7XG5cdCAgXHRzY29wZToge1xuXHQgIFx0XHR2aWV3Qm94OiAnQCdcblx0ICBcdH0sXG5cdCAgICByZXN0cmljdDogJ0UnLFxuXHQgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZmQtbG9hZGVyIGxhLWJhbGwtcHVsc2VcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nLFxuXHQgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdCAgICBcdCRlbGVtZW50LmFkZENsYXNzKCRhdHRycy5jbGFzcyk7XG5cdCAgICB9XG5cdCAgfTtcblx0fSk7XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkTWVzc2VuZ2VyJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiY2hhdGJveFwiIG5nLWlmPVwidGhyZWFkSWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXRSb3dcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluIG1lc3NhZ2VzXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hhdC11c2VyU2VuZGJveFwiIG5nLWNsYXNzPVwie1xcJ2NoYXQtc2VuZFxcJzogdXNlci5pZCA9PSBtZXNzYWdlLnVzZXIuaWQsIFxcJ2NoYXQtY29tZWluXFwnOiB1c2VyLmlkICE9IG1lc3NhZ2UudXNlci5pZH1cIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+e3ttZXNzYWdlLmJvZHl9fTwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FodC1sYWJlbFwiIG5nLWNsYXNzPVxcJ3tcInRleHQtcmlnaHRcIjogdXNlci5pZCA9PSBtZXNzYWdlLnVzZXIuaWR9XFwnPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3t7bWVzc2FnZS51c2VyLm5hbWV9fSA8c3Bhbj57e21lc3NhZ2UuY3JlYXRlZF9hdCB8IGFtRGF0ZUZvcm1hdDpcIk1NTSBEbyBZWVlZXCJ9fTo8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxwIGNsYXNzPVwibm8taGF2ZSBuby1tYXJnaW5cIiBuZy1pZj1cIm1lc3NhZ2VzLmxlbmd0aCA9PT0gMFwiPlRoZXJlIGFyZSBjdXJyZW50bHkgbm8gbWVzc2FnZXMuPC9wPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxmb3JtIGNsYXNzPVwiY2hhdHNlbmRmb3JtXCIgbmctaWY9XCJ0aHJlYWRJZFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIG1lc3NhZ2UgaGVyZSAuLi5cIiBuZy1tb2RlbD1cImRhdGEubWVzc2FnZVRvU2VuZFwiIGZkLWVudGVyPVwic2VuZE1lc3NhZ2UoKVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBzZW5kYnRuXCIgbmctY2xpY2s9XCJzZW5kTWVzc2FnZSgpXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb25cIj5TZW5kPC9zcGFuPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9mb3JtPicsXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICB0aHJlYWRJZDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyID0gJHJvb3RTY29wZS51c2VyO1xuXG4gICAgICAgICAgICAgICAgdmFyIE1lc3NhZ2UgPSAkcmVzb3VyY2UoJy9hcGkvbWVzc2FnZXMvOnRocmVhZElkJywge1xuICAgICAgICAgICAgICAgICAgICB0aHJlYWRJZDogJ0BpZCdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgndGhyZWFkSWQnLCBmdW5jdGlvbih0aHJlYWRJZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodGhyZWFkSWQpID09PSAndW5kZWZpbmVkJyB8fCB0aHJlYWRJZCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIE1lc3NhZ2UuZ2V0KHt0aHJlYWRJZDogJHNjb3BlLnRocmVhZElkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JldHJpdmluZyB0aGUgdGhyZWFkIDogJyArICRzY29wZS50aHJlYWRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGhyZWFkX2lkID0gJHNjb3BlLnRocmVhZElkO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLm1lc3NhZ2UgPSAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICAgIFx0cmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWU7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ25nTWluJywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0cmVzdHJpY3Q6ICdBJyxcbiAgICBcdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcbiAgICBcdFx0XHRzY29wZS4kd2F0Y2goYXR0ci5uZ01pbiwgZnVuY3Rpb24gKCkge1xuICAgIFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgXHRcdFx0fSk7XG4gICAgXHRcdFx0dmFyIG1pblZhbGlkYXRvciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWluVmFsaWRhdG9yJyk7XG4gICAgXHRcdFx0XHR2YXIgbWluID0gc2NvcGUuJGV2YWwoYXR0ci5uZ01pbikgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWluKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPCBtaW4pO1xuICAgIFx0XHRcdFx0aWYgKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA8IG1pbikge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNaW4nLCBmYWxzZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG4gICAgXHRcdFx0XHR9IGVsc2Uge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNaW4nLCB0cnVlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH07XG5cbiAgICBcdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gobWluVmFsaWRhdG9yKTtcbiAgICBcdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2gobWluVmFsaWRhdG9yKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCduZ01heCcsIGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHJlc3RyaWN0OiAnQScsXG4gICAgXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgXHRcdFx0c2NvcGUuJHdhdGNoKGF0dHIubmdNYXgsIGZ1bmN0aW9uICgpIHtcbiAgICBcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShjdHJsLiR2aWV3VmFsdWUpO1xuICAgIFx0XHRcdH0pO1xuICAgIFx0XHRcdHZhciBtYXhWYWxpZGF0b3IgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21heFZhbGlkYXRvcicpO1xuICAgIFx0XHRcdFx0dmFyIG1heCA9IHNjb3BlLiRldmFsKGF0dHIubmdNYXgpIHx8IEluZmluaXR5O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtYXgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA+IG1heCk7XG4gICAgXHRcdFx0XHRpZiAoIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlID4gbWF4KSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01heCcsIGZhbHNlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcbiAgICBcdFx0XHRcdH0gZWxzZSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01heCcsIHRydWUpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fTtcblxuICAgIFx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChtYXhWYWxpZGF0b3IpO1xuICAgIFx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChtYXhWYWxpZGF0b3IpO1xuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZmlsdGVyKCd0cnVzdGVkSHRtbCcsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuICAgICAgICB9O1xuICAgIH1dKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZmRQcm9maWxlSW5wdXQnLCBmdW5jdGlvbigkY29tcGlsZSwgJHRpbWVvdXQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgZm9ybTogJ0AnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdAJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ0AnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQCcsXG4gICAgICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICAgICAgZmFjZWJvb2tWYWx1ZTogJz0nLFxuICAgICAgICAgICAgICAgIGxpbmtlZGluVmFsdWU6ICc9J1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZvcm1FcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb25kaXRpb25zID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNQcmlzdGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbGlkYXRpb24gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbGlkYXRpb25NZXNzYWdlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUucmVwbGFjZVZhbHVlID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIFx0JHNjb3BlLm5nTW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBuZy1tb2RlbD1cIm5nTW9kZWxcIj4nLFxuICAgICAgICAgICAgICAgICAgICAndGV4dGFyZWEnOiAnPHRleHRhcmVhIGNsYXNzPVwidGV4dGFyZWEgZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiByb3dzPVwiNlwiPjwvdGV4dGFyZWE+JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2VtYWlsJzogJzxpbnB1dCBuYW1lPVwie3tmaWVsZH19XCIgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbGdcIiBuZy1kaXNhYmxlZD1cImlzRGlzYWJsZWRcIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1ibHVyPVwidXBkYXRlKClcIj4gJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2Ryb3Bkb3duJzogJzxkaXYgY2xhc3M9XCJzZWxlY3Qtd3JhcGVyIGZ1bGxcIj48c3BhbiBjbGFzcz1cImljb24gaWNvbi1hcnJvdy1ib3R0b21cIj48L3NwYW4+PHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBpbnB1dC1sZ1wiIG5nLW9wdGlvbnM9XCJ2YWx1ZS52YWx1ZSBhcyB2YWx1ZS5uYW1lIGZvciB2YWx1ZSBpbiB2YWx1ZXNcIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJ1cGRhdGUoKVwiPjwvc2VsZWN0PjwvZGl2PicsXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzWyRzY29wZS50eXBlXTtcblxuICAgICAgICAgICAgICAgIHZhciBzb2NpYWxBbHRlcm5hdGl2ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlICE9PSAndGV4dGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgXHRzb2NpYWxBbHRlcm5hdGl2ZSA9ICc8ZGl2IGNsYXNzPVwic29jaWFsLWFsdGVybmF0aXZlXCI+JyArXG4gICAgICAgICAgICAgICAgXHQnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tZmFjZWJvb2tcIiB1aWItdG9vbHRpcD1cInt7ZmFjZWJvb2tWYWx1ZX19XCIgbmctY2xhc3M9XCJ7XFwnY2hlY2tlZFxcJzogKG5nTW9kZWwgPT09IGZhY2Vib29rVmFsdWUpICYmIG5nTW9kZWwgIT09IFxcJ1xcJ31cIiBuZy1kaXNhYmxlZD1cIiFmYWNlYm9va1ZhbHVlXCIgbmctY2xpY2s9XCJyZXBsYWNlVmFsdWUoZmFjZWJvb2tWYWx1ZSlcIj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgXHQnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tbGlua2VkaW4yXCIgdWliLXRvb2x0aXA9XCJ7e2xpbmtlZGluVmFsdWV9fVwiIG5nLWNsYXNzPVwie1xcJ2NoZWNrZWRcXCc6IChuZ01vZGVsID09PSBsaW5rZWRpblZhbHVlKSAmJiBuZ01vZGVsICE9PSBcXCdcXCd9XCIgbmctZGlzYWJsZWQ9XCIhbGlua2VkaW5WYWx1ZVwiIG5nLWNsaWNrPVwicmVwbGFjZVZhbHVlKGxpbmtlZGluVmFsdWUpXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgIFx0JzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID1cblx0ICAgICAgICAgICAgICAgICc8ZGl2PicgK1xuXHQgICAgICAgICAgICAgICAgJzxsYWJlbD57e2xhYmVsfX06PC9sYWJlbD4nICtcblx0ICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuXHQgICAgICAgICAgICAgICAgXHRmaWVsZCArXG5cdCAgICAgICAgICAgICAgICBcdHNvY2lhbEFsdGVybmF0aXZlICtcblx0ICAgICAgICAgICAgICAgICc8L2Rpdj48L2Rpdj4nO1xuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuaHRtbCgkY29tcGlsZSh0ZW1wbGF0ZSkoJHNjb3BlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSlcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignc3RyaXBUYWdzJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKFN0cmluZy5mcm9tQ2hhckNvZGUoMTYwKSwgXCJnXCIpO1xuXHRcdFx0XHR0ZXh0ID0gU3RyaW5nKHRleHQpLnJlcGxhY2UocmUsIFwiIFwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLyZuYnNwOy9naSwnICcpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dCA/IFN0cmluZyh0ZXh0KS5yZXBsYWNlKC88W14+XSs+L2dtLCAnJykgOiAnJztcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdjbGVhbkh0bWwnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dDtcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkTm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRxLCAkaW50ZXJ2YWwsICRodHRwLCAkc3RhdGUpIHtcbiAgICAgICAgdmFyIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zOiBbXSxcbiAgICAgICAgICAgIHVucmVhZDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdXNoTm90aWZpY2F0aW9uID0gZnVuY3Rpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG5vdGlmaWNhdGlvbnMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL25vdGlmaWNhdGlvbnMvJyArIHVzZXIuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnNJbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ZXN0Tm90aWZpY2F0aW9ucyA9IGFuZ3VsYXIuY29weShnbG9iYWxOb3RpZmljYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucyA9IGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5zbGljZSgwLCA1KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChub3RpZmljYXRpb25zSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnJlc29sdmUobGF0ZXN0Tm90aWZpY2F0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWROb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL25vdGlmaWNhdGlvbnMvJyArIG5vdGlmaWNhdGlvbklkICsgJy9yZWFkJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIFx0bm90aWZpY2F0aW9uLnJlYWQgPSAxO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWRBbGxOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9ub3RpZmljYXRpb25zL3VzZXIvJyArICRyb290U2NvcGUudXNlci5pZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucy51bnJlYWQgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG5vdGlmaWNhdGlvblRyaWdnZXI6IGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoKGNhdGVnb3J5KXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAnZG93bmxvYWQubmV3JzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmRvd25sb2FkcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5wYWlyZWQnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQucGFydG5lci5kZXRhaWxzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdwYXJ0bmVyLnN0dWR5X3BlcmlvZHMnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQuY291cnNlcy5wZXJpb2RzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICd1c2VyLmNyZWF0ZWQnOiAkc3RhdGUuZ28oVGFza3NTZXJ2aWNlLm5leHRUYXNrKCkudmlldyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBnZXROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlLCBwdXNoKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AodHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHB1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmeUVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0b2FzdGVyLnBvcCgnZXJyb3InLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmRTY3JvbGxlcicsIGZ1bmN0aW9uKCR3aW5kb3cpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sICc1MDAnLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1NlY3Rpb246IGZ1bmN0aW9uKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIFx0dmFyICRzZWN0aW9uID0gJChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJHNlY3Rpb24pO1xuICAgICAgICAgICAgXHRpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXHRcdHZhciB0b3AgPSAkc2VjdGlvbi5vZmZzZXQoKS50b3AgLSA3MDtcblxuICAgICAgICAgICAgXHRcdHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIFx0Ym9keS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICBcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnZhbHVlKCdDb3VudHJpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQWZnaGFuaXN0YW5cIiwgXCJjb2RlXCI6IFwiQUZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCLDhWxhbmQgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJBWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFsYmFuaWFcIiwgXCJjb2RlXCI6IFwiQUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbGdlcmlhXCIsIFwiY29kZVwiOiBcIkRaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW1lcmljYW4gU2Ftb2FcIiwgXCJjb2RlXCI6IFwiQVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbmRvcnJBXCIsIFwiY29kZVwiOiBcIkFEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5nb2xhXCIsIFwiY29kZVwiOiBcIkFPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5ndWlsbGFcIiwgXCJjb2RlXCI6IFwiQUlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbnRhcmN0aWNhXCIsIFwiY29kZVwiOiBcIkFRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiLCBcImNvZGVcIjogXCJBR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFyZ2VudGluYVwiLCBcImNvZGVcIjogXCJBUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFybWVuaWFcIiwgXCJjb2RlXCI6IFwiQU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcnViYVwiLCBcImNvZGVcIjogXCJBV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkF1c3RyYWxpYVwiLCBcImNvZGVcIjogXCJBVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkF1c3RyaWFcIiwgXCJjb2RlXCI6IFwiQVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBemVyYmFpamFuXCIsIFwiY29kZVwiOiBcIkFaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFoYW1hc1wiLCBcImNvZGVcIjogXCJCU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhaHJhaW5cIiwgXCJjb2RlXCI6IFwiQkhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCYW5nbGFkZXNoXCIsIFwiY29kZVwiOiBcIkJEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFyYmFkb3NcIiwgXCJjb2RlXCI6IFwiQkJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZWxhcnVzXCIsIFwiY29kZVwiOiBcIkJZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVsZ2l1bVwiLCBcImNvZGVcIjogXCJCRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbGl6ZVwiLCBcImNvZGVcIjogXCJCWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbmluXCIsIFwiY29kZVwiOiBcIkJKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVybXVkYVwiLCBcImNvZGVcIjogXCJCTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJodXRhblwiLCBcImNvZGVcIjogXCJCVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJvbGl2aWFcIiwgXCJjb2RlXCI6IFwiQk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb3NuaWEgYW5kIEhlcnplZ292aW5hXCIsIFwiY29kZVwiOiBcIkJBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm90c3dhbmFcIiwgXCJjb2RlXCI6IFwiQldcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb3V2ZXQgSXNsYW5kXCIsIFwiY29kZVwiOiBcIkJWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnJhemlsXCIsIFwiY29kZVwiOiBcIkJSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnJ1bmVpIERhcnVzc2FsYW1cIiwgXCJjb2RlXCI6IFwiQk5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdWxnYXJpYVwiLCBcImNvZGVcIjogXCJCR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJ1cmtpbmEgRmFzb1wiLCBcImNvZGVcIjogXCJCRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJ1cnVuZGlcIiwgXCJjb2RlXCI6IFwiQklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYW1ib2RpYVwiLCBcImNvZGVcIjogXCJLSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhbWVyb29uXCIsIFwiY29kZVwiOiBcIkNNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FuYWRhXCIsIFwiY29kZVwiOiBcIkNBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FwZSBWZXJkZVwiLCBcImNvZGVcIjogXCJDVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNheW1hbiBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIktZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkNGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hhZFwiLCBcImNvZGVcIjogXCJURFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoaWxlXCIsIFwiY29kZVwiOiBcIkNMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hpbmFcIiwgXCJjb2RlXCI6IFwiQ05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDaHJpc3RtYXMgSXNsYW5kXCIsIFwiY29kZVwiOiBcIkNYXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29jb3MgKEtlZWxpbmcpIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQ0NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb2xvbWJpYVwiLCBcImNvZGVcIjogXCJDT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvbW9yb3NcIiwgXCJjb2RlXCI6IFwiS01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb25nb1wiLCBcImNvZGVcIjogXCJDR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvbmdvLCBUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGVcIiwgXCJjb2RlXCI6IFwiQ0RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb29rIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQ0tcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb3N0YSBSaWNhXCIsIFwiY29kZVwiOiBcIkNSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ290ZSBEXFxcIkl2b2lyZVwiLCBcImNvZGVcIjogXCJDSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNyb2F0aWFcIiwgXCJjb2RlXCI6IFwiSFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDdWJhXCIsIFwiY29kZVwiOiBcIkNVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3lwcnVzXCIsIFwiY29kZVwiOiBcIkNZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3plY2ggUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiQ1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEZW5tYXJrXCIsIFwiY29kZVwiOiBcIkRLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRGppYm91dGlcIiwgXCJjb2RlXCI6IFwiREpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEb21pbmljYVwiLCBcImNvZGVcIjogXCJETVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkRvbWluaWNhbiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJET1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVjdWFkb3JcIiwgXCJjb2RlXCI6IFwiRUNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFZ3lwdFwiLCBcImNvZGVcIjogXCJFR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVsIFNhbHZhZG9yXCIsIFwiY29kZVwiOiBcIlNWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXF1YXRvcmlhbCBHdWluZWFcIiwgXCJjb2RlXCI6IFwiR1FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFcml0cmVhXCIsIFwiY29kZVwiOiBcIkVSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXN0b25pYVwiLCBcImNvZGVcIjogXCJFRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkV0aGlvcGlhXCIsIFwiY29kZVwiOiBcIkVUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpXCIsIFwiY29kZVwiOiBcIkZLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmFyb2UgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJGT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZpamlcIiwgXCJjb2RlXCI6IFwiRkpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGaW5sYW5kXCIsIFwiY29kZVwiOiBcIkZJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJhbmNlXCIsIFwiY29kZVwiOiBcIkZSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJlbmNoIEd1aWFuYVwiLCBcImNvZGVcIjogXCJHRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyZW5jaCBQb2x5bmVzaWFcIiwgXCJjb2RlXCI6IFwiUEZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXNcIiwgXCJjb2RlXCI6IFwiVEZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHYWJvblwiLCBcImNvZGVcIjogXCJHQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdhbWJpYVwiLCBcImNvZGVcIjogXCJHTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdlb3JnaWFcIiwgXCJjb2RlXCI6IFwiR0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHZXJtYW55XCIsIFwiY29kZVwiOiBcIkRFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2hhbmFcIiwgXCJjb2RlXCI6IFwiR0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHaWJyYWx0YXJcIiwgXCJjb2RlXCI6IFwiR0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVlY2VcIiwgXCJjb2RlXCI6IFwiR1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVlbmxhbmRcIiwgXCJjb2RlXCI6IFwiR0xcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVuYWRhXCIsIFwiY29kZVwiOiBcIkdEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3VhZGVsb3VwZVwiLCBcImNvZGVcIjogXCJHUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1YW1cIiwgXCJjb2RlXCI6IFwiR1VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWF0ZW1hbGFcIiwgXCJjb2RlXCI6IFwiR1RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWVybnNleVwiLCBcImNvZGVcIjogXCJHR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1aW5lYVwiLCBcImNvZGVcIjogXCJHTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1aW5lYS1CaXNzYXVcIiwgXCJjb2RlXCI6IFwiR1dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdXlhbmFcIiwgXCJjb2RlXCI6IFwiR1lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIYWl0aVwiLCBcImNvZGVcIjogXCJIVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhlYXJkIElzbGFuZCBhbmQgTWNkb25hbGQgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJITVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpXCIsIFwiY29kZVwiOiBcIlZBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSG9uZHVyYXNcIiwgXCJjb2RlXCI6IFwiSE5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIb25nIEtvbmdcIiwgXCJjb2RlXCI6IFwiSEtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIdW5nYXJ5XCIsIFwiY29kZVwiOiBcIkhVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSWNlbGFuZFwiLCBcImNvZGVcIjogXCJJU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkluZGlhXCIsIFwiY29kZVwiOiBcIklOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSW5kb25lc2lhXCIsIFwiY29kZVwiOiBcIklEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBPZlwiLCBcImNvZGVcIjogXCJJUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklyYXFcIiwgXCJjb2RlXCI6IFwiSVFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJcmVsYW5kXCIsIFwiY29kZVwiOiBcIklFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXNsZSBvZiBNYW5cIiwgXCJjb2RlXCI6IFwiSU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJc3JhZWxcIiwgXCJjb2RlXCI6IFwiSUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJdGFseVwiLCBcImNvZGVcIjogXCJJVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkphbWFpY2FcIiwgXCJjb2RlXCI6IFwiSk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKYXBhblwiLCBcImNvZGVcIjogXCJKUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkplcnNleVwiLCBcImNvZGVcIjogXCJKRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkpvcmRhblwiLCBcImNvZGVcIjogXCJKT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkthemFraHN0YW5cIiwgXCJjb2RlXCI6IFwiS1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLZW55YVwiLCBcImNvZGVcIjogXCJLRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIktpcmliYXRpXCIsIFwiY29kZVwiOiBcIktJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS29yZWEsIERlbW9jcmF0aWMgUGVvcGxlXFxcIlMgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiS1BcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLb3JlYSwgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiS1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLdXdhaXRcIiwgXCJjb2RlXCI6IFwiS1dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLeXJneXpzdGFuXCIsIFwiY29kZVwiOiBcIktHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGFvIFBlb3BsZVxcXCJTIERlbW9jcmF0aWMgUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiTEFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMYXR2aWFcIiwgXCJjb2RlXCI6IFwiTFZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMZWJhbm9uXCIsIFwiY29kZVwiOiBcIkxCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGVzb3Rob1wiLCBcImNvZGVcIjogXCJMU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpYmVyaWFcIiwgXCJjb2RlXCI6IFwiTFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaWJ5YW4gQXJhYiBKYW1haGlyaXlhXCIsIFwiY29kZVwiOiBcIkxZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGllY2h0ZW5zdGVpblwiLCBcImNvZGVcIjogXCJMSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpdGh1YW5pYVwiLCBcImNvZGVcIjogXCJMVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkx1eGVtYm91cmdcIiwgXCJjb2RlXCI6IFwiTFVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWNhb1wiLCBcImNvZGVcIjogXCJNT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hY2Vkb25pYSwgVGhlIEZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJNS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hZGFnYXNjYXJcIiwgXCJjb2RlXCI6IFwiTUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxhd2lcIiwgXCJjb2RlXCI6IFwiTVdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxheXNpYVwiLCBcImNvZGVcIjogXCJNWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbGRpdmVzXCIsIFwiY29kZVwiOiBcIk1WXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsaVwiLCBcImNvZGVcIjogXCJNTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbHRhXCIsIFwiY29kZVwiOiBcIk1UXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFyc2hhbGwgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJNSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hcnRpbmlxdWVcIiwgXCJjb2RlXCI6IFwiTVFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYXVyaXRhbmlhXCIsIFwiY29kZVwiOiBcIk1SXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF1cml0aXVzXCIsIFwiY29kZVwiOiBcIk1VXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF5b3R0ZVwiLCBcImNvZGVcIjogXCJZVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1leGljb1wiLCBcImNvZGVcIjogXCJNWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2ZcIiwgXCJjb2RlXCI6IFwiRk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb2xkb3ZhLCBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJNRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbmFjb1wiLCBcImNvZGVcIjogXCJNQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbmdvbGlhXCIsIFwiY29kZVwiOiBcIk1OXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW9udHNlcnJhdFwiLCBcImNvZGVcIjogXCJNU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vcm9jY29cIiwgXCJjb2RlXCI6IFwiTUFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb3phbWJpcXVlXCIsIFwiY29kZVwiOiBcIk1aXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTXlhbm1hclwiLCBcImNvZGVcIjogXCJNTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5hbWliaWFcIiwgXCJjb2RlXCI6IFwiTkFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOYXVydVwiLCBcImNvZGVcIjogXCJOUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5lcGFsXCIsIFwiY29kZVwiOiBcIk5QXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV0aGVybGFuZHNcIiwgXCJjb2RlXCI6IFwiTkxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXRoZXJsYW5kcyBBbnRpbGxlc1wiLCBcImNvZGVcIjogXCJBTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5ldyBDYWxlZG9uaWFcIiwgXCJjb2RlXCI6IFwiTkNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXcgWmVhbGFuZFwiLCBcImNvZGVcIjogXCJOWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pY2FyYWd1YVwiLCBcImNvZGVcIjogXCJOSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pZ2VyXCIsIFwiY29kZVwiOiBcIk5FXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmlnZXJpYVwiLCBcImNvZGVcIjogXCJOR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pdWVcIiwgXCJjb2RlXCI6IFwiTlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3Jmb2xrIElzbGFuZFwiLCBcImNvZGVcIjogXCJORlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJNUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5vcndheVwiLCBcImNvZGVcIjogXCJOT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk9tYW5cIiwgXCJjb2RlXCI6IFwiT01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYWtpc3RhblwiLCBcImNvZGVcIjogXCJQS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbGF1XCIsIFwiY29kZVwiOiBcIlBXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFsZXN0aW5pYW4gVGVycml0b3J5LCBPY2N1cGllZFwiLCBcImNvZGVcIjogXCJQU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbmFtYVwiLCBcImNvZGVcIjogXCJQQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhcHVhIE5ldyBHdWluZWFcIiwgXCJjb2RlXCI6IFwiUEdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYXJhZ3VheVwiLCBcImNvZGVcIjogXCJQWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBlcnVcIiwgXCJjb2RlXCI6IFwiUEVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQaGlsaXBwaW5lc1wiLCBcImNvZGVcIjogXCJQSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBpdGNhaXJuXCIsIFwiY29kZVwiOiBcIlBOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUG9sYW5kXCIsIFwiY29kZVwiOiBcIlBMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUG9ydHVnYWxcIiwgXCJjb2RlXCI6IFwiUFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQdWVydG8gUmljb1wiLCBcImNvZGVcIjogXCJQUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlFhdGFyXCIsIFwiY29kZVwiOiBcIlFBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUmV1bmlvblwiLCBcImNvZGVcIjogXCJSRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlJvbWFuaWFcIiwgXCJjb2RlXCI6IFwiUk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSdXNzaWFuIEZlZGVyYXRpb25cIiwgXCJjb2RlXCI6IFwiUlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSV0FOREFcIiwgXCJjb2RlXCI6IFwiUldcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBIZWxlbmFcIiwgXCJjb2RlXCI6IFwiU0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBLaXR0cyBhbmQgTmV2aXNcIiwgXCJjb2RlXCI6IFwiS05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBMdWNpYVwiLCBcImNvZGVcIjogXCJMQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhaW50IFBpZXJyZSBhbmQgTWlxdWVsb25cIiwgXCJjb2RlXCI6IFwiUE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBWaW5jZW50IGFuZCB0aGUgR3JlbmFkaW5lc1wiLCBcImNvZGVcIjogXCJWQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbW9hXCIsIFwiY29kZVwiOiBcIldTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FuIE1hcmlub1wiLCBcImNvZGVcIjogXCJTTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiLCBcImNvZGVcIjogXCJTVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhdWRpIEFyYWJpYVwiLCBcImNvZGVcIjogXCJTQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNlbmVnYWxcIiwgXCJjb2RlXCI6IFwiU05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZXJiaWEgYW5kIE1vbnRlbmVncm9cIiwgXCJjb2RlXCI6IFwiQ1NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZXljaGVsbGVzXCIsIFwiY29kZVwiOiBcIlNDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2llcnJhIExlb25lXCIsIFwiY29kZVwiOiBcIlNMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2luZ2Fwb3JlXCIsIFwiY29kZVwiOiBcIlNHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2xvdmFraWFcIiwgXCJjb2RlXCI6IFwiU0tcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTbG92ZW5pYVwiLCBcImNvZGVcIjogXCJTSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNvbG9tb24gSXNsYW5kc1wiLCBcImNvZGVcIjogXCJTQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNvbWFsaWFcIiwgXCJjb2RlXCI6IFwiU09cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb3V0aCBBZnJpY2FcIiwgXCJjb2RlXCI6IFwiWkFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLCBcImNvZGVcIjogXCJHU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNwYWluXCIsIFwiY29kZVwiOiBcIkVTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3JpIExhbmthXCIsIFwiY29kZVwiOiBcIkxLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3VkYW5cIiwgXCJjb2RlXCI6IFwiU0RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTdXJpbmFtZVwiLCBcImNvZGVcIjogXCJTUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN2YWxiYXJkIGFuZCBKYW4gTWF5ZW5cIiwgXCJjb2RlXCI6IFwiU0pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2F6aWxhbmRcIiwgXCJjb2RlXCI6IFwiU1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2VkZW5cIiwgXCJjb2RlXCI6IFwiU0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2l0emVybGFuZFwiLCBcImNvZGVcIjogXCJDSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN5cmlhbiBBcmFiIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIlNZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYVwiLCBcImNvZGVcIjogXCJUV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRhamlraXN0YW5cIiwgXCJjb2RlXCI6IFwiVEpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIlRaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGhhaWxhbmRcIiwgXCJjb2RlXCI6IFwiVEhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUaW1vci1MZXN0ZVwiLCBcImNvZGVcIjogXCJUTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRvZ29cIiwgXCJjb2RlXCI6IFwiVEdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUb2tlbGF1XCIsIFwiY29kZVwiOiBcIlRLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVG9uZ2FcIiwgXCJjb2RlXCI6IFwiVE9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUcmluaWRhZCBhbmQgVG9iYWdvXCIsIFwiY29kZVwiOiBcIlRUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVHVuaXNpYVwiLCBcImNvZGVcIjogXCJUTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmtleVwiLCBcImNvZGVcIjogXCJUUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmttZW5pc3RhblwiLCBcImNvZGVcIjogXCJUTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmtzIGFuZCBDYWljb3MgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJUQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1dmFsdVwiLCBcImNvZGVcIjogXCJUVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVnYW5kYVwiLCBcImNvZGVcIjogXCJVR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVrcmFpbmVcIiwgXCJjb2RlXCI6IFwiVUFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiLCBcImNvZGVcIjogXCJBRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBLaW5nZG9tXCIsIFwiY29kZVwiOiBcIkdCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVW5pdGVkIFN0YXRlc1wiLCBcImNvZGVcIjogXCJVU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJVTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVydWd1YXlcIiwgXCJjb2RlXCI6IFwiVVlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVemJla2lzdGFuXCIsIFwiY29kZVwiOiBcIlVaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmFudWF0dVwiLCBcImNvZGVcIjogXCJWVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZlbmV6dWVsYVwiLCBcImNvZGVcIjogXCJWRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZpZXQgTmFtXCIsIFwiY29kZVwiOiBcIlZOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHMsIEJyaXRpc2hcIiwgXCJjb2RlXCI6IFwiVkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kcywgVS5TLlwiLCBcImNvZGVcIjogXCJWSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIldhbGxpcyBhbmQgRnV0dW5hXCIsIFwiY29kZVwiOiBcIldGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiV2VzdGVybiBTYWhhcmFcIiwgXCJjb2RlXCI6IFwiRUhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJZZW1lblwiLCBcImNvZGVcIjogXCJZRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlphbWJpYVwiLCBcImNvZGVcIjogXCJaTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlppbWJhYndlXCIsIFwiY29kZVwiOiBcIlpXXCIgfVxuICAgICAgICBdO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnZhbHVlKCdDb3VudHJ5Q29kZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgY29kZTogJzEnLCBjb3VudHJ5OiAnVVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxJywgY291bnRyeTogJ0NBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNycsIGNvdW50cnk6ICdSVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzcnLCBjb3VudHJ5OiAnS1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMCcsIGNvdW50cnk6ICdFRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzI3JywgY291bnRyeTogJ1pBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzAnLCBjb3VudHJ5OiAnR1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczMScsIGNvdW50cnk6ICdOTCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMyJywgY291bnRyeTogJ0JFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzMnLCBjb3VudHJ5OiAnRlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNCcsIGNvdW50cnk6ICdFUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzM2JywgY291bnRyeTogJ0hVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzknLCBjb3VudHJ5OiAnSVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MCcsIGNvdW50cnk6ICdSTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQxJywgY291bnRyeTogJ0NIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDMnLCBjb3VudHJ5OiAnQVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NCcsIGNvdW50cnk6ICdHQicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ1JywgY291bnRyeTogJ0RLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDYnLCBjb3VudHJ5OiAnU0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NycsIGNvdW50cnk6ICdOTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ3JywgY291bnRyeTogJ1NKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDgnLCBjb3VudHJ5OiAnUEwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0OScsIGNvdW50cnk6ICdERScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzUxJywgY291bnRyeTogJ1BFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTInLCBjb3VudHJ5OiAnTVgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MycsIGNvdW50cnk6ICdDVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU0JywgY291bnRyeTogJ0FSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTUnLCBjb3VudHJ5OiAnQlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NicsIGNvdW50cnk6ICdDTCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU3JywgY291bnRyeTogJ0NPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTgnLCBjb3VudHJ5OiAnVkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MCcsIGNvdW50cnk6ICdNWScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYxJywgY291bnRyeTogJ0FVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjEnLCBjb3VudHJ5OiAnQ0MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MScsIGNvdW50cnk6ICdDWCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYyJywgY291bnRyeTogJ0lEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjMnLCBjb3VudHJ5OiAnUEgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NCcsIGNvdW50cnk6ICdOWicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzY0JywgY291bnRyeTogJ1BOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjUnLCBjb3VudHJ5OiAnU0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NicsIGNvdW50cnk6ICdUSCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzgxJywgY291bnRyeTogJ0pQJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODInLCBjb3VudHJ5OiAnS1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NCcsIGNvdW50cnk6ICdWTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzg2JywgY291bnRyeTogJ0NOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTAnLCBjb3VudHJ5OiAnVFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5MScsIGNvdW50cnk6ICdJTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkyJywgY291bnRyeTogJ1BLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTMnLCBjb3VudHJ5OiAnQUYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NCcsIGNvdW50cnk6ICdMSycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzk1JywgY291bnRyeTogJ01NJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTgnLCBjb3VudHJ5OiAnSVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTEnLCBjb3VudHJ5OiAnU1MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTInLCBjb3VudHJ5OiAnTUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTInLCBjb3VudHJ5OiAnRUgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTMnLCBjb3VudHJ5OiAnRFonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTYnLCBjb3VudHJ5OiAnVE4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTgnLCBjb3VudHJ5OiAnTFknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjAnLCBjb3VudHJ5OiAnR00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjEnLCBjb3VudHJ5OiAnU04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjInLCBjb3VudHJ5OiAnTVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjMnLCBjb3VudHJ5OiAnTUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjQnLCBjb3VudHJ5OiAnR04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjUnLCBjb3VudHJ5OiAnQ0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjYnLCBjb3VudHJ5OiAnQkYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjcnLCBjb3VudHJ5OiAnTkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjgnLCBjb3VudHJ5OiAnVEcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjknLCBjb3VudHJ5OiAnQkonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzAnLCBjb3VudHJ5OiAnTVUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzEnLCBjb3VudHJ5OiAnTFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzInLCBjb3VudHJ5OiAnU0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzMnLCBjb3VudHJ5OiAnR0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzQnLCBjb3VudHJ5OiAnTkcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzUnLCBjb3VudHJ5OiAnVEQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzYnLCBjb3VudHJ5OiAnQ0YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzcnLCBjb3VudHJ5OiAnQ00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzgnLCBjb3VudHJ5OiAnQ1YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzknLCBjb3VudHJ5OiAnU1QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDAnLCBjb3VudHJ5OiAnR1EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDEnLCBjb3VudHJ5OiAnR0EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDInLCBjb3VudHJ5OiAnQ0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDMnLCBjb3VudHJ5OiAnQ0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDQnLCBjb3VudHJ5OiAnQU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDUnLCBjb3VudHJ5OiAnR1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDYnLCBjb3VudHJ5OiAnSU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDgnLCBjb3VudHJ5OiAnU0MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDknLCBjb3VudHJ5OiAnU0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTAnLCBjb3VudHJ5OiAnUlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTEnLCBjb3VudHJ5OiAnRVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTInLCBjb3VudHJ5OiAnU08nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTMnLCBjb3VudHJ5OiAnREonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTQnLCBjb3VudHJ5OiAnS0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTUnLCBjb3VudHJ5OiAnVFonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTYnLCBjb3VudHJ5OiAnVUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTcnLCBjb3VudHJ5OiAnQkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTgnLCBjb3VudHJ5OiAnTVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjAnLCBjb3VudHJ5OiAnWk0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjEnLCBjb3VudHJ5OiAnTUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjInLCBjb3VudHJ5OiAnWVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjInLCBjb3VudHJ5OiAnUkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjMnLCBjb3VudHJ5OiAnWlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjQnLCBjb3VudHJ5OiAnTkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjUnLCBjb3VudHJ5OiAnTVcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjYnLCBjb3VudHJ5OiAnTFMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjcnLCBjb3VudHJ5OiAnQlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjgnLCBjb3VudHJ5OiAnU1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjknLCBjb3VudHJ5OiAnS00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTAnLCBjb3VudHJ5OiAnU0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTEnLCBjb3VudHJ5OiAnRVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTcnLCBjb3VudHJ5OiAnQVcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTgnLCBjb3VudHJ5OiAnRk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTknLCBjb3VudHJ5OiAnR0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTAnLCBjb3VudHJ5OiAnR0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTEnLCBjb3VudHJ5OiAnUFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTInLCBjb3VudHJ5OiAnTFUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTMnLCBjb3VudHJ5OiAnSUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTQnLCBjb3VudHJ5OiAnSVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTUnLCBjb3VudHJ5OiAnQUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTYnLCBjb3VudHJ5OiAnTVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTcnLCBjb3VudHJ5OiAnQ1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTgnLCBjb3VudHJ5OiAnRkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTknLCBjb3VudHJ5OiAnQkcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzAnLCBjb3VudHJ5OiAnTFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzEnLCBjb3VudHJ5OiAnTFYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzInLCBjb3VudHJ5OiAnRUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzMnLCBjb3VudHJ5OiAnTUQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzQnLCBjb3VudHJ5OiAnQU0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzUnLCBjb3VudHJ5OiAnQlknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzYnLCBjb3VudHJ5OiAnQUQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzcnLCBjb3VudHJ5OiAnTUMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzgnLCBjb3VudHJ5OiAnU00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzknLCBjb3VudHJ5OiAnVkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODAnLCBjb3VudHJ5OiAnVUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODEnLCBjb3VudHJ5OiAnUlMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODInLCBjb3VudHJ5OiAnTUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODMnLCBjb3VudHJ5OiAnWEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODUnLCBjb3VudHJ5OiAnSFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODYnLCBjb3VudHJ5OiAnU0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODcnLCBjb3VudHJ5OiAnQkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODknLCBjb3VudHJ5OiAnTUsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjAnLCBjb3VudHJ5OiAnQ1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjEnLCBjb3VudHJ5OiAnU0snIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjMnLCBjb3VudHJ5OiAnTEknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDAnLCBjb3VudHJ5OiAnRksnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDEnLCBjb3VudHJ5OiAnQlonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDInLCBjb3VudHJ5OiAnR1QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDMnLCBjb3VudHJ5OiAnU1YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDQnLCBjb3VudHJ5OiAnSE4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDUnLCBjb3VudHJ5OiAnTkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDYnLCBjb3VudHJ5OiAnQ1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDcnLCBjb3VudHJ5OiAnUEEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDgnLCBjb3VudHJ5OiAnUE0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDknLCBjb3VudHJ5OiAnSFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTAnLCBjb3VudHJ5OiAnQkwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTAnLCBjb3VudHJ5OiAnTUYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTEnLCBjb3VudHJ5OiAnQk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTInLCBjb3VudHJ5OiAnR1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTMnLCBjb3VudHJ5OiAnRUMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTUnLCBjb3VudHJ5OiAnUFknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTcnLCBjb3VudHJ5OiAnU1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTgnLCBjb3VudHJ5OiAnVVknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTknLCBjb3VudHJ5OiAnQ1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTknLCBjb3VudHJ5OiAnQU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzAnLCBjb3VudHJ5OiAnVEwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzInLCBjb3VudHJ5OiAnQVEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzMnLCBjb3VudHJ5OiAnQk4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzQnLCBjb3VudHJ5OiAnTlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzUnLCBjb3VudHJ5OiAnUEcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzYnLCBjb3VudHJ5OiAnVE8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzcnLCBjb3VudHJ5OiAnU0InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzgnLCBjb3VudHJ5OiAnVlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzknLCBjb3VudHJ5OiAnRkonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODAnLCBjb3VudHJ5OiAnUFcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODEnLCBjb3VudHJ5OiAnV0YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODInLCBjb3VudHJ5OiAnQ0snIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODMnLCBjb3VudHJ5OiAnTlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODUnLCBjb3VudHJ5OiAnV1MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODYnLCBjb3VudHJ5OiAnS0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODcnLCBjb3VudHJ5OiAnTkMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODgnLCBjb3VudHJ5OiAnVFYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODknLCBjb3VudHJ5OiAnUEYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTAnLCBjb3VudHJ5OiAnVEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTEnLCBjb3VudHJ5OiAnRk0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTInLCBjb3VudHJ5OiAnTUgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTAnLCBjb3VudHJ5OiAnS1AnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTInLCBjb3VudHJ5OiAnSEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTMnLCBjb3VudHJ5OiAnTU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTUnLCBjb3VudHJ5OiAnS0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTYnLCBjb3VudHJ5OiAnTEEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4ODAnLCBjb3VudHJ5OiAnQkQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4ODYnLCBjb3VudHJ5OiAnVFcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjAnLCBjb3VudHJ5OiAnTVYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjEnLCBjb3VudHJ5OiAnTEInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjInLCBjb3VudHJ5OiAnSk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjMnLCBjb3VudHJ5OiAnU1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjQnLCBjb3VudHJ5OiAnSVEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjUnLCBjb3VudHJ5OiAnS1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjYnLCBjb3VudHJ5OiAnU0EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjcnLCBjb3VudHJ5OiAnWUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjgnLCBjb3VudHJ5OiAnT00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzAnLCBjb3VudHJ5OiAnUFMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzEnLCBjb3VudHJ5OiAnQUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzInLCBjb3VudHJ5OiAnSUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzMnLCBjb3VudHJ5OiAnQkgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzQnLCBjb3VudHJ5OiAnUUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzUnLCBjb3VudHJ5OiAnQlQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzYnLCBjb3VudHJ5OiAnTU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzcnLCBjb3VudHJ5OiAnTlAnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTInLCBjb3VudHJ5OiAnVEonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTMnLCBjb3VudHJ5OiAnVE0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTQnLCBjb3VudHJ5OiAnQVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTUnLCBjb3VudHJ5OiAnR0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTYnLCBjb3VudHJ5OiAnS0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTgnLCBjb3VudHJ5OiAnVVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI0MicsIGNvdW50cnk6ICdCUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjQ2JywgY291bnRyeTogJ0JCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNjQnLCBjb3VudHJ5OiAnQUknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI2OCcsIGNvdW50cnk6ICdBRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjg0JywgY291bnRyeTogJ1ZHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0zNDAnLCBjb3VudHJ5OiAnVkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTM0NScsIGNvdW50cnk6ICdLWScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNDQxJywgY291bnRyeTogJ0JNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS00NzMnLCBjb3VudHJ5OiAnR0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY0OScsIGNvdW50cnk6ICdUQycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjY0JywgY291bnRyeTogJ01TJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NzAnLCBjb3VudHJ5OiAnTVAnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY3MScsIGNvdW50cnk6ICdHVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjg0JywgY291bnRyeTogJ0FTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03MjEnLCBjb3VudHJ5OiAnU1gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTc1OCcsIGNvdW50cnk6ICdMQycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzY3JywgY291bnRyeTogJ0RNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03ODQnLCBjb3VudHJ5OiAnVkMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTkzOScsIGNvdW50cnk6ICdQUicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODQ5JywgY291bnRyeTogJ0RPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS04NjgnLCBjb3VudHJ5OiAnVFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg2OScsIGNvdW50cnk6ICdLTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODc2JywgY291bnRyeTogJ0pNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQtMTQ4MScsIGNvdW50cnk6ICdHRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ0LTE1MzQnLCBjb3VudHJ5OiAnSkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NC0xNjI0JywgY291bnRyeTogJ0lNJyB9XG4gICAgICAgIF07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKXtcbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5ob21lJywge30pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAgICAgJHNjb3BlLnNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9zaWdudXAnLCB1c2VySW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWNjZXNzID09PSB0cnVlICYmIHR5cGVvZihyZXN1bHQuZGF0YS5tZXNzYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gcmVzdWx0LmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXSk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWxbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgICAgIHZhciBjcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YS50b2tlbik7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihhY3RpdmVTdGF0ZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLnNpZ251cCcpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocGF5bG9hZC5yb2xlLCBwYXlsb2FkLnJvbGVfaWQsIHRydWUsIGFjdGl2ZVN0YXRlLCBhY3RpdmVTdGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1c1RleHQgPT09ICdVbmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVGhlIGVtYWlsIG9yIHBhc3N3b3JkIHlvdSBlbnRlcmVkIGlzIGluY29ycmVjdC4nXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnIuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IExvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoQ29uZmlybUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLmNvZGUpICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YoJHN0YXRlUGFyYW1zLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY29uZmlybWF0aW9uX2NvZGU6ICRzdGF0ZVBhcmFtcy5jb2RlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvY29uZmlybScsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyb3IuZGF0YS5lcnJvcjtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhSZWNvdmVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHApe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICByZWNvdmVyeUVtYWlsOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkX3JlcGVhdDogJydcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mKCRzdGF0ZVBhcmFtcy50b2tlbikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVjb3ZlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBQYXNzd29yZFxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEucmVjb3ZlcnlFbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvZm9yZ290JywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9ICdBIHBhc3N3b3JkIHJlc2V0IGxpbmsgaGFzIGJlZW4gc2VudCB0byB5b3VyIGVtYWlsLic7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuZXJyb3IgPT09ICdJbnZhbGlkIFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVjb3ZlcmluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAvLyBSZXNldCBQYXNzd29yZFxuICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnBhc3N3b3JkLmxlbmd0aCA+PSA2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnBhc3N3b3JkID09PSAkc2NvcGUuZGF0YS5wYXNzd29yZF9yZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiAkc3RhdGVQYXJhbXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogJHN0YXRlUGFyYW1zLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAkc2NvcGUuZGF0YS5wYXNzd29yZF9yZXBlYXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9yZWNvdmVyJywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGF1dGgucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyBmcm9tIGhlcmUgLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZXNldHRpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdQYXNzd29yZHMgZG8gbm90IG1hdGNoISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdQYXNzd29yZHMgbmVlZCB0byBiZSBsb25nZXIgdGhhbiA2IGNoYXJhY3RlcnMhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFVUkkpO1xuICAgICAgICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgICAgIHZhciBieXRlU3RyaW5nO1xuICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuICAgICAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgICAgIHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgICAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZvY3VzT24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7IGZvY3VzT246ICc9JyB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZS5mb2N1c09uKTtcblxuICAgICAgICAgICAgICAgIGlmKHNjb3BlLmZvY3VzT24pe1xuICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgfTtcbiAgICB9KTtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICRyZXNvdXJjZSwgRmRTY3JvbGxlciwgJGZpbHRlciwgRmlsZVVwbG9hZGVyLCBDb3VudHJpZXMsIENvdW50cnlDb2Rlcykge1xuXG4gICAgICAgICRzY29wZS5mb3JtID0ge1xuICAgICAgICAgICAgY3VycmVudFN0ZXA6IDEsXG4gICAgICAgICAgICB0b3RhbFN0ZXBzOiAzXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvdGFsU3RlcHMgPSB7XG4gICAgICAgICAgICBjcmVhdG9yOiAzLFxuICAgICAgICAgICAgZXhwZXJ0OiA0LFxuICAgICAgICAgICAgaW52ZXN0b3I6IDRcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlRm9ybVN0ZXAgPSBmdW5jdGlvbihuZXdTdGVwKXtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLmN1cnJlbnRTdGVwID0gbmV3U3RlcDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb3VudHJpZXMgPSBDb3VudHJpZXMoKTtcbiAgICAgICAgJHNjb3BlLmNvdW50cnlDb2RlcyA9IENvdW50cnlDb2RlcygpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCckc2NvcGUuY291bnRyaWVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3VudHJpZXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnJHNjb3BlLmNvdW50cnlDb2RlcycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291bnRyeUNvZGVzKTtcblxuICAgICAgICAkc2NvcGUuY29udGFjdFRpbWVzID0gW1xuICAgICAgICAgICAge25hbWU6ICdXb3JraW5nIGhvdXJzICg5YW0gdG8gNiBwbSknLCB2YWx1ZTogJzktNid9LFxuICAgICAgICAgICAge25hbWU6ICdFdmVuaW5nIHRpbWUgKDZhbSB0byA5IHBtKScsIHZhbHVlOiAnNi05J31cbiAgICAgICAgXTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkUm9sZTogJ2NyZWF0b3InLFxuICAgICAgICAgICAgYWdlR2F0ZTogJ3llcycsXG4gICAgICAgICAgICBjb3VudHJ5T3JpZ2luOiAnJyxcbiAgICAgICAgICAgIGNvdW50cnlSZXNpZGVuY2U6ICcnLFxuICAgICAgICAgICAgY29udGFjdFRpbWU6ICcnLFxuICAgICAgICAgICAgZXhwZXJ0aXNlRm9ybToge1xuICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyb3BwZWRUaHVtYm5haWw6IG51bGwsXG4gICAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZVJvbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLnRvdGFsU3RlcHMgPSAkc2NvcGUudG90YWxTdGVwc1skc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4oKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykgKiAxMDAsIDk2KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzc0ludmVydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoKCgxIC0gKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykpICogMTAwKSwgNCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh1c2VyLnJlZ2lzdGVyZWQgPT0gMSkgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgaGFuZGxlRmlsZVNlbGVjdCA9IGZ1bmN0aW9uKGV2dCwgZHJvcCkge1xuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGltYWdlIHRvIGNyb3AnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50aHVtYm5haWwgPSBldnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2ZpbGVJbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJvcCcsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnVwbG9hZGVyID0gbmV3IEZpbGVVcGxvYWRlcih7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2ZpbGVzJyxcbiAgICAgICAgICAgIHJlbW92ZUFmdGVyVXBsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jb25maXJtSW1hZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGltYWdlID0gJHNjb3BlLmRhdGEuY3JvcHBlZFRodW1ibmFpbDtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbGUubmFtZSA9ICd0aHVtYm5haWxfJyArICRyb290U2NvcGUudXNlci5pZCArICcucG5nJztcblxuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe2F0dGFjaDogJ3RodW1ibmFpbCd9KTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe3VzZXJfaWQ6ICRyb290U2NvcGUudXNlci5pZH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gbnVsbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3BvbnNlLmZpbGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSAnWW91ciBwcm9maWxlIHBpY3R1cmUgd2FzIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZCEnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZUVycm9yID0gJ1Byb2ZpbGUgcGljdHVyZSBmYWlsZWQgdG8gdXBsb2FkLCBwbGVhc2UgdHJ5IGFnYWluISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLmFkZFRvUXVldWUoZGF0YVVSSXRvQmxvYihpbWFnZSkpO1xuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKCdhcGkvc2tpbGxzJykucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKXtcbiAgICAgICAgICAgIHZhciBsYXN0SW5wdXR0ZWRFeHBlcnRpc2UgPSB7c2VsZWN0ZWRFeHBlcnRpc2U6ICdudWxsJywgb3RoZXJFeHBlcnRpc2U6IHtzdGF0dXM6IDF9fTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLTFdO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGFzdElucHV0dGVkRXhwZXJ0aXNlKTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIDwgMyAmJiAobGFzdElucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsICYmIGxhc3RJbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNraWxsc0xpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZUNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGxzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJTa2lsbHM6IHtsaXN0OiBbXSwgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2VDYXRlZ29yeSwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5KGluZGV4KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oZSwgaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2Upe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBleHBlcnRpc2U7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdChpbmRleCk7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5pblNraWxscyA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICB2YXIgZm91bmRTa2lsbCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZm91bmRTa2lsbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kU2tpbGwubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdFNraWxsID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIGlmKCEkc2NvcGUuaW5Ta2lsbHMoaW5kZXgsIHNraWxsKSl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMucHVzaChza2lsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdFNraWxsID0gZnVuY3Rpb24oZSwgaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFuZ3VsYXIuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVNraWxscyA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzID0ge2xpc3Q6IFtdLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LzAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlLmlkICsgJy9za2lsbHMvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuc3VibWl0RGV0YWlscyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEuZm5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkc2NvcGUuZGF0YS5sbmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsXG4gICAgICAgICAgICAgICAgYWdlX2dhdGU6ICRzY29wZS5kYXRhLmFnZUdhdGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9vcmlnaW46ICRzY29wZS5kYXRhLmNvdW50cnlPcmlnaW4sXG4gICAgICAgICAgICAgICAgY291bnRyeV9yZXNpZGVuY2U6ICRzY29wZS5kYXRhLmNvdW50cnlSZXNpZGVuY2UsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXI6ICRzY29wZS5kYXRhLmNvbnRhY3ROdW1iZXIsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXJfY291bnRyeV9jb2RlOiAkc2NvcGUuZGF0YS5jb250YWN0TnVtYmVyQ291bnRyeUNvZGUuY29kZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X3RpbWU6ICRzY29wZS5kYXRhLmNvbnRhY3RUaW1lLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2goJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlc3RtZW50QnVkZ2V0ID09PSAnb3RoZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0T3RoZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXQgPSBpbnZlc3RtZW50QnVkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2dvYWwgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRHb2FsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X3JlYXNvbiA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudFJlYXNvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuY3JlYXRvciA9IHt9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4cGVydCc6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydCA9IHsgbGlzdDogW10gfTtcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCwgZnVuY3Rpb24oaW5wdXR0ZWRFeHBlcnRpc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsIHx8IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJ0Lmxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHM6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkU2tpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLm5hbWUgPSAkc2NvcGUuZGF0YS5mbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLmxhc3RfbmFtZSA9ICRzY29wZS5kYXRhLmxuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUoJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlcikge1xuXG4gICAgICAgICRzY29wZS5jb250ZXN0cyA9IFtdO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cyA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicgJiYgdHlwZW9mKCRyb290U2NvcGUudXNlci5jcmVhdG9yKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIG9nYyBpbiAkcm9vdFNjb3BlLnVzZXIuY3JlYXRvci5vbmdvaW5nX2NvbnRlc3Qpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdFtvZ2NdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKHJlc3VsdCwge2lkOiBjb250ZXN0X2lkfSwgdHJ1ZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMucHVzaChjb250ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9nY0luZGV4ID0gJHNjb3BlLmNvbnRlc3RzLmluZGV4T2YoY29udGVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2djSW5kZXggOiAnICsgb2djSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3RzLnNwbGljZShvZ2NJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZigkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5JyAmJiAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGpjIGluICRyb290U2NvcGUudXNlci5qdWRnaW5nKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3RfaWQgPSAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZ1tqY10uY29udGVzdF9pZDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKHJlc3VsdCwge2lkOiBjb250ZXN0X2lkfSwgdHJ1ZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qdWRnaW5nQ29udGVzdHMucHVzaChjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmZEVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgZWxlbWVudC5iaW5kKFwia2V5ZG93biBrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMuZmRFbnRlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0U2luZ2xlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGZpbHRlciwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsICRodHRwLCBMaWdodGJveCkge1xuICAgICAgICAkc2NvcGUuY29udGVzdElkID0gJHN0YXRlUGFyYW1zLmNvbnRlc3RJZDtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBjb250ZXN0RnVsbERlc2NyaXB0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGFkZEVudHJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGFkZEVudHJ5Rm9ybToge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50cnk6IG51bGwsXG4gICAgICAgICAgICByYXRpbmc6IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICcnLFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICcnLFxuICAgICAgICAgICAgICAgIG1hcmtldDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnkgPSAkcmVzb3VyY2UoJy9hcGkvZW50cmllcy86ZW50cnlJZCcsIHtcbiAgICAgICAgICAgIGVudHJ5SWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvbnRlc3RhbnRFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2NyZWF0b3IvOmNyZWF0b3JJZCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGp1ZGdlRW50cmllczoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzL2NvbnRlc3QvOmNvbnRlc3RJZC9qdWRnZS86anVkZ2VJZCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzLzplbnRyeUlkL21lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnlSYXRpbmcgPSAkcmVzb3VyY2UoJy9hcGkvZW50cnktcmF0aW5ncy86ZW50cnlSYXRpbmdJZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuc2hvd0Z1bGxUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuY29udGVzdEZ1bGxEZXNjcmlwdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaGlkZUZ1bGxUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBDb250ZXN0LmdldCh7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWRcbiAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB2YXIganVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZW5kaW5nSnVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBjb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZW5kaW5nQ29udGVzdGluZyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5jb250ZXN0aW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGp1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGp1ZGdlYWJsZS5sZW5ndGggPiAwICYmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09ICdqdXJ5JyAmJiAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09ICdjcmVhdG9yJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LmNvbnRlc3RJZCA9IHJlc3VsdC5pZDtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5vbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICdqdXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IHJlc3VsdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmIGp1ZGdlYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygkcm9vdFNjb3BlLmFjdGl2ZVJvbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwZW5kaW5nSnVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0p1ZGdlYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVzdGluZy5sZW5ndGggPiAwICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2NyZWF0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdDb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0NvbnRlc3RpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5sb2FkRW50cmllcyA9IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHN3aXRjaChyb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdqdXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgRW50cnkuanVkZ2VFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlSWQ6ICRyb290U2NvcGUudXNlci5pZFxuICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiAnY3JlYXRvcid9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0b3IgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW50cnkuY29udGVzdGFudEVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3IuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICB2YXIganVkZ2VJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5Jykge1xuICAgICAgICAgICAgICAgIGp1ZGdlSWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChqdWRnZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2VudHJpZXMvJyArIGVudHJ5LmlkICsgJy9qdWRnZS8nICsganVkZ2VJZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nID0gcmVzdWx0LmRhdGEucmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBFbnRyeS5nZXQoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeUlkOiBlbnRyeS5pZFxuICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3BlbkxpZ2h0Ym94ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgdmFyIGFsbEZpbGVzID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5maWxlcztcbiAgICAgICAgICAgIHZhciBhbGxJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSAwO1xuXG4gICAgICAgICAgICBmb3IodmFyIGFGIGluIGFsbEZpbGVzKXtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGFsbEZpbGVzW2FGXTtcbiAgICAgICAgICAgICAgICBhbGxJbWFnZXMucHVzaChmaWxlLnVybCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsZS51cmwgPT09IGl0ZW0udXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGFGO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGlnaHRib3gub3Blbk1vZGFsKGFsbEltYWdlcywgY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uIChldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGVBZGRlZCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmxvd0ZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBmaWxlcyA6ICcgKyBtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgJGZpbGUucmVmX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuXG4gICAgICAgICAgICAvLyB2YXIgaXRlbXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcywge2lkOiBtZXNzYWdlLmZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YobWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5maWxlLmlkLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlUmVtb3ZlID0gZnVuY3Rpb24oZmlsZSwgJGZsb3cpIHtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IGZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YoZmlsZS5yZWZfaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZpbGVzSW5kZXggPSAkZmxvdy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICAgICAgaWYgKGZpbGVzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSBmaWxlcyAuLi4gJyArIGZpbGVzSW5kZXgpO1xuICAgICAgICAgICAgICAgICRmbG93LmZpbGVzLnNwbGljZShmaWxlc0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cuZmlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNob3dBZGRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5lbnRyaWVzLWxpc3QnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb24gPSAnJztcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICRzY29wZS5jb250ZXN0LmVudHJpZXNbJHNjb3BlLmNvbnRlc3QuZW50cmllcy5sZW5ndGggLSAxXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWRGaWxlcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHRodW1ibmFpbF9pZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZmxvdy5maWxlcywgZnVuY3Rpb24oZmlsZSl7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRGaWxlc1tmaWxlLnJlZl9pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICdjYXB0aW9uJzogZmlsZS5yZWZfY2FwdGlvblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlcGFyZSB0byBhc3NpZ24gdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgIT09IC0xICYmIHRodW1ibmFpbF9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2hvb3BpZSBpdCBtYXRjaGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbF9pZCA9IGZpbGUucmVmX2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBuZXcgRW50cnkoKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5jcmVhdG9yX2lkID0gcm9sZS5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS5jb250ZXN0X2lkID0gJHNjb3BlLmNvbnRlc3QuaWQ7XG4gICAgICAgICAgICAgICAgZW50cnkudGh1bWJuYWlsX2lkID0gdGh1bWJuYWlsX2lkO1xuXG4gICAgICAgICAgICAgICAgZW50cnkubmFtZSA9ICRyb290U2NvcGUudXNlci5uYW1lICsgXCIncyBFbnRyeVwiO1xuICAgICAgICAgICAgICAgIGVudHJ5LmRlc2NyaXB0aW9uID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGVudHJ5LmF0dGFjaGVkX2ZpbGVzID0gYXR0YWNoZWRGaWxlcztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LnRodW1ibmFpbF9pZCk7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VudHJ5IFNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ0VudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2NyZWF0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRW50cnkuc2VuZE1lc3NhZ2Uoe2VudHJ5SWQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWR9LCBtZXNzYWdlUmVxdWVzdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5Lm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNhdmVNYXJrcyA9IGZ1bmN0aW9uKGVudHJ5UmF0aW5nSWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlZFJhdGluZyA9IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmRlc2lnbixcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5jcmVhdGl2aXR5LFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmluZHVzdHJpYWwsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5tYXJrZXQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmp1ZGdlX2lkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5lbnRyeV9pZCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZW50cnlSYXRpbmdJZCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgRW50cnlSYXRpbmcudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogZW50cnlSYXRpbmdJZFxuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZWRSYXRpbmcpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBzYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5UmF0aW5nID0gbmV3IEVudHJ5UmF0aW5nKHVwZGF0ZWRSYXRpbmcpO1xuICAgICAgICAgICAgICAgIGVudHJ5UmF0aW5nLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIGNyZWF0ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnanVyeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTaG93IE5EQVxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0SnVkZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMvYmVjb21lSnVkZ2UnLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVDb250ZXN0YW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFjY2VwdENvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy9iZWNvbWVDb250ZXN0YW50Jywge2NvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0LmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0LCAkZmlsdGVyLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGUgU3RhcnRlZCcpO1xuICAgICAgICAvLyAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgIC8vIEF2YWlsYWJsZSBWaWV3cyA6IExpc3QsIENyZWF0ZVxuICAgICAgICAkc2NvcGUudmlldyA9ICdsaXN0JztcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBuZXdQcm9qZWN0TG9hZGluZzogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucHJvamVjdCA9IG51bGw7XG5cbiAgICAgICAgdmFyIFByb2plY3QgPSAkcmVzb3VyY2UoJy9hcGkvcHJvamVjdHMvOnByb2plY3RJZCcsIHtcbiAgICAgICAgICAgIHByb2plY3RJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVxdWlyZWRSb2xlID0gJ2NyZWF0b3InO1xuICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7IHJvbGU6IHJlcXVpcmVkUm9sZSB9LCB0cnVlKTtcblxuICAgICAgICBpZiAodHlwZW9mKG1hdGNoaW5nUm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiBtYXRjaGluZ1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ1JvbGUgPSBtYXRjaGluZ1JvbGVzWzBdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSByZXF1aXJlZFJvbGUpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJlcXVpcmVkUm9sZSwgbWF0Y2hpbmdSb2xlLmlkLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByb2plY3RJZCA9IHBhcnNlSW50KCRzdGF0ZVBhcmFtcy5wcm9qZWN0SWQpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3RJZCkgPT09ICd1bmRlZmluZWQnIHx8IGlzTmFOKHByb2plY3RJZCkpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsbFByb2plY3RzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc051bWJlcihwcm9qZWN0SWQpICYmIGlzRmluaXRlKHByb2plY3RJZCkpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0LmdldCh7IHByb2plY3RJZDogcHJvamVjdElkIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wcm9qZWN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0LnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuc3VwZXJleHBlcnQnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRpc2UnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRzJywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFrZSB1cCB5b3VyIG1pbmQgeW91IHBlaWNlIG9mIHNoaXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5ob21lJyk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nb1RvUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywgeyBwcm9qZWN0SWQ6IHByb2plY3QuaWQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY3JlYXRlTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubmV3UHJvamVjdExvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCkuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5nb1RvUHJvamVjdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm5ld1Byb2plY3RMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTYXZpbmcgcHJvZ3Jlc3Mgbm93ICEnKTtcbiAgICAgICAgICAgIHZhciBwcm9qZWN0ID0gYW5ndWxhci5jb3B5KCRzY29wZS5wcm9qZWN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRzY29wZS5wcm9qZWN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RJZDogJHNjb3BlLnByb2plY3QuaWRcbiAgICAgICAgICAgICAgICB9LCBwcm9qZWN0KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVEZXRhaWxzQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRGV0YWlsc0N0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgZmVhdHVyZWRJbWFnZToge31cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgZ2VvZ3JhcGh5OiAnd2hlcmV2ZXInXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kZXRhaWxzID0gcHJvamVjdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Qgc3RpbGwgbG9hZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuJG9uKCdmbG93OjpmaWxlQWRkZWQnLCBmdW5jdGlvbihldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGUgYWRkZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZlYXR1cmVkSW1hZ2VTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZpbGUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIGZpbGVzIDogJyArIG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC50aHVtYm5haWxfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYXR0YWNoZWRGaWxlc1N1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUucHJvamVjdC5hdHRhY2hlZEZpbGVzLmluZGV4T2YobWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LmF0dGFjaGVkRmlsZXMucHVzaChtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdERyYWZ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdGF0ZSA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJyNwcm9qZWN0U3RlcHMnKTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZVNFQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZVNFQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3N1cGVyLWV4cGVydHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLnN1cGVyRXhwZXJ0cyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2hvb3NlU3VwZXJFeHBlcnQgPSBmdW5jdGlvbihzdXBlckV4cGVydCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3VwZXJfZXhwZXJ0X2lkID0gc3VwZXJFeHBlcnQuaWQ7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRpc2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVFeHBlcnRpc2VDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gW107XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoJy9hcGkvcHJvamVjdHMvOnByb2plY3RJZC9leHBlcnRpc2UnLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFByb2plY3RFeHBlcnRpc2UucXVlcnkoe3Byb2plY3RJZDogJHNjb3BlLnByb2plY3QuaWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc2F2ZUV4cGVydGlzZSA9IGZ1bmN0aW9uKGV4cGVydGlzZSl7XG4gICAgICAgICAgICB2YXIgcHJvamVjdEV4cGVydGlzZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2V4cGVydGlzZV9pZCc6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZS5pZCxcbiAgICAgICAgICAgICAgICAndGFzayc6IGV4cGVydGlzZS5tYWluVGFzayxcbiAgICAgICAgICAgICAgICAnYnVkZ2V0JzogZXhwZXJ0aXNlLmJ1ZGdldCxcbiAgICAgICAgICAgICAgICAnbGVhZF90aW1lJzogZXhwZXJ0aXNlLmxlYWRUaW1lLFxuICAgICAgICAgICAgICAgICdzdGFydF9kYXRlJzogZXhwZXJ0aXNlLnN0YXJ0RGF0ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9wcm9qZWN0cy8nICsgJHNjb3BlLnByb2plY3QuaWQgKyAnL2V4cGVydGlzZScsIHByb2plY3RFeHBlcnRpc2VEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0LnB1c2gocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vICRzY29wZS5leHBlcnRpc2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgLy8gICAgIGV4cGVydGlzZUNhdGVnb3J5OiBleHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5uYW1lLFxuICAgICAgICAgICAgLy8gICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5OiBleHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeS5uYW1lLFxuICAgICAgICAgICAgLy8gICAgIGV4cGVydGlzZTogZXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLm5hbWUsXG4gICAgICAgICAgICAvLyAgICAgbWFpblRhc2s6IGV4cGVydGlzZS5tYWluVGFzayxcbiAgICAgICAgICAgIC8vICAgICBidWRnZXQ6IGV4cGVydGlzZS5idWRnZXQsXG4gICAgICAgICAgICAvLyAgICAgbGVhZFRpbWU6IGV4cGVydGlzZS5sZWFkVGltZSxcbiAgICAgICAgICAgIC8vICAgICBzdGFydERhdGU6IGV4cGVydGlzZS5zdGFydERhdGUsXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVFeHBlcnRpc2VTZWxlY3Rpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScpO1xuICAgICAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbGFzdElucHV0dGVkRXhwZXJ0aXNlID0geyBzZWxlY3RlZEV4cGVydGlzZTogJ251bGwnLCBvdGhlckV4cGVydGlzZTogeyBzdGF0dXM6IDEgfSB9O1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFskc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPCAzICYmIChsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UgIT09IG51bGwgJiYgbGFzdElucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VDYXRlZ29yeTogeyBuYW1lOiAnJywgc3RhdHVzOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2U6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluVGFzazogJycsXG4gICAgICAgICAgICAgICAgICAgIGJ1ZGdldDogJycsXG4gICAgICAgICAgICAgICAgICAgIGxlYWRUaW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2VDYXRlZ29yeSwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeShpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oZSwgaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZSkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBleHBlcnRpc2U7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihlLCBpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8wJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS9jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUV4cGVydEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVFeHBlcnRDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgIHZhciBQcm9qZWN0RXhwZXJ0aXNlID0gJHJlc291cmNlKCcvYXBpL3Byb2plY3RzLzpwcm9qZWN0SWQvZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgUHJvamVjdEV4cGVydGlzZS5xdWVyeSh7cHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zaG9ydGxpc3RFeHBlcnQgPSBmdW5jdGlvbihleHBlcnRpc2UsIGJpZCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKGV4cGVydGlzZS5zaG9ydGxpc3QpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGV4cGVydGlzZS5zaG9ydGxpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhwZXJ0aXNlLnNob3J0bGlzdC5wdXNoKGJpZCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGlzY3Vzc0V4cGVydCA9IGZ1bmN0aW9uKGV4cGVydGlzZSwgYmlkKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkQmlkID0gYmlkXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlQnVkZ2V0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUJ1ZGdldEN0cmwgU3RhcnRlZCcpO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlSW52ZXN0b3JzQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUludmVzdG9yc0N0cmwgU3RhcnRlZCcpO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0V4cGVydEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkZmlsdGVyLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeHBlcnQgU3RhcnRlZCcpO1xuXG4gICAgICAgIHZhciBBdmFpbGFibGVFeHBlcnRpc2UgPSAkcmVzb3VyY2UoJy9hcGkvZXhwZXJ0aXNlL2F2YWlsYWJsZScpO1xuXG4gICAgICAgIHZhciBNYXRjaGluZ0V4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9leHBlcnRpc2UvbWF0Y2hpbmcnLCB7fSwge1xuICAgICAgICBcdHF1ZXJ5OiB7XG4gICAgICAgIFx0XHRtZXRob2Q6ICdHRVQnLFxuICAgICAgICBcdFx0aXNBcnJheTogZmFsc2VcbiAgICAgICAgXHR9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXF1aXJlZFJvbGUgPSAnZXhwZXJ0JztcbiAgICAgICAgdmFyIG1hdGNoaW5nUm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywgeyByb2xlOiByZXF1aXJlZFJvbGUgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGFjY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2YobWF0Y2hpbmdSb2xlcykgIT09ICd1bmRlZmluZWQnICYmIG1hdGNoaW5nUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nUm9sZSA9IG1hdGNoaW5nUm9sZXNbMF07XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09IHJlcXVpcmVkUm9sZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocmVxdWlyZWRSb2xlLCBtYXRjaGluZ1JvbGUuaWQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmhvbWUnKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjY2Vzcykge1xuICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICBcdEF2YWlsYWJsZUV4cGVydGlzZS5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHRcdGNvbnNvbGUubG9nKCdBbGwgYXZhaWxhYmxlIGV4cGVydGlzZScpO1xuICAgICAgICBcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgXHR9KTtcblxuICAgICAgICBcdE1hdGNoaW5nRXhwZXJ0aXNlLnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdFx0Y29uc29sZS5sb2coJ0FsbCBtYXRjaGluZyBleHBlcnRpc2UnKTtcbiAgICAgICAgXHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgXHRcdCRzY29wZS5tYXRjaGluZ0V4cGVydGlzZSA9IHJlc3VsdC5leHBlcnRpc2U7XG4gICAgICAgIFx0fSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0V4cGVydGlzZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeHBlcnRpc2UgU3RhcnRlZCcpO1xuICAgICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMuZXhwZXJ0aXNlSWQpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoJy9hcGkvcHJvamVjdC1leHBlcnRpc2UvOmV4cGVydGlzZUlkJywge1xuICAgICAgICBcdGV4cGVydGlzZUlkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLmdldCh7ZXhwZXJ0aXNlSWQ6ICRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHQkc2NvcGUuZXhwZXJ0aXNlID0gcmVzdWx0O1xuICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdEJpZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgYmlkRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYmlkX2Ftb3VudCc6ICRzY29wZS5kYXRhLmJpZF9hbW91bnQsXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJHNjb3BlLmRhdGEuYmlkX2Rlc2NyaXB0aW9uXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3Byb2plY3QtZXhwZXJ0aXNlLycgKyAkc3RhdGVQYXJhbXMuZXhwZXJ0aXNlSWQgKyAnL2JpZCcsIGJpZERhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlLmJpZCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdGb290ZXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkaHR0cCwgJHRpbWVvdXQsICRmaWx0ZXIpIHtcbiAgICAgICAgJHNjb3BlLm5vdGlmaWNhdGlvbnMgPSBudWxsO1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRmxhc2hOb3RpY2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcyA9IHt9O1xuXG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3ID0ge1xuICAgICAgICBcdHNob3c6IGZhbHNlLFxuICAgICAgICBcdGNvbnRlc3RJZDogMCxcbiAgICAgICAgXHRvbkNsaWNrOiBmdW5jdGlvbigpe1xuICAgICAgICBcdFx0Y29uc29sZS5sb2coJ29uQ2xpY2snKTtcbiAgICAgICAgXHRcdCRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUoJ2p1cnknLCA1LCB0cnVlKTtcbiAgICAgICAgXHR9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdWliTW9kYWwpIHtcblxuICAgICAgICAkc2NvcGUudHJpZ2dlckxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ3RyaWdnZXIgbG9naW4hJyk7XG5cbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICAgICAgd2luZG93Q2xhc3M6ICdsb2dpbi1tb2RhbCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHb3QgY2xvc2UgZmVlZGJhY2shJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJ01vZGFsIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UpIHtcbiAgICBcdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCl7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdsb2dnaW5nIGluIG5vdyAhJyk7XG4gICAgXHR9XG5cbiAgICBcdCRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbigpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnYXV0aCBpbiBub3cgIScpO1xuICAgIFx0fVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdOYXZpZ2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGxvZywgJHRpbWVvdXQsICRmaWx0ZXIsICRodHRwLCAkcmVzb3VyY2UsICR1aWJNb2RhbCwgRmlsZVVwbG9hZGVyLCBDb3VudHJ5Q29kZXMpIHtcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKCdhcGkvc2tpbGxzJykucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvZmlsZXMnLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICB1c2VyU2V0dGluZ3NNb2RlOiAndmlldycsXG4gICAgICAgICAgICB1c2VyU2V0dGluZ3NTYXZlOiAtMSxcbiAgICAgICAgICAgIHNvY2lhbENvbm5lY3Q6IHtcbiAgICAgICAgICAgICAgICBmYWNlYm9vazoge30sXG4gICAgICAgICAgICAgICAgbGlua2VkaW46IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHdvRkE6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGU6IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIuY29udGFjdF9udW1iZXJfY291bnRyeV9jb2RlKSxcbiAgICAgICAgICAgICAgICBudW1iZXI6IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIuY29udGFjdF9udW1iZXIpLFxuICAgICAgICAgICAgICAgIHZlcmlmaWNhdGlvbkNvZGU6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY291bnRyeUNvZGVzID0gQ291bnRyeUNvZGVzKCk7XG5cbiAgICAgICAgJHNjb3BlLnN0YXJ0VHdvRkFWZXJpZnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgY291bnRyeUNvZGUgPSAxO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlLmNvZGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlID0gJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGUuY29kZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlID0gJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2ZXJpZmljYXRpb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIHZpYTogJ3NtcycsXG4gICAgICAgICAgICAgICAgY291bnRyeV9jb2RlOiBwYXJzZUludChjb3VudHJ5Q29kZSksXG4gICAgICAgICAgICAgICAgcGhvbmVfbnVtYmVyOiBwYXJzZUludCgkc2NvcGUuZGF0YS50d29GQS5udW1iZXIpLFxuICAgICAgICAgICAgICAgIGxvY2FsZTogJ2VuJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS92ZXJpZmljYXRpb24vc3RhcnQnLCB2ZXJpZmljYXRpb25EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5jb2RlU2VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY29tcGxldGVUd29GQVZlcmZpeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBjb3VudHJ5Q29kZSA9IDE7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGUuY29kZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZS5jb2RlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZlcmlmaWNhdGlvbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9jb2RlOiBwYXJzZUludCgkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZSksXG4gICAgICAgICAgICAgICAgcGhvbmVfbnVtYmVyOiBwYXJzZUludCgkc2NvcGUuZGF0YS50d29GQS5udW1iZXIpLFxuICAgICAgICAgICAgICAgIHZlcmlmaWNhdGlvbl9jb2RlOiBwYXJzZUludCgkc2NvcGUuZGF0YS50d29GQS52ZXJpZmljYXRpb25Db2RlKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS92ZXJpZmljYXRpb24vY2hlY2snLCB2ZXJpZmljYXRpb25EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZlcmlmaWNhdGlvbiBkYXRhJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEuY29kZVNlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEudmVyaWZ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5waG9uZV92ZXJpZmllZCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc29jaWFsQ29ubmVjdCA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zb2NpYWxDb25uZWN0W3Byb3ZpZGVyXS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3Byb3ZpZGVyXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IExvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc29jaWFsVW5saW5rID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBudWxsO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zb2NpYWxDb25uZWN0W3Byb3ZpZGVyXS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgc3dpdGNoKHByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICBjYXNlICdmYWNlYm9vayc6IG1ldGhvZCA9ICd1bmxpbmtGYWNlYm9vayc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGlua2VkaW4nOiBtZXRob2QgPSAndW5saW5rTGlua2VkaW4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS8nICsgbWV0aG9kLCB7fSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3Byb3ZpZGVyXSA9IG51bGw7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2ZpbGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0gYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlcik7XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2NyZWF0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnaW52ZXN0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnanVkZ2luZyddO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMDtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzTW9kZSA9ICd2aWV3JztcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgdXNlciB0aHVtYm5haWxcbiAgICAgICAgJHNjb3BlLmNoYW5nZVRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL2FwcC9hcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyVGh1bWJuYWlsQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci50aHVtYm5haWwgPSBhbmd1bGFyLmNvcHkodGh1bWJuYWlsKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgdXNlciB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBTdGFydCB1cGxvYWRpbmcgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKHRodW1ibmFpbCkpO1xuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvZ291dFxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhY3R1YWxseSBsb2dnaW5nIG91dCEgLi4uJyk7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3B1bGF0ZSBzaWRlIG5hdmlnYXRpb25cbiAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXJzL3NpZGVOYXZpZ2F0aW9uRGF0YScpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNpZGVOYXZpZ2F0aW9uRGF0YSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICRzY29wZS5wb3B1bGF0ZVNpZGVOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5vcGVuRnVsbE1lbnUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nb1RvTGluayA9IGZ1bmN0aW9uKHBhZ2UsIGRhdGEsIHJvbGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gMDtcblxuICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiByb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgdHJ1ZSwgcGFnZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdVc2VyVGh1bWJuYWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHVpYk1vZGFsSW5zdGFuY2Upe1xuICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnNldFRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5jcm9wcGVkVGh1bWJuYWlsKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfVxuICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hvbWUgVmlldyBTdGFydGVkJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAvLyAgICAgICRzY29wZS5jb250ZXN0cyA9IFtdO1xuICAgLy8gICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAvLyAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAvLyAgICAgIFx0Y29udGVzdElkOiAnQGlkJ1xuICAgLy8gICAgICB9KTtcblxuICAgLy8gICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgIC8vICAgICAgXHQkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAvLyAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgLy8gICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgLy8gICAgICB9KTtcblxuICAgLy8gICAgICAvLyBRdWVyeSBFeHBlcnRpc2VcblxuICAgLy8gICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgIC8vICAgICAgICAgICRzY29wZS5leHBlcnRpc2VzID0gcmVzdWx0LmRhdGE7XG4gICAvLyAgICAgIH0sIDIwMDApO1xuXG4gICAvLyAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgIC8vICAgICAgXTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdHcmFiU2hhcmVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSW52ZXN0IFN0YXJ0ZWQnKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuTWF0aCA9IHdpbmRvdy5NYXRoO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcHJpbWFyeVNoYXJlTGlzdGluZzogbnVsbCxcbiAgICAgICAgICAgIHNob3dCaWROb3c6IGZhbHNlLFxuICAgICAgICAgICAgbXlCaWQ6IHtcbiAgICAgICAgICAgICAgICBiaWRfYW1vdW50OiAwLjcyLFxuICAgICAgICAgICAgICAgIG51bV9zaGFyZXM6IDEwLFxuICAgICAgICAgICAgICAgIHNhdmluZzogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBHZXQgYWxsIGxpc3RpbmdzXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQcmltYXJ5TGlzdGluZygpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvc2hhcmUtbGlzdGluZy8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUJpZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5teUJpZC5zYXZpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbXlCaWQgPSB7XG4gICAgICAgICAgICAgICAgJ3NoYXJlX2xpc3RpbmdfaWQnOiAkc2NvcGUuZGF0YS5wcmltYXJ5U2hhcmVMaXN0aW5nLmlkLFxuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEubXlCaWQuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnbnVtX3NoYXJlcyc6ICRzY29wZS5kYXRhLm15QmlkLm51bV9zaGFyZXNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvc2hhcmUtYmlkcycsIG15QmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0JpZE5vdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTm90aWZpY2F0aW9uc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgRmROb3RpZmljYXRpb25zKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgICBGZE5vdGlmaWNhdGlvbnMuZ2V0TGF0ZXN0Tm90aWZpY2F0aW9ucygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHQkc2NvcGUubm90aWZpY2F0aW9ucyA9IHJlc3VsdC5ub3RpZmljYXRpb25zO1xuICAgICAgICB9KVxuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1BhZ2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5wYWdlID0ge1xuICAgICAgICBcdHRpdGxlOiAnJyxcbiAgICAgICAgXHRjb250ZW50OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRodHRwLmdldCgnL2FwaS9wYWdlcy8nICsgJHN0YXRlUGFyYW1zLnNsdWcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHRjb25zb2xlLmxvZygnU3VjY2VzcycpO1xuICAgICAgICBcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIFx0JHNjb3BlLnBhZ2UgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cblx0XHRcdGlmIChlcnJvci5zdGF0dXMgPT0gJzQwNCcpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2xvYWQgNDA0Jylcblx0XHRcdH07XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1F1aWNrVXBkYXRlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgRmROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdxdWlja3VwZGF0ZScpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICBcdGVkaXRNb2RlOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBJbnZlc3RvciA9ICRyZXNvdXJjZSgnL2FwaS9pbnZlc3RvcnMvOmludmVzdG9ySWQnLCB7XG4gICAgICAgICAgICBpbnZlc3RvcklkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lZGl0SW52ZXN0bWVudCA9IGZ1bmN0aW9uKHN0YXRlKXtcbiAgICAgICAgXHQkc2NvcGUuZGF0YS5lZGl0TW9kZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLm1vZGlmeUludmVzdG1lbnQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgaW52ZXN0b3JEYXRhID0ge1xuICAgICAgICAgICAgICAgICdpbnZlc3RtZW50X2J1ZGdldCc6ICRyb290U2NvcGUudXNlci5pbnZlc3Rvci5pbnZlc3RtZW50X2J1ZGdldFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmVkaXRJbnZlc3RtZW50KGZhbHNlKTtcblxuICAgICAgICAgICAgSW52ZXN0b3IudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBpbnZlc3RvcklkOiAkcm9vdFNjb3BlLnVzZXIuaW52ZXN0b3IuaWRcbiAgICAgICAgICAgIH0sIGludmVzdG9yRGF0YSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1RyYW5zYWN0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcikge1xuXG4gICAgXHRjb25zb2xlLmxvZygnVHJhbnNhY3Rpb25DdHJsJyk7XG4gICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgIFx0RmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgXHQkdGltZW91dChmdW5jdGlvbigpe1xuICAgIFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgXHR9LCAyMDAwKTtcblxuICAgIH0pO1xuXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
