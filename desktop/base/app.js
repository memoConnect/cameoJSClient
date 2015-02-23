'use strict';

angular.module('cameoClient', [
    'ngRoute',
    'angular-loading-bar',
    // cameo dependencies
    'cmConfig',
    'cmRoutes',
    'cmWidgets',
    'cmDesktopWidgets',
    'cmCore',
    'cmPhonegap',
    'cmNodeWebkit',
    'cmUi',
    'cmDesktopUi',
    'cmSetup',
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
    'cmConfigProvider', 'cmEnvProvider', 'cmWebworkerFactoryProvider', 'cmRoutesProvider',
    function (cmLanguageProvider, cmLoggerProvider, cmApiProvider, cmCallbackQueueProvider,
              cmConfigProvider, cmEnvProvider, cmWebworkerFactoryProvider, cmRoutesProvider){

        cmLoggerProvider
            .debugEnabled( cmEnvProvider.get('enableDebug') );

        cmWebworkerFactoryProvider
            .setGlobalDefaultLimit( cmConfigProvider.get('webworkerDefaultGlobalLimit') )
            .setMobileDefaultLimit( cmConfigProvider.get('WebworkerDefaultLimitMobile') )
            .setAppDefaultLimit( cmConfigProvider.get('WebworkerDefaultLimitApp') )
            .setDesktopDefaultLimit( cmConfigProvider.get('WebworkerDefaultLimitDesktop') );

        cmApiProvider
            .restApiUrl( cmConfigProvider.get('restApi') )
            .callStackPath( cmConfigProvider.get('callStackPath') )
            .useCallStack( cmConfigProvider.get('useCallStack') )
            .commitSize( cmConfigProvider.get('commitSize') )
            .commitInterval( cmConfigProvider.get('commitInterval') )
            .useEvents( cmConfigProvider.get('useEvents') )
            .eventsPath( cmConfigProvider.get('eventsPath') )
            .eventsInterval( cmConfigProvider.get('eventsInterval') );

        cmLanguageProvider
            .cacheLangFiles( cmConfigProvider.get('cacheLangFiles') )
            .supportedLanguages( cmConfigProvider.get('supportedLanguages') )
            .pathToLanguages( cmConfigProvider.get('pathToLanguages') )
            .preferredLanguage('en')
            .useLocalStorage();

        cmCallbackQueueProvider
            .setQueueTime(250);

        cmRoutesProvider.create();
    }
])
// nodeWebkit
.run([
    'cmNodeWebkit', 'cmNodeWebkitMenu',
    function(cmNodeWebkit, cmNodeWebkitMenu){
        cmNodeWebkit.isAvailable('app.js', function(){
            // initialize Menu
            cmNodeWebkitMenu.init();
        });
    }
])
.run(function(){
    // start entropy collection for random number generator
    sjcl.random.startCollectors();
})
.run(['cmError', 'cmHistory',function(cmError, cmHistory){
    // only an inject is nessarary
}])
// router passing wrong route calls
.run([
    '$rootScope', '$location', '$route',
    'cmUserModel',
    function($rootScope, $location, $route,
             cmUserModel){

        function checkAccess(){
            var route = $route.current.$$route,
                guestVisibility =
                    route
                    && 'guests' in route
                        ? route.guests
                        : false,
                path = $location.$$path;

            switch(true){
                // exists none token then otherwise to login
                case cmUserModel.isAuth() === false:
                    if (!guestVisibility){
                        $rootScope.goTo('/login',true);
                    }
                    break;
                // when token exists
                case ((path == '/login' || path == '/registration') && cmUserModel.isGuest() !== true):
                    $rootScope.goTo('/talks',true);
                    break;
                // logout route
                case (path == '/logout'):
                    cmUserModel.doLogout(true,'app.js logout-route');
                    break;
            }
        }

        $rootScope.$on('$locationChangeSuccess', function(event){
            checkAccess();
        });
    }
])
.run(['cmUserModel', 'cmBrowserNotifications', '$rootScope', function(cmUserModel, cmBrowserNotifications, $rootScope){
    if(cmUserModel.isAuth()){
        cmBrowserNotifications.init();
    }

    $rootScope.$on('login', function(){
        cmBrowserNotifications.init();
    })
}])
/**
 * @TODO cmContactsModel anders initialisieren
 */
.run([
    'cmUserModel', 'cmConversationFactory', 'cmContactsModel', 'cmRootService',
    'cmSettings', 'cmLanguage', 'cmLogger', 'cfpLoadingBar', 'cmVersion',
    'cmApi', 'cmAuthenticationRequest', 'cmSystemCheck', 'cmEnv', 'cmConfig',
    '$rootScope', '$location', '$window', '$document', '$route', '$timeout',
    function (cmUserModel, cmConversationFactory, cmContactsModel, cmRootService,
              cmSettings, cmLanguage, cmLogger, cfpLoadingBar, cmVersion,
              cmApi, cmAuthenticationRequest, cmSystemCheck, cmEnv, cmConfig,
              $rootScope, $location, $window, $document, $route, $timeout) {

        //prep $rootScope with useful tools
        $rootScope.console  =   $window.console;
        $rootScope.alert    =   $window.alert;

        //add Overlay handles:
        $rootScope.showOverlay = function(id){ $rootScope.$broadcast('cmOverlay:show', id) };
        $rootScope.hideOverlay = function(id){ $rootScope.$broadcast('cmOverlay:hide', id) };

        // Make it easy for e2e-tests to monitor route changes:
        $window._route = {};

        $rootScope.$on('$routeChangeStart', function(){
            $window._route.path   = $location.$$path;
            $window._route.status = 'loading';
        });

        $rootScope.$on('$routeChangeSuccess', function(){
            $window._route.status = 'success';
        });

        $rootScope.$on('$routeChangeError', function(){
            $window._route.status = 'error';
        });

        // Set view width e.g. 32rem
        function initScreenWidth(rem){
            var html    = $document[0].querySelector('html'),
                app     = $document[0].querySelector('#cm-app'),
                minDim  = cmConfig.static.minimumDesktopDimension.split('x'); // 0=w & 1=h

            var height          = $window.innerHeight,
                width           = $window.innerWidth,
                landscape       = width > minDim[0] || width > height,
                effective_width = landscape ? Math.min(height, 420) : width,
                fontSizePx      = (effective_width/cmConfig.static.remSize),
                minWidthRem     = Math.ceil(minDim[0]/fontSizePx);

            html.style.fontSize = fontSizePx+'px';
            app.style.minWidth  = minWidthRem+'rem';
            angular.element(app).toggleClass('landscape', landscape);
        }

        // Actually set view width to 32 rem
        initScreenWidth();

        $timeout(function(){
            initScreenWidth();
        },1000);
        
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

        // Todo: whats is todo??
        if(cmUserModel.getToken())
            cmApi.listenToEvents();

        // Systemcheck
        cmSystemCheck.run(true);

    }
]);