(function (){
    "use strict";

    angular.module('fundator.config').config(function ($animateProvider){
    	$animateProvider.classNameFilter(/fd-animate/);
    });

})();
