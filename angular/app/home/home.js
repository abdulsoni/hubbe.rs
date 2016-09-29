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

        $scope.filterCategories = function(element,type){
            $scope.tabType=type;
            if(element==''){
                $('.list-filters li:first-child').addClass('active');
            }
            else{
                $('.list-filters li').removeClass('active');
                var target = element.target;
                var parent = $(target).parent();
                $(parent).addClass('active');
            }
            $scope.postFilters=[];
            var url = 'filter-categories/'+type;
            $http.get(API.path(url)).then(function(response){
                $scope.filterList = response.data[type];
            });
        }
        $scope.filterCategories('','product_categories');

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