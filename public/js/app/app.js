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
    angular.module('fundator.directives', ['dibari.angular-ellipsis']);
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
                        templateUrl: getView('footer')
                    },
                    notifications: {
                        templateUrl: getView('notifications', 'widget')
                    },
                    quickUpdate: {
                        templateUrl: getView('quick-update', 'quick-update')
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
            .state('app.home', {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: getView('home'),
                        controller: 'HomeCtrl'
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
            .state('app.page', {
                url: '/:slug',
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

    angular.module('fundator.routes').run(["$rootScope", "$state", "$stateParams", "$auth", "$timeout", "$http", "$urlRouter", "$filter", function($rootScope, $state, $stateParams, $auth, $timeout, $http, $urlRouter, $filter) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.initialLocationSetup = false;

        $rootScope.activeRole = '';
        $rootScope.activeState = null;
        $rootScope.activeStateParams = null;

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
                            var roles = $filter('filter')($rootScope.user.user_roles, {role: $rootScope.user.role}, true);

                            if (typeof(roles) !== 'undefined' && roles.length > 0) {
                                var role = roles[0];
                                $rootScope.switchUserRole(role.role, role.id, true);
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
                if (typeof($rootScope.user) === 'undefined') {
                    $rootScope.activeState = toState;
                    $rootScope.activeStateParams = toParams;
                    event.preventDefault();
                }
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

        var getView = function(viewName, secondaryName) {
            if (typeof secondaryName === 'undefined') {
                secondaryName = viewName;
            }

            return './views/app/app/' + viewName + '/' + secondaryName + '.html';
        };

        // Switch User Role

        $rootScope.switchUserRole = function(role, roleId, reload) {
            $rootScope.activeRole = role;

            if (typeof($rootScope.user) !== 'undefined') {
                if ($rootScope.user.user_roles.length === 0) {
                    $rootScope.user.user_roles.push({
                        id: null,
                        name: role,
                        role: null
                    });
                }
            }

            var userRoleViews = [{
                route: 'app',
                view: 'quickUpdate',
                roles: {
                    creator: getView('quick-update', 'quick-update-creator'),
                    investor: getView('quick-update', 'quick-update-investor'),
                    jury: getView('quick-update', 'quick-update-jury'),
                },
                defaultTemplate: getView('quick-update')
            }, {
                route: 'app.contestsingle',
                view: 'main@',
                roles: {
                    jury: getView('contest-single', 'contest-single-jury'),
                },
                defaultTemplate: getView('contest', 'contest-single')
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

            $http.get(model).then(function(result){
                $rootScope.user[role] = result.data;

                if ($state.current.name === '') {
                    $state.current.name = $rootScope.activeState.name;
                    $state.current.params = $rootScope.activeStateParams;
                }

                $state.go($state.current.name, $state.current.params, {reload: reload});
            });
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

    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "$window", "FileUploader", function($rootScope, $scope, $state, $auth, $timeout, $http, $window, FileUploader) {

        $scope.form = {
            currentStep: 1,
            totalSteps: 4
        };

        $scope.totalSteps = {
            creator: 3,
            expert: 3,
            investor: 4
        };

        $scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'S Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People\'S Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'RWANDA', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

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
            }

            $rootScope.$broadcast('startLoading');
            $window.scrollTo(0, 0);

            $http.put('/api/users/' + $rootScope.user.id, userData).then(function(result){
                if (result.data === 'Updated') {
                    $rootScope.user.name = $scope.data.fname;
                    $rootScope.user.last_name = $scope.data.lname;
                    $rootScope.user.role = $scope.data.selectedRole;
                    $rootScope.user.registered = 1;

                    $state.go('app.contest', {role: angular.copy($scope.data.selectedRole)});
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

    angular.module('fundator.controllers').controller('ContestCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", function($rootScope, $scope, $state, $stateParams, $resource, $timeout) {

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
                        contestId: $scope.contestId,
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

                $timeout(function(){
                    $('.chatbox').animate({scrollTop: 10000});
                }, 100);
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
                    }
                });

            }else{
                var entryRating = new EntryRating(updatedRating);
                entryRating.$save().then(function(result){
                    if (result !== 'error') {
                        console.log('entry rating created!');
                        $scope.data.savingMarks = false;
                        $scope.data.savedMarks = true;
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

    angular.module('fundator.controllers').controller('HeaderCtrl', ["$rootScope", "$scope", "$state", "$auth", function($rootScope, $scope, $state, $auth) {



    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('NavigationCtrl', ["$rootScope", "$scope", "$state", "$auth", function($rootScope, $scope, $state, $auth) {

        // Logout
        $scope.logout = function(){
            console.log('actually logging out! ...');
            $auth.logout().then(function() {
                localStorage.removeItem('fundator_token');
                $rootScope.authenticated = false;
                $rootScope.user = undefined;
                $rootScope.isNavShown = false;

                $state.go('app.login', {}, {reload: true});
            });
        }
    }]);

})();

(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$window", function($rootScope, $scope, $state, $stateParams, $http, $window) {
        console.log('Home View Started');

        // Redirect to contest
        $state.go('app.contest');
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
(function() {
    "use strict";

    angular.module('fundator.controllers').controller('PageCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$window", function($rootScope, $scope, $state, $stateParams, $http, $window) {
        console.log('Page View Started');

        $scope.page = {
        	title: '',
        	content: ''
        };

        $rootScope.$broadcast('startLoading');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJkaXJlY3RpdmVzL2xvYWRlci5kaXJlY3RpdmUuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9ob21lL2hvbWUuanMiLCJhcHAvaW52ZXN0L2ludmVzdC5qcyIsImFwcC9wYWdlL3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGdCQUFBLGFBQUEsY0FBQSxpQkFBQSx3QkFBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLG9CQUFBLENBQUE7SUFDQSxRQUFBLE9BQUEscUJBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSx1QkFBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBOzs7QUNsQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLGdEQUFBLFNBQUEsZ0JBQUEsb0JBQUE7O1FBRUEsSUFBQSxVQUFBLFNBQUEsVUFBQSxlQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLGFBQUE7Z0JBQ0EsZ0JBQUE7OztZQUdBLE9BQUEscUJBQUEsV0FBQSxNQUFBLGdCQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFBOztvQkFF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QTs7O1FBR0EsSUFBQSxVQUFBLE1BQUE7O1FBRUEsV0FBQSxXQUFBOztRQUVBLE9BQUEsYUFBQSxXQUFBO1lBQ0EsT0FBQSxLQUFBLGFBQUEsT0FBQSxXQUFBLE9BQUEsS0FBQTs7O1FBR0EsT0FBQSxjQUFBLFdBQUE7WUFDQSxPQUFBLEtBQUEsSUFBQSxDQUFBLE9BQUEsS0FBQSxjQUFBLE9BQUEsS0FBQSxjQUFBLEtBQUE7OztRQUdBLE9BQUEsc0JBQUEsV0FBQTtZQUNBLE9BQUEsS0FBQSxLQUFBLENBQUEsS0FBQSxPQUFBLEtBQUEsY0FBQSxPQUFBLEtBQUEsZUFBQSxNQUFBOzs7UUFHQSxPQUFBLFlBQUE7UUFDQSxPQUFBLG1CQUFBO1FBQ0EsT0FBQSxXQUFBO1FBQ0EsT0FBQSxhQUFBOztRQUVBLE9BQUEsT0FBQTtZQUNBLGtCQUFBO1lBQ0EsT0FBQTs7O1FBR0EsV0FBQSxPQUFBLFFBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLFVBQUEsYUFBQTtZQUNBLElBQUEsS0FBQSxjQUFBLEdBQUEsT0FBQSxHQUFBOztZQUVBLE9BQUEsS0FBQSxRQUFBLEtBQUE7V0FDQTs7UUFFQSxJQUFBLG1CQUFBLFNBQUEsS0FBQSxNQUFBO1lBQ0EsSUFBQTtZQUNBLElBQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7WUFHQSxJQUFBLElBQUEsY0FBQSxjQUFBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsYUFBQSxNQUFBO21CQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLGNBQUEsTUFBQTs7O1lBR0EsSUFBQSxTQUFBLElBQUE7O1lBRUEsSUFBQSxLQUFBLEtBQUEsUUFBQSxZQUFBLENBQUEsR0FBQTtnQkFDQSxPQUFBLE9BQUEsU0FBQSxRQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUE7bUJBQ0E7Z0JBQ0EsT0FBQSxhQUFBOzs7WUFHQSxPQUFBLFdBQUEsS0FBQTs7WUFFQSxPQUFBLFNBQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsT0FBQSxTQUFBLFFBQUE7b0JBQ0EsUUFBQSxJQUFBLElBQUEsT0FBQTtvQkFDQSxPQUFBLFlBQUEsSUFBQSxPQUFBOzs7O1lBSUEsSUFBQSxNQUFBO2dCQUNBLE9BQUEsY0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGdDQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOzs7UUFHQSxFQUFBLFVBQUEsR0FBQSxhQUFBLG9CQUFBLFNBQUEsT0FBQTtZQUNBLE1BQUE7WUFDQSxNQUFBOztZQUVBLE9BQUEsT0FBQSxXQUFBO2dCQUNBLE9BQUEsV0FBQTs7OztRQUlBLEVBQUEsVUFBQSxHQUFBLGFBQUEsb0JBQUEsU0FBQSxPQUFBO1lBQ0EsTUFBQTtZQUNBLE1BQUE7O1lBRUEsT0FBQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7O1FBSUEsRUFBQSxVQUFBLEdBQUEsVUFBQSxjQUFBLFNBQUEsR0FBQTtZQUNBLGlCQUFBLEdBQUE7OztRQUdBLEVBQUEsVUFBQSxHQUFBLFFBQUEsb0JBQUEsU0FBQSxHQUFBO1lBQ0EsaUJBQUEsR0FBQTs7O1FBR0EsT0FBQSxXQUFBLElBQUEsYUFBQTtZQUNBLEtBQUE7WUFDQSxtQkFBQTs7O1FBR0EsT0FBQSxlQUFBLFVBQUE7WUFDQSxJQUFBLFFBQUEsT0FBQSxLQUFBOztZQUVBLE9BQUEsU0FBQSxxQkFBQSxTQUFBLE1BQUE7Z0JBQ0EsS0FBQSxLQUFBLE9BQUEsZUFBQSxXQUFBLEtBQUEsS0FBQTs7Z0JBRUEsS0FBQSxXQUFBO2dCQUNBLEtBQUEsU0FBQSxLQUFBLENBQUEsUUFBQTtnQkFDQSxLQUFBLFNBQUEsS0FBQSxDQUFBLFNBQUEsV0FBQSxLQUFBOztnQkFFQSxPQUFBLEtBQUEsZUFBQTs7O1lBR0EsT0FBQSxTQUFBLGdCQUFBLFNBQUEsVUFBQSxVQUFBLFFBQUEsU0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxVQUFBLGFBQUE7b0JBQ0EsT0FBQSxLQUFBLGVBQUE7cUJBQ0E7b0JBQ0EsT0FBQSxLQUFBLGFBQUE7Ozs7WUFJQSxPQUFBLFNBQUEsV0FBQSxjQUFBO1lBQ0EsT0FBQSxTQUFBOzs7O1FBSUEsT0FBQSxnQkFBQSxVQUFBO1lBQ0EsSUFBQSxXQUFBO2dCQUNBLE1BQUEsT0FBQSxLQUFBO2dCQUNBLFdBQUEsT0FBQSxLQUFBO2dCQUNBLE1BQUEsT0FBQSxLQUFBO2dCQUNBLFVBQUEsT0FBQSxLQUFBO2dCQUNBLGdCQUFBLE9BQUEsS0FBQTtnQkFDQSxtQkFBQSxPQUFBLEtBQUE7Z0JBQ0EsZ0JBQUEsT0FBQSxLQUFBO2dCQUNBLGNBQUEsT0FBQSxLQUFBLFlBQUE7OztZQUdBLE9BQUEsT0FBQSxLQUFBO2dCQUNBLEtBQUE7b0JBQ0EsSUFBQSxtQkFBQSxPQUFBLEtBQUE7O29CQUVBLElBQUEscUJBQUEsU0FBQTt3QkFDQSxtQkFBQSxPQUFBLEtBQUE7O29CQUVBLFNBQUEsV0FBQTtvQkFDQSxTQUFBLFNBQUEsb0JBQUE7b0JBQ0EsU0FBQSxTQUFBLGtCQUFBLE9BQUEsS0FBQTtvQkFDQSxTQUFBLFNBQUEsb0JBQUEsT0FBQSxLQUFBO2dCQUNBO2dCQUNBLEtBQUE7b0JBQ0EsU0FBQSxVQUFBO2dCQUNBOzs7WUFHQSxXQUFBLFdBQUE7WUFDQSxRQUFBLFNBQUEsR0FBQTs7WUFFQSxNQUFBLElBQUEsZ0JBQUEsV0FBQSxLQUFBLElBQUEsVUFBQSxLQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE9BQUEsU0FBQSxXQUFBO29CQUNBLFdBQUEsS0FBQSxPQUFBLE9BQUEsS0FBQTtvQkFDQSxXQUFBLEtBQUEsWUFBQSxPQUFBLEtBQUE7b0JBQ0EsV0FBQSxLQUFBLE9BQUEsT0FBQSxLQUFBO29CQUNBLFdBQUEsS0FBQSxhQUFBOztvQkFFQSxPQUFBLEdBQUEsZUFBQSxDQUFBLE1BQUEsUUFBQSxLQUFBLE9BQUEsS0FBQTs7ZUFFQSxTQUFBLE9BQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQTtlQUNBLFFBQUEsVUFBQTtnQkFDQSxXQUFBLFdBQUE7Ozs7Ozs7O0FDdk9BLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSx3QkFBQSxXQUFBLDJGQUFBLFNB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Ozs7Ozs7O0FDSEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsOERBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBOzs7UUFHQSxPQUFBLFNBQUEsVUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLE1BQUEsU0FBQSxLQUFBLFdBQUE7Z0JBQ0EsYUFBQSxXQUFBO2dCQUNBLFdBQUEsZ0JBQUE7Z0JBQ0EsV0FBQSxPQUFBO2dCQUNBLFdBQUEsYUFBQTs7Z0JBRUEsT0FBQSxHQUFBLGFBQUEsSUFBQSxDQUFBLFFBQUE7Ozs7Ozs7QUNkQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSxtRkFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxTQUFBO1FBQ0EsUUFBQSxJQUFBOzs7UUFHQSxPQUFBLEdBQUE7Ozs7QUNQQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0JBQUEsV0FBQSx5RUFBQSxTQUFBLFlBQUEsUUFBQSxRQUFBLFdBQUEsU0FBQTtRQUNBLFFBQUEsSUFBQTtRQUNBLFFBQUEsU0FBQSxHQUFBOztRQUVBLE9BQUEsWUFBQTtZQUNBLENBQUEsTUFBQSx1QkFBQSxTQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSwwQkFBQSxTQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSx3QkFBQSxTQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSx3QkFBQSxTQUFBLFNBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSxzQkFBQSxTQUFBLFVBQUEsT0FBQTtZQUNBLENBQUEsTUFBQSxvQkFBQSxTQUFBLGFBQUEsT0FBQTs7OztJQUlBLFFBQUEsT0FBQSx1QkFBQSxPQUFBLGVBQUEsQ0FBQSxRQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsU0FBQSxNQUFBO1lBQ0EsT0FBQSxLQUFBLFlBQUE7Ozs7SUFJQSxRQUFBLE9BQUE7O0tBRUEsVUFBQSxXQUFBLFdBQUE7UUFDQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLFVBQUE7WUFDQSxZQUFBO1lBQ0EsT0FBQTtnQkFDQSxNQUFBOztZQUVBLE1BQUEsU0FBQSxRQUFBLFVBQUEsUUFBQTs7Z0JBRUEsT0FBQSxRQUFBLE9BQUE7Z0JBQ0EsT0FBQSxTQUFBLE9BQUE7OztnQkFHQSxTQUFBLEtBQUEsVUFBQSxNQUFBLE9BQUE7Z0JBQ0EsU0FBQSxLQUFBLFVBQUEsT0FBQSxPQUFBOztnQkFFQSxJQUFBLFdBQUEsQ0FBQTtvQkFDQSxPQUFBO29CQUNBLE9BQUE7b0JBQ0EsV0FBQTtvQkFDQSxPQUFBO21CQUNBO29CQUNBLE9BQUE7b0JBQ0EsT0FBQTtvQkFDQSxXQUFBO29CQUNBLE9BQUE7OztnQkFHQSxJQUFBLFlBQUE7b0JBQ0EsUUFBQSxDQUFBLFdBQUEsWUFBQSxTQUFBLFNBQUEsT0FBQSxRQUFBLFFBQUEsVUFBQSxhQUFBLFdBQUEsWUFBQTtvQkFDQSxVQUFBO3dCQUNBOzRCQUNBLE9BQUE7NEJBQ0EsV0FBQTs0QkFDQSxhQUFBOzRCQUNBLFlBQUE7NEJBQ0Esa0JBQUE7NEJBQ0Esb0JBQUE7NEJBQ0Esc0JBQUE7NEJBQ0EsTUFBQSxDQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTs7d0JBRUE7NEJBQ0EsT0FBQTs0QkFDQSxXQUFBOzRCQUNBLGFBQUE7NEJBQ0EsWUFBQTs0QkFDQSxrQkFBQTs0QkFDQSxvQkFBQTs0QkFDQSxzQkFBQTs0QkFDQSxNQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBOzs7OztnQkFLQSxHQUFBLE9BQUEsU0FBQSxJQUFBO29CQUNBLElBQUEsTUFBQSxTQUFBLEtBQUEsVUFBQSxHQUFBLFdBQUE7O29CQUVBLElBQUEsVUFBQSxJQUFBLE1BQUEsS0FBQSxJQUFBLFVBQUE7d0JBQ0Esb0JBQUE7d0JBQ0EsaUJBQUE7OztvQkFHQSxTQUFBLEtBQUEsVUFBQSxNQUFBO29CQUNBLE9BQUEsVUFBQSxLQUFBLFNBQUEsR0FBQSxVQUFBO3dCQUNBLFNBQUEsS0FBQSw4QkFBQSxRQUFBLCtEQUFBLFNBQUEsTUFBQSxjQUFBLFNBQUEsTUFBQSxLQUFBLFNBQUEsTUFBQTs7cUJBRUE7b0JBQ0EsSUFBQSxNQUFBLFNBQUEsS0FBQSxVQUFBLEdBQUEsV0FBQTs7b0JBRUEsSUFBQSxVQUFBLElBQUEsTUFBQSxLQUFBLEtBQUEsV0FBQTt3QkFDQSxvQkFBQTt3QkFDQSxpQkFBQTs7O29CQUdBLFNBQUEsS0FBQSxVQUFBLE1BQUE7b0JBQ0EsU0FBQSxLQUFBLCtCQUFBLFFBQUE7b0JBQ0EsU0FBQSxLQUFBLCtCQUFBLFFBQUE7Ozs7Ozs7QUN0R0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsbUZBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxjQUFBLE9BQUEsU0FBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxPQUFBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsU0FBQTs7O1FBR0EsV0FBQSxXQUFBO1FBQ0EsTUFBQSxJQUFBLGdCQUFBLGFBQUEsTUFBQSxLQUFBLFNBQUEsT0FBQTtTQUNBLFFBQUEsSUFBQTtTQUNBLFFBQUEsSUFBQTtTQUNBLE9BQUEsT0FBQSxPQUFBO1dBQ0EsU0FBQSxNQUFBO0dBQ0EsUUFBQSxJQUFBO0dBQ0EsUUFBQSxJQUFBOztHQUVBLElBQUEsTUFBQSxVQUFBLE9BQUE7SUFDQSxRQUFBLElBQUE7SUFDQTtXQUNBLFFBQUEsVUFBQTtTQUNBLFdBQUEsV0FBQTs7OztLQUlBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGZ1bmRhdG9yID0gYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5maWx0ZXJzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5zZXJ2aWNlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iucm91dGVzJyxcbiAgICAgICAgICAgICdmdW5kYXRvci5jb25maWcnXG4gICAgICAgIF0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycsIFsndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJywgWyduZ1Jlc291cmNlJywgJ25nQW5pbWF0ZScsICd1aS5ib290c3RyYXAnLCAndWkucm91dGVyJywgJ3NhdGVsbGl6ZXInLCAnYW5ndWxhck1vbWVudCcsICdhbmd1bGFyLW93bC1jYXJvdXNlbCcsICduZ0ltZ0Nyb3AnLCAnYW5ndWxhckZpbGVVcGxvYWQnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmZpbHRlcnMnLCBbJ29yZGluYWwnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnNlcnZpY2VzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLCBbJ2RpYmFyaS5hbmd1bGFyLWVsbGlwc2lzJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgc2Vjb25kYXJ5TmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmRhcnlOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeU5hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgc2Vjb25kYXJ5TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2NvbnRlc3QnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicsICduYXZpZ2F0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTmF2aWdhdGlvbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZsYXNoTm90aWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ2ZsYXNoLW5vdGljZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZsYXNoTm90aWNlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ25vdGlmaWNhdGlvbnMnLCAnd2lkZ2V0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tVcGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdsb2dpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnJlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2F1dGgnLCAncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaG9tZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbnRlc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbnRlc3QnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdHNpbmdsZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdC86Y29udGVzdElkJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcsICdjb250ZXN0LXNpbmdsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RTaW5nbGVDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmdyYWJzaGFyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZ3JhYi1hLXNoYXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW52ZXN0JywgJ2dyYWItYS1zaGFyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ludmVzdEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAubm90aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5wYWdlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy86c2x1ZycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3BhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRhdXRoLCAkdGltZW91dCwgJGh0dHAsICR1cmxSb3V0ZXIsICRmaWx0ZXIpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG4gICAgICAgICRyb290U2NvcGUuaW5pdGlhbExvY2F0aW9uU2V0dXAgPSBmYWxzZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSAnJztcbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZSA9IG51bGw7XG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGVQYXJhbXMgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUudG9nZ2xlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA/ICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlIDogJHJvb3RTY29wZS5pc05hdlNob3duID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignc3RhcnRMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdG9wTG9hZGluZycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlclNlcnZpY2UgaXMgYW4gZXhhbXBsZSBzZXJ2aWNlIGZvciBtYW5hZ2luZyB1c2VyIHN0YXRlXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50ICR1cmxSb3V0ZXIncyBkZWZhdWx0IGhhbmRsZXIgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmRcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdXNlciBvYmplY3QgYW5kIHRhc2tzXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXI/dG9rZW49JyArICRhdXRoLmdldFRva2VuKCkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLnJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICRyb290U2NvcGUudXNlci5yb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdsb2dpbicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmxvZ2luJywge30pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSByb2xlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclJvbGVWaWV3cyA9IFt7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdxdWlja1VwZGF0ZScsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGludmVzdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWludmVzdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdxdWljay11cGRhdGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3RzaW5nbGUnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdC1zaW5nbGUnLCAnY29udGVzdC1zaW5nbGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9ICcvYXBpL2NyZWF0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6IG1vZGVsID0gJy9hcGkvaW52ZXN0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAuZ2V0KG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3JvbGVdID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQubmFtZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQucGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJHN0YXRlLmN1cnJlbnQubmFtZSwgJHN0YXRlLmN1cnJlbnQucGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcbiAgICAgICAgLy8gU2F0ZWxsaXplciBjb25maWd1cmF0aW9uIHRoYXQgc3BlY2lmaWVzIHdoaWNoIEFQSVxuICAgICAgICAvLyByb3V0ZSB0aGUgSldUIHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvYXV0aGVudGljYXRlJztcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc3RhdGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdzZWxmJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cblx0LmRpcmVjdGl2ZSgnZmRMb2FkZXInLCBmdW5jdGlvbigpIHtcblx0ICByZXR1cm4ge1xuXHQgIFx0c2NvcGU6IHtcblx0ICBcdFx0dmlld0JveDogJ0AnXG5cdCAgXHR9LFxuXHQgICAgcmVzdHJpY3Q6ICdFJyxcblx0ICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImZkLWxvYWRlciBsYS1iYWxsLXB1bHNlXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyxcblx0ICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHQgICAgXHQkZWxlbWVudC5hZGRDbGFzcygkYXR0cnMuY2xhc3MpO1xuXHQgICAgfVxuXHQgIH07XG5cdH0pO1xuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCl7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXNUZXh0ID09PSAnVW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gJ1RoZSBlbWFpbCBvciBwYXNzd29yZCB5b3UgZW50ZXJlZCBpcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gZXJyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZnVuZGF0b3JfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5sb2dpbicsIHt9LCB7cmVsb2FkOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YVVSSSk7XG4gICAgICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgIGlmIChkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMClcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gICAgICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOm1pbWVTdHJpbmd9KTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHdpbmRvdywgRmlsZVVwbG9hZGVyKSB7XG5cbiAgICAgICAgJHNjb3BlLmZvcm0gPSB7XG4gICAgICAgICAgICBjdXJyZW50U3RlcDogMSxcbiAgICAgICAgICAgIHRvdGFsU3RlcHM6IDRcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG90YWxTdGVwcyA9IHtcbiAgICAgICAgICAgIGNyZWF0b3I6IDMsXG4gICAgICAgICAgICBleHBlcnQ6IDMsXG4gICAgICAgICAgICBpbnZlc3RvcjogNFxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jb3VudHJpZXMgPSBbJ0FmZ2hhbmlzdGFuJywgJ8OFbGFuZCBJc2xhbmRzJywgJ0FsYmFuaWEnLCAnQWxnZXJpYScsICdBbWVyaWNhbiBTYW1vYScsICdBbmRvcnJBJywgJ0FuZ29sYScsICdBbmd1aWxsYScsICdBbnRhcmN0aWNhJywgJ0FudGlndWEgYW5kIEJhcmJ1ZGEnLCAnQXJnZW50aW5hJywgJ0FybWVuaWEnLCAnQXJ1YmEnLCAnQXVzdHJhbGlhJywgJ0F1c3RyaWEnLCAnQXplcmJhaWphbicsICdCYWhhbWFzJywgJ0JhaHJhaW4nLCAnQmFuZ2xhZGVzaCcsICdCYXJiYWRvcycsICdCZWxhcnVzJywgJ0JlbGdpdW0nLCAnQmVsaXplJywgJ0JlbmluJywgJ0Jlcm11ZGEnLCAnQmh1dGFuJywgJ0JvbGl2aWEnLCAnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYScsICdCb3Rzd2FuYScsICdCb3V2ZXQgSXNsYW5kJywgJ0JyYXppbCcsICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknLCAnQnJ1bmVpIERhcnVzc2FsYW0nLCAnQnVsZ2FyaWEnLCAnQnVya2luYSBGYXNvJywgJ0J1cnVuZGknLCAnQ2FtYm9kaWEnLCAnQ2FtZXJvb24nLCAnQ2FuYWRhJywgJ0NhcGUgVmVyZGUnLCAnQ2F5bWFuIElzbGFuZHMnLCAnQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJywgJ0NoYWQnLCAnQ2hpbGUnLCAnQ2hpbmEnLCAnQ2hyaXN0bWFzIElzbGFuZCcsICdDb2NvcyAoS2VlbGluZykgSXNsYW5kcycsICdDb2xvbWJpYScsICdDb21vcm9zJywgJ0NvbmdvJywgJ0NvbmdvLCBUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUnLCAnQ29vayBJc2xhbmRzJywgJ0Nvc3RhIFJpY2EnLCAnQ290ZSBEXFwnSXZvaXJlJywgJ0Nyb2F0aWEnLCAnQ3ViYScsICdDeXBydXMnLCAnQ3plY2ggUmVwdWJsaWMnLCAnRGVubWFyaycsICdEamlib3V0aScsICdEb21pbmljYScsICdEb21pbmljYW4gUmVwdWJsaWMnLCAnRWN1YWRvcicsICdFZ3lwdCcsICdFbCBTYWx2YWRvcicsICdFcXVhdG9yaWFsIEd1aW5lYScsICdFcml0cmVhJywgJ0VzdG9uaWEnLCAnRXRoaW9waWEnLCAnRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpJywgJ0Zhcm9lIElzbGFuZHMnLCAnRmlqaScsICdGaW5sYW5kJywgJ0ZyYW5jZScsICdGcmVuY2ggR3VpYW5hJywgJ0ZyZW5jaCBQb2x5bmVzaWEnLCAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJywgJ0dhYm9uJywgJ0dhbWJpYScsICdHZW9yZ2lhJywgJ0dlcm1hbnknLCAnR2hhbmEnLCAnR2licmFsdGFyJywgJ0dyZWVjZScsICdHcmVlbmxhbmQnLCAnR3JlbmFkYScsICdHdWFkZWxvdXBlJywgJ0d1YW0nLCAnR3VhdGVtYWxhJywgJ0d1ZXJuc2V5JywgJ0d1aW5lYScsICdHdWluZWEtQmlzc2F1JywgJ0d1eWFuYScsICdIYWl0aScsICdIZWFyZCBJc2xhbmQgYW5kIE1jZG9uYWxkIElzbGFuZHMnLCAnSG9seSBTZWUgKFZhdGljYW4gQ2l0eSBTdGF0ZSknLCAnSG9uZHVyYXMnLCAnSG9uZyBLb25nJywgJ0h1bmdhcnknLCAnSWNlbGFuZCcsICdJbmRpYScsICdJbmRvbmVzaWEnLCAnSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBPZicsICdJcmFxJywgJ0lyZWxhbmQnLCAnSXNsZSBvZiBNYW4nLCAnSXNyYWVsJywgJ0l0YWx5JywgJ0phbWFpY2EnLCAnSmFwYW4nLCAnSmVyc2V5JywgJ0pvcmRhbicsICdLYXpha2hzdGFuJywgJ0tlbnlhJywgJ0tpcmliYXRpJywgJ0tvcmVhLCBEZW1vY3JhdGljIFBlb3BsZVxcJ1MgUmVwdWJsaWMgb2YnLCAnS29yZWEsIFJlcHVibGljIG9mJywgJ0t1d2FpdCcsICdLeXJneXpzdGFuJywgJ0xhbyBQZW9wbGVcXCdTIERlbW9jcmF0aWMgUmVwdWJsaWMnLCAnTGF0dmlhJywgJ0xlYmFub24nLCAnTGVzb3RobycsICdMaWJlcmlhJywgJ0xpYnlhbiBBcmFiIEphbWFoaXJpeWEnLCAnTGllY2h0ZW5zdGVpbicsICdMaXRodWFuaWEnLCAnTHV4ZW1ib3VyZycsICdNYWNhbycsICdNYWNlZG9uaWEsIFRoZSBGb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2YnLCAnTWFkYWdhc2NhcicsICdNYWxhd2knLCAnTWFsYXlzaWEnLCAnTWFsZGl2ZXMnLCAnTWFsaScsICdNYWx0YScsICdNYXJzaGFsbCBJc2xhbmRzJywgJ01hcnRpbmlxdWUnLCAnTWF1cml0YW5pYScsICdNYXVyaXRpdXMnLCAnTWF5b3R0ZScsICdNZXhpY28nLCAnTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZicsICdNb2xkb3ZhLCBSZXB1YmxpYyBvZicsICdNb25hY28nLCAnTW9uZ29saWEnLCAnTW9udHNlcnJhdCcsICdNb3JvY2NvJywgJ01vemFtYmlxdWUnLCAnTXlhbm1hcicsICdOYW1pYmlhJywgJ05hdXJ1JywgJ05lcGFsJywgJ05ldGhlcmxhbmRzJywgJ05ldGhlcmxhbmRzIEFudGlsbGVzJywgJ05ldyBDYWxlZG9uaWEnLCAnTmV3IFplYWxhbmQnLCAnTmljYXJhZ3VhJywgJ05pZ2VyJywgJ05pZ2VyaWEnLCAnTml1ZScsICdOb3Jmb2xrIElzbGFuZCcsICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLCAnTm9yd2F5JywgJ09tYW4nLCAnUGFraXN0YW4nLCAnUGFsYXUnLCAnUGFsZXN0aW5pYW4gVGVycml0b3J5LCBPY2N1cGllZCcsICdQYW5hbWEnLCAnUGFwdWEgTmV3IEd1aW5lYScsICdQYXJhZ3VheScsICdQZXJ1JywgJ1BoaWxpcHBpbmVzJywgJ1BpdGNhaXJuJywgJ1BvbGFuZCcsICdQb3J0dWdhbCcsICdQdWVydG8gUmljbycsICdRYXRhcicsICdSZXVuaW9uJywgJ1JvbWFuaWEnLCAnUnVzc2lhbiBGZWRlcmF0aW9uJywgJ1JXQU5EQScsICdTYWludCBIZWxlbmEnLCAnU2FpbnQgS2l0dHMgYW5kIE5ldmlzJywgJ1NhaW50IEx1Y2lhJywgJ1NhaW50IFBpZXJyZSBhbmQgTWlxdWVsb24nLCAnU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXMnLCAnU2Ftb2EnLCAnU2FuIE1hcmlubycsICdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnLCAnU2F1ZGkgQXJhYmlhJywgJ1NlbmVnYWwnLCAnU2VyYmlhIGFuZCBNb250ZW5lZ3JvJywgJ1NleWNoZWxsZXMnLCAnU2llcnJhIExlb25lJywgJ1NpbmdhcG9yZScsICdTbG92YWtpYScsICdTbG92ZW5pYScsICdTb2xvbW9uIElzbGFuZHMnLCAnU29tYWxpYScsICdTb3V0aCBBZnJpY2EnLCAnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnLCAnU3BhaW4nLCAnU3JpIExhbmthJywgJ1N1ZGFuJywgJ1N1cmluYW1lJywgJ1N2YWxiYXJkIGFuZCBKYW4gTWF5ZW4nLCAnU3dhemlsYW5kJywgJ1N3ZWRlbicsICdTd2l0emVybGFuZCcsICdTeXJpYW4gQXJhYiBSZXB1YmxpYycsICdUYWl3YW4sIFByb3ZpbmNlIG9mIENoaW5hJywgJ1RhamlraXN0YW4nLCAnVGFuemFuaWEsIFVuaXRlZCBSZXB1YmxpYyBvZicsICdUaGFpbGFuZCcsICdUaW1vci1MZXN0ZScsICdUb2dvJywgJ1Rva2VsYXUnLCAnVG9uZ2EnLCAnVHJpbmlkYWQgYW5kIFRvYmFnbycsICdUdW5pc2lhJywgJ1R1cmtleScsICdUdXJrbWVuaXN0YW4nLCAnVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzJywgJ1R1dmFsdScsICdVZ2FuZGEnLCAnVWtyYWluZScsICdVbml0ZWQgQXJhYiBFbWlyYXRlcycsICdVbml0ZWQgS2luZ2RvbScsICdVbml0ZWQgU3RhdGVzJywgJ1VuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kcycsICdVcnVndWF5JywgJ1V6YmVraXN0YW4nLCAnVmFudWF0dScsICdWZW5lenVlbGEnLCAnVmlldCBOYW0nLCAnVmlyZ2luIElzbGFuZHMsIEJyaXRpc2gnLCAnVmlyZ2luIElzbGFuZHMsIFUuUy4nLCAnV2FsbGlzIGFuZCBGdXR1bmEnLCAnV2VzdGVybiBTYWhhcmEnLCAnWWVtZW4nLCAnWmFtYmlhJywgJ1ppbWJhYndlJ107XG5cbiAgICAgICAgJHNjb3BlLmNvbnRhY3RUaW1lcyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnV29ya2luZyBob3VycyAoOWFtIHRvIDYgcG0pJywgdmFsdWU6ICc5LTYnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnRXZlbmluZyB0aW1lICg2YW0gdG8gOSBwbSknLCB2YWx1ZTogJzYtOSd9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFJvbGU6ICcnLFxuICAgICAgICAgICAgYWdlR2F0ZTogJ3llcycsXG4gICAgICAgICAgICBjb3VudHJ5T3JpZ2luOiAnQ2hpbmEnLFxuICAgICAgICAgICAgY291bnRyeVJlc2lkZW5jZTogJ0NoaW5hJyxcbiAgICAgICAgICAgIGNvbnRhY3RUaW1lOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0udG90YWxTdGVwcyA9ICRzY29wZS50b3RhbFN0ZXBzWyRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZV07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSAqIDEwMCwgOTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzSW52ZXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgoKDEgLSAoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSkgKiAxMDApLCA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgY3JvcHBlZFRodW1ibmFpbDogbnVsbCxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHVzZXIucmVnaXN0ZXJlZCA9PSAxKSAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUltYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICRzY29wZS5kYXRhLmNyb3BwZWRUaHVtYm5haWw7XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZS5maWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gJ1lvdXIgcHJvZmlsZSBwaWN0dXJlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWQhJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VFcnJvciA9ICdQcm9maWxlIHBpY3R1cmUgZmFpbGVkIHRvIHVwbG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IoaW1hZ2UpKTtcbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgJHNjb3BlLnN1Ym1pdERldGFpbHMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5kYXRhLmZuYW1lLFxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJHNjb3BlLmRhdGEubG5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlLFxuICAgICAgICAgICAgICAgIGFnZV9nYXRlOiAkc2NvcGUuZGF0YS5hZ2VHYXRlLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfb3JpZ2luOiAkc2NvcGUuZGF0YS5jb3VudHJ5T3JpZ2luLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfcmVzaWRlbmNlOiAkc2NvcGUuZGF0YS5jb3VudHJ5UmVzaWRlbmNlLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfbnVtYmVyOiAkc2NvcGUuZGF0YS5jb250YWN0TnVtYmVyLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfdGltZTogJHNjb3BlLmRhdGEuY29udGFjdFRpbWUudmFsdWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCgkc2NvcGUuZGF0YS5zZWxlY3RlZFJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ludmVzdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGludmVzdG1lbnRCdWRnZXQgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRCdWRnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmVzdG1lbnRCdWRnZXQgPT09ICdvdGhlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmVzdG1lbnRCdWRnZXQgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRCdWRnZXRPdGhlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3RvciA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2J1ZGdldCA9IGludmVzdG1lbnRCdWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfZ29hbCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudEdvYWw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmludmVzdG9yLmludmVzdG1lbnRfcmVhc29uID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50UmVhc29uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOlxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5jcmVhdG9yID0ge307XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG4gICAgICAgICAgICAkd2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvdXNlcnMvJyArICRyb290U2NvcGUudXNlci5pZCwgdXNlckRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09ICdVcGRhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubmFtZSA9ICRzY29wZS5kYXRhLmZuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIubGFzdF9uYW1lID0gJHNjb3BlLmRhdGEubG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlci5yb2xlID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucmVnaXN0ZXJlZCA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHtyb2xlOiBhbmd1bGFyLmNvcHkoJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQpIHtcblxuICAgICAgICAkc2NvcGUuY29udGVzdHMgPSBbXTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZXN0LnF1ZXJ5KCkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0cyA9IHJlc3VsdDtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmZEVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgZWxlbWVudC5iaW5kKFwia2V5ZG93biBrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMuZmRFbnRlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdDb250ZXN0U2luZ2xlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJGZpbHRlciwgJHdpbmRvdywgJHRpbWVvdXQpIHtcbiAgICAgICAgJHNjb3BlLmNvbnRlc3RJZCA9ICRzdGF0ZVBhcmFtcy5jb250ZXN0SWQ7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRyeTogbnVsbCxcbiAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRpdml0eTogJycsXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJycsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBDb250ZXN0ID0gJHJlc291cmNlKCcvYXBpL2NvbnRlc3RzLzpjb250ZXN0SWQnLCB7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICdAaWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeSA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyaWVzLzplbnRyeUlkJywge1xuICAgICAgICAgICAgZW50cnlJZDogJ0BpZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAganVkZ2VFbnRyaWVzOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvY29udGVzdC86Y29udGVzdElkL2p1ZGdlLzpqdWRnZUlkJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2VudHJpZXMvOmVudHJ5SWQvbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBFbnRyeVJhdGluZyA9ICRyZXNvdXJjZSgnL2FwaS9lbnRyeS1yYXRpbmdzLzplbnRyeVJhdGluZ0lkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVudHJ5UmF0aW5nSWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcblxuICAgICAgICBDb250ZXN0LmdldCh7XG4gICAgICAgICAgICBjb250ZXN0SWQ6ICRzY29wZS5jb250ZXN0SWRcbiAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS5jb250ZXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB2YXIganVkZ2VhYmxlID0gJGZpbHRlcignZmlsdGVyJykoJHJvb3RTY29wZS51c2VyLmp1ZGdpbmcsIHtcbiAgICAgICAgICAgICAgICBpZDogJHNjb3BlLmNvbnRlc3RJZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanVkZ2VhYmxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoanVkZ2VhYmxlLmxlbmd0aCA+IDAgJiYgJHN0YXRlUGFyYW1zLnJvbGUgIT09ICdqdXJ5Jykge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuY29udGVzdElkID0gcmVzdWx0LmlkO1xuXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3Lm9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3RzaW5nbGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2p1cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogcmVzdWx0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHN0YXRlUGFyYW1zLnJvbGUgPT09ICdqdXJ5Jykge1xuICAgICAgICAgICAgICAgICAgICBFbnRyeS5qdWRnZUVudHJpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAganVkZ2VJZDogJHJvb3RTY29wZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXN0LmVudHJpZXMgPSBhbmd1bGFyLmNvcHkocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEVudHJ5ID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSBlbnRyeTtcbiAgICAgICAgICAgIHZhciByYXRpbmcgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcpO1xuXG4gICAgICAgICAgICBFbnRyeS5nZXQoe1xuICAgICAgICAgICAgICAgIGVudHJ5SWQ6IGVudHJ5LmlkXG4gICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcgPSByYXRpbmc7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIG1lc3NhZ2UnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQpO1xuXG4gICAgICAgICAgICB2YXIgbWVzc2FnZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJHNjb3BlLmRhdGEubWVzc2FnZVRvU2VuZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRW50cnkuc2VuZE1lc3NhZ2Uoe2VudHJ5SWQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWR9LCBtZXNzYWdlUmVxdWVzdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5Lm1lc3NhZ2VzLnB1c2gocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmQgPSAnJztcblxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jaGF0Ym94JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAxMDAwMH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2F2ZU1hcmtzID0gZnVuY3Rpb24oZW50cnlSYXRpbmdJZCl7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZpbmdNYXJrcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciB1cGRhdGVkUmF0aW5nID0ge1xuICAgICAgICAgICAgICAgIGRlc2lnbjogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuZGVzaWduLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmNyZWF0aXZpdHksXG4gICAgICAgICAgICAgICAgaW5kdXN0cmlhbDogJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5yYXRpbmcuaW5kdXN0cmlhbCxcbiAgICAgICAgICAgICAgICBtYXJrZXQ6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLm1hcmtldCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHVwZGF0ZWRSYXRpbmcuanVkZ2VfaWQgPSAkcm9vdFNjb3BlLnVzZXIuaWQ7XG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmVudHJ5X2lkID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5pZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihlbnRyeVJhdGluZ0lkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBFbnRyeVJhdGluZy51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiBlbnRyeVJhdGluZ0lkXG4gICAgICAgICAgICAgICAgfSwgdXBkYXRlZFJhdGluZykuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgcmF0aW5nIHNhdmVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeVJhdGluZyA9IG5ldyBFbnRyeVJhdGluZyh1cGRhdGVkUmF0aW5nKTtcbiAgICAgICAgICAgICAgICBlbnRyeVJhdGluZy4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBjcmVhdGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmVkTWFya3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRmxhc2hOb3RpY2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcyA9IHt9O1xuXG4gICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3ID0ge1xuICAgICAgICBcdHNob3c6IGZhbHNlLFxuICAgICAgICBcdGNvbnRlc3RJZDogMCxcbiAgICAgICAgXHRvbkNsaWNrOiBmdW5jdGlvbigpe31cbiAgICAgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJGF1dGgpIHtcblxuXG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ05hdmlnYXRpb25DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoKSB7XG5cbiAgICAgICAgLy8gTG9nb3V0XG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdHVhbGx5IGxvZ2dpbmcgb3V0ISAuLi4nKTtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuaXNOYXZTaG93biA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAubG9naW4nLCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICR3aW5kb3cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hvbWUgVmlldyBTdGFydGVkJyk7XG5cbiAgICAgICAgLy8gUmVkaXJlY3QgdG8gY29udGVzdFxuICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jyk7XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSW52ZXN0Q3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkcmVzb3VyY2UsICR3aW5kb3cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludmVzdCBTdGFydGVkJyk7XG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICAgICAgJHNjb3BlLmludmVzdG9ycyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiAnQWxhaW4gPGJyPiBBbW9yZXR0aScsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzEuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NoYXJsZXMgZFxcJ2FudGVycm9jaGVzJywgY291bnRyeTogJ0ZyYW5jZScsIGltYWdlOiAnMi5qcGcnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2hyaXN0b3BoZSBCcmlzc2lhdWQnLCBjb3VudHJ5OiAnQ2hpbmEnLCBpbWFnZTogJzMuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0plYW4tQmVybmFyZCBBbnRvaW5lJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICc0LmpwZWcnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnWGF2aWVyIDxicj4gUGF1bGluJywgY291bnRyeTogJ1RhaXdhbicsIGltYWdlOiAnNS5qcGcnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2luZHkgPGJyPiBDaHVuZycsIGNvdW50cnk6ICdIb25nIEtvbmcnLCBpbWFnZTogJzYuanBnJ31cbiAgICAgICAgXTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZmlsdGVyKCd0cnVzdGVkSHRtbCcsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuICAgICAgICB9O1xuICAgIH1dKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJylcblxuICAgIC5kaXJlY3RpdmUoJ2ZkQ2hhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGNhbnZhcyBpZD1cImZkQ2hhcnRcIiB3aWR0aD1cInt7d2lkdGh9fVwiIGhlaWdodD1cInt7aGVpZ2h0fX1cIj48L2NhbnZhcz4nLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGRhdGE6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLndpZHRoID0gJGF0dHJzLndpZHRoO1xuICAgICAgICAgICAgICAgICRzY29wZS5oZWlnaHQgPSAkYXR0cnMuaGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS53aWR0aCgkYXR0cnMud2lkdGgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmhlaWdodCgkYXR0cnMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHZhciBwaWVEYXRhQSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDA2ODM3XCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjMDI3NTNmXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOTYsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM5NGM0NGRcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM4Y2JhNDdcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRnVuZGF0b3JcIlxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVEYXRhQSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQbGFubmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0E2QThBQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNjAsIDU5LCA2MywgNTksIDU4LCA2MywgNjQsIDY1LCA2NiwgNzAsIDc5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWFsaXplZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiM5M0M2NThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDIyLCAxNiwgMjEsIDE3LCAyMCwgMjcsIDI1LCAyMywgMzIsIDQwLCA0NV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZigkYXR0cnMuZGF0YSA9PT0gJ0EnKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUocGllRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocGllRGF0YUEpLmVhY2goZnVuY3Rpb24oaSwgdGhlX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAucGllLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwicGllLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK3RoZV9pdGVtLmNvbG9yKyc7XCI+PC9zcGFuPiAnK3RoZV9pdGVtLnZhbHVlKyclICcrdGhlX2l0ZW0ubGFiZWwrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9ICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZkQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGxpbmVEYXRhQSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2UgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRlbXBsYXRlIDogXCI8dWwgY2xhc3M9XFxcIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFxcXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlxcXCI+PC9zcGFuPjwlaWYoc2VnbWVudHNbaV0ubGFiZWwpeyU+PCU9c2VnbWVudHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLmxpbmUtY2hhcnQtbGFiZWxzXCIpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJsaW5lLWNoYXJ0LWxhYmVsXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ODM3O1wiPjwvc3Bhbj4gUmVhbGl6ZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzkzQzY1ODtcIj48L3NwYW4+IFBsYW5uZWQ8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUGFnZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCwgJHdpbmRvdykge1xuICAgICAgICBjb25zb2xlLmxvZygnUGFnZSBWaWV3IFN0YXJ0ZWQnKTtcblxuICAgICAgICAkc2NvcGUucGFnZSA9IHtcbiAgICAgICAgXHR0aXRsZTogJycsXG4gICAgICAgIFx0Y29udGVudDogJydcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcGFnZXMvJyArICRzdGF0ZVBhcmFtcy5zbHVnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIFx0Y29uc29sZS5sb2coJ1N1Y2Nlc3MnKTtcbiAgICAgICAgXHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBcdCRzY29wZS5wYWdlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXG5cdFx0XHRpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDQnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdsb2FkIDQwNCcpXG5cdFx0XHR9O1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
