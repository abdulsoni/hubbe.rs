(function() {
    "use strict";


    angular.module('fundator.directives')

    .directive('expandingItem', function($rootScope, $resource, $timeout, API) {
        return {
            templateUrl: '/views/app/app/partials/contest-item.html',
            restrict: 'E',
            priority: 999,
            transclude: true,
            scope: {
                item: '='
            },
            link: function($scope, $element, $attrs) {
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
            }
        };
    });

})();
