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
    angular.module('fundator.controllers', ['ngResource', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'satellizer', 'angularMoment', 'angular-owl-carousel']);
    angular.module('fundator.filters', ['ordinal']);
    angular.module('fundator.services', ['ui.router']);
    angular.module('fundator.directives', []);
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
                        templateUrl: getView('header')
                    },
                    footer: {
                        templateUrl: getView('footer')
                    },
                    notifications: {
                        templateUrl: getView('notifications', 'widget')
                    },
                    quickUpdate: {
                        templateUrl: getView('header', 'quick-update')
                    },
                    main: {}
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'login'),
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('app.register', {
                url: '/register',
                views: {
                    'main@': {
                        templateUrl: getView('auth', 'register'),
                        controller: 'RegisterCtrl'
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

    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.routes').run(["$rootScope", "$state", "$auth", "$timeout", "$http", "$urlRouter", function($rootScope, $state, $auth, $timeout, $http, $urlRouter) {

        $rootScope.$state = $state;
        $rootScope.initialLocationSetup = false;

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
                        console.log('Got tha user!');
                        console.log(result.data);
                    }
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
                return;
            } else {
                if (toState.name.indexOf('login') === -1) {
                    $timeout(function() {
                        $state.go('app.login', {});
                    });
                } else {
                    return;
                }
            }
        });

    }]);

})();

(function(){
    "use strict";

    angular.module('fundator.controllers').controller('AuthCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", function($rootScope, $scope, $state, $auth, $timeout){
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function(){
                $rootScope.appLoaded = true;
            }, 1000);
        });

        if ($auth.isAuthenticated()) {
            $state.go('app.contest', {});
        }

        $scope.login = function() {
            $scope.errorMessage = '';

            var credentials = {
                email: $scope.email,
                password: $scope.password
            };

            $auth.login(credentials).then(function(data) {
                $state.go('app.contest', {}, {reload: true});
            }, function(err){
                console.log(err);
                if (err.statusText === 'Unauthorized') {
                    $scope.errorMessage = 'The email or password you entered is incorrect.'
                }else{
                    $scope.errorMessage = err.statusText;
                }
            });
        };

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

        $scope.logout = function(){
            $auth.logout().then(function() {
                localStorage.removeItem('fundator_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;

                $state.go('app.login', {}, {reload: true});
            });
        }

    }]);

})();

