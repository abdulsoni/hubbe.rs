(function() {
    "use strict";
    angular.module('fundator.controllers').controller('HomeCtrl', function($rootScope, $scope, $state, $stateParams, $http, $resource, FdScroller, API, Countries) {
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

        $scope.countries = new Countries();

        $scope.contestStatusType = [
            {
                name: "Present",
                id: 1
            },
            {
                name: "Past",
                id: 0
            }
        ];

        //Get Available Filters
        var url = 'filter-categories/';
        $http.get(API.path(url)).then(function (response) {
            console.log($scope.countries);
            $scope.availableFilterList = response.data;
            $scope.filterCategories('','product_categories');
        });


        // Change Tabs
        $scope.filterCategories = function(element,type){
            $scope.moreCountries = false;
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
            if(type=='countries'){
                $scope.filterList = $scope.countries.slice(0,18);
                $scope.filterList[18] ={name: "Other"};
            }
            else if(type=='status'){
                $scope.filterList = $scope.contestStatusType;
            }
            $scope.loadContests();
        }

        $scope.toggleFilter = function(element,val) {

            if(val=='special'){
                return 0;
            }

            var target = element.target;
            var parent = $(target).parent();

            if($scope.tabType=='countries'){
                val = $(target).text();

                // If Value is Other and is Already Selected Then Hide More Countries
                if(val=='Other' && $(parent).hasClass('selected')){
                    $scope.moreCountries = false;
                }
                // Else Show Other Countries
                else if(val=='Other'){
                    $scope.moreCountries = true;
                }
            }

            $(parent).toggleClass('selected');
            if(parent.hasClass('selected') && val!='Other'){
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