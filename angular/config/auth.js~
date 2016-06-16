(function (){
    "use strict";

    angular.module('fundator.config').config(function ($authProvider, APIProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        var redirectUriPath = window.location.protocol + '//' + window.location.hostname + ':8000';
        $authProvider.loginUrl = redirectUriPath + '/api/v1/authenticate';
        $authProvider.tokenPrefix = 'fundator';

        $authProvider.linkedin({
        	clientId: '77zjxfbh2928re',
            url: redirectUriPath + '/api/v1/authenticate/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: redirectUriPath,
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            display: 'popup',
            popupOptions: { width: 452, height: 633 }
        });

        $authProvider.google({
            clientId: '1042247727091-dmqc55af7tl58h2rqv3pqnrmjjbb9733.apps.googleusercontent.com',
            url: redirectUriPath + '/api/v1/authenticate/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: redirectUriPath + '/api/v1/authenticate/google',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 452, height: 633 }
        });

        $authProvider.facebook({
            clientId: '900533123395920',
            name: 'facebook',
            url: redirectUriPath + '/api/v1/authenticate/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: redirectUriPath,
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
      });
    });

})();
