define([
    'angularAMD',
    'angular-route',
    'angular-cookies',
    'angular-swipe',
    // cameo files
//    'cmCron',
    'cmLocalStorage',
    'cmApi',
    'cmAuth',
    'cmUserModel',
    'cmIdentity',
    'cmObject',

    'cmLanguage',
    'cmLogger',
    'cmNotify',


    'pckUi',
    'base/config'
], function (angularAMD) {
    'use strict';

    var app = angular.module('cameoClient', [
        'ngRoute',
        'ngCookies',
        'swipe',
        'ui.bootstrap',
        'cmObject',
        // insert cameo provider
        'cmApi',
        'cmUi',
        'cmLanguage',
        'cmNotify',
        'cmLogger',
        'cmLocalStorage',
//        'cmCron',
        'cmAuth',
        'cmUserModel',
        'cmIdentity'
    ]);

    app.constant('cmEnv',cameo_config.env);
    app.constant('cmVersion',{version:cameo_config.version, last_build:'-'});

    //cameo_config = cameo_config

    // cameo configuration for our providers
    app.config([
        'cmLanguageProvider',
        'cmLoggerProvider',
        'cmApiProvider',
        function (cmLanguageProvider, cmLoggerProvider, cmApiProvider){
            cmLoggerProvider
                .debugEnabled(true)

            cmApiProvider
                .restApiUrl( cameo_config.restApi );

            cmLanguageProvider
                .cacheLangFiles(cameo_config.cache_lang_files)
                .supportedLanguages( cameo_config.supported_languages)
                .pathToLanguages( cameo_config.path_to_languages)
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
                        routeParams = {
                            templateUrl: "",
                            controllerUrl: "",
                            css: ""
                        };
                    // create params for route
                    if(angular.isDefined(_settings_['templateUrl'])){
                        routeParams.templateUrl = _settings_['templateUrl'];
                    } else {
                        routeParams.templateUrl = 'routes/'+routeKey+'/'+routeKey+'.html';
                    }
                    // check if route has/need controller
                    if(angular.isDefined(_settings_['hasCtrl']) && _settings_.hasCtrl === true)
                        routeParams.controllerUrl = 'routes/'+routeKey+'/'+routeKey+'-ctrl';

                    if(angular.isDefined(_settings_['css']))
                        routeParams.css = _settings_['css'];

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
            createRoutes(cameo_config.routes);
        }
    ]);

    // app run handling
    app.run(['$rootScope', '$location', '$window', '$route', 'cmUserModel',
        function ($rootScope, $location, $window, $route, cmUserModel) {

            //prep $rootScope with useful tools
            $rootScope.console = console
            $rootScope.alert   = alert

            //add Overlay handles:
            $rootScope.showOverlay = function(id){ $rootScope.$broadcast('cmOverlay:show', id) }
            $rootScope.hideOverlay = function(id){ $rootScope.$broadcast('cmOverlay:hide', id) }

            // hide app spinner
            angular.element($window.document.getElementsByClassName('app-spinner')[0]).css('display','none');

            // passing wrong route calls
            $rootScope.$on("$routeChangeStart", function(){
                // expections
                var path_regex = /^(\/login|\/registration|\/terms|\/disclaimer|\/404|\/version|\/purl\/[a-zA-Z0-9]{1,})$/;
                var path = $location.$$path;
                // exists none token then otherwise to login
                if (cmUserModel.isAuth() === false){
//                    cmNotify.warn($cookies.token+' run without token '+path+' '+(!path_regex.test(path)?'to login':'stay'))
                    if (!path_regex.test(path)) {
                        $location.path("/login");
                    }
                } else if (path == "/login" || path == "/registration") {
                    $location.path("/talks");
                } else if (path == "/logout"){
                    cmUserModel.doLogout();
                }
            });

            // url hashing for backbutton
            $rootScope.urlHistory = [];

            window.onpopstate = function(){
                $rootScope.urlHistory.pop();
            };

            $rootScope.$on('$routeChangeSuccess', function(schmu, _currentRoute_, _prevRoute_){
                $rootScope.urlHistory = $rootScope.urlHistory || [];
                if(
                       !_currentRoute_
                    || !_currentRoute_.$$route 
                    || !_currentRoute_.$$route.originalPath
                    || !_prevRoute_
                    || !_prevRoute_.$$route
                ) return null
                    
                var currentRoute = _currentRoute_.$$route.originalPath,
                    prevRoute = _prevRoute_ ? _prevRoute_.$$route.originalPath: '';

                if(currentRoute.indexOf("/login") != -1 || currentRoute == prevRoute)
                    $rootScope.urlHistory = [];
                else if(currentRoute !== $rootScope.urlHistory[$rootScope.urlHistory.length - 1]) {
                    $rootScope.urlHistory.push(currentRoute);
                }
                
            });
            
            

            //Make it easy for e2e-tests to monitor route changes:
            window._route = {}

            $rootScope.$on('$routeChangeStart', function(){
                window._route.path   = $location.$$path
                window._route.status = 'loading'
            })

            $rootScope.$on('$routeChangeSuccess', function(){
                window._route.status = 'success'
            })

            $rootScope.$on('$routeChangeError', function(){
                window._route.status = 'error'
            })


            //Set view width e.g. 32rem
            function initScreenWidth(rem){
                var html    = document.getElementsByTagName('html')[0],
                    app     = document.getElementById('cm-app');

                //prevent screen size to change when content overflows
                html.style.overflowY = 'scroll'                    

                var height          = window.innerHeight,
                    width           = html.offsetWidth,                      
                    landscape       = width > height,
                    effective_width = landscape ? Math.min(height, 420) : width

                html.style.fontSize  = (effective_width/rem) +'px'
                app.style.maxWidth   = rem+'rem'
                angular.element(app).toggleClass('landscape', landscape)
            }

            //Actually set view width to 32 rem
            initScreenWidth(32)

            //For dev purposes only:
//            window.onresize = function() { initScreenWidth(32) }

        }
    ]);
    // bootstrap app and all things after here use app.register.{ng-type}
    angularAMD.bootstrap(app);

    return app;
});