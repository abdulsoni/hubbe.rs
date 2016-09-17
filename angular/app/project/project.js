(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ProjectsCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $scope.projects = [];
        $scope.sectionLoading = true;

        var Project = $resource(API.path('projects/:projectId'), {
            projectId: '@id'
        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
        Project.query({fd_active_role: $rootScope.activeRole}).$promise.then(function(result) {
            
            if ($rootScope.activeRole === 'creator') {
                $scope.projects = result.ongoing;
                $scope.draftProjects = result.draft;

            }else if ($rootScope.activeRole === 'expert') {
                $scope.ongoingTasks = result.ongoing;
                $scope.ongoingBids = result.bids;
                $scope.availableExpertise = result.available;
                $scope.matchingExpertise = result.matching;
                $scope.expertiseSource = $scope.availableExpertise;
            }else if ($rootScope.activeRole === 'investor') {
                console.log('investable projects');
                console.log(result);
                $scope.ongoingProjects = result.ongoing;
                $scope.investableProjects = result.investable;
            }
        }).finally(function(){
            $timeout(function() {
                $scope.sectionLoading = false;
            }, 1000);
        });

        $scope.createNewProject = function() {
            $scope.data.newProjectLoading = true;

            var newProject = new Project().$save().then(function(result) {
                $scope.goToProject(result);
                $scope.data.newProjectLoading = false;
            });
        }

        $scope.goToProject = function(project) {
            $state.go('app.create.details', { projectId: project.id });
        }
    });

    angular.module('fundator.controllers').controller('ProjectCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $scope.project = null;
        $scope.sectionLoading = true;

        $scope.sections = [
            {
                title: 'PROJECT DETAILS',
                state: 'app.project.details'
            },
            {
                title: 'PUBLIC BOARD',
                state: 'app.project.board'
            },
            {
                title: 'TEAM',
                state: 'app.project.team'
            }
        ];

        $scope.goToSection = function(state){
            $state.go(state);
        }

        var Project = $resource(API.path('projects/:projectId'), {
            projectId: '@id'
        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });

        Project.get({projectId: $stateParams.projectId, fd_active_role: $rootScope.activeRole}).$promise.then(function(result) {
            $scope.project = result;
        }).finally(function(){
            $timeout(function() {
                $scope.sectionLoading = false;
            }, 1000);
        });
    });

    angular.module('fundator.controllers').controller('ProjectDetailsCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $rootScope.innerSectionLoading = true;

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $scope.details = project;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });
    });

    angular.module('fundator.controllers').controller('ProjectTaskCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $rootScope.innerSectionLoading = true;

        $scope.$watch('project', function(project) {
            if (project !== null) {
                console.log('got in now!');
                $scope.myTasks = project.tasks;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });
    });

    angular.module('fundator.controllers').controller('ProjectTeamCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $rootScope.innerSectionLoading = true;

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $scope.details = project;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });
    });

    angular.module('fundator.controllers').controller('ProjectProgressCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $rootScope.innerSectionLoading = true;

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $scope.details = project;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });
    });

    angular.module('fundator.controllers').controller('ProjectBoardCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');
        $scope.data = {};

        $rootScope.innerSectionLoading = true;

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $scope.details = project;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });
    });
})();
