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
    angular.module('fundator.directives', ['dibari.angular-ellipsis', 'localytics.directives', 'textAngular', 'flow', 'angular-ladda', 'ngFlag', 'oitozero.ngSweetAlert']);
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
                    needLogin: false
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

    angular.module('fundator.routes').run(["$rootScope", "$state", "$stateParams", "$auth", "$timeout", "$http", "$urlRouter", "$filter", "$cookies", "FdNotifications", "FdScroller", "API", function($rootScope, $state, $stateParams, $auth, $timeout, $http, $urlRouter, $filter, $cookies, FdNotifications, FdScroller, API) {

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

                $http.get(API.path('user?token=') + $auth.getToken()).then(function(result) {
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

            if ($auth.isAuthenticated()) {
                if (!$rootScope.initialRoleAssignment && toState.name.indexOf('auth') === -1) {
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
                case 'creator': model = API.path('creators/') + roleId
                break;
                case 'investor': model = API.path('investors/') + roleId
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

    angular.module('fundator.config').config(["$animateProvider", function ($animateProvider){
    	$animateProvider.classNameFilter(/fd-animate/);
    }]);

})();

(function (){
    "use strict";

    angular.module('fundator.config').config(["$authProvider", "APIProvider", function ($authProvider, APIProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        var redirectUriPath = window.location.protocol + '//' + window.location.hostname;
        $authProvider.loginUrl = redirectUriPath + '/api/v1/authenticate';
        $authProvider.tokenPrefix = 'fundator';


        $authProvider.linkedin({
        	clientId: '77zjxfbh2928re',
            url: redirectUriPath + '/api/v1/authenticate/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: redirectUriPath + '/api/v1/authenticate/linkedin',
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            display: 'popup',
            popupOptions: { width: 452, height: 633 }
        });

        $authProvider.google({
            clientId: '1042247727091-dmqc55af7tl58h2rqv3pqnrmjjbb9733.apps.googleusercontent.com',
            url: redirectUriPath + '/api/v1/authenticate/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: redirectUriPath + '/api/v1/authenticate/google',
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
            url: redirectUriPath + '/api/v1/authenticate/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: redirectUriPath + '/api/v1/authenticate/facebook',
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

    angular.module('fundator.config').config(["flowFactoryProvider", "APIProvider", function (flowFactoryProvider, APIProvider){

        flowFactoryProvider.defaults = {
        	uploadMethod: 'POST',
            target: APIProvider.$get().path('files'),
            permanentErrors:[404, 500, 501]
        };

    }]);

})();

(function (){
    "use strict";

    angular.module('fundator.config').config(["$httpProvider", function ($httpProvider){
		// $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
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

    .directive('fdMessenger', ["$rootScope", "$resource", "$timeout", "API", function($rootScope, $resource, $timeout, API) {
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

    angular.module('fundator.directives').directive('numbersOnly', function () {
    	return {
           require: 'ngModel',
           link: function(scope, element, attrs, modelCtrl) {

             modelCtrl.$parsers.push(function (inputValue) {

                var transformedInput = inputValue.toLowerCase().replace(/\D/g, '');

               if (transformedInput!=inputValue) {
                 modelCtrl.$setViewValue(transformedInput);
                 modelCtrl.$render();
             }

             return transformedInput;
         });
         }
     };
    });

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

    angular.module('fundator.services').factory('FdNotifications', ["$rootScope", "$q", "$interval", "$http", "$state", "API", function($rootScope, $q, $interval, $http, $state, API) {
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
                        $http.get(API.path('notifications/') + user.id).then(function(result){
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
                return $http.post(API.path('notifications/') + notificationId + '/read').then(function(result){
                	notification.read = 1;
                });
            },
            readAllNotifications: function() {
                return $http.post(API.path('notifications/user/') + $rootScope.user.id + '/read').then(function(result){
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

(function() {
    "use strict";

    angular.module('fundator.services').factory('API', function() {
    	var domainUrl = window.location.hostname.indexOf('fundator.co') !== -1 ? 'fundator.co' : 'fundator.app';
        var base = 'http://' + window.location.hostname + '/api/';
        var path = '';

        return {
        	path: function(func, version) {
        		if (typeof(version) === 'undefined') version = 'v1';
        		var delimiter = func.startsWith('/') ? '' : '/';
        		return path = base + version + delimiter + func;
        	}
        }
    });

    angular.module('fundator.services').provider('APIProvider', function() {
    	var domainUrl = window.location.hostname.indexOf('fundator.co') !== -1 ? 'fundator.co' : 'fundator.app';
        var base = 'http://' + window.location.hostname + '/api/';
        var path = '';

        this.$get = function() {
        	return {
        		path: function(func, version) {
        			if (typeof(version) === 'undefined') version = 'v1';
        			var delimiter = func.startsWith('/') ? '' : '/';
        			return path = base + version + delimiter + func;
        		}
        	}
        };
    });

})();
(function(){
    "use strict";

    angular.module('fundator.controllers').controller('AuthCtrl', ["$rootScope", "$scope", "$state", "$auth", "$http", "$timeout", "FdScroller", "API", function($rootScope, $scope, $state, $auth, $http, $timeout, FdScroller, API){
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function(){
                $rootScope.appLoaded = true;
            }, 1000);
        });

        $rootScope.$broadcast('stopLoading');

        if ($auth.isAuthenticated()) {
            $state.go('app.contests', {});
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

            $http.post(API.path('authenticate/signup'), userInfo).then(function(result){
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

    angular.module('fundator.controllers').controller('AuthConfirmCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$timeout", "$http", "API", function($rootScope, $scope, $state, $stateParams, $auth, $timeout, $http, API){
        $rootScope.$broadcast('stopLoading');

        if (typeof($stateParams.code) !== 'undefined' && typeof($stateParams.email) !== 'undefined') {
            var params = {
                confirmation_code: $stateParams.code,
                email: $stateParams.email
            };

            $scope.loading = true;

            $http.post(API.path('authenticate/confirm'), params).then(function(result) {
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

    angular.module('fundator.controllers').controller('AuthRecoverCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$timeout", "$http", "API", function($rootScope, $scope, $state, $stateParams, $auth, $timeout, $http, API){
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

            $http.post(API.path('authenticate/forgot'), params).then(function(result) {

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

                    $http.post(API.path('authenticate/recover'), params).then(function(result) {
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


    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "$resource", "FdScroller", "$filter", "FileUploader", "Countries", "CountryCodes", "API", function($rootScope, $scope, $state, $auth, $timeout, $http, $resource, FdScroller, $filter, FileUploader, Countries, CountryCodes, API) {

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
            url: API.path('files'),
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

            $http.get(API.path('expertise-category/0')).then(function(result){
                $scope.inputtedExpertiseList[index].expertiseCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseSubCategory = function(index){
            $scope.expertiseSubCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('expertise-category/') + $scope.inputtedExpertiseList[index].selectedExpertiseCategory.id).then(function(result){
                $scope.inputtedExpertiseList[index].expertiseSubCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseList = function(index){
            $scope.inputtedExpertiseList[index].expertiseList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('expertise/category/') + $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory.id).then(function(result){
                $scope.inputtedExpertiseList[index].expertiseList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            }, 2000);
        }

        $scope.fetchSkillsList = function(index){
            $scope.inputtedExpertiseList[index].skillsList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('expertise/') + $scope.inputtedExpertiseList[index].selectedExpertise.id + '/skills/').then(function(result){
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

            $http.put(API.path('users/') + $rootScope.user.id, userData).then(function(result){
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

    angular.module('fundator.controllers').controller('ContestCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {

        $scope.contests = [];
        $scope.sectionLoading = true;

        var Contest = $resource(API.path('contests/:contestId'), {
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
                $scope.sectionLoading = false;
            }, 1000);
        });
    }]);

    angular.module('fundator.controllers').controller('ContestSingleCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$filter", "$timeout", "FdScroller", "$http", "Lightbox", "API", function($rootScope, $scope, $state, $stateParams, $resource, $filter, $timeout, FdScroller, $http, Lightbox, API) {
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

        var Contest = $resource(API.path('contests/:contestId'), {
            contestId: '@id'
        });

        var Entry = $resource(API.path('entries/:entryId'), {
            entryId: '@id'
        }, {
            contestantEntries: {
                method: 'GET',
                url: API.path('entries/contest/:contestId/creator/:creatorId'),
                isArray: true
            },
            judgeEntries: {
                method: 'GET',
                url: API.path('entries/contest/:contestId/judge/:judgeId'),
                isArray: true
            },
            sendMessage: {
                method: 'POST',
                url: API.path('entries/:entryId/messages'),
                isArray: false
            }
        });

        var EntryRating = $resource(API.path('entry-ratings/:entryRatingId'), function(){
            entryRatingId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        FdScroller.toTop();
        // $rootScope.$broadcast('startLoading');

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
                $http.get(API.path('entries/') + entry.id + '/judge/' + judgeId).then(function(result){
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

            $http.post(API.path('users/becomeJudge'), {contest_id: $scope.contest.id}).then(function(result){
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

            $http.post(API.path('users/becomeContestant'), {contest_id: $scope.contest.id}).then(function(result){
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

    angular.module('fundator.controllers').controller('CreateCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", "$filter", "FdScroller", "API", function($rootScope, $scope, $state, $stateParams, $resource, $timeout, $filter, FdScroller, API) {
        console.log('Create Started');
        $rootScope.sectionLoading = true;
        $rootScope.innerSectionLoading = false;

        // Available Views : List, Create
        $scope.view = 'list';
        $scope.data = {
            newProjectLoading: false
        };
        $scope.project = null;

        $scope.steps = [
            {
                title: 'Your Project',
                progress: 0,
                isOpen: false,
                ongoing: false,
                state: 'app.create.details',
                body: '<h3>Great!</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
            },
            {
                title: 'Meet your Super Expert',
                progress: 0,
                isOpen: false,
                ongoing: false,
                state: 'app.create.superexpert',
                body: '<h3>Expertise you need</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
            },
            {
                title: 'Expertise you need',
                progress: 0,
                isOpen: false,
                ongoing: false,
                state: 'app.create.expertise',
                body: '<h3>Expertise you need</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
            },
            {
                title: 'Experts on your team',
                progress: 0,
                isOpen: false,
                ongoing: false,
                state: 'app.create.experts',
                body: '<h3>Experts on your team</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
            },
            {
                title: 'Validate the budget',
                progress: 0,
                isOpen: false,
                ongoing: false,
                state: 'app.create.budget',
                body: '<h3>Validate the budget</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
            },
            {
                title: 'Your investors',
                progress: 0,
                isOpen: false,
                ongoing: false,
                state: 'app.create.investors',
                body: '<h3>Your Investor</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
            }
        ];

        $scope.$watch('steps', function(steps){
            angular.forEach(steps, function(step){
                if (step.isOpen) {
                    $state.go(step.state);
                    FdScroller.toSection('#projectSteps');
                }
            });
        }, true);

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            console.log('project.state');
            console.log(project.state);
            var flooredState = Math.floor($scope.project.state);
            var remainingState = $scope.project.state - flooredState;

            for (var i = 0; i < flooredState; i++) {
                $scope.steps[i].progress = 1;
            }

            $scope.steps[flooredState].ongoing = true;
            $scope.steps[flooredState].isOpen = true;
            $scope.steps[flooredState].progress = remainingState;
        }, true);

        var Project = $resource(API.path('projects/:projectId'), {
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
                    $rootScope.sectionLoading = false;
                });
            } else if (angular.isNumber(projectId) && isFinite(projectId)) {
                Project.get({ projectId: projectId }).$promise.then(function(result) {
                    $scope.project = result;
                }).finally(function() {
                    $rootScope.sectionLoading = false;
                    $rootScope.innerSectionLoading = true;
                });
            } else {
                console.log('Make up your mind you peice of shit');
            }
        } else {
            $timeout(function() {
                $rootScope.sectionLoading = false;
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
            var project = angular.copy($scope.project);

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
        $scope.data = {
            featuredImage: {},
            datepicker: {
                isOpen: false
            }
        };

        $scope.details = {
            name: '',
            geography: 'wherever'
        };

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $scope.details = project;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });

        $scope.$on('flow::fileAdded', function(event, $flow, flowFile) {
            event.preventDefault();
        });

        $scope.featuredImageSuccess = function($file, $message) {
            var message = JSON.parse($message);
            $scope.project.thumbnail_id = message.file.id;
            $scope.project.thumbnail = message.file.file_url;
            $scope.saveProgress();
        }

        $scope.attachedFilesSuccess = function($file, $message) {
            var message = JSON.parse($message);
            var index = $scope.project.attachedFiles.indexOf(message.file.id);

            if (index === -1) {
                $scope.project.attachedFiles.push(message.file.id);
            }
        }

        $scope.submitDraft = function() {
            $scope.project.state = 0.9;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');
        }

        FdScroller.toSection('#projectSteps');
    }]);

    angular.module('fundator.controllers').controller('CreateSECtrl', ["$rootScope", "$scope", "$state", "$http", "$timeout", "FdScroller", "API", function($rootScope, $scope, $state, $http, $timeout, FdScroller, API) {
        console.log('CreateSECtrl Started');

        $http.get(API.path('super-experts')).then(function(result) {
            $scope.superExperts = result.data;
        }).finally(function(){
            $rootScope.innerSectionLoading = false;
        });

        $scope.chooseSuperExpert = function(superExpert) {
            $scope.project.super_expert_id = superExpert.id;
            $scope.project.state = 2;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $state.go('app.create.expertise');
            }, 300);
        }
    }]);

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', ["$rootScope", "$scope", "$state", "$resource", "$http", "$timeout", "FdScroller", "API", function($rootScope, $scope, $state, $resource, $http, $timeout, FdScroller, API) {
        console.log('CreateExpertiseCtrl Started');
        $rootScope.innerSectionLoading = true;

        $scope.inputtedExpertiseList = [];
        $scope.expertiseList = [];
        $scope.inputtedEpxertise = null;
        $scope.savingExpertise = false;
        $scope.loadedOnce = false;

        var ProjectExpertise = $resource(API.path('/projects/:projectId/expertise'), {
            projectId: '@id'
        });

        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.innerSectionLoading = false;
                $scope.loadedOnce = true;
            });
        }

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            $scope.fetchExpertise();
        });

        $scope.saveExpertise = function(expertise){
            $scope.savingExpertise = true;

            var projectExpertiseData = {
                'expertise_id': expertise.selectedExpertise.id,
                'task': expertise.mainTask,
                'budget': expertise.budget,
                'lead_time': expertise.leadTime,
                'start_date': expertise.startDate
            };

            $http.post(API.path('/projects/') + $scope.project.id + '/expertise', projectExpertiseData).then(function(result) {
                console.log(result.data);
                $scope.expertiseList.push(result.data);
            }).finally(function(){
                $scope.savingExpertise = false;
            });

            $scope.inputtedExpertiseList = [];
            $scope.inputtedEpxertise = null;
        }

        $scope.saveExpertiseSelection = function(){
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $scope.project.state = 3;
            }, 500);

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
                });

                $scope.inputtedEpxertise = $scope.inputtedExpertiseList[$scope.inputtedExpertiseList.length - 1];
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

            $http.get(API.path('/expertise-category/0')).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseSubCategory = function(index) {
            $scope.expertiseSubCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('/expertise-category/') + $scope.inputtedExpertiseList[index].selectedExpertiseCategory.id).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseSubCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        }

        $scope.fetchExpertiseList = function(index) {
            $scope.inputtedExpertiseList[index].expertiseList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('/expertise/category/') + $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory.id).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            }, 2000);
        }
    }]);

    angular.module('fundator.controllers').controller('CreateExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", "$http", "API", "SweetAlert", "FdScroller", function($rootScope, $scope, $state, $resource, $http, API, SweetAlert, FdScroller) {
        console.log('CreateExpertCtrl Started');

        $scope.data = {};

        var ProjectExpertise = $resource(API.path('/projects/:projectId/expertise'), {
            projectId: '@id'
        });

        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.innerSectionLoading = false;
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

        $scope.removeShortlistExpert = function(expertise, bid){
            var index = expertise.shortlist.indexOf(bid);

            if (index === -1) {
                expertise.shortlist.splice(index, 1);
            }
        }

        $scope.discussExpert = function(expertise, bid){
            $scope.data.selectedBid = bid
        }

        $scope.selectExpert = function(expertise, bid) {
            SweetAlert.swal({
             title: 'Are you sure?',
             text: 'You are selecting ' + bid.expert.name + ' to complete your task.',
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#F8C486',confirmButtonText: 'Yes, go ahead!',
             cancelButtonText: 'Cancel',
             closeOnConfirm: false,
             closeOnCancel: false},
             function(isConfirm){
                if (isConfirm) {
                    $http.put(API.path('/project-expertise/' + expertise.id + '/bid/' + bid.id), {}).then(function(result){
                        if (typeof(result.data.error) === 'undefined') {
                            expertise.selected_bid = bid;
                            SweetAlert.swal('Selected!', 'You have selected the expert.', 'success');
                        }
                    });
                }
          });
        }

        $scope.confirmExperts = function(){
            $scope.project.state = 5;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $state.go('app.create.expertise');
            }, 300);
        }
    }]);

    angular.module('fundator.controllers').controller('CreateBudgetCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateBudgetCtrl Started');

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            $rootScope.innerSectionLoading = false;
        });
    }]);

    angular.module('fundator.controllers').controller('CreateInvestorsCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {
        console.log('CreateInvestorsCtrl Started');

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            $rootScope.innerSectionLoading = false;
        });
    }]);
})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", "$filter", "$timeout", "FdScroller", "API", function($rootScope, $scope, $state, $resource, $filter, $timeout, FdScroller, API) {
        console.log('Expert Started');
        $scope.expertiseSource = null;
        $scope.availableExpertise = [];
        $scope.matchingExpertise = [];
        $scope.data = {};

        var AvailableExpertise = $resource(API.path('expertise/available'));

        var MatchingExpertise = $resource(API.path('expertise/matching'), {}, {
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
                $state.go('app.contests');
            }, 2000);
        }

        if (access) {
        	$rootScope.$broadcast('stopLoading');

        	AvailableExpertise.query().$promise.then(function(result){
                $scope.availableExpertise = result;
                $scope.expertiseSource = $scope.availableExpertise;
            });

            MatchingExpertise.query().$promise.then(function(result){
                $scope.matchingExpertise = result.expertise;
            });

        }
    }]);

    angular.module('fundator.controllers').controller('ExpertiseCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "FdScroller", "API", function($rootScope, $scope, $state, $stateParams, $resource, $http, FdScroller, API) {
        console.log('Expertise Started');

        FdScroller.toTop();

        $scope.data = {};
        $scope.expertise = null;

        var ProjectExpertise = $resource(API.path('/project-expertise/:expertiseId'), {
        	expertiseId: '@id'
        });

        ProjectExpertise.get({expertiseId: $stateParams.expertiseId}).$promise.then(function(result){
        	$scope.expertise = result;
        	$rootScope.$broadcast('stopLoading');
        });

        $scope.submitBid = function(){
            $scope.data.bidLoading = true;

            var bidData = {
                'bid_amount': $scope.data.bid_amount,
                'description': $scope.data.bid_description
            };

            $http.post(API.path('/project-expertise/') + $stateParams.expertiseId + '/bid', bidData).then(function(result){
                $scope.expertise.bid = result.data;
            }).finally(function(){
                $scope.data.bidLoading = false;
            });
        }
    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('FooterController', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $scope.notifications = null;

        var Contest = $resource(API.path('/contests/:contestId'), {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.ongoingContests = result;
        });
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

    angular.module('fundator.controllers').controller('NavigationCtrl', ["$rootScope", "$scope", "$state", "$auth", "$log", "$timeout", "$filter", "$http", "$resource", "$uibModal", "FileUploader", "CountryCodes", "API", function($rootScope, $scope, $state, $auth, $log, $timeout, $filter, $http, $resource, $uibModal, FileUploader, CountryCodes, API) {

        $scope.allSkills = $resource(API.path('skills')).query();

        $scope.uploader = new FileUploader({
            url: API.path('files'),
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

            $http.post(API.path('/verification/start'), verificationData).then(function(result){
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
                country_code: parseInt(countryCode),
                phone_number: parseInt($scope.data.twoFA.number),
                verification_code: parseInt($scope.data.twoFA.verificationCode)
            };

            $http.post(API.path('/verification/check'), verificationData).then(function(result){
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

            $http.post(API.path('authenticate/') + method, {}).then(function(result){
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

            $http.put(API.path('users/') + $rootScope.user.id, userData).then(function(result){
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
            $http.get(API.path('users/sideNavigationData')).then(function(result){
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

    angular.module('fundator.controllers').controller('GrabShareCtrl', ["$rootScope", "$scope", "$state", "$http", "$timeout", "FdScroller", "API", function($rootScope, $scope, $state, $http, $timeout, FdScroller, API) {
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

            $http.get(API.path('share-listing')).then(function(result){
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

            $http.post(API.path('share-bids'), myBid).then(function(result){
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
        $rootScope.$broadcast('stopLoading');

        if ($rootScope.initialRoleAssignment) {
	        FdNotifications.getLatestNotifications().then(function(result){
	        	$scope.notifications = result.notifications;
	        }).finally(function(){
	        	$rootScope.$broadcast('stopLoading');
	        });
        }
    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('PageCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "FdScroller", "API", function($rootScope, $scope, $state, $stateParams, $http, FdScroller, API) {
        $rootScope.$broadcast('startLoading');
        FdScroller.toTop();

        $scope.page = {
        	title: '',
        	content: ''
        };

        $http.get(API.path('pages') + $stateParams.slug).then(function(result){
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

    angular.module('fundator.controllers').controller('QuickUpdateCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "FdNotifications", "API", function($rootScope, $scope, $state, $stateParams, $resource, FdNotifications, API) {
        console.log('quickupdate');

        $scope.data = {
        	editMode: false
        };

        var Investor = $resource(API.path('investors/:investorId'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2FuaW1hdGUuanMiLCJjb25maWcvYXV0aC5qcyIsImNvbmZpZy9mbG93LmpzIiwiY29uZmlnL2h0dHAuanMiLCJjb25maWcvbGFkZGEuanMiLCJkaXJlY3RpdmVzL2NoYXJ0cy5qcyIsImRpcmVjdGl2ZXMvbG9hZGVyLmRpcmVjdGl2ZS5qcyIsImRpcmVjdGl2ZXMvbWVzc2VuZ2VyLmpzIiwiZGlyZWN0aXZlcy9taW5NYXguanMiLCJkaXJlY3RpdmVzL21pc2MuanMiLCJkaXJlY3RpdmVzL3Byb2ZpbGVGaWVsZC5qcyIsImZpbHRlcnMvc3RyaXBIdG1sLmpzIiwic2VydmljZXMvbm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvc2Nyb2xsZXIuc2VydmljZS5qcyIsInZhbHVlcy9jb3VudHJpZXMuanMiLCJ2YWx1ZXMvY291bnRyeUNvZGVzLmpzIiwidmFsdWVzL3NldHRpbmdzLmpzIiwiYXBwL2F1dGgvYXV0aC5qcyIsImFwcC9hdXRoL3JlZ2lzdGVyLmpzIiwiYXBwL2NvbnRlc3QvY29udGVzdC5qcyIsImFwcC9jcmVhdGUvY3JlYXRlLmpzIiwiYXBwL2V4cGVydC9leHBlcnQuanMiLCJhcHAvZm9vdGVyL2Zvb3Rlci5qcyIsImFwcC9ob21lL2hvbWUuanMiLCJhcHAvaGVhZGVyL2ZsYXNoLW5vdGljZS5qcyIsImFwcC9oZWFkZXIvaGVhZGVyLmpzIiwiYXBwL2hlYWRlci9uYXZpZ2F0aW9uLmpzIiwiYXBwL2hlYWRlci91c2VyLXRodW1ibmFpbC5qcyIsImFwcC9pbnZlc3QvZ3JhYlNoYXJlLmpzIiwiYXBwL2ludmVzdC9pbnZlc3QuanMiLCJhcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmpzIiwiYXBwL3BhZ2UvcGFnZS5qcyIsImFwcC9xdWljay11cGRhdGUvcXVpY2stdXBkYXRlLmpzIiwiYXBwL3RyYW5zYWN0aW9uL3RyYW5zYWN0aW9uLmpz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Q0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFdBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxpQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLDBCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsd0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFB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QSxDQUFBLFdBQUE7WUFDQSxhQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7O1FBR0EsY0FBQSxTQUFBO1lBQ0EsVUFBQTtZQUNBLE1BQUE7WUFDQSxLQUFBLGtCQUFBO1lBQ0EsdUJBQUE7WUFDQSxhQUFBLGtCQUFBO1lBQ0EsbUJBQUEsQ0FBQSxXQUFBO1lBQ0EsT0FBQSxDQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7Ozs7OztBQ2xEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsOENBQUEsVUFBQSxxQkFBQSxZQUFBOztRQUVBLG9CQUFBLFdBQUE7U0FDQSxjQUFBO1lBQ0EsUUFBQSxZQUFBLE9BQUEsS0FBQTtZQUNBLGdCQUFBLENBQUEsS0FBQSxLQUFBOzs7Ozs7O0FDVEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFVBQUEsY0FBQTs7Ozs7O0FDSEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFNBQUEsZUFBQTs7UUFFQSxjQUFBLFVBQUE7WUFDQSxPQUFBO1lBQ0EsYUFBQTtZQUNBLGNBQUE7Ozs7Ozs7QUNSQSxDQUFBLFdBQUE7SUFDQTs7O0lBR0EsUUFBQSxPQUFBOztLQUVBLFVBQUEsV0FBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQSxNQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7O2dCQUVBLE9BQUEsUUFBQSxPQUFBO2dCQUNBLE9BQUEsU0FBQSxPQUFBOzs7Z0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQSxPQUFBO2dCQUNBLFNBQUEsS0FBQSxVQUFBLE9BQUEsT0FBQTs7Z0JBRUEsSUFBQSxXQUFBLENBQUE7b0JBQ0EsT0FBQTtvQkFDQSxPQUFBO29CQUNBLFdBQUE7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LE9BQUE7O2dCQUVBLElBQUEsTUFBQTtvQkFDQSxpQkFBQSxNQUFBLE9BQUE7OztZQUdBLGFBQUEsV0FBQTtnQkFDQSxRQUFBLElBQUEsU0FBQSxPQUFBO2dCQUNBLGlCQUFBLE1BQUEsT0FBQTs7Ozs7O0FDaEZBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxRQUFBLDBCQUFBLFNBQUEsU0FBQTs7UUFFQSxPQUFBO1lBQ0EsT0FBQSxXQUFBO2dCQUNBLElBQUEsT0FBQSxFQUFBO2dCQUNBLEtBQUEsT0FBQSxRQUFBLENBQUEsV0FBQSxJQUFBLE9BQUE7O1lBRUEsV0FBQSxTQUFBLFlBQUE7YUFDQSxJQUFBLFdBQUEsRUFBQTthQUNBLFFBQUEsSUFBQTthQUNBLElBQUEsU0FBQSxTQUFBLEdBQUE7Y0FDQSxJQUFBLE1BQUEsU0FBQSxTQUFBLE1BQUE7O2NBRUEsSUFBQSxPQUFBLEVBQUE7aUJBQ0EsS0FBQSxPQUFBLFFBQUEsQ0FBQSxXQUFBLE1BQUEsT0FBQTs7Ozs7Ozs7O0FDakJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxNQUFBLGFBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDJCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsc0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLCtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsK0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwwQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsOENBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsbUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDRCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1DQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0RBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDZCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw0QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsa0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBOzs7OztBQ3RQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEscUJBQUEsTUFBQSxnQkFBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsS0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLEtBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FB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QSxTQUFBOzs7UUFHQSxPQUFBLDBCQUFBLFNBQUEsT0FBQSxtQkFBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsMEJBQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsbUJBQUE7Ozs7UUFJQSxPQUFBLDRCQUFBLFNBQUEsR0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O1lBRUEsRUFBQTs7O1FBR0EsT0FBQSw2QkFBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSx1QkFBQSxTQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLDBCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Ozs7UUFJQSxPQUFBLCtCQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Ozs7UUFJQSxPQUFBLGtCQUFBLFNBQUEsT0FBQSxVQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtZQUNBLE9BQUEsZ0JBQUE7WUFDQTs7O1FBR0EsT0FBQSxvQkFBQSxTQUFBLEdBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTtZQUNBLEVBQUEsZ0JBQUE7OztRQUdBLE9BQUEscUJBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7WUFFQSxPQUFBLHNCQUFBLE9BQUEsZUFBQSxTQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7WUFDQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7O1FBR0EsT0FBQSxXQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxhQUFBLFFBQUEsVUFBQSxPQUFBLHNCQUFBLE9BQUEsZ0JBQUEsQ0FBQSxJQUFBLE1BQUEsS0FBQTs7WUFFQSxJQUFBLE9BQUEsZ0JBQUEsYUFBQTtnQkFDQSxPQUFBLFdBQUEsU0FBQTs7O1lBR0EsT0FBQTs7O1FBR0EsT0FBQSxjQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsR0FBQSxDQUFBLE9BQUEsU0FBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGVBQUEsS0FBQTs7WUFFQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7O1FBR0EsT0FBQSxnQkFBQSxTQUFBLEdBQUEsT0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLFFBQUEsVUFBQSxPQUFBLHNCQUFBLE9BQUEsZ0JBQUEsQ0FBQSxJQUFBLE1BQUEsS0FBQSxTQUFBLFFBQUEsU0FBQTtnQkFDQSxPQUFBLENBQUEsUUFBQSxPQUFBLFFBQUE7O1lBRUEsRUFBQTs7O1FBR0EsT0FBQSxhQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxhQUFBLFFBQUEsS0FBQSxPQUFBLHNCQUFBLE9BQUEsWUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxRQUFBLEtBQUEsT0FBQSxzQkFBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsY0FBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7UUFHQSxPQUFBLHlCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSx3QkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxVQUFBOztZQUVBLE1BQUEsSUFBQSxJQUFBLEtBQUEseUJBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHdCQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLFVBQUE7Ozs7UUFJQSxPQUFBLDRCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsMkJBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsSUFBQSxLQUFBLHlCQUFBLE9BQUEsc0JBQUEsT0FBQSwwQkFBQSxJQUFBLEtBQUEsU0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwyQkFBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxVQUFBOzs7O1FBSUEsT0FBQSxxQkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsZ0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsSUFBQSxLQUFBLHlCQUFBLE9BQUEsc0JBQUEsT0FBQSw2QkFBQSxJQUFBLEtBQUEsU0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxVQUFBO2VBQ0E7OztRQUdBLE9BQUEsa0JBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGFBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsSUFBQSxLQUFBLGdCQUFBLE9BQUEsc0JBQUEsT0FBQSxrQkFBQSxLQUFBLFlBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGFBQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTtlQUNBOzs7UUFHQTs7OztRQUlBLE9BQUEsZ0JBQUEsVUFBQTtZQUNBLElBQUEsV0FBQTtnQkFDQSxNQUFBLE9BQUEsS0FBQTtnQkFDQSxXQUFBLE9BQUEsS0FBQTtnQkFDQSxNQUFBLE9BQUEsS0FBQTtnQkFDQSxVQUFBLE9BQUEsS0FBQTtnQkFDQSxnQkFBQSxPQUFBLEtBQUE7Z0JBQ0EsbUJBQUEsT0FBQSxLQUFBO2dCQUNBLGdCQUFBLE9BQUEsS0FBQTtnQkFDQSw2QkFBQSxPQUFBLEtBQUEseUJBQUE7Z0JBQ0EsY0FBQSxPQUFBLEtBQUEsWUFBQTs7O1lBR0EsT0FBQSxPQUFBLEtBQUE7Z0JBQ0EsS0FBQTtvQkFDQSxJQUFBLG1CQUFBLE9BQUEsS0FBQTs7b0JBRUEsSUFBQSxxQkFBQSxTQUFBO3dCQUNBLG1CQUFBLE9BQUEsS0FBQTs7b0JBRUEsU0FBQSxXQUFBO29CQUNBLFNBQUEsU0FBQSxvQkFBQTtvQkFDQSxTQUFBLFNBQUEsa0JBQUEsT0FBQSxLQUFBO29CQUNBLFNBQUEsU0FBQSxvQkFBQSxPQUFBLEtBQUE7Z0JBQ0E7Z0JBQ0EsS0FBQTtvQkFDQSxTQUFBLFVBQUE7Z0JBQ0E7Z0JBQ0EsS0FBQTtvQkFDQSxTQUFBLFNBQUEsRUFBQSxNQUFBOztvQkFFQSxRQUFBLFFBQUEsT0FBQSx1QkFBQSxTQUFBLGtCQUFBO3dCQUNBLElBQUEsa0JBQUEsc0JBQUEsUUFBQSxrQkFBQSxlQUFBLFdBQUEsR0FBQTs0QkFDQSxRQUFBLElBQUEsa0JBQUE7NEJBQ0EsUUFBQSxJQUFBLGtCQUFBOzRCQUNBLFNBQUEsT0FBQSxLQUFBLEtBQUE7Z0NBQ0Esb0JBQUEsa0JBQUE7Z0NBQ0EsMEJBQUEsa0JBQUE7Z0NBQ0Esd0JBQUEsa0JBQUE7Z0NBQ0EsOEJBQUEsa0JBQUE7Z0NBQ0EsV0FBQSxrQkFBQTtnQ0FDQSxpQkFBQSxrQkFBQTtnQ0FDQSxRQUFBLGtCQUFBOzt5QkFFQTs7Z0JBRUE7OztZQUdBLFdBQUEsV0FBQTtZQUNBLFdBQUE7O1lBRUEsTUFBQSxJQUFBLElBQUEsS0FBQSxZQUFBLFdBQUEsS0FBQSxJQUFBLFVBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxPQUFBLFNBQUEsV0FBQTtvQkFDQSxXQUFBLEtBQUEsT0FBQSxPQUFBLEtBQUE7b0JBQ0EsV0FBQSxLQUFBLFlBQUEsT0FBQSxLQUFBO29CQUNBLFdBQUEsS0FBQSxPQUFBLE9BQUEsS0FBQTtvQkFDQSxXQUFBLEtBQUEsYUFBQTtvQkFDQSxXQUFBLHdCQUFBOztvQkFFQSxXQUFBLGFBQUEsT0FBQSxLQUFBO29CQUNBLE9BQUEsR0FBQTs7b0JBRUEsV0FBQSxlQUFBLE9BQUEsS0FBQSxjQUFBLE1BQUE7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsV0FBQSxXQUFBOzs7Ozs7OztBQ3plQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxzSEFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsV0FBQSxPQUFBLFVBQUEsU0FBQSxLQUFBOztRQUVBLE9BQUEsV0FBQTtRQUNBLE9BQUEsaUJBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsSUFBQSxLQUFBLHdCQUFBO1lBQ0EsV0FBQTs7O1FBR0EsUUFBQSxRQUFBLFNBQUEsS0FBQSxTQUFBLFFBQUE7WUFDQSxPQUFBLFdBQUE7WUFDQSxPQUFBLGtCQUFBO1lBQ0EsT0FBQSxrQkFBQTs7WUFFQSxJQUFBLFdBQUEsZUFBQSxhQUFBLE9BQUEsV0FBQSxLQUFBLGFBQUEsYUFBQTtnQkFDQSxJQUFBLElBQUEsT0FBQSxXQUFBLEtBQUEsUUFBQSxnQkFBQTtvQkFDQSxJQUFBLGFBQUEsV0FBQSxLQUFBLFFBQUEsZ0JBQUE7b0JBQ0EsSUFBQSxVQUFBLFFBQUEsVUFBQSxRQUFBLENBQUEsSUFBQSxhQUFBLE1BQUE7O29CQUVBLElBQUEsT0FBQSxhQUFBLGFBQUE7d0JBQ0EsT0FBQSxnQkFBQSxLQUFBOzt3QkFFQSxJQUFBLFdBQUEsT0FBQSxTQUFBLFFBQUE7d0JBQ0EsT0FBQSxTQUFBLE9BQUEsVUFBQTs7O2tCQUdBLEdBQUEsV0FBQSxlQUFBLFVBQUEsV0FBQSxLQUFBLFFBQUEsU0FBQSxFQUFBO2dCQUNBLElBQUEsSUFBQSxNQUFBLFdBQUEsS0FBQSxRQUFBO29CQUNBLElBQUEsYUFBQSxXQUFBLEtBQUEsUUFBQSxJQUFBOztvQkFFQSxJQUFBLFVBQUEsUUFBQSxVQUFBLFFBQUEsQ0FBQSxJQUFBLGFBQUEsTUFBQTs7b0JBRUEsSUFBQSxPQUFBLGFBQUEsYUFBQTt3QkFDQSxPQUFBLGdCQUFBLEtBQUE7Ozs7V0FJQSxRQUFBLFdBQUE7WUFDQSxTQUFBLFdBQUE7Z0JBQ0EsT0FBQSxpQkFBQTtlQUNBOzs7O0lBSUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsc0pBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsU0FBQSxVQUFBLFlBQUEsT0FBQSxVQUFBLEtBQUE7UUFDQSxPQUFBLFlBQUEsYUFBQTtRQUNBLE9BQUEsT0FBQTtZQUNBLHdCQUFBO1lBQ0EsVUFBQTtZQUNBLGNBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxlQUFBOztZQUVBLGVBQUE7WUFDQSxRQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxZQUFBO2dCQUNBLFFBQUE7Ozs7UUFJQSxJQUFBLFVBQUEsVUFBQSxJQUFBLEtBQUEsd0JBQUE7WUFDQSxXQUFBOzs7UUFHQSxJQUFBLFFBQUEsVUFBQSxJQUFBLEtBQUEscUJBQUE7WUFDQSxTQUFBO1dBQ0E7WUFDQSxtQkFBQTtnQkFDQSxRQUFBO2dCQUNBLEtBQUEsSUFBQSxLQUFBO2dCQUNBLFNBQUE7O1lBRUEsY0FBQTtnQkFDQSxRQUFBO2dCQUNBLEtBQUEsSUFBQSxLQUFBO2dCQUNBLFNBQUE7O1lBRUEsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLEtBQUEsSUFBQSxLQUFBO2dCQUNBLFNBQUE7Ozs7UUFJQSxJQUFBLGNBQUEsVUFBQSxJQUFBLEtBQUEsaUNBQUEsVUFBQTtZQUNBLGVBQUE7V0FDQTtZQUNBLFFBQUE7Z0JBQ0EsUUFBQTs7OztRQUlBLFdBQUE7OztRQUdBLE9BQUEsZUFBQSxXQUFBO1lBQ0EsV0FBQSxVQUFBLG1CQUFBO1lBQ0EsT0FBQSxLQUFBLHlCQUFBOzs7UUFHQSxPQUFBLGVBQUEsV0FBQTtZQUNBLFdBQUE7WUFDQSxPQUFBLEtBQUEseUJBQUE7OztRQUdBLFFBQUEsSUFBQTtZQUNBLFdBQUEsT0FBQTtXQUNBLFNBQUEsS0FBQSxTQUFBLFFBQUE7WUFDQSxPQUFBLFVBQUE7O1lBRUEsSUFBQSxZQUFBLFFBQUEsVUFBQSxXQUFBLEtBQUEsU0FBQTtnQkFDQSxZQUFBLE9BQUE7Z0JBQ0EsUUFBQTs7O1lBR0EsSUFBQSxtQkFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFNBQUE7Z0JBQ0EsWUFBQSxPQUFBO2dCQUNBLFFBQUE7OztZQUdBLElBQUEsYUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUE7Z0JBQ0EsWUFBQSxPQUFBO2dCQUNBLFFBQUE7OztZQUdBLElBQUEsb0JBQUEsUUFBQSxVQUFBLFdBQUEsS0FBQSxZQUFBO2dCQUNBLFlBQUEsT0FBQTtnQkFDQSxRQUFBOzs7WUFHQSxJQUFBLE9BQUEsZUFBQSxhQUFBO2dCQUNBLElBQUEsVUFBQSxTQUFBLE1BQUEsV0FBQSxlQUFBLFVBQUEsV0FBQSxlQUFBLFlBQUE7b0JBQ0EsV0FBQSxhQUFBLFNBQUEsT0FBQTtvQkFDQSxXQUFBLGFBQUEsU0FBQSxZQUFBLE9BQUE7O29CQUVBLFdBQUEsYUFBQSxTQUFBLFVBQUEsV0FBQTt3QkFDQSxPQUFBLEdBQUEsZUFBQTs0QkFDQSxNQUFBOzRCQUNBLFdBQUEsT0FBQTs7O3VCQUdBLEdBQUEsV0FBQSxlQUFBLFVBQUEsVUFBQSxTQUFBLEdBQUE7b0JBQ0EsT0FBQSxLQUFBLHdCQUFBO29CQUNBLE9BQUEsWUFBQSxXQUFBOzs7O1lBSUEsSUFBQSxPQUFBLHNCQUFBLGFBQUE7Z0JBQ0EsSUFBQSxpQkFBQSxTQUFBLEdBQUE7b0JBQ0EsT0FBQSxLQUFBLHNCQUFBOzs7O1lBSUEsSUFBQSxPQUFBLGdCQUFBLGFBQUE7Z0JBQ0EsSUFBQSxXQUFBLFNBQUEsS0FBQSxXQUFBLGVBQUEsV0FBQTtvQkFDQSxPQUFBLEtBQUEsNkJBQUE7b0JBQ0EsT0FBQSxZQUFBLFdBQUE7Ozs7WUFJQSxJQUFBLE9BQUEsdUJBQUEsYUFBQTtnQkFDQSxJQUFBLGtCQUFBLFNBQUEsR0FBQTtvQkFDQSxPQUFBLEtBQUEsMkJBQUE7Ozs7V0FJQSxRQUFBLFdBQUE7WUFDQSxTQUFBLFdBQUE7Z0JBQ0EsV0FBQSxXQUFBO2VBQ0E7OztRQUdBLE9BQUEsY0FBQSxTQUFBLE1BQUE7WUFDQSxPQUFBO2dCQUNBLEtBQUE7b0JBQ0EsTUFBQSxhQUFBO3dCQUNBLFdBQUEsT0FBQTt3QkFDQSxTQUFBLFdBQUEsS0FBQTt1QkFDQSxTQUFBLEtBQUEsU0FBQSxPQUFBO3dCQUNBLE9BQUEsUUFBQSxVQUFBLFFBQUEsS0FBQTs7b0JBRUE7Z0JBQ0EsS0FBQTtvQkFDQSxJQUFBLFFBQUEsUUFBQSxVQUFBLFdBQUEsS0FBQSxZQUFBLENBQUEsTUFBQSxZQUFBOztvQkFFQSxJQUFBLE1BQUEsU0FBQSxHQUFBO3dCQUNBLElBQUEsVUFBQSxNQUFBOzt3QkFFQSxNQUFBLGtCQUFBOzRCQUNBLFdBQUEsT0FBQTs0QkFDQSxXQUFBLFFBQUE7MkJBQ0EsU0FBQSxLQUFBLFNBQUEsT0FBQTs0QkFDQSxPQUFBLFFBQUEsVUFBQSxRQUFBLEtBQUE7OztvQkFHQTs7OztRQUlBLE9BQUEsY0FBQSxTQUFBLE9BQUE7WUFDQSxPQUFBLEtBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxnQkFBQTs7WUFFQSxXQUFBLFVBQUE7O1lBRUEsSUFBQSxVQUFBOztZQUVBLElBQUEsV0FBQSxlQUFBLFFBQUE7Z0JBQ0EsVUFBQSxXQUFBLEtBQUE7OztZQUdBLElBQUEsWUFBQSxNQUFBO2dCQUNBLE1BQUEsSUFBQSxJQUFBLEtBQUEsY0FBQSxNQUFBLEtBQUEsWUFBQSxTQUFBLEtBQUEsU0FBQSxPQUFBO29CQUNBLE9BQUEsS0FBQSxnQkFBQSxPQUFBO29CQUNBLE9BQUEsS0FBQSxjQUFBLFNBQUEsT0FBQSxLQUFBOztvQkFFQSxPQUFBLEtBQUEsY0FBQSxVQUFBO3dCQUNBO3dCQUNBO3dCQUNBOzs7b0JBR0EsU0FBQSxVQUFBO3dCQUNBLEVBQUEsWUFBQSxRQUFBLENBQUEsV0FBQTt1QkFDQTs7aUJBRUE7Z0JBQ0EsTUFBQSxJQUFBO29CQUNBLFNBQUEsTUFBQTttQkFDQSxTQUFBLEtBQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsS0FBQSxnQkFBQTtvQkFDQSxPQUFBLEtBQUEsY0FBQSxVQUFBO3dCQUNBO3dCQUNBO3dCQUNBOzs7b0JBR0EsU0FBQSxVQUFBO3dCQUNBLEVBQUEsWUFBQSxRQUFBLENBQUEsV0FBQTt1QkFDQTs7Ozs7O1FBTUEsT0FBQSxlQUFBLFNBQUEsTUFBQTtZQUNBLElBQUEsV0FBQSxPQUFBLEtBQUEsY0FBQTtZQUNBLElBQUEsWUFBQTtZQUNBLElBQUEsZUFBQTs7WUFFQSxJQUFBLElBQUEsTUFBQSxTQUFBO2dCQUNBLElBQUEsT0FBQSxTQUFBO2dCQUNBLFVBQUEsS0FBQSxLQUFBOztnQkFFQSxJQUFBLEtBQUEsUUFBQSxLQUFBLEtBQUE7b0JBQ0EsZUFBQTs7OztZQUlBLFNBQUEsVUFBQSxXQUFBOzs7UUFHQSxPQUFBLElBQUEsbUJBQUEsVUFBQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE1BQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxRQUFBLElBQUE7OztRQUdBLE9BQUEsbUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLFFBQUEsSUFBQSxvQkFBQSxRQUFBLEtBQUE7WUFDQSxNQUFBLFNBQUEsUUFBQSxLQUFBOzs7Ozs7Ozs7WUFTQSxJQUFBLFFBQUEsT0FBQSxLQUFBLGFBQUEsY0FBQSxRQUFBLFFBQUEsS0FBQTs7WUFFQSxJQUFBLFVBQUEsQ0FBQSxHQUFBO2dCQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUEsS0FBQTtvQkFDQSxJQUFBLFFBQUEsS0FBQTtvQkFDQSxTQUFBOzs7Ozs7UUFNQSxPQUFBLGtCQUFBLFNBQUEsTUFBQSxPQUFBOzs7Ozs7OztZQVFBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsS0FBQTs7WUFFQSxJQUFBLFVBQUEsQ0FBQSxHQUFBO2dCQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUEsT0FBQSxPQUFBOzs7WUFHQSxJQUFBLGFBQUEsTUFBQSxNQUFBLFFBQUE7WUFDQSxJQUFBLGVBQUEsQ0FBQSxHQUFBO2dCQUNBLFFBQUEsSUFBQSxzQkFBQTtnQkFDQSxNQUFBLE1BQUEsT0FBQSxZQUFBOzs7WUFHQSxRQUFBLElBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxPQUFBLEtBQUEsYUFBQTs7O1FBR0EsT0FBQSxlQUFBLFdBQUE7WUFDQSxXQUFBLFVBQUE7O1lBRUEsT0FBQSxLQUFBLGdCQUFBO1lBQ0EsT0FBQSxLQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxjQUFBO1lBQ0EsT0FBQSxLQUFBLGFBQUEsZ0JBQUE7O1lBRUEsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLFFBQUEsUUFBQSxPQUFBLFFBQUEsUUFBQSxTQUFBLEdBQUE7OztRQUdBLE9BQUEsY0FBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGNBQUE7O1lBRUEsSUFBQSxnQkFBQTtZQUNBLElBQUEsZUFBQTs7WUFFQSxRQUFBLFFBQUEsT0FBQSxLQUFBLGFBQUEsS0FBQSxPQUFBLFNBQUEsS0FBQTtnQkFDQSxjQUFBLEtBQUEsVUFBQTtvQkFDQSxXQUFBLEtBQUE7OztnQkFHQSxRQUFBLElBQUE7Z0JBQ0EsSUFBQSxLQUFBLEtBQUEsS0FBQSxRQUFBLGFBQUEsQ0FBQSxLQUFBLGlCQUFBLE1BQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLGVBQUEsS0FBQTs7OztZQUlBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLFlBQUE7O1lBRUEsSUFBQSxNQUFBLFNBQUEsR0FBQTtnQkFDQSxJQUFBLE9BQUEsTUFBQTs7Z0JBRUEsSUFBQSxRQUFBLElBQUE7Z0JBQ0EsTUFBQSxhQUFBLEtBQUE7Z0JBQ0EsTUFBQSxhQUFBLE9BQUEsUUFBQTtnQkFDQSxNQUFBLGVBQUE7O2dCQUVBLE1BQUEsT0FBQSxXQUFBLEtBQUEsT0FBQTtnQkFDQSxNQUFBLGNBQUEsT0FBQSxLQUFBLGFBQUE7Z0JBQ0EsTUFBQSxpQkFBQTs7Z0JBRUEsUUFBQSxJQUFBLE1BQUE7O2dCQUVBLE1BQUEsUUFBQSxLQUFBLFNBQUEsT0FBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBOztvQkFFQSxPQUFBLEtBQUEsY0FBQTtvQkFDQSxPQUFBLEtBQUEsYUFBQTs7b0JBRUEsU0FBQSxVQUFBO3dCQUNBLE9BQUEsS0FBQSxpQkFBQTt3QkFDQSxPQUFBLFlBQUE7d0JBQ0EsT0FBQSxZQUFBO3VCQUNBOzs7Ozs7UUFNQSxPQUFBLGNBQUEsVUFBQTtZQUNBLElBQUEsaUJBQUE7Z0JBQ0EsU0FBQSxPQUFBLEtBQUE7OztZQUdBLE1BQUEsWUFBQSxDQUFBLFNBQUEsT0FBQSxLQUFBLGNBQUEsS0FBQSxnQkFBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxLQUFBLGNBQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsS0FBQSxnQkFBQTs7Z0JBRUEsU0FBQSxVQUFBO29CQUNBLEVBQUEsWUFBQSxRQUFBLENBQUEsV0FBQTttQkFDQTs7OztRQUlBLE9BQUEsWUFBQSxTQUFBLGNBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7WUFFQSxJQUFBLGdCQUFBO2dCQUNBLFFBQUEsT0FBQSxLQUFBLGNBQUEsT0FBQTtnQkFDQSxZQUFBLE9BQUEsS0FBQSxjQUFBLE9BQUE7Z0JBQ0EsWUFBQSxPQUFBLEtBQUEsY0FBQSxPQUFBO2dCQUNBLFFBQUEsT0FBQSxLQUFBLGNBQUEsT0FBQTs7O1lBR0EsY0FBQSxXQUFBLFdBQUEsS0FBQTtZQUNBLGNBQUEsV0FBQSxPQUFBLEtBQUEsY0FBQTs7WUFFQSxJQUFBLE9BQUEsbUJBQUEsYUFBQTtnQkFDQSxZQUFBLE9BQUE7b0JBQ0EsZUFBQTttQkFDQSxlQUFBLFNBQUEsS0FBQSxTQUFBLE9BQUE7b0JBQ0EsSUFBQSxXQUFBLFNBQUE7d0JBQ0EsUUFBQSxJQUFBO3dCQUNBLE9BQUEsS0FBQSxjQUFBO3dCQUNBLE9BQUEsS0FBQSxhQUFBOzt3QkFFQSxPQUFBLFlBQUE7O3dCQUVBLFNBQUEsVUFBQTs0QkFDQSxPQUFBLEtBQUEsYUFBQTsyQkFDQTs7OztpQkFJQTtnQkFDQSxJQUFBLGNBQUEsSUFBQSxZQUFBO2dCQUNBLFlBQUEsUUFBQSxLQUFBLFNBQUEsT0FBQTtvQkFDQSxJQUFBLFdBQUEsU0FBQTt3QkFDQSxRQUFBLElBQUE7d0JBQ0EsT0FBQSxLQUFBLGNBQUE7d0JBQ0EsT0FBQSxLQUFBLGFBQUE7O3dCQUVBLE9BQUEsWUFBQTs7d0JBRUEsU0FBQSxVQUFBOzRCQUNBLE9BQUEsS0FBQSxhQUFBOzJCQUNBOzs7Ozs7O1FBT0EsT0FBQSxjQUFBLFVBQUE7O1lBRUEsV0FBQSxVQUFBLG1CQUFBO1lBQ0EsT0FBQSxLQUFBLGVBQUE7OztRQUdBLE9BQUEsY0FBQSxVQUFBO1lBQ0EsT0FBQSxLQUFBLHNCQUFBOztZQUVBLE1BQUEsS0FBQSxJQUFBLEtBQUEsc0JBQUEsQ0FBQSxZQUFBLE9BQUEsUUFBQSxLQUFBLEtBQUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsYUFBQTtvQkFDQSxPQUFBLEtBQUEsc0JBQUE7O29CQUVBLFNBQUEsVUFBQTt3QkFDQSxXQUFBO3dCQUNBLE9BQUEsS0FBQSxlQUFBO3VCQUNBOztlQUVBLFFBQUEsVUFBQTtnQkFDQSxPQUFBLEtBQUEsc0JBQUE7Ozs7UUFJQSxPQUFBLG1CQUFBLFVBQUE7O1lBRUEsV0FBQSxVQUFBLG1CQUFBO1lBQ0EsT0FBQSxLQUFBLG9CQUFBOzs7UUFHQSxPQUFBLG1CQUFBLFVBQUE7WUFDQSxPQUFBLEtBQUEsMkJBQUE7O1lBRUEsTUFBQSxLQUFBLElBQUEsS0FBQSwyQkFBQSxDQUFBLFlBQUEsT0FBQSxRQUFBLEtBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLElBQUEsT0FBQSxPQUFBLEtBQUEsV0FBQSxhQUFBO29CQUNBLE9BQUEsS0FBQSwyQkFBQTs7b0JBRUEsU0FBQSxVQUFBO3dCQUNBLFdBQUE7d0JBQ0EsT0FBQSxLQUFBLG9CQUFBO3VCQUNBOztlQUVBLFFBQUEsVUFBQTtnQkFDQSxPQUFBLEtBQUEsMkJBQUE7Ozs7Ozs7QUM3ZUEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsMEhBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsVUFBQSxTQUFBLFlBQUEsS0FBQTtRQUNBLFFBQUEsSUFBQTtRQUNBLFdBQUEsaUJBQUE7UUFDQSxXQUFBLHNCQUFBOzs7UUFHQSxPQUFBLE9BQUE7UUFDQSxPQUFBLE9BQUE7WUFDQSxtQkFBQTs7UUFFQSxPQUFBLFVBQUE7O1FBRUEsT0FBQSxRQUFBO1lBQ0E7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsU0FBQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7O1lBRUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsU0FBQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7O1lBRUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsU0FBQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7O1lBRUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsU0FBQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7O1lBRUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsU0FBQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7O1lBRUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsU0FBQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7Ozs7UUFJQSxPQUFBLE9BQUEsU0FBQSxTQUFBLE1BQUE7WUFDQSxRQUFBLFFBQUEsT0FBQSxTQUFBLEtBQUE7Z0JBQ0EsSUFBQSxLQUFBLFFBQUE7b0JBQ0EsT0FBQSxHQUFBLEtBQUE7b0JBQ0EsV0FBQSxVQUFBOzs7V0FHQTs7UUFFQSxPQUFBLE9BQUEsV0FBQSxTQUFBLFFBQUE7WUFDQSxJQUFBLE9BQUEsYUFBQSxlQUFBLFlBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQSxRQUFBO1lBQ0EsSUFBQSxlQUFBLEtBQUEsTUFBQSxPQUFBLFFBQUE7WUFDQSxJQUFBLGlCQUFBLE9BQUEsUUFBQSxRQUFBOztZQUVBLEtBQUEsSUFBQSxJQUFBLEdBQUEsSUFBQSxjQUFBLEtBQUE7Z0JBQ0EsT0FBQSxNQUFBLEdBQUEsV0FBQTs7O1lBR0EsT0FBQSxNQUFBLGNBQUEsVUFBQTtZQUNBLE9BQUEsTUFBQSxjQUFBLFNBQUE7WUFDQSxPQUFBLE1BQUEsY0FBQSxXQUFBO1dBQ0E7O1FBRUEsSUFBQSxVQUFBLFVBQUEsSUFBQSxLQUFBLHdCQUFBO1lBQ0EsV0FBQTtXQUNBO1lBQ0EsUUFBQTtnQkFDQSxRQUFBOzs7O1FBSUEsSUFBQSxlQUFBO1FBQ0EsSUFBQSxnQkFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsRUFBQSxNQUFBLGdCQUFBOztRQUVBLElBQUEsT0FBQSxtQkFBQSxlQUFBLGNBQUEsU0FBQSxHQUFBO1lBQ0EsSUFBQSxlQUFBLGNBQUE7O1lBRUEsSUFBQSxXQUFBLGVBQUEsY0FBQTtnQkFDQSxXQUFBLGVBQUEsY0FBQSxhQUFBLElBQUE7OztZQUdBLElBQUEsWUFBQSxTQUFBLGFBQUE7O1lBRUEsSUFBQSxPQUFBLGVBQUEsZUFBQSxNQUFBLFlBQUE7Z0JBQ0EsUUFBQSxRQUFBLFNBQUEsS0FBQSxTQUFBLFFBQUE7b0JBQ0EsT0FBQSxjQUFBO21CQUNBLFFBQUEsV0FBQTtvQkFDQSxXQUFBLGlCQUFBOzttQkFFQSxJQUFBLFFBQUEsU0FBQSxjQUFBLFNBQUEsWUFBQTtnQkFDQSxRQUFBLElBQUEsRUFBQSxXQUFBLGFBQUEsU0FBQSxLQUFBLFNBQUEsUUFBQTtvQkFDQSxPQUFBLFVBQUE7bUJBQ0EsUUFBQSxXQUFBO29CQUNBLFdBQUEsaUJBQUE7b0JBQ0EsV0FBQSxzQkFBQTs7bUJBRUE7Z0JBQ0EsUUFBQSxJQUFBOztlQUVBO1lBQ0EsU0FBQSxXQUFBO2dCQUNBLFdBQUEsaUJBQUE7Z0JBQ0EsT0FBQSxHQUFBO2VBQ0E7OztRQUdBLE9BQUEsY0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLEdBQUEsc0JBQUEsRUFBQSxXQUFBLFFBQUE7OztRQUdBLE9BQUEsbUJBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxvQkFBQTs7WUFFQSxJQUFBLGFBQUEsSUFBQSxVQUFBLFFBQUEsS0FBQSxTQUFBLFFBQUE7Z0JBQ0EsT0FBQSxZQUFBO2dCQUNBLE9BQUEsS0FBQSxvQkFBQTs7OztRQUlBLE9BQUEsZUFBQSxXQUFBO1lBQ0EsSUFBQSxVQUFBLFFBQUEsS0FBQSxPQUFBOztZQUVBLElBQUEsT0FBQSxPQUFBLGFBQUEsYUFBQTtnQkFDQSxRQUFBLE9BQUE7b0JBQ0EsV0FBQSxPQUFBLFFBQUE7bUJBQ0EsU0FBQSxTQUFBLEtBQUEsU0FBQSxRQUFBO29CQUNBLFFBQUEsSUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7OztRQU1BLFdBQUE7OztJQUdBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG1HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBLFlBQUE7UUFDQSxPQUFBLE9BQUE7WUFDQSxlQUFBO1lBQ0EsWUFBQTtnQkFDQSxRQUFBOzs7O1FBSUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFdBQUE7OztRQUdBLE9BQUEsT0FBQSxXQUFBLFNBQUEsU0FBQTtZQUNBLElBQUEsWUFBQSxNQUFBO2dCQUNBLE9BQUEsVUFBQTtnQkFDQSxXQUFBLHNCQUFBO21CQUNBO2dCQUNBLFFBQUEsSUFBQTs7OztRQUlBLE9BQUEsSUFBQSxtQkFBQSxTQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxPQUFBLFFBQUEsZUFBQSxRQUFBLEtBQUE7WUFDQSxPQUFBLFFBQUEsWUFBQSxRQUFBLEtBQUE7WUFDQSxPQUFBOzs7UUFHQSxPQUFBLHVCQUFBLFNBQUEsT0FBQSxVQUFBO1lBQ0EsSUFBQSxV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QTs7SUFFQSxTQUFBLGNBQUEsU0FBQTs7UUFFQSxJQUFBO1FBQ0EsSUFBQSxRQUFBLE1BQUEsS0FBQSxHQUFBLFFBQUEsYUFBQTtZQUNBLGFBQUEsS0FBQSxRQUFBLE1BQUEsS0FBQTs7WUFFQSxhQUFBLFNBQUEsUUFBQSxNQUFBLEtBQUE7OztRQUdBLElBQUEsYUFBQSxRQUFBLE1BQUEsS0FBQSxHQUFBLE1BQUEsS0FBQSxHQUFBLE1BQUEsS0FBQTs7O1FBR0EsSUFBQSxLQUFBLElBQUEsV0FBQSxXQUFBO1FBQ0EsS0FBQSxJQUFBLElBQUEsR0FBQSxJQUFBLFdBQUEsUUFBQSxLQUFBO1lBQ0EsR0FBQSxLQUFBLFdBQUEsV0FBQTs7O1FBR0EsT0FBQSxJQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQTs7O0lBR0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsdUtBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBLE1BQUEsVUFBQSxTQUFBLE9BQUEsV0FBQSxXQUFBLGNBQUEsY0FBQSxLQUFBOztRQUVBLE9BQUEsWUFBQSxVQUFBLElBQUEsS0FBQSxXQUFBOztRQUVBLE9BQUEsV0FBQSxJQUFBLGFBQUE7WUFDQSxLQUFBLElBQUEsS0FBQTtZQUNBLG1CQUFBOzs7UUFHQSxPQUFBLE9BQUE7WUFDQSxrQkFBQTtZQUNBLGtCQUFBLENBQUE7WUFDQSxlQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsVUFBQTs7WUFFQSxPQUFBOzs7UUFHQSxJQUFBLE9BQUEsV0FBQSxVQUFBLGFBQUE7WUFDQSxPQUFBLEtBQUEsUUFBQTtnQkFDQSxhQUFBLFFBQUEsS0FBQSxXQUFBLEtBQUE7Z0JBQ0EsUUFBQSxRQUFBLEtBQUEsV0FBQSxLQUFBO2dCQUNBLGtCQUFBOzs7O1FBSUEsT0FBQSxlQUFBOztRQUVBLE9BQUEsbUJBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxNQUFBLFVBQUE7O1lBRUEsSUFBQSxjQUFBOztZQUVBLElBQUEsT0FBQSxPQUFBLEtBQUEsTUFBQSxZQUFBLFVBQUEsYUFBQTtnQkFDQSxjQUFBLE9BQUEsS0FBQSxNQUFBLFlBQUE7aUJBQ0E7Z0JBQ0EsY0FBQSxPQUFBLEtBQUEsTUFBQTs7O1lBR0EsSUFBQSxtQkFBQTtnQkFDQSxLQUFBO2dCQUNBLGNBQUEsU0FBQTtnQkFDQSxjQUFBLFNBQUEsT0FBQSxLQUFBLE1BQUE7Z0JBQ0EsUUFBQTs7O1lBR0EsTUFBQSxLQUFBLElBQUEsS0FBQSx3QkFBQSxrQkFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUEsT0FBQTs7Z0JBRUEsSUFBQSxPQUFBLEtBQUEsU0FBQTtvQkFDQSxPQUFBLEtBQUEsTUFBQSxVQUFBO29CQUNBLE9BQUEsS0FBQSxNQUFBLFdBQUE7Ozs7O1FBS0EsT0FBQSxzQkFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLE1BQUEsVUFBQTs7WUFFQSxJQUFBLGNBQUE7O1lBRUEsSUFBQSxPQUFBLE9BQUEsS0FBQSxNQUFBLFlBQUEsVUFBQSxhQUFBO2dCQUNBLGNBQUEsT0FBQSxLQUFBLE1BQUEsWUFBQTtpQkFDQTtnQkFDQSxjQUFBLE9BQUEsS0FBQSxNQUFBOzs7WUFHQSxJQUFBLG1CQUFBO2dCQUNBLGNBQUEsU0FBQTtnQkFDQSxjQUFBLFNBQUEsT0FBQSxLQUFBLE1BQUE7Z0JBQ0EsbUJBQUEsU0FBQSxPQUFBLEtBQUEsTUFBQTs7O1lBR0EsTUFBQSxLQUFBLElBQUEsS0FBQSx3QkFBQSxrQkFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBLE9BQUE7O2dCQUVBLElBQUEsT0FBQSxLQUFBLFNBQUE7b0JBQ0EsT0FBQSxLQUFBLE1BQUEsV0FBQTtvQkFDQSxPQUFBLEtBQUEsTUFBQSxTQUFBO29CQUNBLFdBQUEsS0FBQSxpQkFBQTs7Ozs7UUFLQSxPQUFBLGdCQUFBLFNBQUEsVUFBQTtZQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUEsVUFBQTs7WUFFQSxNQUFBLGFBQUEsVUFBQSxLQUFBLFNBQUEsVUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFdBQUEsS0FBQSxZQUFBO2dCQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUEsVUFBQTtlQUNBLE1BQUEsU0FBQSxVQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsT0FBQSxLQUFBLGNBQUEsVUFBQSxVQUFBOzs7O1FBSUEsT0FBQSxlQUFBLFNBQUEsVUFBQTtZQUNBLElBQUEsU0FBQTs7WUFFQSxPQUFBLEtBQUEsY0FBQSxVQUFBLFVBQUE7O1lBRUEsT0FBQTtnQkFDQSxLQUFBLFlBQUEsU0FBQTtnQkFDQTtnQkFDQSxLQUFBLFlBQUEsU0FBQTtnQkFDQTs7O1lBR0EsTUFBQSxLQUFBLElBQUEsS0FBQSxtQkFBQSxRQUFBLElBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFdBQUEsS0FBQSxZQUFBO2VBQ0EsUUFBQSxVQUFBO2dCQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUEsVUFBQTs7OztRQUlBLE9BQUEsY0FBQSxVQUFBO1lBQ0EsSUFBQSxXQUFBLFFBQUEsS0FBQSxXQUFBO1lBQ0EsT0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBOztZQUVBLE9BQUEsS0FBQSxtQkFBQTs7WUFFQSxNQUFBLElBQUEsSUFBQSxLQUFBLFlBQUEsV0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxXQUFBOztvQkFFQSxPQUFBLEtBQUEsbUJBQUE7b0JBQ0EsT0FBQSxLQUFBLG1CQUFBOztvQkFFQSxTQUFBLFVBQUE7d0JBQ0EsT0FBQSxLQUFBLG1CQUFBLENBQUE7dUJBQ0E7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsU0FBQSxVQUFBO29CQUNBLE9BQUEsS0FBQSxtQkFBQSxDQUFBO21CQUNBOzs7OztRQUtBLE9BQUEsa0JBQUEsVUFBQTtZQUNBLElBQUEsZ0JBQUEsVUFBQSxLQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxZQUFBO2dCQUNBLE1BQUE7OztZQUdBLGNBQUEsT0FBQSxLQUFBLFVBQUEsV0FBQTtnQkFDQSxXQUFBLEtBQUEsWUFBQSxRQUFBLEtBQUE7O2dCQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7b0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7b0JBRUEsS0FBQSxXQUFBO29CQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtvQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOzs7Z0JBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7O2dCQUlBLE9BQUEsU0FBQSxXQUFBLGNBQUE7Z0JBQ0EsT0FBQSxTQUFBOztlQUVBLFlBQUE7Z0JBQ0EsS0FBQSxLQUFBLHlCQUFBLElBQUE7Ozs7O1FBS0EsT0FBQSxTQUFBLFVBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO2dCQUNBLGFBQUEsV0FBQTtnQkFDQSxXQUFBLGdCQUFBO2dCQUNBLFdBQUEsT0FBQTtnQkFDQSxXQUFBLGFBQUE7O2dCQUVBLE9BQUEsR0FBQSxrQkFBQSxJQUFBLENBQUEsUUFBQTs7Ozs7UUFLQSxPQUFBLHlCQUFBLFVBQUE7WUFDQSxNQUFBLElBQUEsSUFBQSxLQUFBLDZCQUFBLEtBQUEsU0FBQSxPQUFBO2dCQUNBLElBQUEsT0FBQSxPQUFBLEtBQUEsV0FBQSxhQUFBO29CQUNBLE9BQUEscUJBQUEsT0FBQTs7Ozs7UUFLQSxXQUFBLE9BQUEsUUFBQSxTQUFBLEtBQUE7WUFDQSxJQUFBLE9BQUEsVUFBQSxhQUFBOztZQUVBLE9BQUE7OztRQUdBLE9BQUEsZUFBQSxVQUFBO1lBQ0EsV0FBQSxhQUFBOzs7UUFHQSxPQUFBLFdBQUEsU0FBQSxNQUFBLE1BQUEsS0FBQTtZQUNBLFdBQUEsYUFBQTs7WUFFQSxJQUFBLFFBQUEsUUFBQSxVQUFBLFdBQUEsS0FBQSxZQUFBLENBQUEsTUFBQSxPQUFBOztZQUVBLElBQUEsT0FBQSxXQUFBLGVBQUEsTUFBQSxTQUFBLEdBQUE7Z0JBQ0EsSUFBQSxPQUFBLE1BQUE7Z0JBQ0EsV0FBQSxlQUFBLEtBQUEsTUFBQSxLQUFBLElBQUEsTUFBQSxNQUFBOzs7Ozs7O0FDclBBLENBQUEsVUFBQTtFQUNBOztFQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG1FQUFBLFNBQUEsUUFBQSxZQUFBLGtCQUFBO0lBQ0EsT0FBQSxZQUFBO0lBQ0EsT0FBQSxtQkFBQTtJQUNBLE9BQUEsV0FBQTtJQUNBLE9BQUEsYUFBQTs7SUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1FBQ0EsSUFBQTtRQUNBLElBQUE7O1FBRUEsT0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLFdBQUE7OztRQUdBLElBQUEsSUFBQSxjQUFBLGNBQUE7WUFDQSxJQUFBLE9BQUEsSUFBQSxjQUFBLGFBQUEsTUFBQTthQUNBO1lBQ0EsSUFBQSxPQUFBLElBQUEsY0FBQSxNQUFBOzs7UUFHQSxJQUFBLFNBQUEsSUFBQTs7UUFFQSxJQUFBLEtBQUEsS0FBQSxRQUFBLFlBQUEsQ0FBQSxHQUFBO1lBQ0EsT0FBQSxPQUFBLFNBQUEsT0FBQTtnQkFDQSxPQUFBLGFBQUE7O1lBRUE7YUFDQTtZQUNBLE9BQUEsYUFBQTs7O1FBR0EsT0FBQSxXQUFBLEtBQUE7O1FBRUEsT0FBQSxTQUFBLFNBQUEsS0FBQTtZQUNBLE9BQUEsT0FBQSxTQUFBLFFBQUE7Z0JBQ0EsUUFBQSxJQUFBLElBQUEsT0FBQTtnQkFDQSxPQUFBLFlBQUEsSUFBQSxPQUFBOzs7O1FBSUEsSUFBQSxNQUFBO1lBQ0EsT0FBQSxjQUFBOzs7O0lBSUEsRUFBQSxVQUFBLEdBQUEsZ0NBQUEsb0JBQUEsU0FBQSxPQUFBO1FBQ0EsTUFBQTtRQUNBLE1BQUE7OztJQUdBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1FBQ0EsTUFBQTtRQUNBLE1BQUE7O1FBRUEsT0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLFdBQUE7Ozs7SUFJQSxF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KGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZnVuZGF0b3IgPSBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3InLFxuICAgICAgICBbXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbmZpZydcbiAgICAgICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnLCBbJ25nUmVzb3VyY2UnLCAnbmdDb29raWVzJywgJ25nQW5pbWF0ZScsICd1aS5ib290c3RyYXAnLCAndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInLCAnYW5ndWxhck1vbWVudCcsICdhbmd1bGFyLW93bC1jYXJvdXNlbCcsICduZ0ltZ0Nyb3AnLCAnYW5ndWxhckZpbGVVcGxvYWQnLCAnYm9vdHN0cmFwTGlnaHRib3gnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnLCBbJ29yZGluYWwnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLCBbJ2RpYmFyaS5hbmd1bGFyLWVsbGlwc2lzJywgJ2xvY2FseXRpY3MuZGlyZWN0aXZlcycsICd0ZXh0QW5ndWxhcicsICdmbG93JywgJ2FuZ3VsYXItbGFkZGEnLCAnbmdGbGFnJywgJ29pdG96ZXJvLm5nU3dlZXRBbGVydCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlICMgZm9yIHRoZSBub24gaHRtbDUgYnJvd3NlcnNcbiAgICAgICAgLy8gJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdHMnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICduYXZpZ2F0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTmF2aWdhdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZsYXNoTm90aWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ2ZsYXNoLW5vdGljZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZsYXNoTm90aWNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRm9vdGVyQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ25vdGlmaWNhdGlvbnMnLCAnbm90aWZpY2F0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05vdGlmaWNhdGlvbnNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBxdWlja1VwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdRdWlja1VwZGF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2xvZ2luJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5zaWdudXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdzaWdudXAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmZvcmdvdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZm9yZ290JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2ZvcmdvdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVjb3ZlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVjb3Zlcj90b2tlbiZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWNvdmVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aFJlY292ZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguY29uZmlybScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybT9jb2RlJmVtYWlsJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2NvbmZpcm0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ29uZmlybUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5yZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzczogJ2hvbWVwYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hvbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgLy8gICAgIHVybDogJy8nLFxuICAgICAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgLy8gICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICB2aWV3czoge1xuICAgICAgICAgICAgLy8gICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3RzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdHMvOmNvbnRlc3RJZC86Y29udGVzdE5hbWUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmV4cGVydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UvOmV4cGVydGlzZUlkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcsICdleHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmludmVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2ludmVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jcmVhdGU/cHJvamVjdElkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2RldGFpbHMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1kZXRhaWxzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRGV0YWlsc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLnN1cGVyZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zdXBlci1leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1zdXBlci1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVTRUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmV4cGVydGlzZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0aXNlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0aXNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRXhwZXJ0aXNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0cycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWV4cGVydHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5idWRnZXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2J1ZGdldCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWJ1ZGdldCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUJ1ZGdldEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmludmVzdG9ycycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0b3JzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtaW52ZXN0b3JzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlSW52ZXN0b3JzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC50cmFuc2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdUcmFuc2FjdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JhYnNoYXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ncmFiLWEtc2hhcmUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dyYWJTaGFyZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAucGFnZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvOnNsdWcnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3BhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIsICRmaWx0ZXIsICRjb29raWVzLCBGZE5vdGlmaWNhdGlvbnMsIEZkU2Nyb2xsZXIsIEFQSSkge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0ge25hbWU6ICdhcHAuY29udGVzdCd9O1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmNvbGxhcHNlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKCRyb290U2NvcGUuaXNOYXZTaG93biA+PSAwLjUpID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gMCA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAuNTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBVc2VyU2VydmljZSBpcyBhbiBleGFtcGxlIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgJHVybFJvdXRlcidzIGRlZmF1bHQgaGFuZGxlciBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZFxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB1c2VyIG9iamVjdCBhbmQgdGFza3NcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3VzZXI/dG9rZW49JykgKyAkYXV0aC5nZXRUb2tlbigpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRmROb3RpZmljYXRpb25zLmluaXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWduYWxSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVJvbGUgPSAkcm9vdFNjb3BlLnVzZXIucm9sZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoJGNvb2tpZXMuZ2V0KCdmZF9hY3RpdmVfcm9sZScpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUm9sZSA9ICRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IGFjdGl2ZVJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiByb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocm9sZS5yb2xlLCByb2xlLmlkLCAhJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKG9yaWduYWxSb2xlLnJvbGUsIG9yaWduYWxSb2xlLmlkLCAhJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIuc3luYygpO1xuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIubGlzdGVuKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ICYmIHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmVlZExvZ2luID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUuZGF0YS5uZWVkTG9naW4pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0b1N0YXRlLmRhdGEubmVlZExvZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZWVkTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkLCBzdGF0ZSwgc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9IHJvbGU7XG4gICAgICAgICAgICAkY29va2llcy5wdXQoJ2ZkX2FjdGl2ZV9yb2xlJywgcm9sZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RhdGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gJHN0YXRlLmN1cnJlbnQubmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihzdGF0ZVBhcmFtcykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkc3RhdGUuY3VycmVudC5wYXJhbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyUm9sZVZpZXdzID0gW3tcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcCcsXG4gICAgICAgICAgICAgICAgdmlldzogJ3F1aWNrVXBkYXRlJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICBpbnZlc3RvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1pbnZlc3RvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygncXVpY2stdXBkYXRlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0JyxcbiAgICAgICAgICAgICAgICB2aWV3OiAnbWFpbkAnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdHMnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWp1cnknKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9IEFQSS5wYXRoKCdjcmVhdG9ycy8nKSArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzogbW9kZWwgPSBBUEkucGF0aCgnaW52ZXN0b3JzLycpICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldChtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcm9sZV0gPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFzIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuaGFzVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYW5pbWF0ZVByb3ZpZGVyKXtcbiAgICBcdCRhbmltYXRlUHJvdmlkZXIuY2xhc3NOYW1lRmlsdGVyKC9mZC1hbmltYXRlLyk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyLCBBUElQcm92aWRlcil7XG4gICAgICAgIC8vIFNhdGVsbGl6ZXIgY29uZmlndXJhdGlvbiB0aGF0IHNwZWNpZmllcyB3aGljaCBBUElcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgICAgICRhdXRoUHJvdmlkZXIubG9naW5VcmwgPSByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS92MS9hdXRoZW50aWNhdGUnO1xuICAgICAgICAkYXV0aFByb3ZpZGVyLnRva2VuUHJlZml4ID0gJ2Z1bmRhdG9yJztcblxuXG4gICAgICAgICRhdXRoUHJvdmlkZXIubGlua2VkaW4oe1xuICAgICAgICBcdGNsaWVudElkOiAnNzd6anhmYmgyOTI4cmUnLFxuICAgICAgICAgICAgdXJsOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS92MS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvdjEvYXV0aGVudGljYXRlL2xpbmtlZGluJyxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ3N0YXRlJ10sXG4gICAgICAgICAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgICAgICAgICAgY2xpZW50SWQ6ICcxMDQyMjQ3NzI3MDkxLWRtcWM1NWFmN3RsNThoMnJxdjNwcW5ybWpqYmI5NzMzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAgICAgICAgIHVybDogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvdjEvYXV0aGVudGljYXRlL2dvb2dsZScsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCcsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvdjEvYXV0aGVudGljYXRlL2dvb2dsZScsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydzY29wZSddLFxuICAgICAgICAgICAgb3B0aW9uYWxVcmxQYXJhbXM6IFsnZGlzcGxheSddLFxuICAgICAgICAgICAgc2NvcGU6IFsncHJvZmlsZScsICdlbWFpbCddLFxuICAgICAgICAgICAgc2NvcGVQcmVmaXg6ICdvcGVuaWQnLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgICAgICAgICAgY2xpZW50SWQ6ICc5MDA1MzMxMjMzOTU5MjAnLFxuICAgICAgICAgICAgbmFtZTogJ2ZhY2Vib29rJyxcbiAgICAgICAgICAgIHVybDogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvdjEvYXV0aGVudGljYXRlL2ZhY2Vib29rJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS92Mi41L2RpYWxvZy9vYXV0aCcsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvdjEvYXV0aGVudGljYXRlL2ZhY2Vib29rJyxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ2Rpc3BsYXknLCAnc2NvcGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiXG4oZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uIChmbG93RmFjdG9yeVByb3ZpZGVyLCBBUElQcm92aWRlcil7XG5cbiAgICAgICAgZmxvd0ZhY3RvcnlQcm92aWRlci5kZWZhdWx0cyA9IHtcbiAgICAgICAgXHR1cGxvYWRNZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHRhcmdldDogQVBJUHJvdmlkZXIuJGdldCgpLnBhdGgoJ2ZpbGVzJyksXG4gICAgICAgICAgICBwZXJtYW5lbnRFcnJvcnM6WzQwNCwgNTAwLCA1MDFdXG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpe1xuXHRcdC8vICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wb3N0WydDb250ZW50LVR5cGUnXSA9ICd0ZXh0L3BsYWluJztcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24obGFkZGFQcm92aWRlcikge1xuXG4gICAgICAgIGxhZGRhUHJvdmlkZXIuc2V0T3B0aW9uKHtcbiAgICAgICAgICAgIHN0eWxlOiAnZXhwYW5kLXJpZ2h0JyxcbiAgICAgICAgICAgIHNwaW5uZXJTaXplOiAzNSxcbiAgICAgICAgICAgIHNwaW5uZXJDb2xvcjogJyNmZmZmZmYnXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuXHQuZGlyZWN0aXZlKCdmZExvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiB7XG5cdCAgXHRzY29wZToge1xuXHQgIFx0XHR2aWV3Qm94OiAnQCdcblx0ICBcdH0sXG5cdCAgICByZXN0cmljdDogJ0UnLFxuXHQgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZmQtbG9hZGVyIGxhLWJhbGwtcHVsc2VcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nLFxuXHQgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdCAgICBcdCRlbGVtZW50LmFkZENsYXNzKCRhdHRycy5jbGFzcyk7XG5cdCAgICB9XG5cdCAgfTtcblx0fSk7XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkTWVzc2VuZ2VyJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHJlc291cmNlLCAkdGltZW91dCwgQVBJKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJjaGF0Ym94XCIgbmctaWY9XCJ0aHJlYWRJZFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hhdFJvd1wiIG5nLXJlcGVhdD1cIm1lc3NhZ2UgaW4gbWVzc2FnZXNcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGF0LXVzZXJTZW5kYm94XCIgbmctY2xhc3M9XCJ7XFwnY2hhdC1zZW5kXFwnOiB1c2VyLmlkID09IG1lc3NhZ2UudXNlci5pZCwgXFwnY2hhdC1jb21laW5cXCc6IHVzZXIuaWQgIT0gbWVzc2FnZS51c2VyLmlkfVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGF0LWNvbnRlbnRcIj57e21lc3NhZ2UuYm9keX19PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYWh0LWxhYmVsXCIgbmctY2xhc3M9XFwne1widGV4dC1yaWdodFwiOiB1c2VyLmlkID09IG1lc3NhZ2UudXNlci5pZH1cXCc+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAne3ttZXNzYWdlLnVzZXIubmFtZX19IDxzcGFuPnt7bWVzc2FnZS5jcmVhdGVkX2F0IHwgYW1EYXRlRm9ybWF0OlwiTU1NIERvIFlZWVlcIn19Ojwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPHAgY2xhc3M9XCJuby1oYXZlIG5vLW1hcmdpblwiIG5nLWlmPVwibWVzc2FnZXMubGVuZ3RoID09PSAwXCI+VGhlcmUgYXJlIGN1cnJlbnRseSBubyBtZXNzYWdlcy48L3A+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGZvcm0gY2xhc3M9XCJjaGF0c2VuZGZvcm1cIiBuZy1pZj1cInRocmVhZElkXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgbWVzc2FnZSBoZXJlIC4uLlwiIG5nLW1vZGVsPVwiZGF0YS5tZXNzYWdlVG9TZW5kXCIgZmQtZW50ZXI9XCJzZW5kTWVzc2FnZSgpXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIHNlbmRidG5cIiBuZy1jbGljaz1cInNlbmRNZXNzYWdlKClcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvblwiPlNlbmQ8L3NwYW4+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Zvcm0+JyxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIHRocmVhZElkOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSAkcm9vdFNjb3BlLnVzZXI7XG5cbiAgICAgICAgICAgICAgICB2YXIgTWVzc2FnZSA9ICRyZXNvdXJjZSgnL2FwaS9tZXNzYWdlcy86dGhyZWFkSWQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRocmVhZElkOiAnQGlkJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCd0aHJlYWRJZCcsIGZ1bmN0aW9uKHRocmVhZElkKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih0aHJlYWRJZCkgPT09ICd1bmRlZmluZWQnIHx8IHRocmVhZElkID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgTWVzc2FnZS5nZXQoe3RocmVhZElkOiAkc2NvcGUudGhyZWFkSWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmV0cml2aW5nIHRoZSB0aHJlYWQgOiAnICsgJHNjb3BlLnRocmVhZElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlcyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS50aHJlYWRfaWQgPSAkc2NvcGUudGhyZWFkSWQ7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZSA9ICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gICAgXHRyZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCh2YWx1ZSkgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbmdNaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHRyZXN0cmljdDogJ0EnLFxuICAgIFx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgIFx0XHRcdHNjb3BlLiR3YXRjaChhdHRyLm5nTWluLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoY3RybC4kdmlld1ZhbHVlKTtcbiAgICBcdFx0XHR9KTtcbiAgICBcdFx0XHR2YXIgbWluVmFsaWRhdG9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaW5WYWxpZGF0b3InKTtcbiAgICBcdFx0XHRcdHZhciBtaW4gPSBzY29wZS4kZXZhbChhdHRyLm5nTWluKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtaW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA8IG1pbik7XG4gICAgXHRcdFx0XHRpZiAoIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlIDwgbWluKSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01pbicsIGZhbHNlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcbiAgICBcdFx0XHRcdH0gZWxzZSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01pbicsIHRydWUpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fTtcblxuICAgIFx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChtaW5WYWxpZGF0b3IpO1xuICAgIFx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChtaW5WYWxpZGF0b3IpO1xuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ25nTWF4JywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0cmVzdHJpY3Q6ICdBJyxcbiAgICBcdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcbiAgICBcdFx0XHRzY29wZS4kd2F0Y2goYXR0ci5uZ01heCwgZnVuY3Rpb24gKCkge1xuICAgIFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgXHRcdFx0fSk7XG4gICAgXHRcdFx0dmFyIG1heFZhbGlkYXRvciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWF4VmFsaWRhdG9yJyk7XG4gICAgXHRcdFx0XHR2YXIgbWF4ID0gc2NvcGUuJGV2YWwoYXR0ci5uZ01heCkgfHwgSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1heCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlID4gbWF4KTtcbiAgICBcdFx0XHRcdGlmICghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPiBtYXgpIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWF4JywgZmFsc2UpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuICAgIFx0XHRcdFx0fSBlbHNlIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWF4JywgdHJ1ZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9O1xuXG4gICAgXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKG1heFZhbGlkYXRvcik7XG4gICAgXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKG1heFZhbGlkYXRvcik7XG4gICAgXHRcdH1cbiAgICBcdH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5maWx0ZXIoJ3RydXN0ZWRIdG1sJywgWyckc2NlJywgZnVuY3Rpb24oJHNjZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XG4gICAgICAgIH07XG4gICAgfV0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5mZEVudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdudW1iZXJzT25seScsIGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG4gICAgICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbEN0cmwpIHtcblxuICAgICAgICAgICAgIG1vZGVsQ3RybC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uIChpbnB1dFZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWRJbnB1dCA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuXG4gICAgICAgICAgICAgICBpZiAodHJhbnNmb3JtZWRJbnB1dCE9aW5wdXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICBtb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0cmFuc2Zvcm1lZElucHV0KTtcbiAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRyZW5kZXIoKTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWRJbnB1dDtcbiAgICAgICAgIH0pO1xuICAgICAgICAgfVxuICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmZFByb2ZpbGVJbnB1dCcsIGZ1bmN0aW9uKCRjb21waWxlLCAkdGltZW91dCkge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBmb3JtOiAnQCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0AnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAnQCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdAJyxcbiAgICAgICAgICAgICAgICBuZ01vZGVsOiAnPScsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgICAgICBmYWNlYm9va1ZhbHVlOiAnPScsXG4gICAgICAgICAgICAgICAgbGlua2VkaW5WYWx1ZTogJz0nXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZm9ybUVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbmRpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pc1ByaXN0aW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsaWRhdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsaWRhdGlvbk1lc3NhZ2UgPSAnJztcblxuICAgICAgICAgICAgICAgICRzY29wZS5yZXBsYWNlVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgICAgXHQkc2NvcGUubmdNb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRzID0ge1xuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICc8aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiIG5nLW1vZGVsPVwibmdNb2RlbFwiPicsXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0YXJlYSc6ICc8dGV4dGFyZWEgY2xhc3M9XCJ0ZXh0YXJlYSBmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiIG5nLW1vZGVsPVwibmdNb2RlbFwiIHJvd3M9XCI2XCI+PC90ZXh0YXJlYT4nLFxuICAgICAgICAgICAgICAgICAgICAvLyAnZW1haWwnOiAnPGlucHV0IG5hbWU9XCJ7e2ZpZWxkfX1cIiB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbCBpbnB1dC1sZ1wiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiIG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWJsdXI9XCJ1cGRhdGUoKVwiPiAnLFxuICAgICAgICAgICAgICAgICAgICAvLyAnZHJvcGRvd24nOiAnPGRpdiBjbGFzcz1cInNlbGVjdC13cmFwZXIgZnVsbFwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWFycm93LWJvdHRvbVwiPjwvc3Bhbj48c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LWxnXCIgbmctb3B0aW9ucz1cInZhbHVlLnZhbHVlIGFzIHZhbHVlLm5hbWUgZm9yIHZhbHVlIGluIHZhbHVlc1wiIG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWNoYW5nZT1cInVwZGF0ZSgpXCI+PC9zZWxlY3Q+PC9kaXY+JyxcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNbJHNjb3BlLnR5cGVdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNvY2lhbEFsdGVybmF0aXZlID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnR5cGUgIT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgICAgICAgICBcdHNvY2lhbEFsdGVybmF0aXZlID0gJzxkaXYgY2xhc3M9XCJzb2NpYWwtYWx0ZXJuYXRpdmVcIj4nICtcbiAgICAgICAgICAgICAgICBcdCc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1mYWNlYm9va1wiIHVpYi10b29sdGlwPVwie3tmYWNlYm9va1ZhbHVlfX1cIiBuZy1jbGFzcz1cIntcXCdjaGVja2VkXFwnOiAobmdNb2RlbCA9PT0gZmFjZWJvb2tWYWx1ZSkgJiYgbmdNb2RlbCAhPT0gXFwnXFwnfVwiIG5nLWRpc2FibGVkPVwiIWZhY2Vib29rVmFsdWVcIiBuZy1jbGljaz1cInJlcGxhY2VWYWx1ZShmYWNlYm9va1ZhbHVlKVwiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICBcdCc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1saW5rZWRpbjJcIiB1aWItdG9vbHRpcD1cInt7bGlua2VkaW5WYWx1ZX19XCIgbmctY2xhc3M9XCJ7XFwnY2hlY2tlZFxcJzogKG5nTW9kZWwgPT09IGxpbmtlZGluVmFsdWUpICYmIG5nTW9kZWwgIT09IFxcJ1xcJ31cIiBuZy1kaXNhYmxlZD1cIiFsaW5rZWRpblZhbHVlXCIgbmctY2xpY2s9XCJyZXBsYWNlVmFsdWUobGlua2VkaW5WYWx1ZSlcIj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgXHQnPC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPVxuXHQgICAgICAgICAgICAgICAgJzxkaXY+JyArXG5cdCAgICAgICAgICAgICAgICAnPGxhYmVsPnt7bGFiZWx9fTo8L2xhYmVsPicgK1xuXHQgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG5cdCAgICAgICAgICAgICAgICBcdGZpZWxkICtcblx0ICAgICAgICAgICAgICAgIFx0c29jaWFsQWx0ZXJuYXRpdmUgK1xuXHQgICAgICAgICAgICAgICAgJzwvZGl2PjwvZGl2Pic7XG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5odG1sKCRjb21waWxlKHRlbXBsYXRlKSgkc2NvcGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdzdHJpcFRhZ3MnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAoU3RyaW5nLmZyb21DaGFyQ29kZSgxNjApLCBcImdcIik7XG5cdFx0XHRcdHRleHQgPSBTdHJpbmcodGV4dCkucmVwbGFjZShyZSwgXCIgXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXlxceDAwLVxceDdGXS9nLCBcIlwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvJm5ic3A7L2dpLCcgJyk7XG5cdFx0XHR9XG5cblx0ICAgICBcdHJldHVybiB0ZXh0ID8gU3RyaW5nKHRleHQpLnJlcGxhY2UoLzxbXj5dKz4vZ20sICcnKSA6ICcnO1xuXHQgICAgfTtcblx0ICB9XG5cdCk7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnKS5maWx0ZXIoJ2NsZWFuSHRtbCcsIGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZih0ZXh0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHR9XG5cblx0ICAgICBcdHJldHVybiB0ZXh0O1xuXHQgICAgfTtcblx0ICB9XG5cdCk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmROb3RpZmljYXRpb25zJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHEsICRpbnRlcnZhbCwgJGh0dHAsICRzdGF0ZSwgQVBJKSB7XG4gICAgICAgIHZhciBnbG9iYWxOb3RpZmljYXRpb25zID0ge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uczogW10sXG4gICAgICAgICAgICB1bnJlYWQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcHVzaE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24obm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihub3RpZmljYXRpb25zKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSBub3RpZmljYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnbm90aWZpY2F0aW9ucy8nKSArIHVzZXIuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnNJbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ZXN0Tm90aWZpY2F0aW9ucyA9IGFuZ3VsYXIuY29weShnbG9iYWxOb3RpZmljYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucyA9IGxhdGVzdE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy5zbGljZSgwLCA1KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChub3RpZmljYXRpb25zSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnJlc29sdmUobGF0ZXN0Tm90aWZpY2F0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWROb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSS5wYXRoKCdub3RpZmljYXRpb25zLycpICsgbm90aWZpY2F0aW9uSWQgKyAnL3JlYWQnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgXHRub3RpZmljYXRpb24ucmVhZCA9IDE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZEFsbE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSS5wYXRoKCdub3RpZmljYXRpb25zL3VzZXIvJykgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnL3JlYWQnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMudW5yZWFkID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBub3RpZmljYXRpb25UcmlnZ2VyOiBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICAgICAgLy8gICAgIHN3aXRjaChjYXRlZ29yeSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ2Rvd25sb2FkLm5ldyc6ICRzdGF0ZS5nbygnYXBwLmRhc2hib2FyZC5kb3dubG9hZHMnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ3BhcnRuZXIucGFpcmVkJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLnBhcnRuZXIuZGV0YWlscycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5zdHVkeV9wZXJpb2RzJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmNvdXJzZXMucGVyaW9kcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAndXNlci5jcmVhdGVkJzogJHN0YXRlLmdvKFRhc2tzU2VydmljZS5uZXh0VGFzaygpLnZpZXcpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgZ2V0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSwgcHVzaCkge1xuICAgICAgICAgICAgICAgIHRvYXN0ZXIucG9wKHR5cGUsIHRpdGxlLCBtZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwdXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnlFcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AoJ2Vycm9yJywgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkU2Nyb2xsZXInLCBmdW5jdGlvbigkd2luZG93KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvVG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBib2R5LnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TZWN0aW9uOiBmdW5jdGlvbihpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBcdHZhciAkc2VjdGlvbiA9ICQoaWRlbnRpZmllcik7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCRzZWN0aW9uKTtcbiAgICAgICAgICAgIFx0aWYgKCRzZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFx0XHR2YXIgdG9wID0gJHNlY3Rpb24ub2Zmc2V0KCkudG9wIC0gNzA7XG5cbiAgICAgICAgICAgIFx0XHR2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBcdGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgJzUwMCcsICdzd2luZycpO1xuICAgICAgICAgICAgXHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS52YWx1ZSgnQ291bnRyaWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFmZ2hhbmlzdGFuXCIsIFwiY29kZVwiOiBcIkFGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiw4VsYW5kIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQVhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbGJhbmlhXCIsIFwiY29kZVwiOiBcIkFMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQWxnZXJpYVwiLCBcImNvZGVcIjogXCJEWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFtZXJpY2FuIFNhbW9hXCIsIFwiY29kZVwiOiBcIkFTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5kb3JyQVwiLCBcImNvZGVcIjogXCJBRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFuZ29sYVwiLCBcImNvZGVcIjogXCJBT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFuZ3VpbGxhXCIsIFwiY29kZVwiOiBcIkFJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW50YXJjdGljYVwiLCBcImNvZGVcIjogXCJBUVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFudGlndWEgYW5kIEJhcmJ1ZGFcIiwgXCJjb2RlXCI6IFwiQUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcmdlbnRpbmFcIiwgXCJjb2RlXCI6IFwiQVJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcm1lbmlhXCIsIFwiY29kZVwiOiBcIkFNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQXJ1YmFcIiwgXCJjb2RlXCI6IFwiQVdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBdXN0cmFsaWFcIiwgXCJjb2RlXCI6IFwiQVVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBdXN0cmlhXCIsIFwiY29kZVwiOiBcIkFUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQXplcmJhaWphblwiLCBcImNvZGVcIjogXCJBWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhaGFtYXNcIiwgXCJjb2RlXCI6IFwiQlNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCYWhyYWluXCIsIFwiY29kZVwiOiBcIkJIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFuZ2xhZGVzaFwiLCBcImNvZGVcIjogXCJCRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhcmJhZG9zXCIsIFwiY29kZVwiOiBcIkJCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVsYXJ1c1wiLCBcImNvZGVcIjogXCJCWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbGdpdW1cIiwgXCJjb2RlXCI6IFwiQkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZWxpemVcIiwgXCJjb2RlXCI6IFwiQlpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZW5pblwiLCBcImNvZGVcIjogXCJCSlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlcm11ZGFcIiwgXCJjb2RlXCI6IFwiQk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCaHV0YW5cIiwgXCJjb2RlXCI6IFwiQlRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb2xpdmlhXCIsIFwiY29kZVwiOiBcIkJPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYVwiLCBcImNvZGVcIjogXCJCQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJvdHN3YW5hXCIsIFwiY29kZVwiOiBcIkJXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm91dmV0IElzbGFuZFwiLCBcImNvZGVcIjogXCJCVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJyYXppbFwiLCBcImNvZGVcIjogXCJCUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJydW5laSBEYXJ1c3NhbGFtXCIsIFwiY29kZVwiOiBcIkJOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnVsZ2FyaWFcIiwgXCJjb2RlXCI6IFwiQkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdXJraW5hIEZhc29cIiwgXCJjb2RlXCI6IFwiQkZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdXJ1bmRpXCIsIFwiY29kZVwiOiBcIkJJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FtYm9kaWFcIiwgXCJjb2RlXCI6IFwiS0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYW1lcm9vblwiLCBcImNvZGVcIjogXCJDTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhbmFkYVwiLCBcImNvZGVcIjogXCJDQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhcGUgVmVyZGVcIiwgXCJjb2RlXCI6IFwiQ1ZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYXltYW4gSXNsYW5kc1wiLCBcImNvZGVcIjogXCJLWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNlbnRyYWwgQWZyaWNhbiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJDRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoYWRcIiwgXCJjb2RlXCI6IFwiVERcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDaGlsZVwiLCBcImNvZGVcIjogXCJDTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoaW5hXCIsIFwiY29kZVwiOiBcIkNOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hyaXN0bWFzIElzbGFuZFwiLCBcImNvZGVcIjogXCJDWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvY29zIChLZWVsaW5nKSBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIkNDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29sb21iaWFcIiwgXCJjb2RlXCI6IFwiQ09cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb21vcm9zXCIsIFwiY29kZVwiOiBcIktNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29uZ29cIiwgXCJjb2RlXCI6IFwiQ0dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb25nbywgVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlXCIsIFwiY29kZVwiOiBcIkNEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29vayBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIkNLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29zdGEgUmljYVwiLCBcImNvZGVcIjogXCJDUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvdGUgRFxcXCJJdm9pcmVcIiwgXCJjb2RlXCI6IFwiQ0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDcm9hdGlhXCIsIFwiY29kZVwiOiBcIkhSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3ViYVwiLCBcImNvZGVcIjogXCJDVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkN5cHJ1c1wiLCBcImNvZGVcIjogXCJDWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkN6ZWNoIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkNaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRGVubWFya1wiLCBcImNvZGVcIjogXCJES1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkRqaWJvdXRpXCIsIFwiY29kZVwiOiBcIkRKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRG9taW5pY2FcIiwgXCJjb2RlXCI6IFwiRE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEb21pbmljYW4gUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiRE9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFY3VhZG9yXCIsIFwiY29kZVwiOiBcIkVDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRWd5cHRcIiwgXCJjb2RlXCI6IFwiRUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFbCBTYWx2YWRvclwiLCBcImNvZGVcIjogXCJTVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVxdWF0b3JpYWwgR3VpbmVhXCIsIFwiY29kZVwiOiBcIkdRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXJpdHJlYVwiLCBcImNvZGVcIjogXCJFUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVzdG9uaWFcIiwgXCJjb2RlXCI6IFwiRUVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFdGhpb3BpYVwiLCBcImNvZGVcIjogXCJFVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKVwiLCBcImNvZGVcIjogXCJGS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZhcm9lIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiRk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGaWppXCIsIFwiY29kZVwiOiBcIkZKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmlubGFuZFwiLCBcImNvZGVcIjogXCJGSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyYW5jZVwiLCBcImNvZGVcIjogXCJGUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyZW5jaCBHdWlhbmFcIiwgXCJjb2RlXCI6IFwiR0ZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGcmVuY2ggUG9seW5lc2lhXCIsIFwiY29kZVwiOiBcIlBGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzXCIsIFwiY29kZVwiOiBcIlRGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2Fib25cIiwgXCJjb2RlXCI6IFwiR0FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHYW1iaWFcIiwgXCJjb2RlXCI6IFwiR01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHZW9yZ2lhXCIsIFwiY29kZVwiOiBcIkdFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2VybWFueVwiLCBcImNvZGVcIjogXCJERVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdoYW5hXCIsIFwiY29kZVwiOiBcIkdIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2licmFsdGFyXCIsIFwiY29kZVwiOiBcIkdJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3JlZWNlXCIsIFwiY29kZVwiOiBcIkdSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3JlZW5sYW5kXCIsIFwiY29kZVwiOiBcIkdMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3JlbmFkYVwiLCBcImNvZGVcIjogXCJHRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1YWRlbG91cGVcIiwgXCJjb2RlXCI6IFwiR1BcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWFtXCIsIFwiY29kZVwiOiBcIkdVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3VhdGVtYWxhXCIsIFwiY29kZVwiOiBcIkdUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3Vlcm5zZXlcIiwgXCJjb2RlXCI6IFwiR0dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWluZWFcIiwgXCJjb2RlXCI6IFwiR05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWluZWEtQmlzc2F1XCIsIFwiY29kZVwiOiBcIkdXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3V5YW5hXCIsIFwiY29kZVwiOiBcIkdZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSGFpdGlcIiwgXCJjb2RlXCI6IFwiSFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIZWFyZCBJc2xhbmQgYW5kIE1jZG9uYWxkIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiSE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIb2x5IFNlZSAoVmF0aWNhbiBDaXR5IFN0YXRlKVwiLCBcImNvZGVcIjogXCJWQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhvbmR1cmFzXCIsIFwiY29kZVwiOiBcIkhOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSG9uZyBLb25nXCIsIFwiY29kZVwiOiBcIkhLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSHVuZ2FyeVwiLCBcImNvZGVcIjogXCJIVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkljZWxhbmRcIiwgXCJjb2RlXCI6IFwiSVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJbmRpYVwiLCBcImNvZGVcIjogXCJJTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkluZG9uZXNpYVwiLCBcImNvZGVcIjogXCJJRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklyYW4sIElzbGFtaWMgUmVwdWJsaWMgT2ZcIiwgXCJjb2RlXCI6IFwiSVJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJcmFxXCIsIFwiY29kZVwiOiBcIklRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXJlbGFuZFwiLCBcImNvZGVcIjogXCJJRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklzbGUgb2YgTWFuXCIsIFwiY29kZVwiOiBcIklNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXNyYWVsXCIsIFwiY29kZVwiOiBcIklMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXRhbHlcIiwgXCJjb2RlXCI6IFwiSVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKYW1haWNhXCIsIFwiY29kZVwiOiBcIkpNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSmFwYW5cIiwgXCJjb2RlXCI6IFwiSlBcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKZXJzZXlcIiwgXCJjb2RlXCI6IFwiSkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKb3JkYW5cIiwgXCJjb2RlXCI6IFwiSk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLYXpha2hzdGFuXCIsIFwiY29kZVwiOiBcIktaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS2VueWFcIiwgXCJjb2RlXCI6IFwiS0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLaXJpYmF0aVwiLCBcImNvZGVcIjogXCJLSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZVxcXCJTIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIktQXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS29yZWEsIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIktSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS3V3YWl0XCIsIFwiY29kZVwiOiBcIktXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS3lyZ3l6c3RhblwiLCBcImNvZGVcIjogXCJLR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxhbyBQZW9wbGVcXFwiUyBEZW1vY3JhdGljIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkxBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGF0dmlhXCIsIFwiY29kZVwiOiBcIkxWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGViYW5vblwiLCBcImNvZGVcIjogXCJMQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxlc290aG9cIiwgXCJjb2RlXCI6IFwiTFNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaWJlcmlhXCIsIFwiY29kZVwiOiBcIkxSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGlieWFuIEFyYWIgSmFtYWhpcml5YVwiLCBcImNvZGVcIjogXCJMWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpZWNodGVuc3RlaW5cIiwgXCJjb2RlXCI6IFwiTElcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaXRodWFuaWFcIiwgXCJjb2RlXCI6IFwiTFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMdXhlbWJvdXJnXCIsIFwiY29kZVwiOiBcIkxVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFjYW9cIiwgXCJjb2RlXCI6IFwiTU9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWNlZG9uaWEsIFRoZSBGb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiTUtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWRhZ2FzY2FyXCIsIFwiY29kZVwiOiBcIk1HXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsYXdpXCIsIFwiY29kZVwiOiBcIk1XXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsYXlzaWFcIiwgXCJjb2RlXCI6IFwiTVlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxkaXZlc1wiLCBcImNvZGVcIjogXCJNVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbGlcIiwgXCJjb2RlXCI6IFwiTUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWx0YVwiLCBcImNvZGVcIjogXCJNVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hcnNoYWxsIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiTUhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYXJ0aW5pcXVlXCIsIFwiY29kZVwiOiBcIk1RXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF1cml0YW5pYVwiLCBcImNvZGVcIjogXCJNUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hdXJpdGl1c1wiLCBcImNvZGVcIjogXCJNVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1heW90dGVcIiwgXCJjb2RlXCI6IFwiWVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNZXhpY29cIiwgXCJjb2RlXCI6IFwiTVhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNaWNyb25lc2lhLCBGZWRlcmF0ZWQgU3RhdGVzIG9mXCIsIFwiY29kZVwiOiBcIkZNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW9sZG92YSwgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiTURcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb25hY29cIiwgXCJjb2RlXCI6IFwiTUNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb25nb2xpYVwiLCBcImNvZGVcIjogXCJNTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbnRzZXJyYXRcIiwgXCJjb2RlXCI6IFwiTVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb3JvY2NvXCIsIFwiY29kZVwiOiBcIk1BXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW96YW1iaXF1ZVwiLCBcImNvZGVcIjogXCJNWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk15YW5tYXJcIiwgXCJjb2RlXCI6IFwiTU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOYW1pYmlhXCIsIFwiY29kZVwiOiBcIk5BXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmF1cnVcIiwgXCJjb2RlXCI6IFwiTlJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXBhbFwiLCBcImNvZGVcIjogXCJOUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5ldGhlcmxhbmRzXCIsIFwiY29kZVwiOiBcIk5MXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV0aGVybGFuZHMgQW50aWxsZXNcIiwgXCJjb2RlXCI6IFwiQU5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXcgQ2FsZWRvbmlhXCIsIFwiY29kZVwiOiBcIk5DXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV3IFplYWxhbmRcIiwgXCJjb2RlXCI6IFwiTlpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOaWNhcmFndWFcIiwgXCJjb2RlXCI6IFwiTklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOaWdlclwiLCBcImNvZGVcIjogXCJORVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pZ2VyaWFcIiwgXCJjb2RlXCI6IFwiTkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOaXVlXCIsIFwiY29kZVwiOiBcIk5VXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTm9yZm9sayBJc2xhbmRcIiwgXCJjb2RlXCI6IFwiTkZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiTVBcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3J3YXlcIiwgXCJjb2RlXCI6IFwiTk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJPbWFuXCIsIFwiY29kZVwiOiBcIk9NXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFraXN0YW5cIiwgXCJjb2RlXCI6IFwiUEtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYWxhdVwiLCBcImNvZGVcIjogXCJQV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbGVzdGluaWFuIFRlcnJpdG9yeSwgT2NjdXBpZWRcIiwgXCJjb2RlXCI6IFwiUFNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYW5hbWFcIiwgXCJjb2RlXCI6IFwiUEFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYXB1YSBOZXcgR3VpbmVhXCIsIFwiY29kZVwiOiBcIlBHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFyYWd1YXlcIiwgXCJjb2RlXCI6IFwiUFlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQZXJ1XCIsIFwiY29kZVwiOiBcIlBFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGhpbGlwcGluZXNcIiwgXCJjb2RlXCI6IFwiUEhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQaXRjYWlyblwiLCBcImNvZGVcIjogXCJQTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBvbGFuZFwiLCBcImNvZGVcIjogXCJQTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBvcnR1Z2FsXCIsIFwiY29kZVwiOiBcIlBUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUHVlcnRvIFJpY29cIiwgXCJjb2RlXCI6IFwiUFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJRYXRhclwiLCBcImNvZGVcIjogXCJRQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlJldW5pb25cIiwgXCJjb2RlXCI6IFwiUkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSb21hbmlhXCIsIFwiY29kZVwiOiBcIlJPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUnVzc2lhbiBGZWRlcmF0aW9uXCIsIFwiY29kZVwiOiBcIlJVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUldBTkRBXCIsIFwiY29kZVwiOiBcIlJXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgSGVsZW5hXCIsIFwiY29kZVwiOiBcIlNIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgS2l0dHMgYW5kIE5ldmlzXCIsIFwiY29kZVwiOiBcIktOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgTHVjaWFcIiwgXCJjb2RlXCI6IFwiTENcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uXCIsIFwiY29kZVwiOiBcIlBNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXNcIiwgXCJjb2RlXCI6IFwiVkNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYW1vYVwiLCBcImNvZGVcIjogXCJXU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbiBNYXJpbm9cIiwgXCJjb2RlXCI6IFwiU01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYW8gVG9tZSBhbmQgUHJpbmNpcGVcIiwgXCJjb2RlXCI6IFwiU1RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYXVkaSBBcmFiaWFcIiwgXCJjb2RlXCI6IFwiU0FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZW5lZ2FsXCIsIFwiY29kZVwiOiBcIlNOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2VyYmlhIGFuZCBNb250ZW5lZ3JvXCIsIFwiY29kZVwiOiBcIkNTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2V5Y2hlbGxlc1wiLCBcImNvZGVcIjogXCJTQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNpZXJyYSBMZW9uZVwiLCBcImNvZGVcIjogXCJTTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNpbmdhcG9yZVwiLCBcImNvZGVcIjogXCJTR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNsb3Zha2lhXCIsIFwiY29kZVwiOiBcIlNLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2xvdmVuaWFcIiwgXCJjb2RlXCI6IFwiU0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb2xvbW9uIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiU0JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb21hbGlhXCIsIFwiY29kZVwiOiBcIlNPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU291dGggQWZyaWNhXCIsIFwiY29kZVwiOiBcIlpBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiR1NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTcGFpblwiLCBcImNvZGVcIjogXCJFU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNyaSBMYW5rYVwiLCBcImNvZGVcIjogXCJMS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN1ZGFuXCIsIFwiY29kZVwiOiBcIlNEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3VyaW5hbWVcIiwgXCJjb2RlXCI6IFwiU1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTdmFsYmFyZCBhbmQgSmFuIE1heWVuXCIsIFwiY29kZVwiOiBcIlNKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3dhemlsYW5kXCIsIFwiY29kZVwiOiBcIlNaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3dlZGVuXCIsIFwiY29kZVwiOiBcIlNFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3dpdHplcmxhbmRcIiwgXCJjb2RlXCI6IFwiQ0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTeXJpYW4gQXJhYiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJTWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRhaXdhbiwgUHJvdmluY2Ugb2YgQ2hpbmFcIiwgXCJjb2RlXCI6IFwiVFdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUYWppa2lzdGFuXCIsIFwiY29kZVwiOiBcIlRKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJUWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRoYWlsYW5kXCIsIFwiY29kZVwiOiBcIlRIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGltb3ItTGVzdGVcIiwgXCJjb2RlXCI6IFwiVExcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUb2dvXCIsIFwiY29kZVwiOiBcIlRHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVG9rZWxhdVwiLCBcImNvZGVcIjogXCJUS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRvbmdhXCIsIFwiY29kZVwiOiBcIlRPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVHJpbmlkYWQgYW5kIFRvYmFnb1wiLCBcImNvZGVcIjogXCJUVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1bmlzaWFcIiwgXCJjb2RlXCI6IFwiVE5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXJrZXlcIiwgXCJjb2RlXCI6IFwiVFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXJrbWVuaXN0YW5cIiwgXCJjb2RlXCI6IFwiVE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiVENcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUdXZhbHVcIiwgXCJjb2RlXCI6IFwiVFZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVZ2FuZGFcIiwgXCJjb2RlXCI6IFwiVUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVa3JhaW5lXCIsIFwiY29kZVwiOiBcIlVBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVW5pdGVkIEFyYWIgRW1pcmF0ZXNcIiwgXCJjb2RlXCI6IFwiQUVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgS2luZ2RvbVwiLCBcImNvZGVcIjogXCJHQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBTdGF0ZXNcIiwgXCJjb2RlXCI6IFwiVVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiVU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVcnVndWF5XCIsIFwiY29kZVwiOiBcIlVZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVXpiZWtpc3RhblwiLCBcImNvZGVcIjogXCJVWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZhbnVhdHVcIiwgXCJjb2RlXCI6IFwiVlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWZW5lenVlbGFcIiwgXCJjb2RlXCI6IFwiVkVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWaWV0IE5hbVwiLCBcImNvZGVcIjogXCJWTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZpcmdpbiBJc2xhbmRzLCBCcml0aXNoXCIsIFwiY29kZVwiOiBcIlZHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHMsIFUuUy5cIiwgXCJjb2RlXCI6IFwiVklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLCBcImNvZGVcIjogXCJXRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIldlc3Rlcm4gU2FoYXJhXCIsIFwiY29kZVwiOiBcIkVIXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiWWVtZW5cIiwgXCJjb2RlXCI6IFwiWUVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJaYW1iaWFcIiwgXCJjb2RlXCI6IFwiWk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJaaW1iYWJ3ZVwiLCBcImNvZGVcIjogXCJaV1wiIH1cbiAgICAgICAgXTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS52YWx1ZSgnQ291bnRyeUNvZGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IGNvZGU6ICcxJywgY291bnRyeTogJ1VTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMScsIGNvdW50cnk6ICdDQScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzcnLCBjb3VudHJ5OiAnUlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc3JywgY291bnRyeTogJ0taJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjAnLCBjb3VudHJ5OiAnRUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNycsIGNvdW50cnk6ICdaQScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMwJywgY291bnRyeTogJ0dSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzEnLCBjb3VudHJ5OiAnTkwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczMicsIGNvdW50cnk6ICdCRScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMzJywgY291bnRyeTogJ0ZSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzQnLCBjb3VudHJ5OiAnRVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNicsIGNvdW50cnk6ICdIVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzM5JywgY291bnRyeTogJ0lUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDAnLCBjb3VudHJ5OiAnUk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MScsIGNvdW50cnk6ICdDSCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQzJywgY291bnRyeTogJ0FUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQnLCBjb3VudHJ5OiAnR0InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NScsIGNvdW50cnk6ICdESycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ2JywgY291bnRyeTogJ1NFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDcnLCBjb3VudHJ5OiAnTk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NycsIGNvdW50cnk6ICdTSicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ4JywgY291bnRyeTogJ1BMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDknLCBjb3VudHJ5OiAnREUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MScsIGNvdW50cnk6ICdQRScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzUyJywgY291bnRyeTogJ01YJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTMnLCBjb3VudHJ5OiAnQ1UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NCcsIGNvdW50cnk6ICdBUicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU1JywgY291bnRyeTogJ0JSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTYnLCBjb3VudHJ5OiAnQ0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NycsIGNvdW50cnk6ICdDTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU4JywgY291bnRyeTogJ1ZFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjAnLCBjb3VudHJ5OiAnTVknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MScsIGNvdW50cnk6ICdBVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYxJywgY291bnRyeTogJ0NDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjEnLCBjb3VudHJ5OiAnQ1gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MicsIGNvdW50cnk6ICdJRCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYzJywgY291bnRyeTogJ1BIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjQnLCBjb3VudHJ5OiAnTlonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NCcsIGNvdW50cnk6ICdQTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzY1JywgY291bnRyeTogJ1NHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjYnLCBjb3VudHJ5OiAnVEgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4MScsIGNvdW50cnk6ICdKUCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzgyJywgY291bnRyeTogJ0tSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODQnLCBjb3VudHJ5OiAnVk4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NicsIGNvdW50cnk6ICdDTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkwJywgY291bnRyeTogJ1RSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTEnLCBjb3VudHJ5OiAnSU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5MicsIGNvdW50cnk6ICdQSycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkzJywgY291bnRyeTogJ0FGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTQnLCBjb3VudHJ5OiAnTEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NScsIGNvdW50cnk6ICdNTScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzk4JywgY291bnRyeTogJ0lSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjExJywgY291bnRyeTogJ1NTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjEyJywgY291bnRyeTogJ01BJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjEyJywgY291bnRyeTogJ0VIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjEzJywgY291bnRyeTogJ0RaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjE2JywgY291bnRyeTogJ1ROJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjE4JywgY291bnRyeTogJ0xZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIwJywgY291bnRyeTogJ0dNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIxJywgY291bnRyeTogJ1NOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIyJywgY291bnRyeTogJ01SJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjIzJywgY291bnRyeTogJ01MJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI0JywgY291bnRyeTogJ0dOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI1JywgY291bnRyeTogJ0NJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI2JywgY291bnRyeTogJ0JGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI3JywgY291bnRyeTogJ05FJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI4JywgY291bnRyeTogJ1RHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjI5JywgY291bnRyeTogJ0JKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMwJywgY291bnRyeTogJ01VJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMxJywgY291bnRyeTogJ0xSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMyJywgY291bnRyeTogJ1NMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjMzJywgY291bnRyeTogJ0dIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM0JywgY291bnRyeTogJ05HJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM1JywgY291bnRyeTogJ1REJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM2JywgY291bnRyeTogJ0NGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM3JywgY291bnRyeTogJ0NNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM4JywgY291bnRyeTogJ0NWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjM5JywgY291bnRyeTogJ1NUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQwJywgY291bnRyeTogJ0dRJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQxJywgY291bnRyeTogJ0dBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQyJywgY291bnRyeTogJ0NHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQzJywgY291bnRyeTogJ0NEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ0JywgY291bnRyeTogJ0FPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ1JywgY291bnRyeTogJ0dXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ2JywgY291bnRyeTogJ0lPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ4JywgY291bnRyeTogJ1NDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjQ5JywgY291bnRyeTogJ1NEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUwJywgY291bnRyeTogJ1JXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUxJywgY291bnRyeTogJ0VUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUyJywgY291bnRyeTogJ1NPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjUzJywgY291bnRyeTogJ0RKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU0JywgY291bnRyeTogJ0tFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU1JywgY291bnRyeTogJ1RaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU2JywgY291bnRyeTogJ1VHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU3JywgY291bnRyeTogJ0JJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjU4JywgY291bnRyeTogJ01aJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYwJywgY291bnRyeTogJ1pNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYxJywgY291bnRyeTogJ01HJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYyJywgY291bnRyeTogJ1lUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYyJywgY291bnRyeTogJ1JFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjYzJywgY291bnRyeTogJ1pXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY0JywgY291bnRyeTogJ05BJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY1JywgY291bnRyeTogJ01XJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY2JywgY291bnRyeTogJ0xTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY3JywgY291bnRyeTogJ0JXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY4JywgY291bnRyeTogJ1NaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjY5JywgY291bnRyeTogJ0tNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjkwJywgY291bnRyeTogJ1NIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjkxJywgY291bnRyeTogJ0VSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjk3JywgY291bnRyeTogJ0FXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjk4JywgY291bnRyeTogJ0ZPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMjk5JywgY291bnRyeTogJ0dMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUwJywgY291bnRyeTogJ0dJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUxJywgY291bnRyeTogJ1BUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUyJywgY291bnRyeTogJ0xVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzUzJywgY291bnRyeTogJ0lFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU0JywgY291bnRyeTogJ0lTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU1JywgY291bnRyeTogJ0FMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU2JywgY291bnRyeTogJ01UJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU3JywgY291bnRyeTogJ0NZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU4JywgY291bnRyeTogJ0ZJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzU5JywgY291bnRyeTogJ0JHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzcwJywgY291bnRyeTogJ0xUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzcxJywgY291bnRyeTogJ0xWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzcyJywgY291bnRyeTogJ0VFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzczJywgY291bnRyeTogJ01EJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc0JywgY291bnRyeTogJ0FNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc1JywgY291bnRyeTogJ0JZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc2JywgY291bnRyeTogJ0FEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc3JywgY291bnRyeTogJ01DJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc4JywgY291bnRyeTogJ1NNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzc5JywgY291bnRyeTogJ1ZBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgwJywgY291bnRyeTogJ1VBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgxJywgY291bnRyeTogJ1JTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgyJywgY291bnRyeTogJ01FJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzgzJywgY291bnRyeTogJ1hLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg1JywgY291bnRyeTogJ0hSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg2JywgY291bnRyeTogJ1NJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg3JywgY291bnRyeTogJ0JBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzg5JywgY291bnRyeTogJ01LJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDIwJywgY291bnRyeTogJ0NaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDIxJywgY291bnRyeTogJ1NLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDIzJywgY291bnRyeTogJ0xJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAwJywgY291bnRyeTogJ0ZLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAxJywgY291bnRyeTogJ0JaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAyJywgY291bnRyeTogJ0dUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTAzJywgY291bnRyeTogJ1NWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA0JywgY291bnRyeTogJ0hOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA1JywgY291bnRyeTogJ05JJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA2JywgY291bnRyeTogJ0NSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA3JywgY291bnRyeTogJ1BBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA4JywgY291bnRyeTogJ1BNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTA5JywgY291bnRyeTogJ0hUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkwJywgY291bnRyeTogJ0JMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkwJywgY291bnRyeTogJ01GJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkxJywgY291bnRyeTogJ0JPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkyJywgY291bnRyeTogJ0dZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTkzJywgY291bnRyeTogJ0VDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk1JywgY291bnRyeTogJ1BZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk3JywgY291bnRyeTogJ1NSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk4JywgY291bnRyeTogJ1VZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk5JywgY291bnRyeTogJ0NXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTk5JywgY291bnRyeTogJ0FOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjcwJywgY291bnRyeTogJ1RMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjcyJywgY291bnRyeTogJ0FRJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjczJywgY291bnRyeTogJ0JOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc0JywgY291bnRyeTogJ05SJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc1JywgY291bnRyeTogJ1BHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc2JywgY291bnRyeTogJ1RPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc3JywgY291bnRyeTogJ1NCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc4JywgY291bnRyeTogJ1ZVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjc5JywgY291bnRyeTogJ0ZKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgwJywgY291bnRyeTogJ1BXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgxJywgY291bnRyeTogJ1dGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgyJywgY291bnRyeTogJ0NLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjgzJywgY291bnRyeTogJ05VJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg1JywgY291bnRyeTogJ1dTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg2JywgY291bnRyeTogJ0tJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg3JywgY291bnRyeTogJ05DJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg4JywgY291bnRyeTogJ1RWJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjg5JywgY291bnRyeTogJ1BGJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjkwJywgY291bnRyeTogJ1RLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjkxJywgY291bnRyeTogJ0ZNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjkyJywgY291bnRyeTogJ01IJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODUwJywgY291bnRyeTogJ0tQJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODUyJywgY291bnRyeTogJ0hLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODUzJywgY291bnRyeTogJ01PJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODU1JywgY291bnRyeTogJ0tIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODU2JywgY291bnRyeTogJ0xBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODgwJywgY291bnRyeTogJ0JEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODg2JywgY291bnRyeTogJ1RXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYwJywgY291bnRyeTogJ01WJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYxJywgY291bnRyeTogJ0xCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYyJywgY291bnRyeTogJ0pPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTYzJywgY291bnRyeTogJ1NZJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY0JywgY291bnRyeTogJ0lRJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY1JywgY291bnRyeTogJ0tXJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY2JywgY291bnRyeTogJ1NBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY3JywgY291bnRyeTogJ1lFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTY4JywgY291bnRyeTogJ09NJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTcwJywgY291bnRyeTogJ1BTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTcxJywgY291bnRyeTogJ0FFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTcyJywgY291bnRyeTogJ0lMJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTczJywgY291bnRyeTogJ0JIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc0JywgY291bnRyeTogJ1FBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc1JywgY291bnRyeTogJ0JUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc2JywgY291bnRyeTogJ01OJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTc3JywgY291bnRyeTogJ05QJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTkyJywgY291bnRyeTogJ1RKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTkzJywgY291bnRyeTogJ1RNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk0JywgY291bnRyeTogJ0FaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk1JywgY291bnRyeTogJ0dFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk2JywgY291bnRyeTogJ0tHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTk4JywgY291bnRyeTogJ1VaJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNDInLCBjb3VudHJ5OiAnQlMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI0NicsIGNvdW50cnk6ICdCQicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjY0JywgY291bnRyeTogJ0FJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNjgnLCBjb3VudHJ5OiAnQUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI4NCcsIGNvdW50cnk6ICdWRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMzQwJywgY291bnRyeTogJ1ZJJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0zNDUnLCBjb3VudHJ5OiAnS1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTQ0MScsIGNvdW50cnk6ICdCTScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNDczJywgY291bnRyeTogJ0dEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NDknLCBjb3VudHJ5OiAnVEMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY2NCcsIGNvdW50cnk6ICdNUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjcwJywgY291bnRyeTogJ01QJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NzEnLCBjb3VudHJ5OiAnR1UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY4NCcsIGNvdW50cnk6ICdBUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzIxJywgY291bnRyeTogJ1NYJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03NTgnLCBjb3VudHJ5OiAnTEMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTc2NycsIGNvdW50cnk6ICdETScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzg0JywgY291bnRyeTogJ1ZDJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS05MzknLCBjb3VudHJ5OiAnUFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg0OScsIGNvdW50cnk6ICdETycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODY4JywgY291bnRyeTogJ1RUJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS04NjknLCBjb3VudHJ5OiAnS04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg3NicsIGNvdW50cnk6ICdKTScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ0LTE0ODEnLCBjb3VudHJ5OiAnR0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NC0xNTM0JywgY291bnRyeTogJ0pFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQtMTYyNCcsIGNvdW50cnk6ICdJTScgfVxuICAgICAgICBdO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0FQSScsIGZ1bmN0aW9uKCkge1xuICAgIFx0dmFyIGRvbWFpblVybCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCdmdW5kYXRvci5jbycpICE9PSAtMSA/ICdmdW5kYXRvci5jbycgOiAnZnVuZGF0b3IuYXBwJztcbiAgICAgICAgdmFyIGJhc2UgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnL2FwaS8nO1xuICAgICAgICB2YXIgcGF0aCA9ICcnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgIFx0cGF0aDogZnVuY3Rpb24oZnVuYywgdmVyc2lvbikge1xuICAgICAgICBcdFx0aWYgKHR5cGVvZih2ZXJzaW9uKSA9PT0gJ3VuZGVmaW5lZCcpIHZlcnNpb24gPSAndjEnO1xuICAgICAgICBcdFx0dmFyIGRlbGltaXRlciA9IGZ1bmMuc3RhcnRzV2l0aCgnLycpID8gJycgOiAnLyc7XG4gICAgICAgIFx0XHRyZXR1cm4gcGF0aCA9IGJhc2UgKyB2ZXJzaW9uICsgZGVsaW1pdGVyICsgZnVuYztcbiAgICAgICAgXHR9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnByb3ZpZGVyKCdBUElQcm92aWRlcicsIGZ1bmN0aW9uKCkge1xuICAgIFx0dmFyIGRvbWFpblVybCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCdmdW5kYXRvci5jbycpICE9PSAtMSA/ICdmdW5kYXRvci5jbycgOiAnZnVuZGF0b3IuYXBwJztcbiAgICAgICAgdmFyIGJhc2UgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnL2FwaS8nO1xuICAgICAgICB2YXIgcGF0aCA9ICcnO1xuXG4gICAgICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcdHJldHVybiB7XG4gICAgICAgIFx0XHRwYXRoOiBmdW5jdGlvbihmdW5jLCB2ZXJzaW9uKSB7XG4gICAgICAgIFx0XHRcdGlmICh0eXBlb2YodmVyc2lvbikgPT09ICd1bmRlZmluZWQnKSB2ZXJzaW9uID0gJ3YxJztcbiAgICAgICAgXHRcdFx0dmFyIGRlbGltaXRlciA9IGZ1bmMuc3RhcnRzV2l0aCgnLycpID8gJycgOiAnLyc7XG4gICAgICAgIFx0XHRcdHJldHVybiBwYXRoID0gYmFzZSArIHZlcnNpb24gKyBkZWxpbWl0ZXIgKyBmdW5jO1xuICAgICAgICBcdFx0fVxuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsIEFQSSl7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnLCB7fSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICAkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ2F1dGhlbnRpY2F0ZS9zaWdudXAnKSwgdXNlckluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSAmJiB0eXBlb2YocmVzdWx0LmRhdGEubWVzc2FnZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9IHJlc3VsdC5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWxbMF0pO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJGF1dGguc2V0VG9rZW4ocmVzdWx0LmRhdGEudG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU3RhdGUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoYWN0aXZlU3RhdGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5zaWdudXAnKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHBheWxvYWQucm9sZSwgcGF5bG9hZC5yb2xlX2lkLCB0cnVlLCBhY3RpdmVTdGF0ZSwgYWN0aXZlU3RhdGVQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXNUZXh0ID09PSAnVW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1RoZSBlbWFpbCBvciBwYXNzd29yZCB5b3UgZW50ZXJlZCBpcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aENvbmZpcm1DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgQVBJKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLmNvZGUpICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YoJHN0YXRlUGFyYW1zLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY29uZmlybWF0aW9uX2NvZGU6ICRzdGF0ZVBhcmFtcy5jb2RlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnYXV0aGVudGljYXRlL2NvbmZpcm0nKSwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLmVycm9yO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aFJlY292ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgQVBJKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcmVjb3ZlcnlFbWFpbDogJycsXG4gICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICBwYXNzd29yZF9yZXBlYXQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMudG9rZW4pID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YoJHN0YXRlUGFyYW1zLmVtYWlsKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlY292ZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdsb2FkaW5nJztcblxuICAgICAgICAgICAgLy8gUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLnJlY292ZXJ5RW1haWxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ2F1dGhlbnRpY2F0ZS9mb3Jnb3QnKSwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9ICdBIHBhc3N3b3JkIHJlc2V0IGxpbmsgaGFzIGJlZW4gc2VudCB0byB5b3VyIGVtYWlsLic7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuZXJyb3IgPT09ICdJbnZhbGlkIFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVjb3ZlcmluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAvLyBSZXNldCBQYXNzd29yZFxuICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnBhc3N3b3JkLmxlbmd0aCA+PSA2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnBhc3N3b3JkID09PSAkc2NvcGUuZGF0YS5wYXNzd29yZF9yZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiAkc3RhdGVQYXJhbXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogJHN0YXRlUGFyYW1zLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAkc2NvcGUuZGF0YS5wYXNzd29yZF9yZXBlYXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCdhdXRoZW50aWNhdGUvcmVjb3ZlcicpLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5yZW1vdmVUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIGZyb20gaGVyZSAuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBkbyBub3QgbWF0Y2ghJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBuZWVkIHRvIGJlIGxvbmdlciB0aGFuIDYgY2hhcmFjdGVycyEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YVVSSSk7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZm9jdXNPbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHsgZm9jdXNPbjogJz0nIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3BlLmZvY3VzT24pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuZm9jdXNPbil7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICB9O1xuICAgIH0pO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHJlc291cmNlLCBGZFNjcm9sbGVyLCAkZmlsdGVyLCBGaWxlVXBsb2FkZXIsIENvdW50cmllcywgQ291bnRyeUNvZGVzLCBBUEkpIHtcblxuICAgICAgICAkc2NvcGUuZm9ybSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiAxLFxuICAgICAgICAgICAgdG90YWxTdGVwczogM1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b3RhbFN0ZXBzID0ge1xuICAgICAgICAgICAgY3JlYXRvcjogMyxcbiAgICAgICAgICAgIGV4cGVydDogNCxcbiAgICAgICAgICAgIGludmVzdG9yOiA0XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZUZvcm1TdGVwID0gZnVuY3Rpb24obmV3U3RlcCl7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCA9IG5ld1N0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gQ291bnRyaWVzKCk7XG4gICAgICAgICRzY29wZS5jb3VudHJ5Q29kZXMgPSBDb3VudHJ5Q29kZXMoKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnJHNjb3BlLmNvdW50cmllcycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291bnRyaWVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJyRzY29wZS5jb3VudHJ5Q29kZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdW50cnlDb2Rlcyk7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRhY3RUaW1lcyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnV29ya2luZyBob3VycyAoOWFtIHRvIDYgcG0pJywgdmFsdWU6ICc5LTYnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnRXZlbmluZyB0aW1lICg2YW0gdG8gOSBwbSknLCB2YWx1ZTogJzYtOSd9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFJvbGU6ICdjcmVhdG9yJyxcbiAgICAgICAgICAgIGFnZUdhdGU6ICd5ZXMnLFxuICAgICAgICAgICAgY291bnRyeU9yaWdpbjogJycsXG4gICAgICAgICAgICBjb3VudHJ5UmVzaWRlbmNlOiAnJyxcbiAgICAgICAgICAgIGNvbnRhY3RUaW1lOiAnJyxcbiAgICAgICAgICAgIGV4cGVydGlzZUZvcm06IHtcbiAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcm9wcGVkVGh1bWJuYWlsOiBudWxsLFxuICAgICAgICAgICAgZW1haWw6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHBheWxvYWQgPSAkYXV0aC5nZXRQYXlsb2FkKCk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5jaGFuZ2VSb2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzID0gJHNjb3BlLnRvdGFsU3RlcHNbJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlXTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKCgkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCAvICRzY29wZS5mb3JtLnRvdGFsU3RlcHMpICogMTAwLCA5Nik7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3NJbnZlcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KCgoMSAtICgkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCAvICRzY29wZS5mb3JtLnRvdGFsU3RlcHMpKSAqIDEwMCksIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodXNlci5yZWdpc3RlcmVkID09IDEpICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiBBUEkucGF0aCgnZmlsZXMnKSxcbiAgICAgICAgICAgIHJlbW92ZUFmdGVyVXBsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jb25maXJtSW1hZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGltYWdlID0gJHNjb3BlLmRhdGEuY3JvcHBlZFRodW1ibmFpbDtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbGUubmFtZSA9ICd0aHVtYm5haWxfJyArICRyb290U2NvcGUudXNlci5pZCArICcucG5nJztcblxuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe2F0dGFjaDogJ3RodW1ibmFpbCd9KTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe3VzZXJfaWQ6ICRyb290U2NvcGUudXNlci5pZH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gbnVsbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3BvbnNlLmZpbGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSAnWW91ciBwcm9maWxlIHBpY3R1cmUgd2FzIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZCEnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZUVycm9yID0gJ1Byb2ZpbGUgcGljdHVyZSBmYWlsZWQgdG8gdXBsb2FkLCBwbGVhc2UgdHJ5IGFnYWluISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLmFkZFRvUXVldWUoZGF0YVVSSXRvQmxvYihpbWFnZSkpO1xuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKCdhcGkvc2tpbGxzJykucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKXtcbiAgICAgICAgICAgIHZhciBsYXN0SW5wdXR0ZWRFeHBlcnRpc2UgPSB7c2VsZWN0ZWRFeHBlcnRpc2U6ICdudWxsJywgb3RoZXJFeHBlcnRpc2U6IHtzdGF0dXM6IDF9fTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLTFdO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGFzdElucHV0dGVkRXhwZXJ0aXNlKTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIDwgMyAmJiAobGFzdElucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsICYmIGxhc3RJbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNraWxsc0xpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZUNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGxzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJTa2lsbHM6IHtsaXN0OiBbXSwgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2VDYXRlZ29yeSwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5KGluZGV4KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oZSwgaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2Upe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBleHBlcnRpc2U7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdChpbmRleCk7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5pblNraWxscyA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICB2YXIgZm91bmRTa2lsbCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZm91bmRTa2lsbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kU2tpbGwubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdFNraWxsID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIGlmKCEkc2NvcGUuaW5Ta2lsbHMoaW5kZXgsIHNraWxsKSl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMucHVzaChza2lsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdFNraWxsID0gZnVuY3Rpb24oZSwgaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFuZ3VsYXIuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVNraWxscyA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzID0ge2xpc3Q6IFtdLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ2V4cGVydGlzZS1jYXRlZ29yeS8wJykpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnZXhwZXJ0aXNlLWNhdGVnb3J5LycpICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ2V4cGVydGlzZS9jYXRlZ29yeS8nKSArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnZXhwZXJ0aXNlLycpICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UuaWQgKyAnL3NraWxscy8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5zdWJtaXREZXRhaWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5mbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICRzY29wZS5kYXRhLmxuYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSxcbiAgICAgICAgICAgICAgICBhZ2VfZ2F0ZTogJHNjb3BlLmRhdGEuYWdlR2F0ZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X29yaWdpbjogJHNjb3BlLmRhdGEuY291bnRyeU9yaWdpbixcbiAgICAgICAgICAgICAgICBjb3VudHJ5X3Jlc2lkZW5jZTogJHNjb3BlLmRhdGEuY291bnRyeVJlc2lkZW5jZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X251bWJlcjogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlcixcbiAgICAgICAgICAgICAgICBjb250YWN0X251bWJlcl9jb3VudHJ5X2NvZGU6ICRzY29wZS5kYXRhLmNvbnRhY3ROdW1iZXJDb3VudHJ5Q29kZS5jb2RlLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfdGltZTogJHNjb3BlLmRhdGEuY29udGFjdFRpbWUudmFsdWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGludmVzdG1lbnRCdWRnZXQgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRCdWRnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmVzdG1lbnRCdWRnZXQgPT09ICdvdGhlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmVzdG1lbnRCdWRnZXQgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRCdWRnZXRPdGhlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3RvciA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2J1ZGdldCA9IGludmVzdG1lbnRCdWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfZ29hbCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEdvYWw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfcmVhc29uID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50UmVhc29uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOlxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5jcmVhdG9yID0ge307XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhwZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJ0ID0geyBsaXN0OiBbXSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0LCBmdW5jdGlvbihpbnB1dHRlZEV4cGVydGlzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UgIT09IG51bGwgfHwgaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5leHBlcnQubGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2VfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZV9zdWJfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX2V4cGVydGlzZV9zdWJfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX2V4cGVydGlzZTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsczogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRTa2lsbHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoQVBJLnBhdGgoJ3VzZXJzLycpICsgJHJvb3RTY29wZS51c2VyLmlkLCB1c2VyRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSA9PT0gJ1VwZGF0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5uYW1lID0gJHNjb3BlLmRhdGEuZm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5sYXN0X25hbWUgPSAkc2NvcGUuZGF0YS5sbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJvbGUgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkaHR0cCwgJHRpbWVvdXQsICRmaWx0ZXIsIEFQSSkge1xuXG4gICAgICAgICRzY29wZS5jb250ZXN0cyA9IFtdO1xuICAgICAgICAkc2NvcGUuc2VjdGlvbkxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKEFQSS5wYXRoKCdjb250ZXN0cy86Y29udGVzdElkJyksIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gW107XG4gICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzID0gW107XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJyAmJiB0eXBlb2YoJHJvb3RTY29wZS51c2VyLmNyZWF0b3IpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgb2djIGluICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0W29nY107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2djSW5kZXggPSAkc2NvcGUuY29udGVzdHMuaW5kZXhPZihjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0cy5zcGxpY2Uob2djSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYgJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBqYyBpbiAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmdbamNdLmNvbnRlc3RfaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3QgPSAkZmlsdGVyKCdmaWx0ZXInKShyZXN1bHQsIHtpZDogY29udGVzdF9pZH0sIHRydWUpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoY29udGVzdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzLnB1c2goY29udGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RTaW5nbGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkZmlsdGVyLCAkdGltZW91dCwgRmRTY3JvbGxlciwgJGh0dHAsIExpZ2h0Ym94LCBBUEkpIHtcbiAgICAgICAgJHNjb3BlLmNvbnRlc3RJZCA9ICRzdGF0ZVBhcmFtcy5jb250ZXN0SWQ7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgY29udGVzdEZ1bGxEZXNjcmlwdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBhZGRFbnRyeTogZmFsc2UsXG4gICAgICAgICAgICBhZGRFbnRyeUZvcm06IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgYXR0YWNoZWRGaWxlczogW11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RlZEVudHJ5OiBudWxsLFxuICAgICAgICAgICAgcmF0aW5nOiB7XG4gICAgICAgICAgICAgICAgZGVzaWduOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAnJyxcbiAgICAgICAgICAgICAgICBpbmR1c3RyaWFsOiAnJyxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ2NvbnRlc3RzLzpjb250ZXN0SWQnKSwge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnkgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ2VudHJpZXMvOmVudHJ5SWQnKSwge1xuICAgICAgICAgICAgZW50cnlJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29udGVzdGFudEVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogQVBJLnBhdGgoJ2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2NyZWF0b3IvOmNyZWF0b3JJZCcpLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBqdWRnZUVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogQVBJLnBhdGgoJ2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2p1ZGdlLzpqdWRnZUlkJyksXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBBUEkucGF0aCgnZW50cmllcy86ZW50cnlJZC9tZXNzYWdlcycpLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeVJhdGluZyA9ICRyZXNvdXJjZShBUEkucGF0aCgnZW50cnktcmF0aW5ncy86ZW50cnlSYXRpbmdJZCcpLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgIC8vICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLnNob3dGdWxsVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmhpZGVGdWxsVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuY29udGVzdEZ1bGxEZXNjcmlwdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29udGVzdC5nZXQoe1xuICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkXG4gICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgdmFyIGp1ZGdlYWJsZSA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5qdWRnaW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcGVuZGluZ0p1ZGdlYWJsZSA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5qdWRnaW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgY29udGVzdGluZyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5jb250ZXN0aW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcGVuZGluZ0NvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihqdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChqdWRnZWFibGUubGVuZ3RoID4gMCAmJiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSAnanVyeScgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSAnY3JlYXRvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LnNob3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5jb250ZXN0SWQgPSByZXN1bHQuaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcub25DbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiAnanVyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiByZXN1bHQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5JyAmJiBqdWRnZWFibGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJHJvb3RTY29wZS5hY3RpdmVSb2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGVuZGluZ0p1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdKdWRnZWFibGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoY29udGVzdGluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlc3RpbmcubGVuZ3RoID4gMCAmJiAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygkcm9vdFNjb3BlLmFjdGl2ZVJvbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwZW5kaW5nQ29udGVzdGluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdDb250ZXN0aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBzd2l0Y2gocm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnanVyeSc6XG4gICAgICAgICAgICAgICAgICAgIEVudHJ5Lmp1ZGdlRW50cmllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBqdWRnZUlkOiAkcm9vdFNjb3BlLnVzZXIuaWRcbiAgICAgICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QuZW50cmllcyA9IGFuZ3VsYXIuY29weShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogJ2NyZWF0b3InfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdG9yID0gcm9sZXNbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEVudHJ5LmNvbnRlc3RhbnRFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9yLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QuZW50cmllcyA9IGFuZ3VsYXIuY29weShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RW50cnkgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSBlbnRyeTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5lbnRyaWVzLWxpc3QnKTtcblxuICAgICAgICAgICAgdmFyIGp1ZGdlSWQgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScpIHtcbiAgICAgICAgICAgICAgICBqdWRnZUlkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoanVkZ2VJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnZW50cmllcy8nKSArIGVudHJ5LmlkICsgJy9qdWRnZS8nICsganVkZ2VJZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nID0gcmVzdWx0LmRhdGEucmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBFbnRyeS5nZXQoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeUlkOiBlbnRyeS5pZFxuICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZ2FsbGVyeSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8yLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3BlbkxpZ2h0Ym94ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgdmFyIGFsbEZpbGVzID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5maWxlcztcbiAgICAgICAgICAgIHZhciBhbGxJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSAwO1xuXG4gICAgICAgICAgICBmb3IodmFyIGFGIGluIGFsbEZpbGVzKXtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGFsbEZpbGVzW2FGXTtcbiAgICAgICAgICAgICAgICBhbGxJbWFnZXMucHVzaChmaWxlLnVybCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsZS51cmwgPT09IGl0ZW0udXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGFGO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGlnaHRib3gub3Blbk1vZGFsKGFsbEltYWdlcywgY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uIChldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGVBZGRlZCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmxvd0ZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBmaWxlcyA6ICcgKyBtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgJGZpbGUucmVmX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuXG4gICAgICAgICAgICAvLyB2YXIgaXRlbXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcywge2lkOiBtZXNzYWdlLmZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YobWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5maWxlLmlkLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZW50cnlGaWxlUmVtb3ZlID0gZnVuY3Rpb24oZmlsZSwgJGZsb3cpIHtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IGZpbGUuaWR9KTtcbiAgICAgICAgICAgIC8vIHZhciBpdGVtID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZihpdGVtcykgIT09ICd1bmRlZmluZWQnICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBpdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLmluZGV4T2YoZmlsZS5yZWZfaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZpbGVzSW5kZXggPSAkZmxvdy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICAgICAgaWYgKGZpbGVzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSBmaWxlcyAuLi4gJyArIGZpbGVzSW5kZXgpO1xuICAgICAgICAgICAgICAgICRmbG93LmZpbGVzLnNwbGljZShmaWxlc0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJGZsb3cuZmlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNob3dBZGRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5lbnRyaWVzLWxpc3QnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb24gPSAnJztcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICRzY29wZS5jb250ZXN0LmVudHJpZXNbJHNjb3BlLmNvbnRlc3QuZW50cmllcy5sZW5ndGggLSAxXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXRFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWRGaWxlcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHRodW1ibmFpbF9pZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZmxvdy5maWxlcywgZnVuY3Rpb24oZmlsZSl7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRGaWxlc1tmaWxlLnJlZl9pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICdjYXB0aW9uJzogZmlsZS5yZWZfY2FwdGlvblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlcGFyZSB0byBhc3NpZ24gdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgIT09IC0xICYmIHRodW1ibmFpbF9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2hvb3BpZSBpdCBtYXRjaGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbF9pZCA9IGZpbGUucmVmX2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBuZXcgRW50cnkoKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5jcmVhdG9yX2lkID0gcm9sZS5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS5jb250ZXN0X2lkID0gJHNjb3BlLmNvbnRlc3QuaWQ7XG4gICAgICAgICAgICAgICAgZW50cnkudGh1bWJuYWlsX2lkID0gdGh1bWJuYWlsX2lkO1xuXG4gICAgICAgICAgICAgICAgZW50cnkubmFtZSA9ICRyb290U2NvcGUudXNlci5uYW1lICsgXCIncyBFbnRyeVwiO1xuICAgICAgICAgICAgICAgIGVudHJ5LmRlc2NyaXB0aW9uID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGVudHJ5LmF0dGFjaGVkX2ZpbGVzID0gYXR0YWNoZWRGaWxlcztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LnRodW1ibmFpbF9pZCk7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VudHJ5IFNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ0VudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkRW50cnkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2NyZWF0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRW50cnkuc2VuZE1lc3NhZ2Uoe2VudHJ5SWQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWR9LCBtZXNzYWdlUmVxdWVzdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5Lm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNhdmVNYXJrcyA9IGZ1bmN0aW9uKGVudHJ5UmF0aW5nSWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlZFJhdGluZyA9IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmRlc2lnbixcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5jcmVhdGl2aXR5LFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmluZHVzdHJpYWwsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5tYXJrZXQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmp1ZGdlX2lkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5lbnRyeV9pZCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZW50cnlSYXRpbmdJZCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgRW50cnlSYXRpbmcudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogZW50cnlSYXRpbmdJZFxuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZWRSYXRpbmcpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBzYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5UmF0aW5nID0gbmV3IEVudHJ5UmF0aW5nKHVwZGF0ZWRSYXRpbmcpO1xuICAgICAgICAgICAgICAgIGVudHJ5UmF0aW5nLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIGNyZWF0ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnanVyeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTaG93IE5EQVxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0SnVkZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ3VzZXJzL2JlY29tZUp1ZGdlJyksIHtjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdC5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUNvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gU2hvdyBOREFcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0Q29udGVzdGFudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCd1c2Vycy9iZWNvbWVDb250ZXN0YW50JyksIHtjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdC5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhU3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkdGltZW91dCwgJGZpbHRlciwgRmRTY3JvbGxlciwgQVBJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGUgU3RhcnRlZCcpO1xuICAgICAgICAkcm9vdFNjb3BlLnNlY3Rpb25Mb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQXZhaWxhYmxlIFZpZXdzIDogTGlzdCwgQ3JlYXRlXG4gICAgICAgICRzY29wZS52aWV3ID0gJ2xpc3QnO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Byb2plY3RMb2FkaW5nOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUucHJvamVjdCA9IG51bGw7XG5cbiAgICAgICAgJHNjb3BlLnN0ZXBzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnWW91ciBQcm9qZWN0JyxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uZ29pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnYXBwLmNyZWF0ZS5kZXRhaWxzJyxcbiAgICAgICAgICAgICAgICBib2R5OiAnPGgzPkdyZWF0ITwvaDM+PHA+PGRmbj5Zb3UgaGF2ZSBiZWVuIGNvbXBsZXRlZCBhIHZlcnkgaW1wb3J0YW50IHN0ZXAsIHdlIHdpbGwgbm93IGJlIGFibGUgdG8gY29tbXVuaWNhdGUgZWZmaWNpZW50bHkuPC9kZm4+PC9wPjxwPjxkZm4+WW91ciBncmVhdCBpZGVhIHdpbGwgYmUgdW5kZXIgdGhlIFRPWVMgJiBBTVVTRU1FTlRT4oCdIGNhdGVnb3J5LjwvZGZuPjwvcD48cD48ZGZuPkluIG9yZGVyIHRvIG1ha2UgeW91ciBwcm9qZWN0IGNvbWUgdHJ1ZSB3ZSB3aWxsIGdvIHRocm91Z2ggNCBzdGVwcy48L2Rmbj48L3A+PHA+PGRmbj5CZWZvcmVoYW5kLCBtYWtlIHN1cmUgdG8gcmVhZCBhbGwgdHV0b3JpYWxzICh3aXRoIGxpbmspIGFuZCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgdGhlIGNvbmNlcHQgb2YgRnVuZGF0b3IuPC9kZm4+PC9wPjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbWFyZ2luVDEwXCI+SSByZWFkIHRoZSB0dXRvcmlhbCBhbmQgZ3VpZGVsaW5lcy4gSSB3YW50IHRvIHN0YXJ0LjwvYT48L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01lZXQgeW91ciBTdXBlciBFeHBlcnQnLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25nb2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdhcHAuY3JlYXRlLnN1cGVyZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBib2R5OiAnPGgzPkV4cGVydGlzZSB5b3UgbmVlZDwvaDM+PHA+PGRmbj5Zb3UgaGF2ZSBiZWVuIGNvbXBsZXRlZCBhIHZlcnkgaW1wb3J0YW50IHN0ZXAsIHdlIHdpbGwgbm93IGJlIGFibGUgdG8gY29tbXVuaWNhdGUgZWZmaWNpZW50bHkuPC9kZm4+PC9wPjxwPjxkZm4+WW91ciBncmVhdCBpZGVhIHdpbGwgYmUgdW5kZXIgdGhlIFRPWVMgJiBBTVVTRU1FTlRT4oCdIGNhdGVnb3J5LjwvZGZuPjwvcD48cD48ZGZuPkluIG9yZGVyIHRvIG1ha2UgeW91ciBwcm9qZWN0IGNvbWUgdHJ1ZSB3ZSB3aWxsIGdvIHRocm91Z2ggNCBzdGVwcy48L2Rmbj48L3A+PHA+PGRmbj5CZWZvcmVoYW5kLCBtYWtlIHN1cmUgdG8gcmVhZCBhbGwgdHV0b3JpYWxzICh3aXRoIGxpbmspIGFuZCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgdGhlIGNvbmNlcHQgb2YgRnVuZGF0b3IuPC9kZm4+PC9wPjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbWFyZ2luVDEwXCI+SSByZWFkIHRoZSB0dXRvcmlhbCBhbmQgZ3VpZGVsaW5lcy4gSSB3YW50IHRvIHN0YXJ0LjwvYT48L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0V4cGVydGlzZSB5b3UgbmVlZCcsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmdvaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyxcbiAgICAgICAgICAgICAgICBib2R5OiAnPGgzPkV4cGVydGlzZSB5b3UgbmVlZDwvaDM+PHA+PGRmbj5Zb3UgaGF2ZSBiZWVuIGNvbXBsZXRlZCBhIHZlcnkgaW1wb3J0YW50IHN0ZXAsIHdlIHdpbGwgbm93IGJlIGFibGUgdG8gY29tbXVuaWNhdGUgZWZmaWNpZW50bHkuPC9kZm4+PC9wPjxwPjxkZm4+WW91ciBncmVhdCBpZGVhIHdpbGwgYmUgdW5kZXIgdGhlIFRPWVMgJiBBTVVTRU1FTlRT4oCdIGNhdGVnb3J5LjwvZGZuPjwvcD48cD48ZGZuPkluIG9yZGVyIHRvIG1ha2UgeW91ciBwcm9qZWN0IGNvbWUgdHJ1ZSB3ZSB3aWxsIGdvIHRocm91Z2ggNCBzdGVwcy48L2Rmbj48L3A+PHA+PGRmbj5CZWZvcmVoYW5kLCBtYWtlIHN1cmUgdG8gcmVhZCBhbGwgdHV0b3JpYWxzICh3aXRoIGxpbmspIGFuZCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgdGhlIGNvbmNlcHQgb2YgRnVuZGF0b3IuPC9kZm4+PC9wPjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbWFyZ2luVDEwXCI+SSByZWFkIHRoZSB0dXRvcmlhbCBhbmQgZ3VpZGVsaW5lcy4gSSB3YW50IHRvIHN0YXJ0LjwvYT48L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0V4cGVydHMgb24geW91ciB0ZWFtJyxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uZ29pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnYXBwLmNyZWF0ZS5leHBlcnRzJyxcbiAgICAgICAgICAgICAgICBib2R5OiAnPGgzPkV4cGVydHMgb24geW91ciB0ZWFtPC9oMz48cD48ZGZuPllvdSBoYXZlIGJlZW4gY29tcGxldGVkIGEgdmVyeSBpbXBvcnRhbnQgc3RlcCwgd2Ugd2lsbCBub3cgYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBlZmZpY2llbnRseS48L2Rmbj48L3A+PHA+PGRmbj5Zb3VyIGdyZWF0IGlkZWEgd2lsbCBiZSB1bmRlciB0aGUgVE9ZUyAmIEFNVVNFTUVOVFPigJ0gY2F0ZWdvcnkuPC9kZm4+PC9wPjxwPjxkZm4+SW4gb3JkZXIgdG8gbWFrZSB5b3VyIHByb2plY3QgY29tZSB0cnVlIHdlIHdpbGwgZ28gdGhyb3VnaCA0IHN0ZXBzLjwvZGZuPjwvcD48cD48ZGZuPkJlZm9yZWhhbmQsIG1ha2Ugc3VyZSB0byByZWFkIGFsbCB0dXRvcmlhbHMgKHdpdGggbGluaykgYW5kIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB0aGUgY29uY2VwdCBvZiBGdW5kYXRvci48L2Rmbj48L3A+PHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4taW5mbyBtYXJnaW5UMTBcIj5JIHJlYWQgdGhlIHR1dG9yaWFsIGFuZCBndWlkZWxpbmVzLiBJIHdhbnQgdG8gc3RhcnQuPC9hPjwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnVmFsaWRhdGUgdGhlIGJ1ZGdldCcsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmdvaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2FwcC5jcmVhdGUuYnVkZ2V0JyxcbiAgICAgICAgICAgICAgICBib2R5OiAnPGgzPlZhbGlkYXRlIHRoZSBidWRnZXQ8L2gzPjxwPjxkZm4+WW91IGhhdmUgYmVlbiBjb21wbGV0ZWQgYSB2ZXJ5IGltcG9ydGFudCBzdGVwLCB3ZSB3aWxsIG5vdyBiZSBhYmxlIHRvIGNvbW11bmljYXRlIGVmZmljaWVudGx5LjwvZGZuPjwvcD48cD48ZGZuPllvdXIgZ3JlYXQgaWRlYSB3aWxsIGJlIHVuZGVyIHRoZSBUT1lTICYgQU1VU0VNRU5UU+KAnSBjYXRlZ29yeS48L2Rmbj48L3A+PHA+PGRmbj5JbiBvcmRlciB0byBtYWtlIHlvdXIgcHJvamVjdCBjb21lIHRydWUgd2Ugd2lsbCBnbyB0aHJvdWdoIDQgc3RlcHMuPC9kZm4+PC9wPjxwPjxkZm4+QmVmb3JlaGFuZCwgbWFrZSBzdXJlIHRvIHJlYWQgYWxsIHR1dG9yaWFscyAod2l0aCBsaW5rKSBhbmQgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHRoZSBjb25jZXB0IG9mIEZ1bmRhdG9yLjwvZGZuPjwvcD48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIG1hcmdpblQxMFwiPkkgcmVhZCB0aGUgdHV0b3JpYWwgYW5kIGd1aWRlbGluZXMuIEkgd2FudCB0byBzdGFydC48L2E+PC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdZb3VyIGludmVzdG9ycycsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmdvaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2FwcC5jcmVhdGUuaW52ZXN0b3JzJyxcbiAgICAgICAgICAgICAgICBib2R5OiAnPGgzPllvdXIgSW52ZXN0b3I8L2gzPjxwPjxkZm4+WW91IGhhdmUgYmVlbiBjb21wbGV0ZWQgYSB2ZXJ5IGltcG9ydGFudCBzdGVwLCB3ZSB3aWxsIG5vdyBiZSBhYmxlIHRvIGNvbW11bmljYXRlIGVmZmljaWVudGx5LjwvZGZuPjwvcD48cD48ZGZuPllvdXIgZ3JlYXQgaWRlYSB3aWxsIGJlIHVuZGVyIHRoZSBUT1lTICYgQU1VU0VNRU5UU+KAnSBjYXRlZ29yeS48L2Rmbj48L3A+PHA+PGRmbj5JbiBvcmRlciB0byBtYWtlIHlvdXIgcHJvamVjdCBjb21lIHRydWUgd2Ugd2lsbCBnbyB0aHJvdWdoIDQgc3RlcHMuPC9kZm4+PC9wPjxwPjxkZm4+QmVmb3JlaGFuZCwgbWFrZSBzdXJlIHRvIHJlYWQgYWxsIHR1dG9yaWFscyAod2l0aCBsaW5rKSBhbmQgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHRoZSBjb25jZXB0IG9mIEZ1bmRhdG9yLjwvZGZuPjwvcD48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIG1hcmdpblQxMFwiPkkgcmVhZCB0aGUgdHV0b3JpYWwgYW5kIGd1aWRlbGluZXMuIEkgd2FudCB0byBzdGFydC48L2E+PC9wPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdzdGVwcycsIGZ1bmN0aW9uKHN0ZXBzKXtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdGVwcywgZnVuY3Rpb24oc3RlcCl7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGVwLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJyNwcm9qZWN0U3RlcHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Quc3RhdGUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3Quc3RhdGUpO1xuICAgICAgICAgICAgdmFyIGZsb29yZWRTdGF0ZSA9IE1hdGguZmxvb3IoJHNjb3BlLnByb2plY3Quc3RhdGUpO1xuICAgICAgICAgICAgdmFyIHJlbWFpbmluZ1N0YXRlID0gJHNjb3BlLnByb2plY3Quc3RhdGUgLSBmbG9vcmVkU3RhdGU7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmxvb3JlZFN0YXRlOyBpKyspIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RlcHNbaV0ucHJvZ3Jlc3MgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkc2NvcGUuc3RlcHNbZmxvb3JlZFN0YXRlXS5vbmdvaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5zdGVwc1tmbG9vcmVkU3RhdGVdLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuc3RlcHNbZmxvb3JlZFN0YXRlXS5wcm9ncmVzcyA9IHJlbWFpbmluZ1N0YXRlO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgUHJvamVjdCA9ICRyZXNvdXJjZShBUEkucGF0aCgncHJvamVjdHMvOnByb2plY3RJZCcpLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkUm9sZSA9ICdjcmVhdG9yJztcbiAgICAgICAgdmFyIG1hdGNoaW5nUm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywgeyByb2xlOiByZXF1aXJlZFJvbGUgfSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZihtYXRjaGluZ1JvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgbWF0Y2hpbmdSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlID0gbWF0Y2hpbmdSb2xlc1swXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gcmVxdWlyZWRSb2xlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyZXF1aXJlZFJvbGUsIG1hdGNoaW5nUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcm9qZWN0SWQgPSBwYXJzZUludCgkc3RhdGVQYXJhbXMucHJvamVjdElkKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0SWQpID09PSAndW5kZWZpbmVkJyB8fCBpc05hTihwcm9qZWN0SWQpKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGxQcm9qZWN0cyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNOdW1iZXIocHJvamVjdElkKSAmJiBpc0Zpbml0ZShwcm9qZWN0SWQpKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC5nZXQoeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWtlIHVwIHlvdXIgbWluZCB5b3UgcGVpY2Ugb2Ygc2hpdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmhvbWUnKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdvVG9Qcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7IHByb2plY3RJZDogcHJvamVjdC5pZCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jcmVhdGVOZXdQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5uZXdQcm9qZWN0TG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoKS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmdvVG9Qcm9qZWN0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubmV3UHJvamVjdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb2plY3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnByb2plY3QpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRzY29wZS5wcm9qZWN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RJZDogJHNjb3BlLnByb2plY3QuaWRcbiAgICAgICAgICAgICAgICB9LCBwcm9qZWN0KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVEZXRhaWxzQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGZlYXR1cmVkSW1hZ2U6IHt9LFxuICAgICAgICAgICAgZGF0ZXBpY2tlcjoge1xuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgZ2VvZ3JhcGh5OiAnd2hlcmV2ZXInXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRldGFpbHMgPSBwcm9qZWN0O1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdCBzdGlsbCBsb2FkaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uKGV2ZW50LCAkZmxvdywgZmxvd0ZpbGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mZWF0dXJlZEltYWdlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnRodW1ibmFpbF9pZCA9IG1lc3NhZ2UuZmlsZS5pZDtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnRodW1ibmFpbCA9IG1lc3NhZ2UuZmlsZS5maWxlX3VybDtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hdHRhY2hlZEZpbGVzU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5wcm9qZWN0LmF0dGFjaGVkRmlsZXMuaW5kZXhPZihtZXNzYWdlLmZpbGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3QuYXR0YWNoZWRGaWxlcy5wdXNoKG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc3VibWl0RHJhZnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN0YXRlID0gMC45O1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcjcHJvamVjdFN0ZXBzJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVTRUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZVNFQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdzdXBlci1leHBlcnRzJykpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuc3VwZXJFeHBlcnRzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2hvb3NlU3VwZXJFeHBlcnQgPSBmdW5jdGlvbihzdXBlckV4cGVydCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3VwZXJfZXhwZXJ0X2lkID0gc3VwZXJFeHBlcnQuaWQ7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRpc2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUV4cGVydGlzZUN0cmwgU3RhcnRlZCcpO1xuICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXB4ZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLnNhdmluZ0V4cGVydGlzZSA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubG9hZGVkT25jZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBQcm9qZWN0RXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCcvcHJvamVjdHMvOnByb2plY3RJZC9leHBlcnRpc2UnKSwge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgUHJvamVjdEV4cGVydGlzZS5xdWVyeSh7cHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkZWRPbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zYXZlRXhwZXJ0aXNlID0gZnVuY3Rpb24oZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICRzY29wZS5zYXZpbmdFeHBlcnRpc2UgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgcHJvamVjdEV4cGVydGlzZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2V4cGVydGlzZV9pZCc6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZS5pZCxcbiAgICAgICAgICAgICAgICAndGFzayc6IGV4cGVydGlzZS5tYWluVGFzayxcbiAgICAgICAgICAgICAgICAnYnVkZ2V0JzogZXhwZXJ0aXNlLmJ1ZGdldCxcbiAgICAgICAgICAgICAgICAnbGVhZF90aW1lJzogZXhwZXJ0aXNlLmxlYWRUaW1lLFxuICAgICAgICAgICAgICAgICdzdGFydF9kYXRlJzogZXhwZXJ0aXNlLnN0YXJ0RGF0ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnL3Byb2plY3RzLycpICsgJHNjb3BlLnByb2plY3QuaWQgKyAnL2V4cGVydGlzZScsIHByb2plY3RFeHBlcnRpc2VEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdC5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2F2aW5nRXhwZXJ0aXNlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXB4ZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlRXhwZXJ0aXNlU2VsZWN0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN0YXRlID0gMztcbiAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hZGROZXdJbnB1dHRlZEV4cGVydGlzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dHRlZEV4cGVydGlzZSA9IHsgc2VsZWN0ZWRFeHBlcnRpc2U6ICdudWxsJywgb3RoZXJFeHBlcnRpc2U6IHsgc3RhdHVzOiAxIH0gfTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIDwgMyAmJiAobGFzdElucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsICYmIGxhc3RJbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnk6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpblRhc2s6ICcnLFxuICAgICAgICAgICAgICAgICAgICBidWRnZXQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBsZWFkVGltZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFcHhlcnRpc2UgPSAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZUNhdGVnb3J5LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5KGluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihlLCBpbmRleCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IGV4cGVydGlzZTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGUsIGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2Uuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJy9leHBlcnRpc2UtY2F0ZWdvcnkvMCcpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnL2V4cGVydGlzZS1jYXRlZ29yeS8nKSArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJy9leHBlcnRpc2UvY2F0ZWdvcnkvJykgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRXhwZXJ0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRodHRwLCBBUEksIFN3ZWV0QWxlcnQsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUV4cGVydEN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJy9wcm9qZWN0cy86cHJvamVjdElkL2V4cGVydGlzZScpLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLnF1ZXJ5KHtwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc2hvcnRsaXN0RXhwZXJ0ID0gZnVuY3Rpb24oZXhwZXJ0aXNlLCBiaWQpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihleHBlcnRpc2Uuc2hvcnRsaXN0KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBleHBlcnRpc2Uuc2hvcnRsaXN0ID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4cGVydGlzZS5zaG9ydGxpc3QucHVzaChiaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZVNob3J0bGlzdEV4cGVydCA9IGZ1bmN0aW9uKGV4cGVydGlzZSwgYmlkKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGV4cGVydGlzZS5zaG9ydGxpc3QuaW5kZXhPZihiaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZXhwZXJ0aXNlLnNob3J0bGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRpc2N1c3NFeHBlcnQgPSBmdW5jdGlvbihleHBlcnRpc2UsIGJpZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEJpZCA9IGJpZFxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydCA9IGZ1bmN0aW9uKGV4cGVydGlzZSwgYmlkKSB7XG4gICAgICAgICAgICBTd2VldEFsZXJ0LnN3YWwoe1xuICAgICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXG4gICAgICAgICAgICAgdGV4dDogJ1lvdSBhcmUgc2VsZWN0aW5nICcgKyBiaWQuZXhwZXJ0Lm5hbWUgKyAnIHRvIGNvbXBsZXRlIHlvdXIgdGFzay4nLFxuICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyNGOEM0ODYnLGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBnbyBhaGVhZCEnLFxuICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgICBjbG9zZU9uQ2FuY2VsOiBmYWxzZX0sXG4gICAgICAgICAgICAgZnVuY3Rpb24oaXNDb25maXJtKXtcbiAgICAgICAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICRodHRwLnB1dChBUEkucGF0aCgnL3Byb2plY3QtZXhwZXJ0aXNlLycgKyBleHBlcnRpc2UuaWQgKyAnL2JpZC8nICsgYmlkLmlkKSwge30pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZS5zZWxlY3RlZF9iaWQgPSBiaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3dlZXRBbGVydC5zd2FsKCdTZWxlY3RlZCEnLCAnWW91IGhhdmUgc2VsZWN0ZWQgdGhlIGV4cGVydC4nLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY29uZmlybUV4cGVydHMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSA1O1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlQnVkZ2V0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUJ1ZGdldEN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUludmVzdG9yc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVJbnZlc3RvcnNDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3QpID09PSAndW5kZWZpbmVkJyB8fCBwcm9qZWN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRmaWx0ZXIsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydCBTdGFydGVkJyk7XG4gICAgICAgICRzY29wZS5leHBlcnRpc2VTb3VyY2UgPSBudWxsO1xuICAgICAgICAkc2NvcGUuYXZhaWxhYmxlRXhwZXJ0aXNlID0gW107XG4gICAgICAgICRzY29wZS5tYXRjaGluZ0V4cGVydGlzZSA9IFtdO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgIHZhciBBdmFpbGFibGVFeHBlcnRpc2UgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ2V4cGVydGlzZS9hdmFpbGFibGUnKSk7XG5cbiAgICAgICAgdmFyIE1hdGNoaW5nRXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCdleHBlcnRpc2UvbWF0Y2hpbmcnKSwge30sIHtcbiAgICAgICAgXHRxdWVyeToge1xuICAgICAgICBcdFx0bWV0aG9kOiAnR0VUJyxcbiAgICAgICAgXHRcdGlzQXJyYXk6IGZhbHNlXG4gICAgICAgIFx0fVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVxdWlyZWRSb2xlID0gJ2V4cGVydCc7XG4gICAgICAgIHZhciBtYXRjaGluZ1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHsgcm9sZTogcmVxdWlyZWRSb2xlIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBhY2Nlc3MgPSBmYWxzZTtcblxuICAgICAgICBpZiAodHlwZW9mKG1hdGNoaW5nUm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiBtYXRjaGluZ1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ1JvbGUgPSBtYXRjaGluZ1JvbGVzWzBdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSByZXF1aXJlZFJvbGUpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJlcXVpcmVkUm9sZSwgbWF0Y2hpbmdSb2xlLmlkLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWNjZXNzKSB7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIFx0QXZhaWxhYmxlRXhwZXJ0aXNlLnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVFeHBlcnRpc2UgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVNvdXJjZSA9ICRzY29wZS5hdmFpbGFibGVFeHBlcnRpc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTWF0Y2hpbmdFeHBlcnRpc2UucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hdGNoaW5nRXhwZXJ0aXNlID0gcmVzdWx0LmV4cGVydGlzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0V4cGVydGlzZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydGlzZSBTdGFydGVkJyk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG4gICAgICAgICRzY29wZS5leHBlcnRpc2UgPSBudWxsO1xuXG4gICAgICAgIHZhciBQcm9qZWN0RXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCcvcHJvamVjdC1leHBlcnRpc2UvOmV4cGVydGlzZUlkJyksIHtcbiAgICAgICAgXHRleHBlcnRpc2VJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgUHJvamVjdEV4cGVydGlzZS5nZXQoe2V4cGVydGlzZUlkOiAkc3RhdGVQYXJhbXMuZXhwZXJ0aXNlSWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLmV4cGVydGlzZSA9IHJlc3VsdDtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zdWJtaXRCaWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYmlkTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBiaWREYXRhID0ge1xuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAkc2NvcGUuZGF0YS5iaWRfZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJy9wcm9qZWN0LWV4cGVydGlzZS8nKSArICRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZCArICcvYmlkJywgYmlkRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2UuYmlkID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYmlkTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlciwgQVBJKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZShBUEkucGF0aCgnL2NvbnRlc3RzLzpjb250ZXN0SWQnKSwge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSG9tZSBWaWV3IFN0YXJ0ZWQnKTtcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgIC8vICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAvLyAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgIC8vICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgIC8vICAgICAgXHRjb250ZXN0SWQ6ICdAaWQnXG4gICAvLyAgICAgIH0pO1xuXG4gICAvLyAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgLy8gICAgICBcdCRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgIC8vICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAvLyAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAvLyAgICAgIH0pO1xuXG4gICAvLyAgICAgIC8vIFF1ZXJ5IEV4cGVydGlzZVxuXG4gICAvLyAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgLy8gICAgICAgICAgJHNjb3BlLmV4cGVydGlzZXMgPSByZXN1bHQuZGF0YTtcbiAgIC8vICAgICAgfSwgMjAwMCk7XG5cbiAgIC8vICAgICAgJHNjb3BlLmludmVzdG9ycyA9IFtcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQWxhaW4gQW1vcmV0dGknLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcxLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIElwc2EgZXZlbmlldCBkZXNlcnVudCBhZCBwYXJpYXR1ciBwcmFlc2VudGl1bSwgaW5jaWR1bnQgbW9sZXN0aWFlIGJlYXRhZSBxdWFtIHF1YXNpIHJlaWNpZW5kaXMgbW9sbGl0aWEgYWNjdXNhbnRpdW0gdm9sdXB0YXRlIHF1YWVyYXQgc2VxdWkgb2ZmaWNpYSBhIGZhY2VyZSByZXBlbGxhdCBhZGlwaXNjaS4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQ2hhcmxlcyBkXFwnYW50ZXJyb2NoZXMnLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcyLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGVkaXRhIGRpZ25pc3NpbW9zIG5lbW8sIHNlcXVpIGRvbG9yaWJ1cyBhY2N1c2FudGl1bSwgb2JjYWVjYXRpIG5hdHVzIGl1cmUgcXVhbSBlc3NlIGV4IGxhYm9yZSBuZXF1ZSBjb25zZXF1YXR1ciB2b2x1cHRhdGUgaW4sIG5paGlsIGVhLCBjdW0gcmVjdXNhbmRhZSB1dC4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQ2hyaXN0b3BoZSBCcmlzc2lhdWQnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzMuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwbGljYWJvIGVuaW0gb2ZmaWNpYSBvcHRpbyBkb2xvcnVtIGhhcnVtLCBzb2x1dGEgY3VscGEgdW5kZSB2ZW5pYW0gbm9iaXMgZW9zLCBkdWNpbXVzIHF1b2QgcHJhZXNlbnRpdW0gdmVyaXRhdGlzIGF0cXVlIG5vbiBub3N0cnVtIGlwc2FtLiBOb3N0cnVtLCBldCEnfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnSmVhbi1CZXJuYXJkIEFudG9pbmUnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzQuanBlZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIFF1aWEgcmVjdXNhbmRhZSBhbGlxdWlkIHF1b3MgYXBlcmlhbSBtb2xlc3RpYWUgcXVpYnVzZGFtIHF1aSBlb3MgaXVyZSBzYWVwZSBvcHRpbyB2aXRhZSBmdWdpdCB1bmRlIG5hbSwgYXRxdWUgZXhjZXB0dXJpIGRlc2VydW50IGVzdCwgcmVwZWxsYXQgYWxpYXMuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ1hhdmllciBQYXVsaW4nLCBjb3VudHJ5OiAnVGFpd2FuJywgaW1hZ2U6ICc1LmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEl1cmUgaW52ZW50b3JlIG5lc2NpdW50IGlsbHVtLCBwYXJpYXR1ciBtb2xlc3RpYXMgZGlnbmlzc2ltb3MgaXBzYSBpc3RlIGVzdC4gU2VkLCBhc3N1bWVuZGEgZG9sb3J1bT8gQWIgYmxhbmRpdGlpcyBxdWFzaSwgdm9sdXB0YXRlcyBpc3RlIGl1c3RvIHZlcm8gZGVzZXJ1bnQgc3VudC4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnQ2luZHkgQ2h1bmcnLCBjb3VudHJ5OiAnSG9uZyBLb25nJywgaW1hZ2U6ICc2LmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEl1cmUgaW52ZW50b3JlIG5lc2NpdW50IGlsbHVtLCBwYXJpYXR1ciBtb2xlc3RpYXMgZGlnbmlzc2ltb3MgaXBzYSBpc3RlIGVzdC4gU2VkLCBhc3N1bWVuZGEgZG9sb3J1bT8gQWIgYmxhbmRpdGlpcyBxdWFzaSwgdm9sdXB0YXRlcyBpc3RlIGl1c3RvIHZlcm8gZGVzZXJ1bnQgc3VudC4nfVxuICAgLy8gICAgICBdO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ZsYXNoTm90aWNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMgPSB7fTtcblxuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5VmlldyA9IHtcbiAgICAgICAgXHRzaG93OiBmYWxzZSxcbiAgICAgICAgXHRjb250ZXN0SWQ6IDAsXG4gICAgICAgIFx0b25DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdGNvbnNvbGUubG9nKCdvbkNsaWNrJyk7XG4gICAgICAgIFx0XHQkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKCdqdXJ5JywgNSwgdHJ1ZSk7XG4gICAgICAgIFx0fVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSGVhZGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHVpYk1vZGFsKSB7XG5cbiAgICAgICAgJHNjb3BlLnRyaWdnZXJMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcdGNvbnNvbGUubG9nKCd0cmlnZ2VyIGxvZ2luIScpO1xuXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnbG9naW4tbW9kYWwnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR290IGNsb3NlIGZlZWRiYWNrIScpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCdNb2RhbCBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgXHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnbG9nZ2luZyBpbiBub3cgIScpO1xuICAgIFx0fVxuXG4gICAgXHQkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24oKXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ2F1dGggaW4gbm93ICEnKTtcbiAgICBcdH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgICAgIHZhciBieXRlU3RyaW5nO1xuICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuICAgICAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgICAgIHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgICAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTmF2aWdhdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICRsb2csICR0aW1lb3V0LCAkZmlsdGVyLCAkaHR0cCwgJHJlc291cmNlLCAkdWliTW9kYWwsIEZpbGVVcGxvYWRlciwgQ291bnRyeUNvZGVzLCBBUEkpIHtcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKEFQSS5wYXRoKCdza2lsbHMnKSkucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogQVBJLnBhdGgoJ2ZpbGVzJyksXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc01vZGU6ICd2aWV3JyxcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc1NhdmU6IC0xLFxuICAgICAgICAgICAgc29jaWFsQ29ubmVjdDoge1xuICAgICAgICAgICAgICAgIGZhY2Vib29rOiB7fSxcbiAgICAgICAgICAgICAgICBsaW5rZWRpbjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0d29GQToge31cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQSA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlci5jb250YWN0X251bWJlcl9jb3VudHJ5X2NvZGUpLFxuICAgICAgICAgICAgICAgIG51bWJlcjogYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlci5jb250YWN0X251bWJlciksXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb3VudHJ5Q29kZXMgPSBDb3VudHJ5Q29kZXMoKTtcblxuICAgICAgICAkc2NvcGUuc3RhcnRUd29GQVZlcmlmeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBjb3VudHJ5Q29kZSA9IDE7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGUuY29kZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZS5jb2RlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZlcmlmaWNhdGlvbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdmlhOiAnc21zJyxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2NvZGU6IHBhcnNlSW50KGNvdW50cnlDb2RlKSxcbiAgICAgICAgICAgICAgICBwaG9uZV9udW1iZXI6IHBhcnNlSW50KCRzY29wZS5kYXRhLnR3b0ZBLm51bWJlciksXG4gICAgICAgICAgICAgICAgbG9jYWxlOiAnZW4nXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCcvdmVyaWZpY2F0aW9uL3N0YXJ0JyksIHZlcmlmaWNhdGlvbkRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmNvZGVTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb21wbGV0ZVR3b0ZBVmVyZml5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGNvdW50cnlDb2RlID0gMTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZS5jb2RlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlLmNvZGU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmVyaWZpY2F0aW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2NvZGU6IHBhcnNlSW50KGNvdW50cnlDb2RlKSxcbiAgICAgICAgICAgICAgICBwaG9uZV9udW1iZXI6IHBhcnNlSW50KCRzY29wZS5kYXRhLnR3b0ZBLm51bWJlciksXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uX2NvZGU6IHBhcnNlSW50KCRzY29wZS5kYXRhLnR3b0ZBLnZlcmlmaWNhdGlvbkNvZGUpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCcvdmVyaWZpY2F0aW9uL2NoZWNrJyksIHZlcmlmaWNhdGlvbkRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmVyaWZpY2F0aW9uIGRhdGEnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5jb2RlU2VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS52ZXJpZnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnBob25lX3ZlcmlmaWVkID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zb2NpYWxDb25uZWN0ID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcHJvdmlkZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zb2NpYWxDb25uZWN0W3Byb3ZpZGVyXS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb3QgTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zb2NpYWxDb25uZWN0W3Byb3ZpZGVyXS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zb2NpYWxVbmxpbmsgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG51bGw7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBzd2l0Y2gocHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZhY2Vib29rJzogbWV0aG9kID0gJ3VubGlua0ZhY2Vib29rJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5rZWRpbic6IG1ldGhvZCA9ICd1bmxpbmtMaW5rZWRpbic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ2F1dGhlbnRpY2F0ZS8nKSArIG1ldGhvZCwge30pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSBudWxsO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9maWxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydjcmVhdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2ludmVzdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2p1ZGdpbmcnXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDA7XG5cbiAgICAgICAgICAgICRodHRwLnB1dChBUEkucGF0aCgndXNlcnMvJykgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzTW9kZSA9ICd2aWV3JztcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgdXNlciB0aHVtYm5haWxcbiAgICAgICAgJHNjb3BlLmNoYW5nZVRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL2FwcC9hcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyVGh1bWJuYWlsQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci50aHVtYm5haWwgPSBhbmd1bGFyLmNvcHkodGh1bWJuYWlsKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgdXNlciB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBTdGFydCB1cGxvYWRpbmcgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKHRodW1ibmFpbCkpO1xuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvZ291dFxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhY3R1YWxseSBsb2dnaW5nIG91dCEgLi4uJyk7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3B1bGF0ZSBzaWRlIG5hdmlnYXRpb25cbiAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCd1c2Vycy9zaWRlTmF2aWdhdGlvbkRhdGEnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2lkZU5hdmlnYXRpb25EYXRhID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLm9wZW5GdWxsTWVudSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdvVG9MaW5rID0gZnVuY3Rpb24ocGFnZSwgZGF0YSwgcm9sZSl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAwO1xuXG4gICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IHJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihyb2xlcykgIT09ICd1bmRlZmluZWQnICYmIHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocm9sZS5yb2xlLCByb2xlLmlkLCB0cnVlLCBwYWdlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1VzZXJUaHVtYm5haWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSl7XG4gICAgJHNjb3BlLnRodW1ibmFpbCA9IG51bGw7XG4gICAgJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwgPSBudWxsO1xuICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG5cbiAgICB2YXIgaGFuZGxlRmlsZVNlbGVjdCA9IGZ1bmN0aW9uKGV2dCwgZHJvcCkge1xuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgaWYgKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGltYWdlIHRvIGNyb3AnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS50aHVtYm5haWwgPSBldnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ292ZXIgZHJhZ2xlYXZlIGRyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnbGVhdmUnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2ZpbGVJbnB1dCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICB9KTtcbiAgICAkKGRvY3VtZW50KS5vbignZHJvcCcsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuc2V0VGh1bWJuYWlsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwpO1xuICAgIH1cblxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICB9XG4gIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0dyYWJTaGFyZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuTWF0aCA9IHdpbmRvdy5NYXRoO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcHJpbWFyeVNoYXJlTGlzdGluZzogbnVsbCxcbiAgICAgICAgICAgIHNob3dCaWROb3c6IGZhbHNlLFxuICAgICAgICAgICAgbXlCaWQ6IHtcbiAgICAgICAgICAgICAgICBiaWRfYW1vdW50OiAwLjcyLFxuICAgICAgICAgICAgICAgIG51bV9zaGFyZXM6IDEwLFxuICAgICAgICAgICAgICAgIHNhdmluZzogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBHZXQgYWxsIGxpc3RpbmdzXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQcmltYXJ5TGlzdGluZygpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3NoYXJlLWxpc3RpbmcnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFByaW1hcnlMaXN0aW5nKCk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1CaWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG15QmlkID0ge1xuICAgICAgICAgICAgICAgICdzaGFyZV9saXN0aW5nX2lkJzogJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZy5pZCxcbiAgICAgICAgICAgICAgICAnYmlkX2Ftb3VudCc6ICRzY29wZS5kYXRhLm15QmlkLmJpZF9hbW91bnQsXG4gICAgICAgICAgICAgICAgJ251bV9zaGFyZXMnOiAkc2NvcGUuZGF0YS5teUJpZC5udW1fc2hhcmVzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCdzaGFyZS1iaWRzJyksIG15QmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0JpZE5vdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTm90aWZpY2F0aW9uc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgRmROb3RpZmljYXRpb25zKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuXHQgICAgICAgIEZkTm90aWZpY2F0aW9ucy5nZXRMYXRlc3ROb3RpZmljYXRpb25zKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHQgICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcblx0ICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG5cdCAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cdCAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQYWdlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5wYWdlID0ge1xuICAgICAgICBcdHRpdGxlOiAnJyxcbiAgICAgICAgXHRjb250ZW50OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRodHRwLmdldChBUEkucGF0aCgncGFnZXMnKSArICRzdGF0ZVBhcmFtcy5zbHVnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcbiAgICAgICAgXHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdCRzY29wZS5wYWdlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXG5cdFx0XHRpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDQnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdsb2FkIDQwNCcpXG5cdFx0XHR9O1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdRdWlja1VwZGF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkTm90aWZpY2F0aW9ucywgQVBJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdxdWlja3VwZGF0ZScpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICBcdGVkaXRNb2RlOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBJbnZlc3RvciA9ICRyZXNvdXJjZShBUEkucGF0aCgnaW52ZXN0b3JzLzppbnZlc3RvcklkJyksIHtcbiAgICAgICAgICAgIGludmVzdG9ySWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVkaXRJbnZlc3RtZW50ID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICBcdCRzY29wZS5kYXRhLmVkaXRNb2RlID0gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubW9kaWZ5SW52ZXN0bWVudCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBpbnZlc3RvckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2ludmVzdG1lbnRfYnVkZ2V0JzogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQoZmFsc2UpO1xuXG4gICAgICAgICAgICBJbnZlc3Rvci51cGRhdGUoe1xuICAgICAgICAgICAgICAgIGludmVzdG9ySWQ6ICRyb290U2NvcGUudXNlci5pbnZlc3Rvci5pZFxuICAgICAgICAgICAgfSwgaW52ZXN0b3JEYXRhKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVHJhbnNhY3Rpb25DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKCdUcmFuc2FjdGlvbkN0cmwnKTtcbiAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgXHRGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICBcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgXHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICBcdH0sIDIwMDApO1xuXG4gICAgfSk7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
