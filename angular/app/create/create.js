(function() {
    "use strict";

    angular.module('fundator.controllers').controller('CreateCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $timeout, $filter, FdScroller) {
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
        var matchingRoles = $filter('filter')($rootScope.user.user_roles, {role: requiredRole}, true);

        if (typeof(matchingRoles) !== 'undefined' && matchingRoles.length > 0) {
            var matchingRole = matchingRoles[0];

            if($rootScope.activeRole !== requiredRole){
                $rootScope.switchUserRole(requiredRole, matchingRole.id, true);
            }

            var projectId = parseInt($stateParams.projectId);

            if (typeof(projectId) === 'undefined' || isNaN(projectId)) {
                Project.query().$promise.then(function(result){
                    $scope.allProjects = result;
                }).finally(function(){
                    $rootScope.$broadcast('stopLoading');
                });
            }else if(angular.isNumber(projectId) && isFinite(projectId)){
                Project.get({projectId: projectId}).$promise.then(function(result){
                    $scope.project = result;

                    switch(result.state){
                        case 0: $state.go('app.create.details', {projectId: projectId});
                        break;
                        case 1: $state.go('app.create.details', {projectId: projectId});
                        break;
                        case 2: $state.go('app.create.superexpert', {projectId: projectId});
                        break;
                        case 3: $state.go('app.create.expertise', {projectId: projectId});
                        break;
                        default: $state.go('app.create.details', {projectId: projectId});
                    }
                }).finally(function(){
                    $rootScope.$broadcast('stopLoading');
                });
            }else{
                console.log('Make up your mind you peice of shit');
            }
        }else{
            $timeout(function(){
                $rootScope.$broadcast('stopLoading');
                $state.go('app.home');
            }, 2000);
        }

        $scope.goToProject = function(project) {
            $state.go('app.create.details', {projectId: project.id});
        }

        $scope.createNewProject = function() {
            $scope.data.newProjectLoading = true;

            var newProject = new Project().$save().then(function(result){
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
    });

    angular.module('fundator.controllers').controller('CreateDetailsCtrl', function($rootScope, $scope, $state, $stateParams, $resource, FdScroller) {
        console.log('CreateDetailsCtrl Started');

        $scope.data = {
            featuredImage: {}
        };

        $scope.details = {
            name: '',
            geography: 'wherever'
        };

        $scope.$watch('project', function(project){
            if (project !== null) {
                $rootScope.$broadcast('stopLoading');
                $scope.details = project;
            }else{
                console.log('project still loading');
            }
        });

        $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
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
            console.log($file);

            console.log('Adding files : ' + message.file.id);

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
    });

    angular.module('fundator.controllers').controller('CreateSECtrl', function($rootScope, $scope, $state, $http, $timeout, FdScroller) {
        console.log('CreateSECtrl Started');

        $http.get('/api/super-experts').then(function(result){
            console.log('sups');
            console.log(result);
            $scope.superExperts = result.data;
        });

        $scope.chooseSuperExpert = function(superExpert){
            $scope.project.super_expert_id = superExpert.id;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function(){
                $state.go('app.create.expertise');
            }, 300);
        }
    });

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertiseCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateExpertCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateBudgetCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateBudgetCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateInvestorsCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateInvestorsCtrl Started');
    });
})();