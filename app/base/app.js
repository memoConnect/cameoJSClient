define([
    'angularAMD',
    'angular-route',
    'angular-cookies',
//
    'cmApi',
    'pckUi',
//    'cmAuth',
//    'cmCrypt',
    'cmLanguage',
    'cmLogger',
    'cmNotify',
//    'cmProfile',
//    'cmConversations',
//    'cmContacts',
//    'mUser',
//    'mContacts',

    'jquery'
], function (angularAMD) {
    'use strict';

    var app = angular.module('cameoClient', [
        'ngRoute',
        'ngCookies',

        // Module
        'cmApi',
        'cmUi',
//        'cmAuth',
//        'cmCrypt',
        'cmLanguage',
        'cmNotify',
        'cmLogger'
//        'cmProfile',
//        'cmConversations',
//        'cmProfile',
//        'cmContacts',
//        'mUser',
//        'mContacts'
    ]);

    app.cameo = {
        restApi: "https://dev.cameo.io/api/v1",
        token: null,
        supported_languages: ['de_DE', 'en_US'],
        path_to_languages: 'i18n',
        cache_lang_files: false
    };

    //Module Configuration:
    app.config([
        'cmLanguageProvider',
        'cmLoggerProvider',
        'cmApiProvider',
//        'cmNotifyProvider',
        function (cmLanguageProvider, cmLoggerProvider, cmApiProvider){
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
                templateUrl: 'routes/login/login.html',
                controllerUrl: 'routes/login/login-ctrl'
            })).
            otherwise({
                redirectTo: '/login'
            }).
            when('/start', angularAMD.route({
                templateUrl: 'routes/start/start.html',
                controllerUrl: 'routes/start/start-ctrl'
            })).
            when('/mediawall', angularAMD.route({
                templateUrl: 'routes/mediawall/mediawall.html',
                controllerUrl: 'routes/mediawall/mediawall-ctrl'
            })).
            when('/talks', angularAMD.route({
                templateUrl: 'routes/talks/talks.html',
                controllerUrl: 'routes/talks/talks-ctrl'
            })).
            when('/conversation/:conversationId?', angularAMD.route({
                templateUrl: 'routes/conversation/conversation.html',
                controllerUrl: 'routes/conversation/conversation-ctrl'
            })).
            when('/registration', angularAMD.route({
                templateUrl: 'routes/registration/registration.html',
                controllerUrl: 'routes/registration/registration-ctrl'
            })).
            when('/purl/:idPurl?', angularAMD.route({
                templateUrl: 'routes/purl/purl.html',
                controllerUrl: 'routes/purl/purl-ctrl'
            })).
            when('/profile', angularAMD.route({
                templateUrl: 'routes/profile/profile.html'
            })).
            when('/filter', angularAMD.route({
                templateUrl: 'routes/filter/filter.html',
                controllerUrl: 'routes/filter/filter-ctrl'
            }));
            // double route for contacts while angular doesn't support wildcard
            var routeContacts = angularAMD.route({
                templateUrl: 'routes/contacts/contacts.html',
                controllerUrl: 'routes/contacts/contacts-ctrl'
            });
            $routeProvider.
                when('/contacts', routeContacts).
                when('/contacts/:tab', routeContacts);

            // static pages
            $routeProvider.
                when('/verification/:secret', angularAMD.route({
                    templateUrl: 'routes/verification/verification.html'
                })).
                when('/terms', angularAMD.route({
                    templateUrl: 'routes/terms/terms.html'
                })).
                when('/disclaimer', angularAMD.route({
                    templateUrl: 'routes/disclaimer/disclaimer.html'
                })).
                when('/404', angularAMD.route({
                    templateUrl: 'route/landingpages/404.html'
                }));
        }
    ]);

    app.run(['$rootScope', '$location', '$cookieStore',
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