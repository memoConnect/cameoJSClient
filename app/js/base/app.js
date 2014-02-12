define([
    'angularAMD',
    'angular-route',
    'angular-cookies',

    'cmApi',
    'cmAuth',
    'cmCrypt',
    'cmLanguage',
    'cmLogger',
    'cmNotify',
    'cmProfile',

], function (angularAMD) {
    'use strict';

    var app = angular.module('cameoClient', [

        'ngRoute',
        'ngCookies',
        'cmApi',
        'cmAuth',
        'cmCrypt',
        'cmLanguage',
        'cmLogger',
        'cmNotify',
        'cmProfile'

    ]);

    app.cameo = {
        //restApi:              "http://"+location.host+"/api"
        restApi: "https://dev.cameo.io/api/v1",
        token: null,
        supported_languages: ['de_DE', 'en_US'],
        path_to_languages: 'languages'
    };

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
                .restApiUrl( app.cameo.restApi );

            cmLanguageProvider
                .supportedLanguages( app.cameo.supported_languages)
                .pathToLanguages( app.cameo.path_to_languages)
                .preferredLanguage('en_US')   //for now
                .useLocalStorage()

        }
    ]);

    app.config([

        '$routeProvider',
        '$locationProvider',
        //'$compileProvider',

        function ($routeProvider, $locationProvider) { // do we need this: ", $compileProvider" ?
            //$locationProvider.html5Mode(true);
            // client dynamic pages
            $routeProvider.
                when('/login', angularAMD.route({
                    templateUrl: 'tpl/form/login.html',
                    controllerUrl: 'controller/login'
                })).
                otherwise({
                    redirectTo: '/login'
                }).
                when('/start', angularAMD.route({
                    templateUrl: 'tpl/start.html',
                    controllerUrl: 'controller/start'
                })).
                when('/talks', angularAMD.route({
                    templateUrl: 'tpl/list/talks.html',
                    controllerUrl: 'controller/talks'
                })).
                when('/mediawall', angularAMD.route({
                    templateUrl: 'tpl/list/mediawall.html',
                    controllerUrl: 'controller/mediawall'
                })).
                when('/conversation/:conversationId', angularAMD.route({
                    templateUrl: 'tpl/conversation.html',
                    controllerUrl: 'controller/conversation'
                })).
                when('/registry', angularAMD.route({
                    templateUrl: 'tpl/form/registry.html',
                    controllerUrl: 'controller/registry'
                })).
                when('/profile', angularAMD.route({
                    templateUrl: 'tpl/form/profile.html',
                    controllerUrl: 'controller/profile'
                })).
                when('/filter', angularAMD.route({
                    templateUrl: 'tpl/form/filter.html',
                    controllerUrl: 'controller/filter'
                }));
            // static pages
            $routeProvider.
                when('/verification/:secret', angularAMD.route({
                    templateUrl: 'tpl/verification.html'
                })).
                when('/terms', angularAMD.route({
                    templateUrl: 'tpl/terms.html'
                })).
                when('/disclaimer', angularAMD.route({
                    templateUrl: 'tpl/disclaimer.html'
                }));
        }
    ]);

    app.run(['$rootScope', '$location', '$cookieStore',
        function ($rootScope, $location, $cookieStore) {
            $rootScope.$on("$routeChangeStart", function () {
    //        var path_exceptions = ['/login', '/registry'];
                var path = $location.$$path;

                if (angular.isUndefined($cookieStore.get("token"))) {
                    if (path != "/login" && path != "/registry" && path != "/terms" && path != "/disclaimer") {
                        $location.path("/login");
                    }
                } else if ($location.$$path == "/login") {
                    $location.path("/start");
                }

                if (angular.isDefined($cookieStore.get("token"))) {
                    cameo.token = $cookieStore.get("token");
                }
            });
        }
    ]);

    angularAMD.bootstrap(app);

    return app;
});