(function() {
    "use strict";

    angular.module('fundator.controllers').controller('CreateCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $timeout, $filter, FdScroller, API) {
        $rootScope.$broadcast('stopLoading');
        $rootScope.sectionLoading = true;
        $rootScope.innerSectionLoading = false;

        // Available Views : List, Create
        $scope.project = null;
        $scope.view = 'list';
        $scope.data = {
            newProjectLoading: false
        };

        // Fetch basic product categories
        $scope.productCategories = [];
        $scope.innovationCategories = [];

        var Category = $resource(API.path('categories/:type/:categoryId'), {
            categoryId: '@id'
        });

        $scope.fetchCategories = function() {
            Category.query({ type: 'product' }).$promise.then(function(result) {
                $scope.productCategories = result;
                console.log('product categories : ' + result);
            }, function() {
                console.log('failed to retrive the product cateories');
            });

            Category.query({ type: 'innovation' }).$promise.then(function(result) {
                $scope.innovationCategories = result;
                console.log('innovation categories : ' + result);
            }, function() {
                console.log('failed to retrive the innovation cateories');
            });
        };

        $scope.fetchCategories();

        $scope.steps = [{
            title: 'Your Project',
            progress: 0,
            isOpen: false,
            ongoing: false,
            state: 'app.create.details',
            body: '<h3>Great!</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
        }, {
            title: 'Meet your Super Expert',
            progress: 0,
            isOpen: false,
            ongoing: false,
            state: 'app.create.superexpert',
            body: '<h3>Expertise you need</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
        }, {
            title: 'Expertise you need',
            progress: 0,
            isOpen: false,
            ongoing: false,
            state: 'app.create.expertise',
            body: '<h3>Expertise you need</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
        }, {
            title: 'Experts on your team',
            progress: 0,
            isOpen: false,
            ongoing: false,
            state: 'app.create.experts',
            body: '<h3>Experts on your team</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
        }, {
            title: 'Validate the budget',
            progress: 0,
            isOpen: false,
            ongoing: false,
            state: 'app.create.budget',
            body: '<h3>Validate the budget</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
        }, {
            title: 'Your investors',
            progress: 0,
            isOpen: false,
            ongoing: false,
            state: 'app.create.investors',
            body: '<h3>Your Investor</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
        }];

        $scope.$watch('steps', function(steps) {
            angular.forEach(steps, function(step) {
                if (step.isOpen) {
                    $state.go(step.state);
                    FdScroller.toSection('#projectSteps');
                }
            });
        }, true);

        $scope.$watch('project', function(project) {
            if (typeof(project) === 'undefined' || project === null) return;

            var flooredState = Math.floor($scope.project.state);
            var remainingState = $scope.project.state - flooredState;

            for (var i = 0; i < flooredState; i++) {
                $scope.steps[i].progress = 1;
            }

            $scope.steps[flooredState].ongoing = true;
            $scope.steps[flooredState].isOpen = true;
            $scope.steps[flooredState].progress = remainingState;
        }, true);

        var Project = $resource(API.path('projects/:projectId'), {
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
            console.log('getting stuff');

            if (typeof(projectId) === 'undefined' || isNaN(projectId)) {
                console.log('getting draft_only');
                Project.query({ 'draft_only': 1, 'fd_active_role': $rootScope.activeRole }).$promise.then(function(result) {
                    $scope.allProjects = result;
                }).finally(function() {
                    $rootScope.sectionLoading = false;
                });
            } else if (angular.isNumber(projectId) && isFinite(projectId)) {
                Project.get({ projectId: projectId, fd_active_role: $rootScope.activeRole }).$promise.then(function(result) {
                    $scope.project = result;
                }).finally(function() {
                    $rootScope.sectionLoading = false;
                    $rootScope.innerSectionLoading = true;
                });
            }
        } else {
            $timeout(function() {
                $rootScope.sectionLoading = false;
                $state.go('app.projects');
            }, 2000);
        }

        $scope.goToProject = function(project) {
            $state.go('app.create.details', { projectId: project.id });
        };

        $scope.createNewProject = function() {
            $scope.data.newProjectLoading = true;

            var newProject = new Project().$save().then(function(result) {
                $scope.goToProject(result);
                $scope.data.newProjectLoading = false;
            });
        };

        $scope.saveProgress = function() {
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
        };

        // Scroll to the top
        FdScroller.toTop();
    });

    angular.module('fundator.controllers').controller('CreateDetailsCtrl', function($rootScope, $scope, $state, $stateParams, $resource, FdScroller) {
        $scope.data = {
            featuredImage: {},
            datepicker: {
                isOpen: false
            }
        };

        $scope.details = {
            name: '',
            geography: 'wherever'
        };

        $scope.languages = [
            'English',
            'Chinese',
            'French',
            'Korean'
        ];


        $scope.countries = [
            { code: 'us', name: 'United States' },
            { code: 'cn', name: 'China' },
            { code: 'fr', name: 'France' },
            { code: 'kr', name: 'South Korea' },
        ];

        $scope.tagTransform = function(newTag) {
            var item = {
                name: newTag
            };

            return item;
        };

        $scope.$watch('project', function(project) {
            if (project !== null) {
                $scope.details = project;
                $rootScope.innerSectionLoading = false;
            } else {
                console.log('project still loading');
            }
        });

        $scope.$on('flow::fileAdded', function(event, $flow, flowFile) {
            event.preventDefault();
        });

        $scope.featuredImageSuccess = function($file, $message) {
            var message = JSON.parse($message);
            $scope.project.thumbnail_id = message.file.id;
            $scope.project.thumbnail = message.file.file_url;
            $scope.saveProgress();
        };

        $scope.attachedFilesSuccess = function($file, $message) {
            var message = JSON.parse($message);
            var index = $scope.project.attachedFiles.indexOf(message.file.id);

            if (index === -1) {
                $scope.project.attachedFiles.push(message.file.id);
            }
        };

        $scope.submitDraft = function() {
            $scope.project.state = 0.9;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');
        };

        FdScroller.toSection('#projectSteps');
    });

    angular.module('fundator.controllers').controller('CreateSECtrl', function($rootScope, $scope, $state, $http, $timeout, FdScroller, API) {
        console.log('CreateSECtrl Started');

        $http.get(API.path('super-experts')).then(function(result) {
            $scope.superExperts = result.data;
            console.log($scope.superExperts);
            // alert('Super Experts Data')
        }).finally(function() {
            $rootScope.innerSectionLoading = false;
        });

        $scope.chooseSuperExpert = function(superExpert) {
            console.log($scope.project);
            $scope.project.super_expert_id = superExpert.id;
            $scope.saveProgress();
            FdScroller.toSection('.steps-content');

            $timeout(function() {
                $state.go('app.create.expertise');
            }, 300);
        };
    });

    angular.module('fundator.controllers').controller('CreateExpertiseCtrl', function($rootScope, $scope, $state, $resource, $http, $timeout, FdScroller, API) {
        console.log('CreateExpertiseCtrl Started');
        $rootScope.innerSectionLoading = true;

        $scope.inputtedExpertiseList = [];
        $scope.expertiseList = [];
        $scope.inputtedEpxertise = null;
        $scope.savingExpertise = false;
        $scope.loadedOnce = false;

        var ProjectExpertise = $resource(API.path('/projects/:projectId/expertise'), {
            projectId: '@id'
        });

        $scope.fetchExpertise = function() {
            ProjectExpertise.query({ projectId: $scope.project.id }).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.innerSectionLoading = false;
                $scope.loadedOnce = true;
            });
        };

        $scope.$watch('project', function(project) {
            if (typeof(project) === 'undefined' || project === null) return;
            $scope.fetchExpertise();
        });

        $scope.saveExpertise = function(expertise) {
            $scope.savingExpertise = true;

            var projectExpertiseData = {
                'task': expertise.mainTask,
                'budget': expertise.budget,
                'lead_time': expertise.leadTime,
                'start_date': expertise.startDate
            };

            if (expertise.selectedExpertise !== null) {
                projectExpertiseData.expertise_id = expertise.selectedExpertise.id;
            } else {
                projectExpertiseData.other_expertise = expertise.otherExpertise;
            }

            if (expertise.selectedExpertiseSubCategory !== null) {
                projectExpertiseData.expertise_sub_category_id = expertise.selectedExpertiseSubCategory.id;
            } else {
                projectExpertiseData.other_expertise_sub_category = expertise.otherExpertiseSubCategory;
            }

            if (expertise.selectedExpertiseCategory !== null) {
                projectExpertiseData.expertise_category_id = expertise.selectedExpertiseCategory.id;
            } else {
                projectExpertiseData.other_expertise_category = expertise.otherExpertiseCategory;
            }


            $http.post(API.path('/projects/') + $scope.project.id + '/expertise', projectExpertiseData).then(function(result) {
                console.log(result.data);
                $scope.expertiseList.push(result.data);
            }).finally(function() {
                $scope.savingExpertise = false;
            });

            $scope.inputtedExpertiseList = [];
            $scope.inputtedEpxertise = null;
        };

        $scope.saveExpertiseSelection = function() {
            $scope.project.state = 2.9;

            $scope.saveProgress();
            FdScroller.toSection('.steps-content');
        };

        $scope.addNewInputtedExpertise = function() {
            var lastInputtedExpertise = { selectedExpertise: 'null', otherExpertise: { status: 1 } };

            // if ($scope.inputtedExpertiseList.length > 0) {
            //     $scope.inputtedExpertiseList[$scope.inputtedExpertiseList.length - 1];
            // }

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
                });

                $scope.inputtedEpxertise = $scope.inputtedExpertiseList[$scope.inputtedExpertiseList.length - 1];
            }

            $scope.fetchExpertiseCategory($scope.inputtedExpertiseList.length - 1);
        };

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
        };

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
        };

        $scope.saveOtherExpertiseCategory = function(index, level) {
            if (level === 0) {
                $scope.inputtedExpertiseList[index].selectedExpertiseCategory = null;
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };

                $regscope.inputtedExpertiseList[index].otherExpertiseCategory.status = 1;
                $scope.inputtedExpertiseList[index].step = 2;
            } else {
                $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory = null;
                $scope.inputtedExpertiseList[index].selectedExpertise = null;
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };

                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory.status = 1;
                $scope.inputtedExpertiseList[index].step = 3;
            }
        };

        $scope.removeOtherExpertiseCategory = function(index, level) {
            if (level === 0) {
                $scope.inputtedExpertiseList[index].otherExpertiseCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            } else {
                $scope.inputtedExpertiseList[index].otherExpertiseSubCategory = { name: '', status: 0 };
                $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            }
        };

        $scope.selectExpertise = function(index, expertise) {
            $scope.inputtedExpertiseList[index].selectedExpertise = expertise;
            $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
            $scope.inputtedExpertiseList[index].step = 4;
        };

        $scope.deselectExpertise = function(e, index) {
            $scope.inputtedExpertiseList[index].selectedExpertise = null;
            e.stopPropagation(index);
        };

        $scope.saveOtherExpertise = function(index) {
            $scope.inputtedExpertiseList[index].selectedExpertise = null;

            $scope.inputtedExpertiseList[index].otherExpertise.status = 1;
            $scope.inputtedExpertiseList[index].step = 4;
        };

        $scope.removeOtherExpertise = function(index) {
            $scope.inputtedExpertiseList[index].otherExpertise = { name: '', status: 0 };
        };

        $scope.fetchExpertiseCategory = function(index) {
            $scope.inputtedExpertiseList[index].expertiseCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('/expertise-category/0')).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        };

        $scope.fetchExpertiseSubCategory = function(index) {
            $scope.expertiseSubCategoryList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('/expertise-category/') + $scope.inputtedExpertiseList[index].selectedExpertiseCategory.id).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseSubCategoryList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            });
        };

        $scope.fetchExpertiseList = function(index) {
            $scope.inputtedExpertiseList[index].expertiseList = [];
            $scope.inputtedExpertiseList[index].loading = true;

            $http.get(API.path('/expertise/category/') + $scope.inputtedExpertiseList[index].selectedExpertiseSubCategory.id).then(function(result) {
                $scope.inputtedExpertiseList[index].expertiseList = result.data;
                $scope.inputtedExpertiseList[index].loading = false;
            }, 2000);
        };
    });

    angular.module('fundator.controllers').controller('CreateExpertCtrl', function($rootScope, $scope, $state, $resource, $http, $timeout, API, SweetAlert, FdScroller) {
        console.log('CreateExpertCtrl Started');

        $scope.data = {
            selectedBid: null
        };

        var ProjectExpertise = $resource(API.path('/projects/:projectId/expertise'), {
            projectId: '@id'
        });

        $scope.fetchExpertise = function() {
            ProjectExpertise.query({ projectId: $scope.project.id }).$promise.then(function(result) {
                $scope.expertiseList = result;
            }).finally(function() {
                $rootScope.innerSectionLoading = false;
            });
        };

        $scope.$watch('project', function(project) {
            if (typeof(project) === 'undefined' || project === null) return;
            $scope.fetchExpertise();
        });

        $scope.shortlistExpert = function(expertise, bid) {
            if (typeof(expertise.shortlist) === 'undefined') {
                expertise.shortlist = [];
            }

            expertise.shortlist.push(bid);
        };

        $scope.isShortlistExpert = function(expertise, bid) {
            if (typeof(expertise.shortlist) !== 'undefined') {
                return expertise.shortlist.indexOf(bid) !== -1;
            }

            return false;
        };

        $scope.removeShortlistExpert = function(expertise, bid) {
            var index = expertise.shortlist.indexOf(bid);

            if (index !== -1) {
                expertise.shortlist.splice(index, 1);
            }
        };

        $scope.discussExpert = function(expertise, bid) {
            $scope.data.selectedBid = bid;
        };

        $scope.hideDiscussExpert = function() {
            $scope.data.selectedBid = null;
        };

        $scope.selectExpert = function(expertise, bid) {
            SweetAlert.swal({
                    title: 'Are you sure?',
                    text: 'You are selecting ' + bid.expert.name + ' to complete your task.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#F8C486',
                    confirmButtonText: 'Yes, go ahead!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $http.put(API.path('/project-expertise/' + expertise.id + '/bid/' + bid.id), {}).then(function(result) {
                            if (typeof(result.data.error) === 'undefined') {
                                expertise.selected_bid = bid;
                                SweetAlert.swal('Selected!', 'You have selected the expert.', 'success');
                            }
                        });
                    }
                });
        };

        $scope.confirmExperts = function() {
            $scope.project.state = 3.9;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');
        };
    });

    angular.module('fundator.controllers').controller('CreateBudgetCtrl', function($rootScope, $scope, $state, $resource, API, FdScroller) {
        console.log('CreateBudgetCtrl Started');
        $rootScope.innerSectionLoading = true;

        var ProjectFinance = $resource(API.path('project-finance/:projectFinanceId'), {
            projectFinanceId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        $scope.data = {
            startMonthRepayment: '3',
            investorSliderRange: [5, 15],
            paybackDuration: null
        };

        $scope.projectFinance = {
            base_budget: 600,
            adjustment_margin: 10,
            self_funding_amount: 0,
            funding_amount: 0,
            payable_intrest: 15,
            payback_duration: 6,
            payback_duration_extended: 2,
            investors_message_creator: '',
            investors_message_se: ''
        };

        $scope.$watch('project', function(project) {
            if (typeof(project) === 'undefined' || project === null) return;

            ProjectFinance.get({ projectFinanceId: project.project_finance_id }).$promise.then(function(result) {
                $scope.projectFinance = result;
                $scope.data.investorSliderRange[0] = result.investors_min;
                $scope.data.investorSliderRange[1] = result.investors_max;

                $scope.data.paybackDuration = result.mini_plan !== '' ? JSON.parse(result.mini_plan) : $scope.getPaybackDuration();
                $scope.data.oldPaybackDuration = angular.copy($scope.data.paybackDuration);
            }).finally(function() {
                $rootScope.innerSectionLoading = false;
            });
        });

        $scope.$watch('projectFinance', function(projectFinance) {
            if (typeof(projectFinance) === 'undefined') return;

            if ($scope.data.oldPaybackDuration !== $scope.data.paybackDuration) {
                $scope.data.paybackDuration = $scope.getPaybackDuration();
            }
        }, true);

        $scope.getRepaymentMonths = function() {
            var num = angular.copy($scope.projectFinance.payback_duration);
            var repaymentMonths = [];

            if (num >= 12) {
                num = 11;
            }

            for (var rm = 0; rm < num; rm++) {
                repaymentMonths.push(rm);
            }

            return repaymentMonths;
        };

        $scope.getTotalBudget = function(withInterest) {
            var totalBudget = $scope.projectFinance.base_budget + ($scope.projectFinance.base_budget * ($scope.projectFinance.adjustment_margin / 100));

            if (withInterest) {
                var duration = angular.copy($scope.projectFinance.payback_duration);
                var monthlyInterest = $scope.projectFinance.payable_intrest / 12;
                var overallInterest = monthlyInterest * duration;

                totalBudget = totalBudget + (totalBudget * (overallInterest / 100));
            }

            return totalBudget;
        };

        $scope.getRemainingBudget = function(withInterest) {
            var investorAmount = $scope.projectFinance.base_budget - $scope.projectFinance.self_funding_amount;
            var remainingBudget = investorAmount + (investorAmount * ($scope.projectFinance.adjustment_margin / 100));

            if (withInterest) {
                var duration = angular.copy($scope.projectFinance.payback_duration);
                var monthlyInterest = $scope.projectFinance.payable_intrest / 12;
                var overallInterest = monthlyInterest * duration;

                remainingBudget = remainingBudget + (remainingBudget * (overallInterest / 100));
            }

            return remainingBudget;
        };

        $scope.getPaybackDuration = function() {
            if ($scope.projectFinance.payback_duration === $scope.data.oldPaybackDuration) return $scope.data.paybackDurationArray;
            var years = [];
            var yearsCopy = [];

            $scope.data.oldPaybackDuration = angular.copy($scope.projectFinance.payback_duration);
            var duration = angular.copy($scope.projectFinance.payback_duration);
            var whole = Math.floor(duration / 12);
            var remainder = duration % 12;

            for (var i = 0; i < whole; i++) {
                var wholeRemainderArray = [];

                for (var wr = 0; wr < 12; wr++) {
                    wholeRemainderArray.push({ sold: 0 });
                }

                yearsCopy.push(wholeRemainderArray);
            }

            if (remainder > 0) {
                var remainderArray = [];

                for (var r = 0; r < remainder; r++) {
                    remainderArray.push({ sold: 0 });
                }

                yearsCopy.push(remainderArray);
            }

            $scope.data.paybackDurationArray = angular.copy(yearsCopy);
            return angular.copy(yearsCopy);
        };

        $scope.saveInvestorLimit = function() {
            $scope.projectFinance.investors_min = $scope.data.investorSliderRange[0];
            $scope.projectFinance.investors_max = $scope.data.investorSliderRange[1];

            $scope.saveFinanceProgress();
        };

        $scope.saveFinanceProgress = function() {
            var projectFinance = angular.copy($scope.projectFinance);
            projectFinance.funding_amount = $scope.getTotalBudget() - projectFinance.self_funding_amount;

            if (typeof(projectFinance) !== 'undefined') {
                ProjectFinance.update({
                    projectFinanceId: projectFinance.id
                }, projectFinance).$promise.then(function(result) {
                    console.log('result');
                    console.log(result);
                });
            }
        };

        $scope.confirmBudget = function() {
            $scope.projectFinance.mini_plan = JSON.stringify($scope.data.paybackDuration);
            $scope.saveFinanceProgress();

            $scope.project.state = 4.9;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');
        };
    });

    angular.module('fundator.controllers').controller('CreateInvestorsCtrl', function($rootScope, $scope, $state, $http, $filter, API, SweetAlert) {
        console.log('CreateInvestorsCtrl Started');

        $scope.investmentBids = [];

        $scope.shortlistBid = function(bid) {
            bid.type = 'shortlist';
            $http.put(API.path('/projects/' + bid.project.id + '/investment-bids/' + bid.id), bid).then(function(result) {
                if (result) {
                    $scope.investmentData.shortlist_bids.push(bid);
                    $scope.investmentData.amount_shortlist = $scope.investmentData.amount_shortlist + bid.bid_amount_max;
                }
            });
        };

        $scope.unShortlistBid = function(bid) {
            bid.type = '';
            $http.put(API.path('/projects/' + bid.project.id + '/investment-bids/' + bid.id), bid).then(function(result) {
                if (result) {
                    var index = $scope.investmentData.shortlist_bids.indexOf(bid);
                    $scope.investmentData.shortlist_bids.splice(index, 1);
                    $scope.investmentData.amount_shortlist = $scope.investmentData.amount_shortlist - bid.bid_amount_max;
                }
            });
        };

        $scope.unSelectBid = function(bid) {
            SweetAlert.swal({
                    title: 'Are you sure?',
                    text: 'You are removing an investment bid from : ' + bid.investor.name + ' ' + bid.investor.last_name,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#F8C486',
                    confirmButtonText: 'Yes, go ahead!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        bid.type = '';

                        $http.put(API.path('/projects/' + bid.project.id + '/investment-bids/' + bid.id), bid).then(function(result) {
                            if (result) {
                                var index = $scope.investmentData.shortlist_bids.indexOf(bid);
                                $scope.investmentData.shortlist_bids.splice(index, 1);

                                $scope.investmentData.amount_selected = $scope.investmentData.amount_selected - bid.bid_amount_max;
                            }

                            SweetAlert.swal('Removed!', 'You have removed an Investor!', 'success');
                        });
                    }
                });
        };

        $scope.selectBid = function(bid) {
            SweetAlert.swal({
                    title: 'Are you sure?',
                    text: 'You are selecting an investment bid from :  ' + bid.investor.name + ' ' + bid.investor.last_name,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#F8C486',
                    confirmButtonText: 'Yes, go ahead!',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        bid.type = 'select';

                        $http.put(API.path('/projects/' + bid.project.id + '/investment-bids/' + bid.id), bid).then(function(result) {
                            if (result) {
                                $scope.investmentData.selected_bids.push(bid);
                                $scope.investmentData.amount_selected = $scope.investmentData.amount_selected + bid.bid_amount_max;
                            }

                            SweetAlert.swal('Selected!', 'You have selected an Investor!', 'success');
                        }, function() {
                            SweetAlert.swal('Error!', 'Investor could not be selected', 'error');
                        });
                    }
                });
        };

        $scope.switchSource = function(source) {
            switch (source) {
                case 'shortlist':
                    $scope.bidSource = $scope.investmentData.shortlist_bids;
                    $scope.bidSourceType = 'shortlist';
                    break;
                case 'selected':
                    $scope.bidSource = $scope.investmentData.selected_bids;
                    $scope.bidSourceType = 'selected';
                    break;
                default:
                    $scope.bidSource = $scope.investmentData.all_bids;
                    $scope.bidSourceType = 'all';
            }
        };

        $scope.$watch('project', function(project) {
            if (typeof(project) === 'undefined' || project === null) return;

            $http.get(API.path('/projects/' + project.id + '/investment-bids')).then(function(result) {
                $scope.investmentData = result.data;

                // Convert selected and shortlisted bid ids to bids
                var shortlistBidIds = angular.copy($scope.investmentData.shortlist_bids);
                var shortlistBids = [];
                var selectedBidIds = angular.copy($scope.investmentData.selected_bids);
                var selectedBids = [];

                angular.forEach(shortlistBidIds, function(bidId) {
                    var bid = $filter('filter')($scope.investmentData.all_bids, { id: bidId }, true)[0];
                    shortlistBids.push(bid);
                });
                $scope.investmentData.shortlist_bids = shortlistBids;

                angular.forEach(selectedBidIds, function(bidId) {
                    var bid = $filter('filter')($scope.investmentData.all_bids, { id: bidId }, true)[0];
                    selectedBids.push(bid);
                });
                $scope.investmentData.selected_bids = selectedBids;

                $scope.bidSource = $scope.investmentData.all_bids;
                $scope.bidSourceType = 'all';
            }).finally(function() {
                $rootScope.innerSectionLoading = false;
            });
        });

        $scope.confirmInvestors = function() {
            $scope.project.state = 5.9;
            $scope.saveProgress();

            FdScroller.toSection('.steps-content');
        };
    });
})();
