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

})();
