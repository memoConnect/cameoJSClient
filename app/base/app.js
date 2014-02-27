define([
    'angularAMD',
    'angular-route',
    'angular-cookies',
    // cameo files
    'cmApi',
    'cmLanguage',
    'cmLogger',
    'cmNotify',
    // vendor
    'jquery'
], function (angularAMD) {
    'use strict';

    var app = angular.module('cameoClient', [
        'ngRoute',
        'ngCookies',
        // insert cameo provider
        'cmApi',
        'cmLanguage',
        'cmNotify',
        'cmLogger'
    ]);

    // cameo settings
    app.cameo = {
        restApi: "https://dev.cameo.io/api/v1",
        token: null,
        supported_languages: ['de_DE', 'en_US'],
        path_to_languages: 'i18n',
        cache_lang_files: false,
        routes: {
            'login': {
                hasCtrl: true,
                isOtherwise: true
            },
            'start': {
                hasCtrl: true
            },
            'talks': {
                hasCtrl: true
            },
            'mediawall': {
                hasCtrl: true
            },
            'conversation': {
                routes:['/conversation/:conversationId?'],
                hasCtrl: true
            },
            'registration': {
                hasCtrl: true
            },
            'purl': {
                routes:['/purl/:idPurl?'],
                hasCtrl: true
            },
            'profile': {},
            'filter': {
                hasCtrl: true
            },
            'contacts': {
                routes:['/contacts/:tab?'],
                hasCtrl: true
            },
            'verification': {
                routes:['/verification/:secret']
            },
            'terms': {},
            'disclaimer': {},
            '404': {}
        }
    };

    // cameo configuration for our providers
    app.config([
        'cmLanguageProvider',
        'cmLoggerProvider',
        'cmApiProvider',
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
    // app route config
    app.config([
        '$routeProvider',
        '$locationProvider',
        //'$compileProvider',

        function ($routeProvider, $locationProvider) {
            /**
             * this option makes location use without #-tag
             * @param settings
             */
            // $locationProvider.html5Mode(true);

            /**
             * create routes
             * @param settings
             *
             * full control:
                'login': {
                    route:['/login'], // multiple possible
                    hasCtrl: true,
                    isOtherwise: true
                }
             * creates route '/login'
             * and template 'routes/login/login.html'
             * and controller 'routes/login/login-ctrl.html'
             *
             * short control:
                'terms': {}
             * creates route '/terms'
             * and template 'routes/terms/terms.html'
             *
             */
            function createRoutes(settings){
                angular.forEach(settings,function(_settings_, routeKey){
                    var routes = [],
                        routeParams = {};
                    // create params for route
                        routeParams.templateUrl = 'routes/'+routeKey+'/'+routeKey+'.html';
                    // check if route has/need controller
                    if(angular.isDefined(_settings_['hasCtrl']) && _settings_.hasCtrl === true)
                        routeParams.controllerUrl = 'routes/'+routeKey+'/'+routeKey+'-ctrl';

                    // create route as defined or take simple route
                    if(angular.isDefined(_settings_['routes']))
                        routes = _settings_.routes;
                    else
                        routes.push('/'+routeKey);

                    // add route to provider
                    angular.forEach(routes,function(route){
                        $routeProvider.
                            when(route, angularAMD.route(routeParams));
                    });
                    // check otherwise
                    if(angular.isDefined(_settings_['isOtherwise'])){
                        $routeProvider.otherwise({
                            redirectTo: '/'+routeKey
                        });
                    }
                });
            }

            // start creation of routes
            createRoutes(app.cameo.routes);
        }
    ]);
    // app run handling
    app.run(['$rootScope', '$location', '$cookieStore',
        function ($rootScope, $location, $cookieStore) {
            $rootScope.$on("$routeChangeStart", function () {
                // expections
                var path_regex = /^(\/login|\/registration|\/terms|\/disclaimer|\/404|\/purl\/[a-zA-Z0-9]{1,})$/;
                var path = $location.$$path;
                // exists none token then otherwise to login
                if (angular.isUndefined($cookieStore.get("token"))) {
                    if (!path_regex.test(path)) {
                        $location.path("/login");
                    }
                } else if ($location.$$path == "/login") {
                    $location.path("/start");
                }
                // store token if is defined
                if (angular.isDefined($cookieStore.get("token"))) {
                    app.cameo.token = $cookieStore.get("token");
                }
            });
        }
    ]);
    // bootstrap app and all things after here use app.register.{ng-type}
    angularAMD.bootstrap(app);

    return app;
});