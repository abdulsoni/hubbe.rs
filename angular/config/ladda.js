(function() {
    "use strict";

    angular.module('fundator.config').config(function(laddaProvider) {

        laddaProvider.setOption({
            style: 'expand-right',
            spinnerSize: 35,
            spinnerColor: '#ffffff'
        });

    });

})();
