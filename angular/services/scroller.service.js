(function() {
    "use strict";

    angular.module('fundator.services').factory('FdScroller', function($window) {

        return {
            toTop: function() {
                var body = $('html, body');
                body.stop().animate({scrollTop: 0}, '500', 'swing');
            }
        };

    });
})();
