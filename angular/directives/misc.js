(function() {
    "use strict";

    angular.module('fundator.directives').filter('trustedHtml', ['$sce', function($sce) {
        return function(html) {
            return $sce.trustAsHtml(html);
        };
    }]);

    angular.module('fundator.directives').directive('fdEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.fdEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    angular.module('fundator.directives').directive('numbersOnly', function () {
    	return {
           require: 'ngModel',
           link: function(scope, element, attrs, modelCtrl) {

             modelCtrl.$parsers.push(function (inputValue) {

                var transformedInput = inputValue.toLowerCase().replace(/\D/g, '');

               if (transformedInput!=inputValue) {
                 modelCtrl.$setViewValue(transformedInput);
                 modelCtrl.$render();
             }

             return transformedInput;
         });
         }
     };
    });

})();