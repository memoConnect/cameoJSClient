'use strict';

angular.module('cameoClient', [
    'ngRoute',
    'ngTouch',
    'angular-loading-bar',
    // cameo dependencies
    'cmConfig',
    'cmRoutes',
    'cmWidgets',
    'cmCore',
    'cmPhonegap',
    'cmUi',
    'cmSetup',
    'cmUser',
    'cmAppUser',
    'cmAppConversations',
    'cmContacts',
    'cmConversations',
    'cmValidate',
    'cmTouchEvents'
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
// app run handling
.run([
    'cmSslCertificateChecker', 'cmNetworkInformation', 'cmPushNotificationAdapter',
    'cmPhonegap', 'cmLauncher', 'cmSplashScreen',
    function(cmSslCertificateChecker, cmNetworkInformation, cmPushNotificationAdapter,
             cmPhonegap, cmLauncher, cmSplashScreen){

        cmPhonegap.isReady('app.js',function(){
            // check ssl certificate
            cmSslCertificateChecker.init();
            // check internet connection
            cmNetworkInformation.init();
            // register device for pushnotification
            cmPushNotificationAdapter.init();
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
.run(['cmUserModel', 'cmBrowserNotifications', '$rootScope', function(cmUserModel, cmBrowserNotifications, $rootScope){
    if(cmUserModel.isAuth()){
        cmBrowserNotifications.askPermission();
    }

    $rootScope.$on('login', function(){
        cmBrowserNotifications.askPermission();
    })
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

.run([
    '$rootScope', '$location', '$window', '$document', '$route', '$timeout',
    'cmUserModel', 'cmConversationFactory', 'cmContactsModel', 'cmRootService',
    'cmSettings', 'cmLanguage', 'cmLogger', 'cfpLoadingBar', 'cmEnv', 'cmVersion',
    'cmApi', 'cmAuthenticationRequest', 'cmSystemCheck',
    function ($rootScope, $location, $window, $document, $route, $timeout,
              cmUserModel, cmConversationFactory, cmContactsModel, cmRootService,
              cmSettings, cmLanguage, cmLogger, cfpLoadingBar, cmEnv, cmVersion,
              cmApi, cmAuthenticationRequest, cmSystemCheck) {

        //prep $rootScope with useful tools
        $rootScope.console  =   window.console;
        $rootScope.alert    =   window.alert;

        //add Overlay handles:
        $rootScope.showOverlay = function(id){ $rootScope.$broadcast('cmOverlay:show', id) };
        $rootScope.hideOverlay = function(id){ $rootScope.$broadcast('cmOverlay:hide', id) };

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
            html.style.overflowY = 'scroll';

            var height          = window.innerHeight,
                width           = html.offsetWidth,
                landscape       = width > 720 || width > height,
                effective_width = landscape ? Math.min(height, 420) : width;

            html.style.fontSize  = (effective_width/rem) +'px';
            app.style.maxWidth   = rem+'rem';
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
        angular.element($window).bind('resize', function(){
            var cm_app = $document[0].querySelector('#cm-app')
            if(cm_app.offsetWidth > $window.innerHeight){
                angular.element(cm_app).addClass('reduced-screen')
            } else {
                angular.element(cm_app).removeClass('reduced-screen')
            }
        });

        // Todo: whats is todo??
        if(cmUserModel.getToken())
            cmApi.listenToEvents()

        // Systemcheck
        cmSystemCheck.run(true);
    }
]);