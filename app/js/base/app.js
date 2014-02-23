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
    'cmConversations',
    'cmContacts',
    'mUser',
    'mContacts'
    
], function (angularAMD) {
    'use strict';

    var app = angular.module('cameoClient', [

        'ngRoute',
        'ngCookies',

        // Module
        'cmApi',
        'cmAuth',
        'cmCrypt',
        'cmLanguage',
        'cmLogger',
        'cmNotify',
        'cmProfile',
        'cmConversations',
        'cmProfile',
        'cmContacts',
        'mUser',
        'mContacts'

    ]);

    app.cameo = {
        //restApi:              "http://"+location.host+"/api"
        restApi: "https://dev.cameo.io/api/v1",
        token: null,
        supported_languages: ['de_DE', 'en_US'],
        path_to_languages: 'languages',
        cache_lang_files: false
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
        'cmLoggerProvider',

        function (cmApiProvider, cmAuthProvider, cmLanguageProvider, cmLoggerProvider){
            cmLoggerProvider
                .debugEnabled(true)

            cmApiProvider
                .restApiUrl( app.cameo.restApi );

            cmLanguageProvider
                .cacheLangFiles(app.cameo.cache_lang_files)
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
                    templateUrl: 'tpl/form/login.html'
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
                when('/conversations', angularAMD.route({
                    templateUrl: 'tpl/conversations.html',
                    controllerUrl: 'controller/conversations'
                })).
                when('/conversation/:conversationId?', angularAMD.route({
                    templateUrl: 'tpl/conversation.html',
                    controllerUrl: 'controller/conversation'
                })).
                when('/registration', angularAMD.route({
                    templateUrl: 'tpl/form/registration.html',
                    controllerUrl: 'controller/registration'
                })).
                when('/purl/:idPurl?', angularAMD.route({
                    templateUrl: 'js/controller/purl.html',
                    controllerUrl: 'controller/purl'
                })).
                when('/profile', angularAMD.route({
                    templateUrl: 'tpl/form/profile.html'
                })).
                when('/filter', angularAMD.route({
                    templateUrl: 'tpl/form/filter.html',
                    controllerUrl: 'controller/filter'
                }));

            var routeContacts = angularAMD.route({
                templateUrl: 'js/controller/contacts.html',
                controllerUrl: 'controller/contactsCtrl'
            });
            
            $routeProvider.
                when('/contacts', routeContacts).
                when('/contacts/:tab', routeContacts);

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
                })).
                when('/404', angularAMD.route({
                    templateUrl: 'tpl/404.html'
                }));
        }
    ]);

    app.run(['$rootScope', '$location', '$cookieStore','ModelContacts',
        function ($rootScope, $location, $cookieStore) {
            $rootScope.$on("$routeChangeStart", function () {
                var path_regex = /^(\/login|\/registration|\/terms|\/disclaimer|\/404|\/purl\/[a-zA-Z0-9]{1,})$/;
                var path = $location.$$path;

                if (angular.isUndefined($cookieStore.get("token"))) {
                    if (!path_regex.test(path)) {
                        $location.path("/login");
                    }
                } else if ($location.$$path == "/login") {
                    $location.path("/start");
                }

                if (angular.isDefined($cookieStore.get("token"))) {
                    app.cameo.token = $cookieStore.get("token");
                }
            });
        }
    ]);

    angularAMD.bootstrap(app);

    return app;
});