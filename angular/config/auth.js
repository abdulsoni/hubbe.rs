(function (){
    "use strict";

    angular.module('fundator.config').config(function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate';
        $authProvider.tokenPrefix = 'fundator';

        $authProvider.linkedin({
        	url: '/api/authenticate/linkedin',
        	authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        	redirectUri: 'http://192.168.10.10/api/authenticate/linkedin',
        	requiredUrlParams: ['state'],
        	scope: ['r_emailaddress'],
        	scopeDelimiter: ' ',
        	state: 'STATE',
        	type: '2.0',
        	popupOptions: { width: 527, height: 582 },
        	clientId: '77zjxfbh2928re'
        });

        $authProvider.google({
        	url: '/api/authenticate/google',
        	authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        	redirectUri: window.location.origin,
        	requiredUrlParams: ['scope'],
        	optionalUrlParams: ['display'],
        	scope: ['profile', 'email'],
        	scopePrefix: 'openid',
        	scopeDelimiter: ' ',
        	display: 'popup',
        	type: '2.0',
        	popupOptions: { width: 452, height: 633 },
        	clientId: 'Google Client ID'
        });
    });

})();
