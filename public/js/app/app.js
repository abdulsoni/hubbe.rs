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
        $authProvider.loginUrl = APIProvider.$get().path('authenticate');
        $authProvider.tokenPrefix = 'fundator';

        var redirectUriPath = window.location.protocol + '//' + window.location.hostname;

        $authProvider.linkedin({
        	clientId: '77zjxfbh2928re',
            url: APIProvider.$get().path('authenticate/linkedin'),
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: redirectUriPath + APIProvider.$get().path('authenticate/linkedin'),
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            display: 'self'
        });

        $authProvider.google({
            clientId: '1042247727091-dmqc55af7tl58h2rqv3pqnrmjjbb9733.apps.googleusercontent.com',
            url: APIProvider.$get().path('authenticate/google'),
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: redirectUriPath + APIProvider.$get().path('authenticate/google'),
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
            url: APIProvider.$get().path('authenticate/facebook'),
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: redirectUriPath + APIProvider.$get().path('authenticate/facebook'),
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
        var base = 'http://fundator.app/api/';
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
        var base = 'http://fundator.app/api/';
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

        $scope.inputtedExpertiseList = [];
        $scope.expertiseList = [];
        $scope.inputtedEpxertise = null;
        $scope.savingExpertise = false;

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
                // $state.go('app.create.expertise');
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

    angular.module('fundator.controllers').controller('ExpertCtrl', ["$rootScope", "$scope", "$state", "$resource", "$filter", "FdScroller", "API", function($rootScope, $scope, $state, $resource, $filter, FdScroller, API) {
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
                $state.go('app.home');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2FuaW1hdGUuanMiLCJjb25maWcvYXV0aC5qcyIsImNvbmZpZy9mbG93LmpzIiwiY29uZmlnL2h0dHAuanMiLCJjb25maWcvbGFkZGEuanMiLCJkaXJlY3RpdmVzL2NoYXJ0cy5qcyIsImRpcmVjdGl2ZXMvbG9hZGVyLmRpcmVjdGl2ZS5qcyIsImRpcmVjdGl2ZXMvbWVzc2VuZ2VyLmpzIiwiZGlyZWN0aXZlcy9taW5NYXguanMiLCJkaXJlY3RpdmVzL21pc2MuanMiLCJkaXJlY3RpdmVzL3Byb2ZpbGVGaWVsZC5qcyIsImZpbHRlcnMvc3RyaXBIdG1sLmpzIiwic2VydmljZXMvbm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvc2Nyb2xsZXIuc2VydmljZS5qcyIsInZhbHVlcy9jb3VudHJpZXMuanMiLCJ2YWx1ZXMvY291bnRyeUNvZGVzLmpzIiwidmFsdWVzL3NldHRpbmdzLmpzIiwiYXBwL2F1dGgvYXV0aC5qcyIsImFwcC9hdXRoL3JlZ2lzdGVyLmpzIiwiYXBwL2NvbnRlc3QvY29udGVzdC5qcyIsImFwcC9jcmVhdGUvY3JlYXRlLmpzIiwiYXBwL2V4cGVydC9leHBlcnQuanMiLCJhcHAvZm9vdGVyL2Zvb3Rlci5qcyIsImFwcC9oZWFkZXIvZmxhc2gtbm90aWNlLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuanMiLCJhcHAvaGVhZGVyL25hdmlnYXRpb24uanMiLCJhcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmpzIiwiYXBwL2hvbWUvaG9tZS5qcyIsImFwcC9pbnZlc3QvZ3JhYlNoYXJlLmpzIiwiYXBwL2ludmVzdC9pbnZlc3QuanMiLCJhcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmpzIiwiYXBwL3BhZ2UvcGFnZS5qcyIsImFwcC9xdWljay11cGRhdGUvcXVpY2stdXBkYXRlLmpzIiwiYXBwL3RyYW5zYWN0aW9uL3RyYW5zYWN0aW9uLmpz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Q0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFdBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxpQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLDBCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsd0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFB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QUFBLFdBQUE7WUFDQSxhQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7O1FBR0EsY0FBQSxTQUFBO1lBQ0EsVUFBQTtZQUNBLE1BQUE7WUFDQSxLQUFBLFlBQUEsT0FBQSxLQUFBO1lBQ0EsdUJBQUE7WUFDQSxhQUFBLGtCQUFBLFlBQUEsT0FBQSxLQUFBO1lBQ0EsbUJBQUEsQ0FBQSxXQUFBO1lBQ0EsT0FBQSxDQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7Ozs7OztBQ2pEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsOENBQUEsVUFBQSxxQkFBQSxZQUFBOztRQUVBLG9CQUFBLFdBQUE7U0FDQSxjQUFBO1lBQ0EsUUFBQSxZQUFBLE9BQUEsS0FBQTtZQUNBLGdCQUFBLENBQUEsS0FBQSxLQUFBOzs7Ozs7O0FDVEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFVBQUEsY0FBQTs7Ozs7O0FDSEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFNBQUEsZUFBQTs7UUFFQSxjQUFBLFVBQUE7WUFDQSxPQUFBO1lBQ0EsYUFBQTtZQUNBLGNBQUE7Ozs7Ozs7QUNSQSxDQUFBLFdBQUE7SUFDQTs7O0lBR0EsUUFBQSxPQUFBOztLQUVBLFVBQUEsV0FBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQSxNQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7O2dCQUVBLE9BQUEsUUFBQSxPQUFBO2dCQUNBLE9BQUEsU0FBQSxPQUFBOzs7Z0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQSxPQUFBO2dCQUNBLFNBQUEsS0FBQSxVQUFBLE9BQUEsT0FBQTs7Z0JBRUEsSUFBQSxXQUFBLENBQUE7b0JBQ0EsT0FBQTtv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O2dCQUNBLFFBQUEsSUFBQSxNQUFBLE9BQUE7O2dCQUVBLElBQUEsTUFBQTtvQkFDQSxpQkFBQSxNQUFBLE9BQUE7OztZQUdBLGFBQUEsV0FBQTtnQkFDQSxRQUFBLElBQUEsU0FBQSxPQUFBO2dCQUNBLGlCQUFBLE1BQUEsT0FBQTs7Ozs7O0FDaEZBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxRQUFBLDBCQUFBLFNBQUEsU0FBQTs7UUFFQSxPQUFBO1lBQ0EsT0FBQSxXQUFBO2dCQUNBLElBQUEsT0FBQSxFQUFBO2dCQUNBLEtBQUEsT0FBQSxRQUFBLENBQUEsV0FBQSxJQUFBLE9BQUE7O1lBRUEsV0FBQSxTQUFBLFlBQUE7YUFDQSxJQUFBLFdBQUEsRUFBQTthQUNBLFFBQUEsSUFBQTthQUNBLElBQUEsU0FBQSxTQUFBLEdBQUE7Y0FDQSxJQUFBLE1BQUEsU0FBQSxTQUFBLE1BQUE7O2NBRUEsSUFBQSxPQUFBLEVBQUE7aUJBQ0EsS0FBQSxPQUFBLFFBQUEsQ0FBQSxXQUFBLE1BQUEsT0FBQTs7Ozs7Ozs7O0FDakJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxNQUFBLGFBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDJCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsc0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLCtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsK0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwwQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsOENBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsbUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDRCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1DQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0RBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDZCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw0QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsa0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBOzs7OztBQ3RQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEscUJBQUEsTUFBQSxnQkFBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsS0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLEtBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNB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O29CQUNBLE9BQUEsZUFBQTs7aUJBRUE7Z0JBQ0EsT0FBQSxlQUFBOzs7Ozs7O0FDdE5BLENBQUEsV0FBQTtJQUNBOztJQUVBLFNBQUEsY0FBQSxTQUFBO1FBQ0EsUUFBQSxJQUFBOztRQUVBLElBQUE7UUFDQSxJQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsUUFBQSxhQUFBO1lBQ0EsYUFBQSxLQUFBLFFBQUEsTUFBQSxLQUFBOztZQUVBLGFBQUEsU0FBQSxRQUFBLE1BQUEsS0FBQTs7O1FBR0EsSUFBQSxhQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBOzs7UUFHQSxJQUFBLEtBQUEsSUFBQSxXQUFBLFdBQUE7UUFDQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsV0FBQSxRQUFBLEtBQUE7WUFDQSxHQUFBLEtBQUEsV0FBQSxXQUFBOzs7UUFHQSxPQUFBLElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBOzs7SUFHQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxXQUFBLFdBQUE7UUFDQSxPQUFBO1lBQ0EsT0FBQSxFQUFBLFNBQUE7WUFDQSxNQUFBLFNBQUEsT0FBQSxNQUFBLE1BQUE7Z0JBQ0EsUUFBQSxJQUFBLE1BQUE7O2dCQUVBLEdBQUEsTUFBQSxRQUFBO29CQUNBLEtBQUEsR0FBQTs7Ozs7OztJQU9BLFFBQUEsT0FBQSx3QkFBQSxXQUFBLDJLQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsT0FBQSxVQUFBLE9BQUEsV0FBQSxZQUFBLFNBQUEsY0FBQSxXQUFBLGNBQUEsS0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7O1FBR0EsT0FBQSxhQUFBO1lBQ0EsU0FBQTtZQUNBLFFBQUE7WUFDQSxVQUFBOzs7UUFHQSxPQUFBLGlCQUFBLFNBQUEsUUFBQTtZQUNBLFdBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7O1FBR0EsT0FBQSxZQUFBO1FBQ0EsT0FBQSxlQUFBOztRQUVBLFFBQUEsSUFBQTtRQUNBLFFBQUEsSUFBQSxPQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsUUFBQSxJQUFBLE9BQUE7O1FBRUEsT0FBQSxlQUFBO1lBQ0EsQ0FBQSxNQUFBLCtCQUFBLE9BQUE7WUFDQSxDQUFBLE1BQUEsOEJBQUEsT0FBQTs7O1FBR0EsT0FBQSxPQUFBO1lBQ0EsY0FBQTtZQUNBLFNBQUE7WUFDQSxlQUFBO1lBQ0Esa0JBQUE7WUFDQSxhQUFBO1lBQ0EsZUFBQTtnQkFDQSxNQUFBO2dCQUNBLFNBQUE7O1lBRUEsa0JBQUE7WUFDQSxPQUFBOzs7UUFHQSxJQUFBLFVBQUEsTUFBQTs7UUFFQSxXQUFBLFdBQUE7O1FBRUEsT0FBQSxhQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxPQUFBLFdBQUEsT0FBQSxLQUFBOzs7UUFHQSxPQUFBLGNBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxJQUFBLENBQUEsT0FBQSxLQUFBLGNBQUEsT0FBQSxLQUFBLGNBQUEsS0FBQTs7O1FBR0EsT0FBQSxzQkFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLEtBQUEsQ0FBQSxLQUFBLE9BQUEsS0FBQSxjQUFBLE9BQUEsS0FBQSxlQUFBLE1BQUE7OztRQUdBLE9BQUEsWUFBQTtRQUNBLE9BQUEsbUJBQUE7UUFDQSxPQUFBLFdBQUE7UUFDQSxPQUFBLGFBQUE7O1FBRUEsV0FBQSxPQUFBLFFBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLFVBQUEsYUFBQTtZQUNBLElBQUEsS0FBQSxjQUFBLEdBQUEsT0FBQSxHQUFBOztZQUVBLE9BQUEsS0FBQSxRQUFBLEtBQUE7V0FDQTs7UUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQTtZQUNBLElBQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7WUFHQSxJQUFBLElBQUEsY0FBQSxjQUFBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO21CQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsTUFBQTs7O1lBR0EsSUFBQSxTQUFBLElBQUE7O1lBRUEsSUFBQSxLQUFBLEtBQUEsUUFBQSxZQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLE9BQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUE7bUJBQ0E7Z0JBQ0EsT0FBQSxhQUFBOzs7WUFHQSxPQUFBLFdBQUEsS0FBQTs7WUFFQSxPQUFBLFNBQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsT0FBQSxTQUFBLFFBQUE7b0JBQ0EsUUFBQSxJQUFBLElBQUEsT0FBQTtvQkFDQSxPQUFBLFlBQUEsSUFBQSxPQUFBOzs7O1lBSUEsSUFBQSxNQUFBO2dCQUNBLE9BQUEsY0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGdDQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOzs7UUFHQSxFQUFBLFVBQUEsR0FBQSxhQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOztZQUVBLE9BQUEsT0FBQSxXQUFBO2dCQUNBLE9BQUEsV0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1lBQ0EsTUFBQTtZQUNBLE1BQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7O1FBSUEsRUFBQSxVQUFBLEdBQUEsVUFBQSxjQUFBLFNBQUEsR0FBQTtZQUNBLGlCQUFBLEdBQUE7OztRQUdBLEVBQUEsVUFBQSxHQUFBLFFBQUEsb0JBQUEsU0FBQSxHQUFBO1lBQ0EsaUJBQUEsR0FBQTs7O1FBR0EsT0FBQSxXQUFBLElBQUEsYUFBQTtZQUNBLEtBQUEsSUFBQSxLQUFBO1lBQ0EsbUJBQUE7OztRQUdBLE9BQUEsZUFBQSxVQUFBO1lBQ0EsSUFBQSxRQUFBLE9BQUEsS0FBQTs7WUFFQSxPQUFBLFNBQUEscUJBQUEsU0FBQSxNQUFBO2dCQUNBLEtBQUEsS0FBQSxPQUFBLGVBQUEsV0FBQSxLQUFBLEtBQUE7O2dCQUVBLEtBQUEsV0FBQTtnQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFFBQUE7Z0JBQ0EsS0FBQSxTQUFBLEtBQUEsQ0FBQSxTQUFBLFdBQUEsS0FBQTs7Z0JBRUEsT0FBQSxLQUFBLGVBQUE7OztZQUdBLE9BQUEsU0FBQSxnQkFBQSxTQUFBLFVBQUEsVUFBQSxRQUFBLFNBQUE7Z0JBQ0EsSUFBQSxPQUFBLFNBQUEsVUFBQSxhQUFBO29CQUNBLE9BQUEsS0FBQSxlQUFBO3FCQUNBO29CQUNBLE9BQUEsS0FBQSxhQUFBOzs7O1lBSUEsT0FBQSxTQUFBLFdBQUEsY0FBQTtZQUNBLE9BQUEsU0FBQTs7Ozs7O1FBTUEsT0FBQSxZQUFBLFVBQUEsY0FBQTs7UUFFQSxPQUFBLHdCQUFBOztRQUVBLFNBQUEseUJBQUE7WUFDQSxJQUFBLHdCQUFBLENBQUEsbUJBQUEsUUFBQSxnQkFBQSxDQUFBLFFBQUE7O1lBRUEsSUFBQSxPQUFBLHNCQUFBLFNBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsc0JBQUEsUUFBQTs7OztZQUlBLFFBQUEsSUFBQSxPQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLElBQUEsT0FBQSxzQkFBQSxTQUFBLE1BQUEsc0JBQUEsc0JBQUEsUUFBQSxzQkFBQSxlQUFBLFdBQUEsSUFBQTtnQkFDQSxPQUFBLHNCQUFBLEtBQUE7b0JBQ0EsdUJBQUE7b0JBQ0EsMEJBQUE7b0JBQ0EsZUFBQTtvQkFDQSxZQUFBO29CQUNBLDJCQUFBO29CQUNBLHdCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7b0JBQ0EsOEJBQUE7b0JBQ0EsMkJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtvQkFDQSxtQkFBQTtvQkFDQSxnQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO29CQUNBLGdCQUFBO29CQUNBLGFBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtvQkFDQSxNQUFBO29CQUNBLFNBQUE7O2FBRUE7O1lBRUEsT0FBQSx1QkFBQSxPQUFBLHNCQUFBLFNBQUE7OztRQUdBLE9BQUEsMEJBQUEsU0FBQSxPQUFBLG1CQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSwwQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSxtQkFBQTs7OztRQUlBLE9BQUEsNEJBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLDZCQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLHVCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsMEJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7OztRQUlBLE9BQUEsK0JBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7OztRQUlBLE9BQUEsa0JBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0EsT0FBQSxnQkFBQTtZQUNBOzs7UUFHQSxPQUFBLG9CQUFBLFNBQUEsR0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO1lBQ0EsRUFBQSxnQkFBQTs7O1FBR0EsT0FBQSxxQkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxlQUFB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QUEsS0FBQSxjQUFBLFVBQUE7d0JBQ0E7d0JBQ0E7d0JBQ0E7OztvQkFHQSxTQUFBLFVBQUE7d0JBQ0EsRUFBQSxZQUFBLFFBQUEsQ0FBQSxXQUFBO3VCQUNBOzs7Ozs7UUFNQSxPQUFBLGVBQUEsU0FBQSxNQUFBO1lBQ0EsSUFBQSxXQUFBLE9BQUEsS0FBQSxjQUFBO1lBQ0EsSUFBQSxZQUFBO1lBQ0EsSUFBQSxlQUFBOztZQUVBLElBQUEsSUFBQSxNQUFBLFNBQUE7Z0JBQ0EsSUFBQSxPQUFBLFNBQUE7Z0JBQ0EsVUFBQSxLQUFBLEtBQUE7O2dCQUVBLElBQUEsS0FBQSxRQUFBLEtBQUEsS0FBQTtvQkFDQSxlQUFBOzs7O1lBSUEsU0FBQSxVQUFBLFdBQUE7OztRQUdBLE9BQUEsSUFBQSxtQkFBQSxVQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTs7O1FBR0EsT0FBQSxtQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsUUFBQSxJQUFBLG9CQUFBLFFBQUEsS0FBQTtZQUNBLE1BQUEsU0FBQSxRQUFBLEtBQUE7Ozs7Ozs7OztZQVNBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxLQUFBLGFBQUEsY0FBQSxLQUFBO29CQUNBLElBQUEsUUFBQSxLQUFBO29CQUNBLFNBQUE7Ozs7OztRQU1BLE9BQUEsa0JBQUEsU0FBQSxNQUFBLE9BQUE7Ozs7Ozs7O1lBUUEsSUFBQSxRQUFBLE9BQUEsS0FBQSxhQUFBLGNBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLE9BQUE7OztZQUdBLElBQUEsYUFBQSxNQUFBLE1BQUEsUUFBQTtZQUNBLElBQUEsZUFBQSxDQUFBLEdBQUE7Z0JB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QSwwSEFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsV0FBQSxVQUFBLFNBQUEsWUFBQSxLQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsV0FBQSxpQkFBQTtRQUNBLFdBQUEsc0JBQUE7OztRQUdBLE9BQUEsT0FBQTtRQUNBLE9BQUEsT0FBQTtZQUNBLG1CQUFBOztRQUVBLE9BQUEsVUFBQTs7UUFFQSxPQUFBLFFBQUE7WUFDQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7OztRQUlBLE9BQUEsT0FBQSxTQUFBLFNBQUEsTUFBQTtZQUNBLFFBQUEsUUFBQSxPQUFBLFNBQUEsS0FBQTtnQkFDQSxJQUFBLEtBQUEsUUFBQTtvQkFDQSxPQUFBLEdBQUEsS0FBQTtvQkFDQSxXQUFBLFVBQUE7OztXQUdBOztRQUVBLE9BQUEsT0FBQSxXQUFBLFNBQUEsUUFBQTtZQUNBLElBQUEsT0FBQSxhQUFBLGVBQUEsWUFBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsUUFBQSxJQUFBLFFBQUE7WUFDQSxJQUFBLGVBQUEsS0FBQSxNQUFBLE9BQUEsUUFBQTtZQUNBLElBQUEsaUJBQUEsT0FBQSxRQUFB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QUFBLFVBQUEsVUFBQTs7OztRQUlBLE9BQUEsY0FBQSxVQUFBO1lBQ0EsSUFBQSxXQUFBLFFBQUEsS0FBQSxXQUFBO1lBQ0EsT0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBOztZQUVBLE9BQUEsS0FBQSxtQkFBQTs7WUFFQSxNQUFBLElBQUEsSUFBQSxLQUFBLFlBQUEsV0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxXQUFBOztvQkFFQSxPQUFBLEtBQUEsbUJBQUE7b0JBQ0EsT0FBQSxLQUFBLG1CQUFBOztvQkFFQSxTQUFBLFVBQUE7d0JBQ0EsT0FBQSxLQUFBLG1CQUFBLENBQUE7dUJBQ0E7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsU0FBQSxVQUFBO29CQUNBLE9BQUEsS0FBQSxtQkFBQSxDQUFBO21CQUNBOzs7OztRQUtBLE9BQUEsa0JBQUEsVUFBQTtZQUNBLElBQUEsZ0JBQUEsVUFBQSxLQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxZQUFBO2dCQUNBLE1BQUE7OztZQUdBLGNBQUEsT0FBQSxLQUFBLFVBQUEsV0FBQTtnQkFDQSxXQUFBLEtBQUEsWUFBQSxRQUFBLEtBQUE7O2dCQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7b0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7b0JBRUEsS0FBQSxXQUFBO29CQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtvQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOzs7Z0JBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7O2dCQUlBLE9BQUEsU0FBQSxXQUFBLGNBQUE7Z0JBQ0EsT0FBQSxTQUFBOztlQUVBLFlBQUE7Z0JBQ0EsS0FB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V0FBQTs7Ozs7QUN4QkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsNkdBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsaUJBQUEsS0FBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxPQUFBLE9BQUE7U0FDQSxVQUFBOzs7UUFHQSxJQUFBLFdBQUEsVUFBQSxJQUFBLEtBQUEsMEJBQUE7WUFDQSxZQUFBO1dBQ0E7WUFDQSxRQUFBO2dCQUNBLFFBQUE7Ozs7UUFJQSxPQUFBLGlCQUFBLFNBQUEsTUFBQTtTQUNBLE9BQUEsS0FBQSxXQUFBOzs7UUFHQSxPQUFBLG1CQUFBLFVBQUE7O1lBRUEsSUFBQSxlQUFBO2dCQUNBLHFCQUFBLFdBQUEsS0FBQSxTQUFBOzs7WUFHQSxPQUFBLGVBQUE7O1lBRUEsU0FBQSxPQUFBO2dCQUNBLFlBQUEsV0FBQSxLQUFBLFNBQUE7ZUFDQSxjQUFBLFNBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxPQUFBLE9BQUEsV0FBQSxhQUFBO29CQUNBLFFBQUEsSUFBQTs7Ozs7OztBQ2xDQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx5R0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLFlBQUE7O0tBRUEsUUFBQSxJQUFBO0tBQ0EsV0FBQSxXQUFBO0tBQ0EsV0FBQTs7S0FFQSxTQUFBLFVBQUE7TUFDQSxXQUFBLFdBQUE7UUFDQTs7OztLQUlBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGZ1bmRhdG9yID0gYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5maWx0ZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5zZXJ2aWNlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iucm91dGVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5jb25maWcnXG4gICAgICAgIF0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycsIFsndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJywgWyduZ1Jlc291cmNlJywgJ25nQ29va2llcycsICduZ0FuaW1hdGUnLCAndWkuYm9vdHN0cmFwJywgJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJywgJ2FuZ3VsYXJNb21lbnQnLCAnYW5ndWxhci1vd2wtY2Fyb3VzZWwnLCAnbmdJbWdDcm9wJywgJ2FuZ3VsYXJGaWxlVXBsb2FkJywgJ2Jvb3RzdHJhcExpZ2h0Ym94J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJywgWydvcmRpbmFsJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJywgWydkaWJhcmkuYW5ndWxhci1lbGxpcHNpcycsICdsb2NhbHl0aWNzLmRpcmVjdGl2ZXMnLCAndGV4dEFuZ3VsYXInLCAnZmxvdycsICdhbmd1bGFyLWxhZGRhJywgJ25nRmxhZycsICdvaXRvemVyby5uZ1N3ZWV0QWxlcnQnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSAjIGZvciB0aGUgbm9uIGh0bWw1IGJyb3dzZXJzXG4gICAgICAgIC8vICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKVxuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIHNlY29uZGFyeU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kYXJ5TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlOYW1lID0gdmlld05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAnLi92aWV3cy9hcHAvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHNlY29uZGFyeU5hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2NvbnRlc3RzJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnbmF2aWdhdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05hdmlnYXRpb25DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmbGFzaE5vdGljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICdmbGFzaC1ub3RpY2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGbGFzaE5vdGljZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdub3RpZmljYXRpb25zJywgJ25vdGlmaWNhdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOb3RpZmljYXRpb25zQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tVcGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUXVpY2tVcGRhdGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hdXRoJyxcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmxvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguc2lnbnVwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnc2lnbnVwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5mb3Jnb3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2ZvcmdvdCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdmb3Jnb3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnJlY292ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlY292ZXI/dG9rZW4mZW1haWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVjb3ZlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhSZWNvdmVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmNvbmZpcm0nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm0/Y29kZSZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdjb25maXJtJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbmZpcm1DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzczogJ2hvbWVwYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hvbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgLy8gICAgIHVybDogJy8nLFxuICAgICAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgLy8gICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICB2aWV3czoge1xuICAgICAgICAgICAgLy8gICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3RzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdHMvOmNvbnRlc3RJZC86Y29udGVzdE5hbWUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmV4cGVydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UvOmV4cGVydGlzZUlkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcsICdleHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmludmVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2ludmVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jcmVhdGU/cHJvamVjdElkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2RldGFpbHMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1kZXRhaWxzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRGV0YWlsc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLnN1cGVyZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zdXBlci1leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1zdXBlci1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVTRUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmV4cGVydGlzZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0aXNlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0aXNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRXhwZXJ0aXNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0cycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWV4cGVydHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5idWRnZXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2J1ZGdldCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWJ1ZGdldCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUJ1ZGdldEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmludmVzdG9ycycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0b3JzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtaW52ZXN0b3JzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlSW52ZXN0b3JzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC50cmFuc2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdUcmFuc2FjdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JhYnNoYXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ncmFiLWEtc2hhcmUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dyYWJTaGFyZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAucGFnZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvOnNsdWcnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3BhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIsICRmaWx0ZXIsICRjb29raWVzLCBGZE5vdGlmaWNhdGlvbnMsIEZkU2Nyb2xsZXIsIEFQSSkge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0ge25hbWU6ICdhcHAuY29udGVzdCd9O1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmNvbGxhcHNlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKCRyb290U2NvcGUuaXNOYXZTaG93biA+PSAwLjUpID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gMCA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAuNTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBVc2VyU2VydmljZSBpcyBhbiBleGFtcGxlIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgJHVybFJvdXRlcidzIGRlZmF1bHQgaGFuZGxlciBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZFxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB1c2VyIG9iamVjdCBhbmQgdGFza3NcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3VzZXI/dG9rZW49JykgKyAkYXV0aC5nZXRUb2tlbigpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRmROb3RpZmljYXRpb25zLmluaXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWduYWxSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVJvbGUgPSAkcm9vdFNjb3BlLnVzZXIucm9sZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoJGNvb2tpZXMuZ2V0KCdmZF9hY3RpdmVfcm9sZScpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUm9sZSA9ICRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IGFjdGl2ZVJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiByb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocm9sZS5yb2xlLCByb2xlLmlkLCAhJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKG9yaWduYWxSb2xlLnJvbGUsIG9yaWduYWxSb2xlLmlkLCAhJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIuc3luYygpO1xuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIubGlzdGVuKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmVlZExvZ2luID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUuZGF0YS5uZWVkTG9naW4pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0b1N0YXRlLmRhdGEubmVlZExvZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZWVkTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkLCBzdGF0ZSwgc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9IHJvbGU7XG4gICAgICAgICAgICAkY29va2llcy5wdXQoJ2ZkX2FjdGl2ZV9yb2xlJywgcm9sZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RhdGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gJHN0YXRlLmN1cnJlbnQubmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihzdGF0ZVBhcmFtcykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkc3RhdGUuY3VycmVudC5wYXJhbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyUm9sZVZpZXdzID0gW3tcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcCcsXG4gICAgICAgICAgICAgICAgdmlldzogJ3F1aWNrVXBkYXRlJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICBpbnZlc3RvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1pbnZlc3RvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygncXVpY2stdXBkYXRlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0JyxcbiAgICAgICAgICAgICAgICB2aWV3OiAnbWFpbkAnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdHMnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWp1cnknKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9IEFQSS5wYXRoKCdjcmVhdG9ycy8nKSArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzogbW9kZWwgPSBBUEkucGF0aCgnaW52ZXN0b3JzLycpICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldChtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcm9sZV0gPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFzIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuaGFzVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYW5pbWF0ZVByb3ZpZGVyKXtcbiAgICBcdCRhbmltYXRlUHJvdmlkZXIuY2xhc3NOYW1lRmlsdGVyKC9mZC1hbmltYXRlLyk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyLCBBUElQcm92aWRlcil7XG4gICAgICAgIC8vIFNhdGVsbGl6ZXIgY29uZmlndXJhdGlvbiB0aGF0IHNwZWNpZmllcyB3aGljaCBBUElcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cbiAgICAgICAgJGF1dGhQcm92aWRlci5sb2dpblVybCA9IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUnKTtcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUvbGlua2VkaW4nKSxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IHJlZGlyZWN0VXJpUGF0aCArIEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUvbGlua2VkaW4nKSxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ3N0YXRlJ10sXG4gICAgICAgICAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnc2VsZidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgICAgICAgICAgY2xpZW50SWQ6ICcxMDQyMjQ3NzI3MDkxLWRtcWM1NWFmN3RsNThoMnJxdjNwcW5ybWpqYmI5NzMzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAgICAgICAgIHVybDogQVBJUHJvdmlkZXIuJGdldCgpLnBhdGgoJ2F1dGhlbnRpY2F0ZS9nb29nbGUnKSxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyBBUElQcm92aWRlci4kZ2V0KCkucGF0aCgnYXV0aGVudGljYXRlL2dvb2dsZScpLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc2NvcGUnXSxcbiAgICAgICAgICAgIG9wdGlvbmFsVXJsUGFyYW1zOiBbJ2Rpc3BsYXknXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlUHJlZml4OiAnb3BlbmlkJyxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnOTAwNTMzMTIzMzk1OTIwJyxcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICB1cmw6IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUvZmFjZWJvb2snKSxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS92Mi41L2RpYWxvZy9vYXV0aCcsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgQVBJUHJvdmlkZXIuJGdldCgpLnBhdGgoJ2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycpLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnZGlzcGxheScsICdzY29wZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKGZsb3dGYWN0b3J5UHJvdmlkZXIsIEFQSVByb3ZpZGVyKXtcblxuICAgICAgICBmbG93RmFjdG9yeVByb3ZpZGVyLmRlZmF1bHRzID0ge1xuICAgICAgICBcdHVwbG9hZE1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdGFyZ2V0OiBBUElQcm92aWRlci4kZ2V0KCkucGF0aCgnZmlsZXMnKSxcbiAgICAgICAgICAgIHBlcm1hbmVudEVycm9yczpbNDA0LCA1MDAsIDUwMV1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcil7XG5cdFx0Ly8gJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLnBvc3RbJ0NvbnRlbnQtVHlwZSddID0gJ3RleHQvcGxhaW4nO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbihsYWRkYVByb3ZpZGVyKSB7XG5cbiAgICAgICAgbGFkZGFQcm92aWRlci5zZXRPcHRpb24oe1xuICAgICAgICAgICAgc3R5bGU6ICdleHBhbmQtcmlnaHQnLFxuICAgICAgICAgICAgc3Bpbm5lclNpemU6IDM1LFxuICAgICAgICAgICAgc3Bpbm5lckNvbG9yOiAnI2ZmZmZmZidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnZmRDaGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICc8Y2FudmFzIGlkPVwiZmRDaGFydFwiIHdpZHRoPVwie3t3aWR0aH19XCIgaGVpZ2h0PVwie3toZWlnaHR9fVwiPjwvY2FudmFzPicsXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUud2lkdGggPSAkYXR0cnMud2lkdGg7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhlaWdodCA9ICRhdHRycy5oZWlnaHQ7XG5cblxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLndpZHRoKCRhdHRycy53aWR0aCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuaGVpZ2h0KCRhdHRycy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBpZURhdGFBID0gW3tcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiMwMjc1M2ZcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUHVibGljXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5NixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzk0YzQ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzhjYmE0N1wiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGdW5kYXRvclwiXG4gICAgICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgICAgICB2YXIgbGluZURhdGFBID0ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBsYW5uZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzY1LCA2MCwgNTksIDYzLCA1OSwgNTgsIDYzLCA2NCwgNjUsIDY2LCA3MCwgNzldXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlJlYWxpemVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzkzQzY1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzkzQzY1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFsyOCwgMjIsIDE2LCAyMSwgMTcsIDIwLCAyNywgMjUsIDIzLCAzMiwgNDAsIDQ1XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmKCRhdHRycy5kYXRhID09PSAnQScpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gJGVsZW1lbnQuZmluZCgnY2FudmFzJylbMF0uZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmRDaGFydCA9IG5ldyBDaGFydChjdHgpLlBpZShwaWVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJwaWUtY2hhcnQtbGFiZWxzXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShwaWVEYXRhQSkuZWFjaChmdW5jdGlvbihpLCB0aGVfaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5waWUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJwaWUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcrdGhlX2l0ZW0uY29sb3IrJztcIj48L3NwYW4+ICcrdGhlX2l0ZW0udmFsdWUrJyUgJyt0aGVfaXRlbS5sYWJlbCsnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gJGVsZW1lbnQuZmluZCgnY2FudmFzJylbMF0uZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmRDaGFydCA9IG5ldyBDaGFydChjdHgpLkxpbmUobGluZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxzXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMwMDY4Mzc7XCI+PC9zcGFuPiBSZWFsaXplZDwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjOTNDNjU4O1wiPjwvc3Bhbj4gUGxhbm5lZDwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG5cdC5kaXJlY3RpdmUoJ2ZkTG9hZGVyJywgZnVuY3Rpb24oKSB7XG5cdCAgcmV0dXJuIHtcblx0ICBcdHNjb3BlOiB7XG5cdCAgXHRcdHZpZXdCb3g6ICdAJ1xuXHQgIFx0fSxcblx0ICAgIHJlc3RyaWN0OiAnRScsXG5cdCAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJmZC1sb2FkZXIgbGEtYmFsbC1wdWxzZVwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicsXG5cdCAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0ICAgIFx0JGVsZW1lbnQuYWRkQ2xhc3MoJGF0dHJzLmNsYXNzKTtcblx0ICAgIH1cblx0ICB9O1xuXHR9KTtcbn0pKCk7XG5cbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnZmRNZXNzZW5nZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcmVzb3VyY2UsICR0aW1lb3V0LCBBUEkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImNoYXRib3hcIiBuZy1pZj1cInRocmVhZElkXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGF0Um93XCIgbmctcmVwZWF0PVwibWVzc2FnZSBpbiBtZXNzYWdlc1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXQtdXNlclNlbmRib3hcIiBuZy1jbGFzcz1cIntcXCdjaGF0LXNlbmRcXCc6IHVzZXIuaWQgPT0gbWVzc2FnZS51c2VyLmlkLCBcXCdjaGF0LWNvbWVpblxcJzogdXNlci5pZCAhPSBtZXNzYWdlLnVzZXIuaWR9XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPnt7bWVzc2FnZS5ib2R5fX08L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhaHQtbGFiZWxcIiBuZy1jbGFzcz1cXCd7XCJ0ZXh0LXJpZ2h0XCI6IHVzZXIuaWQgPT0gbWVzc2FnZS51c2VyLmlkfVxcJz4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICd7e21lc3NhZ2UudXNlci5uYW1lfX0gPHNwYW4+e3ttZXNzYWdlLmNyZWF0ZWRfYXQgfCBhbURhdGVGb3JtYXQ6XCJNTU0gRG8gWVlZWVwifX06PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8cCBjbGFzcz1cIm5vLWhhdmUgbm8tbWFyZ2luXCIgbmctaWY9XCJtZXNzYWdlcy5sZW5ndGggPT09IDBcIj5UaGVyZSBhcmUgY3VycmVudGx5IG5vIG1lc3NhZ2VzLjwvcD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8Zm9ybSBjbGFzcz1cImNoYXRzZW5kZm9ybVwiIG5nLWlmPVwidGhyZWFkSWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBtZXNzYWdlIGhlcmUgLi4uXCIgbmctbW9kZWw9XCJkYXRhLm1lc3NhZ2VUb1NlbmRcIiBmZC1lbnRlcj1cInNlbmRNZXNzYWdlKClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gc2VuZGJ0blwiIG5nLWNsaWNrPVwic2VuZE1lc3NhZ2UoKVwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uXCI+U2VuZDwvc3Bhbj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZm9ybT4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgdGhyZWFkSWQ6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhID0ge307XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlciA9ICRyb290U2NvcGUudXNlcjtcblxuICAgICAgICAgICAgICAgIHZhciBNZXNzYWdlID0gJHJlc291cmNlKCcvYXBpL21lc3NhZ2VzLzp0aHJlYWRJZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyZWFkSWQ6ICdAaWQnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ3RocmVhZElkJywgZnVuY3Rpb24odGhyZWFkSWQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRocmVhZElkKSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhyZWFkSWQgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBNZXNzYWdlLmdldCh7dGhyZWFkSWQ6ICRzY29wZS50aHJlYWRJZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXRyaXZpbmcgdGhlIHRocmVhZCA6ICcgKyAkc2NvcGUudGhyZWFkSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRocmVhZF9pZCA9ICRzY29wZS50aHJlYWRJZDtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlID0gJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZDtcblxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICBcdHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCduZ01pbicsIGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHJlc3RyaWN0OiAnQScsXG4gICAgXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgXHRcdFx0c2NvcGUuJHdhdGNoKGF0dHIubmdNaW4sIGZ1bmN0aW9uICgpIHtcbiAgICBcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShjdHJsLiR2aWV3VmFsdWUpO1xuICAgIFx0XHRcdH0pO1xuICAgIFx0XHRcdHZhciBtaW5WYWxpZGF0b3IgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21pblZhbGlkYXRvcicpO1xuICAgIFx0XHRcdFx0dmFyIG1pbiA9IHNjb3BlLiRldmFsKGF0dHIubmdNaW4pIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1pbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlIDwgbWluKTtcbiAgICBcdFx0XHRcdGlmICghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPCBtaW4pIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgZmFsc2UpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuICAgIFx0XHRcdFx0fSBlbHNlIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgdHJ1ZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9O1xuXG4gICAgXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdH1cbiAgICBcdH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbmdNYXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHRyZXN0cmljdDogJ0EnLFxuICAgIFx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgIFx0XHRcdHNjb3BlLiR3YXRjaChhdHRyLm5nTWF4LCBmdW5jdGlvbiAoKSB7XG4gICAgXHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoY3RybC4kdmlld1ZhbHVlKTtcbiAgICBcdFx0XHR9KTtcbiAgICBcdFx0XHR2YXIgbWF4VmFsaWRhdG9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXhWYWxpZGF0b3InKTtcbiAgICBcdFx0XHRcdHZhciBtYXggPSBzY29wZS4kZXZhbChhdHRyLm5nTWF4KSB8fCBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWF4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPiBtYXgpO1xuICAgIFx0XHRcdFx0aWYgKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA+IG1heCkge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCBmYWxzZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG4gICAgXHRcdFx0XHR9IGVsc2Uge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCB0cnVlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH07XG5cbiAgICBcdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZmRFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLmZkRW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ251bWJlcnNPbmx5JywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsQ3RybCkge1xuXG4gICAgICAgICAgICAgbW9kZWxDdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24gKGlucHV0VmFsdWUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1lZElucHV0ID0gaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG5cbiAgICAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1lZElucHV0IT1pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRyYW5zZm9ybWVkSW5wdXQpO1xuICAgICAgICAgICAgICAgICBtb2RlbEN0cmwuJHJlbmRlcigpO1xuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZElucHV0O1xuICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkUHJvZmlsZUlucHV0JywgZnVuY3Rpb24oJGNvbXBpbGUsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGZvcm06ICdAJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnQCcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICdAJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0AnLFxuICAgICAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgICAgIGZhY2Vib29rVmFsdWU6ICc9JyxcbiAgICAgICAgICAgICAgICBsaW5rZWRpblZhbHVlOiAnPSdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgICRzY29wZS5mb3JtRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29uZGl0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzUHJpc3RpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS52YWxpZGF0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICRzY29wZS52YWxpZGF0aW9uTWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlcGxhY2VWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgICBcdCRzY29wZS5uZ01vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctbW9kZWw9XCJuZ01vZGVsXCI+JyxcbiAgICAgICAgICAgICAgICAgICAgJ3RleHRhcmVhJzogJzx0ZXh0YXJlYSBjbGFzcz1cInRleHRhcmVhIGZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgcm93cz1cIjZcIj48L3RleHRhcmVhPicsXG4gICAgICAgICAgICAgICAgICAgIC8vICdlbWFpbCc6ICc8aW5wdXQgbmFtZT1cInt7ZmllbGR9fVwiIHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LWxnXCIgbmctZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cInVwZGF0ZSgpXCI+ICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICdkcm9wZG93bic6ICc8ZGl2IGNsYXNzPVwic2VsZWN0LXdyYXBlciBmdWxsXCI+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tYXJyb3ctYm90dG9tXCI+PC9zcGFuPjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbGdcIiBuZy1vcHRpb25zPVwidmFsdWUudmFsdWUgYXMgdmFsdWUubmFtZSBmb3IgdmFsdWUgaW4gdmFsdWVzXCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctY2hhbmdlPVwidXBkYXRlKClcIj48L3NlbGVjdD48L2Rpdj4nLFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1skc2NvcGUudHlwZV07XG5cbiAgICAgICAgICAgICAgICB2YXIgc29jaWFsQWx0ZXJuYXRpdmUgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSAhPT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgIFx0c29jaWFsQWx0ZXJuYXRpdmUgPSAnPGRpdiBjbGFzcz1cInNvY2lhbC1hbHRlcm5hdGl2ZVwiPicgK1xuICAgICAgICAgICAgICAgIFx0JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWZhY2Vib29rXCIgdWliLXRvb2x0aXA9XCJ7e2ZhY2Vib29rVmFsdWV9fVwiIG5nLWNsYXNzPVwie1xcJ2NoZWNrZWRcXCc6IChuZ01vZGVsID09PSBmYWNlYm9va1ZhbHVlKSAmJiBuZ01vZGVsICE9PSBcXCdcXCd9XCIgbmctZGlzYWJsZWQ9XCIhZmFjZWJvb2tWYWx1ZVwiIG5nLWNsaWNrPVwicmVwbGFjZVZhbHVlKGZhY2Vib29rVmFsdWUpXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgIFx0JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWxpbmtlZGluMlwiIHVpYi10b29sdGlwPVwie3tsaW5rZWRpblZhbHVlfX1cIiBuZy1jbGFzcz1cIntcXCdjaGVja2VkXFwnOiAobmdNb2RlbCA9PT0gbGlua2VkaW5WYWx1ZSkgJiYgbmdNb2RlbCAhPT0gXFwnXFwnfVwiIG5nLWRpc2FibGVkPVwiIWxpbmtlZGluVmFsdWVcIiBuZy1jbGljaz1cInJlcGxhY2VWYWx1ZShsaW5rZWRpblZhbHVlKVwiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICBcdCc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9XG5cdCAgICAgICAgICAgICAgICAnPGRpdj4nICtcblx0ICAgICAgICAgICAgICAgICc8bGFiZWw+e3tsYWJlbH19OjwvbGFiZWw+JyArXG5cdCAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcblx0ICAgICAgICAgICAgICAgIFx0ZmllbGQgK1xuXHQgICAgICAgICAgICAgICAgXHRzb2NpYWxBbHRlcm5hdGl2ZSArXG5cdCAgICAgICAgICAgICAgICAnPC9kaXY+PC9kaXY+JztcblxuICAgICAgICAgICAgICAgICRlbGVtZW50Lmh0bWwoJGNvbXBpbGUodGVtcGxhdGUpKCRzY29wZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnKS5maWx0ZXIoJ3N0cmlwVGFncycsIGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZih0ZXh0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCksIFwiZ1wiKTtcblx0XHRcdFx0dGV4dCA9IFN0cmluZyh0ZXh0KS5yZXBsYWNlKHJlLCBcIiBcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mbmJzcDsvZ2ksJyAnKTtcblx0XHRcdH1cblxuXHQgICAgIFx0cmV0dXJuIHRleHQgPyBTdHJpbmcodGV4dCkucmVwbGFjZSgvPFtePl0rPi9nbSwgJycpIDogJyc7XG5cdCAgICB9O1xuXHQgIH1cblx0KTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignY2xlYW5IdG1sJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXlxceDAwLVxceDdGXS9nLCBcIlwiKTtcblx0XHRcdH1cblxuXHQgICAgIFx0cmV0dXJuIHRleHQ7XG5cdCAgICB9O1xuXHQgIH1cblx0KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5mYWN0b3J5KCdGZE5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcSwgJGludGVydmFsLCAkaHR0cCwgJHN0YXRlLCBBUEkpIHtcbiAgICAgICAgdmFyIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zOiBbXSxcbiAgICAgICAgICAgIHVucmVhZDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdXNoTm90aWZpY2F0aW9uID0gZnVuY3Rpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG5vdGlmaWNhdGlvbnMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdub3RpZmljYXRpb25zLycpICsgdXNlci5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uc0ludGVydmFsID0gJGludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsTm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXRlc3ROb3RpZmljYXRpb25zID0gYW5ndWxhci5jb3B5KGdsb2JhbE5vdGlmaWNhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zID0gbGF0ZXN0Tm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLnNsaWNlKDAsIDUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKG5vdGlmaWNhdGlvbnNJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQucmVzb2x2ZShsYXRlc3ROb3RpZmljYXRpb25zKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZE5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJLnBhdGgoJ25vdGlmaWNhdGlvbnMvJykgKyBub3RpZmljYXRpb25JZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBcdG5vdGlmaWNhdGlvbi5yZWFkID0gMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkQWxsTm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJLnBhdGgoJ25vdGlmaWNhdGlvbnMvdXNlci8nKSArICRyb290U2NvcGUudXNlci5pZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucy51bnJlYWQgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG5vdGlmaWNhdGlvblRyaWdnZXI6IGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoKGNhdGVnb3J5KXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAnZG93bmxvYWQubmV3JzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmRvd25sb2FkcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5wYWlyZWQnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQucGFydG5lci5kZXRhaWxzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdwYXJ0bmVyLnN0dWR5X3BlcmlvZHMnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQuY291cnNlcy5wZXJpb2RzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICd1c2VyLmNyZWF0ZWQnOiAkc3RhdGUuZ28oVGFza3NTZXJ2aWNlLm5leHRUYXNrKCkudmlldyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBnZXROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlLCBwdXNoKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AodHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHB1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmeUVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0b2FzdGVyLnBvcCgnZXJyb3InLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmRTY3JvbGxlcicsIGZ1bmN0aW9uKCR3aW5kb3cpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sICc1MDAnLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1NlY3Rpb246IGZ1bmN0aW9uKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIFx0dmFyICRzZWN0aW9uID0gJChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJHNlY3Rpb24pO1xuICAgICAgICAgICAgXHRpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXHRcdHZhciB0b3AgPSAkc2VjdGlvbi5vZmZzZXQoKS50b3AgLSA3MDtcblxuICAgICAgICAgICAgXHRcdHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIFx0Ym9keS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICBcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnZhbHVlKCdDb3VudHJpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQWZnaGFuaXN0YW5cIiwgXCJjb2RlXCI6IFwiQUZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCLDhWxhbmQgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJBWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFsYmFuaWFcIiwgXCJjb2RlXCI6IFwiQUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbGdlcmlhXCIsIFwiY29kZVwiOiBcIkRaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW1lcmljYW4gU2Ftb2FcIiwgXCJjb2RlXCI6IFwiQVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbmRvcnJBXCIsIFwiY29kZVwiOiBcIkFEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5nb2xhXCIsIFwiY29kZVwiOiBcIkFPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5ndWlsbGFcIiwgXCJjb2RlXCI6IFwiQUlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbnRhcmN0aWNhXCIsIFwiY29kZVwiOiBcIkFRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiLCBcImNvZGVcIjogXCJBR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFyZ2VudGluYVwiLCBcImNvZGVcIjogXCJBUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFybWVuaWFcIiwgXCJjb2RlXCI6IFwiQU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcnViYVwiLCBcImNvZGVcIjogXCJBV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkF1c3RyYWxpYVwiLCBcImNvZGVcIjogXCJBVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkF1c3RyaWFcIiwgXCJjb2RlXCI6IFwiQVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBemVyYmFpamFuXCIsIFwiY29kZVwiOiBcIkFaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFoYW1hc1wiLCBcImNvZGVcIjogXCJCU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhaHJhaW5cIiwgXCJjb2RlXCI6IFwiQkhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCYW5nbGFkZXNoXCIsIFwiY29kZVwiOiBcIkJEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFyYmFkb3NcIiwgXCJjb2RlXCI6IFwiQkJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZWxhcnVzXCIsIFwiY29kZVwiOiBcIkJZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVsZ2l1bVwiLCBcImNvZGVcIjogXCJCRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbGl6ZVwiLCBcImNvZGVcIjogXCJCWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbmluXCIsIFwiY29kZVwiOiBcIkJKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVybXVkYVwiLCBcImNvZGVcIjogXCJCTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJodXRhblwiLCBcImNvZGVcIjogXCJCVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJvbGl2aWFcIiwgXCJjb2RlXCI6IFwiQk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb3NuaWEgYW5kIEhlcnplZ292aW5hXCIsIFwiY29kZVwiOiBcIkJBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm90c3dhbmFcIiwgXCJjb2RlXCI6IFwiQldcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb3V2ZXQgSXNsYW5kXCIsIFwiY29kZVwiOiBcIkJWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnJhemlsXCIsIFwiY29kZVwiOiBcIkJSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnJ1bmVpIERhcnVzc2FsYW1cIiwgXCJjb2RlXCI6IFwiQk5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdWxnYXJpYVwiLCBcImNvZGVcIjogXCJCR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJ1cmtpbmEgRmFzb1wiLCBcImNvZGVcIjogXCJCRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJ1cnVuZGlcIiwgXCJjb2RlXCI6IFwiQklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYW1ib2RpYVwiLCBcImNvZGVcIjogXCJLSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhbWVyb29uXCIsIFwiY29kZVwiOiBcIkNNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FuYWRhXCIsIFwiY29kZVwiOiBcIkNBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FwZSBWZXJkZVwiLCBcImNvZGVcIjogXCJDVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNheW1hbiBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIktZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkNGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hhZFwiLCBcImNvZGVcIjogXCJURFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoaWxlXCIsIFwiY29kZVwiOiBcIkNMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hpbmFcIiwgXCJjb2RlXCI6IFwiQ05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDaHJpc3RtYXMgSXNsYW5kXCIsIFwiY29kZVwiOiBcIkNYXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29jb3MgKEtlZWxpbmcpIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQ0NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb2xvbWJpYVwiLCBcImNvZGVcIjogXCJDT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvbW9yb3NcIiwgXCJjb2RlXCI6IFwiS01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb25nb1wiLCBcImNvZGVcIjogXCJDR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvbmdvLCBUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGVcIiwgXCJjb2RlXCI6IFwiQ0RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb29rIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQ0tcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb3N0YSBSaWNhXCIsIFwiY29kZVwiOiBcIkNSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ290ZSBEXFxcIkl2b2lyZVwiLCBcImNvZGVcIjogXCJDSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNyb2F0aWFcIiwgXCJjb2RlXCI6IFwiSFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDdWJhXCIsIFwiY29kZVwiOiBcIkNVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3lwcnVzXCIsIFwiY29kZVwiOiBcIkNZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3plY2ggUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiQ1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEZW5tYXJrXCIsIFwiY29kZVwiOiBcIkRLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRGppYm91dGlcIiwgXCJjb2RlXCI6IFwiREpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEb21pbmljYVwiLCBcImNvZGVcIjogXCJETVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkRvbWluaWNhbiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJET1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVjdWFkb3JcIiwgXCJjb2RlXCI6IFwiRUNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFZ3lwdFwiLCBcImNvZGVcIjogXCJFR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVsIFNhbHZhZG9yXCIsIFwiY29kZVwiOiBcIlNWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXF1YXRvcmlhbCBHdWluZWFcIiwgXCJjb2RlXCI6IFwiR1FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFcml0cmVhXCIsIFwiY29kZVwiOiBcIkVSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXN0b25pYVwiLCBcImNvZGVcIjogXCJFRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkV0aGlvcGlhXCIsIFwiY29kZVwiOiBcIkVUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpXCIsIFwiY29kZVwiOiBcIkZLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmFyb2UgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJGT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZpamlcIiwgXCJjb2RlXCI6IFwiRkpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGaW5sYW5kXCIsIFwiY29kZVwiOiBcIkZJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJhbmNlXCIsIFwiY29kZVwiOiBcIkZSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJlbmNoIEd1aWFuYVwiLCBcImNvZGVcIjogXCJHRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyZW5jaCBQb2x5bmVzaWFcIiwgXCJjb2RlXCI6IFwiUEZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXNcIiwgXCJjb2RlXCI6IFwiVEZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHYWJvblwiLCBcImNvZGVcIjogXCJHQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdhbWJpYVwiLCBcImNvZGVcIjogXCJHTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdlb3JnaWFcIiwgXCJjb2RlXCI6IFwiR0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHZXJtYW55XCIsIFwiY29kZVwiOiBcIkRFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2hhbmFcIiwgXCJjb2RlXCI6IFwiR0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHaWJyYWx0YXJcIiwgXCJjb2RlXCI6IFwiR0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVlY2VcIiwgXCJjb2RlXCI6IFwiR1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVlbmxhbmRcIiwgXCJjb2RlXCI6IFwiR0xcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVuYWRhXCIsIFwiY29kZVwiOiBcIkdEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3VhZGVsb3VwZVwiLCBcImNvZGVcIjogXCJHUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1YW1cIiwgXCJjb2RlXCI6IFwiR1VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWF0ZW1hbGFcIiwgXCJjb2RlXCI6IFwiR1RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWVybnNleVwiLCBcImNvZGVcIjogXCJHR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1aW5lYVwiLCBcImNvZGVcIjogXCJHTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1aW5lYS1CaXNzYXVcIiwgXCJjb2RlXCI6IFwiR1dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdXlhbmFcIiwgXCJjb2RlXCI6IFwiR1lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIYWl0aVwiLCBcImNvZGVcIjogXCJIVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhlYXJkIElzbGFuZCBhbmQgTWNkb25hbGQgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJITVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpXCIsIFwiY29kZVwiOiBcIlZBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSG9uZHVyYXNcIiwgXCJjb2RlXCI6IFwiSE5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIb25nIEtvbmdcIiwgXCJjb2RlXCI6IFwiSEtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIdW5nYXJ5XCIsIFwiY29kZVwiOiBcIkhVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSWNlbGFuZFwiLCBcImNvZGVcIjogXCJJU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkluZGlhXCIsIFwiY29kZVwiOiBcIklOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSW5kb25lc2lhXCIsIFwiY29kZVwiOiBcIklEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBPZlwiLCBcImNvZGVcIjogXCJJUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklyYXFcIiwgXCJjb2RlXCI6IFwiSVFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJcmVsYW5kXCIsIFwiY29kZVwiOiBcIklFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXNsZSBvZiBNYW5cIiwgXCJjb2RlXCI6IFwiSU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJc3JhZWxcIiwgXCJjb2RlXCI6IFwiSUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJdGFseVwiLCBcImNvZGVcIjogXCJJVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkphbWFpY2FcIiwgXCJjb2RlXCI6IFwiSk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKYXBhblwiLCBcImNvZGVcIjogXCJKUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkplcnNleVwiLCBcImNvZGVcIjogXCJKRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkpvcmRhblwiLCBcImNvZGVcIjogXCJKT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkthemFraHN0YW5cIiwgXCJjb2RlXCI6IFwiS1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLZW55YVwiLCBcImNvZGVcIjogXCJLRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIktpcmliYXRpXCIsIFwiY29kZVwiOiBcIktJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS29yZWEsIERlbW9jcmF0aWMgUGVvcGxlXFxcIlMgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiS1BcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLb3JlYSwgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiS1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLdXdhaXRcIiwgXCJjb2RlXCI6IFwiS1dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLeXJneXpzdGFuXCIsIFwiY29kZVwiOiBcIktHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGFvIFBlb3BsZVxcXCJTIERlbW9jcmF0aWMgUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiTEFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMYXR2aWFcIiwgXCJjb2RlXCI6IFwiTFZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMZWJhbm9uXCIsIFwiY29kZVwiOiBcIkxCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGVzb3Rob1wiLCBcImNvZGVcIjogXCJMU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpYmVyaWFcIiwgXCJjb2RlXCI6IFwiTFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaWJ5YW4gQXJhYiBKYW1haGlyaXlhXCIsIFwiY29kZVwiOiBcIkxZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGllY2h0ZW5zdGVpblwiLCBcImNvZGVcIjogXCJMSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpdGh1YW5pYVwiLCBcImNvZGVcIjogXCJMVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkx1eGVtYm91cmdcIiwgXCJjb2RlXCI6IFwiTFVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWNhb1wiLCBcImNvZGVcIjogXCJNT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hY2Vkb25pYSwgVGhlIEZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJNS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hZGFnYXNjYXJcIiwgXCJjb2RlXCI6IFwiTUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxhd2lcIiwgXCJjb2RlXCI6IFwiTVdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxheXNpYVwiLCBcImNvZGVcIjogXCJNWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbGRpdmVzXCIsIFwiY29kZVwiOiBcIk1WXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsaVwiLCBcImNvZGVcIjogXCJNTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbHRhXCIsIFwiY29kZVwiOiBcIk1UXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFyc2hhbGwgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJNSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hcnRpbmlxdWVcIiwgXCJjb2RlXCI6IFwiTVFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYXVyaXRhbmlhXCIsIFwiY29kZVwiOiBcIk1SXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF1cml0aXVzXCIsIFwiY29kZVwiOiBcIk1VXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF5b3R0ZVwiLCBcImNvZGVcIjogXCJZVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1leGljb1wiLCBcImNvZGVcIjogXCJNWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2ZcIiwgXCJjb2RlXCI6IFwiRk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb2xkb3ZhLCBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJNRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbmFjb1wiLCBcImNvZGVcIjogXCJNQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbmdvbGlhXCIsIFwiY29kZVwiOiBcIk1OXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW9udHNlcnJhdFwiLCBcImNvZGVcIjogXCJNU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vcm9jY29cIiwgXCJjb2RlXCI6IFwiTUFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb3phbWJpcXVlXCIsIFwiY29kZVwiOiBcIk1aXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTXlhbm1hclwiLCBcImNvZGVcIjogXCJNTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5hbWliaWFcIiwgXCJjb2RlXCI6IFwiTkFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOYXVydVwiLCBcImNvZGVcIjogXCJOUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5lcGFsXCIsIFwiY29kZVwiOiBcIk5QXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV0aGVybGFuZHNcIiwgXCJjb2RlXCI6IFwiTkxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXRoZXJsYW5kcyBBbnRpbGxlc1wiLCBcImNvZGVcIjogXCJBTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5ldyBDYWxlZG9uaWFcIiwgXCJjb2RlXCI6IFwiTkNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXcgWmVhbGFuZFwiLCBcImNvZGVcIjogXCJOWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pY2FyYWd1YVwiLCBcImNvZGVcIjogXCJOSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pZ2VyXCIsIFwiY29kZVwiOiBcIk5FXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmlnZXJpYVwiLCBcImNvZGVcIjogXCJOR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pdWVcIiwgXCJjb2RlXCI6IFwiTlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3Jmb2xrIElzbGFuZFwiLCBcImNvZGVcIjogXCJORlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJNUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5vcndheVwiLCBcImNvZGVcIjogXCJOT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk9tYW5cIiwgXCJjb2RlXCI6IFwiT01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYWtpc3RhblwiLCBcImNvZGVcIjogXCJQS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbGF1XCIsIFwiY29kZVwiOiBcIlBXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFsZXN0aW5pYW4gVGVycml0b3J5LCBPY2N1cGllZFwiLCBcImNvZGVcIjogXCJQU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbmFtYVwiLCBcImNvZGVcIjogXCJQQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhcHVhIE5ldyBHdWluZWFcIiwgXCJjb2RlXCI6IFwiUEdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYXJhZ3VheVwiLCBcImNvZGVcIjogXCJQWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBlcnVcIiwgXCJjb2RlXCI6IFwiUEVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQaGlsaXBwaW5lc1wiLCBcImNvZGVcIjogXCJQSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBpdGNhaXJuXCIsIFwiY29kZVwiOiBcIlBOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUG9sYW5kXCIsIFwiY29kZVwiOiBcIlBMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUG9ydHVnYWxcIiwgXCJjb2RlXCI6IFwiUFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQdWVydG8gUmljb1wiLCBcImNvZGVcIjogXCJQUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlFhdGFyXCIsIFwiY29kZVwiOiBcIlFBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUmV1bmlvblwiLCBcImNvZGVcIjogXCJSRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlJvbWFuaWFcIiwgXCJjb2RlXCI6IFwiUk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSdXNzaWFuIEZlZGVyYXRpb25cIiwgXCJjb2RlXCI6IFwiUlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSV0FOREFcIiwgXCJjb2RlXCI6IFwiUldcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBIZWxlbmFcIiwgXCJjb2RlXCI6IFwiU0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBLaXR0cyBhbmQgTmV2aXNcIiwgXCJjb2RlXCI6IFwiS05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBMdWNpYVwiLCBcImNvZGVcIjogXCJMQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhaW50IFBpZXJyZSBhbmQgTWlxdWVsb25cIiwgXCJjb2RlXCI6IFwiUE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBWaW5jZW50IGFuZCB0aGUgR3JlbmFkaW5lc1wiLCBcImNvZGVcIjogXCJWQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbW9hXCIsIFwiY29kZVwiOiBcIldTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FuIE1hcmlub1wiLCBcImNvZGVcIjogXCJTTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiLCBcImNvZGVcIjogXCJTVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhdWRpIEFyYWJpYVwiLCBcImNvZGVcIjogXCJTQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNlbmVnYWxcIiwgXCJjb2RlXCI6IFwiU05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZXJiaWEgYW5kIE1vbnRlbmVncm9cIiwgXCJjb2RlXCI6IFwiQ1NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZXljaGVsbGVzXCIsIFwiY29kZVwiOiBcIlNDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2llcnJhIExlb25lXCIsIFwiY29kZVwiOiBcIlNMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2luZ2Fwb3JlXCIsIFwiY29kZVwiOiBcIlNHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2xvdmFraWFcIiwgXCJjb2RlXCI6IFwiU0tcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTbG92ZW5pYVwiLCBcImNvZGVcIjogXCJTSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNvbG9tb24gSXNsYW5kc1wiLCBcImNvZGVcIjogXCJTQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNvbWFsaWFcIiwgXCJjb2RlXCI6IFwiU09cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb3V0aCBBZnJpY2FcIiwgXCJjb2RlXCI6IFwiWkFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLCBcImNvZGVcIjogXCJHU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNwYWluXCIsIFwiY29kZVwiOiBcIkVTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3JpIExhbmthXCIsIFwiY29kZVwiOiBcIkxLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3VkYW5cIiwgXCJjb2RlXCI6IFwiU0RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTdXJpbmFtZVwiLCBcImNvZGVcIjogXCJTUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN2YWxiYXJkIGFuZCBKYW4gTWF5ZW5cIiwgXCJjb2RlXCI6IFwiU0pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2F6aWxhbmRcIiwgXCJjb2RlXCI6IFwiU1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2VkZW5cIiwgXCJjb2RlXCI6IFwiU0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2l0emVybGFuZFwiLCBcImNvZGVcIjogXCJDSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN5cmlhbiBBcmFiIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIlNZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYVwiLCBcImNvZGVcIjogXCJUV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRhamlraXN0YW5cIiwgXCJjb2RlXCI6IFwiVEpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIlRaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGhhaWxhbmRcIiwgXCJjb2RlXCI6IFwiVEhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUaW1vci1MZXN0ZVwiLCBcImNvZGVcIjogXCJUTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRvZ29cIiwgXCJjb2RlXCI6IFwiVEdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUb2tlbGF1XCIsIFwiY29kZVwiOiBcIlRLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVG9uZ2FcIiwgXCJjb2RlXCI6IFwiVE9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUcmluaWRhZCBhbmQgVG9iYWdvXCIsIFwiY29kZVwiOiBcIlRUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVHVuaXNpYVwiLCBcImNvZGVcIjogXCJUTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmtleVwiLCBcImNvZGVcIjogXCJUUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmttZW5pc3RhblwiLCBcImNvZGVcIjogXCJUTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmtzIGFuZCBDYWljb3MgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJUQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1dmFsdVwiLCBcImNvZGVcIjogXCJUVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVnYW5kYVwiLCBcImNvZGVcIjogXCJVR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVrcmFpbmVcIiwgXCJjb2RlXCI6IFwiVUFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiLCBcImNvZGVcIjogXCJBRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBLaW5nZG9tXCIsIFwiY29kZVwiOiBcIkdCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVW5pdGVkIFN0YXRlc1wiLCBcImNvZGVcIjogXCJVU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJVTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVydWd1YXlcIiwgXCJjb2RlXCI6IFwiVVlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVemJla2lzdGFuXCIsIFwiY29kZVwiOiBcIlVaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmFudWF0dVwiLCBcImNvZGVcIjogXCJWVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZlbmV6dWVsYVwiLCBcImNvZGVcIjogXCJWRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZpZXQgTmFtXCIsIFwiY29kZVwiOiBcIlZOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHMsIEJyaXRpc2hcIiwgXCJjb2RlXCI6IFwiVkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kcywgVS5TLlwiLCBcImNvZGVcIjogXCJWSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIldhbGxpcyBhbmQgRnV0dW5hXCIsIFwiY29kZVwiOiBcIldGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiV2VzdGVybiBTYWhhcmFcIiwgXCJjb2RlXCI6IFwiRUhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJZZW1lblwiLCBcImNvZGVcIjogXCJZRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlphbWJpYVwiLCBcImNvZGVcIjogXCJaTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlppbWJhYndlXCIsIFwiY29kZVwiOiBcIlpXXCIgfVxuICAgICAgICBdO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnZhbHVlKCdDb3VudHJ5Q29kZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgY29kZTogJzEnLCBjb3VudHJ5OiAnVVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxJywgY291bnRyeTogJ0NBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNycsIGNvdW50cnk6ICdSVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzcnLCBjb3VudHJ5OiAnS1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMCcsIGNvdW50cnk6ICdFRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzI3JywgY291bnRyeTogJ1pBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzAnLCBjb3VudHJ5OiAnR1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczMScsIGNvdW50cnk6ICdOTCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMyJywgY291bnRyeTogJ0JFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzMnLCBjb3VudHJ5OiAnRlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNCcsIGNvdW50cnk6ICdFUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzM2JywgY291bnRyeTogJ0hVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzknLCBjb3VudHJ5OiAnSVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MCcsIGNvdW50cnk6ICdSTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQxJywgY291bnRyeTogJ0NIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDMnLCBjb3VudHJ5OiAnQVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NCcsIGNvdW50cnk6ICdHQicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ1JywgY291bnRyeTogJ0RLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDYnLCBjb3VudHJ5OiAnU0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NycsIGNvdW50cnk6ICdOTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ3JywgY291bnRyeTogJ1NKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDgnLCBjb3VudHJ5OiAnUEwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0OScsIGNvdW50cnk6ICdERScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzUxJywgY291bnRyeTogJ1BFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTInLCBjb3VudHJ5OiAnTVgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MycsIGNvdW50cnk6ICdDVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU0JywgY291bnRyeTogJ0FSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTUnLCBjb3VudHJ5OiAnQlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NicsIGNvdW50cnk6ICdDTCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU3JywgY291bnRyeTogJ0NPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTgnLCBjb3VudHJ5OiAnVkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MCcsIGNvdW50cnk6ICdNWScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYxJywgY291bnRyeTogJ0FVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjEnLCBjb3VudHJ5OiAnQ0MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MScsIGNvdW50cnk6ICdDWCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYyJywgY291bnRyeTogJ0lEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjMnLCBjb3VudHJ5OiAnUEgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NCcsIGNvdW50cnk6ICdOWicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzY0JywgY291bnRyeTogJ1BOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjUnLCBjb3VudHJ5OiAnU0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NicsIGNvdW50cnk6ICdUSCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzgxJywgY291bnRyeTogJ0pQJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODInLCBjb3VudHJ5OiAnS1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NCcsIGNvdW50cnk6ICdWTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzg2JywgY291bnRyeTogJ0NOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTAnLCBjb3VudHJ5OiAnVFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5MScsIGNvdW50cnk6ICdJTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkyJywgY291bnRyeTogJ1BLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTMnLCBjb3VudHJ5OiAnQUYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NCcsIGNvdW50cnk6ICdMSycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzk1JywgY291bnRyeTogJ01NJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTgnLCBjb3VudHJ5OiAnSVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTEnLCBjb3VudHJ5OiAnU1MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTInLCBjb3VudHJ5OiAnTUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTInLCBjb3VudHJ5OiAnRUgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTMnLCBjb3VudHJ5OiAnRFonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTYnLCBjb3VudHJ5OiAnVE4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTgnLCBjb3VudHJ5OiAnTFknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjAnLCBjb3VudHJ5OiAnR00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjEnLCBjb3VudHJ5OiAnU04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjInLCBjb3VudHJ5OiAnTVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjMnLCBjb3VudHJ5OiAnTUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjQnLCBjb3VudHJ5OiAnR04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjUnLCBjb3VudHJ5OiAnQ0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjYnLCBjb3VudHJ5OiAnQkYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjcnLCBjb3VudHJ5OiAnTkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjgnLCBjb3VudHJ5OiAnVEcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjknLCBjb3VudHJ5OiAnQkonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzAnLCBjb3VudHJ5OiAnTVUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzEnLCBjb3VudHJ5OiAnTFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzInLCBjb3VudHJ5OiAnU0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzMnLCBjb3VudHJ5OiAnR0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzQnLCBjb3VudHJ5OiAnTkcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzUnLCBjb3VudHJ5OiAnVEQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzYnLCBjb3VudHJ5OiAnQ0YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzcnLCBjb3VudHJ5OiAnQ00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzgnLCBjb3VudHJ5OiAnQ1YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzknLCBjb3VudHJ5OiAnU1QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDAnLCBjb3VudHJ5OiAnR1EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDEnLCBjb3VudHJ5OiAnR0EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDInLCBjb3VudHJ5OiAnQ0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDMnLCBjb3VudHJ5OiAnQ0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDQnLCBjb3VudHJ5OiAnQU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDUnLCBjb3VudHJ5OiAnR1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDYnLCBjb3VudHJ5OiAnSU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDgnLCBjb3VudHJ5OiAnU0MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDknLCBjb3VudHJ5OiAnU0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTAnLCBjb3VudHJ5OiAnUlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTEnLCBjb3VudHJ5OiAnRVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTInLCBjb3VudHJ5OiAnU08nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTMnLCBjb3VudHJ5OiAnREonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTQnLCBjb3VudHJ5OiAnS0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTUnLCBjb3VudHJ5OiAnVFonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTYnLCBjb3VudHJ5OiAnVUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTcnLCBjb3VudHJ5OiAnQkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTgnLCBjb3VudHJ5OiAnTVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjAnLCBjb3VudHJ5OiAnWk0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjEnLCBjb3VudHJ5OiAnTUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjInLCBjb3VudHJ5OiAnWVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjInLCBjb3VudHJ5OiAnUkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjMnLCBjb3VudHJ5OiAnWlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjQnLCBjb3VudHJ5OiAnTkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjUnLCBjb3VudHJ5OiAnTVcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjYnLCBjb3VudHJ5OiAnTFMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjcnLCBjb3VudHJ5OiAnQlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjgnLCBjb3VudHJ5OiAnU1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjknLCBjb3VudHJ5OiAnS00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTAnLCBjb3VudHJ5OiAnU0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTEnLCBjb3VudHJ5OiAnRVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTcnLCBjb3VudHJ5OiAnQVcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTgnLCBjb3VudHJ5OiAnRk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTknLCBjb3VudHJ5OiAnR0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTAnLCBjb3VudHJ5OiAnR0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTEnLCBjb3VudHJ5OiAnUFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTInLCBjb3VudHJ5OiAnTFUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTMnLCBjb3VudHJ5OiAnSUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTQnLCBjb3VudHJ5OiAnSVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTUnLCBjb3VudHJ5OiAnQUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTYnLCBjb3VudHJ5OiAnTVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTcnLCBjb3VudHJ5OiAnQ1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTgnLCBjb3VudHJ5OiAnRkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTknLCBjb3VudHJ5OiAnQkcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzAnLCBjb3VudHJ5OiAnTFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzEnLCBjb3VudHJ5OiAnTFYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzInLCBjb3VudHJ5OiAnRUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzMnLCBjb3VudHJ5OiAnTUQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzQnLCBjb3VudHJ5OiAnQU0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzUnLCBjb3VudHJ5OiAnQlknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzYnLCBjb3VudHJ5OiAnQUQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzcnLCBjb3VudHJ5OiAnTUMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzgnLCBjb3VudHJ5OiAnU00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzknLCBjb3VudHJ5OiAnVkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODAnLCBjb3VudHJ5OiAnVUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODEnLCBjb3VudHJ5OiAnUlMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODInLCBjb3VudHJ5OiAnTUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODMnLCBjb3VudHJ5OiAnWEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODUnLCBjb3VudHJ5OiAnSFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODYnLCBjb3VudHJ5OiAnU0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODcnLCBjb3VudHJ5OiAnQkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODknLCBjb3VudHJ5OiAnTUsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjAnLCBjb3VudHJ5OiAnQ1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjEnLCBjb3VudHJ5OiAnU0snIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjMnLCBjb3VudHJ5OiAnTEknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDAnLCBjb3VudHJ5OiAnRksnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDEnLCBjb3VudHJ5OiAnQlonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDInLCBjb3VudHJ5OiAnR1QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDMnLCBjb3VudHJ5OiAnU1YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDQnLCBjb3VudHJ5OiAnSE4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDUnLCBjb3VudHJ5OiAnTkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDYnLCBjb3VudHJ5OiAnQ1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDcnLCBjb3VudHJ5OiAnUEEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDgnLCBjb3VudHJ5OiAnUE0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDknLCBjb3VudHJ5OiAnSFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTAnLCBjb3VudHJ5OiAnQkwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTAnLCBjb3VudHJ5OiAnTUYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTEnLCBjb3VudHJ5OiAnQk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTInLCBjb3VudHJ5OiAnR1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTMnLCBjb3VudHJ5OiAnRUMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTUnLCBjb3VudHJ5OiAnUFknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTcnLCBjb3VudHJ5OiAnU1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTgnLCBjb3VudHJ5OiAnVVknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTknLCBjb3VudHJ5OiAnQ1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTknLCBjb3VudHJ5OiAnQU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzAnLCBjb3VudHJ5OiAnVEwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzInLCBjb3VudHJ5OiAnQVEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzMnLCBjb3VudHJ5OiAnQk4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzQnLCBjb3VudHJ5OiAnTlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzUnLCBjb3VudHJ5OiAnUEcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzYnLCBjb3VudHJ5OiAnVE8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzcnLCBjb3VudHJ5OiAnU0InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzgnLCBjb3VudHJ5OiAnVlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzknLCBjb3VudHJ5OiAnRkonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODAnLCBjb3VudHJ5OiAnUFcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODEnLCBjb3VudHJ5OiAnV0YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODInLCBjb3VudHJ5OiAnQ0snIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODMnLCBjb3VudHJ5OiAnTlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODUnLCBjb3VudHJ5OiAnV1MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODYnLCBjb3VudHJ5OiAnS0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODcnLCBjb3VudHJ5OiAnTkMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODgnLCBjb3VudHJ5OiAnVFYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODknLCBjb3VudHJ5OiAnUEYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTAnLCBjb3VudHJ5OiAnVEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTEnLCBjb3VudHJ5OiAnRk0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTInLCBjb3VudHJ5OiAnTUgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTAnLCBjb3VudHJ5OiAnS1AnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTInLCBjb3VudHJ5OiAnSEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTMnLCBjb3VudHJ5OiAnTU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTUnLCBjb3VudHJ5OiAnS0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTYnLCBjb3VudHJ5OiAnTEEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4ODAnLCBjb3VudHJ5OiAnQkQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4ODYnLCBjb3VudHJ5OiAnVFcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjAnLCBjb3VudHJ5OiAnTVYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjEnLCBjb3VudHJ5OiAnTEInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjInLCBjb3VudHJ5OiAnSk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjMnLCBjb3VudHJ5OiAnU1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjQnLCBjb3VudHJ5OiAnSVEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjUnLCBjb3VudHJ5OiAnS1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjYnLCBjb3VudHJ5OiAnU0EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjcnLCBjb3VudHJ5OiAnWUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjgnLCBjb3VudHJ5OiAnT00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzAnLCBjb3VudHJ5OiAnUFMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzEnLCBjb3VudHJ5OiAnQUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzInLCBjb3VudHJ5OiAnSUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzMnLCBjb3VudHJ5OiAnQkgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzQnLCBjb3VudHJ5OiAnUUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzUnLCBjb3VudHJ5OiAnQlQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzYnLCBjb3VudHJ5OiAnTU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzcnLCBjb3VudHJ5OiAnTlAnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTInLCBjb3VudHJ5OiAnVEonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTMnLCBjb3VudHJ5OiAnVE0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTQnLCBjb3VudHJ5OiAnQVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTUnLCBjb3VudHJ5OiAnR0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTYnLCBjb3VudHJ5OiAnS0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTgnLCBjb3VudHJ5OiAnVVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI0MicsIGNvdW50cnk6ICdCUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjQ2JywgY291bnRyeTogJ0JCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNjQnLCBjb3VudHJ5OiAnQUknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI2OCcsIGNvdW50cnk6ICdBRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjg0JywgY291bnRyeTogJ1ZHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0zNDAnLCBjb3VudHJ5OiAnVkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTM0NScsIGNvdW50cnk6ICdLWScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNDQxJywgY291bnRyeTogJ0JNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS00NzMnLCBjb3VudHJ5OiAnR0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY0OScsIGNvdW50cnk6ICdUQycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjY0JywgY291bnRyeTogJ01TJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NzAnLCBjb3VudHJ5OiAnTVAnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY3MScsIGNvdW50cnk6ICdHVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjg0JywgY291bnRyeTogJ0FTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03MjEnLCBjb3VudHJ5OiAnU1gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTc1OCcsIGNvdW50cnk6ICdMQycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzY3JywgY291bnRyeTogJ0RNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03ODQnLCBjb3VudHJ5OiAnVkMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTkzOScsIGNvdW50cnk6ICdQUicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODQ5JywgY291bnRyeTogJ0RPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS04NjgnLCBjb3VudHJ5OiAnVFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg2OScsIGNvdW50cnk6ICdLTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODc2JywgY291bnRyeTogJ0pNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQtMTQ4MScsIGNvdW50cnk6ICdHRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ0LTE1MzQnLCBjb3VudHJ5OiAnSkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NC0xNjI0JywgY291bnRyeTogJ0lNJyB9XG4gICAgICAgIF07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnQVBJJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiYXNlID0gJ2h0dHA6Ly9mdW5kYXRvci5hcHAvYXBpLyc7XG4gICAgICAgIHZhciBwYXRoID0gJyc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgXHRwYXRoOiBmdW5jdGlvbihmdW5jLCB2ZXJzaW9uKSB7XG4gICAgICAgIFx0XHRpZiAodHlwZW9mKHZlcnNpb24pID09PSAndW5kZWZpbmVkJykgdmVyc2lvbiA9ICd2MSc7XG4gICAgICAgIFx0XHR2YXIgZGVsaW1pdGVyID0gZnVuYy5zdGFydHNXaXRoKCcvJykgPyAnJyA6ICcvJztcbiAgICAgICAgXHRcdHJldHVybiBwYXRoID0gYmFzZSArIHZlcnNpb24gKyBkZWxpbWl0ZXIgKyBmdW5jO1xuICAgICAgICBcdH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykucHJvdmlkZXIoJ0FQSVByb3ZpZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiYXNlID0gJ2h0dHA6Ly9mdW5kYXRvci5hcHAvYXBpLyc7XG4gICAgICAgIHZhciBwYXRoID0gJyc7XG5cbiAgICAgICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFx0cmV0dXJuIHtcbiAgICAgICAgXHRcdHBhdGg6IGZ1bmN0aW9uKGZ1bmMsIHZlcnNpb24pIHtcbiAgICAgICAgXHRcdFx0aWYgKHR5cGVvZih2ZXJzaW9uKSA9PT0gJ3VuZGVmaW5lZCcpIHZlcnNpb24gPSAndjEnO1xuICAgICAgICBcdFx0XHR2YXIgZGVsaW1pdGVyID0gZnVuYy5zdGFydHNXaXRoKCcvJykgPyAnJyA6ICcvJztcbiAgICAgICAgXHRcdFx0cmV0dXJuIHBhdGggPSBiYXNlICsgdmVyc2lvbiArIGRlbGltaXRlciArIGZ1bmM7XG4gICAgICAgIFx0XHR9XG4gICAgICAgIFx0fVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlciwgQVBJKXtcbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5ob21lJywge30pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAgICAgJHNjb3BlLnNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5kYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCdhdXRoZW50aWNhdGUvc2lnbnVwJyksIHVzZXJJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MgPT09IHRydWUgJiYgdHlwZW9mKHJlc3VsdC5kYXRhLm1lc3NhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSByZXN1bHQuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRhdXRoLmxvZ2luKGNyZWRlbnRpYWxzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhLnRva2VuKTtcblxuICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN0YXRlID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTdGF0ZVBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGFjdGl2ZVN0YXRlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGguc2lnbnVwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShwYXlsb2FkLnJvbGUsIHBheWxvYWQucm9sZV9pZCwgdHJ1ZSwgYWN0aXZlU3RhdGUsIGFjdGl2ZVN0YXRlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzVGV4dCA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdUaGUgZW1haWwgb3IgcGFzc3dvcmQgeW91IGVudGVyZWQgaXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVyci5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAgICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb3QgTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDb25maXJtQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsIEFQSSl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICBpZiAodHlwZW9mKCRzdGF0ZVBhcmFtcy5jb2RlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1hdGlvbl9jb2RlOiAkc3RhdGVQYXJhbXMuY29kZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHN0YXRlUGFyYW1zLmVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ2F1dGhlbnRpY2F0ZS9jb25maXJtJyksIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyb3IuZGF0YS5lcnJvcjtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhSZWNvdmVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsIEFQSSl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHJlY292ZXJ5RW1haWw6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmRfcmVwZWF0OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLnRva2VuKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZWNvdmVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5yZWNvdmVyeUVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCdhdXRoZW50aWNhdGUvZm9yZ290JyksIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSAnQSBwYXNzd29yZCByZXNldCBsaW5rIGhhcyBiZWVuIHNlbnQgdG8geW91ciBlbWFpbC4nO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJyc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAncmVjb3Zlcic7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuZXJyb3IgPT09ICdJbnZhbGlkIFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVjb3ZlcmluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgLy8gUmVzZXQgUGFzc3dvcmRcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5wYXNzd29yZC5sZW5ndGggPj0gNikge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5wYXNzd29yZCA9PT0gJHNjb3BlLmRhdGEucGFzc3dvcmRfcmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJHN0YXRlUGFyYW1zLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUuZGF0YS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogJHNjb3BlLmRhdGEucGFzc3dvcmRfcmVwZWF0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnYXV0aGVudGljYXRlL3JlY292ZXInKSwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGF1dGgucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyBmcm9tIGhlcmUgLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZXNldHRpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdzZXQnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdQYXNzd29yZHMgZG8gbm90IG1hdGNoISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdQYXNzd29yZHMgbmVlZCB0byBiZSBsb25nZXIgdGhhbiA2IGNoYXJhY3RlcnMhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFVUkkpO1xuICAgICAgICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgICAgIHZhciBieXRlU3RyaW5nO1xuICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuICAgICAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgICAgIHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgICAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZvY3VzT24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7IGZvY3VzT246ICc9JyB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZS5mb2N1c09uKTtcblxuICAgICAgICAgICAgICAgIGlmKHNjb3BlLmZvY3VzT24pe1xuICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgfTtcbiAgICB9KTtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICRyZXNvdXJjZSwgRmRTY3JvbGxlciwgJGZpbHRlciwgRmlsZVVwbG9hZGVyLCBDb3VudHJpZXMsIENvdW50cnlDb2RlcywgQVBJKSB7XG5cbiAgICAgICAgJHNjb3BlLmZvcm0gPSB7XG4gICAgICAgICAgICBjdXJyZW50U3RlcDogMSxcbiAgICAgICAgICAgIHRvdGFsU3RlcHM6IDNcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG90YWxTdGVwcyA9IHtcbiAgICAgICAgICAgIGNyZWF0b3I6IDMsXG4gICAgICAgICAgICBleHBlcnQ6IDQsXG4gICAgICAgICAgICBpbnZlc3RvcjogNFxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jaGFuZ2VGb3JtU3RlcCA9IGZ1bmN0aW9uKG5ld1N0ZXApe1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNvdW50cmllcyA9IENvdW50cmllcygpO1xuICAgICAgICAkc2NvcGUuY291bnRyeUNvZGVzID0gQ291bnRyeUNvZGVzKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJyRzY29wZS5jb3VudHJpZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdW50cmllcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCckc2NvcGUuY291bnRyeUNvZGVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3VudHJ5Q29kZXMpO1xuXG4gICAgICAgICRzY29wZS5jb250YWN0VGltZXMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dvcmtpbmcgaG91cnMgKDlhbSB0byA2IHBtKScsIHZhbHVlOiAnOS02J30sXG4gICAgICAgICAgICB7bmFtZTogJ0V2ZW5pbmcgdGltZSAoNmFtIHRvIDkgcG0pJywgdmFsdWU6ICc2LTknfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRSb2xlOiAnY3JlYXRvcicsXG4gICAgICAgICAgICBhZ2VHYXRlOiAneWVzJyxcbiAgICAgICAgICAgIGNvdW50cnlPcmlnaW46ICcnLFxuICAgICAgICAgICAgY291bnRyeVJlc2lkZW5jZTogJycsXG4gICAgICAgICAgICBjb250YWN0VGltZTogJycsXG4gICAgICAgICAgICBleHBlcnRpc2VGb3JtOiB7XG4gICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JvcHBlZFRodW1ibmFpbDogbnVsbCxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0udG90YWxTdGVwcyA9ICRzY29wZS50b3RhbFN0ZXBzWyRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZV07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSAqIDEwMCwgOTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzSW52ZXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgoKDEgLSAoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSkgKiAxMDApLCA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHVzZXIucmVnaXN0ZXJlZCA9PSAxKSAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ292ZXIgZHJhZ2xlYXZlIGRyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnbGVhdmUnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogQVBJLnBhdGgoJ2ZpbGVzJyksXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUltYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICRzY29wZS5kYXRhLmNyb3BwZWRUaHVtYm5haWw7XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZS5maWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gJ1lvdXIgcHJvZmlsZSBwaWN0dXJlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWQhJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VFcnJvciA9ICdQcm9maWxlIHBpY3R1cmUgZmFpbGVkIHRvIHVwbG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IoaW1hZ2UpKTtcbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCl7XG4gICAgICAgICAgICB2YXIgbGFzdElucHV0dGVkRXhwZXJ0aXNlID0ge3NlbGVjdGVkRXhwZXJ0aXNlOiAnbnVsbCcsIG90aGVyRXhwZXJ0aXNlOiB7c3RhdHVzOiAxfX07XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0xXTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RJbnB1dHRlZEV4cGVydGlzZSk7XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA8IDMgJiYgKGxhc3RJbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCAmJiBsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBza2lsbHNMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsczogW10sXG4gICAgICAgICAgICAgICAgICAgIG90aGVyU2tpbGxzOiB7bGlzdDogW10sIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeShpbmRleCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QoaW5kZXgpO1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGUsIGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaW5Ta2lsbHMgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgdmFyIGZvdW5kU2tpbGwgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGZvdW5kU2tpbGwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZFNraWxsLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICBpZighJHNjb3BlLmluU2tpbGxzKGluZGV4LCBza2lsbCkpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLnB1c2goc2tpbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RTa2lsbCA9IGZ1bmN0aW9uKGUsIGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhbmd1bGFyLmVxdWFscyhhY3R1YWwsIGV4cGVjdGVkKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVTa2lsbHMgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscyA9IHtsaXN0OiBbXSwgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdleHBlcnRpc2UtY2F0ZWdvcnkvMCcpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ2V4cGVydGlzZS1jYXRlZ29yeS8nKSArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdleHBlcnRpc2UvY2F0ZWdvcnkvJykgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ2V4cGVydGlzZS8nKSArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlLmlkICsgJy9za2lsbHMvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcblxuICAgICAgICAvLyBFeHBlcnQgUmVsYXRlZCBGdW5jdGlvbnNcblxuICAgICAgICAkc2NvcGUuc3VibWl0RGV0YWlscyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEuZm5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkc2NvcGUuZGF0YS5sbmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsXG4gICAgICAgICAgICAgICAgYWdlX2dhdGU6ICRzY29wZS5kYXRhLmFnZUdhdGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9vcmlnaW46ICRzY29wZS5kYXRhLmNvdW50cnlPcmlnaW4sXG4gICAgICAgICAgICAgICAgY291bnRyeV9yZXNpZGVuY2U6ICRzY29wZS5kYXRhLmNvdW50cnlSZXNpZGVuY2UsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXI6ICRzY29wZS5kYXRhLmNvbnRhY3ROdW1iZXIsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXJfY291bnRyeV9jb2RlOiAkc2NvcGUuZGF0YS5jb250YWN0TnVtYmVyQ291bnRyeUNvZGUuY29kZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X3RpbWU6ICRzY29wZS5kYXRhLmNvbnRhY3RUaW1lLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2goJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlc3RtZW50QnVkZ2V0ID09PSAnb3RoZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0T3RoZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXQgPSBpbnZlc3RtZW50QnVkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2dvYWwgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRHb2FsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X3JlYXNvbiA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudFJlYXNvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuY3JlYXRvciA9IHt9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4cGVydCc6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydCA9IHsgbGlzdDogW10gfTtcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCwgZnVuY3Rpb24oaW5wdXR0ZWRFeHBlcnRpc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsIHx8IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJ0Lmxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHM6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkU2tpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgJGh0dHAucHV0KEFQSS5wYXRoKCd1c2Vycy8nKSArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubmFtZSA9ICRzY29wZS5kYXRhLmZuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubGFzdF9uYW1lID0gJHNjb3BlLmRhdGEubG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGU7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyLCBBUEkpIHtcblxuICAgICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgICAgICAgJHNjb3BlLnNlY3Rpb25Mb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZShBUEkucGF0aCgnY29udGVzdHMvOmNvbnRlc3RJZCcpLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cyA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicgJiYgdHlwZW9mKCRyb290U2NvcGUudXNlci5jcmVhdG9yKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIG9nYyBpbiAkcm9vdFNjb3BlLnVzZXIuY3JlYXRvci5vbmdvaW5nX2NvbnRlc3Qpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdFtvZ2NdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKHJlc3VsdCwge2lkOiBjb250ZXN0X2lkfSwgdHJ1ZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMucHVzaChjb250ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9nY0luZGV4ID0gJHNjb3BlLmNvbnRlc3RzLmluZGV4T2YoY29udGVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdHMuc3BsaWNlKG9nY0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmICRyb290U2NvcGUudXNlci5qdWRnaW5nLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgamMgaW4gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5qdWRnaW5nW2pjXS5jb250ZXN0X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0U2luZ2xlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGZpbHRlciwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsICRodHRwLCBMaWdodGJveCwgQVBJKSB7XG4gICAgICAgICRzY29wZS5jb250ZXN0SWQgPSAkc3RhdGVQYXJhbXMuY29udGVzdElkO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnRlc3RGdWxsRGVzY3JpcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnk6IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnlGb3JtOiB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXM6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRyeTogbnVsbCxcbiAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJycsXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJycsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKEFQSS5wYXRoKCdjb250ZXN0cy86Y29udGVzdElkJyksIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIEVudHJ5ID0gJHJlc291cmNlKEFQSS5wYXRoKCdlbnRyaWVzLzplbnRyeUlkJyksIHtcbiAgICAgICAgICAgIGVudHJ5SWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvbnRlc3RhbnRFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6IEFQSS5wYXRoKCdlbnRyaWVzL2NvbnRlc3QvOmNvbnRlc3RJZC9jcmVhdG9yLzpjcmVhdG9ySWQnKSxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAganVkZ2VFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6IEFQSS5wYXRoKCdlbnRyaWVzL2NvbnRlc3QvOmNvbnRlc3RJZC9qdWRnZS86anVkZ2VJZCcpLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kTWVzc2FnZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogQVBJLnBhdGgoJ2VudHJpZXMvOmVudHJ5SWQvbWVzc2FnZXMnKSxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnlSYXRpbmcgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ2VudHJ5LXJhdGluZ3MvOmVudHJ5UmF0aW5nSWQnKSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAvLyAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5zaG93RnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5oaWRlRnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbnRlc3QuZ2V0KHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZFxuICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdKdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGNvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdDb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoanVkZ2VhYmxlLmxlbmd0aCA+IDAgJiYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2p1cnknICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2NyZWF0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuY29udGVzdElkID0gcmVzdWx0LmlkO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3Lm9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2p1cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogcmVzdWx0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYganVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdKdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nSnVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXN0aW5nLmxlbmd0aCA+IDAgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJHJvb3RTY29wZS5hY3RpdmVSb2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGVuZGluZ0NvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nQ29udGVzdGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2p1cnknOlxuICAgICAgICAgICAgICAgICAgICBFbnRyeS5qdWRnZUVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAganVkZ2VJZDogJHJvb3RTY29wZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRvciA9IHJvbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBFbnRyeS5jb250ZXN0YW50RW50cmllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5ID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuZW50cmllcy1saXN0Jyk7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZUlkID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknKSB7XG4gICAgICAgICAgICAgICAganVkZ2VJZCA9ICRyb290U2NvcGUudXNlci5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGp1ZGdlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ2VudHJpZXMvJykgKyBlbnRyeS5pZCArICcvanVkZ2UvJyArIGp1ZGdlSWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZyA9IHJlc3VsdC5kYXRhLnJhdGluZztcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmdhbGxlcnkgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzEucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8zLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgRW50cnkuZ2V0KHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlJZDogZW50cnkuaWRcbiAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmdhbGxlcnkgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzEucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8zLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm9wZW5MaWdodGJveCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBhbGxGaWxlcyA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuZmlsZXM7XG4gICAgICAgICAgICB2YXIgYWxsSW1hZ2VzID0gW107XG4gICAgICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gMDtcblxuICAgICAgICAgICAgZm9yKHZhciBhRiBpbiBhbGxGaWxlcyl7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBhbGxGaWxlc1thRl07XG4gICAgICAgICAgICAgICAgYWxsSW1hZ2VzLnB1c2goZmlsZS51cmwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGUudXJsID09PSBpdGVtLnVybCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSBhRjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExpZ2h0Ym94Lm9wZW5Nb2RhbChhbGxJbWFnZXMsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJG9uKCdmbG93OjpmaWxlQWRkZWQnLCBmdW5jdGlvbiAoZXZlbnQsICRmbG93LCBmbG93RmlsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWxlQWRkZWQnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmbG93KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZsb3dGaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVudHJ5RmlsZVN1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmlsZSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgZmlsZXMgOiAnICsgbWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgICRmaWxlLnJlZl9pZCA9IG1lc3NhZ2UuZmlsZS5pZDtcblxuICAgICAgICAgICAgLy8gdmFyIGl0ZW1zID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMsIHtpZDogbWVzc2FnZS5maWxlLmlkfSk7XG4gICAgICAgICAgICAvLyB2YXIgaXRlbSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGlmICh0eXBlb2YoaXRlbXMpICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgaXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5pbmRleE9mKG1lc3NhZ2UuZmlsZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuZmlsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmVudHJ5RmlsZVJlbW92ZSA9IGZ1bmN0aW9uKGZpbGUsICRmbG93KSB7XG4gICAgICAgICAgICAvLyB2YXIgaXRlbXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcywge2lkOiBmaWxlLmlkfSk7XG4gICAgICAgICAgICAvLyB2YXIgaXRlbSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGlmICh0eXBlb2YoaXRlbXMpICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgaXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5pbmRleE9mKGZpbGUucmVmX2lkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBmaWxlc0luZGV4ID0gJGZsb3cuZmlsZXMuaW5kZXhPZihmaWxlKTtcbiAgICAgICAgICAgIGlmIChmaWxlc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmUgZmlsZXMgLi4uICcgKyBmaWxlc0luZGV4KTtcbiAgICAgICAgICAgICAgICAkZmxvdy5maWxlcy5zcGxpY2UoZmlsZXNJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmbG93LmZpbGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zaG93QWRkRW50cnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuZW50cmllcy1saXN0Jyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnkgPSB0cnVlO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uID0gJyc7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcyA9IFtdO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb24gPSAkc2NvcGUuY29udGVzdC5lbnRyaWVzWyRzY29wZS5jb250ZXN0LmVudHJpZXMubGVuZ3RoIC0gMV0uZGVzY3JpcHRpb247XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc3VibWl0RW50cnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ0VudHJ5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaGVkRmlsZXMgPSB7fTtcbiAgICAgICAgICAgIHZhciB0aHVtYm5haWxfaWQgPSBudWxsO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmZsb3cuZmlsZXMsIGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXNbZmlsZS5yZWZfaWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAnY2FwdGlvbic6IGZpbGUucmVmX2NhcHRpb25cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXBhcmUgdG8gYXNzaWduIHRodW1ibmFpbCcpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlLmZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpICE9PSAtMSAmJiB0aHVtYm5haWxfaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dob29waWUgaXQgbWF0Y2hlcycpO1xuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxfaWQgPSBmaWxlLnJlZl9pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiAnY3JlYXRvcid9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gbmV3IEVudHJ5KCk7XG4gICAgICAgICAgICAgICAgZW50cnkuY3JlYXRvcl9pZCA9IHJvbGUuaWQ7XG4gICAgICAgICAgICAgICAgZW50cnkuY29udGVzdF9pZCA9ICRzY29wZS5jb250ZXN0LmlkO1xuICAgICAgICAgICAgICAgIGVudHJ5LnRodW1ibmFpbF9pZCA9IHRodW1ibmFpbF9pZDtcblxuICAgICAgICAgICAgICAgIGVudHJ5Lm5hbWUgPSAkcm9vdFNjb3BlLnVzZXIubmFtZSArIFwiJ3MgRW50cnlcIjtcbiAgICAgICAgICAgICAgICBlbnRyeS5kZXNjcmlwdGlvbiA9ICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBlbnRyeS5hdHRhY2hlZF9maWxlcyA9IGF0dGFjaGVkRmlsZXM7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeS50aHVtYm5haWxfaWQpO1xuXG4gICAgICAgICAgICAgICAgZW50cnkuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbnRyeSBTYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdFbnRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZEVudHJ5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9ICBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RFbnRyeShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdjcmVhdG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIEVudHJ5LnNlbmRNZXNzYWdlKHtlbnRyeUlkOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmlkfSwgbWVzc2FnZVJlcXVlc3QsIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5tZXNzYWdlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zYXZlTWFya3MgPSBmdW5jdGlvbihlbnRyeVJhdGluZ0lkKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZWRSYXRpbmcgPSB7XG4gICAgICAgICAgICAgICAgZGVzaWduOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5kZXNpZ24sXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuY3JlYXRpdml0eSxcbiAgICAgICAgICAgICAgICBpbmR1c3RyaWFsOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5pbmR1c3RyaWFsLFxuICAgICAgICAgICAgICAgIG1hcmtldDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcubWFya2V0LFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5qdWRnZV9pZCA9ICRyb290U2NvcGUudXNlci5pZDtcbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuZW50cnlfaWQgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmlkO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGVudHJ5UmF0aW5nSWQpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIEVudHJ5UmF0aW5nLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6IGVudHJ5UmF0aW5nSWRcbiAgICAgICAgICAgICAgICB9LCB1cGRhdGVkUmF0aW5nKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgc2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnanVyeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeVJhdGluZyA9IG5ldyBFbnRyeVJhdGluZyh1cGRhdGVkUmF0aW5nKTtcbiAgICAgICAgICAgICAgICBlbnRyeVJhdGluZy4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBjcmVhdGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2p1cnknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYmVjb21lSnVkZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gU2hvdyBOREFcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGEgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFjY2VwdEp1ZGdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCd1c2Vycy9iZWNvbWVKdWRnZScpLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5iZWNvbWVDb250ZXN0YW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFjY2VwdENvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgndXNlcnMvYmVjb21lQ29udGVzdGFudCcpLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQsICRmaWx0ZXIsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlIFN0YXJ0ZWQnKTtcbiAgICAgICAgJHJvb3RTY29wZS5zZWN0aW9uTG9hZGluZyA9IHRydWU7XG4gICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEF2YWlsYWJsZSBWaWV3cyA6IExpc3QsIENyZWF0ZVxuICAgICAgICAkc2NvcGUudmlldyA9ICdsaXN0JztcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBuZXdQcm9qZWN0TG9hZGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnByb2plY3QgPSBudWxsO1xuXG4gICAgICAgICRzY29wZS5zdGVwcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1lvdXIgUHJvamVjdCcsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmdvaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2FwcC5jcmVhdGUuZGV0YWlscycsXG4gICAgICAgICAgICAgICAgYm9keTogJzxoMz5HcmVhdCE8L2gzPjxwPjxkZm4+WW91IGhhdmUgYmVlbiBjb21wbGV0ZWQgYSB2ZXJ5IGltcG9ydGFudCBzdGVwLCB3ZSB3aWxsIG5vdyBiZSBhYmxlIHRvIGNvbW11bmljYXRlIGVmZmljaWVudGx5LjwvZGZuPjwvcD48cD48ZGZuPllvdXIgZ3JlYXQgaWRlYSB3aWxsIGJlIHVuZGVyIHRoZSBUT1lTICYgQU1VU0VNRU5UU+KAnSBjYXRlZ29yeS48L2Rmbj48L3A+PHA+PGRmbj5JbiBvcmRlciB0byBtYWtlIHlvdXIgcHJvamVjdCBjb21lIHRydWUgd2Ugd2lsbCBnbyB0aHJvdWdoIDQgc3RlcHMuPC9kZm4+PC9wPjxwPjxkZm4+QmVmb3JlaGFuZCwgbWFrZSBzdXJlIHRvIHJlYWQgYWxsIHR1dG9yaWFscyAod2l0aCBsaW5rKSBhbmQgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHRoZSBjb25jZXB0IG9mIEZ1bmRhdG9yLjwvZGZuPjwvcD48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIG1hcmdpblQxMFwiPkkgcmVhZCB0aGUgdHV0b3JpYWwgYW5kIGd1aWRlbGluZXMuIEkgd2FudCB0byBzdGFydC48L2E+PC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdNZWV0IHlvdXIgU3VwZXIgRXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uZ29pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnYXBwLmNyZWF0ZS5zdXBlcmV4cGVydCcsXG4gICAgICAgICAgICAgICAgYm9keTogJzxoMz5FeHBlcnRpc2UgeW91IG5lZWQ8L2gzPjxwPjxkZm4+WW91IGhhdmUgYmVlbiBjb21wbGV0ZWQgYSB2ZXJ5IGltcG9ydGFudCBzdGVwLCB3ZSB3aWxsIG5vdyBiZSBhYmxlIHRvIGNvbW11bmljYXRlIGVmZmljaWVudGx5LjwvZGZuPjwvcD48cD48ZGZuPllvdXIgZ3JlYXQgaWRlYSB3aWxsIGJlIHVuZGVyIHRoZSBUT1lTICYgQU1VU0VNRU5UU+KAnSBjYXRlZ29yeS48L2Rmbj48L3A+PHA+PGRmbj5JbiBvcmRlciB0byBtYWtlIHlvdXIgcHJvamVjdCBjb21lIHRydWUgd2Ugd2lsbCBnbyB0aHJvdWdoIDQgc3RlcHMuPC9kZm4+PC9wPjxwPjxkZm4+QmVmb3JlaGFuZCwgbWFrZSBzdXJlIHRvIHJlYWQgYWxsIHR1dG9yaWFscyAod2l0aCBsaW5rKSBhbmQgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHRoZSBjb25jZXB0IG9mIEZ1bmRhdG9yLjwvZGZuPjwvcD48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIG1hcmdpblQxMFwiPkkgcmVhZCB0aGUgdHV0b3JpYWwgYW5kIGd1aWRlbGluZXMuIEkgd2FudCB0byBzdGFydC48L2E+PC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdFeHBlcnRpc2UgeW91IG5lZWQnLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25nb2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdhcHAuY3JlYXRlLmV4cGVydGlzZScsXG4gICAgICAgICAgICAgICAgYm9keTogJzxoMz5FeHBlcnRpc2UgeW91IG5lZWQ8L2gzPjxwPjxkZm4+WW91IGhhdmUgYmVlbiBjb21wbGV0ZWQgYSB2ZXJ5IGltcG9ydGFudCBzdGVwLCB3ZSB3aWxsIG5vdyBiZSBhYmxlIHRvIGNvbW11bmljYXRlIGVmZmljaWVudGx5LjwvZGZuPjwvcD48cD48ZGZuPllvdXIgZ3JlYXQgaWRlYSB3aWxsIGJlIHVuZGVyIHRoZSBUT1lTICYgQU1VU0VNRU5UU+KAnSBjYXRlZ29yeS48L2Rmbj48L3A+PHA+PGRmbj5JbiBvcmRlciB0byBtYWtlIHlvdXIgcHJvamVjdCBjb21lIHRydWUgd2Ugd2lsbCBnbyB0aHJvdWdoIDQgc3RlcHMuPC9kZm4+PC9wPjxwPjxkZm4+QmVmb3JlaGFuZCwgbWFrZSBzdXJlIHRvIHJlYWQgYWxsIHR1dG9yaWFscyAod2l0aCBsaW5rKSBhbmQgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHRoZSBjb25jZXB0IG9mIEZ1bmRhdG9yLjwvZGZuPjwvcD48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIG1hcmdpblQxMFwiPkkgcmVhZCB0aGUgdHV0b3JpYWwgYW5kIGd1aWRlbGluZXMuIEkgd2FudCB0byBzdGFydC48L2E+PC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdFeHBlcnRzIG9uIHlvdXIgdGVhbScsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmdvaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2FwcC5jcmVhdGUuZXhwZXJ0cycsXG4gICAgICAgICAgICAgICAgYm9keTogJzxoMz5FeHBlcnRzIG9uIHlvdXIgdGVhbTwvaDM+PHA+PGRmbj5Zb3UgaGF2ZSBiZWVuIGNvbXBsZXRlZCBhIHZlcnkgaW1wb3J0YW50IHN0ZXAsIHdlIHdpbGwgbm93IGJlIGFibGUgdG8gY29tbXVuaWNhdGUgZWZmaWNpZW50bHkuPC9kZm4+PC9wPjxwPjxkZm4+WW91ciBncmVhdCBpZGVhIHdpbGwgYmUgdW5kZXIgdGhlIFRPWVMgJiBBTVVTRU1FTlRT4oCdIGNhdGVnb3J5LjwvZGZuPjwvcD48cD48ZGZuPkluIG9yZGVyIHRvIG1ha2UgeW91ciBwcm9qZWN0IGNvbWUgdHJ1ZSB3ZSB3aWxsIGdvIHRocm91Z2ggNCBzdGVwcy48L2Rmbj48L3A+PHA+PGRmbj5CZWZvcmVoYW5kLCBtYWtlIHN1cmUgdG8gcmVhZCBhbGwgdHV0b3JpYWxzICh3aXRoIGxpbmspIGFuZCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgdGhlIGNvbmNlcHQgb2YgRnVuZGF0b3IuPC9kZm4+PC9wPjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbWFyZ2luVDEwXCI+SSByZWFkIHRoZSB0dXRvcmlhbCBhbmQgZ3VpZGVsaW5lcy4gSSB3YW50IHRvIHN0YXJ0LjwvYT48L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1ZhbGlkYXRlIHRoZSBidWRnZXQnLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25nb2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdhcHAuY3JlYXRlLmJ1ZGdldCcsXG4gICAgICAgICAgICAgICAgYm9keTogJzxoMz5WYWxpZGF0ZSB0aGUgYnVkZ2V0PC9oMz48cD48ZGZuPllvdSBoYXZlIGJlZW4gY29tcGxldGVkIGEgdmVyeSBpbXBvcnRhbnQgc3RlcCwgd2Ugd2lsbCBub3cgYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBlZmZpY2llbnRseS48L2Rmbj48L3A+PHA+PGRmbj5Zb3VyIGdyZWF0IGlkZWEgd2lsbCBiZSB1bmRlciB0aGUgVE9ZUyAmIEFNVVNFTUVOVFPigJ0gY2F0ZWdvcnkuPC9kZm4+PC9wPjxwPjxkZm4+SW4gb3JkZXIgdG8gbWFrZSB5b3VyIHByb2plY3QgY29tZSB0cnVlIHdlIHdpbGwgZ28gdGhyb3VnaCA0IHN0ZXBzLjwvZGZuPjwvcD48cD48ZGZuPkJlZm9yZWhhbmQsIG1ha2Ugc3VyZSB0byByZWFkIGFsbCB0dXRvcmlhbHMgKHdpdGggbGluaykgYW5kIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB0aGUgY29uY2VwdCBvZiBGdW5kYXRvci48L2Rmbj48L3A+PHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4taW5mbyBtYXJnaW5UMTBcIj5JIHJlYWQgdGhlIHR1dG9yaWFsIGFuZCBndWlkZWxpbmVzLiBJIHdhbnQgdG8gc3RhcnQuPC9hPjwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnWW91ciBpbnZlc3RvcnMnLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25nb2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdhcHAuY3JlYXRlLmludmVzdG9ycycsXG4gICAgICAgICAgICAgICAgYm9keTogJzxoMz5Zb3VyIEludmVzdG9yPC9oMz48cD48ZGZuPllvdSBoYXZlIGJlZW4gY29tcGxldGVkIGEgdmVyeSBpbXBvcnRhbnQgc3RlcCwgd2Ugd2lsbCBub3cgYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBlZmZpY2llbnRseS48L2Rmbj48L3A+PHA+PGRmbj5Zb3VyIGdyZWF0IGlkZWEgd2lsbCBiZSB1bmRlciB0aGUgVE9ZUyAmIEFNVVNFTUVOVFPigJ0gY2F0ZWdvcnkuPC9kZm4+PC9wPjxwPjxkZm4+SW4gb3JkZXIgdG8gbWFrZSB5b3VyIHByb2plY3QgY29tZSB0cnVlIHdlIHdpbGwgZ28gdGhyb3VnaCA0IHN0ZXBzLjwvZGZuPjwvcD48cD48ZGZuPkJlZm9yZWhhbmQsIG1ha2Ugc3VyZSB0byByZWFkIGFsbCB0dXRvcmlhbHMgKHdpdGggbGluaykgYW5kIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB0aGUgY29uY2VwdCBvZiBGdW5kYXRvci48L2Rmbj48L3A+PHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4taW5mbyBtYXJnaW5UMTBcIj5JIHJlYWQgdGhlIHR1dG9yaWFsIGFuZCBndWlkZWxpbmVzLiBJIHdhbnQgdG8gc3RhcnQuPC9hPjwvcD4nXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnc3RlcHMnLCBmdW5jdGlvbihzdGVwcyl7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc3RlcHMsIGZ1bmN0aW9uKHN0ZXApe1xuICAgICAgICAgICAgICAgIGlmIChzdGVwLmlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RlcC5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcjcHJvamVjdFN0ZXBzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0LnN0YXRlJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0LnN0YXRlKTtcbiAgICAgICAgICAgIHZhciBmbG9vcmVkU3RhdGUgPSBNYXRoLmZsb29yKCRzY29wZS5wcm9qZWN0LnN0YXRlKTtcbiAgICAgICAgICAgIHZhciByZW1haW5pbmdTdGF0ZSA9ICRzY29wZS5wcm9qZWN0LnN0YXRlIC0gZmxvb3JlZFN0YXRlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZsb29yZWRTdGF0ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0ZXBzW2ldLnByb2dyZXNzID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLnN0ZXBzW2Zsb29yZWRTdGF0ZV0ub25nb2luZyA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuc3RlcHNbZmxvb3JlZFN0YXRlXS5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgJHNjb3BlLnN0ZXBzW2Zsb29yZWRTdGF0ZV0ucHJvZ3Jlc3MgPSByZW1haW5pbmdTdGF0ZTtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIFByb2plY3QgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ3Byb2plY3RzLzpwcm9qZWN0SWQnKSwge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXF1aXJlZFJvbGUgPSAnY3JlYXRvcic7XG4gICAgICAgIHZhciBtYXRjaGluZ1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHsgcm9sZTogcmVxdWlyZWRSb2xlIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YobWF0Y2hpbmdSb2xlcykgIT09ICd1bmRlZmluZWQnICYmIG1hdGNoaW5nUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nUm9sZSA9IG1hdGNoaW5nUm9sZXNbMF07XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09IHJlcXVpcmVkUm9sZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocmVxdWlyZWRSb2xlLCBtYXRjaGluZ1JvbGUuaWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJvamVjdElkID0gcGFyc2VJbnQoJHN0YXRlUGFyYW1zLnByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdElkKSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXNOYU4ocHJvamVjdElkKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxsUHJvamVjdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzTnVtYmVyKHByb2plY3RJZCkgJiYgaXNGaW5pdGUocHJvamVjdElkKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3QuZ2V0KHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3QgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFrZSB1cCB5b3VyIG1pbmQgeW91IHBlaWNlIG9mIHNoaXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5ob21lJyk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nb1RvUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywgeyBwcm9qZWN0SWQ6IHByb2plY3QuaWQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY3JlYXRlTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubmV3UHJvamVjdExvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCkuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5nb1RvUHJvamVjdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm5ld1Byb2plY3RMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9qZWN0ID0gYW5ndWxhci5jb3B5KCRzY29wZS5wcm9qZWN0KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkc2NvcGUucHJvamVjdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkXG4gICAgICAgICAgICAgICAgfSwgcHJvamVjdCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRGV0YWlsc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBmZWF0dXJlZEltYWdlOiB7fSxcbiAgICAgICAgICAgIGRhdGVwaWNrZXI6IHtcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRldGFpbHMgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGdlb2dyYXBoeTogJ3doZXJldmVyJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kZXRhaWxzID0gcHJvamVjdDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Qgc3RpbGwgbG9hZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuJG9uKCdmbG93OjpmaWxlQWRkZWQnLCBmdW5jdGlvbihldmVudCwgJGZsb3csIGZsb3dGaWxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZmVhdHVyZWRJbWFnZVN1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC50aHVtYm5haWxfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYXR0YWNoZWRGaWxlc1N1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUucHJvamVjdC5hdHRhY2hlZEZpbGVzLmluZGV4T2YobWVzc2FnZS5maWxlLmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LmF0dGFjaGVkRmlsZXMucHVzaChtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdERyYWZ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdGF0ZSA9IDAuOTtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignI3Byb2plY3RTdGVwcycpO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlU0VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlciwgQVBJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVTRUN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRodHRwLmdldChBUEkucGF0aCgnc3VwZXItZXhwZXJ0cycpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLnN1cGVyRXhwZXJ0cyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNob29zZVN1cGVyRXhwZXJ0ID0gZnVuY3Rpb24oc3VwZXJFeHBlcnQpIHtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN1cGVyX2V4cGVydF9pZCA9IHN1cGVyRXhwZXJ0LmlkO1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSAyO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRXhwZXJ0aXNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlciwgQVBJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVFeHBlcnRpc2VDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICRzY29wZS5pbnB1dHRlZEVweGVydGlzZSA9IG51bGw7XG4gICAgICAgICRzY29wZS5zYXZpbmdFeHBlcnRpc2UgPSBmYWxzZTtcblxuICAgICAgICB2YXIgUHJvamVjdEV4cGVydGlzZSA9ICRyZXNvdXJjZShBUEkucGF0aCgnL3Byb2plY3RzLzpwcm9qZWN0SWQvZXhwZXJ0aXNlJyksIHtcbiAgICAgICAgICAgIHByb2plY3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFByb2plY3RFeHBlcnRpc2UucXVlcnkoe3Byb2plY3RJZDogJHNjb3BlLnByb2plY3QuaWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zYXZlRXhwZXJ0aXNlID0gZnVuY3Rpb24oZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICRzY29wZS5zYXZpbmdFeHBlcnRpc2UgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgcHJvamVjdEV4cGVydGlzZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2V4cGVydGlzZV9pZCc6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZS5pZCxcbiAgICAgICAgICAgICAgICAndGFzayc6IGV4cGVydGlzZS5tYWluVGFzayxcbiAgICAgICAgICAgICAgICAnYnVkZ2V0JzogZXhwZXJ0aXNlLmJ1ZGdldCxcbiAgICAgICAgICAgICAgICAnbGVhZF90aW1lJzogZXhwZXJ0aXNlLmxlYWRUaW1lLFxuICAgICAgICAgICAgICAgICdzdGFydF9kYXRlJzogZXhwZXJ0aXNlLnN0YXJ0RGF0ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnL3Byb2plY3RzLycpICsgJHNjb3BlLnByb2plY3QuaWQgKyAnL2V4cGVydGlzZScsIHByb2plY3RFeHBlcnRpc2VEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdC5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2F2aW5nRXhwZXJ0aXNlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXB4ZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlRXhwZXJ0aXNlU2VsZWN0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRpc2UnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdGF0ZSA9IDM7XG4gICAgICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBsYXN0SW5wdXR0ZWRFeHBlcnRpc2UgPSB7IHNlbGVjdGVkRXhwZXJ0aXNlOiAnbnVsbCcsIG90aGVyRXhwZXJ0aXNlOiB7IHN0YXR1czogMSB9IH07XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA8IDMgJiYgKGxhc3RJbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCAmJiBsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZUNhdGVnb3J5OiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeTogeyBuYW1lOiAnJywgc3RhdHVzOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZTogeyBuYW1lOiAnJywgc3RhdHVzOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW5UYXNrOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgYnVkZ2V0OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbGVhZFRpbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXB4ZXJ0aXNlID0gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFskc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2VDYXRlZ29yeSwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeShpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oZSwgaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZSkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBleHBlcnRpc2U7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihlLCBpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCcvZXhwZXJ0aXNlLWNhdGVnb3J5LzAnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJy9leHBlcnRpc2UtY2F0ZWdvcnkvJykgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCcvZXhwZXJ0aXNlL2NhdGVnb3J5LycpICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUV4cGVydEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkaHR0cCwgQVBJLCBTd2VldEFsZXJ0LCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVFeHBlcnRDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgIHZhciBQcm9qZWN0RXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCcvcHJvamVjdHMvOnByb2plY3RJZC9leHBlcnRpc2UnKSwge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgUHJvamVjdEV4cGVydGlzZS5xdWVyeSh7cHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3QpID09PSAndW5kZWZpbmVkJyB8fCBwcm9qZWN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnNob3J0bGlzdEV4cGVydCA9IGZ1bmN0aW9uKGV4cGVydGlzZSwgYmlkKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoZXhwZXJ0aXNlLnNob3J0bGlzdCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZXhwZXJ0aXNlLnNob3J0bGlzdCA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleHBlcnRpc2Uuc2hvcnRsaXN0LnB1c2goYmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVTaG9ydGxpc3RFeHBlcnQgPSBmdW5jdGlvbihleHBlcnRpc2UsIGJpZCl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBleHBlcnRpc2Uuc2hvcnRsaXN0LmluZGV4T2YoYmlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGV4cGVydGlzZS5zaG9ydGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kaXNjdXNzRXhwZXJ0ID0gZnVuY3Rpb24oZXhwZXJ0aXNlLCBiaWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRCaWQgPSBiaWRcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnQgPSBmdW5jdGlvbihleHBlcnRpc2UsIGJpZCkge1xuICAgICAgICAgICAgU3dlZXRBbGVydC5zd2FsKHtcbiAgICAgICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxuICAgICAgICAgICAgIHRleHQ6ICdZb3UgYXJlIHNlbGVjdGluZyAnICsgYmlkLmV4cGVydC5uYW1lICsgJyB0byBjb21wbGV0ZSB5b3VyIHRhc2suJyxcbiAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjRjhDNDg2Jyxjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZ28gYWhlYWQhJyxcbiAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICAgY2xvc2VPbkNhbmNlbDogZmFsc2V9LFxuICAgICAgICAgICAgIGZ1bmN0aW9uKGlzQ29uZmlybSl7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAkaHR0cC5wdXQoQVBJLnBhdGgoJy9wcm9qZWN0LWV4cGVydGlzZS8nICsgZXhwZXJ0aXNlLmlkICsgJy9iaWQvJyArIGJpZC5pZCksIHt9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2Uuc2VsZWN0ZWRfYmlkID0gYmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN3ZWV0QWxlcnQuc3dhbCgnU2VsZWN0ZWQhJywgJ1lvdSBoYXZlIHNlbGVjdGVkIHRoZSBleHBlcnQuJywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1FeHBlcnRzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN0YXRlID0gNTtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRpc2UnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUJ1ZGdldEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVCdWRnZXRDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3QpID09PSAndW5kZWZpbmVkJyB8fCBwcm9qZWN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVJbnZlc3RvcnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlSW52ZXN0b3JzQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0V4cGVydEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkZmlsdGVyLCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydCBTdGFydGVkJyk7XG4gICAgICAgICRzY29wZS5leHBlcnRpc2VTb3VyY2UgPSBudWxsO1xuICAgICAgICAkc2NvcGUuYXZhaWxhYmxlRXhwZXJ0aXNlID0gW107XG4gICAgICAgICRzY29wZS5tYXRjaGluZ0V4cGVydGlzZSA9IFtdO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgIHZhciBBdmFpbGFibGVFeHBlcnRpc2UgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ2V4cGVydGlzZS9hdmFpbGFibGUnKSk7XG5cbiAgICAgICAgdmFyIE1hdGNoaW5nRXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCdleHBlcnRpc2UvbWF0Y2hpbmcnKSwge30sIHtcbiAgICAgICAgXHRxdWVyeToge1xuICAgICAgICBcdFx0bWV0aG9kOiAnR0VUJyxcbiAgICAgICAgXHRcdGlzQXJyYXk6IGZhbHNlXG4gICAgICAgIFx0fVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVxdWlyZWRSb2xlID0gJ2V4cGVydCc7XG4gICAgICAgIHZhciBtYXRjaGluZ1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHsgcm9sZTogcmVxdWlyZWRSb2xlIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBhY2Nlc3MgPSBmYWxzZTtcblxuICAgICAgICBpZiAodHlwZW9mKG1hdGNoaW5nUm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiBtYXRjaGluZ1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ1JvbGUgPSBtYXRjaGluZ1JvbGVzWzBdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSByZXF1aXJlZFJvbGUpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJlcXVpcmVkUm9sZSwgbWF0Y2hpbmdSb2xlLmlkLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5ob21lJyk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY2Nlc3MpIHtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgXHRBdmFpbGFibGVFeHBlcnRpc2UucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUV4cGVydGlzZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU291cmNlID0gJHNjb3BlLmF2YWlsYWJsZUV4cGVydGlzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBNYXRjaGluZ0V4cGVydGlzZS5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUubWF0Y2hpbmdFeHBlcnRpc2UgPSByZXN1bHQuZXhwZXJ0aXNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0aXNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRXhwZXJ0aXNlIFN0YXJ0ZWQnKTtcblxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcbiAgICAgICAgJHNjb3BlLmV4cGVydGlzZSA9IG51bGw7XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJy9wcm9qZWN0LWV4cGVydGlzZS86ZXhwZXJ0aXNlSWQnKSwge1xuICAgICAgICBcdGV4cGVydGlzZUlkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLmdldCh7ZXhwZXJ0aXNlSWQ6ICRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHQkc2NvcGUuZXhwZXJ0aXNlID0gcmVzdWx0O1xuICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdEJpZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5iaWRMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGJpZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2JpZF9hbW91bnQnOiAkc2NvcGUuZGF0YS5iaWRfYW1vdW50LFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICRzY29wZS5kYXRhLmJpZF9kZXNjcmlwdGlvblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnL3Byb2plY3QtZXhwZXJ0aXNlLycpICsgJHN0YXRlUGFyYW1zLmV4cGVydGlzZUlkICsgJy9iaWQnLCBiaWREYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZS5iaWQgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5iaWRMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRm9vdGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyLCBBUEkpIHtcbiAgICAgICAgJHNjb3BlLm5vdGlmaWNhdGlvbnMgPSBudWxsO1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKEFQSS5wYXRoKCcvY29udGVzdHMvOmNvbnRlc3RJZCcpLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlc3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRmxhc2hOb3RpY2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcyA9IHt9O1xuXG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3ID0ge1xuICAgICAgICBcdHNob3c6IGZhbHNlLFxuICAgICAgICBcdGNvbnRlc3RJZDogMCxcbiAgICAgICAgXHRvbkNsaWNrOiBmdW5jdGlvbigpe1xuICAgICAgICBcdFx0Y29uc29sZS5sb2coJ29uQ2xpY2snKTtcbiAgICAgICAgXHRcdCRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUoJ2p1cnknLCA1LCB0cnVlKTtcbiAgICAgICAgXHR9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdWliTW9kYWwpIHtcblxuICAgICAgICAkc2NvcGUudHJpZ2dlckxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ3RyaWdnZXIgbG9naW4hJyk7XG5cbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICAgICAgd2luZG93Q2xhc3M6ICdsb2dpbi1tb2RhbCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHb3QgY2xvc2UgZmVlZGJhY2shJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJ01vZGFsIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UpIHtcbiAgICBcdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCl7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdsb2dnaW5nIGluIG5vdyAhJyk7XG4gICAgXHR9XG5cbiAgICBcdCRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbigpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnYXV0aCBpbiBub3cgIScpO1xuICAgIFx0fVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdOYXZpZ2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJGxvZywgJHRpbWVvdXQsICRmaWx0ZXIsICRodHRwLCAkcmVzb3VyY2UsICR1aWJNb2RhbCwgRmlsZVVwbG9hZGVyLCBDb3VudHJ5Q29kZXMsIEFQSSkge1xuXG4gICAgICAgICRzY29wZS5hbGxTa2lsbHMgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ3NraWxscycpKS5xdWVyeSgpO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiBBUEkucGF0aCgnZmlsZXMnKSxcbiAgICAgICAgICAgIHJlbW92ZUFmdGVyVXBsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgdXNlclNldHRpbmdzTW9kZTogJ3ZpZXcnLFxuICAgICAgICAgICAgdXNlclNldHRpbmdzU2F2ZTogLTEsXG4gICAgICAgICAgICBzb2NpYWxDb25uZWN0OiB7XG4gICAgICAgICAgICAgICAgZmFjZWJvb2s6IHt9LFxuICAgICAgICAgICAgICAgIGxpbmtlZGluOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR3b0ZBOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBhbmd1bGFyLmNvcHkoJHJvb3RTY29wZS51c2VyLmNvbnRhY3RfbnVtYmVyX2NvdW50cnlfY29kZSksXG4gICAgICAgICAgICAgICAgbnVtYmVyOiBhbmd1bGFyLmNvcHkoJHJvb3RTY29wZS51c2VyLmNvbnRhY3RfbnVtYmVyKSxcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25Db2RlOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNvdW50cnlDb2RlcyA9IENvdW50cnlDb2RlcygpO1xuXG4gICAgICAgICRzY29wZS5zdGFydFR3b0ZBVmVyaWZ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGNvdW50cnlDb2RlID0gMTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZS5jb2RlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlLmNvZGU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmVyaWZpY2F0aW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICB2aWE6ICdzbXMnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfY29kZTogcGFyc2VJbnQoY291bnRyeUNvZGUpLFxuICAgICAgICAgICAgICAgIHBob25lX251bWJlcjogcGFyc2VJbnQoJHNjb3BlLmRhdGEudHdvRkEubnVtYmVyKSxcbiAgICAgICAgICAgICAgICBsb2NhbGU6ICdlbidcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJy92ZXJpZmljYXRpb24vc3RhcnQnKSwgdmVyaWZpY2F0aW9uRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEuY29kZVNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNvbXBsZXRlVHdvRkFWZXJmaXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgY291bnRyeUNvZGUgPSAxO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlLmNvZGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlID0gJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGUuY29kZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlID0gJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2ZXJpZmljYXRpb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfY29kZTogcGFyc2VJbnQoY291bnRyeUNvZGUpLFxuICAgICAgICAgICAgICAgIHBob25lX251bWJlcjogcGFyc2VJbnQoJHNjb3BlLmRhdGEudHdvRkEubnVtYmVyKSxcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25fY29kZTogcGFyc2VJbnQoJHNjb3BlLmRhdGEudHdvRkEudmVyaWZpY2F0aW9uQ29kZSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJy92ZXJpZmljYXRpb24vY2hlY2snKSwgdmVyaWZpY2F0aW9uRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2ZXJpZmljYXRpb24gZGF0YScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmNvZGVTZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLnZlcmlmeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucGhvbmVfdmVyaWZpZWQgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNvY2lhbENvbm5lY3QgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNvY2lhbFVubGluayA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gbnVsbDtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHN3aXRjaChwcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmFjZWJvb2snOiBtZXRob2QgPSAndW5saW5rRmFjZWJvb2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmtlZGluJzogbWV0aG9kID0gJ3VubGlua0xpbmtlZGluJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnYXV0aGVudGljYXRlLycpICsgbWV0aG9kLCB7fSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3Byb3ZpZGVyXSA9IG51bGw7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2ZpbGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0gYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlcik7XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2NyZWF0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnaW52ZXN0b3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyRGF0YVsnanVkZ2luZyddO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMDtcblxuICAgICAgICAgICAgJGh0dHAucHV0KEFQSS5wYXRoKCd1c2Vycy8nKSArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NNb2RlID0gJ3ZpZXcnO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gLTE7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoYW5nZSB1c2VyIHRodW1ibmFpbFxuICAgICAgICAkc2NvcGUuY2hhbmdlVGh1bWJuYWlsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vdmlld3MvYXBwL2FwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJUaHVtYm5haWxDdHJsJyxcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAodGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnRodW1ibmFpbCA9IGFuZ3VsYXIuY29weSh0aHVtYm5haWwpO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe2F0dGFjaDogJ3RodW1ibmFpbCd9KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlZCB1c2VyIHRodW1ibmFpbCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHVwbG9hZGluZyB0aGUgZmlsZVxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IodGh1bWJuYWlsKSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGxvZy5pbmZvKCdNb2RhbCBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9nb3V0XG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdHVhbGx5IGxvZ2dpbmcgb3V0ISAuLi4nKTtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBvcHVsYXRlIHNpZGUgbmF2aWdhdGlvblxuICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3VzZXJzL3NpZGVOYXZpZ2F0aW9uRGF0YScpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaWRlTmF2aWdhdGlvbkRhdGEgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUub3BlbkZ1bGxNZW51ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub0xpbmsgPSBmdW5jdGlvbihwYWdlLCBkYXRhLCByb2xlKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDA7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogcm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyb2xlLnJvbGUsIHJvbGUuaWQsIHRydWUsIHBhZ2UsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVXNlclRodW1ibmFpbEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKXtcbiAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICB9KTtcblxuICAgICRzY29wZS5zZXRUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH1cbiAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIb21lIFZpZXcgU3RhcnRlZCcpO1xuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgLy8gICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgIC8vICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgLy8gICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgLy8gICAgICBcdGNvbnRlc3RJZDogJ0BpZCdcbiAgIC8vICAgICAgfSk7XG5cbiAgIC8vICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAvLyAgICAgIFx0JHNjb3BlLmNvbnRlc3RzID0gcmVzdWx0O1xuICAgLy8gICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgIC8vICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcblx0XHRcdC8vICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgIC8vICAgICAgfSk7XG5cbiAgIC8vICAgICAgLy8gUXVlcnkgRXhwZXJ0aXNlXG5cbiAgIC8vICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAvLyAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlcyA9IHJlc3VsdC5kYXRhO1xuICAgLy8gICAgICB9LCAyMDAwKTtcblxuICAgLy8gICAgICAkc2NvcGUuaW52ZXN0b3JzID0gW1xuICAgLy8gICAgICAgICAge25hbWU6ICdBbGFpbiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYSBldmVuaWV0IGRlc2VydW50IGFkIHBhcmlhdHVyIHByYWVzZW50aXVtLCBpbmNpZHVudCBtb2xlc3RpYWUgYmVhdGFlIHF1YW0gcXVhc2kgcmVpY2llbmRpcyBtb2xsaXRpYSBhY2N1c2FudGl1bSB2b2x1cHRhdGUgcXVhZXJhdCBzZXF1aSBvZmZpY2lhIGEgZmFjZXJlIHJlcGVsbGF0IGFkaXBpc2NpLid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgZGlnbmlzc2ltb3MgbmVtbywgc2VxdWkgZG9sb3JpYnVzIGFjY3VzYW50aXVtLCBvYmNhZWNhdGkgbmF0dXMgaXVyZSBxdWFtIGVzc2UgZXggbGFib3JlIG5lcXVlIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZSBpbiwgbmloaWwgZWEsIGN1bSByZWN1c2FuZGFlIHV0Lid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdDaHJpc3RvcGhlIEJyaXNzaWF1ZCcsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnMy5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBsaWNhYm8gZW5pbSBvZmZpY2lhIG9wdGlvIGRvbG9ydW0gaGFydW0sIHNvbHV0YSBjdWxwYSB1bmRlIHZlbmlhbSBub2JpcyBlb3MsIGR1Y2ltdXMgcXVvZCBwcmFlc2VudGl1bSB2ZXJpdGF0aXMgYXRxdWUgbm9uIG5vc3RydW0gaXBzYW0uIE5vc3RydW0sIGV0ISd9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUXVpYSByZWN1c2FuZGFlIGFsaXF1aWQgcXVvcyBhcGVyaWFtIG1vbGVzdGlhZSBxdWlidXNkYW0gcXVpIGVvcyBpdXJlIHNhZXBlIG9wdGlvIHZpdGFlIGZ1Z2l0IHVuZGUgbmFtLCBhdHF1ZSBleGNlcHR1cmkgZGVzZXJ1bnQgZXN0LCByZXBlbGxhdCBhbGlhcy4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdDaW5keSBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9XG4gICAvLyAgICAgIF07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignR3JhYlNoYXJlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5NYXRoID0gd2luZG93Lk1hdGg7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBwcmltYXJ5U2hhcmVMaXN0aW5nOiBudWxsLFxuICAgICAgICAgICAgc2hvd0JpZE5vdzogZmFsc2UsXG4gICAgICAgICAgICBteUJpZDoge1xuICAgICAgICAgICAgICAgIGJpZF9hbW91bnQ6IDAuNzIsXG4gICAgICAgICAgICAgICAgbnVtX3NoYXJlczogMTAsXG4gICAgICAgICAgICAgICAgc2F2aW5nOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSwgMjAwMCk7XG5cbiAgICAgICAgJHNjb3BlLmludmVzdG9ycyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnQWxhaW4gQW1vcmV0dGknLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcxLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIElwc2EgZXZlbmlldCBkZXNlcnVudCBhZCBwYXJpYXR1ciBwcmFlc2VudGl1bSwgaW5jaWR1bnQgbW9sZXN0aWFlIGJlYXRhZSBxdWFtIHF1YXNpIHJlaWNpZW5kaXMgbW9sbGl0aWEgYWNjdXNhbnRpdW0gdm9sdXB0YXRlIHF1YWVyYXQgc2VxdWkgb2ZmaWNpYSBhIGZhY2VyZSByZXBlbGxhdCBhZGlwaXNjaS4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2hhcmxlcyBkXFwnYW50ZXJyb2NoZXMnLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcyLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGVkaXRhIGRpZ25pc3NpbW9zIG5lbW8sIHNlcXVpIGRvbG9yaWJ1cyBhY2N1c2FudGl1bSwgb2JjYWVjYXRpIG5hdHVzIGl1cmUgcXVhbSBlc3NlIGV4IGxhYm9yZSBuZXF1ZSBjb25zZXF1YXR1ciB2b2x1cHRhdGUgaW4sIG5paGlsIGVhLCBjdW0gcmVjdXNhbmRhZSB1dC4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2hyaXN0b3BoZSBCcmlzc2lhdWQnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzMuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwbGljYWJvIGVuaW0gb2ZmaWNpYSBvcHRpbyBkb2xvcnVtIGhhcnVtLCBzb2x1dGEgY3VscGEgdW5kZSB2ZW5pYW0gbm9iaXMgZW9zLCBkdWNpbXVzIHF1b2QgcHJhZXNlbnRpdW0gdmVyaXRhdGlzIGF0cXVlIG5vbiBub3N0cnVtIGlwc2FtLiBOb3N0cnVtLCBldCEnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnSmVhbi1CZXJuYXJkIEFudG9pbmUnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzQuanBlZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIFF1aWEgcmVjdXNhbmRhZSBhbGlxdWlkIHF1b3MgYXBlcmlhbSBtb2xlc3RpYWUgcXVpYnVzZGFtIHF1aSBlb3MgaXVyZSBzYWVwZSBvcHRpbyB2aXRhZSBmdWdpdCB1bmRlIG5hbSwgYXRxdWUgZXhjZXB0dXJpIGRlc2VydW50IGVzdCwgcmVwZWxsYXQgYWxpYXMuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ1hhdmllciBQYXVsaW4nLCBjb3VudHJ5OiAnVGFpd2FuJywgaW1hZ2U6ICc1LmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEl1cmUgaW52ZW50b3JlIG5lc2NpdW50IGlsbHVtLCBwYXJpYXR1ciBtb2xlc3RpYXMgZGlnbmlzc2ltb3MgaXBzYSBpc3RlIGVzdC4gU2VkLCBhc3N1bWVuZGEgZG9sb3J1bT8gQWIgYmxhbmRpdGlpcyBxdWFzaSwgdm9sdXB0YXRlcyBpc3RlIGl1c3RvIHZlcm8gZGVzZXJ1bnQgc3VudC4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2luZHkgQ2h1bmcnLCBjb3VudHJ5OiAnSG9uZyBLb25nJywgaW1hZ2U6ICc2LmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEl1cmUgaW52ZW50b3JlIG5lc2NpdW50IGlsbHVtLCBwYXJpYXR1ciBtb2xlc3RpYXMgZGlnbmlzc2ltb3MgaXBzYSBpc3RlIGVzdC4gU2VkLCBhc3N1bWVuZGEgZG9sb3J1bT8gQWIgYmxhbmRpdGlpcyBxdWFzaSwgdm9sdXB0YXRlcyBpc3RlIGl1c3RvIHZlcm8gZGVzZXJ1bnQgc3VudC4nfVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIEdldCBhbGwgbGlzdGluZ3NcbiAgICAgICAgZnVuY3Rpb24gbG9hZFByaW1hcnlMaXN0aW5nKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZyA9IG51bGw7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnc2hhcmUtbGlzdGluZycpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUJpZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5teUJpZC5zYXZpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbXlCaWQgPSB7XG4gICAgICAgICAgICAgICAgJ3NoYXJlX2xpc3RpbmdfaWQnOiAkc2NvcGUuZGF0YS5wcmltYXJ5U2hhcmVMaXN0aW5nLmlkLFxuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEubXlCaWQuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnbnVtX3NoYXJlcyc6ICRzY29wZS5kYXRhLm15QmlkLm51bV9zaGFyZXNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ3NoYXJlLWJpZHMnKSwgbXlCaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5teUJpZC5zYXZpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93QmlkTm93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRQcmltYXJ5TGlzdGluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdJbnZlc3RDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnSW52ZXN0IFN0YXJ0ZWQnKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdOb3RpZmljYXRpb25zQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCBGZE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgJHNjb3BlLm5vdGlmaWNhdGlvbnMgPSBudWxsO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKCRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG5cdCAgICAgICAgRmROb3RpZmljYXRpb25zLmdldExhdGVzdE5vdGlmaWNhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdCAgICAgICAgXHQkc2NvcGUubm90aWZpY2F0aW9ucyA9IHJlc3VsdC5ub3RpZmljYXRpb25zO1xuXHQgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcblx0ICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblx0ICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1BhZ2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHNjb3BlLnBhZ2UgPSB7XG4gICAgICAgIFx0dGl0bGU6ICcnLFxuICAgICAgICBcdGNvbnRlbnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdwYWdlcycpICsgJHN0YXRlUGFyYW1zLnNsdWcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHRjb25zb2xlLmxvZygnU3VjY2VzcycpO1xuICAgICAgICBcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIFx0JHNjb3BlLnBhZ2UgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cblx0XHRcdGlmIChlcnJvci5zdGF0dXMgPT0gJzQwNCcpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2xvYWQgNDA0Jylcblx0XHRcdH07XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1F1aWNrVXBkYXRlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgRmROb3RpZmljYXRpb25zLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3F1aWNrdXBkYXRlJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgIFx0ZWRpdE1vZGU6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEludmVzdG9yID0gJHJlc291cmNlKEFQSS5wYXRoKCdpbnZlc3RvcnMvOmludmVzdG9ySWQnKSwge1xuICAgICAgICAgICAgaW52ZXN0b3JJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQgPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgIFx0JHNjb3BlLmRhdGEuZWRpdE1vZGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5tb2RpZnlJbnZlc3RtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGludmVzdG9yRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaW52ZXN0bWVudF9idWRnZXQnOiAkcm9vdFNjb3BlLnVzZXIuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5lZGl0SW52ZXN0bWVudChmYWxzZSk7XG5cbiAgICAgICAgICAgIEludmVzdG9yLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgaW52ZXN0b3JJZDogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmlkXG4gICAgICAgICAgICB9LCBpbnZlc3RvckRhdGEpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUcmFuc2FjdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcblxuICAgIFx0Y29uc29sZS5sb2coJ1RyYW5zYWN0aW9uQ3RybCcpO1xuICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICBcdEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgIFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgIFx0fSwgMjAwMCk7XG5cbiAgICB9KTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
