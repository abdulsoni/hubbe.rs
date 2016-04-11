(function() {
    "use strict";

    angular.module('fundator.controllers').controller('CreateCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $timeout, $filter, FdScroller) {
        console.log('Create Started');
        // $rootScope.$broadcast('startLoading');

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
                        case 4:
                            $state.go('app.create.experts', { projectId: projectId });
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
    });

    angular.module('fundator.controllers').controller('CreateSECtrl', function($rootScope, $scope, $state, $http, $timeout, FdScroller) {
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
    });

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', function($rootScope, $scope, $state, $resource, $http, FdScroller) {
        console.log('CreateExpertiseCtrl Started');

        $scope.inputtedExpertiseList = [];
        $scope.expertiseList = [];

        var ProjectExpertise = $resource('/api/projects/:projectId/expertise', {
            projectId: '@id'
        });


        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.$broadcast('stopLoading');
            });
        }

        $scope.$watch('project', function(project){
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

        $scope.saveExpertiseSelection = function(){
            $scope.project.state = 4;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $state.go('app.create.expertise');
            }, 300);

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
    });

    angular.module('fundator.controllers').controller('CreateExpertCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateExpertCtrl Started');

        $scope.data = {};

        var ProjectExpertise = $resource('/api/projects/:projectId/expertise', {
            projectId: '@id'
        });

        $scope.fetchExpertise = function(){
            ProjectExpertise.query({projectId: $scope.project.id}).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.$broadcast('stopLoading');
            });
        }

        $scope.$watch('project', function(project){
            if (typeof(project) === 'undefined' || project === null) return;
            $scope.fetchExpertise();
        });

        $scope.shortlistExpert = function(expertise, bid){
            if (typeof(expertise.shortlist) === 'undefined') {
                expertise.shortlist = [];
            }

            expertise.shortlist.push(bid);
        }

        $scope.discussExpert = function(expertise, bid){
            $scope.data.selectedBid = bid
        }

    });

    angular.module('fundator.controllers').controller('CreateBudgetCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateBudgetCtrl Started');
    });

    angular.module('fundator.controllers').controller('CreateInvestorsCtrl', function($rootScope, $scope, $state, $resource) {
        console.log('CreateInvestorsCtrl Started');
    });
})();
