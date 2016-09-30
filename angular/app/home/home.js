(function() {
    "use strict";

    angular.module('fundator.controllers').controller('HomeCtrl', function($rootScope, $scope, $state, $stateParams, $http, $resource, FdScroller, API) {
        $scope.postFilters=[];
        $scope.tabType='product_categories';
        console.log('Home View Started');
        $rootScope.$broadcast('stopLoading');
        FdScroller.toTop();

        console.log('get the current user role');
        console.log($rootScope.activeRole);

        var Contest = $resource(API.path('contests/:contestId'), {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result) {
            $scope.contests = result;
        });

        //Get Available Filters
        var url = 'filter-categories/';
        $http.get(API.path(url)).then(function (response) {
            $scope.availableFilterList = response.data;
            $scope.filterCategories('','product_categories');
        });


        // Change Tabs
        $scope.filterCategories = function(element,type){
            $(".list-filter").slideUp();
            $scope.tabType=type;
                var target = element.target;
                var parent = $(target).parent();
                // Remove Active Class From Previous Elements
                $('.list-filters li').not(parent).removeClass('active');
                // Set Active Class on Current Elements
                $(parent).toggleClass('active');

            if($(parent).hasClass('active')){
                $(".list-filter").slideDown();
            }

            $scope.postFilters=[];
            $scope.filterList = $scope.availableFilterList[type];
            $scope.loadContests();
        }

        $scope.toggleFilter = function(element,val) {
            var target = element.target;
            var parent = $(target).parent();
            $(parent).toggleClass('selected');
            if(parent.hasClass('selected')){
                $scope.postFilters.push(val);
            }
            else{
                $scope.removeFilter(val);
            }
            $scope.loadContests();
        }

        $scope.loadContests = function(){
            var postData = {
                type: $scope.tabType,
                filters: $scope.postFilters
            };
            $http.post(API.path('contests'),postData).then(function(response){
                $scope.contests = response.data;
            });
        }

        $scope.removeFilter = function(value){
            angular.forEach($scope.postFilters,function(id,key){
                if(id==value){
                    $scope.postFilters.splice(key,1);
                }
            })
        }
    });
})();