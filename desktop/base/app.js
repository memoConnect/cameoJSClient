'use strict';

angular.module('cameoClient', [
    'ngRoute',
    'ngCookies',
    'angular-loading-bar',
    // cameo dependencies
    'cmConfig',
    'cmRoutes',
    'cmWidgets',
    'cmDesktopWidgets',
    'cmCore',
    'cmPhonegap',
    'cmUi',
    'cmDesktopUi',
    'cmUser',
    'cmDesktopUser',
    'cmContacts',
    'cmConversations',
    'cmDesktopConversations',
    'cmValidate'
])

// cameo configuration for our providers
.config([
    'cmLanguageProvider', 'cmLoggerProvider', 'cmApiProvider', 'cmCallbackQueueProvider',
    'cmConfigProvider', 'cmEnvProvider',
    function (cmLanguageProvider, cmLoggerProvider, cmApiProvider, cmCallbackQueueProvider,
              cmConfigProvider, cmEnvProvider){

        cmLoggerProvider
            .debugEnabled( cmEnvProvider.get('enableDebug') )

        cmApiProvider
            .restApiUrl( cmConfigProvider.get('restApi') )
            .callStackPath( cmConfigProvider.get('callStackPath') )
            .useCallStack( cmConfigProvider.get('useCallStack') )
            .commitSize( cmConfigProvider.get('commitSize') )
            .commitInterval( cmConfigProvider.get('commitInterval') )
            .useEvents( cmConfigProvider.get('useEvents') )
            .eventsPath( cmConfigProvider.get('eventsPath') )
            .eventsInterval( cmConfigProvider.get('eventsInterval') )

        cmLanguageProvider
            .cacheLangFiles( cmConfigProvider.get('cacheLangFiles') )
            .supportedLanguages( cmConfigProvider.get('supportedLanguages') )
            .pathToLanguages( cmConfigProvider.get('pathToLanguages') )
            .preferredLanguage('en_US')   //for now
            .useLocalStorage()

        cmCallbackQueueProvider
            .setQueueTime(250)
    }
])
// app route config
.config([
    '$routeProvider', '$locationProvider', 'cmConfigProvider',
    function ($routeProvider, $locationProvider, cmConfigProvider) {
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

        function ucfirst(str) {
            //  discuss at: http://phpjs.org/functions/ucfirst/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Onno Marsman
            // improved by: Brett Zamir (http://brett-zamir.me)
            //   example 1: ucfirst('kevin van zonneveld');
            //   returns 1: 'Kevin van zonneveld'

            str += '';
            var f = str.charAt(0)
                .toUpperCase();
            return f + str.substr(1);
        }

        function createRoutes(settings){
            angular.forEach(settings,function(_settings_, routeKey) {
                var routes = [],
                    routeParams = {
                        templateUrl: '',
                        controller: '',
                        css: '',
                        guests: false,
                        resolve: {},
                        isDefault: false
                    };
                // create params for route
                if (angular.isDefined(_settings_['templateUrl'])) {
                    routeParams.templateUrl = _settings_['templateUrl'];
                } else {
                    if(routeKey.indexOf('-') != -1){
                        var arr  = routeKey.split('-'),
                            ctrlRoute = '',
                            i = 0;

                        while(i < arr.length){
                            ctrlRoute += '/'+arr[i];
                            i++;
                        }

                        routeParams.templateUrl = 'routes' + ctrlRoute + '/' + routeKey + '.html';
                    } else {
                        routeParams.templateUrl = 'routes/' + routeKey + '/' + routeKey + '.html';
                    }
                }
                // check if route has/need controller
                if (angular.isDefined(_settings_['hasCtrl']) && _settings_.hasCtrl === true){

                    if(routeKey.indexOf('-') != -1){
                        var arr  = routeKey.split('-'),
                            ctrlRoute = '',
                            i = 0;

                        while(i < arr.length){
                            ctrlRoute += ucfirst(arr[i]);
                            i++;
                        }

                        routeParams.controller = ctrlRoute+'Ctrl';
                    // root ctrl
                    } else {
                        routeParams.controller = ucfirst(routeKey)+'Ctrl';
                    }
                }

                if (angular.isDefined(_settings_['css']))
                    routeParams.css = _settings_['css'];

                if (angular.isDefined(_settings_['guests']))
                    routeParams.guests = _settings_['guests'];

                // route resolver
                routeParams.resolve.i18n = function(cmBoot){
                    return cmBoot.isReady.i18n();
                };

                if (angular.isDefined(_settings_['resolveUserModel']) && _settings_['resolveUserModel'] == true){
                    routeParams.resolve.userModel = function(cmBoot) {
                        return cmBoot.isReady.userModel();
                    }
                }

                if (angular.isDefined(_settings_['resolvePurl']) && _settings_['resolvePurl'] == true){
                    routeParams.resolve.resolveData = function(cmBoot, $route) {
                        return cmBoot.isReady.purl($route.current.params.purlId);
                    }
                }

                if (angular.isDefined(_settings_['reloadOnSearch'])){
                    routeParams.reloadOnSearch = _settings_['reloadOnSearch'];
                }
                if(angular.isDefined(_settings_['isDefault'])){
                    routeParams.isDefault = _settings_['isDefault'];
                }

                // create route as defined or take simple route
                if(angular.isDefined(_settings_['routes']))
                    routes = _settings_.routes;
                else
                    routes.push('/'+routeKey);

                // add route to provider
                angular.forEach(routes,function(route){
                    $routeProvider.
                        when(route, routeParams);
                });
                // check otherwise
                if(angular.isDefined(_settings_['isDefault'])){
                    $routeProvider.otherwise({
                        redirectTo: '/'+routeKey
                    });
                }
            });
        }

        // start creation of routes
        createRoutes(cmConfigProvider.get('routes'));
    }
])
// app run handling
.run(['cmNetworkInformation', 'cmPushNotificationAdapter', 'cmPhonegap',
    function(cmNetworkInformation, cmPushNotificationAdapter, cmPhonegap){
        cmPhonegap.isReady(function(){
            // check internet connection
            cmNetworkInformation.init();
            // register device for pushnotification
            cmPushNotificationAdapter.init();
        });
}])
.run(function() {
    // disabled the 3000 seconds delay on click when touch ;)
    FastClick.attach(document.body);
})
.run(function(){
    // start entropy collection for random number generator
    sjcl.random.startCollectors();
})
.run(['cmError',function(cmError){
    // only an inject is nessarary
}])
/**
 * @TODO cmContactsModel anders initialisieren
 */
