(function() {
    "use strict";


    angular.module('fundator.directives')

    .directive('expandingItem', function($rootScope, $resource, $timeout, API,$auth,$http) {
        return {
            templateUrl: '/views/app/app/partials/contest-item.html',
            restrict: 'E',
            priority: 999,
            transclude: true,
            scope: {
                item: '='
            },
            link: function($scope, $element, $attrs) {
                $scope.singleJudge=false;
                if ($auth.isAuthenticated()) {
                    $scope.loggedIn=true;
                }else{
                    $scope.loggedIn = false;
                }
                $scope.data = {};
                $scope.item.thumbnail = '/images/contest.jpg';

                var $parent = $element.parent();
                var $item = $element.find('.item');
                var $tabItems = $element.find('.item-tabs');

                $element.on('click', function(){
                    $element.addClass('active');

                    var itemWidth = $item.width();
                    var itemHeight = $item.outerHeight();

                    $item.css('max-width', itemWidth + 'px');
                    $item.css('width', itemWidth + 'px');

                    // $tabItems.each(function(){
                    //     $(this).find('li > a').css('height', ((itemHeight - 8) / 5) + 'px');
                    //     console.log(((itemHeight - 8) / 5) + 'px');
                    // });

                    $timeout(function(){
                        console.log($parent);
                        console.log('parent-clicked');
                        $parent.addClass('transitioning transitioning_expanding');
                    });
                });

                $scope.expand = function($index){
                    $scope.singleItem = $scope.item.judges[$index];
                    var data = {id:$scope.singleItem.user.id};
                    $http.post(API.path('check-follow'),data).then(function(response){
                        $scope.singleItem.followData = response.data;
                        console.log($scope.singleItem);
                        $scope.singleJudge=true;
                    });
                }
                $scope.closeJudge = function(){
                    $scope.singleJudge = false;
                }

                $scope.checkFollow = function(follow,targetId){
                    if (follow == 1) {
                        $scope.unFollow(targetId);
                    }
                    else{
                        $scope.follow(targetId);
                    }
                }

                $scope.follow = function(target){
                    var postData ={
                        targetId:target
                    };
                    $http.post(API.path('follow'),postData).success(function(data){
                        console.log(data);
                    })
                }

                $scope.unFollow = function(target){
                    var postData={
                        targetId:target
                    };
                    $http.post(API.path('unfollow'),postData).success(function(data){
                        console.log(data);
                    });
                }
            }
        };
    });

})();
