'use strict';
var cameo = {
    //restApi:              "http://"+location.host+"/api"
    restApi: "https://dev.cameo.io/api/v1",
    token: null,
    supported_languages: ['de_DE', 'en_US'],
    path_to_languages: 'languages'
};

var app = angular.module('cameoClient', [

    'ngRoute',
    'ngCookies',
    'cmApi',
    'cmAuth',
    'cmCrypt',    
    'cmLanguage',
    'cmLogger',
    'cmNotify',
    'cmVerify'

]);

app.service('cm', [

    'cmApi',
    'cmAuth',
    'cmCrypt',
    'cmLogger',
    'cmNotify',
    'cmTranslate',


    function (cmApi, cmAuth, cmCrypt, cmLogger, cmNotify, cmTranslate) {
        return {
            log: cmLogger,
            notify: cmNotify,
            translate: cmTranslate,
            crypt: cmCrypt,
            api: cmApi,
            auth: cmAuth
        }
    }
]);


//Module Configuration:

app.config([

    'cmApiProvider',
    'cmAuthProvider',
    'cmLanguageProvider',

    function (cmApiProvider, cmAuthProvider, cmLanguageProvider){
        cmApiProvider
            .restApiUrl( cameo.restApi )
            
        cmLanguageProvider
            .supportedLanguages( cameo.supported_languages)
            .pathToLanguages( cameo.path_to_languages)
            .preferredLanguage('en_US')   //for now
            .useLocalStorage()
            
    }
])





app.config([

    '$routeProvider',
    '$locationProvider',
    //'$compileProvider',    
    
    function ($routeProvider, $locationProvider) { // do we need this: ", $compileProvider" ?
        //$locationProvider.html5Mode(true);    

        $routeProvider.
            when('/login', {
                templateUrl: 'tpl/form/login.html',
            }).
            when('/start', {
                templateUrl: 'tpl/start.html',
                controller: 'StartCtrl'
            }).
            when('/talks', {
                templateUrl: 'tpl/list/talks.html',
                controller: 'TalksCtrl'
            }).
            when('/mediawall', {
                templateUrl: 'tpl/list/mediawall.html',
                controller: 'MediaWallCtrl'
            }).
            when('/conversation/:conversationId', {
                templateUrl: 'tpl/conversation.html',
                controller: 'ConversationCtrl'
            }).
            when('/registry', {
                templateUrl: 'tpl/form/registry.html',
                controller: 'RegistryCtrl'
            }).
            when('/agb', {
                templateUrl: 'tpl/agb.html'
            }).
            when('/disclaimer', {
                templateUrl: 'tpl/disclaimer.html'
            }).
            when('/profile', {
                templateUrl: 'tpl/form/profile.html',
                controller: 'ProfileCtrl'
            }).
            when('/verification/:secret', {
                templateUrl: 'tpl/verification.html',
            }).
            when('/filter', {
                templateUrl: 'tpl/form/filter.html',
                controller: 'FilterCtrl'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);

app.run(['$rootScope', '$location', '$cookieStore',
    function ($rootScope, $location, $cookieStore) {
        $rootScope.$on("$routeChangeStart", function () {
//        var path_exceptions = ['/login', '/registry'];
            var path = $location.$$path;

            if (angular.isUndefined($cookieStore.get("token"))) {
                if (path != "/login" && path != "/registry" && path != "/agb" && path != "/disclaimer") {
                    $location.path("/login");
                }
            } else if ($location.$$path == "/login") {
                $location.path("/start");
            }

            if (angular.isDefined($cookieStore.get("token"))) {
                cameo.token = $cookieStore.get("token");
            }
        });
    }]);