.run([
    '$rootScope',
    '$location',
    '$window',
    '$document',
    '$route',
    '$timeout',
    'cmUserModel',
    'cmConversationFactory',
    'cmContactsModel',
    'cmRootService',
    'cmSettings',
    'cmLanguage',
    'cmLogger',
    'cfpLoadingBar',
    'cmEnv',
    'cmVersion',
    'cmApi',
    'cmAuthenticationRequest',
    'cmSystemCheck',
    'cmError',
    function ($rootScope, $location, $window, $document, $route, $timeout,
              cmUserModel, cmConversationFactory, cmContactsModel, cmRootService, cmSettings,
              cmLanguage, cmLogger, cfpLoadingBar, cmEnv, cmVersion,
              cmApi, cmAuthenticationRequest, cmSystemCheck, cmError) {

        //prep $rootScope with useful tools
        $rootScope.console  =   window.console;
        $rootScope.alert    =   window.alert;

        // $rootScope.$watch(function(){
        //     cmLogger.debug('$digest!')
        // })

        //add Overlay handles:
        $rootScope.showOverlay = function(id){ $rootScope.$broadcast('cmOverlay:show', id) };
        $rootScope.hideOverlay = function(id){ $rootScope.$broadcast('cmOverlay:hide', id) };

        // passing wrong route calls
        $rootScope.$on('$routeChangeStart', function(){
            // expections
            var path_regex = /^(\/login|\/registration|\/systemcheck|\/terms|\/disclaimer|\/404|\/version|\/purl\/[a-zA-Z0-9]{1,})$/;
            var path = $location.$$path;
            // exists none token then otherwise to login
            if (cmUserModel.isAuth() === false){
                if (!path_regex.test(path)) {
                    $location.path('/login');
                }
            } else if ((path == '/login' || path == '/registration') && cmUserModel.isGuest() !== true) {
                $location.path('/talks');
            } else if (path == '/logout'){
                cmUserModel.doLogout(true,'app.js logout-route');
            }
        });

        // url hashing for backbutton
        $rootScope.urlHistory = [];
        // detect back button event
        window.onpopstate = function(){
            $rootScope.urlHistory.pop();
        };

        $rootScope.$on('$routeChangeSuccess', function(){
            // momentjs
            //$window.moment.lang(cmLanguage.getCurrentLanguage());

            // important for HTML Manipulation to switch classes etc.
            $rootScope.cmIsGuest = cmUserModel.isGuest();

            // handle url history for backbutton handling
            $rootScope.urlHistory = $rootScope.urlHistory || [];

            var currentRoute = $location.$$path,
                prevRoute = $rootScope.urlHistory.length > 0
                          ? $rootScope.urlHistory[$rootScope.urlHistory.length - 1]
                          : '';

            // clear history in some cases
            if(
                currentRoute.indexOf('/login') != -1 // when login route
             //|| currentRoute == prevRoute // current is the same then is startPage
            ) {
                $rootScope.urlHistory = [];
            // push new route
            } else if(currentRoute !== prevRoute) {
                $rootScope.urlHistory.push($location.$$path);
            }
        });

        // Make it easy for e2e-tests to monitor route changes:
        window._route = {};

        $rootScope.$on('$routeChangeStart', function(){
            window._route.path   = $location.$$path;
            window._route.status = 'loading';
        });

        $rootScope.$on('$routeChangeSuccess', function(){
            window._route.status = 'success';
        });

        $rootScope.$on('$routeChangeError', function(){
            window._route.status = 'error';
        });

        // Set view width e.g. 32rem
        function initScreenWidth(rem){
            var html    = $document[0].querySelector('html'),
                app     = $document[0].querySelector('#cm-app');

            //prevent screen size to change when content overflows
            //html.style.overflowY = 'scroll';

            var height          = window.innerHeight,
                width           = html.offsetWidth,
                landscape       = width > 720 || width > height,
                effective_width = landscape ? Math.min(height, 420) : width;

            html.style.fontSize  = (effective_width/rem) +'px';
            app.style.minWidth   = (rem*3)+'rem';
            angular.element(app).toggleClass('landscape', landscape);
        }

        // Actually set view width to 32 rem
        initScreenWidth(32);

        $timeout(function(){
            initScreenWidth(32);
        },1000);

        // For dev purposes only:
//            window.onresize = function() {
//                initScreenWidth(32)
//            }

        /**
         * Loading Bar on RouteChange
         */
        $rootScope.$on('$routeChangeStart', function(){
            if(cmEnv.loadingBar !== false){
                cfpLoadingBar.start();
            }
        });

        $rootScope.$on('$routeChangeSuccess', function(){
            if(cmEnv.loadingBar !== false){
                cfpLoadingBar.complete();
            }
        });

        //check on resize if the screen is too small for header an footer ( i.e. onscreen keyboard is active)
//        angular.element($window).bind('resize', function(){
//            var cm_app = $document[0].querySelector('#cm-app')
//            if(cm_app.offsetWidth > $window.innerHeight){
//                angular.element(cm_app).addClass('reduced-screen')
//            } else {
//                angular.element(cm_app).removeClass('reduced-screen')
//            }
//        });

        // Todo: whats is todo??
        if(cmUserModel.getToken())
            cmApi.listenToEvents()

        // Systemcheck
        cmSystemCheck.run(true);

    }
]);