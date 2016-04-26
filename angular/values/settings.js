(function() {
    "use strict";

    angular.module('fundator.services').factory('API', function() {
    	var domainUrl = window.location.hostname.indexOf('fundator.co') !== -1 ? 'fundator.co' : 'fundator.app';
        var base = 'http://' + window.location.hostname + '/api/';
        var path = '';

        return {
        	path: function(func, version) {
        		if (typeof(version) === 'undefined') version = 'v1';
        		var delimiter = func.startsWith('/') ? '' : '/';
        		return path = base + version + delimiter + func;
        	}
        }
    });

    angular.module('fundator.services').provider('APIProvider', function() {
    	var domainUrl = window.location.hostname.indexOf('fundator.co') !== -1 ? 'fundator.co' : 'fundator.app';
        var base = 'http://' + window.location.hostname + '/api/';
        var path = '';

        this.$get = function() {
        	return {
        		path: function(func, version) {
        			if (typeof(version) === 'undefined') version = 'v1';
        			var delimiter = func.startsWith('/') ? '' : '/';
        			return path = base + version + delimiter + func;
        		}
        	}
        };
    });

})();