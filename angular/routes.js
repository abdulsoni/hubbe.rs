(function() {
    "use strict";

    angular.module('fundator.routes').config(function($stateProvider, $urlRouterProvider) {

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

    });

})();
