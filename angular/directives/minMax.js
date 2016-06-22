(function() {
    "use strict";

    function isEmpty(value) {
    	return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    angular.module('fundator.directives').directive('ngMin', function () {
    	return {
    		restrict: 'A',
    		require: 'ngModel',
    		link: function (scope, elem, attr, ctrl) {
    			scope.$watch(attr.ngMin, function () {
    				ctrl.$setViewValue(ctrl.$viewValue);
    			});
    			var minValidator = function (value) {
                    console.log('minValidator');
    				var min = scope.$eval(attr.ngMin) || 0;
                    console.log(min);
                    console.log(value);
                    console.log(!isEmpty(value) && value < min);
    				if (!isEmpty(value) && value < min) {
    					ctrl.$setValidity('ngMin', false);
    					return undefined;
    				} else {
    					ctrl.$setValidity('ngMin', true);
    					return value;
    				}
    			};

    			ctrl.$parsers.push(minValidator);
    			ctrl.$formatters.push(minValidator);
    		}
    	};
    });

    angular.module('fundator.directives').directive('ngMax', function () {
    	return {
    		restrict: 'A',
    		require: 'ngModel',
    		link: function (scope, elem, attr, ctrl) {
    			scope.$watch(attr.ngMax, function () {
    				ctrl.$setViewValue(ctrl.$viewValue);
    			});
    			var maxValidator = function (value) {
                    console.log('maxValidator');
    				var max = scope.$eval(attr.ngMax) || Infinity;
                    console.log(max);
                    console.log(value);
                    console.log(!isEmpty(value) && value > max);
    				if (!isEmpty(value) && value > max) {
    					ctrl.$setValidity('ngMax', false);
    					return undefined;
    				} else {
    					ctrl.$setValidity('ngMax', true);
    					return value;
    				}
    			};

    			ctrl.$parsers.push(maxValidator);
    			ctrl.$formatters.push(maxValidator);
    		}
    	};
    });

})();