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

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', ["$rootScope", "$scope", "$state", "$resource", "$http", function($rootScope, $scope, $state, $resource, $http) {
        console.log('CreateExpertiseCtrl Started');

        $scope.inputtedExpertiseList = [];
        $scope.expertiseList = [];

        var ProjectExpertise = $resource('/api/projects/:projectId/expertise', {
            projectId: '@id'
        });

        // Demo
        // $scope.expertiseList.push({
        //     expertiseCategory: 'Technical',
        //     expertiseSubCategory: 'Electronic',
        //     expertise: 'PCB',
        //     mainTask: 'apply IP protection for the US Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat natus quod error, at impedit, deleniti vero ducimus sequi asperiores obcaecati.',
        //     budget: 'usd 1500',
        //     leadTime: '60 days from the beginning of project',
        //     startDate: 'Dec 15, 2015',
        //     creator: 'Super Expert'
        // });

        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.$broadcast('stopLoading');
            });
        }

        $scope.$watch('project', function(project){
            console.log(project);
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
                console.log(result);
            });

            $scope.expertiseList.push({
                expertiseCategory: expertise.selectedExpertiseCategory.name,
                expertiseSubCategory: expertise.selectedExpertiseSubCategory.name,
                expertise: expertise.selectedExpertise.name,
                mainTask: expertise.mainTask,
                budget: expertise.budget,
                leadTime: expertise.leadTime,
                startDate: expertise.startDate,
            });

            $scope.inputtedExpertiseList = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJjb25maWcvZmxvdy5qcyIsImRpcmVjdGl2ZXMvY2hhcnRzLmpzIiwiZGlyZWN0aXZlcy9sb2FkZXIuZGlyZWN0aXZlLmpzIiwiZGlyZWN0aXZlcy9taW5NYXguanMiLCJkaXJlY3RpdmVzL21pc2MuanMiLCJmaWx0ZXJzL3N0cmlwSHRtbC5qcyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbnMuc2VydmljZS5qcyIsInNlcnZpY2VzL3Njcm9sbGVyLnNlcnZpY2UuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2NyZWF0ZS9jcmVhdGUuanMiLCJhcHAvZXhwZXJ0L2V4cGVydC5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9oZWFkZXIvdXNlci10aHVtYm5haWwuanMiLCJhcHAvaG9tZS9ob21lLmpzIiwiYXBwL2ludmVzdC9ncmFiU2hhcmUuanMiLCJhcHAvaW52ZXN0L2ludmVzdC5qcyIsImFwcC9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbnMuanMiLCJhcHAvcGFnZS9wYWdlLmpzIiwiYXBwL3F1aWNrLXVwZGF0ZS9xdWljay11cGRhdGUuanMiLCJhcHAvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUEscUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBLENBQUEsMkJBQUEseUJBQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQTs7O0FDbEJBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxnREFBQSxTQUFBLGdCQUFBLG9CQUFBOztRQUVBLElBQUEsVUFBQSxTQUFBLFVBQUEsZUFBQTtZQUNBLElBQUEsT0FBQSxrQkFBQSxhQUFBO2dCQUNBLGdCQUFBOzs7WUFHQSxPQUFBLHFCQUFBLFdBQUEsTUFBQSxnQkFBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7b0JBRUEsWUFBQTt3QkFDQSxhQUFBLFFBQUEsVUFBQTt3QkFDQSxZQUFBOztvQkFFQSxhQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBO3dCQUNBLFlBQUE7O29CQUVBLGVBQUE7d0JBQ0EsYUFBQSxRQUFBLGlCQUFBO3dCQUNBLFlBQUE7O29CQUVBLGFBQUE7d0JBQ0EsYUFBQSxRQUFBLGdCQUFBO3dCQUNBLFlBQUE7O29CQUVBLE1BQUE7OzthQUdBLE1BQUEsWUFBQTtnQkFDQSxLQUFBO2dCQUNBLFVBQUE7O2FBRUEsTUFBQSxrQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG1CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsbUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxvQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxRQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLG9CQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEscUJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUEsUUFBQTt3QkFDQSxZQUFBOzs7O2FBSUEsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxXQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsZ0JBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsZUFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JBQ0EsV0FBQTs7Z0JBRUEsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQSxXQUFBO3dCQUNBLFlBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBO29CQUNBLFdBQUE7O2dCQUVBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7d0JBQ0EsWUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUE7b0JB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U0FDQSxPQUFBOzs7O09BSUEsS0FBQSxTQUFBLEtBQUE7T0FDQSxLQUFBLFlBQUEsS0FBQTs7Ozs7SUFLQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxTQUFBLFlBQUE7S0FDQSxPQUFBO01BQ0EsVUFBQTtNQUNBLFNBQUE7TUFDQSxNQUFBLFVBQUEsT0FBQSxNQUFBLE1BQUEsTUFBQTtPQUNBLE1BQUEsT0FBQSxLQUFBLE9BQUEsWUFBQTtRQUNBLEtBQUEsY0FBQSxLQUFBOztPQUVBLElBQUEsZUFBQSxVQUFBLE9BQUE7UUFDQSxJQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUEsVUFBQTtRQUNBLElBQUEsQ0FBQSxRQUFBLFVBQUEsUUFBQSxLQUFBO1NBQ0EsS0FBQSxhQUFBLFNBQUE7U0FDQSxPQUFBO2VBQ0E7U0FDQSxLQUFBLGFBQUEsU0FBQTtTQUNBLE9BQUE7Ozs7T0FJQSxLQUFBLFNBQUEsS0FBQTtPQUNBLEtBQUEsWUFBQSxLQUFBOzs7Ozs7QUNwREEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHVCQUFBLE9BQUEsZUFBQSxDQUFBLFFBQUEsU0FBQSxNQUFBO1FBQ0EsT0FBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLEtBQUEsWUFBQTs7Ozs7O0FDTEEsQ0FBQSxXQUFBO0lBQ0E7O0NBRUEsUUFBQSxPQUFBLG9CQUFBLE9BQUEsYUFBQSxXQUFBO0tBQ0EsT0FBQSxTQUFBLE1BQUE7O0dBRUEsSUFBQSxPQUFBLFVBQUEsYUFBQTtJQUNBLElBQUEsS0FBQSxJQUFBLE9BQUEsT0FBQSxhQUFBLE1BQUE7SUFDQSxPQUFBLE9BQUEsTUFBQSxRQUFBLElBQUE7SUFDQSxPQUFBLEtBQUEsUUFBQSxpQkFBQTtJQUNBLE9BQUEsS0FBQSxRQUFBLFdBQUE7OztPQUdBLE9BQUEsT0FBQSxPQUFBLE1BQUEsUUFBQSxhQUFBLE1BQUE7Ozs7O0NBS0EsUUFBQSxPQUFBLG9CQUFBLE9BQUEsYUFBQSxXQUFBO0tBQ0EsT0FBQSxTQUFBLE1BQUE7O0dBRUEsSUFBQSxPQUFBLFVBQUEsYUFBQTtJQUNBLE9BQUEsS0FB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QUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsV0FBQSxXQUFBOzs7O1FBSUEsT0FBQSxTQUFBLFVBQUE7WUFDQSxNQUFBLFNBQUEsS0FBQSxXQUFBO2dCQUNBLGFBQUEsV0FBQTtnQkFDQSxXQUFBLGdCQUFBO2dCQUNBLFdBQUEsT0FBQTs7Z0JBRUEsT0FBQSxHQUFBLGtCQUFBLElBQUEsQ0FBQSxRQUFBOzs7Ozs7SUFNQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxvR0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLE1BQUE7UUFDQSxXQUFBLFdBQUE7O1FBRUEsSUFBQSxPQUFBLGFBQUEsVUFBQSxlQUFBLE9BQUEsYUFBQSxXQUFBLGFBQUE7WUFDQSxJQUFBLFNBQUE7Z0JBQ0EsbUJBQUEsYUFBQTtnQkFDQSxPQUFBLGFBQUE7OztZQUdBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLEtBQUEsNkJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsR0FBQTtlQUNBLFNBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsZUFBQSxNQUFBLEtBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsT0FBQSxVQUFBOzs7YUFHQTtZQUNBLE9BQUEsR0FBQTs7OztJQUlBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLG9HQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxPQUFBLFVBQUEsTUFBQTtRQUNBLFdBQUEsV0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxlQUFBO1lBQ0EsVUFBQTtZQUNBLGlCQUFBOzs7UUFHQSxJQUFBLE9BQUEsYUFBQSxXQUFBLGVBQUEsT0FBQSxhQUFBLFdBQUEsYUFBQTtZQUNBLE9BQUEsWUFBQTthQUNBO1lBQ0EsT0FBQSxZQUFBOzs7UUFHQSxPQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsWUFBQTs7O1lBR0EsSUFBQSxTQUFBO2dCQUNBLE9BQUEsT0FBQSxLQUFBOzs7WUFHQSxNQUFBLEtBQUEsNEJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTs7Z0JBRUEsSUFBQSxPQUFBLE9BQUEsS0FBQSxXQUFBLGFBQUE7b0JBQ0EsT0FBQSxpQkFBQTtvQkFDQSxPQUFBLFlBQUE7cUJBQ0E7b0JBQ0EsT0FBQSxZQUFBOztvQkFFQSxJQUFBLE9BQUEsS0FBQSxVQUFBLGdCQUFBO3dCQUNBLE9BQUEsZUFBQTt5QkFDQTt3QkFDQSxPQUFBLGVBQUE7Ozs7ZUFJQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxZQUFBOztnQkFFQSxJQUFBLE9BQUEsS0FBQSxVQUFBLGdCQUFBO29CQUNBLE9BQUEsZUFBQTtxQkFDQTtvQkFDQSxPQUFBLGVBQUE7Ozs7O1FBS0EsT0FBQSxNQUFBLFVBQUE7OztZQUdBLElBQUEsT0FBQSxLQUFBLFNBQUEsVUFBQSxHQUFBO2dCQUNBLElBQUEsT0FBQSxLQUFBLGFBQUEsT0FBQSxLQUFBLGlCQUFBO29CQUNBLE9BQUEsWUFBQTtvQkFDQSxJQUFBLFNBQUE7d0JBQ0EsT0FBQSxhQUFBO3dCQUNBLE9BQUEsYUFBQTt3QkFDQSxVQUFBLE9BQUEsS0FBQTt3QkFDQSx1QkFBQSxPQUFBLEtBQUE7OztvQkFHQSxNQUFBLEtBQUEsNkJBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTt3QkFDQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsYUFBQTs0QkFDQSxNQUFBOzRCQUNBLE1BQUEsU0FBQSxPQUFBOzRCQUNBLE9BQUEsR0FBQSxrQkFBQTs0QkFDQSxRQUFBLElBQUE7NkJBQ0E7NEJBQ0EsT0FBQSxlQUFBOzRCQUNBLE9BQUEsWUFBQTs7dUJBRUEsU0FBQSxPQUFBO3dCQUNBLE9BQUEsZUFBQTt3QkFDQSxPQUFBLFlBQUE7O3FCQUVBO29CQUNBLE9BQUEsZUFBQTs7aUJBRUE7Z0JBQ0EsT0FBQSxlQUFBOzs7Ozs7O0FDdE5BLENBQUEsV0FBQTtJQUNBOztJQUVBLFNBQUEsY0FBQSxTQUFBO1FBQ0EsUUFBQSxJQUFBOztRQUVBLElBQUE7UUFDQSxJQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsUUFBQSxhQUFBO1lBQ0EsYUFBQSxLQUFBLFFBQUEsTUFBQSxLQUFBOztZQUVBLGFBQUEsU0FBQSxRQUFBLE1BQUEsS0FBQTs7O1FBR0EsSUFBQSxhQUFBLFFBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxLQUFBOzs7UUFHQSxJQUFBLEtBQUEsSUFBQSxXQUFBLFdBQUE7UUFDQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsV0FBQSxRQUFBLEtBQUE7WUFDQSxHQUFBLEtBQUEsV0FBQSxXQUFBOzs7UUFHQSxPQUFBLElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBOzs7SUFHQSxRQUFBLE9BQUEsdUJBQUEsVUFBQSxXQUFBLFdBQUE7UUFDQSxPQUFBO1lBQ0EsT0FBQSxFQUFBLFNBQUE7WUFDQSxNQUFBLFNBQUEsT0FBQSxNQUFBLE1BQUE7Z0JBQ0EsUUFBQSxJQUFBLE1BQUE7O2dCQUVBLEdBQUEsTUFBQSxRQUFBO29CQUNBLEtBQUEsR0FBQTs7Ozs7OztJQU9BLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHVJQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsT0FBQSxVQUFBLE9BQUEsV0FBQSxZQUFBLFNBQUEsY0FBQTs7UUFFQSxPQUFBLE9BQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7O1FBR0EsT0FBQSxhQUFBO1lBQ0EsU0FBQTtZQUNBLFFBQUE7WUFDQSxVQUFBOzs7UUFHQSxPQUFBLGlCQUFBLFNBQUEsUUFBQTtZQUNBLFdBQUE7WUFDQSxPQUFBLEtBQUEsY0FBQTs7O1FBR0EsT0FBQSxZQUFBLENBQUEsZUFBQSxpQkFBQSxXQUFBLFdBQUEsa0JBQUEsV0FBQSxVQUFBLFlBQUEsY0FBQSx1QkFBQSxhQUFBLFdBQUEsU0FBQSxhQUFBLFdBQUEsY0FBQSxXQUFBLFdBQUEsY0FBQSxZQUFBLFdBQUEsV0FBQSxVQUFBLFNBQUEsV0FBQSxVQUFBLFdBQUEsMEJBQUEsWUFBQSxpQkFBQSxVQUFBLGtDQUFBLHFCQUFBLFlBQUEsZ0JBQUEsV0FBQSxZQUFBLFlBQUEs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RUEsT0FBQSx1QkFBQSxPQUFBLHNCQUFBLFNBQUE7OztRQUdBLE9BQUEsMEJBQUEsU0FBQSxPQUFBLG1CQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSwwQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7Z0JBQ0EsT0FBQSxtQkFBQTs7OztRQUlBLE9BQUEsNEJBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLElBQUEsVUFBQSxHQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSw0QkFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLDZCQUFBLFNBQUEsT0FBQSxNQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsK0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLDRCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQTs7Z0JBRUEsT0FBQSxzQkFBQSxPQUFBLHVCQUFBLFNBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLE9BQUE7aUJBQ0E7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLCtCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztnQkFFQSxPQUFBLHNCQUFBLE9BQUEsMEJBQUEsU0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTs7OztRQUlBLE9BQUEsK0JBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLFVBQUEsR0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEseUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtpQkFDQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsNEJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7OztRQUlBLE9BQUEsa0JBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxPQUFBO1lBQ0EsT0FBQSxnQkFBQTtZQUNBOzs7UUFHQSxPQUFBLG9CQUFBLFNBQUEsR0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLG9CQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBO1lBQ0EsRUFBQSxnQkFBQTs7O1FBR0EsT0FBQSxxQkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsb0JBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLGlCQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLFNBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsT0FBQTtZQUNBOzs7UUFHQSxPQUFBLHVCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxDQUFBLE1BQUEsSUFBQSxRQUFBOzs7UUFHQSxPQUFBLFdBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxJQUFBLGFBQUEsUUFBQSxVQUFBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsTUFBQSxLQUFBOztZQUVBLElBQUEsT0FBQSxnQkFBQSxhQUFBO2dCQUNBLE9BQUEsV0FBQSxTQUFBOzs7WUFHQSxPQUFBOzs7UUFHQSxPQUFBLGNBQUEsU0FBQSxPQUFBLE1BQUE7WUFDQSxHQUFBLENBQUEsT0FBQSxTQUFBLE9BQUEsT0FBQTtnQkFDQSxPQUFBLHNCQUFBLE9BQUEsZUFBQSxLQUFBOztZQUVBLE9BQUEsc0JBQUEsT0FBQSxPQUFBOzs7UUFHQSxPQUFBLGdCQUFBLFNBQUEsR0FBQSxPQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxVQUFBLE9BQUEsc0JBQUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsTUFBQSxLQUFBLFNBQUEsUUFBQSxTQUFBO2dCQUNBLE9BQUEsQ0FBQSxRQUFBLE9BQUEsUUFBQTs7WUFFQSxFQUFBOzs7UUFHQSxPQUFBLGFBQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGFBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGlCQUFBLFFBQUEsS0FBQSxPQUFBLHNCQUFBLE9BQUEsWUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxjQUFBLENBQUEsTUFBQSxJQUFBLFFBQUE7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Ozs7UUFNQSxPQUFBLGtCQUFBLFNBQUEsTUFBQSxPQUFBOzs7Ozs7OztZQVFBLElBQUEsUUFBQSxPQUFBLEtBQUEsYUFBQSxjQUFBLFFBQUEsS0FBQTs7WUFFQSxJQUFBLFVBQUEsQ0FBQSxHQUFBO2dCQUNBLE9BQUEsS0FBQSxhQUFBLGNBQUEsT0FBQSxPQUFBOzs7WUFHQSxJQUFBLGFBQUEsTUFBQSxNQUFBLFFBQUE7WUFDQSxJQUFBLGVBQUEsQ0FBQSxHQUFBO2dCQUNBLFFBQUEsSUFBQSxzQkFBQTtnQkFDQSxNQUFBLE1BQUEsT0FBQSxZQUFBOzs7WUFHQSxRQUFBLElBQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxPQUFBLEtBQUEsYUFBQTs7O1FBR0EsT0FBQSxlQUFBLFdBQUE7WUFDQSxXQUFBLFVBQUE7O1lBRUEsT0FBQSxLQUFBLGdCQUFBO1lBQ0EsT0FBQSxLQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsYUFBQSxjQUFBO1lBQ0EsT0FBQSxLQUFBLGFBQUEsZ0JBQUE7O1lBRUEsT0FBQSxLQUFBLGFBQUEsY0FBQSxPQUFBLFFBQUEsUUFBQSxPQUFBLFFBQUEsUUFBQSxTQUFBLEdBQUE7OztRQUdBLE9BQUEsY0FBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGNBQUE7O1lBRUEsSUFBQSxnQkFBQTtZQUNBLElBQUEsZUFBQTs7WUFFQSxRQUFBLFFBQUEsT0FBQSxLQUFBLGFBQUEsS0FBQSxPQUFBLFNBQUEsS0FBQTtnQkFDQSxjQUFBLEtBQUEsVUFBQTtvQkFDQSxXQUFBLEtBQUE7OztnQkFHQSxRQUFBLElBQUE7Z0JBQ0EsSUFBQSxLQUFBLEtBQUEsS0FBQSxRQUFBLGFBQUEsQ0FBQSxLQUFBLGlCQUFBLE1BQUE7b0JBQ0EsUUFBQSxJQUFBO29CQUNBLGVBQUEsS0FBQTs7OztZQUlBLElBQUEsUUFBQSxRQUFBLFVBQUEsV0FBQSxLQUFBLFlBQUEsQ0FBQSxNQUFBLFlBQUE7O1lBRUEsSUFBQSxNQUFBLFNBQUEsR0FBQTtnQkFDQSxJQUFBLE9BQUEsTUFBQTs7Z0JBRUEsSUFBQSxRQUFBLElBQUE7Z0JB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QUE7WUFDQSxJQUFBLFlBQUEsTUFBQTtnQkFDQSxXQUFBLFdBQUE7Z0JBQ0EsT0FBQSxVQUFBO21CQUNBO2dCQUNBLFFBQUEsSUFBQTs7OztRQUlBLE9BQUEsSUFBQSxtQkFBQSxTQUFBLE9BQUEsT0FBQSxVQUFBO1lBQ0EsTUFBQTtZQUNBLFFBQUEsSUFBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7O1lBRUEsUUFBQSxJQUFBLG9CQUFBLFFBQUEsS0FBQTtZQUNBLE9BQUEsUUFBQSxlQUFBLFFBQUEsS0FBQTs7O1FBR0EsT0FBQSx1QkFBQSxTQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsVUFBQSxLQUFBLE1BQUE7WUFDQSxJQUFBLFFBQUEsT0FBQSxRQUFBLGNBQUEsUUFBQSxRQUFBLEtBQUE7O1lBRUEsSUFBQSxVQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLFFBQUEsY0FBQSxLQUFBLFFBQUEsS0FBQTs7OztRQUlBLE9BQUEsY0FBQSxXQUFBO1lBQ0EsT0FBQSxRQUFBLFFBQUE7WUFDQSxPQUFBOztZQUVBLFdBQUEsVUFBQTs7O1FBR0EsV0FBQSxVQUFBOzs7SUFHQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxzRkFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLE9BQUEsVUFBQSxZQUFBO1FBQ0EsUUFBQSxJQUFBOztRQUVBLE1BQUEsSUFBQSxzQkFBQSxLQUFBLFNBQUEsUUFBQTtZQUNBLE9BQUEsZUFBQSxPQUFBOzs7UUFHQSxPQUFBLG9CQUFBLFNBQUEsYUFBQTtZQUNBLE9BQUEsUUFBQSxrQkFBQSxZQUFBO1lBQ0EsT0FBQTs7WUFFQSxXQUFBLFVBQUE7O1lBRUEsU0FBQSxXQUFBO2dCQUNBLE9BQUEsR0FBQTtlQUNBOzs7O0lBSUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsZ0ZBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxXQUFBLE9BQUE7UUFDQSxRQUFBLElBQUE7O1FBRUEsT0FBQSx3QkFBQTtRQUNBLE9BQUEsZ0JB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QUE7WUFDQSxPQUFBLFNBQUE7O1lBRUEsUUFBQSxJQUFBO1lBQ0EsUUFBQSxJQUFBOztZQUVBLE9BQUEsS0FBQSxtQkFBQTs7WUFFQSxNQUFBLElBQUEsZ0JBQUEsV0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxXQUFBOztvQkFFQSxPQUFBLEtBQUEsbUJBQUE7b0JBQ0EsT0FBQSxLQUFBLG1CQUFBOztvQkFFQSxTQUFBLFVBQUE7d0JBQ0EsT0FBQSxLQUFBLG1CQUFBLENBQUE7dUJBQ0E7O2VBRUEsU0FBQSxPQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7ZUFDQSxRQUFBLFVBQUE7Z0JBQ0EsU0FBQSxVQUFBO29CQUNBLE9BQUEsS0FBQSxtQkFBQSxDQUFBO21CQUNBOzs7OztRQUtBLE9BQUEsa0JBQUEsVUFBQTtZQUNBLElBQUEsZ0JBQUEsVUFBQSxLQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxZQUFBO2dCQUNBLE1BQUE7OztZQUdBLGNBQUEsT0FBQSxLQUFBLFVBQUEsV0FBQTtnQkFDQSxXQUFBLEtBQUEsWUFBQSxRQUFBLEtBQUE7O2dCQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7b0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7b0JBRUEsS0FBQSxXQUFBO29CQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtvQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOzs7Z0JBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsUUFBQSxJQUFBOzs7O2dCQUlBLE9BQUEsU0FBQSxXQUFBLGNBQUE7Z0JBQ0EsT0FBQSxTQUFBOztlQUVBLFlBQUE7Z0JBQ0EsS0FBQSxLQUFBLHlCQUFBLElBQUE7Ozs7O1FBS0EsT0FBQSxTQUFBLFVBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxNQUFBLFNBQUEs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LFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxZQUFBO1FBQ0EsV0FBQSxXQUFBO1FBQ0EsV0FBQTs7UUFFQSxPQUFBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsU0FBQTs7O1FBR0EsTUFBQSxJQUFBLGdCQUFBLGFBQUEsTUFBQSxLQUFBLFNBQUEsT0FBQTtTQUNBLFFBQUEsSUFBQTtTQUNBLFFBQUEsSUFBQTtTQUNBLE9BQUEsT0FBQSxPQUFBO1dBQ0EsU0FBQSxNQUFBO0dBQ0EsUUFBQSxJQUFBO0dBQ0EsUUFBQSxJQUFBOztHQUVBLElBQUEsTUFBQSxVQUFBLE9BQUE7SUFDQSxRQUFBLElBQUE7SUFDQTtXQUNBLFFBQUEsVUFBQTtTQUNBLFdBQUEsV0FBQTs7Ozs7QUN4QkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsc0dBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLFdBQUEsaUJBQUE7UUFDQSxRQUFBLElBQUE7O1FBRUEsT0FBQSxPQUFBO1NBQ0EsVUFBQTs7O1FBR0EsSUFBQSxXQUFBLFVBQUEsOEJBQUE7WUFDQSxZQUFBO1dBQ0E7WUFDQSxRQUFBO2dCQUNBLFFBQUE7Ozs7UUFJQSxPQUFBLGlCQUFBLFNBQUEsTUFBQTtTQUNBLE9BQUEsS0FBQSxXQUFBOzs7UUFHQSxPQUFBLG1CQUFBLFVBQUE7O1lBRUEsSUFBQSxlQUFBO2dCQUNBLHFCQUFBLFdBQUEsS0FBQSxTQUFBOzs7WUFHQSxPQUFBLGVBQUE7O1lBRUEsU0FBQSxPQUFBO2dCQUNBLFlBQUEsV0FBQSxLQUFBLFNBQUE7ZUFDQSxjQUFBLFNBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxPQUFBLE9BQUEsV0FBQSxhQUFBO29CQUNBLFFBQUEsSUFBQTs7Ozs7OztBQ2xDQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx5R0FBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxVQUFBLFlBQUE7O0tBRUEsUUFBQSxJQUFBO0tBQ0EsV0FBQSxXQUFBO0tBQ0EsV0FBQTs7S0FFQSxTQUFBLFVBQUE7TUFDQSxXQUFBLFdBQUE7UUFDQTs7OztLQUlBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGZ1bmRhdG9yID0gYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5maWx0ZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5zZXJ2aWNlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iucm91dGVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5jb25maWcnXG4gICAgICAgIF0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycsIFsndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJywgWyduZ1Jlc291cmNlJywgJ25nQ29va2llcycsICduZ0FuaW1hdGUnLCAndWkuYm9vdHN0cmFwJywgJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJywgJ2FuZ3VsYXJNb21lbnQnLCAnYW5ndWxhci1vd2wtY2Fyb3VzZWwnLCAnbmdJbWdDcm9wJywgJ2FuZ3VsYXJGaWxlVXBsb2FkJywgJ2Jvb3RzdHJhcExpZ2h0Ym94J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJywgWydvcmRpbmFsJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJywgWydkaWJhcmkuYW5ndWxhci1lbGxpcHNpcycsICdsb2NhbHl0aWNzLmRpcmVjdGl2ZXMnLCAndGV4dEFuZ3VsYXInLCAnZmxvdyddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIHNlY29uZGFyeU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kYXJ5TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlOYW1lID0gdmlld05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAnLi92aWV3cy9hcHAvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHNlY29uZGFyeU5hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9jb250ZXN0cycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ25hdmlnYXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOYXZpZ2F0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmxhc2hOb3RpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnZmxhc2gtbm90aWNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRmxhc2hOb3RpY2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGb290ZXJDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnbm90aWZpY2F0aW9ucycsICdub3RpZmljYXRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTm90aWZpY2F0aW9uc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHF1aWNrVXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1F1aWNrVXBkYXRlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXV0aCcsXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5sb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnbG9naW4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnNpZ251cCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ3NpZ251cCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmF1dGguZm9yZ290Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9mb3Jnb3QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnZm9yZ290JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5yZWNvdmVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWNvdmVyP3Rva2VuJmVtYWlsJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ3JlY292ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoUmVjb3ZlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuYXV0aC5jb25maXJtJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb25maXJtP2NvZGUmZW1haWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnY29uZmlybScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDb25maXJtQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5hdXRoLnJlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ3JlZ2lzdGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3M6ICdob21lcGFnZScsXG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdob21lJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3RzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jb250ZXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0cy86Y29udGVzdElkLzpjb250ZXN0TmFtZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdFNpbmdsZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZXhwZXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBlcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRXhwZXJ0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5pbnZlc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2ludmVzdCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnZlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdJbnZlc3RDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY3JlYXRlP3Byb2plY3RJZCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5kZXRhaWxzJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9kZXRhaWxzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtZGV0YWlscycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZURldGFpbHNDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5zdXBlcmV4cGVydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc3VwZXItZXhwZXJ0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ZXBzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NyZWF0ZScsICdjcmVhdGUtc3VwZXItZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlU0VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5leHBlcnRpc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cGVydGlzZScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWV4cGVydGlzZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUV4cGVydGlzZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlLmV4cGVydHMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cGVydHMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1leHBlcnRzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlRXhwZXJ0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jcmVhdGUuYnVkZ2V0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9idWRnZXQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc3RlcHMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY3JlYXRlJywgJ2NyZWF0ZS1idWRnZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVCdWRnZXRDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNyZWF0ZS5pbnZlc3RvcnMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2ludmVzdG9ycycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW46IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzdGVwcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjcmVhdGUnLCAnY3JlYXRlLWludmVzdG9ycycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUludmVzdG9yc0N0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAudHJhbnNhY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3RyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3RyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVHJhbnNhY3Rpb25DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmdyYWJzaGFyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZ3JhYi1hLXNoYXJlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2ludmVzdCcsICdncmFiLWEtc2hhcmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdHcmFiU2hhcmVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLm5vdGlmaWNhdGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL25vdGlmaWNhdGlvbnMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZExvZ2luOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnBhZ2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLzpzbHVnJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRMb2dpbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwYWdlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCAkdXJsUm91dGVyLCAkZmlsdGVyLCAkY29va2llcywgRmROb3RpZmljYXRpb25zLCBGZFNjcm9sbGVyKSB7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xuICAgICAgICAkcm9vdFNjb3BlLmluaXRpYWxMb2NhdGlvblNldHVwID0gZmFsc2U7XG4gICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gZmFsc2U7XG5cbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gJyc7XG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSBudWxsO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gbnVsbDtcblxuICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSB0cnVlO1xuICAgICAgICAkcm9vdFNjb3BlLm5vdGlmaWNhdGlvbkNvbGxhcHNlID0gZmFsc2U7XG4gICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuY29sbGFwc2VOb3RpZmljYXRpb24gPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLm5vdGlmaWNhdGlvbkNvbGxhcHNlID0gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLnRvZ2dsZU5hdmlnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAoJHJvb3RTY29wZS5pc05hdlNob3duID49IDAuNSkgPyAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSAwIDogJHJvb3RTY29wZS5pc05hdlNob3duID0gMC41O1xuICAgICAgICB9O1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdGFydExvYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3N0b3BMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ29pbmcgdG8gcmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlclNlcnZpY2UgaXMgYW4gZXhhbXBsZSBzZXJ2aWNlIGZvciBtYW5hZ2luZyB1c2VyIHN0YXRlXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50ICR1cmxSb3V0ZXIncyBkZWZhdWx0IGhhbmRsZXIgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmRcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdXNlciBvYmplY3QgYW5kIHRhc2tzXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXI/dG9rZW49JyArICRhdXRoLmdldFRva2VuKCkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBGZE5vdGlmaWNhdGlvbnMuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgucmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnbmFsUm9sZSA9ICRyb290U2NvcGUudXNlci5yb2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVSb2xlID0gJHJvb3RTY29wZS51c2VyLnJvbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRjb29raWVzLmdldCgnZmRfYWN0aXZlX3JvbGUnKSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVJvbGUgPSAkY29va2llcy5nZXQoJ2ZkX2FjdGl2ZV9yb2xlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiBhY3RpdmVSb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShvcmlnbmFsUm9sZS5yb2xlLCBvcmlnbmFsUm9sZS5pZCwgISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkdXJsUm91dGVyLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAkdXJsUm91dGVyLmxpc3RlbigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSA9PT0gJ3VuZGVmaW5lZCcgJiYgZnJvbVN0YXRlLm5hbWUuaW5kZXhPZigncmVjb3ZlcicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gdG9TdGF0ZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH1lbHNlIGlmKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCAmJiAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9PSAxKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmVlZExvZ2luID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUuZGF0YS5uZWVkTG9naW4pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuZWVkTG9naW4gPSB0b1N0YXRlLmRhdGEubmVlZExvZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZWVkTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgKGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEgJiYgdG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IHRvUGFyYW1zO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2F1dGgnKSA9PT0gLTEgJiYgZnJvbVN0YXRlLm5hbWUuaW5kZXhPZignYXV0aCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdhdXRoJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgJHN0YXRlLmdvKCdhcHAuYXV0aC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIHNlY29uZGFyeU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kYXJ5TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlOYW1lID0gdmlld05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAnLi92aWV3cy9hcHAvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHNlY29uZGFyeU5hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN3aXRjaCBVc2VyIFJvbGVcblxuICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlID0gZnVuY3Rpb24ocm9sZSwgcm9sZUlkLCByZWxvYWQsIHN0YXRlLCBzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVSb2xlID0gcm9sZTtcbiAgICAgICAgICAgICRjb29raWVzLnB1dCgnZmRfYWN0aXZlX3JvbGUnLCByb2xlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihzdGF0ZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAkc3RhdGUuY3VycmVudC5uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHN0YXRlUGFyYW1zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtcyA9ICRzdGF0ZS5jdXJyZW50LnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmluaXRpYWxSb2xlQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHVzZXJSb2xlVmlld3MgPSBbe1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwJyxcbiAgICAgICAgICAgICAgICB2aWV3OiAncXVpY2tVcGRhdGUnLFxuICAgICAgICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnQ6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtZXhwZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgIGludmVzdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWludmVzdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdxdWljay11cGRhdGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ2NvbnRlc3QnLCAnY29udGVzdC1zaW5nbGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJylcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogJ2FwcC5jb250ZXN0cycsXG4gICAgICAgICAgICAgICAgdmlldzogJ21haW5AJyxcbiAgICAgICAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3QtY3JlYXRvcicpLFxuICAgICAgICAgICAgICAgICAgICBqdXJ5OiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3QtanVyeScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGVtcGxhdGU6IGdldFZpZXcoJ2NvbnRlc3QnKVxuICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh1c2VyUm9sZVZpZXdzLCBmdW5jdGlvbihyb2xlVmlldykge1xuICAgICAgICAgICAgICAgIHZhciByb2xlVGVtcGxhdGVWaWV3ID0gcm9sZVZpZXcucm9sZXNbcm9sZV07XG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSAkc3RhdGUuZ2V0KHJvbGVWaWV3LnJvdXRlKS52aWV3c1tyb2xlVmlldy52aWV3XTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZVRlbXBsYXRlVmlldykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcudGVtcGxhdGVVcmwgPSByb2xlVGVtcGxhdGVWaWV3O1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVZpZXcuZGVmYXVsdFRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2gocm9sZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRvcic6IG1vZGVsID0gJy9hcGkvY3JlYXRvcnMvJyArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzogbW9kZWwgPSAnL2FwaS9pbnZlc3RvcnMvJyArIHJvbGVJZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQobW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3JvbGVdID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlUGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEhhcyBVc2VyIFJvbGVcblxuICAgICAgICAkcm9vdFNjb3BlLmhhc1VzZXJSb2xlID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciBoYXNSb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogcm9sZX0sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1JvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoJGF1dGhQcm92aWRlcil7XG4gICAgICAgIC8vIFNhdGVsbGl6ZXIgY29uZmlndXJhdGlvbiB0aGF0IHNwZWNpZmllcyB3aGljaCBBUElcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cbiAgICAgICAgJGF1dGhQcm92aWRlci5sb2dpblVybCA9ICcvYXBpL2F1dGhlbnRpY2F0ZSc7XG4gICAgICAgICRhdXRoUHJvdmlkZXIudG9rZW5QcmVmaXggPSAnZnVuZGF0b3InO1xuXG4gICAgICAgIHZhciByZWRpcmVjdFVyaVBhdGggPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIubGlua2VkaW4oe1xuICAgICAgICBcdGNsaWVudElkOiAnNzd6anhmYmgyOTI4cmUnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvYXV0aGVudGljYXRlL2xpbmtlZGluJyxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ3N0YXRlJ10sXG4gICAgICAgICAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxuICAgICAgICAgICAgdHlwZTogJzIuMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnc2VsZidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuICAgICAgICAgICAgY2xpZW50SWQ6ICcxMDQyMjQ3NzI3MDkxLWRtcWM1NWFmN3RsNThoMnJxdjNwcW5ybWpqYmI5NzMzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvYXV0aGVudGljYXRlL2dvb2dsZScsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCcsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvYXV0aGVudGljYXRlL2dvb2dsZScsXG4gICAgICAgICAgICByZXF1aXJlZFVybFBhcmFtczogWydzY29wZSddLFxuICAgICAgICAgICAgb3B0aW9uYWxVcmxQYXJhbXM6IFsnZGlzcGxheSddLFxuICAgICAgICAgICAgc2NvcGU6IFsncHJvZmlsZScsICdlbWFpbCddLFxuICAgICAgICAgICAgc2NvcGVQcmVmaXg6ICdvcGVuaWQnLFxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuICAgICAgICAgICAgY2xpZW50SWQ6ICc5MDA1MzMxMjMzOTU5MjAnLFxuICAgICAgICAgICAgbmFtZTogJ2ZhY2Vib29rJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvYXV0aGVudGljYXRlL2ZhY2Vib29rJyxcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS92Mi41L2RpYWxvZy9vYXV0aCcsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogcmVkaXJlY3RVcmlQYXRoICsgJy9hcGkvYXV0aGVudGljYXRlL2ZhY2Vib29rJyxcbiAgICAgICAgICAgIHJlcXVpcmVkVXJsUGFyYW1zOiBbJ2Rpc3BsYXknLCAnc2NvcGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxuICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcbiAgICAgICAgICAgIHR5cGU6ICcyLjAnLFxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiXG4oZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uIChmbG93RmFjdG9yeVByb3ZpZGVyKXtcblxuICAgICAgICBmbG93RmFjdG9yeVByb3ZpZGVyLmRlZmF1bHRzID0ge1xuICAgICAgICBcdHVwbG9hZE1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdGFyZ2V0OiAnL2FwaS9maWxlcy8nLFxuICAgICAgICAgICAgcGVybWFuZW50RXJyb3JzOls0MDQsIDUwMCwgNTAxXVxuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuXHQuZGlyZWN0aXZlKCdmZExvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiB7XG5cdCAgXHRzY29wZToge1xuXHQgIFx0XHR2aWV3Qm94OiAnQCdcblx0ICBcdH0sXG5cdCAgICByZXN0cmljdDogJ0UnLFxuXHQgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZmQtbG9hZGVyIGxhLWJhbGwtcHVsc2VcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nLFxuXHQgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdCAgICBcdCRlbGVtZW50LmFkZENsYXNzKCRhdHRycy5jbGFzcyk7XG5cdCAgICB9XG5cdCAgfTtcblx0fSk7XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gICAgXHRyZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCh2YWx1ZSkgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbmdNaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHRyZXN0cmljdDogJ0EnLFxuICAgIFx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgIFx0XHRcdHNjb3BlLiR3YXRjaChhdHRyLm5nTWluLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoY3RybC4kdmlld1ZhbHVlKTtcbiAgICBcdFx0XHR9KTtcbiAgICBcdFx0XHR2YXIgbWluVmFsaWRhdG9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgXHRcdFx0XHR2YXIgbWluID0gc2NvcGUuJGV2YWwoYXR0ci5uZ01pbikgfHwgMDtcbiAgICBcdFx0XHRcdGlmICghaXNFbXB0eSh2YWx1ZSkgJiYgdmFsdWUgPCBtaW4pIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgZmFsc2UpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuICAgIFx0XHRcdFx0fSBlbHNlIHtcbiAgICBcdFx0XHRcdFx0Y3RybC4kc2V0VmFsaWRpdHkoJ25nTWluJywgdHJ1ZSk7XG4gICAgXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9O1xuXG4gICAgXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKG1pblZhbGlkYXRvcik7XG4gICAgXHRcdH1cbiAgICBcdH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbmdNYXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHRyZXN0cmljdDogJ0EnLFxuICAgIFx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgIFx0XHRcdHNjb3BlLiR3YXRjaChhdHRyLm5nTWF4LCBmdW5jdGlvbiAoKSB7XG4gICAgXHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoY3RybC4kdmlld1ZhbHVlKTtcbiAgICBcdFx0XHR9KTtcbiAgICBcdFx0XHR2YXIgbWF4VmFsaWRhdG9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgXHRcdFx0XHR2YXIgbWF4ID0gc2NvcGUuJGV2YWwoYXR0ci5uZ01heCkgfHwgSW5maW5pdHk7XG4gICAgXHRcdFx0XHRpZiAoIWlzRW1wdHkodmFsdWUpICYmIHZhbHVlID4gbWF4KSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01heCcsIGZhbHNlKTtcbiAgICBcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcbiAgICBcdFx0XHRcdH0gZWxzZSB7XG4gICAgXHRcdFx0XHRcdGN0cmwuJHNldFZhbGlkaXR5KCduZ01heCcsIHRydWUpO1xuICAgIFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fTtcblxuICAgIFx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChtYXhWYWxpZGF0b3IpO1xuICAgIFx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChtYXhWYWxpZGF0b3IpO1xuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZmlsdGVyKCd0cnVzdGVkSHRtbCcsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuICAgICAgICB9O1xuICAgIH1dKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnKS5maWx0ZXIoJ3N0cmlwVGFncycsIGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZih0ZXh0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCksIFwiZ1wiKTtcblx0XHRcdFx0dGV4dCA9IFN0cmluZyh0ZXh0KS5yZXBsYWNlKHJlLCBcIiBcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1teXFx4MDAtXFx4N0ZdL2csIFwiXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mbmJzcDsvZ2ksJyAnKTtcblx0XHRcdH1cblxuXHQgICAgIFx0cmV0dXJuIHRleHQgPyBTdHJpbmcodGV4dCkucmVwbGFjZSgvPFtePl0rPi9nbSwgJycpIDogJyc7XG5cdCAgICB9O1xuXHQgIH1cblx0KTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycpLmZpbHRlcignY2xlYW5IdG1sJywgZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXG5cdFx0XHRpZiAodHlwZW9mKHRleHQpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXlxceDAwLVxceDdGXS9nLCBcIlwiKTtcblx0XHRcdH1cblxuXHQgICAgIFx0cmV0dXJuIHRleHQ7XG5cdCAgICB9O1xuXHQgIH1cblx0KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnKS5mYWN0b3J5KCdGZE5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcSwgJGludGVydmFsLCAkaHR0cCwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBnbG9iYWxOb3RpZmljYXRpb25zID0ge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uczogW10sXG4gICAgICAgICAgICB1bnJlYWQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcHVzaE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICBnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24obm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihub3RpZmljYXRpb25zKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMgPSBub3RpZmljYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9ub3RpZmljYXRpb25zLycgKyB1c2VyLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTm90aWZpY2F0aW9ucyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYXRlc3ROb3RpZmljYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0TGF0ZXN0Tm90aWZpY2F0aW9uc0RlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb25zSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnbG9iYWxOb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGVzdE5vdGlmaWNhdGlvbnMgPSBhbmd1bGFyLmNvcHkoZ2xvYmFsTm90aWZpY2F0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMgPSBsYXRlc3ROb3RpZmljYXRpb25zLm5vdGlmaWNhdGlvbnMuc2xpY2UoMCwgNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwobm90aWZpY2F0aW9uc0ludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExhdGVzdE5vdGlmaWNhdGlvbnNEZWZlcnJlZC5yZXNvbHZlKGxhdGVzdE5vdGlmaWNhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRMYXRlc3ROb3RpZmljYXRpb25zRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9ub3RpZmljYXRpb25zLycgKyBub3RpZmljYXRpb25JZCArICcvcmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBcdG5vdGlmaWNhdGlvbi5yZWFkID0gMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFkQWxsTm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvbm90aWZpY2F0aW9ucy91c2VyLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnL3JlYWQnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbE5vdGlmaWNhdGlvbnMudW5yZWFkID0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBub3RpZmljYXRpb25UcmlnZ2VyOiBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICAgICAgLy8gICAgIHN3aXRjaChjYXRlZ29yeSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ2Rvd25sb2FkLm5ldyc6ICRzdGF0ZS5nbygnYXBwLmRhc2hib2FyZC5kb3dubG9hZHMnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgJ3BhcnRuZXIucGFpcmVkJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLnBhcnRuZXIuZGV0YWlscycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAncGFydG5lci5zdHVkeV9wZXJpb2RzJzogJHN0YXRlLmdvKCdhcHAuZGFzaGJvYXJkLmNvdXJzZXMucGVyaW9kcycpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAndXNlci5jcmVhdGVkJzogJHN0YXRlLmdvKFRhc2tzU2VydmljZS5uZXh0VGFzaygpLnZpZXcpO1xuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgZ2V0Tm90aWZpY2F0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbih0eXBlLCB0aXRsZSwgbWVzc2FnZSwgcHVzaCkge1xuICAgICAgICAgICAgICAgIHRvYXN0ZXIucG9wKHR5cGUsIHRpdGxlLCBtZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwdXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RpZnlFcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Rlci5wb3AoJ2Vycm9yJywgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb24odHlwZSwgdGl0bGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycpLmZhY3RvcnkoJ0ZkU2Nyb2xsZXInLCBmdW5jdGlvbigkd2luZG93KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvVG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBib2R5LnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAnNTAwJywgJ3N3aW5nJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TZWN0aW9uOiBmdW5jdGlvbihpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBcdHZhciAkc2VjdGlvbiA9ICQoaWRlbnRpZmllcik7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCRzZWN0aW9uKTtcbiAgICAgICAgICAgIFx0aWYgKCRzZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFx0XHR2YXIgdG9wID0gJHNlY3Rpb24ub2Zmc2V0KCkudG9wIC0gNzA7XG5cbiAgICAgICAgICAgIFx0XHR2YXIgYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgICAgICBcdGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgJzUwMCcsICdzd2luZycpO1xuICAgICAgICAgICAgXHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpe1xuICAgICAgICAkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmhvbWUnLCB7fSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgICAkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLmRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5kYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL3NpZ251cCcsIHVzZXJJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1Y2Nlc3MgPT09IHRydWUgJiYgdHlwZW9mKHJlc3VsdC5kYXRhLm1lc3NhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VjY2Vzc01lc3NhZ2UgPSByZXN1bHQuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IuZGF0YS5tZXNzYWdlLmVtYWlsWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVycm9yLmRhdGEubWVzc2FnZS5lbWFpbFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRhdXRoLmxvZ2luKGNyZWRlbnRpYWxzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhLnRva2VuKTtcblxuICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN0YXRlID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTdGF0ZVBhcmFtcyA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXM7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGFjdGl2ZVN0YXRlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGguc2lnbnVwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZShwYXlsb2FkLnJvbGUsIHBheWxvYWQucm9sZV9pZCwgdHJ1ZSwgYWN0aXZlU3RhdGUsIGFjdGl2ZVN0YXRlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzVGV4dCA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdUaGUgZW1haWwgb3IgcGFzc3dvcmQgeW91IGVudGVyZWQgaXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVyci5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICAgICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiAnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb3QgTG9nZ2VkIGluICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDb25maXJtQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHApe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZigkc3RhdGVQYXJhbXMuY29kZSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZigkc3RhdGVQYXJhbXMuZW1haWwpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb25maXJtYXRpb25fY29kZTogJHN0YXRlUGFyYW1zLmNvZGUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICRzdGF0ZVBhcmFtcy5lbWFpbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9jb25maXJtJywgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnJvci5kYXRhLmVycm9yO1xuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aFJlY292ZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHJlY292ZXJ5RW1haWw6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmRfcmVwZWF0OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YoJHN0YXRlUGFyYW1zLnRva2VuKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKCRzdGF0ZVBhcmFtcy5lbWFpbCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnc2V0JztcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZWNvdmVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS52aWV3U3RhdGUgPSAnbG9hZGluZyc7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZGF0YS5yZWNvdmVyeUVtYWlsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZS9mb3Jnb3QnLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3NNZXNzYWdlID0gJ0EgcGFzc3dvcmQgcmVzZXQgbGluayBoYXMgYmVlbiBzZW50IHRvIHlvdXIgZW1haWwuJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTdGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5lcnJvciA9PT0gJ0ludmFsaWQgVXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVXNlciBkb2VzIG5vdCBleGlzdCc7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdFcnJvciBpbiByZWNvdmVyaW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3JlY292ZXInO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmVycm9yID09PSAnSW52YWxpZCBVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlY292ZXJpbmcgcGFzc3dvcmQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IFBhc3N3b3JkXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQubGVuZ3RoID49IDYpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEucGFzc3dvcmQgPT09ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICRzdGF0ZVBhcmFtcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkc3RhdGVQYXJhbXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLmRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246ICRzY29wZS5kYXRhLnBhc3N3b3JkX3JlcGVhdFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvYXV0aGVudGljYXRlL3JlY292ZXInLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXV0aC5yZW1vdmVUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhdXRoLnNldFRva2VuKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5hdXRoLmxvZ2luJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIGZyb20gaGVyZSAuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnRXJyb3IgaW4gcmVzZXR0aW5nIHBhc3N3b3JkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ0Vycm9yIGluIHJlc2V0dGluZyBwYXNzd29yZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmlld1N0YXRlID0gJ3NldCc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBkbyBub3QgbWF0Y2ghJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1Bhc3N3b3JkcyBuZWVkIHRvIGJlIGxvbmdlciB0aGFuIDYgY2hhcmFjdGVycyEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YVVSSSk7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZm9jdXNPbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHsgZm9jdXNPbjogJz0nIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3BlLmZvY3VzT24pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuZm9jdXNPbil7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICB9O1xuICAgIH0pO1xuXG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHJlc291cmNlLCBGZFNjcm9sbGVyLCAkZmlsdGVyLCBGaWxlVXBsb2FkZXIpIHtcblxuICAgICAgICAkc2NvcGUuZm9ybSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiAxLFxuICAgICAgICAgICAgdG90YWxTdGVwczogM1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b3RhbFN0ZXBzID0ge1xuICAgICAgICAgICAgY3JlYXRvcjogMyxcbiAgICAgICAgICAgIGV4cGVydDogNCxcbiAgICAgICAgICAgIGludmVzdG9yOiA0XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZUZvcm1TdGVwID0gZnVuY3Rpb24obmV3U3RlcCl7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybS5jdXJyZW50U3RlcCA9IG5ld1N0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gWydBZmdoYW5pc3RhbicsICfDhWxhbmQgSXNsYW5kcycsICdBbGJhbmlhJywgJ0FsZ2VyaWEnLCAnQW1lcmljYW4gU2Ftb2EnLCAnQW5kb3JyQScsICdBbmdvbGEnLCAnQW5ndWlsbGEnLCAnQW50YXJjdGljYScsICdBbnRpZ3VhIGFuZCBCYXJidWRhJywgJ0FyZ2VudGluYScsICdBcm1lbmlhJywgJ0FydWJhJywgJ0F1c3RyYWxpYScsICdBdXN0cmlhJywgJ0F6ZXJiYWlqYW4nLCAnQmFoYW1hcycsICdCYWhyYWluJywgJ0JhbmdsYWRlc2gnLCAnQmFyYmFkb3MnLCAnQmVsYXJ1cycsICdCZWxnaXVtJywgJ0JlbGl6ZScsICdCZW5pbicsICdCZXJtdWRhJywgJ0JodXRhbicsICdCb2xpdmlhJywgJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnLCAnQm90c3dhbmEnLCAnQm91dmV0IElzbGFuZCcsICdCcmF6aWwnLCAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JywgJ0JydW5laSBEYXJ1c3NhbGFtJywgJ0J1bGdhcmlhJywgJ0J1cmtpbmEgRmFzbycsICdCdXJ1bmRpJywgJ0NhbWJvZGlhJywgJ0NhbWVyb29uJywgJ0NhbmFkYScsICdDYXBlIFZlcmRlJywgJ0NheW1hbiBJc2xhbmRzJywgJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycsICdDaGFkJywgJ0NoaWxlJywgJ0NoaW5hJywgJ0NocmlzdG1hcyBJc2xhbmQnLCAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLCAnQ29sb21iaWEnLCAnQ29tb3JvcycsICdDb25nbycsICdDb25nbywgVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlJywgJ0Nvb2sgSXNsYW5kcycsICdDb3N0YSBSaWNhJywgJ0NvdGUgRFxcJ0l2b2lyZScsICdDcm9hdGlhJywgJ0N1YmEnLCAnQ3lwcnVzJywgJ0N6ZWNoIFJlcHVibGljJywgJ0Rlbm1hcmsnLCAnRGppYm91dGknLCAnRG9taW5pY2EnLCAnRG9taW5pY2FuIFJlcHVibGljJywgJ0VjdWFkb3InLCAnRWd5cHQnLCAnRWwgU2FsdmFkb3InLCAnRXF1YXRvcmlhbCBHdWluZWEnLCAnRXJpdHJlYScsICdFc3RvbmlhJywgJ0V0aGlvcGlhJywgJ0ZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKScsICdGYXJvZSBJc2xhbmRzJywgJ0ZpamknLCAnRmlubGFuZCcsICdGcmFuY2UnLCAnRnJlbmNoIEd1aWFuYScsICdGcmVuY2ggUG9seW5lc2lhJywgJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycsICdHYWJvbicsICdHYW1iaWEnLCAnR2VvcmdpYScsICdHZXJtYW55JywgJ0doYW5hJywgJ0dpYnJhbHRhcicsICdHcmVlY2UnLCAnR3JlZW5sYW5kJywgJ0dyZW5hZGEnLCAnR3VhZGVsb3VwZScsICdHdWFtJywgJ0d1YXRlbWFsYScsICdHdWVybnNleScsICdHdWluZWEnLCAnR3VpbmVhLUJpc3NhdScsICdHdXlhbmEnLCAnSGFpdGknLCAnSGVhcmQgSXNsYW5kIGFuZCBNY2RvbmFsZCBJc2xhbmRzJywgJ0hvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpJywgJ0hvbmR1cmFzJywgJ0hvbmcgS29uZycsICdIdW5nYXJ5JywgJ0ljZWxhbmQnLCAnSW5kaWEnLCAnSW5kb25lc2lhJywgJ0lyYW4sIElzbGFtaWMgUmVwdWJsaWMgT2YnLCAnSXJhcScsICdJcmVsYW5kJywgJ0lzbGUgb2YgTWFuJywgJ0lzcmFlbCcsICdJdGFseScsICdKYW1haWNhJywgJ0phcGFuJywgJ0plcnNleScsICdKb3JkYW4nLCAnS2F6YWtoc3RhbicsICdLZW55YScsICdLaXJpYmF0aScsICdLb3JlYSwgRGVtb2NyYXRpYyBQZW9wbGVcXCdTIFJlcHVibGljIG9mJywgJ0tvcmVhLCBSZXB1YmxpYyBvZicsICdLdXdhaXQnLCAnS3lyZ3l6c3RhbicsICdMYW8gUGVvcGxlXFwnUyBEZW1vY3JhdGljIFJlcHVibGljJywgJ0xhdHZpYScsICdMZWJhbm9uJywgJ0xlc290aG8nLCAnTGliZXJpYScsICdMaWJ5YW4gQXJhYiBKYW1haGlyaXlhJywgJ0xpZWNodGVuc3RlaW4nLCAnTGl0aHVhbmlhJywgJ0x1eGVtYm91cmcnLCAnTWFjYW8nLCAnTWFjZWRvbmlhLCBUaGUgRm9ybWVyIFl1Z29zbGF2IFJlcHVibGljIG9mJywgJ01hZGFnYXNjYXInLCAnTWFsYXdpJywgJ01hbGF5c2lhJywgJ01hbGRpdmVzJywgJ01hbGknLCAnTWFsdGEnLCAnTWFyc2hhbGwgSXNsYW5kcycsICdNYXJ0aW5pcXVlJywgJ01hdXJpdGFuaWEnLCAnTWF1cml0aXVzJywgJ01heW90dGUnLCAnTWV4aWNvJywgJ01pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2YnLCAnTW9sZG92YSwgUmVwdWJsaWMgb2YnLCAnTW9uYWNvJywgJ01vbmdvbGlhJywgJ01vbnRzZXJyYXQnLCAnTW9yb2NjbycsICdNb3phbWJpcXVlJywgJ015YW5tYXInLCAnTmFtaWJpYScsICdOYXVydScsICdOZXBhbCcsICdOZXRoZXJsYW5kcycsICdOZXRoZXJsYW5kcyBBbnRpbGxlcycsICdOZXcgQ2FsZWRvbmlhJywgJ05ldyBaZWFsYW5kJywgJ05pY2FyYWd1YScsICdOaWdlcicsICdOaWdlcmlhJywgJ05pdWUnLCAnTm9yZm9sayBJc2xhbmQnLCAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgJ05vcndheScsICdPbWFuJywgJ1Bha2lzdGFuJywgJ1BhbGF1JywgJ1BhbGVzdGluaWFuIFRlcnJpdG9yeSwgT2NjdXBpZWQnLCAnUGFuYW1hJywgJ1BhcHVhIE5ldyBHdWluZWEnLCAnUGFyYWd1YXknLCAnUGVydScsICdQaGlsaXBwaW5lcycsICdQaXRjYWlybicsICdQb2xhbmQnLCAnUG9ydHVnYWwnLCAnUHVlcnRvIFJpY28nLCAnUWF0YXInLCAnUmV1bmlvbicsICdSb21hbmlhJywgJ1J1c3NpYW4gRmVkZXJhdGlvbicsICdSV0FOREEnLCAnU2FpbnQgSGVsZW5hJywgJ1NhaW50IEtpdHRzIGFuZCBOZXZpcycsICdTYWludCBMdWNpYScsICdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJywgJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJywgJ1NhbW9hJywgJ1NhbiBNYXJpbm8nLCAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJywgJ1NhdWRpIEFyYWJpYScsICdTZW5lZ2FsJywgJ1NlcmJpYSBhbmQgTW9udGVuZWdybycsICdTZXljaGVsbGVzJywgJ1NpZXJyYSBMZW9uZScsICdTaW5nYXBvcmUnLCAnU2xvdmFraWEnLCAnU2xvdmVuaWEnLCAnU29sb21vbiBJc2xhbmRzJywgJ1NvbWFsaWEnLCAnU291dGggQWZyaWNhJywgJ1NvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJywgJ1NwYWluJywgJ1NyaSBMYW5rYScsICdTdWRhbicsICdTdXJpbmFtZScsICdTdmFsYmFyZCBhbmQgSmFuIE1heWVuJywgJ1N3YXppbGFuZCcsICdTd2VkZW4nLCAnU3dpdHplcmxhbmQnLCAnU3lyaWFuIEFyYWIgUmVwdWJsaWMnLCAnVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYScsICdUYWppa2lzdGFuJywgJ1RhbnphbmlhLCBVbml0ZWQgUmVwdWJsaWMgb2YnLCAnVGhhaWxhbmQnLCAnVGltb3ItTGVzdGUnLCAnVG9nbycsICdUb2tlbGF1JywgJ1RvbmdhJywgJ1RyaW5pZGFkIGFuZCBUb2JhZ28nLCAnVHVuaXNpYScsICdUdXJrZXknLCAnVHVya21lbmlzdGFuJywgJ1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcycsICdUdXZhbHUnLCAnVWdhbmRhJywgJ1VrcmFpbmUnLCAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnLCAnVW5pdGVkIEtpbmdkb20nLCAnVW5pdGVkIFN0YXRlcycsICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnLCAnVXJ1Z3VheScsICdVemJla2lzdGFuJywgJ1ZhbnVhdHUnLCAnVmVuZXp1ZWxhJywgJ1ZpZXQgTmFtJywgJ1ZpcmdpbiBJc2xhbmRzLCBCcml0aXNoJywgJ1ZpcmdpbiBJc2xhbmRzLCBVLlMuJywgJ1dhbGxpcyBhbmQgRnV0dW5hJywgJ1dlc3Rlcm4gU2FoYXJhJywgJ1llbWVuJywgJ1phbWJpYScsICdaaW1iYWJ3ZSddO1xuXG4gICAgICAgICRzY29wZS5jb250YWN0VGltZXMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dvcmtpbmcgaG91cnMgKDlhbSB0byA2IHBtKScsIHZhbHVlOiAnOS02J30sXG4gICAgICAgICAgICB7bmFtZTogJ0V2ZW5pbmcgdGltZSAoNmFtIHRvIDkgcG0pJywgdmFsdWU6ICc2LTknfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRSb2xlOiAnY3JlYXRvcicsXG4gICAgICAgICAgICBhZ2VHYXRlOiAneWVzJyxcbiAgICAgICAgICAgIGNvdW50cnlPcmlnaW46ICcnLFxuICAgICAgICAgICAgY291bnRyeVJlc2lkZW5jZTogJycsXG4gICAgICAgICAgICBjb250YWN0VGltZTogJycsXG4gICAgICAgICAgICBleHBlcnRpc2VGb3JtOiB7XG4gICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JvcHBlZFRodW1ibmFpbDogbnVsbCxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0udG90YWxTdGVwcyA9ICRzY29wZS50b3RhbFN0ZXBzWyRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZV07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSAqIDEwMCwgOTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzSW52ZXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgoKDEgLSAoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSkgKiAxMDApLCA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHVzZXIucmVnaXN0ZXJlZCA9PSAxKSAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0cycpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ292ZXIgZHJhZ2xlYXZlIGRyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnbGVhdmUnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvZmlsZXMnLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1JbWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSAkc2NvcGUuZGF0YS5jcm9wcGVkVGh1bWJuYWlsO1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzcG9uc2UuZmlsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9ICdZb3VyIHByb2ZpbGUgcGljdHVyZSB3YXMgc3VjY2Vzc2Z1bGx5IHVwbG9hZGVkISc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlRXJyb3IgPSAnUHJvZmlsZSBwaWN0dXJlIGZhaWxlZCB0byB1cGxvYWQsIHBsZWFzZSB0cnkgYWdhaW4hJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKGltYWdlKSk7XG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5hbGxTa2lsbHMgPSAkcmVzb3VyY2UoJ2FwaS9za2lsbHMnKS5xdWVyeSgpO1xuXG4gICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpe1xuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dHRlZEV4cGVydGlzZSA9IHtzZWxlY3RlZEV4cGVydGlzZTogJ251bGwnLCBvdGhlckV4cGVydGlzZToge3N0YXR1czogMX19O1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFskc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtMV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsYXN0SW5wdXR0ZWRFeHBlcnRpc2UpO1xuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPCAzICYmIChsYXN0SW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2UgIT09IG51bGwgJiYgbGFzdElucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeUxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2VMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeToge25hbWU6ICcnLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJFeHBlcnRpc2U6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBvdGhlclNraWxsczoge2xpc3Q6IFtdLCBzdGF0dXM6IDB9LFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZUNhdGVnb3J5LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkoaW5kZXgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAzO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihlLCBpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZU90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oaW5kZXgsIGV4cGVydGlzZSl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IGV4cGVydGlzZTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2UgPSBmdW5jdGlvbihlLCBpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IFtdO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2Uuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmluU2tpbGxzID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIHZhciBmb3VuZFNraWxsID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihmb3VuZFNraWxsKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRTa2lsbC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0U2tpbGwgPSBmdW5jdGlvbihpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgaWYoISRzY29wZS5pblNraWxscyhpbmRleCwgc2tpbGwpKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscy5wdXNoKHNraWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0U2tpbGwgPSBmdW5jdGlvbihlLCBpbmRleCwgc2tpbGwpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscywge2lkOiBza2lsbC5pZH0sIGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhYW5ndWxhci5lcXVhbHMoYWN0dWFsLCBleHBlY3RlZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlU2tpbGxzID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gYW5ndWxhci5jb3B5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzLmxpc3QpO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMgPSB7bGlzdDogW10sIHN0YXR1czogMH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvMCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmV4cGVydGlzZVN1YkNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS9jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaFNraWxsc0xpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5za2lsbHNMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UuaWQgKyAnL3NraWxscy8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5zdWJtaXREZXRhaWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5mbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICRzY29wZS5kYXRhLmxuYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSxcbiAgICAgICAgICAgICAgICBhZ2VfZ2F0ZTogJHNjb3BlLmRhdGEuYWdlR2F0ZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X29yaWdpbjogJHNjb3BlLmRhdGEuY291bnRyeU9yaWdpbixcbiAgICAgICAgICAgICAgICBjb3VudHJ5X3Jlc2lkZW5jZTogJHNjb3BlLmRhdGEuY291bnRyeVJlc2lkZW5jZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X251bWJlcjogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlcixcbiAgICAgICAgICAgICAgICBjb250YWN0X3RpbWU6ICRzY29wZS5kYXRhLmNvbnRhY3RUaW1lLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2goJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlc3RtZW50QnVkZ2V0ID09PSAnb3RoZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0T3RoZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXQgPSBpbnZlc3RtZW50QnVkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2dvYWwgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRHb2FsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X3JlYXNvbiA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudFJlYXNvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuY3JlYXRvciA9IHt9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4cGVydCc6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmV4cGVydCA9IHsgbGlzdDogW10gfTtcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCwgZnVuY3Rpb24oaW5wdXR0ZWRFeHBlcnRpc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsIHx8IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuZXhwZXJ0Lmxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVydGlzZV9jYXRlZ29yeTogaW5wdXR0ZWRFeHBlcnRpc2Uuc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfZXhwZXJ0aXNlX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2Vfc3ViX2NhdGVnb3J5OiBpbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl9leHBlcnRpc2U6IGlucHV0dGVkRXhwZXJ0aXNlLm90aGVyRXhwZXJ0aXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHM6IGlucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkU2tpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRhdGEpO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvdXNlcnMvJyArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubmFtZSA9ICRzY29wZS5kYXRhLmZuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubGFzdF9uYW1lID0gJHNjb3BlLmRhdGEubG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuaW5pdGlhbFJvbGVBc3NpZ25tZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGU7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAkc2NvcGUub25nb2luZ0NvbnRlc3RzID0gW107XG4gICAgICAgICAgICAkc2NvcGUuanVkZ2luZ0NvbnRlc3RzID0gW107XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPT09ICdjcmVhdG9yJyAmJiB0eXBlb2YoJHJvb3RTY29wZS51c2VyLmNyZWF0b3IpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgb2djIGluICRyb290U2NvcGUudXNlci5jcmVhdG9yLm9uZ29pbmdfY29udGVzdCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0X2lkID0gJHJvb3RTY29wZS51c2VyLmNyZWF0b3Iub25nb2luZ19jb250ZXN0W29nY107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uZ29pbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2djSW5kZXggPSAkc2NvcGUuY29udGVzdHMuaW5kZXhPZihjb250ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZ2NJbmRleCA6ICcgKyBvZ2NJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdHMuc3BsaWNlKG9nY0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknICYmICRyb290U2NvcGUudXNlci5qdWRnaW5nLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgamMgaW4gJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVzdF9pZCA9ICRyb290U2NvcGUudXNlci5qdWRnaW5nW2pjXS5jb250ZXN0X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXN0ID0gJGZpbHRlcignZmlsdGVyJykocmVzdWx0LCB7aWQ6IGNvbnRlc3RfaWR9LCB0cnVlKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3QpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmp1ZGdpbmdDb250ZXN0cy5wdXNoKGNvbnRlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2ZkRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5mZEVudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RTaW5nbGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkZmlsdGVyLCAkdGltZW91dCwgRmRTY3JvbGxlciwgJGh0dHAsIExpZ2h0Ym94KSB7XG4gICAgICAgICRzY29wZS5jb250ZXN0SWQgPSAkc3RhdGVQYXJhbXMuY29udGVzdElkO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnRlc3RGdWxsRGVzY3JpcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnk6IGZhbHNlLFxuICAgICAgICAgICAgYWRkRW50cnlGb3JtOiB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGF0dGFjaGVkRmlsZXM6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRyeTogbnVsbCxcbiAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJycsXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJycsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeSA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyaWVzLzplbnRyeUlkJywge1xuICAgICAgICAgICAgZW50cnlJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29udGVzdGFudEVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy9jb250ZXN0Lzpjb250ZXN0SWQvY3JlYXRvci86Y3JlYXRvcklkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAganVkZ2VFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2p1ZGdlLzpqdWRnZUlkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvOmVudHJ5SWQvbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeVJhdGluZyA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyeS1yYXRpbmdzLzplbnRyeVJhdGluZ0lkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuXG4gICAgICAgICRzY29wZS5zaG93RnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5jb250ZXN0RnVsbERlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5oaWRlRnVsbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmNvbnRlc3RGdWxsRGVzY3JpcHRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbnRlc3QuZ2V0KHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZFxuICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbnRlc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdKdWRnZWFibGUgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuanVkZ2luZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGNvbnRlc3RpbmcgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIuY29udGVzdGluZywge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RfaWQ6ICRzY29wZS5jb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdDb250ZXN0aW5nID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmNvbnRlc3RpbmcsIHtcbiAgICAgICAgICAgICAgICBjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoanVkZ2VhYmxlLmxlbmd0aCA+IDAgJiYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2p1cnknICYmICRyb290U2NvcGUuYWN0aXZlUm9sZSAhPT0gJ2NyZWF0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuY29udGVzdElkID0gcmVzdWx0LmlkO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3Lm9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2p1cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogcmVzdWx0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnanVyeScgJiYganVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCRyb290U2NvcGUuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBlbmRpbmdKdWRnZWFibGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nSnVkZ2VhYmxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGNvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXN0aW5nLmxlbmd0aCA+IDAgJiYgJHJvb3RTY29wZS5hY3RpdmVSb2xlID09PSAnY3JlYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJHJvb3RTY29wZS5hY3RpdmVSb2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGVuZGluZ0NvbnRlc3RpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nQ29udGVzdGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dDb250ZXN0YW50TmRhUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2p1cnknOlxuICAgICAgICAgICAgICAgICAgICBFbnRyeS5qdWRnZUVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAganVkZ2VJZDogJHJvb3RTY29wZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICdjcmVhdG9yJ30sIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRvciA9IHJvbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBFbnRyeS5jb250ZXN0YW50RW50cmllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5ID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuZW50cmllcy1saXN0Jyk7XG5cbiAgICAgICAgICAgIHZhciBqdWRnZUlkID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuYWN0aXZlUm9sZSA9PT0gJ2p1cnknKSB7XG4gICAgICAgICAgICAgICAganVkZ2VJZCA9ICRyb290U2NvcGUudXNlci5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGp1ZGdlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZW50cmllcy8nICsgZW50cnkuaWQgKyAnL2p1ZGdlLycgKyBqdWRnZUlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcgPSByZXN1bHQuZGF0YS5yYXRpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIEVudHJ5LmdldCh7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5SWQ6IGVudHJ5LmlkXG4gICAgICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5nYWxsZXJ5ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy8xLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5vcGVuTGlnaHRib3ggPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgYWxsRmlsZXMgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmZpbGVzO1xuICAgICAgICAgICAgdmFyIGFsbEltYWdlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgICAgIGZvcih2YXIgYUYgaW4gYWxsRmlsZXMpe1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gYWxsRmlsZXNbYUZdO1xuICAgICAgICAgICAgICAgIGFsbEltYWdlcy5wdXNoKGZpbGUudXJsKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlLnVybCA9PT0gaXRlbS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gYUY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMaWdodGJveC5vcGVuTW9kYWwoYWxsSW1hZ2VzLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24gKGV2ZW50LCAkZmxvdywgZmxvd0ZpbGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZUFkZGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmbG93RmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGZpbGUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIGZpbGVzIDogJyArIG1lc3NhZ2UuZmlsZS5pZCk7XG4gICAgICAgICAgICAkZmlsZS5yZWZfaWQgPSBtZXNzYWdlLmZpbGUuaWQ7XG5cbiAgICAgICAgICAgIC8vIHZhciBpdGVtcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5hdHRhY2hlZEZpbGVzLCB7aWQ6IG1lc3NhZ2UuZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihtZXNzYWdlLmZpbGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmZpbGUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5lbnRyeUZpbGVSZW1vdmUgPSBmdW5jdGlvbihmaWxlLCAkZmxvdykge1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW1zID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMsIHtpZDogZmlsZS5pZH0pO1xuICAgICAgICAgICAgLy8gdmFyIGl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBpZiAodHlwZW9mKGl0ZW1zKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMuaW5kZXhPZihmaWxlLnJlZl9pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmlsZXNJbmRleCA9ICRmbG93LmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgICAgICBpZiAoZmlsZXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZlIGZpbGVzIC4uLiAnICsgZmlsZXNJbmRleCk7XG4gICAgICAgICAgICAgICAgJGZsb3cuZmlsZXMuc3BsaWNlKGZpbGVzSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmxvdy5maWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uYXR0YWNoZWRGaWxlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2hvd0FkZEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmVudHJpZXMtbGlzdCcpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5kZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmF0dGFjaGVkRmlsZXMgPSBbXTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEuYWRkRW50cnlGb3JtLmRlc2NyaXB0aW9uID0gJHNjb3BlLmNvbnRlc3QuZW50cmllc1skc2NvcGUuY29udGVzdC5lbnRyaWVzLmxlbmd0aCAtIDFdLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdEVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hlZEZpbGVzID0ge307XG4gICAgICAgICAgICB2YXIgdGh1bWJuYWlsX2lkID0gbnVsbDtcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5kYXRhLmFkZEVudHJ5Rm9ybS5mbG93LmZpbGVzLCBmdW5jdGlvbihmaWxlKXtcbiAgICAgICAgICAgICAgICBhdHRhY2hlZEZpbGVzW2ZpbGUucmVmX2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhcHRpb24nOiBmaWxlLnJlZl9jYXB0aW9uXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVwYXJlIHRvIGFzc2lnbiB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5maWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSAhPT0gLTEgJiYgdGh1bWJuYWlsX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3aG9vcGllIGl0IG1hdGNoZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsX2lkID0gZmlsZS5yZWZfaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciByb2xlcyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLCB7cm9sZTogJ2NyZWF0b3InfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IG5ldyBFbnRyeSgpO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNyZWF0b3JfaWQgPSByb2xlLmlkO1xuICAgICAgICAgICAgICAgIGVudHJ5LmNvbnRlc3RfaWQgPSAkc2NvcGUuY29udGVzdC5pZDtcbiAgICAgICAgICAgICAgICBlbnRyeS50aHVtYm5haWxfaWQgPSB0aHVtYm5haWxfaWQ7XG5cbiAgICAgICAgICAgICAgICBlbnRyeS5uYW1lID0gJHJvb3RTY29wZS51c2VyLm5hbWUgKyBcIidzIEVudHJ5XCI7XG4gICAgICAgICAgICAgICAgZW50cnkuZGVzY3JpcHRpb24gPSAkc2NvcGUuZGF0YS5hZGRFbnRyeUZvcm0uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgZW50cnkuYXR0YWNoZWRfZmlsZXMgPSBhdHRhY2hlZEZpbGVzO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkudGh1bWJuYWlsX2lkKTtcblxuICAgICAgICAgICAgICAgIGVudHJ5LiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cnkgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nRW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRFbnRyeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSAgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0RW50cnkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkRW50cmllcygnY3JlYXRvcicpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBFbnRyeS5zZW5kTWVzc2FnZSh7ZW50cnlJZDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZH0sIG1lc3NhZ2VSZXF1ZXN0LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZU1hcmtzID0gZnVuY3Rpb24oZW50cnlSYXRpbmdJZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB1cGRhdGVkUmF0aW5nID0ge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuZGVzaWduLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmNyZWF0aXZpdHksXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuaW5kdXN0cmlhbCxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLm1hcmtldCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuanVkZ2VfaWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmVudHJ5X2lkID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihlbnRyeVJhdGluZ0lkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBFbnRyeVJhdGluZy51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiBlbnRyeVJhdGluZ0lkXG4gICAgICAgICAgICAgICAgfSwgdXBkYXRlZFJhdGluZykuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIHNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZEVudHJpZXMoJ2p1cnknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlSYXRpbmcgPSBuZXcgRW50cnlSYXRpbmcodXBkYXRlZFJhdGluZyk7XG4gICAgICAgICAgICAgICAgZW50cnlSYXRpbmcuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgY3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRFbnRyaWVzKCdqdXJ5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2ZWRNYXJrcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUp1ZGdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIFNob3cgTkRBXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLmNvbnRlc3Qtc2luZ2xlJywgNTApO1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0p1ZGdlTmRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hY2NlcHRKdWRnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGFMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy9iZWNvbWVKdWRnZScsIHtjb250ZXN0X2lkOiAkc2NvcGUuY29udGVzdC5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZGF0YS5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93SnVkZ2VOZGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dKdWRnZU5kYUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmJlY29tZUNvbnRlc3RhbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gU2hvdyBOREFcbiAgICAgICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcuY29udGVzdC1zaW5nbGUnLCA1MCk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuYWNjZXB0Q29udGVzdGFudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzL2JlY29tZUNvbnRlc3RhbnQnLCB7Y29udGVzdF9pZDogJHNjb3BlLmNvbnRlc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmRhdGEuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zaG93Q29udGVzdGFudE5kYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2hvd0NvbnRlc3RhbnROZGFMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQsICRmaWx0ZXIsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZSBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gQXZhaWxhYmxlIFZpZXdzIDogTGlzdCwgQ3JlYXRlXG4gICAgICAgICRzY29wZS52aWV3ID0gJ2xpc3QnO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Byb2plY3RMb2FkaW5nOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gbnVsbDtcblxuICAgICAgICB2YXIgUHJvamVjdCA9ICRyZXNvdXJjZSgnL2FwaS9wcm9qZWN0cy86cHJvamVjdElkJywge1xuICAgICAgICAgICAgcHJvamVjdElkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXF1aXJlZFJvbGUgPSAnY3JlYXRvcic7XG4gICAgICAgIHZhciBtYXRjaGluZ1JvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHsgcm9sZTogcmVxdWlyZWRSb2xlIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YobWF0Y2hpbmdSb2xlcykgIT09ICd1bmRlZmluZWQnICYmIG1hdGNoaW5nUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nUm9sZSA9IG1hdGNoaW5nUm9sZXNbMF07XG5cbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgIT09IHJlcXVpcmVkUm9sZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc3dpdGNoVXNlclJvbGUocmVxdWlyZWRSb2xlLCBtYXRjaGluZ1JvbGUuaWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJvamVjdElkID0gcGFyc2VJbnQoJHN0YXRlUGFyYW1zLnByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdElkKSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXNOYU4ocHJvamVjdElkKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3QucXVlcnkoKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxsUHJvamVjdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzTnVtYmVyKHByb2plY3RJZCkgJiYgaXNGaW5pdGUocHJvamVjdElkKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3QuZ2V0KHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmRldGFpbHMnLCB7IHByb2plY3RJZDogcHJvamVjdElkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5zdXBlcmV4cGVydCcsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScsIHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNyZWF0ZS5kZXRhaWxzJywgeyBwcm9qZWN0SWQ6IHByb2plY3RJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01ha2UgdXAgeW91ciBtaW5kIHlvdSBwZWljZSBvZiBzaGl0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ29Ub1Byb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jcmVhdGUuZGV0YWlscycsIHsgcHJvamVjdElkOiBwcm9qZWN0LmlkIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmNyZWF0ZU5ld1Byb2plY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLm5ld1Byb2plY3RMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCgpLiRzYXZlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZ29Ub1Byb2plY3QocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5uZXdQcm9qZWN0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2F2aW5nIHByb2dyZXNzIG5vdyAhJyk7XG4gICAgICAgICAgICB2YXIgcHJvamVjdCA9IGFuZ3VsYXIuY29weSgkc2NvcGUucHJvamVjdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZigkc2NvcGUucHJvamVjdCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkXG4gICAgICAgICAgICAgICAgfSwgcHJvamVjdCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRGV0YWlsc0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZURldGFpbHNDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGZlYXR1cmVkSW1hZ2U6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRldGFpbHMgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGdlb2dyYXBoeTogJ3doZXJldmVyJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3Byb2plY3QnLCBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHByb2plY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IHN0aWxsIGxvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLiRvbignZmxvdzo6ZmlsZUFkZGVkJywgZnVuY3Rpb24oZXZlbnQsICRmbG93LCBmbG93RmlsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWxlIGFkZGVkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mZWF0dXJlZEltYWdlU3VjY2VzcyA9IGZ1bmN0aW9uKCRmaWxlLCAkbWVzc2FnZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKCRtZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBmaWxlcyA6ICcgKyBtZXNzYWdlLmZpbGUuaWQpO1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3QudGh1bWJuYWlsX2lkID0gbWVzc2FnZS5maWxlLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmF0dGFjaGVkRmlsZXNTdWNjZXNzID0gZnVuY3Rpb24oJGZpbGUsICRtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoJG1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnByb2plY3QuYXR0YWNoZWRGaWxlcy5pbmRleE9mKG1lc3NhZ2UuZmlsZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdC5hdHRhY2hlZEZpbGVzLnB1c2gobWVzc2FnZS5maWxlLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zdWJtaXREcmFmdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2plY3Quc3RhdGUgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZkU2Nyb2xsZXIudG9TZWN0aW9uKCcjcHJvamVjdFN0ZXBzJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVTRUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGh0dHAsICR0aW1lb3V0LCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVTRUN0cmwgU3RhcnRlZCcpO1xuXG4gICAgICAgICRodHRwLmdldCgnL2FwaS9zdXBlci1leHBlcnRzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5zdXBlckV4cGVydHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNob29zZVN1cGVyRXhwZXJ0ID0gZnVuY3Rpb24oc3VwZXJFeHBlcnQpIHtcbiAgICAgICAgICAgICRzY29wZS5wcm9qZWN0LnN1cGVyX2V4cGVydF9pZCA9IHN1cGVyRXhwZXJ0LmlkO1xuICAgICAgICAgICAgJHNjb3BlLnNhdmVQcm9ncmVzcygpO1xuXG4gICAgICAgICAgICBGZFNjcm9sbGVyLnRvU2VjdGlvbignLnN0ZXBzLWNvbnRlbnQnKTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY3JlYXRlLmV4cGVydGlzZScpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ3JlYXRlRXhwZXJ0aXNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVFeHBlcnRpc2VDdHJsIFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0ID0gW107XG4gICAgICAgICRzY29wZS5leHBlcnRpc2VMaXN0ID0gW107XG5cbiAgICAgICAgdmFyIFByb2plY3RFeHBlcnRpc2UgPSAkcmVzb3VyY2UoJy9hcGkvcHJvamVjdHMvOnByb2plY3RJZC9leHBlcnRpc2UnLCB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIERlbW9cbiAgICAgICAgLy8gJHNjb3BlLmV4cGVydGlzZUxpc3QucHVzaCh7XG4gICAgICAgIC8vICAgICBleHBlcnRpc2VDYXRlZ29yeTogJ1RlY2huaWNhbCcsXG4gICAgICAgIC8vICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeTogJ0VsZWN0cm9uaWMnLFxuICAgICAgICAvLyAgICAgZXhwZXJ0aXNlOiAnUENCJyxcbiAgICAgICAgLy8gICAgIG1haW5UYXNrOiAnYXBwbHkgSVAgcHJvdGVjdGlvbiBmb3IgdGhlIFVTIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBGdWdpYXQgbmF0dXMgcXVvZCBlcnJvciwgYXQgaW1wZWRpdCwgZGVsZW5pdGkgdmVybyBkdWNpbXVzIHNlcXVpIGFzcGVyaW9yZXMgb2JjYWVjYXRpLicsXG4gICAgICAgIC8vICAgICBidWRnZXQ6ICd1c2QgMTUwMCcsXG4gICAgICAgIC8vICAgICBsZWFkVGltZTogJzYwIGRheXMgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHByb2plY3QnLFxuICAgICAgICAvLyAgICAgc3RhcnREYXRlOiAnRGVjIDE1LCAyMDE1JyxcbiAgICAgICAgLy8gICAgIGNyZWF0b3I6ICdTdXBlciBFeHBlcnQnXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBQcm9qZWN0RXhwZXJ0aXNlLnF1ZXJ5KHtwcm9qZWN0SWQ6ICRzY29wZS5wcm9qZWN0LmlkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdwcm9qZWN0JywgZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YocHJvamVjdCkgPT09ICd1bmRlZmluZWQnIHx8IHByb2plY3QgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuc2F2ZUV4cGVydGlzZSA9IGZ1bmN0aW9uKGV4cGVydGlzZSl7XG4gICAgICAgICAgICB2YXIgcHJvamVjdEV4cGVydGlzZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2V4cGVydGlzZV9pZCc6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZS5pZCxcbiAgICAgICAgICAgICAgICAndGFzayc6IGV4cGVydGlzZS5tYWluVGFzayxcbiAgICAgICAgICAgICAgICAnYnVkZ2V0JzogZXhwZXJ0aXNlLmJ1ZGdldCxcbiAgICAgICAgICAgICAgICAnbGVhZF90aW1lJzogZXhwZXJ0aXNlLmxlYWRUaW1lLFxuICAgICAgICAgICAgICAgICdzdGFydF9kYXRlJzogZXhwZXJ0aXNlLnN0YXJ0RGF0ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9wcm9qZWN0cy8nICsgJHNjb3BlLnByb2plY3QuaWQgKyAnL2V4cGVydGlzZScsIHByb2plY3RFeHBlcnRpc2VEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBleHBlcnRpc2VDYXRlZ29yeTogZXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkubmFtZSxcbiAgICAgICAgICAgICAgICBleHBlcnRpc2VTdWJDYXRlZ29yeTogZXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkubmFtZSxcbiAgICAgICAgICAgICAgICBleHBlcnRpc2U6IGV4cGVydGlzZS5zZWxlY3RlZEV4cGVydGlzZS5uYW1lLFxuICAgICAgICAgICAgICAgIG1haW5UYXNrOiBleHBlcnRpc2UubWFpblRhc2ssXG4gICAgICAgICAgICAgICAgYnVkZ2V0OiBleHBlcnRpc2UuYnVkZ2V0LFxuICAgICAgICAgICAgICAgIGxlYWRUaW1lOiBleHBlcnRpc2UubGVhZFRpbWUsXG4gICAgICAgICAgICAgICAgc3RhcnREYXRlOiBleHBlcnRpc2Uuc3RhcnREYXRlLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5hZGROZXdJbnB1dHRlZEV4cGVydGlzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dHRlZEV4cGVydGlzZSA9IHsgc2VsZWN0ZWRFeHBlcnRpc2U6ICdudWxsJywgb3RoZXJFeHBlcnRpc2U6IHsgc3RhdHVzOiAxIH0gfTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIDwgMyAmJiAobGFzdElucHV0dGVkRXhwZXJ0aXNlLnNlbGVjdGVkRXhwZXJ0aXNlICE9PSBudWxsICYmIGxhc3RJbnB1dHRlZEV4cGVydGlzZS5vdGhlckV4cGVydGlzZS5zdGF0dXMgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnk6IHsgbmFtZTogJycsIHN0YXR1czogMCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5OiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpblRhc2s6ICcnLFxuICAgICAgICAgICAgICAgICAgICBidWRnZXQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBsZWFkVGltZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5KCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0RXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCwgZXhwZXJ0aXNlQ2F0ZWdvcnksIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkoaW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gZXhwZXJ0aXNlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlTGlzdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZGVzZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGUsIGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VDYXRlZ29yeS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZVN1YkNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5yZW1vdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0geyBuYW1lOiAnJywgc3RhdHVzOiAwIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHsgbmFtZTogJycsIHN0YXR1czogMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2UpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gZXhwZXJ0aXNlO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlID0gbnVsbDtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuXG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7IG5hbWU6ICcnLCBzdGF0dXM6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmV4cGVydGlzZUNhdGVnb3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UtY2F0ZWdvcnkvMCcpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS1jYXRlZ29yeS8nICsgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeS5pZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZUxpc3QgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVFeHBlcnRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlRXhwZXJ0Q3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVCdWRnZXRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlQnVkZ2V0Q3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDcmVhdGVJbnZlc3RvcnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRyZXNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlSW52ZXN0b3JzQ3RybCBTdGFydGVkJyk7XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRXhwZXJ0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4cGVydCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcFxuICAgICAgICBGZFNjcm9sbGVyLnRvVG9wKCk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRm9vdGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGh0dHAsICR0aW1lb3V0LCAkZmlsdGVyKSB7XG4gICAgICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5vbmdvaW5nQ29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ZsYXNoTm90aWNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMgPSB7fTtcblxuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5VmlldyA9IHtcbiAgICAgICAgXHRzaG93OiBmYWxzZSxcbiAgICAgICAgXHRjb250ZXN0SWQ6IDAsXG4gICAgICAgIFx0b25DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdGNvbnNvbGUubG9nKCdvbkNsaWNrJyk7XG4gICAgICAgIFx0XHQkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKCdqdXJ5JywgNSwgdHJ1ZSk7XG4gICAgICAgIFx0fVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSGVhZGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHVpYk1vZGFsKSB7XG5cbiAgICAgICAgJHNjb3BlLnRyaWdnZXJMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcdGNvbnNvbGUubG9nKCd0cmlnZ2VyIGxvZ2luIScpO1xuXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnbG9naW4tbW9kYWwnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR290IGNsb3NlIGZlZWRiYWNrIScpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKCdNb2RhbCBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgXHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnbG9nZ2luZyBpbiBub3cgIScpO1xuICAgIFx0fVxuXG4gICAgXHQkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24oKXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ2F1dGggaW4gbm93ICEnKTtcbiAgICBcdH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgICAgIHZhciBieXRlU3RyaW5nO1xuICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuICAgICAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgICAgIHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgICAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTmF2aWdhdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICRsb2csICR0aW1lb3V0LCAkZmlsdGVyLCAkaHR0cCwgJHJlc291cmNlLCAkdWliTW9kYWwsIEZpbGVVcGxvYWRlcikge1xuXG4gICAgICAgICRzY29wZS5hbGxTa2lsbHMgPSAkcmVzb3VyY2UoJ2FwaS9za2lsbHMnKS5xdWVyeSgpO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc01vZGU6ICd2aWV3JyxcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nc1NhdmU6IC0xXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9maWxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IGFuZ3VsYXIuY29weSgkcm9vdFNjb3BlLnVzZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJEYXRhWydjcmVhdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2ludmVzdG9yJ107XG4gICAgICAgICAgICBkZWxldGUgdXNlckRhdGFbJ2p1ZGdpbmcnXTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmluZycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRhdGEpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMDtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS51c2VyU2V0dGluZ3NTYXZlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzTW9kZSA9ICd2aWV3JztcblxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEudXNlclNldHRpbmdzU2F2ZSA9IC0xO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgdXNlciB0aHVtYm5haWxcbiAgICAgICAgJHNjb3BlLmNoYW5nZVRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL2FwcC9hcHAvaGVhZGVyL3VzZXItdGh1bWJuYWlsLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyVGh1bWJuYWlsQ3RybCcsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci50aHVtYm5haWwgPSBhbmd1bGFyLmNvcHkodGh1bWJuYWlsKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgdXNlciB0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBTdGFydCB1cGxvYWRpbmcgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKHRodW1ibmFpbCkpO1xuICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvZ291dFxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhY3R1YWxseSBsb2dnaW5nIG91dCEgLi4uJyk7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmF1dGgubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3B1bGF0ZSBzaWRlIG5hdmlnYXRpb25cbiAgICAgICAgJHNjb3BlLnBvcHVsYXRlU2lkZU5hdmlnYXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXJzL3NpZGVOYXZpZ2F0aW9uRGF0YScpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5kYXRhLmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNpZGVOYXZpZ2F0aW9uRGF0YSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ3VzZXInLCBmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodXNlcikgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgICAgICRzY29wZS5wb3B1bGF0ZVNpZGVOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5vcGVuRnVsbE1lbnUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nb1RvTGluayA9IGZ1bmN0aW9uKHBhZ2UsIGRhdGEsIHJvbGUpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gMDtcblxuICAgICAgICAgICAgdmFyIHJvbGVzID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLnVzZXJfcm9sZXMsIHtyb2xlOiByb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yocm9sZXMpICE9PSAndW5kZWZpbmVkJyAmJiByb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSByb2xlc1swXTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgdHJ1ZSwgcGFnZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdVc2VyVGh1bWJuYWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHVpYk1vZGFsSW5zdGFuY2Upe1xuICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICRzY29wZS5jcm9wcGVkVGh1bWJuYWlsID0gbnVsbDtcbiAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdvdmVyIGRyYWdsZWF2ZSBkcmFnZW50ZXInLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZHJhZ2xlYXZlJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnNldFRodW1ibmFpbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5jcm9wcGVkVGh1bWJuYWlsKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfVxuICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkcmVzb3VyY2UsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hvbWUgVmlldyBTdGFydGVkJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICBcdGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIFx0JHNjb3BlLmNvbnRlc3RzID0gcmVzdWx0O1xuICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUXVlcnkgRXhwZXJ0aXNlXG5cbiAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2V4cGVydGlzZS8nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAkc2NvcGUuZXhwZXJ0aXNlcyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAkc2NvcGUuaW52ZXN0b3JzID0gW1xuICAgICAgICAgICAge25hbWU6ICdBbGFpbiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYSBldmVuaWV0IGRlc2VydW50IGFkIHBhcmlhdHVyIHByYWVzZW50aXVtLCBpbmNpZHVudCBtb2xlc3RpYWUgYmVhdGFlIHF1YW0gcXVhc2kgcmVpY2llbmRpcyBtb2xsaXRpYSBhY2N1c2FudGl1bSB2b2x1cHRhdGUgcXVhZXJhdCBzZXF1aSBvZmZpY2lhIGEgZmFjZXJlIHJlcGVsbGF0IGFkaXBpc2NpLid9LFxuICAgICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgZGlnbmlzc2ltb3MgbmVtbywgc2VxdWkgZG9sb3JpYnVzIGFjY3VzYW50aXVtLCBvYmNhZWNhdGkgbmF0dXMgaXVyZSBxdWFtIGVzc2UgZXggbGFib3JlIG5lcXVlIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZSBpbiwgbmloaWwgZWEsIGN1bSByZWN1c2FuZGFlIHV0Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaHJpc3RvcGhlIEJyaXNzaWF1ZCcsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnMy5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBsaWNhYm8gZW5pbSBvZmZpY2lhIG9wdGlvIGRvbG9ydW0gaGFydW0sIHNvbHV0YSBjdWxwYSB1bmRlIHZlbmlhbSBub2JpcyBlb3MsIGR1Y2ltdXMgcXVvZCBwcmFlc2VudGl1bSB2ZXJpdGF0aXMgYXRxdWUgbm9uIG5vc3RydW0gaXBzYW0uIE5vc3RydW0sIGV0ISd9LFxuICAgICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUXVpYSByZWN1c2FuZGFlIGFsaXF1aWQgcXVvcyBhcGVyaWFtIG1vbGVzdGlhZSBxdWlidXNkYW0gcXVpIGVvcyBpdXJlIHNhZXBlIG9wdGlvIHZpdGFlIGZ1Z2l0IHVuZGUgbmFtLCBhdHF1ZSBleGNlcHR1cmkgZGVzZXJ1bnQgZXN0LCByZXBlbGxhdCBhbGlhcy4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaW5keSBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9XG4gICAgICAgIF07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignR3JhYlNoYXJlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLk1hdGggPSB3aW5kb3cuTWF0aDtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHByaW1hcnlTaGFyZUxpc3Rpbmc6IG51bGwsXG4gICAgICAgICAgICBzaG93QmlkTm93OiBmYWxzZSxcbiAgICAgICAgICAgIG15QmlkOiB7XG4gICAgICAgICAgICAgICAgYmlkX2Ftb3VudDogMC43MixcbiAgICAgICAgICAgICAgICBudW1fc2hhcmVzOiAxMCxcbiAgICAgICAgICAgICAgICBzYXZpbmc6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wXG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAkc2NvcGUuaW52ZXN0b3JzID0gW1xuICAgICAgICAgICAge25hbWU6ICdBbGFpbiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYSBldmVuaWV0IGRlc2VydW50IGFkIHBhcmlhdHVyIHByYWVzZW50aXVtLCBpbmNpZHVudCBtb2xlc3RpYWUgYmVhdGFlIHF1YW0gcXVhc2kgcmVpY2llbmRpcyBtb2xsaXRpYSBhY2N1c2FudGl1bSB2b2x1cHRhdGUgcXVhZXJhdCBzZXF1aSBvZmZpY2lhIGEgZmFjZXJlIHJlcGVsbGF0IGFkaXBpc2NpLid9LFxuICAgICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgZGlnbmlzc2ltb3MgbmVtbywgc2VxdWkgZG9sb3JpYnVzIGFjY3VzYW50aXVtLCBvYmNhZWNhdGkgbmF0dXMgaXVyZSBxdWFtIGVzc2UgZXggbGFib3JlIG5lcXVlIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZSBpbiwgbmloaWwgZWEsIGN1bSByZWN1c2FuZGFlIHV0Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaHJpc3RvcGhlIEJyaXNzaWF1ZCcsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnMy5qcGcnLCAnYmlvJzogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeHBsaWNhYm8gZW5pbSBvZmZpY2lhIG9wdGlvIGRvbG9ydW0gaGFydW0sIHNvbHV0YSBjdWxwYSB1bmRlIHZlbmlhbSBub2JpcyBlb3MsIGR1Y2ltdXMgcXVvZCBwcmFlc2VudGl1bSB2ZXJpdGF0aXMgYXRxdWUgbm9uIG5vc3RydW0gaXBzYW0uIE5vc3RydW0sIGV0ISd9LFxuICAgICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUXVpYSByZWN1c2FuZGFlIGFsaXF1aWQgcXVvcyBhcGVyaWFtIG1vbGVzdGlhZSBxdWlidXNkYW0gcXVpIGVvcyBpdXJlIHNhZXBlIG9wdGlvIHZpdGFlIGZ1Z2l0IHVuZGUgbmFtLCBhdHF1ZSBleGNlcHR1cmkgZGVzZXJ1bnQgZXN0LCByZXBlbGxhdCBhbGlhcy4nfSxcbiAgICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9LFxuICAgICAgICAgICAge25hbWU6ICdDaW5keSBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJywgJ2Jpbyc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXVyZSBpbnZlbnRvcmUgbmVzY2l1bnQgaWxsdW0sIHBhcmlhdHVyIG1vbGVzdGlhcyBkaWduaXNzaW1vcyBpcHNhIGlzdGUgZXN0LiBTZWQsIGFzc3VtZW5kYSBkb2xvcnVtPyBBYiBibGFuZGl0aWlzIHF1YXNpLCB2b2x1cHRhdGVzIGlzdGUgaXVzdG8gdmVybyBkZXNlcnVudCBzdW50Lid9XG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gR2V0IGFsbCBsaXN0aW5nc1xuICAgICAgICBmdW5jdGlvbiBsb2FkUHJpbWFyeUxpc3RpbmcoKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5wcmltYXJ5U2hhcmVMaXN0aW5nID0gbnVsbDtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3NoYXJlLWxpc3RpbmcvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnByaW1hcnlTaGFyZUxpc3RpbmcgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFByaW1hcnlMaXN0aW5nKCk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1CaWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEubXlCaWQuc2F2aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG15QmlkID0ge1xuICAgICAgICAgICAgICAgICdzaGFyZV9saXN0aW5nX2lkJzogJHNjb3BlLmRhdGEucHJpbWFyeVNoYXJlTGlzdGluZy5pZCxcbiAgICAgICAgICAgICAgICAnYmlkX2Ftb3VudCc6ICRzY29wZS5kYXRhLm15QmlkLmJpZF9hbW91bnQsXG4gICAgICAgICAgICAgICAgJ251bV9zaGFyZXMnOiAkc2NvcGUuZGF0YS5teUJpZC5udW1fc2hhcmVzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3NoYXJlLWJpZHMnLCBteUJpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm15QmlkLnNhdmluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXN1bHQuZXJyb3IpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNob3dCaWROb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFByaW1hcnlMaXN0aW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ludmVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnZlc3QgU3RhcnRlZCcpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3BcbiAgICAgICAgRmRTY3JvbGxlci50b1RvcCgpO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05vdGlmaWNhdGlvbnNDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgRmROb3RpZmljYXRpb25zLmdldExhdGVzdE5vdGlmaWNhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0JHNjb3BlLm5vdGlmaWNhdGlvbnMgPSByZXN1bHQubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQYWdlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCBGZFNjcm9sbGVyKSB7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgIEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgICAgICAkc2NvcGUucGFnZSA9IHtcbiAgICAgICAgXHR0aXRsZTogJycsXG4gICAgICAgIFx0Y29udGVudDogJydcbiAgICAgICAgfTtcblxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcGFnZXMvJyArICRzdGF0ZVBhcmFtcy5zbHVnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcbiAgICAgICAgXHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdCRzY29wZS5wYWdlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXG5cdFx0XHRpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDQnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdsb2FkIDQwNCcpXG5cdFx0XHR9O1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdRdWlja1VwZGF0ZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsIEZkTm90aWZpY2F0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygncXVpY2t1cGRhdGUnKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgXHRlZGl0TW9kZTogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgSW52ZXN0b3IgPSAkcmVzb3VyY2UoJy9hcGkvaW52ZXN0b3JzLzppbnZlc3RvcklkJywge1xuICAgICAgICAgICAgaW52ZXN0b3JJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZWRpdEludmVzdG1lbnQgPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgIFx0JHNjb3BlLmRhdGEuZWRpdE1vZGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5tb2RpZnlJbnZlc3RtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGludmVzdG9yRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaW52ZXN0bWVudF9idWRnZXQnOiAkcm9vdFNjb3BlLnVzZXIuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5lZGl0SW52ZXN0bWVudChmYWxzZSk7XG5cbiAgICAgICAgICAgIEludmVzdG9yLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgaW52ZXN0b3JJZDogJHJvb3RTY29wZS51c2VyLmludmVzdG9yLmlkXG4gICAgICAgICAgICB9LCBpbnZlc3RvckRhdGEpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUcmFuc2FjdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHRpbWVvdXQsIEZkU2Nyb2xsZXIpIHtcblxuICAgIFx0Y29uc29sZS5sb2coJ1RyYW5zYWN0aW9uQ3RybCcpO1xuICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICBcdEZkU2Nyb2xsZXIudG9Ub3AoKTtcblxuICAgIFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgIFx0fSwgMjAwMCk7XG5cbiAgICB9KTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
