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
    angular.module('fundator.controllers', ['ngResource', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'satellizer', 'angularMoment', 'angular-owl-carousel', 'ngImgCrop', 'angularFileUpload']);
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

        $urlRouterProvider.otherwise('/user/contest');

        $stateProvider
            .state('app', {
                url: '/:role',
                abstract: true,
                views: {
                    header: {
                        templateUrl: getView('header')
                    },
                    navigation: {
                        templateUrl: getView('header', 'navigation')
                    },
                    flashNotice: {
                        templateUrl: getView('header', 'flash-notice'),
                        controller: 'FlashNoticeCtrl'
                    },
                    footer: {
                        templateUrl: getView('footer')
                    },
                    notifications: {
                        templateUrl: getView('notifications', 'widget')
                    },
                    quickUpdate: {
                        templateUrl: function(stateParams){
                            switch(stateParams.role){
                                case 'jury': return getView('quick-update', 'quick-update-jury');
                                case 'investor': return getView('quick-update', 'quick-update-investor');
                                case 'expert': return getView('quick-update', 'quick-update-expert');
                                default : return getView('quick-update', 'quick-update');
                            }
                            return getView('quick-update', 'quick-update');
                        }
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
                        templateUrl: function(stateParams){
                            switch(stateParams.role){
                                case 'jury': return getView('contest', 'contest-single-jury');
                                default : return getView('contest', 'contest-single');
                            }
                            return getView('contest', 'contest-single');
                        },
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

    angular.module('fundator.routes').run(["$rootScope", "$state", "$stateParams", "$auth", "$timeout", "$http", "$urlRouter", function($rootScope, $state, $stateParams, $auth, $timeout, $http, $urlRouter) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.initialLocationSetup = false;

        $rootScope.appLoading = true;
        $rootScope.isNavShown = false;

        $rootScope.toggleNavigation = function () {
            $rootScope.isNavShown ? $rootScope.isNavShown = false : $rootScope.isNavShown = true;
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
                    $state.go('app.register');
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

                        if ($rootScope.user.registered == 0) {
                            $state.go('app.register');
                        }else{
                            $state.go('app.contestsingle', {role: 'jury', contestId: 4});
                        }
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
            // if ($rootScope.user.registered == 0 && toState.name.indexOf('register') !== -1) {
            //     $state.go('app.register');
            // } else
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


(function(){
    "use strict";

    angular.module('fundator.controllers').controller('AuthCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", function($rootScope, $scope, $state, $auth, $timeout){
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function(){
                $rootScope.appLoaded = true;
            }, 1000);
        });

        $rootScope.$broadcast('stopLoading');

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

    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "FileUploader", function($rootScope, $scope, $state, $auth, $timeout, $http, FileUploader) {

        $scope.form = {
            currentStep: 1,
            totalSteps: 4
        };

        $scope.totalSteps = {
            creator: 3,
            expert: 3,
            investor: 4
        };

        $scope.countries = ['India', 'China', 'USA', 'UK'];

        $scope.contactTimes = [
            {name: 'Working hours (9am to 6 pm)', value: '9-6'},
            {name: 'Evening time (6am to 9 pm)', value: '6-9'}
        ];

        $scope.data = {
            selectedRole: '',
            ageGate: 'yes',
            countryOrigin: 'China',
            countryResidence: 'China',
            contactTime: ''
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

        $scope.data = {
            croppedThumbnail: null,
            email: ''
        };

        $rootScope.$watch('user', function(user){
            if (typeof(user) === 'undefined') return;
            if (user.registered == 1) $state.go('app.contest');

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


        $scope.submitDetails = function(){
            console.log('Submit details');
            console.log($scope.data);

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

            $http.put('/api/users/' + $rootScope.user.id, userData).then(function(result){
                if (result.data === 'Updated') {
                    $rootScope.user.registered = 1;
                    $state.go('app.contest');
                }
            }, function(result){
                console.log('error');
                console.log(result);
            });
        }

    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ContestCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", function($rootScope, $scope, $state, $stateParams, $resource, $timeout) {

        console.log('contest state param');
        console.log($stateParams);

        $scope.contests = [];
        $rootScope.$broadcast('startLoading');

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.contests = result;
        }).finally(function() {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
            }, 1000);
        });
    }]);

    angular.module('fundator.controllers').controller('ContestSingleCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$filter", "$window", "$timeout", function($rootScope, $scope, $state, $stateParams, $resource, $filter, $window, $timeout) {
        $scope.contestId = $stateParams.contestId;
        $scope.data = {
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
            judgeEntries: {
                method: 'GET',
                url: '/api/entries/judge/:judgeId',
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

        $window.scrollTo(0, 0);
        $rootScope.$broadcast('startLoading');

        Contest.get({
            contestId: $scope.contestId
        }).$promise.then(function(result) {
            $scope.contest = result;

            var judgeable = $filter('filter')($rootScope.user.judging, {
                id: $scope.contestId
            });

            if (typeof(judgeable) !== 'undefined') {
                if (judgeable.length > 0 && $stateParams.role !== 'jury') {
                    $rootScope.flashNotices.juryView.show = true;
                    $rootScope.flashNotices.juryView.contestId = result.id;

                    $rootScope.flashNotices.juryView.onClick = function() {
                        $state.go('app.contestsingle', {
                            role: 'jury',
                            contestId: result.id
                        });
                    };
                } else if($stateParams.role === 'jury') {
                    Entry.judgeEntries({
                        judgeId: $rootScope.user.id
                    }).$promise.then(function(result){
                        $scope.contest.entries = angular.copy(result);
                    });
                }
            }

        }).finally(function() {
            $timeout(function() {
                $rootScope.$broadcast('stopLoading');
            }, 1000);
        });

        $scope.selectEntry = function(entry) {
            $scope.data.selectedEntry = entry;
            var rating = angular.copy($scope.data.selectedEntry.rating);

            Entry.get({
                entryId: entry.id
            }).$promise.then(function(result) {
                $scope.data.selectedEntry = result;
                $scope.data.selectedEntry.rating = rating;
            });
        };

        $scope.sendMessage = function(){
            console.log('sending message');
            console.log($scope.data.messageToSend);

            var messageRequest = {
                message: $scope.data.messageToSend
            };

            Entry.sendMessage({entryId: $scope.data.selectedEntry.id}, messageRequest, function(result){
                $scope.data.selectedEntry.messages.push(result.message);
                $scope.data.messageToSend = '';
            });
        };

        $scope.saveMarks = function(entryRatingId){
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
                    }
                });

            }else{
                var entryRating = new EntryRating(updatedRating);
                entryRating.$save().then(function(result){
                    if (result !== 'error') {
                        console.log('entry rating created!');
                    }
                });
            }

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
        	onClick: function(){}
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJkaXJlY3RpdmVzL2xvYWRlci5kaXJlY3RpdmUuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaW52ZXN0L2ludmVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLFdBQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7OztJQUdBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGFBQUE7SUFDQSxRQUFBLE9BQUEsd0JBQUEsQ0FBQSxjQUFBLGFBQUEsZ0JBQUEsYUFBQSxjQUFBLGlCQUFBLHdCQUFBLGFBQUE7SUFDQSxRQUFBLE9BQUEsb0JBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxxQkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLHVCQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBOzs7QUNsQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLGdEQUFBLFNBQUEsZ0JBQUEsb0JBQUE7O1FBRUEsSUFBQSxVQUFBLFNBQUEsVUFBQSxlQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLGFBQUE7Z0JBQ0EsZ0JBQUE7OztZQUdBLE9BQUEscUJBQUEsV0FBQSxNQUFBLGdCQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxPQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxZQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBOztvQkFFQSxhQUFBO3dCQUNBLGFBQUEsUUFBQSxVQUFBO3dCQUNBLFlBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFB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QkFBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLDhCQUFBLE9BQUE7OztRQUdBLE9BQUEsT0FBQTtZQUNBLGNBQUE7WUFDQSxTQUFBO1lBQ0EsZUFBQTtZQUNBLGtCQUFBO1lBQ0EsYUFBQTs7O1FBR0EsSUFBQSxVQUFBLE1BQUE7O1FBRUEsV0FBQSxXQUFBOztRQUVBLE9BQUEsYUFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGFBQUEsT0FBQSxXQUFBLE9BQUEsS0FBQTs7O1FBR0EsT0FBQSxjQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsSUFBQSxDQUFBLE9BQUEsS0FBQSxjQUFBLE9BQUEsS0FBQSxjQUFBLEtBQUE7OztRQUdBLE9BQUEsc0JBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxLQUFBLENBQUEsS0FBQSxPQUFBLEtBQUEsY0FBQSxPQUFBLEtBQUEsZUFBQSxNQUFBOzs7UUFHQSxPQUFBLFlBQUE7UUFDQSxPQUFBLG1CQUFBO1FBQ0EsT0FBQSxXQUFBO1FBQ0EsT0FBQSxhQUFBOztRQUVBLE9BQUEsT0FBQTtZQUNBLGtCQUFBO1lBQ0EsT0FBQTs7O1FBR0EsV0FBQSxPQUFBLFFBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLFVBQUEsYUFBQTtZQUNBLElBQUEsS0FBQSxjQUFBLEdBQUEsT0FBQSxHQUFBOztZQUVBLE9BQUEsS0FBQSxRQUFBLEtBQUE7V0FDQTs7UUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQTtZQUNBLElBQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7WUFHQSxJQUFBLElBQUEsY0FBQSxjQUFBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO21CQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsTUFBQTs7O1lBR0EsSUFBQSxTQUFBLElBQUE7O1lBRUEsSUFBQSxLQUFBLEtBQUEsUUFBQSxZQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLE9BQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUE7bUJB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QUEsT0FBQSx3QkFBQSxXQUFBLCtGQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsY0FBQSxXQUFBLFVBQUE7UUFDQSxXQUFBLGVBQUE7O1FBRUEsV0FBQSxhQUFBLFdBQUE7U0FDQSxNQUFBO1NBQ0EsV0FBQTtTQUNBLFNBQUEsVUFBQTs7Ozs7OztBQ1RBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLHlFQUFBLFNBQUEsWUFBQSxRQUFBLFFBQUEsV0FBQSxTQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsUUFBQSxTQUFBLEdBQUE7O1FBRUEsT0FBQSxZQUFBO1lBQ0EsQ0FBQSxNQUFBLHVCQUFBLFNBQUEsVUFBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLDBCQUFBLFNBQUEsVUFBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLHdCQUFBLFNBQUEsU0FBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLHdCQUFBLFNBQUEsU0FBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLHNCQUFBLFNBQUEsVUFBQSxPQUFBO1lBQ0EsQ0FBQSxNQUFBLG9CQUFBLFNBQUEsYUFBQSxPQUFBOzs7O0lBSUEsUUFBQSxPQUFBLHVCQUFBLE9BQUEsZUFBQSxDQUFBLFFBQUEsU0FBQSxNQUFBO1FBQ0EsT0FBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLEtBQUEsWUFBQTs7OztJQUlBLFFBQUEsT0FBQTs7S0FFQSxVQUFBLFdBQUEsV0FBQTtRQUNBLE9BQUE7WUFDQSxVQUFBO1lBQ0EsVUFBQTtZQUNBLFlBQUE7WUFDQSxPQUFBO2dCQUNBLE1BQUE7O1lBRUEsTUFBQSxTQUFBLFFBQUEsVUFBQSxRQUFBOztnQkFFQSxPQUFBLFFBQUEsT0FBQTtnQkFDQSxPQUFBLFNBQUEsT0FBQTs7O2dCQUdBLFNBQUEsS0FBQSxVQUFBLE1BQUEsT0FBQTtnQkFDQSxTQUFBLEtBQUEsVUFBQSxPQUFBLE9BQUE7O2dCQUVBLElBQUEsV0FBQSxDQUFBO29CQUNBLE9BQUE7b0JBQ0EsT0FBQTtvQkFDQSxXQUFBO29CQUNBLE9BQUE7bUJBQ0E7b0JBQ0EsT0FBQTtvQkFDQSxPQUFBO29CQUNBLFdBQUE7b0JBQ0EsT0FBQTs7O2dCQUdBLElBQUEsWUFBQTtvQkFDQSxRQUFBLENBQUEsV0FBQSxZQUFBLFNBQUEsU0FBQSxPQUFBLFFBQUEsUUFBQSxVQUFBLGFBQUEsV0FBQSxZQUFBO29CQUNBLFVBQUE7d0JBQ0E7NEJBQ0EsT0FBQTs0QkFDQSxXQUFBOzRCQUNBLGFBQUE7NEJBQ0EsWUFBQTs0QkFDQSxrQkFBQTs0QkFDQSxvQkFBQTs0QkFDQSxzQkFBQTs0QkFDQSxNQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBOzt3QkFFQTs0QkFDQSxPQUFBOzRCQUNBLFdBQUE7NEJBQ0EsYUFBQTs0QkFDQSxZQUFBOzRCQUNBLGtCQUFBOzRCQUNBLG9CQUFBOzRCQUNBLHNCQUFBOzRCQUNBLE1BQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7Ozs7O2dCQUtBLEdBQUEsT0FBQSxTQUFBLElBQUE7b0JBQ0EsSUFBQSxNQUFBLFNBQUEsS0FBQSxVQUFBLEdBQUEsV0FBQTs7b0JBRUEsSUFBQSxVQUFBLElBQUEsTUFBQSxLQUFBLElBQUEsVUFBQTt3QkFDQSxvQkFBQTt3QkFDQSxpQkFBQTs7O29CQUdBLFNBQUEsS0FBQSxVQUFBLE1BQUE7b0JBQ0EsT0FBQSxVQUFBLEtBQUEsU0FBQSxHQUFBLFVBQUE7d0JBQ0EsU0FBQSxLQUFBLDhCQUFBLFFBQUEsK0RBQUEsU0FBQSxNQUFBLGNBQUEsU0FBQSxNQUFBLEtBQUEsU0FBQSxNQUFBOztxQkFFQTtvQkFDQSxJQUFBLE1BQUEsU0FBQSxLQUFBLFVBQUEsR0FBQSxXQUFBOztvQkFFQSxJQUFBLFVBQUEsSUFBQSxNQUFBLEtBQUEsS0FBQSxXQUFBO3dCQUNBLG9CQUFBO3dCQUNBLGlCQUFBOzs7b0JBR0EsU0FBQSxLQUFBLFVBQUEsTUFBQTtvQkFDQSxTQUFBLEtBQUEsK0JBQUEsUUFBQTtvQkFDQSxTQUFBLEtBQUEsK0JBQUEsUUFBQTs7Ozs7O0tBTUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZnVuZGF0b3IgPSBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3InLFxuICAgICAgICBbXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbmZpZydcbiAgICAgICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnLCBbJ25nUmVzb3VyY2UnLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5yb3V0ZXInLCAnc2F0ZWxsaXplcicsICdhbmd1bGFyTW9tZW50JywgJ2FuZ3VsYXItb3dsLWNhcm91c2VsJywgJ25nSW1nQ3JvcCcsICdhbmd1bGFyRmlsZVVwbG9hZCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZmlsdGVycycsIFsnb3JkaW5hbCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iuc2VydmljZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIHNlY29uZGFyeU5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kYXJ5TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlOYW1lID0gdmlld05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAnLi92aWV3cy9hcHAvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHNlY29uZGFyeU5hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy91c2VyL2NvbnRlc3QnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLzpyb2xlJyxcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ25hdmlnYXRpb24nKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmbGFzaE5vdGljZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICdmbGFzaC1ub3RpY2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGbGFzaE5vdGljZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdub3RpZmljYXRpb25zJywgJ3dpZGdldCcpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHF1aWNrVXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24oc3RhdGVQYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChzdGF0ZVBhcmFtcy5yb2xlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnanVyeSc6IHJldHVybiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWp1cnknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW52ZXN0b3InOiByZXR1cm4gZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1pbnZlc3RvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdleHBlcnQnOiByZXR1cm4gZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1leHBlcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6IHJldHVybiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmxvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAnbG9naW4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ3JlZ2lzdGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdHNpbmdsZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdC86Y29udGVzdElkJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24oc3RhdGVQYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChzdGF0ZVBhcmFtcy5yb2xlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnanVyeSc6IHJldHVybiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlLWp1cnknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6IHJldHVybiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmdyYWJzaGFyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZ3JhYi1hLXNoYXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG4gICAgICAgICRyb290U2NvcGUuaW5pdGlhbExvY2F0aW9uU2V0dXAgPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSB0cnVlO1xuICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLnRvZ2dsZU5hdmlnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPyAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZSA6ICRyb290U2NvcGUuaXNOYXZTaG93biA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3N0YXJ0TG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RvcExvYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAucmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVzZXJTZXJ2aWNlIGlzIGFuIGV4YW1wbGUgc2VydmljZSBmb3IgbWFuYWdpbmcgdXNlciBzdGF0ZVxuICAgICAgICAgICAgaWYgKHR5cGVvZigkcm9vdFNjb3BlLnVzZXIpICE9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuaW5pdGlhbExvY2F0aW9uU2V0dXAgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gUHJldmVudCAkdXJsUm91dGVyJ3MgZGVmYXVsdCBoYW5kbGVyIGZyb20gZmlyaW5nXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQgYW5kXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHVzZXIgb2JqZWN0IGFuZCB0YXNrc1xuICAgICAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS91c2VyP3Rva2VuPScgKyAkYXV0aC5nZXRUb2tlbigpKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3VsdC5lcnJvcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdHNpbmdsZScsIHtyb2xlOiAnanVyeScsIGNvbnRlc3RJZDogNH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIuc3luYygpO1xuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXIubGlzdGVuKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuICAgICAgICAgICAgLy8gaWYgKCRyb290U2NvcGUudXNlci5yZWdpc3RlcmVkID09IDAgJiYgdG9TdGF0ZS5uYW1lLmluZGV4T2YoJ3JlZ2lzdGVyJykgIT09IC0xKSB7XG4gICAgICAgICAgICAvLyAgICAgJHN0YXRlLmdvKCdhcHAucmVnaXN0ZXInKTtcbiAgICAgICAgICAgIC8vIH0gZWxzZVxuICAgICAgICAgICAgaWYgKCRhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodG9TdGF0ZS5uYW1lLmluZGV4T2YoJ2xvZ2luJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAubG9naW4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcbiAgICAgICAgLy8gU2F0ZWxsaXplciBjb25maWd1cmF0aW9uIHRoYXQgc3BlY2lmaWVzIHdoaWNoIEFQSVxuICAgICAgICAvLyByb3V0ZSB0aGUgSldUIHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvYXV0aGVudGljYXRlJztcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc3RhdGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdzZWxmJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cblx0LmRpcmVjdGl2ZSgnZmRMb2FkZXInLCBmdW5jdGlvbigpIHtcblx0ICByZXR1cm4ge1xuXHQgIFx0c2NvcGU6IHtcblx0ICBcdFx0dmlld0JveDogJ0AnXG5cdCAgXHR9LFxuXHQgICAgcmVzdHJpY3Q6ICdFJyxcblx0ICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImZkLWxvYWRlciBsYS1iYWxsLXB1bHNlXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyxcblx0ICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHQgICAgXHQkZWxlbWVudC5hZGRDbGFzcygkYXR0cnMuY2xhc3MpO1xuXHQgICAgfVxuXHQgIH07XG5cdH0pO1xuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCl7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXNUZXh0ID09PSAnVW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1RoZSBlbWFpbCBvciBwYXNzd29yZCB5b3UgZW50ZXJlZCBpcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YVVSSSk7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgRmlsZVVwbG9hZGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmZvcm0gPSB7XG4gICAgICAgICAgICBjdXJyZW50U3RlcDogMSxcbiAgICAgICAgICAgIHRvdGFsU3RlcHM6IDRcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG90YWxTdGVwcyA9IHtcbiAgICAgICAgICAgIGNyZWF0b3I6IDMsXG4gICAgICAgICAgICBleHBlcnQ6IDMsXG4gICAgICAgICAgICBpbnZlc3RvcjogNFxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jb3VudHJpZXMgPSBbJ0luZGlhJywgJ0NoaW5hJywgJ1VTQScsICdVSyddO1xuXG4gICAgICAgICRzY29wZS5jb250YWN0VGltZXMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dvcmtpbmcgaG91cnMgKDlhbSB0byA2IHBtKScsIHZhbHVlOiAnOS02J30sXG4gICAgICAgICAgICB7bmFtZTogJ0V2ZW5pbmcgdGltZSAoNmFtIHRvIDkgcG0pJywgdmFsdWU6ICc2LTknfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRSb2xlOiAnJyxcbiAgICAgICAgICAgIGFnZUdhdGU6ICd5ZXMnLFxuICAgICAgICAgICAgY291bnRyeU9yaWdpbjogJ0NoaW5hJyxcbiAgICAgICAgICAgIGNvdW50cnlSZXNpZGVuY2U6ICdDaGluYScsXG4gICAgICAgICAgICBjb250YWN0VGltZTogJydcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcGF5bG9hZCA9ICRhdXRoLmdldFBheWxvYWQoKTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG5cbiAgICAgICAgJHNjb3BlLmNoYW5nZVJvbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLnRvdGFsU3RlcHMgPSAkc2NvcGUudG90YWxTdGVwc1skc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4oKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykgKiAxMDAsIDk2KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5nZXRQcm9ncmVzc0ludmVydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoKCgxIC0gKCRzY29wZS5mb3JtLmN1cnJlbnRTdGVwIC8gJHNjb3BlLmZvcm0udG90YWxTdGVwcykpICogMTAwKSwgNCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmNyb3BwZWRUaHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuZmlsZU5hbWUgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIGNyb3BwZWRUaHVtYm5haWw6IG51bGwsXG4gICAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgndXNlcicsIGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYgKHR5cGVvZih1c2VyKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh1c2VyLnJlZ2lzdGVyZWQgPT0gMSkgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHZhciBoYW5kbGVGaWxlU2VsZWN0ID0gZnVuY3Rpb24oZXZ0LCBkcm9wKSB7XG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZXZ0Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZXZ0LmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1hZ2VFcnJvciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5maWxlTmFtZSA9IGZpbGUubmFtZTtcblxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRodW1ibmFpbCA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ292ZXIgZHJhZ2xlYXZlIGRyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdlbnRlcicsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnbGVhdmUnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRyb3BhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcjZmlsZUlucHV0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsZVNlbGVjdChlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcm9wJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvZmlsZXMnLFxuICAgICAgICAgICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNvbmZpcm1JbWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSAkc2NvcGUuZGF0YS5jcm9wcGVkVGh1bWJuYWlsO1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsZS5uYW1lID0gJ3RodW1ibmFpbF8nICsgJHJvb3RTY29wZS51c2VyLmlkICsgJy5wbmcnO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7YXR0YWNoOiAndGh1bWJuYWlsJ30pO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9ybURhdGEucHVzaCh7dXNlcl9pZDogJHJvb3RTY29wZS51c2VyLmlkfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5pbWFnZVN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnVwbG9hZGVyLm9uU3VjY2Vzc0l0ZW0gPSBmdW5jdGlvbihmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzcG9uc2UuZmlsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9ICdZb3VyIHByb2ZpbGUgcGljdHVyZSB3YXMgc3VjY2Vzc2Z1bGx5IHVwbG9hZGVkISc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlRXJyb3IgPSAnUHJvZmlsZSBwaWN0dXJlIGZhaWxlZCB0byB1cGxvYWQsIHBsZWFzZSB0cnkgYWdhaW4hJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIuYWRkVG9RdWV1ZShkYXRhVVJJdG9CbG9iKGltYWdlKSk7XG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIudXBsb2FkQWxsKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgICRzY29wZS5zdWJtaXREZXRhaWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtaXQgZGV0YWlscycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRhdGEpO1xuXG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLmRhdGEuZm5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkc2NvcGUuZGF0YS5sbmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUsXG4gICAgICAgICAgICAgICAgYWdlX2dhdGU6ICRzY29wZS5kYXRhLmFnZUdhdGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9vcmlnaW46ICRzY29wZS5kYXRhLmNvdW50cnlPcmlnaW4sXG4gICAgICAgICAgICAgICAgY291bnRyeV9yZXNpZGVuY2U6ICRzY29wZS5kYXRhLmNvdW50cnlSZXNpZGVuY2UsXG4gICAgICAgICAgICAgICAgY29udGFjdF9udW1iZXI6ICRzY29wZS5kYXRhLmNvbnRhY3ROdW1iZXIsXG4gICAgICAgICAgICAgICAgY29udGFjdF90aW1lOiAkc2NvcGUuZGF0YS5jb250YWN0VGltZS52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlc3Qgc3RhdGUgcGFyYW0nKTtcbiAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcblxuICAgICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0NvbnRlc3RTaW5nbGVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkZmlsdGVyLCAkd2luZG93LCAkdGltZW91dCkge1xuICAgICAgICAkc2NvcGUuY29udGVzdElkID0gJHN0YXRlUGFyYW1zLmNvbnRlc3RJZDtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZEVudHJ5OiBudWxsLFxuICAgICAgICAgICAgcmF0aW5nOiB7XG4gICAgICAgICAgICAgICAgZGVzaWduOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAnJyxcbiAgICAgICAgICAgICAgICBpbmR1c3RyaWFsOiAnJyxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIEVudHJ5ID0gJHJlc291cmNlKCcvYXBpL2VudHJpZXMvOmVudHJ5SWQnLCB7XG4gICAgICAgICAgICBlbnRyeUlkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBqdWRnZUVudHJpZXM6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZW50cmllcy9qdWRnZS86anVkZ2VJZCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzLzplbnRyeUlkL21lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnlSYXRpbmcgPSAkcmVzb3VyY2UoJy9hcGkvZW50cnktcmF0aW5ncy86ZW50cnlSYXRpbmdJZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgQ29udGVzdC5nZXQoe1xuICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkXG4gICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgdmFyIGp1ZGdlYWJsZSA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5qdWRnaW5nLCB7XG4gICAgICAgICAgICAgICAgaWQ6ICRzY29wZS5jb250ZXN0SWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGp1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGp1ZGdlYWJsZS5sZW5ndGggPiAwICYmICRzdGF0ZVBhcmFtcy5yb2xlICE9PSAnanVyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LmNvbnRlc3RJZCA9IHJlc3VsdC5pZDtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5vbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0c2luZ2xlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICdqdXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IHJlc3VsdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCRzdGF0ZVBhcmFtcy5yb2xlID09PSAnanVyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgRW50cnkuanVkZ2VFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlSWQ6ICRyb290U2NvcGUudXNlci5pZFxuICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zZWxlY3RFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICB2YXIgcmF0aW5nID0gYW5ndWxhci5jb3B5KCRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nKTtcblxuICAgICAgICAgICAgRW50cnkuZ2V0KHtcbiAgICAgICAgICAgICAgICBlbnRyeUlkOiBlbnRyeS5pZFxuICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nID0gcmF0aW5nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIG1lc3NhZ2UnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQpO1xuXG4gICAgICAgICAgICB2YXIgbWVzc2FnZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRW50cnkuc2VuZE1lc3NhZ2Uoe2VudHJ5SWQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWR9LCBtZXNzYWdlUmVxdWVzdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5Lm1lc3NhZ2VzLnB1c2gocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zYXZlTWFya3MgPSBmdW5jdGlvbihlbnRyeVJhdGluZ0lkKXtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkUmF0aW5nID0ge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuZGVzaWduLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmNyZWF0aXZpdHksXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuaW5kdXN0cmlhbCxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLm1hcmtldCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuanVkZ2VfaWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmVudHJ5X2lkID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihlbnRyeVJhdGluZ0lkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBFbnRyeVJhdGluZy51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiBlbnRyeVJhdGluZ0lkXG4gICAgICAgICAgICAgICAgfSwgdXBkYXRlZFJhdGluZykuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIHNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeVJhdGluZyA9IG5ldyBFbnRyeVJhdGluZyh1cGRhdGVkUmF0aW5nKTtcbiAgICAgICAgICAgICAgICBlbnRyeVJhdGluZy4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBjcmVhdGVkIScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRmxhc2hOb3RpY2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcyA9IHt9O1xuXG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3ID0ge1xuICAgICAgICBcdHNob3c6IGZhbHNlLFxuICAgICAgICBcdGNvbnRlc3RJZDogMCxcbiAgICAgICAgXHRvbkNsaWNrOiBmdW5jdGlvbigpe31cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ludmVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkd2luZG93KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnZlc3QgU3RhcnRlZCcpO1xuICAgICAgICAkd2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIDxicj4gQW1vcmV0dGknLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcxLmpwZyd9LFxuICAgICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZyd9LFxuICAgICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ1hhdmllciA8YnI+IFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IDxicj4gQ2h1bmcnLCBjb3VudHJ5OiAnSG9uZyBLb25nJywgaW1hZ2U6ICc2LmpwZyd9XG4gICAgICAgIF07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cbiAgICAuZGlyZWN0aXZlKCdmZENoYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjYW52YXMgaWQ9XCJmZENoYXJ0XCIgd2lkdGg9XCJ7e3dpZHRofX1cIiBoZWlnaHQ9XCJ7e2hlaWdodH19XCI+PC9jYW52YXM+JyxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS53aWR0aCA9ICRhdHRycy53aWR0aDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGVpZ2h0ID0gJGF0dHJzLmhlaWdodDtcblxuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykud2lkdGgoJGF0dHJzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5oZWlnaHQoJGF0dHJzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGllRGF0YUEgPSBbe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzAyNzUzZlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdWJsaWNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDk2LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjOTRjNDRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjOGNiYTQ3XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZ1bmRhdG9yXCJcbiAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lRGF0YUEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGxhbm5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDYwLCA1OSwgNjMsIDU5LCA1OCwgNjMsIDY0LCA2NSwgNjYsIDcwLCA3OV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVhbGl6ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCAyMiwgMTYsIDIxLCAxNywgMjAsIDI3LCAyNSwgMjMsIDMyLCA0MCwgNDVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYoJGF0dHJzLmRhdGEgPT09ICdBJyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKHBpZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHBpZURhdGFBKS5lYWNoKGZ1bmN0aW9uKGksIHRoZV9pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLnBpZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyt0aGVfaXRlbS5jb2xvcisnO1wiPjwvc3Bhbj4gJyt0aGVfaXRlbS52YWx1ZSsnJSAnK3RoZV9pdGVtLmxhYmVsKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuTGluZShsaW5lRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzAwNjgzNztcIj48L3NwYW4+IFJlYWxpemVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM5M0M2NTg7XCI+PC9zcGFuPiBQbGFubmVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
