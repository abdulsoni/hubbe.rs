(function() {
    "use strict";

    angular.module('fundator.controllers').controller('ContestCtrl', function($rootScope, $scope, $state, $resource, $timeout) {

        $scope.contests = [];
        $rootScope.$broadcast('startLoading');

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.query().$promise.then(function(result){
            $scope.contests = result;
        }).finally(function(){
            $timeout(function(){
                $rootScope.$broadcast('stopLoading');
            }, 1000);
        });
    });

    angular.module('fundator.controllers').controller('ContestSingleCtrl', function($rootScope, $scope, $state, $stateParams, $resource, $window, $timeout) {
        $scope.contestId = $stateParams.contestId;
        $scope.data = {
            selectedEntry: null
        };

        $scope.contestants = [
            {name: 'W', bio: ''},
            {name: 'X', bio: ''},
            {name: 'Y', bio: ''},
            {name: 'Z', bio: ''}
        ];

        $scope.jury = [
            {name: 'W', bio: ''},
            {name: 'X', bio: ''},
            {name: 'Y', bio: ''},
            {name: 'Z', bio: ''}
        ];

        var Entry = $resource('/api/entries/:entryId', {
            entryId: '@id'
        });

        $window.scrollTo(0, 0);
        $rootScope.$broadcast('startLoading');

        var Contest = $resource('/api/contests/:contestId', {
            contestId: '@id'
        });

        Contest.get({contestId: $scope.contestId}).$promise.then(function(result){
            $scope.contest = result;
        }).finally(function(){
            $timeout(function(){
                $rootScope.$broadcast('stopLoading');
            }, 1000);
        });

        $scope.selectEntry = function(entry){
            $scope.data.selectedEntry = null;
            console.log('Ive selected the entry : ');
            console.log(entry);

            Entry.get({entryId: entry.id}).$promise.then(function(result){
                console.log('Hey this is the full data');
                $scope.data.selectedEntry = result;
            });
        }
    });

})();
