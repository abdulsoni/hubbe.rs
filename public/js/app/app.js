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
    angular.module('fundator.directives', ['dibari.angular-ellipsis', 'localytics.directives']);
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
                    // event.preventDefault();
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
                console.log('login succssfull');
                console.log(data);
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


    angular.module('fundator.controllers').controller('RegisterCtrl', ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "$resource", "$window", "$filter", "FileUploader", function($rootScope, $scope, $state, $auth, $timeout, $http, $resource, $window, $filter, FileUploader) {

        $scope.form = {
            currentStep: 1,
            totalSteps: 3
        };

        $scope.totalSteps = {
            creator: 3,
            expert: 4,
            investor: 4
        };

        $scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'S Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People\'S Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'RWANDA', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

        $scope.contactTimes = [
            {name: 'Working hours (9am to 6 pm)', value: '9-6'},
            {name: 'Evening time (6am to 9 pm)', value: '6-9'}
        ];

        $scope.data = {
            selectedRole: 'expert',
            ageGate: 'yes',
            countryOrigin: 'China',
            countryResidence: 'China',
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


        // Expert Related Functions

        $scope.allSkills = $resource('api/skills').query();

        $scope.inputtedExpertiseList = [];

        function addNewInputtedExpertise(){
            if ($scope.inputtedExpertiseList.length < 3) {
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

        addNewInputtedExpertise()

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJkaXJlY3RpdmVzL2xvYWRlci5kaXJlY3RpdmUuanMiLCJhcHAvYXV0aC9hdXRoLmpzIiwiYXBwL2F1dGgvcmVnaXN0ZXIuanMiLCJhcHAvY29udGVzdC9jb250ZXN0LmpzIiwiYXBwL2hlYWRlci9mbGFzaC1ub3RpY2UuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9oZWFkZXIvbmF2aWdhdGlvbi5qcyIsImFwcC9ob21lL2hvbWUuanMiLCJhcHAvaW52ZXN0L2ludmVzdC5qcyIsImFwcC9wYWdlL3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsSUFBQSxXQUFBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7SUFHQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLHdCQUFBLENBQUEsY0FBQSxhQUFBLGdCQUFBLGFBQUEsY0FBQSxpQkFBQSx3QkFBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLG9CQUFBLENBQUE7SUFDQSxRQUFBLE9BQUEscUJBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSx1QkFBQSxDQUFBLDJCQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBOzs7QUNsQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLGdEQUFBLFNBQUEsZ0JBQUEsb0JBQUE7O1FBRUEsSUFBQSxVQUFBLFNBQUEsVUFBQSxlQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLGFBQUE7Z0JBQ0EsZ0JBQUE7OztZQUdBLE9BQUEscUJBQUEsV0FBQSxNQUFBLGdCQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxPQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTt3QkFDQSxZQUFB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QUVBLFVBQUE7S0FDQSxVQUFBO0tBQ0EsTUFBQSxTQUFBLFFBQUEsVUFBQSxRQUFBO01BQ0EsU0FBQSxTQUFBLE9BQUE7Ozs7Ozs7O0FDYkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdCQUFBLFdBQUEsb0VBQUEsU0FBQSxZQUFBLFFBQUEsUUFBQSxPQUFBLFNBQUE7UUFDQSxPQUFBLElBQUEsc0JBQUEsV0FBQTtZQUNBLFNBQUEsVUFBQTtnQkFDQSxXQUFBLFlBQUE7ZUFDQTs7O1FBR0EsV0FBQSxXQUFBOztRQUVBLElBQUEsTUFBQSxtQkFBQTtZQUNBLE9BQUEsR0FBQSxlQUFBOzs7UUFHQSxPQUFBLFFBQUEsV0FBQTtZQUNBLE9BQUEsZUFBQTs7WUFFQSxJQUFBLGNBQUE7Z0JBQ0EsT0FBQSxPQUFBO2dCQUNBLFVBQUEsT0FBQTs7O1lBR0EsTUFBQSxNQUFBLGFBQUEsS0FBQSxTQUFBLE1BQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxPQUFBLEdBQUEsZUFBQSxJQUFBLENBQUEsUUFBQTtlQUNBLFNBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsSUFBQSxJQUFBLGVBQUEsZ0JBQUE7b0JBQ0EsT0FBQSxlQUFBO3FCQUNBO29CQUNBLE9BQUEsZUFBQSxJQUFBOzs7OztRQUtBLE9BQUEsZUFBQSxTQUFBLFVBQUE7WUFDQSxNQUFBLGFBQUE7OztRQUdBLE9BQUEsU0FBQSxVQUFBO1lBQ0EsTUFBQSxTQUFBLEtBQUEsV0FBQTtnQkFDQSxhQUFBLFdBQUE7Z0JBQ0EsV0FBQSxnQkFBQTtnQkFDQSxXQUFBLE9BQUE7O2dCQUVBLE9BQUEsR0FBQSxhQUFBLElBQUEsQ0FBQSxRQUFBOzs7Ozs7OztBQ2hEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxTQUFBLGNBQUEsU0FBQTtRQUNBLFFBQUEsSUFBQTs7UUFFQSxJQUFBO1FBQ0EsSUFBQSxRQUFBLE1BQUEsS0FBQSxHQUFBLFFBQUEsYUFBQTtZQUNBLGFBQUEsS0FBQSxRQUFBLE1BQUEsS0FBQTs7WUFFQSxh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QUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUE7O1lBRUEsSUFBQSxPQUFBLGdCQUFBLGFBQUE7Z0JBQ0EsT0FBQSxXQUFBLFNBQUE7OztZQUdBLE9BQUE7OztRQUdBLE9BQUEsY0FBQSxTQUFBLE9BQUEsTUFBQTtZQUNBLEdBQUEsQ0FBQSxPQUFBLFNBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUEsc0JBQUEsT0FBQSxlQUFBLEtBQUE7O1lBRUEsT0FBQSxzQkFBQSxPQUFBLE9BQUE7OztRQUdBLE9BQUEsZ0JBQUEsU0FBQSxHQUFBLE9BQUEsTUFBQTtZQUNBLE9BQUEsc0JBQUEsT0FBQSxpQkFBQSxRQUFBLFVBQUEsT0FBQSxzQkFBQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxRQUFBLFNBQUE7Z0JBQ0EsT0FBQSxDQUFBLFFBQUEsT0FBQSxRQUFBOztZQUVBLEVBQUE7OztRQUdBLE9BQUEsYUFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsYUFBQSxRQUFBLEtBQUEsT0FBQSxzQkFBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsaUJBQUEsUUFBQSxLQUFBLE9BQUEsc0JBQUEsT0FBQSxZQUFBO1lBQ0EsT0FBQSxzQkFBQSxPQUFBLGNBQUEsQ0FBQSxNQUFBLElBQUEsUUFBQTs7O1FBR0EsT0FBQSx5QkFBQSxTQUFBLE1BQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsd0JBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsNkJBQUEsS0FBQSxTQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLHdCQUFBLE9BQUE7Z0JBQ0EsT0FBQSxzQkFBQSxPQUFBLFVBQUE7Ozs7UUFJQSxPQUFBLDRCQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsMkJBQUE7WUFDQSxPQUFBLHNCQUFBLE9BQUEsVUFBQTs7WUFFQSxNQUFBLElBQUEsNkJBQUEsT0FBQSxzQkFBQSxPQUFBLDBCQUFBLElBQUEsS0FBQSxTQUFB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QSxPQUFBO1NBQ0EsT0FBQTtTQUNBLFNBQUE7OztRQUdBLFdBQUEsV0FBQTtRQUNBLE1BQUEsSUFBQSxnQkFBQSxhQUFBLE1BQUEsS0FBQSxTQUFBLE9BQUE7U0FDQSxRQUFBLElBQUE7U0FDQSxRQUFBLElBQUE7U0FDQSxPQUFBLE9BQUEsT0FBQTtXQUNBLFNBQUEsTUFBQTtHQUNBLFFBQUEsSUFBQTtHQUNBLFFBQUEsSUFBQTs7R0FFQSxJQUFBLE1BQUEsVUFBQSxPQUFBO0lBQ0EsUUFBQSxJQUFBO0lBQ0E7V0FDQSxRQUFBLFVBQUE7U0FDQSxXQUFBLFdBQUE7Ozs7S0FJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBmdW5kYXRvciA9IGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvcicsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdmdW5kYXRvci5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuZmlsdGVycycsXG4gICAgICAgICAgICAnZnVuZGF0b3Iuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2Z1bmRhdG9yLnJvdXRlcycsXG4gICAgICAgICAgICAnZnVuZGF0b3IuY29uZmlnJ1xuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycsIFsnbmdSZXNvdXJjZScsICduZ0FuaW1hdGUnLCAndWkuYm9vdHN0cmFwJywgJ3VpLnJvdXRlcicsICdzYXRlbGxpemVyJywgJ2FuZ3VsYXJNb21lbnQnLCAnYW5ndWxhci1vd2wtY2Fyb3VzZWwnLCAnbmdJbWdDcm9wJywgJ2FuZ3VsYXJGaWxlVXBsb2FkJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5maWx0ZXJzJywgWydvcmRpbmFsJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5zZXJ2aWNlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJywgWydkaWJhcmkuYW5ndWxhci1lbGxpcHNpcycsICdsb2NhbHl0aWNzLmRpcmVjdGl2ZXMnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3Iucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvY29udGVzdCcpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJywgJ25hdmlnYXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOYXZpZ2F0aW9uQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmxhc2hOb3RpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInLCAnZmxhc2gtbm90aWNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRmxhc2hOb3RpY2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnbm90aWZpY2F0aW9ucycsICd3aWRnZXQnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBxdWlja1VwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5sb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhdXRoJywgJ2xvZ2luJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aEN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAucmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYXV0aCcsICdyZWdpc3RlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdob21lJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGVzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29udGVzdCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NvbnRlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5jb250ZXN0c2luZ2xlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb250ZXN0Lzpjb250ZXN0SWQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGVzdFNpbmdsZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JhYnNoYXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ncmFiLWEtc2hhcmUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnZlc3QnLCAnZ3JhYi1hLXNoYXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSW52ZXN0Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5ub3RpZmljYXRpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY29udGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRlc3RDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnBhZ2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLzpzbHVnJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncGFnZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLnJvdXRlcycpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGF1dGgsICR0aW1lb3V0LCAkaHR0cCwgJHVybFJvdXRlciwgJGZpbHRlcikge1xuXG4gICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbiAgICAgICAgJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9IGZhbHNlO1xuXG4gICAgICAgICRyb290U2NvcGUuYWN0aXZlUm9sZSA9ICcnO1xuICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlID0gbnVsbDtcbiAgICAgICAgJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcyA9IG51bGw7XG5cbiAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID0gZmFsc2U7XG5cbiAgICAgICAgJHJvb3RTY29wZS50b2dnbGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pc05hdlNob3duID8gJHJvb3RTY29wZS5pc05hdlNob3duID0gZmFsc2UgOiAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdzdGFydExvYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHBMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3N0b3BMb2FkaW5nJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRyb290U2NvcGUuYXBwTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YoJHJvb3RTY29wZS51c2VyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlclNlcnZpY2UgaXMgYW4gZXhhbXBsZSBzZXJ2aWNlIGZvciBtYW5hZ2luZyB1c2VyIHN0YXRlXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbml0aWFsTG9jYXRpb25TZXR1cCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50ICR1cmxSb3V0ZXIncyBkZWZhdWx0IGhhbmRsZXIgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmRcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdXNlciBvYmplY3QgYW5kIHRhc2tzXG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3VzZXI/dG9rZW49JyArICRhdXRoLmdldFRva2VuKCkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzdWx0LmVycm9yKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLnJlZ2lzdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXMgPSAkZmlsdGVyKCdmaWx0ZXInKSgkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcywge3JvbGU6ICRyb290U2NvcGUudXNlci5yb2xlfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHJvbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnN3aXRjaFVzZXJSb2xlKHJvbGUucm9sZSwgcm9sZS5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJGF1dGgubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAgICAgICAgICAgICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRhdXRoLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Z1bmRhdG9yX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAoJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWN0aXZlU3RhdGUgPSB0b1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvU3RhdGUubmFtZS5pbmRleE9mKCdsb2dpbicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmxvZ2luJywge30pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBzZWNvbmRhcnlOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZGFyeU5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5TmFtZSA9IHZpZXdOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyBzZWNvbmRhcnlOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTd2l0Y2ggVXNlciBSb2xlXG5cbiAgICAgICAgJHJvb3RTY29wZS5zd2l0Y2hVc2VyUm9sZSA9IGZ1bmN0aW9uKHJvbGUsIHJvbGVJZCwgcmVsb2FkKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFjdGl2ZVJvbGUgPSByb2xlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKCRyb290U2NvcGUudXNlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUudXNlci51c2VyX3JvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIudXNlcl9yb2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclJvbGVWaWV3cyA9IFt7XG4gICAgICAgICAgICAgICAgcm91dGU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdxdWlja1VwZGF0ZScsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogZ2V0VmlldygncXVpY2stdXBkYXRlJywgJ3F1aWNrLXVwZGF0ZS1jcmVhdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGludmVzdG9yOiBnZXRWaWV3KCdxdWljay11cGRhdGUnLCAncXVpY2stdXBkYXRlLWludmVzdG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGp1cnk6IGdldFZpZXcoJ3F1aWNrLXVwZGF0ZScsICdxdWljay11cGRhdGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdxdWljay11cGRhdGUnKVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiAnYXBwLmNvbnRlc3RzaW5nbGUnLFxuICAgICAgICAgICAgICAgIHZpZXc6ICdtYWluQCcsXG4gICAgICAgICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgICAgICAgICAganVyeTogZ2V0VmlldygnY29udGVzdC1zaW5nbGUnLCAnY29udGVzdC1zaW5nbGUtanVyeScpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiBnZXRWaWV3KCdjb250ZXN0JywgJ2NvbnRlc3Qtc2luZ2xlJylcbiAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godXNlclJvbGVWaWV3cywgZnVuY3Rpb24ocm9sZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZVRlbXBsYXRlVmlldyA9IHJvbGVWaWV3LnJvbGVzW3JvbGVdO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gJHN0YXRlLmdldChyb2xlVmlldy5yb3V0ZSkudmlld3Nbcm9sZVZpZXcudmlld107XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJvbGVUZW1wbGF0ZVZpZXcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnRlbXBsYXRlVXJsID0gcm9sZVRlbXBsYXRlVmlldztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy50ZW1wbGF0ZVVybCA9IHJvbGVWaWV3LmRlZmF1bHRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoKHJvbGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0b3InOiBtb2RlbCA9ICcvYXBpL2NyZWF0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6IG1vZGVsID0gJy9hcGkvaW52ZXN0b3JzLycgKyByb2xlSWRcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGh0dHAuZ2V0KG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyW3JvbGVdID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQubmFtZSA9ICRyb290U2NvcGUuYWN0aXZlU3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQucGFyYW1zID0gJHJvb3RTY29wZS5hY3RpdmVTdGF0ZVBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJHN0YXRlLmN1cnJlbnQubmFtZSwgJHN0YXRlLmN1cnJlbnQucGFyYW1zLCB7cmVsb2FkOiByZWxvYWR9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcbiAgICAgICAgLy8gU2F0ZWxsaXplciBjb25maWd1cmF0aW9uIHRoYXQgc3BlY2lmaWVzIHdoaWNoIEFQSVxuICAgICAgICAvLyByb3V0ZSB0aGUgSldUIHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvYXV0aGVudGljYXRlJztcbiAgICAgICAgJGF1dGhQcm92aWRlci50b2tlblByZWZpeCA9ICdmdW5kYXRvcic7XG5cbiAgICAgICAgdmFyIHJlZGlyZWN0VXJpUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cbiAgICAgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG4gICAgICAgIFx0Y2xpZW50SWQ6ICc3N3pqeGZiaDI5MjhyZScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2F1dGhlbnRpY2F0ZS9saW5rZWRpbicsXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpOiByZWRpcmVjdFVyaVBhdGggKyAnL2FwaS9hdXRoZW50aWNhdGUvbGlua2VkaW4nLFxuICAgICAgICAgICAgcmVxdWlyZWRVcmxQYXJhbXM6IFsnc3RhdGUnXSxcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXG4gICAgICAgICAgICB0eXBlOiAnMi4wJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdzZWxmJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cblx0LmRpcmVjdGl2ZSgnZmRMb2FkZXInLCBmdW5jdGlvbigpIHtcblx0ICByZXR1cm4ge1xuXHQgIFx0c2NvcGU6IHtcblx0ICBcdFx0dmlld0JveDogJ0AnXG5cdCAgXHR9LFxuXHQgICAgcmVzdHJpY3Q6ICdFJyxcblx0ICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImZkLWxvYWRlciBsYS1iYWxsLXB1bHNlXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyxcblx0ICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHQgICAgXHQkZWxlbWVudC5hZGRDbGFzcygkYXR0cnMuY2xhc3MpO1xuXHQgICAgfVxuXHQgIH07XG5cdH0pO1xuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0F1dGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoLCAkdGltZW91dCl7XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFwcExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuXG4gICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcsIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2luIHN1Y2Nzc2Z1bGwnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1c1RleHQgPT09ICdVbmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSAnVGhlIGVtYWlsIG9yIHBhc3N3b3JkIHlvdSBlbnRlcmVkIGlzIGluY29ycmVjdC4nXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBlcnIuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICRhdXRoLmF1dGhlbnRpY2F0ZShwcm92aWRlcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhVVJJKTtcbiAgICAgICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgICAgICB2YXIgYnl0ZVN0cmluZztcbiAgICAgICAgaWYgKGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAgICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgICAgICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgICAgICB2YXIgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6bWltZVN0cmluZ30pO1xuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdmb2N1c09uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZTogeyBmb2N1c09uOiAnPScgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2NvcGUuZm9jdXNPbik7XG5cbiAgICAgICAgICAgICAgICBpZihzY29wZS5mb2N1c09uKXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgIH07XG4gICAgfSk7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCwgJHRpbWVvdXQsICRodHRwLCAkcmVzb3VyY2UsICR3aW5kb3csICRmaWx0ZXIsIEZpbGVVcGxvYWRlcikge1xuXG4gICAgICAgICRzY29wZS5mb3JtID0ge1xuICAgICAgICAgICAgY3VycmVudFN0ZXA6IDEsXG4gICAgICAgICAgICB0b3RhbFN0ZXBzOiAzXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvdGFsU3RlcHMgPSB7XG4gICAgICAgICAgICBjcmVhdG9yOiAzLFxuICAgICAgICAgICAgZXhwZXJ0OiA0LFxuICAgICAgICAgICAgaW52ZXN0b3I6IDRcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gWydBZmdoYW5pc3RhbicsICfDhWxhbmQgSXNsYW5kcycsICdBbGJhbmlhJywgJ0FsZ2VyaWEnLCAnQW1lcmljYW4gU2Ftb2EnLCAnQW5kb3JyQScsICdBbmdvbGEnLCAnQW5ndWlsbGEnLCAnQW50YXJjdGljYScsICdBbnRpZ3VhIGFuZCBCYXJidWRhJywgJ0FyZ2VudGluYScsICdBcm1lbmlhJywgJ0FydWJhJywgJ0F1c3RyYWxpYScsICdBdXN0cmlhJywgJ0F6ZXJiYWlqYW4nLCAnQmFoYW1hcycsICdCYWhyYWluJywgJ0JhbmdsYWRlc2gnLCAnQmFyYmFkb3MnLCAnQmVsYXJ1cycsICdCZWxnaXVtJywgJ0JlbGl6ZScsICdCZW5pbicsICdCZXJtdWRhJywgJ0JodXRhbicsICdCb2xpdmlhJywgJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnLCAnQm90c3dhbmEnLCAnQm91dmV0IElzbGFuZCcsICdCcmF6aWwnLCAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JywgJ0JydW5laSBEYXJ1c3NhbGFtJywgJ0J1bGdhcmlhJywgJ0J1cmtpbmEgRmFzbycsICdCdXJ1bmRpJywgJ0NhbWJvZGlhJywgJ0NhbWVyb29uJywgJ0NhbmFkYScsICdDYXBlIFZlcmRlJywgJ0NheW1hbiBJc2xhbmRzJywgJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycsICdDaGFkJywgJ0NoaWxlJywgJ0NoaW5hJywgJ0NocmlzdG1hcyBJc2xhbmQnLCAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLCAnQ29sb21iaWEnLCAnQ29tb3JvcycsICdDb25nbycsICdDb25nbywgVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlJywgJ0Nvb2sgSXNsYW5kcycsICdDb3N0YSBSaWNhJywgJ0NvdGUgRFxcJ0l2b2lyZScsICdDcm9hdGlhJywgJ0N1YmEnLCAnQ3lwcnVzJywgJ0N6ZWNoIFJlcHVibGljJywgJ0Rlbm1hcmsnLCAnRGppYm91dGknLCAnRG9taW5pY2EnLCAnRG9taW5pY2FuIFJlcHVibGljJywgJ0VjdWFkb3InLCAnRWd5cHQnLCAnRWwgU2FsdmFkb3InLCAnRXF1YXRvcmlhbCBHdWluZWEnLCAnRXJpdHJlYScsICdFc3RvbmlhJywgJ0V0aGlvcGlhJywgJ0ZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKScsICdGYXJvZSBJc2xhbmRzJywgJ0ZpamknLCAnRmlubGFuZCcsICdGcmFuY2UnLCAnRnJlbmNoIEd1aWFuYScsICdGcmVuY2ggUG9seW5lc2lhJywgJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycsICdHYWJvbicsICdHYW1iaWEnLCAnR2VvcmdpYScsICdHZXJtYW55JywgJ0doYW5hJywgJ0dpYnJhbHRhcicsICdHcmVlY2UnLCAnR3JlZW5sYW5kJywgJ0dyZW5hZGEnLCAnR3VhZGVsb3VwZScsICdHdWFtJywgJ0d1YXRlbWFsYScsICdHdWVybnNleScsICdHdWluZWEnLCAnR3VpbmVhLUJpc3NhdScsICdHdXlhbmEnLCAnSGFpdGknLCAnSGVhcmQgSXNsYW5kIGFuZCBNY2RvbmFsZCBJc2xhbmRzJywgJ0hvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpJywgJ0hvbmR1cmFzJywgJ0hvbmcgS29uZycsICdIdW5nYXJ5JywgJ0ljZWxhbmQnLCAnSW5kaWEnLCAnSW5kb25lc2lhJywgJ0lyYW4sIElzbGFtaWMgUmVwdWJsaWMgT2YnLCAnSXJhcScsICdJcmVsYW5kJywgJ0lzbGUgb2YgTWFuJywgJ0lzcmFlbCcsICdJdGFseScsICdKYW1haWNhJywgJ0phcGFuJywgJ0plcnNleScsICdKb3JkYW4nLCAnS2F6YWtoc3RhbicsICdLZW55YScsICdLaXJpYmF0aScsICdLb3JlYSwgRGVtb2NyYXRpYyBQZW9wbGVcXCdTIFJlcHVibGljIG9mJywgJ0tvcmVhLCBSZXB1YmxpYyBvZicsICdLdXdhaXQnLCAnS3lyZ3l6c3RhbicsICdMYW8gUGVvcGxlXFwnUyBEZW1vY3JhdGljIFJlcHVibGljJywgJ0xhdHZpYScsICdMZWJhbm9uJywgJ0xlc290aG8nLCAnTGliZXJpYScsICdMaWJ5YW4gQXJhYiBKYW1haGlyaXlhJywgJ0xpZWNodGVuc3RlaW4nLCAnTGl0aHVhbmlhJywgJ0x1eGVtYm91cmcnLCAnTWFjYW8nLCAnTWFjZWRvbmlhLCBUaGUgRm9ybWVyIFl1Z29zbGF2IFJlcHVibGljIG9mJywgJ01hZGFnYXNjYXInLCAnTWFsYXdpJywgJ01hbGF5c2lhJywgJ01hbGRpdmVzJywgJ01hbGknLCAnTWFsdGEnLCAnTWFyc2hhbGwgSXNsYW5kcycsICdNYXJ0aW5pcXVlJywgJ01hdXJpdGFuaWEnLCAnTWF1cml0aXVzJywgJ01heW90dGUnLCAnTWV4aWNvJywgJ01pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2YnLCAnTW9sZG92YSwgUmVwdWJsaWMgb2YnLCAnTW9uYWNvJywgJ01vbmdvbGlhJywgJ01vbnRzZXJyYXQnLCAnTW9yb2NjbycsICdNb3phbWJpcXVlJywgJ015YW5tYXInLCAnTmFtaWJpYScsICdOYXVydScsICdOZXBhbCcsICdOZXRoZXJsYW5kcycsICdOZXRoZXJsYW5kcyBBbnRpbGxlcycsICdOZXcgQ2FsZWRvbmlhJywgJ05ldyBaZWFsYW5kJywgJ05pY2FyYWd1YScsICdOaWdlcicsICdOaWdlcmlhJywgJ05pdWUnLCAnTm9yZm9sayBJc2xhbmQnLCAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgJ05vcndheScsICdPbWFuJywgJ1Bha2lzdGFuJywgJ1BhbGF1JywgJ1BhbGVzdGluaWFuIFRlcnJpdG9yeSwgT2NjdXBpZWQnLCAnUGFuYW1hJywgJ1BhcHVhIE5ldyBHdWluZWEnLCAnUGFyYWd1YXknLCAnUGVydScsICdQaGlsaXBwaW5lcycsICdQaXRjYWlybicsICdQb2xhbmQnLCAnUG9ydHVnYWwnLCAnUHVlcnRvIFJpY28nLCAnUWF0YXInLCAnUmV1bmlvbicsICdSb21hbmlhJywgJ1J1c3NpYW4gRmVkZXJhdGlvbicsICdSV0FOREEnLCAnU2FpbnQgSGVsZW5hJywgJ1NhaW50IEtpdHRzIGFuZCBOZXZpcycsICdTYWludCBMdWNpYScsICdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJywgJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJywgJ1NhbW9hJywgJ1NhbiBNYXJpbm8nLCAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJywgJ1NhdWRpIEFyYWJpYScsICdTZW5lZ2FsJywgJ1NlcmJpYSBhbmQgTW9udGVuZWdybycsICdTZXljaGVsbGVzJywgJ1NpZXJyYSBMZW9uZScsICdTaW5nYXBvcmUnLCAnU2xvdmFraWEnLCAnU2xvdmVuaWEnLCAnU29sb21vbiBJc2xhbmRzJywgJ1NvbWFsaWEnLCAnU291dGggQWZyaWNhJywgJ1NvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJywgJ1NwYWluJywgJ1NyaSBMYW5rYScsICdTdWRhbicsICdTdXJpbmFtZScsICdTdmFsYmFyZCBhbmQgSmFuIE1heWVuJywgJ1N3YXppbGFuZCcsICdTd2VkZW4nLCAnU3dpdHplcmxhbmQnLCAnU3lyaWFuIEFyYWIgUmVwdWJsaWMnLCAnVGFpd2FuLCBQcm92aW5jZSBvZiBDaGluYScsICdUYWppa2lzdGFuJywgJ1RhbnphbmlhLCBVbml0ZWQgUmVwdWJsaWMgb2YnLCAnVGhhaWxhbmQnLCAnVGltb3ItTGVzdGUnLCAnVG9nbycsICdUb2tlbGF1JywgJ1RvbmdhJywgJ1RyaW5pZGFkIGFuZCBUb2JhZ28nLCAnVHVuaXNpYScsICdUdXJrZXknLCAnVHVya21lbmlzdGFuJywgJ1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcycsICdUdXZhbHUnLCAnVWdhbmRhJywgJ1VrcmFpbmUnLCAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnLCAnVW5pdGVkIEtpbmdkb20nLCAnVW5pdGVkIFN0YXRlcycsICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnLCAnVXJ1Z3VheScsICdVemJla2lzdGFuJywgJ1ZhbnVhdHUnLCAnVmVuZXp1ZWxhJywgJ1ZpZXQgTmFtJywgJ1ZpcmdpbiBJc2xhbmRzLCBCcml0aXNoJywgJ1ZpcmdpbiBJc2xhbmRzLCBVLlMuJywgJ1dhbGxpcyBhbmQgRnV0dW5hJywgJ1dlc3Rlcm4gU2FoYXJhJywgJ1llbWVuJywgJ1phbWJpYScsICdaaW1iYWJ3ZSddO1xuXG4gICAgICAgICRzY29wZS5jb250YWN0VGltZXMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dvcmtpbmcgaG91cnMgKDlhbSB0byA2IHBtKScsIHZhbHVlOiAnOS02J30sXG4gICAgICAgICAgICB7bmFtZTogJ0V2ZW5pbmcgdGltZSAoNmFtIHRvIDkgcG0pJywgdmFsdWU6ICc2LTknfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRSb2xlOiAnZXhwZXJ0JyxcbiAgICAgICAgICAgIGFnZUdhdGU6ICd5ZXMnLFxuICAgICAgICAgICAgY291bnRyeU9yaWdpbjogJ0NoaW5hJyxcbiAgICAgICAgICAgIGNvdW50cnlSZXNpZGVuY2U6ICdDaGluYScsXG4gICAgICAgICAgICBjb250YWN0VGltZTogJycsXG4gICAgICAgICAgICBleHBlcnRpc2VGb3JtOiB7XG4gICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JvcHBlZFRodW1ibmFpbDogbnVsbCxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0gJGF1dGguZ2V0UGF5bG9hZCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcblxuICAgICAgICAkc2NvcGUuY2hhbmdlUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0udG90YWxTdGVwcyA9ICRzY29wZS50b3RhbFN0ZXBzWyRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZV07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSAqIDEwMCwgOTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmdldFByb2dyZXNzSW52ZXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgoKDEgLSAoJHNjb3BlLmZvcm0uY3VycmVudFN0ZXAgLyAkc2NvcGUuZm9ybS50b3RhbFN0ZXBzKSkgKiAxMDApLCA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS50aHVtYm5haWwgPSBudWxsO1xuICAgICAgICAkc2NvcGUuY3JvcHBlZFRodW1ibmFpbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5maWxlTmFtZSA9ICdObyBmaWxlIHNlbGVjdGVkJztcbiAgICAgICAgJHNjb3BlLmltYWdlRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKCd1c2VyJywgZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHVzZXIpID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHVzZXIucmVnaXN0ZXJlZCA9PSAxKSAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0Jyk7XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRhLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZUZpbGVTZWxlY3QgPSBmdW5jdGlvbihldnQsIGRyb3ApIHtcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGV2dC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBldnQuY3VycmVudFRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCBpbWFnZSB0byBjcm9wJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZUVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmZpbGVOYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGh1bWJuYWlsID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkcmFnb3ZlciBkcmFnbGVhdmUgZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZHJhZ2VudGVyJywgJy5pbWctdXBsb2FkLXNob3cnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kcm9wYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RyYWdsZWF2ZScsICcuaW1nLXVwbG9hZC1zaG93JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHJvcGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNmaWxlSW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVGaWxlU2VsZWN0KGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Ryb3AnLCAnLmltZy11cGxvYWQtc2hvdycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUZpbGVTZWxlY3QoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9maWxlcycsXG4gICAgICAgICAgICByZW1vdmVBZnRlclVwbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY29uZmlybUltYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICRzY29wZS5kYXRhLmNyb3BwZWRUaHVtYm5haWw7XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWxlLm5hbWUgPSAndGh1bWJuYWlsXycgKyAkcm9vdFNjb3BlLnVzZXIuaWQgKyAnLnBuZyc7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHthdHRhY2g6ICd0aHVtYm5haWwnfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JtRGF0YS5wdXNoKHt1c2VyX2lkOiAkcm9vdFNjb3BlLnVzZXIuaWR9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmltYWdlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudXBsb2FkZXIub25TdWNjZXNzSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZS5maWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VTdWNjZXNzID0gJ1lvdXIgcHJvZmlsZSBwaWN0dXJlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWQhJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuaW1hZ2VFcnJvciA9ICdQcm9maWxlIHBpY3R1cmUgZmFpbGVkIHRvIHVwbG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci5hZGRUb1F1ZXVlKGRhdGFVUkl0b0Jsb2IoaW1hZ2UpKTtcbiAgICAgICAgICAgICRzY29wZS51cGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRXhwZXJ0IFJlbGF0ZWQgRnVuY3Rpb25zXG5cbiAgICAgICAgJHNjb3BlLmFsbFNraWxscyA9ICRyZXNvdXJjZSgnYXBpL3NraWxscycpLnF1ZXJ5KCk7XG5cbiAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCl7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwZXJ0aXNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgICAgIHNraWxsc0xpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdGhlckV4cGVydGlzZUNhdGVnb3J5OiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnk6IHtuYW1lOiAnJywgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFeHBlcnRpc2U6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXhwZXJ0aXNlOiB7bmFtZTogJycsIHN0YXR1czogMH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGxzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJTa2lsbHM6IHtsaXN0OiBbXSwgc3RhdHVzOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZWxlY3RFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2VDYXRlZ29yeSwgbGV2ZWwpe1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VDYXRlZ29yeSA9IGV4cGVydGlzZUNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgICRzY29wZS5mZXRjaEV4cGVydGlzZVN1YkNhdGVnb3J5KGluZGV4KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBleHBlcnRpc2VDYXRlZ29yeTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdEV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oZSwgaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNhdmVPdGhlckV4cGVydGlzZUNhdGVnb3J5ID0gZnVuY3Rpb24oaW5kZXgsIGxldmVsKXtcbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlQ2F0ZWdvcnkuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gMjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5LnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc3RlcCA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2VDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4LCBsZXZlbCl7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZUNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJFeHBlcnRpc2UgPSB7bmFtZTogJycsIHN0YXR1czogMH07XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZVN1YkNhdGVnb3J5ID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlID0ge25hbWU6ICcnLCBzdGF0dXM6IDB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdEV4cGVydGlzZSA9IGZ1bmN0aW9uKGluZGV4LCBleHBlcnRpc2Upe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBleHBlcnRpc2U7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnN0ZXAgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLmZldGNoU2tpbGxzTGlzdChpbmRleCk7XG4gICAgICAgICAgICBhZGROZXdJbnB1dHRlZEV4cGVydGlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0RXhwZXJ0aXNlID0gZnVuY3Rpb24oZSwgaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRFeHBlcnRpc2UgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMgPSBbXTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zYXZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZSA9IG51bGw7XG4gICAgICAgICAgICAvLyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gW107XG5cbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyRXhwZXJ0aXNlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgICAgIGFkZE5ld0lucHV0dGVkRXhwZXJ0aXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUucmVtb3ZlT3RoZXJFeHBlcnRpc2UgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlckV4cGVydGlzZSA9IHtuYW1lOiAnJywgc3RhdHVzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5pblNraWxscyA9IGZ1bmN0aW9uKGluZGV4LCBza2lsbCl7XG4gICAgICAgICAgICB2YXIgZm91bmRTa2lsbCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzLCB7aWQ6IHNraWxsLmlkfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZm91bmRTa2lsbCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kU2tpbGwubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdFNraWxsID0gZnVuY3Rpb24oaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgIGlmKCEkc2NvcGUuaW5Ta2lsbHMoaW5kZXgsIHNraWxsKSl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMucHVzaChza2lsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zdGVwID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5kZXNlbGVjdFNraWxsID0gZnVuY3Rpb24oZSwgaW5kZXgsIHNraWxsKXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkU2tpbGxzID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2VsZWN0ZWRTa2lsbHMsIHtpZDogc2tpbGwuaWR9LCBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFuZ3VsYXIuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2F2ZVNraWxscyA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ub3RoZXJTa2lsbHMubGlzdCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5vdGhlclNraWxscy5saXN0KTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLm90aGVyU2tpbGxzID0ge2xpc3Q6IFtdLCBzdGF0dXM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmZldGNoRXhwZXJ0aXNlQ2F0ZWdvcnkgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LzAnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VTdWJDYXRlZ29yeSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5leHBlcnRpc2VTdWJDYXRlZ29yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZXhwZXJ0aXNlLWNhdGVnb3J5LycgKyAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZEV4cGVydGlzZUNhdGVnb3J5LmlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlU3ViQ2F0ZWdvcnlMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hFeHBlcnRpc2VMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uZXhwZXJ0aXNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvY2F0ZWdvcnkvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlU3ViQ2F0ZWdvcnkuaWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5leHBlcnRpc2VMaXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZmV0Y2hTa2lsbHNMaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0uc2tpbGxzTGlzdCA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmlucHV0dGVkRXhwZXJ0aXNlTGlzdFtpbmRleF0ubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9leHBlcnRpc2UvJyArICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNlbGVjdGVkRXhwZXJ0aXNlLmlkICsgJy9za2lsbHMvJykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLnNraWxsc0xpc3QgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5wdXR0ZWRFeHBlcnRpc2VMaXN0W2luZGV4XS5zZWxlY3RlZFNraWxscyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICRzY29wZS5pbnB1dHRlZEV4cGVydGlzZUxpc3RbaW5kZXhdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTmV3SW5wdXR0ZWRFeHBlcnRpc2UoKVxuXG4gICAgICAgIC8vIEV4cGVydCBSZWxhdGVkIEZ1bmN0aW9uc1xuXG4gICAgICAgICRzY29wZS5zdWJtaXREZXRhaWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUuZGF0YS5mbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICRzY29wZS5kYXRhLmxuYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSxcbiAgICAgICAgICAgICAgICBhZ2VfZ2F0ZTogJHNjb3BlLmRhdGEuYWdlR2F0ZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5X29yaWdpbjogJHNjb3BlLmRhdGEuY291bnRyeU9yaWdpbixcbiAgICAgICAgICAgICAgICBjb3VudHJ5X3Jlc2lkZW5jZTogJHNjb3BlLmRhdGEuY291bnRyeVJlc2lkZW5jZSxcbiAgICAgICAgICAgICAgICBjb250YWN0X251bWJlcjogJHNjb3BlLmRhdGEuY29udGFjdE51bWJlcixcbiAgICAgICAgICAgICAgICBjb250YWN0X3RpbWU6ICRzY29wZS5kYXRhLmNvbnRhY3RUaW1lLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2goJHNjb3BlLmRhdGEuc2VsZWN0ZWRSb2xlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZlc3Rvcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlc3RtZW50QnVkZ2V0ID09PSAnb3RoZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlc3RtZW50QnVkZ2V0ID0gJHNjb3BlLmRhdGEuc2VsZWN0ZWRJbnZlc3RtZW50QnVkZ2V0T3RoZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuaW52ZXN0b3IuaW52ZXN0bWVudF9idWRnZXQgPSBpbnZlc3RtZW50QnVkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X2dvYWwgPSAkc2NvcGUuZGF0YS5zZWxlY3RlZEludmVzdG1lbnRHb2FsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5pbnZlc3Rvci5pbnZlc3RtZW50X3JlYXNvbiA9ICRzY29wZS5kYXRhLnNlbGVjdGVkSW52ZXN0bWVudFJlYXNvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEuY3JlYXRvciA9IHt9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXJ0TG9hZGluZycpO1xuICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblxuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL3VzZXJzLycgKyAkcm9vdFNjb3BlLnVzZXIuaWQsIHVzZXJEYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhID09PSAnVXBkYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLm5hbWUgPSAkc2NvcGUuZGF0YS5mbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLmxhc3RfbmFtZSA9ICRzY29wZS5kYXRhLmxuYW1lO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIucm9sZSA9ICRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyLnJlZ2lzdGVyZWQgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNvbnRlc3QnLCB7cm9sZTogYW5ndWxhci5jb3B5KCRzY29wZS5kYXRhLnNlbGVjdGVkUm9sZSl9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgJHNjb3BlLmNvbnRlc3RzID0gW107XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgdmFyIENvbnRlc3QgPSAkcmVzb3VyY2UoJy9hcGkvY29udGVzdHMvOmNvbnRlc3RJZCcsIHtcbiAgICAgICAgICAgIGNvbnRlc3RJZDogJ0BpZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVzdC5xdWVyeSgpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdHMgPSByZXN1bHQ7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0b3BMb2FkaW5nJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnZmRFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLmZkRW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2Z1bmRhdG9yLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQ29udGVzdFNpbmdsZUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcmVzb3VyY2UsICRmaWx0ZXIsICR3aW5kb3csICR0aW1lb3V0KSB7XG4gICAgICAgICRzY29wZS5jb250ZXN0SWQgPSAkc3RhdGVQYXJhbXMuY29udGVzdElkO1xuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50cnk6IG51bGwsXG4gICAgICAgICAgICByYXRpbmc6IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0aXZpdHk6ICcnLFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICcnLFxuICAgICAgICAgICAgICAgIG1hcmtldDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgQ29udGVzdCA9ICRyZXNvdXJjZSgnL2FwaS9jb250ZXN0cy86Y29udGVzdElkJywge1xuICAgICAgICAgICAgY29udGVzdElkOiAnQGlkJ1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnkgPSAkcmVzb3VyY2UoJy9hcGkvZW50cmllcy86ZW50cnlJZCcsIHtcbiAgICAgICAgICAgIGVudHJ5SWQ6ICdAaWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGp1ZGdlRW50cmllczoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzL2NvbnRlc3QvOmNvbnRlc3RJZC9qdWRnZS86anVkZ2VJZCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9lbnRyaWVzLzplbnRyeUlkL21lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgRW50cnlSYXRpbmcgPSAkcmVzb3VyY2UoJy9hcGkvZW50cnktcmF0aW5ncy86ZW50cnlSYXRpbmdJZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbnRyeVJhdGluZ0lkOiAnQGlkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhcnRMb2FkaW5nJyk7XG5cbiAgICAgICAgQ29udGVzdC5nZXQoe1xuICAgICAgICAgICAgY29udGVzdElkOiAkc2NvcGUuY29udGVzdElkXG4gICAgICAgIH0pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkc2NvcGUuY29udGVzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgdmFyIGp1ZGdlYWJsZSA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRyb290U2NvcGUudXNlci5qdWRnaW5nLCB7XG4gICAgICAgICAgICAgICAgaWQ6ICRzY29wZS5jb250ZXN0SWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGp1ZGdlYWJsZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGp1ZGdlYWJsZS5sZW5ndGggPiAwICYmICRzdGF0ZVBhcmFtcy5yb2xlICE9PSAnanVyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMuanVyeVZpZXcuc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2hOb3RpY2VzLmp1cnlWaWV3LmNvbnRlc3RJZCA9IHJlc3VsdC5pZDtcblxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5Vmlldy5vbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jb250ZXN0c2luZ2xlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICdqdXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IHJlc3VsdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCRzdGF0ZVBhcmFtcy5yb2xlID09PSAnanVyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgRW50cnkuanVkZ2VFbnRyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogJHNjb3BlLmNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlSWQ6ICRyb290U2NvcGUudXNlci5pZFxuICAgICAgICAgICAgICAgICAgICB9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGVzdC5lbnRyaWVzID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdG9wTG9hZGluZycpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zZWxlY3RFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICB2YXIgcmF0aW5nID0gYW5ndWxhci5jb3B5KCRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nKTtcblxuICAgICAgICAgICAgRW50cnkuZ2V0KHtcbiAgICAgICAgICAgICAgICBlbnRyeUlkOiBlbnRyeS5pZFxuICAgICAgICAgICAgfSkuJHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nID0gcmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXRib3gnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDEwMDAwfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyBtZXNzYWdlJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kKTtcblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICRzY29wZS5kYXRhLm1lc3NhZ2VUb1NlbmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIEVudHJ5LnNlbmRNZXNzYWdlKHtlbnRyeUlkOiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LmlkfSwgbWVzc2FnZVJlcXVlc3QsIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2VsZWN0ZWRFbnRyeS5tZXNzYWdlcy5wdXNoKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5tZXNzYWdlVG9TZW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2hhdGJveCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMTAwMDB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNhdmVNYXJrcyA9IGZ1bmN0aW9uKGVudHJ5UmF0aW5nSWQpe1xuICAgICAgICAgICAgJHNjb3BlLmRhdGEuc2F2aW5nTWFya3MgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlZFJhdGluZyA9IHtcbiAgICAgICAgICAgICAgICBkZXNpZ246ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmRlc2lnbixcbiAgICAgICAgICAgICAgICBjcmVhdGl2aXR5OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5jcmVhdGl2aXR5LFxuICAgICAgICAgICAgICAgIGluZHVzdHJpYWw6ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkucmF0aW5nLmluZHVzdHJpYWwsXG4gICAgICAgICAgICAgICAgbWFya2V0OiAkc2NvcGUuZGF0YS5zZWxlY3RlZEVudHJ5LnJhdGluZy5tYXJrZXQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVkUmF0aW5nLmp1ZGdlX2lkID0gJHJvb3RTY29wZS51c2VyLmlkO1xuICAgICAgICAgICAgdXBkYXRlZFJhdGluZy5lbnRyeV9pZCA9ICRzY29wZS5kYXRhLnNlbGVjdGVkRW50cnkuaWQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoZW50cnlSYXRpbmdJZCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgRW50cnlSYXRpbmcudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlSYXRpbmdJZDogZW50cnlSYXRpbmdJZFxuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZWRSYXRpbmcpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IHJhdGluZyBzYXZlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlSYXRpbmcgPSBuZXcgRW50cnlSYXRpbmcodXBkYXRlZFJhdGluZyk7XG4gICAgICAgICAgICAgICAgZW50cnlSYXRpbmcuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSByYXRpbmcgY3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnNhdmluZ01hcmtzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zYXZlZE1hcmtzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ZsYXNoTm90aWNlQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgJHJvb3RTY29wZS5mbGFzaE5vdGljZXMgPSB7fTtcblxuICAgICAgICAkcm9vdFNjb3BlLmZsYXNoTm90aWNlcy5qdXJ5VmlldyA9IHtcbiAgICAgICAgXHRzaG93OiBmYWxzZSxcbiAgICAgICAgXHRjb250ZXN0SWQ6IDAsXG4gICAgICAgIFx0b25DbGljazogZnVuY3Rpb24oKXt9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRhdXRoKSB7XG5cblxuXG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdOYXZpZ2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkYXV0aCkge1xuXG4gICAgICAgIC8vIExvZ291dFxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhY3R1YWxseSBsb2dnaW5nIG91dCEgLi4uJyk7XG4gICAgICAgICAgICAkYXV0aC5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmdW5kYXRvcl90b2tlbicpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUudXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTmF2U2hvd24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmxvZ2luJywge30sIHtyZWxvYWQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRodHRwLCAkd2luZG93KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIb21lIFZpZXcgU3RhcnRlZCcpO1xuXG4gICAgICAgIC8vIFJlZGlyZWN0IHRvIGNvbnRlc3RcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuY29udGVzdCcpO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0ludmVzdEN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZSwgJHJlc291cmNlLCAkd2luZG93KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnZlc3QgU3RhcnRlZCcpO1xuICAgICAgICAkd2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG4gICAgICAgICRzY29wZS5pbnZlc3RvcnMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ0FsYWluIDxicj4gQW1vcmV0dGknLCBjb3VudHJ5OiAnRnJhbmNlJywgaW1hZ2U6ICcxLmpwZyd9LFxuICAgICAgICAgICAge25hbWU6ICdDaGFybGVzIGRcXCdhbnRlcnJvY2hlcycsIGNvdW50cnk6ICdGcmFuY2UnLCBpbWFnZTogJzIuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NocmlzdG9waGUgQnJpc3NpYXVkJywgY291bnRyeTogJ0NoaW5hJywgaW1hZ2U6ICczLmpwZyd9LFxuICAgICAgICAgICAge25hbWU6ICdKZWFuLUJlcm5hcmQgQW50b2luZScsIGNvdW50cnk6ICdDaGluYScsIGltYWdlOiAnNC5qcGVnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ1hhdmllciA8YnI+IFBhdWxpbicsIGNvdW50cnk6ICdUYWl3YW4nLCBpbWFnZTogJzUuanBnJ30sXG4gICAgICAgICAgICB7bmFtZTogJ0NpbmR5IDxicj4gQ2h1bmcnLCBjb3VudHJ5OiAnSG9uZyBLb25nJywgaW1hZ2U6ICc2LmpwZyd9XG4gICAgICAgIF07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpLmZpbHRlcigndHJ1c3RlZEh0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnZnVuZGF0b3IuZGlyZWN0aXZlcycpXG5cbiAgICAuZGlyZWN0aXZlKCdmZENoYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjYW52YXMgaWQ9XCJmZENoYXJ0XCIgd2lkdGg9XCJ7e3dpZHRofX1cIiBoZWlnaHQ9XCJ7e2hlaWdodH19XCI+PC9jYW52YXM+JyxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS53aWR0aCA9ICRhdHRycy53aWR0aDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGVpZ2h0ID0gJGF0dHJzLmhlaWdodDtcblxuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnY2FudmFzJykud2lkdGgoJGF0dHJzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5oZWlnaHQoJGF0dHJzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGllRGF0YUEgPSBbe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzAwNjgzN1wiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiIzAyNzUzZlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdWJsaWNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDk2LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjOTRjNDRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjOGNiYTQ3XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZ1bmRhdG9yXCJcbiAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lRGF0YUEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGxhbm5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNBNkE4QUJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcIiMwMDY4MzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDYwLCA1OSwgNjMsIDU5LCA1OCwgNjMsIDY0LCA2NSwgNjYsIDcwLCA3OV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVhbGl6ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQTZBOEFCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCIjOTNDNjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCAyMiwgMTYsIDIxLCAxNywgMjAsIDI3LCAyNSwgMjMsIDMyLCA0MCwgNDVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYoJGF0dHJzLmRhdGEgPT09ICdBJyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKHBpZURhdGFBLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGUgOiBcIjx1bCBjbGFzcz1cXFwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXFxcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOjwlPXNlZ21lbnRzW2ldLmZpbGxDb2xvciU+XFxcIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdjYW52YXMnKS5hZnRlcignPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHBpZURhdGFBKS5lYWNoKGZ1bmN0aW9uKGksIHRoZV9pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKFwiY2FudmFzICsgLnBpZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cInBpZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyt0aGVfaXRlbS5jb2xvcisnO1wiPjwvc3Bhbj4gJyt0aGVfaXRlbS52YWx1ZSsnJSAnK3RoZV9pdGVtLmxhYmVsKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSAkZWxlbWVudC5maW5kKCdjYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZENoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuTGluZShsaW5lRGF0YUEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZSA6IFwiPHVsIGNsYXNzPVxcXCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcXFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cXFwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2NhbnZhcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImNhbnZhcyArIC5saW5lLWNoYXJ0LWxhYmVsc1wiKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibGluZS1jaGFydC1sYWJlbFwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzAwNjgzNztcIj48L3NwYW4+IFJlYWxpemVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZpbmQoXCJjYW52YXMgKyAubGluZS1jaGFydC1sYWJlbHNcIikucHJlcGVuZCgnPGRpdiBjbGFzcz1cImxpbmUtY2hhcnQtbGFiZWxcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM5M0M2NTg7XCI+PC9zcGFuPiBQbGFubmVkPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdmdW5kYXRvci5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1BhZ2VDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJGh0dHAsICR3aW5kb3cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1BhZ2UgVmlldyBTdGFydGVkJyk7XG5cbiAgICAgICAgJHNjb3BlLnBhZ2UgPSB7XG4gICAgICAgIFx0dGl0bGU6ICcnLFxuICAgICAgICBcdGNvbnRlbnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGFydExvYWRpbmcnKTtcbiAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3BhZ2VzLycgKyAkc3RhdGVQYXJhbXMuc2x1ZykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICBcdGNvbnNvbGUubG9nKCdTdWNjZXNzJyk7XG4gICAgICAgIFx0Y29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgXHQkc2NvcGUucGFnZSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG5cdFx0XHRjb25zb2xlLmxvZygnRXJyb3InKTtcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblxuXHRcdFx0aWYgKGVycm9yLnN0YXR1cyA9PSAnNDA0Jykge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnbG9hZCA0MDQnKVxuXHRcdFx0fTtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgICBcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RvcExvYWRpbmcnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