(function(){
    "use strict";

    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", function($rootScope, $scope, $state, $auth, $timeout){

        $scope.form = {
            currentStep: 1,
            totalSteps: 4
        };

        var payload = $auth.getPayload();

        // if (payload.registered != false) {
        //     $state.go('app.contest', {});
        // }

        // $registrationSteps = [
        //     {
        //         id: 1,

        //     }
        // ]

    }]);

})();
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ContestCtrl', ["$rootScope", "$scope", "$state", "$resource", function($rootScope, $scope, $state, $resource) {

        $scope.contests = [];

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result){
            console.log('all courses');
            console.log(result);
            $scope.contests = result;
        });
    }]);

    angular.module('fundator.controllers').controller('ContestSingleCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", function($rootScope, $scope, $state, $stateParams, $resource) {
        $scope.contestId = $stateParams.contestId;

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.get({contestId: $scope.contestId}).$promise.then(function(result){
            console.log('just one course');
            console.log(result);
            $scope.contest = result;
        });

        $scope.entries = [
            'Entry 1',
            'Entry 2',
            'Entry 3',
            'Entry 4',
            'Entry 5',
            'Entry 6'
        ];
    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('InvestCtrl', ["$rootScope", "$scope", "$state", "$resource", "$window", function($rootScope, $scope, $state, $resource, $window) {
        console.log('Invest Started');
        $window.scrollTo(0, 0);

        $scope.investors = [
            {name: 'Alain <br> Amoretti', country: 'France', image: '1.jpg'},
            {name: 'Charles d\'anterroches', country: 'France', image: '2.jpg'},
            {name: 'Christophe Brissiaud', country: 'China', image: '3.jpg'},
            {name: 'Jean-Bernard Antoine', country: 'China', image: '4.jpeg'},
            {name: 'Xavier <br> Paulin', country: 'Taiwan', image: '5.jpg'},
            {name: 'Cindy <br> Chung', country: 'Hong Kong', image: '6.jpg'}
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
(function (){
    "use strict";

    angular.module('fundator.config').config(["$authProvider", function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate';
        $authProvider.tokenPrefix = 'fundator';

        $authProvider.linkedin({
        	clientId: '77zjxfbh2928re',
            url: '/api/authenticate/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: 'http://192.168.10.10/api/authenticate/linkedin',
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            display: 'self'
        });
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
	    template: '<div class="la-ball-pulse"><div></div><div></div><div></div></div>',
	    link: function($scope, $element, $attrs) {
	    	$element.addClass($attrs.class);
	    }
	  };
	});

})();



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiYXBwL2F1dGgvYXV0aC5qcyIsImFwcC9hdXRoL3JlZ2lzdGVyLmpzIiwiYXBwL2NvbnRlc3QvY29udGVzdC5qcyIsImFwcC9pbnZlc3QvaW52ZXN0LmpzIiwiY29uZmlnL2F1dGguanMiLCJkaXJlY3RpdmVzL2xvYWRlci5kaXJlY3RpdmUuanMiLCJhcHAvaG9tZS9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsV0FBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTs7O0lBR0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsYUFBQTtJQUNBLFFBQUEsT0FBQSx3QkFBQSxDQUFBLGNBQUEsYUFBQSxnQkFBQSxhQUFBLGNBQUEsaUJBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBOzs7QUNsQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLGdEQUFBLFNBQUEsZ0JBQUEsb0JBQUE7O1FBRUEsSUFBQSxVQUFBLFNBQUEsVUFBQSxlQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLGFBQUE7Z0JBQ0EsZ0JBQUE7OztZQUdBLE9BQUEscUJBQUEsV0FBQSxNQUFBLGdCQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLGVBQUE7d0JBQ0EsYUFBQSxRQUFBLGlCQUFBOztvQkFFQSxhQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBOztvQkFFQSxNQUFBOzs7YUFHQSxNQUFBLGFBQUE7Z0JBQ0Es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LGFBQUEsSUFBQSxDQUFBLFFBQUE7Ozs7Ozs7O0FDNUNBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHdFQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsT0FBQSxTQUFBOztRQUVBLE9BQUEsT0FBQTtZQUNBLGFBQUE7WUFDQSxZQUFBOzs7UUFHQSxJQUFBLFVBQUEsTUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLCtEQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsV0FBQTs7UUFFQSxPQUFBLFdBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsNEJBQUE7WUFDQSxXQUFBOzs7UUFHQSxRQUFBLFFBQUEsU0FBQSxLQUFBLFNBQUEsT0FBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLE9BQUEsV0FBQTs7OztJQUlBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHFGQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBO1FBQ0EsT0FBQSxZQUFBLGFBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsNEJBQUE7WUFDQSxXQUFBOzs7UUFHQSxRQUFBLElBQUEsQ0FBQSxXQUFBLE9BQUEsWUFBQSxTQUFBLEtBQUEsU0FBQSxPQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsT0FBQSxVQUFBOzs7UUFHQSxPQUFBLFVBQUE7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7Ozs7OztBQ3JDQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx5RUFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLFdBQUEsU0FBQTtRQUNBLFFBQUEsSUFBQTtRQUNBLFFBQUEsU0FBQSxHQUFBOztRQUVBLE9BQUEsWUFBQTtZQUNBLENBQUEsTUFBQSx1QkFBQSxTQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSwwQkFBQSxTQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSx3QkFBQSxTQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSx3QkFBQSxTQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSxzQkFBQSxTQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSxvQkFBQSxTQUFBLGFBQUEsT0FBQTs7OztJQUlBLFFBQUEsT0FBQSx1QkFBQSxPQUFBLGVBQUEsQ0FBQSxRQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxLQUFBLFlBQUE7Ozs7SUFJQSxRQUFBLE9BQUE7O0tBRUEsVUFBQSxXQUFBLFdBQUE7UUFDQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLFVBQUE7WUFDQSxZQUFBO1lBQ0EsT0FBQTtnQkFDQSxNQUFBOztZQUVBLE1BQUEsU0FBQSxRQUFBLFVBQUEsUUFBQTs7Z0JBRUEsT0FBQSxRQUFBLE9BQUE7Z0JBQ0EsT0FBQSxTQUFBLE9BQUE7OztnQkFHQSxTQUFBLEtBQUEsVUFBQSxNQUFBLE9BQUE7Z0JBQ0EsU0FBQSxLQUFBLFVBQUEsT0FBQSxPQUFBOztnQkFFQSxJQUFBLFdBQUEsQ0FBQTtvQkFDQSxPQUFBO29CQUNBLE9BQUE7b0JBQ0EsV0FBQTtvQkFDQSxPQUFBO21CQUNBO29CQUNBLE9BQUE7b0JBQ0EsT0FBQTtvQkFDQSxXQUFBO29CQUNBLE9BQUE7OztnQkFHQSxJQUFBLFlBQUE7b0JBQ0EsUUFBQSxDQUFBLFdBQUEsWUFBQSxTQUFBLFNBQUEsT0FBQSxRQUFBLFFBQUEsVUFBQSxhQUFBLFdBQUEsWUFBQTtvQkFDQSxVQUFBO3dCQUNBOzRCQUNBLE9BQUE7NEJBQ0EsV0FBQTs0QkFDQSxhQUFBOzRCQUNBLFlBQUE7NEJBQ0Esa0JBQUE7NEJBQ0Esb0JBQUE7NEJBQ0Esc0JBQUE7NEJBQ0EsTUFBQSxDQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTs7d0JBRUE7NEJBQ0EsT0FBQTs0QkFDQSxXQUFBOzRCQUNBLGFBQUE7NEJBQ0EsWUFBQTs0QkFDQSxrQkFBQTs0QkFDQSxvQkFBQTs0QkFDQSxzQkFBQTs0QkFDQSxNQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBOzs7OztnQkFLQSxHQUFBLE9BQUEsU0FBQSxJQUFBO29CQUNBLElBQUEsTUFBQSxTQUFBLEtBQUEsVUFBQSxHQUFBLFdBQUE7O29CQUVBLElBQUEsVUFBQSxJQUFBLE1BQUEsS0FBQSxJQUFBLFVBQUE7d0JBQ0Esb0JBQUE7d0JBQ0EsaUJBQUE7OztvQkFHQSxTQUFBLEtBQUEsVUFBQSxNQUFBO29CQUNBLE9BQUEsVUFBQSxLQUFBLFNBQUEsR0FBQSxVQUFBO3dCQUNBLFNBQUEsS0FBQSw4QkFBQSxRQUFBLCtEQUFBLFNBQUEsTUFBQSxjQUFBLFNBQUEsTUFBQSxLQUFBLFNBQUEsTUFBQTs7cUJBRUE7b0JBQ0EsSUFBQSxNQUFBLFNBQUEsS0FBQSxVQUFBLEdBQUEsV0FBQTs7b0JBRUEsSUFBQSxVQUFBLElBQUEsTUFBQSxLQUFBLEtBQUEsV0FBQTt3QkFDQSxvQkFBQTt3QkFDQSxpQkFBQTs7O29CQUdBLFNBQUEsS0FBQSxVQUFBLE1BQUE7b0JBQ0EsU0FBQSxLQUFBLCtCQUFBLFFBQUE7b0JBQ0EsU0FBQSxLQUFBLCtCQUFBLFFBQUE7Ozs7Ozs7QUN0R0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLHlCQUFBLFVBQUEsY0FBQTs7O1FBR0EsY0FBQSxXQUFBO1FBQ0EsY0FBQSxjQUFBOztRQUVBLGNBQUEsU0FBQTtTQUNBLFVBQUE7WUFDQSxLQUFBO1lBQ0EsdUJBQUE7WUFDQSxhQUFBO1lBQ0EsbUJBQUEsQ0FBQTtZQUNBLE9BQUEsQ0FBQTtZQUNBLGdCQUFBO1lBQ0EsT0FBQTtZQUNBLE1BQUE7WUFDQSxTQUFBOzs7Ozs7QUNuQkEsQ0FBQSxXQUFBO0lBQ0E7O0NBRUEsUUFBQSxPQUFBOztFQUVBLFVBQUEsWUFBQSxXQUFBO0dBQ0EsT0FBQTtJQUNBLE9BQUE7S0FDQSxTQUFBOztLQUVBLFVBQUE7S0FDQSxVQUFBO0tBQ0EsTUFBQSxTQUFBLFFBQUEsVUFBQSxRQUFBO01BQ0EsU0FBQSxTQUFBLE9BQUE7Ozs7Ozs7O0FDYkEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZnVuZGF0b3IgPSBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3InLFxuICAgICAgICBbXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbmZpZydcbiAgICAgICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnLCBbJ25nUmVzb3VyY2UnLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplcicsICdhbmd1bGFyTW9tZW50JywgJ2FuZ3VsYXItb3dsLWNhcm91c2VsJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJywgWydvcmRpbmFsJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2NvbnRlc3QnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ25vdGlmaWNhdGlvbnMnLCAnd2lkZ2V0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tVcGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAncXVpY2stdXBkYXRlJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnJlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jb250ZXN0c2luZ2xlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0Lzpjb250ZXN0SWQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdFNpbmdsZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JhYnNoYXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ncmFiLWEtc2hhcmUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnZlc3QnLCAnZ3JhYi1hLXNoYXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSW52ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ub3RpZmljYXRpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gVXNlclNlcnZpY2UgaXMgYW4gZXhhbXBsZSBzZXJ2aWNlIGZvciBtYW5hZ2luZyB1c2VyIHN0YXRlXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50ICR1cmxSb3V0ZXIncyBkZWZhdWx0IGhhbmRsZXIgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmRcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdXNlciBvYmplY3QgYW5kIHRhc2tzXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXI/dG9rZW49JyArICRhdXRoLmdldFRva2VuKCkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dvdCB0aGEgdXNlciEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0b1N0YXRlLm5hbWUuaW5kZXhPZignbG9naW4nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5sb2dpbicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQXV0aEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0KXtcbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnJztcblxuICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzVGV4dCA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICdUaGUgZW1haWwgb3IgcGFzc3dvcmQgeW91IGVudGVyZWQgaXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IGVyci5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgJGF1dGguYXV0aGVudGljYXRlKHByb3ZpZGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0KXtcblxuICAgICAgICAkc2NvcGUuZm9ybSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiAxLFxuICAgICAgICAgICAgdG90YWxTdGVwczogNFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgIC8vIGlmIChwYXlsb2FkLnJlZ2lzdGVyZWQgIT0gZmFsc2UpIHtcbiAgICAgICAgLy8gICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7fSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAkcmVnaXN0cmF0aW9uU3RlcHMgPSBbXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgaWQ6IDEsXG5cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gXVxuXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlKSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbGwgY291cnNlcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0U2luZ2xlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSkge1xuICAgICAgICAkc2NvcGUuY29udGVzdElkID0gJHN0YXRlUGFyYW1zLmNvbnRlc3RJZDtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LmdldCh7Y29udGVzdElkOiAkc2NvcGUuY29udGVzdElkfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2p1c3Qgb25lIGNvdXJzZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0ID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZW50cmllcyA9IFtcbiAgICAgICAgICAgICdFbnRyeSAxJyxcbiAgICAgICAgICAgICdFbnRyeSAyJyxcbiAgICAgICAgICAgICdFbnRyeSAzJyxcbiAgICAgICAgICAgICdFbnRyeSA0JyxcbiAgICAgICAgICAgICdFbnRyeSA1JyxcbiAgICAgICAgICAgICdFbnRyeSA2J1xuICAgICAgICBdO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICR3aW5kb3cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICAgICAgJHNjb3BlLmludmVzdG9ycyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnQWxhaW4gPGJyPiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2hyaXN0b3BoZSBCcmlzc2lhdWQnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzMuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIDxicj4gUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2luZHkgPGJyPiBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJ31cbiAgICAgICAgXTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZmlsdGVyKCd0cnVzdGVkSHRtbCcsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuICAgICAgICB9O1xuICAgIH1dKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uICgpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoJGF1dGhQcm92aWRlcil7XG4gICAgICAgIC8vIFNhdGVsbGl6ZXIgY29uZmlndXJhdGlvbiB0aGF0IHNwZWNpZmllcyB3aGljaCBBUElcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cbiAgICAgICAgJGF1dGhQcm92aWRlci5sb2dpblVybCA9ICcvYXBpL2F1dGhlbnRpY2F0ZSc7XG4gICAgICAgICRhdXRoUHJvdmlkZXIudG9rZW5QcmVmaXggPSAnZnVuZGF0b3InO1xuXG4gICAgICAgICRhdXRoUHJvdmlkZXIubGlua2VkaW4oe1xuICAgICAgICBcdGNsaWVudElkOiAnNzd6anhmYmgyOTI4cmUnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICByZWRpcmVjdFVyaTogJ2h0dHA6Ly8xOTIuMTY4LjEwLjEwL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc3RhdGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdzZWxmJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cblx0LmRpcmVjdGl2ZSgnZmRMb2FkZXInLCBmdW5jdGlvbigpIHtcblx0ICByZXR1cm4ge1xuXHQgIFx0c2NvcGU6IHtcblx0ICBcdFx0dmlld0JveDogJ0AnXG5cdCAgXHR9LFxuXHQgICAgcmVzdHJpY3Q6ICdFJyxcblx0ICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImxhLWJhbGwtcHVsc2VcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nLFxuXHQgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdCAgICBcdCRlbGVtZW50LmFkZENsYXNzKCRhdHRycy5jbGFzcyk7XG5cdCAgICB9XG5cdCAgfTtcblx0fSk7XG5cbn0pKCk7XG5cbiIsIiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
