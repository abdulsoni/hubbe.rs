(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ProjectsCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $http, $timeout, $filter, API) {
        $rootScope.$broadcast('stopLoading');

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

        Project.query().$promise.then(function(result) {
            if ($rootScope.activeRole === 'creator') {
                $scope.projects = result.ongoing;
                $scope.draftProjects = result.draft;

            }else if ($rootScope.activeRole === 'expert') {}{
                $scope.ongoingTasks = result.ongoing;
                $scope.ongoingBids = result.bids;
                $scope.availableExpertise = result.available;
                $scope.matchingExpertise = result.matching;
                $scope.expertiseSource = $scope.availableExpertise;
            }
        }).finally(function(){
            $timeout(function() {
                $scope.sectionLoading = false;
            }, 1000);
        });

    });

})();
