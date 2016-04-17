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
    angular.module('fundator.directives', ['dibari.angular-ellipsis', 'localytics.directives', 'textAngular', 'flow', 'angular-ladda']);
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
                facebookValue: '@',
                linkedinValue: '@'
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

    angular.module('fundator.controllers').controller('NavigationCtrl', ["$rootScope", "$scope", "$state", "$auth", "$log", "$timeout", "$filter", "$http", "$resource", "$uibModal", "FileUploader", function($rootScope, $scope, $state, $auth, $log, $timeout, $filter, $http, $resource, $uibModal, FileUploader) {

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
            }
        };

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiZGlyZWN0aXZlcy9jaGFydHMuanMiLCJkaXJlY3RpdmVzL2xvYWRlci5kaXJlY3RpdmUuanMiLCJkaXJlY3RpdmVzL21lc3Nlbmdlci5qcyIsImRpcmVjdGl2ZXMvbWluTWF4LmpzIiwiZGlyZWN0aXZlcy9taXNjLmpzIiwiZGlyZWN0aXZlcy9wcm9maWxlRmllbGQuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2NyZWF0ZS9jcmVhdGUuanMiLCJhcHAvZXhwZXJ0L2V4cGVydC5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuanMiLCJhcHAvaG9tZS9ob21lLmpzIiwiYXBwL2ludmVzdC9ncmFiU2hhcmUuanMiLCJhcHAvaW52ZXN0L2ludmVzdC5qcyIsImFwcC9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbnMuanMiLCJhcHAvcGFnZS9wYWdlLmpzIiwiYXBwL3F1aWNrLXVwZGF0ZS9xdWljay11cGRhdGUuanMiLCJhcHAvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24uanMiLCJmaWx0ZXJzL3N0cmlwSHRtbC5qcyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbnMuc2VydmljZS5qcyIsInNlcnZpY2VzL3Njcm9sbGVyLnNlcnZpY2UuanMiLCJjb25maWcvYXV0aC5qcyIsImNvbmZpZy9mbG93LmpzIiwiY29uZmlnL2xhZGRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsV0FBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTs7O0lBR0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsYUFBQTtJQUNBLFFBQUEsT0FBQSx3QkFBQSxDQUFBLGNBQUEsYUFBQSxhQUFBLGdCQUFBLGFBQUEsY0FBQSxpQkFBQSx3QkFBQSxhQUFBLHFCQUFBO0lBQ0EsUUFBQSxPQUFBLG9CQUFBLENBQUE7SUFDQSxRQUFBLE9BQUEscUJBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSx1QkFBQSxDQUFBLDJCQUFBLHlCQUFBLGVBQUEsUUFBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQTs7O0FDbEJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxxRUFBQSxTQUFBLGdCQUFBLG9CQUFBLG1CQUFBOzs7OztRQUtBLElBQUEsVUFBQSxTQUFBLFVBQUEsZUFBQTtZQUNBLElBQUEsT0FBQSxrQkFBQSxhQUFBO2dCQUNBLGdCQUFBOzs7WUFHQSxPQUFBLHFCQUFBLFdBQUEsTUFBQSxnQkFBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsWUFBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOztvQkFFQSxhQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBO3dCQUNBLFlBQUE7O29CQUVBLGVBQUE7d0JBQ0EsYUFBQSxRQUFBLGlCQUFBO3dCQUNBLFlBQUE7O29CQUVBLGFBQUE7d0JBQ0EsYUFBQSxRQUFBLGdCQUFBO3dCQUNBLFlBQUE7O29CQUVBLE1BQUE7OzthQUdBLE1BQUEsWUFBQTtnQkFDQSxLQUFBO2dCQUNBLFVBQUE7O2FBRUEsTUFBQSxrQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG1CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsbUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxvQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG9CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEscUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFpQkEsTUFBQSxnQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxlQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFdBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxpQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLDBCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsd0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxzQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLHFCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsd0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxtQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxlQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGlCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFVBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEscUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsWUFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7Ozs7Ozs7QUNuVkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLGlKQUFBLFNBQUEsWUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLE9BQUEsWUFBQSxTQUFBLFVBQUEsaUJBQUEsWUFBQTs7UUFFQSxXQUFBLFNBQUE7UUFDQSxXQUFBLGVBQUE7UUFDQSxXQUFBLHVCQUFBO1FBQ0EsV0FBQSx3QkFBQTs7UUFFQSxXQUFBLGFBQUE7UUFDQSxXQUFBLGNBQUE7UUFDQSxXQUFBLG9CQUFBOztRQUVBLFdBQUEsYUFBQTtRQUNBLFdBQUEsdUJBQUE7UUFDQSxXQUFBLGFBQUE7O1FBRUEsV0FBQSx1QkFBQSxTQUFBLE1BQUE7WUFDQSxXQUFBLHVCQUFBOzs7UUFHQSxXQUFBLG1CQUFBLFlBQUE7WUFDQSxDQUFBLFdBQUEsY0FBQSxPQUFBLFdBQUEsYUFBQSxJQUFBLFdBQUEsYUFBQTs7O1FBR0EsV0FBQSxJQUFBLGdCQUFBLFVBQUE7WUFDQSxXQUFBLGFBQUE7OztRQUdBLFdBQUEsSUFBQSxlQUFBLFVBQUE7WUFDQSxXQUFBLGFBQUE7OztRQUdBLFdBQUEsSUFBQSwwQkFBQSxTQUFBLEdBQUE7O1lBRUEsSUFBQSxPQUFBLFdBQUEsVUFBQSxhQUFBO1lBQ0EsSUFBQSxXQUFBLHlCQUFBLE1BQUE7OztZQUdBLEVBQUE7Ozs7WUFJQSxJQUFBLE1BQUEsbUJBQUE7Z0JBQ0EsV0FBQSxnQkFBQTs7Z0JBRUEsTUFBQSxJQUFBLHFCQUFBLE1BQUEsWUFBQSxLQUFBLFNBQUEsUUFBQTtvQkFDQSxJQUFBLE9BQUEsT0FBQSxXQUFBLGFBQUE7d0JBQ0EsV0FBQSxPQUFBLE9BQUE7O3dCQUVBLGdCQUFBOzt3QkFFQSxJQUFBLFdBQUEsS0FBQSxjQUFBLEdBQUE7NEJBQ0EsV0FBQSx3QkFBQTs0QkFDQSxPQUFBLEdBQUE7NkJBQ0E7NEJBQ0EsSUFBQSxjQUFBLFdBQUEsS0FBQTs0QkFDQSxJQUFBLGFBQUEsV0FBQSxLQUFBOzs0QkFFQSxJQUFBLE9BQUEsU0FBQSxJQUFBLHVCQUFBLGFBQUE7Z0NBQ0EsYUFBQSxTQUFBLElBQUE7Ozs0QkFHQSxJQUFBLFFBQUEsUUFBQSxVQUFBLFdBQUEsS0FBQSxZQUFBLENBQUEsTUFBQSxhQUFBOzs0QkFFQSxJQUFBLE9BQUEsV0FBQSxlQUFBLE1BQUEsU0FBQSxHQUFBO2dDQUNBLElBQUEsT0FBQSxNQUFBO2dDQUNBLFdBQUEsZUFBQSxLQUFBLE1BQUEsS0FBQSxJQUFBLENBQUEsV0FBQTtpQ0FDQTtnQ0FDQSxXQUFBLGVBQUEsWUFBQSxNQUFBLFlBQUEsSUFBQSxDQUFBLFdBQUE7Ozs7bUJBSUEsVUFBQTtvQkFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO3dCQUNBLGFBQUEsV0FBQTt3QkFDQSxXQUFBLGdCQUFBO3dCQUNBLFdBQUEsT0FBQTs7OztnQkFJQSxXQUFBO2dCQUNBLFdBQUE7aUJBQ0E7Z0JBQ0EsV0FBQSxnQkFBQTs7O1dBR0EsU0FBQSxNQUFBO1lBQ0EsTUFBQSxTQUFBLEtBQUEsV0FBQTtnQkFDQSxhQUFBLFdBQUE7Z0JBQ0EsV0FBQSxnQkFBQTtnQkFDQSxXQUFBLE9BQUE7Ozs7UUFJQSxXQUFBLElBQUEscUJBQUEsU0FBQSxPQUFBLFNBQUEsVUFBQSxXQUFBLFlBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxRQUFBLElBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxXQUFBOztZQUVBLElBQUEsTUFBQSxtQkFBQTtnQkFDQSxJQUFBLENBQUEsV0FBQSx1QkFBQTtvQkFDQSxXQUFBLGNBQUE7b0JBQ0EsV0FBQSxvQkFBQTtvQkFDQSxNQUFBOzs7Z0JBR0E7bUJBQ0E7Z0JBQ0EsSUFBQSxZQUFBOztnQkFFQSxJQUFBLE9BQUEsUUFBQSxLQUFBLGVBQUEsYUFBQTtvQkFDQSxZQUFBO3FCQUNBO29CQUNBLFlBQUEsUUFBQSxLQUFBOzs7Z0JBR0EsSUFBQSxXQUFBO29CQUNBLFdBQUEsY0FBQTtvQkFDQSxXQUFBLG9CQUFBO29CQUNBLE1BQUE7b0JBQ0EsT0FBQSxHQUFBLGtCQUFBLElBQUEsQ0FBQSxRQUFBOzs7Z0JBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQThCQSxJQUFBLFVBQUEsU0FBQSxVQUFBLGVBQUE7WUFDQSxJQUFBLE9BQUEsa0JBQUEsYUFBQTtnQkFDQSxnQkFBQTs7O1lBR0EsT0FBQSxxQkFBQSxXQUFBLE1BQUEsZ0JBQUE7Ozs7O1FBS0EsV0FBQSxpQkFBQSxTQUFBLE1BQUEsUUFBQSxRQUFBLE9BQUEsYUFBQTtZQUNBLFdBQUEsYUFBQTtZQUNBLFNBQUEsSUFBQSxrQkFBQTs7WUFFQSxJQUFBLE9BQUEsV0FBQSxhQUFBO2dCQUNBLFFBQUEsT0FBQSxRQUFBOzs7WUFHQSxJQUFBLE9BQUEsaUJBQUEsYUFBQTtnQkFDQSxjQUFBLE9BQUEsUUFBQTs7O1lBR0EsSUFBQSxDQUFBLFdBQUEsdUJBQUE7Z0JBQ0EsV0FBQSx3QkFBQTs7O1lBR0EsSUFBQSxPQUFBLFdBQUEsVUFBQSxhQUFBO2dCQUNBLElBQUEsV0FBQSxLQUFBLFdBQUEsV0FBQSxHQUFBO29CQUNBLFdBQUEsS0FBQSxXQUFBLEtBQUE7d0JBQ0EsSUFBQTt3QkFDQSxNQUFBO3dCQUNBLE1BQUE7Ozs7O1lBS0EsSUFBQSxnQkFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBO29CQUNBLFNBQUEsUUFBQSxnQkFBQTtvQkFDQSxRQUFBLFFBQUEsZ0JBQUE7b0JBQ0EsVUFBQSxRQUFBLGdCQUFBO29CQUNBLE1BQUEsUUFBQSxnQkFBQTs7Z0JBRUEsaUJBQUEsUUFBQTtlQUNBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBO29CQUNBLFNBQUEsUUFBQSxXQUFBO29CQUNBLE1BQUEsUUFBQSxXQUFBOztnQkFFQSxpQkFBQSxRQUFBLFdBQUE7ZUFDQTtnQkFDQSxPQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsT0FBQTtvQkFDQSxTQUFBLFFBQUEsV0FBQTtvQkFDQSxNQUFBLFFBQUEsV0FBQTs7Z0JBRUEsaUJBQUEsUUFBQTs7O1lBR0EsUUFBQSxRQUFBLGVBQUEsU0FBQSxVQUFBO2dCQUNBLElBQUEsbUJBQUEsU0FBQSxNQUFBO2dCQUNBLElBQUEsT0FBQSxPQUFBLElBQUEsU0FBQSxPQUFBLE1BQUEsU0FBQTs7Z0JBRUEsSUFBQSxPQUFBLHNCQUFBLGFBQUE7b0JBQ0EsS0FBQSxjQUFBO3FCQUNBO29CQUNBLEtBQUEsY0FBQSxTQUFBOzs7O1lBSUEsSUFBQSxRQUFBOztZQUVBLE9BQUE7Z0JBQ0EsS0FBQSxXQUFBLFFBQUEsbUJBQUE7Z0JBQ0E7Z0JBQ0EsS0FBQSxZQUFBLFFBQUEsb0JBQUE7Z0JBQ0E7OztZQUdBLElBQUEsVUFBQSxNQUFBO2dCQUNBLE1BQUEsSUFBQSxPQUFBLEtBQUEsU0FBQSxPQUFBO29CQUNBLFdBQUEsS0FBQSxRQUFBLE9BQUE7O29CQUVBLElBQUEsVUFBQSxJQUFBO3dCQUNBLFFBQUEsV0FBQSxZQUFBO3dCQUNBLGNBQUEsV0FBQTs7O29CQUdBLE9BQUEsR0FBQSxPQUFBLGFBQUEsQ0FBQSxRQUFBOztpQkFFQTtnQkFDQSxJQUFBLFVBQUEsSUFBQTtvQkFDQSxRQUFBLFdBQUEsWUFBQTtvQkFDQSxjQUFBLFdBQUE7OztnQkFHQSxPQUFBLEdBQUEsT0FBQSxhQUFBLENBQUEsUUFBQTs7Ozs7OztRQU9BLFdBQUEsY0FBQSxTQUFBLE1BQUE7WUFDQSxJQUFBLE9BQUEsV0FBQSxVQUFBLGFBQUE7Z0JBQ0EsSUFBQSxXQUFBLFFBQUEsVUFBQSxXQUFBLEtBQUEsWUFBQSxDQUFBLE1BQUEsT0FBQTs7Z0JBRUEsSUFBQSxTQUFBLFNBQUEsR0FBQTtvQkFDQSxPQUFBOzs7O1lBSUEsT0FBQTs7Ozs7OztBQ2hSQSxDQUFBLFdBQUE7SUFDQTs7O0lBR0EsUUFBQSxPQUFBOztLQUVBLFVBQUEsV0FBQSxXQUFBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsWUFBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTs7WUFFQSxNQUFBLFNBQUEsUUFBQSxVQUFBLFFBQUE7O2dCQUVBLE9BQUEsUUFBQSxPQUFBO2dCQUNBLE9BQUEsU0FBQSxPQUFBOzs7Z0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQSxPQUFBO2dCQUNBLFNBQUEsS0FBQSxVQUFBLE9BQUEsT0FBQTs7Z0JBRUEsSUFBQSxXQUFBLENBQUE7b0JBQ0EsT0FBQTtvQkFDQSxPQUFBO29CQUNBLFdBQUE7b0JBQ0EsT0FBQTttQkFDQTtvQkFDQSxPQUFBO29CQUNBLE9BQUE7b0JBQ0EsV0FBQTtvQkFDQSxPQUFBOzs7Z0JBR0EsSUFBQSxZQUFBO29CQUNBLFFBQUEsQ0FBQSxXQUFBLFlBQUEsU0FBQSxTQUFBLE9BQUEsUUFBQSxRQUFBLFVBQUEsYUFBQSxXQUFBLFlBQUE7b0JBQ0EsVUFBQTt3QkFDQTs0QkFDQSxPQUFBOzRCQUNBLFdBQUE7NEJBQ0EsYUFBQTs0QkFDQSxZQUFBOzRCQUNBLGtCQUFBOzRCQUNBLG9CQUFBOzRCQUNBLHNCQUFBOzRCQUNBLE1BQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7O3dCQUVBOzRCQUNBLE9BQUE7NEJBQ0EsV0FBQTs0QkFDQSxhQUFBOzRCQUNBLFlBQUE7NEJBQ0Esa0JBQUE7NEJBQ0Esb0JBQUE7NEJBQ0Esc0JBQUE7NEJBQ0EsTUFBQSxDQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTs7Ozs7Z0JBS0EsR0FBQSxPQUFBLFNBQUEsSUFBQTtvQkFDQSxJQUFBLE1BQUEsU0FBQSxLQUFBLFVBQUEsR0FBQSxXQUFBOztvQkFFQSxJQUFBLFVBQUEsSUFBQSxNQUFBLEtBQUEsSUFBQSxVQUFBO3dCQUNBLG9CQUFBO3dCQUNBLGlCQUFBOzs7b0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQTtvQkFDQSxPQUFBLFVBQUEsS0FBQSxTQUFBLEdBQUEsVUFBQTt3QkFDQSxTQUFBLEtBQUEsOEJBQUEsUUFBQSwrREFBQSxTQUFBLE1BQUEsY0FBQSxTQUFBLE1BQUEsS0FBQSxTQUFBLE1BQUE7O3FCQUVBO29CQUNBLElBQUEsTUFBQSxTQUFBLEtBQUEsVUFBQSxHQUFBLFdBQUE7O29CQUVBLElBQUEsVUFBQSxJQUFBLE1BQUEsS0FBQSxLQUFBLFdBQUE7d0JBQ0Esb0JBQUE7d0JBQ0EsaUJBQUE7OztvQkFHQSxTQUFBLEtBQUEsVUFBQSxNQUFBO29CQUNBLFNBQUEsS0FBQSwrQkFBQSxRQUFBO29CQUNBLFNBQUEsS0FBQSwrQkFBQSxRQUFBOzs7Ozs7O0FDbkZBLENBQUEsV0FBQTtJQUNBOztDQUVBLFFBQUEsT0FBQTs7RUFFQSxVQUFBLFlBQUEsV0FBQTtHQUNBLE9BQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTs7S0FFQSxVQUFBO0tBQ0EsVUFBQTtLQUNBLE1BQUEsU0FBQSxRQUFBLFVBQUEsUUFBQTtNQUNBLFNBQUEsU0FBQSxPQUFBOzs7Ozs7O0FDYkEsQ0FBQSxXQUFBO0lBQ0E7OztJQUdBLFFBQUEsT0FBQTs7S0FFQSxVQUFBLHVEQUFBLFNBQUEsWUFBQSxXQUFBLFVBQUE7UUFDQSxPQUFBO1lBQ0EsVUFBQTtnQkFDQTtvQkFDQTt3QkFDQTtvQkFDQTtvQkFDQTt3QkFDQTtvQkFDQTtnQkFDQTtnQkFDQTtZQUNBO1lBQ0E7Z0JBQ0E7b0JBQ0E7b0JBQ0E7Z0JBQ0E7WUFDQTtZQUNBLFVBQUE7WUFDQSxPQUFBO2dCQUNBLFVBQUE7O1lBRUEsTUFBQSxTQUFBLFFBQUEsVUFBQSxRQUFBO2dCQUNBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLFdBQUE7O2dCQUVBLE9BQUEsT0FBQSxXQUFBOztnQkFFQSxJQUFBLFVBQUEsVUFBQSwyQkFBQTtvQkFDQSxVQUFBO21CQUNBO29CQUNBLEtBQUE7d0JBQ0EsUUFBQTt3QkFDQSxTQUFBOzs7O2dCQUlBLE9BQUEsT0FBQSxZQUFBLFNBQUEsU0FBQTtvQkFDQSxJQUFBLE9BQUEsY0FBQSxlQUFBLGFBQUEsTUFBQTs7b0JBRUEsUUFBQSxJQUFBLENBQUEsVUFBQSxPQUFBLFdBQUEsU0FBQSxLQUFBLFNBQUEsT0FBQTt3QkFDQSxRQUFBLElBQUEsNEJBQUEsT0FBQTt3QkFDQSxPQUFBLFdBQUE7d0JBQ0EsRUFBQSxZQUFBLFFBQUEsQ0FBQSxXQUFBOzs7O2dCQUlBLE9BQUEsY0FBQSxVQUFBO29CQUNBLElBQUEsVUFBQSxJQUFBO29CQUNBLFFBQUEsWUFBQSxPQUFBO29CQUNBLFFBQUEsVUFBQSxPQUFBLEtBQUE7O29CQUVBLFFBQUEsUUFBQSxLQUFBLFNBQUEsT0FBQTt3QkFDQSxPQUFBLFNBQUEsS0FBQTt3QkFDQSxPQUFBLEtBQUEsZ0JBQUE7O3dCQUVBLFNBQUEsVUFBQTs0QkFDQSxFQUFBLFlBQUEsUUFBQSxDQUFBLFdBQUE7MkJBQ0E7Ozs7Ozs7OztBQ2pFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxTQUFBLFFBQUEsT0FBQTtLQUNBLE9BQUEsUUFBQSxZQUFBLFVBQUEsVUFBQSxNQUFBLFVBQUEsUUFBQSxVQUFBOzs7SUFHQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxTQUFBLFlBQUE7S0FDQSxPQUFBO01BQ0EsVUFBQTtNQUNBLFNBQUE7TUFDQSxNQUFBLFVBQUEsT0FBQSxNQUFBLE1BQUEsTUFBQTtPQUNBLE1BQUEsT0FBQSxLQUFBLE9BQUEsWUFBQTtRQUNBLEtBQUEsY0FBQSxLQUFBOztPQUVBLElBQUEsZUFBQSxVQUFBLE9BQUE7b0JBQ0EsUUFBQSxJQUFBO1FBQ0EsSUFBQSxNQUFBLE1BQUEsTUFBQSxLQUFBLFVBQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLFFBQUEsSUFBQTtvQkFDQSxRQUFBLElBQUEsQ0FBQSxRQUFBLFVBQUEsUUFBQTtRQUNBLElBQUEsQ0FBQSxRQUFBLFVBQUEsUUFBQSxLQUFBO1NBQ0EsS0FBQSxhQUFBLFNBQUE7U0FDQSxPQUFBO2VBQ0E7U0FDQSxLQUFBLGFBQUEsU0FBQTtTQUNBLE9BQUE7Ozs7T0FJQSxLQUFBLFNBQUEsS0FBQTtPQUNBLEtBQUEsWUFBQSxLQUFBOzs7OztJQUtBLFFBQUEsT0FBQSx1QkFBQSxVQUFBLFNBQUEsWUFBQTtLQUNBLE9BQUE7TUFDQSxVQUFBO01BQ0EsU0FBQTtNQUNBLE1BQUEsVUFBQSxPQUFBLE1BQUEsTUFBQSxNQUFBO09BQ0EsTUFBQSxPQUFBLEtBQUEsT0FBQSxZQUFBO1FBQ0EsS0FBQSxjQUFBLEtBQUE7O09BRUEsSUFBQSxlQUFBLFVBQUEsT0FBQTtvQkFDQSxRQUFBLElBQUE7UUFDQSxJQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUEsVUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLFFBQUEsSUFBQSxDQUFBLFFBQUEsVUFBQSxRQUFBO1FBQ0EsSUFBQSxDQUFBLFFBQUEsVUFBQSxRQUFBLEtBQUE7U0FDQSxLQUFBLGFBQUEsU0FBQTtTQUNBLE9BQUE7ZUFDQTtTQUNBLEtBQUEsYUFBQSxTQUFBO1NBQ0EsT0FBQTs7OztPQUlBLEtBQUEsU0FBQSxLQUFBO09BQ0EsS0FBQSxZQUFBLEtBQUE7Ozs7OztBQzVEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsdUJBQUEsT0FBQSxlQUFBLENBQUEsUUFBQSxTQUFBLE1BQUE7UUFDQSxPQUFBLFNBQUEsTUFBQTtZQUNB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LEdBQUEsT0FBQSxHQUFBOztZQUVBLE9BQUEsS0FBQSxRQUFBLEtBQUE7V0FDQTs7UUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQTtZQUNBLElBQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7WUFHQSxJQUFBLElBQUEsY0FBQSxjQUFBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO21CQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsTUFBQTs7O1lBR0EsSUFBQSxTQUFBLElBQUE7O1lBRUEsSUFBQSxLQUFBLEtBQUEsUUFBQSxZQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLE9BQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUE7bUJBQ0E7Z0JBQ0EsT0FBQSxhQUFBOzs7WUFHQSxPQUFBLFdBQUEsS0FBQTs7WUFFQSxPQUFBLFNBQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsT0FBQSxTQUFBLFFBQUE7b0JBQ0EsUUFBQSxJQUFBLElBQUEsT0FBQTtvQkFDQSxPQUFBLFlBQUEsSUFBQSxPQUFBOzs7O1lBSUEsSUFBQSxNQUFBO2dCQUNBLE9BQUEsY0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGdDQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOzs7UUFHQSxFQUFBLFVBQUEsR0FBQSxhQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOztZQUVBLE9BQUEsT0FBQSxXQUFBO2dCQUNBLE9BQUEsV0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1lBQ0EsTUFBQTtZQUNBLE1BQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7O1FBSUEsRUFBQSxVQUFBLEdBQUEsVUFBQSxjQUFBLFNBQUEsR0FBQTtZQUNBLGlCQUFBLEdBQUE7OztRQUdBLEVBQUEsVUFBQSxHQUFBLFFBQUEsb0JBQUEsU0FBQSxHQUFBO1lBQ0EsaUJBQUEsR0FBQTs7O1FBR0EsT0FBQSxXQUFBLElBQUEsYUFBQTtZQUNBLEtBQUE7WUFDQSxtQkFBQTs7O1FBR0EsT0FBQSxlQUFBLFVBQUE7WUFDQSxJQUFBLFFBQUEsT0FBQSxLQUFBOztZQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7Z0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7Z0JBRUEsS0FBQSxXQUFBO2dCQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtnQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOztnQkFFQSxPQUFBLEtBQUEsZUFBQTs7O1lBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxVQUFBLGFBQUE7b0JBQ0EsT0FBQSxLQUFBLGVBQUE7cUJBQ0E7b0JBQ0EsT0FBQSxLQUFBLGFBQUE7Ozs7WUFJQSxPQUFBLFNBQUEsV0FBQSxjQUFBO1lBQ0EsT0FBQSxTQUFBOzs7Ozs7UUFNQSxPQUFBLFlBQUEsVUFBQSxjQUFBOztRQUVBLE9BQUEsd0JBQUE7O1FBRUEsU0FBQSx5QkFBQTtZQUNBLElBQUEsd0JBQUEsQ0FBQSxtQkFBQSxRQUFBLGdCQUFBLENBQUEsUUFBQTs7WUFFQSxJQUFBLE9BQUEsc0JBQUEsU0FBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxzQkFBQSxRQUFBOzs7O1lBSUEsUUFBQSxJQUFBLE9BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsSUFBQSxPQUFBLHNCQUFBLFNBQUEsTUFBQSxzQkFBQSxzQkFBQSxRQUFBLHNCQUFBLGVBQUEsV0FBQSxJQUFBO2dCQUNBLE9BQUEsc0JBQUEsS0FBQTtvQkFDQSx1QkFBQTtvQkFDQSwwQkFBQTtvQkFDQSxlQUFBO29CQUNBLFlBQUE7b0JBQ0EsMkJBQUE7b0JBQ0Esd0JBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtvQkFDQSw4QkFBQTtvQkFDQSwyQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO29CQUNBLG1CQUFBO29CQUNBLGdCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7b0JBQ0EsZ0JBQUE7b0JBQ0EsYUFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO29CQUNBLE1BQUE7b0JBQ0EsU0FBQTs7YUFFQTs7WUFFQSxPQUFBLHVCQUFBLE9BQUEsc0JBQUEsU0FBQTs7O1FBR0EsT0FBQSwwQkFBQSxTQUFBLE9BQUEsbUJBQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLDBCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLG1CQUFBOzs7O1FBSUEsT0FBQSw0QkFBQSxTQUFBLEdBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsNkJBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwrQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsdUJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O2dCQUVBLE9BQUEsc0JBQUEsT0FBQSwwQkFBQSxTQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7O1FBSUEsT0FBQSwrQkFBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSx5QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2lCQUNBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7O1FBSUEsT0FBQSxrQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7WUFDQSxPQUFBLGdCQUFBO1lBQ0E7OztRQUdBLE9BQUEsb0JBQUEsU0FBQSxHQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7WUFDQSxFQUFBLGdCQUFBOzs7UUFHQSxPQUFBLHFCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxvQkFBQTs7WUFFQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGVBQUEsU0FBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0E7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7OztRQUdBLE9BQUEsV0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsYUFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUE7O1lBRUEsSUFBQSxPQUFBLGdCQUFBLGFBQUE7Z0JBQ0EsT0FBQSxXQUFBLFNBQUE7OztZQUdBLE9BQUE7OztRQUdBLE9BQUEsY0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLEdBQUEsQ0FBQSxPQUFBLFNBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLEtBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLE9BQUE7OztRQUdBLE9BQUEsZ0JBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxRQUFBLFNBQUE7Z0JBQ0EsT0FBQSxDQUFBLFFBQUEsT0FBQSxRQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsYUFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsYUFBQSxRQUFBLEtBQUEsT0FB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SUFBQSxZQUFBLE1BQUE7Z0JBQ0EsTUFBQSxJQUFBLGtCQUFBLE1BQUEsS0FBQSxZQUFBLFNBQUEsS0FBQSxTQUFBLE9BQUE7b0JBQ0EsT0FBQSxLQUFBLGdCQUFBLE9BQUE7b0JBQ0EsT0FBQSxLQUFBLGNBQUEsU0FBQSxPQUFBLEtBQUE7O29CQUVBLE9BQUEsS0FBQSxjQUFBLFVBQUE7d0JBQ0E7d0JBQ0E7d0JBQ0E7OztvQkFHQSxTQUFBLFVBQUE7d0JBQ0EsRUFBQSxZQUFBLFFBQUEsQ0FBQSxXQUFBO3VCQUNBOztpQkFFQTtnQkFDQSxNQUFBLElBQUE7b0JBQ0EsU0FBQSxNQUFBO21CQUNBLFNBQUEsS0FBQSxTQUFBLFFBQUE7b0JBQ0EsT0FBQSxLQUFBLGdCQUFBO29CQUNBLE9BQUEsS0FBQSxjQUFBLFVBQUE7d0JBQ0E7d0JBQ0E7d0JBQ0E7OztvQkFHQSxTQUFBLFVBQUE7d0JBQ0EsRUFBQSxZQUFBLFFBQUEsQ0FBQSxXQUFBO3VCQUNBOzs7Ozs7UUFNQSxPQUFBLGVBQUEsU0FBQSxNQUFBO1lBQ0EsSUFBQSxXQUFBLE9BQUEsS0FBQSxjQUFBO1lBQ0EsSUFBQSxZQUFBO1lBQ0EsSUFBQSxlQUFBOztZQUVBLElBQUEsSUFBQSxNQUFBLFNBQUE7Z0JBQ0EsSUFBQSxPQUFBLFNBQUE7Z0JBQ0EsVUFBQSxLQUFBLEtBQUE7O2dCQUVBLElBQUEsS0FBQSxRQUFBLEtBQUEsS0FBQTtvQkFDQSxlQUFBOzs7O1lBSUEsU0FBQSxVQUFBLFdBQUE7OztRQUdBLE9BQUEsSUFBQSxtQkFBQSxVQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTs7O1FBR0EsT0FBQSxtQkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsUUFBQSxJQUFBLG9CQUFBLFFBQUEsS0FBQTtZQUNBLE1BQUEsU0FBQSxRQUFBLEtBQUE7Ozs7Ozs7OztZQVNBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxLQUFBLGFBQUEsY0FBQSxLQUFBO29CQUNBLElBQUEsUUFBQSxLQUFBO29CQUNBLFNBQUE7Ozs7OztRQU1BLE9BQUEsa0JBQUEsU0FBQSxNQUFBLE9BQUE7Ozs7Ozs7O1lBUUEsSUFBQSxRQUFBLE9BQUEsS0FBQSxhQUFBLGNBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLE9BQUE7OztZQUdBLElBQUEsYUFBQSxNQUFBLE1BQUEsUUFBQTtZQUNBLElBQUEsZUFBQSxDQUFBLEdBQUE7Z0JBQ0EsUUFBQSxJQUFBLHNCQUFBO2dCQUNBLE1BQUEsTUFBQSxPQUFBLFlBQUE7OztZQUdBLFFBQUEsSUFBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUEsS0FBQSxhQUFBOzs7UUFHQSxPQUFBLGVBQUEsV0FBQTtZQUNBLFdBQUEsVUFBQTs7WUFFQSxPQUFBLEtBQUEsZ0JBQUE7WUFDQSxPQUFBLEtBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxnQkFBQTs7WUFFQSxPQUFBLEtBQUEsYUFBQSxjQUFBLE9BQUEsUUFBQSxRQUFBLE9BQUEsUUFBQSxRQUFBLFNBQUEsR0FBQTs7O1FBR0EsT0FBQSxjQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7WUFFQSxJQUFBLGdCQUFBO1lBQ0EsSUFBQSxlQUFBOztZQUVBLFFBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxLQUFBLE9BQUEsU0FBQSxLQUFBO2dCQUNBLGNBQUEsS0FBQSxVQUFBO29CQUNBLFdBQUEsS0FBQTs7O2dCQUdBLFFBQUEsSUFBQTtnQkFDQSxJQUFBLEtBQUEsS0FBQSxLQUFBLFFBQUEsYUFBQSxDQUFBLEtBQUEsaUJBQUEsTUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsZUFBQSxLQUFBOzs7O1lBSUEs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QUFBLFdBQUEsbUdBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsWUFBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxlQUFBOzs7UUFHQSxPQUFBLFVBQUE7WUFDQSxNQUFBO1lBQ0EsV0FBQTs7O1FBR0EsT0FBQSxPQUFBLFdBQUEsU0FBQSxTQUFBO1lBQ0EsSUFBQSxZQUFBLE1BQUE7Z0JBQ0EsV0FBQSxXQUFBO2dCQUNBLE9BQUEsVUFBQTttQkFDQTtnQkFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBLElBQUEsbUJBQUEsU0FBQSxPQUFBLE9BQUEsVUFBQTtZQUNBLE1BQUE7WUFDQSxRQUFBLElBQUE7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLFFBQUEsSUFBQSxvQkFBQSxRQUFBLEtBQUE7WUFDQSxPQUFBLFFBQUEsZUFBQSxRQUFBLEtBQUE7OztRQUdBLE9BQUEsdUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQSxRQUFBLE9BQUEsUUFBQSxjQUFBLFFBQUEsUUFBQSxLQUFBOztZQUVBLElBQUEsVUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxRQUFBLGNBQUEsS0FBQSxRQUFBLEtBQUE7Ozs7UUFJQSxPQUFBLGNBQUEsV0FBQTtZQUNBLE9BQUEsUUFBQSxRQUFBO1lBQ0EsT0FBQTs7WUFFQSxXQUFBLFVBQUE7OztRQUdBLFdBQUEsVUFBQTs7O0lBR0EsUUFBQSxPQUFBLHdCQUFBLFdBQUEsc0ZBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBLFVBQUEsWUFBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxNQUFBLElBQUEsc0JBQUEsS0FBQSxTQUFBLFFBQUE7WUFDQSxPQUFBLGVBQUEsT0FBQTs7O1FBR0EsT0FBQSxvQkFBQSxTQUFBLGFBQUE7WUFDQSxPQUFBLFFBQUEsa0JBQUEsWUFBQTtZQUNBLE9BQUE7O1lBRUEs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QUNBLGdCQUFBO1lBQ0EsT0FBQTtZQUNBLE1BQUE7WUFDQSxTQUFBOzs7UUFHQSxjQUFBLE9BQUE7WUFDQSxVQUFBO1lBQ0EsS0FBQTtZQUNBLHVCQUFBO1lBQ0EsYUFBQSxrQkFBQTtZQUNBLG1CQUFBLENBQUE7WUFDQSxtQkFBQSxDQUFBO1lBQ0EsT0FBQSxDQUFBLFdBQUE7WUFDQSxhQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7O1FBR0EsY0FBQSxTQUFBO1lBQ0EsVUFBQTtZQUNBLE1BQUE7WUFDQSxLQUFBO1lBQ0EsdUJBQUE7WUFDQSxhQUFBLGtCQUFBO1lBQ0EsbUJBQUEsQ0FBQSxXQUFBO1lBQ0EsT0FBQSxDQUFBO1lBQ0EsZ0JBQUE7WUFDQSxTQUFBO1lBQ0EsTUFBQTtZQUNBLGNBQUEsRUFBQSxPQUFBLEtBQUEsUUFBQTs7Ozs7OztBQ2pEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsK0JBQUEsVUFBQSxvQkFBQTs7UUFFQSxvQkFBQSxXQUFBO1NBQ0EsY0FBQTtZQUNBLFFBQUE7WUFDQSxnQkFBQSxDQUFBLEtBQUEsS0FBQTs7Ozs7OztBQ1RBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSx5QkFBQSxTQUFBLGVBQUE7O1FBRUEsY0FBQSxVQUFBO1lBQ0EsT0FBQTtZQUNBLGFBQUE7WUFDQSxjQUFBOzs7Ozs7QUFNQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBmdW5kYXRvciA9IGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvcicsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdmdW5kYXRvci5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZmlsdGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnJvdXRlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29uZmlnJ1xuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycsIFsnbmdSZXNvdXJjZScsICduZ0Nvb2tpZXMnLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplcicsICdhbmd1bGFyTW9tZW50JywgJ2FuZ3VsYXItb3dsLWNhcm91c2VsJywgJ25nSW1nQ3JvcCcsICdhbmd1bGFyRmlsZVVwbG9hZCcsICdib290c3RyYXBMaWdodGJveCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycsIFsnb3JkaW5hbCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycsIFsnZGliYXJpLmFuZ3VsYXItZWxsaXBzaXMnLCAnbG9jYWx5dGljcy5kaXJlY3RpdmVzJywgJ3RleHRBbmd1bGFyJywgJ2Zsb3cnLCAnYW5ndWxhci1sYWRkYSddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlICMgZm9yIHRoZSBub24gaHRtbDUgYnJvd3NlcnNcbiAgICAgICAgLy8gJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2NvbnRlc3RzJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnbmF2aWdhdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ05hdmlnYXRpb25DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmbGFzaE5vdGljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICdmbGFzaC1ub3RpY2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGbGFzaE5vdGljZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdub3RpZmljYXRpb25zJywgJ25vdGlmaWNhdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOb3RpZmljYXRpb25zQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tVcGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUXVpY2tVcGRhdGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hdXRoJyxcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmxvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguc2lnbnVwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnc2lnbnVwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5mb3Jnb3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2ZvcmdvdCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdmb3Jnb3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnJlY292ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlY292ZXI/dG9rZW4mZW1haWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVjb3ZlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhSZWNvdmVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLmNvbmZpcm0nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm0/Y29kZSZlbWFpbCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdjb25maXJtJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbmZpcm1DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGgucmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzczogJ2hvbWVwYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hvbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgLy8gICAgIHVybDogJy8nLFxuICAgICAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgYm9keUNsYXNzOiAnaG9tZXBhZ2UnLFxuICAgICAgICAgICAgLy8gICAgICAgICBuZWVkTG9naW46IGZhbHNlXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICB2aWV3czoge1xuICAgICAgICAgICAgLy8gICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3RzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdHMvOmNvbnRlc3RJZC86Y29udGVzdE5hbWUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmV4cGVydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0V4cGVydEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0aXNlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnRpc2UvOmV4cGVydGlzZUlkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2V4cGVydCcsICdleHBlcnRpc2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFeHBlcnRpc2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmludmVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2ludmVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jcmVhdGU/cHJvamVjdElkJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2RldGFpbHMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1kZXRhaWxzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRGV0YWlsc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLnN1cGVyZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zdXBlci1leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1zdXBlci1leHBlcnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVTRUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmV4cGVydGlzZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0aXNlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZXhwZXJ0aXNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRXhwZXJ0aXNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuZXhwZXJ0cycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwZXJ0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWV4cGVydHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVFeHBlcnRDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5idWRnZXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2J1ZGdldCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWJ1ZGdldCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUJ1ZGdldEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmludmVzdG9ycycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW52ZXN0b3JzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtaW52ZXN0b3JzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlSW52ZXN0b3JzQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC50cmFuc2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdUcmFuc2FjdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JhYnNoYXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ncmFiLWEtc2hhcmUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dyYWJTaGFyZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAucGFnZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvOnNsdWcnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3BhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIsICRmaWx0ZXIsICRjb29raWVzLCBGZE5vdGlmaWNhdGlvbnMsIEZkU2Nyb2xsZXIpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG4gICAgICAgICRyb290U2NvcGUuaW5pdGlhbExvY2F0aW9uU2V0dXAgPSBmYWxzZTtcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQgPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAnJztcbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IG51bGw7XG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgICRyb290U2NvcGUubm90aWZpY2F0aW9uQ29sbGFwc2UgPSBmYWxzZTtcbiAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gZmFsc2U7XG5cbiAgICAgICAgJHJvb3RTY29wZS5jb2xsYXBzZU5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKHN0YXRlKXtcbiAgICAgICAgICAgICRyb290U2NvcGUubm90aWZpY2F0aW9uQ29sbGFwc2UgPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUudG9nZ2xlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICgkcm9vdFNjb3BlLmlzTmF2U2hvd24gPj0gMC41KSA/ICRyb290U2NvcGUuaXNOYXZTaG93biA9IDAgOiAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAwLjU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3N0YXJ0TG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RvcExvYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gVXNlclNlcnZpY2UgaXMgYW4gZXhhbXBsZSBzZXJ2aWNlIGZvciBtYW5hZ2luZyB1c2VyIHN0YXRlXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50ICR1cmxSb3V0ZXIncyBkZWZhdWx0IGhhbmRsZXIgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmRcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdXNlciBvYmplY3QgYW5kIHRhc2tzXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXI/dG9rZW49JyArICRhdXRoLmdldFRva2VuKCkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBGZE5vdGlmaWNhdGlvbnMuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLnJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ25hbFJvbGUgPSAkcm9vdFNjb3BlLnVzZXIucm9sZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlUm9sZSA9ICRyb290U2NvcGUudXNlci5yb2xlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZigkY29va2llcy5nZXQoJ2ZkX2FjdGl2ZV9yb2xlJykpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVSb2xlID0gJGNvb2tpZXMuZ2V0KCdmZF9hY3RpdmVfcm9sZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogYWN0aXZlUm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyb2xlcykgIT09ICd1bmRlZmluZWQnICYmIHJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyb2xlLnJvbGUsIHJvbGUuaWQsICEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUob3JpZ25hbFJvbGUucm9sZSwgb3JpZ25hbFJvbGUuaWQsICEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSXMgQXV0aGVudGljYXRlZCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHJvb3RTY29wZS5pbml0aWFsUm9sZUFzc2lnbm1lbnQpO1xuXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmVlZExvZ2luID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUuZGF0YS5uZWVkTG9naW4pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0b1N0YXRlLmRhdGEubmVlZExvZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZWVkTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgKGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEgJiYgdG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEgJiYgZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIHNlY29uZGFyeU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kYXJ5TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlOYW1lID0gdmlld05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAnLi92aWV3cy9hcHAvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHNlY29uZGFyeU5hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN3aXRjaCBVc2VyIFJvbGVcblxuICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlID0gZnVuY3Rpb24ocm9sZSwgcm9sZUlkLCByZWxvYWQsIHN0YXRlLCBzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gcm9sZTtcbiAgICAgICAgICAgICRjb29raWVzLnB1dCgnZmRfYWN0aXZlX3JvbGUnLCByb2xlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihzdGF0ZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAkc3RhdGUuY3VycmVudC5uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHN0YXRlUGFyYW1zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtcyA9ICRzdGF0ZS5jdXJyZW50LnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHVzZXJSb2xlVmlld3MgPSBbe1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwJyxcbiAgICAgICAgICAgICAgICB2aWV3OiAncXVpY2tVcGRhdGUnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnQ6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgIGludmVzdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWludmVzdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdxdWljay11cGRhdGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgdmlldzogJ21haW5AJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3QtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3QtanVyeScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ2NvbnRlc3QnKVxuICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh1c2VyUm9sZVZpZXdzLCBmdW5jdGlvbihyb2xlVmlldykge1xuICAgICAgICAgICAgICAgIHZhciByb2xlVGVtcGxhdGVWaWV3ID0gcm9sZVZpZXcucm9sZXNbcm9sZV07XG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSAkc3RhdGUuZ2V0KHJvbGVWaWV3LnJvdXRlKS52aWV3c1tyb2xlVmlldy52aWV3XTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZVRlbXBsYXRlVmlldykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcudGVtcGxhdGVVcmwgPSByb2xlVGVtcGxhdGVWaWV3O1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVZpZXcuZGVmYXVsdFRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2gocm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6IG1vZGVsID0gJy9hcGkvY3JlYXRvcnMvJyArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzogbW9kZWwgPSAnL2FwaS9pbnZlc3RvcnMvJyArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQobW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3JvbGVdID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEhhcyBVc2VyIFJvbGVcblxuICAgICAgICAkcm9vdFNjb3BlLmhhc1VzZXJSb2xlID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciBoYXNSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogcm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cbiAgICAuZGlyZWN0aXZlKCdmZENoYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjYW52YXMgaWQ9XCJmZENoYXJ0XCIgd2lkdGg9XCJ7e3dpZHRofX1cIiBoZWlnaHQ9XCJ7e2hlaWdodH19XCI+PC9jYW52YXM+JyxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS53aWR0aCA9ICRhdHRycy53aWR0aDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGVpZ2h0ID0gJGF0dHJzLmhlaWdodDtcblxuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykud2lkdGgoJGF0dHJzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5oZWlnaHQoJGF0dHJzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGllRGF0YUEgPSBbe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzAyNzUzZlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdWJsaWNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDk2LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjOTRjNDRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjOGNiYTQ3XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZ1bmRhdG9yXCJcbiAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lRGF0YUEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGxhbm5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDYwLCA1OSwgNjMsIDU5LCA1OCwgNjMsIDY0LCA2NSwgNjYsIDcwLCA3OV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVhbGl6ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCAyMiwgMTYsIDIxLCAxNywgMjAsIDI3LCAyNSwgMjMsIDMyLCA0MCwgNDVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYoJGF0dHJzLmRhdGEgPT09ICdBJyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKHBpZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHBpZURhdGFBKS5lYWNoKGZ1bmN0aW9uKGksIHRoZV9pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLnBpZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyt0aGVfaXRlbS5jb2xvcisnO1wiPjwvc3Bhbj4gJyt0aGVfaXRlbS52YWx1ZSsnJSAnK3RoZV9pdGVtLmxhYmVsKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuTGluZShsaW5lRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzAwNjgzNztcIj48L3NwYW4+IFJlYWxpemVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM5M0M2NTg7XCI+PC9zcGFuPiBQbGFubmVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cblx0LmRpcmVjdGl2ZSgnZmRMb2FkZXInLCBmdW5jdGlvbigpIHtcblx0ICByZXR1cm4ge1xuXHQgIFx0c2NvcGU6IHtcblx0ICBcdFx0dmlld0JveDogJ0AnXG5cdCAgXHR9LFxuXHQgICAgcmVzdHJpY3Q6ICdFJyxcblx0ICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImZkLWxvYWRlciBsYS1iYWxsLXB1bHNlXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyxcblx0ICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHQgICAgXHQkZWxlbWVudC5hZGRDbGFzcygkYXR0cnMuY2xhc3MpO1xuXHQgICAgfVxuXHQgIH07XG5cdH0pO1xufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cbiAgICAuZGlyZWN0aXZlKCdmZE1lc3NlbmdlcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRyZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImNoYXRib3hcIiBuZy1pZj1cInRocmVhZElkXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGF0Um93XCIgbmctcmVwZWF0PVwibWVzc2FnZSBpbiBtZXNzYWdlc1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXQtdXNlclNlbmRib3hcIiBuZy1jbGFzcz1cIntcXCdjaGF0LXNlbmRcXCc6IHVzZXIuaWQgPT0gbWVzc2FnZS51c2VyLmlkLCBcXCdjaGF0LWNvbWVpblxcJzogdXNlci5pZCAhPSBtZXNzYWdlLnVzZXIuaWR9XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPnt7bWVzc2FnZS5ib2R5fX08L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhaHQtbGFiZWxcIiBuZy1jbGFzcz1cXCd7XCJ0ZXh0LXJpZ2h0XCI6IHVzZXIuaWQgPT0gbWVzc2FnZS51c2VyLmlkfVxcJz4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICd7e21lc3NhZ2UudXNlci5uYW1lfX0gPHNwYW4+e3ttZXNzYWdlLmNyZWF0ZWRfYXQgfCBhbURhdGVGb3JtYXQ6XCJNTU0gRG8gWVlZWVwifX06PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8cCBjbGFzcz1cIm5vLWhhdmUgbm8tbWFyZ2luXCIgbmctaWY9XCJtZXNzYWdlcy5sZW5ndGggPT09IDBcIj5UaGVyZSBhcmUgY3VycmVudGx5IG5vIG1lc3NhZ2VzLjwvcD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8Zm9ybSBjbGFzcz1cImNoYXRzZW5kZm9ybVwiIG5nLWlmPVwidGhyZWFkSWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBtZXNzYWdlIGhlcmUgLi4uXCIgbmctbW9kZWw9XCJkYXRhLm1lc3NhZ2VUb1NlbmRcIiBmZC1lbnRlcj1cInNlbmRNZXNzYWdlKClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gc2VuZGJ0blwiIG5nLWNsaWNrPVwic2VuZE1lc3NhZ2UoKVwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uXCI+U2VuZDwvc3Bhbj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZm9ybT4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgdGhyZWFkSWQ6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhID0ge307XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlciA9ICRyb290U2NvcGUudXNlcjtcblxuICAgICAgICAgICAgICAgIHZhciBNZXNzYWdlID0gJHJlc291cmNlKCcvYXBpL21lc3NhZ2VzLzp0aHJlYWRJZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyZWFkSWQ6ICdAaWQnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ3RocmVhZElkJywgZnVuY3Rpb24odGhyZWFkSWQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRocmVhZElkKSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhyZWFkSWQgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBNZXNzYWdlLmdldCh7dGhyZWFkSWQ6ICRzY29wZS50aHJlYWRJZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXRyaXZpbmcgdGhlIHRocmVhZCA6ICcgKyAkc2NvcGUudGhyZWFkSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRocmVhZF9pZCA9ICRzY29wZS50aHJlYWRJZDtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlID0gJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZDtcblxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICBcdHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCduZ01pbicsIGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHJlc3RyaWN0OiAnQScsXG4gICAgXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgXHRcdFx0c2NvcGUuJHdhdGNoKGF0dHIubmdNaW4sIGZ1bmN0aW9uICgpIHtcbiAgICBcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShjdHJsLiR2aWV3VmFsdWUpO1xuICAgIFx0XHRcdH0pO1xuICAgIFx0XHRcdHZhciBtaW5WYWxpZGF0b3IgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21pblZhbGlkYXRvcicpO1xuICAgIFx0XHRcdFx0dmFyIG1pbiA9IHNjb3BlLiRldmFsKGF0dHIubmdNaW4pIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1pbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlIDwgbWluKTtcbiAgICBcdFx0XHRcdGlmICghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPCBtaW4pIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgZmFsc2UpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuICAgIFx0XHRcdFx0fSBlbHNlIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgdHJ1ZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9O1xuXG4gICAgXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdH1cbiAgICBcdH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbmdNYXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHRyZXN0cmljdDogJ0EnLFxuICAgIFx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgIFx0XHRcdHNjb3BlLiR3YXRjaChhdHRyLm5nTWF4LCBmdW5jdGlvbiAoKSB7XG4gICAgXHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoY3RybC4kdmlld1ZhbHVlKTtcbiAgICBcdFx0XHR9KTtcbiAgICBcdFx0XHR2YXIgbWF4VmFsaWRhdG9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXhWYWxpZGF0b3InKTtcbiAgICBcdFx0XHRcdHZhciBtYXggPSBzY29wZS4kZXZhbChhdHRyLm5nTWF4KSB8fCBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWF4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPiBtYXgpO1xuICAgIFx0XHRcdFx0aWYgKCFpc0VtcHR5KHZhbHVlKSAmJiB2YWx1ZSA+IG1heCkge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCBmYWxzZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG4gICAgXHRcdFx0XHR9IGVsc2Uge1xuICAgIFx0XHRcdFx0XHRjdHJsLiRzZXRWYWxpZGl0eSgnbmdNYXgnLCB0cnVlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH07XG5cbiAgICBcdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2gobWF4VmFsaWRhdG9yKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkUHJvZmlsZUlucHV0JywgZnVuY3Rpb24oJGNvbXBpbGUsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGZvcm06ICdAJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnQCcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICdAJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0AnLFxuICAgICAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgICAgIGZhY2Vib29rVmFsdWU6ICdAJyxcbiAgICAgICAgICAgICAgICBsaW5rZWRpblZhbHVlOiAnQCdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgICRzY29wZS5mb3JtRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29uZGl0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzUHJpc3RpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS52YWxpZGF0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICRzY29wZS52YWxpZGF0aW9uTWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlcGxhY2VWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgICBcdCRzY29wZS5uZ01vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctbW9kZWw9XCJuZ01vZGVsXCI+JyxcbiAgICAgICAgICAgICAgICAgICAgJ3RleHRhcmVhJzogJzx0ZXh0YXJlYSBjbGFzcz1cInRleHRhcmVhIGZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgcm93cz1cIjZcIj48L3RleHRhcmVhPicsXG4gICAgICAgICAgICAgICAgICAgIC8vICdlbWFpbCc6ICc8aW5wdXQgbmFtZT1cInt7ZmllbGR9fVwiIHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LWxnXCIgbmctZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cInVwZGF0ZSgpXCI+ICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICdkcm9wZG93bic6ICc8ZGl2IGNsYXNzPVwic2VsZWN0LXdyYXBlciBmdWxsXCI+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tYXJyb3ctYm90dG9tXCI+PC9zcGFuPjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbGdcIiBuZy1vcHRpb25zPVwidmFsdWUudmFsdWUgYXMgdmFsdWUubmFtZSBmb3IgdmFsdWUgaW4gdmFsdWVzXCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctY2hhbmdlPVwidXBkYXRlKClcIj48L3NlbGVjdD48L2Rpdj4nLFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1skc2NvcGUudHlwZV07XG5cbiAgICAgICAgICAgICAgICB2YXIgc29jaWFsQWx0ZXJuYXRpdmUgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSAhPT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgIFx0c29jaWFsQWx0ZXJuYXRpdmUgPSAnPGRpdiBjbGFzcz1cInNvY2lhbC1hbHRlcm5hdGl2ZVwiPicgK1xuICAgICAgICAgICAgICAgIFx0JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWZhY2Vib29rXCIgdWliLXRvb2x0aXA9XCJ7e2ZhY2Vib29rVmFsdWV9fVwiIG5nLWNsYXNzPVwie1xcJ2NoZWNrZWRcXCc6IChuZ01vZGVsID09PSBmYWNlYm9va1ZhbHVlKSAmJiBuZ01vZGVsICE9PSBcXCdcXCd9XCIgbmctZGlzYWJsZWQ9XCIhZmFjZWJvb2tWYWx1ZVwiIG5nLWNsaWNrPVwicmVwbGFjZVZhbHVlKGZhY2Vib29rVmFsdWUpXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgIFx0JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWxpbmtlZGluMlwiIHVpYi10b29sdGlwPVwie3tsaW5rZWRpblZhbHVlfX1cIiBuZy1jbGFzcz1cIntcXCdjaGVja2VkXFwnOiAobmdNb2RlbCA9PT0gbGlua2VkaW5WYWx1ZSkgJiYgbmdNb2RlbCAhPT0gXFwnXFwnfVwiIG5nLWRpc2FibGVkPVwiIWxpbmtlZGluVmFsdWVcIiBuZy1jbGljaz1cInJlcGxhY2VWYWx1ZShsaW5rZWRpblZhbHVlKVwiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICBcdCc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9XG5cdCAgICAgICAgICAgICAgICAnPGRpdj4nICtcblx0ICAgICAgICAgICAgICAgICc8bGFiZWw+e3tsYWJlbH19OjwvbGFiZWw+JyArXG5cdCAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcblx0ICAgICAgICAgICAgICAgIFx0ZmllbGQgK1xuXHQgICAgICAgICAgICAgICAgXHRzb2NpYWxBbHRlcm5hdGl2ZSArXG5cdCAgICAgICAgICAgICAgICAnPC9kaXY+PC9kaXY+JztcblxuICAgICAgICAgICAgICAgICRlbGVtZW50Lmh0bWwoJGNvbXBpbGUodGVtcGxhdGUpKCRzY29wZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpe1xuICAgICAgICAkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmhvbWUnLCB7fSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICAkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL3NpZ251cCcsIHVzZXJJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MgPT09IHRydWUgJiYgdHlwZW9mKHJlc3VsdC5kYXRhLm1lc3NhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSByZXN1bHQuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRhdXRoLmxvZ2luKGNyZWRlbnRpYWxzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhLnRva2VuKTtcblxuICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN0YXRlID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTdGF0ZVBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGFjdGl2ZVN0YXRlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGguc2lnbnVwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShwYXlsb2FkLnJvbGUsIHBheWxvYWQucm9sZV9pZCwgdHJ1ZSwgYWN0aXZlU3RhdGUsIGFjdGl2ZVN0YXRlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzVGV4dCA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdUaGUgZW1haWwgb3IgcGFzc3dvcmQgeW91IGVudGVyZWQgaXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVyci5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAgICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb3QgTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDb25maXJtQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHApe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMuY29kZSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb25maXJtYXRpb25fY29kZTogJHN0YXRlUGFyYW1zLmNvZGUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9jb25maXJtJywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLmVycm9yO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aFJlY292ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHJlY292ZXJ5RW1haWw6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmRfcmVwZWF0OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLnRva2VuKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZWNvdmVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5yZWNvdmVyeUVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9mb3Jnb3QnLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gJ0EgcGFzc3dvcmQgcmVzZXQgbGluayBoYXMgYmVlbiBzZW50IHRvIHlvdXIgZW1haWwuJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQubGVuZ3RoID49IDYpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQgPT09ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICRzdGF0ZVBhcmFtcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL3JlY292ZXInLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5yZW1vdmVUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIGZyb20gaGVyZSAuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBkbyBub3QgbWF0Y2ghJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBuZWVkIHRvIGJlIGxvbmdlciB0aGFuIDYgY2hhcmFjdGVycyEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YVVSSSk7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZm9jdXNPbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHsgZm9jdXNPbjogJz0nIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3BlLmZvY3VzT24pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuZm9jdXNPbil7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICB9O1xuICAgIH0pO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHJlc291cmNlLCBGZFNjcm9sbGVyLCAkZmlsdGVyLCBGaWxlVXBsb2FkZXIpIHtcblxuICAgICAgICAkc2NvcGUuZm9ybSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiAxLFxuICAgICAgICAgICAgdG90YWxTdGVwczogM1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b3RhbFN0ZXBzID0ge1xuICAgICAgICAgICAgY3JlYXRvcjogMyxcbiAgICAgICAgICAgIGV4cGVydDogNCxcbiAgICAgICAgICAgIGludmVzdG9yOiA0XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZUZvcm1TdGVwID0gZnVuY3Rpb24obmV3U3RlcCl7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCA9IG5ld1N0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gWydBZmdoYW5pc3RhbicsICfDhWxhbmQgSXNsYW5kcycsICdBbGJhbmlhJywgJ0FsZ2VyaWEnLCAnQW1lcmljYW4gU2Ftb2EnLCAnQW5kb3JyQScsICdBbmdvbGEnLCAnQW5ndWlsbGEnLCAnQW50YXJjdGljYScsICdBbnRpZ3VhIGFuZCBCYXJidWRhJywgJ0FyZ2VudGluYScsICdBcm1lbmlhJywgJ0FydWJhJywgJ0F1c3RyYWxpYScsICdBdXN0cmlhJywgJ0F6ZXJiYWlqYW4nLCAnQmFoYW1hcycsICdCYWhyYWluJywgJ0JhbmdsYWRlc2gnLCAnQmFyYmFkb3MnLCAnQmVsYXJ1cycsICdCZWxnaXVtJywgJ0JlbGl6ZScsICdCZW5pbicsICdCZXJtdWRhJywgJ0JodXRhbicsICdCb2xpdmlhJywgJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnLCAnQm90c3dhbmEnLCAnQm91dmV0IElzbGFuZCcsICdCcmF6aWwnLCAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JywgJ0JydW5laSBEYXJ1c3NhbGFtJywgJ0J1bGdhcmlhJywgJ0J1cmtpbmEgRmFzbycsICdCdXJ1bmRpJywgJ0NhbWJvZGlhJywgJ0NhbWVyb29uJywgJ0NhbmFkYScsICdDYXBlIFZlcmRlJywgJ0NheW1hbiBJc2xhbmRzJywgJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycsICdDaGFkJywgJ0NoaWxlJywgJ0NoaW5hJywgJ0NocmlzdG1hcyBJc2xhbmQnLCAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLCAnQ29sb21iaWEnLCAnQ29tb3JvcycsICdDb25nbycsICdDb25nbywgVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlJywgJ0Nvb2sgSXNsYW5kcycsICdDb3N0YSBSaWNhJywgJ0NvdGUgRFxcJ0l2b2lyZScsICdDcm9hdGlhJywgJ0N1YmEnLCAnQ3lwcnVzJywgJ0N6ZWNoIFJlcHVibGljJywgJ0Rlbm1hcmsnLCAnRGppYm91dGknLCAnRG9taW5pY2EnLCAnRG9taW5pY2FuIFJlcHVibGljJywgJ0VjdWFkb3InLCAnRWd5cHQnLCAnRWwgU2FsdmFkb3InLCAnRXF1YXRvcmlhbCBHdWluZWEnLCAnRXJpdHJlYScsICdFc3RvbmlhJywgJ0V0aGlvcGlhJywgJ0ZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKScsICdGYXJvZSBJc2xhbmRzJywgJ0ZpamknLCAnRmlubGFuZCcsICdGcmFuY2UnLCAnRnJlbmNoIEd1aWFuYScsICdGcmVuY2ggUG9seW5lc2lhJywgJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycsICdHYWJvbicsICdHYW1iaWEnLCAnR2VvcmdpYScsICdHZXJtYW55JywgJ0doYW5hJywgJ0dpYnJhbHRhcicsICdHcmVlY2UnLCAnR3JlZW5sYW5kJywgJ0dyZW5hZGEnLCAnR3VhZGVsb3VwZScsICdHdWFtJywgJ0d1YXRlbWFsYScsICdHdWVybnNleScsICdHdWluZWEnLCAnR3VpbmVhLUJpc3NhdScsICdHdXlhbmEnLCAnSGFpdGknLCAnSGVhcmQgSXNsYW5kIGFuZCBNY2RvbmFsZCBJc2xhbmRzJywgJ0hvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpJywgJ0hvbmR1cmFzJywgJ0hvbmcgS29uZycsICdIdW5nYXJ5JywgJ0ljZWxhbmQnLCAnSW5kaWEnLCAnSW5kb25lc2lhJywgJ0lyYW4sIElzbGFtaWMgUmVwdWJsaWMgT2YnLCAnSXJhcScsICdJcmVsYW5kJywgJ0lzbGUgb2YgTWFuJywgJ0lzcmFlbCcsICdJdGFseScsICdKYW1haWNhJywgJ0phcGFuJywgJ0plcnNleScsICdKb3JkYW4nLCAnS2F6YWtoc3RhbicsICdLZW55YScsICdLaXJpYmF0aScsICdLb3JlYSwgRGVtb2NyYXRpYyBQZW9wbGVcXCdTIFJlcHVibGljIG9mJywgJ0tvcmVhLCBSZXB1YmxpYyBvZicsICdLdXdhaXQnLCAnS3lyZ3l6c3RhbicsICdMYW8gUGVvcGxlXFwnUyBEZW1vY3JhdGljIFJlcHVibGljJywgJ0xhdHZpYScsICdMZWJhbm9uJywgJ0xlc290aG8nLCAnTGliZXJpYScsICdMaWJ5YW4gQXJhYiBKYW1haGlyaXlhJywgJ0xpZWNodGVuc3RlaW4nLCAnTGl0aHVhbmlhJywgJ0x1eGVtYm91cmcnLCAnTWFjYW8nLCAnTWFjZWRvbmlhLCBUaGUgRm9ybWVyIFl1Z29zbGF2IFJlcHVibGljIG9mJywgJ01hZGFnYXNjYXInLCAnTWFsYXdpJywgJ01hbGF5c2lhJywgJ01hbGRpdmVzJywgJ01hbGknLCAnTWFsdGEnLCAnTWFyc2hhbGwgSXNsYW5kcycsICdNYXJ0aW5pcXVlJywgJ01hdXJpdGFuaWEnLCAnTWF1cml0aXVzJywgJ01heW90dGUnLCAnTWV4aWNvJywgJ01pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2YnLCAnTW9sZG92YSwgUmVwdWJsaWMgb2YnLCAnTW9uYWNvJywgJ01vbmdvbGlhJywgJ01vbnRzZXJyYXQnLCAnTW9yb2NjbycsICdNb3phbWJpcXVlJywgJ015YW5tYXInLCAnTmFtaWJpYScsICdOYXVydScsICdOZXBhbCcsICdOZXRoZXJsYW5kcycsICdOZXRoZXJsYW5kcyBBbnRpbGxlcycsICdOZXcgQ2FsZWRvbmlhJywgJ05ldyBaZWFsYW5kJywgJ05pY2FyYWd1YScsICdOaWdlcicsICdOaWdlcmlhJywgJ05pdWUnLCAnTm9yZm9sayBJc2xhbmQnLCAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgJ05vcndheScsICdPbWFuJywgJ1Bha2lzdGFuJywgJ1BhbGF1JywgJ1BhbGVzdGluaWFuIFRlcnJpdG9yeSwgT2NjdXBpZWQnLCAnUGFuYW1hJywgJ1BhcHVhIE5ldyBHdWluZWEnLCAnUGFyYWd1YXknLCAnUGVydScsICdQaGlsaXBwaW5lcycsICdQaXRjYWlybicsICdQb2xhbmQnLCAnUG9ydHVnYWwnLCAnUHVlcnRvIFJpY28nLCAnUWF0YXInLCAnUmV1bmlvbicsICdSb21hbmlhJywgJ1J1c3NpYW4gRmVkZXJhdGlvbicsICdSV0FOREEnLCAnU2FpbnQgSGVsZW5hJywgJ1NhaW50IEtpdHRzIGFuZCBOZXZpcycsICdTYWludCBMdWNpYScsICdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJywgJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJywgJ1NhbW9hJywgJ1NhbiBNYXJpbm8nLCAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJywgJ1NhdWRpIEFyYWJpYScsICdTZW5lZ2FsJywgJ1NlcmJpYSBhbmQgTW9udGVuZWdybycsICdTZXljaGVsbGVzJywgJ1NpZXJyYSBMZW9uZScsICdTaW5nYXBvcmUnLCAnU2xvdmFraWEnLCAnU2xvdmVuaWEnLCAnU29sb21vbiBJc2xhbmRzJywgJ1NvbWFsaWEnLCAnU291dGggQWZyaWNhJywgJ1NvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJywgJ1NwYWluJywgJ1NyaSBMYW5rYScsICdTdWRhbicsICdTdXJpbmFtZScsICdTdmFsYmFyZCBhbmQgSmFuIE1heWVuJywgJ1N3YXppbGFuZCcsICdTd2VkZW4nLCAnU3dpdHplcmxhbmQnLCAnU3lyaWFuIEFyYWIgUmVwdWJsaWMnLCAnVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYScsICdUYWppa2lzdGFuJywgJ1RhbnphbmlhLCBVbml0ZWQgUmVwdWJsaWMgb2YnLCAnVGhhaWxhbmQnLCAnVGltb3ItTGVzdGUnLCAnVG9nbycsICdUb2tlbGF1JywgJ1RvbmdhJywgJ1RyaW5pZGFkIGFuZCBUb2JhZ28nLCAnVHVuaXNpYScsICdUdXJrZXknLCAnVHVya21lbmlzdGFuJywgJ1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcycsICdUdXZhbHUnLCAnVWdhbmRhJywgJ1VrcmFpbmUnLCAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnLCAnVW5pdGVkIEtpbmdkb20nLCAnVW5pdGVkIFN0YXRlcycsICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnLCAnVXJ1Z3VheScsICdVemJla2lzdGFuJywgJ1ZhbnVhdHUnLCAnVmVuZXp1ZWxhJywgJ1ZpZXQgTmFtJywgJ1ZpcmdpbiBJc2xhbmRzLCBCcml0aXNoJywgJ1ZpcmdpbiBJc2xhbmRzLCBVLlMuJywgJ1dhbGxpcyBhbmQgRnV0dW5hJywgJ1dlc3Rlcm4gU2FoYXJhJywgJ1llbWVuJywgJ1phbWJpYScsICdaaW1iYWJ3ZSddO1xuXG4gICAgICAgICRzY29wZS5jb250YWN0VGltZXMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dvcmtpbmcgaG91cnMgKDlhbSB0byA2IHBtKScsIHZhbHVlOiAnOS02J30sXG4gICAgICAgICAgICB7bmFtZTogJ0V2ZW5pbmcgdGltZSAoNmFtIHRvIDkgcG0pJywgdmFsdWU6ICc2LTknfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRSb2xlOiAnY3JlYXRvcicsXG4gICAgICAgICAgICBhZ2VHYXRlOiAneWVzJyxcbiAgICAgICAgICAgIGNvdW50cnlPcmlnaW46ICcnLFxuICAgICAgICAgICAgY291bnRyeVJlc2lkZW5jZTogJycsXG4gICAgICAgICAgICBjb250YWN0VGltZTogJycsXG4gICAgICAgICAgICBleHBlcnRpc2VGb3JtOiB7XG4gICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JvcHBlZFRodW1ibmFpbDogbnVsbCxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0udG90YWxTdGVwcyA9ICRzY29wZS50b3RhbFN0ZXBzWyRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZV07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSAqIDEwMCwgOTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzSW52ZXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgoKDEgLSAoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSkgKiAxMDApLCA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHVzZXIucmVnaXN0ZXJlZCA9PSAxKSAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ292ZXIgZHJhZ2xlYXZlIGRyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnbGVhdmUnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvZmlsZXMnLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1JbWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSAkc2NvcGUuZGF0YS5jcm9wcGVkVGh1bWJuYWlsO1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzcG9uc2UuZmlsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9ICdZb3VyIHByb2ZpbGUgcGljdHVyZSB3YXMgc3VjY2Vzc2Z1bGx5IHVwbG9hZGVkISc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlRXJyb3IgPSAnUHJvZmlsZSBwaWN0dXJlIGZhaWxlZCB0byB1cGxvYWQsIHBsZWFzZSB0cnkgYWdhaW4hJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKGltYWdlKSk7XG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5hbGxTa2lsbHMgPSAkcmVzb3VyY2UoJ2FwaS9za2lsbHMnKS5xdWVyeSgpO1xuXG4gICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpe1xuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dHRlZEV4cGVydGlzZSA9IHtzZWxlY3RlZEV4cGVydGlzZTogJ251bGwnLCBvdGhlckV4cGVydGlzZToge3N0YXR1czogMX19O1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFskc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtMV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsYXN0SW5wdXR0ZWRFeHBlcnRpc2UpO1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPCAzICYmIChsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UgIT09IG51bGwgJiYgbGFzdElucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2U6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBvdGhlclNraWxsczoge2xpc3Q6IFtdLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZUNhdGVnb3J5LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkoaW5kZXgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihlLCBpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZSl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IGV4cGVydGlzZTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihlLCBpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2Uuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmluU2tpbGxzID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIHZhciBmb3VuZFNraWxsID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihmb3VuZFNraWxsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRTa2lsbC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0U2tpbGwgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgaWYoISRzY29wZS5pblNraWxscyhpbmRleCwgc2tpbGwpKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscy5wdXNoKHNraWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0U2tpbGwgPSBmdW5jdGlvbihlLCBpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhYW5ndWxhci5lcXVhbHMoYWN0dWFsLCBleHBlY3RlZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlU2tpbGxzID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMgPSB7bGlzdDogW10sIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvMCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS9jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UuaWQgKyAnL3NraWxscy8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5zdWJtaXREZXRhaWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5mbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICRzY29wZS5kYXRhLmxuYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSxcbiAgICAgICAgICAgICAgICBhZ2VfZ2F0ZTogJHNjb3BlLmRhdGEuYWdlR2F0ZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X29yaWdpbjogJHNjb3BlLmRhdGEuY291bnRyeU9yaWdpbixcbiAgICAgICAgICAgICAgICBjb3VudHJ5X3Jlc2lkZW5jZTogJHNjb3BlLmRhdGEuY291bnRyeVJlc2lkZW5jZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X251bWJlcjogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlcixcbiAgICAgICAgICAgICAgICBjb250YWN0X3RpbWU6ICRzY29wZS5kYXRhLmNvbnRhY3RUaW1lLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2goJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlc3RtZW50QnVkZ2V0ID09PSAnb3RoZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0T3RoZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXQgPSBpbnZlc3RtZW50QnVkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2dvYWwgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRHb2FsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X3JlYXNvbiA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudFJlYXNvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuY3JlYXRvciA9IHt9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4cGVydCc6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydCA9IHsgbGlzdDogW10gfTtcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCwgZnVuY3Rpb24oaW5wdXR0ZWRFeHBlcnRpc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsIHx8IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJ0Lmxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHM6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkU2tpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRhdGEpO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvdXNlcnMvJyArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubmFtZSA9ICRzY29wZS5kYXRhLmZuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubGFzdF9uYW1lID0gJHNjb3BlLmRhdGEubG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGU7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gW107XG4gICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzID0gW107XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJyAmJiB0eXBlb2YoJHJvb3RTY29wZS51c2VyLmNyZWF0b3IpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgb2djIGluICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0W29nY107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2djSW5kZXggPSAkc2NvcGUuY29udGVzdHMuaW5kZXhPZihjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZ2NJbmRleCA6ICcgKyBvZ2NJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdHMuc3BsaWNlKG9nY0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmICRyb290U2NvcGUudXNlci5qdWRnaW5nLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgamMgaW4gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5qdWRnaW5nW2pjXS5jb250ZXN0X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5mZEVudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RTaW5nbGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkZmlsdGVyLCAkdGltZW91dCwgRmRTY3JvbGxlciwgJGh0dHAsIExpZ2h0Ym94KSB7XG4gICAgICAgICRzY29wZS5jb250ZXN0SWQgPSAkc3RhdGVQYXJhbXMuY29udGVzdElkO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnRlc3RGdWxsRGVzY3JpcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnk6IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnlGb3JtOiB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXM6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRyeTogbnVsbCxcbiAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJycsXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJycsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeSA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyaWVzLzplbnRyeUlkJywge1xuICAgICAgICAgICAgZW50cnlJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29udGVzdGFudEVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvY3JlYXRvci86Y3JlYXRvcklkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAganVkZ2VFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2p1ZGdlLzpqdWRnZUlkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvOmVudHJ5SWQvbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeVJhdGluZyA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyeS1yYXRpbmdzLzplbnRyeVJhdGluZ0lkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5zaG93RnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5oaWRlRnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbnRlc3QuZ2V0KHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZFxuICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdKdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGNvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdDb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoanVkZ2VhYmxlLmxlbmd0aCA+IDAgJiYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2p1cnknICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2NyZWF0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuY29udGVzdElkID0gcmVzdWx0LmlkO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3Lm9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2p1cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogcmVzdWx0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYganVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdKdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nSnVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXN0aW5nLmxlbmd0aCA+IDAgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJHJvb3RTY29wZS5hY3RpdmVSb2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGVuZGluZ0NvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nQ29udGVzdGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2p1cnknOlxuICAgICAgICAgICAgICAgICAgICBFbnRyeS5qdWRnZUVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAganVkZ2VJZDogJHJvb3RTY29wZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRvciA9IHJvbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBFbnRyeS5jb250ZXN0YW50RW50cmllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5ID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuZW50cmllcy1saXN0Jyk7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZUlkID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknKSB7XG4gICAgICAgICAgICAgICAganVkZ2VJZCA9ICRyb290U2NvcGUudXNlci5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGp1ZGdlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZW50cmllcy8nICsgZW50cnkuaWQgKyAnL2p1ZGdlLycgKyBqdWRnZUlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcgPSByZXN1bHQuZGF0YS5yYXRpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIEVudHJ5LmdldCh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5SWQ6IGVudHJ5LmlkXG4gICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5vcGVuTGlnaHRib3ggPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgYWxsRmlsZXMgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmZpbGVzO1xuICAgICAgICAgICAgdmFyIGFsbEltYWdlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgICAgIGZvcih2YXIgYUYgaW4gYWxsRmlsZXMpe1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gYWxsRmlsZXNbYUZdO1xuICAgICAgICAgICAgICAgIGFsbEltYWdlcy5wdXNoKGZpbGUudXJsKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlLnVybCA9PT0gaXRlbS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gYUY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMaWdodGJveC5vcGVuTW9kYWwoYWxsSW1hZ2VzLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24gKGV2ZW50LCAkZmxvdywgZmxvd0ZpbGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZUFkZGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmbG93RmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZpbGUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIGZpbGVzIDogJyArIG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICAkZmlsZS5yZWZfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG5cbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IG1lc3NhZ2UuZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihtZXNzYWdlLmZpbGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmZpbGUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVSZW1vdmUgPSBmdW5jdGlvbihmaWxlLCAkZmxvdykge1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW1zID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMsIHtpZDogZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihmaWxlLnJlZl9pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmlsZXNJbmRleCA9ICRmbG93LmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgICAgICBpZiAoZmlsZXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZlIGZpbGVzIC4uLiAnICsgZmlsZXNJbmRleCk7XG4gICAgICAgICAgICAgICAgJGZsb3cuZmlsZXMuc3BsaWNlKGZpbGVzSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdy5maWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2hvd0FkZEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uID0gJHNjb3BlLmNvbnRlc3QuZW50cmllc1skc2NvcGUuY29udGVzdC5lbnRyaWVzLmxlbmd0aCAtIDFdLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hlZEZpbGVzID0ge307XG4gICAgICAgICAgICB2YXIgdGh1bWJuYWlsX2lkID0gbnVsbDtcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5mbG93LmZpbGVzLCBmdW5jdGlvbihmaWxlKXtcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzW2ZpbGUucmVmX2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhcHRpb24nOiBmaWxlLnJlZl9jYXB0aW9uXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVwYXJlIHRvIGFzc2lnbiB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5maWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSAhPT0gLTEgJiYgdGh1bWJuYWlsX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3aG9vcGllIGl0IG1hdGNoZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsX2lkID0gZmlsZS5yZWZfaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogJ2NyZWF0b3InfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IG5ldyBFbnRyeSgpO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNyZWF0b3JfaWQgPSByb2xlLmlkO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNvbnRlc3RfaWQgPSAkc2NvcGUuY29udGVzdC5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS50aHVtYm5haWxfaWQgPSB0aHVtYm5haWxfaWQ7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS5uYW1lID0gJHJvb3RTY29wZS51c2VyLm5hbWUgKyBcIidzIEVudHJ5XCI7XG4gICAgICAgICAgICAgICAgZW50cnkuZGVzY3JpcHRpb24gPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgZW50cnkuYXR0YWNoZWRfZmlsZXMgPSBhdHRhY2hlZEZpbGVzO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkudGh1bWJuYWlsX2lkKTtcblxuICAgICAgICAgICAgICAgIGVudHJ5LiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cnkgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSAgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0RW50cnkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnY3JlYXRvcicpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBFbnRyeS5zZW5kTWVzc2FnZSh7ZW50cnlJZDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZH0sIG1lc3NhZ2VSZXF1ZXN0LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZU1hcmtzID0gZnVuY3Rpb24oZW50cnlSYXRpbmdJZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB1cGRhdGVkUmF0aW5nID0ge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuZGVzaWduLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmNyZWF0aXZpdHksXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuaW5kdXN0cmlhbCxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLm1hcmtldCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuanVkZ2VfaWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmVudHJ5X2lkID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihlbnRyeVJhdGluZ0lkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBFbnRyeVJhdGluZy51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiBlbnRyeVJhdGluZ0lkXG4gICAgICAgICAgICAgICAgfSwgdXBkYXRlZFJhdGluZykuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIHNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2p1cnknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlSYXRpbmcgPSBuZXcgRW50cnlSYXRpbmcodXBkYXRlZFJhdGluZyk7XG4gICAgICAgICAgICAgICAgZW50cnlSYXRpbmcuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgY3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUp1ZGdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hY2NlcHRKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy9iZWNvbWVKdWRnZScsIHtjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdC5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUNvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gU2hvdyBOREFcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0Q29udGVzdGFudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzL2JlY29tZUNvbnRlc3RhbnQnLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQsICRmaWx0ZXIsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZSBTdGFydGVkJyk7XG4gICAgICAgIC8vICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gQXZhaWxhYmxlIFZpZXdzIDogTGlzdCwgQ3JlYXRlXG4gICAgICAgICRzY29wZS52aWV3ID0gJ2xpc3QnO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Byb2plY3RMb2FkaW5nOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gbnVsbDtcblxuICAgICAgICB2YXIgUHJvamVjdCA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0cy86cHJvamVjdElkJywge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXF1aXJlZFJvbGUgPSAnY3JlYXRvcic7XG4gICAgICAgIHZhciBtYXRjaGluZ1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHsgcm9sZTogcmVxdWlyZWRSb2xlIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YobWF0Y2hpbmdSb2xlcykgIT09ICd1bmRlZmluZWQnICYmIG1hdGNoaW5nUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nUm9sZSA9IG1hdGNoaW5nUm9sZXNbMF07XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09IHJlcXVpcmVkUm9sZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocmVxdWlyZWRSb2xlLCBtYXRjaGluZ1JvbGUuaWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJvamVjdElkID0gcGFyc2VJbnQoJHN0YXRlUGFyYW1zLnByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdElkKSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXNOYU4ocHJvamVjdElkKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxsUHJvamVjdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzTnVtYmVyKHByb2plY3RJZCkgJiYgaXNGaW5pdGUocHJvamVjdElkKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3QuZ2V0KHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5zdXBlcmV4cGVydCcsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydHMnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWtlIHVwIHlvdXIgbWluZCB5b3UgcGVpY2Ugb2Ygc2hpdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmhvbWUnKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdvVG9Qcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7IHByb2plY3RJZDogcHJvamVjdC5pZCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jcmVhdGVOZXdQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5uZXdQcm9qZWN0TG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoKS4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmdvVG9Qcm9qZWN0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubmV3UHJvamVjdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NhdmluZyBwcm9ncmVzcyBub3cgIScpO1xuICAgICAgICAgICAgdmFyIHByb2plY3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnByb2plY3QpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHNjb3BlLnByb2plY3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIFByb2plY3QudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZFxuICAgICAgICAgICAgICAgIH0sIHByb2plY3QpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZURldGFpbHNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVEZXRhaWxzQ3RybCBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBmZWF0dXJlZEltYWdlOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZXRhaWxzID0ge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBnZW9ncmFwaHk6ICd3aGVyZXZlcidcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICAgICAgaWYgKHByb2plY3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRldGFpbHMgPSBwcm9qZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdCBzdGlsbCBsb2FkaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS4kb24oJ2Zsb3c6OmZpbGVBZGRlZCcsIGZ1bmN0aW9uKGV2ZW50LCAkZmxvdywgZmxvd0ZpbGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZSBhZGRlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZmVhdHVyZWRJbWFnZVN1Y2Nlc3MgPSBmdW5jdGlvbigkZmlsZSwgJG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZSgkbWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmlsZSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgZmlsZXMgOiAnICsgbWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnRodW1ibmFpbF9pZCA9IG1lc3NhZ2UuZmlsZS5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hdHRhY2hlZEZpbGVzU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5wcm9qZWN0LmF0dGFjaGVkRmlsZXMuaW5kZXhPZihtZXNzYWdlLmZpbGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3QuYXR0YWNoZWRGaWxlcy5wdXNoKG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc3VibWl0RHJhZnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN0YXRlID0gMTtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignI3Byb2plY3RTdGVwcycpO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlU0VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRodHRwLCAkdGltZW91dCwgRmRTY3JvbGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlU0VDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvc3VwZXItZXhwZXJ0cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuc3VwZXJFeHBlcnRzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jaG9vc2VTdXBlckV4cGVydCA9IGZ1bmN0aW9uKHN1cGVyRXhwZXJ0KSB7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdXBlcl9leHBlcnRfaWQgPSBzdXBlckV4cGVydC5pZDtcbiAgICAgICAgICAgICRzY29wZS5zYXZlUHJvZ3Jlc3MoKTtcblxuICAgICAgICAgICAgRmRTY3JvbGxlci50b1NlY3Rpb24oJy5zdGVwcy1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5leHBlcnRpc2UnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NyZWF0ZUV4cGVydGlzZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUV4cGVydGlzZUN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QgPSBbXTtcblxuICAgICAgICB2YXIgUHJvamVjdEV4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0cy86cHJvamVjdElkL2V4cGVydGlzZScsIHtcbiAgICAgICAgICAgIHByb2plY3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgUHJvamVjdEV4cGVydGlzZS5xdWVyeSh7cHJvamVjdElkOiAkc2NvcGUucHJvamVjdC5pZH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJvamVjdCcsIGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZihwcm9qZWN0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvamVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zYXZlRXhwZXJ0aXNlID0gZnVuY3Rpb24oZXhwZXJ0aXNlKXtcbiAgICAgICAgICAgIHZhciBwcm9qZWN0RXhwZXJ0aXNlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnZXhwZXJ0aXNlX2lkJzogZXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLmlkLFxuICAgICAgICAgICAgICAgICd0YXNrJzogZXhwZXJ0aXNlLm1haW5UYXNrLFxuICAgICAgICAgICAgICAgICdidWRnZXQnOiBleHBlcnRpc2UuYnVkZ2V0LFxuICAgICAgICAgICAgICAgICdsZWFkX3RpbWUnOiBleHBlcnRpc2UubGVhZFRpbWUsXG4gICAgICAgICAgICAgICAgJ3N0YXJ0X2RhdGUnOiBleHBlcnRpc2Uuc3RhcnREYXRlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3Byb2plY3RzLycgKyAkc2NvcGUucHJvamVjdC5pZCArICcvZXhwZXJ0aXNlJywgcHJvamVjdEV4cGVydGlzZURhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZUxpc3QucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gJHNjb3BlLmV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAvLyAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnk6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5Lm5hbWUsXG4gICAgICAgICAgICAvLyAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5Lm5hbWUsXG4gICAgICAgICAgICAvLyAgICAgZXhwZXJ0aXNlOiBleHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UubmFtZSxcbiAgICAgICAgICAgIC8vICAgICBtYWluVGFzazogZXhwZXJ0aXNlLm1haW5UYXNrLFxuICAgICAgICAgICAgLy8gICAgIGJ1ZGdldDogZXhwZXJ0aXNlLmJ1ZGdldCxcbiAgICAgICAgICAgIC8vICAgICBsZWFkVGltZTogZXhwZXJ0aXNlLmxlYWRUaW1lLFxuICAgICAgICAgICAgLy8gICAgIHN0YXJ0RGF0ZTogZXhwZXJ0aXNlLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZUV4cGVydGlzZVNlbGVjdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUucHJvamVjdC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzKCk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuc3RlcHMtY29udGVudCcpO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZXhwZXJ0aXNlJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBsYXN0SW5wdXR0ZWRFeHBlcnRpc2UgPSB7IHNlbGVjdGVkRXhwZXJ0aXNlOiAnbnVsbCcsIG90aGVyRXhwZXJ0aXNlOiB7IHN0YXR1czogMSB9IH07XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0WyRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCA8IDMgJiYgKGxhc3RJbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZSAhPT0gbnVsbCAmJiBsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uub3RoZXJFeHBlcnRpc2Uuc3RhdHVzICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZUNhdGVnb3J5OiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeTogeyBuYW1lOiAnJywgc3RhdHVzOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZTogeyBuYW1lOiAnJywgc3RhdHVzOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW5UYXNrOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgYnVkZ2V0OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbGVhZFRpbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZUNhdGVnb3J5LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5KGluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihlLCBpbmRleCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IGV4cGVydGlzZTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGUsIGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2Uuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZU90aGVyRXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LzAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlL2NhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRXhwZXJ0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZUV4cGVydEN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoJy9hcGkvcHJvamVjdHMvOnByb2plY3RJZC9leHBlcnRpc2UnLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLnF1ZXJ5KHtwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHByb2plY3QpID09PSAndW5kZWZpbmVkJyB8fCBwcm9qZWN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnNob3J0bGlzdEV4cGVydCA9IGZ1bmN0aW9uKGV4cGVydGlzZSwgYmlkKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoZXhwZXJ0aXNlLnNob3J0bGlzdCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZXhwZXJ0aXNlLnNob3J0bGlzdCA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleHBlcnRpc2Uuc2hvcnRsaXN0LnB1c2goYmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kaXNjdXNzRXhwZXJ0ID0gZnVuY3Rpb24oZXhwZXJ0aXNlLCBiaWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRCaWQgPSBiaWRcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVCdWRnZXRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlQnVkZ2V0Q3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVJbnZlc3RvcnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlSW52ZXN0b3JzQ3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRmaWx0ZXIsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydCBTdGFydGVkJyk7XG5cbiAgICAgICAgdmFyIEF2YWlsYWJsZUV4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9leHBlcnRpc2UvYXZhaWxhYmxlJyk7XG5cbiAgICAgICAgdmFyIE1hdGNoaW5nRXhwZXJ0aXNlID0gJHJlc291cmNlKCcvYXBpL2V4cGVydGlzZS9tYXRjaGluZycsIHt9LCB7XG4gICAgICAgIFx0cXVlcnk6IHtcbiAgICAgICAgXHRcdG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIFx0XHRpc0FycmF5OiBmYWxzZVxuICAgICAgICBcdH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkUm9sZSA9ICdleHBlcnQnO1xuICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7IHJvbGU6IHJlcXVpcmVkUm9sZSB9LCB0cnVlKTtcblxuICAgICAgICB2YXIgYWNjZXNzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZihtYXRjaGluZ1JvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgbWF0Y2hpbmdSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdSb2xlID0gbWF0Y2hpbmdSb2xlc1swXTtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gcmVxdWlyZWRSb2xlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyZXF1aXJlZFJvbGUsIG1hdGNoaW5nUm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWNjZXNzKSB7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIFx0QXZhaWxhYmxlRXhwZXJ0aXNlLnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdFx0Y29uc29sZS5sb2coJ0FsbCBhdmFpbGFibGUgZXhwZXJ0aXNlJyk7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdH0pO1xuXG4gICAgICAgIFx0TWF0Y2hpbmdFeHBlcnRpc2UucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnQWxsIG1hdGNoaW5nIGV4cGVydGlzZScpO1xuICAgICAgICBcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICBcdFx0JHNjb3BlLm1hdGNoaW5nRXhwZXJ0aXNlID0gcmVzdWx0LmV4cGVydGlzZTtcbiAgICAgICAgXHR9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0aXNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydGlzZSBTdGFydGVkJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZCk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICB2YXIgUHJvamVjdEV4cGVydGlzZSA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0LWV4cGVydGlzZS86ZXhwZXJ0aXNlSWQnLCB7XG4gICAgICAgIFx0ZXhwZXJ0aXNlSWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFByb2plY3RFeHBlcnRpc2UuZ2V0KHtleHBlcnRpc2VJZDogJHN0YXRlUGFyYW1zLmV4cGVydGlzZUlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdCRzY29wZS5leHBlcnRpc2UgPSByZXN1bHQ7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc3VibWl0QmlkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBiaWREYXRhID0ge1xuICAgICAgICAgICAgICAgICdiaWRfYW1vdW50JzogJHNjb3BlLmRhdGEuYmlkX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAkc2NvcGUuZGF0YS5iaWRfZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvcHJvamVjdC1leHBlcnRpc2UvJyArICRzdGF0ZVBhcmFtcy5leHBlcnRpc2VJZCArICcvYmlkJywgYmlkRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2UuYmlkID0gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRodHRwLCAkdGltZW91dCwgJGZpbHRlcikge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdGbGFzaE5vdGljZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzID0ge307XG5cbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcgPSB7XG4gICAgICAgIFx0c2hvdzogZmFsc2UsXG4gICAgICAgIFx0Y29udGVzdElkOiAwLFxuICAgICAgICBcdG9uQ2xpY2s6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICBcdFx0JHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgnanVyeScsIDUsIHRydWUpO1xuICAgICAgICBcdH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR1aWJNb2RhbCkge1xuXG4gICAgICAgICRzY29wZS50cmlnZ2VyTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXHRjb25zb2xlLmxvZygndHJpZ2dlciBsb2dpbiEnKTtcblxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgICAgICAgICB3aW5kb3dDbGFzczogJ2xvZ2luLW1vZGFsJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dvdCBjbG9zZSBmZWVkYmFjayEnKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXHRjb25zb2xlLmxvZygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSkge1xuICAgIFx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ2xvZ2dpbmcgaW4gbm93ICEnKTtcbiAgICBcdH1cblxuICAgIFx0JHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdhdXRoIGluIG5vdyAhJyk7XG4gICAgXHR9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05hdmlnYXRpb25DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkbG9nLCAkdGltZW91dCwgJGZpbHRlciwgJGh0dHAsICRyZXNvdXJjZSwgJHVpYk1vZGFsLCBGaWxlVXBsb2FkZXIpIHtcblxuICAgICAgICAkc2NvcGUuYWxsU2tpbGxzID0gJHJlc291cmNlKCdhcGkvc2tpbGxzJykucXVlcnkoKTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvZmlsZXMnLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICB1c2VyU2V0dGluZ3NNb2RlOiAndmlldycsXG4gICAgICAgICAgICB1c2VyU2V0dGluZ3NTYXZlOiAtMSxcbiAgICAgICAgICAgIHNvY2lhbENvbm5lY3Q6IHtcbiAgICAgICAgICAgICAgICBmYWNlYm9vazoge30sXG4gICAgICAgICAgICAgICAgbGlua2VkaW46IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNvY2lhbENvbm5lY3QgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBMb2dnZWQgaW4gJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNvY2lhbFVubGluayA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gbnVsbDtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc29jaWFsQ29ubmVjdFtwcm92aWRlcl0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHN3aXRjaChwcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmFjZWJvb2snOiBtZXRob2QgPSAndW5saW5rRmFjZWJvb2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmtlZGluJzogbWV0aG9kID0gJ3VubGlua0xpbmtlZGluJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUvJyArIG1ldGhvZCwge30pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlcltwcm92aWRlcl0gPSBudWxsO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNvY2lhbENvbm5lY3RbcHJvdmlkZXJdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9maWxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydjcmVhdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2ludmVzdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2p1ZGdpbmcnXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDA7XG5cbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS91c2Vycy8nICsgJHJvb3RTY29wZS51c2VyLmlkLCB1c2VyRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSA9PT0gJ1VwZGF0ZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc01vZGUgPSAndmlldyc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnVzZXJTZXR0aW5nc1NhdmUgPSAtMTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hhbmdlIHVzZXIgdGh1bWJuYWlsXG4gICAgICAgICRzY29wZS5jaGFuZ2VUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9hcHAvYXBwL2hlYWRlci91c2VyLXRodW1ibmFpbC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlclRodW1ibmFpbEN0cmwnLFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uICh0aHVtYm5haWwpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudGh1bWJuYWlsID0gYW5ndWxhci5jb3B5KHRodW1ibmFpbCk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZpbGUubmFtZSA9ICd0aHVtYm5haWxfJyArICRyb290U2NvcGUudXNlci5pZCArICcucG5nJztcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhLnB1c2goe3VzZXJfaWQ6ICRyb290U2NvcGUudXNlci5pZH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIHVzZXIgdGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgdXBsb2FkaW5nIHRoZSBmaWxlXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLmFkZFRvUXVldWUoZGF0YVVSSXRvQmxvYih0aHVtYm5haWwpKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkbG9nLmluZm8oJ01vZGFsIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2dvdXRcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWN0dWFsbHkgbG9nZ2luZyBvdXQhIC4uLicpO1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUG9wdWxhdGUgc2lkZSBuYXZpZ2F0aW9uXG4gICAgICAgICRzY29wZS5wb3B1bGF0ZVNpZGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS91c2Vycy9zaWRlTmF2aWdhdGlvbkRhdGEnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaWRlTmF2aWdhdGlvbkRhdGEgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAkc2NvcGUucG9wdWxhdGVTaWRlTmF2aWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUub3BlbkZ1bGxNZW51ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub0xpbmsgPSBmdW5jdGlvbihwYWdlLCBkYXRhLCByb2xlKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IDA7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogcm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gcm9sZXNbMF07XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShyb2xlLnJvbGUsIHJvbGUuaWQsIHRydWUsIHBhZ2UsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVXNlclRodW1ibmFpbEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKXtcbiAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgJHNjb3BlLmZpbGVOYW1lID0gJ05vIGZpbGUgc2VsZWN0ZWQnO1xuICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgZmFsc2UpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCB0cnVlKTtcbiAgICB9KTtcblxuICAgICRzY29wZS5zZXRUaHVtYm5haWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH1cbiAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIb21lIFZpZXcgU3RhcnRlZCcpO1xuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG5cbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHMnKTtcblxuICAgLy8gICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgIC8vICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgLy8gICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgLy8gICAgICBcdGNvbnRlc3RJZDogJ0BpZCdcbiAgIC8vICAgICAgfSk7XG5cbiAgIC8vICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAvLyAgICAgIFx0JHNjb3BlLmNvbnRlc3RzID0gcmVzdWx0O1xuICAgLy8gICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgIC8vICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcblx0XHRcdC8vICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgIC8vICAgICAgfSk7XG5cbiAgIC8vICAgICAgLy8gUXVlcnkgRXhwZXJ0aXNlXG5cbiAgIC8vICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAvLyAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlcyA9IHJlc3VsdC5kYXRhO1xuICAgLy8gICAgICB9LCAyMDAwKTtcblxuICAgLy8gICAgICAkc2NvcGUuaW52ZXN0b3JzID0gW1xuICAgLy8gICAgICAgICAge25hbWU6ICdBbGFpbiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYSBldmVuaWV0IGRlc2VydW50IGFkIHBhcmlhdHVyIHByYWVzZW50aXVtLCBpbmNpZHVudCBtb2xlc3RpYWUgYmVhdGFlIHF1YW0gcXVhc2kgcmVpY2llbmRpcyBtb2xsaXRpYSBhY2N1c2FudGl1bSB2b2x1cHRhdGUgcXVhZXJhdCBzZXF1aSBvZmZpY2lhIGEgZmFjZXJlIHJlcGVsbGF0IGFkaXBpc2NpLid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgZGlnbmlzc2ltb3MgbmVtbywgc2VxdWkgZG9sb3JpYnVzIGFjY3VzYW50aXVtLCBvYmNhZWNhdGkgbmF0dXMgaXVyZSBxdWFtIGVzc2UgZXggbGFib3JlIG5lcXVlIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZSBpbiwgbmloaWwgZWEsIGN1bSByZWN1c2FuZGFlIHV0Lid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdDaHJpc3RvcGhlIEJyaXNzaWF1ZCcsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnMy5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBsaWNhYm8gZW5pbSBvZmZpY2lhIG9wdGlvIGRvbG9ydW0gaGFydW0sIHNvbHV0YSBjdWxwYSB1bmRlIHZlbmlhbSBub2JpcyBlb3MsIGR1Y2ltdXMgcXVvZCBwcmFlc2VudGl1bSB2ZXJpdGF0aXMgYXRxdWUgbm9uIG5vc3RydW0gaXBzYW0uIE5vc3RydW0sIGV0ISd9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUXVpYSByZWN1c2FuZGFlIGFsaXF1aWQgcXVvcyBhcGVyaWFtIG1vbGVzdGlhZSBxdWlidXNkYW0gcXVpIGVvcyBpdXJlIHNhZXBlIG9wdGlvIHZpdGFlIGZ1Z2l0IHVuZGUgbmFtLCBhdHF1ZSBleGNlcHR1cmkgZGVzZXJ1bnQgZXN0LCByZXBlbGxhdCBhbGlhcy4nfSxcbiAgIC8vICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9LFxuICAgLy8gICAgICAgICAge25hbWU6ICdDaW5keSBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9XG4gICAvLyAgICAgIF07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignR3JhYlNoYXJlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLk1hdGggPSB3aW5kb3cuTWF0aDtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHByaW1hcnlTaGFyZUxpc3Rpbmc6IG51bGwsXG4gICAgICAgICAgICBzaG93QmlkTm93OiBmYWxzZSxcbiAgICAgICAgICAgIG15QmlkOiB7XG4gICAgICAgICAgICAgICAgYmlkX2Ftb3VudDogMC43MixcbiAgICAgICAgICAgICAgICBudW1fc2hhcmVzOiAxMCxcbiAgICAgICAgICAgICAgICBzYXZpbmc6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAkc2NvcGUuaW52ZXN0b3JzID0gW1xuICAgICAgICAgICAge25hbWU6ICdBbGFpbiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYSBldmVuaWV0IGRlc2VydW50IGFkIHBhcmlhdHVyIHByYWVzZW50aXVtLCBpbmNpZHVudCBtb2xlc3RpYWUgYmVhdGFlIHF1YW0gcXVhc2kgcmVpY2llbmRpcyBtb2xsaXRpYSBhY2N1c2FudGl1bSB2b2x1cHRhdGUgcXVhZXJhdCBzZXF1aSBvZmZpY2lhIGEgZmFjZXJlIHJlcGVsbGF0IGFkaXBpc2NpLid9LFxuICAgICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgZGlnbmlzc2ltb3MgbmVtbywgc2VxdWkgZG9sb3JpYnVzIGFjY3VzYW50aXVtLCBvYmNhZWNhdGkgbmF0dXMgaXVyZSBxdWFtIGVzc2UgZXggbGFib3JlIG5lcXVlIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZSBpbiwgbmloaWwgZWEsIGN1bSByZWN1c2FuZGFlIHV0Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaHJpc3RvcGhlIEJyaXNzaWF1ZCcsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnMy5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBsaWNhYm8gZW5pbSBvZmZpY2lhIG9wdGlvIGRvbG9ydW0gaGFydW0sIHNvbHV0YSBjdWxwYSB1bmRlIHZlbmlhbSBub2JpcyBlb3MsIGR1Y2ltdXMgcXVvZCBwcmFlc2VudGl1bSB2ZXJpdGF0aXMgYXRxdWUgbm9uIG5vc3RydW0gaXBzYW0uIE5vc3RydW0sIGV0ISd9LFxuICAgICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUXVpYSByZWN1c2FuZGFlIGFsaXF1aWQgcXVvcyBhcGVyaWFtIG1vbGVzdGlhZSBxdWlidXNkYW0gcXVpIGVvcyBpdXJlIHNhZXBlIG9wdGlvIHZpdGFlIGZ1Z2l0IHVuZGUgbmFtLCBhdHF1ZSBleGNlcHR1cmkgZGVzZXJ1bnQgZXN0LCByZXBlbGxhdCBhbGlhcy4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaW5keSBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9XG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gR2V0IGFsbCBsaXN0aW5nc1xuICAgICAgICBmdW5jdGlvbiBsb2FkUHJpbWFyeUxpc3RpbmcoKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5wcmltYXJ5U2hhcmVMaXN0aW5nID0gbnVsbDtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3NoYXJlLWxpc3RpbmcvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFByaW1hcnlMaXN0aW5nKCk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1CaWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG15QmlkID0ge1xuICAgICAgICAgICAgICAgICdzaGFyZV9saXN0aW5nX2lkJzogJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZy5pZCxcbiAgICAgICAgICAgICAgICAnYmlkX2Ftb3VudCc6ICRzY29wZS5kYXRhLm15QmlkLmJpZF9hbW91bnQsXG4gICAgICAgICAgICAgICAgJ251bV9zaGFyZXMnOiAkc2NvcGUuZGF0YS5teUJpZC5udW1fc2hhcmVzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3NoYXJlLWJpZHMnLCBteUJpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm15QmlkLnNhdmluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dCaWROb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFByaW1hcnlMaXN0aW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ludmVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnZlc3QgU3RhcnRlZCcpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05vdGlmaWNhdGlvbnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgRmROb3RpZmljYXRpb25zLmdldExhdGVzdE5vdGlmaWNhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQYWdlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc2NvcGUucGFnZSA9IHtcbiAgICAgICAgXHR0aXRsZTogJycsXG4gICAgICAgIFx0Y29udGVudDogJydcbiAgICAgICAgfTtcblxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcGFnZXMvJyArICRzdGF0ZVBhcmFtcy5zbHVnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcbiAgICAgICAgXHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdCRzY29wZS5wYWdlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXG5cdFx0XHRpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDQnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdsb2FkIDQwNCcpXG5cdFx0XHR9O1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdRdWlja1VwZGF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygncXVpY2t1cGRhdGUnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgXHRlZGl0TW9kZTogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgSW52ZXN0b3IgPSAkcmVzb3VyY2UoJy9hcGkvaW52ZXN0b3JzLzppbnZlc3RvcklkJywge1xuICAgICAgICAgICAgaW52ZXN0b3JJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQgPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgIFx0JHNjb3BlLmRhdGEuZWRpdE1vZGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5tb2RpZnlJbnZlc3RtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGludmVzdG9yRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaW52ZXN0bWVudF9idWRnZXQnOiAkcm9vdFNjb3BlLnVzZXIuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5lZGl0SW52ZXN0bWVudChmYWxzZSk7XG5cbiAgICAgICAgICAgIEludmVzdG9yLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgaW52ZXN0b3JJZDogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmlkXG4gICAgICAgICAgICB9LCBpbnZlc3RvckRhdGEpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUcmFuc2FjdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcblxuICAgIFx0Y29uc29sZS5sb2coJ1RyYW5zYWN0aW9uQ3RybCcpO1xuICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICBcdEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgIFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgIFx0fSwgMjAwMCk7XG5cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnKS5maWx0ZXIoJ3N0cmlwVGFncycsIGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZih0ZXh0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCksIFwiZ1wiKTtcblx0XHRcdFx0dGV4dCA9IFN0cmluZyh0ZXh0KS5yZXBsYWNlKHJlLCBcIiBcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mbmJzcDsvZ2ksJyAnKTtcblx0XHRcdH1cblxuXHQgICAgIFx0cmV0dXJuIHRleHQgPyBTdHJpbmcodGV4dCkucmVwbGFjZSgvPFtePl0rPi9nbSwgJycpIDogJyc7XG5cdCAgICB9O1xuXHQgIH1cblx0KTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignY2xlYW5IdG1sJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXlxceDAwLVxceDdGXS9nLCBcIlwiKTtcblx0XHRcdH1cblxuXHQgICAgIFx0cmV0dXJuIHRleHQ7XG5cdCAgICB9O1xuXHQgIH1cblx0KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5mYWN0b3J5KCdGZE5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcSwgJGludGVydmFsLCAkaHR0cCwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBnbG9iYWxOb3RpZmljYXRpb25zID0ge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uczogW10sXG4gICAgICAgICAgICB1bnJlYWQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcHVzaE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24obm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihub3RpZmljYXRpb25zKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSBub3RpZmljYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9ub3RpZmljYXRpb25zLycgKyB1c2VyLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYXRlc3ROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb25zSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGVzdE5vdGlmaWNhdGlvbnMgPSBhbmd1bGFyLmNvcHkoZ2xvYmFsTm90aWZpY2F0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMgPSBsYXRlc3ROb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMuc2xpY2UoMCwgNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwobm90aWZpY2F0aW9uc0ludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5yZXNvbHZlKGxhdGVzdE5vdGlmaWNhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9ub3RpZmljYXRpb25zLycgKyBub3RpZmljYXRpb25JZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBcdG5vdGlmaWNhdGlvbi5yZWFkID0gMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkQWxsTm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvbm90aWZpY2F0aW9ucy91c2VyLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnL3JlYWQnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMudW5yZWFkID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBub3RpZmljYXRpb25UcmlnZ2VyOiBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICAgICAgLy8gICAgIHN3aXRjaChjYXRlZ29yeSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ2Rvd25sb2FkLm5ldyc6ICRzdGF0ZS5nbygnYXBwLmRhc2hib2FyZC5kb3dubG9hZHMnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ3BhcnRuZXIucGFpcmVkJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLnBhcnRuZXIuZGV0YWlscycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5zdHVkeV9wZXJpb2RzJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmNvdXJzZXMucGVyaW9kcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAndXNlci5jcmVhdGVkJzogJHN0YXRlLmdvKFRhc2tzU2VydmljZS5uZXh0VGFzaygpLnZpZXcpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgZ2V0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSwgcHVzaCkge1xuICAgICAgICAgICAgICAgIHRvYXN0ZXIucG9wKHR5cGUsIHRpdGxlLCBtZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwdXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnlFcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AoJ2Vycm9yJywgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkU2Nyb2xsZXInLCBmdW5jdGlvbigkd2luZG93KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvVG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBib2R5LnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TZWN0aW9uOiBmdW5jdGlvbihpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBcdHZhciAkc2VjdGlvbiA9ICQoaWRlbnRpZmllcik7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCRzZWN0aW9uKTtcbiAgICAgICAgICAgIFx0aWYgKCRzZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFx0XHR2YXIgdG9wID0gJHNlY3Rpb24ub2Zmc2V0KCkudG9wIC0gNzA7XG5cbiAgICAgICAgICAgIFx0XHR2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBcdGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgJzUwMCcsICdzd2luZycpO1xuICAgICAgICAgICAgXHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcbiAgICAgICAgLy8gU2F0ZWxsaXplciBjb25maWd1cmF0aW9uIHRoYXQgc3BlY2lmaWVzIHdoaWNoIEFQSVxuICAgICAgICAvLyByb3V0ZSB0aGUgSldUIHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvYXV0aGVudGljYXRlJztcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc3RhdGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdzZWxmJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgICAgICAgICBjbGllbnRJZDogJzEwNDIyNDc3MjcwOTEtZG1xYzU1YWY3dGw1OGgycnF2M3BxbnJtampiYjk3MzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9hdXRoZW50aWNhdGUvZ29vZ2xlJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvZ29vZ2xlJyxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ3Njb3BlJ10sXG4gICAgICAgICAgICBvcHRpb25hbFVybFBhcmFtczogWydkaXNwbGF5J10sXG4gICAgICAgICAgICBzY29wZTogWydwcm9maWxlJywgJ2VtYWlsJ10sXG4gICAgICAgICAgICBzY29wZVByZWZpeDogJ29wZW5pZCcsXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgICAgICAgICBjbGllbnRJZDogJzkwMDUzMzEyMzM5NTkyMCcsXG4gICAgICAgICAgICBuYW1lOiAnZmFjZWJvb2snLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9hdXRoZW50aWNhdGUvZmFjZWJvb2snLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvZmFjZWJvb2snLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnZGlzcGxheScsICdzY29wZSddLFxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKGZsb3dGYWN0b3J5UHJvdmlkZXIpe1xuXG4gICAgICAgIGZsb3dGYWN0b3J5UHJvdmlkZXIuZGVmYXVsdHMgPSB7XG4gICAgICAgIFx0dXBsb2FkTWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB0YXJnZXQ6ICcvYXBpL2ZpbGVzLycsXG4gICAgICAgICAgICBwZXJtYW5lbnRFcnJvcnM6WzQwNCwgNTAwLCA1MDFdXG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnKS5jb25maWcoZnVuY3Rpb24obGFkZGFQcm92aWRlcikge1xuXG4gICAgICAgIGxhZGRhUHJvdmlkZXIuc2V0T3B0aW9uKHtcbiAgICAgICAgICAgIHN0eWxlOiAnZXhwYW5kLXJpZ2h0JyxcbiAgICAgICAgICAgIHNwaW5uZXJTaXplOiAzNSxcbiAgICAgICAgICAgIHNwaW5uZXJDb2xvcjogJyNmZmZmZmYnXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
