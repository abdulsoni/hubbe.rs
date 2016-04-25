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
            redirectUri: APIProvider.$get().path('authenticate/linkedin'),
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
            redirectUri: APIProvider.$get().path('authenticate/google'),
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
            redirectUri: APIProvider.$get().path('authenticate/facebook'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2FuaW1hdGUuanMiLCJjb25maWcvYXV0aC5qcyIsImNvbmZpZy9mbG93LmpzIiwiY29uZmlnL2h0dHAuanMiLCJjb25maWcvbGFkZGEuanMiLCJkaXJlY3RpdmVzL2NoYXJ0cy5qcyIsImRpcmVjdGl2ZXMvbG9hZGVyLmRpcmVjdGl2ZS5qcyIsImRpcmVjdGl2ZXMvbWVzc2VuZ2VyLmpzIiwiZGlyZWN0aXZlcy9taW5NYXguanMiLCJkaXJlY3RpdmVzL21pc2MuanMiLCJkaXJlY3RpdmVzL3Byb2ZpbGVGaWVsZC5qcyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbnMuc2VydmljZS5qcyIsInNlcnZpY2VzL3Njcm9sbGVyLnNlcnZpY2UuanMiLCJmaWx0ZXJzL3N0cmlwSHRtbC5qcyIsInZhbHVlcy9jb3VudHJpZXMuanMiLCJ2YWx1ZXMvY291bnRyeUNvZGVzLmpzIiwidmFsdWVzL3NldHRpbmdzLmpzIiwiYXBwL2F1dGgvYXV0aC5qcyIsImFwcC9hdXRoL3JlZ2lzdGVyLmpzIiwiYXBwL2NvbnRlc3QvY29udGVzdC5qcyIsImFwcC9oZWFkZXIvZmxhc2gtbm90aWNlLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuanMiLCJhcHAvaGVhZGVyL25hdmlnYXRpb24uanMiLCJhcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmpzIiwiYXBwL2NyZWF0ZS9jcmVhdGUuanMiLCJhcHAvZXhwZXJ0L2V4cGVydC5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL3BhZ2UvcGFnZS5qcyIsImFwcC9pbnZlc3QvZ3JhYlNoYXJlLmpzIiwiYXBwL2ludmVzdC9pbnZlc3QuanMiLCJhcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmpzIiwiYXBwL2hvbWUvaG9tZS5qcyIsImFwcC90cmFuc2FjdGlvbi90cmFuc2FjdGlvbi5qcyIsImFwcC9xdWljay11cGRhdGUvcXVpY2stdXBkYXRlLmpz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Q0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFdBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxpQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLDBCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsd0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFB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QSxhQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7O1FBR0EsY0FBQSxTQUFBO1lBQ0EsVUFBQTtZQUNBLE1BQUE7WUFDQSxLQUFBLFlBQUEsT0FBQSxLQUFBO1lBQ0EsdUJBQUE7WUFDQSxhQUFBLFlBQUEsT0FBQSxLQUFBO1lBQ0EsbUJBQUEsQ0FBQSxXQUFBO1lBQ0EsT0FBQSxDQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7Ozs7OztBQ2pEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsOENBQUEsVUFBQSxxQkFBQSxZQUFBOztRQUVBLG9CQUFBLFdBQUE7U0FDQSxjQUFBO1lBQ0EsUUFBQSxZQUFBLE9BQUEsS0FBQTtZQUNBLGdCQUFBLENBQUEsS0FBQSxLQUFBOzs7Ozs7O0FDVEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFVBQUEsY0FBQTs7Ozs7O0FDSEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFNBQUEsZUFBQTs7UUFFQSxjQUFBLFVBQUE7WUFDQSxPQUFBO1lBQ0EsYUFBQTtZQUNBLGNBQUE7Ozs7Ozs7QUNSQSxDQUFBLFdBQUE7SUFDQTs7O0lBR0EsUUFBQSxPQUFBOztLQUVBLFVBQUEsV0FBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQSxNQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7O2dCQUVBLE9BQUEsUUFBQSxPQUFBO2dCQUNBLE9BQUEsU0FBQSxPQUFBOzs7Z0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQSxPQUFBO2dCQUNBLFNBQUEsS0FBQSxVQUFBLE9BQUEsT0FBQTs7Z0JBRUEsSUFBQSxXQUFBLENBQUE7b0JBQ0EsT0FBQTtvQkFDQSxPQUFBO29CQUNBLFdB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RUFBQTtpQkFDQSxLQUFBLE9BQUEsUUFBQSxDQUFBLFdBQUEsTUFBQSxPQUFBOzs7Ozs7Ozs7QUNqQkEsQ0FBQSxXQUFBO0lBQ0E7O0NBRUEsUUFBQSxPQUFBLG9CQUFBLE9BQUEsYUFBQSxXQUFBO0tBQ0EsT0FBQSxTQUFBLE1BQUE7O0dBRUEsSUFBQSxPQUFBLFVBQUEsYUFBQTtJQUNBLElBQUEsS0FBQSxJQUFBLE9BQUEsT0FBQSxhQUFBLE1BQUE7SUFDQSxPQUFBLE9BQUEsTUFBQSxRQUFBLElBQUE7SUFDQSxPQUFBLEtBQUEsUUFBQSxpQkFBQTtJQUNBLE9BQUEsS0FBQSxRQUFBLFdBQUE7OztPQUdBLE9BQUEsT0FBQSxPQUFBLE1BQUEsUUFBQSxhQUFBLE1BQUE7Ozs7O0NBS0EsUUFBQSxPQUFBLG9CQUFBLE9BQUEsYUFBQSxXQUFBO0tBQ0EsT0FBQSxTQUFBLE1BQUE7O0dBRUEsSUFBQSxPQUFBLFVBQUEsYUFBQTtJQUNBLE9BQUEsS0FBQSxRQUFBLGlCQUFBOzs7T0FHQSxPQUFBOzs7Ozs7O0FDekJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxxQkFBQSxNQUFBLGFBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDJCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsc0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLCtCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsaUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsK0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxxQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwwQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsOENBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsUUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsbUNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGlCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDRCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsU0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1DQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG9CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHNCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxlQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsNkJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxvQ0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxjQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEseUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx5QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxnQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGFBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLG1CQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0RBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxTQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxZQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsMEJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxhQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsVUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx3QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLDZCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsY0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSx1QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFdBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsZ0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSw0QkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFVBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsa0JBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxpQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdDQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsV0FBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLGNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxXQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsYUFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFlBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSwyQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLHdCQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEscUJBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxrQkFBQSxRQUFBO1lBQ0EsRUFBQSxRQUFBLFNBQUEsUUFBQTtZQUNBLEVBQUEsUUFBQSxVQUFBLFFBQUE7WUFDQSxFQUFBLFFBQUEsWUFBQSxRQUFBOzs7OztBQ3RQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEscUJBQUEsTUFBQSxnQkFBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsS0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLEtBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsTUFBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE1BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxNQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxPQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsRUFBQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEVBQUEsTUFBQSxTQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEs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QSxJQUFBOztZQUVBLElBQUEsS0FBQSxLQUFBLFFBQUEsWUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxPQUFBLFNBQUEsUUFBQTtvQkFDQSxPQUFBLGFBQUE7O2dCQUVBO21CQUNBO2dCQUNBLE9BQUEsYUFBQTs7O1lBR0EsT0FBQSxXQUFBLEtBQUE7O1lBRUEsT0FBQSxTQUFBLFNBQUEsS0FBQTtnQkFDQSxPQUFBLE9BQUEsU0FBQSxRQUFBO29CQUNBLFFBQUEsSUFBQSxJQUFBLE9BQUE7b0JBQ0EsT0FBQSxZQUFBLElBQUEsT0FBQTs7OztZQUlBLElBQUEsTUFBQTtnQkFDQSxPQUFBLGNBQUE7Ozs7UUFJQSxFQUFBLFVBQUEsR0FBQSxnQ0FBQSxvQkFBQSxTQUFBLE9BQUE7WUFDQSxNQUFBO1lBQ0EsTUFBQTs7O1FBR0EsRUFBQSxVQUFBLEdBQUEsYUFBQSxvQkFBQSxTQUFBLE9BQUE7WUFDQSxNQUFBO1lBQ0EsTUFBQTs7WUFFQSxPQUFBLE9BQUEsV0FBQTtnQkFDQSxPQUFBLFdBQUE7Ozs7UUFJQSxFQUFBLFVBQUEsR0FBQSxhQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOztZQUVBLE9BQUEsT0FBQSxXQUFBO2dCQUNBLE9BQUEsV0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLFVBQUEsY0FBQSxTQUFBLEdBQUE7WUFDQSxpQkFBQSxHQUFBOzs7UUFHQSxFQUFBLFVBQUEsR0FBQSxRQUFBLG9CQUFBLFNBQUEsR0FBQTtZQUNBLGlCQUFBLEdBQUE7OztRQUdBLE9BQUEsV0FBQSxJQUFBLGFBQUE7WUFDQSxLQUFBLElBQUEsS0FBQTtZQUNBLG1CQUFBOzs7UUFHQSxPQUFBLGVBQUEsVUFBQTtZQUNBLElBQUEsUUFBQSxPQUFBLEtBQUE7O1lBRUEsT0FBQSxTQUFBLHFCQUFBLFNBQUEsTUFBQTtnQkFDQSxLQUFBLEtBQUEsT0FBQSxlQUFBLFdBQUEsS0FBQSxLQUFBOztnQkFFQSxLQUFBLFdBQUE7Z0JBQ0EsS0FBQSxTQUFBLEtBQUEsQ0FBQSxRQUFBO2dCQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsU0FBQSxXQUFBLEtBQUE7O2dCQUVBLE9BQUEsS0FBQSxlQUFBOzs7WUFHQSxPQUFBLFNBQUEsZ0JBQUEsU0FBQSxVQUFBLFVBQUEsUUFBQSxTQUFBO2dCQUNBLElBQUEsT0FBQSxTQUFBLFVBQUEsYUFBQTtvQkFDQSxPQUFBLEtBQUEsZUFBQTtxQkFDQTtvQkFDQSxPQUFBLEtBQUEsYUFBQTs7OztZQUlBLE9BQUEsU0FBQSxXQUFBLGNBQUE7WUFDQSxPQUFBLFNBQUE7Ozs7OztRQU1BLE9BQUEsWUFBQSxVQUFBLGNBQUE7O1FBRUEsT0FBQSx3QkFBQTs7UUFFQSxTQUFBLHlCQUFBO1lBQ0EsSUFBQSx3QkFBQSxDQUFBLG1CQUFBLFFBQUEsZ0JBQUEsQ0FBQSxRQUFBOztZQUVBLElBQUEsT0FBQSxzQkFBQSxTQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHNCQUFBLFFBQUE7Ozs7WUFJQSxRQUFBLElBQUEsT0FBQTtZQUNBLFFBQUEsSUFBQTs7WUFFQSxJQUFBLE9BQUEsc0JBQUEsU0FBQSxNQUFBLHNCQUFBLHNCQUFBLFFBQUEsc0JBQUEsZUFBQSxXQUFBLElBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxLQUFBO29CQUNBLHVCQUFBO29CQUNBLDBCQUFBO29CQUNBLGVBQUE7b0JBQ0EsWUFBQTtvQkFDQSwyQkFBQTtvQkFDQSx3QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO29CQUNBLDhCQUFBO29CQUNBLDJCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7b0JBQ0EsbUJBQUE7b0JBQ0EsZ0JBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtvQkFDQSxnQkFBQTtvQkFDQSxhQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7b0JBQ0EsTUFBQTtvQkFDQSxTQUFBOzthQUVBOztZQUVBLE9BQUEsdUJBQUEsT0FBQSxzQkFBQSxTQUFBOzs7UUFHQSxPQUFBLDBCQUFBLFNBQUEsT0FBQSxtQkFBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsMEJBQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsbUJBQUE7Ozs7UUFJQSxPQUFBLDRCQUFBLFNBQUEsR0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O1lBRUEsRUFBQTs7O1FBR0EsT0FBQSw2QkFBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLCtCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSx1QkFBQSxTQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLDBCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Ozs7UUFJQSxPQUFBLCtCQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Ozs7UUFJQSxPQUFBLGtCQUFBLFNBQUEsT0FBQSxVQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtZQUNBLE9BQUEsZ0JBQUE7WUFDQTs7O1FBR0EsT0FBQSxvQkFBQSxTQUFBLEdBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTtZQUNBLEVBQUEsZ0JBQUE7OztRQUdBLE9BQUEscUJBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7WUFF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QUEsRUFBQSxXQUFBLFFBQUE7OztRQUdBLE9BQUEsbUJBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxvQkFBQTs7WUFFQSxJQUFBLGFBQUEsSUFBQSxVQUFBLFFBQUEsS0FBQSxTQUFBLFFBQUE7Z0JBQ0EsT0FBQSxZQUFBO2dCQUNBLE9BQUEsS0FBQSxvQkFBQTs7OztRQUlBLE9BQUEsZUFBQSxXQUFBO1lBQ0EsSUFBQSxVQUFBLFFBQUEsS0FBQSxPQUFBOztZQUVBLElBQUEsT0FBQSxPQUFBLGFBQUEsYUFBQTtnQkFDQSxRQUFBLE9BQUE7b0JBQ0EsV0FBQSxPQUFBLFFBQUE7bUJBQ0EsU0FBQSxTQUFBLEtBQUEsU0FBQSxRQUFBO29CQUNBLFFBQUEsSUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7OztRQU1BLFdBQUE7OztJQUdBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG1HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBLFlBQUE7UUFDQSxPQUFBLE9BQUE7WUFDQSxlQUFBO1lBQ0EsWUFBQTtnQkFDQSxRQUFBOzs7O1FBSUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFdBQUE7OztRQUdBLE9BQUEsT0FBQSxXQUFBLFNBQUEsU0FBQTtZQUNBLElBQUEsWUFBQSxNQUFBO2dCQUNBLE9BQUEsVUFBQTtnQkFDQSxXQUFBLHNCQUFBO21CQUNBO2dCQUNBLFFBQUEsSUFBQTs7OztRQUlBLE9BQUEsSUFBQSxtQkFBQSxTQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxPQUFBLFFBQUEsZUFBQSxRQUFBLEtBQUE7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQSxRQUFBLE9BQUEsUUFBQSxjQUFBLFFBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxRQUFBLGNBQUEsS0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHlHQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFVBQUEsWUFBQTs7S0FFQSxRQUFBLElBQUE7S0FDQSxXQUFBLFdBQUE7S0FDQSxXQUFBOztLQUVBLFNBQUEsVUFBQTtNQUNBLFdBQUEsV0FBQTtRQUNBOzs7OztBQ1hBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLDZHQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBLGlCQUFBLEtBQUE7UUFDQSxRQUFBLElBQUE7O1FBRUEsT0FBQSxPQUFBO1NBQ0EsVUFBQTs7O1FBR0EsSUFBQSxXQUFBLFVBQUEsSUFBQSxLQUFBLDBCQUFBO1lBQ0EsWUFBQTtXQUNBO1lBQ0EsUUFBQTtnQkFDQSxRQUFBOzs7O1FBSUEsT0FBQSxpQkFBQSxTQUFBLE1BQUE7U0FDQSxPQUFBLEtBQUEsV0FBQTs7O1FBR0EsT0FBQSxtQkFBQSxVQUFBOztZQUVBLElBQUEsZUFBQTtnQkFDQSxxQkFBQSxXQUFBLEtBQUEsU0FBQTs7O1lBR0EsT0FBQSxlQUFBOztZQUVBLFNBQUEsT0FBQTtnQkFDQSxZQUFBLFdBQUEsS0FBQSxTQUFBO2VBQ0EsY0FBQSxTQUFBLEtBQUEsU0FBQSxPQUFBO2dCQUNBLElBQUEsT0FBQSxPQUFBLFdBQUEsYUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7OztLQU1BIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGZ1bmRhdG9yID0gYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5maWx0ZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5zZXJ2aWNlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iucm91dGVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5jb25maWcnXG4gICAgICAgIF0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycsIFsndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJywgWyduZ1Jlc291cmNlJywgJ25nQ29va2llcycsICduZ0FuaW1hdGUnLCAndWkuYm9vdHN0cmFwJywgJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJywgJ2FuZ3VsYXJNb21lbnQnLCAnYW5ndWxhci1vd2wtY2Fyb3VzZWwnLCAnbmdJbWdDcm9wJywgJ2FuZ3VsYXJGaWxlVXBsb2FkJywgJ2Jvb3RzdHJhcExpZ2h0Ym94J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJywgWydvcmRpbmFsJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJywgWydkaWJhcmkuYW5ndWxhci1lbGxpcHNpcycsICdsb2NhbHl0aWNzLmRpcmVjdGl2ZXMnLCAndGV4dEFuZ3VsYXInLCAnZmxvdycsICdhbmd1bGFyLWxhZGRhJywgJ25nRmxhZycsICdvaXRvemVyby5uZ1N3ZWV0QWxlcnQnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSAjIGZvciB0aGUgbm9uIGh0bWw1IGJyb3dzZXJzXG4gICAgICAgIC8vICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKVxuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIHNlY29uZGFyeU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kYXJ5TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlOYW1lID0gdmlld05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAnLi92aWV3cy9hcHAvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHNlY29uZGFyeU5hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2NvbnRlc3RzJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnbmF2aWdhdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05hdmlnYXRpb25DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmbGFzaE5vdGljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICdmbGFzaC1ub3RpY2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGbGFzaE5vdGljZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdub3RpZmljYXRpb25zJywgJ25vdGlmaWNhdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOb3RpZmljYXRpb25zQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tVcGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUXVpY2tVcGRhdGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hdXRoJyxcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmxvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguc2lnbnVwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnc2lnbnVwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5mb3Jnb3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2ZvcmdvdCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdmb3Jnb3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnJlY292ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlY292ZXI/dG9rZW4mZW1haWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVjb3ZlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhSZWNvdmVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmNvbmZpcm0nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm0/Y29kZSZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdjb25maXJtJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbmZpcm1DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzczogJ2hvbWVwYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hvbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgLy8gICAgIHVybDogJy8nLFxuICAgICAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgLy8gICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICB2aWV3czoge1xuICAgICAgICAgICAgLy8gICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3RzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdHMvOmNvbnRlc3RJZC86Y29udGVzdE5hbWUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmV4cGVydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UvOmV4cGVydGlzZUlkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcsICdleHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmludmVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2ludmVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jcmVhdGU/cHJvamVjdElkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2RldGFpbHMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1kZXRhaWxzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRGV0YWlsc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLnN1cGVyZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zdXBlci1leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1zdXBlci1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVTRUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmV4cGVydGlzZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0aXNlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0aXNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRXhwZXJ0aXNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0cycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWV4cGVydHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5idWRnZXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2J1ZGdldCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWJ1ZGdldCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUJ1ZGdldEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmludmVzdG9ycycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0b3JzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtaW52ZXN0b3JzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlSW52ZXN0b3JzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC50cmFuc2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdUcmFuc2FjdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JhYnNoYXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ncmFiLWEtc2hhcmUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dyYWJTaGFyZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAucGFnZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvOnNsdWcnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3BhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIsICRmaWx0ZXIsICRjb29raWVzLCBGZE5vdGlmaWNhdGlvbnMsIEZkU2Nyb2xsZXIsIEFQSSkge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0ge25hbWU6ICdhcHAuY29udGVzdCd9O1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmNvbGxhcHNlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5ub3RpZmljYXRpb25Db2xsYXBzZSA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKCRyb290U2NvcGUuaXNOYXZTaG93biA+PSAwLjUpID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gMCA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAuNTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBVc2VyU2VydmljZSBpcyBhbiBleGFtcGxlIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgJHVybFJvdXRlcidzIGRlZmF1bHQgaGFuZGxlciBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZFxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB1c2VyIG9iamVjdCBhbmQgdGFza3NcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3VzZXI/dG9rZW49JykgKyAkYXV0aC5nZXRUb2tlbigpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRmROb3RpZmljYXRpb25zLmluaXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWduYWxSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVJvbGUgPSAkcm9vdFNjb3BlLnVzZXIucm9sZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoJGNvb2tpZXMuZ2V0KCdmZF9hY3RpdmVfcm9sZScpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUm9sZSA9ICRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IGFjdGl2ZVJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiByb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocm9sZS5yb2xlLCByb2xlLmlkLCAhJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKG9yaWduYWxSb2xlLnJvbGUsIG9yaWduYWxSb2xlLmlkLCAhJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIuc3luYygpO1xuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIubGlzdGVuKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmVlZExvZ2luID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUuZGF0YS5uZWVkTG9naW4pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0b1N0YXRlLmRhdGEubmVlZExvZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZWVkTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkLCBzdGF0ZSwgc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9IHJvbGU7XG4gICAgICAgICAgICAkY29va2llcy5wdXQoJ2ZkX2FjdGl2ZV9yb2xlJywgcm9sZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RhdGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gJHN0YXRlLmN1cnJlbnQubmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihzdGF0ZVBhcmFtcykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkc3RhdGUuY3VycmVudC5wYXJhbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyUm9sZVZpZXdzID0gW3tcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcCcsXG4gICAgICAgICAgICAgICAgdmlldzogJ3F1aWNrVXBkYXRlJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWV4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICBpbnZlc3RvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1pbnZlc3RvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygncXVpY2stdXBkYXRlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0JyxcbiAgICAgICAgICAgICAgICB2aWV3OiAnbWFpbkAnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWp1cnknKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAuY29udGVzdHMnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWNyZWF0b3InKSxcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LWp1cnknKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9IEFQSS5wYXRoKCdjcmVhdG9ycy8nKSArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzogbW9kZWwgPSBBUEkucGF0aCgnaW52ZXN0b3JzLycpICsgcm9sZUlkXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldChtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcm9sZV0gPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMsIHtyZWxvYWQ6IHJlbG9hZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFzIFVzZXIgUm9sZVxuXG4gICAgICAgICRyb290U2NvcGUuaGFzVXNlclJvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYW5pbWF0ZVByb3ZpZGVyKXtcbiAgICBcdCRhbmltYXRlUHJvdmlkZXIuY2xhc3NOYW1lRmlsdGVyKC9mZC1hbmltYXRlLyk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyLCBBUElQcm92aWRlcil7XG4gICAgICAgIC8vIFNhdGVsbGl6ZXIgY29uZmlndXJhdGlvbiB0aGF0IHNwZWNpZmllcyB3aGljaCBBUElcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cbiAgICAgICAgJGF1dGhQcm92aWRlci5sb2dpblVybCA9IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUnKTtcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUvbGlua2VkaW4nKSxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmk6IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUvbGlua2VkaW4nKSxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ3N0YXRlJ10sXG4gICAgICAgICAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnc2VsZidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgICAgICAgICAgY2xpZW50SWQ6ICcxMDQyMjQ3NzI3MDkxLWRtcWM1NWFmN3RsNThoMnJxdjNwcW5ybWpqYmI5NzMzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAgICAgICAgIHVybDogQVBJUHJvdmlkZXIuJGdldCgpLnBhdGgoJ2F1dGhlbnRpY2F0ZS9nb29nbGUnKSxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiBBUElQcm92aWRlci4kZ2V0KCkucGF0aCgnYXV0aGVudGljYXRlL2dvb2dsZScpLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc2NvcGUnXSxcbiAgICAgICAgICAgIG9wdGlvbmFsVXJsUGFyYW1zOiBbJ2Rpc3BsYXknXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlUHJlZml4OiAnb3BlbmlkJyxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcbiAgICAgICAgICAgIGNsaWVudElkOiAnOTAwNTMzMTIzMzk1OTIwJyxcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICB1cmw6IEFQSVByb3ZpZGVyLiRnZXQoKS5wYXRoKCdhdXRoZW50aWNhdGUvZmFjZWJvb2snKSxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS92Mi41L2RpYWxvZy9vYXV0aCcsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogQVBJUHJvdmlkZXIuJGdldCgpLnBhdGgoJ2F1dGhlbnRpY2F0ZS9mYWNlYm9vaycpLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnZGlzcGxheScsICdzY29wZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKGZsb3dGYWN0b3J5UHJvdmlkZXIsIEFQSVByb3ZpZGVyKXtcblxuICAgICAgICBmbG93RmFjdG9yeVByb3ZpZGVyLmRlZmF1bHRzID0ge1xuICAgICAgICBcdHVwbG9hZE1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdGFyZ2V0OiBBUElQcm92aWRlci4kZ2V0KCkucGF0aCgnZmlsZXMnKSxcbiAgICAgICAgICAgIHBlcm1hbmVudEVycm9yczpbNDA0LCA1MDAsIDUwMV1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcil7XG5cdFx0Ly8gJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLnBvc3RbJ0NvbnRlbnQtVHlwZSddID0gJ3RleHQvcGxhaW4nO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbihsYWRkYVByb3ZpZGVyKSB7XG5cbiAgICAgICAgbGFkZGFQcm92aWRlci5zZXRPcHRpb24oe1xuICAgICAgICAgICAgc3R5bGU6ICdleHBhbmQtcmlnaHQnLFxuICAgICAgICAgICAgc3Bpbm5lclNpemU6IDM1LFxuICAgICAgICAgICAgc3Bpbm5lckNvbG9yOiAnI2ZmZmZmZidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnZmRDaGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICc8Y2FudmFzIGlkPVwiZmRDaGFydFwiIHdpZHRoPVwie3t3aWR0aH19XCIgaGVpZ2h0PVwie3toZWlnaHR9fVwiPjwvY2FudmFzPicsXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUud2lkdGggPSAkYXR0cnMud2lkdGg7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhlaWdodCA9ICRhdHRycy5oZWlnaHQ7XG5cblxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLndpZHRoKCRhdHRycy53aWR0aCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuaGVpZ2h0KCRhdHRycy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBpZURhdGFBID0gW3tcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiMwMjc1M2ZcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUHVibGljXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5NixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzk0YzQ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzhjYmE0N1wiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGdW5kYXRvclwiXG4gICAgICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgICAgICB2YXIgbGluZURhdGFBID0ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBsYW5uZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzY1LCA2MCwgNTksIDYzLCA1OSwgNTgsIDYzLCA2NCwgNjUsIDY2LCA3MCwgNzldXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlJlYWxpemVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzkzQzY1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzkzQzY1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFsyOCwgMjIsIDE2LCAyMSwgMTcsIDIwLCAyNywgMjUsIDIzLCAzMiwgNDAsIDQ1XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmKCRhdHRycy5kYXRhID09PSAnQScpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gJGVsZW1lbnQuZmluZCgnY2FudmFzJylbMF0uZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmRDaGFydCA9IG5ldyBDaGFydChjdHgpLlBpZShwaWVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJwaWUtY2hhcnQtbGFiZWxzXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShwaWVEYXRhQSkuZWFjaChmdW5jdGlvbihpLCB0aGVfaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5waWUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJwaWUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcrdGhlX2l0ZW0uY29sb3IrJztcIj48L3NwYW4+ICcrdGhlX2l0ZW0udmFsdWUrJyUgJyt0aGVfaXRlbS5sYWJlbCsnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gJGVsZW1lbnQuZmluZCgnY2FudmFzJylbMF0uZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmRDaGFydCA9IG5ldyBDaGFydChjdHgpLkxpbmUobGluZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxzXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMwMDY4Mzc7XCI+PC9zcGFuPiBSZWFsaXplZDwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjOTNDNjU4O1wiPjwvc3Bhbj4gUGxhbm5lZDwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG5cdC5kaXJlY3RpdmUoJ2ZkTG9hZGVyJywgZnVuY3Rpb24oKSB7XG5cdCAgcmV0dXJuIHtcblx0ICBcdHNjb3BlOiB7XG5cdCAgXHRcdHZpZXdCb3g6ICdAJ1xuXHQgIFx0fSxcblx0ICAgIHJlc3RyaWN0OiAnRScsXG5cdCAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJmZC1sb2FkZXIgbGEtYmFsbC1wdWxzZVwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicsXG5cdCAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0ICAgIFx0JGVsZW1lbnQuYWRkQ2xhc3MoJGF0dHJzLmNsYXNzKTtcblx0ICAgIH1cblx0ICB9O1xuXHR9KTtcbn0pKCk7XG5cbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnZmRNZXNzZW5nZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcmVzb3VyY2UsICR0aW1lb3V0LCBBUEkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImNoYXRib3hcIiBuZy1pZj1cInRocmVhZElkXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGF0Um93XCIgbmctcmVwZWF0PVwibWVzc2FnZSBpbiBtZXNzYWdlc1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXQtdXNlclNlbmRib3hcIiBuZy1jbGFzcz1cIntcXCdjaGF0LXNlbmRcXCc6IHVzZXIuaWQgPT0gbWVzc2FnZS51c2VyLmlkLCBcXCdjaGF0LWNvbWVpblxcJzogdXNlci5pZCAhPSBtZXNzYWdlLnVzZXIuaWR9XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPnt7bWVzc2FnZS5ib2R5fX08L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhaHQtbGFiZWxcIiBuZy1jbGFzcz1cXCd7XCJ0ZXh0LXJpZ2h0XCI6IHVzZXIuaWQgPT0gbWVzc2FnZS51c2VyLmlkfVxcJz4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICd7e21lc3NhZ2UudXNlci5uYW1lfX0gPHNwYW4+e3ttZXNzYWdlLmNyZWF0ZWRfYXQgfCBhbURhdGVGb3JtYXQ6XCJNTU0gRG8gWVlZWVwifX06PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8cCBjbGFzcz1cIm5vLWhhdmUgbm8tbWFyZ2luXCIgbmctaWY9XCJtZXNzYWdlcy5sZW5ndGggPT09IDBcIj5UaGVyZSBhcmUgY3VycmVudGx5IG5vIG1lc3NhZ2VzLjwvcD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8Zm9ybSBjbGFzcz1cImNoYXRzZW5kZm9ybVwiIG5nLWlmPVwidGhyZWFkSWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBtZXNzYWdlIGhlcmUgLi4uXCIgbmctbW9kZWw9XCJkYXRhLm1lc3NhZ2VUb1NlbmRcIiBmZC1lbnRlcj1cInNlbmRNZXNzYWdlKClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gc2VuZGJ0blwiIG5nLWNsaWNrPVwic2VuZE1lc3NhZ2UoKVwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uXCI+U2VuZDwvc3Bhbj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZm9ybT4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgdGhyZWFkSWQ6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhID0ge307XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlciA9ICRyb290U2NvcGUudXNlcjtcblxuICAgICAgICAgICAgICAgIHZhciBNZXNzYWdlID0gJHJlc291cmNlKCcvYXBpL21lc3NhZ2VzLzp0aHJlYWRJZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyZWFkSWQ6ICdAaWQnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ3RocmVhZElkJywgZnVuY3Rpb24odGhyZWFkSWQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRocmVhZElkKSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhyZWFkSWQgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBNZXNzYWdlLmdldCh7dGhyZWFkSWQ6ICRzY29wZS50aHJlYWRJZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXRyaXZpbmcgdGhlIHRocmVhZCA6ICcgKyAkc2NvcGUudGhyZWFkSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRocmVhZF9pZCA9ICRzY29wZS50aHJlYWRJZDtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlID0gJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZDtcblxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICBcdHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCduZ01pbicsIGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHJlc3RyaWN0OiAnQScsXG4gICAgXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgXHRcdFx0c2NvcGUuJHdhdGNoKGF0dHIubmdNaW4sIGZ1bmN0aW9uICgpIHtcbiAgICBcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShjdHJsLiR2aWV3VmFsdWUpO1xuICAgIFx0XHRcdH0pO1xuICAgIFx0XHRcdHZhciBtaW5WYWxpZGF0b3IgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21pblZhbGlkYXRvcicpO1xuICAgIFx0XHRcdFx0dmFyIG1pbiA9IHNjb3BlLiRldmFsKGF0dHIubmdNaW4pIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1pbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlIDwgbWluKTtcbiAgICBcdFx0XHRcdGlmICghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPCBtaW4pIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgZmFsc2UpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuICAgIFx0XHRcdFx0fSBlbHNlIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgdHJ1ZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9O1xuXG4gICAgXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdH1cbiAgICBcdH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbmdNYXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHRyZXN0cmljdDogJ0EnLFxuICAgIFx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgIFx0XHRcdHNjb3BlLiR3YXRjaChhdHRyLm5nTWF4LCBmdW5jdGlvbiAoKSB7XG4gICAgXHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoY3RybC4kdmlld1ZhbHVlKTtcbiAgICBcdFx0XHR9KTtcbiAgICBcdFx0XHR2YXIgbWF4VmFsaWRhdG9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXhWYWxpZGF0b3InKTtcbiAgICBcdFx0XHRcdHZhciBtYXggPSBzY29wZS4kZXZhbChhdHRyLm5nTWF4KSB8fCBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWF4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPiBtYXgpO1xuICAgIFx0XHRcdFx0aWYgKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA+IG1heCkge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCBmYWxzZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG4gICAgXHRcdFx0XHR9IGVsc2Uge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCB0cnVlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH07XG5cbiAgICBcdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZmRFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLmZkRW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ251bWJlcnNPbmx5JywgZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsQ3RybCkge1xuXG4gICAgICAgICAgICAgbW9kZWxDdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24gKGlucHV0VmFsdWUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1lZElucHV0ID0gaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG5cbiAgICAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1lZElucHV0IT1pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRyYW5zZm9ybWVkSW5wdXQpO1xuICAgICAgICAgICAgICAgICBtb2RlbEN0cmwuJHJlbmRlcigpO1xuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZElucHV0O1xuICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkUHJvZmlsZUlucHV0JywgZnVuY3Rpb24oJGNvbXBpbGUsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGZvcm06ICdAJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnQCcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICdAJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0AnLFxuICAgICAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgICAgIGZhY2Vib29rVmFsdWU6ICc9JyxcbiAgICAgICAgICAgICAgICBsaW5rZWRpblZhbHVlOiAnPSdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgICRzY29wZS5mb3JtRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29uZGl0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzUHJpc3RpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS52YWxpZGF0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICRzY29wZS52YWxpZGF0aW9uTWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlcGxhY2VWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgICBcdCRzY29wZS5uZ01vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctbW9kZWw9XCJuZ01vZGVsXCI+JyxcbiAgICAgICAgICAgICAgICAgICAgJ3RleHRhcmVhJzogJzx0ZXh0YXJlYSBjbGFzcz1cInRleHRhcmVhIGZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgcm93cz1cIjZcIj48L3RleHRhcmVhPicsXG4gICAgICAgICAgICAgICAgICAgIC8vICdlbWFpbCc6ICc8aW5wdXQgbmFtZT1cInt7ZmllbGR9fVwiIHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LWxnXCIgbmctZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cInVwZGF0ZSgpXCI+ICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICdkcm9wZG93bic6ICc8ZGl2IGNsYXNzPVwic2VsZWN0LXdyYXBlciBmdWxsXCI+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tYXJyb3ctYm90dG9tXCI+PC9zcGFuPjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbGdcIiBuZy1vcHRpb25zPVwidmFsdWUudmFsdWUgYXMgdmFsdWUubmFtZSBmb3IgdmFsdWUgaW4gdmFsdWVzXCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctY2hhbmdlPVwidXBkYXRlKClcIj48L3NlbGVjdD48L2Rpdj4nLFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1skc2NvcGUudHlwZV07XG5cbiAgICAgICAgICAgICAgICB2YXIgc29jaWFsQWx0ZXJuYXRpdmUgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSAhPT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgIFx0c29jaWFsQWx0ZXJuYXRpdmUgPSAnPGRpdiBjbGFzcz1cInNvY2lhbC1hbHRlcm5hdGl2ZVwiPicgK1xuICAgICAgICAgICAgICAgIFx0JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWZhY2Vib29rXCIgdWliLXRvb2x0aXA9XCJ7e2ZhY2Vib29rVmFsdWV9fVwiIG5nLWNsYXNzPVwie1xcJ2NoZWNrZWRcXCc6IChuZ01vZGVsID09PSBmYWNlYm9va1ZhbHVlKSAmJiBuZ01vZGVsICE9PSBcXCdcXCd9XCIgbmctZGlzYWJsZWQ9XCIhZmFjZWJvb2tWYWx1ZVwiIG5nLWNsaWNrPVwicmVwbGFjZVZhbHVlKGZhY2Vib29rVmFsdWUpXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgIFx0JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWxpbmtlZGluMlwiIHVpYi10b29sdGlwPVwie3tsaW5rZWRpblZhbHVlfX1cIiBuZy1jbGFzcz1cIntcXCdjaGVja2VkXFwnOiAobmdNb2RlbCA9PT0gbGlua2VkaW5WYWx1ZSkgJiYgbmdNb2RlbCAhPT0gXFwnXFwnfVwiIG5nLWRpc2FibGVkPVwiIWxpbmtlZGluVmFsdWVcIiBuZy1jbGljaz1cInJlcGxhY2VWYWx1ZShsaW5rZWRpblZhbHVlKVwiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICBcdCc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9XG5cdCAgICAgICAgICAgICAgICAnPGRpdj4nICtcblx0ICAgICAgICAgICAgICAgICc8bGFiZWw+e3tsYWJlbH19OjwvbGFiZWw+JyArXG5cdCAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcblx0ICAgICAgICAgICAgICAgIFx0ZmllbGQgK1xuXHQgICAgICAgICAgICAgICAgXHRzb2NpYWxBbHRlcm5hdGl2ZSArXG5cdCAgICAgICAgICAgICAgICAnPC9kaXY+PC9kaXY+JztcblxuICAgICAgICAgICAgICAgICRlbGVtZW50Lmh0bWwoJGNvbXBpbGUodGVtcGxhdGUpKCRzY29wZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5mYWN0b3J5KCdGZE5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcSwgJGludGVydmFsLCAkaHR0cCwgJHN0YXRlLCBBUEkpIHtcbiAgICAgICAgdmFyIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zOiBbXSxcbiAgICAgICAgICAgIHVucmVhZDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdXNoTm90aWZpY2F0aW9uID0gZnVuY3Rpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMubm90aWZpY2F0aW9ucy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG5vdGlmaWNhdGlvbnMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdub3RpZmljYXRpb25zLycpICsgdXNlci5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uc0ludGVydmFsID0gJGludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsTm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXRlc3ROb3RpZmljYXRpb25zID0gYW5ndWxhci5jb3B5KGdsb2JhbE5vdGlmaWNhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zID0gbGF0ZXN0Tm90aWZpY2F0aW9ucy5ub3RpZmljYXRpb25zLnNsaWNlKDAsIDUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKG5vdGlmaWNhdGlvbnNJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQucmVzb2x2ZShsYXRlc3ROb3RpZmljYXRpb25zKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZE5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJLnBhdGgoJ25vdGlmaWNhdGlvbnMvJykgKyBub3RpZmljYXRpb25JZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBcdG5vdGlmaWNhdGlvbi5yZWFkID0gMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkQWxsTm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJLnBhdGgoJ25vdGlmaWNhdGlvbnMvdXNlci8nKSArICRyb290U2NvcGUudXNlci5pZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucy51bnJlYWQgPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG5vdGlmaWNhdGlvblRyaWdnZXI6IGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoKGNhdGVnb3J5KXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAnZG93bmxvYWQubmV3JzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmRvd25sb2FkcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5wYWlyZWQnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQucGFydG5lci5kZXRhaWxzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICdwYXJ0bmVyLnN0dWR5X3BlcmlvZHMnOiAkc3RhdGUuZ28oJ2FwcC5kYXNoYm9hcmQuY291cnNlcy5wZXJpb2RzJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlICd1c2VyLmNyZWF0ZWQnOiAkc3RhdGUuZ28oVGFza3NTZXJ2aWNlLm5leHRUYXNrKCkudmlldyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBnZXROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlLCBwdXNoKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AodHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHB1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmeUVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0b2FzdGVyLnBvcCgnZXJyb3InLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnRmRTY3JvbGxlcicsIGZ1bmN0aW9uKCR3aW5kb3cpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sICc1MDAnLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1NlY3Rpb246IGZ1bmN0aW9uKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIFx0dmFyICRzZWN0aW9uID0gJChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJHNlY3Rpb24pO1xuICAgICAgICAgICAgXHRpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXHRcdHZhciB0b3AgPSAkc2VjdGlvbi5vZmZzZXQoKS50b3AgLSA3MDtcblxuICAgICAgICAgICAgXHRcdHZhciBib2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgICAgIFx0Ym9keS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICBcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignc3RyaXBUYWdzJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKFN0cmluZy5mcm9tQ2hhckNvZGUoMTYwKSwgXCJnXCIpO1xuXHRcdFx0XHR0ZXh0ID0gU3RyaW5nKHRleHQpLnJlcGxhY2UocmUsIFwiIFwiKTtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgXCJcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLyZuYnNwOy9naSwnICcpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dCA/IFN0cmluZyh0ZXh0KS5yZXBsYWNlKC88W14+XSs+L2dtLCAnJykgOiAnJztcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJykuZmlsdGVyKCdjbGVhbkh0bWwnLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG5cblx0XHRcdGlmICh0eXBlb2YodGV4dCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0fVxuXG5cdCAgICAgXHRyZXR1cm4gdGV4dDtcblx0ICAgIH07XG5cdCAgfVxuXHQpO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnZhbHVlKCdDb3VudHJpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQWZnaGFuaXN0YW5cIiwgXCJjb2RlXCI6IFwiQUZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCLDhWxhbmQgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJBWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFsYmFuaWFcIiwgXCJjb2RlXCI6IFwiQUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbGdlcmlhXCIsIFwiY29kZVwiOiBcIkRaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW1lcmljYW4gU2Ftb2FcIiwgXCJjb2RlXCI6IFwiQVNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbmRvcnJBXCIsIFwiY29kZVwiOiBcIkFEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5nb2xhXCIsIFwiY29kZVwiOiBcIkFPXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW5ndWlsbGFcIiwgXCJjb2RlXCI6IFwiQUlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBbnRhcmN0aWNhXCIsIFwiY29kZVwiOiBcIkFRXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiLCBcImNvZGVcIjogXCJBR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFyZ2VudGluYVwiLCBcImNvZGVcIjogXCJBUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkFybWVuaWFcIiwgXCJjb2RlXCI6IFwiQU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBcnViYVwiLCBcImNvZGVcIjogXCJBV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkF1c3RyYWxpYVwiLCBcImNvZGVcIjogXCJBVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkF1c3RyaWFcIiwgXCJjb2RlXCI6IFwiQVRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJBemVyYmFpamFuXCIsIFwiY29kZVwiOiBcIkFaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFoYW1hc1wiLCBcImNvZGVcIjogXCJCU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJhaHJhaW5cIiwgXCJjb2RlXCI6IFwiQkhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCYW5nbGFkZXNoXCIsIFwiY29kZVwiOiBcIkJEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmFyYmFkb3NcIiwgXCJjb2RlXCI6IFwiQkJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCZWxhcnVzXCIsIFwiY29kZVwiOiBcIkJZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVsZ2l1bVwiLCBcImNvZGVcIjogXCJCRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbGl6ZVwiLCBcImNvZGVcIjogXCJCWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJlbmluXCIsIFwiY29kZVwiOiBcIkJKXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQmVybXVkYVwiLCBcImNvZGVcIjogXCJCTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJodXRhblwiLCBcImNvZGVcIjogXCJCVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJvbGl2aWFcIiwgXCJjb2RlXCI6IFwiQk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb3NuaWEgYW5kIEhlcnplZ292aW5hXCIsIFwiY29kZVwiOiBcIkJBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQm90c3dhbmFcIiwgXCJjb2RlXCI6IFwiQldcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCb3V2ZXQgSXNsYW5kXCIsIFwiY29kZVwiOiBcIkJWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnJhemlsXCIsIFwiY29kZVwiOiBcIkJSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQnJ1bmVpIERhcnVzc2FsYW1cIiwgXCJjb2RlXCI6IFwiQk5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJCdWxnYXJpYVwiLCBcImNvZGVcIjogXCJCR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJ1cmtpbmEgRmFzb1wiLCBcImNvZGVcIjogXCJCRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkJ1cnVuZGlcIiwgXCJjb2RlXCI6IFwiQklcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDYW1ib2RpYVwiLCBcImNvZGVcIjogXCJLSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNhbWVyb29uXCIsIFwiY29kZVwiOiBcIkNNXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FuYWRhXCIsIFwiY29kZVwiOiBcIkNBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2FwZSBWZXJkZVwiLCBcImNvZGVcIjogXCJDVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNheW1hbiBJc2xhbmRzXCIsIFwiY29kZVwiOiBcIktZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIkNGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hhZFwiLCBcImNvZGVcIjogXCJURFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNoaWxlXCIsIFwiY29kZVwiOiBcIkNMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ2hpbmFcIiwgXCJjb2RlXCI6IFwiQ05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDaHJpc3RtYXMgSXNsYW5kXCIsIFwiY29kZVwiOiBcIkNYXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ29jb3MgKEtlZWxpbmcpIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQ0NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb2xvbWJpYVwiLCBcImNvZGVcIjogXCJDT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvbW9yb3NcIiwgXCJjb2RlXCI6IFwiS01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb25nb1wiLCBcImNvZGVcIjogXCJDR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNvbmdvLCBUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGVcIiwgXCJjb2RlXCI6IFwiQ0RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb29rIElzbGFuZHNcIiwgXCJjb2RlXCI6IFwiQ0tcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDb3N0YSBSaWNhXCIsIFwiY29kZVwiOiBcIkNSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ290ZSBEXFxcIkl2b2lyZVwiLCBcImNvZGVcIjogXCJDSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkNyb2F0aWFcIiwgXCJjb2RlXCI6IFwiSFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJDdWJhXCIsIFwiY29kZVwiOiBcIkNVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3lwcnVzXCIsIFwiY29kZVwiOiBcIkNZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiQ3plY2ggUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiQ1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEZW5tYXJrXCIsIFwiY29kZVwiOiBcIkRLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRGppYm91dGlcIiwgXCJjb2RlXCI6IFwiREpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJEb21pbmljYVwiLCBcImNvZGVcIjogXCJETVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkRvbWluaWNhbiBSZXB1YmxpY1wiLCBcImNvZGVcIjogXCJET1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVjdWFkb3JcIiwgXCJjb2RlXCI6IFwiRUNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFZ3lwdFwiLCBcImNvZGVcIjogXCJFR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkVsIFNhbHZhZG9yXCIsIFwiY29kZVwiOiBcIlNWXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXF1YXRvcmlhbCBHdWluZWFcIiwgXCJjb2RlXCI6IFwiR1FcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJFcml0cmVhXCIsIFwiY29kZVwiOiBcIkVSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRXN0b25pYVwiLCBcImNvZGVcIjogXCJFRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkV0aGlvcGlhXCIsIFwiY29kZVwiOiBcIkVUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpXCIsIFwiY29kZVwiOiBcIkZLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRmFyb2UgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJGT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZpamlcIiwgXCJjb2RlXCI6IFwiRkpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGaW5sYW5kXCIsIFwiY29kZVwiOiBcIkZJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJhbmNlXCIsIFwiY29kZVwiOiBcIkZSXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiRnJlbmNoIEd1aWFuYVwiLCBcImNvZGVcIjogXCJHRlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkZyZW5jaCBQb2x5bmVzaWFcIiwgXCJjb2RlXCI6IFwiUEZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXNcIiwgXCJjb2RlXCI6IFwiVEZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHYWJvblwiLCBcImNvZGVcIjogXCJHQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdhbWJpYVwiLCBcImNvZGVcIjogXCJHTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkdlb3JnaWFcIiwgXCJjb2RlXCI6IFwiR0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHZXJtYW55XCIsIFwiY29kZVwiOiBcIkRFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR2hhbmFcIiwgXCJjb2RlXCI6IFwiR0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHaWJyYWx0YXJcIiwgXCJjb2RlXCI6IFwiR0lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVlY2VcIiwgXCJjb2RlXCI6IFwiR1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVlbmxhbmRcIiwgXCJjb2RlXCI6IFwiR0xcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHcmVuYWRhXCIsIFwiY29kZVwiOiBcIkdEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiR3VhZGVsb3VwZVwiLCBcImNvZGVcIjogXCJHUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1YW1cIiwgXCJjb2RlXCI6IFwiR1VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWF0ZW1hbGFcIiwgXCJjb2RlXCI6IFwiR1RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdWVybnNleVwiLCBcImNvZGVcIjogXCJHR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1aW5lYVwiLCBcImNvZGVcIjogXCJHTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkd1aW5lYS1CaXNzYXVcIiwgXCJjb2RlXCI6IFwiR1dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJHdXlhbmFcIiwgXCJjb2RlXCI6IFwiR1lcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIYWl0aVwiLCBcImNvZGVcIjogXCJIVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhlYXJkIElzbGFuZCBhbmQgTWNkb25hbGQgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJITVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkhvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpXCIsIFwiY29kZVwiOiBcIlZBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSG9uZHVyYXNcIiwgXCJjb2RlXCI6IFwiSE5cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIb25nIEtvbmdcIiwgXCJjb2RlXCI6IFwiSEtcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJIdW5nYXJ5XCIsIFwiY29kZVwiOiBcIkhVXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSWNlbGFuZFwiLCBcImNvZGVcIjogXCJJU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkluZGlhXCIsIFwiY29kZVwiOiBcIklOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSW5kb25lc2lhXCIsIFwiY29kZVwiOiBcIklEXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBPZlwiLCBcImNvZGVcIjogXCJJUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIklyYXFcIiwgXCJjb2RlXCI6IFwiSVFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJcmVsYW5kXCIsIFwiY29kZVwiOiBcIklFXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiSXNsZSBvZiBNYW5cIiwgXCJjb2RlXCI6IFwiSU1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJc3JhZWxcIiwgXCJjb2RlXCI6IFwiSUxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJJdGFseVwiLCBcImNvZGVcIjogXCJJVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkphbWFpY2FcIiwgXCJjb2RlXCI6IFwiSk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJKYXBhblwiLCBcImNvZGVcIjogXCJKUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkplcnNleVwiLCBcImNvZGVcIjogXCJKRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkpvcmRhblwiLCBcImNvZGVcIjogXCJKT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkthemFraHN0YW5cIiwgXCJjb2RlXCI6IFwiS1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLZW55YVwiLCBcImNvZGVcIjogXCJLRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIktpcmliYXRpXCIsIFwiY29kZVwiOiBcIktJXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiS29yZWEsIERlbW9jcmF0aWMgUGVvcGxlXFxcIlMgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiS1BcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLb3JlYSwgUmVwdWJsaWMgb2ZcIiwgXCJjb2RlXCI6IFwiS1JcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLdXdhaXRcIiwgXCJjb2RlXCI6IFwiS1dcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJLeXJneXpzdGFuXCIsIFwiY29kZVwiOiBcIktHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGFvIFBlb3BsZVxcXCJTIERlbW9jcmF0aWMgUmVwdWJsaWNcIiwgXCJjb2RlXCI6IFwiTEFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMYXR2aWFcIiwgXCJjb2RlXCI6IFwiTFZcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMZWJhbm9uXCIsIFwiY29kZVwiOiBcIkxCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGVzb3Rob1wiLCBcImNvZGVcIjogXCJMU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpYmVyaWFcIiwgXCJjb2RlXCI6IFwiTFJcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJMaWJ5YW4gQXJhYiBKYW1haGlyaXlhXCIsIFwiY29kZVwiOiBcIkxZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTGllY2h0ZW5zdGVpblwiLCBcImNvZGVcIjogXCJMSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkxpdGh1YW5pYVwiLCBcImNvZGVcIjogXCJMVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIkx1eGVtYm91cmdcIiwgXCJjb2RlXCI6IFwiTFVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWNhb1wiLCBcImNvZGVcIjogXCJNT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hY2Vkb25pYSwgVGhlIEZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJNS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hZGFnYXNjYXJcIiwgXCJjb2RlXCI6IFwiTUdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxhd2lcIiwgXCJjb2RlXCI6IFwiTVdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYWxheXNpYVwiLCBcImNvZGVcIjogXCJNWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbGRpdmVzXCIsIFwiY29kZVwiOiBcIk1WXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFsaVwiLCBcImNvZGVcIjogXCJNTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hbHRhXCIsIFwiY29kZVwiOiBcIk1UXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWFyc2hhbGwgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJNSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1hcnRpbmlxdWVcIiwgXCJjb2RlXCI6IFwiTVFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNYXVyaXRhbmlhXCIsIFwiY29kZVwiOiBcIk1SXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF1cml0aXVzXCIsIFwiY29kZVwiOiBcIk1VXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTWF5b3R0ZVwiLCBcImNvZGVcIjogXCJZVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1leGljb1wiLCBcImNvZGVcIjogXCJNWFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2ZcIiwgXCJjb2RlXCI6IFwiRk1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb2xkb3ZhLCBSZXB1YmxpYyBvZlwiLCBcImNvZGVcIjogXCJNRFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbmFjb1wiLCBcImNvZGVcIjogXCJNQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vbmdvbGlhXCIsIFwiY29kZVwiOiBcIk1OXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTW9udHNlcnJhdFwiLCBcImNvZGVcIjogXCJNU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk1vcm9jY29cIiwgXCJjb2RlXCI6IFwiTUFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJNb3phbWJpcXVlXCIsIFwiY29kZVwiOiBcIk1aXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTXlhbm1hclwiLCBcImNvZGVcIjogXCJNTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5hbWliaWFcIiwgXCJjb2RlXCI6IFwiTkFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOYXVydVwiLCBcImNvZGVcIjogXCJOUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5lcGFsXCIsIFwiY29kZVwiOiBcIk5QXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmV0aGVybGFuZHNcIiwgXCJjb2RlXCI6IFwiTkxcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXRoZXJsYW5kcyBBbnRpbGxlc1wiLCBcImNvZGVcIjogXCJBTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5ldyBDYWxlZG9uaWFcIiwgXCJjb2RlXCI6IFwiTkNcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOZXcgWmVhbGFuZFwiLCBcImNvZGVcIjogXCJOWlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pY2FyYWd1YVwiLCBcImNvZGVcIjogXCJOSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pZ2VyXCIsIFwiY29kZVwiOiBcIk5FXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiTmlnZXJpYVwiLCBcImNvZGVcIjogXCJOR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5pdWVcIiwgXCJjb2RlXCI6IFwiTlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJOb3Jmb2xrIElzbGFuZFwiLCBcImNvZGVcIjogXCJORlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJNUFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk5vcndheVwiLCBcImNvZGVcIjogXCJOT1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIk9tYW5cIiwgXCJjb2RlXCI6IFwiT01cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYWtpc3RhblwiLCBcImNvZGVcIjogXCJQS1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbGF1XCIsIFwiY29kZVwiOiBcIlBXXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUGFsZXN0aW5pYW4gVGVycml0b3J5LCBPY2N1cGllZFwiLCBcImNvZGVcIjogXCJQU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhbmFtYVwiLCBcImNvZGVcIjogXCJQQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBhcHVhIE5ldyBHdWluZWFcIiwgXCJjb2RlXCI6IFwiUEdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQYXJhZ3VheVwiLCBcImNvZGVcIjogXCJQWVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBlcnVcIiwgXCJjb2RlXCI6IFwiUEVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQaGlsaXBwaW5lc1wiLCBcImNvZGVcIjogXCJQSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlBpdGNhaXJuXCIsIFwiY29kZVwiOiBcIlBOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUG9sYW5kXCIsIFwiY29kZVwiOiBcIlBMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUG9ydHVnYWxcIiwgXCJjb2RlXCI6IFwiUFRcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJQdWVydG8gUmljb1wiLCBcImNvZGVcIjogXCJQUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlFhdGFyXCIsIFwiY29kZVwiOiBcIlFBXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiUmV1bmlvblwiLCBcImNvZGVcIjogXCJSRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlJvbWFuaWFcIiwgXCJjb2RlXCI6IFwiUk9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSdXNzaWFuIEZlZGVyYXRpb25cIiwgXCJjb2RlXCI6IFwiUlVcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJSV0FOREFcIiwgXCJjb2RlXCI6IFwiUldcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBIZWxlbmFcIiwgXCJjb2RlXCI6IFwiU0hcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBLaXR0cyBhbmQgTmV2aXNcIiwgXCJjb2RlXCI6IFwiS05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBMdWNpYVwiLCBcImNvZGVcIjogXCJMQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhaW50IFBpZXJyZSBhbmQgTWlxdWVsb25cIiwgXCJjb2RlXCI6IFwiUE1cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTYWludCBWaW5jZW50IGFuZCB0aGUgR3JlbmFkaW5lc1wiLCBcImNvZGVcIjogXCJWQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbW9hXCIsIFwiY29kZVwiOiBcIldTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2FuIE1hcmlub1wiLCBcImNvZGVcIjogXCJTTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiLCBcImNvZGVcIjogXCJTVFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNhdWRpIEFyYWJpYVwiLCBcImNvZGVcIjogXCJTQVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNlbmVnYWxcIiwgXCJjb2RlXCI6IFwiU05cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZXJiaWEgYW5kIE1vbnRlbmVncm9cIiwgXCJjb2RlXCI6IFwiQ1NcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTZXljaGVsbGVzXCIsIFwiY29kZVwiOiBcIlNDXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2llcnJhIExlb25lXCIsIFwiY29kZVwiOiBcIlNMXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2luZ2Fwb3JlXCIsIFwiY29kZVwiOiBcIlNHXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU2xvdmFraWFcIiwgXCJjb2RlXCI6IFwiU0tcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTbG92ZW5pYVwiLCBcImNvZGVcIjogXCJTSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNvbG9tb24gSXNsYW5kc1wiLCBcImNvZGVcIjogXCJTQlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNvbWFsaWFcIiwgXCJjb2RlXCI6IFwiU09cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb3V0aCBBZnJpY2FcIiwgXCJjb2RlXCI6IFwiWkFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLCBcImNvZGVcIjogXCJHU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlNwYWluXCIsIFwiY29kZVwiOiBcIkVTXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3JpIExhbmthXCIsIFwiY29kZVwiOiBcIkxLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiU3VkYW5cIiwgXCJjb2RlXCI6IFwiU0RcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTdXJpbmFtZVwiLCBcImNvZGVcIjogXCJTUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN2YWxiYXJkIGFuZCBKYW4gTWF5ZW5cIiwgXCJjb2RlXCI6IFwiU0pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2F6aWxhbmRcIiwgXCJjb2RlXCI6IFwiU1pcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2VkZW5cIiwgXCJjb2RlXCI6IFwiU0VcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJTd2l0emVybGFuZFwiLCBcImNvZGVcIjogXCJDSFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlN5cmlhbiBBcmFiIFJlcHVibGljXCIsIFwiY29kZVwiOiBcIlNZXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYVwiLCBcImNvZGVcIjogXCJUV1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRhamlraXN0YW5cIiwgXCJjb2RlXCI6IFwiVEpcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mXCIsIFwiY29kZVwiOiBcIlRaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVGhhaWxhbmRcIiwgXCJjb2RlXCI6IFwiVEhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUaW1vci1MZXN0ZVwiLCBcImNvZGVcIjogXCJUTFwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlRvZ29cIiwgXCJjb2RlXCI6IFwiVEdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUb2tlbGF1XCIsIFwiY29kZVwiOiBcIlRLXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVG9uZ2FcIiwgXCJjb2RlXCI6IFwiVE9cIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJUcmluaWRhZCBhbmQgVG9iYWdvXCIsIFwiY29kZVwiOiBcIlRUXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVHVuaXNpYVwiLCBcImNvZGVcIjogXCJUTlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmtleVwiLCBcImNvZGVcIjogXCJUUlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmttZW5pc3RhblwiLCBcImNvZGVcIjogXCJUTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1cmtzIGFuZCBDYWljb3MgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJUQ1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlR1dmFsdVwiLCBcImNvZGVcIjogXCJUVlwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVnYW5kYVwiLCBcImNvZGVcIjogXCJVR1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVrcmFpbmVcIiwgXCJjb2RlXCI6IFwiVUFcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiLCBcImNvZGVcIjogXCJBRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBLaW5nZG9tXCIsIFwiY29kZVwiOiBcIkdCXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVW5pdGVkIFN0YXRlc1wiLCBcImNvZGVcIjogXCJVU1wiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kc1wiLCBcImNvZGVcIjogXCJVTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlVydWd1YXlcIiwgXCJjb2RlXCI6IFwiVVlcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJVemJla2lzdGFuXCIsIFwiY29kZVwiOiBcIlVaXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmFudWF0dVwiLCBcImNvZGVcIjogXCJWVVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZlbmV6dWVsYVwiLCBcImNvZGVcIjogXCJWRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlZpZXQgTmFtXCIsIFwiY29kZVwiOiBcIlZOXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHMsIEJyaXRpc2hcIiwgXCJjb2RlXCI6IFwiVkdcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kcywgVS5TLlwiLCBcImNvZGVcIjogXCJWSVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIldhbGxpcyBhbmQgRnV0dW5hXCIsIFwiY29kZVwiOiBcIldGXCIgfSxcbiAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiV2VzdGVybiBTYWhhcmFcIiwgXCJjb2RlXCI6IFwiRUhcIiB9LFxuICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJZZW1lblwiLCBcImNvZGVcIjogXCJZRVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlphbWJpYVwiLCBcImNvZGVcIjogXCJaTVwiIH0sXG4gICAgICAgICAgICB7IFwibmFtZVwiOiBcIlppbWJhYndlXCIsIFwiY29kZVwiOiBcIlpXXCIgfVxuICAgICAgICBdO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLnZhbHVlKCdDb3VudHJ5Q29kZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgY29kZTogJzEnLCBjb3VudHJ5OiAnVVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxJywgY291bnRyeTogJ0NBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNycsIGNvdW50cnk6ICdSVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzcnLCBjb3VudHJ5OiAnS1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMCcsIGNvdW50cnk6ICdFRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzI3JywgY291bnRyeTogJ1pBJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzAnLCBjb3VudHJ5OiAnR1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczMScsIGNvdW50cnk6ICdOTCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzMyJywgY291bnRyeTogJ0JFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzMnLCBjb3VudHJ5OiAnRlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNCcsIGNvdW50cnk6ICdFUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzM2JywgY291bnRyeTogJ0hVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMzknLCBjb3VudHJ5OiAnSVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MCcsIGNvdW50cnk6ICdSTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQxJywgY291bnRyeTogJ0NIJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDMnLCBjb3VudHJ5OiAnQVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NCcsIGNvdW50cnk6ICdHQicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ1JywgY291bnRyeTogJ0RLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDYnLCBjb3VudHJ5OiAnU0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NycsIGNvdW50cnk6ICdOTycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ3JywgY291bnRyeTogJ1NKJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDgnLCBjb3VudHJ5OiAnUEwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0OScsIGNvdW50cnk6ICdERScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzUxJywgY291bnRyeTogJ1BFJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTInLCBjb3VudHJ5OiAnTVgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MycsIGNvdW50cnk6ICdDVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU0JywgY291bnRyeTogJ0FSJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTUnLCBjb3VudHJ5OiAnQlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1NicsIGNvdW50cnk6ICdDTCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzU3JywgY291bnRyeTogJ0NPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNTgnLCBjb3VudHJ5OiAnVkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MCcsIGNvdW50cnk6ICdNWScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYxJywgY291bnRyeTogJ0FVJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjEnLCBjb3VudHJ5OiAnQ0MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2MScsIGNvdW50cnk6ICdDWCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzYyJywgY291bnRyeTogJ0lEJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjMnLCBjb3VudHJ5OiAnUEgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NCcsIGNvdW50cnk6ICdOWicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzY0JywgY291bnRyeTogJ1BOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNjUnLCBjb3VudHJ5OiAnU0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NicsIGNvdW50cnk6ICdUSCcgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzgxJywgY291bnRyeTogJ0pQJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnODInLCBjb3VudHJ5OiAnS1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NCcsIGNvdW50cnk6ICdWTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzg2JywgY291bnRyeTogJ0NOJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTAnLCBjb3VudHJ5OiAnVFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5MScsIGNvdW50cnk6ICdJTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzkyJywgY291bnRyeTogJ1BLJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTMnLCBjb3VudHJ5OiAnQUYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NCcsIGNvdW50cnk6ICdMSycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzk1JywgY291bnRyeTogJ01NJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnOTgnLCBjb3VudHJ5OiAnSVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTEnLCBjb3VudHJ5OiAnU1MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTInLCBjb3VudHJ5OiAnTUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTInLCBjb3VudHJ5OiAnRUgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTMnLCBjb3VudHJ5OiAnRFonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTYnLCBjb3VudHJ5OiAnVE4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMTgnLCBjb3VudHJ5OiAnTFknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjAnLCBjb3VudHJ5OiAnR00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjEnLCBjb3VudHJ5OiAnU04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjInLCBjb3VudHJ5OiAnTVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjMnLCBjb3VudHJ5OiAnTUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjQnLCBjb3VudHJ5OiAnR04nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjUnLCBjb3VudHJ5OiAnQ0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjYnLCBjb3VudHJ5OiAnQkYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjcnLCBjb3VudHJ5OiAnTkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjgnLCBjb3VudHJ5OiAnVEcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMjknLCBjb3VudHJ5OiAnQkonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzAnLCBjb3VudHJ5OiAnTVUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzEnLCBjb3VudHJ5OiAnTFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzInLCBjb3VudHJ5OiAnU0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzMnLCBjb3VudHJ5OiAnR0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzQnLCBjb3VudHJ5OiAnTkcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzUnLCBjb3VudHJ5OiAnVEQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzYnLCBjb3VudHJ5OiAnQ0YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzcnLCBjb3VudHJ5OiAnQ00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzgnLCBjb3VudHJ5OiAnQ1YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyMzknLCBjb3VudHJ5OiAnU1QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDAnLCBjb3VudHJ5OiAnR1EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDEnLCBjb3VudHJ5OiAnR0EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDInLCBjb3VudHJ5OiAnQ0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDMnLCBjb3VudHJ5OiAnQ0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDQnLCBjb3VudHJ5OiAnQU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDUnLCBjb3VudHJ5OiAnR1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDYnLCBjb3VudHJ5OiAnSU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDgnLCBjb3VudHJ5OiAnU0MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNDknLCBjb3VudHJ5OiAnU0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTAnLCBjb3VudHJ5OiAnUlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTEnLCBjb3VudHJ5OiAnRVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTInLCBjb3VudHJ5OiAnU08nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTMnLCBjb3VudHJ5OiAnREonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTQnLCBjb3VudHJ5OiAnS0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTUnLCBjb3VudHJ5OiAnVFonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTYnLCBjb3VudHJ5OiAnVUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTcnLCBjb3VudHJ5OiAnQkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNTgnLCBjb3VudHJ5OiAnTVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjAnLCBjb3VudHJ5OiAnWk0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjEnLCBjb3VudHJ5OiAnTUcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjInLCBjb3VudHJ5OiAnWVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjInLCBjb3VudHJ5OiAnUkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjMnLCBjb3VudHJ5OiAnWlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjQnLCBjb3VudHJ5OiAnTkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjUnLCBjb3VudHJ5OiAnTVcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjYnLCBjb3VudHJ5OiAnTFMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjcnLCBjb3VudHJ5OiAnQlcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjgnLCBjb3VudHJ5OiAnU1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyNjknLCBjb3VudHJ5OiAnS00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTAnLCBjb3VudHJ5OiAnU0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTEnLCBjb3VudHJ5OiAnRVInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTcnLCBjb3VudHJ5OiAnQVcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTgnLCBjb3VudHJ5OiAnRk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcyOTknLCBjb3VudHJ5OiAnR0wnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTAnLCBjb3VudHJ5OiAnR0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTEnLCBjb3VudHJ5OiAnUFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTInLCBjb3VudHJ5OiAnTFUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTMnLCBjb3VudHJ5OiAnSUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTQnLCBjb3VudHJ5OiAnSVMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTUnLCBjb3VudHJ5OiAnQUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTYnLCBjb3VudHJ5OiAnTVQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTcnLCBjb3VudHJ5OiAnQ1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTgnLCBjb3VudHJ5OiAnRkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNTknLCBjb3VudHJ5OiAnQkcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzAnLCBjb3VudHJ5OiAnTFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzEnLCBjb3VudHJ5OiAnTFYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzInLCBjb3VudHJ5OiAnRUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzMnLCBjb3VudHJ5OiAnTUQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzQnLCBjb3VudHJ5OiAnQU0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzUnLCBjb3VudHJ5OiAnQlknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzYnLCBjb3VudHJ5OiAnQUQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzcnLCBjb3VudHJ5OiAnTUMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzgnLCBjb3VudHJ5OiAnU00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczNzknLCBjb3VudHJ5OiAnVkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODAnLCBjb3VudHJ5OiAnVUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODEnLCBjb3VudHJ5OiAnUlMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODInLCBjb3VudHJ5OiAnTUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODMnLCBjb3VudHJ5OiAnWEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODUnLCBjb3VudHJ5OiAnSFInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODYnLCBjb3VudHJ5OiAnU0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODcnLCBjb3VudHJ5OiAnQkEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICczODknLCBjb3VudHJ5OiAnTUsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjAnLCBjb3VudHJ5OiAnQ1onIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjEnLCBjb3VudHJ5OiAnU0snIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0MjMnLCBjb3VudHJ5OiAnTEknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDAnLCBjb3VudHJ5OiAnRksnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDEnLCBjb3VudHJ5OiAnQlonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDInLCBjb3VudHJ5OiAnR1QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDMnLCBjb3VudHJ5OiAnU1YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDQnLCBjb3VudHJ5OiAnSE4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDUnLCBjb3VudHJ5OiAnTkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDYnLCBjb3VudHJ5OiAnQ1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDcnLCBjb3VudHJ5OiAnUEEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDgnLCBjb3VudHJ5OiAnUE0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1MDknLCBjb3VudHJ5OiAnSFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTAnLCBjb3VudHJ5OiAnQkwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTAnLCBjb3VudHJ5OiAnTUYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTEnLCBjb3VudHJ5OiAnQk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTInLCBjb3VudHJ5OiAnR1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTMnLCBjb3VudHJ5OiAnRUMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTUnLCBjb3VudHJ5OiAnUFknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTcnLCBjb3VudHJ5OiAnU1InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTgnLCBjb3VudHJ5OiAnVVknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTknLCBjb3VudHJ5OiAnQ1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc1OTknLCBjb3VudHJ5OiAnQU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzAnLCBjb3VudHJ5OiAnVEwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzInLCBjb3VudHJ5OiAnQVEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzMnLCBjb3VudHJ5OiAnQk4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzQnLCBjb3VudHJ5OiAnTlInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzUnLCBjb3VudHJ5OiAnUEcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzYnLCBjb3VudHJ5OiAnVE8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzcnLCBjb3VudHJ5OiAnU0InIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzgnLCBjb3VudHJ5OiAnVlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2NzknLCBjb3VudHJ5OiAnRkonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODAnLCBjb3VudHJ5OiAnUFcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODEnLCBjb3VudHJ5OiAnV0YnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODInLCBjb3VudHJ5OiAnQ0snIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODMnLCBjb3VudHJ5OiAnTlUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODUnLCBjb3VudHJ5OiAnV1MnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODYnLCBjb3VudHJ5OiAnS0knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODcnLCBjb3VudHJ5OiAnTkMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODgnLCBjb3VudHJ5OiAnVFYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2ODknLCBjb3VudHJ5OiAnUEYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTAnLCBjb3VudHJ5OiAnVEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTEnLCBjb3VudHJ5OiAnRk0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc2OTInLCBjb3VudHJ5OiAnTUgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTAnLCBjb3VudHJ5OiAnS1AnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTInLCBjb3VudHJ5OiAnSEsnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTMnLCBjb3VudHJ5OiAnTU8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTUnLCBjb3VudHJ5OiAnS0gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4NTYnLCBjb3VudHJ5OiAnTEEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4ODAnLCBjb3VudHJ5OiAnQkQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc4ODYnLCBjb3VudHJ5OiAnVFcnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjAnLCBjb3VudHJ5OiAnTVYnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjEnLCBjb3VudHJ5OiAnTEInIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjInLCBjb3VudHJ5OiAnSk8nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjMnLCBjb3VudHJ5OiAnU1knIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjQnLCBjb3VudHJ5OiAnSVEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjUnLCBjb3VudHJ5OiAnS1cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjYnLCBjb3VudHJ5OiAnU0EnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjcnLCBjb3VudHJ5OiAnWUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NjgnLCBjb3VudHJ5OiAnT00nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzAnLCBjb3VudHJ5OiAnUFMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzEnLCBjb3VudHJ5OiAnQUUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzInLCBjb3VudHJ5OiAnSUwnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzMnLCBjb3VudHJ5OiAnQkgnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzQnLCBjb3VudHJ5OiAnUUEnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzUnLCBjb3VudHJ5OiAnQlQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzYnLCBjb3VudHJ5OiAnTU4nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5NzcnLCBjb3VudHJ5OiAnTlAnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTInLCBjb3VudHJ5OiAnVEonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTMnLCBjb3VudHJ5OiAnVE0nIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTQnLCBjb3VudHJ5OiAnQVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTUnLCBjb3VudHJ5OiAnR0UnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTYnLCBjb3VudHJ5OiAnS0cnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc5OTgnLCBjb3VudHJ5OiAnVVonIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI0MicsIGNvdW50cnk6ICdCUycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjQ2JywgY291bnRyeTogJ0JCJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0yNjQnLCBjb3VudHJ5OiAnQUknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTI2OCcsIGNvdW50cnk6ICdBRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtMjg0JywgY291bnRyeTogJ1ZHJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS0zNDAnLCBjb3VudHJ5OiAnVkknIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTM0NScsIGNvdW50cnk6ICdLWScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNDQxJywgY291bnRyeTogJ0JNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS00NzMnLCBjb3VudHJ5OiAnR0QnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY0OScsIGNvdW50cnk6ICdUQycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjY0JywgY291bnRyeTogJ01TJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS02NzAnLCBjb3VudHJ5OiAnTVAnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTY3MScsIGNvdW50cnk6ICdHVScgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNjg0JywgY291bnRyeTogJ0FTJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03MjEnLCBjb3VudHJ5OiAnU1gnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTc1OCcsIGNvdW50cnk6ICdMQycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtNzY3JywgY291bnRyeTogJ0RNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS03ODQnLCBjb3VudHJ5OiAnVkMnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTkzOScsIGNvdW50cnk6ICdQUicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODQ5JywgY291bnRyeTogJ0RPJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnMS04NjgnLCBjb3VudHJ5OiAnVFQnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICcxLTg2OScsIGNvdW50cnk6ICdLTicgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzEtODc2JywgY291bnRyeTogJ0pNJyB9LFxuICAgICAgICAgICAgeyBjb2RlOiAnNDQtMTQ4MScsIGNvdW50cnk6ICdHRycgfSxcbiAgICAgICAgICAgIHsgY29kZTogJzQ0LTE1MzQnLCBjb3VudHJ5OiAnSkUnIH0sXG4gICAgICAgICAgICB7IGNvZGU6ICc0NC0xNjI0JywgY291bnRyeTogJ0lNJyB9XG4gICAgICAgIF07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJykuZmFjdG9yeSgnQVBJJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiYXNlID0gJ2h0dHA6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJy9hcGkvJztcbiAgICAgICAgdmFyIHBhdGggPSAnJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICBcdHBhdGg6IGZ1bmN0aW9uKGZ1bmMsIHZlcnNpb24pIHtcbiAgICAgICAgXHRcdGlmICh0eXBlb2YodmVyc2lvbikgPT09ICd1bmRlZmluZWQnKSB2ZXJzaW9uID0gJ3YxJztcbiAgICAgICAgXHRcdHZhciBkZWxpbWl0ZXIgPSBmdW5jLnN0YXJ0c1dpdGgoJy8nKSA/ICcnIDogJy8nO1xuICAgICAgICBcdFx0cmV0dXJuIHBhdGggPSBiYXNlICsgdmVyc2lvbiArIGRlbGltaXRlciArIGZ1bmM7XG4gICAgICAgIFx0fVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5wcm92aWRlcignQVBJUHJvdmlkZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJhc2UgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnL2FwaS8nO1xuICAgICAgICB2YXIgcGF0aCA9ICcnO1xuXG4gICAgICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcdHJldHVybiB7XG4gICAgICAgIFx0XHRwYXRoOiBmdW5jdGlvbihmdW5jLCB2ZXJzaW9uKSB7XG4gICAgICAgIFx0XHRcdGlmICh0eXBlb2YodmVyc2lvbikgPT09ICd1bmRlZmluZWQnKSB2ZXJzaW9uID0gJ3YxJztcbiAgICAgICAgXHRcdFx0dmFyIGRlbGltaXRlciA9IGZ1bmMuc3RhcnRzV2l0aCgnLycpID8gJycgOiAnLyc7XG4gICAgICAgIFx0XHRcdHJldHVybiBwYXRoID0gYmFzZSArIHZlcnNpb24gKyBkZWxpbWl0ZXIgKyBmdW5jO1xuICAgICAgICBcdFx0fVxuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsIEFQSSl7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScsIHt9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgICAgICRzY29wZS5zaWdudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnYXV0aGVudGljYXRlL3NpZ251cCcpLCB1c2VySW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWNjZXNzID09PSB0cnVlICYmIHR5cGVvZihyZXN1bHQuZGF0YS5tZXNzYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gcmVzdWx0LmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXSk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWNjZXNzTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLm1lc3NhZ2UuZW1haWxbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgICAgIHZhciBjcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkYXV0aC5zZXRUb2tlbihyZXN1bHQuZGF0YS50b2tlbik7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTdGF0ZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU3RhdGVQYXJhbXMgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihhY3RpdmVTdGF0ZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLnNpZ251cCcpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocGF5bG9hZC5yb2xlLCBwYXlsb2FkLnJvbGVfaWQsIHRydWUsIGFjdGl2ZVN0YXRlLCBhY3RpdmVTdGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1c1RleHQgPT09ICdVbmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVGhlIGVtYWlsIG9yIHBhc3N3b3JkIHlvdSBlbnRlcmVkIGlzIGluY29ycmVjdC4nXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnIuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IExvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoQ29uZmlybUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCBBUEkpe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMuY29kZSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb25maXJtYXRpb25fY29kZTogJHN0YXRlUGFyYW1zLmNvZGUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCdhdXRoZW50aWNhdGUvY29uZmlybScpLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEuZXJyb3I7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBdXRoUmVjb3ZlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCBBUEkpe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICByZWNvdmVyeUVtYWlsOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkX3JlcGVhdDogJydcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mKCRzdGF0ZVBhcmFtcy50b2tlbikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICdyZWNvdmVyJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVjb3ZlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBQYXNzd29yZFxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEucmVjb3ZlcnlFbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgnYXV0aGVudGljYXRlL2ZvcmdvdCcpLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gJ0EgcGFzc3dvcmQgcmVzZXQgbGluayBoYXMgYmVlbiBzZW50IHRvIHlvdXIgZW1haWwuJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQubGVuZ3RoID49IDYpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQgPT09ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICRzdGF0ZVBhcmFtcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ2F1dGhlbnRpY2F0ZS9yZWNvdmVyJyksIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnJlbW92ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGF1dGguc2V0VG9rZW4ocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgZnJvbSBoZXJlIC4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZXNldHRpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmRzIGRvIG5vdCBtYXRjaCEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnUGFzc3dvcmRzIG5lZWQgdG8gYmUgbG9uZ2VyIHRoYW4gNiBjaGFyYWN0ZXJzISc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhVVJJKTtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmb2N1c09uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZTogeyBmb2N1c09uOiAnPScgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2NvcGUuZm9jdXNPbik7XG5cbiAgICAgICAgICAgICAgICBpZihzY29wZS5mb2N1c09uKXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgIH07XG4gICAgfSk7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIsICRmaWx0ZXIsIEZpbGVVcGxvYWRlciwgQ291bnRyaWVzLCBDb3VudHJ5Q29kZXMsIEFQSSkge1xuXG4gICAgICAgICRzY29wZS5mb3JtID0ge1xuICAgICAgICAgICAgY3VycmVudFN0ZXA6IDEsXG4gICAgICAgICAgICB0b3RhbFN0ZXBzOiAzXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvdGFsU3RlcHMgPSB7XG4gICAgICAgICAgICBjcmVhdG9yOiAzLFxuICAgICAgICAgICAgZXhwZXJ0OiA0LFxuICAgICAgICAgICAgaW52ZXN0b3I6IDRcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlRm9ybVN0ZXAgPSBmdW5jdGlvbihuZXdTdGVwKXtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLmN1cnJlbnRTdGVwID0gbmV3U3RlcDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb3VudHJpZXMgPSBDb3VudHJpZXMoKTtcbiAgICAgICAgJHNjb3BlLmNvdW50cnlDb2RlcyA9IENvdW50cnlDb2RlcygpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCckc2NvcGUuY291bnRyaWVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3VudHJpZXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnJHNjb3BlLmNvdW50cnlDb2RlcycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291bnRyeUNvZGVzKTtcblxuICAgICAgICAkc2NvcGUuY29udGFjdFRpbWVzID0gW1xuICAgICAgICAgICAge25hbWU6ICdXb3JraW5nIGhvdXJzICg5YW0gdG8gNiBwbSknLCB2YWx1ZTogJzktNid9LFxuICAgICAgICAgICAge25hbWU6ICdFdmVuaW5nIHRpbWUgKDZhbSB0byA5IHBtKScsIHZhbHVlOiAnNi05J31cbiAgICAgICAgXTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkUm9sZTogJ2NyZWF0b3InLFxuICAgICAgICAgICAgYWdlR2F0ZTogJ3llcycsXG4gICAgICAgICAgICBjb3VudHJ5T3JpZ2luOiAnJyxcbiAgICAgICAgICAgIGNvdW50cnlSZXNpZGVuY2U6ICcnLFxuICAgICAgICAgICAgY29udGFjdFRpbWU6ICcnLFxuICAgICAgICAgICAgZXhwZXJ0aXNlRm9ybToge1xuICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyb3BwZWRUaHVtYm5haWw6IG51bGwsXG4gICAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZVJvbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLnRvdGFsU3RlcHMgPSAkc2NvcGUudG90YWxTdGVwc1skc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4oKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykgKiAxMDAsIDk2KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzc0ludmVydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoKCgxIC0gKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykpICogMTAwKSwgNCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh1c2VyLnJlZ2lzdGVyZWQgPT0gMSkgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgaGFuZGxlRmlsZVNlbGVjdCA9IGZ1bmN0aW9uKGV2dCwgZHJvcCkge1xuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGltYWdlIHRvIGNyb3AnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50aHVtYm5haWwgPSBldnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2ZpbGVJbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJvcCcsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnVwbG9hZGVyID0gbmV3IEZpbGVVcGxvYWRlcih7XG4gICAgICAgICAgICB1cmw6IEFQSS5wYXRoKCdmaWxlcycpLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1JbWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSAkc2NvcGUuZGF0YS5jcm9wcGVkVGh1bWJuYWlsO1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzcG9uc2UuZmlsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9ICdZb3VyIHByb2ZpbGUgcGljdHVyZSB3YXMgc3VjY2Vzc2Z1bGx5IHVwbG9hZGVkISc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlRXJyb3IgPSAnUHJvZmlsZSBwaWN0dXJlIGZhaWxlZCB0byB1cGxvYWQsIHBsZWFzZSB0cnkgYWdhaW4hJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKGltYWdlKSk7XG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5hbGxTa2lsbHMgPSAkcmVzb3VyY2UoJ2FwaS9za2lsbHMnKS5xdWVyeSgpO1xuXG4gICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpe1xuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dHRlZEV4cGVydGlzZSA9IHtzZWxlY3RlZEV4cGVydGlzZTogJ251bGwnLCBvdGhlckV4cGVydGlzZToge3N0YXR1czogMX19O1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFskc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtMV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsYXN0SW5wdXR0ZWRFeHBlcnRpc2UpO1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPCAzICYmIChsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UgIT09IG51bGwgJiYgbGFzdElucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2U6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBvdGhlclNraWxsczoge2xpc3Q6IFtdLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZUNhdGVnb3J5LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkoaW5kZXgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihlLCBpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZSl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IGV4cGVydGlzZTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihlLCBpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2Uuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmluU2tpbGxzID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIHZhciBmb3VuZFNraWxsID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihmb3VuZFNraWxsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRTa2lsbC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0U2tpbGwgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgaWYoISRzY29wZS5pblNraWxscyhpbmRleCwgc2tpbGwpKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscy5wdXNoKHNraWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0U2tpbGwgPSBmdW5jdGlvbihlLCBpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhYW5ndWxhci5lcXVhbHMoYWN0dWFsLCBleHBlY3RlZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlU2tpbGxzID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMgPSB7bGlzdDogW10sIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnZXhwZXJ0aXNlLWNhdGVnb3J5LzAnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdleHBlcnRpc2UtY2F0ZWdvcnkvJykgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnZXhwZXJ0aXNlL2NhdGVnb3J5LycpICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdleHBlcnRpc2UvJykgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZS5pZCArICcvc2tpbGxzLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdERldGFpbHMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5kYXRhLmZuYW1lLFxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJHNjb3BlLmRhdGEubG5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlLFxuICAgICAgICAgICAgICAgIGFnZV9nYXRlOiAkc2NvcGUuZGF0YS5hZ2VHYXRlLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfb3JpZ2luOiAkc2NvcGUuZGF0YS5jb3VudHJ5T3JpZ2luLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfcmVzaWRlbmNlOiAkc2NvcGUuZGF0YS5jb3VudHJ5UmVzaWRlbmNlLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfbnVtYmVyOiAkc2NvcGUuZGF0YS5jb250YWN0TnVtYmVyLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfbnVtYmVyX2NvdW50cnlfY29kZTogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlckNvdW50cnlDb2RlLmNvZGUsXG4gICAgICAgICAgICAgICAgY29udGFjdF90aW1lOiAkc2NvcGUuZGF0YS5jb250YWN0VGltZS52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoKCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52ZXN0bWVudEJ1ZGdldCA9PT0gJ290aGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXN0bWVudEJ1ZGdldCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEJ1ZGdldE90aGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yID0ge307XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0ID0gaW52ZXN0bWVudEJ1ZGdldDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9nb2FsID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50R29hbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9yZWFzb24gPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRSZWFzb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmNyZWF0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdleHBlcnQnOlxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5leHBlcnQgPSB7IGxpc3Q6IFtdIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QsIGZ1bmN0aW9uKGlucHV0dGVkRXhwZXJ0aXNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCB8fCBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydC5saXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VfY2F0ZWdvcnk6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX2V4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX3N1Yl9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlOiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZFNraWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgICAgICRodHRwLnB1dChBUEkucGF0aCgndXNlcnMvJykgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLm5hbWUgPSAkc2NvcGUuZGF0YS5mbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLmxhc3RfbmFtZSA9ICRzY29wZS5kYXRhLmxuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUoJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlciwgQVBJKSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAgICAgICRzY29wZS5zZWN0aW9uTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJ2NvbnRlc3RzLzpjb250ZXN0SWQnKSwge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5qdWRnaW5nQ29udGVzdHMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2NyZWF0b3InICYmIHR5cGVvZigkcm9vdFNjb3BlLnVzZXIuY3JlYXRvcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBvZ2MgaW4gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0KXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3RfaWQgPSAkcm9vdFNjb3BlLnVzZXIuY3JlYXRvci5vbmdvaW5nX2NvbnRlc3Rbb2djXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3QgPSAkZmlsdGVyKCdmaWx0ZXInKShyZXN1bHQsIHtpZDogY29udGVzdF9pZH0sIHRydWUpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoY29udGVzdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzLnB1c2goY29udGVzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZ2NJbmRleCA9ICRzY29wZS5jb250ZXN0cy5pbmRleE9mKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3RzLnNwbGljZShvZ2NJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZigkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5JyAmJiAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGpjIGluICRyb290U2NvcGUudXNlci5qdWRnaW5nKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlc3RfaWQgPSAkcm9vdFNjb3BlLnVzZXIuanVkZ2luZ1tqY10uY29udGVzdF9pZDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKHJlc3VsdCwge2lkOiBjb250ZXN0X2lkfSwgdHJ1ZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qdWRnaW5nQ29udGVzdHMucHVzaChjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5zZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdFNpbmdsZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRmaWx0ZXIsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCAkaHR0cCwgTGlnaHRib3gsIEFQSSkge1xuICAgICAgICAkc2NvcGUuY29udGVzdElkID0gJHN0YXRlUGFyYW1zLmNvbnRlc3RJZDtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBjb250ZXN0RnVsbERlc2NyaXB0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGFkZEVudHJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGFkZEVudHJ5Rm9ybToge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50cnk6IG51bGwsXG4gICAgICAgICAgICByYXRpbmc6IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICcnLFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICcnLFxuICAgICAgICAgICAgICAgIG1hcmtldDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZShBUEkucGF0aCgnY29udGVzdHMvOmNvbnRlc3RJZCcpLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeSA9ICRyZXNvdXJjZShBUEkucGF0aCgnZW50cmllcy86ZW50cnlJZCcpLCB7XG4gICAgICAgICAgICBlbnRyeUlkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb250ZXN0YW50RW50cmllczoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBBUEkucGF0aCgnZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvY3JlYXRvci86Y3JlYXRvcklkJyksXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGp1ZGdlRW50cmllczoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBBUEkucGF0aCgnZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvanVkZ2UvOmp1ZGdlSWQnKSxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IEFQSS5wYXRoKCdlbnRyaWVzLzplbnRyeUlkL21lc3NhZ2VzJyksXG4gICAgICAgICAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIEVudHJ5UmF0aW5nID0gJHJlc291cmNlKEFQSS5wYXRoKCdlbnRyeS1yYXRpbmdzLzplbnRyeVJhdGluZ0lkJyksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgLy8gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuc2hvd0Z1bGxUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuY29udGVzdEZ1bGxEZXNjcmlwdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaGlkZUZ1bGxUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBDb250ZXN0LmdldCh7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWRcbiAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB2YXIganVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZW5kaW5nSnVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBjb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZW5kaW5nQ29udGVzdGluZyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5jb250ZXN0aW5nLCB7XG4gICAgICAgICAgICAgICAgY29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGp1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGp1ZGdlYWJsZS5sZW5ndGggPiAwICYmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09ICdqdXJ5JyAmJiAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09ICdjcmVhdG9yJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LmNvbnRlc3RJZCA9IHJlc3VsdC5pZDtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5vbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICdqdXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IHJlc3VsdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmIGp1ZGdlYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygkcm9vdFNjb3BlLmFjdGl2ZVJvbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwZW5kaW5nSnVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0p1ZGdlYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihjb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVzdGluZy5sZW5ndGggPiAwICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2NyZWF0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdDb250ZXN0aW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0NvbnRlc3RpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5sb2FkRW50cmllcyA9IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHN3aXRjaChyb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdqdXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgRW50cnkuanVkZ2VFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlSWQ6ICRyb290U2NvcGUudXNlci5pZFxuICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiAnY3JlYXRvcid9LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0b3IgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW50cnkuY29udGVzdGFudEVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3IuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICB2YXIganVkZ2VJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdqdXJ5Jykge1xuICAgICAgICAgICAgICAgIGp1ZGdlSWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChqdWRnZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdlbnRyaWVzLycpICsgZW50cnkuaWQgKyAnL2p1ZGdlLycgKyBqdWRnZUlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcgPSByZXN1bHQuZGF0YS5yYXRpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIEVudHJ5LmdldCh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5SWQ6IGVudHJ5LmlkXG4gICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5vcGVuTGlnaHRib3ggPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgYWxsRmlsZXMgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmZpbGVzO1xuICAgICAgICAgICAgdmFyIGFsbEltYWdlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgICAgIGZvcih2YXIgYUYgaW4gYWxsRmlsZXMpe1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gYWxsRmlsZXNbYUZdO1xuICAgICAgICAgICAgICAgIGFsbEltYWdlcy5wdXNoKGZpbGUudXJsKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlLnVybCA9PT0gaXRlbS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gYUY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMaWdodGJveC5vcGVuTW9kYWwoYWxsSW1hZ2VzLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24gKGV2ZW50LCAkZmxvdywgZmxvd0ZpbGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZUFkZGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmbG93RmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZpbGUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIGZpbGVzIDogJyArIG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICAkZmlsZS5yZWZfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG5cbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IG1lc3NhZ2UuZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihtZXNzYWdlLmZpbGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmZpbGUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVSZW1vdmUgPSBmdW5jdGlvbihmaWxlLCAkZmxvdykge1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW1zID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMsIHtpZDogZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihmaWxlLnJlZl9pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmlsZXNJbmRleCA9ICRmbG93LmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgICAgICBpZiAoZmlsZXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZlIGZpbGVzIC4uLiAnICsgZmlsZXNJbmRleCk7XG4gICAgICAgICAgICAgICAgJGZsb3cuZmlsZXMuc3BsaWNlKGZpbGVzSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdy5maWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2hvd0FkZEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uID0gJHNjb3BlLmNvbnRlc3QuZW50cmllc1skc2NvcGUuY29udGVzdC5lbnRyaWVzLmxlbmd0aCAtIDFdLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hlZEZpbGVzID0ge307XG4gICAgICAgICAgICB2YXIgdGh1bWJuYWlsX2lkID0gbnVsbDtcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5mbG93LmZpbGVzLCBmdW5jdGlvbihmaWxlKXtcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzW2ZpbGUucmVmX2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhcHRpb24nOiBmaWxlLnJlZl9jYXB0aW9uXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVwYXJlIHRvIGFzc2lnbiB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5maWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSAhPT0gLTEgJiYgdGh1bWJuYWlsX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3aG9vcGllIGl0IG1hdGNoZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsX2lkID0gZmlsZS5yZWZfaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogJ2NyZWF0b3InfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IG5ldyBFbnRyeSgpO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNyZWF0b3JfaWQgPSByb2xlLmlkO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNvbnRlc3RfaWQgPSAkc2NvcGUuY29udGVzdC5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS50aHVtYm5haWxfaWQgPSB0aHVtYm5haWxfaWQ7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS5uYW1lID0gJHJvb3RTY29wZS51c2VyLm5hbWUgKyBcIidzIEVudHJ5XCI7XG4gICAgICAgICAgICAgICAgZW50cnkuZGVzY3JpcHRpb24gPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgZW50cnkuYXR0YWNoZWRfZmlsZXMgPSBhdHRhY2hlZEZpbGVzO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkudGh1bWJuYWlsX2lkKTtcblxuICAgICAgICAgICAgICAgIGVudHJ5LiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cnkgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSAgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0RW50cnkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnY3JlYXRvcicpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBFbnRyeS5zZW5kTWVzc2FnZSh7ZW50cnlJZDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZH0sIG1lc3NhZ2VSZXF1ZXN0LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZU1hcmtzID0gZnVuY3Rpb24oZW50cnlSYXRpbmdJZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB1cGRhdGVkUmF0aW5nID0ge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuZGVzaWduLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmNyZWF0aXZpdHksXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuaW5kdXN0cmlhbCxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLm1hcmtldCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuanVkZ2VfaWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmVudHJ5X2lkID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihlbnRyeVJhdGluZ0lkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBFbnRyeVJhdGluZy51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiBlbnRyeVJhdGluZ0lkXG4gICAgICAgICAgICAgICAgfSwgdXBkYXRlZFJhdGluZykuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIHNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2p1cnknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlSYXRpbmcgPSBuZXcgRW50cnlSYXRpbmcodXBkYXRlZFJhdGluZyk7XG4gICAgICAgICAgICAgICAgZW50cnlSYXRpbmcuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgY3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUp1ZGdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hY2NlcHRKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdChBUEkucGF0aCgndXNlcnMvYmVjb21lSnVkZ2UnKSwge2NvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0LmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhU3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYmVjb21lQ29udGVzdGFudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTaG93IE5EQVxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5jb250ZXN0LXNpbmdsZScsIDUwKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hY2NlcHRDb250ZXN0YW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ3VzZXJzL2JlY29tZUNvbnRlc3RhbnQnKSwge2NvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0LmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFTdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ZsYXNoTm90aWNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMgPSB7fTtcblxuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5VmlldyA9IHtcbiAgICAgICAgXHRzaG93OiBmYWxzZSxcbiAgICAgICAgXHRjb250ZXN0SWQ6IDAsXG4gICAgICAgIFx0b25DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdGNvbnNvbGUubG9nKCdvbkNsaWNrJyk7XG4gICAgICAgIFx0XHQkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKCdqdXJ5JywgNSwgdHJ1ZSk7XG4gICAgICAgIFx0fVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSGVhZGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHVpYk1vZGFsKSB7XG5cbiAgICAgICAgJHNjb3BlLnRyaWdnZXJMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcdGNvbnNvbGUubG9nKCd0cmlnZ2VyIGxvZ2luIScpO1xuXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnbG9naW4tbW9kYWwnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR290IGNsb3NlIGZlZWRiYWNrIScpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCdNb2RhbCBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgXHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnbG9nZ2luZyBpbiBub3cgIScpO1xuICAgIFx0fVxuXG4gICAgXHQkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24oKXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ2F1dGggaW4gbm93ICEnKTtcbiAgICBcdH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgICAgIHZhciBieXRlU3RyaW5nO1xuICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuICAgICAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgICAgIHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgICAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTmF2aWdhdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICRsb2csICR0aW1lb3V0LCAkZmlsdGVyLCAkaHR0cCwgJHJlc291cmNlLCAkdWliTW9kYWwsIEZpbGVVcGxvYWRlciwgQ291bnRyeUNvZGVzLCBBUEkpIHtcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKEFQSS5wYXRoKCdza2lsbHMnKSkucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogQVBJLnBhdGgoJ2ZpbGVzJyksXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc01vZGU6ICd2aWV3JyxcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc1NhdmU6IC0xLFxuICAgICAgICAgICAgc29jaWFsQ29ubmVjdDoge1xuICAgICAgICAgICAgICAgIGZhY2Vib29rOiB7fSxcbiAgICAgICAgICAgICAgICBsaW5rZWRpbjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0d29GQToge31cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQSA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlci5jb250YWN0X251bWJlcl9jb3VudHJ5X2NvZGUpLFxuICAgICAgICAgICAgICAgIG51bWJlcjogYW5ndWxhci5jb3B5KCRyb290U2NvcGUudXNlci5jb250YWN0X251bWJlciksXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb3VudHJ5Q29kZXMgPSBDb3VudHJ5Q29kZXMoKTtcblxuICAgICAgICAkc2NvcGUuc3RhcnRUd29GQVZlcmlmeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEudHdvRkEubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBjb3VudHJ5Q29kZSA9IDE7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHNjb3BlLmRhdGEudHdvRkEuY291bnRyeUNvZGUuY29kZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZS5jb2RlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZlcmlmaWNhdGlvbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdmlhOiAnc21zJyxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2NvZGU6IHBhcnNlSW50KGNvdW50cnlDb2RlKSxcbiAgICAgICAgICAgICAgICBwaG9uZV9udW1iZXI6IHBhcnNlSW50KCRzY29wZS5kYXRhLnR3b0ZBLm51bWJlciksXG4gICAgICAgICAgICAgICAgbG9jYWxlOiAnZW4nXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCcvdmVyaWZpY2F0aW9uL3N0YXJ0JyksIHZlcmlmaWNhdGlvbkRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnR3b0ZBLmNvZGVTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb21wbGV0ZVR3b0ZBVmVyZml5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGNvdW50cnlDb2RlID0gMTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkc2NvcGUuZGF0YS50d29GQS5jb3VudHJ5Q29kZS5jb2RlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlLmNvZGU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICRzY29wZS5kYXRhLnR3b0ZBLmNvdW50cnlDb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmVyaWZpY2F0aW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2NvZGU6IHBhcnNlSW50KGNvdW50cnlDb2RlKSxcbiAgICAgICAgICAgICAgICBwaG9uZV9udW1iZXI6IHBhcnNlSW50KCRzY29wZS5kYXRhLnR3b0ZBLm51bWJlciksXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uX2NvZGU6IHBhcnNlSW50KCRzY29wZS5kYXRhLnR3b0ZBLnZlcmlmaWNhdGlvbkNvZGUpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCcvdmVyaWZpY2F0aW9uL2NoZWNrJyksIHZlcmlmaWNhdGlvbkRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmVyaWZpY2F0aW9uIGRhdGEnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS5jb2RlU2VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS50d29GQS52ZXJpZnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnBob25lX3ZlcmlmaWVkID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zb2NpYWxDb25uZWN0ID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJbcHJvdmlkZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zb2NpYWxDb25uZWN0W3Byb3ZpZGVyXS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb3QgTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zb2NpYWxDb25uZWN0W3Byb3ZpZGVyXS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zb2NpYWxVbmxpbmsgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG51bGw7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBzd2l0Y2gocHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZhY2Vib29rJzogbWV0aG9kID0gJ3VubGlua0ZhY2Vib29rJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5rZWRpbic6IG1ldGhvZCA9ICd1bmxpbmtMaW5rZWRpbic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJ2F1dGhlbnRpY2F0ZS8nKSArIG1ldGhvZCwge30pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSBudWxsO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9maWxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydjcmVhdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2ludmVzdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2p1ZGdpbmcnXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDA7XG5cbiAgICAgICAgICAgICRodHRwLnB1dChBUEkucGF0aCgndXNlcnMvJykgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzTW9kZSA9ICd2aWV3JztcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgdXNlciB0aHVtYm5haWxcbiAgICAgICAgJHNjb3BlLmNoYW5nZVRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL2FwcC9hcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyVGh1bWJuYWlsQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci50aHVtYm5haWwgPSBhbmd1bGFyLmNvcHkodGh1bWJuYWlsKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgdXNlciB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBTdGFydCB1cGxvYWRpbmcgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKHRodW1ibmFpbCkpO1xuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvZ291dFxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhY3R1YWxseSBsb2dnaW5nIG91dCEgLi4uJyk7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3B1bGF0ZSBzaWRlIG5hdmlnYXRpb25cbiAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCd1c2Vycy9zaWRlTmF2aWdhdGlvbkRhdGEnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2lkZU5hdmlnYXRpb25EYXRhID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLm9wZW5GdWxsTWVudSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdvVG9MaW5rID0gZnVuY3Rpb24ocGFnZSwgZGF0YSwgcm9sZSl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAwO1xuXG4gICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6IHJvbGV9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihyb2xlcykgIT09ICd1bmRlZmluZWQnICYmIHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocm9sZS5yb2xlLCByb2xlLmlkLCB0cnVlLCBwYWdlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1VzZXJUaHVtYm5haWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSl7XG4gICAgJHNjb3BlLnRodW1ibmFpbCA9IG51bGw7XG4gICAgJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwgPSBudWxsO1xuICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG5cbiAgICB2YXIgaGFuZGxlRmlsZVNlbGVjdCA9IGZ1bmN0aW9uKGV2dCwgZHJvcCkge1xuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgaWYgKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGltYWdlIHRvIGNyb3AnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS50aHVtYm5haWwgPSBldnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ292ZXIgZHJhZ2xlYXZlIGRyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnbGVhdmUnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2ZpbGVJbnB1dCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICB9KTtcbiAgICAkKGRvY3VtZW50KS5vbignZHJvcCcsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuc2V0VGh1bWJuYWlsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwpO1xuICAgIH1cblxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICB9XG4gIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0LCAkZmlsdGVyLCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZSBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuc2VjdGlvbkxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAvLyBBdmFpbGFibGUgVmlld3MgOiBMaXN0LCBDcmVhdGVcbiAgICAgICAgJHNjb3BlLnZpZXcgPSAnbGlzdCc7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgbmV3UHJvamVjdExvYWRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gbnVsbDtcblxuICAgICAgICAkc2NvcGUuc3RlcHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdZb3VyIFByb2plY3QnLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25nb2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdhcHAuY3JlYXRlLmRldGFpbHMnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICc8aDM+R3JlYXQhPC9oMz48cD48ZGZuPllvdSBoYXZlIGJlZW4gY29tcGxldGVkIGEgdmVyeSBpbXBvcnRhbnQgc3RlcCwgd2Ugd2lsbCBub3cgYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBlZmZpY2llbnRseS48L2Rmbj48L3A+PHA+PGRmbj5Zb3VyIGdyZWF0IGlkZWEgd2lsbCBiZSB1bmRlciB0aGUgVE9ZUyAmIEFNVVNFTUVOVFPigJ0gY2F0ZWdvcnkuPC9kZm4+PC9wPjxwPjxkZm4+SW4gb3JkZXIgdG8gbWFrZSB5b3VyIHByb2plY3QgY29tZSB0cnVlIHdlIHdpbGwgZ28gdGhyb3VnaCA0IHN0ZXBzLjwvZGZuPjwvcD48cD48ZGZuPkJlZm9yZWhhbmQsIG1ha2Ugc3VyZSB0byByZWFkIGFsbCB0dXRvcmlhbHMgKHdpdGggbGluaykgYW5kIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB0aGUgY29uY2VwdCBvZiBGdW5kYXRvci48L2Rmbj48L3A+PHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4taW5mbyBtYXJnaW5UMTBcIj5JIHJlYWQgdGhlIHR1dG9yaWFsIGFuZCBndWlkZWxpbmVzLiBJIHdhbnQgdG8gc3RhcnQuPC9hPjwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTWVldCB5b3VyIFN1cGVyIEV4cGVydCcsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmdvaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2FwcC5jcmVhdGUuc3VwZXJleHBlcnQnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICc8aDM+RXhwZXJ0aXNlIHlvdSBuZWVkPC9oMz48cD48ZGZuPllvdSBoYXZlIGJlZW4gY29tcGxldGVkIGEgdmVyeSBpbXBvcnRhbnQgc3RlcCwgd2Ugd2lsbCBub3cgYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBlZmZpY2llbnRseS48L2Rmbj48L3A+PHA+PGRmbj5Zb3VyIGdyZWF0IGlkZWEgd2lsbCBiZSB1bmRlciB0aGUgVE9ZUyAmIEFNVVNFTUVOVFPigJ0gY2F0ZWdvcnkuPC9kZm4+PC9wPjxwPjxkZm4+SW4gb3JkZXIgdG8gbWFrZSB5b3VyIHByb2plY3QgY29tZSB0cnVlIHdlIHdpbGwgZ28gdGhyb3VnaCA0IHN0ZXBzLjwvZGZuPjwvcD48cD48ZGZuPkJlZm9yZWhhbmQsIG1ha2Ugc3VyZSB0byByZWFkIGFsbCB0dXRvcmlhbHMgKHdpdGggbGluaykgYW5kIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB0aGUgY29uY2VwdCBvZiBGdW5kYXRvci48L2Rmbj48L3A+PHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4taW5mbyBtYXJnaW5UMTBcIj5JIHJlYWQgdGhlIHR1dG9yaWFsIGFuZCBndWlkZWxpbmVzLiBJIHdhbnQgdG8gc3RhcnQuPC9hPjwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXhwZXJ0aXNlIHlvdSBuZWVkJyxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uZ29pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnYXBwLmNyZWF0ZS5leHBlcnRpc2UnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICc8aDM+RXhwZXJ0aXNlIHlvdSBuZWVkPC9oMz48cD48ZGZuPllvdSBoYXZlIGJlZW4gY29tcGxldGVkIGEgdmVyeSBpbXBvcnRhbnQgc3RlcCwgd2Ugd2lsbCBub3cgYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBlZmZpY2llbnRseS48L2Rmbj48L3A+PHA+PGRmbj5Zb3VyIGdyZWF0IGlkZWEgd2lsbCBiZSB1bmRlciB0aGUgVE9ZUyAmIEFNVVNFTUVOVFPigJ0gY2F0ZWdvcnkuPC9kZm4+PC9wPjxwPjxkZm4+SW4gb3JkZXIgdG8gbWFrZSB5b3VyIHByb2plY3QgY29tZSB0cnVlIHdlIHdpbGwgZ28gdGhyb3VnaCA0IHN0ZXBzLjwvZGZuPjwvcD48cD48ZGZuPkJlZm9yZWhhbmQsIG1ha2Ugc3VyZSB0byByZWFkIGFsbCB0dXRvcmlhbHMgKHdpdGggbGluaykgYW5kIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB0aGUgY29uY2VwdCBvZiBGdW5kYXRvci48L2Rmbj48L3A+PHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4taW5mbyBtYXJnaW5UMTBcIj5JIHJlYWQgdGhlIHR1dG9yaWFsIGFuZCBndWlkZWxpbmVzLiBJIHdhbnQgdG8gc3RhcnQuPC9hPjwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXhwZXJ0cyBvbiB5b3VyIHRlYW0nLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25nb2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdhcHAuY3JlYXRlLmV4cGVydHMnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICc8aDM+RXhwZXJ0cyBvbiB5b3VyIHRlYW08L2gzPjxwPjxkZm4+WW91IGhhdmUgYmVlbiBjb21wbGV0ZWQgYSB2ZXJ5IGltcG9ydGFudCBzdGVwLCB3ZSB3aWxsIG5vdyBiZSBhYmxlIHRvIGNvbW11bmljYXRlIGVmZmljaWVudGx5LjwvZGZuPjwvcD48cD48ZGZuPllvdXIgZ3JlYXQgaWRlYSB3aWxsIGJlIHVuZGVyIHRoZSBUT1lTICYgQU1VU0VNRU5UU+KAnSBjYXRlZ29yeS48L2Rmbj48L3A+PHA+PGRmbj5JbiBvcmRlciB0byBtYWtlIHlvdXIgcHJvamVjdCBjb21lIHRydWUgd2Ugd2lsbCBnbyB0aHJvdWdoIDQgc3RlcHMuPC9kZm4+PC9wPjxwPjxkZm4+QmVmb3JlaGFuZCwgbWFrZSBzdXJlIHRvIHJlYWQgYWxsIHR1dG9yaWFscyAod2l0aCBsaW5rKSBhbmQgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHRoZSBjb25jZXB0IG9mIEZ1bmRhdG9yLjwvZGZuPjwvcD48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIG1hcmdpblQxMFwiPkkgcmVhZCB0aGUgdHV0b3JpYWwgYW5kIGd1aWRlbGluZXMuIEkgd2FudCB0byBzdGFydC48L2E+PC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdWYWxpZGF0ZSB0aGUgYnVkZ2V0JyxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uZ29pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnYXBwLmNyZWF0ZS5idWRnZXQnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICc8aDM+VmFsaWRhdGUgdGhlIGJ1ZGdldDwvaDM+PHA+PGRmbj5Zb3UgaGF2ZSBiZWVuIGNvbXBsZXRlZCBhIHZlcnkgaW1wb3J0YW50IHN0ZXAsIHdlIHdpbGwgbm93IGJlIGFibGUgdG8gY29tbXVuaWNhdGUgZWZmaWNpZW50bHkuPC9kZm4+PC9wPjxwPjxkZm4+WW91ciBncmVhdCBpZGVhIHdpbGwgYmUgdW5kZXIgdGhlIFRPWVMgJiBBTVVTRU1FTlRT4oCdIGNhdGVnb3J5LjwvZGZuPjwvcD48cD48ZGZuPkluIG9yZGVyIHRvIG1ha2UgeW91ciBwcm9qZWN0IGNvbWUgdHJ1ZSB3ZSB3aWxsIGdvIHRocm91Z2ggNCBzdGVwcy48L2Rmbj48L3A+PHA+PGRmbj5CZWZvcmVoYW5kLCBtYWtlIHN1cmUgdG8gcmVhZCBhbGwgdHV0b3JpYWxzICh3aXRoIGxpbmspIGFuZCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgdGhlIGNvbmNlcHQgb2YgRnVuZGF0b3IuPC9kZm4+PC9wPjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbWFyZ2luVDEwXCI+SSByZWFkIHRoZSB0dXRvcmlhbCBhbmQgZ3VpZGVsaW5lcy4gSSB3YW50IHRvIHN0YXJ0LjwvYT48L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1lvdXIgaW52ZXN0b3JzJyxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uZ29pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnYXBwLmNyZWF0ZS5pbnZlc3RvcnMnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICc8aDM+WW91ciBJbnZlc3RvcjwvaDM+PHA+PGRmbj5Zb3UgaGF2ZSBiZWVuIGNvbXBsZXRlZCBhIHZlcnkgaW1wb3J0YW50IHN0ZXAsIHdlIHdpbGwgbm93IGJlIGFibGUgdG8gY29tbXVuaWNhdGUgZWZmaWNpZW50bHkuPC9kZm4+PC9wPjxwPjxkZm4+WW91ciBncmVhdCBpZGVhIHdpbGwgYmUgdW5kZXIgdGhlIFRPWVMgJiBBTVVTRU1FTlRT4oCdIGNhdGVnb3J5LjwvZGZuPjwvcD48cD48ZGZuPkluIG9yZGVyIHRvIG1ha2UgeW91ciBwcm9qZWN0IGNvbWUgdHJ1ZSB3ZSB3aWxsIGdvIHRocm91Z2ggNCBzdGVwcy48L2Rmbj48L3A+PHA+PGRmbj5CZWZvcmVoYW5kLCBtYWtlIHN1cmUgdG8gcmVhZCBhbGwgdHV0b3JpYWxzICh3aXRoIGxpbmspIGFuZCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgdGhlIGNvbmNlcHQgb2YgRnVuZGF0b3IuPC9kZm4+PC9wPjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbWFyZ2luVDEwXCI+SSByZWFkIHRoZSB0dXRvcmlhbCBhbmQgZ3VpZGVsaW5lcy4gSSB3YW50IHRvIHN0YXJ0LjwvYT48L3A+J1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3N0ZXBzJywgZnVuY3Rpb24oc3RlcHMpe1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN0ZXBzLCBmdW5jdGlvbihzdGVwKXtcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0ZXAuc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignI3Byb2plY3RTdGVwcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3QpID09PSAndW5kZWZpbmVkJyB8fCBwcm9qZWN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdC5zdGF0ZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdC5zdGF0ZSk7XG4gICAgICAgICAgICB2YXIgZmxvb3JlZFN0YXRlID0gTWF0aC5mbG9vcigkc2NvcGUucHJvamVjdC5zdGF0ZSk7XG4gICAgICAgICAgICB2YXIgcmVtYWluaW5nU3RhdGUgPSAkc2NvcGUucHJvamVjdC5zdGF0ZSAtIGZsb29yZWRTdGF0ZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbG9vcmVkU3RhdGU7IGkrKykge1xuICAgICAgICAgICAgICAgICRzY29wZS5zdGVwc1tpXS5wcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5zdGVwc1tmbG9vcmVkU3RhdGVdLm9uZ29pbmcgPSB0cnVlO1xuICAgICAgICAgICAgJHNjb3BlLnN0ZXBzW2Zsb29yZWRTdGF0ZV0uaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5zdGVwc1tmbG9vcmVkU3RhdGVdLnByb2dyZXNzID0gcmVtYWluaW5nU3RhdGU7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBQcm9qZWN0ID0gJHJlc291cmNlKEFQSS5wYXRoKCdwcm9qZWN0cy86cHJvamVjdElkJyksIHtcbiAgICAgICAgICAgIHByb2plY3RJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVxdWlyZWRSb2xlID0gJ2NyZWF0b3InO1xuICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7IHJvbGU6IHJlcXVpcmVkUm9sZSB9LCB0cnVlKTtcblxuICAgICAgICBpZiAodHlwZW9mKG1hdGNoaW5nUm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiBtYXRjaGluZ1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ1JvbGUgPSBtYXRjaGluZ1JvbGVzWzBdO1xuXG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5hY3RpdmVSb2xlICE9PSByZXF1aXJlZFJvbGUpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJlcXVpcmVkUm9sZSwgbWF0Y2hpbmdSb2xlLmlkLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByb2plY3RJZCA9IHBhcnNlSW50KCRzdGF0ZVBhcmFtcy5wcm9qZWN0SWQpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3RJZCkgPT09ICd1bmRlZmluZWQnIHx8IGlzTmFOKHByb2plY3RJZCkpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsbFByb2plY3RzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc051bWJlcihwcm9qZWN0SWQpICYmIGlzRmluaXRlKHByb2plY3RJZCkpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0LmdldCh7IHByb2plY3RJZDogcHJvamVjdElkIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wcm9qZWN0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01ha2UgdXAgeW91ciBtaW5kIHlvdSBwZWljZSBvZiBzaGl0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub1Byb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0LmlkIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNyZWF0ZU5ld1Byb2plY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLm5ld1Byb2plY3RMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCgpLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZ29Ub1Byb2plY3QocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5uZXdQcm9qZWN0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvamVjdCA9IGFuZ3VsYXIuY29weSgkc2NvcGUucHJvamVjdCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHNjb3BlLnByb2plY3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIFByb2plY3QudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZFxuICAgICAgICAgICAgICAgIH0sIHByb2plY3QpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZURldGFpbHNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgZmVhdHVyZWRJbWFnZToge30sXG4gICAgICAgICAgICBkYXRlcGlja2VyOiB7XG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZXRhaWxzID0ge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBnZW9ncmFwaHk6ICd3aGVyZXZlcidcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICAgICAgaWYgKHByb2plY3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHByb2plY3Q7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IHN0aWxsIGxvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24oZXZlbnQsICRmbG93LCBmbG93RmlsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZlYXR1cmVkSW1hZ2VTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3QudGh1bWJuYWlsX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmF0dGFjaGVkRmlsZXNTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnByb2plY3QuYXR0YWNoZWRGaWxlcy5pbmRleE9mKG1lc3NhZ2UuZmlsZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdC5hdHRhY2hlZEZpbGVzLnB1c2gobWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXREcmFmdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSAwLjk7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJyNwcm9qZWN0U3RlcHMnKTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZVNFQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlU0VDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3N1cGVyLWV4cGVydHMnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5zdXBlckV4cGVydHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jaG9vc2VTdXBlckV4cGVydCA9IGZ1bmN0aW9uKHN1cGVyRXhwZXJ0KSB7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdXBlcl9leHBlcnRfaWQgPSBzdXBlckV4cGVydC5pZDtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN0YXRlID0gMjtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRpc2UnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUV4cGVydGlzZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0aXNlQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFcHhlcnRpc2UgPSBudWxsO1xuICAgICAgICAkc2NvcGUuc2F2aW5nRXhwZXJ0aXNlID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoQVBJLnBhdGgoJy9wcm9qZWN0cy86cHJvamVjdElkL2V4cGVydGlzZScpLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLnF1ZXJ5KHtwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc2F2ZUV4cGVydGlzZSA9IGZ1bmN0aW9uKGV4cGVydGlzZSl7XG4gICAgICAgICAgICAkc2NvcGUuc2F2aW5nRXhwZXJ0aXNlID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIHByb2plY3RFeHBlcnRpc2VEYXRhID0ge1xuICAgICAgICAgICAgICAgICdleHBlcnRpc2VfaWQnOiBleHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UuaWQsXG4gICAgICAgICAgICAgICAgJ3Rhc2snOiBleHBlcnRpc2UubWFpblRhc2ssXG4gICAgICAgICAgICAgICAgJ2J1ZGdldCc6IGV4cGVydGlzZS5idWRnZXQsXG4gICAgICAgICAgICAgICAgJ2xlYWRfdGltZSc6IGV4cGVydGlzZS5sZWFkVGltZSxcbiAgICAgICAgICAgICAgICAnc3RhcnRfZGF0ZSc6IGV4cGVydGlzZS5zdGFydERhdGVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJy9wcm9qZWN0cy8nKSArICRzY29wZS5wcm9qZWN0LmlkICsgJy9leHBlcnRpc2UnLCBwcm9qZWN0RXhwZXJ0aXNlRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNhdmluZ0V4cGVydGlzZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEVweGVydGlzZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZUV4cGVydGlzZVNlbGVjdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSAzO1xuICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbGFzdElucHV0dGVkRXhwZXJ0aXNlID0geyBzZWxlY3RlZEV4cGVydGlzZTogJ251bGwnLCBvdGhlckV4cGVydGlzZTogeyBzdGF0dXM6IDEgfSB9O1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFskc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPCAzICYmIChsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UgIT09IG51bGwgJiYgbGFzdElucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VDYXRlZ29yeTogeyBuYW1lOiAnJywgc3RhdHVzOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2U6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluVGFzazogJycsXG4gICAgICAgICAgICAgICAgICAgIGJ1ZGdldDogJycsXG4gICAgICAgICAgICAgICAgICAgIGxlYWRUaW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEVweGVydGlzZSA9ICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkoaW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2UpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnL2V4cGVydGlzZS1jYXRlZ29yeS8wJykpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCcvZXhwZXJ0aXNlLWNhdGVnb3J5LycpICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldChBUEkucGF0aCgnL2V4cGVydGlzZS9jYXRlZ29yeS8nKSArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSwgJGh0dHAsIEFQSSwgU3dlZXRBbGVydCwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0Q3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICB2YXIgUHJvamVjdEV4cGVydGlzZSA9ICRyZXNvdXJjZShBUEkucGF0aCgnL3Byb2plY3RzLzpwcm9qZWN0SWQvZXhwZXJ0aXNlJyksIHtcbiAgICAgICAgICAgIHByb2plY3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFByb2plY3RFeHBlcnRpc2UucXVlcnkoe3Byb2plY3RJZDogJHNjb3BlLnByb2plY3QuaWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlubmVyU2VjdGlvbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zaG9ydGxpc3RFeHBlcnQgPSBmdW5jdGlvbihleHBlcnRpc2UsIGJpZCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKGV4cGVydGlzZS5zaG9ydGxpc3QpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGV4cGVydGlzZS5zaG9ydGxpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhwZXJ0aXNlLnNob3J0bGlzdC5wdXNoKGJpZCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlU2hvcnRsaXN0RXhwZXJ0ID0gZnVuY3Rpb24oZXhwZXJ0aXNlLCBiaWQpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZXhwZXJ0aXNlLnNob3J0bGlzdC5pbmRleE9mKGJpZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBleHBlcnRpc2Uuc2hvcnRsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGlzY3Vzc0V4cGVydCA9IGZ1bmN0aW9uKGV4cGVydGlzZSwgYmlkKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkQmlkID0gYmlkXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0ID0gZnVuY3Rpb24oZXhwZXJ0aXNlLCBiaWQpIHtcbiAgICAgICAgICAgIFN3ZWV0QWxlcnQuc3dhbCh7XG4gICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICB0ZXh0OiAnWW91IGFyZSBzZWxlY3RpbmcgJyArIGJpZC5leHBlcnQubmFtZSArICcgdG8gY29tcGxldGUgeW91ciB0YXNrLicsXG4gICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnI0Y4QzQ4NicsY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGdvIGFoZWFkIScsXG4gICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbCcsXG4gICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgIGNsb3NlT25DYW5jZWw6IGZhbHNlfSxcbiAgICAgICAgICAgICBmdW5jdGlvbihpc0NvbmZpcm0pe1xuICAgICAgICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAucHV0KEFQSS5wYXRoKCcvcHJvamVjdC1leHBlcnRpc2UvJyArIGV4cGVydGlzZS5pZCArICcvYmlkLycgKyBiaWQuaWQpLCB7fSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlLnNlbGVjdGVkX2JpZCA9IGJpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTd2VldEFsZXJ0LnN3YWwoJ1NlbGVjdGVkIScsICdZb3UgaGF2ZSBzZWxlY3RlZCB0aGUgZXhwZXJ0LicsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb25maXJtRXhwZXJ0cyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdGF0ZSA9IDU7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVCdWRnZXRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlQnVkZ2V0Q3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pbm5lclNlY3Rpb25Mb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlSW52ZXN0b3JzQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUludmVzdG9yc0N0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRyb290U2NvcGUuaW5uZXJTZWN0aW9uTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdFeHBlcnRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSwgJGZpbHRlciwgRmRTY3JvbGxlciwgQVBJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeHBlcnQgU3RhcnRlZCcpO1xuICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU291cmNlID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUV4cGVydGlzZSA9IFtdO1xuICAgICAgICAkc2NvcGUubWF0Y2hpbmdFeHBlcnRpc2UgPSBbXTtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICB2YXIgQXZhaWxhYmxlRXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCdleHBlcnRpc2UvYXZhaWxhYmxlJykpO1xuXG4gICAgICAgIHZhciBNYXRjaGluZ0V4cGVydGlzZSA9ICRyZXNvdXJjZShBUEkucGF0aCgnZXhwZXJ0aXNlL21hdGNoaW5nJyksIHt9LCB7XG4gICAgICAgIFx0cXVlcnk6IHtcbiAgICAgICAgXHRcdG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIFx0XHRpc0FycmF5OiBmYWxzZVxuICAgICAgICBcdH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkUm9sZSA9ICdleHBlcnQnO1xuICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7IHJvbGU6IHJlcXVpcmVkUm9sZSB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgYWNjZXNzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZihtYXRjaGluZ1JvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgbWF0Y2hpbmdSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlID0gbWF0Y2hpbmdSb2xlc1swXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gcmVxdWlyZWRSb2xlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyZXF1aXJlZFJvbGUsIG1hdGNoaW5nUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWNjZXNzKSB7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIFx0QXZhaWxhYmxlRXhwZXJ0aXNlLnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVFeHBlcnRpc2UgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVNvdXJjZSA9ICRzY29wZS5hdmFpbGFibGVFeHBlcnRpc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTWF0Y2hpbmdFeHBlcnRpc2UucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hdGNoaW5nRXhwZXJ0aXNlID0gcmVzdWx0LmV4cGVydGlzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0V4cGVydGlzZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydGlzZSBTdGFydGVkJyk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG4gICAgICAgICRzY29wZS5leHBlcnRpc2UgPSBudWxsO1xuXG4gICAgICAgIHZhciBQcm9qZWN0RXhwZXJ0aXNlID0gJHJlc291cmNlKEFQSS5wYXRoKCcvcHJvamVjdC1leHBlcnRpc2UvOmV4cGVydGlzZUlkJyksIHtcbiAgICAgICAgXHRleHBlcnRpc2VJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgUHJvamVjdEV4cGVydGlzZS5nZXQoe2V4cGVydGlzZUlkOiAkc3RhdGVQYXJhbXMuZXhwZXJ0aXNlSWR9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLmV4cGVydGlzZSA9IHJlc3VsdDtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zdWJtaXRCaWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYmlkTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBiaWREYXRhID0ge1xuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAkc2NvcGUuZGF0YS5iaWRfZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJLnBhdGgoJy9wcm9qZWN0LWV4cGVydGlzZS8nKSArICRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZCArICcvYmlkJywgYmlkRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2UuYmlkID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYmlkTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlciwgQVBJKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZShBUEkucGF0aCgnL2NvbnRlc3RzLzpjb250ZXN0SWQnKSwge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1BhZ2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkU2Nyb2xsZXIsIEFQSSkge1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHNjb3BlLnBhZ2UgPSB7XG4gICAgICAgIFx0dGl0bGU6ICcnLFxuICAgICAgICBcdGNvbnRlbnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgJGh0dHAuZ2V0KEFQSS5wYXRoKCdwYWdlcycpICsgJHN0YXRlUGFyYW1zLnNsdWcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgXHRjb25zb2xlLmxvZygnU3VjY2VzcycpO1xuICAgICAgICBcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIFx0JHNjb3BlLnBhZ2UgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cblx0XHRcdGlmIChlcnJvci5zdGF0dXMgPT0gJzQwNCcpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2xvYWQgNDA0Jylcblx0XHRcdH07XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0dyYWJTaGFyZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyLCBBUEkpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuTWF0aCA9IHdpbmRvdy5NYXRoO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgcHJpbWFyeVNoYXJlTGlzdGluZzogbnVsbCxcbiAgICAgICAgICAgIHNob3dCaWROb3c6IGZhbHNlLFxuICAgICAgICAgICAgbXlCaWQ6IHtcbiAgICAgICAgICAgICAgICBiaWRfYW1vdW50OiAwLjcyLFxuICAgICAgICAgICAgICAgIG51bV9zaGFyZXM6IDEwLFxuICAgICAgICAgICAgICAgIHNhdmluZzogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBHZXQgYWxsIGxpc3RpbmdzXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQcmltYXJ5TGlzdGluZygpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJLnBhdGgoJ3NoYXJlLWxpc3RpbmcnKSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFByaW1hcnlMaXN0aW5nKCk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1CaWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG15QmlkID0ge1xuICAgICAgICAgICAgICAgICdzaGFyZV9saXN0aW5nX2lkJzogJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZy5pZCxcbiAgICAgICAgICAgICAgICAnYmlkX2Ftb3VudCc6ICRzY29wZS5kYXRhLm15QmlkLmJpZF9hbW91bnQsXG4gICAgICAgICAgICAgICAgJ251bV9zaGFyZXMnOiAkc2NvcGUuZGF0YS5teUJpZC5udW1fc2hhcmVzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSS5wYXRoKCdzaGFyZS1iaWRzJyksIG15QmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0JpZE5vdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsb2FkUHJpbWFyeUxpc3RpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTm90aWZpY2F0aW9uc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgRmROb3RpZmljYXRpb25zKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuXHQgICAgICAgIEZkTm90aWZpY2F0aW9ucy5nZXRMYXRlc3ROb3RpZmljYXRpb25zKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHQgICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcblx0ICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG5cdCAgICAgICAgXHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cdCAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hvbWUgVmlldyBTdGFydGVkJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAvLyAgICAgICRzY29wZS5jb250ZXN0cyA9IFtdO1xuICAgLy8gICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAvLyAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAvLyAgICAgIFx0Y29udGVzdElkOiAnQGlkJ1xuICAgLy8gICAgICB9KTtcblxuICAgLy8gICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgIC8vICAgICAgXHQkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAvLyAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgLy8gICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgLy8gICAgICB9KTtcblxuICAgLy8gICAgICAvLyBRdWVyeSBFeHBlcnRpc2VcblxuICAgLy8gICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgIC8vICAgICAgICAgICRzY29wZS5leHBlcnRpc2VzID0gcmVzdWx0LmRhdGE7XG4gICAvLyAgICAgIH0sIDIwMDApO1xuXG4gICAvLyAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0FsYWluIEFtb3JldHRpJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJcHNhIGV2ZW5pZXQgZGVzZXJ1bnQgYWQgcGFyaWF0dXIgcHJhZXNlbnRpdW0sIGluY2lkdW50IG1vbGVzdGlhZSBiZWF0YWUgcXVhbSBxdWFzaSByZWljaWVuZGlzIG1vbGxpdGlhIGFjY3VzYW50aXVtIHZvbHVwdGF0ZSBxdWFlcmF0IHNlcXVpIG9mZmljaWEgYSBmYWNlcmUgcmVwZWxsYXQgYWRpcGlzY2kuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBlZGl0YSBkaWduaXNzaW1vcyBuZW1vLCBzZXF1aSBkb2xvcmlidXMgYWNjdXNhbnRpdW0sIG9iY2FlY2F0aSBuYXR1cyBpdXJlIHF1YW0gZXNzZSBleCBsYWJvcmUgbmVxdWUgY29uc2VxdWF0dXIgdm9sdXB0YXRlIGluLCBuaWhpbCBlYSwgY3VtIHJlY3VzYW5kYWUgdXQuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZycsICdiaW8nOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4cGxpY2FibyBlbmltIG9mZmljaWEgb3B0aW8gZG9sb3J1bSBoYXJ1bSwgc29sdXRhIGN1bHBhIHVuZGUgdmVuaWFtIG5vYmlzIGVvcywgZHVjaW11cyBxdW9kIHByYWVzZW50aXVtIHZlcml0YXRpcyBhdHF1ZSBub24gbm9zdHJ1bSBpcHNhbS4gTm9zdHJ1bSwgZXQhJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdWlhIHJlY3VzYW5kYWUgYWxpcXVpZCBxdW9zIGFwZXJpYW0gbW9sZXN0aWFlIHF1aWJ1c2RhbSBxdWkgZW9zIGl1cmUgc2FlcGUgb3B0aW8gdml0YWUgZnVnaXQgdW5kZSBuYW0sIGF0cXVlIGV4Y2VwdHVyaSBkZXNlcnVudCBlc3QsIHJlcGVsbGF0IGFsaWFzLid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdYYXZpZXIgUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ30sXG4gICAvLyAgICAgICAgICB7bmFtZTogJ0NpbmR5IENodW5nJywgY291bnRyeTogJ0hvbmcgS29uZycsIGltYWdlOiAnNi5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJdXJlIGludmVudG9yZSBuZXNjaXVudCBpbGx1bSwgcGFyaWF0dXIgbW9sZXN0aWFzIGRpZ25pc3NpbW9zIGlwc2EgaXN0ZSBlc3QuIFNlZCwgYXNzdW1lbmRhIGRvbG9ydW0/IEFiIGJsYW5kaXRpaXMgcXVhc2ksIHZvbHVwdGF0ZXMgaXN0ZSBpdXN0byB2ZXJvIGRlc2VydW50IHN1bnQuJ31cbiAgIC8vICAgICAgXTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUcmFuc2FjdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcblxuICAgIFx0Y29uc29sZS5sb2coJ1RyYW5zYWN0aW9uQ3RybCcpO1xuICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICBcdEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgIFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgIFx0fSwgMjAwMCk7XG5cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdRdWlja1VwZGF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkTm90aWZpY2F0aW9ucywgQVBJKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdxdWlja3VwZGF0ZScpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICBcdGVkaXRNb2RlOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBJbnZlc3RvciA9ICRyZXNvdXJjZShBUEkucGF0aCgnaW52ZXN0b3JzLzppbnZlc3RvcklkJyksIHtcbiAgICAgICAgICAgIGludmVzdG9ySWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVkaXRJbnZlc3RtZW50ID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICBcdCRzY29wZS5kYXRhLmVkaXRNb2RlID0gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubW9kaWZ5SW52ZXN0bWVudCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBpbnZlc3RvckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2ludmVzdG1lbnRfYnVkZ2V0JzogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmludmVzdG1lbnRfYnVkZ2V0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQoZmFsc2UpO1xuXG4gICAgICAgICAgICBJbnZlc3Rvci51cGRhdGUoe1xuICAgICAgICAgICAgICAgIGludmVzdG9ySWQ6ICRyb290U2NvcGUudXNlci5pbnZlc3Rvci5pZFxuICAgICAgICAgICAgfSwgaW52ZXN0b3JEYXRhKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
