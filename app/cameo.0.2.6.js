var cameo_config = {
    restApi: 'http://192.168.178.83:9000/a/v1',
    version: '0.2.6',

    commitSize: 50,
    commitInterval: 500,
    useCallStack: false,
    callStackPath: '/callStack',
    useEvents: true,
    eventsPath: '/eventSubscription',
    eventsInterval: '5000',

    token: null,
    supported_languages: ['de_DE', 'en_US'],
    path_to_languages: 'i18n',
    cache_lang_files: false,
    routes: {
        'start': {
            guests: false,
            routes: ['/start'],
            resolveUserModel: true
        },
        'start-welcome': {
            guests: false,
            routes: ['/start/welcome'],
            resolveUserModel: true
        },
        'start-quickstart': {
            hasCtrl: true,
            guests: false,
            routes: ['/start/quickstart']
        },
        'start-keyinfo': {
            guests: false,
            routes: ['/start/keyinfo'],
            resolveUserModel: true
        },
        'login': {
            isDefault: true,
            css: 'no-header no-footer',
            guests: false
        },
        'settings': {
            routes: ['/settings'],
            guests: false
        },
        'settings-account': {
            routes: ['/settings/account'],
            guests: false
        },
        'settings-about': {
            routes: ['/settings/about'],
            guests: false
        },
        'settings-app': {
            routes: ['/settings/app'],
            guests: false
        },
        'settings-notify': {
            routes: ['/settings/notify'],
            guests: false
        },
        'settings-identity-list': {
            guests: false,
            routes: ['/settings/identity/list']
        },
        'settings-identity-create': {
            guests: false,
            routes: ['/settings/identity/create']
        },
        'settings-identity-edit': {
            guests: false,
            routes: ['/settings/identity/edit']
        },
        'settings-identity-key-list': {
            guests: false,
            routes: ['/settings/identity/key/list']
        },
        'settings-identity-key-create': {
            hasCtrl: true,
            guests: false,
            routes: ['/settings/identity/key/create']
        },
        'settings-identity-key-edit': {
            guests: false,
            routes: ['/settings/identity/key/edit/:keyId?']
        },
        'settings-identity-key-import': {
            guests: false,
            routes: ['/settings/identity/key/import']
        },
        'authentication' :{
            hasCtrl: true,
            routes: [
                '/authentication/:keyId?',
                '/authentication/identity/:identityId?'
            ],
            resolveUserModel: true,
            guests: false
        },
        'talks': {
            resolveUserModel: true
        },
        'mediawall': {

        },
        'conversation': {
            routes:[
                '/conversation',
                '/conversation/:conversationId?'
            ],
            hasCtrl: true,
            resolveUserModel: true
        },
        'conversation-security': {
            routes:[
                '/conversation/:conversationId/security'
            ],
            hasCtrl: true,
            resolveUserModel: true
        },
        'conversation-recipients': {
            routes:[
                '/conversation/:conversationId/recipients'
            ],
            hasCtrl: true,
            resolveUserModel: true
        },
        'purl': {
            routes:[
                '/purl/:purlId'
            ],
            hasCtrl: true,
            guests: true,
            resolvePurl: true
        },
        'purl-security': {
            routes:[
                '/purl/:purlId/security'
            ],
            hasCtrl: true,
            guests: true,
            resolvePurl: true
        },
        'purl-recipients': {
            routes:[
                '/purl/:purlId/recipients'
            ],
            hasCtrl: true,
            guests: true,
            resolvePurl: true
        },
        'registration': {
            guests: true
        },
        'systemcheck': {
            guests: true
        },
        'profile': {

        },
        'filter': {
            hasCtrl: true
        },
        'contact-list': {
            routes:[
                '/contact/list/:section?',
                '/contact',
                '/contacts'
            ],
            resolveUserModel: true
        },
        'contact-request-list': {
            routes:[
                '/contact/request/list',
                '/contact/request'
            ],
            hasCtrl: true,
            resolveUserModel: true
        },
        'contact-search':  {
            routes:['/contact/search']
        },
        'contact-create': {
            routes:['/contact/create']
        },
        'contact-import': {
            routes:['/contact/import']
        },
        'contact-edit': {
            routes:['/contact/edit/:id?'],
            hasCtrl: true
        },
        'verification': {
            routes:['/verification/:secret']
        },
        'server_down' : {
            templateUrl: 'routes/landingpages/server_down.html'
        },
        'terms': {
            css: 'no-footer',
            guests: true
        },
        'disclaimer': {
            guests: true
        },
        '404': {
            templateUrl:'routes/landingpages/404.html'
        },
        'version': {
            hasCtrl: true,
            guests: true
        },
        'notifications': {
            hasCtrl: true
        },
        'error':{
            routes: ['/error'],
            hasCtrl: true,
            templateUrl: 'routes/error/error.html',
            guests: true
        }
    },

    env: {
        autoLogin: ('true' == 'true'),
        loadingBar: ('true' == 'true'),
        enableDebug: ('true' == 'true'),
        isiOS: ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ),
        isNotMobile: (function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return !check;
        })()
    },

    autologin: {
        'Dumpuser local': {
            user: '2VqTftqh',
            pass: 'password'
        },
        'SillySammet dev': {
            user: 'silly_sammet',
            pass: 'password'
        }
    },

    menu: {
        'conversation/new': {i18n:'MENU.NEW_TALK', icon:'cm-new-talk'},
        'contact/create': {i18n:'MENU.NEW_CONTACT', icon:'cm-new-contact'},
        'settings/identity/key/list': {i18n:'MENU.OWN_KEYS', icon:'cm-key'},
        'contact/request/list': {'data-qa':'btn-menu-contact-requests', i18n:'MENU.REQUESTS', icon:'cm-new-contact-query', css:'cm-menu-notify qa-btn-request-notify', drtv:'cm-friend-request-counter'},
        'settings': {i18n:'MENU.SETTINGS', icon:'cm-settings'},
        'start/quickstart': {i18n:'START.QUICKSTART.HEADLINE', icon:'cm-info'}
    },

    footer: {
        'talks': {i18n:'DRTV.FOOTER.TALKS', icon:'cm-talk'},
        'contact/list': {i18n:'DRTV.FOOTER.CONTACTS', icon:'cm-person'}
    },

    routeSettings: {
        'account': {i18n:'SETTINGS.ACCOUNT', icon:'cm-person', 'data-qa':'btn-settingsAccount'},
        'identity/edit': {i18n:'SETTINGS.IDENTITY', icon:'cm-avatar'},
        'identity/key/list': {i18n:'MENU.OWN_KEYS', icon:'cm-key'},
        'notify': {i18n:'SETTINGS.NOTIFY', icon:'cm-bell'},
        'contacts': {i18n:'SETTINGS.CONTACTS', icon:'cm-address-book', disabled:true},
        'app': {i18n:'SETTINGS.APP', icon:'cm-fix'},
        'contracts': {i18n:'SETTINGS.CONTRACTS', icon:'cm-clipboard', disabled:true},
        'about': {i18n:'SETTINGS.PAGES.ABOUT_US.TITLE', icon:'cm-rhino-positive'}
    }
};
// performance page
if('true' == 'true') {
    cameo_config.menu['performance'] = {i18n: 'SETTINGS.PAGES.PERFORMANCE.TITLE', icon: 'cm-not-connected', link: 'performance.html'};
}

'use strict';

angular.module('cameoClient', [
    'ngRoute',
    'ngCookies',
    'swipe',
    'angular-loading-bar',
    // cameo dependencies
    'cmRoutes',
    'cmWidgets',
    'cmCore',
    'cmPhonegap',
    'cmUi',
    'cmUser',
    'cmContacts',
    'cmConversations',
    'cmValidate'
])

.constant('cmEnv',cameo_config.env)
.constant('cmVersion',{version:cameo_config.version, last_build:'-'})
.constant('cmConfig',cameo_config)

// cameo configuration for our providers
.config([
    'cmLanguageProvider',
    'cmLoggerProvider',
    'cmApiProvider',
    'cmCallbackQueueProvider',

    function (cmLanguageProvider, cmLoggerProvider, cmApiProvider, cmCallbackQueueProvider){
        cmLoggerProvider
            .debugEnabled(cameo_config.env.enableDebug)

        cmApiProvider
            .restApiUrl( cameo_config.restApi )
            .callStackPath( cameo_config.callStackPath )
            .useCallStack( cameo_config.useCallStack )
            .commitSize( cameo_config.commitSize )
            .commitInterval( cameo_config.commitInterval )
            .useEvents( cameo_config.useEvents )
            .eventsPath( cameo_config.eventsPath )
            .eventsInterval( cameo_config.eventsInterval )

        cmLanguageProvider
            .cacheLangFiles(cameo_config.cache_lang_files)
            .supportedLanguages( cameo_config.supported_languages)
            .pathToLanguages( cameo_config.path_to_languages)
            .preferredLanguage('en_US')   //for now
            .useLocalStorage()

        cmCallbackQueueProvider
            .setQueueTime(250)
    }
])
// app route config
.config([
    '$routeProvider',
    '$locationProvider',
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
        createRoutes(cameo_config.routes);
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
              cmUserModel, cmContactsModel, cmRootService, cmSettings,
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
'use strict';

angular.module('comps/contacts/drtv-add-external-contact.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-add-external-contact.html',
'<h3 ng-click="toggleForm()"> {{\'DRTV.EXTERN_CONTACT.HEADER\'|cmTranslate}} <i class="fa" ng-class="{\'fa-angle-up\':formVisible,\'fa-angle-down\':!formVisible}"></i></h3><form class="form-horizontal" name="addExternContact" ng-show="formVisible" ng-submit="checkForm()"><div class="form-group"><label class="{{labelSize}} control-label">{{\'CONTACTS.LABEL.DISPLAYNAME\'|cmTranslate}}*</label><div class="{{colSize}}"><div class="input-group"><input tabindex="1" type="text" class="form-control" name="displayName" ng-model="data.displayName" required ng-keyup="handlePristine()" /><span class="input-group-addon self-size"><i class="fa" ng-class="{\'fa-check\':!displayNameExists,\'fa-times\':displayNameExists}"></i></span></div><div class="alert alert-danger alert-mini-padding" ng-show="addExternContact.displayName.$valid && displayNameExists"> {{\'DRTV.EXTERN_CONTACT.INFO.DISPLAYNAME_EXISTS\'|cmTranslate}}</div></div></div><div class="form-group"><label class="{{labelSize}} control-label">{{\'CONTACTS.LABEL.NAME\'|cmTranslate}}*</label><div class="{{colSize}}"><input tabindex="2" type="text" class="form-control" name="name" ng-model="data.name" ng-keyup="createDisplayName()" required /></div></div><div class="form-group"><label class="{{labelSize}} control-label">{{\'CONTACTS.LABEL.SURNAME\'|cmTranslate}}*</label><div class="{{colSize}}"><input tabindex="3" type="text" class="form-control" name="surName" ng-model="data.surName" ng-keyup="createDisplayName()" required /></div></div><div class="form-group"><label class="{{labelSize}} control-label">{{\'DRTV.VALIDATE_PHONE.LABEL\'|cmTranslate}}</label><div class="{{colSize}}"><input tabindex="4" type="text" class="form-control" name="phone" ng-model="data.phone" cm-validate-phone cm-adaptive-change placeholder="{{\'DRTV.VALIDATE_PHONE.PLACEHOLDER\'|cmTranslate}}" /><div cm-type-chooser choose-to-data="phoneProvider" choose-type="provider"></div><div cm-type-chooser choose-to-data="phoneType"></div><div class="alert alert-danger alert-mini-padding" ng-show="addExternContact.phone.$dirty && addExternContact.phone.$invalid"> {{\'DRTV.VALIDATE_PHONE.INFO.INVALID_PHONE_NUMBER\'|cmTranslate}}</div></div></div><div class="form-group"><label class="{{labelSize}} control-label">{{\'DRTV.VALIDATE_EMAIL.LABEL\'|cmTranslate}}</label><div class="{{colSize}}"><input tabindex="5" type="text" class="form-control" name="email" ng-model="data.email" placeholder="{{\'DRTV.VALIDATE_EMAIL.PLACEHOLDER\'|cmTranslate}}" cm-validate-email /><div cm-type-chooser choose-to-data="email_type"></div><div class="alert alert-danger alert-mini-padding" ng-show="addExternContact.email.$dirty && addExternContact.email.$invalid"> {{\'DRTV.VALIDATE_EMAIL.INFO.INVALID\'|cmTranslate}}</div></div></div><div class="form-group"><div class="{{offsetSize}} {{colSize}}"><button type="submit" class="btn btn-primary btn-sm" ng-disabled="stateBusy">{{\'CONTACTS.BUTTON.SUBMIT\' |cmTranslate}}</button><button type="reset" class="btn btn-sm btn-link">{{\'CONTACTS.BUTTON.RESET\'|cmTranslate}}</button></div></div></form>');
}]);
angular.module('comps/contacts/drtv-contact-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-contact-create.html',
'<article class="content edit-identity-head clearfix"><div class="cm-fl mr5"><cm-avatar cm-data="identity" cm-view="{{chooseAvatar?\'unknown\':\'\'}}" ng-if="identity" class="big"></cm-avatar></div></article><hr class="margin-small" /><form name="cmForm" novalidate autocomplete="off"><article class="content"><label>{{\'CONTACT.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon" ng-class="{\'cm-input-disabled\':disabled}"><input tabindex="1" data-qa="input-displayname" type="text" name="displayName" ng-model="identity.displayName" ng-disabled="disabled" /><i class="fa cm-write"></i></div><cm-info-bubble class="cm-alert" ng-show="cmForm.displayName.$dirty && cmForm.displayName.$invalid"><div ng-show="cmForm.displayName.$error.required"><i class="fa cm-info"></i> {{\'CONTACT.INFO.EMPTY.DISPLAYNAME\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><label class="content">{{\'CONTACT.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><cm-multi-input cm-collection="formData.phoneNumbers" cm-disabled="disabled" class="content"><ng-form name="formPhone"><div class="cm-input-ctn with-chooser with-inside-icon" ng-class="{\'cm-input-disabled\':disabled}"><input tabindex="2" data-qa="input-phonenumber" type="text" name="phoneNumber" ng-model="item.value" ng-disabled="disabled" cm-validate-phone cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item" cm-disabled="disabled" ng-class="{\'cm-input-disabled\':disabled}"></div>--><cm-info-bubble class="cm-alert" ng-show="formPhone.phoneNumber.$dirty && formPhone.phoneNumber.$invalid"><div ng-show="formPhone.phoneNumber.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input><hr class="margin-small" /><label class="content">{{\'CONTACT.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><cm-multi-input cm-collection="formData.emails" cm-disabled="disabled" class="content"><ng-form name="formEmail"><div class="cm-input-ctn with-chooser with-inside-icon" ng-class="{\'cm-input-disabled\':disabled}"><input tabindex="3" data-qa="input-email" name="email" ng-model="item.value" ng-disabled="disabled" cm-validate-email cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item" ng-class="{\'cm-input-disabled\':disabled}" cm-disabled="disabled"></div>--><cm-info-bubble class="cm-alert" ng-show="formEmail.email.$dirty && formEmail.email.$invalid"><div ng-show="formEmail.email.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.EMAIL\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input></form><cm-footer ng-hide="disabled"><button data-qa="btn-create-contact" class="cm-btn-grey" id="registerUserButton" ng-click="saveUser()"><span ng-show="!showLoader"> {{\'CONTACT.FOOTER.SAVE\'|cmTranslate}} <i class="fa cm-checkbox-right"></i></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('comps/contacts/drtv-contact-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-contact-import.html',
'<article class="content" ng-click="chooseContact()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_RIGHTS\' | cmParse"></span></cm-info-bubble></article><hr class="margin-small" /><form name="cmForm" novalidate autocomplete="off"><article class="content"><label>{{\'CONTACT.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon cm-icon-grey"><input tabindex="1" data-qa="input-displayname" type="text" name="displayName" ng-model="identity.displayName" required /><i class="fa cm-write"></i></div><cm-info-bubble class="cm-alert" ng-show="error.displayName"><div ng-show="error.displayName"><i class="fa cm-info"></i> {{\'CONTACT.INFO.EMPTY.DISPLAYNAME\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><cm-multi-input cm-collection="formData.phoneNumbers"><article class="content"><ng-form name="formPhone" class="with-radiobutton"><label> {{\'CONTACT.PLACEHOLDER.PHONENUMBER\'|cmTranslate }}<span ng-if="item.type">&nbsp;{{item.type}}</span></label><div class="cm-input-ctn with-inside-icon cm-icon-grey"><input tabindex="2" data-qa="input-phonenumber" type="text" name="phoneNumber" ng-model="item.value" cm-validate-phone cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" ng-show="formPhone.phoneNumber.$dirty && formPhone.phoneNumber.$invalid"><div ng-show="formPhone.phoneNumber.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.PHONENUMBER\'|cmTranslate}}<span ng-if="item.type">&nbsp;{{item.type}}</span></div></cm-info-bubble><i class="fa cm-radio-0" ng-class="{\'cm-radio-1\':isSelected(item,\'phoneNumber\')}" ng-click="chooseItem(item,\'phone\')"></i></ng-form></article></cm-multi-input><article class="content"><cm-info-bubble class="cm-alert" ng-show="error.selectPhoneNumber"><div ng-show="error.selectPhoneNumber"><i class="fa cm-info"></i> {{\'CONTACT.INFO.SELECT.PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><cm-multi-input cm-collection="formData.emails"><article class="content"><ng-form name="formEmail" class="with-radiobutton"><label> {{\'CONTACT.PLACEHOLDER.EMAIL\'|cmTranslate }}<span ng-if="item.type">&nbsp;{{item.type}}</span></label><div class="cm-input-ctn with-inside-icon cm-icon-grey"><input tabindex="3" data-qa="input-email" name="email" ng-model="item.value" cm-validate-email /><i class="fa cm-write"></i></div><cm-info-bubble class="cm-alert" ng-show="formEmail.email.$dirty && formEmail.email.$invalid"><div ng-show="formEmail.email.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.EMAIL\'|cmTranslate}}<span ng-if="item.type">>&nbsp;{{item.type}}</span></div></cm-info-bubble><i class="fa cm-radio-0" ng-class="{\'cm-radio-1\':isSelected(item,\'email\')}" ng-click="chooseItem(item,\'email\')"></i></ng-form></article></cm-multi-input><article class="content"><cm-info-bubble class="cm-alert" ng-show="error.selectEmail"><div ng-show="error.selectEmail"><i class="fa cm-info"></i> {{\'CONTACT.INFO.SELECT.EMAIL\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button data-qa="btn-create-contact" class="cm-btn-grey" id="registerUserButton" ng-click="importContact()"><span ng-show="!showLoader"> {{\'CONTACT.FOOTER.SAVE\'|cmTranslate}} <i class="fa cm-checkbox-right"></i></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('comps/contacts/drtv-contact-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-contact-list.html',
'<cm-loader ng-show="isLoading" class="fullscreen"></cm-loader><article class="content" ng-if="!contacts.length && !isLoading"><cm-info-bubble class="cm-alert"><i class="fa cm-info"></i> {{"CONTACTS.LIST_EMPTY"|cmTranslate}}</cm-info-bubble></article><ul><li ng-repeat="contact in contacts | cmSearch:\'contacts\':search | cmPendingFirst"><cm-contact-tag cm-contact="contact" ng-class="{\'cm-disabled\':contact.contactType == \'pending\'}" ng-click="editContact(contact)"></cm-contact-tag></li></ul>');
}]);
angular.module('comps/contacts/drtv-contact-quick.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-contact-quick.html',
'<form ng-submit="save()" name="cmForm"><article class="content"><label>{{\'CONTACT.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn"><input tabindex = "2" data-qa = "input-on-the-fly-displayname" type = "text" name = "displayName" ng-model = "displayName" /></div><cm-info-bubble class="cm-alert" ng-show="cmForm.displayName.$dirty && cmForm.displayName.$invalid && cmForm.displayName.length > 0"><div ng-show="cmForm.displayName.$error.required"><i class="fa cm-info"></i> {{\'CONTACT.INFO.EMPTY.DISPLAYNAME\'|cmTranslate}}</div></cm-info-bubble></article><article class="content"><label> {{\'SETTINGS.PAGES.IDENTITY.CREATE.PLACEHOLDER.PHONENUMBER\'|cmTranslate}} / {{\'SETTINGS.PAGES.IDENTITY.CREATE.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn"><input tabindex = "2" data-qa = "input-on-the-fly-mixed" type = "text" name = "mixed" ng-model = "mixed" cm-adaptive-change cm-validate-mixed required /></div><cm-info-bubble class="cm-alert" ng-show="mixed && cmForm.mixed.$invalid"><i class="fa cm-new-contact"></i> {{\'CONTACT.INFO.INVALID.MIXED\'|cmTranslate}}</cm-info-bubble></article><button type="submit" data-qa="btn-submit-on-the-fly-contact"><i ng-show="!showLoader" class="fa cm-new-contact"></i><cm-loader ng-show="showLoader"></cm-loader></button></form>');
}]);
angular.module('comps/contacts/drtv-contact-tag.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-contact-tag.html',
'<cm-avatar cm-data="contact.identity"></cm-avatar><section class="identityName" ><div class="displayName" data-qa="contact-display-name">{{contact.identity.getDisplayName()}}</div></section><section class="icon-list" ng-click="startConversation($event,contact)" data-qa="start-new-conversation-btn"><cm-contact-type cm-data="contact"></cm-contact-type><i class="fa cm-new-talk" ng-hide="contact.contactType == \'pending\'"></i></section>');
}]);
angular.module('comps/contacts/drtv-contacts-filter-controls.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-contacts-filter-controls.html',
'<div class="sort"><button ng-click="show_sort_overlay = !show_sort_overlay" > {{"CONTACTS.LABEL.SORT"|cmTranslate}}<i class="fa cm-arrange"></i></button><ul class = "overlay" ng-show = "show_sort_overlay" ><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li><li>item 5</li><li>item 6</li></ul></div><div class="filter"><button ng-click = "show_filter_overlay = !show_filter_overlay" > {{"CONTACTS.LABEL.FILTER"|cmTranslate}}<i class="fa cm-filter"></i></button><ul class = "overlay" ng-show = "show_filter_overlay" ><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li><li>item 5</li><li>item 6</li></ul></div>');
}]);
angular.module('comps/contacts/drtv-modal-add-contact.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-modal-add-contact.html',
'<cm-modal id="{{modalId}}" cm-title="CONTACTS.HEADING.NEW_CONTACTS" type="plain" nose="top-right" severity="info" nose-position="{{nosePosition||0}}" class="no-padding"><div class="modal-row"><a href="#/contact/search" class="modal-link"><i class="fa cm-search"></i> {{"CONTACTS.LABEL.SEARCH_IDENTITY"|cmTranslate}}</a></div><div class="modal-row"><a href="#/contact/create" class="modal-link"><i class="fa cm-new-contact"></i> {{"CONTACTS.LABEL.ADD_EXTERN"|cmTranslate}}</a></div><div class="modal-row" ng-if="canReadLocalContacts()"><a href="#/contact/import" class="modal-link"><i class="fa cm-mobile"></i> {{"CONTACTS.LABEL.IMPORT_LOCAL"|cmTranslate}}</a></div></cm-modal>');
}]);
angular.module('comps/contacts/drtv-request-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-request-list.html',
'<article class="content" ng-show="isLoading"><cm-loader></cm-loader></article><article class="content"ng-show="!requests.length && !isLoading"><cm-info-bubble nose-x="45%" class="cm-alert"><i class="fa cm-info"></i> {{\'CONTACTS.INFO.NO_REQUESTS\'|cmTranslate}}</cm-info-bubble></article><section class="mt15" ng-if="(requests.length > 0)"><ul class="no-border"><li ng-repeat="request in requests" class="contact-request-item" data-qa="contact-list-element"><div><cm-avatar cm-data="request.identity"></cm-avatar><section cm-weight="4" class="requestIdentity w75"><div class="displayName" data-qa="contact-display-name">{{request.identity.getDisplayName()}}</div></section></div><article class="content mt15 mb15" ng-if="(request.message && request.message != \'\')"><cm-info-bubble nose-x="30%"> {{request.message}}</cm-info-bubble></article><div class="cm-request-bar"><button ng-click="acceptRequest(request)" data-qa="btn-acceptRequest"><i class="fa cm-checkbox-right"></i>{{\'CONTACTS.REQUESTS.ACCEPT\'|cmTranslate}}</button><button ng-click="rejectRequest(request)" data-qa="btn-rejectRequest"><i class="fa cm-reject"></i> {{\'CONTACTS.REQUESTS.REJECT\'|cmTranslate}}</button><!--<button ng-click="ignoreRequest(request)" ng-if="false"><i class="fa cm-ignore"></i> {{\'CONTACTS.REQUESTS.IGNORE\'|cmTranslate}}</button>--></div></li></ul></section>');
}]);
angular.module('comps/contacts/drtv-search.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-search.html',
'<h2><i class="fa cm-search"></i> {{\'CONTACTS.HEADING.SEARCH\'|cmTranslate}}</h2><cm-modal id="modalSendRequest" class="no-padding" cm-data-as="contact" cm-title="CONTACTS.HEADING.SEND_REQUEST"><div class="modal-row" cm-rubber-space><cm-avatar cm-data="contact"></cm-avatar><div class="cm-request-brief" cm-weight="1"><strong>{{contact.getDisplayName()}}</strong></div></div><div class="modal-row"><textarea placeholder="{{\'CONTACTS.PLACEHOLDER.REQUEST_MESSAGE\'|cmTranslate}}" ng-model="contact.message" data-qa="input-friendrequestMessage"></textarea></div><button class="cm-btn-grey" ng-click="sendRequest(contact)" data-qa="btn-sendRequest"> {{\'CONTACTS.LABEL.SEND_REQUEST\'|cmTranslate}}<i class="fa cm-send"></i></button></cm-modal><article class="content"><form name="searchCameoId" autocomplete="off"><div class="cm-input-ctn with-inside-icon"><input data-qa="inp-search-cameo-ids" type="text" value="" ng-model="string" ng-keyup="sendSearch()" ng-minlength="4" placeholder="{{\'CONTACTS.PLACEHOLDER.ADD_NEW_CONTACT\'|cmTranslate}}" name="string" /><i class="fa cm-search"></i></div><cm-info-bubble nose-x="45%" class="cm-alert" ng-show="(moreChars = searchCameoId.string.$error.minlength) || (noResult = (searchCameoId.string.$valid && !pristine && results.length < 1))"><div ng-show="moreChars"><i class="fa cm-info"></i> {{\'CONTACTS.INFO.MORE_CHARS_NEEDED\'|cmTranslate}}</div><div ng-show="noResult"><i class="fa cm-info"></i> {{\'CONTACTS.INFO.NO_RESULTS\'|cmTranslate}}</div></cm-info-bubble></form></article><section class="mt15" ng-if="(results.length > 0)"><ul><li ng-repeat="contact in results" ng-click="openModal(\'modalSendRequest\',contact)" data-qa="btn-openModal" class="contact-search-item"><cm-avatar cm-data="contact"></cm-avatar><section class="identityName" cm-weight="1"><strong>{{contact.getDisplayName()}}</strong></section><section class="icon-list"><i class="fa cm-contacts"></i></section></li></ul></section>');
}]);
angular.module('comps/contacts/drtv-type-chooser.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/contacts/drtv-type-chooser.html',
'<div class="btn-group btn-group-justified"><div class="btn-group" ng-repeat="button in buttons"><button type="button" class="btn btn-default btn-xs" ng-class="{\'btn-primary\':(active == button.value)}" ng-click="setActive(button.value)"> {{button.i18n|cmTranslate}}</button></div></div>');
}]);
angular.module('cmContacts',[
    'cmCore',
    'cmPhonegap'
,'comps/contacts/drtv-add-external-contact.html','comps/contacts/drtv-contact-create.html','comps/contacts/drtv-contact-import.html','comps/contacts/drtv-contact-list.html','comps/contacts/drtv-contact-quick.html','comps/contacts/drtv-contact-tag.html','comps/contacts/drtv-contacts-filter-controls.html','comps/contacts/drtv-modal-add-contact.html','comps/contacts/drtv-request-list.html','comps/contacts/drtv-search.html','comps/contacts/drtv-type-chooser.html'])
.directive('cmAddExternalContact',[

    'cmContactsModel',
    'cmLogger',
    'cmNotify',
    '$location',
    
    function (cmContactsModel, cmLogger, cmNotify, $location){

        function fulltrim(string){
            return String(string||'').replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,'');
        }

        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'comps/contacts/drtv-add-external-contact.html',
            controller: function($scope, $element, $attrs, $timeout){

                var colClass = 'col-sm-';
                $scope.labelSize = colClass+'2';
                $scope.offsetSize = colClass+'offset-2';
                $scope.colSize = colClass+'6';

                var pristineDisplayName = true;
                $scope.formVisible = false;
                $scope.displayNameExists = false;

                $scope.data = {
                    displayName: '',
                    name: '',
                    surName: '',
                    email: '',
                    phone: ''
                };

                /**
                 * simple toggle for form visibility
                 */
                $scope.toggleForm = function(){
                    $scope.formVisible = $scope.formVisible ? false : true;
                };

                /**
                 * handle the nickname input
                 * change lock Nickname boolean
                 * and trim all white spaces
                 */
                var timeoutCheckDisplayName;
                $scope.handlePristine = function(){
                    pristineDisplayName = $scope.data.displayName == '' ? true : false;
                };

                $scope.$watch('data.displayName',function(val){
                    if(fulltrim(val) == ''){
                        $scope.displayNameExists = true;
                        return false;
                    } else {
                        $scope.displayNameExists = false;
                    }

                    var tmpVal = fulltrim(val);
                    $scope.data.displayName = tmpVal;

                    // handle timeout and kill if is pending
                    if(timeoutCheckDisplayName) $timeout.cancel(timeoutCheckDisplayName)
                    timeoutCheckDisplayName = $timeout(function(){
                        cmContactsModel
                            .checkDisplayName(tmpVal)
                            .then(
                            function(){
                                $scope.displayNameExists = false;
                            },
                            function(){
                                $scope.displayNameExists = true;
                            }
                        )
                    },250);

                    return true;
                });

                /**
                 * concat name and surname to nickname if the input isnt locked
                 */
                $scope.createDisplayName = function(){
                    if(pristineDisplayName === false)
                        return false;

                    $scope.data.displayName = fulltrim($scope.data.name+" "+$scope.data.surName);
                    return true;
                };

                /**
                 * Validateform and create external contact
                 */
                $scope.checkForm = function(){
                    var form = $scope.addExternContact,
                        data = {
                            identity: {
                                displayName: null,
                                email: null,
                                phoneNumber: null,
                                preferredMessageType: null,
                                // TODO: not implemented in BE
                                name: null,
                                surName: null,
                                phoneProvider: null,
                                phoneType: null,
                                emailType: null
                            }
                        };

                    if (form.displayName.$valid == false) {
                        cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.DISPLAYNAME', {ttl: 5000});
                        return false;
                    } else {
                        data.identity.displayName = form.displayName.$viewValue;
                    }

                    if (form.name.$valid == false) {
                        cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.NAME', {ttl: 5000});
                        return false;
                    } else {
                        data.identity.name = form.name.$viewValue;
                    }

                    if (form.surName.$valid == false) {
                        cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.SURNAME', {ttl: 5000});
                        return false;
                    } else {
                        data.identity.surName = form.surName.$viewValue;
                    }

                    if (form.phone.$valid == false && form.phone != '') {
                        cmNotify.warn('DRTV.VALIDATE_PHONE.INFO.INVALID_PHONE_NUMBER', {ttl: 5000});
                        return false;
                    } else {
                        data.identity.phoneNumber = form.phone.$viewValue;
                    }

                    if (form.email.$valid == false) {
                        cmNotify.warn('DRTV.VALIDATE_EMAIL.INFO.INVALID', {ttl: 5000});
                        return false;
                    } else {
                        data.identity.email = form.email.$viewValue;
                    }

                    if(data.identity.phoneNumber == '' && data.identity.email == ''){
                        cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.PHONE_OR_EMAIL', {ttl: 5000});
                        return false;
                    }

                    // everything is fine let's add the contact
                    cmContactsModel
                        .addContact(data)
                        .then(
                        function(){
                            $location.path('/contacts/all');
                        },
                        function(){
                            cmNotify.error('DRTV.EXTERN_CONTACT.INFO.SAVE_FAIL', {ttl: 5000});
                        }
                    );

                    return true;
                };
            }
        }
    }
])
/**
 * @deprecated
 */

.directive('cmContactBrief', [
    function(){
        return {
            restrict : 'AE',

            template: '<div class="name" data-qa="contact-display-name">' +
                        '{{contact.identity.getDisplayName()}}' +
                      '</div>'+
                      ''
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


    .directive('cmContactCreate', [
        'cmContactsModel', 'cmIdentityFactory', 'cmUtil', 'cmNotify', 'cmLoader',
        function(cmContactsModel, cmIdentityFactory, cmUtil, cmNotify, cmLoader){

            return {
                restrict:       'AE',
                scope:          true,
                templateUrl:    'comps/contacts/drtv-contact-create.html',

                controller: function($scope, $element, $attrs){
                    $scope.cmUtil = cmUtil;
                    var loader = new cmLoader($scope);
                    $scope.formData = {
                        phoneNumbers: [{value:''}],
                        emails: [{value:''}]
                    };

                    $scope.contact = {};
                    $scope.identity = {
                        displayName: '',
                        phoneNumber: '',
                        email: '',
                        exportData: function(){
                            return {
                                displayName: this.displayName,
                                phoneNumber: this.phoneNumber,
                                email: this.email
                            }
                        }
                    };
                    $scope.disabled = false;
                    $scope.chooseAvatar = true;
                    $scope.showCameoId = true;

                    /**
                     * handle every single contact via model
                     */

                    $scope.saveUser = function(){
                        if(loader.isIdle())
                            return false;

                        loader.start();

                        // declaration
                        var emptyIdentity = {
                                displayName: null,
                                email: null,
                                phoneNumber: null,
                                preferredMessageType: 'default',
                                // TODO: not implemented in BE
                                name: null,
                                surName: null,
                                phoneProvider: null,
                                groups: []
                            },
                        // merge given identity with default
                            identity = angular.extend({}, emptyIdentity, $scope.identity.exportData());

                        // validation
                        //////////////////////
                        // TODO: mock workarround for multiinput from array to single string
                        if($scope.formData.phoneNumbers.length > 0 && $scope.formData.phoneNumbers[0].value != ''){
                            identity.phoneNumber = $scope.formData.phoneNumbers[0].value;
                            identity.preferredMessageType = 'sms';
                        } else {
                            identity.phoneNumber = null;
                        }
                        if($scope.formData.emails.length > 0 && $scope.formData.emails[0].value != ''){
                            identity.email = $scope.formData.emails[0].value;
                            identity.preferredMessageType = 'mail';
                        } else {
                            identity.email = null;
                        }
                        //////////////////////
                        if($scope.cmForm.$invalid){
                            loader.stop();
                            return false;
                        }

                        // everything is fine let's add the contact
                        cmContactsModel
                        .addContact({
                            identity: identity,
                            groups: identity.groups
                        })
                        .then(
                            function () {
                                $scope.gotoContactList();
                            },
                            function () {
                                loader.stop();
                                cmNotify.error('CONTACT.INFO.ERROR.SAVE',{ttl:5000});
                            }
                        );
                    };
                }
            }
        }
    ])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmContactImport', [

    'cmContactsModel', 'cmUtil', 'cmModal', 'cmNotify',
    'cmLocalContacts', 'cmConversationFactory', 'cmIdentityFactory', 'cmTranslate',
    'cmUserModel', 'cmLoader',
    '$rootScope', '$q',

    function(cmContactsModel, cmUtil, cmModal, cmNotify,
             cmLocalContacts, cmConversationFactory, cmIdentityFactory, cmTranslate,
             cmUserModel, cmLoader,
             $rootScope, $q){

        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'comps/contacts/drtv-contact-import.html',

            controller: function($scope, $element, $attrs){
                $scope.cmUtil = cmUtil;
                var loader = new cmLoader($scope);

                $scope.resetErrors = function(){
                    $scope.error = {
                        displayName: false,
                        selectPhoneNumber: false,
                        selectEmail: false
                    };
                };

                $scope.chooseAvatar = true;

                $scope.reset = function(){
                    $scope.resetErrors();

                    $scope.formData = {
                        phoneNumbers: [{value:'',type:''}],
                        emails: [{value:'',type:''}]
                    };

                    $scope.identity = {
                        displayName: '',
                        phoneNumber: null,
                        email: null,
                        exportData: function(){
                            return {
                                displayName: this.displayName,
                                phoneNumber: this.phoneNumber,
                                email: this.email
                            }
                        }
                    };
                };

                $scope.chooseContact = function(){
                    cmLocalContacts.selectOne().then(
                        function (contact) {
                            $scope.reset();

                            if(contact.displayName == '')
                                contact.displayName = undefined;

                            $scope.identity.displayName = contact.displayName || 'name' in contact ? contact.name.formatted : '';

                            if(contact.phoneNumbers != null && contact.phoneNumbers.length > 0) {
                                $scope.formData.phoneNumbers = contact.phoneNumbers;
                            }

                            if(contact.emails != null && contact.emails.length > 0) {
                                $scope.formData.emails = contact.emails;
                            }

                            //$scope.identity.avatar = contact.photos.length > 0 ? contact.photos[0].value : null
                        }
                    )
                };

                $scope.chooseItem = function(item, type){
                    switch(type){
                        case 'phone':
                            if($scope.identity.phoneNumber != item.value)
                                $scope.identity.phoneNumber = item.value;
                            else
                                $scope.identity.phoneNumber = '';
                        break;
                        case 'email':
                            if($scope.identity.email != item.value)
                                $scope.identity.email = item.value;
                            else
                                $scope.identity.email = '';
                        break;
                    }
                };

                $scope.isSelected = function(item, type){
                    return item.value != '' && item.value == $scope.identity[type];
                };

                $scope.validateForm = function(){
                    $scope.resetErrors();

                    var deferred = $q.defer(),
                        isValid = true;

                    function checkDisplayName() {
                        if ($scope.identity.displayName == '') {
                            $scope.error.displayName = true;
                            isValid = false;
                        }
                    }

                    function checkSelection(){
                        // both is empty
                        if($scope.identity.phoneNumber == null && $scope.identity.email == null){
                            $scope.error.selectPhoneNumber = true;
                            $scope.error.selectEmail = true;
                            isValid = false;
                        }
                    }

                    checkDisplayName();
                    checkSelection();

                    if(isValid !== false){
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.importContact = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function() {
                            // declaration
                            var emptyIdentity_data = {
                                    displayName: null,
                                    phoneNumber: null,
                                    email: null,
                                    preferredMessageType: 'default',
                                    // TODO: not implemented in BE
                                    name: null,
                                    surName: null,
                                    phoneProvider: null,
                                    groups: []
                                },
                                // merge given identity with default
                                identity = angular.extend({}, emptyIdentity_data, $scope.identity.exportData());

                            // handle preferredMessageType
                            if (identity.phoneNumber != null) {
                                identity.preferredMessageType = 'sms';
                            } else {
                                identity.phoneNumber = null;
                            }
                            if (identity.email != null) {
                                identity.preferredMessageType = 'mail';
                            } else {
                                identity.email = null;
                            }

                            // everything is fine let's add the contact
                            cmContactsModel
                            .addContact({
                                identity: identity,
                                groups: identity.groups
                            })
                            .then(
                                function (data) {
                                    loader.stop();
                                    identity = cmIdentityFactory.create(data.identity, true);

                                    return  cmModal.confirm({
                                                title: '',
                                                text:  'CONTACT.IMPORT.NOTIFICATION.CONFIRMATION',
                                                html:  '<textarea cm-resize-textarea cm-max-rows="10">' +
                                                    '{{\'CONTACT.IMPORT.NOTIFICATION.MESSAGE\'|cmTranslate:data.message}}'+
                                                    '</textarea>',
                                                data:  {
                                                    message: {
                                                        from: cmUserModel.data.identity.getDisplayName(),
                                                        to: identity.getDisplayName()
                                                    }
                                                }
                                            })
                                },
                                function () {
                                    loader.stop();
                                    cmNotify.error('CONTACT.INFO.ERROR.SAVE', {ttl: 5000});
                                    return $q.reject()
                                }
                            )
                            .then(function(modal_scope){
                                var conversation =  cmConversationFactory
                                                    .create()
                                                    .addRecipient(identity)
                                                    .disableEncryption()

                                return  conversation
                                        .save()
                                        .then(function(){
                                            return  conversation
                                                    .messages
                                                    .create({conversation:conversation})
                                                    .setText(modal_scope.data.message)
                                                    .setPublicData(['text'])
                                                    .encrypt()
                                                    .save()
                                        })

                            })
                            .finally(function(){
                                loader.stop();
                                $scope.gotoContactList();
                            })

                        },
                        function(){
                            loader.stop();
                        }
                    );
                };

                $scope.reset();

                // init
                if(cmLocalContacts.canRead()) {
                    $scope.chooseContact();
                } else {
                    $rootScope.goBack();
                    return false;
                }
            }
        }
    }
])
.directive('cmContactList',[
    'cmContactsModel', 'cmLogger',
    '$rootScope',
    function (cmContactsModel, cmLogger,
              $rootScope) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/contacts/drtv-contact-list.html',

            controller: function ($scope, $element, $attrs) {
                $scope.isLoading    = false;

                $scope.contacts     = cmContactsModel.contacts;
                $scope.contactsQty  = cmContactsModel.contacts.length;


                cmContactsModel.on('start:load-contacts', function () {
                    $scope.isLoading = true;
                });

                cmContactsModel.on('finish:load-contacts', function () {
                    $scope.isLoading = false;
                });

                /**
                 * edit contact
                 * @param id
                 */
                $scope.editContact = function (contact) {
                    if(contact.contactType != 'pending') {
                        $rootScope.goTo('/contact/edit/' + contact.id);
                    }
                };
            }
        }
    }
])

.directive('cmContactQuick', [

    'cmContactsModel',
    'cmIdentityFactory',
    'cmTranslate',
    'cmLoader',
    '$q',

    function(cmContactsModel, cmIdentityFactory, cmTranslate, cmLoader,
             $q){

        return {
            restrict:       'E',
            scope:          {
                                select          : "=cmDataSelected",
                                conversation    : "=cmDataConversation"
                            },
            templateUrl:    'comps/contacts/drtv-contact-quick.html',

            controller: function($scope, $element, $attrs){
                var loader = new cmLoader($scope);

                $scope.displayName = '';

                $attrs.$observe("cmInput", function(value){
                    $scope.mixed = value;
                });

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        data = {};

                    function checkDisplayName() {
                        if ($scope.displayName && $scope.displayName != '') {
                            data.displayName = $scope.displayName;
                        }
                    }

                    function checkMixed() {
                        if ($scope.mixed.length > 0
                            && $scope.mixed[0].value != undefined
                            && $scope.mixed[0].value != ''
                            ) {
                            data.mixed = $scope.mixed[0].value;
                        }
                    }

    
                    checkDisplayName();
                    checkMixed();

                    if($scope.cmForm.$valid != false){
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.save = function(){
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm()
                    .then(
                        function(){
                            return cmContactsModel
                                    .addContact({
                                        identity: {
                                            displayName:    $scope.displayName,
                                            mixed:          $scope.mixed
                                        } 
                                    })
                                    .then(function(contact){
                                        if($scope.selected)
                                            $scope.selected[contact.identity.id] = true;

                                        if($scope.conversation)
                                            $scope.conversation.addRecipient(contact.identity);

                                        // reset
                                        $scope.displayName = '';
                                        $scope.mixed = '';
                                        loader.stop();
                                    }, function(){
                                        loader.stop();
                                    });
                        },
                        function(){
                            $scope.cmForm.mixed.$invalid = true;
                            loader.stop();
                        }
                    );
                };
            }
        }
    }
])
.directive('cmContactTag',[
    'cmUserModel',
    '$rootScope',
    function (cmUserModel,$rootScope){
        return {
            restrict: 'AE',
            scope: {
                contact: "=cmContact"
            },
            templateUrl: 'comps/contacts/drtv-contact-tag.html',
            controller: function($scope){
                $scope.isTrusted = function(contact){
                    return      contact.identity
                            &&  cmUserModel.verifyTrust(contact.identity)
                };

                /**
                 * handle every single contact via model
                 */
                $scope.startConversation = function ($event,contact) {
                    $event.stopPropagation();
                    $event.preventDefault();

                    if(contact.contactType != 'pending'){
                        delete $rootScope.pendingConversation
                        if (contact.identity) {
                            $rootScope.pendingRecipients = [contact.identity]
                        } else {
                            cmLogger.error('Unable to find identity on contact. ' + contact)
                        }
                        $rootScope.goTo('/conversation/new');
                    }
                };
                /**
                 * edit contact
                 * @param id
                 */
                $scope.editContact = function (contact) {
                    if(contact.contactType != 'pending') {
                        $rootScope.goTo('/contact/' + contact.id);
                    }
                };
                /**
                 * delete contact via model
                 * @param id
                 */
                $scope.deleteContact = function (contact) {
                    cmLogger.debug('deleteContact ' + contact.id);
                };
            }
        }
    }
])
.directive('cmContactType',[

    'cmContactsModel',

    function (cmContactsModel){
        return {
            restrict: 'AE',
            link: function(scope, element, attrs){
                function refresh(data){
                    

                    // data maybe a contact or an identity
                    var identity = data.identity || data


                    var contact = data.contactType
                                ? data
                                : cmContactsModel.findByIdentity(data)
                        type    = contact ? contact.contactType : 'unknown',
                        icon    = ''

                    icon = (type == 'internal') ? 'cm-rhino-positive'   : icon
                    icon = (type == 'external') ? 'cm-address-book'     : icon
                    icon = (type == 'local')    ? 'cm-mobile'           : icon
                    icon = (type == 'pending')  ? 'cm-rhino-positive'   : icon
                    icon = (type == 'unknown')  ? 'cm-address-book'     : icon         

                    element.children().remove()

                    element.append(
                        angular.element('<i class="cm-grey"></i>')
                        .addClass('fa')
                        .addClass(icon)
                    ).addClass(type)
                }

                scope.$watchCollection(attrs.cmData, refresh)
            }
        }
    }
])

.directive('cmContactsFilterControls',[
    function (){
        return{
            restrict : 'AE',
            scope : true,
            templateUrl : 'comps/contacts/drtv-contacts-filter-controls.html'
        }
    }
])

.directive('cmFriendRequestCounter', [
    'cmContactsModel',
    function (cmContactsModel) {
        return {
            restrict : 'AE',
            scope: true,
            link: function(scope, element){
                scope.counter = 0;

                scope.setColor = function(){
                    if(scope.counter > 0){
                        element.parent().parent().addClass('info');
                    } else {
                        element.parent().parent().removeClass('info');
                    }
                };

                scope.show = function(){
                    scope.counter = cmContactsModel.requests.length;

                    if(scope.counter > 0){
                        element.html(' (' + scope.counter +')');
                    } else {
                        element.html('');
                    }

                    scope.setColor();
                };

                cmContactsModel.requests.on('register', function(){
                    scope.show();
                });
                cmContactsModel.on('friendRequests:loaded', function(){
                    scope.show();
                });
                cmContactsModel.on('friendRequests:updated', function(){
                    scope.show();
                });

                scope.show();
            }
        }
    }
])
.directive('cmKeyLevel',[
    function (){
        return {
            restrict: 'E',
            template: '<cm-icons icons="cm-lock" alt="cm-unlock" count="{{count}}"></cm-icons>',
            controller: function($scope, $element, $attrs){
                $scope.$watch($attrs.cmData, function(keySize){
                    $scope.count = 0;

                    if(keySize >= 2048){
                        $scope.count = 2;
                    }
                });
            }
        }
    }
])

.directive('cmModalAddContact',[
    'cmLocalContacts',
    function (cmLocalContacts){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-modal-add-contact.html',
            scope: {
                modalId: "@id",
                nosePosition: "@nosePosition"
            },
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                };
            }
        }
    }
])
.directive('cmRequestList', [
    'cmContactsModel',
    'cmNotify',
    function(cmContactsModel, cmNotify){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-request-list.html',
            controller: function ($scope) {
                $scope.requests = cmContactsModel.requests;
                $scope.isLoading = false;

                /*
                cmContactsModel.on('friendRequests:loaded', function(){
                    $scope.requests = cmContactsModel.requests;
                });

                cmContactsModel.on('friendRequests:updated', function(){
                    $scope.requests = cmContactsModel.requests;
                });
                */

                if($scope.requests.length > 0){
                    cmNotify.trigger('bell:unring');
                }

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    if(typeof item == 'object'){
                        item.accept().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);

//                                cmNotify.success('CONTACTS.INFO.REQUEST.ACCEPT',{displayType:'modal', ttl:3000});

                                cmContactsModel.trigger('friendRequests:updated');
                            },

                            function(){
                                /**
                                 * @todo accept fails
                                 */
                            }
                        )
                    }
                };

                /**
                 * fired by repeat delete request
                 * @param id
                 */
                $scope.rejectRequest = function(item){
                    if(typeof item == 'object'){
                        item.reject().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);

//                                cmNotify.success('CONTACTS.INFO.REQUEST.REJECT',{displayType:'modal',ttl:3000});

                                cmContactsModel.trigger('friendRequests:updated');
                            },

                            function(){
                                /**
                                 * @todo reject fails
                                 */
                            }
                        )
                    }
                };

                $scope.ignoreRequest = function(item){
                    if(typeof item == 'object'){
                        item.ignore().then(
                            function(){
                                cmNotify.trigger('bell:unring');

//                                cmNotify.success('CONTACTS.INFO.REQUEST.IGNORE',{displayType:'modal',ttl:3000});

                                cmContactsModel.trigger('friendRequests:updated');
                            },

                            function(){
                                /**
                                 * @todo ignrore fails
                                 */
                            }
                        )
                    }
                }
            }
        }
    }
])
.directive('cmSearch',[
    'cmContactsModel',
    'cmIdentityFactory',
    'cmNotify',
    'cmModal',
    '$timeout',
    function (cmContactsModel, cmIdentityFactory, cmNotify, cmModal, $timeout){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-search.html',
            controller: function($scope){
                $scope.pristine = true;
                $scope.results = [];

                /**
                 * searching for an existing cameoId
                 * @returns {boolean}
                 */
                $scope.timeout = null;
                $scope.sendSearch = function(){
                    if($scope.searchCameoId.string.$invalid || $scope.string == ''){
                        $scope.results = [];
                        $scope.pristine = true;
                        return false;
                    }

                    $scope.pristine = false;

                    if($scope.timeout != null) $timeout.cancel($scope.timeout)

                    $scope.timeout = $timeout(function(){
                        cmContactsModel.searchCameoIdentity($scope.string)
                            .then(
                            function(data){
                                var tmp = [];
                                angular.forEach(data, function(value){
                                    tmp.push(cmIdentityFactory.create(value, true));
                                });
                                $scope.results = tmp;
                            }
                        );
                    },500);

                    return true;
                };

                /**
                 * Send friendship via model to api
                 * @param id
                 */
                $scope.sendRequest = function(contact){
                    if(angular.isDefined(contact.id)){
                        cmContactsModel
                        .sendFriendRequest(contact.id, contact.message)
                        .then(
                            function(){
                                // clear from list
                                var index = $scope.results.indexOf(contact);
                                $scope.results.splice(index,1);
                                // notify
//                                cmNotify.success('CONTACTS.INFO.REQUEST.SENDED', {displayType:'modal', ttl:3000});
                                cmContactsModel.trigger('friendRequest:sent');
                                cmModal.closeAll();
                                $scope.goto('/contact/list')
                            },
                            function(){
                                cmNotify.error('CONTACTS.INFO.REQUEST.FAILED', {displayType:'modal'});
                            }
                        )
                    }
                };
            }
        }
    }
])
.directive('cmTypeChooser',[
    'cmLogger',
    function (cmLogger){
        // defined types
        var types = {
            types: [
                {i18n:'DRTV.TYPE_CHOOSER.PRIVATE',value:'private','default':true},
                {i18n:'DRTV.TYPE_CHOOSER.BUSINESS',value:'business'},
                {i18n:'DRTV.TYPE_CHOOSER.OTHER',value:'other'}
            ],
            provider: [
                {i18n:'DRTV.TYPE_CHOOSER.LANDLINE',value:'landline'},
                {i18n:'DRTV.TYPE_CHOOSER.IP',value:'ip'},
                {i18n:'DRTV.TYPE_CHOOSER.FAX',value:'fax'},
                {i18n:'DRTV.TYPE_CHOOSER.MOBILE',value:'mobile','default':true}
            ]
        };

        return {
            scope: true,
            templateUrl: 'comps/contacts/drtv-type-chooser.html',
            controller: function($scope, $element, $attrs){
                $scope.buttons = [];
                // TODO: reset parent form must reset types
                // handle special type of choose default
                if('chooseType' in $attrs && $attrs.chooseType in types){
                    $scope.buttons = types[$attrs.chooseType];
                } else {
                    $scope.buttons = types.types;
                }

                /**
                 * search in buttons array for value or default
                 * @string value
                 * @boolean searchDefault
                 * @returns {string}
                 */
                function find(value, searchDefault){
                    var btn = "";
                    angular.forEach($scope.buttons, function(button){
                        if(searchDefault != undefined && 'default' in button){
                            btn = button.value;
                        }
                        if(value != undefined && button.value == value){
                            btn = button.value;
                        }
                    });
                    return btn
                }

                /**
                 * set button to active and set parent scope variable
                 * @string value
                 */
                $scope.setActive = function(value ,isFirst){

                    if(isFirst == undefined && 'cmDisabled' in $attrs && $scope.$eval($attrs.cmDisabled) == true){
                        return false;
                    }

                    $scope.active = find(value);
                    // addtion to parent data collection
                    if($scope.data != undefined && $attrs['chooseToData'] != undefined)
                        $scope.data[$attrs.chooseToData] = $scope.active;

                    // direct addtion to item
                    if('cmChooseValueTo' in $attrs && $scope.$eval($attrs['cmChooseValueTo']) != undefined){
                        $scope.$eval($attrs['cmChooseValueTo']).type = $scope.active;
                    }
                };

                // set default button
                $scope.setActive(find(null, true),true)
            }
        }
    }
])
.filter('cmPendingFirst', [

    //no dependencies
    
    function(){
        return  function(arrayOfContacts){
                    var copy = arrayOfContacts.slice(0)
                    return copy.sort(function(contact1, contact2){
                       
                        var a           =   contact1.contactType == 'pending' ? 1 : 0,
                            b           =   contact2.contactType == 'pending' ? 1 : 0

                        return b-a
                    })
                }
    }
])

.factory('cmContactModel', [
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmObject',
    'cmStateManagement',
    'cmUtil',
    'cmLogger',
    function(cmContactsAdapter, cmIdentityFactory, cmObject, cmStateManagement, cmUtil, cmLogger){
        function ContactModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state  = new cmStateManagement(['loading']);

            this.id            = undefined;
            this.contactType   = undefined;
            this.group         = [];
            this.identity      = cmIdentityFactory.new();

            function init(data){
                //cmLogger.debug('cmContactModel:init');

                // via id
                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.update();
                    // via data.id
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;
                    if(cmUtil.objLen(data) < 2){
                        self.update();
                    } else {
                        self.importData(data);
                    }
                } else {
                    //todo
                }
            }

            this.importData = function(data) {
                //cmLogger.debug('cmContactModel.importData');

                if(typeof data !== 'object'){
                    cmLogger.debug('cmContactModel:import:failed - no data!');
                    return this;
                }

                this.id = data.id || this.id;
                this.contactType = data.contactType || this.contactType;
                this.groups = data.groups || this.groups;
                this.identity = data.identity ? cmIdentityFactory.create(data.identity, true) : this.identity;

                this.trigger('update:finished');
            };

            this.setContactType = function(type){
                this.contactType = type;
                return this;
            };

            this.update = function(){
                //cmLogger.debug('cmContactModel.update');

                if(this.id && !this.state.is('loading')){
                    this.state.set('loading');

                    cmContactsAdapter.getOne(this.id).then(
                        function(data){
                            self.importData(data);
                        },
                        function(){
                            cmLogger.debug('cmContactModel.update fail!');
                        }
                    ).finally(
                        function(){
                            self.state.unset('loading');
                        }
                    );
                }
            };

            init(data);

        }

        return ContactModel;
    }
])
.service('cmContactsAdapter',[
    'cmApi',
    'cmObject',
    'cmLogger',
    'cmUtil',
    function (cmApi, cmObject, cmLogger, cmUtil){

        var adapter =  {
            /**
             * Search for cameoId Users
             * @param string
             * @returns {*|HttpPromise}
             */
            searchCameoIdentity: function(string, excludeContacts){
                return cmApi.post({
                    path:'/identity/search',
                    data: {
                        search: string,
                        fields: ['cameoId','displayName'],
                        excludeContacts: excludeContacts || true
                    }
                });
            },
            /**
             * Get Contact List
             * @param limit
             * @param offset
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getAll: function(limit, offset){
                return cmApi.get({
                    path:'/contacts' + cmUtil.handleLimitOffset(limit,offset)
                });
            },
            /**
             * Get one Contact in Detail
             * @param id
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getOne: function(id){
                return cmApi.get({
                    path:'/contact/'+id
                })
            },
            /**
             * Get User Groups
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getGroups: function(){
                return cmApi.get({
                    path:'/contact-groups'
                })
            },
            /**
             * Get User from one User Group
             * @param group
             * @param limit
             * @param offset
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getAllFromGroup: function(group,limit,offset){
                return cmApi.get({
                    path:'/contact-group/' + group + cmUtil.handleLimitOffset(limit,offset)
                })
            },
            getFriendRequests: function(){
                return cmApi.get({
                    path:'/friendRequests'
                })
            },
            sendFriendRequest: function(id, message){
                return cmApi.post({
                    path:'/friendRequest',
                    data: {identityId: id, message: message || null}
                })
            },
            answerFriendRequest: function(id, type){
                return cmApi.post({
                    path:'/friendRequest/answer',
                    data: {identityId:id, answerType:type}
                })
            },
            addContact: function(data){
                return cmApi.post({
                    path:'/contact',
                    data: {identity:data.identity||{}, groups:data.groups||[]}
                })
            },
            editContact: function(id, data){
                return cmApi.put({
                    path:'/contact/'+id,
                    data: data||{}
                })
            },
            deleteContact: function(id){
                return cmApi.delete({
                    path:'/contact/'+id
                })
            }
        }

        cmObject.addEventHandlingTo(adapter)

        cmApi.on('identity:update', function (event, data){
//            console.log('cmContactsAdapter.on:identity:update')
            adapter.trigger('identity:updated', data)
        })

        cmApi.on('friendRequest:new', function(event, data){
            adapter.trigger('friendRequest:new', data)
        })

        cmApi.on('friendRequest:accepted', function(event, data){
            adapter.trigger('friendRequest:accepted', data)
        })

        return adapter

    }
])
.service('cmContactsModel',[
    'cmFactory',
    'cmUserModel',
    'cmContactModel',
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmFriendRequestModel',
    'cmStateManagement',
    'cmUtil',
    'cmObject',
    'cmLogger',
    'cmNotify',
    '$q',
    '$rootScope',
    function (cmFactory, cmUserModel, cmContactModel, cmContactsAdapter, cmIdentityFactory, cmFriendRequestModel, cmStateManagement, cmUtil, cmObject, cmLogger, cmNotify, $q, $rootScope){
        var self = this,
            events = {};

        this.state          =   new cmStateManagement(['loading-contacts','loading-groups','loading-requests']);

        this.contacts       =   new cmFactory(cmContactModel,
                                    function sameByData(instance, data){
                                        return data &&
                                              (data.id == instance.id ||
                                               data.identity &&
                                               data.identity.id &&
                                               instance &&
                                               instance.identity &&
                                               instance.identity.id &&
                                               data.identity.id == instance.identity.id)
                                    });

        // TODO: groups must be in factory style with models
        this.groups         =   [];//new cmFactory(function(){return this;});
        this.requests       =   new cmFactory(cmFriendRequestModel, 
                                    function sameByData(instance, data){
                                        return      data 
                                                &&  data.identity 
                                                &&  data.identity.id 
                                                &&  instance
                                                &&  instance.identity
                                                &&  instance.identity.id
                                                &&  data.identity.id == instance.identity.id
                                    },
                                    function sameByInstance(instance_1, instance_2){
                                        return      instance_1
                                                &&  instance_1.identity
                                                &&  instance_1.identity.id
                                                &&  instance_2
                                                &&  instance_2.identity
                                                &&  instance_2.identity.id
                                                &&  instance_1.identity.id == instance_2.identity.id
                                    });

        this.findByIdentity =   function(identity){
                                    return this.contacts.filter(function(contact){
                                        return contact.identity == identity
                                    })[0]
                                }

        this.findByIdentityId =   function(identityId){
            return this.contacts.filter(function(contact){
                return contact.identity.id == identityId
            })[0]
        };
  
        cmObject.addEventHandlingTo(this);

        /**
         * Init Object
         */
        function init(){
//            cmLogger.debug('cmContactsModel:init');
            self.getAll();
            self.getGroups();
            self.getFriendRequests();
        }

        /**
         * Reset Object
         */
        function reset(){
            //cmLogger.debug('cmContactsModel:reset');
            self.contacts.reset('cmContactsModel.contacts');
            self.groups = [];
            self.requests.reset('cmContactsModel.request');
        }

        /**
         * add to contacts and creates identities
         * @param contact
         * @private
         */

        function _add(contact){
            return self.contacts.create(contact)
            /*
            var check = false,
                i = 0;

            if(typeof contact === 'object' && cmUtil.objLen(contact) > 0){
                while(i < self.contacts.length){

                    if(self.contacts[i].identity.id == contact.identity.id){
                        check = true;
                        break;
                    }
                    i++;
                }

                if(check !== true){
                    self.contacts.push({
                        id: contact.id,
                        contactType: contact.contactType,
                        groups: contact.groups,
                        identity: cmIdentityFactory.create(contact.identity, true)
                    });
                }
            }
            */
        }

        this._clearContacts = function(){
            this.contacts.reset()
        };

        /**
         * Model Logic
         */
        this.searchCameoIdentity = function(cameoId){
            return cmContactsAdapter.searchCameoIdentity(cameoId, true);
        };

        this.getAll = function(limit, offset){
//            cmLogger.debug('cmContactsModel:getAll');
            var i = 0;

            if(cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-contacts')){
                    this.trigger('start:load-contacts');
                    self.state.set('loading-contacts');

                    cmContactsAdapter.getAll().then(
                        function(data){
                            while(i < data.length){
                                _add(data[i]);
                                i++;
                            }
                        }
                    ).finally(function(){
                        self.trigger('finish:load-contacts');
                        self.state.unset('loading-contacts');
                    })
                }
            }

            return this;
        };

        this.getOne = function(id){
            return cmContactsAdapter.getOne(id);
        };

        this.getGroups = function(){
//            cmLogger.debug('cmContactsModel:getGroups');

            if(this.groups.length < 1 && cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-groups')) {
                    this.state.set('loading-groups');

                    cmContactsAdapter.getGroups().then(
                        function (data) {
                            self.groups = data;
                        }
                    ).finally(function(){
                        self.state.unset('loading-groups')
                    });
                }
            }

            return this;
        };

        this.getAllFromGroup = function(group,limit,offset){
            return cmContactsAdapter.getAllFromGroup(group,limit,offset);
        };

        /**
         * Friend Request Handling
         */


        this.getFriendRequests = function(){
//            cmLogger.debug('cmContactsModel:getFriendRequests');
            if(cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-requests')){
                    this.state.set('loading-requests');

                    cmContactsAdapter.getFriendRequests().then(
                        function(data) {
//                        cmLogger.debug('cmContactsModel:getFriendRequests:done');
                            var old_length = self.requests.length;

                            angular.forEach(data, function (request_data) {
                                self.requests.create(request_data)
                            });

                            if (old_length < self.requests.length) {
                                self.trigger('friendRequests:loaded');
                            }
                        }
                    ).finally(function(){
                        self.state.unset('loading-requests');
                    })
                }
            }
        };

        this.removeFriendRequest = function(request){
            this.requests.deregister(request)

            /*
//            cmLogger.debug('cmContactsModel:removeFriendRequest');

            var index = this.requests.indexOf(request);
            this.requests.splice(index,1);
            */
           
            return this;
        };

        this.sendFriendRequest = function(id, message){
            return cmContactsAdapter.sendFriendRequest(id, message);
        };

        this.addContact = function(data){
            var defer = $q.defer();

            this.trigger('before-add-contact')

            return  cmContactsAdapter
                    .addContact(data)
                    .then(function(data){
                            self.trigger('add-contact', data)
                            var contact = _add(data);
                            self.trigger('after-add-contact', data)
                            return contact
                    })
        };

        this.editContact = function(id, data){
            var defer = $q.defer();
            cmContactsAdapter
                .editContact(id, data)
                .then(
                function(data){
//                _edit(data);
                    defer.resolve();
                },
                function(){
                    defer.reject();
                }
            );

            return defer.promise;
        };

        this.deleteContact = function(id, data){
            var defer = $q.defer();
            cmContactsAdapter
                .deleteContact(data)
                .then(
                function(data){
                    //_delete(data);
                    defer.resolve();
                },
                function(){
                    defer.reject();
                }
            );

            return defer.promise;
        };

        /**
         * event handling
         */
        $rootScope.$on('logout', function(){
            reset();
        });

        $rootScope.$on('login', function(){
            reset();
        });

        $rootScope.$on('identity:switched', function(){
            reset();
        });

        this.on('friendRequests:updated friendRequest:sent after-add-contact', function(){
            this._clearContacts();
            init();
        });

        cmContactsAdapter.on('friendRequest:new', function(event, data){
            if(data.to == cmUserModel.data.identity.id)
                self.requests.create(data.friendRequest);
        });

        cmContactsAdapter.on('friendRequest:accepted', function(event, data){
            // Friend request sent by the current user was accepted:
            if(data.from == cmUserModel.data.identity.id){
                self.contacts.create(data.contact, true);
            }

            // Friend request accepted by the current user (on a different device):
            if(data.to == cmUserModel.data.identity.id){
                self.requests.forEach(function(request){
                    if(request.identity.id == data.from)
                        self.requests.deregister(request)
                });
            }
        });

        this.requests.on('register', function(){
            cmNotify.create({label: 'NOTIFICATIONS.TYPES.FRIEND_REQUEST', bell:true});
        });

        cmContactsAdapter.on('identity:updated', function(event, data){
            if(typeof data.id != 'undefined') {
                var contact = self.contacts.filter(function (contact) {
                    return contact.identity.id == data.id
                })[0];

                if (typeof contact == 'object' && 'identity' in contact && typeof contact.identity.importData == 'function') {
                    contact.identity.importData(data);
                }
            }
        });

        cmUserModel.on('update:finished', function(){
            init();
        });
    }
])
.factory('cmFriendRequestModel',[
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmObject',
    'cmLogger',
    function (cmContactsAdapter, cmIdentityFactory, cmObject, cmLogger){
        var FriendRequestModel = function(data){

            this.message        = '';
            this.timeOfCreation = 0;
            this.identity       = undefined;
            this.id             = undefined;

            this.accept = function(){
                cmLogger.debug('cmFriendRequestModel:accept');

                return cmContactsAdapter.answerFriendRequest(this.identity.id, 'accept');
            };

            this.reject = function(){
                cmLogger.debug('cmFriendRequestModel:reject');

                return cmContactsAdapter.answerFriendRequest(this.identity.id, 'reject');
            };

            this.ignore = function(){
                cmLogger.debug('cmFriendRequestModel:ignore');

                return cmContactsAdapter.answerFriendRequest(this.identity.id, 'ignore');
            };

            this.importData = function(data){
                this.identity       = 'identity' in data ? cmIdentityFactory.create(data.identity) : this.identity 
                this.message        = data.message || this.message
                this.timeOfCreation = data.created || this.timeOfCreation
                this.id             = this.identity && this.identity.id
            };

            cmObject.addEventHandlingTo(this)
            this.importData(data)
        }

        return FriendRequestModel;
    }
])
'use strict';

angular.module('comps/conversations/drtv-conversation-tag.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-conversation-tag.html',
'<cm-avatar cm-data="avatarIdentity"></cm-avatar><div class="details" cm-weight="3"><div class="subject" data-qa="conversation-subject"> {{(conversation.subject || (\'CONVERSATION.NO_SUBJECT\' | cmTranslate)) |cmParse }}</div><cm-message class = "message" cm-data = "conversation.lastMessage" text-only = "true" data-qa = "conversation-last-message" ng-hide = true ></cm-message><div class="recipients"><cm-recipients-comma-seperated cm-data="conversation"></cm-recipients-comma-seperated></div></div><div class="meta" cm-weight="2"><div class="top"><cm-lock-level cm-level="conversation.lockStatus.level"></cm-lock-level><span class="last-updated small"><cm-time-converter cm-timestamp="conversation.timeOfLastUpdate" cm-special-type="conversation-tag"></cm-time-converter></span></div><div class="bottom"><cm-recipient-counter ng-if="conversation.recipients.length > 2">{{conversation.recipients.length||0}}</cm-recipient-counter><span class="message-count" ng-class="{\'cm-unread\' : conversation.messages.length > 0}"> ({{conversation.numberOfMessages || 0}}) </span></div></div>');
}]);
angular.module('comps/conversations/drtv-conversation.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-conversation.html',
'<h2 ng-if="conversation.state.is(\'new\')" class="border-bottom no-margin"><i class="fa cm-talk"></i> neuer Talk</h2><h2 ng-if="!conversation.state.is(\'new\') && conversation.subject" class="border-bottom no-margin"><i class="fa cm-talk"></i><span ng-bind-html="conversation.subject|cmParse" data-qa="text-subject"></span></h2><section class="body-group recipients" ng-if="conversation.state.is(\'new\') || !conversation.state.is(\'new\') && conversation.recipients.length > 1"><h3 ng-click="toggleRecipientView()"><i class="fa" ng-class="{\'cm-grid\':!showGrid,\'cm-menu-weight\':showGrid}"></i> {{\'CONVERSATION.PLACEHOLDER.RECIPIENTS\'|cmTranslate}}<span class="recipients-counter">({{conversation.recipients.length-1}})</span><span class="recipient-name" ng-show="showGrid">{{recipientName}}</span></h3><div class="recipients-list"><div class="scroller" ng-class="{ \'show-scrollbar\': conversation.recipients.length > 7 && showGrid, \'disable-scrollbar\': !showGrid }"><div class="add-new-recipients" ng-click="goto(\'conversation/\'+(conversation.id||\'new\')+\'/recipients\')" ng-if="conversation.recipients.length == 1 && conversation.state.is(\'new\')"><cm-avatar cm-view="unknown"></cm-avatar><span>{{\'CONVERSATION.PLACEHOLDER.ADD_RECIPIENTS\'|cmTranslate}}</span></div><cm-avatar cm-data="recipient" ng-click="showName(recipient)" ng-class="{ \'name-shown\': recipientName == recipient.getDisplayName() }" ng-repeat="recipient in conversation.recipients|cmHideAppOwner|orderBy:\'getDisplayName()\':false" cm-first-of-repeat="showName(recipient)" ng-show="showGrid"></cm-avatar><cm-recipients-comma-seperated cm-data="conversation" ng-show="!showGrid"></cm-recipients-comma-seperated></div><div class="cm-add-button" ng-click="goto(\'conversation/\'+(conversation.id||\'new\')+\'/recipients\')" cm-user-rights><i class="fa" ng-class="{ \'cm-checkbox-add\':conversation.recipients.length == 1, \'cm-list\':conversation.recipients.length > 1 }"></i></div></div></section><section class="body-group no-pad border-top" ng-if="conversation.state.is(\'new\')"><article class="content cm-form-style mt5"><label>{{\'CONVERSATION.PLACEHOLDER.SUBJECT\' | cmTranslate}}</label><div class="cm-input-ctn with-inside-icon"><input type="text" data-qa="input-subject" ng-model="conversation.subject" placeholder="{{\'CONVERSATION.PLACEHOLDER.NO_SUBJECT\'|cmTranslate}}" cm-adaptive-change /><i class="fa cm-write"></i></div></article><div style="height:1rem"></div></section><button class="cm-btn-grey" ng-if="conversation && conversation.numberOfMessages > conversation.messages.length" ng-show="conversation.numberOfMessages != conversation.messages.length" ng-click="loadPreviousMessages()"> {{\'CONVERSATION.LABEL.LOAD_PREVIOUS\'|cmTranslate}}</button><div id="conversation-top"></div><div ng-repeat="message in (filteredData = (conversation.messages | orderBy:\'created\':false))" cm-scroll-to="{anchor:\'#conversation-bottom\',force:\'bottom\'}"><cm-date-seperator cm-timestamp="message.created" cm-timestamp-prev="filteredData[$index - 1].created"></cm-date-seperator><!-- moep - don\'t delete - ask empu^^ --><cm-message cm-data="message" cm-data-conversation="conversation"></cm-message></div><div id="conversation-bottom" cm-scroll-to="{anchor:\'#conversation-bottom\',force:\'bottom\',onEvent:true}"></div><div class="answer clearfix" id="files-droparea"><div class="wrap"><div class="btns-left"><cm-files ng-model="files" data-qa="attachments-btn"><i class="fa cm-attachment"></i><div cm-user-rights><cm-file-choose cm-droparea="files-droparea"></cm-file-choose><cm-files-preview></cm-files-preview><cm-choose-source cm-options="{tooltip:\'up\'}"></cm-choose-source></div><div data-qa="btn-fast-registration" class="webreader-uploading" cm-user-rights="showForGuest" ng-click="openFastRegister()"></div></cm-files></div><div class="message" data-qa="answer-ctn"><textarea id="emoji-textarea" data-qa="input-answer" ng-model="newMessageText" cm-resize-textarea cm-max-rows="8" input ></textarea><div class="inputter"></div></div><div class="btns-right"><cm-emoji-handler></cm-emoji-handler><div class="post-wrap" data-qa="btn-send-answer" ng-click="send()"><i class="fa cm-post with-cursor {{conversation.lockStatus.class}}-wrap" ng-class="{ \'cm-post-idle\':isSending, \'cm-post-attention\':isSendingAbort }"></i></div></div></div><cm-emoji-list ng-model="newMessageText" cm-textarea="emoji-textarea"></cm-emoji-list></div>');
}]);
angular.module('comps/conversations/drtv-message-assets.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-message-assets.html',
'<div class="assets clearfix {{conversation.lockStatus.class}}-wrap"><span class="date"><cm-time-converter cm-timestamp="message.created" cm-date-format="settings.get(\'timeFormat\')"></cm-time-converter></span><span class="envelope"><i class="fa cm-envelope-open"></i></span></div>');
}]);
angular.module('comps/conversations/drtv-message-file.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-message-file.html',
'<div class="file-download" ng-if="file.state.is(\'readyForDownload\')" ng-click="file.startDownloadChunks()"><div><div class="file {{file.detectedExtension}}"></div><i class="fa cm-download-blanc"></i></div><span class="file-informations">{{file.name}}<br /> {{cmUtil.bytesToStr(file.size)}}</span></div><div ng-if="!file.state.is(\'readyForDownload\')"><cm-progressbar cm-percent="progress" ng-if="!file.state.is(\'cached\')"></cm-progressbar><div ng-if="file.state.is(\'cached\')"><div class="file-image" ng-if="file.isEmbed(\'image\')"><cm-loader cm-color="ci-color" class="full-inline" ng-show="!file.loaded"></cm-loader><img cm-blob-image="file" ng-click="showFullscreen()" /></div><div class="file-html5" ng-if="file.isEmbed(\'video\')"><cm-loader cm-color="ci-color" ng-show="!file.loaded"></cm-loader><video controls="true" cm-blob-video-audio="file"></video></div><div class="file-html5" ng-if="file.isEmbed(\'audio\')"><cm-loader cm-color="ci-color" ng-show="!file.loaded"></cm-loader><audio controls="true" cm-blob-video-audio="file"></audio></div><div ng-if="!file.isEmbed()" class="file {{file.detectedExtension}}" ng-click="file.promptSaveAs()"></div></div></div>');
}]);
angular.module('comps/conversations/drtv-message.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-message.html',
'<article class="clearfix" ng-if="!textOnly && messageProper()"><div ng-if="!is_my_own_message" class="avatar cm-fl"><cm-avatar cm-data="message.from"></cm-avatar></div><div class="message {{ is_my_own_message ? \'right\' : \'left\'}} cm-fl"><span class="nose {{ is_my_own_message ? \'right\' : \'left\'}}"><i class="fa {{ is_my_own_message ? \'cm-nose-right\' : \'cm-nose-left\'}}"></i></span><div class="author" ng-if="!is_my_own_message" data-qa="message-author"><span class="from">{{ message.from.getDisplayName() }}</span></div><div class="text" ng-class="{\'own-message\':is_my_own_message}"><span ng-if="!displayEncrypted() && message.text != \'\'" ng-bind-html="message.text|cmParse"></span><span ng-if="displayEncrypted()">{{\'CONVERSATION.TEXT.ENCRYPTED\'|cmTranslate}}</span></div><div><cm-message-file ng-repeat="file in message.files"></cm-message-file></div><cm-message-assets></cm-message-assets></div></article><span ng-if="textOnly && messageProper()"><span ng-if="isType(\'text\') && !displayEncrypted()" ng-bind-html="message.text|cmParse:{autolink:true}"></span><span ng-if="isType(\'text\') && displayEncrypted()">{{\'CONVERSATION.TEXT.ENCRYPTED\'|cmTranslate}}</span><span ng-if="isType(\'image\')">{{\'CONVERSATION.TAG.IMAGE\'|cmTranslate}}</span><span ng-if="isType(\'file\')">{{\'CONVERSATION.TAG.FILE\'|cmTranslate}}</span></span>');
}]);
angular.module('comps/conversations/drtv-recipient-tag.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-recipient-tag.html',
'<cm-avatar cm-data="identity" cm-weight="1" cm-stop-download></cm-avatar><cm-key-level cm-data="identity.keys.getWeakestKeySize()" cm-weight="1"></cm-key-level><section cm-weight="4" class="identityName"><div class="displayName" data-qa="contact-display-name">{{identity.getDisplayName()}}</div></section><section class="icon-list" data-qa="btn-select-contact" ng-click="toggleRecipient()"><cm-contact-type cm-data="identity"></cm-contact-type><i class="fa" ng-class="{\'cm-checkbox\':!selected[identity.id], \'cm-checkbox-right\':selected[identity.id]}"></i></section>');
}]);
angular.module('comps/conversations/drtv-recipients.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-recipients.html',
'<ul class="no-border" ng-if="(conversation.recipients.length > 1)"><li ng-repeat="identity in conversation.recipients|cmHideAppOwner|orderBy:\'getDisplayName()\':false"><cm-recipient-tag cm-data-selected="selected" cm-data="identity" cm-data-conversation="conversation"></cm-recipient-tag></li></ul><hr ng-if="conversation.state.is(\'new\') && (conversation.recipients.length > 1)"><div id="possible-recipient-list" cm-scroll-to="{anchor:\'#possible-recipient-list\',onEvent:true,timeout:50,addElementsHeight:\'cm-header\'}"></div><ul ng-if="conversation.state.is(\'new\')" class="no-border contact-list"><li ng-repeat = "contact in contacts|cmRecipients:false:selected|cmSearch:\'contacts\':search" ng-if = "contact.contactType != \'pending\'" ><cm-recipient-tag cm-data-selected="selected" cm-data="contact.identity" cm-data-conversation="conversation"></cm-recipient-tag></li><li><cm-contact-quick cm-input = "{{search}}" cm-identity-model = "identity" cm-data-selected = "selected" cm-data-conversation = "conversation" ></cm-contact-quick></li> </ul><cm-footer cm-always-on-top><button ng-click="goBack()" class="cm-btn-grey" data-qa="btn-done" cm-weight="1"> {{\'RECIPIENTS.LABEL.DONE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('comps/conversations/drtv-security-settings.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/drtv-security-settings.html',
'<cm-security-aspect ng-repeat="aspect in conversation.securityAspects.getPositiveAspects()" cm-data="aspect" cm-show-toggle-options="{{conversation.state.is(\'new\')}}"></cm-security-aspect><cm-security-aspect ng-repeat="aspect in conversation.securityAspects.getNegativeAspects()" cm-data="aspect" cm-show-toggle-options="{{conversation.state.is(\'new\')}}"></cm-security-aspect><article class="item"><span class="body security-headline"> {{\'CONVERSATION.PLACEHOLDER.ENCRYPTION\' | cmTranslate}}</span><span class="icon-list security-settings" ng-click="toggleConversationEncryption()" data-qa="btn-encryption"><i class="fa" ng-class="{\'cm-checkbox\':!conversation.isEncrypted(), \'cm-checkbox-right\':conversation.isEncrypted(), \'cm-grey\':!conversation.state.is(\'new\')}" data-qa="icon-checkbox-encryption"></i></span></article><article class="item" ng-if="conversation.passwordRequired()" ng-class="{\'no-border\':(conversation.state.is(\'new\') && conversation.options.hasCaptcha)}"><span class="body security-headline"> {{\'CONVERSATION.PLACEHOLDER.PASSCAPTCHA\' | cmTranslate}}</span><span class="icon-list security-settings" ng-click="toggleCaptcha()" data-qa="btn-toggle-captcha"><i class="fa" ng-class="{\'cm-checkbox\':!conversation.options.hasCaptcha, \'cm-checkbox-right\':conversation.options.hasCaptcha, \'cm-grey\':!conversation.state.is(\'new\')}" data-qa="icon-checkbox-passcaptcha"></i></span></article><!--<article class="item" ng-if="(conversation.passwordRequired() && conversation.isEncrypted()) || conversation.hasPassword()">--><article class="item" ng-if="(conversation.passwordRequired() && conversation.options.hasCaptcha)"><section class="captcha" ng-if="conversation.state.is(\'new\') && conversation.options.hasCaptcha" data-qa="captcha-canvas"><cm-captcha></cm-captcha><p ng-if="!conversation.state.is(\'new\')"><button ng-click="requestCaptcha()"><i class="fa cm-key"></i> {{"CONVERSATION.LABEL.REQUEST_CAPTCHA"|cmTranslate}}</button></p><p ng-if="!conversation.state.is(\'new\')"><button ng-click="sendCaptcha()"><i class="fa cm-send"></i> {{"CONVERSATION.LABEL.SEND_CAPTCHA"|cmTranslate}}</button></p></section><span class="icon-list captcha-reload" ng-click="refreshCaptcha()" ng-if="conversation.state.is(\'new\')"><i class="fa cm-change"></i></span><section class="captcha" ng-if="!conversation.state.is(\'new\')" data-qa="captcha-image"><img cm-blob-image="conversation.passCaptcha" /></section></article><article class="item cm-form-style no-border pt15" ng-if="conversation.passwordRequired()"><span class="security-headline">{{\'CONVERSATION.PLACEHOLDER.PASSWORD\'|cmTranslate}}</span><div class="cm-input-ctn with-inside-icon" ng-class="{\'with-inside-icon\':!conversation.state.is(\'new\')}" cm-input-watcher><input data-qa = "input-password" type = "text" ng-model = "conversation.password" placeholder = "{{\'CONVERSATION.PLACEHOLDER.PASSWORD\'|cmTranslate}}" ng-change = "decrypt()" ng-disabled = "conversation.state.is(\'decrypted\')" cm-adaptive-change = "2000" /><i class="fa cm-write" ng-if="conversation.state.is(\'new\')"></i><i class="fa cm-checker" ng-if="!conversation.state.is(\'new\') && conversation.state.is(\'decrypted\')" data-qa="icon-conversation-decrypted"></i></div><cm-info-bubble class="cm-alert" ng-if="showPasswordLocalKeyInfo && conversation.state.is(\'new\')"><i class="fa cm-attention"></i> {{\'CONVERSATION.LABEL.SHOW_PW_INFO_BECAUSE_USER_HAS_NO_LOCAL_KEYS\'|cmTranslate}}</cm-info-bubble><cm-info-bubble class="classic-link" ng-click="goTo(\'/settings/identity/key/list\')" ng-if="conversation.options.showKeyInfo && conversation.state.is(\'new\')"> {{\'CONVERSATION.LABEL.KEY_GENERATION\'|cmTranslate}}</cm-info-bubble></article><cm-footer><button ng-click="goBack()" class="cm-btn-grey" data-qa="btn-security-done"> {{\'CONVERSATION.SETTINGS.OKAY\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmConversations', [
    'cmCore',
    'cmFiles',
    'cmSecurityAspects',
    'cmUser'
,'comps/conversations/drtv-conversation-tag.html','comps/conversations/drtv-conversation.html','comps/conversations/drtv-message-assets.html','comps/conversations/drtv-message-file.html','comps/conversations/drtv-message.html','comps/conversations/drtv-recipient-tag.html','comps/conversations/drtv-recipients.html','comps/conversations/drtv-security-settings.html'])
.directive('cmCaptcha',[
    'cmCrypt', function (cmCrypt){
        return {
            restrict: 'AE',
            scope: true,
            require: '^cmConversation',
            template: '<canvas id="canvas"></canvas>', //MOCK

            controller:	function($scope, $element, $attrs){
                var captcha;

                $scope.captchaDim = $element[0].offsetWidth + 'x' + $element[0].offsetHeight;
                $scope.captchaFont = "sans";
                $scope.captchaImageData = '';

                $scope.create = function(){
                    var dim = $scope.captchaDim.split("x");
                    captcha = new Captchagen({
                        width: dim[0]
                        ,height: dim[1]
                        ,text: $scope.conversation.password || cmCrypt.generatePassword(6)
                        ,font: $scope.captchaFont
                    });
                    captcha.generate();

                    $scope.conversation.password = captcha.text();
                    $scope.conversation.tmpPassCaptcha = captcha.uri();
                };

                $scope.refreshCaptcha = function(){
                    captcha.refresh($scope.conversation.password);
                    $scope.conversation.tmpPassCaptcha = captcha.uri();
                };

                $scope.create();

                $scope.$watch('conversation.password', $scope.refreshCaptcha);
                $scope.$on('captcha:refresh',$scope.refreshCaptcha);
            }
        }
    }
])
.directive('cmConversationTag',[
    'cmUserModel',
    function (cmUserModel){
        return {
            restrict: 'AE',
            scope: {
                conversation: "=cmData"
            },
            templateUrl: 'comps/conversations/drtv-conversation-tag.html',
            priority: 0,
            link: function(scope){
            },
            controller: function($scope){
                /**
                 * set Avatar Identity
                 */
                if($scope.conversation.recipients.length > 2){
                    $scope.avatarIdentity = $scope.conversation.lastMessage.from;
                } else {
                    if($scope.conversation.recipients.length == 1){
                        $scope.avatarIdentity = cmUserModel.data.identity;
                    } else {
                        var arr_recipients = $scope.conversation.recipients.filter(function(recipient){
                            return recipient.id != cmUserModel.data.identity.id;
                        });

                        $scope.avatarIdentity = arr_recipients[0];
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmConversation', [

    'cmConversationFactory', 'cmUserModel', 'cmCrypt', 'cmLogger', 'cmNotify',
    'cmModal', 'cmEnv', 'cmSettings', 'cmKeyStorageService', 'cmTransferScopeData',
    '$location', '$rootScope', '$document', '$routeParams', '$q',

    function (cmConversationFactory, cmUserModel, cmCrypt, cmLogger, cmNotify,
              cmModal, cmEnv, cmSettings, cmKeyStorageService, cmTransferScopeData,
              $location, $rootScope, $document, $routeParams, $q) {
        return {
            restrict: 'AE',
            templateUrl: 'comps/conversations/drtv-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                
                var self                 = this,
                    conversation_subject = $scope.$eval($attrs.cmSubject),
                    conversation_offset  = $attrs.offset,
                    conversation_limit   = $attrs.limit,
                    filesForMessage      = [],
                    showedAsymmetricKeyError = false,
                    storageService = new cmKeyStorageService('conversation-recipient-view');

                $scope.isSending        = false;
                $scope.isSendingAbort   = false;

                $scope.recipientName = '';
                function showRecipientName(identity){
                    $scope.recipientName = identity.getDisplayName();
                }

                // show name of incoming identity
                $scope.showName = function(identity){
                    if(identity && !('isAppOwner' in identity) && $scope.recipientName != identity.getDisplayName()){
                        showRecipientName(identity);

                        identity.on('update:finished', function(){
                            showRecipientName(identity);
                        });
                    }
                };

                /**
                 * handle Recipient View
                 */
                $scope.showGrid = cmSettings.get('defaultShowRecipientAvatar'); // degault grid off, wenn recipient.legnth > 2
                if(!$scope.conversation.state.is('new')){
                    $scope.showGrid = storageService.get($scope.conversation.id)
                }
                $scope.toggleRecipientView = function(){
                    if($scope.showGrid){
                        $scope.showGrid = false;
                        if(!$scope.conversation.state.is('new')){
                            storageService.set($scope.conversation.id, false)
                        }
                    } else {
                        $scope.showGrid = true;
                        if(!$scope.conversation.state.is('new')){
                            storageService.set($scope.conversation.id, true)
                        }
                    }
                };

                $scope.loadPreviousMessages = function(){
                    $scope.conversation.update();
                };

                /**
                 * start sending process
                 * with preparing files for upload
                 * after preparation send message
                 */
                $scope.send = function(){
                    if($scope.isSending !== true){
                        $scope.isSending = true;
                        $scope.isSendingAbort = false;

                        if($scope.conversation.checkConsistency() !== true){
                            $scope.conversation.trigger('save:aborted');
                            $scope.isSendingAbort = true;
                            return false;
                        }

                        if(!$scope.conversation.state.is('new')
                            && $scope.conversation.getKeyTransmission() == 'asymmetric'
                            && $scope.conversation.userHasPrivateKey() == false){

                            $scope.isSending = false;

                            return false;
                        }


                        //Is the conversation newly created and has not been saved to the backend yet?                  
                    
                        if($scope.conversation.state.is('new')){                        
                            //The conversations has not been saved to the Backend, do it now:
                            $scope.conversation.save()
                            //When that is done try again to send the message:
                            .then( function(conversation_data){ 
                                $scope.conversation.importData(conversation_data)
                                cmConversationFactory.register($scope.conversation);
                                prepareFiles();
                            });
                            return false
                        }

                        prepareFiles()
                    }
                }

                        

                $rootScope.$$listeners.sendOnReturn = [];
                $rootScope.$on('sendOnReturn',$scope.send);

                $scope.showAsymmetricKeyError = function(){
//                    cmLogger.debug('cmConversationDRTV.showAsymmetricKeyError')

                    if(!$scope.conversation.state.is('new')
                        && $scope.conversation.getKeyTransmission() == 'asymmetric'
                        && $scope.conversation.userHasPrivateKey() == false
                    ){
                        cmNotify.warn('CONVERSATION.WARN.ASYMMETRIC_DECRYPT_ERROR',{ttl:0});
                        return true
                    }
                    return false
                };

                $scope.showGoToSettingsModal = function(){
                    if(
                            !$scope.conversation.state.is('new')
                        &&  $scope.conversation.passwordRequired()
                        &&  !$scope.conversation.password
                    ){
                        // switcher for purl and conversation
                        var settingsLinker = {type:'',typeId:''};
                        if('purlId' in $routeParams){
                            settingsLinker.type = 'purl';
                            settingsLinker.typeId = $routeParams.purlId;
                        } else {
                            settingsLinker.type = 'conversation';
                            settingsLinker.typeId = $routeParams.conversationId;
                        }
                        cmNotify.warn('CONVERSATION.WARN.PASSWORD_NEEDED',{ttl:0,i18n:settingsLinker});
                        return true
                    }

                    return false
                };

                function prepareFiles(){

                    /**
                     * check if files exists
                     * after success sendMessage
                     */
                    
                    $scope.conversation.getPassphrase()
                    .catch(function(){
                            return  $scope.conversation.isEncrypted()
                                    ?   $q.reject('access denied')
                                    :   $q.when(null)       //Todo: null for 'not encrypted' old convention
                    })
                    .then(function(passphrase){
                        $rootScope.$broadcast('cmFilesCheckFiles', {
                            passphrase: passphrase,
                            conversationId: $scope.conversation.id,
                            success: function(files) {
                                if (files.length > 0) 
                                    filesForMessage = files;
                                sendMessage()
                            },
                            error: function(maxFileSize, header) {
                                $scope.isSending = false;
                                $scope.isSendingAbort = true;
                                cmNotify.warn('CONVERSATION.WARN.FILESIZE_REACHED', {
                                    ttl: 0,
                                    i18n: {
                                        maxFileSize: maxFileSize,
                                        fileSize: header['X-File-Size'],
                                        fileName: header['X-File-Name']
                                    }
                                });
                            }
                        });                            
                    })

                }

                /**
                 * validator helper
                 * @returns {boolean}
                 */
                function isMessageValid(){
                    if((typeof $scope.newMessageText == 'string' &&  $scope.newMessageText != '') || filesForMessage.length > 0){
                        return true;
                    }
                    return false;
                }

                /**
                 * send message to api
                 */
                function sendMessage() {

                    /**
                     * validate answer form
                     * @type {boolean}
                     */
                    
                
                    var message_invalid         = !isMessageValid()

                    //If anything is invalid, abort and notify the user:
                    if(message_invalid){

                        if (message_invalid)
                            cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY', {ttl:5000});

                        // if (passphrase_invalid)
                        //     cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID', {ttl:5000});


                        // enable send button
                        $scope.isSending = false;

                        return false
                    }

                    //If we got this far everything should be valid.

                    //Create a new message:


                    $scope.conversation.getPassphrase()
                    .then(
                        //If we get a proper passphrase:
                        function(passphrase){
                            return  $scope.conversation.messages
                                    .create({conversation:$scope.conversation})
                                    .addFiles(filesForMessage)
                                    .setText($scope.newMessageText)
                                    .encrypt(passphrase)
                                    .save()
                        },
                        //If we dont get a proper passphrase
                        function(reason){
                            return  $scope.conversation.isEncrypted()
                                    ?   $q.reject('access denied')
                                    :   $scope.conversation.messages
                                        .create({conversation:$scope.conversation})
                                        .addFiles(filesForMessage)
                                        .setText($scope.newMessageText)
                                        .setPublicData(['text','fileIds'])
                                        .save()                                    
                        }
                    )
                    .then(function(){
                        // tidy up:
                        clearTransferScopeData();
                        $scope.newMessageText = '';
                        filesForMessage = [];
                        $scope.isSending = false;

                        //Todo: This is not the right place to count messages:
                        $scope.conversation.numberOfMessages ++
                    }, function(){
                        $scope.isSending = false;
                    });
                }

                this.addPendingRecipients = function(){
                    if($scope.conversation.state.is('new')){
                        $rootScope.pendingRecipients = $rootScope.pendingRecipients || [];
                        $rootScope.pendingRecipients.forEach(function(pendingRecipient){
                            $scope.conversation.addRecipient(pendingRecipient);
                        });
                        $rootScope.pendingRecipients = []
                    }
                };

                function init(conversation){
                    $scope.conversation = conversation
                    $rootScope.pendingConversation = $scope.conversation;

                    // reload details of conversation
                    $scope.conversation.update(undefined, true);

                    self.addPendingRecipients();
                    // $scope.showAsymmetricKeyError();

                    // first focus on message
                    if($scope.conversation.state.is('new') && cmEnv.isNotMobile){
                        $document[0].querySelector('cm-conversation .answer textarea').focus();
                    }

                    $scope.show_contacts  = false;

    //                $scope.showGoToSettingsModal(); 18.07.2014 BS can be removed because on updated:finished event do this check

                    /** Event callbacks **/
                    function callback_update_finished(){
                        $scope.showAsymmetricKeyError();
                        $scope.showGoToSettingsModal();
                    }

                    function callback_password_missing(){
                        // switcher for purl and conversation, @Todo: vereinheitlichen
                        var settingsLinker = {type:'',typeId:''};
                        if('purlId' in $routeParams){
                            settingsLinker.type = 'purl';
                            settingsLinker.typeId = $routeParams.purlId;
                        } else {
                            settingsLinker.type = 'conversation';
                            settingsLinker.typeId = $routeParams.conversationId;
                        }
                        cmNotify.warn('CONVERSATION.WARN.NO_PASSWORD', {ttl:0, i18n: settingsLinker});
                    }

                    function callback_recipients_missing(){
                        // switcher for purl and conversation, @Todo: vereinheitlichen
                        var settingsLinker = {type:'',typeId:''};
                        if('purlId' in $routeParams){
                            settingsLinker.type = 'purl';
                            settingsLinker.typeId = $routeParams.purlId;
                        } else {
                            settingsLinker.type = 'conversation';
                            settingsLinker.typeId = $routeParams.conversationId;
                        }
                        cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING',
                            {
                                ttl:0, 
                                i18n: settingsLinker,
                                template: '<small>{{\'CONVERSATION.WARN.RECIPIENTS_MISSING_OKAY\'|cmTranslate}}</small>'+
                                          '<i ng-click="conversation.solitary = !conversation.solitary" ng-class="{\'cm-checkbox\':!conversation.solitary, \'cm-checkbox-right\':conversation.solitary}" class="fa cm-ci-color ml15" data-qa="checkbox-dont-ask-me-again"></i>',
                                templateScope: $scope
                            }
                        );
                    }

                    function callback_save_aborted(){
                        $scope.isSending = false;
                    }

                    $scope.conversation
                    .one('update:finished',       callback_update_finished)
                    .on('password:missing',      callback_password_missing)
                    .on('recipients:missing',    callback_recipients_missing)
                    .on('save:aborted',          callback_save_aborted)

                    var stop_listening_to_logout =  $rootScope.$on('logout', function(){
                                $rootScope.pendingRecipients = [];
                                $rootScope.pendingConversation = null;
                        });

                    var stop_listening_to_idenity_switch =  $rootScope.$on('identity:switched', function(){
                                $rootScope.pendingRecipients = [];
                                $rootScope.pendingConversation = null;
                        });

                    $scope.$on('$destroy', function(){
                        $scope.conversation.off('update:finished',       callback_update_finished);
                        $scope.conversation.off('password:missing',      callback_password_missing);
                        $scope.conversation.off('recipients:missing',    callback_recipients_missing);
                        $scope.conversation.off('save:aborted',          callback_save_aborted);

                        stop_listening_to_logout();
                        stop_listening_to_idenity_switch();
                    });
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope,{
                    id:'conversation-'+($scope.conversation.id||'new'),
                    scopeVar:'newMessageText',
                    onSet: function(){
                        this.noneScopeData = $scope.files;
                    },
                    onGet: function(formData, noneScopeData){
                        if(noneScopeData != null)
                            $scope.files = noneScopeData;
                    }
                });


                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                        init(conversation)                    
                })
            }
        }
    }
])
.directive('cmLockLevel',[
    function cmSafetyLevel(){
        return {
            restrict: 'AE',
            template: '',

            link: function(scope, element, attrs){

                function drawLevel(x){
                    // clear all
                    element.children().remove();
                    // draw x
                    if(x == 0) {
                        element.append('<i class="fa cm-unlock"></i>');
                    } else {
                        for (var i = 0; i < x; i++) {
                            element.append('<i class="fa cm-lock"></i>');
                        }
                    }
                }

                // for conversation model
                if(attrs.cmLevel) {
                    scope.$watch(attrs.cmLevel, function (level) {
                        drawLevel(level)
                    })
                }
            }
        }
    }
])
.directive('cmMessageAssets', [
    'cmSettings',
    function (cmSettings) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'comps/conversations/drtv-message-assets.html',
            controller: function($scope){
                $scope.settings = cmSettings;
            }
        }
    }
])
.directive('cmMessageFile', [
    'cmModal', 'cmUtil',
    function (cmModal, cmUtil) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element) {
                $scope.cmUtil = cmUtil;
                $scope.progress = 0;

                $scope.showFullscreen = function(){
                    // open modal
                    cmModal.create({
                        id: 'image-view',
                        'class': 'modal-image-fullscreen',
                        'type': 'fullscreen'
                    }, '<figure ng-style="fullscreenVisibility">' +
                        '<img cm-stay-in-viewport cm-src="fullscreenImage" cm-loaded-spinner="fullscreenSpinner" cm-loaded-visibility="fullscreenVisibility" />' +
                        '<figcaption><cm-message-assets></cm-message-assets></figcaption>' +
                       '</figure>' +
                       '<cm-footer><i class="fa cm-grid"></i></cm-footer>', null, $scope);
                    cmModal.open('image-view');

                    $scope.fullscreenSpinner = true;
                    $scope.fullscreenVisibility = {visibility:'hidden'};
                    $scope.fullscreenImage = $element.find('img').attr('src');
                };

                // exists fileModel
                if(typeof $scope.file == 'object'){
                    $scope.file.on('progress:chunk', function(e, progress){
                        $scope.progress = progress;
                    });
                }
            }
        }
    }
])
.directive('cmMessage', [
    function () {
        return {
            restrict: 'AE',
            scope: {
                message: '=cmData',
                conversation: '=cmDataConversation'
            },
            templateUrl: 'comps/conversations/drtv-message.html',

            link: function(scope, element){

                function setFileView(){
                    element.addClass('file-view');
                }

                if(!scope.textOnly) {
                    // add css classes
                    if (scope.message.files.length > 0) {
                        setFileView();
                    }
                    if (scope.message.isOwn()) {
                        element.addClass('right');
                    }
                }

                function handleFiles(){
                    if (!scope.textOnly && scope.message.files.length > 0) {
                        setFileView();
                        scope.conversation.getPassphrase()
                        .then(
                            function(passphrase){
                                scope.message.decryptFiles(passphrase);
                            },

                            function(passphrase){
                                if(!scope.conversation.isEncrypted())
                                    scope.message.decryptFiles(null)
                            }
                        )
                    }
                }


                if(typeof scope.message == 'object' && typeof scope.message.on == 'function'){
                    //Todo: this should be 'one' not 'on', shouldn't it? Andreas

                    scope.message.on('init:files', function(){
                        handleFiles();
                    });
                }

                handleFiles();

            },

            controller: function ($scope, $element, $attrs) {
                $scope.textOnly = !!$scope.$eval($attrs.textOnly);

                $scope.is_my_own_message = ('isOwn' in $scope.message) ? $scope.message.isOwn() : false;

                $scope.isType = function(expectType){
                    if(typeof $scope.message.files !== 'undefined' && $scope.message.files.length > 0 && typeof $scope.message.files[0].type == 'string'){
                        var mimeType = $scope.message.files[0].type;
                        if(expectType == 'image' && mimeType.search('^image') != -1){
                            return true;
                        } else if(expectType == 'file' && mimeType.search('^image') == -1){
                            return true;
                        }
                    } else if(expectType == 'text')
                        return true;
                };

                $scope.displayEncrypted = function(){
                    if($scope.message.id == undefined){
                        /**
                         * hack for empty messages
                         */                        
                        return false;
                    }

                    if(
                            $scope.message.text != undefined 
                        ||  (
                                    $scope.message.text == undefined 
                                &&  typeof $scope.message.files !== 'undefined' 
                                &&  $scope.message.files.length > 0
                            )
                    ){
                        return false;
                    }
                    return true;
                };
                
                $scope.messageProper = function(){
                    var isInComplete   =    $scope.message.state.is('incomplete'),
                        textAvailable  =    typeof $scope.message.text == 'string'
                                            &&  $scope.message.text.length > 0,
                        encrypted      =    $scope.message.isEncrypted(),
                        filesAvailable =    typeof $scope.message.fileIds == 'object'
                                            &&  $scope.message.fileIds.length > 0;

                    if(isInComplete)
                        return false;

                    return filesAvailable || textAvailable || encrypted;
                }
            }
        }
    }
])
.directive('cmPasswordInput',[
    function () {
        return {
            restrict: 		'A',
            scope:			false,

            link:			function(scope, element, attrs, ngModelCtrl){

                var status = angular.element('<i></i>').addClass('fa'),
                    timeout

                element.after(status)

                scope.refresh= function(){
                    element.val()
                        ?	status.addClass('fa-lock').removeClass('fa-unlock')
                        :	status.addClass('fa-unlock').removeClass('fa-lock')
                }

                scope.refresh()
                scope.$watch('passphrase', scope.refresh)
            }

        }
    }
])
.directive('cmRecipientCounter',[
    function(){
        return {
            restrict : 'AE',
            transclude: true,
            template : '<i class="fa cm-group background"></i><div class="foreground" ng-transclude></div>'
        }
    }
])
.directive('cmRecipientTag',[
    // no dependencies
    function (){
        return {
            restrict: 'AE',
            scope: {
                selected:       "=cmDataSelected",
                identity:       "=cmData",
                conversation:   "=cmDataConversation"
            },
            templateUrl: 'comps/conversations/drtv-recipient-tag.html',
            controller: function($scope){

                $scope.addRecipient = function(){
                    $scope.selected[$scope.identity.id] = true;
                    $scope.conversation.addRecipient($scope.identity);
                };

                $scope.removeRecipient = function(){
                    if($scope.disabled_remove) return null;
                    delete $scope.selected[$scope.identity.id];
                    $scope.conversation.removeRecipient($scope.identity);
                };

                $scope.toggleRecipient = function(){
                    if(!$scope.conversation.state.is('new'))
                        return false;

                    $scope.selected[$scope.identity.id]
                        ?   $scope.removeRecipient($scope.identity)
                        :   $scope.addRecipient($scope.identity);
                };
            }
        }
    }
])
.directive('cmRecipientsCommaSeperated', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            scope: {
                conversation: '=cmData'
            },
            template: '<span>{{entries}}</span>',
            controller: function($scope){
                $scope.entries = '';

                function refresh(){
                    if($scope.conversation.recipients.length > 2){
                        /**
                         * Groups
                         */
                        $scope.entries = $scope.conversation.recipients.filter(function(recipient){
                            return (recipient.id != cmUserModel.data.identity.id);
                        }).map(function(recipient){
                            return recipient.getDisplayName();
                        }).join(', ');
                    } else if($scope.conversation.recipients.length == 2){
                        /**
                         * Chat
                         */
                        $scope.entries =  $scope.conversation.recipients.filter(function(recipient){
                            return (recipient.id != cmUserModel.data.identity.id);
                        })[0].getDisplayName();
                    } else {
                        /**
                         * Own
                         */
                        $scope.entries = cmUserModel.data.identity.getDisplayName();
                    }
                }

                refresh();

                $scope.conversation.recipients.on('register deregister update:finished', refresh);
            }
        }
    }
])
.directive('cmRecipients', [
    '$rootScope',
    '$location',
    '$window',
    'cmContactsModel',
    function($rootScope, $location, $window, cmContactsModel){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-recipients.html',
            controller: function ($scope, $element, $attrs) {
                $scope.selected         = {};
                $scope.contacts         = cmContactsModel.contacts;

                function init(conversation){
                    $scope.conversation = conversation
                    $scope.$watchCollection('conversation.recipients', function(recipients){
                        $scope.selected = {}
                        recipients.forEach(function(recipient){
                            $scope.selected[recipient.id] = true;
                        })
                    })
                }

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                }

                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                        init(conversation)
                })

            }
        }
    }
])
.directive('cmSecuritySettings', [

    'cmUserModel',
    'cmNotify',
    'cmLogger',
    '$location',
    '$document',
    '$window',
    'cmEnv',
    '$rootScope',

    function(cmUserModel, cmNotify, cmLogger, $location, $document, $window, cmEnv, $rootScope){
        return{
            restrict : 'AE',
            templateUrl : 'comps/conversations/drtv-security-settings.html',
            scope : true,

            link: function(scope){
                scope.showPasswordLocalKeyInfo = false;

                function showPasswordInfo(conversation){
                    if(conversation.isEncrypted() && !conversation.userHasPrivateKey()){
                        scope.showPasswordLocalKeyInfo = true;
                    } else {
                        scope.showPasswordLocalKeyInfo = false;
                    }
                }

                /**
                 * watch the conversation object on changes
                 */
                scope.$watch('conversation', function(conversation){
                    if(conversation){
                        // open the controls for a new conversation and password isnt set in a symetric case || case mixed exists and user isnt in passphraselist
                        showPasswordInfo(conversation);

                        conversation.on('encryption:enabled', function(){
                            showPasswordInfo(conversation);
                        });

                        conversation.on('encryption:disabled', function(){
                            showPasswordInfo(conversation);
                        });
                    }
                });

                scope.$watch('conversation.password', function(){
                    if(scope.conversation.state.is('new'))
                        scope.conversation.securityAspects.refresh()
                })
            },

            controller: function($scope, $element, $attrs){
                $scope.conversation = $scope.$eval($attrs.cmData)

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                };

                /**
                 * @name decrypt
                 * @description
                 * try to decrypt the conversation
                 */
                $scope.decrypt = function(){
                    if(     !$scope.conversation.state.is('new')
                        &&  $scope.conversation.isEncrypted()
                        &&  !($scope.conversation.getKeyTransmission() == 'asymmetric' && $scope.conversation.userHasPrivateKey() == false)
                    ) {
                        $scope.conversation.one('decrypt:failed', function () {
                            cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG');
                            //$scope.toggleControls('open');
                            //TODO go to settings page??
                        });
                        $scope.conversation.decrypt();
                    }
                };

                /**
                 * @name toggleConversationEncryption
                 * @description
                 * enable or disable encryption for a conversation
                 */
                $scope.toggleConversationEncryption = function(){
                    if($scope.conversation.state.is('new')){
                        if($scope.conversation.isEncrypted() !== false){
                            $scope.conversation.disableEncryption();
                        } else {
                            $scope.conversation.enableEncryption();
                        }
                    }
                };

                /**
                 * @name toggleCaptcha
                 * @description
                 * enable or disable passcaptcha creation
                 */
                $scope.toggleCaptcha = function(){
                    if($scope.conversation.state.is('new') && $scope.conversation.isEncrypted() !== false){
                        if($scope.conversation.options.hasCaptcha !== false){
                            $scope.conversation.disablePassCaptcha();
                        } else {
                            $scope.conversation.enablePassCaptcha();
                        }
                    }
                };

                /**
                 * @name refreshCaptcha
                 * @description
                 * redraw a new passcaptcha
                 */
                $scope.refreshCaptcha = function(){
                    $scope.$broadcast('captcha:refresh');
                };

                $scope.scrollToPasswordArea = function(){
                    // scroll to password
                    var anchor = $document[0].querySelector('#password-area'),
                        body = angular.element($document[0].querySelector($element[0].localName+' .body'));
                        body[0].scrollTop = anchor.offsetTop;
                }
            }
        }
    }
])

.filter('cmHideAppOwner', [
    function(){
        return function(arrayOfIdentities) {
            return arrayOfIdentities.filter(function(identity){
                return !('isAppOwner' in identity)
            })
        }
    }
])

.filter('cmLatestMessage', [
    function(){
        return function(conversation){
            return conversation.messages.reduce(function(latest_so_far, message){
                return  parseInt( (message && message.created) || 0) >= parseInt( (latest_so_far && latest_so_far.created) || 0)
                        ?   message
                        :   latest_so_far
            }, null)
        }
    }
])

.filter('cmTagline', [
    '$filter',
    function($filter){
        return function(conversation) {
            var subject;

            if (conversation.subject) {
                subject = conversation.subject
            } else if (conversation.lastMessage && conversation.lastMessage.from && conversation.lastMessage.from.displayName) {
                subject = conversation.lastMessage.from.getDisplayName();
            } else {
                // TODO: show own user in subject???
                subject = (conversation.recipients.map(function (recipient) {
                    return recipient.getDisplayName();
                }).join(', '));
            }

            subject = $filter('cmParse')(subject);

            return subject;
        }
    }
])
/**
 * @ngdoc object
 * @name cmConversationFactory
 * @description
 * Handles Conversation Instances<br />
 * create new instances and check if instances still exists
 *
 * @requires cmConversationsAdapter
 * @requires cmFactory
 * @requires cmStateManagement
 * @requires cmConversationModel
 * @requires $rootScope
 *
 */
.service('cmConversationFactory', [

    '$rootScope',
    'cmUserModel',
    'cmConversationsAdapter',
    'cmFactory',
    'cmStateManagement',
    'cmConversationModel',
    'cmLogger',

    function($rootScope, cmUserModel, cmConversationsAdapter, cmFactory, cmStateManagement, cmConversationModel, cmLogger) {
        var self = cmFactory(cmConversationModel);

        var _quantity   = 0,
            _limit      = 10,
            _offset     = 0;

        self.state = new cmStateManagement(['loading']);

        self.getList = function(limit, offset){
//            cmLogger.debug('cmConversationFactory.getList');
            if(cmUserModel.isGuest() || self.state.is('loading'))
                return false;

            // for spinner show only once
            if(!self.state.is('first-load')) {
                self.state.set('first-load');
                self.state.set('initial-loading');
            }
            self.state.set('loading');

            if(typeof limit === 'undefined'){
                limit = _limit;
            }

            if(typeof offset === 'undefined'){
                offset = _offset;
            }

            cmConversationsAdapter.getConversations(limit, offset).then(
                function (data) {
                    _quantity = data.numberOfConversations;

                    data.conversations.forEach(function (conversation_data) {
                        self.create(conversation_data);
                    });
                }
            ).finally(
                function(){
                    self.state.unset('loading');
                    if(self.state.is('initial-loading')){
                        self.state.unset('initial-loading');
                    }
                }
            )
        };

        self.getLimit = function(){
            return _limit;
        };

        /**
         * @ngdoc method
         * @methodOf cmConversationFactory
         *
         * @name getQuantity
         * @description
         * Returns Number of all Conversations
         * Quantity is first set in getList()
         *
         * @returns {Number} quantity Number of all Conversations
         */
        self.getQuantity = function(){
            return _quantity;
        };

        /**
         * EventHandling
         */
        $rootScope.$on('logout', function(){ self.reset('cmConversations') });

        $rootScope.$on('identity:switched', function(){
            cmUserModel.one('update:finished', function(){
                self.reset('cmConversations');
                self.getList();
            })
        });

        $rootScope.$on('login', function(){
            cmUserModel.one('update:finished', function(){
                self.reset('cmConversations');
                self.getList();
            })
        });

        cmConversationsAdapter.on('message:new', function(event,data){
            self
                .create(data.conversationId)
                .trigger('message:new', data.message)
        });

        cmConversationsAdapter.on('conversation:new', function(event,data){
            self.create(data)
        });

        /**
         * @TODO CallbackQueue? Fingerprint check! Performance!
         */
        cmConversationsAdapter.on('passphrases:updated', function(event, data){
            //cmLogger.debug('cmConversationFactory.on:passphrase:updated');

            if(typeof data == 'object') {
                if ('keyId' in data && typeof data.keyId == 'string' && data.keyId.length > 0) {
                    var localKeys = cmUserModel.loadLocalKeys();
                    var checkKeyId = false;

                    localKeys.forEach(function (key) {
                        if (key.id == data.keyId) {
                            checkKeyId = true;
                        }
                    });

                    if (checkKeyId) {
                        self.forEach(function (conversation) {
                            conversation.load();
                        });
                    }
                }
            }
            //cmCallbackQueue.push(
            //    // iterate over conversations and decrypt
            //);
        });

        return self;
    }
])
/**
 * @ngdoc object
 * @name cmConversationModel
 * @constructor
 * @description
 * Represents a Conversation.
 * # Events
 *  - init:finished
 *  - update:finished
 *  - load:failed
 *  - message:new
 *  - message:added
 *  - save:failed
 *  - save:finished
 * # States
 *  - new
 *  - loading
 *  - decrypted
 *
 * @param {Object} [data] The conversation data as received from the backend.
 */


.factory('cmConversationModel',[

    'cmBoot',
    'cmConversationsAdapter',
    'cmMessageModel',
    'cmIdentityFactory',
    'cmIdentityModel',
    'cmFileFactory',
    'cmCrypt',
    'cmUserModel',
    'cmFactory',
    'cmStateManagement',
    'cmNotify',
    'cmObject',
    'cmLogger',
    'cmPassphraseVault',
    'cmSecurityAspectsConversation',
    'cmUtil',
    'cmFilesAdapter',
    'cmKeyStorageService',
    '$q',
    '$rootScope',
    
    function (cmBoot, cmConversationsAdapter, cmMessageModel, cmIdentityFactory, cmIdentityModel, cmFileFactory,
              cmCrypt, cmUserModel, cmFactory, cmStateManagement, cmNotify, cmObject, cmLogger, cmPassphraseVault,
              cmSecurityAspectsConversation, cmUtil, cmFilesAdapter, cmKeyStorageService,
              $q, $rootScope){

        function ConversationModel(data){
            var self                = this,
                passphraseVault     = undefined,
                encryption_disabled = undefined,
                limit               = 10;

            this.id                 = undefined;
            
            this.recipients         = new cmFactory(cmIdentityModel);      //list of cmIdentityModel objects
            this.messages           = new cmFactory(cmMessageModel);        //list of MessageModel objects

            this.timeOfCreation     = 0;          //timestamp of the conversation's creation
            //--> meta
            this.timeOfLastUpdate   = 0;          //timestamp of the conversations's last Update
            this.subject            = '';         //subject
            this.securityAspects    = new cmSecurityAspectsConversation(this);
            this.meta               = {};         //stores meta data, not yet implemented, TODO
            this.password           = undefined;
            this.state              = new cmStateManagement(['new','loading']);
            this.keyTransmission    = '';

            this.lastMessage        = this.messages.new() //fallback

            this.missingAePassphrases = {};

            //rethink, mabye backend should deliver array of message ids
            this.numberOfMessages   = 0;

            this.options            = {
                'hasCaptcha'    : false,
                'hasPassword'   : false,
                'showKeyInfo'   : false
            };

            /**
             * GUI Variable
             * @type {{level: string, class: string}}
             */
            this.lockStatus = {
                'level': 2,
                'class': 'safer'
            };

            /*maybe REFACTOR TODO*/
            this.passCaptcha = undefined;
            this.tmpPassCaptcha = '';

            cmObject.addEventHandlingTo(this);

            this.localPWHandler = new cmKeyStorageService('pw');

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name init
             * @description
             * Function to initialize the conversation. Should never be called from the outside.
             *
             * @param {Object} data The conversation data as required by .importData(), see below.
             */
            function init(data){
//                cmLogger.debug('cmConversationModel:init');

                // via id
                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.load();
                // via data.id
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;
                    if(cmUtil.objLen(data) < 2){
                        self.load();
                    } else {
                        self.importData(data);
                    }
                } else {
                    self.state.set('new');
                    self.enableEncryption(); // have to be there!!! BS klären mit AP 18.06.2014
                    self.addRecipient(cmUserModel.data.identity)
                }

                self.trigger('init:finished');
            }

            this.userHasPrivateKey = function(){
                return  cmUserModel.hasLocalKeys()
            };

            /**
             * @todo !!!!
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name checkConsistency
             * @description
             * Checks Conversation Settings and User Opinions
             *
             * @param {Boolean} bool Return true or false
             */
            this.checkConsistency = function (){
                if(this.passwordRequired() && !this.password){
                    self.trigger('password:missing');
                    return false
                }

                if((this.recipients.length == 1) && !this.solitary && this.state.is('new')){
                    self.trigger('recipients:missing')
                    return false
                }

                /*
                if(self.isEncrypted() === true){
                */
                    /**
                     * es wird überprüft on alle recipeinten 1-n keys haben
                     */
                    /*
                    var key_check = false;
                    self.recipients.forEach(function(recipient){
                        if(recipient.hasKeys() === false){
                            key_check = true;
                        }
                    });
                    */

                    /**
                     * checkt ob alle recipienten keys haben,
                     * wenn nicht, wird überprüft ob ein passwort vergeben wurde
                     */
                    /*
                    if(key_check == true && (self.password == undefined || (typeof self.password != 'string') || (self.password.length == 0))){
                        self.trigger('show:passwordModal');
                        return false;
                    }
                    */

                    /**
                     * checkt ob alle User einen Key habe und ob der lokale User einen Key local hat,
                     * wenn nicht, dann wird überprüpft ob das Passwort an ist und ob es gesetzt wurde
                    */
                    /*
                    if(key_check == false && cmUserModel.hasLocalKeys() === false){
                        if(self.password == undefined || (typeof self.password != 'string') || (self.password.length == 0)){
                            cmNotify.warn('CONVERSATION.WARN.NO_PASSWORD');
                            return false;
                        }
                    }
                    */
                //}
                   

                return true;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name importData
             * @description
             * Function to import data as received from the backend.
             *
             * @param {Object} data The conversation data as recieved from the backend.
             */
            this.importData = function(data){
//                cmLogger.debug('cmConversationModel:importData');
                if(typeof data !== 'object'){
                    cmLogger.debug('cmConversationModel:import:failed - no data!');
                    return this;
                }

                //There is no invalid data, importData looks for everything useable in data; if it finds nothing it wont update anything
                this.id                     = data.id                   || this.id;
                this.timeOfCreation         = data.created              || this.timeOfCreation;
                this.timeOfLastUpdate       = data.lastUpdated          || this.timeOfLastUpdate;
                this.subject                = data.subject              || this.subject;
                this.numberOfMessages       = data.numberOfMessages     || this.numberOfMessages;
                this.missingAePassphrases   = data.missingAePassphrases || this.missingAePassphrases;
                this.keyTransmission        = data.keyTransmission      || this.keyTransmission;


                //Create passphraseVault:
                if(data.sePassphrase || data.aePassphraseList){
                    passphraseVault =   cmPassphraseVault.create({
                        sePassphrase:       data.sePassphrase,
                        aePassphraseList:   data.aePassphraseList
                    });
                }

                //if(passphraseVault.getKeyTransmission() != this.keyTransmission)
                //    cmLogger.debug('cmConversationModel: inconsistent data: keyTransmission')
                //    //TODO
                
                //this.keyTransmission = passphraseVault.getKeyTransmission()

                /**
                 * Important for none encrypted Conversations
                 */
                if(!this.state.is('new') && this.keyTransmission == 'none')
                    self.disableEncryption();
                

                // getting locally saved pw for conversation
                if(this.password == undefined)
                    this.password = this.localPWHandler.get(this.id)

                this.initPassCaptcha(data);

                var messages = data.messages || [];
                messages.forEach(
                    function(message_data) {
                        message_data.conversation = self;
                        self.messages.create(message_data);
                    }
                );

                var recipients = data.recipients || [];
                recipients.forEach(
                    function(recipient_data){
                        self.addRecipient(cmIdentityFactory.create(recipient_data.identityId));
                    }
                );

                if(this.userHasPrivateKey() == false){
                    this.options.showKeyInfo = true;
                }

                /*
                if(!this.state.is('new') && this.keyTransmission == 'mixed' && this.isUserInPassphraseList() == false){
                    this.options.hasPassword = true;
                }
                */

                this.state.unset('new');
                this.trigger('update:finished');

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name exportData
             * @description
             * Function to export conversation data for api call
             *
             * @param {Object} data Object with conversation data
             */
            this.exportData = function(){
                var data = {};

                if(typeof this.subject == 'string' &&  this.subject != '')
                    data.subject = this.subject;

                var passphrase_data =   passphraseVault
                                        ?   passphraseVault.exportData()
                                        :   { keyTransmission: 'none' }

                data.sePassphrase       =   passphrase_data.sePassphrase        || undefined;
                data.aePassphraseList   =   passphrase_data.aePassphraseList    || undefined;
                data.keyTransmission    =   passphrase_data.keyTransmission;

                data.recipients         =   this.recipients.map(function(recipient){ return recipient.id });

                return data;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name load
             * @description
             * get Conversation Data from API
             *
             * @returns {ConversationModel} this Returns ConversationModel
             */
            this.load = function(){
                if(typeof this.id == 'string'
                    && this.id.length > 0
                    && this.state.is('loading') === false)
                {
                    this.state.set('loading');

                    cmConversationsAdapter.getConversation(this.id, limit, self.messages.length).then(
                        function(conversation_data){
                            self.importData(conversation_data);

                            self.state.unset('loading');
                        },
                        function(){
                            self.state.unset('loading');
                            self.trigger('load:failed');
                        }
                    );
                } else if(this.state.is('loading') === false) {
                    cmLogger.debug('cmConversationModel:load:failed - no Conversation Id');
                    this.trigger('load:failed');
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name save
             * @description
             * send conversation to api
             *
             * @returns {Promise} for async handling
             */
            this.save = function(){

                if(!this.state.is('new'))
                    return $q.reject()

                return  $q.when(
                            this.isEncrypted()
                            ?   cmPassphraseVault.encryptPassphrase({
                                    passphrase:         undefined,   // will be generated
                                    password:           this.password,
                                    identities:         this.recipients,
                                    restrict_to_keys:   undefined   // encrypt for all recipient keys
                                })  
                            :   undefined 
                        )
                        .then(function(pv){
                            passphraseVault = pv
                            return cmConversationsAdapter.newConversation(self.exportData())
                        })                            
                        .then(
                            function (conversation_data) {
                                self
                                .importData(conversation_data)
                                .savePassCaptcha();

                                if(typeof self.password == 'string' && self.password.length > 0){
                                    self.localPWHandler.get(conversation_data.id, self.password);
                                }

                                self.state.unset('new');
                                self.trigger('save:finished');

                                return conversation_data
                            },

                            function(){
                                self.trigger('save:failed');
                                return $q.reject()
                            }
                        )
            };

            this.update = function(conversation_data, fromDrtvInit){
                var offset = 0,
                    clearAllMessages = false;

                // unbind load prev messages but scroll to last message
                if(fromDrtvInit && self.messages.length >= limit){
                    $rootScope.$broadcast('scroll:to');
                    return this;
                }

                if(this.id){
                    if(typeof conversation_data !== 'undefined'){
                        if(this.messages.length < conversation_data.numberOfMessages) {
                            this._updateConversation(limit, self.messages.length, clearAllMessages);
                        }
                    } else {
                        self._updateConversation(limit, self.messages.length, clearAllMessages);
                    }
                }

                // after update scroll to last message
                if(fromDrtvInit) {
                    this.one('update:finished', function() {
                        $rootScope.$broadcast('scroll:to');
                    });
                }

                return this;
            };

            /**
             * @param limit
             * @param offset
             * @param clearMessages
             */
            this._updateConversation = function(limit, offset, clearMessages){
                cmConversationsAdapter.getConversationMessages(this.id, limit, offset).then(
                    function(data){

                        self.state.set('loadedMessages');

                        /**
                         * Message Handling
                         */
                        if(typeof clearMessages !== 'undefined' && clearMessages !== false){
                            self.messages.reset();
                        }

                        self.importData(data);
                    }
                )
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name  disableEncryption
             * @description
             * Disables the encryption for the conversation. Works only if the conversation is new (state).
             *
             * @returns {cmConversationModel} this  Returns itself for chaining.
             */
            this.disableEncryption = function(){
//                cmLogger.debug('cmConversationModel:disableEncryption');

                if(this.state.is('new')){
                    encryption_disabled = true
                    this.password = '';
                    this.trigger('encryption:disabled');
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name  EnableEncryption
             * @description
             * Enables the encryption for the conversation. Works only if the conversation is new (state) and no proper passphrase is set.
             *
             * @returns {cmConversationModel} this  Returns itself for chaining.
             */
            this.enableEncryption = function(){
//                cmLogger.debug('cmConversationModel:enableEncryption');

                if(this.state.is('new')){
                    encryption_disabled = false
                    this.trigger('encryption:enabled')
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             * @todo
             * @name  isEncrypted
             * @description
             * Returns encryption state of passphrase object which is similar of the encryption state of the conversation
             *
             * @returns {boolean} bool Returns true if Conversation is encrypted.
             */
            this.isEncrypted = function(){
//                cmLogger.debug('cmConversationModel.isEncrypted');

                return  this.state.is('new')
                        ?   !encryption_disabled
                        :   this.keyTransmission != "none"
                
                // var bool = true;

                // if(this.state.is('new')){
                //     bool = !encryption_disabled;
                // } else {
                //     if(this.messages.length > 0){
                //         bool = this.messages[0].isEncrypted();
                //     } else if(this.keyTransmission != ''){
                //         *
                //          * if no messages exists
                         
                //         bool = (this.keyTransmission == 'asymmetric' || this.keyTransmission == 'symmetric' || this.keyTransmission == 'mixed')
                //     } else {
                //         //cmLogger.debug('cmConversationModel.isEncrypted Error Line 525');
                //     }
                // }


                // return bool;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name decrypt
             * @description
             * starts decrypting oh messages
             *
             * @returns {Boolean} succees Returns Boolean
             */
            this.decrypt = function () {
                //cmLogger.debug('cmConversationModel.decrypt', + self.subject);

                this.getPassphrase()
                .then(function(passphrase){
                    return $q.all(self.messages.map(function (message){
                                return message.decrypt(passphrase)
                            }))
                })
                .then(
                    function(){
                        self.trigger('decrypt:success');

                        // save password to localstorage
                        if (typeof self.password == 'string' && self.password.length > 0)
                            self.localPWHandler.set(self.id, self.password);

                        return $q.when()
                        
                    },
                    function(){
                        self.trigger('decrypt:failed');
                        return $q.reject()
                    }
                )


                /**
                 * @TODO check, problem micha!
                 */
                /*
                if (success) {
                    this.trigger('decrypt:success');

                    // save password to localstorage
//                    if (typeof this.password == 'string' && this.password.length > 0 && !this.isUserInPassphraseList()){
                    if (typeof this.password == 'string' && this.password.length > 0){
                        this.localPWHandler.set(this.id, this.password);
                    }
                } else {
                    this.trigger('decrypt:failed');
                }

                return success;
                */
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getEncryptionType
             * @description
             * return encryption type from conversation
             *
             * @returns {String} encryptionType look at encryptedPassphraseList
             */
            this.getKeyTransmission = function(){
                //If the conversation is not new:
                if(!this.state.is('new')) 
                    return this.keyTransmission


                //Conversation is new, is it encrypted?
                if(!this.isEncrypted())
                    return 'none';

                //Conversation is new and encrypted, 
                //is a password required for at least one recipient and if so are there any recipients who wont need a password?
                if(this.passwordRequired())
                    return this.getNiceRecipients() > 0 ? 'mixed' : 'symmetric'

                //Conversation is new, encrypted and there is no need for password:
                return 'asymmetric';


            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getPassphrase
             * @description
             * Function get the passphrase of the conversation, in order to use it for e.g. file encryption before upload.
             *
             * @returns {Promise} Returns a promise to resolve with passphrase
             */
            this.getPassphrase = function(){

                if(!this.isEncrypted())
                    return $q.reject('not encrypted.')

                if(!this.state.is('new') && !passphraseVault)
                    return $q.reject('new but passphrasevault missing.')

                if(!passphraseVault)
                    return $q.reject('passphrase vault missing.')

                return  passphraseVault.get(this.password)
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * name passwordRequired
             * @description
             * Checks if the conversation requires a password
             *
             * @return {Boolean} returns true or false
             */
            this.passwordRequired = function(){
//                cmLogger.debug('cmConversationModel:passwordRequired');

                if(this.state.is('new')){
                    return  this.isEncrypted()
                    &&  (
                    this.getBadRecipients().length != 0
                    ||  !this.userHasPrivateKey()
                    || this.hasPassword()
                    )

                }else{
                    return this.hasPassword() && (!this.userHasPrivateKey() || !this.userHasAccess())
                }
            }

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name hasPassword
             * @description
             * Helper Function which checks if Conversation has as Password
             *
             * @returns {Boolean} boolean Returns a Boolean
             */
            this.hasPassword = function(){
//                cmLogger.debug('cmConversationModel:hasPassword');
                if(this.state.is('new')){
                    return (this.options.hasPassword == true)
                } else {
                    return passphraseVault && ['symmetric', 'mixed'].indexOf(passphraseVault.getKeyTransmission()) != -1;
                }
            };

            //TODO:
            this.userHasAccess = function(){
                return passphraseVault.userHasAccess();
            };

            this.enablePassCaptcha = function(){
//                cmLogger.debug('cmConversationModel.enablePassCaptcha');
                this.options.hasCaptcha = true;
                this.trigger('captcha:enabled');

                return this;
            };

            this.disablePassCaptcha = function(){
//                cmLogger.debug('cmConversationModel.disablePassCaptcha');
                if(!this.state.is('new')) return ;

                this.options.hasCaptcha = false;
                this.tmpPassCaptcha = '';
                this.trigger('captcha:disabled');

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name initPassCaptcha
             * @description
             * Initialize PassCaptcha Handling in Conversation
             * creates a cmFile Object
             *
             *
             * @param {Object} conversation_data Data from API Call
             * @returns {ConversationModel} this returns ConversationModel
             */
            this.initPassCaptcha = function(conversation_data){
//                cmLogger.debug('cmConversationModel.initPassCaptcha');
                if(typeof conversation_data.passCaptcha !== 'undefined' && conversation_data.passCaptcha != '' && this.passCaptcha == undefined){
                    /**
                     * set Options
                     * @type {boolean}
                     */
                    this.options.hasCaptcha = true;

                    this.passCaptcha = cmFileFactory.create(conversation_data.passCaptcha);
                    this.passCaptcha
                        .downloadStart(true);
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name savePassCaptcha
             * @description
             *
             * @returns {ConversationModel} this ConversationModel
             */
            this.savePassCaptcha = function(){
                if(this.tmpPassCaptcha != ''){
                    this.passCaptcha = cmFileFactory.create();
                    this.passCaptcha.name = this.passCaptcha.encryptedName = 'captcha';
                    // public passcaptcha
                    this.passCaptcha.setPassphrase(null);

                    this.passCaptcha
                        .importBase64(this.tmpPassCaptcha)
                        .prepareForUpload()
                        .then(function(){
                            self.passCaptcha.uploadChunks();
                         });

                    this.passCaptcha.on('upload:finish', function(){
                        cmConversationsAdapter.updateCaptcha(self.id, self.passCaptcha.id);
                    });
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getBadRecipients
             * @description
             * Function returns a list of all recipients who have no proper key
             *
             * @returns {Array} recipients Filter
             */
            this.getBadRecipients = function(){
                return this.recipients.filter(function(recipient){
                    return recipient.keys.getWeakestKeySize() <= 2000
                })
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getNiceRecipients
             * @description
             * Function returns a list of all recipients who have a proper key
             *
             * @returns {Array} recipients Filter
             */
            this.getNiceRecipients = function(){
                return  this.recipients.filter(function(recipient){
                    return recipient.keys.getWeakestKeySize() > 2000
                })
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name addRecipient
             * @description
             * Function to add a recipient to a conversation. Will not update the backend.
             *
             * @param {Object} identityModel identityModel
             * @returns {cmConversationModel} this cmConversationModel
             */
            this.addRecipient = function(identityModel){
//                cmLogger.debug('cmConversationModel.addRecipient');
                this.recipients.register(identityModel);

                return this;
            };

            this.hasRecipient = function(identity){
                var check = false;

                this.recipients.forEach(function(recipient){
                    check = check || (identity.id == recipient.id);
                });

                return check;
            };

            this.saveRecipient = function(){
                // @ todo save new recipients to api
            }

            /**
             * @param identity
             * @returns {cmConversationModel.ConversationModel}
             */
            this.removeRecipient = function (recipient) {
//                cmLogger.debug('cmConversationModel.removeRecipient');
                this.recipients.deregister(recipient);

                return this;
            };

            this.checkPreferences = function(){
                if(this.state.is('new')) {
                    /**
                     * set Default
                     * has Captcha will be set at an other method
                     */
                    this.options.hasPassword = false;
                    this.options.showKeyInfo = false;

                    if (this.isEncrypted()) {
                        if (this.state.is('new') && this.userHasPrivateKey() == false) {
                            this.options.hasPassword = true;
                            this.options.showKeyInfo = true;
                        }

                        /**
                         * check recipients
                         */
                        if (this.getBadRecipients().length > 0) {
                            self.options.hasPassword = true;
                        }
                    }

                    /**
                     * last check for captcha preference
                     */
                    if (this.hasPassword() == false) {
                        this.options.hasCaptcha = false;
                    }
                }
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name updateLockStatus
             * @description
             * update lock status for gui
             *
             * @returns {cmConversationModel} this cmConversationModel
             */
            this.updateLockStatus = function(){
//                cmLogger.debug('cmConversationModel.updateLockStatus');

                var levels =    {
                    'asymmetric'    : 2,
                    'symmetric'     : 1,
                    'mixed'         : 1,
                    'none'          : 0
                };
                var className = '',
                    allRecipientsHasKeys = true;


                if(this.state.is('new')){

                    if(this.isEncrypted() !== false){
                        this.lockStatus.level = levels.mixed;

                        this.recipients.forEach(function(recipient){
                            if(recipient.keys.getWeakestKeySize() == 0){
                                allRecipientsHasKeys = false;
                            }
                        });

                        if(allRecipientsHasKeys !== false && this.hasPassword() !== true){
                            this.lockStatus.level = levels.asymmetric;
                        }
                    } else {
                        this.lockStatus.level = levels.none;
                    }


                } else {
                    this.lockStatus.level = levels[this.keyTransmission];
                }

                switch(this.lockStatus.level){
                    case 0: className = 'unsafe'; break;
                    case 1: className = 'safe'; break;
                    case 2: className = 'safer'; break;
                }

                this.lockStatus.class = 'safetylevel-'+className;

                return this;
            };

            this.setLastMessage = function(){
//                cmLogger.debug('cmConversationModel.setLastMessage!');

                if(this.messages.length > 0){
                    this.lastMessage = this.messages.reduce(function(value, message){
                        return value != undefined ? ( (value.created > message.created) ? value : message) : message;
                    });
                }

                return this;
            };


            /**
             * Event Handling
             */

            $rootScope.$on('logout', function(){
                self.messages.reset();
                self.recipients.reset();
            });

            $rootScope.$on('identity:switched', function(){
                self.messages.reset();
                self.recipients.reset();
            });

            this.on('update:finished', function(){
//                cmLogger.debug('cmConversationModel:on:update:finished');
//                cmBoot.resolve();
                self.setLastMessage();
                self.decrypt();
                //self.securityAspects.refresh();
                self.updateLockStatus();
                //self.handleMissingAePassphrases();
            });

            this.on('encryption:enabled', function(){
//                cmLogger.debug('cmConversationModel:on:encryption:enabled');
                self.checkPreferences();
                //self.securityAspects.refresh();
                self.updateLockStatus();
            });

            this.on('encryption:disabled', function(){
//                cmLogger.debug('cmConversationModel:on:encryption:disabled');
                self.checkPreferences();
                //self.securityAspects.refresh();
                self.updateLockStatus();
            });

            //Todo: fire event on factory and delegate to conversation or something
            this.on('message:new', function(event, message_data){
                if(typeof message_data == 'object'){
                    if('created' in message_data){
                        self.timeOfLastUpdate = message_data.created;
                    }

                    message_data.conversation = self;
                    self.messages.create(message_data).decrypt();
                    self.setLastMessage();

                    self.trigger('message:reInitFiles');
                }
            });

            this.recipients.on(['register', 'update:finished', 'deregister'], function(){
                //cmLogger.debug('cmConversationModel:recipients.on');
                //self.securityAspects.refresh();
                self.updateLockStatus();
            });

//            this.recipients.on('deregister', function(){
////                cmLogger.debug('cmConversationModel:on:recipient:unregistered');
//                self.checkPreferences();
//                //self.securityAspects.refresh();
//                self.updateLockStatus();
//            });

            this.on('captcha:enabled captcha:disabled', function(){
//                cmLogger.debug('cmConversationModel:on:captcha:enabled');
//                self.securityAspects.refresh();
                self.updateLockStatus();
            });

//            this.on('captcha:disabled', function(){
////                cmLogger.debug('cmConversationModel:on:captcha:disabled');
//                self.securityAspects.refresh();
//                self.updateLockStatus();
//            });

            this.messages.on('message:saved', function(){
                self.setLastMessage();
                //self.handleMissingAePassphrases();
            });

            this.messages.on('decrypt:success', function(){
                self.state.set('decrypted');
                self.setLastMessage();
                //self.handleMissingAePassphrases();
            });

            cmUserModel.on('key:stored key:removed', function(){
                self.checkPreferences();
                //self.securityAspects.refresh();
                self.updateLockStatus();
            });

            // after events!!!
            init(data);
        }

        return ConversationModel;
    }
])
.service('cmConversationsAdapter', [
    'cmApi',
    'cmUserModel',
    'cmObject',
    'cmUtil',
    'cmLogger',
    function (cmApi, cmUserModel, cmObject, cmUtil, cmLogger){
        var adapter = {

            newConversation: function(data) {
                return cmApi.post({
                    path: 	'/conversation',
                    data:	data
                })
            },

            _updateConversation: function(conversation){
                return cmApi.put({
                    path: '/conversation/' + conversation.id,
                    data: conversation
                });
            },

            getConversations: function(limit, offset){
                var queryString = cmUtil.handleLimitOffset(limit,offset);

                if(queryString == ''){
                    queryString += '?' + cmUserModel.getLocalKeyIdsForRequest();
                } else {
                    queryString += cmUserModel.getLocalKeyIdsForRequest();
                }

                return cmApi.get({
                    path: '/conversations' + queryString
                })
            },

            getConversation: function(id, limit, offset) {
                var queryString = cmUtil.handleLimitOffset(limit,offset);

                if(queryString == ''){
                    queryString += '?' + cmUserModel.getLocalKeyIdsForRequest();
                } else {
                    queryString += cmUserModel.getLocalKeyIdsForRequest();
                }

                return cmApi.get({
                    path: '/conversation/'+ id + queryString
                })
            },

            getConversationSummary: function(id){
                //cmLogger.warn('cmConversationAdapter: .getConversationSummary is deprecated; use .getConversation(id, 1, 0) instead')
                //return this.getConversation(id, 1, 0)
                return cmApi.get({
                    path: '/conversation/' + id + '/summary' + '?' +  cmUserModel.getLocalKeyIdsForRequest()
                })
            },

            getConversationMessages: function(id, limit, offset) {
                var queryString = cmUtil.handleLimitOffset(limit,offset);

                if(queryString == ''){
                    queryString += '?' + cmUserModel.getLocalKeyIdsForRequest();
                } else {
                    queryString += cmUserModel.getLocalKeyIdsForRequest();
                }

                return cmApi.get({
                    path: '/conversation/'+ id + '/messages' + queryString
                })
            },


            getPurl: function(id){
                return cmApi.get({
                    path:'/purl/' + id + '?' +  cmUserModel.getLocalKeyIdsForRequest()
                })
            },

            addRecipient: function(id_conversation, id_identity_recipient){
                return	cmApi.post({
                            path:	'/conversation/%1/recipient'.replace(/%1/, id_conversation),
                            data:	{
                                        recipients: [id_identity_recipient]
                                    }
                        })
            },

            removeRecipient: function(id, recipient_id){
                return	cmApi.delete({
                            path:	'/conversation/%1/recipient/%2'.replace(/%1/, id).replace(/%2/, recipient_id)
                        })
            },

            updateSubject: function(id, subject){
                return  cmApi.put({
                            path:    '/conversation/%1'.replace(/%1/, id),
                            data:   {
                                        subject: subject
                                    }
                        })
            },

            updateCaptcha: function(id, idFile){
                return  cmApi.put({
                            path:    '/conversation/'+id,
                            data:   {
                                        passCaptcha: idFile
                                    }
                        })
            },

            sendMessage: function(id, message){
                return	cmApi.post({
                            path:	"/conversation/%1/message".replace(/%1/, id),
                            data: 	message
                        })
            },

            updateEncryptedPassphraseList: function(id, aePassphraseList){
                return  cmApi.post({
                            path:    "/conversation/%1/aePassphrases".replace(/%1/, id),
                            data:   {aePassphraseList : aePassphraseList}
                        })
            }
        };

        cmObject.addEventHandlingTo(adapter);
       
        cmApi.on('conversation:new-message', function(event, data){
            adapter.trigger('message:new', data)
        });

        cmApi.on('conversation:new', function(event, data){
            adapter.trigger('conversation:new', data)
        });

        cmApi.on('rekeying:finished', function(event, data){
            cmLogger.debug('cmConversationsAdapter.on rekeying:finished');
            adapter.trigger('passphrases:updated', data);
        });

        return adapter
    }
])

    .factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmFileFactory',
    'cmFilesAdapter',
    'cmUserModel',
    'cmObject',
    'cmStateManagement',
    'cmUtil',
    'cmLogger',
    '$rootScope',
    '$q',
    function (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmFileFactory,
              cmFilesAdapter, cmUserModel, cmObject, cmStateManagement, cmUtil, cmLogger,
              $rootScope, $q){

        /**
         * @constructor
         * @description
         * Represents a Message.
         * Events
         *  - init:finished
         *  - update:finished
         *  - load:failed
         * Stats
         *  - new
         *  - loading
         *  - decrypted
         *
         *
         * @param {Object} [data] - The conversation data as received from the backend.
         */
        function Message(data){
            // attributes
            var self = this,
                conversation = undefined;

            cmObject.addEventHandlingTo(this);

            this.id = undefined;
            this.created = undefined;
            this.from = undefined;

            // secret data
            this.secret = ['text','fileIds'];

            // public data
            this.public = [];

            // files
            this.files = [];
            this.fileIds = [];

            this.state = new cmStateManagement(['new','decrypted','loading', 'incomplete']);

            /**
             * Initialize Message Object
             * @param message_data
             * @returns {Message}
             */
            function init(data){
                if(typeof data == 'object' && ('conversation' in data)){
                    conversation = data.conversation;

                    if(cmUtil.objLen(data) > 1){
                        self.importData(data);
                    } else {
                        self.from = cmUserModel.data.identity;
                        self.state.set('new');
                    }
                } else {
                    // fail ??
                    self.state.set('new');
                    self.from = cmUserModel.data.identity;
                }                
            }

            /**
             * reset object
             */
            function reset(){
                //cmLogger.debug('cmMessageModel.reset');
                self.files = [];
                self.fileIds = [];
            }

            /**
             * @name importData
             * @description import data
             */
            this.importData = function(data){
                this.id         = data.id || this.id;

                if('fromIdentity' in data){
                    this.from       = cmIdentityFactory.create(data.fromIdentity);
                }

                this.created    = data.created || this.created;

                this.plainData  = data.plain || this.plainData;

                // compare plain to this
                for(var key in this.plainData){
                    this[key] = this.plainData[key] || this[key];
                }

                this.text       = data.text || this.text;
                this.fileIds    = data.fileIds || this.fileIds;

                this.encryptedData  = data.encrypted || this.encryptedData;

                this.state.set('incomplete')
                this.initFiles();

                this.trigger('update:finished');

                this.state.unset('new');

                return this;
            };

            // sets which data should not be encrypted
            this.setPublicData = function(data){
                // data may be a string or an array
                data = typeof data == 'string' ? [data] : data;

                // set keys for all data to secret:
                var all_the_data = this.secret
                                    .concat(this.public)
                                    .filter(function(elem, pos, arr) {
                                        return arr.indexOf(elem) == pos;
                                    });

                this.secret = all_the_data;
                this.public = [];

                // set keys for selected data to public
                data.forEach(function(key){
                    var secret_pos = self.secret.indexOf(key);
                    if( secret_pos != -1) self.secret.splice(secret_pos, 1);

                    self.public.push(key);
                });

                return this;
            };

            this.setText = function(text){
                this.text = text;
                return this;
            };

            this.isEncrypted = function(){
                if(!this.state.is('new')) {
                    return (this.encryptedData == undefined) ? false : (this.encryptedData != false)
                }
            };

            this.encrypt = function (passphrase) {
                // merge secret_data into json string:
                var secret_data = {};

                this.secret.forEach(function(key){
                    if(self[key]) secret_data[key] = self[key]
                });

                var secret_JSON = JSON.stringify(secret_data);

                this.encryptedData = cmCrypt.encrypt(passphrase, secret_JSON);

                return this;
            };

            this.decrypt = function (passphrase) {
                if(this.state.is('decrypted') !== true){

                    if(typeof this.encryptedData == 'string' && this.encryptedData.length > 0){
                        /**
                         * @deprecated
                         * Workaround for old Messages in dev and stage
                         */
                        if(this.encryptedData.charAt(0) != '{'){
                            this.encryptedData = cmCrypt.base64Decode(this.encryptedData);
                        }

                        var decrypted_data = JSON.parse(cmCrypt.decrypt(passphrase,this.encryptedData));

                        if(decrypted_data){
                            this.importData(decrypted_data);
                            this.state.set('decrypted');
                            this.trigger('decrypt:success');
                        }

                        return !!decrypted_data
                    }
                }

                return true;
            };

            /**
             * send message to backend object
             * @param conversation
             * @returns {*|Promise|!Promise.<RESULT>}
             */
            this.save = function (){
                var public_data = {};

                this.public.forEach(function(key){
                    if(self[key])
                        public_data[key] = self[key]
                });

                this.publicData = public_data;

                // Check if the message is alright to be send to the backend:
                var proper_public_data      =       (typeof this.publicData == 'object')
                                                &&  Object.keys(this.publicData).length > 0,
                    proper_encrypted_data   =       (typeof this.encryptedData == 'string')
                                                &&  this.encryptedData.length > 0

                if(!proper_public_data && !proper_encrypted_data) {
                    var defer = $q.defer();
                    cmLogger.error('cmMessageModel: Message improper; saving aborted.');
                    defer.reject();
                    return defer.promise;
                }

                // If we got this far evrything seems alright; send the message to the backend:
                return cmConversationsAdapter.sendMessage(conversation.id, {
                    encrypted: this.encryptedData,
                    plain: this.publicData
                })
                .then(function (message_data) {
                    self.importData(message_data);
                    self.trigger('message:saved');
                });
            };

            this.isOwn = function(){
//                return (!this.from || cmUserModel.data.id == this.from.id);
                return (cmUserModel.data.id == this.from.id);
            };

            /**
             * Handle Upload from new Files
             * @returns {cmMessageModel.Message}
             */
            this.uploadFiles = function(){
                if(this.files.length > 0){
                    self.state.unset('incomplete');
                    self.state.set('uploading');
                    angular.forEach(this.files, function(file){
                        file
                            .setOnCompleteId(self.id)
                            .uploadChunks();
                    });
                }

                return this;
            };

            /**
             * initialize Files from Message Data (fileIds)
             * @returns {Message}
             */
            this.initFiles = function(){
                if(self.state.is('uploading')){
                    this.state.unset('incomplete');
                    return this;
                }

                if(this.fileIds.length > 0){
                    angular.forEach(this.fileIds, function(id){
                        self._addFile(cmFileFactory.create(id));
                    });
                    this.trigger('init:files');
                } else {
                    this.state.unset('incomplete')
                }

                return this;
            };

            /**
             * add cmFile Object to Message Object
             * checks if cmFile Object still added or not
             * @param file
             * @private
             */
            this._addFile = function(file){
                var i = 0,
                    check = false;

                /**
                 * Array of cmFiles Objects
                 */
                if(this.files.length == 0){
                    this.files.push(file);
                } else {

                    while(i < this.files.length){
                        if(this.files[i].id == file.id){
                            check = true;
                            break;
                        }
                        i++;
                    }

                    if(check !== true){
                        this.files.push(file);
                    }
                }

                /**
                 * Array of cmFiles Objects
                 */
                if(this.fileIds.length == 0){
                    this.fileIds.push(file.id);
                } else {
                    if(this.fileIds.indexOf(file.id) == -1){
                        this.fileIds.push(file.id);
                    }
                }

                return this;
            };

            /**
             * add cmFiles to Message Wrapper Function for Arrays
             * @param array of cmFileObjects
             * @returns {cmMessageModel.Message}
             */
            this.addFiles = function(array){
                if(typeof array !== 'undefined' && array.length > 0){
                    angular.forEach(array, function(file){
                        self._addFile(file);
                    });
                }

                return this;
            };

            this.decryptFiles = function(passphrase){
                angular.forEach(this.files, function(file){
                    if(file.state.is('onlyFileId')) {
                        file
                            .setPassphrase(passphrase)
                            .downloadStart();

                        file.on('importFile:incomplete',function(event, file){
                            self.state.set('incomplete');
                            // add to queue
                            self.incompleteFiles.push(file);
                        });

                        file.on('importFile:finish', function(event, file){
                            self.state.unset('incomplete');
                            // clear from queue
                            var index = self.incompleteFiles.indexOf(file);
                            self.incompleteFiles.splice(index,1);
                        });
                    }
                });

                return this;
            };

            /**
             * Event Handling
             */
            $rootScope.$on('logout', function(){ reset(); });
            $rootScope.$on('identity:switched', function(){ reset(); });

            this.on('message:saved', function(){
                self.uploadFiles();
            });

            init(data);

            // if files are incomplete wait for message:new backend event to reinit
            this.incompleteFiles = [];
            if(conversation != undefined && ('on' in conversation)) {
                conversation.on('message:reInitFiles', function () {
                    if (self.state.is('incomplete')) {
                        self.incompleteFiles.forEach(function (file) {
                            file.importFile();
                        });
                    }
                });
            }
        }

        return Message;
    }
])
.service('cmPurlModel',[
    'cmObject',
    'cmConversationsAdapter',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    'cmLogger',
    '$q',
    '$rootScope',
    function(cmObject, cmConversationsAdapter, cmConversationFactory, cmUserModel, cmAuth, cmLogger, $q, $rootScope) {
        var purls = [];

        var purlModel = {
            getPurl: function(id){
                var deferred = $q.defer();

                if(typeof id !== 'undefined'){
                    //var purl = purls.map(function(purl){
                    //    return (purl.id == id);
                    //});
                    //console.log(purl)
                    //
                    //if(typeof purls[id] != 'undefined'){
                    //    deferred.resolve(purls[id].data);
                    //} else {
                        cmConversationsAdapter.getPurl(id).then(
                            function (data) {
                                deferred.resolve(data);
                            },
                            function (response) {
                                deferred.reject(response);
                            }
                        );
                    //}
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            },

            handleConversation: function(conversation_data){
                var conversation = cmConversationFactory.create(conversation_data);

                return conversation.id;
            },

            /**
             * @TODO add Function to cmUserModel to handle Guests and add Identities
             * @param identity
             */
            handleIdentity: function(identity_data){
                var currentIdentity = cmUserModel.getIdentity();

                if(identity_data.userType == 'external'){
                    //cmLogger.debug('cmPurlModel:handleIdentity:externUser');
                    cmUserModel.doLogout(false,'purl-modl handleIdentity');
                    cmUserModel.setIdentity(identity_data);

                    $rootScope.$broadcast('login');
                } else if(identity_data.id != currentIdentity.id){
                    //cmLogger.debug('cmPurlModel:handleIdentity:internUser')
                }

                return this;
            },

            /**
             * @param token
             */
            handleToken: function(token){
                if(typeof token !== 'undefined'){
                    cmUserModel.storeToken(token);
                }

                return this;
            }
        };

        cmObject.addEventHandlingTo(purlModel);

        return purlModel;

        $rootScope.$on('logout', function(){
            purls = [];
        });

        $rootScope.$on('identity:switched', function(){
            purls = [];
        });
    }
])

.factory('cmSecurityAspectsConversation',[

    'cmSecurityAspects',
    'cmUserModel',
    '$q',

    function(cmSecurityAspects, cmUserModel, $q){
//        var securityAspectsConversation = new cmSecurityAspects()

        function securityAspectsConversation(conversation){
            var self                = new cmSecurityAspects( {languagePrefix: 'SECURITY_ASPECT.CONVERSATION'} )

            self
            .setTarget(conversation)

            self
                .addAspect({
                    id: 'NOT_ENCRYPTED',
                    value: -3,
                    check: function(conversation){
                        return !conversation.isEncrypted();
                    },
                    toggleCheck: function(conversation){
                        return !conversation.isEncrypted();
                    },
                    toggleCall: function(conversation){
                        conversation.enableEncryption();
                    }
                })
                .addAspect({
                    id: 'ENCRYPTED',
                    value: 1,
                    check: function(conversation){
                        return conversation.isEncrypted();
                    }
                })    
                .addAspect({
                    id: 'KEY_TRANSMISSION_SYMMETRIC',
                    dependencies: ['ENCRYPTED'],
                    value: -1,
                    template:       '<div ng-if="isNew">{{aspect.description+"_NEW"|cmTranslate}}</div>'
                                +   '<div ng-if="!isNew">{{aspect.description|cmTranslate}}</div>'
                                +   '{{aspect.description+"_BAD_RECIPIENTS"|cmTranslate}}<div ng-if = "aspect.numberOfBadRecipients > 0">{{aspect.badRecipients.join(", ")}}</div>'
                                +   '<div ng-if = "aspect.privateKeyMissing">{{aspect.description+"_PRIVATE_KEY_MISSING"|cmTranslate}}</div>',
                    check: function(conversation){

                        this.badRecipients          = conversation.getBadRecipients().map(function(recipient){
                                                            return recipient.getDisplayName()
                                                        })
                        this.numberOfBadRecipients  = this.badRecipients.length
                        this.privateKeyMissing      = !conversation.userHasPrivateKey()

                        this.isNew                  = conversation.state.is('new')

                        /**
                         * @TODO
                         * BS mit Andreas absprechen
                         * passwordRequired hat unterschiedleiche Bedeutungen??!
                         */
//                        if(conversation.state.is('new')){
//                            return conversation.passwordRequired()
//                        } else {
//                            return conversation.hasPassword();
//                        }
                        return ['symmetric', 'mixed'].indexOf(conversation.getKeyTransmission()) != -1;
                    }
                })
                .addAspect({
                    id: 'HAS_PASSCAPTCHA',
                    dependencies: ['KEY_TRANSMISSION_SYMMETRIC'],
                    value: -1,
                    check: function(conversation){
                        return conversation.options.hasCaptcha;
                    },
                    toggleCheck: function(conversation){
                        return conversation.options.hasCaptcha
                    },
                    toggleCall: function(conversation){
                        conversation.disablePassCaptcha();
                    }
                }) 
                .addAspect({                    
                    id: 'NO_SYMMETRIC_KEY_TRANSMISSION',
                    dependencies: ['ENCRYPTED'],
                    value: 1,
                    check: function(conversation){
                        return ['symmetric', 'mixed'].indexOf(conversation.getKeyTransmission()) == -1
                    }
                })
                .addAspect({
                    id: 'TRUSTING_ALL_RECIPIENTS',
                    dependencies: ['ENCRYPTED', 'NO_SYMMETRIC_KEY_TRANSMISSION'],
                    value: 1,
                    check: function(conversation){
                        /**
                         * @todo work around hack from BB 19.09.2014
                         * new workaround for promises 17.10.2014 AP
                         */
                        if(conversation.recipients.length < 3){
                            $q.all(conversation.recipients.map(function(recipient){
                                return cmUserModel.verifyTrust(recipient)
                            }))
                            .then(
                                function(){
                                    if(!conversation.workaround_aspects_trusted){
                                        conversation.workaround_aspects_trusted = true
                                        self.refresh()
                                    }

                                },
                                function(){
                                    if(conversation.workaround_aspects_trusted){
                                        conversation.workaround_aspects_trusted = false
                                        self.refresh()
                                    }

                                }
                            )
                            return conversation.workaround_aspects_trusted
                        } else {
                            return false
                        }
                    }
                });

            return self;
        }

        return securityAspectsConversation 
    }
])
'use strict';

angular.module('cmCore',['pascalprecht.translate', 'cmUi', 'cmContacts', 'cmPhonegap'])
//This factory provides a generic Factory

.factory('cmFactory',[
    'cmObject',
    'cmLogger',
    function(cmObject, cmLogger) {

        /**
         * generic Factory, has to be setup with a model to create instances from. A model is expected to have .refresh() method, to get data from the backend.
         * @param {function}    model           Constructor function. If instances.id exists dublicates will be prevented. 
         * @param {string}      [uniqueKey]     Key in raw data to check for dublicates with. (i.e. "instances.id")    
         */

        return function cmFactory(model, sameByData, sameByInstance){

            var self        = new Array();

            self.model      = model;

            cmObject.addEventHandlingTo(self);

            sameByData = sameByData || function(instance, data){
                return instance.id && data.id && instance.id == data.id
            };

            sameByInstance = sameByInstance || function(instance_1, instance_2){
                return instance_1.id && instance_1.id == instance_2.id
            };

            /**
             * Function to create an instance of this.model. If an instance with the same id as provided already exist, fetch it instead off creating a new one.
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @returns {model}                      allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             *                                      this instance will be returned – otherwise a new one will be created and if possible populated with data from the backend.
             */
            self.create = function(data, withNewImport){

                if(typeof data == 'string') 
                    data = {id: data}

                var instance = self.find(data);

                if(instance === null){
                    instance = self.new(data)
                    self.register(instance)

                } else if(typeof withNewImport === 'boolean' && withNewImport == true && typeof instance.importData == 'function'){
                    instance.importData(data);
                }


                return instance;

            };

            self.importFromDataArray = function(data_arr){
                data_arr.forEach(function(data){
                    self.create(data)
                })
                return self
            }

            self.exportDataArray = function(){
                return  self.map(function(instance){
                            return instance.exportData()
                        })
            }

            /**
             * Function to find and instance by its id.
             * @param   {string}         id          The id of the instance to find.
             * @returns {model|null}                 returns the first instance to match the id or null if none is found 
             */
            self.find = function(args){
                if(!args)
                    return null;

                if(typeof args == 'string')
                    args = {id: args}

                var matches = [];

                if(args instanceof this.model){
                    matches = self.filter(function(instance){ return sameByInstance(instance, args) })
                }else{
                    matches = self.filter(function(instance){ return sameByData(instance, args) })
                }

                return matches.length ? matches[0] : null       
            };

            /**
             * Function to create a new model instance. 
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @return  {cmModel}                    returns a new model instance populated with the provided data
             */
            self.new = function(args){
                var data     = typeof args == 'string' ? {id:args} : args,
                    instance = new self.model(data);

                // TODO: before init:ready in instance factory.echoEventsFrom(self); for observing before triggering
                //  - removed register and added it above in create()

                return instance
            };

            /**
             * Function to store a model instance for later use, retrievable by its id
             * @param {model}           instance    an instance of model
             */
            self.register = function(instance){
                if(
                    self.indexOf(instance) == -1
                    && instance instanceof this.model
                ){
                    self.push(instance);

                    self.echoEventsFrom(instance);

                    instance.deregister = function(){
                        self.deregister(instance)
                    };

                    self.trigger('register', instance);

                    return self.length
                }

                return false
            };

            /**
             * Function to remove a model instance
             * @param {model}           instance    an instance of model
             */
            self.deregister = function(args){
                var instance    = self.find(args),
                    index       = self.indexOf(instance)

                if(
                    index != -1
                    && instance instanceof this.model
                ){
                    self.splice(index, 1);
                    self.trigger('deregister');
                    return true
                }
                return false
            };

            /**
             * Function to remove all instances from the factory.
             * @returns @this    for chaining
             */
            self.reset = function(callFrom){
                //cmLogger.debug('cmFactory.reset -' + (callFrom ? ' Factory: ' + callFrom : '') + ' Elements: ' + self.length);
                while(self.length > 0){
                    self.pop()
                }

                return self;
            };


            /**
             * Event Handling
             */
            self.on('register', function(event, instance){
                if(typeof instance.trigger == 'function'){
                    instance.trigger('init:ready'); // Todo: ieses event sollte die instance eher selber triggern oder?
                }
            });

            return self
        }
    }
])

.factory('cmIdentityModel',[
    'cmAuth', 'cmCrypt', 'cmKey', 'cmKeyFactory', 'cmObject', 'cmLogger', 'cmApi',
    'cmFileFactory', 'cmStateManagement', 'cmUtil', 'cmNotify',
    function(cmAuth, cmCrypt, cmKey, cmKeyFactory, cmObject, cmLogger, cmApi,
             cmFileFactory, cmStateManagement, cmUtil,cmNotify){

        function Identity(identity_data){

            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state  = new cmStateManagement(['new','decrypted','loading']);

            /**
             * Initialize Identity
             * @param {String|Object} data identity data for model
             * @returns {Message}
             */
            function init(data){
                self.clear();

                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.load();
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;

                    if(cmUtil.objLen(data) < 2){
                        self.load();
                    } else {
                        self.importData(data);
                    }
                } else {
                    self.state.set('new');
                }

                self.trigger('init:finished');
            }

            /**
             * @param identity_data
             */
            this.importData = function(data){
                //cmLogger.debug('cmIdentityModel.importData');
                if(typeof data !== 'object'){
                    cmLogger.debug('cmIdentityModel:import:failed - no data!');
                    return this;
                }

                this.id                     = data.id           || this.id;
                this.displayName            = data.displayName  || this.displayName;
                this.userKey                = data.userKey      || this.userKey;
                this.cameoId                = data.cameoId      || this.cameoId;
                this.avatarId               = data.avatar       || this.avatarId;
                // TODO: hack for identity/edit update
                if(typeof data.email != 'string')
                    this.email              = data.email        || this.email;
                else
                    this.email              = {value:data.email};
                if(typeof data.email != 'string')
                    this.phoneNumber        = data.phoneNumber  || this.phoneNumber;
                else
                    this.phoneNumber        = {value:data.phoneNumber};

                this.preferredMessageType   = data.preferredMessageType || this.preferredMessageType;
                this.userType               = data.userType             || this.userType;
                this.created                = data.created              || this.created;
                this.lastUpdated            = data.lastUpdated          || this.lastUpdated;
                this.isActive               = data.active               || this.isActive;

                data.publicKeys             = data.publicKeys           || [];

                data.publicKeys.forEach(function (publicKey_data) {
                    // first deleted event from BE
                    if('deleted' in publicKey_data && publicKey_data.deleted){
                        self.keys.deregister(publicKey_data);
                    } else {
                        var key =  self.keys.create(publicKey_data, true);

                        //check if the keyis working properly, if not, get rid of it:
                        if(!key.getPublicKey()){
                            self.keys.deregister(key)
                        }
                    }
                });

                this.state.unset('new');
                this.trigger('update:finished', this);

                return this;
            };

            this.exportData = function(){
                return {
                    id: this.id,
                    displayName: this.displayName,
                    userKey: this.userKey,
                    cameoId: this.cameoId,
                    avatarId: this.avatarId,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    preferredMessageType: this.preferredMessageType,
                    userType: this.userType,
                    created: this.created,
                    lastUpdated: this.lastUpdated
                }
            };

            this.load = function(){
                if(typeof this.id == 'string'
                    && this.id.length > 0
                    && this.state.is('loading') === false) {

                    this.state.set('loading');

                    cmAuth.getIdentity(this.id).then(
                        function (import_data) {
                            if (typeof import_data == 'string') {
                                cmLogger.debug('cmAuth.getIdentity() should forward an object, got string instead. ')
                            } else {
                                self.importData(import_data);
                            }
                            self.state.unset('loading');
                        },
                        function(){
                            self.state.unset('loading');
                            self.trigger('load:failed');
                        }
                    );
                } else {
                    cmLogger.debug('cmIdentityModel:load:failed - no identityId');
                    this.trigger('load:failed');
                }

                return this;
            };

            this.update = function(changes){
//                cmLogger.debug('cmIdentityModel.update');
                if(typeof changes == 'object' && cmUtil.objLen(changes) > 0){
                    cmAuth.updateIdentity(changes).then(
                        function(){
                            self.importData(changes);
                        },
                        function(){
                            cmNotify.warn('IDENTITY.NOTIFY.UPDATE.ERROR',{ttl:0})
                        }
                    )
                }

                return this;
            };

            this.clear = function(){
                //cmLogger.debug('cmIdentityModel.clear');

                this.id                     = undefined;
                this.displayName            = undefined;
                this.userKey                = undefined;
                this.cameoId                = undefined;
                this.avatarId               = undefined;
                this.avatar                 = undefined;
                this.email                  = { value: undefined, isVerified: undefined };
                this.phoneNumber            = { value: undefined, isVerified: undefined };
                this.preferredMessageType   = undefined;
                this.keys                   = this.keys ? this.keys.reset() : new cmKeyFactory();
                this.userType               = undefined;
                this.created                = undefined;
                this.lastUpdated            = undefined;
            };

            this.getDisplayName = function(){
                var cameoId = this.cameoId || '',
                    name = this.displayName || cameoId.split("@")[0] || this.id;
                return name;
            };

            /**
             * get and cached avatar of identity
             *
             */
            this.getAvatar = function(){
                if(this.avatarId){
                    var file = cmFileFactory.create(this.avatarId);
                        file.downloadStart();

                    return file;
                }
                return false;
            };

            this.removeKey = function(key){
                key.removeFromKeyList(self.keys);
                return this;
            };

            this.getWeakestKeySize = function(){
                cmLogger.debug('identityModle:getWeakestKeySize() is deprecated; please use keys.getWeakestKeySize().')
                return this.keys.getWeakestKeySize()
                // return this.keys.reduce(function(size, key){                    
                //     return size == undefined ? key.getSize() : Math.min(size, key.getSize())
                // }, undefined)

            };

            this.hasKeys = function(){
                return (this.keys.length > 0);
            };

            init(identity_data);
        }

        return Identity;
    }
])
.factory('cmIdentityFactory',[
    '$rootScope',
    'cmFactory',
    'cmIdentityModel',
    function($rootScope, cmFactory, cmIdentityModel){

        var self = new cmFactory(cmIdentityModel);

        self.clear = function(args){
            var id = typeof args == 'object' && 'id' in args
                ?   args.id
                :   args;

            var instance = self.find(id);

            if(instance !== null && typeof instance.clear == 'function'){
                instance.clear();
            }

            return self;
        };

        $rootScope.$on('logout', function(){ self.reset() });

        $rootScope.$on('identity:switched', function(){ self.reset() });

        return self;
    }
])
.factory('cmKeyStorageService',[
    'cmUserModel',
    'cmUtil',
    'cmLogger',
    '$rootScope',
    function(cmUserModel, cmUtil, cmLogger, $rootScope) {
        function userKeyStorage(key){
            var self = this,
                storageKey = undefined;

            function init(key){
                //cmLogger.debug('cmUserKeyStorage.init');

                if(typeof key == 'string' && cmUtil.validateString(key)){
                    storageKey = key;
                } else {
                    throw new Error("cmUserKeyStorage init failed! Key is not a valid string!");
                }
            }

            function reset(){
                storageKey = undefined;
            }

            this.getAll = function(){
                return cmUserModel.storageGet(storageKey) || {};
            };

            this.get = function(key){
                //cmLogger.debug('cmUserKeyStorage.get');

                var list = this.getAll(),
                    value = undefined;

                if(typeof list == 'object' && Object.keys(list).indexOf(key)!= -1){
                    value = list[key];
                }

                return value;

            };

            this.set = function(key, value){
                //cmLogger.debug('cmUserKeyStorage.set');

                var list = this.getAll();

                list[key] = value;

                cmUserModel.storageSave(storageKey, list);
            };

            this.is = function(key){
                //cmLogger.debug('cmUserKeyStorage.is');

                var list = this.getAll(),
                    boolReturn = false;

                if(key != undefined && // key exists
                    cmUtil.checkKeyExists(list, key) && // is in properties
                    list[key])// and is true
                {
                    boolReturn = true;
                }

                return boolReturn;
            };

            $rootScope.$on('logout', function(){ reset() });

            $rootScope.$on('identity:switched', function(){ reset() });

            init(key);
        }

        return userKeyStorage;
    }
])
//Todo: This is not in use, ist it?
//This factory provides a generic Model


.factory('cmModel',[

    'cmObject',

    function(cmObject) {

        /**
         * generic Model
         */

        var cmModel = function(){
            this.state = {}

            cmObject
            .addEventHandlingTo(this)
            .addChainHandlingTo(this)

            this.setState = function(key, value){
                var old_value = this.state[state_name],
                    new_value = value

                this.state[state_name] = new_value
                this.trigger('state-change:'+key, {'old_value': old_value, 'new_value': new_value} )

                return this
            }

            /**
             * Function to update model with data from backend. This function is meant to be overwritten.
             */

            this.refresh = function(){
                return this
            }
        }

        return cmModel
    }

])
/**
 * @ngdoc object
 * @name cmStateManagement
 * @description
 * States Management Object<br />
 * Helper Object to set and unset different stats in objects
 *
 * @requires cmObject
 *
 * @todo check whitelist functionality
 */
.factory('cmStateManagement',[
    'cmObject',
    function(cmObject) {

        function cmStateManagement(whitelist){

            /**
             * @ngdoc property
             * @propertyOf cmStateManagement
             *
             * @name self
             * @description
             * Array to handle states in Methods
             *
             * @type {Array} self New states array
             */
            var self = new Array();

            cmObject.addEventHandlingTo(self);

            /**
             * @ngdoc method
             * @methodOf cmStateManagement
             *
             * @name set
             * @description
             * set a state if not exists
             *
             * @param {String} state Example 'new' or 'loading'
             */
            self.set = function(state){
                if(typeof state == 'string' && state.length > 0){
                    if(self.indexOf(state) == -1){
                        self.push(state);

                        self.trigger('change');
//                        self.trigger('set:' + state);
                    }
                }
                return self
            };

            /**
             * @ngdoc method
             * @methodOf cmStateManagement
             *
             * @name unset
             * @description
             * unset a state, remove from state Array
             *
             * @param {String} state Example 'new' or 'loading'
             */
            self.unset = function(state){
                if(typeof state == 'string' && state.length > 0) {
                    if (self.indexOf(state) != -1) {
                        self.splice(self.indexOf(state), 1);

                        self.trigger('change');
//                        self.trigger('unset:' + state);
                    }
                }
                return self
            };

            /**
             * @ngdoc method
             * @methodOf cmStateManagement
             *
             * @name is
             * @description
             * check if a state is in states array
             * return boolean
             *
             * @param {String} state Example 'new' or 'loading'
             * @returns {Boolean} bool Indicator if state exists in states array
             */
            self.is = function(state){
                if(typeof state == 'string' && state.length > 0) {
                    return self.indexOf(state) != -1;
                }
                return false;
            };

            return self;
        }

        return cmStateManagement;
    }
])

.factory('cmTransferScopeData',[
    'cmUtil',
    '$location', '$rootScope',
    function(cmUtil,
             $location, $rootScope) {

        var scopeData = {},
            noneScopeData = {},
            defaultOptions = {
                id: '',
                scopeVar: '',
                ignoreVar: '',
                isDone: false,
                onSet: function(){},
                onGet: function(scopeData, privateData){}
            };

        // set the formData of outfilled inputs
        function _set($scope, options){
            if(options.isDone)
                return false;

            _reset(options);

            options.onSet();

            scopeData[options.id] = $scope[options.scopeVar];

            if (options.noneScopeData != undefined) {
                noneScopeData[options.id] = options.noneScopeData;
            }

            // clear data exp.: password
            if (options.ignoreVar != '') {
                delete scopeData[options.id][options.ignoreVar];
            }
        }

        // get only on same route and if formData is full of data
        function _get($scope, options){
            if ((options.id in scopeData) && scopeData[options.id] != null) {
                if(typeof $scope[options.scopeVar] == 'object'){
                    $scope[options.scopeVar] = angular.extend({}, $scope[options.scopeVar], scopeData[options.id]);
                }else{
                    $scope[options.scopeVar] = scopeData[options.id]

                }
                options.onGet(scopeData[options.id], noneScopeData[options.id]);
                _reset(options);
            // when only noneScopeData is full data
            } else if(noneScopeData[options.id] != null){
                options.onGet({}, noneScopeData[options.id]);
                _reset(options);
            }
        }

        // reset persist data
        function _reset(options){
            delete scopeData[options.id];
            scopeData[options.id] = null;
            delete noneScopeData[options.id];
            noneScopeData[options.id] = null;
        }

        $rootScope.$on('logout', function(){
            scopeData = {};
            noneScopeData = {};
        });

        return {
            create: function ($scope, _options_) {
                if ($scope == undefined)
                    return false;

                var options = angular.extend({}, defaultOptions, _options_ || {});
                // init
                var clearEvent = $rootScope.$on('$routeChangeStart', function () {
                    _set($scope, options);
                });

                _get($scope, options);

                $scope.$on('$destroy',function(){
                    clearEvent();
                });

                // return clear function
                return function(){
                    options.isDone = true;
                    clearEvent();
                    _reset(options);
                }
            }
        }
    }]
)

.factory('cmChunk', [
    'cmFilesAdapter',
    'cmLogger',
    'cmCrypt',
    'cmObject',
    '$q',
    function (cmFilesAdapter, cmLogger, cmCrypt, cmObject, $q){

        function str2ab_blobreader(str, callback) {

            var blob;
            var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
            if (typeof(BlobBuilder) !== 'undefined') {
                var bb = cmFilesAdapter.blobBuilderWrap();
                bb.append(str);
                blob = bb.getBlob();
            } else {
                blob = cmFilesAdapter.blobWrap([str], undefined, 'str2ab_blobreader');
            }
            var f = new FileReader();
            f.onload = function(e) {
                callback(e.target.result)
            };
            f.readAsArrayBuffer(blob);
        }

        return function Chunk(file, start, end){

            cmObject.addEventHandlingTo(this);

            var self = this,
                isReady = $q.defer();

            this.raw = undefined;
            this.blob = undefined;
            this.plain = undefined;
            this.encryptedRaw = undefined;

            this.isReady = function(callback){
                isReady.promise.then(function(){
                    if(callback){
                        callback(self);
                    }
                });

                return isReady.promise;
            };

            this.importFileSlice = function (file, start, end){
                var slicer  = file.webkitSlice || file.mozSlice || file.slice,
                    chunk   = slicer.call(file, start, end)

                if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                    str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                        chunk = buf
                    });
                }

                this.blob = chunk;
                this.size = end-start;

                return this
            };

            this.blobToBase64 = function(){
                var self = this,
                    promise = null;

                this.blob
                    ?   cmFilesAdapter.getBlobUrl(this.blob).then(function(objUrl){
                            self.raw = objUrl.src;
                            isReady.resolve();
                        })
                    :   cmLogger.debug('Unable to convert to file; this.blob is empty.');
                return this;
            };

            this.blobToBinaryString = function(){
                var self     = this,
                    reader   = new FileReader(),
                    deferred = $q.defer();

                reader.onload = function(event){
                    self.raw = event.target.result.replace('data:application/octet-stream;base64,', '');
                    deferred.resolve(self.raw)
                };

                this.blob
                    ?   reader.readAsBinaryString(this.blob)
                    :   cmLogger.debug('Unable ro convert to raw; chunk.blob is empty.  Try calling chunk.importFileSlice() first.');

                return deferred.promise;

            };

            this.encrypt = function(passphrase) {
                if(passphrase == null){
                    this.plain = this.raw;
                } else {
                    this.encryptedRaw = cmCrypt.encrypt(passphrase, this.raw);
                }

                return this;
            };

            this.upload = function(id, index){
                if(this.plain){
                    return cmFilesAdapter.addChunk(id, index, this.plain)
                } else if(this.encryptedRaw){
                    return cmFilesAdapter.addChunk(id, index, this.encryptedRaw)
                } else {
                    cmLogger.debug('Unable to upload; chunk.plain or chunk.encryptedRaw is empty. Try calling chunk.encrypt() first.')
                }
            };

            this.download = function(id, index){
                var self = this;

                this.raw = undefined;
                this.blob  = undefined;

                return cmFilesAdapter.getChunk(id, index).then(
                    function(data){
                        return self.encryptedRaw = data
                    }
                )
            };

            /**
             * @param passphrase
             * @returns {Chunk}
             */
            this.decrypt = function(passphrase){
                this.encryptedRaw
                    ?   this.raw = cmCrypt.decrypt(passphrase, this.encryptedRaw) || this.encryptedRaw
                    :   cmLogger.debug('Unable to decrypt; chunk.encryptedRaw is empty. Try calling chunk.download() first.');
                return this;
            };

            this.binaryStringToBlob = function(){
                this.raw
                    ?   this.blob = cmFilesAdapter.binaryToBlob(this.raw)
                    :   cmLogger.debug('Unable to convert to Blob; chunk.raw is empty. Try calling chunk.decrypt() first.');
                return this;
            };
        }
    }
])

.factory('cmFileFactory', [
    'cmFileModel',
    '$rootScope',
    function(cmFileModel, $rootScope){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        $rootScope.$on('identity:switched', function(){
            instances = [];
        });

        return {
            create: function(data, explicit){
                var file = null,
                    i = 0;

                if(typeof explicit === 'undefined'){
                    explicit = false;
                }

                if(explicit !== true) {
                    // existing via id
                    if (typeof data == 'string') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
                        //
                    } else if (typeof data == 'object') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data.id) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
                    }
                }
                // create model
                if(file == null){
                    file = new cmFileModel(data);
                    instances.push(file);
                }

                return file;
            },
            remove: function(file){
                var bool = false;

                var index = instances.indexOf(file);

                if(index != -1) {
                    instances.splice(index, 1);
                    bool = true;
                }

                return bool;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
])

.factory('cmFileModel', [
    'cmFilesAdapter', 'cmFileDownload', 'cmFileTypes', 'cmLogger', 'cmChunk',
    'cmCrypt', 'cmObject', 'cmModal', 'cmEnv', 'cmUtil', 'cmDeviceDownload',
    'cmStateManagement',
    '$q',
    function (cmFilesAdapter, cmFileDownload, cmFileTypes, cmLogger, cmChunk,
              cmCrypt, cmObject, cmModal, cmEnv, cmUtil, cmDeviceDownload,
              cmStateManagement,
              $q){

        function roundToTwo(num) {
            return +(Math.round(num + 'e+2') + 'e-2');
        }

        var FileModel = function(fileData){

            var self = this,
                passphrase = undefined;

            cmObject.addEventHandlingTo(this);

            this.state  = new cmStateManagement(['new','onlyFileId','readyForDownload','cached','crashed','incomplete']);

            this.chunks = [];

            this.name = '';
            this.encryptedName = '';
            this.encryptedSize = 0;
            this.size = 0;

            this.base64 = '';
            this.onCompleteId = undefined;
            this.detectedExtension = undefined;
            this.autoDownload = false;

            this.setPassphrase = function(p){
                passphrase = p;// TODO: || null;
                return this;
            };

            this.isImage = function(){
                return this.type == undefined
                     ? false
                     : this.type.search('^image/') != -1;
            };

            this.isEmbed = function(specificMime){
                return this.type == undefined
                     ? false
                     : this.type.search('^('+(specificMime||'image|video|audio')+')') != -1;
            };

            // message id for backend event message:new
            this.setOnCompleteId = function(id){
                this.onCompleteId = id;

                return this;
            };

            this.importBase64 = function(base64){
                if(base64){
                    this.type = cmFilesAdapter.getMimeTypeOfBase64(base64);
                    this.blob = cmFilesAdapter.binaryToBlob(cmFilesAdapter.base64ToBinary(base64),this.type);
                    this.chopIntoChunks(128);
                }
                return this;
            };

            // for fileApi of browser -> upload
            this.importBlob = function(blob){
                this.blob = blob;
                this.id   = undefined;

                this.name = blob.name;
                this.type = blob.type;
                this.size = blob.size;

                this.detectedExtension = cmFileTypes.find(this.type, this.name);

                // broken mimetype???
                if (this.detectedExtension == 'unknown') {
                    var obj = cmFileTypes.getMimeTypeViaFilename(this.name);
                    if (obj.detectedExtension != 'unknown') {
                        this.detectedExtension = obj.detectedExtension;
                        this.type = obj.mimeType;
                    }
                }

                return this;
            };

            this.importFile = function(){
                var self = this;

                return cmFilesAdapter.getFile(this.id).then(
                    function(details){
                        self.encryptedName = details.fileName;
                        self.type          = details.fileType;
                        self.size          = details.fileSize;
                        self.chunkIndices  = details.chunks;
                        self.maxChunks     = details.maxChunks;

                        self.decryptName();

                        self.detectedExtension = cmFileTypes.find(self.type, self.name);

                        // is file complete of chunks?
                        if(details.isCompleted) {
                            self.trigger('importFile:finish',self);
                        } else {
                            self.trigger('importFile:incomplete',self);
                        }
                    },
                    function(){
                        self.state.unset('onlyFileId');
                        self.state.set('crashed');
                        self.trigger('file:crashed');
                    }
                );
            };

            this.chopIntoChunks = function(chunkSize){
                var self        = this,
                    startByte   = 0,
                    endByte     = 0,
                    index       = 0,
                    promises    = [];

                if(!this.blob) {
                    cmLogger.debug('Unable to chop file into Chunks; cmFile.blob missing.');
                    return null;
                }

                self.chunks   = [];

                while(endByte < this.blob.size) {

                    startByte = index * 1024 * chunkSize;
                    endByte = startByte + 1024 * chunkSize;

                    endByte = (endByte > this.blob.size) ? this.blob.size : endByte;

                    var chunk = new cmChunk();
                    self.chunks.push(chunk);

                    promises.push(
                        chunk
                            .importFileSlice(self.blob, startByte, endByte)
                            .blobToBase64()
                    );

                    index++;
                }

                return $q.all(promises);
            };

            this.encryptName = function(){
                if(this.name){
                    this.encryptedName = (passphrase == null) ? this.name : cmCrypt.encryptWithShortKey(passphrase, this.name);
                } else {
                    cmLogger.debug('Unable to encrypt filename; cmFile.name missing. Try calling cmFile.importFile() first.');
                }

                return this;
            };

            this.decryptName = function() {
                if(!passphrase){
                    this.name = this.encryptedName;
                } else if(this.encryptedName && passphrase){
                    this.name = cmCrypt.decrypt(passphrase, this.encryptedName);
                } else {
                    cmLogger.debug('Unable to decrypt filename; cmFile.encryptedFileName missing. Try calling cmFile.imporByFile) first.');
                }
                return this;
            };

            this._encryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk.encrypt(passphrase);
                this.encryptedSize += chunk.encryptedRaw.length;

                if(index == (this.chunks.length - 1)){
                    this.trigger('encrypt:finish');
                } else {
                    this.trigger('encrypt:chunk', index);
                }
            };

            this.encryptChunks = function() {
                if(this.chunks){
                    this._encryptChunk(0);
                } else {
                    cmLogger.debug('Unable to encrypt chunks; cmFile.chunks missing. Try calling cmFile.chopIntoChunks() first.');
                }

                return this;
            };

            this._decryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk
                    .decrypt(passphrase)

                this.encryptedSize += String(chunk.encryptedRaw).length;
                //this.size += chunk.blob.size;

                if(index == (this.chunkIndices.length - 1)){
                    this.trigger('decrypt:finish');
                } else {
                    this.trigger('decrypt:chunk', index);
                }
            };

            this.decryptChunks = function(){
                if(!this.chunks){
                    cmLogger.debug('Unable to decrypt chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.');
                    return null
                }

                this._decryptChunk(0);

                return this;
            };

            this.decryptStart = function(){
                this.decryptChunks();
            };

            this.reassembleChunks = function(){
                var self = this,
                    binary = '',
                    byteArray = [];

                if(!this.chunks)
                    cmLogger.debug('Unable reassemble chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.');

                this.chunks.forEach(function(chunk){
                    try{
                        binary+= cmFilesAdapter.base64ToBinary(chunk.raw);
                    } catch(e){
                        cmLogger.debug(e);
                    }
                });

                this.blob = cmFilesAdapter.binaryToBlob(binary, self.type);

                self.trigger('file:cached', this);

                return this;
            };

            this.prepareForUpload = function(conversationId) {
                var self = this;

                return (
                        self.encryptedName && self.chunks || self.name && self.chunks
                    ?   cmFilesAdapter.prepareFile({
                            conversationId: conversationId,
                            name: self.encryptedName || self.name,
                            size: self.blob.size,//self.encryptedSize,
                            type: self.type,
                            chunks: self.chunks.length
                        })
                        .then(function(id){
                            return self.id = id;
                        })
                    :   cmLogger.debug('Unable to set up file for Download; cmFile.chunks or cmFile.encryptedName missing. Try calling cmFile.chopIntoChunks() and cmFile.encryptName() first.')
                )
            };

            this._uploadChunk = function(index){
                // waiting for chunk sliceing and blob to base64
                this.chunks[index].isReady(function(chunk){
                    chunk
                        .encrypt(passphrase)
                        .upload(self.id, index)
                        .then(function(){
                            self.trigger('progress:chunk', (index/self.chunks.length));

                            if(index == (self.chunks.length - 1)){
                                cmFilesAdapter.setFileComplete(self.id, self.onCompleteId).then(function(){
                                    self.state.set('complete');
                                    self.trigger('upload:finish');
                                });
                            } else {
                                self.trigger('upload:chunk', index);
                            }
                        });
                });
            };

            this.uploadChunks = function() {
                if(!this.id){
                    cmLogger.debug('Unable to upload chunks; cmFile.id missing. Try calling cmFile.prepareForDownload() first.')
                    return null;
                }

                /**
                 * start upload with first chunk in array
                 */
                this._uploadChunk(0);

                return this;
            };

            this._downloadChunk = function(index){
                var chunk = new cmChunk();

                if(self.chunks == null) {
                    cmLogger.error('_downloadChunk:'+index+' download failed because of self.chunks = null');
                    self.trigger('progress:chunk', 1);
                    self.trigger('download:finish', {'error':true});
                    self.trigger('file:cached');
                    return false;
                }

                self.chunks[index] = chunk;

                chunk
                    .download(self.id, index)
                    .then(
                    function(){
                        if(self.chunks != null){
                            self.trigger('progress:chunk', (index/self.chunks.length));
                        }

                        if(index == (self.chunkIndices.length - 1)){
                            self.trigger('download:finish', index);
                        } else {
                            self.trigger('download:chunk', index);
                        }
                    },
                    function(){
                        self.trigger('progress:chunk', 1);
                        self.trigger('download:finish', {'error':true});
                        self.trigger('file:cached');
                    }
                );
            };

            this.downloadChunks = function(){
//                cmLogger.debug('cmFileModel:downloadChunks');
                // only crashed when fileId is missing
                if(!this.id && this.state.is('onlyFileId')){
//                    cmLogger.debug('cmFile.downloadChunks();')
                    return null;
                }

                this.importFile();

                this.on('importFile:finish',function(){
                    self.state.unset('onlyFileId');
                    self.state.set('readyForDownload');
                    self.trigger('file:readyForDownload');
                    // autoDownload 'passcaptcha has always true'
                    if(self.autoDownload){
                        self.startDownloadChunks();
                    }
                });

                return this;
            };

            this.startDownloadChunks = function(){
                self.state.unset('readyForDownload');
                self._downloadChunk(0);
            };

            this.downloadStart = function(autoDownload){
                //cmLogger.debug('cmFileModel:downloadStart');
                // handle straight autodownload
                this.autoDownload = autoDownload || this.autoDownload;

                if(this.id != '' && this.state.is('onlyFileId')){
                    cmFileDownload.add(this);
                }
            };

            this.downloadStop = function(){
                cmFileDownload.stop(this);
            };

            this.promptSaveAs = function(){
                //console.log('promptSaveAs')

                try {
                    var isFileSaverSupported = !!new Blob;
                } catch (e) {
                    cmLogger.debug('Unable to prompt saveAs; FileSaver is\'nt supported');
                    return false;
                }

                var downloadAttrSupported = ( "download" in document.createElement("a") ),
                    iOSWorkingMimeTypes = ( this.type.match(/(application\/pdf)/g) ? true : false );

                if(cmEnv.isiOS && !downloadAttrSupported && !iOSWorkingMimeTypes){
                    cmModal.create({
                        id:'saveas',
                        type: 'alert'
                    },'<span>{{\'NOTIFICATIONS.TYPES.SAVE_AS.IOS_NOT_SUPPORT\'|cmTranslate}}</span>');
                    cmModal.open('saveas');
                } else {
                    // phonegap download
                    if(cmDeviceDownload.isSupported()) {
                        //console.log('cmDeviceDownload called')
                        cmDeviceDownload.saveAs(this);
                    // browser download
                    } else if(this.blob){
                        //console.log('saveAs called')
                        saveAs(this.blob, this.name != false ? this.name : 'download');
                    } else {
                        cmLogger.debug('Unable to prompt saveAs; cmFile.blob is missing, try cmFile.importByFile().');
                    }
                }
                return this;
            };

            this.hasBlob = function(){
                if(this.blob !== 'undefined'){
                    return true;
                }

                return false;
            };

            /**
             * keep the buffer clean when file is cached
             * @returns {FileModel}
             */
            this.clearBuffer = function(){
                if(this.state.is('cached')) {
                    this.encryptedName = null;
                    this.chunkIndices = null;
                    this.chunks = null;
                    passphrase = undefined;
                }

                return this;
            };

            /**
             *
             * @param fileData
             * @param chunkSize
             * @returns {FileModel}
             */
            this.init = function(fileData, chunkSize){
                var self = this;

                if(typeof fileData !== 'undefined'){
                    // download: existing file via fileId
                    if(typeof fileData == 'string'){
                        this.state.set('onlyFileId');
                        this.id = fileData;

                    // upload init via via base64
                    } else if(typeof fileData == 'object') {
                        this.state.set('new');
                        this.importBlob(fileData);

                        if (!chunkSize) {
                            chunkSize = 128;
                        }

                        self.chopIntoChunks(chunkSize);
                    }
                }

                return this;
            };

            this.init(fileData);

            /**
             * Event Handling
             */
            this.on('download:chunk', function(event, index){
                self._downloadChunk(index + 1);
                self._decryptChunk(index);
            });

            this.on('download:finish', function(event, index){
//                cmLogger.debug('download:finish');
                if(typeof index == 'number') {
                    self._decryptChunk(index);
                    // error on download
                } else if(index.error) {
                    //cmLogger.warn('chunk not found');
                    self.state.set('cached');
                }
            });

            this.on('upload:chunk', function(event, index){
                self._uploadChunk(index + 1);
            });

            this.on('upload:finish', function(){
//                cmLogger.debug('upload:finish');
                self.state.set('cached');
            });

            this.on('encrypt:chunk', function(event, index){
//                cmLogger.debug('encrypt:chunk');
                self._encryptChunk(index + 1);
            });

            this.on('decrypt:chunk', function(event, index){
//                cmLogger.debug('decrypt:chunk '+index);
//                self._decryptChunk(index + 1);
//                self._downloadChunk(index + 1);
            });

            this.on('decrypt:finish', function(event, index){
//                cmLogger.debug('decrypt:finish');
                self.reassembleChunks();
            });

            this.on('file:cached', function(){
//                cmLogger.debug('file:cached');
                self.state.set('cached');

                self
                    .decryptName()
                    .clearBuffer()

                self.detectedExtension = cmFileTypes.find(self.type, self.name);
            });
        };

        return FileModel;
    }
])

.service('cmFileDownload', [
    'cmLogger',
    '$rootScope',
    function(cmLogger, $rootScope){
        var self = this;

        this.stack = [];
        this.atWork = false;

        function reset(){
            self.atWork = false;
            self.stack = [];
            self.stop();
        }

        $rootScope.$on('logout', function(){
            reset();
        });

        $rootScope.$on('identity:switched', function(){
            reset();
        });

        /**
         * add cmFileObject to Stack
         * @param file
         */
        this.add = function(file){
            if(typeof file == 'object'){
                this.stack.push(file);

                if(this.atWork !== true){
                    this.atWork = true;
                    this.run(this.stack.shift());
                }
            }
        };

        /**
         * work on stack queue, start download process in files
         * @param index
         */
        this.run = function(file){
            if(typeof file == 'object' && file.state.is('onlyFileId')){
                file.downloadChunks();

                file.on('file:readyForDownload file:crashed file:cached', function(){
                    self.run(self.stack.shift());
                });
            } else {
                if(this.stack.length == 0) {
                    this.atWork = false;
                } else {
                    this.run(this.stack.shift());
                }
            }
        };

        /**
         * Stops Downloading
         */
        this.stop = function(file){
            var index = this.stack.indexOf(file);
            if(index > -1){
                this.stack.splice(index, 1);
            }
        };

        /**
         * Return Stack Quantity
         * @returns {Array}
         */
        this.getQty = function(){
            return this.stack.length;
        };
    }
])
.service('cmFileTypes',[
    function(){
        /**
         * e: extension
         * m: mimeType
         * @type {*[]}
         */
        var fileMimeTypes = [
            // image
            {e:'jpg,jpeg,jpe',m:'image/jpeg'},
            {e:'gif',m:'image/gif'},
            {e:'bmp',m:'image/bmp'},
            {e:'png',m:'image/png'},
            {e:'tif,tiff',m:'image/tiff'},
            // video
            {e:'mov',m:'video/quicktime'},
            {e:'mpg,mpa,mp2,mpe,mpeg',m:'video/mpeg'},
            {e:'mp4',m:'video/mp4'},
            {e:'flv',m:'video/x-flv'},
            {e:'avi',m:'video/x-msvideo'},
            // audio
            {e:'mp3',m:'audio/mpeg'},
            {e:'mp3',m:'audio/mp3'},
            {e:'wav',m:'audio/x-wav'},
            {e:'wma',m:'audio/x-ms-wma'},
            {e:'aif,aiff,aifc',m:'audio/x-aiff'},
            {e:'ogg',m:'audio/ogg'},
            {e:'3gpp',m:'video/3gpp'},
            {e:'aac',m:'audio/x-aac'},
            // docs
            {e:'pdf',m:'application/pdf'},
            {e:'txt',m:'text/plain'},
            {e:'xls,xlsx',m:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
            {e:'xls',m:'application/vnd.ms-excel'},
            {e:'doc',m:'application/msword'},
            {e:'docx,doc',m:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
            {e:'pps,ppt',m:'application/vnd.ms-powerpoint'},
            {e:'pptx',m:'application/vnd.openxmlformats-officedocument.presentationml.presentation'},
            // various
            {e:'php',m:'text/php'},
            {e:'css',m:'text/css'},
            {e:'zip',m:'application/zip'},
            {e:'zip',m:'application/x-zip-compressed'},
            {e:'rar',m:'application/x-rar-compressed'},
            {e:'sit',m:'application/x-stuffit'},
            {e:'eps',m:'application/postscript'},
            {e:'xml',m:'application/xml'},
            {e:'html,htm',m:'text/html'},
            {e:'chm',m:'application/vnd.ms-htmlhelp'},
            {e:'ttf',m:'application/x-font-ttf'},
            //{e:'exe',m:'application/octet-stream'},
            {e:'exe',m:'application/x-msdownload'},
            {e:'dmg',m:'application/x-apple-diskimage'},
            {e:'apk',m:'application/vnd.android.package-archive'}
        ],
        unknown = 'unknown';

        return {
            find: function(mime, filename){
                var self = this,
                    detectedExtension = unknown;
                // search for mimetype
                if(mime != undefined) {
                    angular.forEach(fileMimeTypes, function (type) {
                        if (mime != '' && type.m == mime) {
                            detectedExtension = self.getExtension(type.e, filename);
                        }
                    });
                }

                return detectedExtension;
            },

            findMimeType: function(detectedExtension){
                var mimeType = unknown;

                angular.forEach(fileMimeTypes, function (type) {
                    var findMime = type.e.split(',').filter(function(arrayExtension){
                        return arrayExtension == detectedExtension
                    });
                    if(findMime.length == 1)
                        mimeType = type.m;
                });

                return mimeType;
            },

            getMimeTypeViaFilename: function(filename){
                var arr_filename = filename && typeof filename == 'string' ? filename.split('.') : [],
                    extension = arr_filename.length > 1 ? arr_filename[arr_filename.length-1] : '',
                    detectedExtension = unknown,
                    mimeType = unknown;

                if(extension != ''){
                    detectedExtension = this.getExtension(extension, filename);
                    mimeType = this.findMimeType(detectedExtension);
                }

                return {
                    detectedExtension: detectedExtension,
                    mimeType: mimeType
                }
            },

            getExtension: function(extensions, filename){
                var extension = unknown,
                    extensions = extensions && typeof extensions == 'string' ? extensions.split(',') : [],
                    clearFilename = filename && typeof filename == 'string' ? filename.toLowerCase() : undefined;

                // no extensions exists
                if(!extensions || extensions == '')
                    return extension;

                // check filename
                if(clearFilename == undefined // no filename given
                || clearFilename == '' // filen is empty
                || clearFilename.split('.').length == 1 // filename has no extension
                ){
                    extension = extensions[0];
                } else {
                    angular.forEach(extensions, function (inExtension) {
                        if (clearFilename.search(inExtension+'$') != -1) {
                            extension = inExtension;
                        }
                    })
                }

                return extension;
            }
        }
    }
])
.service('cmFilesAdapter', [
    'cmApi', 'cmLogger', 'cmUtil', 'cmDevice',
    '$q',
    function (cmApi, cmLogger, cmUtil, cmDevice,
              $q){
        return {
            prepareFile: function(config){
                return cmApi.post({
                    path: '/file',
                    exp_ok: 'id',
                    headers: {
                        "X-File-Name": config.name,
                        "X-File-Size": config.size,
                        "X-File-Type": config.type,
                        "X-Max-Chunks": config.chunks
                    }
                });
            },

            addChunk: function(fileId, index, chunk) {
                return cmApi.postBinary({
                    path: '/file/'+fileId,
                    data: chunk,
                    headers: {
                        "X-Index": index
                    },
                    transformRequest: function(data){return data}
                });
            },

            setFileComplete: function(fileId, messageId){
                var data = 'null';
                if(messageId != undefined){
                    data = {
                        messageId: messageId
                    }
                }
                return cmApi.post({
                    path: '/file/'+fileId+'/completed',
                    data: data
                });
            },

            getFile: function(fileId){
                return cmApi.get({
                    path: '/file/'+fileId
                });
            },

            getChunk: function(fileId, chunkId){
                return cmApi.getBinary({
                    path: '/file/'+fileId+'/'+chunkId
                });
            },

            blobWrap: function(byteArrays, contentType, method){
                if(byteArrays == undefined || byteArrays == null)
                    return false;

                var blob = undefined;

                try {
                    blob = new Blob([byteArrays[0].buffer], {type: contentType});
                } catch(e){
                    // TypeError old chrome and FF
                    window.BlobBuilder =    window.BlobBuilder ||
                                            window.WebKitBlobBuilder ||
                                            window.MozBlobBuilder ||
                                            window.MSBlobBuilder;

                    // is already a blob!
                    if(byteArrays.toString() == '[object Blob]'){
                        blob = byteArrays;
                    } else if(e.name == 'TypeError' && window.BlobBuilder){
                        var bb = new BlobBuilder();
                        bb.append(byteArrays[0].buffer);
                        blob = bb.getBlob(contentType);
                    } else if(e.name == "InvalidStateError"){
                        // InvalidStateError (tested on FF13 WinXP)
                        blob = new Blob( byteArrays, {type : contentType});
                    } else {
                        cmLogger.debug('We\'re screwed, blob constructor unsupported entirely');
                        console.log(e, byteArrays, 'from method: '+method);
                    }
                }
                return blob;
            },

            blobBuilderWrap: function(){
                if(typeof(BlobBuilder) === 'undefined')
                    return false;

                var blobBuilder = new BlobBuilder();
                return blobBuilder;
            },

            base64ToBinary: function(b64Data){
                if(typeof b64Data != 'string')
                    return '';

                return atob(this.clearBase64(b64Data));
            },

            binaryToBlob: function (binary, contentType){
                if(typeof binary != 'string' || binary == '')
                    return false;

                var byteArrays = [],
                    binary = binary || '',
                    contentType = contentType || '',
                    sliceSize = binary.length;

                for (var offset = 0; offset < binary.length; offset += sliceSize) {
                    var slice = binary.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = this.blobWrap(byteArrays, contentType, 'binaryToBlob');
                return blob;
            },

            base64ToBlob: function(base64, contentType){
                if(typeof base64 != 'string' || base64 == '')
                    return false;
                // check mimetype from base64
                if(!contentType){
                    var mimeType = this.getMimeTypeOfBase64(base64);
                    if(mimeType != ''){
                        contentType = mimeType;
                    }
                }
                // decode and create blob
                var binary = this.base64ToBinary(base64, contentType),
                    blob = this.binaryToBlob(binary, contentType);
                return blob;
            },

            /**
             * return clear base64 for atob function
             * replace newlines & return
             * replace the "data:;base64," mimetype
             * @param b64Data
             * @returns {String} clearBase64
             */
            //base64Regexp: '^(data:(.{0,100});base64,|data:(.{0,100})base64,)(.*)$',
            base64Regexp: '^(data:(.*?);?base64,)(.*)$',

            clearBase64: function(b64Data){
                if(typeof b64Data != 'string')
                    return '';

                var clearBase64 = b64Data
                .replace(/\r?\n|\r| /g,'')
                .replace(new RegExp(this.base64Regexp,'i'),function(){
                    return arguments[3];// return the cleared base64
                });

                //console.log(clearBase64)

                return clearBase64;
            },

            getMimeTypeOfBase64: function(base64){
                return base64 && typeof base64 == 'string' ? base64.replace(new RegExp(this.base64Regexp,'i'),'$2') : '';
            },

            getBlobUrl: function(blob, useBlobUrl){
                var useFileReader = useBlobUrl ? false : true,
                    revokeFnc = function(){
                        this.src = '';
                        return true;
                    },
                    deferred = $q.defer(),
                    objUrl = {
                        src: '',
                        revoke: revokeFnc
                    };

                // for app android use the localurl
                // TODO: optimize overall useBlobUrl and on Android localURL only at pick file preview
                if(cmDevice.isAndroid() && 'useLocalUri' in blob){
                    deferred.resolve({
                        src: blob.localURL,
                        revoke: revokeFnc
                    });
                } else
                // filereader return base64
                if(useFileReader){
                    var filereader = new FileReader();
                    filereader.onload = function(e){
                        objUrl.src = e.target.result;
                        deferred.resolve(objUrl);
                    };
                    filereader.readAsDataURL(blob);
                // bloburl returns a url to a blob
                } else {
                    var URL = window.URL || window.webkitURL;
                    objUrl = {
                        src: URL.createObjectURL(blob),
                        revoke: function(){
                            URL.revokeObjectURL(this.src);
                            this.src = '';
                            return true;
                        }
                    };
                    deferred.resolve(objUrl);
                }

                return deferred.promise;
            }
        }
    }
])

.factory('cmKeyFactory', [
    'cmKey',
    'cmFactory',
    'cmObject',
    'cmLogger',
    '$rootScope',
    '$q',
    function(cmKey, cmFactory, cmObject, cmLogger, $rootScope, $q){

        function keyFactory(){

            var self =  new cmFactory(cmKey,
                                function sameByData(instance, data){
                                    return      instance.id == data.id
                                            ||  instance.getPublicKey() == data.pubKey
                                },
                                function sameByInstance(instance_1, instance_2){
                                    return      instance_1.id == instance_2.id
                                            ||  instance_1.getPublicKey() ==  instance_2.getPublicKey()
                                }
                            );

            self.encryptPassphrase = function(passphrase, whiteList){
                
                return  $q.all(
                            self
                            .filter(function(key){
                                return  !whiteList || whiteList.indexOf(key.id) != -1
                            })
                            .map(function(key){
                                return  key
                                        .encrypt(passphrase)
                                        .then(function(result){
                                            return  {
                                                        keyId:                 key.id,
                                                        encryptedPassphrase:   result
                                                    }
                                        })
                            })
                         
                        )
            };

            self.getWeakestKeySize = function(){
                return this.reduce(function(size, key){
                    return (size == undefined) ? (key.getSize()||0) : Math.min(size||0, key.getSize()||0)
                }, undefined) || 0
            };

            /**
             * [getTransitivelyTrustedKeys description]
             * @param  {Array} trustedKeys Array of cmKey instances known to be trusted
             * @return {Array}             Array of cmKey instances within a chain of trust connecting them to the initially trusted keys. 
             */
            self.getTransitivelyTrustedKeys = function(initially_trusted_keys, trust_callback, trusted_keys_iteration){
                // cmLogger.debug('cmKeyFactory.getTransitivelyTrustedKeys');

                var trustedKeys = trusted_keys_iteration || initially_trusted_keys || []

                if(!trust_callback){
                    cmLogger.debug('cmKey.getTransitivelyTrustedKeys: trust_callback missing.')
                    return $q.reject()
                }       

                return  $q.all(self.map(function(key){
                            var is_trusted =    trustedKeys.indexOf(key) != -1                           
                                                ?   $q.when(key)
                                                :   trustedKeys.reduce(function(previous_try, trusted_key){
                                                        return  previous_try
                                                                .catch(function(){
                                                                    return  $q.when(trust_callback(trusted_key, key))
                                                                            .then(function(call_back_result){
                                                                                return  call_back_result
                                                                                        ?   $q.when(key)
                                                                                        :   $q.reject('callback return value was falsely.')
                                                                            })
                                                                })
                                                    }, $q.reject('missing trusted keys.'))

                            return  is_trusted
                                    .catch(function(reason){
                                        return $q.when(undefined)
                                    })
                        }))
                        .then(function(list){
                            var extended_key_list = list.filter(function(item){ return !!item})
                            return  trusted_keys_iteration && (extended_key_list.length === trusted_keys_iteration.length)
                                    ?   $q.when(extended_key_list)
                                    :   self.getTransitivelyTrustedKeys(null, trust_callback, extended_key_list)
                        })
            };

            $rootScope.$on('logout', function(){ self.reset() });
            $rootScope.$on('identity:switched', function(){ self.reset() });

            //self.on('fingerprintCheck:failed', function(event, value){
            //    console.log(event)
            //});

            return self
        }

        return keyFactory
    }
])

.factory('cmKey', [

    'cmLogger',
    'cmObject',
    'cmWebworker',
    '$rootScope',
    '$q',

    function(cmLogger, cmObject, cmWebworker, $rootScope, $q){
        /**
         * @TODO TEsts!!!!!
         * @param args
         * @returns {*}
         */
        function cmKey(data){
            //Wrapper for RSA Keys
            var self        = this,
                crypt       = undefined, // will be JSEncrypt() once a key is set
                verified    = {};

            cmObject.addEventHandlingTo(this);

            this.created    = 0;
            this.signatures = [];

            function init(data){
                self.importData(data)
            }

            function reset(){
                self.created    = 0;
                self.signatures = [];
            }

            this.importData = function(data){
                if(!data){
                    cmLogger.debug('cmKey:importData: missing data')
                    return self
                }

                var key =       data.privKey
                            ||  this.getPrivateKey()
                            ||  data.key
                            ||  data.pubKey
                            ||  undefined;

                if(data.name)       this.setName(data.name);
                if(data.id)         this.setId(data.id);
                if(data.created)    this.created = data.created;
                if(data.signatures) Array().push.apply(this.signatures, data.signatures)

                if(key) this.setKey(key);

                return this;
            };

            this.exportData = function(){
                var data        = {},
                    private_key = this.getPrivateKey(),
                    public_key  = this.getPublicKey(),
                    size        = this.getSize();

                if(this.id)         data.id         = this.id;
                if(this.name)       data.name       = this.name;
                if(this.signatures) data.signatures = this.signatures;
                if(this.created)    data.created    = this.created;
                if(public_key)      data.pubKey     = public_key;
                if(private_key)     data.privKey    = private_key;
                if(size)            data.size       = size;

                return data;
            };

            this.setId = function(id){
                this.id = id;
                return this;
            };

            this.setName = function(name){
                this.name = name;
                return this;
            };

            // set either public or private key
            this.setKey = function(key){
                crypt = crypt || new JSEncrypt()
                crypt.setKey(key);
                return this;
            };

            this.getPublicKey = function(){
                var public_key;
                try{
                    public_key = crypt.getPublicKey();
                }catch(e){}

                return public_key;
            };

            /**
             * @todo sinnvoll einsetzen
             */
            this.checkFingerprint = function(){
                var fingerprint = sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.getPublicKey()), true, true);

                if(typeof this.id != 'undefined'){
                    if(this.id != fingerprint){
                        this.trigger('fingerprintCheck:failed');
                    }
                }
            };

            this.getFingerprint = function(){
                return this.id //Todo: rework Fingerprints, was:  sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.getPublicKey()), true, true)
            };

            this.getPrivateKey = function(){
                var private_key;
                try{
                    private_key = crypt.getPrivateKey();
                }catch(e){}

                return private_key;
            };

            this.sign = function(data){

                return  cmWebworker.available
                        ?   cmWebworker.new('rsa_sign')
                            .then(function(worker){
                                return  worker.start({
                                            privKey:    self.getPrivateKey(),
                                            data:       data
                                        })
                            })
                            .then(function(result){
                                return $q.when(result.signature)
                            })
                        :   $q.when(crypt && crypt.sign(data))
                            .then(function(signature){
                                return  signature
                                        ?   $q.when(signature)
                                        :   $q.reject()
                            })
            };

            this.verify = function(data, signature, force){ 
                return  $q.reject()
                        // .catch(function(){
                        //     return  !force && (verified[data] && verified[data][signature])
                        //             ?   $q.when(verified[data][signature])
                        //             :   $q.reject()
                        // })
                        .catch(function(){
                            return  cmWebworker.available
                                    ?   cmWebworker.new('rsa_verify')
                                        .then(function(worker){
                                            return  worker.start({
                                                        pubKey:     self.getPublicKey(),
                                                        signature:  signature,
                                                        data:       data
                                                    })
                                            
                                        })
                                        .then(function(result){
                                            return $q.when(result.result)
                                        })
                                    :   $q.when(crypt && crypt.verify(data, signature, function(x){ return x }))
                                        .then(function(result){
                                            return  result
                                                    ?   $q.when(result)
                                                    :   $q.reject()
                                        })
                        })
                        .then(
                            function(signature){
                                verified[data] = verified[data] || {}
                                verified[data][signature] = true
                                return signature
                            },
                            function(){
                                cmLogger.warn('keyModel.verify() failed.')
                                return $q.reject()
                            }
                        )
            }

            this.encrypt = function(secret){
                return  cmWebworker.available
                        ?   cmWebworker.new('rsa_encrypt')
                            .then(function(worker){
                                return  worker.start({
                                            pubKey:     self.getPublicKey(),
                                            secret:     secret
                                        }) 
                            })
                            .then(function(result){
                                return  result.secret
                            })

                        :   $q.when(crypt && crypt.encrypt(secret))
                            .then(function(result){
                                return  result
                                        ?   $q.when(result)
                                        :   $q.reject()
                            });
            };

            this.decrypt = function(encrypted_secret){
                return  cmWebworker.available
                        ?   cmWebworker.new('rsa_decrypt')
                            .then(function(worker){
                                return  worker.start({
                                            privKey:            self.getPrivateKey(),
                                            encryptedSecret:    encrypted_secret
                                        })
                            })
                            .then(
                                function(result){
                                    return result.secret
                                },
                                function(){
                                    return $q.reject()
                                }
                            )
                        :   $q.when(crypt && crypt.decrypt(encrypted_secret))
                            .then(function(result){
                                return  result
                                        ?   $q.when(result)
                                        :   $q.reject()
                            })

            };

            this.verifyKey = function(key, data){

                return  (this.getPublicKey() == key.getPublicKey() 
                        ?   $q.when(key)   //always verifies itself
                        :   key.signatures.reduce(function(previous_try, signature){
                                return  previous_try
                                        .catch(function(){
                                            return  (self.id == signature.keyId)
                                                    ?   self.verify(data, signature.content)
                                                    :   $q.reject('keyIds not matching.')
                                        })
                            }, $q.reject('no signatures.'))
                        )
            };

            this.getSize = function(){
                var size

                try{
                    size = crypt.key.n.bitLength();
                } catch(e){

                }

                //Todo: dirty workaround :)
                if(size == 127 || size == 1023 || size == 2047 || size == 4095)
                    size = size+1;

                return size;
            };

            this.importJSEncrypt = function(jse){
                crypt = jse
                return this
            };

            this.exportJSEncrypt = function(){
                return crypt
            };

            $rootScope.$on('logout', function(){ reset() });
            $rootScope.$on('identity:switched', function(){ reset() });

            init(data)
        }

        return cmKey;
    }
])

.directive('cmDateFormatSelect', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'AE',
            scope: true,
            template: '<select ng-model="myFormat" ng-options="obj.value as obj.name for obj in dateFormat"></select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmSettings.set('dateFormat', scope.myFormat);
                })
            },

            controller: function($scope){
                $scope.myFormat = cmSettings.get('dateFormat');

                $scope.dateFormat = [
                    {name:"DD.MM.YYYY", value: "dd.MM.yyyy"},
                    {name:"YYYY-MM-DD", value: "yyyy-MM-dd"}
                ];

                $scope.timeFormat = {
                    "24h": "HH:mm",
                    "12h": "h:mm a"
                };
            }
        }
    }
])

.directive('cmLanguageSelect', [
    'cmLanguage',
    'cmTranslate',
    function(cmLanguage, cmTranslate){
        return {
            restrict: 'AE',
            transclude: true,
            template: '<select ng-model="language">'+
                        '<option ng-repeat="lang_key in languages" value="{{lang_key}}">{{\'LANG.\'+lang_key.toUpperCase()|cmTranslate}}</option>'+
                      '</select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmLanguage.switchLanguage(scope.language)
                })
            },

            controller: function($scope){
               $scope.languages = cmLanguage.getSupportedLanguages();
               $scope.language = cmLanguage.getCurrentLanguage();
            }
        }
    }
])
.directive('cmTimeFormatSelect', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'AE',
            scope: true,
            template: '<select ng-model="myFormat" ng-options="obj.value as obj.name for obj in timeFormat"></select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmSettings.set('timeFormat', scope.myFormat);
                });
            },

            controller: function($scope){
                $scope.myFormat = cmSettings.get('timeFormat');

                $scope.timeFormat = [
                    {name:"24h", value: "HH:mm"},
                    {name:"12h", value: "h:mm a"}
                ];
            }
        }
    }
])

//Does not work as intended <div cm-translate="LANG.DE_DE"></div> stays empty
.directive('cmTranslate', [
    'translateDirective',
    function(translateDirective){
        return translateDirective[0]
    }
])

.filter('cmTranslate', [
    'translateFilter',
    function(translateFilter){
        return translateFilter;
    }
])

.provider('cmLanguage', [
    '$translateProvider',
    function($translateProvider){

        var supported_languages = [],
            path_to_languages = '',
            cache_lang_files = true;

        this.supportedLanguages = function(languages){
            supported_languages = languages;
            return(this)
        };

        this.pathToLanguages = function(path){
            path_to_languages = path;

            $translateProvider.useStaticFilesLoader({
                prefix: path+'/',
                suffix: '.json' + (cache_lang_files ? '' : '?bust=' + (new Date()).getTime())
            });

            return(this)
        };

        this.useLocalStorage = function(){
            $translateProvider.useLocalStorage();
            return(this)
        };

        this.preferredLanguage = function(lang_key){
            $translateProvider.preferredLanguage(lang_key);
            return(this)
        };

        this.cacheLangFiles = function(bool){
            cache_lang_files = bool;
            return(this)
        };

        this.translations = function(lang_key, data){
            $translateProvider.translations(lang_key, data)
        };

        this.$get = [
            'cmTranslate',
            'cmNotify',
            'cmLogger',
            function(cmTranslate, cmNotify, cmLogger){

                if(supported_languages.length == 0)
                    cmLogger.error('No supported languages found. Try cmLanguageProvider.setSupportedLanguages().', {ttl:5000})

                return {
                    getSupportedLanguages: function(){
                        return supported_languages
                    },

                    getPathToLanguage: function(path){
                        return path_to_languages
                    },

                    getLanguageName: function(lang_key){
                        lang_key = lang_key || cmTranslate.use();
                        return cmTranslate('LANG.'+lang_key.toUpperCase())
                    },

                    switchLanguage: function(lang_key){
                        var self = this;

                        return cmTranslate.use(lang_key)
                            .then(
                            function(){
                                self.getLanguageName(lang_key).then(function(language) {
                                    cmTranslate('LANG.SWITCH.SUCCESS', {lang: language}).then(function (text) {
                                        cmNotify.info(text, {ttl: 2000});
                                    });
                                });
                            },
                            function(){
                                self.getLanguageName(lang_key).then(function(language) {
                                    cmTranslate('LANG.SWITCH.ERROR', {lang: language}).then(function (text) {
                                        cmNotify.error(text, {ttl: 2000});
                                    });
                                });
                            }
                        )
                    },

                    getCurrentLanguage:  function(){
                        return cmTranslate.use() || cmTranslate.preferredLanguage()
                    }
                }
            }
        ]
    }
])
// Provides:
// filter 'translate', usage: {{'MESSAGE_ID' | translate}}
// controller 'languageCtrl' for language switch
// Example:
// <div ng-controller="LanguageCtrl">
//		<a href="" ng-click="switchLang('en_US')">Englisch</a></li>
//		<a href="" ng-click="switchLang('de_DE')">German</li>
// </div>
// language files: /languages/lang-$langKey.json
// language file format:
//		{
//			"MESSAGE_ID": "Text",
//			"NAMESPACE"	: {
//				"MESSAGE_ID": "Hello {{username}}"
//			}
//		}
// language keys: $LANG_$CULTURE, en_US
// last language is stored in local storage (fallback cookie)


.service('cmTranslate', [
    '$translate',
    function($translate){
        return $translate;
    }
])

.directive('cmNotifySignal', [
    'cmNotify',
    function (cmNotify) {
        return {
            restrict: 'E',
            template: '<i class="fa with-response" ng-class="{\'cm-menue-bell cm-orange\': ring, \'cm-menu\': !ring}"></i>',
            scope: true,
            controller: function ($scope) {
                $scope.ring = false;

                function init(){
                    if(cmNotify.bellCounter > 0){
                        $scope.ring = true;
                    }
                }

                cmNotify.on('bell:ring', function(){
                    $scope.ring = true;
                });

                cmNotify.on('bell:unring', function(){
                    cmNotify.bellCounter = 0;
                    $scope.ring = false;
                });

                init();
            }
        }
    }
])

.factory('cmNotifyModel', [
    'cmStateManagement',
    'cmObject',
    'cmModal',
    'cmUtil',
    'cmTranslate',
    'cmLogger',
    '$timeout',
    '$rootScope',
    '$sce',
    function(cmStateManagement, cmObject, cmModal, cmUtil, cmTranslate, cmLogger,
             $timeout, $rootScope, $sce){
        function cmNotifyModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['new','read','error']);

            this.label = undefined;
            this.severity = 'none';
            this.icon = undefined;
            this.displayType = undefined;
            this.callbackRoute = undefined;
            this.bell = false;
            this.ttl = -1;
            this.i18n = {};
            this.template = undefined
            this.templateScope = undefined

            /**
             * {
                label: undefined,
                severity: 'info',
                icon: 'cm-attention',
                displayType: 'modal',
                ttl: 3000,
                callbackRoute: undefined
            }
             * @param data
             */
            function init(data){
//                cmLogger.debug('cmNotifyModel.init');
                self.state.set('new');

                if(typeof data !== 'undefined'){
                    self.importData(data);
                }
            }

            this.importData = function(data){
//                cmLogger.debug('cmNotifyModel.importData');
//                
                if(typeof data == 'object') { //typeof never equals 'array': || typeof data == 'array'){
                    this.label = data.label || this.label;

                    this.severity = data.severity || this.severity;

                    this.icon = data.icon || this.icon;

                    this.displayType = data.displayType || this.displayType;

                    this.callbackRoute = data.callbackRoute || this.callbackRoute;

                    this.bell = data.bell || this.bell;

                    this.ttl = data.ttl || this.ttl;

                    this.i18n = data.i18n || this.i18n;

                    this.template = data.template || this.template

                    this.templateScope  = data.templateScope || this.templateScope
                } else {
                    this.state.set('error');
                }

                self.state.unset('new');
                this.trigger('update:finished');
            };

            this.render = function(){
//                cmLogger.debug('cmNotifyModel.render');
                if(this.bell !== false){
                    this.trigger('bell:ring');
                }

                if(this.displayType == 'modal'){
                    this.renderModal();
                }
            };

            this.renderModal = function() {
//                cmLogger.debug('cmNotifyModel.renderModal');
                var modalId = 'modal-notification-' + new Date().getTime();

                if (!this.templateScope)
                    this.templateScope = $rootScope.$new();

                angular.extend(this.templateScope, {
                    i18n: this.i18n
                });

                cmModal.create({
                        id: modalId,
                        type: 'alert',
                        'class': 'modal-notification modal-type-'+this.severity,
                        //'nose': 'top-right',
                        'cm-close-btn': true,
                        'cm-footer-label': 'MODAL.LABEL.CLOSE',
                        'cm-footer-icon': 'cm-close'
                    },
                        '<div class="header">'+
                            '<i class="fa '+this.icon+'"></i>' +
                            '{{\'NOTIFICATIONS.MODAL_HEADER.'+this.severity.toUpperCase()+'\'|cmTranslate}}'+
                        '</div>'+
                        '<div class="body">'+
                            '<div ng-bind-html="\''+this.label+'\'|cmTranslate:i18n"></div>'+
                            (this.template || '')+
                        '</div>',
                    null,
                    this.templateScope
                );
                cmModal.open(modalId);

                if(this.ttl > 0){
                    this.ttlTimeout = $timeout(function(){
                        cmModal.close(modalId);
                    }, this.ttl);
                }

                cmModal.on('modal:closed', function(){
                    if(self.ttlTimeout){
                        $timeout.cancel(self.ttlTimeout);
                    }
                    self.trigger('notify:remove', this);
                });
            };

            this.on('update:finished', function(){
//                cmLogger.debug('cmNotifyModel.on.update:finished');
                self.render();
            });

            // after events!!!
            this.on('init:ready', function(){
//                cmLogger.debug('cmNotifyModel.on.init:ready');
                init(data);
            });
        }

        return cmNotifyModel;
    }
])

.service('cmNotify', [
    'cmFactory',
    'cmNotifyModel',
    '$rootScope',
    function(cmFactory, cmNotifyModel, $rootScope){
        var self = new cmFactory(cmNotifyModel),
            notifyTpl = {
                label: undefined,
                severity: 'info',
                icon: 'cm-attention',
                displayType: undefined,
                ttl: 3000,
                bell: false,
                callbackRoute: undefined
            };

        self.bellCounter = 0;

        function handleAdapter(args){
            var notify = angular.extend({} ,notifyTpl);

            if(typeof args == 'object'){
                notify = angular.extend(notify, args);  
                self.create(notify);
            }
        }

        self.error = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0){
                if(typeof args == 'object'){
                    options = angular.extend(options, args);
                }

                options.displayType = 'modal';
                options.label = label;
                options.severity = 'error';
                options.icon = 'cm-reject';

                handleAdapter(options);
            }
        };

        self.info = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0){
                if(typeof args == 'object'){
                    options = angular.extend(options, args);
                }

                options.severity = 'info';
                options.label = label;
                options.icon = 'cm-info';

                handleAdapter(options);
            }
        };

        self.success = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0){
                if(typeof args == 'object'){
                    options = angular.extend(options, args);
                }

                options.severity = 'success';
                options.label = label;
                options.icon = 'cm-checker';

                handleAdapter(options);
            }
        };

        self.warn = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0) {
                if (typeof args == 'object') {
                    options = angular.extend(options, args);
                }

                options.displayType = 'modal';
                options.severity = 'warn';
                options.label = label;
                options.icon = 'cm-attention';

                handleAdapter(options);
            }
        };

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(){ self.reset() });

        $rootScope.$on('identity:switched', function(){ self.reset() });


        self.on('bell:ring', function(event, instance){
            self.bellCounter++;
        });

        self.on('notify:remove', function(event){
            self.deregister(event.source);
        });

        return self;
    }
])
//This Module handels api calls

.provider('cmApi',[

//Service to handle all api calls

    function($injector){
        var rest_api    = "",
            call_stack_disabled = true,
            call_stack_path = "",
            commit_size = 10,
            commit_interval = 2000,
            events_disabled = true,
            events_path = "",
            events_interval = 5000

        this.restApiUrl = function(url){
            rest_api = url;
            return this
        }

        this.useCallStack = function (on){
            call_stack_disabled = !on
            return this
        }

        this.callStackPath = function(path){
            call_stack_path = path
            return this
        }

        this.commitSize = function(size){
            commit_size = size
            return this
        }

        this.commitInterval = function(interval){
            commit_interval = interval
            return this
        }

        this.useEvents = function (on){
            events_disabled = !on
            return this
        }

        this.eventsPath = function(path){
            events_path = path
            return this
        }

        this.eventsInterval = function(interval){
            events_interval = interval
            return this
        }


        this.$get = [

            'cmLogger',
            'cmObject',
            '$http',
            '$httpBackend',
            '$injector',
            '$q',
            '$interval',
            '$cacheFactory',
            '$rootScope',

            function(cmLogger, cmObject, $http, $httpBackend, $injector, $q, $interval, $cacheFactory, $rootScope){
                /***
                 All api calls require a config object:

                 ie.: api.get(config)

                 config works almost like in $http(config)

                 most important keys are:
                 path:	api path to call i.e. '/account/check',
                 will give an error message if passed something different from a path (like 'http://dev.cameo.io/...')
                 in that case your call will most likely fail brutally

                 data:	data to send, any plain object

                 exp_ko: key you expect in response body if your request was granted(see below)
                 exp_ok: key you expect in response body if your request was denied (see below)


                 Authentication and error handling is dealt with automatically.


                 example: (!!check tests in cmApi.spec.js!!)

                 cmApi.get({
                    path:     '/pony',
                    exp_ok:  'pony',
                })''


                 ---> response:  {
                                    "res" : 'OK',
                                    "data": {
                                                "pony" : "my_new_pony"
                                            }
                                }

                 .then(
                 function(pony){         <--- gets called because response.res == 'OK', pony will equal 'my_pony'
                        yay(pony)
                    },

                 function(alternative, res){
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have already been handled alesewhere
                    }
                 )


                 ---> response:  {
                                    "res" : 'OK',
                                    "data": {
                                                "dog" : "my_new_dog"
                                            }
                                }

                 .then(
                 function(pony){
                        yay(pony)
                    },
                 function(alternative,res){	<--- gets called because response is invalid, "pony" was expected, yet "dog" was delivered
                                                     alternative will be undefined
                                                     res however holds all the response
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have been handled already elesewhere
                    }
                 )




                 ---> response:	{
                                    "res" : 'KO',
                                    "data": {
                                                "alternative" : "kitty"
                                            }
                                }

                 .then(
                 function(pony){
                        yay(pony)
                    },
                 function(data, res){ <--- gets called because response.res == 'KO', data will be {'alternative': 'kitty'},
                                              because there was no specific key expected for KO.
                                              res however holds all the response
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have been handled already elesewhere
                    }
                 )




                 ---> response:	{
                                    "res" : 'XXX',
                                    "data": {
                                                "kitty" : "grumpy cat"
                                            }
                                }

                 .then(
                 function(pony){
                        yay(pony)
                    },
                 function(alternative,res){ <--- gets called because response is invalid for neither response.res == 'OK' nor response.res == 'KO',
                                                    alternative will be undefined
                                                    res however holds all the response
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have been handled already elesewhere
                    }
                 )



                 */

                    //check if the sever's response complies with the api conventions
                function compliesWithApiConventions(body, exp_ok, exp_ko){
                    var valid =    body
                        //response must have a res key that equals 'OK' or 'KO':
                        && (body.res == 'OK' || body.res == 'KO')
                        //if your request was granted and something was expected in return, it must be present:
                        && (body.res == "OK" && exp_ok ? exp_ok in body.data : true)
                        //if your request was denied and something was expected in return, it must be present:
                        && (body.res == "KO" && exp_ko ? exp_ko in body.data : true)

                    if(!valid) cmLogger.error('Api response invalid; '+(exp_ok||exp_ko ? 'expected: ':'') + (exp_ok||'') +', '+(exp_ko||''), body)

                    return(valid)
                }

                function handleSuccess(response, deferred){
                    //$http call was successfull

                    var config  = response.config,
                        body    = response.data

                    compliesWithApiConventions(body, config.exp_ok, config.exp_ko)
                        ?   //response valid, check if OK:
                        //if a certain key was expected, resolve promise resp. reject the promise with the according values
                        //if nothing was expected, just resolve or reject with value of 'data' in the response body if present or all the data
                        //response should now look similar to this:
                        /*
                         "res":  "OK",
                         "data": {
                         "some_key":             "some_value",
                         "some expected_key":    "some_other value"
                         }

                         */
                            body.res =='OK'
                        ? deferred.resolve( config.exp_ok ? body.data[config.exp_ok] : body.data || response)
                        : deferred.reject(  config.exp_ko ? body.data[config.exp_ko] : body.data || response)

                        :   //response invalid, call through:
                        deferred.reject(undefined, response)
                }


                function handleError(response, deferred){
                    cmLogger.error('Api call failed: \n '+response.config.method+' '+JSON.stringify(response, null, 2))
//                    window.location.href='#/server_down' //@ Todo
                    //error messages should come trough backend
                    deferred.reject(response)
                }

                function prepareConfig(config, method, token, twoFactorToken){

                    config.url      =   config.url ||
                        (
                            rest_api +      // base url API
                            config.path     // path to specific method
                            )
                    config.method   =   method || config.method
                    config.headers  =   angular.extend(token           ? {'Authorization': token} : {}, config.headers || {})   //add authorization token to the header
                    config.headers  =   angular.extend(twoFactorToken  ? {'X-TwoFactorToken': twoFactorToken} : {}, config.headers || {})   //add two factor authorization token to the header
                }


                var api = function(method, config){
                    var deferred = $q.defer(),
                        token    = undefined,
                    //get twoFactorAuth token from cmAuth if present
                        twoFactorToken = $injector.has('cmAuth')
                            ?	$injector.get('cmAuth').getTwoFactorToken()
                            :	undefined;

                    //get authentification token from config if override of from cmAuth if present
                    if('overrideToken' in config && config.overrideToken != ''){
                        token = config.overrideToken;
                        delete config.overrideToken;
                    } else if($injector.has('cmAuth')){
                        token = $injector.get('cmAuth').getToken();
                    }

                    prepareConfig(config, method, token, twoFactorToken);

                    $http(config).then(
                        function(response){ handleSuccess(response, deferred) },
                        function(response){ handleError(response, deferred) }
                    );

                    return deferred.promise;
                };

                /**
                 * Shortcuts for api()
                 * @param {Object}  config  config object as used by api()
                 * @param {Boolean}         force direct api call not using the callstack
                 */

                api.get		= function(config, force){ return (force || call_stack_disabled) ? api('GET',	 config) : api.stack('GET',    config) }
                api.post	= function(config, force){ return (force || call_stack_disabled) ? api('POST',   config) : api.stack('POST',   config) }
                api.delete	= function(config, force){ return (force || call_stack_disabled) ? api('DELETE', config) : api.stack('DELETE', config) }
                api.head	= function(config, force){ return (force || call_stack_disabled) ? api('HEAD',   config) : api.stack('HEAD',   config) }
                api.put		= function(config, force){ return (force || call_stack_disabled) ? api('PUT',    config) : api.stack('PUT',    config) }
                api.jsonp	= function(config, force){ return (force || call_stack_disabled) ? api('JSONP',  config) : api.stack('JSONP',  config) }


                // binary mock
                api.getBinary = function(config){
                    var deferred = $q.defer(),
                        token = $injector.has('cmAuth') ? $injector.get('cmAuth').getToken() : undefined;

                    prepareConfig(config, 'GET', token);
                    // assume binary as blob
//                    config.responseType = 'blob';

                    $http(config).then(
                        function(response){
                            deferred.resolve(response.data)
                        },
                        function(response){
                            deferred.reject(response)
                        }
                    );

                    return deferred.promise
                };

                api.postBinary = function(config){
                    var deferred = $q.defer(),
                        token = $injector.has('cmAuth') ? $injector.get('cmAuth').getToken() : undefined;
                    prepareConfig(config, 'POST', token);

                    $http(config).then(
                        function(response){
                            deferred.resolve(response.data)
                        },
                        function(response){
                            deferred.reject(response)
                        }
                    );

                    return deferred.promise
                };


                //CALL STACK:

                api.call_stack = api.call_stack || []
                api.call_stack_cache = $cacheFactory('call_stack_cache')


                //Puts a requests on the call stack
                api.stack = function(method, config){

                    if(call_stack_disabled){
                        cmLogger.error('unable to call ".stack()", callstack disabled.')
                        return null
                    }


                    prepareConfig(config, method)

                    var deferred = $q.defer()

                    api.call_stack.push({
                        deferred : deferred,
                        config   : config
                    })

                    return deferred.promise
                }


                // Commits all requests on callstack to the API
                api.commit = function(){

                    //dont do anything, if call stack is empty:
                    if(api.call_stack.length == 0) return null

                    var items_to_commit = [],
                        configs         = []

                    //pick items from callstack to commit:
                    api.call_stack.forEach(function(item, index){
                        if(items_to_commit.length < commit_size){
                            items_to_commit.push(item)
                            delete api.call_stack[index]
                        }
                    })

                    //remove undefined elements from call_stack:
                    var index = api.call_stack.length
                    while(index--){ if(!api.call_stack[index]) api.call_stack.splice(index,1) }

                    //prepare request configs:
                    items_to_commit.forEach(function(item, index){ configs.push(item.config) })

                    //post requests to call stack api:
                    api.post({
                        path: call_stack_path,
                        data: { requests: configs },
                        exp_ok : 'responses'
                    }, true)
                        .then(function(responses){

                            responses.forEach(function(request, index){

                                var response =  {
                                        data   : responses[index].body,
                                        status : responses[index].status,
                                        config : items_to_commit[index].config,
                                    },

                                    deferred = items_to_commit[index].deferred

                                200 <= response.status && response.status < 300
                                    ?   handleSuccess(response, deferred)
                                    :   handleError(response, deferred)

                            })
                        })

                }

                if(!call_stack_disabled && commit_interval) $interval(function(){ api.commit() }, commit_interval, false)



                //API EVENTS:

                cmObject.addEventHandlingTo(api)
                api.subscriptionId = undefined

                api.resetSubscriptionId = function(){
                    api.subscriptionId = undefined
                    window._eventSubscriptionId = undefined
                }

                api.subscribeToEventStream = function(){
                    return  api.post({
                        path: events_path,
                        exp_ok: 'id',
                        data:{
                            secret: 'b4plIJMNITRDeJ9vl0JG' //only working on dev
                        }
                    }, true)
                    .then(function(id){
                        api.subscriptionId = id
                        window._eventSubscriptionId = id
                    })
                }

                api.getEvents = function(force){
                    if(!api.subscriptionId){

                        //if no subscriptionId is present, get one and try again later:
                        api.subscribeToEventStream()
                        .then(function(){
                            api.getEvents()
                        })

                    }else{
                        api.get({
                            path: events_path + '/' + api.subscriptionId,
                            exp_ok: 'events'
                        }, force)
                            .then(
                            function(events){
                                events.forEach(function(event){
                                    cmLogger.debug('Backend event: '+event.name)
                                    api.trigger(event.name, event.data, event)
                                })
                            },
                            function(){
                                //Todo: Alle Daten updaten// reload ?
                                api.resetSubscriptionId()
                                cmLogger.debug('cmApi.getEvents() reset invalid subscriptionId.')
                            }
                        )
                    }
                }

                api.listenToEvents = function(){
                    //Dont listen to Events twice: 
                    api.stopListeningToEvents()
                    //Start listening:
                    if(!events_disabled && events_interval) {
//                        api.getEvents(false)
                        api._events_promise = $interval(function () {
                            api.getEvents(false)
                        }, events_interval, 0, false)
                    }
                }

                api.stopListeningToEvents = function(){
                    if(api._events_promise) $interval.cancel(api._events_promise)
                }


                if(!events_disabled && events_interval){
                    $rootScope.$on('login',     function(){
                        api.resetSubscriptionId()
                        api.listenToEvents()

                    })
                    $rootScope.$on('logout',    function(){
                        api.stopListeningToEvents()
                        api.resetSubscriptionId()
                    })
                }

                /**
                 * @ngdoc method
                 * @methodOf cmAuth
                 *
                 * @name sendBroadcast
                 * @description
                 * post a broadcast event to own devices
                 *
                 * @param {Object} data event data
                 * @returns {Promise} for async handling
                 */
                api.broadcast = function(data, identityId){
                    return api.post({
                        path: '/event/broadcast' + (identityId ? '/identity/' + identityId : ''),
                        data: data
                    });
                }
                

                return api
            }
        ]
    }
])

.provider('cmCallbackQueue', [

    function(){

        var queueTime = 250

        this.setQueueTime = function(time){
            queueTime = time
        }

        this.$get = [

            'cmObject',
            'cmStateManagement',
            'cmLogger',
            '$rootScope',
            '$timeout',
            '$q',

            function(cmObject, cmStateManagement, cmLogger, $rootScope, $timeout, $q){
                cmObject.addEventHandlingTo(this);

                var self    = this,
                    queue   = [];

                $rootScope.$on('logout', function(){
                    queue   = [];
                });

                this.state = new cmStateManagement(['working'])

                this.push = function(callbacks, timeout){

                    if(!(callbacks instanceof Array)) 
                        callbacks = [callbacks]

                    var promise = $q.all(
                        callbacks.map(function(callback){
                            var deferred = $q.defer()

                            queue.push({fn: callback, deferred: deferred})

                            return deferred.promise
                        })
                    )

                    if(!self.state.is('working')){
                        self.state.set('working')
                        $timeout(self.advance, timeout || 0)
                    }

                    return promise
                }

                this.advance = function(){
                    var callback = queue.shift()
                
                    if(callback && callback.fn && callback.deferred){
                        try{                            
                            callback.deferred.resolve(callback.fn())  
                        } catch(e) {
                            cmLogger.error('cmCallbackQueue cought an error: \n'+e)
                            callback.deferred.reject(e)
                        }
                    }
                    
                    if(queue.length != 0){
                        $timeout(self.advance, queueTime)
                    } else {
                        self.state.unset('working')
                    }



                }

                return this
            }
        ]
    }
])
.provider('cmLogger', [
    '$logProvider',
    function($logProvider){
        var debug_enabled = true;

        this.debugEnabled = function(flag){
            $logProvider.debugEnabled(flag);
            debug_enabled = flag;
        };

        this.$get = [
            '$log',
            function($log){
            /**
            * Format date as a string
            */
            function getTimestampAsString() {
                var d = (new Date()+'').split(' ');
                return [d[3], d[1], d[2], d[4]].join(' ');
            }

            function prefix(type, msg) {
                return getTimestampAsString() + " [cmLogger-"+type.toUpperCase()+"]> "  + msg;
            }

            function log_object(obj) {
                console.groupCollapsed(obj);
                console.dir(obj);
                console.groupEnd();
            }

            return {
                universal: function(type, loggerMessage, object) {
                    $log[type](prefix(type, loggerMessage))
                    if(object) log_object(object)
                },

                 /**
                 * simple info log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                info: function(loggerMessage, object){ this.universal('info', loggerMessage, object) },
                /**
                 * simple warn log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                warn: function(loggerMessage, object){ this.universal('warn', loggerMessage, object) },
                /**
                 * simple error log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                error: function(loggerMessage, object){ this.universal('error', loggerMessage, object) },
                /**
                 * simple debug log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                debug: function(loggerMessage, object){
                    if(!debug_enabled) return(undefined)
                    this.universal('debug', loggerMessage, object)
                }
            }
        }];
    }
])
/**
 * @ngdoc service
 * @name cmAuth
 * @description
 * beschreibung cmAuth
 *
 * @requires cmApi
 * @requires localStorage TODO: implement ServiceLocalStorage
 */

.service('cmAuth', [
    'cmApi','LocalStorageAdapter', 'cmObject', 'cmUtil', 'cmLogger', 'cmCrypt' ,'$rootScope',
    function(cmApi, LocalStorageAdapter, cmObject, cmUtil, cmLogger, cmCrypt, $rootScope){
        var _TOKEN_ = undefined;
        var auth = {
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name requestToken
             * @description
             * Ask the api for a new authentication token
             *
             * @param {String} login Loginname of user
             * @param {String} pass Password of user
             * @returns {Promise} for async handling
             */
            requestToken: function(login, pass){
                var auth = cmCrypt.base64Encode(login + ":" + pass);

                return cmApi.get({
                    path: '/token',
                    headers: { 'Authorization': 'Basic '+auth } ,
                    exp_ok: 'token'
                }, true)
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name removeToken
             * @description
             * Delete token from localstorage
             *
             * @returns {Boolean} for removing succeed
             */
            removeToken: function(where){
                //cmLogger.debug('cmAuth.removeToken');

                _TOKEN_ = undefined;
                try {
                    return LocalStorageAdapter.remove('token');
                } catch (e){
                    cmLogger.warn('cmAuth.removeToken - Local Storage Error')
                }
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name storeToken
             * @description
             * Store the token in localstorage
             *
             * @param {String} token From Api given token
             * @param {Boolean} froce Force storeToken
             * @returns {Boolean} for setting succeed
             */
            storeToken: function(token, force){
                //cmLogger.debug('cmAuth.storeToken');

                if(typeof force != 'undefined' && force == true){
                    _TOKEN_ = token;
                    return LocalStorageAdapter.save('token', token);
                } else {
                    if(_TOKEN_ == undefined || _TOKEN_ == token){
                        _TOKEN_ = token;

                        var moep;
                        try {
                            moep = LocalStorageAdapter.save('token', token);
                        } catch(e){
                            cmLogger.warn('cmAuth.storeToken - Local Storage Error')
                        }

                        //return localStorage.setItem('token', token)/
                        return moep;
                    } else if(_TOKEN_ != token) {
                        cmLogger.debug('cmAuth.storeToken - Error - validateToken is different')
                    }
                }
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getToken
             * @description
             * Retrieve the token from localstorage
             *
             * @returns {String} Token
             */
            getToken: function(){
                //cmLogger.debug('cmAuth.getToken')

                var token;

                try {
                    token = LocalStorageAdapter.get('token');

                    if(token !== undefined && token !== 'undefined' && token !== null && token.length > 0){
                        if(_TOKEN_ != undefined && _TOKEN_ != token){
                            $rootScope.$broadcast('logout',{where: 'cmAuth getToken failure'});
                            cmLogger.debug('cmAuth.storeToken - Error - validateToken is different');

                            return false;
                        }
                    } else {
                        if(_TOKEN_ != undefined){
                            this.storeToken(_TOKEN_);
                            token = _TOKEN_;
                        }
                    }
                } catch (e){
                    cmLogger.warn('cmAuth.getToken - Local Storage Error')
                }

                return token;
            },

            getIdentityToken: function(identityId){
                return cmApi.get({
                    path: '/identity/'+identityId+'/token'
                })
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name createUser
             * @description
             * Create a user in database. Used by registration.
             *
             * @param {Object} data Compared object with userdata
             * @returns {Promise} for async handling
             */
            createUser: function(data){
                return cmApi.post({
                    path: '/account',
                    data: data
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name checkAccountName
             * @description
             * Check in registration if the Username still not exists.
             *
             * @param {String} name Given username to check
             * @param {String} reservationSecret From api given token for Username
             * @returns {Promise} for async handling
             */
            checkAccountName: function(name, reservationSecret){
                return cmApi.post({
                    path: '/account/check',
                    data: {
                        loginName: name,
                        reservationSecret: reservationSecret
                    }
    //                exp_ok: 'reservationSecret',
    //                exp_ko: 'alternative'
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name checkPhoneNumber
             * @description
             * Check if the given phonenumber is a valid one.
             *
             * @param {String} number Given phonenumber for validation
             * @returns {Promise} for async handling
             */
            checkPhoneNumber: function(number){
                return cmApi.post({
                    path: '/services/checkPhoneNumber',
                    data: { phoneNumber:number },
                    exp_ok: 'phoneNumber'
                })
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name checkMixed
             * @description
             * Check if the given string is either a valid phone number or a valid e-mail address
             *
             * @param {String} string to validate
             * @returns {Promise} for async handling
             */

            checkMixed: function(mixed) {
                return cmApi.post({
                    path: '/services/checkMixed',
                    data: { mixed:mixed }
                })
            },

            getAccount: function(){
                return cmApi.get({
                    path: '/account'
                })
            },

            putAccount: function(data){
                return cmApi.put({
                    path: '/account',
                    data: data
                })
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getIdentity
             * @description
             * Get an identity from api
             *
             * @param {String} id Identity id for cmIdentityModel
             * @returns {Promise} async handling
             */
            getIdentity: function(id){
                return cmApi.get({
                    path: '/identity'+ (id ? '/'+id : '')
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name updateIdentity
             * @description
             * Update own Identity
             *
             * @param {Object} data Identity Parameter
             * @returns {Promise} async handling
             */
            updateIdentity: function(data){
                return cmApi.put({
                    path: '/identity',
                    data: data
                })
            },

            addIdentity: function(data){
                return cmApi.post({
                    path: '/identity',
                    data: data
                })
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name savePublicKey
             * @description
             * saved a identity public key
             *
             * @param {Object} data Object with name, key & keySize
             * @returns {Promise} for async handling
             */
            savePublicKey: function(data){
                return cmApi.post({
                    path: '/publicKey',
                    data: {
                        name: data.name,
                        key: data.key,
                        keySize: parseInt(data.keySize)
                    }
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name removePublicKey
             * @description
             * removed a identity public key
             *
             * @param {String} keyId id of public key
             * @returns {Promise} for async handling
             */
            removePublicKey: function(keyId){
                return cmApi.delete({
                    path: '/publicKey/'+keyId
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name savePublicKeySignature
             * @description
             * save a signature to a public key
             *
             * @param {String} keyId id of local key
             * @param {String} signKeyId id of signed key
             * @param {String} signature signature
             * @returns {Promise} for async handling
             */
            savePublicKeySignature: function(localKeyId, signKeyId, signature){
                return cmApi.post({
                    path: '/publicKey/' + signKeyId + '/signature',
                    data: {
                        keyId: localKeyId,
                        content: signature
                    }
                });
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getBulkPassphrases
             * @description
             * get aePassphraseList for reKeying
             *
             * @param {String} keyId id of local key
             * @param {String} newKeyId id of new public key
             * @param {Integer} limit maximum answers in list
             * @returns {Promise} for async handling
             */
            getBulkPassphrases: function(keyId, newKeyId, limit){
                var queryString = cmUtil.handleLimitOffset(limit);

                if(queryString == ''){
                    queryString += '?newKeyId=' + newKeyId;
                } else {
                    queryString += '&newKeyId=' + newKeyId;
                }

                return cmApi.get({
                    path: '/publicKey/'+ keyId +'/aePassphrases' + queryString
                });
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name saveBulkPassphrases
             * @description
             * post new aePassphraseList for conversation
             *
             * @param {String} keyId id of public key
             * @param {Object} data new asymmetric encrypted passphrases
             * @returns {Promise} for async handling
             */
            saveBulkPassphrases: function(keyId, data){
                return cmApi.post({
                    path: '/publicKey/'+ keyId +'/aePassphrases',
                    data: data
                });
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name requestTwoFactorKey
             * @description
             * Two factor authentication
             *
             * @returns {Promise} for async handling
             */
            requestTwoFactorKey: function() {
                return cmApi.get({
                    path: '/twoFactorAuth'
                }, true)
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name requestTwoFactorToken
             * @description
             * Ask the api for a new authentication token
             *
             * @param {String} key Token for authentication
             * @returns {Promise} for async handling
             */
            requestTwoFactorToken: function(key){
                return cmApi.post({
                    path: '/twoFactorAuth/confirm',
                    data: { key: key },
                    exp_ok: "token"
                }, true)
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name removeTwoFactorToken
             * @description
             * Delete two factor token from localstorage
             *
             * @returns {Boolean} for removing succeed
             */
            removeTwoFactorToken: function(){
                return localStorage.removeItem('twoFactorToken');
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name storeTwoFactorToken
             * @description
             * Store the token in localstorage
             *
             * @param {String} twoFactorToken Token to store
             * @returns {Boolean} for setting succeed
             */
            storeTwoFactorToken: function(twoFactorToken){
                return localStorage.setItem('twoFactorToken', twoFactorToken);
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getTwoFactorToken
             * @description
             * Retrieve thr token from localstorage
             *
             * @returns {String} twoFactorToken
             */
            getTwoFactorToken: function(){
                return localStorage.getItem('twoFactorToken');
            },


        };

        cmObject.addEventHandlingTo(auth);

        cmApi.on('identity:update', function (event, data){
//            console.log('cmAuth.on:identity:update')
            auth.trigger('identity:updated', data)
        });

        cmApi.on('signatures:updated', function(event, data){
//            console.log('cmAuth.on:signatures:updated')
            auth.trigger('signatures:updated', data)
        });

        cmApi.on('conversation:new-aePassphrase', function(event, data){
           //console.log('conversation:new-aePassphrase');
            auth.trigger('conversation:update', data)
        });


        return auth;
    }
])
/**
 * @ngdoc service
 * @name cmAuthenticationRequest
 * @description
 * Handels authentication requests
 *
 * @requires cmApi
 * @requires localStorage TODO: implement ServiceLocalStorage
 */

.service('cmAuthenticationRequest', [

    'cmApi',
    'cmObject', 
    'cmLogger', 
    'cmCrypt', 
    'cmUserModel',
    'cmIdentityFactory',
    'cmModal',
    'cmCallbackQueue',
    '$rootScope',
    '$q',

    function(cmApi, cmObject, cmLogger, cmCrypt, cmUserModel, cmIdentityFactory, cmModal, cmCallbackQueue, $rootScope, $q){

        var self = {
            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name generateTransactionSecrete
             * @description
             * Generates a transaction seceret valid for a limited time
             */

            generateTransactionSecret: function(ttl){
                this.transactionSecret =    {
                                                content:    cmCrypt.generatePassword(8),
                                                expires:    new Date().getTime() + (ttl || 60000) 
                                            }
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name getTransactionSecret
             * @description
             * Retrieves the transaction secret or null if expired
             *
             *  @return {* | null} transaction secret or null if expired
             */
            
            getTransactionSecret: function(){
                return  this.transactionSecret && (new Date().getTime() < this.transactionSecret.expires)
                        ?   this.transactionSecret.content
                        :   null
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name getTTL
             * @description
             * Retrieves time to the expireation of the transaction secret
             *
             *  @return {Number} Time to expiration of transaction secret in milliseconds or 0, whatever ist greater
             */
            getTTL: function(){
                  return    (
                                    this.transactionSecret 
                                &&  Math.max(0, this.transactionSecret.expires - (new Date().getTime()))
                            )   ||  0
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name send
             * @description
             * Sends an Authentication Request to all devices of an identity
             *
             * @param {toIdentity} 
             * @param {secret} 
             * @param {fromkey} 
             * @returns {Promise} for async handling
             */
            send: function(toIdentityId, secret, toKeyId, fromKeyId){
                var fromIdentity    =   cmUserModel.data.identity,
                    fromKey         =   cmUserModel.loadLocalKeys().find(fromKeyId) || cmUserModel.loadLocalKeys()[0],
                    salt            =   cmCrypt.generatePassword(32)

                    

                return  cmCallbackQueue
                        .push(function(){
                            return  cmCrypt.hashObject({
                                        transactionSecret:  secret,
                                        cameoId:            fromIdentity.cameoId,
                                        salt:               salt
                                    })
                        },100)  // Leave the browser a tiny bit of time to breathe
                        .then(function(result){
                            return  cmCallbackQueue.push(function(){

                                        // if succesful result[0] contains hashed data returned by cmCrypt.hashObject
                                        return fromKey.sign(result[0])   

                                    }, 100) // Leave the browser a tiny bit of time to breathe
                        })
                        .then(function(result){

                            // if succesful result[0] contains the signature returned by fromKey.sign
                            return cmApi.broadcast({
                                    name:   'authenticationRequest:start',
                                    data:   {
                                                fromKeyId:      fromKey.id,
                                                fromIdentityId: fromIdentity.id,
                                                toKeyId:        toKeyId, // may be undefined
                                                salt:           salt,
                                                signature:      result[0],  
                                            }
                                }, toIdentityId)

                        })
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name  cancel
             * @description
             * Cancels an Authentication Request on all devices of an identity
             *
             * @param {String} [signature]  The signature sent with the authenticationRequest that should be canceled
             * @returns {Promise}           Promise that will be resolved after the event is posted to the backend.
             */

            cancel: function(toIdentityId){
                if(!typeof toIdentityId == 'string'){
                    cmLogger.debug('cmAuthenticationRequest: cancel() toIdentityId must be string.')
                    return false
                }
                
                self.trigger('canceled')
                delete this.transactionSecret


                return  cmApi.broadcast({
                            name:   'authenticationRequest:cancel',
                            data:   {}
                        }, toIdentityId)
            },


            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name verify
             * @description
             * Verifies an Authentication Request
             *
             * @param {request} 
             * @returns {Boolean} wether or not the request is valid
             */
            verify: function(request, secret){

                var fromIdentity    =   cmIdentityFactory.find(request.fromIdentityId),
                    hashed_data     =   cmCrypt.hashObject({
                                            transactionSecret:  secret,
                                            cameoId:            fromIdentity.cameoId,
                                            salt:               request.salt
                                        }),
                    fromKey         =   fromIdentity.keys.find(request.fromKeyId)


                return  fromKey.verify(hashed_data, request.signature)
                        .then(function(result){
                            result
                            ?   self.trigger('verification:successful', {
                                    identity:           fromIdentity,
                                    key:                fromKey,
                                    transactionSecret:  secret,
                                })
                            :   self.trigger('verification:failed')

                            return $q.when(result)
                        })
            },

            //Todo: maybe find a more suitabble place for this function:
            openBulkRequest: function(data){

                if(typeof data == 'object' && 'key1' in data && 'key2' in data){
                    var scope = $rootScope.$new();l
                    scope.data = data;

                    var modalId = 'bulk-rekeying-modal';
                    cmModal.create({
                        id: modalId,
                        type: 'plain',
                        'class': 'no-padding',
                        'cm-title': 'DRTV.BULK_REKEYING.HEADER'
                    },'<cm-bulk-rekeying-request></cm-bulk-rekeying-request>',null,scope);

                    cmModal.open(modalId);

                    cmUserModel.one('bulkrekeying:finished',function(){
                        $rootScope.closeModal('bulk-rekeying-modal');
                    })
                }
            }
        }

        cmObject.addEventHandlingTo(self)


        /**
         * Listen to Api events. When a start event occurs, check wether it is relevant for the current user.
         * If so trigger a local event in cmAuthenticationRequest.
         */

        cmApi.on('authenticationRequest:start', function(event, request){

            var local_keys = cmUserModel.loadLocalKeys()

            // If there are no local keys, there's nothing to authenticate with:
            if(local_keys.length == 0 ){
                cmLogger.debug('cmAuthenticationRequest: received request, but no local keys present.')
                return false // do not remove event binding
            }


            // There is no need to authenticate local keys:
            if(local_keys.find(request.fromKeyId)){
                cmLogger.debug('cmAuthenticationRequest: received request, but key to be signed is local.')
                return false // do not remove event binding
            }
            

            // If a certain key was expected to sign, but that key is not present on this device, dont prompt the user:
            if(request.toKeyId && !local_keys.find(request.toKeyId)){
                cmLogger.debug('cmAuthenticationRequest: received request, but requested private key to sign with is not present.')
                return false // do not remove event binding
            }

            var fromIdentity = cmIdentityFactory.find(event.fromIdentityId)

            if(!fromIdentity){
                cmLogger.debug('cmAuthenticationRequest: received request, but sender is unknown.')
                return false // do not remove event binding
            }

            //If we dont know the key to sign:
            if(!fromIdentity.keys.find(request.fromKeyId)){
                cmLogger.debug('cmAuthenticationRequest: received request, key to be signed not at the proper identity.')
                return false // do not remove event binding
            }

            self.trigger('started', request)
        })


        /**
         * Listen to Api events. When a cancel event occurs, force sender into data object and trigger local event.
         * It is important to know the sender so that 3rd party identities cannot cancel your events. 
         */
        cmApi.on('authenticationRequest:cancel', function(event, data){
            data = data || {}
            data.fromIdentityId = event.fromIdentityId
            self.trigger('canceled', data)
        })

        /**
         * Listen to events on cmAuthenticationRequest.
         */

        self.on('started', function(event, request){

            //Prevent other authentication requests to interfere with an ongoing process:
            var modal = cmModal.instances['incoming-authentication-request']

            if(modal && modal.isActive()){
                // If request comes from the same origin as the ongoing request then update:
                if(modal.request.fromIdentityId == request.fromIdentityId)
                    modal.request = request
                
                return false // do not remove event binding
            }


            // Close other authentication request related modals:
            cmModal.close('authentication-request-successful')
            cmModal.close('authentication-request-canceled')


            var transactionSecret = self.getTransactionSecret()


            // If we already know the transaction secret, there is no need to prompt the user:
            if(transactionSecret){
                cmCallbackQueue.push(function(){
                    self.verify(request, transactionSecret)
                })
                return false // do not remove event binding
            }


            /** Use a modal from here on **/


            // new scope for a modal to open below
            var modal_scope   =   $rootScope.$new(),
                is3rdParty    =   request.fromIdentityId != cmUserModel.data.identity.id,
                fromIdentity  =   cmIdentityFactory.find(request.fromIdentityId),
                fromKey       =   fromIdentity.keys.find(request.fromKeyId)


            
            modal_scope.error   =   {}    
            modal_scope.request =   request     //stored for later use, if another authentication request with the same origin occurs

            modal_scope.verify  =   function(secret){
                                        var scope = this
                                        scope.error.emptyInput    = !secret
                                        scope.error.wrongSecret   = !scope.error.emptyInput && !self.verify(scope.request, secret)

                                        $q.reject()
                                        .catch(function(){
                                            return  scope.error.emptyInput
                                                    ?   $q.reject('empty input.')
                                                    :   self.verify(scope.request, secret)
                                        })
                                        .catch(function(error){
                                            scope.error.wrongSecret = true
                                            return $q.reject('verification failed.')
                                        })
                                        .then(function(){

                                            // Modal is no longer needed:
                                            cmModal.close('incoming-authentication-request')



                                            // Double check and make sure that only the key gets signed that was actually verified above:
                                            // Also: We need variables, because scope gets destroyed once the modal is closed.
                                            var fromIdentity    =   cmIdentityFactory.find(scope.request.fromIdentityId),
                                                fromKey         =   fromIdentity.keys.find(scope.request.fromKeyId),
                                                is3rdParty      =   fromIdentity != cmUserModel.data.identity,
                                                toKey           =   (
                                                                            scope.request.toKeyId 
                                                                        &&  cmUserModel.loadLocalKeys().find(scope.request.toKeyId)
                                                                    )   
                                                                    ||  cmUserModel.loadLocalKeys()[0]
                                                                    

                                            return      fromIdentity    == scope.fromIdentity
                                                    &&  fromKey         == scope.fromKey

                                                    ?   cmUserModel.signPublicKey(fromKey, fromKey.id, fromIdentity)
                                                        .then(function(){
                                                            return  $q.when({
                                                                        fromIdentity:   fromIdentity,
                                                                        fromKey:        fromKey,
                                                                        toKey:          toKey,
                                                                        secret:         secret
                                                                    })
                                                        })
                                                    :   $q.reject('double check failed.')
                                                    
                                        })
                                        .then(function(data){

                                            if(is3rdParty === false){

                                                /*
                                                // Open modal for bulk rekeying:
                                                self.openBulkRequest({
                                                    key1: toKey.id,
                                                    key2: fromKey.id
                                                })
                                                */

                                                cmUserModel.bulkReKeying(data.toKey.id, data.fromKey.id)

                                                
                                            }else{

                                                /*
                                                // Open success Modal:
                                                cmModal.create({
                                                    id:             'authentication-request-successful',
                                                    type:           'alert',
                                                    'cm-close-btn': false,
                                                },  
                                                    is3rdParty
                                                    ?   '{{"IDENTITY.KEYS.TRUST.MODAL.SUCCESS"|cmTranslate}}'
                                                    :   '{{"IDENTITY.KEYS.AUTHENTICATION.MODAL.SUCCESS"|cmTranslate}}'
                                                )

                                                cmModal.open('authentication-request-successful')
                                                */
                                            }

                                            //Send a request in return:
                                            self.send(
                                                data.fromIdentity.id,    //Sender of the initial requests
                                                data.secret,             //The secret we successfully used during the last attempt
                                                data.fromKey.id          //The key that originally requested to be signed
                                            )                                                
                                        })
                                    }
            cmModal.create({
                id:             'incoming-authentication-request',
                type:           'plain',
                'class':        'no-padding',
                'cm-close-btn': false,
                'cm-title':     is3rdParty
                                ?   'IDENTITY.KEYS.TRUST.ENTER_TRANSACTION_SECRET.HEADER'
                                :   'IDENTITY.KEYS.AUTHENTICATION.ENTER_TRANSACTION_SECRET.HEADER'
            },'<cm-incoming-authentication-request></cm-incoming-authentication-request>', null, modal_scope)

            cmModal.open('incoming-authentication-request')

            /**
             * Listen to local events. Wait for a cancel event to close the Modal.
             */


            self.one('canceled', function(event, data){
                var modal = cmModal.instances['incoming-authentication-request']

                // If some other authentication request is meant to be canceled:
                if(modal && modal.request.fromIdentityId != data.fromIdentityId){
                    cmLogger.debug('cmAuthenticationRequest, received cancel event, but with different origin or inactive modal.')
                    return false    // dont remove the event binding
                }

                // Only show the cancelation modal if a authentication modal was actually present:
                if(modal && modal.isActive()){
                    cmModal.close('incoming-authentication-request')

                    cmModal.create({
                        id:             'authentication-request-canceled',
                        type:           'alert',
                        'cm-close-btn': false,
                    },  is3rdParty
                        ?   '{{"IDENTITY.KEYS.TRUST.MODAL.CANCELED"|cmTranslate}}'
                        :   '{{"IDENTITY.KEYS.AUTHENTICATION.MODAL.CANCELED"|cmTranslate}}')

                    cmModal.open('authentication-request-canceled', null, 2000)

                    return true     //remove the event binding
                }

                return false
                
            })

        })

        return self
    }
])
// TODO: doku and tests

.service('cmBoot', [
    'cmObject',
    '$q', '$rootScope', '$document', '$injector',
    function(cmObject,
             $q, $rootScope, $document, $injector) {
        var promises = {};

        function reset(){
            //promises = {};
            delete promises.userModel;
        }

        $rootScope.$on('logout', function(){
            reset();
        });

        $rootScope.$on('identity:switched', function(){
            reset();
        });

        $rootScope.$on('appSpinner', function(event, action){
            // hide app spinner
            angular.element($document[0].querySelector('.app-spinner'))
                .css('display',action == 'hide'?'none':null);
        });

        function onAllPromises(){
            var allPromises = Object.getOwnPropertyNames(promises).map(function(key) {
                return promises[key].promise;
            });

            $q.all(allPromises)
            .then(function(){
                $rootScope.$broadcast('appSpinner','hide');
            });
        }

        var self = {
            init: {
                userModel: function(){
                    if(!('userModel' in promises)){
                        promises.userModel = $q.defer();
                        onAllPromises();

                        self.on('userModel:ready',function(){
                            promises.userModel.resolve();
                        });
                    }
                }
            },

            isReady: {
                i18n: function(){
                    if(!('i18n' in promises)){
                        promises.i18n = $q.defer();
                        onAllPromises();

                        $rootScope.$on('$translateLoadingSuccess', function(){
                            promises.i18n.resolve();
                        });
                    }

                    return promises.i18n.promise;
                },
                userModel: function(){
                    self.init.userModel();

                    return promises.userModel.promise;
                },
                purl: function(idPurl){
                    return $injector.get('cmPurlModel').getPurl(idPurl).catch(function(r){return $q.when(r)});
                }
            },

            ready: {
                userModel: function(){
                    self.init.userModel();

                    self.trigger('userModel:ready');
                }
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
])
.service('cmCron', [
    function(){
        this.jobs           =  {};
        this.interval       = null;
        this.intervalSec    = 5;

        this.init = function(){
            this.startInterval();
        };

        this.add = function(identifier,job){
            var defaults = {"instance":{}, "task":angular.noop, "callback": angular.noop, "isRunning":false, "isActive":true, "seconds":0, "lastRun":0};

            if(identifier != undefined && identifier != ""){

//                var jobs = $.map(this.jobs, function(element,index) {return index});
                var jobs = Object.keys(this.jobs);

                if(jobs.length == 0 || (jobs.length > 0 && jobs.indexOf(identifier) == -1)){
                    this.jobs[identifier] = angular.extend({},defaults,job);

                    this.init();
                    this.process(identifier);
                } else if(jobs.length > 0 && jobs.indexOf(identifier) != -1){
                    this.jobs[identifier].instance = job.instance;
                    this.jobs[identifier].task = job.task;
                    this.jobs[identifier].isActive = true;
                    this.process(identifier);
                }
            }
        };

        this.kill = function(identifier){
            if(identifier != "" && this.jobs[identifier] != undefined){
                delete this.jobs[identifier];
            }
        };

        this.stop = function(identifier){
            if(identifier != "" && this.jobs[identifier] != undefined){
                this.jobs[identifier].isActive = false;
            }
        };

        this.startInterval = function(){
            if(this.interval == null){
                this.interval = window.setInterval(this.process,(this.intervalSec * 1000));
            }
        };

        this.stopInterval = function(){
            if(this.interval != null){
                window.clearInterval(this.interval);
                this.interval = null;
            }
        };

        this.process = function(identifier){
            if(identifier != undefined && identifier != ""){
                this._process(this.jobs[identifier]);
            } else {
                var self = this;
                angular.forEach(this.jobs, function(job){
                    self._process(job);
                });
            }
        };

        this._process = function(job){
            console.dir(job.instance)
            if(job.isActive == true && job.isRunning == false){
                job.isRunning = true;

                job.task(function(){
//                    console.log('hier')
//                    job.callback(arguments[0]);

                    job.isRunning = false;
                    job.lastRun = new Date().getTime()/1000;
                });
            }
        }
    }
])

.service('cmCrypt',[
    'cmLogger', 'cmKey', 'cmWebworker',
    '$q', '$interval', '$rootScope',
    function (cmLogger, cmKey, cmWebworker,
              $q, $interval, $rootScope) {
        // private vars
        var async = {
            interval: null,
            promise: null,
            crypt: null
        };

        var keygenWorker 


        return {

            randomString: function (length, smallAlphabet) {
                    var alphabet = smallAlphabet ? "abcdefghijklmnopqrstuvwxyz0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
                    var randomInts;

                    // First we're going to try to use the browsers RNG
                    if (window.crypto && window.crypto.getRandomValues) {
                        randomInts = new Int32Array(length);
                        window.crypto.getRandomValues(randomInts);
                    }
                    // Of course IE calls it msCrypto instead of being standard
                    else if (window.msCrypto && window.msCrypto.getRandomValues) {
                        randomInts = new Int32Array(length);
                        window.crypto.getRandomValues(randomInts);
                    }
                    // So, no built-in functionality - bummer. If the user has wiggled the mouse enough,
                    // sjcl might help us out here
                    else if (sjcl.random.isReady()) {
                        randomInts = sjcl.random.randomWords(length);
                    }
                    // Last resort - we'll use isaac.js to get a random number. It's seeded from Math.random(),
                    // so this isn't ideal, but it'll still greatly increase the space of guesses needed to crack the password.
                    else {
                        cmLogger.warn("Random Number Generator: not enough entropy, using weak seed")
                        randomInts = [];
                        for (var i = 0; i < length; i++) {
                            randomInts.push(isaac.rand());
                        }
                    }

                    var randomWord = ""
                    // use random ints to select char from alphabet
                    for (var i = 0; i < length; i++) {
                        var index = Math.abs(randomInts[i]) % alphabet.length
                        randomWord += alphabet[index]
                    }
                    return randomWord;
                },

            /**
             * this method calculates a secure hash
             * @param secretString String that should be hashed
             */
            
            hash: function (secretString) {
                if (typeof secretString != 'string' || secretString.length == 0)
                    throw "cmCrypt.hash(): invalid argument."

                return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(secretString))
            },
            /**
             * [hashObject description]
             * @param  {[type]} obj         [description]
             * @param  {[type]} hash_method [description]
             * @return {[type]}             [description]
             */
            hashObject: function(obj){
                var visited = []

                function objectToArray(obj){

                    //console.log(visited.length)

                    if(visited.indexOf(obj) != -1)
                        throw "Error: cmCrypt.hashObject() unable to hash cyclic Objects."
                    

                    if(typeof obj == "string") return obj
                    if(typeof obj == "number") return obj.toString()
                        
                    if(["[object Object]", "[object Array]"].indexOf(Object.prototype.toString.call(obj)) == -1)
                        throw "Error: cmCrypt.hashObject() unable to hash Objects with values like " + Object.prototype.toString.call(obj) 

                    var keys    =   Object.keys(obj).sort()

                    visited.push(obj)

                    var values  =   keys.map(function(key){ return objectToArray(obj[key]) })

                    return [keys, values]
                }

                    return this.hash(JSON.stringify(objectToArray(obj)))
                },

            /**
             * this methods encodes a string base64
             * @param string
             * @returns {*}
             */
            base64Encode: function(string){
                return _Base64.encode(string);
            },

            /**
             * this method decodes a string base64
             * @param string
             * @returns {*}
             */
            base64Decode: function (string) {
                return _Base64.decode(string);
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with max len of 10 chars
             * @param secretString a string that should be enrypted
             * @returns base64 encoded encrypted string
             */
            encryptWithShortKey: function (secretKey, secretString) {
                var parameters = { cipher: "aes", ks: 256, iter: 4096 };

                if (typeof secretKey != 'string' || secretKey.length < 3) { //Todo! key sollte länger sein
                    cmLogger.warn('cmCrypt.encryptWithShortKey(): unable to encrypt, invalid key. ' + secretKey)
                    return "";
                }


                if (null == secretString)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with min len of 60 chars
             * @param secretString a string that should be encrypted
             * @returns base64 encoded encrypted string
             */
            encrypt: function (secretKey, secretString) {
                var parameters = {cipher: "aes", ks: 256, iter: 500 };

                if(typeof secretKey != 'string' || secretKey.length < 1){ //Todo: längere Keys verlangen
                    cmLogger.warn('cmCrypt.encrypt(): unable to encrypt, invalid key.'+secretKey)
                    return "";
                }

                if (null == secretString)
                    return "";

                if (secretKey.length < 60) {
                    cmLogger.debug("cmCrypt.encrypt(): key too short.")
                    return "";
                }


                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be decrypted
             * @returns decrypted string or false if unable to decrypt
             */
            decrypt: function (secretKey, secretString) {

                if (secretString != '' && typeof secretString == 'object') {
                    secretString = JSON.stringify(secretString)
                }

                if (typeof secretKey != 'string' || secretKey.length < 1) {
                    return false;
                }

                if (null == secretString)
                    return false;

                var decryptedString;

                try {
                    decryptedString = sjcl.decrypt(secretKey, secretString)
                } catch (e) {
                    //                    cmLogger.warn('Unable to decrypt.', e)
                    //                    console.warn(e)
                }

                return decryptedString || false
            },

            /**
             * return the bit size of possible keygeneration
             * @returns {string[]}
             */
            getKeySizes: function () {
                return ['2048', '4096'];
            },

            /**
             * start async process
             * @param keylen
             * @param $scopeState
             * @returns {Promise.promise|*|webdriver.promise.Deferred.promise}
             */
            generateAsyncKeypair: function(keySize){
                if (keySize == undefined ||
                    typeof keySize != 'number') {
                    return false;
                }

                async.promise = $q.defer();
                // start keygen over webworker
                
                if(cmWebworker.available){
                    cmWebworker.new('rsa_keygen')
                    .then(function(worker){
                        keygenWorker = worker
                        return  keygenWorker
                                .start( {keySize: keySize} )
                     })   
                    .then(
                        function(result){

                            var key = (new cmKey()).setKey(result.privKey);

                            async.promise.resolve({
                                timeElapsed: result.timeElapsed,
                                key: key
                            });
                        },
                        function(reason){
                            console.log('webwroker failed', reason)
                            async.promise.reject(reason);
                        }
                    )

                // otherwise use browser instance
                } else {
                    var self = this,
                        time = -((new Date()).getTime()),
                        counts = 0;

                    // init vars
                    async.crypt = new JSEncrypt({default_key_size: keySize}),

                        // start keypair generation
                        async.crypt.getKey(function () {

                            // only resolve if keypair exists
                            if (async.crypt.getPrivateKey() == undefined)
                                return false;

                            self.cancelGeneration(true);
                            if (async.promise != null) {
                                async.promise.resolve({
                                    timeElapsed: (time + ((new Date()).getTime())),
                                    counts: counts,
                                    key: async.crypt
                                });
                                // !!! important for unit test, don't remove !!!
                                $rootScope.$apply();
                            }
                        });
                }

                return async.promise.promise;
            },

            generateSyncKeypair: function(keySize){
                if (keySize == undefined ||
                    typeof keySize != 'number') {
                    return false;
                }
                var crypt = new JSEncrypt({default_key_size: keySize});
                crypt.getKey();
                return crypt.getPrivateKey();
            },
            /**
             * cancel key generation process / simple clearInterval
             * if interval is pending
             * @returns {boolean}
             */
            cancelGeneration: function(withoutReject){
                if(cmWebworker.available){
                    return keygenWorker.cancel()
                } else if(async.crypt != null){
                        // clear promise and library vars if param withReject is true
                    if(withoutReject == undefined) {
                            async.crypt.cancelAsync();
                            async.promise.reject();
                        }
                        return $q.when(true);
                    }
                    return $q.when(false);
                },

            generatePassword: function (length) {
                return this.randomString(length || 10, true)
            },

            generatePassphrase: function () {
                return this.randomString(60, false)
            },

            //Todo check if te follwoing is still needed

            // /**
            //  * generateTransactionSecret
            //  * @returns {String} transactionSecret
            //  */
            // generateTransactionSecret: function () {
            //     return this.generatePassword(6);
            // },

            // /**
            //  * signAuthenticationRequest
            //  * @param _settings_
            //  * @returns {String} rsaSha256Signature of newPrivKey
            //  */
            // signAuthenticationRequest: function (_settings_) {
            //     var defaultSettings = {
            //             identityId: 0,
            //             transactionSecret: '',
            //             fromKey: undefined,
            //             toKey: undefined
            //         },
            //         dataForHandshake = {
            //             signature: '',
            //             encryptedTransactionSecret: '',
            //             fromKeyId: 0,
            //             fromKeyFingerprint: '',
            //             toKeyId: 0,
            //             toKeyFingerprint: ''
            //         },
            //         settings = angular.extend({}, defaultSettings, _settings_);

            //     if (!(settings.fromKey instanceof cmKey)) {
            //         cmLogger.error('sign fromKey isn\'t a cmKey');
            //         return null;
            //     }
            //     if (!(settings.toKey instanceof cmKey)) {
            //         cmLogger.error('sign toKey isn\'t a cmKey');
            //         return null;
            //     }

            //     dataForHandshake.fromKeyId = settings.fromKey.id;
            //     dataForHandshake.fromKeyFingerprint = settings.fromKey.getFingerprint();

            //     dataForHandshake.toKeyId = settings.toKey.id;
            //     dataForHandshake.toKeyFingerprint = settings.toKey.getFingerprint();

            //     dataForHandshake.encryptedTransactionSecret = settings.toKey.encrypt(settings.transactionSecret);

            //     var signData = {
            //         identityId: settings.identityId,
            //         encryptedTransactionSecret: dataForHandshake.encryptedTransactionSecret
            //     };


            //     dataForHandshake.signature = settings.fromKey.sign(this.hashObject(signData));

            //     return dataForHandshake;
            // },

            // /**
            //  * verifyAuthenticationRequest
            //  * @param _settings_
            //  * @returns {Boolean} is verification valid of newPubKey
            //  */
            // verifyAuthenticationRequest: function (_settings_) {
            //     var defaultSettings = {
            //             identityId: '',
            //             fromKey: undefined,
            //             encryptedTransactionSecret: '',
            //             signature: ''
            //         },
            //         settings = angular.extend({}, defaultSettings, _settings_);

            //     if (!(settings.fromKey instanceof cmKey)) {
            //         cmLogger.error('sign fromKey isn\'t a cmKey');
            //         return false;
            //     }

            //     var verifyData = {
            //         identityId: settings.identityId,
            //         encryptedTransactionSecret: settings.encryptedTransactionSecret
            //     };

            //     return settings.fromKey.verify(this.hashObject(verifyData), settings.signature);
            // },

            // isTransactionSecretValid: function (_settings_) {
            //     var defaultSettings = {
            //             userInput: '', //
            //             toKey: undefined,
            //             encryptedTransactionSecret: ''
            //         },
            //         settings = angular.extend({}, defaultSettings, _settings_);

            //     return settings.toKey.decrypt(settings.encryptedTransactionSecret) == settings.userInput;
            // }
        }
    }
])

.service('cmError', [
    '$rootScope',
    '$window',
    '$injector',
    function($rootScope, $window, $injector){
        var self = {
            showOnPage: function(error){
                $rootScope.errorThrown = error;
                $rootScope.goto('/error');
            }
        };

        $window.onerror = function(msg, url, line, col, error) {
            self.showOnPage({
                jserror: msg,
                location: $injector.get('$location').$$path,
                script: url,
                at: line+':'+col,
                error: error
            });
            //window.location.href = window.location.pathname + '#/error';
            return false;
        };

        return self;
    }
])
.factory('$exceptionHandler', [
    'cmLogger',
    '$injector',
    function (cmLogger,
              $injector) {
        return function (exception, cause) {

            var stack = (exception.stack+'');

            var error = {
                location:   $injector.get('$location').$$path,
                exception:  exception,
                msg:        exception.message,
                stack:      stack.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, ' \n'),
                cause:      cause
            };

            cmLogger.error(JSON.stringify(error,null,2));

            if(typeof exception == 'object' && 'message' in exception && exception.message.indexOf('defined') >= 0){
                $injector.get('cmError').showOnPage(error);
            }

            //throw exception;
        };
    }
])
.service('cmJob', [
    '$rootScope',
    '$window',
    '$location',
    'cmTranslate',
    'cmModal',
    'cmLogger',
    function($rootScope, $window, $location, cmTranslate, cmModal, cmLogger){

        var jobIsActive = false,
            jobi18n = '',
            jobFunctionUnbind = null,
            pendingUrl = {path:'',replace:false};

        function resetPendingUrl(){
            cmLogger.debug('cmJob.resetPendingUrl');
            pendingUrl = {path:'',replace:false}
        }

        return {
            isActive: function(){
                //cmLogger.debug('cmJob.isActive');
                return jobIsActive;
            },
            start: function(message, cancelCallback){
//                cmLogger.debug('cmJob.start '+message);
                jobIsActive = true;

                cmTranslate(message||'JOB.IN_PROGRESS').then(function(_jobi18n_){
                    jobi18n = _jobi18n_;
                });

                $window.onbeforeunload = function () {
                    return jobi18n;
                };

                jobFunctionUnbind = $rootScope.$on('$locationChangeStart', function(event, next) {
                    event.preventDefault();

                    cmModal.confirm({
                        text:   message,
                        cancel: 'NO',
                        okay:   'YES'
                    })
                    .then(function(){
                        if(typeof cancelCallback == 'function'){
                            cancelCallback();
                        }

                        stop();

                        if(pendingUrl.path != ''){
                            $rootScope.goTo(pendingUrl.path, pendingUrl.replace);
                        } else {
                            $rootScope.goBack();
                        }
                    });
                });
            },
            stop: function(){
//                cmLogger.debug('cmJob.stop');
                jobIsActive = false;

                $window.onbeforeunload = null;

                if(jobFunctionUnbind)
                    jobFunctionUnbind();
            },
            setPendingUrl: function(path, replace){
                //cmLogger.debug('cmJob.setPendingUrl ' + path);

                if(typeof path == 'string' && path.length > 0){
                    pendingUrl.path = path;

                    if(replace){
                        pendingUrl.replace = replace;
                    }

                    $rootScope.$broadcast('$locationChangeStart');
                }
            }
        }
    }
])
/**
 * @ngdoc object
 * @name LocalStorageAdapter
 * @description
 */
.service('LocalStorageAdapter', [
function(){
    return {
        /**
         * check usability in browser
         * @returns {boolean}
         */
        check: function(){
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e){
                return false;
            }
        },
        /**
         * returns a value from a key
         * @param key
         * @returns {*}
         */
        get: function (key) {
            try {
                return localStorage.getItem(key);
            } catch (e){
                return "";
            }
        },
        /**
         * http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
         * returns an array of all keys
         * @returns {*}
         */
        getAllKeys: function(){
            try {
                return Object.keys(localStorage);
            } catch (e) {
                return false;
            }
        },
        /**
         * set/update keys
         * @param key
         * @param data
         * @returns {boolean}
         */
        save: function (key, data) {
            try {
                localStorage.setItem(key, data);
                return true;
            } catch (e){
                return false;
            }
        },
        /**
         * remove key
         * @param key
         * @returns {boolean}
         */
        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e){
                return false;
            }
        },
        /**
         * remove all keys
         * @returns {boolean}
         */
        clearAll : function () {
            try {
                localStorage.clear();
                return true;
            } catch (e){
                return false;
            }
        }
    }
}]).
/**
 * @ngdoc object
 * @name LocalStorageService
 * @description
 *
 * @requires LocalStorageAdapter
 * @requires cmCrypt
 * @requires $rootScope
 */
factory('LocalStorageService',['LocalStorageAdapter', 'cmCrypt','$rootScope', function(LocalStorageAdapter, cmCrypt, $rootScope){
    var LocalStorageService = function(){
        var self = this,
            useable = false,
            useableCheck = false,
            cryptKey = "",
            storageKey = "CAMEO_LOCAL_STORAGE_IDENTITY",
            storageValue = {};

        function getStorageValue(){

            var value = LocalStorageAdapter.get(storageKey);
            if(value == null){
                return {}
            } else {
                return JSON.parse(cmCrypt.decrypt(cryptKey,cmCrypt.base64Decode(value)));
            }
        }

        function saveStorageValue(value){
            try {
                LocalStorageAdapter.save(storageKey, cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(cryptKey,JSON.stringify(value))));
                return true;
            } catch(e){
                //
            }

            return false;
        }

        /**
         * init
         */
        this.init = function(data){
            if(this.check()){
                cryptKey = cmCrypt.hash(data.id + data.key);
                storageKey = cmCrypt.hash(data.id);

                this.instanceId = data.id;
                this.instanceKey = data.key;
            }
        };
        /**
         * adapter function for check local storage
         * @returns {boolean}
         */
        this.check = function(){
            if(useableCheck !== true){
                useable = LocalStorageAdapter.check();
                useableCheck = true;
            }

            return useable;
        };
        /**
         * get key
         * @param key
         * @returns {*}
         */
        this.get = function (key) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue[key] != undefined){
                    return storageValue[key];
                }
            }

            return undefined;
        };
        /**
         * get all keys from identity storage
         * @returns {*}
         */
        this.getAllKeys = function(){
            if(this.check() !== false){
                var keys = [];
                storageValue = getStorageValue();

                for(var k in storageValue){
                    keys.push(k);
                }

                return keys;
            }

            return [];
        },
        /**
         *  set and update key in identity storage
         *  @returns {boolean}
         */
        this.save = function (key, data) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue == null){
                    storageValue = {};
                }
                storageValue[key] = data;

                saveStorageValue(storageValue);
                return true;
            }

            return false;
        };
        /**
         * remove on key from identity storage
         * @param key
         * @returns {boolean}
         */
        this.remove = function (key) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue[key] != undefined){
                    try {
                        delete(storageValue[key]);
                        saveStorageValue(storageValue);
                        return true;
                    } catch (e){
                        //
                    }
                }
            }

            return false;
        };
        /**
         * remove all from identity storage
         * @returns {boolean}
         */
        this.clearAll = function () {
            if(this.check() !== false){
                storageValue = {};
                LocalStorageAdapter.remove(storageKey);
                return true;
            }

            return false;
        };

        function reset(){
            self.instanceId = "";
            self.instanceKey = "";
            self.storageValue = {};
            self.cryptKey = "";
        }

        $rootScope.$on('logout', function(){ reset(); });

        $rootScope.$on('identity:switched', function(){ reset() });

    };

    return LocalStorageService;
}]).
/**
 * @ngdoc object
 * @name cmLocalStorage
 * @description
 *
 * @requires LocalStorageService
 * @requires $rootScope
 */
factory('cmLocalStorage',['LocalStorageService','$rootScope', function(LocalStorageService, $rootScope){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    $rootScope.$on('identity:switched', function(){
        instances = [];
    });

    return {
        /**
         * returns instances of LocalStorageService
         * @param id
         * @returns {*}
         */
        create: function(id, key){
            if(typeof id !== 'undefined' && id != '' && typeof key !== 'undefined' && key != ''){
                var storage = null;

                for(var i = 0; i < instances.length; i++){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == id){

                        storage = instances[i].instance;
                        break;
                    }
                }

                if(storage === null){
                    storage = new LocalStorageService();
                    storage.init({id:id,key:key});

                    instances.push({id:id,instance:storage});
                }

                return storage;
            }

            return null;
        },
        getQty: function(){
          return instances.length;
        }
    }

}])
//This service provides extra funcionality for core objects

/**
 * @ngdoc service
 * @name cmObject
 * @description
 *  
 */

.service('cmObject', [

    'cmLogger',
    'cmUtil',
    '$q',
    '$timeout',

    function(cmLogger, cmUtil, $q, $timeout){
        var self = this

        /**
         * @ngdoc method
         * @methodOf cmObject
         * @name addEventHandlingTo
         * @description
         * Function to add basic event handling to any object, to bubbling up or down provided
         * @param {Object} obj any object to extend with event ahndlung capabilities
         */

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}
            obj._receptors = []


            /**
             * Function to call a callback bound to an event. This function is not meant to me called from outside the object.
             * @param  {Function} cb    callback function
             * @param  {Object}   event event data to be passed to the callback function
             * @param  {Object}   data  extra data to be passed to the callback function
             * @return {boolean}  returns if the callback should be called on the next occurance of event or not         
             */
            
            function _call(cb, event, data){
                var cb_result    = cb.fn.apply(obj, [event, data]),     //call the callback on the base object
                    limit_set    = typeof cb.limit == "number",         //check if the number of calls should be limited
                    cb_complete  = limit_set                            //check if the call should count as successful (and thus recude the number number of future calls)
                                   ?    cb_result == true || cb_result == undefined //if there is no return value treat the call as successful (default)
                                   :    cb_result == true               //if there is no limit set, the number of calls is unlimited anyway
                    
                 
                if(limit_set && cb_complete) cb.limit-- //reduce number of future calls of callback for event

                var call_again   = limit_set            
                                   ?    cb.limit > 0
                                   :    !cb_complete

                return call_again
            }


            /**
             * Function to trigger callback bound to an event
             * @param  {string} event_name Name of the event to trigger
             * @param  {Object} data       Data to be passsed to the callback function
             * @return {Object}            returns the base object for chaining
             */
            
            obj.trigger = function(event_name, data, event_data){
                var event = {
                                target :    obj,  
                                source :    obj ,
                                name :      event_name
                            }

                angular.extend(event, event_data)

                obj._callbacks[event_name] = obj._callbacks[event_name] || []   //create the according callback array, if neccessary

                //if(obj._callbacks[event_name].length == 0)
                    //cmLogger.debug('Event "'+event_name+'" triggered, but no callbacks registered.')

                obj._callbacks[event_name].forEach(function(callback_obj, index){
                    // call callback function and delete if need be, see ._call()
                    if(!_call(callback_obj, event, data)){
                        delete obj._callbacks[event_name][index]
                    }
                })

                // Remove undefined entries:
                obj._callbacks[event_name] = obj._callbacks[event_name].filter(function(item){ return item != undefined})

                obj._receptors.forEach(function(receptor){
                    receptor.trigger(event_name, data, {source : event.source} )
                })

                return obj
            }

            /**
             * Function to bind a call back to event(s).
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Function to call, when the event is triggered. Should return wether the call was successfull or not.
             * @param  {number}   [limit]     Number of times the callback should be (succsessfully) called. If not provided, there is no limit to the number of calls.
             * @return {Object}               returns the object for chaining.
             */
            
            obj.on = function(event_names, callback, limit){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 

                event_names.forEach(function(event_name){
                    obj._callbacks[event_name] = obj._callbacks[event_name] || [] //create according callback array, if neccessary
                    obj._callbacks[event_name].push({       // add callback object with callback function an limit for number of calls
                        'fn' : callback,
                        'limit': limit || false
                    })
                })

                return obj
            }

            /**
             * Function to remove binding of a callback function to an event.
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Funcation that has been bound to an event.
             * @return {Object}               returns the object for chaining.
             */
            obj.off = function(event_names, callback){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 
                
                event_names.forEach(function(event_name){
                    if(!callback) obj._callbacks[event_name] = []

                    obj._callbacks[event_name] = obj._callbacks[event_name] || []

                    if(event_name in obj._callbacks) {
                        obj._callbacks[event_name].forEach(function (callback_obj, index) {
                            if (callback_obj.fn == callback) delete obj._callbacks[event_name][index]
                        })
                    }
                })

                return obj
            }

            /**
             * Function to bind a call back to event(s). Unbind after triggered once.
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Function to call, when the event is triggered. Should return wether the call was successfull or not.
             * @param  {number}   [limit]     Number of times the callback should be (succsessfully) called. If not provided, there is no limit to the number of calls.
             * @return {Object}               returns the object for chaining.
             */
            obj.one = function(event_names, callback){
                obj.on(event_names, callback, 1)
                return obj
            }

            /**
             * Function to convert an event to a promise
             * @param  {String} event_names     Names of the events to listen to. Multiple event names should be separated by ' '.
             * @return {promise}                Promise to be resolved when the event triggers for the first time
             */
            obj.when = function(event_names_to_resolve, event_names_to_reject, timeout){
                if(event_names_to_reject && isNaN(event_names_to_reject)){
                    obj.one(event_names_to_reject, function(event, data){
                        deferred.reject( {event: event, data: data} )
                        return true
                    })
                } else {
                    timeout = timeout || event_names_to_reject
                }

                var deferred = $q.defer()

                obj.one(event_names_to_resolve, function(event, data){
                    deferred.resolve( {event: event, data: data} )
                    return true
                })

                if(typeof timeout == 'number'){
                    $timeout(function(){
                        deferred.reject('timeout')
                    }, timeout)
                }

                return deferred.promise
            }

            /**
             * @methodOf 
             * @name  brodcastEventsTo
             *
             * @description
             * Function to brodacast event from on event to another.
             * 
             * @param  {object} receptor    Any object with event handling.
             * @returns {*}     this        Returns itself for chaining.         
             */
            obj.broadcastEventsTo = function(receptor){
                if(receptor && typeof receptor.trigger == 'function'){
                    this._receptors.push(receptor)
                } else {
                    //cmLogger.debug('cmObject: EventHandling: unable to add receptor.', obj)
                }

                return obj
            }

            /**
             * @name echoEventsFrom
             * @description 
             * Retriggers every event of source object on itself.
             *
             * @param   {*}          source Source object.
             * @returns {*}  this    Returns itself for chaining.
             */
            obj.echoEventsFrom = function(source){
                if(source && typeof source.broadcastEventsTo == 'function'){
                    source.broadcastEventsTo(obj)
                } else {
                    //cmLogger.debug('cmObject: EventHandling: unable to echo Events.', obj)
                }
            }


            return this 
        }

        this.addChainHandlingTo = function(obj){
            obj._chains = {}

            function Chain(obj){
                var deferred     = $q.defer(),
                    self         = this,
                    last_promise = deferred.promise


                angular.forEach(obj, function(value, key){                    
                    if(typeof obj[key] != 'function')  return null

                    self[key] = function(){
                        var args = Array.prototype.slice.call(arguments, 0)

                        last_promise = last_promise.then(function(result){                                
                            return obj[key].apply(obj, args.length > 0 ? args : [result])                                 
                        })

                        return self
                    }
                })

                self.then = function(){                    
                    last_promise = last_promise.then.apply(last_promise, Array.prototype.slice.call(arguments, 0))
                    return self
                }

                deferred.resolve()

                return self
            }


            obj.$chain = function(name){
                name  = name || 'default'

                obj._chains[name] = obj._chains[name] || new Chain(obj)
                
                return obj._chains[name]
            }

            return this 
        }
        
    }
])
/**
 * @ngdoc object
 * @name cmPassphraseVault
 * @description
 * Handle Passphrase Conversation
 *
 * @requires cmUserModel
 * @requires cmCrypt
 * @requires $q
 */
.service('cmPassphraseVault',[

    'cmUserModel',
    'cmCrypt',
    '$q',

    function(cmUserModel, cmCrypt, $q){
        var self = this

        /** utility functions **/

        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name couldBeAPassword
         * @description
         * private function to check minimal requirements for a password.
         *
         * @param {String} pw Anything to be checked wether it could be a password.
         * @return {Boolean} result Wheter the suggested password seems okay or not
         */
        function couldBeAPassword(pw){
            return ((typeof pw == "string") && pw.length >= 1); //Todo, require better passwords.
        }



        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name couldBeAPassphrase
         * @description  private function to check minimal requirements for a passphrase.
         *
         * @param {String} pp Anything to be checked wether it could be a passphrase.
         * @return {Boolean} Wheater the suggested passphrase seems okay or not
         */
        function couldBeAPassphrase(pp){
            return ((typeof pp == "string") && (pp.length >= 60))
        }



        /**
         * Constructor PassphraseVault
         */
        function PassphraseVault(data){


            var sePassphrase        = data.sePassphrase,
                aePassphraseList    = data.aePassphraseList || [],
                self                = this

            /**
             * @ngdoc method
             * @methodOf PassphraseVault
             *
             * @name getKeyTransmission
             * @description
             * return encryption type
             *
             * @returns {String} encryption type - 'none' || 'symmetric' || 'asymmetric' || 'mixed'
             */
            this.getKeyTransmission = function(){

                if(sePassphrase && aePassphraseList.length > 0)
                    return 'mixed';

                if(sePassphrase)                                        
                    return 'symmetric';

                if(aePassphraseList.length > 0 ) 
                    return 'asymmetric';

                return 'none';
            };


            /**
             * @ngdoc mehtod
             * @methodOf PassphraseVault
             *
             * @name get
             * 
             * @param {String} [password] A password to decrypt with
             * @return {promise} Resolves with passphrase if successfull
             */

            this.get = function(password){
                return  $q.reject('unknown.')
                        //try symmetric decryption first:,               
                        .catch(function(){
                            //check if a valid password has been passed to the function 
                            //and a symmetrically encrypted passphrase is present:
                            return  couldBeAPassword(password) && sePassphrase
                                    ?   cmCrypt.decrypt(password, cmCrypt.base64Decode(sePassphrase))
                                    :   $q.reject('password invalid.')
                        })
                        //try asymmetrical decryption if neccessary:                
                        .catch(function(reason){
                            return  aePassphraseList // could be an empty array
                                    .reduce(function(previous_try, item) {
                                        return  previous_try                
                                                //if decryption has been successfull already there will be nothing to catch:
                                                .catch(function(){
                                                    return cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId)
                                                })
                                    }, $q.reject(reason))
                        })
                        //finally check if decryption resolved with a proper passphrase,
                        //if so resolve with passphrase,
                        //if not reject 
                        .then(
                            function(new_passphrase){
                                return  couldBeAPassphrase(new_passphrase)
                                        ?   $q.when(new_passphrase)
                                        :   $q.reject('decrypted passphrase invalid.')
                            },
                            function(reason){
                                return $q.reject(reason)
                            }
                        )
            }

            /**
             * @ngdoc method
             * @methodOf PassphraseVault
             *
             * @name userHasAccess
             * @description
             * checks if local user keys in passphraselist
             *
             * @returns {Boolean} boolean Returns a Boolean
             */
            this.userHasAccess = function(){
                var localKeys = cmUserModel.loadLocalKeys()

                return  localKeys.some(function(key){
                            return aePassphraseList.some(function(item){
                                return item.keyId == key.id
                            })
                        })
            }

            /**
             * @ngdoc method
             * @methodOf PassphraseVault
             *
             * @name exportData
             * 
             *
             * @return {Object} returns encryption data ready to be submitted to the API.
             */
            this.exportData = function(){                
                return  {
                            sePassphrase        : sePassphrase,
                            aePassphraseList    : aePassphraseList,
                            keyTransmission     : this.getKeyTransmission()
                        }
            }
        }











        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name create
         *
         * @discription
         * Creates a new PassphraseVault 
         *
         * @return {PassphraseVault}
         */
        this.create = function(data){
            data =  {
                        sePassphrase:       data.sePassphrase       || null,
                        aePassphraseList:   data.aePassphraseList   || []
                    }

            return new PassphraseVault(data)
        }

        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name encryptPassphrase
         *
         * @description
         * Creates a new PassphraseVault 
         *
         * @params {Object} config
         * config =    {
         *                  passphrase:         config.passphrase       || cmCrypt.generatePassphrase(),
         *                  password:           config.password         || null,
         *                  identities:         config.identities       || [],
         *                  restrict_to_keys:   config.restrict_to_keys || null
         *              }
         *
         * @return {PassphraseVault}
         */
        this.encryptPassphrase = function(config){
            config =    {
                            passphrase:         config.passphrase       || cmCrypt.generatePassphrase(),
                            password:           config.password         || null,
                            identities:         config.identities       || [],
                            restrict_to_keys:   config.restrict_to_keys || null
                        }


            return $q.all({
                        //symmetrical encryption:
                        sym:    couldBeAPassword(config.password) && couldBeAPassphrase(config.passphrase)
                                ?   cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(config.password, config.passphrase))
                                :   $q.when(undefined)
                        ,
                        //asymmetrically encrypt:
                        asym:   couldBeAPassphrase(config.passphrase)
                                ?   $q.all(
                                        config.identities.map(function(identity){
                                            return identity.keys.encryptPassphrase(config.passphrase, config.restrict_to_keys)
                                        })
                                    )
                                    .then(function(results){
                                        return Array.prototype.concat.apply([], results)
                                    })
                                :   $q.when([])
                    })
                    .then(
                        function(result){
                            return  self.create({
                                        sePassphrase:       result.sym,
                                        aePassphraseList:   result.asym
                                    })
                        },
                        function(){
                            cmLogger.debug('cmPassphraseVault: encryption failed.')
                            return null
                        }
                    )
        }







            /**
             * @TODO mit AP klären, BS!!!
             * @returns {*|number}
             */
            this.getWeakestKeySize = function(){
                return  conversation.recipients.reduce(function(size, recipient){
//                            return size != undefined ? Math.min(recipient.getWeakestKeySize(), size) : recipient.getWeakestKeySize()
                            return size != undefined ? Math.min(recipient.getWeakestKeySize(), size.getWeakestKeySize()) : recipient.getWeakestKeySize()
                        }) || 0
            }

    }
])
.service('cmRootService', [
    '$rootScope',
    '$window',
    '$location',
    'cmLogger',
    'cmJob',

    function($rootScope, $window, $location, cmLogger, cmJob){

        $rootScope.goBack = function(){
            $window.history.back();
        };

        /**
         * @param path {string}
         * @param replace {boolean}
         */
        $rootScope.goTo = function(path, replace){
            cmLogger.debug('cmRootService.goTo ' + path);

            path = path[0] == '/' ? path : '/'+path;
            if(cmJob.isActive() !== false){
                cmJob.setPendingUrl(path, replace);
            } else {
                $location.path(path);

                //Todo: find foifferent solution:
                if(replace){
                    $location.replace();
                }
            }
        };

        /**
         * alias
         * @type {Function|$rootScope.goTo}
         */
        $rootScope.goto = $rootScope.goTo;

        $rootScope.gotoRegistration = function(){
            this.goTo('/registration')
        };

        $rootScope.createNewConversation = function(){
            delete $rootScope.pendingConversation;
            $rootScope.goTo('/conversation/new');
        };

        $rootScope.createNewIdentity = function(){
            $rootScope.goTo('/settings/identity/create');
        }

        $rootScope.gotoContactList = function(){
            $rootScope.goTo('/contact/list')
        }

        $rootScope.gotoPurl = function(purlId, subpath){
            $rootScope.goTo('/purl/'+purlId+'/'+subpath)
        }

        $rootScope.gotoConversation = function(conversationId, subpath){
            $rootScope.goTo('/conversation/'+(conversationId || 'new')+'/'+subpath)

        }
    }
])
/**
 * @ngdoc service
 * @name cmSettings
 * @description
 * @todo combine with service-key-storage
 */
.service('cmSettings', [
    'cmUserModel', 'cmUtil', 'cmLogger', 'cmObject',
    '$rootScope',
    function(cmUserModel, cmUtil, cmLogger, cmObject,
             $rootScope) {

        var self = this,
            localStorageKey = 'appSettings',
            defaultProperties = {
                convertEmoji: true,
                sendOnReturn: false,
                skipKeyInfo: false,
                dateFormat: 'dd.MM.yyyy',
                timeFormat: 'HH:mm',
                pushNotifications: true
            };

        cmObject.addEventHandlingTo(this);

        this.properties = {};

        function init(){
//            cmLogger.debug('cmSettings.init');
            self.properties = angular.extend({}, defaultProperties, (cmUserModel.storageGet(localStorageKey) || {}));
            self.trigger('update:finished');
        }

        /**
         * @name get
         * @description
         * get the value of an key out of the localstorage
         */
        this.get = function(key){
            // get key
            if(key != undefined){
                var settings = {};

                if(cmUtil.checkKeyExists(this.properties, key)){
                    settings = this.properties[key];
                }

                return settings;
            }
        };

        /**
         * @name is
         * @description
         * check if exists and is true
         */
        this.is = function(key){
            var boolReturn = false;
            if(key != undefined && // key exists
               cmUtil.checkKeyExists(this.properties, key) && // is in properties
               this.properties[key]){// and is true
                boolReturn = true;
            }
            return boolReturn;
        };

        /**
         * @name set
         * @description
         * updates the key in localstorage
         */
        this.set = function(key, value){
            this.properties[key] = value;

            if(cmUserModel.storageSave(localStorageKey, this.properties)){
                return true;
            }

            return false;
        };

        $rootScope.$on('logout', function(){
//            cmLogger.debug('cmSettings.on.logout');
            self.properties = {};
        });

        $rootScope.$on('identity:switched', function(){
            self.properties = {};
        });

        cmUserModel.on('update:finished', function(){
            init();
        });
    }
])
/**
 * @ngdoc object
 * @name cmSystemCheck
 * @description
 */
.service('cmSystemCheck', [
    'cmUserModel',
    'cmObject',
    'cmApi',
    'cmVersion',
    'cmLanguage',
    'LocalStorageAdapter',
    'cmLogger',
    '$rootScope',
    '$q',
    function(cmUserModel, cmObject, cmApi, cmVersion, cmLanguage, LocalStorageAdapter, cmLogger, $rootScope, $q){
        var self = this;

        cmObject.addEventHandlingTo(this);

        this.getBrowserInfo = function(){
            //cmLogger.debug('cmSystemCheck.getBrowserInfo');

            var deferred = $q.defer();

            cmApi.post({
                path: '/services/getBrowserInfo',
                data: {
                    version: cmVersion.version
                }
            }).then(
                function(data){
                    if(!cmUserModel.isAuth()){
                        var language = data.languageCode.substr(0,2),
                            lc       = language == 'de' ? 'de_DE' : 'en_US';
                        cmLanguage.switchLanguage(lc);
                    }

                    if('versionIsSupported' in data && data.versionIsSupported == false){
                        $rootScope.clientVersionCheck = false;
                    } else {
                        $rootScope.clientVersionCheck = true;
                    }

                    deferred.resolve();
                },
                function(){
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        /**
         * @param forceRedirect
         * @returns {boolean}
         */
        this.checkClientVersion = function(forceRedirect){
            //cmLogger.debug('cmSystemCheck.checkClientVersion');

            var deferred = $q.defer();

            if('clientVersionCheck' in $rootScope){
                if($rootScope.clientVersionCheck == false){
                    this.trigger('check:failed', {forceRedirect:forceRedirect});
                    return deferred.reject();
                } else {
                    return deferred.resolve();
                }
            } else {
                this.getBrowserInfo().then(
                    function(){
                        return self.checkClientVersion(forceRedirect);
                    },
                    function(){
                        return deferred.resolve();
                    }
                )
            }

            return deferred.promise;
        };

        this.checkLocalStorage = function(forceRedirect){
            var test = {key: 'cameoNet', value: 'cameoNet'};

            if (!LocalStorageAdapter.check()) {
                this.trigger('check:failed', {forceRedirect:forceRedirect});
                return false;
            } else {
                if (LocalStorageAdapter.save(test.key, test.value)) {
                    LocalStorageAdapter.remove(test.key);

                    return true;
                }

                this.trigger('check:failed', {forceRedirect:forceRedirect});
                return false;
            }
        };

        this.run = function(forceRedirect){
            this.checkClientVersion(forceRedirect);
            this.checkLocalStorage(forceRedirect);
        };

        this.on('check:failed', function(event, data){
            if(typeof data == 'object'){
                if('forceRedirect' in data && data.forceRedirect == true){
                    cmUserModel.doLogout(false);
                    $rootScope.goto('/systemcheck');
                }
            }
        });
    }
])
/**
 * @ngdoc service
 * @name cmUserModel
 * @description
 * MOEP Description
 *
 * @requires cmAuth
 * @requires cmLocalStorage
 * @requires cmIdentityFactory
 * @requires cmObject
 * @requires cmNotify
 * @requires cmLogger
 * @requires $rootScope
 * @requires $q
 * @requires $location
 *
 * @type {{isActive: boolean, id: string, userKey: string, displayName: string, cameoId: string, email: {}, phoneNumber: {}, preferredMessageType: string, created: string, lastUpdated: string, userType: string, storage: {}, identity: {}}}
 */


.service('cmUserModel',[
    'cmBoot', 'cmAuth', 'cmLocalStorage', 'cmIdentityFactory', 'cmIdentityModel', 'cmFactory',
    'cmCrypt', 'cmKeyFactory', 'cmKey', 'cmStateManagement', 'cmObject', 'cmUtil',
    'cmNotify', 'cmLogger', 'cmCallbackQueue', 'cmPushNotificationAdapter', 'cmApi',
    '$rootScope', '$q', '$location',
    function(cmBoot, cmAuth, cmLocalStorage, cmIdentityFactory, cmIdentityModel, cmFactory,
             cmCrypt, cmKeyFactory, cmKey, cmStateManagement, cmObject, cmUtil,
             cmNotify, cmLogger, cmCallbackQueue, cmPushNotificationAdapter, cmApi,
             $rootScope, $q, $location){
        var self = this,
            isAuth = false,
            initialize = ''; // empty, run, done ! important for isAuth check

        cmObject.addEventHandlingTo(this);

        this.reset = function(){
            this.data = {
                isActive: false,
                id: '',
                userKey: '',
                displayName: '',
                cameoId: 'loading...',
                email: {},
                phoneNumber: {},
                preferredMessageType: 'default',
                created: '',
                lastUpdated: '',
                userType: '',
                storage: {},
                identity: {},
                identities: [],
                account: {}
            };
        }

        this.reset();

        this.state = new cmStateManagement(['signing']);

        this.comesFromRegistration = false;

        /**
         * @ngdoc method
         * @methodOf cmUserModel
         *
         * @name init
         * @description
         * initialize the model with loading the identity
         *
         * @param {Object} identity_data JSON of an Identity
         * @returns {Object} this cmUserModel
         */
        function init(){
            self.loadIdentity();

            self.trigger('init');// deprecated
            self.trigger('init:finish');

            self.one('update:finished', function(){
                if(self.data.identity.keys){
                    self.signOwnKeys();
                    return true;
                }else{
                    return false;
                }
            });
        }

        this.importData = function(activeIdentity, data_identities){

            this.data.identity = activeIdentity;
            this.data.identity.isAppOwner = true;
            this.data.id = activeIdentity.id || this.data.id;
            this.data.userKey = activeIdentity.userKey || this.data.userKey;
            this.data.userType = activeIdentity.userType || this.data.userType;

            // todo may an own factory but not a new identityFactory!
            if(this.data.identities.length > 0)
                this.data.identities = [];

            this.data.identities.push(activeIdentity);
            data_identities.forEach(function(identity){
                if(identity.id != self.data.identity.id){
                    var tmpIdentity = cmIdentityFactory.clear(identity).create(identity);
                    tmpIdentity.on('update:finished', function(){
                        /* we have to trigger an other event identity:updated is an backend event */
                       /*cmUserModel.trigger('identity:updated');*/
                    });
                    self.data.identities.push(tmpIdentity);
                }

            });

            isAuth = true;
            this.initStorage();
            this.syncLocalKeys();

            this.trigger('update:finished');

            return this;
        };

        /**
         * @name loadIdentity
         * @description create Identiy for cmUserModel
         * @param {Object|undefined} identity_data
         * @returns {*}
         */
        this.loadIdentity = function(accountData){
            //cmLogger.debug('cmUserModel:loadIdentity');

            var deferred = $q.defer();
            // for login
            function importAccount(accountData){
                if(typeof accountData !== 'undefined' && 'identities' in accountData){
                    var arr_activeIdentity = accountData.identities.filter(function(identity){
                        return identity.active == true;
                    });

                    var identity = cmIdentityFactory.clear(arr_activeIdentity[0]).create(arr_activeIdentity[0], true);

                    identity.on('update:finished', function(event, data){
                        self.trigger('update:finished');
                    });

                    self.importData(identity, accountData.identities);
                    self.importAccount(accountData);

                    // check device for pushing
                    cmPushNotificationAdapter.checkRegisteredDevice();

                    return true;
                }

                return false;
            }
            // for purl
            function importIdentity(identity_data){
                if(typeof identity_data == 'object'){

                    var identity = cmIdentityFactory.clear(identity_data).create(identity_data, true);

                    identity.on('update:finished', function(event, data){
                        self.trigger('update:finished');
                    });

                    self.importData(identity, []);

                    return true;
                }

                return false;
            }

            if(typeof accountData !== 'undefined' && 'identities' in accountData){
                if(importAccount(accountData)){
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            } else {
                if(this.getToken() !== false){
                    /**
                     * @todo hack for external user in purl
                     */
                    if($location.$$path.search('/purl') != -1){
                        cmAuth.getIdentity().then(
                            function (data) {
                                if (importIdentity(data)) {
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }
                            },
                            function (r) {
                                var response = r || {};

                                if (typeof response == 'object' && ('status' in response) && response.status == 401) {
                                    cmLogger.debug('cmUserModel:init:reject:401');
                                    self.doLogout(true, 'usermodel load identity reject');
                                }

                                deferred.reject();
                            }
                        )
                    } else {
                        $rootScope.$broadcast('appSpinner','show');
                        cmAuth.getAccount().then(
                            function (data) {
                                if (importAccount(data)) {
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }
                            },
                            function (r) {
                                var response = r || {};
                                if('status' in response){
                                    switch(response.status){
                                        case 0:
                                            cmLogger.debug('cmUserModel:init:failed:0');
                                            $rootScope.$broadcast('connection:failed', function(){
                                                self.loadIdentity(accountData);
                                            });
                                            return false;
                                        break;
                                        case 401:
                                            cmLogger.debug('cmUserModel:init:reject:401');
                                            self.doLogout(true, 'usermodel load identity reject');
                                        break;
                                    }
                                }

                                deferred.reject();
                            }
                        );
                    }
                }
            }

            return deferred.promise;
        };

        /**
         * Returns current active Identity
         * @returns {data.identity|*}
         */
        this.getIdentity = function(){
            //cmLogger.debug('cmUserModel:getIdentity');
            return this.data.identity;
        };

        this.setIdentity = function(identity_data){
            //cmLogger.debug('cmUserModel:setIdentity');

            this.importData(cmIdentityFactory.clear(identity_data).create(identity_data, true),[]);

            return this;
        };

        this.importAccount = function(data){
            this.data.account.loginName = data.loginName || this.data.account.loginName;

            if(typeof data.email != 'string') {
                this.data.account.email = data.email || this.data.account.email;
            } else {
                this.data.account.email = {value:data.email};
            }

            if(typeof data.phoneNumber != 'string') {
                this.data.account.phoneNumber = data.phoneNumber || this.data.account.phoneNumber;
            } else {
                this.data.account.phoneNumber = {value:data.phoneNumber};
            }

            this.trigger('account:updated');
        };

        this.updateAccount = function(newAccountData){
            return cmAuth.putAccount(newAccountData)
            .then(
                function(){
                    self.importAccount(newAccountData);
                }
            )
        };

        /**
         * @todo more better logic
         * @returns {*}
         */
        this.isAuth = function(){
//            if(this.getToken() !== false){
//                // do identity request for checking token
//                if(isAuth !== true){
//                    // check ob identity loading runs
//                    if(initialize == 'done'){
//
//                    }
//                }
//            }

            return this.getToken();
        };

        this.setAuth = function(){
            isAuth = true
        };

        this.isGuest = function(){
            if(this.data.userType == 'external'){
                return true;
            }

            return false;
        };

        this.doLogin = function(user, pass, accountData){
//            cmLogger.debug('cmUserModel:doLogin');

            var deferred = $q.defer();

            cmAuth.requestToken(user, pass).then(
                function(token){
                    cmAuth.storeToken(token);

                    self.loadIdentity(accountData).finally(
                        function(){
                            deferred.resolve();
                        }
                    );
                    $rootScope.$broadcast('login');
                },
                function(state, response){
                    deferred.reject(state, response);
                }
            );

            return deferred.promise;
        };

        this.doLogout = function(goToLogin, where){
            //cmLogger.debug('cmUserModel:doLogout');

            $rootScope.$broadcast('logout', {
                token:this.getToken(),
                goToLogin: goToLogin,
                where: where
            });
        };

        this.switchToIdentity = function(identity, identityToken){
           // cmLogger.debug('cmUserModel:switchToIdentity');

            function doSwitch(newToken){
                self.storeToken(newToken, true);
                $rootScope.$broadcast('identity:switched');
            }

            if(identityToken){
                doSwitch(identityToken);
            } else {
                cmAuth.getIdentityToken(identity.id).then(
                    function (res) {
                        doSwitch(res.token);
                    }
                );
            }
        };

        /**
         * Key Handling
         */
        this.getLocalKeyIdsForRequest = function(){
            if(this.isAuth !== false){
                var keys = this.loadLocalKeys(),
                    queryString = '';

                if(keys.length > 0){
                    keys.forEach(function(key){
                        queryString += '&keyId=' + key.id;
                    });
                }

                return queryString;
            }

            return '';
        };

        this.hasLocalKeys = function(){
            var keys = this.loadLocalKeys();

            if(keys.length > 0)
                return true;

            return false;
        };

        /**
         * @param key
         * @returns {*}
         */
        this.storeKey = function(key){
            var local_keys      = this.loadLocalKeys() || new cmKeyFactory(),
                matching_key    = local_keys.find(key);

            local_keys.create(key.exportData(), true);

            this.storageSave('rsa', local_keys.exportDataArray());

            this.trigger('key:stored');

            return this;
        };

        this.loadLocalKeys = function(){
            var storedKeys  = this.storageGet('rsa') || [],
                keys        = cmKeyFactory();

            var returnKeys = keys.importFromDataArray(storedKeys)

            return returnKeys
        };

        this.hasPrivateKey = function(){
            var keys = this.loadLocalKeys(),
                result = false;

            keys.forEach(function(key){         
                result = result || !!key.getPrivateKey()
            });

            return result;
        };

        this.syncLocalKeys = function(){
            /**
             * check local Keys from Storage
             */
            
            var localKeys = this.loadLocalKeys() || [];

            localKeys.forEach(function(local_key){

                var no_matching_public_key_present = !self.data.identity.keys || !self.data.identity.keys.find(local_key),
                    missing_key_id = !local_key.id

                if(no_matching_public_key_present || missing_key_id){

                    if(local_key.getPublicKey() == undefined){
                        cmLogger.error('broken pubkey in localstorage! that can\'t be synced.');
                        return false;
                    }

                    cmAuth.savePublicKey({
                        name:    local_key.name, 
                        key:     local_key.getPublicKey(),
                        keySize: local_key.getSize()
                    })
                    .then(function(data){
                        //data brings an id for the key
                        local_key.importData(data)

                        //add public key to identity
                        self.data.identity.keys.create(data)

                        //store the key with its new id:
                        self.storeKey(local_key)

                        // event for handshake modal
                        self.trigger('key:saved', {keyId: data.id});
                    })
                }
            });

            return this;
        };

        this.removeKey = function(keyToRemove){
            var self            = this,
                local_keys      = this.loadLocalKeys(),
                foundInLocalKeys = -1;

            // clear in backend
            cmAuth
            .removePublicKey(keyToRemove.id)
            .then(function(){
                // renew ls
                if(local_keys.deregister(keyToRemove)){
                    self.storageSave('rsa', local_keys.exportDataArray());
                }
                // clear identity
                self.data.identity.keys.deregister(keyToRemove);

                self.trigger('key:removed');
            });
        };

        /**
         * [getTrustToken description]
         * Used to sign a trusted key with!
         * @param  {[type]} keyToTrust [description]
         * @param  {[type]} ownerId    [description]
         * @return {[type]}            [description]
         */
        this.getTrustToken = function(keyToTrust, ownerId){
            //cmLogger.debug('cmUserModel.getTrustToken');
            var dataObject =    {
                                    pubKey: keyToTrust.getPublicKey(),
                                    identifier: ownerId
                                }
            return  cmCrypt.hashObject(dataObject)
        };

        this.signPublicKey = function(keyToSign, keyToSignFingerprint, identity){
            // cmLogger.debug('cmUserModel.signPublicKey');

            identity = identity || self.data.identity

            if(!(keyToSign instanceof cmKey) || (keyToSign.getFingerprint() !== keyToSignFingerprint)){
                self.trigger('signatures:cancel');
                return $q.reject()
            }

            return  $q.all(this.loadLocalKeys().map(function(signingKey){
                        //Keys should not sign themselves
                        if(signingKey.id == keyToSign.id && (signingKey.getFingerprint() == keyToSign.getFingerprint())){
                            self.trigger('signatures:cancel');
                            cmLogger.debug('cmUserModel.signPublicKey() failed; key tried to sign itself.')
                            return $q.when(false);
                        }

                        //Dont sign twice:
                        if(keyToSign.signatures.some(function(signature){ return signature.keyId == signingKey.id })){
                            self.trigger('signatures:cancel');
                            cmLogger.debug('cmUserModel.signPublicKey() failed; dublicate signature.')
                            return $q.when(false); 
                        }

                        cmLogger.debug('cmUserModel.signPublicKey: signing...')

                        return  signingKey.sign(self.getTrustToken(keyToSign, identity.cameoId))
                                .then(function(signature){
                                    return cmAuth.savePublicKeySignature(signingKey.id, keyToSign.id, signature)
                                })
                                .then(
                                    function(signature){
                                        keyToSign.importData({signatures:[signature]})  
                                        return signature                          
                                    },
                                    function(){
                                        self.trigger('signatures:failed');
                                    }
                                )
                    }))
                    .then(function(result){
                        self.trigger('signatures:saved', result)
                    })
        };

        this.verifyOwnPublicKey = function(key){
            // cmLogger.debug('cmUserModel.verifyOwnPublicKey');

            return this.loadLocalKeys().reduce(function(previous_try, local_key){
                return  previous_try
                        .catch(function(){
                            return  local_key.verifyKey(key, self.getTrustToken(key, self.data.identity.cameoId))
                        })
            }, $q.reject())
        };

        this.signOwnKeys = function(){
            //cmLogger.debug('cmUserModel.signOwnKeys');
            return this.verifyIdentityKeys(this.data.identity, true)
        }

        /**
         * [verifyIdentityKeys Checks for keys that are either signed by a local key or keys that are signed by a key of the former kind and have the same owner]
         * @param  {cmIdentitymodel} identity [description]
         * @return {cmKeyFactory}   cmKeyFactory returning all transitively trusted keys of identity. Users local keys are assumed to be trusted.
         */
        this.verifyIdentityKeys = function(identity, sign){
            //cmLogger.debug('cmUserModel.verifyIdentityKeys');

            if(!identity.keys)
                return $q.when([]);

            var local_keys = this.loadLocalKeys()

            return  $q.when()
                    .then(function(){
                        return  self.data.identity.keys.getTransitivelyTrustedKeys(local_keys, function trust(trusted_key, key){
                                    return trusted_key.verifyKey(key, self.getTrustToken(key, self.data.identity.cameoId))
                                })
                    })
                    .then(function(own_ttrusted_keys){
                        return  identity.keys.getTransitivelyTrustedKeys(own_ttrusted_keys, function trust(trusted_key, key){
                                    return trusted_key.verifyKey(key, self.getTrustToken(key, identity.cameoId))
                                });
                    })
                    .then(function(ttrusted_keys){
                        //looks for keys that are transitively trusted but not yet signed by all local keys:
                        var unsigned_ttrusted_keys  =   ttrusted_keys.filter(function(ttrusted_key){
                                                            return  local_keys.some(function(local_key){
                                                                        return  ttrusted_key.signatures.every(function(signature){
                                                                                    return signature.keyId != local_key.id
                                                                                })
                                                                    })
                                                        })

                        if(sign != true || unsigned_ttrusted_keys.length == 0)
                            return $q.when(ttrusted_keys)

                        self.state.set('signing');

                        $q.all(
                            unsigned_ttrusted_keys.map(function(ttrusted_key){
                                console.info('signing: '+ttrusted_key.name)
                                return self.signPublicKey(ttrusted_key, ttrusted_key.getFingerprint(), identity)
                            })
                        )
                        .finally(function(){
                             self.state.unset('signing')
                        });

                        return $q.when(ttrusted_keys)
                    })
        };

        this.verifyTrust = function(identity){
            return  identity.keys.length != 0
                    ?   this.verifyIdentityKeys(identity, true)
                        .then(function(trusted_keys){
                            return  identity.keys.length == trusted_keys.length
                                    ?   $q.when()
                                    :   $q.reject('untrusted key found.')
                        })
                    :  $q.reject('missing keys.')
        };

        this.clearLocalKeys = function(){
            this.storageSave('rsa', []);
        };

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys    =   this.loadLocalKeys().filter(function(key){
                                return (!keyId || key.id == keyId)
                            })


            return keys.reduce(function(previous_try, key){
                return  previous_try
                        .catch(function(){
                                return  key.decrypt(encrypted_passphrase)
                        })
            }, $q.reject())

        };

        this.bulkReKeying = function(localKeyId, newKeyId){
            cmLogger.debug('cmUserModel.startBulkReKeying');

            if(!this.state.is('rekeying')){
                this.state.set('rekeying');

                if(typeof localKeyId == 'string' && cmUtil.validateString(localKeyId)
                    && typeof newKeyId == 'string' && cmUtil.validateString(newKeyId))
                {
                    var localKey    = this.loadLocalKeys().find(localKeyId);
                    var newKey      = this.data.identity.keys.find(newKeyId);


                    if(localKey instanceof cmKey && newKey instanceof cmKey){
                        cmAuth.getBulkPassphrases(localKey.id, newKey.id)
                        .then(
                            function(list){

                                if(list.length == 0)
                                    return []

                                
                                //re and encrypt passphrasees one by one, dont try to de and encrypt them all simultaniuosly:
                                list.reduce(function(previous_run, item){
                                    return  previous_run
                                            .then(function(list_so_far){
                                                return  self.decryptPassphrase(item.aePassphrase, localKey.id)
                                                        .then(function(passphrase){
                                                            return newKey.encrypt(passphrase)
                                                        })
                                                        .then(function(encrypted_passphrase){
                                                            return  list_so_far.concat([{
                                                                        conversationId: item.conversationId, 
                                                                        aePassphrase:   encrypted_passphrase
                                                                    }])
                                                        })

                                            })
                                }, $q.when([]))
                                .then(function(newList){
                                    return  cmAuth.saveBulkPassphrases(newKey.id, newList)
                                })
                                .then(
                                    function(){
                                        return  cmApi.broadcast({
                                                    name: 'rekeying:finished',
                                                    data:{
                                                        keyId: newKey.id
                                                    }
                                                });
                                    },
                                    function(){
                                        cmLogger.debug('cmUserModel.bulkReKeying - Request Error - saveBulkPassphrases');
                                    }
                                )
                                .finally(function(){
                                    self.trigger('bulkrekeying:finished');
                                    self.state.unset('rekeying');
                                })


                            },function(){
                                cmLogger.debug('cmUserModel.bulkReKeying - Request Error - getBulkPassphrases');
                            }
                        ).finally(
                            function(){
                                self.trigger('bulkrekeying:finished');
                                self.state.unset('rekeying');
                            }
                        );
                    } else {
                        cmLogger.debug('cmUserModel.bulkReKeying - Key Error - getBulkPassphrases');
                        self.trigger('bulkrekeying:finished');
                        self.state.unset('rekeying');
                    }
                } else {
                    cmLogger.debug('cmUserModel.bulkReKeying - Parameter Error - getBulkPassphrases');
                    this.trigger('bulkrekeying:aborted');
                    this.state.unset('rekeying');
                }
            }
        };

        this.verifyPublicKeyForAuthenticationRequest = function(toKey, identity){
            identity = identity || self.data.identity

            var publicKeys = identity.keys;
            var localKeys = this.loadLocalKeys();


            return      toKey instanceof cmKey
                    &&  publicKeys.find(toKey) != null 
                    &&  localKeys.length > 0 
                    &&  localKeys.find(toKey) == null
        };

        /**
         * Token Functions
         * @TODO handle Token with identity
         */
        this.getToken = function(){
            //cmLogger.debug('cmUserModel:getToken');

            var token = cmAuth.getToken();


            if(token !== undefined && token !== 'undefined' && token !== null && token.length > 0){
                return token;
            }

            return false;
        };

        this.storeToken = function(token, force){
            //cmLogger.debug('cmUserModel:storeToken');
            cmAuth.storeToken(token, force);

            return this;
        };

        this.removeToken = function(where){
            //cmLogger.debug('cmUserModel:removeToken');
            cmAuth.removeToken(where);

            return this;
        };

        /**
         * LocalStorage Functions
         */
        this.initStorage = function(){
            this.data.storage = cmLocalStorage.create(this.data.id, this.data.userKey);
        };

        /**
         * save to identity storage
         * @param key
         * @param value
         */
        this.storageSave = function(key, value){
            if(isAuth !== false && this.data.storage !== null){
                this.data.storage.save(key, value);
            }
        };

        /**
         *  get from identity storage
         * @param key
         */
        this.storageGet = function(key){            
            if(isAuth !== false && this.data.storage !== null){
                return this.data.storage.get(key);
            }

            return null;
        };

        /**
         * remove from identity storage
         * @param key
         */
        this.storageRemove = function(key){
            if(isAuth !== false && this.data.storage !== null){
                this.data.storage.remove(key);
            }
        };

        /**
         * clear identity storage
         */
        this.resetUser = function(){
            this.reset();
        };

        init();

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(event, data){
            //cmLogger.debug('cmUserModel - $rootScope.logout');

            self.resetUser();
            isAuth = false;

            if(typeof data == 'object' && 'where' in data){
                self.removeToken(data.where);
            } else {
                self.removeToken();
            }

            if(typeof data == 'object' && 'goToLogin' in data && typeof data.goToLogin === 'undefined' || data.goToLogin !== false){
                $rootScope.goTo('/login');
            }
        });

        $rootScope.$on('identity:switched', function(){
            self.resetUser();
            init();
            self.one('update:finished', function(){
                if(!self.hasLocalKeys()){
                    $rootScope.goTo('/start/keyinfo');
                } else {
                    $rootScope.goTo('/talks');
                }
            });
        });

        this.on('update:finished', function(){
            cmBoot.ready.userModel();
        });

        cmAuth.on('identity:updated signatures:updated', function(event, data){
            if(typeof data.id != 'undefined' && data.id == self.data.identity.id) {
                self.data.identity.importData(data);
                self.syncLocalKeys();
                self.signOwnKeys()
            }
        });

    }
])

.service('cmUtil', [

    'cmLogger',
    '$window',
    '$injector',
    function(cmLogger, $window, $injector){
        /**
         * Checks if Key exists in an Object or Array
         * @param object
         * @param key
         * @returns {boolean}
         */
        this.checkKeyExists = function(object, key){
            if(angular.isDefined(object) && (typeof object === 'object' || typeof object === 'array') && angular.isDefined(key) && key != ''){
                var arr = Object.keys(object);

                if(arr.indexOf(key) !== -1){
                    return true;
                }
            }

            return false;
        };

        /**
         * Creates a String for Limit-Offset Handling in Api-Calls
         * @param limit
         * @param offset
         * @returns {string}
         */
        this.handleLimitOffset = function(limit,offset){
            var s = '';

            if(angular.isDefined(limit) && this.validateInt(limit) !== false){
                s = '?limit=' + parseInt(limit);
            } else {
                //default limit
            }

            if(s != '' && angular.isDefined(offset) && this.validateInt(offset) !== false){
                s += '&offset=' + parseInt(offset);
            }

            return s;
        };

        /**
         * Validate Numbers
         * @param val
         * @returns {boolean}
         */
        this.validateInt = function(val){
            var reg = /^\d+$/;

            return reg.test(val);
        };

        /**
         * Validate Strings without Special Characters and Whitespaces
         * @param val
         * @returns {boolean}
         */
        this.validateString = function(val){
            var reg     = /^[a-zA-Z0-9\-_]{1,}$/,
                valid   = reg.test(val)

            if(!valid)
                cmLogger.debug('cmUtil: validateString() failed for: ' + val)

            return valid;
        };

        /**
         * convert json to more row string
         * @param json
         * @returns well formated string
         */
        this.prettify = function(json){

            function censor(censor) {
                var i = 0;

                return function(key, value) {
                    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
                        return '[Circular]';

                    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
                        return '[Unknown]';

                    ++i; // so we know we aren't using the original object anymore

                    return value;
                }
            }

            return JSON.stringify(json, censor(json), 2);
        };

        /**
         * return key length of an object
         * @param obj
         * @returns {Number}
         */
        this.objLen = function(obj){
            if(obj == undefined)
                obj = {};
            return Object.keys(obj).length;
        };

        /**
         * convert first letter of string to Uppercase
         * @param string
         * @returns {string}
         */
        this.ucFirst = function(string){
            if(string == undefined || typeof string != 'string')
                string = '';

            string += '';
            var f = string.charAt(0).toUpperCase();
            return f + string.substr(1);
        };

        /**
         * converts bytes to human readable string
         * @param bytes
         * @returns {string}
         */
        this.bytesToStr = function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0 || typeof bytes != 'number') return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };

        /**
         *
         * @param current (integer) unix timestamp in ms
         * @param prev (integer) unix timestamp in ms
         * @returns {boolean} returns true, if day is different
         */
        this.compareDate = function(current, prev){
            if (typeof current !== 'undefined' && typeof prev !== 'undefined') {
                if (current > prev) {
                    var cDate = new Date(current);
                    var pDate = new Date(prev);

                    if ((cDate.getUTCFullYear() > pDate.getUTCFullYear())
                        || (cDate.getUTCMonth() > pDate.getUTCMonth())
                        || (cDate.getUTCDate() > pDate.getUTCDate())
                    ) {
                        return true;
                    }
                }
            } else if (typeof current !== 'undefined' && typeof prev === 'undefined') {
                return true;
            }
            return false;
        };

        /**
         * convert milliseconds to human readable string
         * @param milliseconds
         * @returns {string}
         */
        this.millisecondsToStr = function(milliseconds, printOutMs) {
            // TIP: to find current time in milliseconds, use:
            // var current_time_milliseconds = new Date().getTime();

            function addToString(newStr){//addWhiteSpace
                str+= (str != '' ? ' ': '')+newStr
            }

            if(typeof milliseconds != 'number')
                return 'n/a';

            var str = '',
                temp = milliseconds / 1000,
                years = Math.floor(temp / 31536000);

            if (years)
                addToString(years + 'y');

            var days = Math.floor((temp %= 31536000) / 86400);
            if (days)
                addToString(days + 'd');

            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours)
                addToString(hours + 'h');

            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes)
                addToString(minutes + 'm');

            var seconds = temp % 60;
            if (seconds && !printOutMs)
                addToString(Math.floor(seconds) + 's');

            if(seconds && printOutMs)
                addToString(temp + 's');

            if(str == '')
                addToString('...');

            return str;
        };

        /**
         * return type of given variable especially for array and objects
         * @param x
         * @returns {String}
         */
        this.getType = function(x){
            if(typeof x == 'string') return('String')

            var regex  = /\[object (.*)\]/,
                results = regex.exec(x.toString())

            return (results && results.length > 1) ? results[1] : '';
        };

        /**
         * check if string starts with needle
         * @param haystack
         * @param needle
         * @returns {boolean}
         */
        this.startsWith = function(haystack, needle){
            if(haystack == undefined || haystack == '' || needle == undefined) return false;
            return haystack.slice(0, needle.length) == needle;
        };

        /**
         * check if string ends with needle
         * @param haystack
         * @param needle
         * @returns {boolean}
         */
        this.endsWith = function (haystack, needle){
            if(haystack == undefined || haystack == '' || needle == undefined) return false;
            return haystack.slice(-needle.length) == needle;
        };

        this.isArray = function(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };

        this.isAlphaNumeric = function(id, length){
            var alphNumericRegExp = "^[a-zA-Z0-9]{"+(length||20)+"}$";
            var matches = id ? String(id).match(alphNumericRegExp) : null;
            return matches != null;
        };
    }
])
/*
        var webworker = {
            stack: [],
            isAvailable: function(){
                return !(window.Worker === undefined)
            },
            start: function(jsPath, data, onFinished){

                var worker = new Worker(jsPath);

                worker.addEventListener('message', function(e){
                    var result = e.data;
                    switch(result.msg){
                        case 'finished':
                            onFinished(result);
                        break;
                    }
                });

                worker.postMessage = worker.webkitPostMessage || worker.postMessage;

                worker.postMessage(data);

                this.stack.push({jsPath:jsPath,instance:worker});
            },
            cancel: function(jsPath, data, onFinished){
                var worker = this.stack.filter(function(worker){
                    return worker.jsPath == jsPath
                });

                if(worker.length > 0){
                    worker = worker[0].instance;

                    worker.addEventListener('message', function(e){
                        var result = e.data;
                        switch(result.msg){
                            case 'canceled':
                                onFinished(result);
                            break;
                        }
                    });

                    worker.postMessage(data);
                }
            }
        };
        */


.service('cmWebworker',[

    '$q',
    '$timeout',

    function cmWebWorker($q, $timeout, cmFactory){

        this.available = !!window.Worker

        var self                = this,
            number_of_workers   = 0

        function WebWorkerInstance(job_name){
            var worker      = new Worker('webworker/'+job_name+'.js'),
                deferred    = $q.defer(),
                self        = this

            number_of_workers ++

            var onMessage   =  function(event){
                                        if(event.data.msg == 'finished'){
                                            deferred.resolve(event.data)
                                            self.terminate()
                                        }

                                        if(['canceled', 'failed', 'error'].indexOf(event.data.msg) != -1){
                                            deferred.reject(event.data)
                                            self.terminate()
                                        }

                                        if(event.data.msg == 'notify')
                                            deferred.notify(event.data)
                                }

            this.start = function(data, timeout){
                if(timeout)
                    $timeout(function(){ 
                        deferred.reject('timeout')
                        self.cancel()
                    }, timeout)


                data.cmd = 'start'

                worker.addEventListener('message', onMessage)
                worker.postMessage(data)


                return  deferred.promise
            }

            this.cancel = function(){                
                worker.postMessage({cmd: 'cancel'})
                return  deferred.promise.catch(function(data){
                            return  data.msg == 'canceled'
                                    ?   $q.when('canceled')
                                    :   $q.reject(data)
                        })
            }

            this.terminate = function(){
                worker.removeEventListener('message', onMessage)
                worker.terminate()
                number_of_workers --
                console.warn('number of workers: '+number_of_workers)
                delete worker
                delete deferred 
            }
        }


        this.new = function(job_name){
            console.warn('number of workers: '+ (number_of_workers+1))
            return  number_of_workers < 20
                    ?   $q.when(new WebWorkerInstance(job_name))
                    :   $timeout(function(){
                            return self.new(job_name)
                        }, 1000, false)
        }    

    }

])
'use strict';

angular.module('comps/files/drtv-files-preview.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/files/drtv-files-preview.html',
'<div class="file-wrap" ng-repeat="file in files" ng-click="removeFile(file)"><i class="fa cm-close"></i><div class="file-image" ng-if="file.isImage()"><cm-loader ng-show="!file.loaded"></cm-loader><img cm-blob-image="file" /></div><div ng-if="!file.isImage()" class="file {{file.detectedExtension}}"></div></div>');
}]);
angular.module('comps/files/drtv-upload-avatar.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/files/drtv-upload-avatar.html',
'<button><i class="fa cm-settings" ng-show="!imageUpload"></i><cm-loader ng-show="imageUpload"></cm-loader></button><cm-files ng-model="files" id="files-droparea" data-qa="avatar-upload-btn"><cm-file-choose cm-droparea="files-droparea" cm-accept="image/*"></cm-file-choose><cm-choose-source cm-options="{tooltip:\'down\',useFrontCamera:true}"></cm-choose-source></cm-files>');
}]);
angular.module('cmFiles',[
    'cmCore',
    'cmUi',
    'cmPhonegap'
,'comps/files/drtv-files-preview.html','comps/files/drtv-upload-avatar.html'])
.directive('cmBlobImage',[
    '$rootScope',
    'cmFilesAdapter',
    function ($rootScope, cmFilesAdapter) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                function showFile(file){
                    if(typeof file.blob == 'object'){
                        cmFilesAdapter
                        .getBlobUrl(file.blob, true)
                        .then(function(objUrl){
                            file.url = objUrl;
                            element.attr('src', file.url.src);
                            element.on('load', function(){
                                // hide spinner
                                scope.$apply(function(){
                                    file.loaded = true;
                                });

//                                if(attrs.cmScrollTo) {
//                                    $rootScope.$broadcast('scroll:to');
//                                }
                            });
                        });

                    } else {
                        // hide spinner
                        file.loaded = true;
                    }
                }

                function handleBlob(file){
                    if(typeof file !== 'undefined'){
                        if(file.state.is('cached') || file.state.is('new')){
                            showFile(file);
                        }

                        file.on('file:cached', function(){
                            showFile(file);
                        });

                        file.on('upload:finish', function(){
                            showFile(file);
                        });
                    }
                }

                // load image via fileapi
                scope.$watch(attrs.cmBlobImage, handleBlob);
            }
        }
    }
])
.directive('cmBlobVideoAudio',[
    'cmEnv', 'cmFilesAdapter',
    '$rootScope',
    function (cmEnv, cmFilesAdapter,
              $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                function showFile(file){
                    if(typeof file.blob == 'object'){
                        var canPlay = element[0].canPlayType(file.type);
                        // browser supports file
                        if(!cmEnv.isiOS && canPlay) {
                            cmFilesAdapter.getBlobUrl(file.blob).then(function(objUrl){
                                file.url = objUrl;
                                element.attr('src', file.url.src);
                                fileReady(file);
                            });
                        // file can't play via html5 video
                        } else {
                            fileReady(file);

                            var fileEl = angular
                                .element('<div class="file '+file.detectedExtension+'" ></div>')
                                .on('click',function(){
                                    file.promptSaveAs()
                                });

                            element.parent().html('').append(fileEl[0]);
                        }
                        // can play mov without use filereader...
//                        element.attr('src',window.URL.createObjectURL(file.blob));
                    } else {
                        // hide spinner
                        file.loaded = true;
                    }
                }

                function handleBlob(file){
                    if(typeof file !== 'undefined'){
                        if(file.state.is('cached') || file.state.is('new')){
                            showFile(file);
                        }

                        file.on('file:cached', function(){
                            showFile(file);
                        });

                        file.on('upload:finish', function(){
                            showFile(file);
                        });
                    }
                }

                function fileReady(file){
                    // hide spinner
                    file.loaded = true;

                    if (attrs.cmScrollToTarget) {
                        $rootScope.$broadcast('scroll:to', attrs.cmScrollToTarget)
                    }
                }

                // load image via fileapi
                scope.$watch(attrs.cmBlobVideoAudio, handleBlob);
            }
        }
    }
])
// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.mdhttps://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md

.directive('cmFileChoose', [
    'cmDevice',
    '$rootScope',
    function (cmDevice,
              $rootScope) {

        var tpl = '<input type="file" data-qa="btn-file-choose" accept="{{accept}}" />';

        return {
            restrict: 'AE',
            require: '^cmFiles',
            template: tpl,

            controller: function($scope, $element, $attrs){
                // use accept var
                $scope.accept = '*';//file_extension|audio/*|video/*|image/*|media_type
                if('cmAccept' in $attrs){
                    $scope.accept = $attrs.cmAccept;
                }
            },
            link: function (scope, element, attrs, cmFilesCtrl) {
                var index = 1;

                // add countrer for save resets
                function addCounter(){
                    element.find('input').attr('cm-resets',index);
                }

                // phonegap
                if (cmDevice.isAndroid()){
                    element.on('click', function (evt) {
                        evt.preventDefault();
                        evt.stopPropagation();

                        // broadcast choos opener
                        $rootScope.$broadcast('cmChooseSource:open');
                    });
                } else {
                    // default fileapi
                    // file is selected
                    element.on('change', function (event) {
                        cmFilesCtrl.setFile(event.target.files[0]);
                    });
                }

                // reset files from sended message
                scope.$on('cmFileChooseResetFiles',function(){
                    element.html(tpl.replace('{{accept}}',scope.accept));
                    index++;
                    addCounter();
                });

                if(attrs.cmDroparea){
                    var droparea = angular.element(document.getElementById(attrs.cmDroparea));

                    if(droparea != undefined) {
                        droparea.on('dragleave', function (evt) {
                            var target = evt.target;
                            if (target && target === droparea[0]) {
                                droparea.removeClass('files-dragged');
                            }
                            evt.preventDefault();
                            evt.stopPropagation();
                        });

                        droparea.on('dragenter', function (evt) {
                            droparea.addClass('files-dragged');
                            evt.preventDefault();
                            evt.stopPropagation();
                        });

                        droparea.on('dragover', function (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        });

                        droparea.on('drop', function (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();

                            var files = evt.dataTransfer.files;

                            for (var i=0, l=files.length; i<l; i++) {
                                cmFilesCtrl.setFile(files[i]);
                            }

                            droparea.removeClass('files-dragged');
                        });
                    }
                }

                // init
                addCounter();
            }
        }
    }
])
.directive('cmFilesPreview',[
    '$rootScope', '$document',
    function($rootScope, $document) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-files-preview.html',
            require: '^cmFiles',

            link: function (scope, element, attrs, cmFilesCtrl) {
                scope.removeFile = function(file){
                    cmFilesCtrl.removeFile(file);
                };

                $rootScope.$on('textArea:resize', function(event){
                    var answerMessage = $document[0].querySelector('div.answer .message');
                    element.css('bottom',answerMessage.offsetHeight+'px');
                });
            }
        }
    }
])
.directive('cmFiles',[
    'cmFileFactory', 'cmUtil',
    '$q', '$rootScope',
    function (cmFileFactory, cmUtil,
              $q, $rootScope){
        return {
            restrict : 'E',
            controller : function($scope){
                $scope.files = $scope.files || [];

                /**
                 * function called via <input type=file> or
                 * @param blob
                 * @returns {boolean}
                 */
                this.setFile = function(blob){

//                    TODO: Android name=content fix file plugin!!!
//                    console.log(blob)

                    var bool = true;

                    angular.forEach($scope.files, function(value){
                        if(value.name == blob.name && value.size == blob.size){
                            bool = false;
                        }
                    });

                    if(!bool){
                        return false;
                    }

                    var file = cmFileFactory.create(blob,true);
                    $scope.files.push(file);

                    $rootScope.$broadcast('cmFilesFileSetted');
                };

                this.removeFile = function(file){
                    if(cmFileFactory.remove(file)){
                        var index = $scope.files.indexOf(file);
                        $scope.files.splice(index,1);
                        $scope.$broadcast('reset:files');
                    }
                };

                /**
                 * external get files
                 * prepare files and return to caller
                 * @type {Array}
                 */
                $rootScope.$$listeners.cmFilesCheckFiles = [];
                $rootScope.$on('cmFilesCheckFiles', function(event, options){
                    $scope.prepareFilesForUpload(options.passphrase, options.conversationId)
                    .then(
                        function(){
                            if(typeof options.success == 'function'){
                                options.success($scope.files);
                                $scope.resetFiles();
                            }
                        },
                        function(result){
                            if(typeof options.error == 'function'){
                                options.error(result.data.error.maxFileSize, result.config.headers);
                            }
                        }
                    )
                });

                /**
                 * prepare all files for upload
                 * encrypt name & chunks
                 * api call to get fileId
                 * @param passphrase
                 * @returns {*}
                 */
                $scope.prepareFilesForUpload = function(passphrase, conversationId){
                    var promises = [];

                    // create all files and get fileIds
                    angular.forEach($scope.files, function(file){
                        promises.push(
                            file
                                .setPassphrase(passphrase)
                                .encryptName()
                                .prepareForUpload(conversationId)
                        )
                    });

                    return $q.all(promises);
                };

                /**
                 * clear files
                 */
                $scope.resetFiles = function(){
                    $scope.files = [];
                    $scope.$broadcast('cmFileChooseResetFiles');
                };
            }
        }
    }
])
.directive('cmUploadAvatar',[
    'cmNotify', 'cmUserModel',
    '$rootScope', '$timeout',
    function(cmNotify, cmUserModel,
             $rootScope, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-upload-avatar.html',

            link: function (scope) {
                scope.imageUpload = false;
                // after add a image
                var watcher = $rootScope.$on('cmFilesFileSetted', function(){
                    $rootScope.$broadcast('cmFilesCheckFiles', {
                        passphrase: undefined,
                        success: function(files) {
                            if (files.length > 0) {
                                scope.imageUpload = true;
                                files[0].uploadChunks();
                                files[0].one('upload:finish',function(){
                                    cmUserModel
                                    .data.identity
                                    .update({
                                        avatar: files[0].id
                                    });

                                    cmUserModel.data.identity.one('update:finished', function(){
                                        $timeout(function(){
                                            cmUserModel.data.identity.one('avatar:loaded',function(){
                                                scope.imageUpload = false;
                                            });
                                        });
                                    });
                                });
                            }
                        },
                        error: function(maxFileSize, header) {
                            cmNotify.warn('CONVERSATION.WARN.FILESIZE_REACHED', {
                                ttl: 0,
                                i18n: {
                                    maxFileSize: maxFileSize,
                                    fileSize: header['X-File-Size'],
                                    fileName: header['X-File-Name']
                                }
                            });
                        }
                    });
                });
                scope.$on('$destroy',function(){
                    watcher();
                });
            }
        }
    }
])
.filter('cmFileSize', [
    'cmFilesAdapter',
    function () {
        return function(bytes, unit) {
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB'],
            units = {
                1000 : ['bytes', 'kb', 'MB', 'GB', 'TB'],
                1024 : ['bytes', 'KiB', 'MiB', 'GiB', 'TiB']
            };

            var base = (unit && unit.toUpperCase().match(/I/gi)) ? 1024 : 1000;

            if (bytes == 0) return 'n/a';
            var i = unit ? sizes.indexOf(unit.toUpperCase().replace(/I/gi)) :-1;

            i = (i == -1) ? parseInt(Math.floor(Math.log(bytes) / Math.log(base))) : i;

            return Math.round(bytes / Math.pow(base, i)*100)/100 + ' ' + units[base][i];
        }
    }
])
'use strict';

angular.module('comps/phonegap/drtv-choose-source.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/phonegap/drtv-choose-source.html',
'<div class="wrapper {{options.tooltip}}" ng-show="showList"><i ng-if="options.tooltip == \'down\'" class="fa cm-nose-up flip"></i><div class="source" ng-repeat="type in types" ng-click="choosedType(type)"><i class="fa {{type.icon}}"></i>{{\'DRTV.CHOOSE_SOURCE.\'+type.i18n|cmTranslate}}</div><i ng-if="options.tooltip == \'up\'" class="fa cm-nose-down flip"></i></div>');
}]);
angular.module('cmPhonegap',['cmCore','comps/phonegap/drtv-choose-source.html'])
// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.mdhttps://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md

.directive('cmChooseSource', [
    'cmDevice', 'cmCamera',
    '$rootScope', '$document',
    function (cmDevice, cmCamera,
              $rootScope, $document) {

        return {
            restrict: 'E',
            require: '^cmFiles',
            templateUrl: 'comps/phonegap/drtv-choose-source.html',
            scope: {
                cmOptions: '=cmOptions'
            },
            controller: function($scope){
                // option for drtv
                $scope.options = angular.extend({}, {
                    tooltip:'up', // up | down
                    useFrontCamera: false
                }, $scope.cmOptions || {});
            },

            link: function (scope, element, attrs, cmFilesCtrl) {
                // only for phonegap
                if (!cmDevice.isAndroid()) {
                    return false;
                }

                // source types
                scope.types = [
                    {icon:'cm-camera',i18n:'CAMERA'},
                    {icon:'cm-file',i18n:'FILE'}
                ];

                // watch for extern handler
                $rootScope.$on('cmChooseSource:open', function(){
                    scope.toggleList('show',true);
                });

                // type handler
                scope.choosedType = function(type){
                    scope.toggleList('close');
                    switch(type.i18n.toLowerCase()){
                        case "camera":
                            cmCamera.takePhoto(function(blob){
                                cmFilesCtrl.setFile(blob);
                            },scope.options.useFrontCamera);
                        break;
                        case "file":
                            cmCamera.chooseFile(function(blob){
                                blob.useLocalUri = true;
                                cmFilesCtrl.setFile(blob);
                            });
                        break;
                    }
                };

                // click outside
                var body = angular.element($document[0].querySelector('body'));

                function findParent (tag_name, el) {
                    // loop up until parent element is found
                    while (el && el.nodeName.toLowerCase() !== tag_name) {
                        el = el.parentNode;
                    }
                    // return found element
                    return el;
                }

                function clickOutside(e){
                    if(e.target != element[0] && // target not emojilist
                        !findParent('cm-choose-source',e.target) // chooselist isnt parent
                     && !findParent('cm-files',e.target) // isnt handler
                        ) {
                        scope.toggleList('close',true);
                    }
                }

                scope.toggleList = function(action, withApply){
                    scope.showList = action && action == 'close'
                                  || action && action == 'show' && scope.showList
                                  || !action && scope.showList
                                  ? false : true;

                    if(scope.showList){
                        body.on('click',clickOutside);
                        body.on('touchstart',clickOutside);
                    } else {
                        body.off('click',clickOutside);
                        body.off('touchstart',clickOutside);
                    }

                    if(withApply != undefined && withApply)
                        scope.$apply();
                };

                scope.toggleList('close');
            }
        }
    }]
)
//https://github.com/apache/cordova-plugin-inappbrowser/blob/8ce6b497fa803936784629187e9c66ebaddfbe1b/doc/index.md

.directive('target',[
    '$window',
    function ($window){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                return false;

                /*
                 target
                 _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
                 _blank: Opens in the InAppBrowser.
                 _system: Opens in the system's web browser.
                 */

                //

                if(attrs.target != ''){
                    element.on('click',function(event){
                        console.log('open external link',attrs.href)
                        alert('open '+attrs.target+' link ',attrs.href)
                        event.stopPropagation();
                        event.preventDefault();

                        //navigator.app.loadUrl(attrs.href, { openExternal:true });

                        var ref = $window.open(attrs.href, attrs.target, 'location=yes');

                        // loadstart loadstop loaderror exit
                        // ref.addEventListener(eventname, callback);
                        // ref.removeEventListener(eventname, callback);
                        // ref.close();
                        // ref.show();
                        // ref.executeScript(details, callback);
                        // ref.insertCSS(details, callback);
                    });
                }
            }
        }
    }
])

.factory('$device', ['cmPhonegap',
    function(cmPhonegap){
        function init(){
            return typeof device != 'undefined' ? device : undefined;
        }

        var $device = init();

        cmPhonegap.isReady(function(){
            $device = init();
        });

        return {
            get: function () {
                return $device;
            }
        }
    }
])

.factory('$navigator', function(){
    return typeof navigator != 'undefined' ? navigator : undefined;
})

.factory('$phonegapCameoConfig', function(){
    return typeof phonegap_cameo_config != 'undefined' ? phonegap_cameo_config : undefined;
})
// https://github.com/phonegap-build/PushPlugin


.service('cmPushNotificationAdapter', [
    'cmPhonegap', 'cmDevice', 'cmPushNotifications',
    'cmUtil', 'cmLanguage', 'cmApi', 'cmLogger', 'cmObject',
    '$rootScope', '$window', '$phonegapCameoConfig', '$injector',
    function (cmPhonegap, cmDevice, cmPushNotifications,
              cmUtil, cmLanguage, cmApi, cmLogger, cmObject,
              $rootScope, $window, $phonegapCameoConfig, $injector) {

        var self = {
            plugin: null,
            currentDeviceData: {
                token: undefined,
                id: undefined
            },
            deviceIsRegistrated: false,
            isDeviceRegistrated: function(){
                return this.deviceIsRegistrated;
            },

            init: function(){
                if (typeof $phonegapCameoConfig == 'undefined'){
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('plugins' in $window) || !('pushNotification' in $window.plugins)) {
                        //cmLogger.info('PUSHNOTIFICATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $window.plugins.pushNotification;
                    self.registerAtService();
                })
            },

            registerAtService: function(){
                cmLogger.info('cmPushNotificationAdapter.registerAtService')
                cmPushNotifications.registerAtService(self.plugin);
            },

            unregisterAtService: function(){
                cmPushNotifications.unregisterAtService();
            },

            getDeviceData: function(){
                return cmPushNotifications.getDeviceData();
            },

            checkRegisteredDevice: function(accountPushDevices){
//                cmLogger.info('cmPushNotificationAdapter.checkRegisteredDevice')
                // BE MOCK
                /*
                 accountPushDevices = [
                     {
                         "deviceToken": "id",
                         "language": "en-US",
                         "platform": "android"
                     }
                 ]
                 */
                // check if BE knows the registered device
//                this.getDeviceData()
//                .then(function(deviceData){
//                    var accountPushDevices = accountPushDevices || [],
//                        deviceIsRegistered = accountPushDevices.filter(function(deviceToken){
//                            return deviceToken == deviceData.token
//                        }).length == 1;
//
//                    if(!deviceIsRegistered){
//                        self.registerDevice();
//                    }
//                });
                cmPhonegap.isReady(function(){
                    if($injector.get('cmSettings').get('pushNotifications')) {
                        self.registerDevice();
                    }
                });
            },

            registerDevice: function(){
//                cmLogger.info('cmPushNotificationAdapter.registerDevice')
                // BE MOCK
                /*
                 {
                 "deviceId":"id",
                 "language":"en-US",
                 "platform":"android"
                 }
                 */
                this.getDeviceData()
                .then(function(deviceData){
                    cmLogger.info('post pushDevice: '+ deviceData.token)
                    self.currentDeviceData = deviceData;
                    cmApi.post({
                        path: '/pushDevice',
                        data: {
                            deviceToken: deviceData.token,
                            language: cmLanguage.getCurrentLanguage().replace('_','-'),
                            platform: cmDevice.getCurrentOS()
                        }
                    }).then(
                        function(){
                            self.deviceIsRegistrated = true;
                            self.trigger('device:registrated');
                        }
                    );
                });
            },

            deleteDevice: function(token){
//                cmLogger.info('cmPushNotificationAdapter.deleteDevice')
                if(cmDevice.getCurrentOS() != 'unknown'
                && this.currentDeviceData.token) {

                    cmLogger.info('delete pushDevice: '+ this.currentDeviceData.token)

                    var data = {
                        path: '/pushDevice/'+cmDevice.getCurrentOS()+'/'+this.currentDeviceData.token,
                    };

                    // this token for logout
                    if(token)
                        data.overrideToken = token;

                    cmApi.delete(data)
                    .then(function(){
                        self.deviceIsRegistrated = false;
                        self.trigger('device:unregistrated');
                    });
                }
            }
        };

        cmObject.addEventHandlingTo(self);

        $rootScope.$on('logout', function(event, data){
            self.deleteDevice(data.token);
        });

        return self;
    }
])
// https://github.com/phonegap-build/PushPlugin
// https://github.com/phonegap-build/PushPlugin#plugin_api


.service('cmPushNotifications', [
    'cmPhonegap', 'cmUtil', 'cmDevice', 'cmLogger',
    '$q', '$rootScope', '$phonegapCameoConfig',
    function (cmPhonegap, cmUtil, cmDevice, cmLogger,
              $q, $rootScope, $phonegapCameoConfig) {

        var self = {
            plugin: null,
            deviceToken: '',
            promise: undefined,
            channelName: 'cameo',

            reset: function(){
                this.deviceToken = '';
            },

            registerAtService: function(plugin){
                cmLogger.info('cmPushNotifications.registerAtService')

                this.plugin = plugin;
                this.reset();

                // only gcm needs an senderid
                if (cmDevice.isAndroid()) {
                    this.plugin.register(
                        function() {
                            self.handler.success('registerAtService.isAndroid',arguments);
                        },
                        function() {
                            self.handler.error('registerAtService.isAndroid',arguments);
                        },
                        {
                            senderID: $phonegapCameoConfig.googleSenderId,
                            ecb: 'window.PushNotificationsCB.onNotification.Android'
                        }
                    );
                } else if(cmDevice.isiOS()){

                    this.unregisterAtService();

                    this.plugin.register(
                        function(result){
                            self.handler.success('registerAtService.isiOS',arguments);
                            self.handler.token(result);
                        },
                        function(){
                            self.handler.error('registerAtService.isiOS',arguments);
                        },
                        {
                            badge: true,
                            sound: true,
                            alert: true,
                            ecb: 'window.PushNotificationsCB.onNotification.iOS'
                        }
                    );
                } else if(cmDevice.isWinPhone8()) {
                    this.plugin.register(
                        function(result) {
                            self.handler.channel(result);
                        },
                        function() {
                            self.handler.error('registerAtService.isWinPhone8',arguments);
                        },
                        {
                            channelName: this.channelName,
                            ecb: 'window.PushNotificationsCB.onNotification.WP8',
                            uccb: 'window.PushNotificationsCB.handler.channel',
                            errcb: 'window.PushNotificationsCB.handler.error'
                        }
                    );
                }
            },

            unregisterAtService: function(){
                this.plugin.unregister(
                    function(){
                        self.handler.success('unregisterAtService',arguments)
                    },
                    function(){
                        self.handler.error('unregisterAtService',arguments)
                    },
                    {
                        channelName: this.channelName
                    }
                );
            },

            setDeviceToken: function(token){
                cmLogger.info('cmPushNotifications.setDeviceToken: '+token)
                this.deviceToken = token;

                this.initPromise();
                this.promise.resolve({token:this.deviceToken,id:0});
            },

            initPromise: function(){
                if(!this.promise)
                    this.promise = $q.defer();
            },
            getDeviceData: function(){
                this.initPromise();
                return this.promise.promise;
            },

            handler: {
                success: function(result){
                    cmLogger.info('cmPushNotifications.handler.success: '+cmUtil.prettify(result))
                },
                token: function(token){
                    self.setDeviceToken(token);
                },
                channel: function(result){
                    //console.log('##channelHandler###############');
                    //console.log(cmUtil.prettify(result));
                },
                error: function(result) {
                    cmLogger.error('cmPushNotifications.handler.error: '+cmUtil.prettify(result))
                }
            },

            onNotification: {
                Android: function (event) {
                    switch (event.event) {
                        case 'registered':
                            if (event.regid.length > 0) {
                                self.setDeviceToken(event.regid);
                            } else {
                                cmLogger.warn('Device couldn\'t register at GCM');
                            }
                            break;
                        case 'message':
                            if(!event.foreground){
                                self.onContext(event.payload.context);
                            } else {
                                //console.log('cmBimmel!!!',event.payload.context)
                            }
                            break;

                        case 'error':
                            self.handler.error('onNotification.Android.error',event);
                        break;
                        default:
                            self.handler.error('onNotification.Android.default',event);
                        break;
                    }
                },
                iOS: function (event) {
                    if('sound' in event && event.sound != '') {
                        self.onContext(event.sound);
                    }

                    if (event.badge) {
                        self.plugin.setApplicationIconBadgeNumber(
                            function(result) {
                                self.handler.success('onNotification.iOS.setApplicationIconBadgeNumber',arguments);
                            },
                            function() {
                                self.handler.error('onNotification.iOS.error',arguments);
                            },
                            event.badge
                        );
                    }
                },
                WP8: function(event){
                    if (event.type == "toast" && event.jsonContent) {
                        self.plugin.showToastNotification(
                            function(){
                                self.handler.success('onNotification.WP8.showToastNotification',arguments);
                            },
                            function(){
                                self.handler.error('onNotification.WP8.error',arguments);
                            },
                            {
                                Title: event.jsonContent["wp:Text1"],
                                Subtitle: event.jsonContent["wp:Text2"],
                                NavigationUri: event.jsonContent["wp:Param"]
                            });
                    }

                    if (event.type == "raw" && event.jsonContent) {
                        self.onContext(event.jsonContent.Body);
                    }
                }
            },

            onContext: function(data){
                cmLogger.error('cmPushNotifications.onContext: '+data);
                var context = data.split(':');
                switch(context[0]){
                    case 'message':
                        $rootScope.goTo('conversation/'+context[1], true);
                    break;
                    case 'friendRequest':
                        $rootScope.goTo('contact/request/list', true);
                    break;
                }
            }
        };
        // for callback
        window.PushNotificationsCB = self;

        return self;
    }
])
// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md
// https://github.com/apache/cordova-plugin-device/blob/d7b0855ef8eaa6731485a8e529b3607a3c65e7f2/doc/index.md

/*
 Camera = {
 "DestinationType":{
     "DATA_URL":0, //base64
     "FILE_URI":1,
     "NATIVE_URI":2
 },
 "EncodingType":{
     "JPEG":0,
     "PNG":1
 },
 "MediaType":{
     "PICTURE":0,
     "VIDEO":1,
     "ALLMEDIA":2
 },
 "PictureSourceType":{
     "PHOTOLIBRARY":0,
     "CAMERA":1,
     "SAVEDPHOTOALBUM":2
 },
 "PopoverArrowDirection":{
     "ARROW_UP":1,
     "ARROW_DOWN":2,
     "ARROW_LEFT":4,
     "ARROW_RIGHT":8,
     "ARROW_ANY":15
 },
 "Direction":{
     "BACK":0,
     "FRONT":1
 }
 }*/


.service('cmCamera', [
    'cmPhonegap', 'cmFilesAdapter',
    '$navigator', '$window', '$phonegapCameoConfig',
    function (cmPhonegap, cmFilesAdapter,
              $navigator, $window, $phonegapCameoConfig) {

        function FileError(e){
            var msg;
            switch (e.code) {
                case FileError.ABORT_ERR:
                    msg = 'ABORT_ERR';
                    break;
                case FileError.NOT_READABLE_ERR:
                    msg = 'NOT_READABLE_ERR';
                    break;
                case FileError.ENCODING_ERR:
                    msg = 'ENCODING_ERR';
                    break;
                case FileError.NO_MODIFICATION_ALLOWED_ERR:
                    msg = 'NO_MODIFICATION_ALLOWED_ERR';
                    break;
                case FileError.SYNTAX_ERR:
                    msg = 'SYNTAX_ERR';
                    break;
                case FileError.TYPE_MISMATCH_ERR:
                    msg = 'TYPE_MISMATCH_ERR';
                    break;
                case FileError.PATH_EXISTS_ERR:
                    msg = 'PATH_EXISTS_ERR';
                    break;
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'QUOTA_EXCEEDED_ERR';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'NOT_FOUND_ERR';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'SECURITY_ERR';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'INVALID_MODIFICATION_ERR';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'INVALID_STATE_ERR';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            };
            console.log('errror readEntries '+msg)
        }

        var CameraVars = {
            "DestinationType":{
                "DATA_URL":0, //base64
                "FILE_URI":1,
                "NATIVE_URI":2
            },
            "EncodingType":{
                "JPEG":0,
                "PNG":1
            },
            "MediaType":{
                "PICTURE":0,
                "VIDEO":1,
                "ALLMEDIA":2
            },
            "PictureSourceType":{
                "PHOTOLIBRARY":0,
                "CAMERA":1,
                "SAVEDPHOTOALBUM":2
            },
            "PopoverArrowDirection":{
                "ARROW_UP":1,
                "ARROW_DOWN":2,
                "ARROW_LEFT":4,
                "ARROW_RIGHT":8,
                "ARROW_ANY":15
            },
            "Direction":{
                "BACK":0,
                "FRONT":1
            }
        };

        var self = {
            plugin: null,

            init: function () {
                if (typeof $phonegapCameoConfig == 'undefined'){
                    return false;
                }

                cmPhonegap.isReady(function () {
                    if(typeof $navigator == 'undefined'
                    || !('camera' in $navigator)) {
                        //cmLogger.info('CAMERA PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $navigator.camera;
                });

                return true;
            },

            existsPlugin: function () {
                return this.plugin != null;
            },

            takePhoto: function (callback, useFrontCamera) {
                if (!this.existsPlugin()) {
                    return false;
                }

                if (callback == undefined)
                    callback = function () {
                    };

                this.plugin.getPicture(
                    function (base64) {
                        var blob = cmFilesAdapter.base64ToBlob(base64, 'image/jpeg');
                        blob.name = 'NewCameoPicture.jpg';
                        callback(blob);
                    },
                    null,
                    {
                        sourceType: CameraVars.PictureSourceType.CAMERA,
                        quality: 60,
                        encodingType: CameraVars.EncodingType.JPEG,
                        destinationType: CameraVars.DestinationType.DATA_URL,
                        mediaType: CameraVars.MediaType.PICTURE,
                        cameraDirection: CameraVars.Direction[useFrontCamera ? 'FRONT' : 'BACK'],
                        saveToPhotoAlbum: true,
                        correctOrientation: true
                    }
                );

                return true;
            },
            chooseFile: function (callback) {
                if (!this.existsPlugin()) {
                    return false;
                }

                if (callback == undefined)
                    callback = function () {
                    };

                this.plugin.getPicture(
                    function (fileUri) {
                        if (!('resolveLocalFileSystemURL' in $window))
                            return false;

                        // uri to blob
                        $window.resolveLocalFileSystemURL(fileUri, function (fileEntry) {
                            // TODO: get displayname (filename) of file (exp.: data.extension)
//                            console.log('resolveLocalFileSystemURL')
//                            console.log(fileEntry.fullPath)
//                            fileEntry.getParent(function(parent){
//                                console.log('getparent biatsch '+parent.name)
//                                var reader = parent.createReader();
//                                reader.readEntries(function(entries){
//                                    console.log('readEntries of '+entries.length)
//                                    console.log(cmUtil.prettify(arguments))
//                                }, FileError);
//                            }, FileError)

                            fileEntry.file(function (blob) {
                                callback(blob);
                            }, FileError);
                        });
                    },
                    null,
                    {
                        sourceType: CameraVars.PictureSourceType.PHOTOLIBRARY,
                        destinationType: CameraVars.DestinationType.FILE_URI,
                        mediaType: CameraVars.MediaType.ALLMEDIA
                    }
                );

                return true;
            }
        };

        self.init();

    return self;
    }
])
.service('cmDeviceDownload', [
    'cmPhonegap', 'cmDevice', 'cmUtil',
    function (cmPhonegap, cmDevice, cmUtil) {

        function errorHandler(){
            var msg = '';

            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'QUOTA_EXCEEDED_ERR';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'NOT_FOUND_ERR';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'SECURITY_ERR';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'INVALID_MODIFICATION_ERR';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'INVALID_STATE_ERR';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            };

            console.log('cmDeviceDownload Error: ' + msg);
        }

        return {
            isSupported: function(){
                return false && cmDevice.isAndroid();
            },
            saveAs: function(cmFileModel){



                /*
                 LocalFileSystem.PERSISTENT
                 window.TEMPORARY
                */

                window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

                window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                5*1024*1024 /*5MB*/,
                function(fileSystem){
                    console.log('Opened file system: ' + fileSystem.name);

                    var directoryEntry = fileSystem.root,
                        directoryReader = directoryEntry.createReader();

                    directoryReader.readEntries(function(entries){
                        var sOutput = "";
                        for(var i=0; i < entries.length; i++){
                            if(!entries[i].isDirectory){
                                console.log(entries[i].name)
                                //fileSystem.root.getFile(entries[i].name,null,gotFileEntry,errorHandler);
                            }
                        }
                        //displayMessage(sOutput);
                    },errorHandler);

//                    directoryEntry.getFile('file:///example.txt', {create: true, exclusive: true}, function(fileEntry) {
//
//                        // fileEntry.isFile === true
//                        // fileEntry.name == 'log.txt'
//                        // fileEntry.fullPath == '/log.txt'
//                        console.log('file fullpath: '+fileEntry.fullPath)
//                    }, errorHandler);

                },
                errorHandler);

                function gotFileEntry(fileEntry){
                    fileEntry.file(function(file){
                        var reader = new FileReader();
                        reader.onloadend = function(evt){
                            displayMessage(evt.target.result);
                        };
                        reader.readAsText(file);
                    },errorHandler);
                }
            }
        }
    }
])
// https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md


.service('cmDevice', [
    'cmPhonegap', 'cmLogger', 'cmUtil',
    '$window', '$device', '$phonegapCameoConfig',
    function (cmPhonegap, cmLogger, cmUtil,
              $window, $device, $phonegapCameoConfig) {

        var unknown = 'unknown';

        var self = {
            plugin: null,
            debug: false,
            debugDevice: 'android',

            init: function(){
                if(typeof $phonegapCameoConfig == 'undefined') {
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(typeof $device.get() == 'undefined'){
                        //cmLogger.info('DEVICE PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $device.get()
                });
            },

            existsPlugin: function(){
                return this.plugin != null;
            },

            isApp: function(){
                if(this.debug) {
                    cmLogger.warn('cmPhonegap.cmDevice.debug == true!!!');
                    this.plugin = {};
                }

                return this.debug || !this.debug && this.existsPlugin();
            },

            getPlatform: function(){
                return this.isApp()
                    && 'platform' in this.plugin
                     ? this.plugin.platform.toLowerCase()
                     : unknown;
            },

            isAndroid: function(){
                if(this.debug && this.debugDevice.indexOf('android') >= 0){
                    return true;
                }
                return this.isApp()
                    && this.getPlatform().indexOf('android') >= 0;
            },
            isiOS: function(){
                return this.isApp()
                   && (this.getPlatform().indexOf('iphone') >= 0
                    || this.getPlatform().indexOf('ipad') >= 0
                    || this.getPlatform().indexOf('ios') >= 0);
            },
            isWinPhone: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('win') >= 0;
            },
            isWinPhone8: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('win32nt') >= 0;
            },
            isBlackBerry: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('blackberry') >= 0;
            },
            isAmazonFireOS: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('amazon-fireos') >= 0;
            },

            getCurrentOS: function(){
                var os = 'unknown';

                if(!this.isApp())
                    return os;

                if (this.isAndroid()) {
                    os = 'and';
                } else if (this.isWinPhone()) {
                    os = 'win';
                } else if (this.isiOS()) {
                    os = 'ios';
                } else if (this.isBlackBerry()){
                    os = 'bby';
                }

                return os;
            },

            getId: function(){
                if(!this.isApp())
                    return unknown;

                return this.plugin.uuid;
            },

            getName: function(){
                if(!this.isApp())
                    return unknown;

                return this.plugin.name;
            },

            getVersion: function(){
                if(!this.isApp())
                    return unknown;

                return this.plugin.version;
            },

            detectOSAndBrowser: function() {
                var nAgt = $window.navigator.userAgent.toLowerCase(),
                    OSName = 'unknown OS',
                    browserName = 'unknown Browser',
                    nameOffset,
                    verOffset;

                function has(needle){
                    return nAgt.indexOf(needle) != -1
                }

                var detecable = {
                    os: {
                        win: 'Windows',
                        sym: 'Symbian',
                        ios: 'iOS',
                        mac: 'Mac OS X',
                        and: 'Android',
                        uni: 'Unix',
                        lin: 'Linux'
                    },
                    browser: {
                        opr: 'Opera',
                        iex: 'Internet Explorer',
                        iem: 'IEMobile',
                        nab: 'Native Browser',
                        chr: 'Google Chrome',
                        saf: 'Safari',
                        mff: 'Mozilla Firefox',
                        app: 'App'
                    }
                };

                // os detection
                if (has('win'))
                    OSName = detecable.os.win;
                else if(has('symbianos'))
                    OSName = detecable.os.sym;
                else if(has('like mac os x'))
                    OSName = detecable.os.ios;
                else if(has('mac'))
                    OSName = detecable.os.mac;
                else if(has('android'))
                    OSName = detecable.os.and;
                else if(has('x11'))
                    OSName = detecable.os.uni;
                else if(has('linux'))
                    OSName = detecable.os.lin;

                // browser detection
                if ((verOffset = has('opera')) || (verOffset = has('opr')))
                    browserName = detecable.browser.opr;
                else if ((verOffset = has('iemobile')))
                    browserName = detecable.browser.iem;
                else if ((verOffset = has('msie')) || (verOffset = has('rv:11.0')))
                    browserName = detecable.browser.iex;
                else if ((verOffset = has('linux; u; android')))
                    browserName = detecable.browser.nab;
                else if ((verOffset = has('chrome')))
                    browserName = detecable.browser.chr;
                else if ((verOffset = has('safari')))
                    browserName = detecable.browser.saf;
                else if ((verOffset = has('firefox')))
                    browserName = detecable.browser.mff;
                // In most other browsers, 'name/version' is at the end of userAgent
                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                    browserName = nAgt.substring(nameOffset, verOffset);
                    if (browserName.toLowerCase() == browserName.toUpperCase()) {
                        browserName = 'unknown Browser';
                    }
                }

                // app check overrides all
                if(this.isApp())
                    browserName = detecable.browser.app;

                return {
                    givenBrowserUserAgent: nAgt,
                    os: OSName,
                    browser: browserName
                };
            }
        };

        self.init();

        return self;
    }
])
// https://github.com/wildabeast/cordova-plugin-contacts/blob/b8f6ce5bd04298f7fd4cba7c136389cf66eddc6b/doc/index.md

/*  android & ios contact json
 {
    displayName: "GiverName FamilyName",
    name: {
        familyName: "FamilyName",
        formatted: "GiverName FamilyName",
        givenName: "GiverName",
        middleName: "MiddleName",
    },
    phoneNumbers: [
     {
        id: "1234",
        pref: false,
        type: "mobile", // mobile | work | fax
        value: "+49 123 4567890",
     }
    ],
    emails: [
     {
         id: "1246",
         pref: false,
         type: "work", // other
         value: "some.coworker@cameo.io",
     }
    ]
 }
 */

.service('cmLocalContacts', [
    'cmPhonegap', 'cmUtil', 'cmLogger', 'cmDevice',
    '$q', '$navigator', '$phonegapCameoConfig',
    function (cmPhonegap, cmUtil, cmLogger, cmDevice,
              $q, $navigator, $phonegapCameoConfig) {

        var self = {
            plugin: null,

            init: function () {
                if(typeof $phonegapCameoConfig == 'undefined') {
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('contacts' in $navigator)) {
                        //cmLogger.info('CONTACTS PLUGIN IS MISSING');
                        return false;
                    }
                    self.plugin = $navigator.contacts;
                });

                return true;
            },

            canRead: function() {
                if(cmDevice.debug)
                    cmLogger.warn('cmPhonegap.cmLocalContacts.debug == true!!!');
                return cmDevice.debug || !cmDevice.debug && this.plugin != null;
            },

            selectOne: function() {
                var loaded = $q.defer();

                if(cmDevice.debug){
                    loaded.resolve({
                        displayName: "GiverName FamilyName",
                        name: {
                            familyName: "FamilyName",
                            formatted: "GiverName FamilyName",
                            givenName: "GiverName",
                            middleName: "MiddleName"
                        },
                        phoneNumbers: [
                            {
                                id: "1234",
                                pref: false,
                                type: "mobile", // mobile | work | fax
                                value: "+49 123 4567890"
                            }
                        ],
                        emails: [
                            {
                                id: "1246",
                                pref: false,
                                type: "work", // other
                                value: "some.coworker@cameo.io"
                            }
                        ]
                    });// return mock use above
                    return loaded.promise;
                }

                if(this.canRead()){
                    this.plugin.pickContact(
                        function (contact) {
                            loaded.resolve(contact);
                        },
                        function onError(contactError) {
                            loaded.reject(contactError);
                        }
                    );
                }

                return loaded.promise;
            }
        };

        self.init();

        return self;
    }
])
// https://github.com/apache/cordova-plugin-network-information/blob/cd67d7a30f51efe7b2e3adb098ae65409d292d21/doc/index.md


.service('cmNetworkInformation', [
    'cmPhonegap', 'cmUtil', 'cmLogger',
    '$navigator', '$document', '$phonegapCameoConfig',
    function (cmPhonegap, cmUtil, cmLogger,
              $navigator, $document, $phonegapCameoConfig) {
        var self = {
            state: '',

            init: function(){
                if(typeof $phonegapCameoConfig == 'undefined') {
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('connection' in $navigator)
                    || !('type' in $navigator.connection)) {
                        //cmLogger.info('NETWORK-INFORMATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.checkConnection();
                })
            },

            checkConnection: function(){
                var networkState = $navigator.connection.type;

                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';

//                console.log('Connection type: ' + states[networkState]);
                this.state = states[networkState];
            },
            goesOffline: function(){

            },
            goesOnline: function(){

            }
        };

        $document[0].addEventListener('offline', self.goesOffline, false);
        $document[0].addEventListener('online', self.goesOnline, false);

        return self;
    }
])
.service('cmPhonegap', [
    'cmLogger',
    '$q', '$document', '$phonegapCameoConfig', '$navigator',
    function (cmLogger,
              $q, $document, $phonegapCameoConfig, $navigator) {

        var isReady = $q.defer();

        var self = {
            isReady: function(callback){
                if(typeof $phonegapCameoConfig == 'undefined'){
                    return false;
                }

                cmLogger.info('cmPhonegap.isReady? '+$phonegapCameoConfig.deviceReady)

                // if config doesn't get device ready watch again
                if(!$phonegapCameoConfig.deviceReady){
                    $document[0].addEventListener('deviceready', function () {
                        $phonegapCameoConfig.deviceReady = true;
                        isReady.resolve();
                    });

                    isReady.promise.then(function(){
                        if(typeof callback == 'function')
                            callback();
                    });
                // nothing to wait phonegap is ready
                } else {
                    if(typeof callback == 'function')
                        callback();
                }

                return false;
            },
            initCloseApp: function(){
                return false;

                $document[0].addEventListener('backbutton', function(e) {
                    $navigator.app.exitApp();
                });
            }
        };

        // on home close app
        self.initCloseApp();

        return self;
    }]
)
'use strict';

angular.module('comps/security_aspects/drtv-security_aspect.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/security_aspects/drtv-security_aspect.html',
'<section class="content clearfix" ng-click="show = !show"><cm-icons class="{{class}} cm-fl w15" count="{{count}}" icons="{{icons}}"></cm-icons><span class="item cm-fl w80" > {{aspect.languagePrefix+"."+aspect.id+".NAME"|cmTranslate:aspect}}</span></section><span class="icon-list security-settings" ng-click="show = !show"><i class="fa cm-info"></i></span><section class="content" ng-if="show"><cm-info-bubble cm-bind-template="aspect.template"></cm-info-bubble></section><span class="toggleOption" ng-if="showToggleOptions"><a ng-click="aspect.toggle()" ng-if="aspect.isToggleAble" class="classic-link">{{aspect.languagePrefix+"."+aspect.id+".TOGGLE"|cmTranslate}}</a></span>');
}]);
angular.module('comps/security_aspects/drtv-security_indicator.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/security_aspects/drtv-security_indicator.html',
'<i ng-if="leading_icon" class="fa with-response leading-icon {{leading_icon}}"></i><cm-icons count="{{positive}}" icons="cm-checkbox-add" class="positive" with-response></cm-icons><cm-icons count="{{negative}}" icons="cm-checkbox-minus" class="negative" with-response></cm-icons><span ng-if="missing_aspects" class="ng-hide">{{"SECURITY_ASPECTS.ERROR.MISSING_DATA"|cmTranslate}}</span>');
}]);
angular.module('cmSecurityAspects',['comps/security_aspects/drtv-security_aspect.html','comps/security_aspects/drtv-security_indicator.html'])

.directive('cmSecurityAspect',[

    '$compile',

    function cmSecurityAspect($compile){
        return {
            restrict:       'AE',
            templateUrl:    'comps/security_aspects/drtv-security_aspect.html',
            scope:          {
                                aspect:'=cmData'
                            },

            link:       function(scope, element, attrs){
                            if(typeof attrs.cmShowToggleOptions == 'undefined'){
                                scope.showToggleOptions = true;
                            } else {
                                scope.showToggleOptions = scope.$eval(attrs.cmShowToggleOptions);
                            }

                            if(scope.aspect.value < 0){
                                scope.class = 'negative';
                                scope.icons = 'cm-checkbox-minus';
                            }

                            if(scope.aspect.value == 0)
                                scope.class = 'neutral' ;

                            if(scope.aspect.value > 0){
                                scope.class = 'positive';
                                scope.icons = 'cm-checkbox-add';
                            }

                            element.addClass(scope.class);

                            scope.count = Math.abs(scope.aspect.value);
                        }
        }
    }
])
.directive('cmSecurityIndicator',[
    'cmUserModel', 'cmLogger',
    '$timeout',
    function(cmUserModel, cmLogger,
             $timeout){
        return {
            restrict:   'E',
            templateUrl:'comps/security_aspects/drtv-security_indicator.html',
            scope: {
                conversation: '=cmData'
            },
            controller: function($scope, $element, $attrs){
                $scope.missing_aspects  = true;
                $scope.leading_icon     = 'cm-lock';

                function refresh(){
                    //cmLogger.debug('cmSecurityIndicator.refresh');

                    if($scope.conversation.securityAspects){
                        $scope.positive = $scope.conversation.securityAspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0);
                        $scope.negative = $scope.conversation.securityAspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0);
                        $scope.missing_aspects = false;
                    } else {
                        $scope.missing_aspects = true;
                    }

                    //console.log('$scope.conversation.recipients', $scope.conversation.recipients.length)
                    //console.log('aspects.length', $scope.conversation.securityAspects.aspects.length)
                    //console.log('aspects', $scope.positive, $scope.negative)

                    $scope.leading_icon = ($scope.positive >= $scope.negative)?'cm-lock':'cm-unlock';
                      
                }

                if($scope.conversation){
                    $scope.conversation.securityAspects.on('refresh', refresh);


                    $scope.conversation.on('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added', function () {
                        $scope.conversation.securityAspects.refresh();
                    });

                    $scope.conversation.recipients.on('register update:finished deregister', function(){
                        $scope.conversation.securityAspects.refresh();
                    });

                    cmUserModel.on('key:stored key:removed', function(){
                        $scope.conversation.securityAspects.refresh();
                    });

                    $scope.conversation.securityAspects.refresh();
                } else {
                    cmLogger.debug('cmSecurityIndicator - Conversation not found!')
                }



                //$scope.$watchCollection($attrs.cmData, function(security_aspects){
                //    if(security_aspects){
                //        $scope.positive = security_aspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0)
                //        $scope.negative = security_aspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0)
                //        $scope.missing_aspects = false
                //    } else {
                //        $scope.missing_aspects = true
                //    }
                //
                //    $scope.leading_icon = ($scope.positive >= $scope.negative)?'cm-lock':'cm-unlock';
                //});
            }
        }
    }
])

.factory('cmSecurityAspects',[
    'cmObject',
    'cmLogger',
    function (cmObject, cmLogger){
        /**
         * Generic security aspect
         * @param {Object} [config] contains id, dependencies, value and a function check() that checks if the security aspect applies, returning its value. 
         * Negative values indicate that the aspect lowers the overall security when present, aspects with positive value will improve the security.  the check function should return 0 if it does not apply.
         * An aspect only applies if all its dependencies apply. 
         */
        function SecurityAspect(config){

            cmObject.addEventHandlingTo(this)

            //The id determines the message id for the translations of name and description.
            this.id             = config.id             || 'DEFAULT';
            //Name:         'SECURITY_ASPECT.CONVERSATION.DEFAULT.NAME'
            //Description:  'SECURITY_ASPECT.CONVERSATION.DEFAULT.DESCRIPTION'
            this.value          = config.value          || 0;
            this.dependencies   = config.dependencies   || [];  //Array of aspect ids
            this.languagePrefix = config.languagePrefix || ''

            this.description    = this.languagePrefix+'.'+this.id+'.DESCRIPTION'
            this.name           = this.languagePrefix+'.'+this.id+'.NAME'
            this.toggleLabel    = this.languagePrefix+'.'+this.id+'.TOGGLE'

            this.template       = config.template       || '{{"'+this.description+'"|cmTranslate}}'

            /**
             * Function to check if the aspect applies to the target.
             * @param  {*}      target to evaluate against.
             * @return {Number}        returns true id the aspects applies, false otherwise
             */
            this.check = config.check || function(target){
                return false
            };

            this.isToggleAble = (config.toggleCheck && config.toggleCall) ? true : false;

            /**
             * Function to check the requirements for toggleCall. (Meant to be overwritten!)
             * When .toggle() is called, toggleCall() will only be called if .toggleCheck() retruns truthly.
             * @param   {*}         target  The target the aspect should apply to.
             * @returns {Boolean}           Returns wheter requirements are met.
             */            
            this.toggleCheck = config.toggleCheck || function(target){
                return false
            };

            /**
             * Function change the target in a way the aspect does nit longer apply.
             * When .toggle() is called, toggleCall() will only be called if .toggleCheck() retruns truthly.
             * @param   {*}         target  The target the aspect should apply to.
             */            
            this.toggleCall = config.toggleCall || function(target){
                return false
            };

            //cmSecurityAspects is listening to this event:
            this.toggle = function(){
                this.trigger('toggle')
            };
        }

        /**
         * Security aspect management
         */
        
        function cmSecurityAspects(config){
            config = config || {};

            var self = this;

            cmObject.addEventHandlingTo(this);

            // Array of SecurityAspect instances
            this.aspects = [];
            // Object all aspects should apply to
            this.target = undefined;
            this.applyingAspects = [];

            this.countForDigest = 0;

            this.languagePrefix = config.languagePrefix;

            this.refresh = function(){
                //cmLogger.debug('cmSecurityAspects.refresh');

                this.countForDigest++;
                this.applyingAspects = this.getApplyingAspects();
                this.trigger('refresh');
            };

            /**
             * Function to set the target all aspects should evaluate against
             * @param {*} target 
             */
            this.setTarget = function(target){
                //cmLogger.debug('cmSecurityAspects.setTarget');

                this.target = target;
                this.applyingAspects = this.getApplyingAspects();
                return this;
            };

            /**
             * Function to add a new SecurityAspect instance to the list
             * @param {Object}  config contains the configuration data for security aspect, see above
             * @return {self}   returns self for chaining
             */
            this.addAspect = function(config){
                //cmLogger.debug('cmSecurityAspects.addAspect');

                config.languagePrefix = config.languagePrefix || this.languagePrefix

                var aspect = new SecurityAspect(config);

                aspect.on('toggle', function(){
                    if(aspect.toggleCheck(self.target))
                        aspect.toggleCall(self.target)
                });

                this.aspects.push(aspect);
                return this;
            };

            /**
             * Function to filter aspects by id
             * @param  {Array}     List of aspect ids
             * @return {Array}     Array of aspects with matching ids
             */
            this.getAspectsById = function(ids){
                ids = typeof ids == "String" ? [ids] : ids;

                return this.aspects.filter(function(aspect){
                    return ids.indexOf(aspect.id) != -1
                })
            };

            /**
             * Function to get all applying security aspects
             * @package {Array}  [applying_aspects = []]    Array of already applying aspects, used to resolve dependencies
             * @return  {Array}                             Array of all applying aspects
             */
            this.getApplyingAspects = function(applying_aspects){
                //cmLogger.debug('cmSecurityAspects.getApplyingAspects');

                applying_aspects = applying_aspects || [];

                var additional_aspects = this.aspects.filter(function(aspect){
                    return (
                        // aspect already assumed to apply, do not add again:
                        applying_aspects.indexOf(aspect) == -1
                        // check if all dependencies are among the applying aspects:
                        && aspect.dependencies.every(function(dependency_id){
                            return applying_aspects.some(function(applying_aspect){
                                 return applying_aspect.id == dependency_id
                            });
                        })
                        //check if aspect applies:
                        && aspect.check(self.target) === true
                    )
                 });

                return  additional_aspects.length == 0
                        ?   applying_aspects
                        :   this.getApplyingAspects( applying_aspects.concat(additional_aspects) );
            };

            /**
             * Function to get all security aspects that evaluate positively against the target
             * @return {Array}              Array of aspects
             */
            this.getPositiveAspects = function(){
                return this.applyingAspects.filter(function(aspect){ return aspect.value > 0 });
            };

            /**
             * Function to get all security aspects that evaluate positively against the target
             * @return {Array}              Array of aspects
             */           
            this.getNegativeAspects = function(){
                return this.applyingAspects.filter(function(aspect){ return aspect.value < 0 });
            };

            /**
            * Function to get all security aspects that evaluate neutrally (value == 0) against the target
            * @return {Array}              Array of aspects
            */           
            this.getNeutralAspects = function(){
                return this.applyingAspects.filter(function(aspect){ return aspect.value === 0 });
            };

            /**
             * Function to get all security aspects that do not apply to the target
             * @return {Array}              Array of aspects
             */
            this.getNonApplyingAspects = function(){                
                return this.aspects.filter(function(aspect){ return self.applyingAspects.indexOf(aspect) == -1 });
            };
        }

        return cmSecurityAspects
    }
])
'use strict';

angular.module('comps/ui/drtv-default-pages.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/ui/drtv-default-pages.html',
'<section class="default-pages"><button ng-click="goTo(\'/talks\')" ng-class="{\'isActive\':isTalks}"><i class="fa fa-lg-icon cm-talk"></i> {{\'DRTV.FOOTER.TALKS\' | cmTranslate}}</button><button ng-click="goTo(\'/contact/list\')" ng-class="{\'isActive\':isContacts}"><i class="fa fa-lg-icon cm-person"></i> {{\'DRTV.FOOTER.CONTACTS\' | cmTranslate}}</button></section>');
}]);
angular.module('comps/ui/drtv-menu.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/ui/drtv-menu.html',
'<div class="cm-handler" ng-click="handleMenu()" data-qa="btn-open-menu"><cm-notify-signal></cm-notify-signal></div><div class="cm-menu-layer" ng-show="menuVisible"><div cm-transparent-bg ng-click="handleMenu()"></div><div class="cm-menu-list"><ul><li class="cm-nose-wrapper" ng-click="handleMenu()"><i class="fa cm-nose-up"></i></li><li class="cm-menu-header"><button ng-click="goTo({},\'talks\')" ng-class="{\'is-active\':checkActive(\'talks\')}"><i class="fa cm-talk"></i><div class="seperator"></div></button><button ng-click="goTo({},\'contacts\')" ng-class="{\'is-active\':checkActive(\'contact\')}"><i class="fa cm-person"></i></button></li><li class="{{menu[btn].css}}" ng-repeat="btn in Object.keys(menu)" ng-click="goTo(menu[btn], btn)" data-qa="{{menu[btn][\'data-qa\']}}" ng-class="{\'is-active\':checkActive(btn)}"><i class="fa icon-left" ng-if="menu[btn].icon != undefined" ng-class="menu[btn].icon"></i><span> {{menu[btn].i18n|cmTranslate}}<cm-friend-request-counter ng-if="menu[btn].drtv != undefined && menu[btn].drtv == \'cm-friend-request-counter\'"></cm-friend-request-counter></span><div class="clearfix"></div></li><li ng-click="logout()" data-qa="logout-btn"><i class="fa cm-logout icon-left"></i><a class="logout">{{\'MENU.LOGOUT\'|cmTranslate}}</a><div class="clearfix"></div></li><li><i class="fa cm-rhino-positive icon-left"></i><span>{{version}}</span><div class="clearfix"></div></li></ul><div class="bottom-filler"></div></div></div>');
}]);
angular.module('comps/ui/modal/drtv-modal-alert.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/ui/modal/drtv-modal-alert.html',
'<article class="cm-modal-alert"><header ng-show="closeBtn"><button ng-click="close()" class="close"><i class="fa cm-close"></i></button></header><ng-transclude class="content"></ng-transclude><footer><button class="cm-btn-grey" ng-click="close()" data-qa="cm-modal-close-btn"> {{(footerLabel||\'MODAL.ALERT.OK\')|cmTranslate}}<i ng-if="footerIcon" class="fa {{footerIcon}}"></i></button></footer></article><div class="backdrop"></div>');
}]);
angular.module('comps/ui/modal/drtv-modal-confirm.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/ui/modal/drtv-modal-confirm.html',
'<article class="cm-modal-plain" data-qa = "modal-confirm"><header><button ng-click="close()" class="close" ng-show="closeBtn" data-qa="cm-modal-close-btn"><i class="fa cm-close"></i></button><h2 class="{{severity}}">{{title|cmTranslate}}</h2></header><div class="content"><div class="modal-row tac"><span ng-bind-html="text | cmParse"></span><ng-transclude></ng-transclude></div></div><footer><button class = "cm-btn-grey cm-white-border-right dib w50" data-qa = "btn-cancel" ng-click = "cancel()" > {{ (labelCancel || \'MODAL.LABEL.CANCEL\') | cmTranslate }}<i class="fa cm-checkbox-wrong"></i></button><button class = "cm-btn-grey dib w50" data-qa = "btn-confirm" ng-click = "confirm()" > {{ (labelOkay || \'MODAL.LABEL.OK\') | cmTranslate }}<i class="fa cm-checker"></i></button></footer></article><div class="backdrop" ng-hide="options.withoutBackdrop"></div>');
}]);
angular.module('comps/ui/modal/drtv-modal-fullscreen.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/ui/modal/drtv-modal-fullscreen.html',
'<div class="content" ng-click="close()"><cm-loader ng-show="fullscreenSpinner" cm-color="ci-color" class="fullscreen"></cm-loader><ng-transclude></ng-transclude></div><div class="backdrop"></div>');
}]);
angular.module('comps/ui/modal/drtv-modal-plain.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/ui/modal/drtv-modal-plain.html',
'<article class="cm-modal-plain"><header><button ng-click="close()" class="close" ng-show="closeBtn" data-qa="cm-modal-close-btn"><i class="fa cm-close"></i></button><h2 class="{{severity}}">{{title|cmTranslate}}</h2></header><ng-transclude class="content"></ng-transclude></article><div class="backdrop" ng-hide="options.withoutBackdrop"></div>');
}]);
angular.module('cmUi', [
    'cmCore',
    'ngSanitize',
    'emoji'
,'comps/ui/drtv-default-pages.html','comps/ui/drtv-menu.html','comps/ui/modal/drtv-modal-alert.html','comps/ui/modal/drtv-modal-confirm.html','comps/ui/modal/drtv-modal-fullscreen.html','comps/ui/modal/drtv-modal-plain.html'])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmAdaptiveChange
 * @description
 * Inputs with this directive will not update the scope on simple keydown-events.<br />
 * Only after a delay of 500 milliseconds.
 *
 * @restrict A
 * @element input
 * @requires ngModel
 * @requires $timeout
 *
 * @example
    <example module="cmDemo">
        <file name="script.js">
            
            .controller('Ctrl', function ($scope) {
                $scope.model = '';
            });
        </file>
        <file name="index.html">
            <div ng-controller="Ctrl">
                <input type="text" cm-adaptive-change ng-model="model" placeholder="after 500ms the input will applyed the scope" style="width:100px" /><br />
                input value ><strong>{{model||'empty'}}</strong><
            </div>
        </file>
    </example>
 */

.directive('cmAdaptiveChange', [
    '$timeout', '$rootScope',
    function ($timeout, $rootScope){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: false,
            link: function(scope, element, attrs, ngModel){
                var timeout;
                element
                .unbind('input')
                .unbind('keydown')
                .on('keydown', function(){
                    // clear exists timeout
                    if(timeout)
                        $timeout.cancel(timeout);
                    // create new timeout
                    timeout = $timeout(function(){
                        scope.$apply(function() {
                            ngModel.$setViewValue(element.val());
                            $rootScope.$broadcast('multi-input:changed',ngModel);
                        });
                    },attrs.cmAdaptiveChange || 1000);
                })
                .on('blur', function(){
                    ngModel.$setViewValue(element.val());
                    $rootScope.$broadcast('multi-input:changed',ngModel);
                })
            }
        }
    }
])
.directive('cmAddButton',[
    function(){
        return {
            restrict: 'E',
            template: '<i class="fa with-response cm-{{icon}}"></i>',
            scope: {
                icon: "@cmIcon"
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmAvatar
 * @description
 * Shows the avatar of an identity.
 * It can also be used for an identity avatar placeholder.
 *
 * @restrict E
 * @requires cmIdentityModel
 *
 * @example
     <example module="cmDemo">
         <file name="style.css">
             cm-avatar {display:inline-block;vertical-align:top;width:100px;height:100px}
             cm-avatar img{width:100%;height:100%}
         </file>
         <file name="script.js">
             angular
             .module('cmDemo', ['cmUi'])
             .controller('Ctrl', function ($scope){

                 var simple_cmFileModel = {
                    state:'cached',
                    base64Url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTMwOUMxNTBFQkU5MTFFM0FDOTJEQjIzQjBFNjk1Q0IiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTMwOUMxNEZFQkU5MTFFM0FDOTJEQjIzQjBFNjk1Q0IiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJFODlGRDk2RUE0MTExRTNCQkQ5OThEODZBQTJFNkU5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJFODlGRDk3RUE0MTExRTNCQkQ5OThEODZBQTJFNkU5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+As8xUwAABIRJREFUeNrEV1trXFUYXecyczKTTDKZZKZpmWZSR3shsUotVdFCFFEppdIKivrshT6UPlRfvIDQ/2AfqlYQFKFCxFIURCkWQZoKvaaWprG5dBLTmenkMvdzXHufyWQOmVsJJns4cy57n72+b+1vffs7ivrLpTEAAR5FrE3TeMR1/kWw9s2n8i+5DsBJFevUagJbPEzTgrlmwIoCM1+EtZiFJnotSz6rZlhTTcxXNOmE6ZhHXTFoLo2QW8fJ3VGcfawPG3lt5grLgGJMNg9LPFOVhrgWAQNuEcOKvF4JLCacz2Cwx48LT21FjAZ8OZXAS10+oFC0+3m2EvPYG+zAq5sCsDL5xsA08pVgOz7sC0oWrZLXZWDhVajNwK97HsGnt6fx0fkRTGQL9oBUGmZygUo3cWxHGOfIxj4aZGVyzXCNSYIfj/Yg4PPCytvs6eV+TvLuVlvSn0/FKXMNR3u7kSE9xsBmFGjpkUgQAz6PHPNDfI5mq441t2iYoF+tjIliEfMFe31f2+jHiZFJqthjAy8FysMtLnn+bHsYv5HOQ6EOef9mT6fDhx//TWHo9gyUVkM4BFNMkKb3hgstjMicaZXjAQzUfd0+ef8kAU+IJVuiWtpH688nF+WA98Jd+JaBVWfl0OLSYBHMTHOd4/M4xHdGn9lO4912MNJzizFjdHjJXFC+FWEfdE0qZZkrTnTqbgLpYmPl7icbN55/FJG2FmxixB5/fAtO09AtHjful943F7IS4OyuKFo1G8anq2Ul2FSLa1r5xuZuSVUzrZe0/j04AIW0ukqT3WTUjlMNIKjudePM0zvwXGdr+Z17pF0EqHBStbVmSQqOElh5gOzjFkRVaPnwyISkfTAcwJXBfrwYaHOMv0zqxZorXGc7qnnTSdr6eTTT/qJXXbS6V6xZRTsc7sYnkRD2dvmqvncqlpTeKmU5cS28muKwvla7Q9ntGvoTLkZ67oWdjr6DJRVUa9/N3MfVWAJKSY42MGmOMUJnRBJx63WBOzj2AJPItnZvzc1lOLWIgEvHQx6bkTHO/dbFUSk3QbNwVKIoDKgi6fuKFr1fCv16wENPROvkKRG9Gr5mEvJz3h4ux5GbUygw3apiKUsaX9YxB3x8fYJpMr/qLW+b18CxvhD66PE300lMM+FUgjpytWroyDLI9jBHX1vIrBrcS28PbPAjLXOE7gB17k7sEFbdpRb7z13DyfHZVYOfpqc/jZVSa91CoAQuEvrbw6PYf+EWLs+l606e5Ts5c2VZcJE72uvDt5YDqmEFIsA5GO0enJm8h52/X8c7V+7gUqq6AQYlmGI2+nl2DjFKbZbK+GIyjt1/3ODGZEIVG4+10jCFdXWCZ3/NskUUAaQflNnL1OnBkB/PMg1GmRIV/sYJ9j0D6IORKQ5RuZwaFsR4XksHzKpFUrI+sKNuogFiJxLW04sNVIFgMCaqEKEEw1VmTOQFuVXXLsySelNRIrYxMRODRO49pHBaeCW/C/ic8lErvxOaqAb1B41UdQlMW11Jrjak+f9pfuHxP+vx0fafAAMAUiCx0ClOvYEAAAAASUVORK5CYII='
                 };

                 var simple_cmIdentityModel = {
                    displayName: 'meoper',
                    on: function(){},
                    isAppOwner: false,
                    getAvatar: function(){
                        return simple_cmFileModel
                    },
                    getDisplayName: function(){
                        return this.displayName;
                    }
                 };

                 // simple cmIdentityModels
                 $scope.simple_cmIdentityModel_1 = angular.extend({}, simple_cmIdentityModel);
             });
         </file>
         <file name="index.html">
             <div ng-controller="Ctrl">
                 <h2>unknown / default avatar</h2>
                 <cm-avatar cm-view="unknown"></cm-avatar>

                 <h2>cmIdentity avatar</h2>
                 <cm-avatar cm-data="simple_cmIdentityModel_1"></cm-avatar>
                 {{simple_cmIdentityModel_1}}
             </div>
         </file>
     </example>
 */

/**
 * @TODO Doku anpassen
 */
.directive('cmAvatar',[
    'cmUserModel',
    'cmUtil',
    'cmConfig',
    function (cmUserModel, cmUtil, cmConfig){

        return {
            restrict: 'E',
            scope: {
                identity: "=cmData"
            },
            template: '<div class="wrap"><i></i></div>',
            link: function(scope, element, attrs){

                function refresh(){
                    /**
                     * without scale
                     */
                    //element.find('img').attr('src', cmConfig.restApi + '/file/' + scope.identity.avatarId + '/raw?token=' + cmUserModel.getToken());

                    /**
                     * with scale
                     */
                    var size = 200;
                    if('cmSize' in attrs && cmUtil.validateInt(attrs.cmSize)){
                        size = attrs.cmSize;
                    }

                    var imgSrc = cmConfig.restApi + '/file/' + scope.identity.avatarId + '/scale/' + size + '?token=' + cmUserModel.getToken(),
                        bgImg = new Image();
                    // preload for update avatar
                    bgImg.onload = function(){
                        scope.identity.trigger('avatar:loaded');
                    };
                    bgImg.src = imgSrc;
                    element.find('i').css('background-image','url('+imgSrc+')');
                }

                // is unknown avatar for add reciepients or choose avatar
                if('cmView' in attrs && attrs.cmView == 'unknown'){
                    element.find('i').addClass('fa cm-person');
                } else {
                    scope.$watch('identity',function(){
                        if(typeof scope.identity == 'object'
                        && cmUtil.objLen(scope.identity) > 0
                        && typeof scope.identity.state == 'object'
                        && typeof scope.identity.state.is == 'function'){
                            scope.identity.on('update:finished',function(){
                                refresh();
                            });

                            refresh();
                        }
                    });
                }
            }
        }
    }
])
.directive('cmBack',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict: 'AE',
            scope: {
                pageTitle: '=pageTitle'
            },
            template: '<div class="back-wrap" ng-click="goBack()">'+
                        '<i class="fa with-response cm-left" ng-show="isVisible"></i>'+
                        '<span ng-if="pageTitle">{{pageTitle | cmTranslate}}</span>'+
                      '</div>',
            controller: function($scope, $element, $attrs){
                // vars
                $scope.isVisible = $rootScope.urlHistory.length > 1 ? true : false;
                //$scope.pageTitle = $attrs.pageTitle;
                $scope.fakeBack = '';
                // check default back-to attribute
                if('backTo' in $attrs){
                    $scope.backTo = $attrs.backTo;
                    $scope.isVisible = true;
                }

                $scope.goBack = function(){
                    // if history has more then one index
                    if($rootScope.urlHistory.length > 0 && ('plainBack' in $attrs) == false){
                        $rootScope.goBack();
                        // if is set an default path in route
                        return false;
                    }

                    if($scope.backTo != ''){
                        $rootScope.goTo($scope.backTo);
                        return false;
                    }
                }
            }
        }
    }
])

.directive('cmBackground', [
    '$route',
    function ($route){
        return {
            restrict: 'A',
            controller: function($scope, $element){
                $scope.$on('$locationChangeSuccess', function() {
                    if($route.current != undefined && $route.current.$$route != undefined){
                        if($route.current.$$route.isDefault){
                            $element.addClass('start-page');
                        } else {
                            $element.removeClass('start-page');
                        }
                    }
                });
            }
        }
    }
])

.directive('cmBindTemplate',[

    '$compile',

    function cmBindTemplate($compile){
        return {
            restrict:       'A',

            link:       function(scope, element, attrs){

                            if(attrs.replace){
                                element.replaceWith( $compile(scope.$eval(attrs.cmBindTemplate))(scope) )
                            }else{
                                element.append($compile('<div>'+ scope.$eval(attrs.cmBindTemplate) +'</div>')(scope) )
                            }

                        }
        }
    }
])
.directive('cmClipboard',[
    function (){
        return{
            restrict: 'A',
            link: function(scope, element){
                element.on('focus',function(){
                    element[0].select();

                    // Work around Chrome's little problem
                    element[0].onmouseup = function() {
                        // Prevent further mouseup intervention
                        element[0].onmouseup = null;
                        return false;
                    };
                });
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmDateSeperator
 * @description
 * Especially for Timestamp to seperate messages in days.
 *
 * @restrict E
 * @requires cmUi.directive:cmRubberSpace
 *
 * @example
 <example module="cmDemo">
    <file name="style.css">
        cm-date-seperator {display:block}
        cm-date-seperator .date-seperator{position:relative}
        cm-date-seperator .date-seperator div{display:inline-block}
        cm-date-seperator .date{color:#fff;background:#000;text-align:center}
        cm-date-seperator .line{background:#000;height:1px;vertical-align:middle}
    </file>
    <file name="script.js">
        
        .controller('Ctrl', function ($scope) {
            var now = new Date().getTime();
            $scope.timestamp = now;
        });
    </file>
    <file name="index.html">
        <div ng-controller="Ctrl">
            <cm-date-seperator>{{timestamp-timestamp | date:'dd.MM.yyyy'}}</cm-date-seperator>
            message 1234
            <cm-date-seperator>{{timestamp | date:'dd.MM.yyyy'}}</cm-date-seperator>
            message 5678
            <cm-date-seperator>{{timestamp+timestamp | date:'dd.MM.yyyy'}}</cm-date-seperator>
        </div>
    </file>
 </example>
 */

.directive('cmDateSeperator',[
    'cmUtil',
    function (cmUtil){
        return{
            restrict: 'E',
            scope: {
                timestampCurrent: '=cmTimestamp',
                timestampPrev: '=cmTimestampPrev'
            },
            template: //'{{"current: "+timestampCurrent+" prev: "+timestampPrev}}'+
                      '<div ng-if="compareDate()" class="date-seperator" cm-rubber-space>'+
                        '<div class="line" cm-weight="1"></div>'+
                        '<div class="date" cm-weight="3">'+
                          '<cm-time-converter cm-timestamp="timestampCurrent" cm-special-type="date-seperator"></cm-time-converter>'+
                        '</div>'+
                        '<div class="line" cm-weight="1"></div>'+
                      '</div>',
            controller: function($scope, $element){
                /**
                 * compare date for date-seperator
                 * @param currentDate
                 * @param prevDate
                 * @returns {boolean}
                 */

                $scope.compareDate = function() {
                    return !$scope.timestampPrev || cmUtil.compareDate($scope.timestampCurrent, $scope.timestampPrev);
                };
            }
        }
    }
])

.directive('cmDefaultButtons',[

    'cmConfig',
    '$location',

    function (cmConfig, $location){
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            priority: 0,
            replace: true,
            template:   '<a ' +
                            'ng-repeat="btn in Object.keys(btns)" ' +
                            'href="#/{{btn}}" ' +
                            'class="btn-footer" ' +
                            'cm-weight="1" ' +
                            'cm-rubber-space-repeat ' +
                            'ng-class="{active:btns[btn].isActive}">' +
                            '<i ng-if="btns[btn].icon" class="fa {{btns[btn].icon}}"></i>' +
                            '{{btns[btn].i18n|cmTranslate}}' +
                        '</a>',

            link: function(scope, element, attrs){
                scope.btns = {};
                scope.Object = Object;                

                scope.btns = cmConfig.footer || {};

                // set active & width
                var btns = Object.keys(scope.btns);

                angular.forEach(btns, function (btnHref) {
                    var btn = scope.btns[btnHref];
                    btn.isActive = btnHref != '' && $location.$$path.search(btnHref) != -1;
                });
            }
        }
    }
])
.directive('cmDefaultPages',[
        '$location',
        function ($location){
            return {
                restrict: 'AE',
                templateUrl: 'comps/ui/drtv-default-pages.html',
                link: function(scope){
                    scope.isTalks = true;
                    scope.isContacts = false;

                    if($location.$$path.search('contact') != -1){
                        scope.isTalks = false;
                        scope.isContacts = true;
                    } else if($location.$$path.search('talks') != -1){
                        scope.isTalks = true;
                        scope.isContacts = false;
                    }
                }
            }
        }
    ])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmEdge
 * @description
 * For create conversation, new contact or add recipient.<br/>
 * Works with CameoAwesome Glyphs
 *
 * @restrict E
 * @requires cameoAwesome
 *
 * @example
 <example module="cmUi">
    <file name="style.css">
         cm-edge {
          position: relative;
          display: block;
          top: 0;
          right: 0;
          z-index: 1;
          cursor: pointer;
          font-size: 6rem;
          width: 1em;
          height: 1em;
          line-height: 1em;
        }
         cm-edge .background {
          color: #02bed2;
          position: absolute;
          right: 0;
          top: -0.03em;
        }
         cm-edge .foreground{
          color: #ffffff;
          position: absolute;
          right: 0;
          top: 0;
        }
    </file>
    <file name="index.html">
        <link type="text/css" rel="stylesheet" href="../app/css/font-awesome.css"></link>
        <cm-edge></cm-edge>
    </file>
 </example>
 */

.directive('cmEdge',[
    function (){
        return{
            restrict: 'E',
            link: function(scope, element){
                var background = angular.element('<i class="fa cm-edge background"></i>'),
                    foreground = angular.element('<i class="fa cm-edge-add foreground"></i>');

                element
                .append(background)
                .append(foreground);
            }
        }
    }
])
.directive('cmEmojiList',[
    'emoji',
    'cmUtil',
    '$document',
    '$rootScope',
    function (emoji, cmUtil, $document, $rootScope) {

        var blacklist = ['poop', 'shit', '\\-1', '\\+1', 'facepunch', 'shipit'],
            sortCategories = {
                "people": ["smiley", "hands", "ape", "cat", "faces", "hearts", "specials", "woman", "unsorted"],
                "symbols": ["lock", "unsorted"],
                "nature": ["misc", "pet", "planets"]
            };

        return{
            restrict: 'E',
            template: '<div ng-show="showList">' +
                        '<div ng-repeat="emoji in emojis" class="emoji-wrapper" ng-click="insertEmoji(emoji)">' +
                            '<i class="emoji emoji_{{emoji}}" title=":{{emoji}}:">{{emoji}}</i>' +
                        '</div>' +
                      '<div>',
            scope: {
                ngModel: '=ngModel'
            },
            link: function(scope, element, attrs){

                var textarea = undefined,
                    textareaModel = undefined,
                    body = angular.element($document[0].querySelector('body'));

                /**
                 * Function returns a reference of requested parent element.
                 * @param {String} tag_name Tag name of requested parent element.
                 * @param {HTMLElement} el Initial element (from which search begins).
                 */
                function findParent (tag_name, el) {
                    // loop up until parent element is found
                    while (el && el.nodeName !== tag_name) {
                        el = el.parentNode;
                    }
                    // return found element
                    return el;
                }

                function clickOutside(e){
                    if(e.target != element[0] && // target not emojilist
                       !findParent('CM-EMOJI-LIST',e.target) && // emojilist isnt parent
                       !findParent('CM-EMOJI-HANDLER',e.target) // isnt handler
                    ) {
                        scope.toggleList('close',true);
                    }
                }

                function createEmoji(emoji){
                    if(blacklist.indexOf(emoji) == -1) {
                        scope.emojis.push(emoji);
                    }
                }

                scope.emojis = [];

                scope.toggleList = function(action, withApply){
                    scope.showList = action != undefined && action == 'close' || action == undefined && scope.showList ? false : true;

                    if(scope.showList){
                        body.on('click',clickOutside);
                        body.on('touchstart',clickOutside);
                    } else {
                        body.off('click',clickOutside);
                        body.off('touchstart',clickOutside);
                    }

                    if(withApply != undefined && withApply)
                        scope.$apply();

                };

                scope.insertEmoji = function(emoji){
                    if(textarea != undefined && textarea.length > 0){
                        scope.insertAt(':'+emoji+':');
                    }
                };

                scope.insertAt = function(text){
                    var oldValue = textarea.val(),
                        textStart = textarea[0].selectionStart,
                        textEnd = textarea[0].selectionEnd,
                        insertSymbol = text+' ',
                        strWithEmoticon = oldValue.substring(0, textStart);
                    strWithEmoticon+= cmUtil.endsWith(strWithEmoticon, ' ') ? insertSymbol : ' '+insertSymbol;
                    strWithEmoticon+= oldValue.substring(textEnd);

                    scope.toggleList('close');

                    //textarea.val(strWithEmoticon);
                    scope.ngModel = strWithEmoticon;

                    textarea[0].focus();
                    textarea[0].selectionStart = textEnd+insertSymbol.length;
                    textarea[0].selectionEnd = textEnd+insertSymbol.length;
                };

                // create emojis
                Object.keys(sortCategories).forEach(function(mainCat){
                    sortCategories[mainCat].forEach(function(subCat){
                        emoji.getFromCategory(mainCat, subCat).forEach(function(emoji){
                            createEmoji(emoji);
                        });
                    });
                });

//                emoji.getAllAsString().split(',').forEach(function(emoji){
//                    createEmoji(emoji);
//                });

                scope.toggleList('close');

                // emoji-list-handler watcher
                $rootScope.$on('cmEmojiList:toggle',function(){
                    scope.toggleList();
                });

                // textarea for emoji insertion
                if(attrs.cmTextarea){
                    textarea = angular.element(document.getElementById(attrs.cmTextarea));
                }
            }
        }
    }
])
.directive('cmEmojiHandler',[
   '$rootScope',
   function($rootScope){
       return{
           restrict: 'E',
           template: '<i class="fa cm-smile-negative with-cursor" ng-click="toggleList()"></i>',
           scope: true,
           controller: function($scope){
               $scope.toggleList = function(){
                   $rootScope.$broadcast('cmEmojiList:toggle');
               }
           }
       }
   }
])

.directive('cmFirstOfRepeat',[
    function (){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                if(scope.$first){
                    scope.$eval(attrs.cmFirstOfRepeat);
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmFooter
 * @description
 * Footer navigation
 *
 * @restrict E
 * @requires $location
 * @requires cmTranslate
 *
 * @example
 <example module="cmUi">
     <file name="style.css">
         cm-footer {
          display: block;
          position: relative;
          bottom: 0;
          z-index: 9;
          background-color: #000000;
          padding: 0;
          font-size: 1.4rem;
          height: 4rem;
        }
         cm-footer button,
         cm-footer a {
          display: inline-block;
          height: 100%;
          text-align: center;
          border-radius: 0;
          background: transparent;
          border: none;
          padding: 0;
          color: #ffffff;
          overflow: hidden;
          text-decoration: none;
          line-height: 4rem;
        }
         cm-footer button.active,
         cm-footer a.active,
         cm-footer button:hover,
         cm-footer a:hover {
          color: #02bed2;
          box-shadow: 0 0.3em 0 #02bed2 inset;
          text-decoration: none;
        }
         cm-footer button.full-width,
         cm-footer a.full-width {
          display: block;
          width: 100%;
          color: #02bed2;
        }
         cm-footer button.deactivated,
         cm-footer a.deactivated {
          color: #444444;
          box-shadow: none;
        }
     </file>
     <file name="index.html">
         <link type="text/css" rel="stylesheet" href="../app/css/font-awesome.css"></link>
         default:
         <cm-footer cm-rubber-space></cm-footer>

         one button:
         <cm-footer>
            <button class="full-width">handle button <i class="fa cm-checkbox-right"></i></button>
         </cm-footer>
     </file>
 </example>
 */


.directive('cmFooter',[
    'cmConfig',
    '$location',
    function (cmConfig, $location){
        return {
            restrict: 'E',
            scope: true,
            priority: 0,
            link: function(scope, element, attrs, controller, transclude){
                
                if('cmAlwaysOnTop' in attrs){
                    element.css('z-index',10);
                } else {
                    element.css('z-index',9);
                }
                
            }
        }
    }
])

.directive('cmHeaderListSearch',[
    '$rootScope',
    '$timeout',
    '$document',
    function ($rootScope, $timeout, $document){
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                cmOptions: '=cmOptions'
            },
            template: '<i class="fa with-response cm-search"' +
                        ' ng-click="toggleInput($event)"' +
                        ' data-qa="btn-header-list-search"></i>' +
                      '<cm-search-input' +
                        ' ng-model="ngModel"' +
                        ' cm-options="{withoutSearchIcon:true,hideElements:\'cm-footer\',scrollTo:options.scrollTo}"' +
                        ' ng-class="{visible:visible}"></cm-search-input>',
            controller: function($scope, $element, $attrs){
                // option for drtv
                $scope.options = angular.extend({}, {
                    scrollTo:false
                }, $scope.cmOptions || {});

                $scope.visible = false;
                $scope.toggleInput = function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $scope.visible = $scope.visible ? false : true;
                    // set focus to input
                    if($scope.visible) {
                        var input = $document[0].querySelector('#inp-list-search');
                        input.focus();
                    }
                }
            }
        }
    }
])
.directive('cmHeader',[

    '$window', 

    function ($window){
        return {
            restrict:   'E'

        }
    }
])
.directive('cmIcons',[
    function (){
        return {
            restrict:   'AE',
            template:   '',
            scope:      {},

            link: function(scope, element, attrs){
                scope.count = attrs.count
                scope.icons = attrs.icons
                scope.alt   = attrs.alt

                function draw(){
                    // clear all
                    element.children().remove();
                    // draw x
                    if(scope.count == 0 && attrs.alt) {
                        element.append('<i class="fa '+attrs.alt+'"></i>')
                    } else {
                        for (var i = 0; i < scope.count; i++) {
                            element.append('<i class="fa '+scope.icons+'"></i>')
                        }
                    }
                }

                attrs.$observe('icons', function(icons) {
                    scope.icons = attrs.icons
                    draw()
                })

                attrs.$observe('count', function(count) {
                    scope.count = attrs.count
                    draw()
                })
            }

        }
    }
])
.directive('cmInfoBubble',[
    '$document',
    function ($document){
        return {
            restrict: 'AE',
            transclude: true,

            template: '<div ng-transclude></div>' +
                      '<i class="fa {{nose_icon}}"></i>',

            link: function(scope, element, attrs){


                scope.nose_icon = 'cm-nose-up';

                if(attrs.nosePos == 'bottom')
                    scope.nose_icon = 'cm-nose-down';

                element.toggleClass('up',   scope.nose_icon == 'cm-nose-up');
                element.toggleClass('down', scope.nose_icon == 'cm-nose-down');

                element.children('i.').css({
                    top     : attrs.nosePos == 'bottom' ? 'auto': '-3.5rem',
                    bottom  : attrs.nosePos == 'bottom' ? '-1em' : 'auto',
                    left    : attrs.noseX || '70%'
                });

                function getOffsetSum(elem) {
                    var top=0, left=0;
                    while(elem) {
                        top = top + parseInt(elem.offsetTop);
                        left = left + parseInt(elem.offsetLeft);
                        elem = elem.offsetParent;
                    }
                    return {top: top, left: left};
                }

                scope.$watch(attrs.ngShow, function(bool) {
                    if (bool && bool != false) {

                        var offset = getOffsetSum(element[0])

                        var bodyAndHtml = angular.element($document[0].querySelectorAll('body,html')),
                            cmHeader = angular.element($document[0].querySelector('cm-header'))
                        angular.forEach(bodyAndHtml, function (tag) {
                            tag.scrollTop = offset.top - cmHeader[0].offsetHeight;
                        });
                    }
                });
            }
        }
    }
])
.directive('cmInputWatcher',[
    function(){
        return {
            restrict: 'A',

            link: function(scope, element){
                element.find('input').on('focus',function(){
                    element.addClass('isActive');
                }).on('blur',function(){
                    element.removeClass('isActive');
                });
            }
        }
    }
])
.directive('cmLargeInput',[
    function(){
        return {
            restrict: 'A',

            link: function(scope, element, attrs){
                var outer_wrapper = angular.element('<div></div>').addClass('cm-form-group'),
                    inner_wrapper = angular.element('<div></div>').addClass('cm-form-control white-control with-inputter with-outside-icon'),
                    icon          = angular.element('<i></i>').addClass('fa').addClass(attrs.cmIcon)

                element.wrap(outer_wrapper)
                element.after(icon)
                element.wrap(inner_wrapper)
                element.attr('data-qa','input-search')
            }
        }
    }
])
.directive('cmLoader',[
    function (){
        return {
            restrict:   'AE',
            template:   function(element, attrs){
                            return  {
                                        'spinner'   :   '<div class="spinner-wrapper" ng-show="loading"><div class="spinner"></div></div>',
                                        'balls'     :   '<div class="followingBallsWrapper halt">'+
                                                            '<div class="G_1 followingBallsG"></div>'+
                                                            '<div class="G_2 followingBallsG"></div>'+
                                                            '<div class="G_3 followingBallsG"></div>'+
                                                            '<div class="G_4 followingBallsG"></div>'+
                                                        '</div>'
                                    }[attrs.type || 'spinner']
                        },

            controller: function($scope, $element, $attrs){
                $scope.loading = false;

                var type = $attrs.type || 'spinner'

                $element.addClass(type)

                var opts = {};
                if($attrs.cmLength)
                    opts.length = $attrs.cmLength;
                if($attrs.cmRadius)
                    opts.radius = $attrs.cmRadius;
                if($attrs.cmColor) {
                    if($attrs.cmColor == 'ci-color')
                        opts.color = '#02BED2';
                    else
                        opts.color = $attrs.cmColor;
                }
                if($attrs.cmWidth)
                    opts.width = $attrs.cmWidth;

                if(type =='spinner'){
                    var spinner = new Spinner(opts);
                    var loadingContainer = angular.element($element[0].querySelector('.spinner'))[0];
                }

                $scope.animate = function(start){
                    if(start == undefined) start = true

                    if(type == 'spinner'){
                        if(start){
                            spinner = spinner.spin()
                            loadingContainer.appendChild(spinner.el);
                        }else{
                            loadingContainer.innerHTML = '';
                        }
                    }

                    if(type == 'balls'){
                        if(start){
                            $element.children().removeClass('halt')
                        }else{
                            $element.children().addClass('halt')
                        }
                    }
                }

                $scope.$watch($attrs.ngShow, function(bool){
                    if(bool != false){
                        $scope.animate(true)
                        $scope.loading = true
                        $element.attr('cm-count', parseInt($element.attr('cm-count') || 0)+1)
                    } else {
                        $scope.animate(false)
                        $scope.loading = false
                    }
                });

                $scope.$watch($attrs.cmHalt, function(bool){
                    if(bool != false){
                        $scope.animate(true)
                        $scope.loading = true
                    } else {
                        $scope.animate(false)
                        $scope.loading = false
                    }
                });

                /**
                 * @ngdoc event
                 * @name start
                 * @eventOf cmUi.directive:cmSpinner
                 * @description
                 * $scope.$on('cmSpinner:start',...)
                 */
                $scope.$on('cmLoader:start', function(){
                    $scope.animate(true)
                    $scope.loading = true
                });

                /**
                 * @ngdoc event
                 * @name stop
                 * @eventOf cmUi.directive:cmSpinner
                 * @description
                 * $scope.$on('cmSpinner:stop',...)
                 */
                $scope.$on('cmLoader:stop', function(){
                    $scope.animate(false)
                    $scope.loading = false
                });
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmLogo
 * @description
 * Our logo with glyphs
 *
 * @example
 <example module="cmUi">
     <file name="style.css">
        cm-logo{display:block;font-size:40px}
     </file>
     <file name="index.html">
        <link type="text/css" rel="stylesheet" href="../app/css/font-awesome.css"></link>
         <cm-logo></cm-logo>
     </file>
 </example>
 */

.directive('cmLogo',[
    function (){
        return {
            restrict: 'AE',
            template:
            //'<i class="fa cm-logo"></i>'+
                '<i class="fa cm-logo-c"></i>'+
                '<i class="fa cm-logo-a"></i>'+
                '<i class="fa cm-logo-m"></i>'+
                '<i class="fa cm-logo-e"></i>'+
                '<i class="fa cm-logo-o"></i>'+
                '<i class="fa cm-logo-net"></i>'
        }
    }
])
.directive('cmMenu',[
    'cmUserModel', 'cmConfig', 'cmNotify', 'cmUtil',
    '$location', '$window',
    function (cmUserModel, cmConfig, cmNotify, cmUtil,
              $location, $window){
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/ui/drtv-menu.html',
            controller: function($scope){

                $scope.Object = Object;
                $scope.menu = cmConfig.menu;
                $scope.version = cmConfig.version;
                $scope.menuVisible = false;

                $scope.handleMenu = function(){
                    $scope.menuVisible = $scope.menuVisible ? false : true;
                    if($scope.menuVisible)
                        cmNotify.trigger('bell:unring');
                };

                $scope.checkActive = function(url){
                    if(cmUtil.startsWith($location.$$url,'/' + url)){
                        return true;
                    }
                    return false;
                };

                $scope.goTo = function(parentBtn, url, isSub){
                    // for extern and performance
                    if('link' in parentBtn){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = parentBtn.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + parentBtn.link;
                        // http://localhost:8000/app/index.html#/settings
                        } else if($location.$$absUrl.indexOf('index.html#/') != -1) {
                            var arr_location = $location.$$absUrl.split('index.html#/');
                            location.href = arr_location[0] + '/' + parentBtn.link;
                        }

                        return false;
                    }

                    /**
                     * if current location == url, then only close menu
                     */
                    if('/' + url == $location.$$url){
                        $scope.handleMenu();
                        return false;
                    }

                    if(typeof url !== 'undefined'){
                        $scope.goto('/'+url);
                    }

                    return false;
                };

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'drtv-menu logout');
                };
            }
        }
    }
])
/**
 password security settings:
 cm-ios-focus="{
    fixedElements:'cm-header, cm-conversation-controls',
    scrollTop:true,
    handler:'#captcha-anchor'
}"

 conversation subject:
 cm-ios-focus="{
    fixedElements:'cm-header',
    scrollTop:true
}"

 conversation answer:
 cm-ios-focus="{
    fixedElements:'cm-header',
    handler:'.post-wrap'
}"

 var settings = undefined,
 fixedElements = undefined,
 view = undefined,
 handler = undefined;

 function stopEvent(e){
    if(e.target != element[0] && e.target != handler) {
        element[0].blur();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

 // Fix mobile floating toolbar when input is focused
 if(cmEnv.isiOS && attrs.cmIosFocus != ''){
    settings = scope.$eval(attrs.cmIosFocus),
    fixedElements = angular.element($document[0].querySelectorAll(settings.fixedElements)),
    view = angular.element($document[0].querySelectorAll('body,html')),
    handler = $document[0].querySelector(settings.handler);

    element.on('focus', function(event){
        view.on('touchstart',stopEvent);
        fixedElements.css('position','absolute');
        if('scrollTop' in settings && settings.scrollTop) {
            angular.forEach(view, function (tag) {
                tag.scrollTop = 0;
            });
        }
    });

    element.on('blur', function(event){
        fixedElements.css('position','fixed');
        view.off('touchstart',stopEvent);
    });
}
 */

/***
/* Issue now addressed in cm-footer and cm-header
*/

.directive('input',[
     '$rootScope',
     '$timeout',
     function ($rootScope, $timeout) {

         return {
             restrict: 'EA',
             link: function (scope, element, attrs) {

                 element.on('focus', function(){
                    $rootScope.$broadcast('pristine:false');
                    //Todo: solve differenntly:
                    $timeout(function(){
                        scope.$apply();
                    }, 100)
                 });

//                 // only for mobile devices or enabled inputs
//                 if(!('isNotMobile' in cmEnv) ||
//                     cmEnv.isNotMobile ||
//                     'disabled' in attrs ||
//                     'ngDisabled' in attrs
//                 )
//                     return false;

//                 // mobile device? go on!
//                 var tagName = element[0].tagName.toLowerCase(),
//                     fixedElements = angular.element($document[0].querySelectorAll('cm-header, cm-footer')),
//                     view = angular.element($document[0].querySelectorAll('body, html'));

//                 function stopEvent(e){
//                     if(e.target != element[0] && e.target != handler) {
//                         element[0].blur();
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }

//                 function onFocus(){
//                     view.on('touchstart',stopEvent);
//                     fixedElements.css('position','absolute');
//                     angular.forEach(fixedElements,function(fixedElement){
//                         if(fixedElement.tagName.toLowerCase() == 'cm-footer')
//                             angular.element(fixedElement).addClass('ng-hide');  
//                     });
//                 }

//                 function onBlur(){
//                     fixedElements.css('position','fixed');
//                     angular.forEach(fixedElements,function(fixedElement){
//                         if(fixedElement.tagName.toLowerCase() == 'cm-footer')
//                             angular.element(fixedElement).removeClass('ng-hide');
//                     });
//                     view.off('touchstart',stopEvent);
//                 }

//                 if(tagName == 'input' && element.attr('type') != 'checkbox' ||// only inputs text,password,mail,tel,
//                    tagName == 'textarea' // accept texareas to
//                 ){
//                     element.on('focus', onFocus);
//                     element.on('blur', onBlur);
//                     element.on('closeKeyboard', onBlur);
//                     scope.$on('$destroy', onBlur);

//                     // phonegap events
//                     document.addEventListener("showkeyboard", onFocus, false);
//                     document.addEventListener("hidekeyboard", onBlur, false);
//                 }
             }
         }
     }
])
.directive('cmMultiInput',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict: 'AE',
            scope: true,
            transclude: true,
            priority: 101,

            //template: '<div ng-repeat="item in collection" class="cm-multi-input-wrap">' +
            //            '<div ng-transclude ng-keyup="showMultiplier()"></div>'+
            //            '<div class="cm-multiplier" ng-click="multiply()" ng-show="isMultiplyable">'+
            //                '<i class="fa cm-checkbox-bg"></i>'+
            //                '<i class="fa cm-checkbox-add"></i>'+
            //            '</div>'+
            //          '</div>',
            template: '<div ng-repeat="item in collection" class="cm-multi-input-wrap">' +
                        '<div ng-transclude ng-keyup="showMultiplier()"></div>'+
                      '</div>',

            controller: function ($scope, $element, $attrs) {
                $scope.collection = [];
                $scope.isMultiplyable = false;

                $scope.$watchCollection($attrs.cmCollection,function(collection) {
                    if(collection != undefined) {
                        $scope.collection = collection;
                        $scope.showMultiplier();
                    }
                });

                $rootScope.$on('multi-input:changed', function(ngModel){
                    $scope.showMultiplier();
                });

                $scope.showMultiplier = function(){
                    var isDisabled = $scope.$eval($attrs.cmDisabled) || false;
                    var last = $scope.collection.length-1;

                    if(isDisabled == false && last > -1 && $scope.collection[last].value != ''){
                        $scope.isMultiplyable = true;
                    } else {
                        $scope.isMultiplyable = false;
                    }
                };

                $scope.multiply = function(){
                    var last = $scope.collection.length-1;
                    // check last item if filled
                    if($scope.collection[last].value != ''){
                        $scope.collection.push({value:''});
                    }
                };
            }
        }
    }
])
.directive('cmOfflineHandler',[
    'cmModal',
    '$rootScope',
    function (cmModal, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $rootScope.$on('connection:failed', function(event, reconnectCallback){
                    $rootScope.$broadcast('appSpinner','hide');
                    element.addClass('ng-hide');

                    var scope = $rootScope.$new();
                        scope.onFooterClick = function(){
                            reconnectCallback();
                            $rootScope.$broadcast('appSpinner','show');
                            $rootScope.$broadcast('getBrowserInfo');
                            element.removeClass('ng-hide');
                        };

                    cmModal.create({
                        id: 'offline-handler',
                        type: 'alert',
                        'cm-close-btn': false,
                        'cm-close-on-backdrop': false,
                        'cm-footer-label': 'MODAL.OFFLINE_HANDLER.FOOTER',
                        'cm-footer-icon': 'cm-change'
                    },
                    '<div class="attention">' +
                        '<i class="fa cm-attention cm-orange"></i> <span ng-bind-html="\'MODAL.OFFLINE_HANDLER.MESSAGE\'|cmTranslate"></span>' +
                    '</div>',
                    'body',
                    scope);
                    cmModal.open('offline-handler')
                });
            }
        }
    }
])
.directive('cmOverlay',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'AE',
            scope: true,
            transclude : true,

            link : function(scope, element, attrs, controller, transclude){
                var container = angular.element('<div class="container" ng-transclude></div>'),
                    bg = angular.element('<div cm-transparent-bg ng-click="hideOverlay()"></div>');

                element.append(bg);
                element.append(container);

                function show(){
                    angular.element(document.getElementById('cm-app')).append(element);

                    transclude(scope, function(clone){
                        container.append(clone);
                    });
                    element.addClass('visible');
                }

                function hide(){
                    element.removeClass('visible');
                    container.children().remove();
                }

                //container.on('click', hide)

                $rootScope.$on('cmOverlay:show', function(event, id){ if(attrs.id == id) show() });
                $rootScope.$on('cmOverlay:hide', function(event, id){ if(attrs.id == id) hide() });
            },

            controller: function($scope, $element, $attrs){
                $scope.hideOverlay = function(){
                    $scope.$emit('cmOverlay:hide', $attrs.id);
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmProgressbar
 * @description
 * Handle a percentage of anything.
 *
 * @restrict E
 * @example
<example module="cmDemo">
    <file name="style.css">
         cm-progressbar {
          display: block;
          width: 100%;
          min-height: 4rem;
        }
         cm-progressbar .percent {
          font-size: 2rem;
          text-align: center;
          color: #02bed2;
          line-height: 4rem;
        }
         cm-progressbar .percent span {
          display: inline-block;
          font-size: 1.2rem;
        }
         cm-progressbar .progressbar {
          height: 0.1em;
          background: #02bed2;
        }
    </file>
    <file name="script.js">
        
        .controller('Ctrl', function ($scope) {
            $scope.percent = 0;
            $scope.percentHundretTimes = 0;

            $scope.setPercent = function(percent){
                $scope.percent = percent/100;
                $scope.percentHundretTimes = percent;
            }
        });
    </file>
    <file name="index.html">
        <div ng-controller="Ctrl">
            <button ng-click="setPercent(0)">0%</button>
            <button ng-click="setPercent(15)">15%</button>
            <button ng-click="setPercent(30)">30%</button>
            <button ng-click="setPercent(45)">45%</button>
            <button ng-click="setPercent(60)">60%</button>
            <button ng-click="setPercent(75)">75%</button>
            <button ng-click="setPercent(90)">90%</button>
            <button ng-click="setPercent(100)">100%</button>
            <button ng-click="setPercent(120)">120%</button>
            <br />

            percentHundretTimes: {{percentHundretTimes}}
            <cm-progressbar cm-percent="percentHundretTimes" cm-hundret-times="true"></cm-progressbar>

            percent: {{percent}}
            <cm-progressbar cm-percent="percent"></cm-progressbar>
        </div>
    </file>
</example>
 */

.directive('cmProgressbar',[
    function (){
        return {
            restrict: 'E',
            template: '<div class="percent">{{cmPercent}}<span>%</span></div>' +
                      '<div class="progressbar" style="width:{{cmPercent}}%"></div>',
            controller: function($scope, $element, $attrs) {
                $scope.cmPercent = 0;

                if($attrs.cmPercent){
                    $scope.$watch($attrs.cmPercent, function (newPercent) {
                        // default multiply hundret times
                        if($attrs.cmHundretTimes == undefined){
                            newPercent = newPercent * 100;
                        }

                        // for whatever reason percent over 100%
                        if(newPercent > 100) {
                            newPercent = 100;
                        }

                        $scope.cmPercent = Math.round(newPercent);
                    })
                }
            }
        }
    }
])
.directive('cmReload',[
    '$route',
    function ($route){
        return {
            restrict: 'AE',
            scope: true,
            template: '<i class="fa cm-change"></i>',
            controller: function($scope, $element){
                $element.on('click',function(){
                    //$route.reload();
                    location.reload();
                });
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmUi.directive:cmResizeTextarea
 * @description
 * Max col controleld textarea that resize on user input
 *
 * @restrict A
 * @element textarea
 * @requires $timeout
 *
 * @example
 <example module="cmDemo">
    <file name="style.css">
     textarea[cm-resize-textarea] {
      resize: none;
      word-wrap: break-word;
      transition: 0.05s;
      -moz-transition: 0.05s;
      -webkit-transition: 0.05s;
      -o-transition: 0.05s;
      background-image: none;
      border: solid 0.1rem #cccccc !important;
    }
    </file>
     <file name="script.js">
        
        .controller('Ctrl', function ($scope) {
            $scope.model = 'moep moep';
            $scope.modelLong = 'moep moep mopeppppppppppppppppppppppppppppppefpepfp ppfepfpepfpefpp dp sdpfpsdpfpsd fpspdfp';
        });
     </file>
     <file name="index.html">
         <div ng-controller="Ctrl">
            default:<br />
            <textarea cm-resize-textarea ng-model="model"></textarea>
            <br />
            max rows 4:<br />
            <textarea cm-resize-textarea ng-model="modelLong" cm-max-rows="4"></textarea>
         </div>
     </file>
 </example>
 */

.directive('cmResizeTextarea',[
    '$timeout',
    'cmSettings',
    '$rootScope',
    function ($timeout, cmSettings, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                text: '=ngModel'
            },
            link: function (scope, element, attrs) {
                // vars
                var paddingLeft = element.css('paddingLeft'),
                    paddingRight = element.css('paddingRight'),
                    maxRows = attrs.cmMaxRows || 2,
                    shadowRowHeight = 0,
                    textAreaRowHeight = 0,
                    diffRowHeight = 0,
                    unit = 'px',
                    $shadow;

                /**
                 * create shadow of textarea for calcing the rows
                 */
                function createShadow(){
                    var width = element[0].offsetWidth;
                        if(width == 0)
                            width = parseInt(element.css('width'));

                    $shadow = angular.element('<div class="textarea-shadow"></div>').css({
                        position: 'fixed',
                        top: -10000+unit,
                        left: -10000+unit,
//                        top: 0,
//                        left: 0,
                        width: width - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0)+unit,
                        'font-size': element.css('fontSize'),
                        'font-family': element.css('fontFamily'),
                        'line-height': element.css('lineHeight'),
                        'word-wrap': 'break-word'
                    });
                    element.after($shadow);
                }

                /**
                 * update for textarea input
                 */
                function update(){
                    // replace function for white spaces
                    var times = function(string, number){
                        for (var i = 0, r = ''; i < number; i++) r += string;
                        return r;
                    };

                    // set textarea value to shadow
                    var val = element.val().replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/&/g, '&amp;')
                        .replace(/\n$/, '<br/>&nbsp;')
                        .replace(/\n/g, '<br/>')
                        .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
                    $shadow.html(val);

                    // on init get one row height
                    var shadowHeight = $shadow[0].offsetHeight,
                        hasNewLines = scope.text ? scope.text.split(/\r\n|\r|\n/g) : [];

                    // on init get one row height
                    if(shadowHeight > 0 && shadowRowHeight == 0 && hasNewLines.length > 0){
                        shadowRowHeight = shadowHeight / hasNewLines.length;
                    } else if(shadowHeight > 0 && shadowRowHeight == 0){
                        shadowRowHeight = shadowHeight;
                        diffRowHeight = textAreaRowHeight-shadowHeight;
                    }
                    // handle textarea height
                    if(shadowRowHeight > 0) {
                        // one line
                        if (shadowHeight < shadowRowHeight) {
                            element.css('height', (shadowRowHeight + diffRowHeight) + unit);
                            element.attr('rows', 1);
                            element.css('overflow', 'hidden');
                        // under max rows
                        } else if (maxRows * shadowRowHeight >= shadowHeight) {
                            element.css('height', (shadowHeight + diffRowHeight) + unit);
                            element.css('overflow', 'hidden');
                            element.attr('rows', Math.round(shadowHeight/shadowRowHeight));
                        // max rows
                        } else {
                            element.css('height', (maxRows * shadowRowHeight + diffRowHeight) + unit);
                            element.css('overflow', 'auto');
                            element.attr('rows', maxRows);
                        }

                        $rootScope.$broadcast('textArea:resize',element.css('height'));
                    }
                }

                /**
                 * at cursor position inserter
                 * @param el
                 * @param text
                 */
                function insertTextAtCursor(el, text) {
                    var val = el.value, endIndex, range;
                    if (typeof el.selectionStart != 'undefined' && typeof el.selectionEnd != 'undefined') {
                        endIndex = el.selectionEnd;
                        el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
                        el.selectionStart = el.selectionEnd = endIndex + text.length;
                    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
                        el.focus();
                        range = document.selection.createRange();
                        range.collapse(false);
                        range.text = text;
                        range.select();
                    }
                }

                // style textarea
                element
                    .css({
                        'overflow': 'hidden',
                        'resize': 'none'
                    })
                    .attr('rows',1);

                // find one row height for rows setting
                textAreaRowHeight = parseInt(element.css('height')||0);
                if(textAreaRowHeight == 0)
                    textAreaRowHeight = element[0].offsetHeight;

                // event binding
                scope.$watch('text', function(newText){
                    update(newText);
                });
                element.on('keyup', update);
                element.on('redo', update);
                element.on('undo', update);
                element.on('keypress', update);
                element.on('change', update);
                element.on('keydown', function(e){
                    // on tab
                    if (e.keyCode == 9) {
                        insertTextAtCursor(this, '\t');
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    // on return
                    if(e.keyCode == 13 && e.shiftKey == false && cmSettings.is('sendOnReturn')){
                        $rootScope.$broadcast('sendOnReturn');
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    return true;
                });

                // watch on ngModel for extern changes
                var timeoutWatch = null;
                scope.$watch(attrs.ngModel,function(newValue){
                    if(newValue == ''){
                        if(timeoutWatch != null)
                            $timeout.remove(timeoutWatch);
                        timeoutWatch = $timeout(function(){
                            update();
                            timeoutWatch = null;
                        },50);
                    }
                });

                // init
                createShadow();
                update();
            }
        }
    }
])

.directive('cmRubberSpaceRepeat',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'A',
            link : function(scope) {
                if(scope.$last) {
                    $rootScope.$broadcast('rubberSpace:tighten');
                }
            }
        }
    }
])
.directive('cmRubberSpace',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'A',
            link : function(scope, element, attrs) {
                

                // remove text nodes:
                angular.forEach(element[0].childNodes, function (el) {
                    if(el.nodeType == 3) {//nodeType === 8 is <!-- -->
                        angular.element(el).remove();
                    }
                });

                function tighten(){
                    // calculate total weight:
                    var available_space = 100,
                        total_weight    = 0,
                        width           = element[0].offsetWidth

                    //substract padding:
                    available_space -= 100*(element.css('paddingLeft')+element.css('paddingRight'))/width

                        //console.log(element.css('paddingRight'))

                    //substract children's margin:
                    angular.forEach(element.children(), function(child){  
                        available_space -= 100*(angular.element(child).css('marginLeft')+angular.element(child).css('marginRight'))/width    
                    })

                    //substract width of element width undefined weight:
                    angular.forEach(element.children(), function(child){                         
                        var weight = parseInt( angular.element(child).attr('cm-weight')) || false


                        if(weight){
                            child.weight     = weight
                            total_weight    += child.weight
                        }else{
                            available_space -= 100 * child.offsetWidth/width
                        }
                    });
                    
                    // stretch children according to their weight:
                    angular.forEach(element.children(), function (child) {
                        child = angular.element(child)

                        if (child[0].weight) {
                            child.css('width', (available_space * child[0].weight / total_weight) + '%')
                        }
                    })

                }

                scope.$watch(function(){
                    tighten();
                })

                $rootScope.$on('rubberSpace:tighten',function(){
                    tighten();
                });
            }
        }
    }
])
.directive('cmScrollTo',[
    'cmLogger',
    '$timeout',
    '$rootScope',
    '$document',
    function (cmLogger, $timeout, $rootScope, $document){
        return {
            restrict: 'A',
            scope: true,
            controller: function($scope, $element, $attrs){
                $scope.options = angular.extend({},{
                    anchor: undefined, // #id of element
                    force: undefined, // force to top or bottom
                    onEvent: false,// only initalize the rootScope event
                    timeout: 250,
                    addElementsHeight: undefined
                },$scope.$eval($attrs.cmScrollTo)||{});
            },
            link: function(scope, element, attrs){
                if(!scope.options.anchor){
                    cmLogger.warn('drtv cm-scroll-to anchor is empty');
                    return false;
                }

                function initTimeout(where){
                    var anchor = angular.element($document[0].querySelector(scope.options.anchor)),
                        bodyAndHtml = angular.element($document[0].querySelectorAll('body,html')),
                        extraOffset = 0;

                    // anchor isn't exists yet because of routeChange
                    if(anchor.length == 0) {
                        return false;
                    }

                    // subscract elements height because of overblending
                    if(scope.options.addElementsHeight) {
                        var extraHeight = angular.element($document[0].querySelectorAll(scope.options.addElementsHeight));
                        angular.forEach(extraHeight, function (tag) {
                            extraOffset = tag.offsetHeight;
                        });
                    }

                    $timeout(function(){
                        var position = anchor[0].offsetTop;

                        switch(scope.options.force){
                            case 'bottom':
                                position = position+5000;
                            break;
                            case 'top':
                                position = 0;
                            break;
                        }

                        angular.forEach(bodyAndHtml, function (tag) {
                            tag.scrollTop = position - extraOffset;
                        });
                    },scope.options.timeout);
                }

                // drtv on create
                if(!scope.options.onEvent) {
                    // drtv in ng-loop
                    if (attrs.ngRepeat && scope.$last) {
                        initTimeout('last');
                    // drtv normal
                    } else if (!attrs.ngRepeat) {
                        initTimeout('no-repeat');
                    }
                // only via event broadcast
                } else {
                    var scrollToEvent = $rootScope.$on('scroll:to',function(){
                        initTimeout('event');
                    });

                    scope.$on('$destroy', function(){
                        scrollToEvent();
                    });
                }
            }
        }
    }
])
.directive('cmSearchInput',[
    '$document',
    '$rootScope',
    function($document, $rootScope){
        return {
            restrict: 'E',
            scope: {
                search: '=ngModel',
                cmOptions: '=cmOptions'
            },
            template: '<input data-qa="inp-list-search" id="inp-list-search" type="text" value="" ng-model="search" placeholder="{{placeholder}}">' +
                      '<i data-qa="btn-list-search-clear" class="fa" ng-click="clear()" ng-class="{\'cm-search\':showDefaultIcon && counterKeydown == 0,\'cm-checkbox-wrong\':counterKeydown > 0}"></i>',
            link: function(scope, element, attrs){

                scope.placeholder = attrs.placeholder || '';
                // wrapper events
                element
                .on('focus', function(){
                    scope.counterKeydown = 0;
                })
                .on('keydown', function(){
                    scope.counterKeydown++;
                })
                .on('keyup', function(){
                    if(scope.search == ''){
                        scope.counterKeydown = 0;
                        scope.$apply();
                    }
                    // on search jump to anchor
                    if(scope.options.scrollTo){
                        $rootScope.$broadcast('scroll:to');
                    }
                });

                if(scope.options.hideElements){
                    var input = angular.element(element[0].querySelector('input')),
                        elementsToHide = angular.element($document[0].querySelectorAll(scope.options.hideElements));

                    input
                    .on('focus', function(){
                        elementsToHide.addClass('ng-hide');
                    })
                    .on('blur', function(){
                        elementsToHide.removeClass('ng-hide');
                    })
                }
            },
            controller: function($scope, $element, $attrs){
                // options for drtv
                $scope.options = angular.extend({}, {
                    withoutSearchIcon:false,
                    hideElements:undefined,
                    scrollTo:undefined
                }, $scope.cmOptions || {});

                $scope.counterKeydown = 0;

                $scope.showDefaultIcon = true;

                if($scope.options.withoutSearchIcon){
                    $scope.showDefaultIcon = false
                }

                $scope.clear = function(){
                    $scope.search = '';
                    $scope.counterKeydown = 0;
                }
            }
        }
    }
])
.directive('cmStayInViewport',[
    '$window',
    '$timeout',
    function ($window, $timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // hide image for hidden scale operation
                element.css('visibility','hidden');

                if(attrs.cmSrc) {
                    // set src with delay for showing loader
                    $timeout(function () {
                        element.attr('src', scope[attrs.cmSrc]);
                    }, 1000);
                    // after setted src and image loaded check viewport
                    element.on('load', function () {
                        var viewport = {
                            w: $window.innerWidth,
                            h: $window.innerHeight
                        };
                        var image = {
                            w: element[0].width,
                            h: element[0].height,
                            isPortrait: element[0].height > element[0].width
                        };
                        // calc height if greater than viewport
                        if (image.isPortrait) {
                            element.parent().addClass('is-portrait');
                            if (image.h > viewport.h) {
                                element.css('height', (viewport.h - 150) + 'px');
                                element.css('max-width', 'none');
                            } else {
                                element.css('height', image.h + 'px');
                                element.css('max-width', 'none');
                            }
                        } else {
                            element.parent().addClass('is-landscape');
                            element.css('width', '90%');
                            element.css('max-width', 'none');
                        }
                        // show image and hide loader on scope
                        if (attrs.cmLoadedSpinner) {
                            scope.$apply(function () {
                                scope[attrs.cmLoadedSpinner] = false;
                            });
                        }
                        if (attrs.cmLoadedVisibility) {
                            scope.$apply(function () {
                                scope[attrs.cmLoadedVisibility] = {visibility: 'visible'};
                            });
                        }
                        // show image
                        element.css('visibility', 'visible');
                    });
                }
            }
        }
    }
])
.directive('cmTimeConverter',[
    'cmSettings',
    'cmUtil',
    function (cmSettings, cmUtil){
        return {
            restrict: 'AE',
            scope: {
                timestamp: '=cmTimestamp',
                dateFormat: '=cmDateFormat',
                specialType: '@cmSpecialType'
            },
            template: '<span>{{time | date: format}}</span>',
            controller: function($scope){

                /**
                 * Set Time
                 */
                if(typeof $scope.timestamp != 'undefined'){
                    var d = new Date(parseInt($scope.timestamp));
                } else {
                    var d = new Date()
                }
                $scope.time = d;

                /**
                 * Set default Date Format
                 */
                $scope.format = cmSettings.get('dateFormat') + ' ' + cmSettings.get('timeFormat');
                if(typeof $scope.dateFormat != 'undefined'){
                    $scope.format = $scope.dateFormat;
                }

                switch($scope.specialType){
                    case 'conversation-tag':
                        $scope.format = cmSettings.get('timeFormat');

                        if(cmUtil.compareDate((new Date().getTime()), $scope.time)){
                            $scope.format = cmSettings.get('dateFormat');
                        }
                        break;
                    case 'date-seperator':
                        $scope.format = cmSettings.get('dateFormat');
                        break;
                    default:
                        // date Format does not change
                }
            }
        }
    }
])
.directive('cmTimeout',[

    'cmUtil',

    function(cmUtil){
        return {
            restrict:   'E',
            scope:      true,
            controller: function($scope, $attrs){
                $scope.cmTimeout = cmUtil.millisecondsToStr(parseInt($scope.$parent.$eval($attrs.cmData || 0)))

                var last_value  =   undefined,
                    interval    =   window.setInterval(function(){
                                        $scope.cmTimeout = cmUtil.millisecondsToStr(parseInt($scope.$parent.$eval($attrs.cmData || 0)))
                                        if(last_value != $scope.cmTimeout){
                                            $scope.$digest()
                                            last_value = $scope.cmTimeout
                                        }
                                    }, 500)

                $scope.$on('$destroy', function(){
                    window.clearInterval(interval)
                })
            }
        }
    }
])
.directive('cmView', [
    '$route',
    'cmUserModel',
    function ($route, cmUserModel){
        return {
            restrict: 'A',
            controller: function($scope){
                if(cmUserModel.isGuest() !== false && $route.current.$$route.guests !== true){
                    cmUserModel.doLogout(true,'drtv-view only for guests');
                    return false;
                }
                $scope.css = $route.current.$$route.css;
            }
        }
    }
])

.filter('cmAutolink', [
    '$sce',
    'cmUtil',
    function($sce, cmUtil){
        return function(text, attrStrLen){
            var pattern = /(^|[\s\n]|<br\/?>)(((?:https?|ftp)(:\/\/)|(www|\/\/))[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
            var strLen = attrStrLen||50;
            var slash = '&#x2F;'; // find forward slash '/'

            // unescaped links
            /*
             http://localhost:8000/app/#/conversation/zy6ofOMu5h0W5O1sPB70
             http:&#x2F;&#x2F;localhost:8000&#x2F;app&#x2F;#&#x2F;conversation&#x2F;zy6ofOMu5h0W5O1sPB70
            */

            if(text == undefined)
                return '';

            // unescaped slashes to normal slashes
            if(text.indexOf(slash) > -1) {
                text = text.replace(/&#x2F;/g, '/');
            }

            return text.replace(pattern, function(link){

                var tag = '<a href="%href" target="_blank" title="%href">%link</a>',
                    clearLink = link.replace(/\s+/g,''), // clear whitespace
                    url = !cmUtil.startsWith(clearLink,'www') // check if starts with http
                        ? clearLink
                        : 'http://'+clearLink,
                    startsWithBreak = link.indexOf('\n') != -1;

                if(url != undefined){
                    if(clearLink.length > strLen){
                        return $sce.trustAsHtml(
                                (startsWithBreak ? '\n' : '') +
                                (cmUtil.startsWith(link,' ')?' ':'') +
                                tag.replace(/%href/g,url)
                                   .replace(/%link/g,String(clearLink).substring(0, strLen))
                        );
                    } else {
                        return $sce.trustAsHtml(
                                (startsWithBreak ? '\n' : '') +
                                (cmUtil.startsWith(link,' ')?' ':'') +
                                tag.replace(/%href/g,url)
                                   .replace(/%link/g,clearLink)
                        );
                    }
                }
            });
        }
    }
])
.filter('cmBytesHumanReadable', [
    'cmUtil',
    function(cmUtil){
        return function(bytes){
            return cmUtil.bytesToStr(bytes);
        }
    }
])
.filter('cmDigits', [
    function(){
        return function(number, digits){
            var x   = parseFloat(number)
            var str =  (Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits)).toString()

            str = str.match(/\./) ? str : str+'.'
            while(str.indexOf('.') >= str.length-2) str +='0'

            return str.match(/^[0-9\.]*$/) ? str : '0'
        }
    }
])
.filter('cmEmoji', [
    '$filter',
    'cmSettings',
    function($filter, cmSettings){

        var convertSmileyToEmoji = [
            {matcher: [':\\)','\\(:','\\^\\^'], emoji:'blush'},
            {matcher: [';\\)','\\(;'], emoji:'wink'},
            {matcher: [':D'], emoji:'smile'},
            {matcher: [':\\*','\\*:'], emoji:'kissing_heart'},
            {matcher: ['<3'], emoji:'heart_eyes'},
            {matcher: ['B\\)'], emoji:'sunglasses'},
            {matcher: [':P',':p'], emoji:'stuck_out_tongue'},
            {matcher: [';P',';p'], emoji:'stuck_out_tongue_winking_eye'},
            {matcher: [':\\('], emoji:'worried'},
            {matcher: [':o '], emoji:'open_mouth'},
            {matcher: [":\\'\\("], emoji:'cry'},
            {matcher: ['\\.!\\.'], emoji:'fu'},
            {matcher: ['o_O','O_o','oO','Oo','o\\.O','O\\.o'], emoji:'flushed'},
            {matcher: ['-_-'], emoji:'expressionless'},
            {matcher: ['\\^_\\^'], emoji:'grin'},
            {matcher: ['\\\\o\/'], emoji:'ghost'}
        ];

        return function (input) {
            var str = '';

            // regular emojis
            str = $filter('emoji')(input.toString());

            // smiley to emoji
            if(cmSettings.is('convertEmoji')) {
                convertSmileyToEmoji.forEach(function (smiley) {
                    var rSmiley = new RegExp(smiley.matcher.join("|"), "g");
                    str = str.toString().replace(rSmiley, function () {
                        return '<i class="emoji emoji_' + smiley.emoji + '" title=":' + smiley.emoji + ':">' + smiley.emoji + '</i>';
                    });
                });
            }

            return str;
        };
    }
])

.filter('cmEscape', [
    function(){
        return function(canBeHtml){
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            function escapeHtml(string) {
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return entityMap[s];
                });
            }

            var text = escapeHtml(canBeHtml||'');

            return text;
        }
    }
])

.filter('cmInlineTranslate', [
    '$filter',
    function($filter){
        return function(text){
            if(text == undefined)
                return '';

            var result = text,
                matches = text.match(/\$\$\{[A-Z0-9\.]*\}/) || [];

            matches.forEach(function(match){
                result = result.replace(match, $filter('cmTranslate')(match.replace('$${','').replace('}','')))
            });

            return result;
        }
    }
])
/*

 # Usage in html template:

 "xxx | nl2br"

 <div ng-bind-html=" YourString | nl2br "></div>

 or:

 "xxx | nl2br:Boolean"

 Boolean( true or flase or just keep null) means is xhtml  or not

 if is xhtml, replace with <br/> ; if not , replace with <br>

 <div ng-bind-html=" YourString | nl2br:true "></div>


 -------------------------

 # Example:

 //==Analog data===
 $scope.items = [
 {"message": "test"},
 {"message": "New\nLine"},
 ]
 //=====
 <div class="comment" ng-repeat="item in items">
 <p ng-bind-html=" item.message | nl2br "></p>
 </div>

 -------------------------

 # Output result:

 <div class="comment ng-scope" ng-repeat="item in items">
 <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
 test
 </p>
 </div>
 <div class="comment ng-scope" ng-repeat="item in items">
 <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
 New<br>Line
 </p>
 </div>

 */


.filter('nl2br', [
    '$sce',
    function($sce){
        return function(msg, is_xhtml) {
            var is_xhtml = is_xhtml || true;
            var breakTag = (is_xhtml) ? '<br />' : '<br>';
            var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
            return $sce.trustAsHtml(msg);
        }
    }
])

.filter('cmParse', [
    '$filter',
    function($filter){
        return function(html, ignore){
            if(ignore == undefined)
                ignore = {};

            if(!('escape' in ignore))
                html = $filter('cmEscape')(html);

            if(!('translate' in ignore))
                html = $filter('cmTranslate')(html);

            if(!('inlineTranslate' in ignore))
                html = $filter('cmInlineTranslate')(html);

            if(!('autolink' in ignore))
                html = $filter('cmAutolink')(html, 40);// $sce

            if(!('emoji' in ignore))
                html = $filter('cmEmoji')(html);

            if(!('nl2br' in ignore))
                html = $filter('nl2br')(html);//$sce

            return html;
        }
    }
])
.filter('cmRecipients', [

    function(){
        return function(arrayToSearch, shouldBeRecipient, objectOfRecipients){
            // defines
            var arrayFiltered = [],
                objectOfRecipients = objectOfRecipients || {}

            if(!arrayToSearch.length) return arrayToSearch;

            // iterate all
            for ( var j = 0; j < arrayToSearch.length; j++) {
                var contact = arrayToSearch[j];
                if(shouldBeRecipient && contact.identity.id in objectOfRecipients ||
                   !shouldBeRecipient && !(contact.identity.id in objectOfRecipients) ) {
                    arrayFiltered.push(contact);
                }
            }
            // return filtered array
            return arrayFiltered;
        }
    }
])
.filter('cmSearch', [
    'cmUtil',
    function(cmUtil){
        return function(arrayToSearch, searchType, searchString){
            
            if(!arrayToSearch.length || typeof searchString != 'string') return arrayToSearch;



            /**
             * @name isMatch
             * @description
             * try to find a string in a string
             * @param {String} text haystack for match
             * @returns {boolean} if the match was complete
             */
            var isMatch = function(text){
                if(text == undefined) return false;
                var haystack    = String(text).toLowerCase(),
                    needle      = String(searchString).toLowerCase().replace(/^0|\+\d\d/g, '') //ignore leading zeros for phonenumbers

                return haystack.indexOf(needle) > -1;
            };

            /**
             * @name isInArrayMatch
             * @param {Array} array for iteration
             * @param {Function} callback for matching
             * @returns {boolean} if the match was complete
             */
            var isInArrayMatch = function(array, callback){
                var boolean = false;
                if(!cmUtil.isArray(array) || typeof callback != 'function') return false;
                for ( var j = 0; j < array.length; j++) {
                    var item = array[j];
                    if(!boolean){
                        boolean = callback(item);
                    }
                }
                return boolean;
            };

            /**
             * @name search
             * @param {Object} item cmModel of cmFactory
             * @returns {boolean} if the search was complete
             */
            var search = function(item){
                var boolean = false;
                switch (searchType) {
                    case 'contacts':
                        if('contactType' in item && isMatch(item.contactType) ||
                            'identity' in item && isMatch(item.identity.getDisplayName()) ||
                            'identity' in item && isMatch(item.identity.email.value) ||
                            'identity' in item && isMatch(item.identity.phoneNumber.value && item.identity.phoneNumber.value.replace(/^0|\+\d\d/g, ''))
                            )
                            boolean = true;
                        break;
                    case 'talks':
                        if('subject' in item && isMatch(item.subject) ||
                            'messages' in item && isInArrayMatch(item.messages, function(arrayItem){return isMatch(arrayItem.text)}) ||
                            'recipients' in item && isInArrayMatch(item.recipients, function(arrayItem){return isMatch(arrayItem.getDisplayName())})
                            )
                            boolean = true;
                        break;
                }
                return boolean;
            };

            // filter array
            var arrayFiltered = [];
            // iterate all
            for ( var j = 0; j < arrayToSearch.length; j++) {
                var item = arrayToSearch[j];
                if (search(item)) {
                    arrayFiltered.push(item);
                }
            }
            // return filtered array
            return arrayFiltered;
        }
    }
])

.filter('strnl2nl', [
    '$sce',
    function($sce){
        return function(string) {
            var string = (string + '').replace(/\\n/g, '\n');
            return $sce.trustAsHtml(string);
        }
    }
])
.filter('cmTimeoutHumanReadable', [
    'cmUtil',
    function(cmUtil){
        return function(milliseconds){
            return cmUtil.millisecondsToStr(milliseconds);
        }
    }
])
.filter('truncate', [
    function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    }
])

.directive('cmModal', [
    'cmModal', 'cmTranslate',
    '$rootScope', '$timeout', '$q',
    function (cmModal, cmTranslate,
              $rootScope, $timeout, $q){

        // handle nose position
        function addNose(element, attrs){
            if(!attrs.nose) return null

            var nose        =   angular.element('<i class="nose fa"></i>'),
                nose_side   =   attrs.nose.split('-'),
                nose_class  =   {
                    'top-left':     'cm-nose-up flip',
                    'top-right':    'cm-nose-up',
                    'left-top':     'cm-nose-left flip',
                    'left-bottom':  'cm-nose-left',
                    'right-top':    'cm-nose-right',
                    'right-bottom': 'cm-nose-right flip',
                    'bottom-left':  'cm-nose-down flip',
                    'bottom-right': 'cm-nose-down'
                }

            nose
                .addClass(nose_class[attrs.nose])
                .addClass(nose_side[0])
                .css(nose_side[1], attrs.nosePosition || '2rem')

            element
                .addClass('nose-'+nose_side[0])

            element.find('article').append(nose)
        }

        return {
            restrict: 'AE',
            transclude: true,
            scope: true,
            
            templateUrl: function(tElement, tAttrs){
                var type = tAttrs.type || 'plain',
                    templateUrl = {
                        plain:      'comps/ui/modal/drtv-modal-plain.html',
                        fullscreen: 'comps/ui/modal/drtv-modal-fullscreen.html',
                        alert:      'comps/ui/modal/drtv-modal-alert.html',
                        confirm:    'comps/ui/modal/drtv-modal-confirm.html'
                    };

                return templateUrl[type];
            },

            link: function(scope, element, attrs, controller, transclude){

                scope.closeBtn = attrs.cmCloseBtn || true;
                scope.footerLabel = attrs.cmFooterLabel || undefined;
                scope.footerIcon = attrs.cmFooterIcon || undefined;

                // refresh modal content
                scope.refresh = function(){                   
                    transclude(scope, function (clone) {
                        var transclude_container = element.find('ng-transclude');

                        transclude_container
                        .children()
                        .remove();

                        transclude_container
                        .append(clone);                 
                    })
                };

                // add external data to scope
                scope.setData = function(data){
                    if(data != undefined) {
                        scope[attrs.cmDataAs || 'data'] = data;
                    }
                    return this;
                };

                // toggle visiblity modal
                scope.toggle = function(on){
                    on = (on == undefined ? $element.hasClass('active') : on);
                    if(on){
                        scope.refresh();
                        element.addClass('active');
                        $timeout(function(){
                            $rootScope.isModalVisible = true;
                        })                        
                    } else {
                        element.removeClass('active');
                        $timeout(function(){
                            $rootScope.isModalVisible = false;
                        })
                    }

                    return this
                };

                scope.isActive = function(){
                    return element.hasClass('active')
                }

                // open modal
                scope.open = function(ttl){
                    scope.toggle(true);
                    return scope
                };
                // close modal
                scope.close = function(fromBackdrop){

                    if(!fromBackdrop && 'onFooterClick' in scope){
                        scope.onFooterClick();
                    }

                    this.toggle(false);
                    cmModal.trigger('modal:closed', attrs.id);

                    return this;
                };

                // close modal when clicked on backdrop
                if(!('cmCloseOnBackdrop' in attrs) || attrs.cmCloseOnBackdrop != "false"){
                    angular.element(element.children()[1]).on('click', function () {
                        scope.close(true);
                    });
                }

                element
                .addClass(attrs.severity)

                addNose(element, attrs);
                // register modal to service
                cmModal.register(attrs.id, scope);
                // refresh content
                scope.refresh();
            },

            controller: function($scope, $element, $attrs){
                $scope.title    = $attrs.cmTitle;
                $scope.severity = $attrs.severity || 'info';
                $scope.options  = $scope.$eval($attrs.cmOptions) || {withoutBackdrop:false}
                $scope.id       = $attrs.id
            }
        }
    }
])

.service('cmModal',[
    'cmObject', 'cmLogger',
    '$rootScope', '$compile', '$document', '$q', '$timeout',
    function(cmObject, cmLogger,
             $rootScope, $compile, $document, $q, $timeout){
        var self = {};

        cmObject.addEventHandlingTo(self);

        self.instances = {};

        self.register = function(id, scope){

            if(!scope){
                cmLogger.error('cmModal: unable to register modal without id or scope.');
                return null;
            }

            var old_scope = self.instances[id];

            if(old_scope != scope){
                self.instances[id] = scope;
                self.trigger('register', id);
            }

            return self;
        };

        self.open = function(id, data, ttl){
            if(self.instances[id]){
                self.instances[id]
                    .setData(data)
                    .open();
                self.trigger('modal:opened',id);
            } else {
                self.one('register', function(event, registered_id){
                    return !!(registered_id == id ? self.open(id, data) : false);
                });
            }

            if(ttl){ $timeout(function(){ self.close(id)}, ttl) }

            return self;
        };

        self.close = function(id){
            var instance = self.instances[id];
            
            if(instance){
                self.instances[id].close();

                self.trigger('modal:closed',id);
            }
            return self;
        };

        self.closeAll = function(){
            angular.forEach(self.instances, function (modal_instance) {
                modal_instance.close();
            });

            return self;
        };

        self.create = function(config, template, target, scope){
            var attrs = '';
            
            //Todo: könnte man schöner machen:
            angular.forEach(config, function(value, key){ attrs += key+'="'+value+'"' });

            // clear existing instance
            if(self.instances[config.id] != undefined){
                delete self.instances[config.id];
            }

            // clear DOM element, if neccessary
            if(angular.element($document[0].getElementById(config.id)).length > 0){
                angular.element($document[0].getElementById(config.id)).remove();
            }

            // create new element
            var scope = scope || $rootScope.$new();


            var modal = $compile('<cm-modal '+attrs+' >'+(template||'')+'</cm-modal>')(scope);
            // move modal up the dom hierarchy, if necessary:

            if(target == 'body'){
                target = $document[0].querySelector('body');
            }

            angular.element(target || $document[0].querySelector('#cm-app') || $document[0].querySelector('body')).append(modal);

            // the modal directive (<cm-modal>) will register itself on next digest

            return modal
        };

        self.confirm = function(config){

            config  =   {
                            text:   config.text,
                            cancel: config.cancel,
                            okay:   config.okay,
                            title:  config.title || 'DRTV.CONFIRM.HEADER',
                            html:   config.html || '',
                            data:   config.data
                        }

            var deferred    = $q.defer(),
                scope       = $rootScope.$new(),
                modalId     = 'modal-confirm-'+(new Date()).getTime();

            scope.text              =   config.text       || '';
            scope.labelOkay         =   config.okay
            scope.labelCancel       =   config.cancel

            scope.cancel            =   function(){ 
                                            $rootScope.closeModal(modalId)
                                        }
            scope.confirm           =   function(){
                                            deferred.resolve(this)
                                            $rootScope.closeModal(modalId) 
                                        }
            self.create({
                id:             modalId,
                type:           'confirm',
                'class':        'no-padding',
                'cm-close-btn': false,
                'cm-title':     config.title
            },'<cm-modal-confirm>'+config.html+'</cm-modal-confirm>',null,scope);

            self.open(modalId, config.data);

            self.one('modal:closed', function(event, id){
                if(id == modalId)
                    deferred.reject()

                return true //remove event binding
            })

            return deferred.promise
        };

        $rootScope.openModal        = self.open
        $rootScope.closeModal       = self.close
        $rootScope.isModalVisible   = false
        $rootScope.confirm          = self.confirm

//        $rootScope.$watch('isModalVisible' ,function(newValue){
//            console.log('watch modal '+newValue)
//            $rootScope.isModalVisible = newValue;
//        });

        // close all modals on route change:
        $rootScope.$on('$routeChangeStart', function(){
            self.closeAll();
        });

        // closeAll on ESC
        $document.bind('keydown', function (event) {
            if (event.which === 27) {
                self.closeAll();
            }
        });

        return self;
    }
])
.service('cmLoader',[
    function() {
        return function cmLoader($scope){
            $scope.showLoader = false;

            this.start = function(){
                $scope.showLoader = true;
            };

            this.stop = function(){
                $scope.showLoader = false;
            };

            this.isIdle = function(){
                return $scope.showLoader;
            }
        }
    }
])
'use strict';

angular.module('comps/user/drtv-account-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/drtv-account-edit.html',
'<article class="content"><cm-info-bubble class="cm-alert"><i class="fa cm-info cm-ci-color"></i> {{\'ACCOUNT.INFO.NOTE_ABOUT_THIS_DATA\'|cmTranslate}}</cm-info-bubble></article><hr class="margin-small" /><form name="cmForm" novalidate autocomplete="off"><article class="content" ng-click="toggleReadOnly()"><label>{{\'ACCOUNT.PLACEHOLDER.LOGINNAME\'|cmTranslate}}</label><div class="cm-input-ctn cm-input-readonly"><input tabindex="1" data-qa="input-loginName" disabled type="text" name="loginName" ng-model="account.loginName" /></div><cm-info-bubble class="cm-alert" ng-show="showReadOnly"><i class="fa cm-info cm-ci-color"></i> {{\'ACCOUNT.INFO.LOGINAME\'|cmTranslate}}</cm-info-bubble></article><hr class="margin-small" /><label class="content">{{\'ACCOUNT.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><cm-multi-input cm-collection="account.phoneNumbers" class="content"><ng-form name="formPhone"><div class="cm-input-ctn with-chooser with-inside-icon"><input tabindex="2" data-qa="input-phoneNumber" type="text" name="phoneNumber" ng-model="item.value" cm-validate-phone cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" ng-show="formPhone.phoneNumber.$dirty && formPhone.phoneNumber.$invalid"><div ng-show="formPhone.phoneNumber.$invalid" data-qa="form-error-phoneNumber-invalid"><i class="fa cm-info"></i> {{\'ACCOUNT.INFO.INVALID.PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input><hr class="margin-small" /><label class="content">{{\'ACCOUNT.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><cm-multi-input cm-collection="account.emails" class="content"><ng-form name="formEmail"><div class="cm-input-ctn with-chooser with-inside-icon"><input tabindex="3" data-qa="input-email" name="email" ng-model="item.value" cm-validate-email cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" ng-show="formEmail.email.$dirty && formEmail.email.$invalid"><div ng-show="formEmail.email.$invalid" data-qa="form-error-email-invalid"><i class="fa cm-info"></i> {{\'ACCOUNT.INFO.INVALID.EMAIL\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input><ul class="border-top border-bottom mt5"><li class="no-border"><span class="item" ng-click="togglePasswordChange()" data-qa="btn-passwordChange" > {{\'ACCOUNT.PLACEHOLDER.PASSWORD_CHANGE\'|cmTranslate}}</span><div class="short-links" ng-click="togglePasswordChange()"><i class="fa" ng-class="{\'cm-down\':!showPasswordChange,\'cm-up\':showPasswordChange}"></i></div><section ng-show="showPasswordChange"><hr class="margin-small" /><article class="content"><label>{{\'ACCOUNT.PLACEHOLDER.OLD_PASSWORD\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon"><input tabindex="4" data-qa="input-oldPassword" type="password" name="oldPassword" ng-model="account.oldPassword" /><i class="fa cm-write"></i></div><cm-info-bubble class="cm-alert" ng-show="cmForm.oldPassword.$error.empty || cmForm.oldPassword.$error.invalid"><div ng-show="cmForm.oldPassword.$error.empty" data-qa="form-error-oldPassword-empty"><i class="fa cm-info"></i> {{\'ACCOUNT.INFO.INVALID.OLD_PASSWORD\'|cmTranslate}}</div><div ng-show="cmForm.oldPassword.$error.invalid" data-qa="form-error-oldPassword-invalid"><i class="fa cm-info"></i> {{\'ACCOUNT.INFO.INVALID.OLD_PASSWORD\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><cm-password ng-model="account.password" cm-with-stars="false" cm-tabindex="5"></cm-password></section></li></ul></form><cm-footer cm-always-on-top><button class="cm-btn-grey" ng-click="saveAccount()" data-qa="btn-footer"><span ng-show="!showLoader && !isPristine" data-qa="btn-saveAccount"> {{\'ACCOUNT.FOOTER.SAVE\'|cmTranslate}}<i class="fa cm-checker"></i></span><span ng-show="isPristine" data-qa="btn-pristineBack"> {{\'ACCOUNT.FOOTER.BACK\'|cmTranslate}}<i class="fa cm-out"></i></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('comps/user/drtv-bulk-rekeying.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/drtv-bulk-rekeying.html',
'<div class="modal-row"><span ng-bind-html="\'DRTV.BULK_REKEYING.CONTENT\'|cmTranslate"></span></div><button ng-if = "!working" class="cm-btn-grey" ng-click = "startrekeying()" data-qa="btn-start-rekeying"> Start</button><button ng-if = "working" class="cm-btn-grey"><cm-loader cm-color="ci-color"></cm-loader></button>');
}]);
angular.module('comps/user/drtv-incoming-authentication-request.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/drtv-incoming-authentication-request.html',
'<div class="theme-a modal-row"><strong ng-if="is3rdParty" ng-bind-html="\'IDENTITY.KEYS.TRUST.ENTER_TRANSACTION_SECRET.NOTE\'|cmTranslate:modalMessageVars"></strong><strong ng-if="!is3rdParty" ng-bind-html="\'IDENTITY.KEYS.AUTHENTICATION.ENTER_TRANSACTION_SECRET.NOTE\'|cmTranslate:modalMessageVars"></strong><form ng-submit="verify(transactSecret)"><div class="cm-input-ctn with-inside-icon"><input id="inp-transactSecret" type="text" ng-model="transactSecret" cm-adaptive-change data-qa="inp-transactSecret"><i class="fa cm-write"></i></div><span ng-if="is3rdParty" ng-bind-html="\'IDENTITY.KEYS.TRUST.ENTER_TRANSACTION_SECRET.INSTRUCTIONS\'|cmTranslate:modalMessageVars"></span><span ng-if="!is3rdParty" ng-bind-html="\'IDENTITY.KEYS.AUTHENTICATION.ENTER_TRANSACTION_SECRET.INSTRUCTIONS\'|cmTranslate:modalMessageVars"></span><div class="cm-warning" ng-show="error.emptyInput"><i class="fa cm-info"></i>{{\'SYSTEM.ERROR.EMPTY_INPUT\'|cmTranslate}}</div><div class="cm-warning" ng-show="error.wrongSecret" data-qa="warn-wrong-input"><i class="fa cm-info"></i>{{\'SYSTEM.ERROR.WRONG_INPUT\'|cmTranslate}}</div></form></div><footer><button class = "cm-btn-grey dib w50" data-qa = "btn-cancel" cm-weight = "1" ng-click = "close()" > {{ (labelCancel || \'MODAL.LABEL.CANCEL\') | cmTranslate }}<i class="fa cm-checkbox-wrong cm-lg-icon"></i></button><button class = "cm-btn-grey dib w50" data-qa = "btn-acceptRequest" ng-click = "verify(transactSecret)" cm-weight = "1" ><span> {{ is3rdParty ? \'IDENTITY.KEYS.TRUST.ENTER_TRANSACTION_SECRET.SUBMIT_BUTTON\' : \'IDENTITY.KEYS.AUTHENTICATION.ENTER_TRANSACTION_SECRET.SUBMIT_BUTTON\' |cmTranslate }}<i class="fa cm-checker cm-lg-icon"></i></span></button></footer>');
}]);
angular.module('comps/user/drtv-login-modal.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/drtv-login-modal.html',
'<section class="theme-a"><div class="modal-outer-title"><cm-logo></cm-logo></div><h2 class="form-signin-heading ">{{\'LOGIN.HEADING\'|cmTranslate}}</h2><form class="form-signin mb15" role="form" ng-submit="doLogin()" autocomplete="off" data-qa="modal-login"><select ng-model="formData.autologin" class="cm-form-control btn-block autologin" ng-change="changeAutologin()" ng-if="cmEnv.autoLogin"><option value="none">{{\'LOGIN.LABEL.AUTO\'|cmTranslate}}</option><option ng-repeat="(user,prop) in loginData">{{user}}</option></select><div class="cm-input-ctn" ng-class="{\'cm-input-error\':alertState!=\'\'}"><input tabindex="1" type="text" ng-model="formData.user" ng-class="{\'cm-input-error\':alertState!=\'\'}" id="user" name="user" value="" required placeholder="{{\'LOGIN.PLACEHOLDER.USERNAME\'|cmTranslate}}" /></div><div class="cm-input-ctn with-inside-icon" ng-class="{\'cm-input-error\':alertState!=\'\'}"><input tabindex="2" type="{{passwordType}}" ng-model="formData.pass" ng-class="{\'cm-input-error\':alertState!=\'\'}" id="pw" name="pw" value="" required placeholder="{{\'LOGIN.PLACEHOLDER.PASSWORD\'|cmTranslate}}" /><i class="fa cm-icon-grey cm-lg-icon" ng-class="{\'cm-visible\':passwordType==\'password\',\'cm-hidden\':passwordType==\'text\'}" ng-click="handlePassword()"></i></div><cm-info-bubble class="cm-alert" ng-hide="alertState==\'\'" data-qa="login-info"><div><i class="fa cm-info"></i><span ng-bind-html="\'LOGIN.INFO.\'+alertState|cmParse"></span></div></cm-info-bubble><button class="btn-submit" type="submit"></button></form><button class="cm-btn-grey" ng-click="doLogin()" data-qa="login-submit-btn"><span ng-show="!showLoader"> {{\'LOGIN.LABEL.SUBMIT\'|cmTranslate}} <i class="fa cm-key cm-lg-icon"></i></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></section>');
}]);
angular.module('comps/user/drtv-login.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/drtv-login.html',
'<form class="form-signin" role="form" autocomplete="off" data-qa="login" ng-submit="doLogin()"><article class="content" ng-if="cmEnv.autoLogin"><select ng-model="formData.autologin" class="cm-form-control btn-block autologin" ng-change="changeAutologin()"><option value="none">{{\'LOGIN.LABEL.AUTO\'|cmTranslate}}</option><option ng-repeat="(user,prop) in loginData">{{user}}</option></select></article><hr class="margin-small" ng-if="cmEnv.autoLogin"><article class="content"><div class="cm-input-ctn" ng-class="{\'cm-input-error\':alertState!=\'\'}" cm-input-watcher><input tabindex="1" type="text" ng-model="formData.user" ng-class="{\'cm-input-error\':alertState!=\'\'}" id="user" name="user" value="" required placeholder="{{\'LOGIN.PLACEHOLDER.USERNAME\'|cmTranslate}}" /></div></article><article class="content"><div class="cm-input-ctn with-inside-icon" ng-class="{\'cm-input-error\':alertState!=\'\'}" cm-input-watcher><input tabindex="2" type="{{passwordType}}" ng-model="formData.pass" ng-class="{\'cm-input-error\':alertState!=\'\'}" id="pw" name="pw" value="" required placeholder="{{\'LOGIN.PLACEHOLDER.PASSWORD\'|cmTranslate}}" /><i class="fa cm-icon-grey" ng-class="{\'cm-visible\':passwordType==\'password\',\'cm-hidden\':passwordType==\'text\'}" ng-click="handlePassword()"></i></div></article><article class="content" ng-hide="alertState==\'\'" data-qa="login-info"><cm-info-bubble class="cm-alert"><div><i class="fa cm-info"></i><span ng-bind-html="\'LOGIN.INFO.\'+alertState|cmParse"></span></div></cm-info-bubble></article><hr class="margin-small"><button class="btn-submit" type="submit"></button><article class="item" data-qa="login-submit-btn" ng-click="doLogin()"><span class="body tac" ng-show="!showLoader"><span class="with-icon">{{\'LOGIN.LABEL.SUBMIT\'|cmTranslate}}<i class="fa cm-key"></i></span></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></article></form>');
}]);
angular.module('comps/user/identity/drtv-identity-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/drtv-identity-create.html',
'<form name="cmForm" novalidate autocomplete="off"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="cmForm" cm-tabindex="1" placeholder="SETTINGS.PAGES.IDENTITY.CREATE.PLACEHOLDER.CAMEOID" ></cm-cameo-id></article><hr class="margin-small" /><article class="content"><label>{{\'SETTINGS.PAGES.IDENTITY.CREATE.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon"><input tabindex="2" data-qa="input-displayname" type="text" name="displayName" ng-model="formData.displayName" ng-keyup="validateDisplayName()" /><i class="fa cm-write"></i></div><cm-info-bubble class="cm-alert" ng-show=" cmForm.displayName.$dirty && cmForm.displayName.$invalid && cmForm.displayName.length > 0 "><div ng-show="cmForm.displayName.$error.required"><i class="fa cm-info"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.INFO.EMPTY.DISPLAYNAME\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><article class="content"><label>{{\'SETTINGS.PAGES.IDENTITY.CREATE.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><cm-multi-input cm-collection="formData.phoneNumbers"><ng-form name="formPhone" autocomplete="off"><div class="cm-input-ctn with-chooser with-inside-icon"><input tabindex="3" data-qa="input-phonenumber" type="text" name="phoneNumber" ng-model="item.value" cm-validate-phone cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" ng-show=" formPhone.phoneNumber.$dirty && formPhone.phoneNumber.$invalid " data-qa="form-error-phoneNumber-invalid"><div ng-show="formPhone.phoneNumber.$invalid"><i class="fa cm-info"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.INFO.INVALID.PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input></article><hr class="margin-small" /><article class="content"><label>{{\'SETTINGS.PAGES.IDENTITY.CREATE.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><cm-multi-input cm-collection="formData.emails"><ng-form name="formEmail" autocomplete="off"><div class="cm-input-ctn with-chooser with-inside-icon"><input tabindex="4" data-qa="input-email" name="email" ng-model="item.value" cm-validate-email /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" ng-show="formEmail.email.$dirty && formEmail.email.$invalid"><div ng-show="formEmail.email.$invalid" data-qa="form-error-email-invalid"><i class="fa cm-info"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.INFO.INVALID.EMAIL\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input></article></form><cm-footer><button class="cm-btn-grey" ng-click="addIdentity()" data-qa="btn-identity-create"><span ng-show="!showLoader"> {{\'SETTINGS.PAGES.IDENTITY.CREATE.FOOTER\'|cmTranslate}} <i class="fa cm-checker"></i></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('comps/user/identity/drtv-identity-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/drtv-identity-edit.html',
'<article class="content edit-identity-head clearfix"><div class="cm-fl mr5"><cm-upload-avatar class="border-complete"></cm-upload-avatar><cm-avatar cm-data="identity" cm-view="{{chooseAvatar?\'unknown\':\'\'}}" ng-show="identity" class="big"></cm-avatar></div><div class="cm-fl w72"><ul class="no-border"><li ng-click="goTo(\'/settings/identity/key/list\')" data-qa="btn-identity-keys"><span class="item clearfix"><i class="fa cm-key fa-2x"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</span><section class="icon-list"><i class="fa cm-right position-exception"></i></section></li><li class="no-border cm-disabled" data-qa="btn-identity-trust"><span class="item clearfix"><i class="fa cm-checker fa-2x"></i> {{\'IDENTITY.LABEL.TRUST\'|cmTranslate}}</span><section class="icon-list"><i class="fa cm-right position-exception"></i></section></li></ul></div></article><hr class="margin-small" /><form name="cmForm" novalidate autocomplete="off"><article class="content"><label>{{\'CONTACT.PLACEHOLDER.CAMEOID\'|cmTranslate}}</label><div class="cm-input-ctn cm-input-readonly"><i class="fa cm-rhino-positive"></i><input tabindex="1" data-qa="input-cameoId" required disabled type="text" name="cameoId" ng-model="identity.cameoId" /></div></article><hr class="margin-small" /><article class="content"><label>{{\'CONTACT.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon"><input tabindex="2" data-qa="input-displayname" required type="text" name="displayName" ng-model="identity.displayName" ng-keyup="validateDisplayName();" /><i class="fa cm-write"></i></div><cm-info-bubble class="cm-alert" ng-show="cmForm.displayName.$dirty && cmForm.displayName.$invalid && cmForm.displayName.length > 0"><div ng-show="cmForm.displayName.$error.required"><i class="fa cm-info"></i> {{\'CONTACT.INFO.EMPTY.DISPLAYNAME\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><label class="content">{{\'CONTACT.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><cm-multi-input cm-collection="identity.phoneNumbers" class="content"><ng-form name="formPhone"><div class="cm-input-ctn with-chooser with-inside-icon"><input tabindex="3" data-qa="input-phonenumber" type="text" name="phoneNumber" ng-model="item.value" cm-validate-phone cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" data-qa="form-error-phoneNumber-invalid" ng-show="formPhone.phoneNumber.$dirty && formPhone.phoneNumber.$invalid"><div ng-show="formPhone.phoneNumber.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input><hr class="margin-small" /><label class="content">{{\'CONTACT.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><cm-multi-input cm-collection="identity.emails" class="content"><ng-form name="formEmail"><div class="cm-input-ctn with-chooser with-inside-icon"><input tabindex="4" data-qa="input-email" name="email" ng-model="item.value" cm-validate-email cm-adaptive-change /><i class="fa cm-write"></i></div><!--<div cm-type-chooser cm-choose-value-to="item"></div>--><cm-info-bubble class="cm-alert" ng-show="formEmail.email.$dirty && formEmail.email.$invalid"><div ng-show="formEmail.email.$invalid" data-qa="form-error-email-invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.EMAIL\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input><!--address class="cm-address"><div class="cm-input-ctn"><input type="text" class="street" name="street" ng-model="identity.address.street" placeholder="{{\'CONTACT.PLACEHOLDER.STREET\'|cmTranslate}}" required tabindex="5" data-qa="input-address-street" /><input type="text" class="streetnr" name="streetnr" ng-model="identity.address.streetnr" placeholder="{{\'CONTACT.PLACEHOLDER.STREETNR\'|cmTranslate}}" required tabindex="6" data-qa="input-address-streetnr" /></div><div class="cm-input-ctn"><input type="text" class="zip" name="zip" ng-model="identity.address.zip" placeholder="{{\'CONTACT.PLACEHOLDER.ZIP\'|cmTranslate}}" required tabindex="7" data-qa="input-address-zip" maxlength="5"/><input type="text" class="city" name="city" ng-model="identity.address.city" placeholder="{{\'CONTACT.PLACEHOLDER.CITY\'|cmTranslate}}" required tabindex="8" data-qa="input-address-city" /></div></address--></form><cm-footer cm-always-on-top><button class="cm-btn-grey" ng-click="saveIdentity()" data-qa="btn-saveIdentity"><span ng-show="!showLoader"> {{\'CONTACT.FOOTER.SAVE\'|cmTranslate}} <i class="fa cm-checker"></i></span><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('comps/user/identity/drtv-identity-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/drtv-identity-list.html',
'<ul><li ng-repeat="identity in identities | orderBy:\'isActive\':false" ng-click="bam(identity)" ng-class="{\'isActive\': identity.isActive}" data-qa="identity-list-item"><cm-identity-tag cm-data="identity"></cm-identity-tag></li></ul>');
}]);
angular.module('comps/user/identity/drtv-identity-tag.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/drtv-identity-tag.html',
'<cm-avatar cm-data="identity" cm-weight="1"></cm-avatar><section cm-weight="4" class="identityName"><div class="displayName">{{identity.getDisplayName()}}</div><div class="cameoId">{{identity.cameoId}}</div></section><section class="icon-list"><i class="fa cm-write" ng-if="identity.isActive"></i><i class="fa" ng-class="{\'cm-radio-1\':identity.isActive,\'cm-radio-0\':!identity.isActive}"></i></section>');
}]);
angular.module('comps/user/identity/drtv-identity.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/drtv-identity.html',
'<a data-qa="btn-identity-settings" ng-click="goToIdentity()"><cm-avatar cm-data="identity"></cm-avatar><span>{{identity.getDisplayName()}}</span></a>');
}]);
angular.module('comps/user/identity/key/drtv-identity-key-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/key/drtv-identity-key-create.html',
'<div class="section" ng-show="active == \'choose\'" data-qa="page-chose-keysize"><article class="mb15 content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'IDENTITY.KEYS.GENERATE.START.EXPLANATION\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom"><li class="no-border"><span class="item" ng-click="toggleKeySize()" data-qa="select-key-size" > {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')"><span class="item" data-qa="keysize-2048">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')"><span class="item" data-qa="keysize-4096">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generate()" class="cm-btn-grey" data-qa="btn-generate-key"> {{\'IDENTITY.KEYS.GENERATE.START.GENERATE_BUTTON\'|cmTranslate}}<i class="fa cm-checker"></i></button></cm-footer></div><div class="section" ng-show="active == \'generate\'" data-qa="page-generating-key"><h3 class="content" ng-bind-html="\'IDENTITY.KEYS.GENERATE.GENERATING.HEADLINE\' | cmParse"></h3><article class="key-generates content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.KEYS.GENERATE.GENERATING.EXPLANATION\' | cmParse"></span></cm-info-bubble></article><hr class="margin-small" /><article class="content" ng-if = "active == \'generate\'"><span ng-bind-html="\'IDENTITY.KEYS.GENERATE.GENERATING.TIME_PASSED\'|cmParse"></span><cm-timeout cm-data="getElapsedTime()"><section class="cm-special-text"> {{\'IDENTITY.KEYS.GENERATE.GENERATING.GENERATION_TIMER\'|cmTranslate:{ \'time\':cmTimeout} }}</section></cm-timeout></article><hr class="margin-small" /><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-footer><button ng-click="cancel()" class="cm-btn-grey" data-qa="btn-cancel-key-generation"> {{\'IDENTITY.KEYS.GENERATE.GENERATING.STOP_BUTTON\'|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer></div><div class="section" ng-show="active == \'store\'" data-qa="page-save-key"><h3 class="content" ng-bind-html="\'IDENTITY.KEYS.GENERATE.SAVE.HEADLINE\' | cmParse"></h3><article class="key-generates content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.KEYS.GENERATE.SAVE.EXPLANATION\' | cmParse"></span><br /><strong><span ng-bind-html="\'IDENTITY.KEYS.GENERATE.SAVE.NOTE\' | cmParse"></span></strong></cm-info-bubble></article><hr class="margin-small" /><article class="content" ng-if="active == \'store\'"><span ng-bind-html="\'IDENTITY.KEYS.GENERATE.SAVE.TIME_PASSED\'|cmParse"></span><cm-timeout cm-data="getElapsedTime()"><section class="cm-special-text">{{\'IDENTITY.KEYS.GENERATE.SAVE.GENERATION_TIMER\'|cmTranslate:{ \'time\':cmTimeout} }}</section></cm-timeout></article><hr class="margin-small" /><form><article class="content"><label>{{\'IDENTITY.KEYS.GENERATE.SAVE.KEY_NAME\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon"><input tabindex="1" type="text" ng-model="keyName" data-qa=\'input-key-name\' /><i class="fa cm-write"></i></div></article></form><cm-footer><button ng-click="store()" class="cm-btn-grey" data-qa="btn-save-key"><span ng-show="!showLoader"> {{\'IDENTITY.KEYS.GENERATE.SAVE.SAVE_BUTTON\'|cmTranslate}}<i class="fa cm-checker"></i></span><cm-loader ng-show="showLoader"></cm-loader></button></cm-footer></div>');
}]);
angular.module('comps/user/identity/key/drtv-identity-key-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/key/drtv-identity-key-edit.html',
'<article class="content mb15"><h3 data-qa="header-key-name">{{keyName}}</h3><cm-info-bubble ng-if="privKey" nose-x="30%"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.EXPORT_KEY_DESCRIPTION\'|cmTranslate}}</cm-info-bubble></article><article class="content"><h4 ng-if="privKey" class="is-local">{{\'SETTINGS.PAGES.IDENTITY.KEYS.IS_LOCAL_ON_THIS_DEVICE\'|cmTranslate}}</h4><h4><strong>{{\'SETTINGS.PAGES.IDENTITY.KEYS.TRUSTING\'|cmTranslate}}:</strong><span ng-if="isTrusted" class="is-trusted"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IS_TRUSTED\'|cmTranslate}}</span><span ng-if="!isTrusted" class="is-untrusted"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IS_UNTRUSTED\'|cmTranslate}}</span></h4><h4><strong>{{\'SETTINGS.PAGES.IDENTITY.KEYS.KEY_SIZE\'|cmTranslate}}:</strong> {{keySize}}</h4></article><article class="content"><h4><strong>{{\'SETTINGS.PAGES.IDENTITY.KEYS.FINGERPRINT\'|cmTranslate}}:</strong></h4><cm-info-bubble nose-x="15%"><textarea class="form-control" readonly="readonly" data-qa="fingerprint-public-key" style="resize:none">{{fingerprint}}</textarea></cm-info-bubble></article><article class="content"><div ng-if="privKey"><h3>{{\'SETTINGS.PAGES.IDENTITY.KEYS.PRIVATE_KEY\'|cmTranslate}}</h3><cm-info-bubble nose-x="15%"><textarea class="form-control" ng-model="privKey" readonly="readonly" data-qa="input-private-key" cm-clipboard></textarea></cm-info-bubble></div><div ng-if="privKey"><h3>{{\'SETTINGS.PAGES.IDENTITY.KEYS.PUBLIC_KEY\'|cmTranslate}}</h3><cm-info-bubble nose-x="15%"><textarea class="form-control" ng-model="pubKey" readonly="readonly" data-qa="input-public-key" cm-clipboard></textarea></cm-info-bubble></div></article><cm-footer cm-always-on-top ng-if="isTrusted && privKey && canAuthenticate"><button ng-click="startAuthentication()" class="cm-btn-grey" data-qa="btn-start-authentication"> {{\'SETTINGS.PAGES.IDENTITY.HANDSHAKE.HANDSHAKE_START\'|cmTranslate}}<i class="fa cm-checker"></i></button></cm-footer>');
}]);
angular.module('comps/user/identity/key/drtv-identity-key-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/key/drtv-identity-key-import.html',
'<article class="content cm-form-style"><h3>{{\'SETTINGS.PAGES.IDENTITY.KEYS.PRIVATE_KEY\'|cmTranslate}}</h3><textarea ng-model="privKey" ng-readonly="isValid" data-qa="display-private-key"></textarea><h3 ng-if="keySize" class="mt15">{{\'SETTINGS.PAGES.IDENTITY.KEYS.KEY_SIZE\'|cmTranslate}}: {{keySize}}</h3><div ng-show="isValid"><h3>{{\'SETTINGS.PAGES.IDENTITY.KEYS.PUBLIC_KEY\'|cmTranslate}}</h3><textarea ng-model="pubKey" readonly="readonly" data-qa="display-public-key"></textarea><h3>{{\'SETTINGS.PAGES.IDENTITY.KEYS.KEY_NAME\'|cmTranslate}}</h3><div class="cm-input-ctn with-inside-icon"><input ng-model="keyName" type="text" data-qa="input-key-name" /><i class="fa cm-write"></i></div></div></article><cm-footer><button ng-click="import()" class="cm-btn-grey" data-qa="btn-import-key" ng-if="!isValid"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.BUTTON\'|cmTranslate}}<i class="fa cm-checker"></i></button><button ng-click="store()" class="cm-btn-grey" data-qa="btn-save-key" ng-if="isValid"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.STORE_KEYPAIR\'|cmTranslate}}<i class="fa cm-checker"></i></button></cm-footer>');
}]);
angular.module('comps/user/identity/key/drtv-identity-key-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/user/identity/key/drtv-identity-key-list.html',
'<article ng-if="showNoLocalKeysOnThisDevice" data-qa="message-no-keys" class="content mb15"><cm-info-bubble nose-x="50%"><div class="page in-screen-message" data-qa="message-no-keys" ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\'|cmTranslate"></div></cm-info-bubble></article><article ng-if="showUntrustedPublickeysExists" class="content mb15"><cm-info-bubble nose-x="50%"><div class="page in-screen-message" data-qa="message-untrusted-keys" ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.UNTRUSTED_PUBLICKEYS_EXISTS\'|cmTranslate"></div></cm-info-bubble></article><hr ng-if="(showNoLocalKeysOnThisDevice || showUntrustedPublickeysExists) && (publicKeys.length > 0)" class="margin-small" /><ul class="no-border" ng-if="(publicKeys.length > 0)"><li ng-repeat="key in publicKeys | orderBy:sortByPrivKeys" data-qa="key-list-item"><div ng-click="goTo(\'settings/identity/key/edit/\'+key.id)" class="item tal clearfix"><strong>{{key.name}}</strong><span class="second-row"> {{privateKeys.find(key).getSize() || key.getSize() || key.size}}<span class="seperator">|</span><strong ng-if="privateKeys.find(key)" data-qa="key-is-local" class="is-local">{{\'SETTINGS.PAGES.IDENTITY.KEYS.IS_LOCAL\'|cmTranslate}}<span class="seperator">|</span></strong><span ng-if="checking[key.id]" class = "is-checking"> ???<span class="seperator">|</span></span><span ng-if="!checking[key.id] && isTrustedKey(key)" class="is-trusted">{{\'SETTINGS.PAGES.IDENTITY.KEYS.IS_TRUSTED\'|cmTranslate}}<span class="seperator">|</span></span><span ng-if="!checking[key.id] && !isTrustedKey(key)" class="is-untrusted">{{\'SETTINGS.PAGES.IDENTITY.KEYS.IS_UNTRUSTED\'|cmTranslate}}<span class="seperator">|</span></span> {{key.created | date:\'dd.MM.yy - HH:mm\'}}</span></div><div class="short-links"><i class="fa cm-handshake" ng-if="!isTrustedKey(key) && isHandshakePossible" ng-click="goTo(\'/authentication/\'+key.id, id)" data-qa="btn-start-handshake"></i><i class="fa cm-export-key" ng-if="privateKeys.find(key)" ng-click="goTo(\'settings/identity/key/edit/\'+key.id)"></i><!--<i class="fa cm-export-key cm-lg-icon" ng-if="privateKeys.find(key)" ng-click="openModal(\'modalExportKeyPair\',key)"></i> --><i class="fa cm-cancel-key" ng-click="remove(key)" data-qa="btn-remove-modal"></i></div></li><li ng-show="signing"><cm-loader></cm-loader></li></ul><cm-footer ng-if="canCreate" data-qa="canCreate"><button class="cm-btn-grey dib w50" data-qa="btn-create-key" ng-click="goto(\'settings/identity/key/create\')"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.BUTTON\'|cmTranslate}}<i class="fa cm-create-key"></i></button><button class="cm-btn-grey dib w50" data-qa="btn-import-key" ng-click="goto(\'settings/identity/key/import\')"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.BUTTON\'|cmTranslate}}<i class="fa cm-import-key n"></i></button></cm-footer>');
}]);
angular.module('cmUser',[
    'cmCore',
    'cmFiles'
,'comps/user/drtv-account-edit.html','comps/user/drtv-bulk-rekeying.html','comps/user/drtv-incoming-authentication-request.html','comps/user/drtv-login-modal.html','comps/user/drtv-login.html','comps/user/identity/drtv-identity-create.html','comps/user/identity/drtv-identity-edit.html','comps/user/identity/drtv-identity-list.html','comps/user/identity/drtv-identity-tag.html','comps/user/identity/drtv-identity.html','comps/user/identity/key/drtv-identity-key-create.html','comps/user/identity/key/drtv-identity-key-edit.html','comps/user/identity/key/drtv-identity-key-import.html','comps/user/identity/key/drtv-identity-key-list.html'])

.directive('cmAccountEdit', [
    'cmUserModel', 'cmNotify', 'cmCrypt', 'cmLoader',
    '$q', '$rootScope',
    function(cmUserModel, cmNotify, cmCrypt, cmLoader,
             $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-account-edit.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                $scope.showPasswordChange = false;
                $scope.showReadOnly = false;
                $scope.isPristine = true;

                $scope.togglePasswordChange = function(action){
                    $scope.showPasswordChange = action && action == 'close' || $scope.showPasswordChange ? false : true;
                    if(!$scope.showPasswordChange){
                        $scope.account.oldPassword = '';
                        $rootScope.$broadcast('cm-password:reset');
                    }
                };

                $scope.toggleReadOnly = function(){
                    $scope.showReadOnly = true;
                };

                $rootScope.$on('pristine:false', function(){
                    $scope.isPristine = false;
                });

                function reset(){
                    $scope.account = angular.extend({},cmUserModel.data.account);
                    $scope.account.phoneNumbers = [
                        $scope.account.phoneNumber || {value:''}
                    ];
                    $scope.account.emails = [
                        $scope.account.email || {value:''}
                    ];
                    $scope.account.oldPassword = '';
                    $scope.account.password = '';
                }

                cmUserModel.on('account:updated', reset);

                reset();

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkEmail() {
                        if ($scope.account.emails.length > 0
                            && $scope.account.emails[0].value != undefined
                            //&& $scope.account.emails[0].value != ''
                            && $scope.account.emails[0].value != cmUserModel.data.account.email) {
                            objectChange.email = $scope.account.emails[0].value;
                        }
                    }

                    function checkPhoneNumber() {
                        if ($scope.account.phoneNumbers.length > 0
                            && $scope.account.phoneNumbers[0].value != undefined
                            //&& $scope.account.phoneNumbers[0].value != ''
                            && $scope.account.phoneNumbers[0].value != cmUserModel.data.account.phoneNumber) {
                            objectChange.phoneNumber = $scope.account.phoneNumbers[0].value;
                        }
                    }

                    function checkPassword(){
                        if(!$scope.showPasswordChange)
                            return false;

                        // check password
                        if ($scope.account.oldPassword != ''
                            && $scope.account.oldPassword!= 'none'
                            && $scope.account.oldPassword != undefined) {
                            objectChange.oldPassword = cmCrypt.hash($scope.account.oldPassword);
                            $scope.cmForm.oldPassword.$setValidity('empty', true);
                            $scope.cmForm.oldPassword.$setValidity('invalid', true);
                        }

                        if ($scope.account.password == ''
                            || $scope.account.password == 'none'
                            || $scope.account.password == undefined) {
                            $rootScope.$broadcast('cm-password:empty');
                        } else {
                            objectChange.password = $scope.account.password;
                        }
                    }

                    checkEmail();
                    checkPhoneNumber();
                    checkPassword();

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveAccount = function(){
                    if($scope.isPristine)
                        $scope.goBack();

                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(objectChange){

                            cmUserModel.updateAccount(objectChange)
                            .then(
                                function(){
                                    loader.stop();
                                    $scope.isPristine = true;
                                    $scope.togglePasswordChange('close');
                                },
                                function(result){

                                    switch(result.data.error){
                                        case 'old password required':
                                            $scope.cmForm.oldPassword.$setValidity('empty', false);
                                        break;
                                        case 'invalid old password':
                                            $scope.cmForm.oldPassword.$setValidity('invalid', false);
                                        break;
                                    }

                                    loader.stop();
                                }
                            );

                        }, function(){
                            loader.stop();
                        }
                    )
                };
            }
        }
    }
])
.directive('cmAutocomplete', [
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

            }
        }
    }
])
.directive('cmBulkRekeyingRequest',[
    'cmUserModel',
    'cmLogger',
    '$rootScope',
    function (cmUserModel, cmLogger, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-bulk-rekeying.html',
            controller: function($scope){
                $scope.working = false;


                $scope.startrekeying = function(){
                    $scope.working = true;
                    cmUserModel.bulkReKeying($scope.data.key1, $scope.data.key2);
                }

                //startrekeying();

            }
        }
    }
])
.directive('cmIncomingAuthenticationRequest',[

    'cmUserModel',
    'cmIdentityFactory',
    '$timeout',
    '$document',
    
    function (cmUserModel, cmIdentityFactory, $timeout, $document){
        return {
            restrict:       'E',
            scope:          false,
            templateUrl:    'comps/user/drtv-incoming-authentication-request.html',

            controller: function($scope){

                
                function setErrorsToDefault(){
                    $scope.error = {
                        "emptyInput": false,
                        "wrongSecret": false
                    };
                }

                function refresh(){
                    $scope.is3rdParty    =   $scope.request.fromIdentityId != cmUserModel.data.identity.id,
                    $scope.fromIdentity  =   cmIdentityFactory.find($scope.request.fromIdentityId),
                    $scope.fromKey       =   $scope.fromIdentity.keys.find($scope.request.fromKeyId)

                    $scope.modalMessageVars = {
                        cameoKey: $scope.fromKey.name,
                        identity: $scope.fromIdentity.getDisplayName()
                    };

                    setErrorsToDefault();

                    $scope.transactSecret = '';

                    $timeout(function(){
                        var input = $document[0].querySelector('#inp-transactSecret');
                        input.focus();
                    }, 50);
                }


                $scope.$watch('request', refresh)

            }
        }
    }
])
.directive('cmLoginModal', [
    'cmNotify',
    'cmUserModel',
    'cmKeyStorageService',
    'cmCrypt',
    'cmConfig',
    'cmLoader',
    '$location',
    function (cmNotify, cmUserModel, cmKeyStorageService, cmCrypt, cmConfig, cmLoader,
              $location) {
        return  {
            restrict    :   'AE',
            templateUrl :   'comps/user/drtv-login-modal.html',
            scope       :   {},
            controller  :   function ($scope, $rootScope) {
                $scope.cmEnv = cmConfig.env;
                var loader = new cmLoader($scope);
                $scope.alertState = '';
                $scope.passwordType = 'password';
                $scope.loginData = cmConfig.autologin;

                $scope.formData = {
                    autologin:'none'
                };

                function checkPasswordLength(pw){
                    if(typeof pw != 'string' || (pw.length > 0 && pw.length < 6)){
                        return false;
                    }

                    return true;
                }

                $scope.handlePassword = function(){
                    $scope.passwordType = ($scope.passwordType != 'password')
                        ? 'password'
                        : 'text';
                };

                $scope.checkPasswordLength = function(){
                    if($scope.formData.pass.length > 0 && $scope.formData.pass.length < 6){
                        return true;
                    }

                    return false;
                };

                $scope.changeAutologin = function(){
                    if($scope.formData.autologin != 'none'){
                        $scope.formData.user = $scope.loginData[$scope.formData.autologin].user;
                        $scope.formData.pass = $scope.loginData[$scope.formData.autologin].pass;
                    } else {
                        $scope.formData.user = "";
                        $scope.formData.pass = "";
                    }
                };

                $scope.doLogin = function(){
                    if(loader.isIdle())
                        return false;

                    $scope.alertState = '';
                    loader.start();

                    if(!checkPasswordLength($scope.formData.pass)){
                        loader.stop();
                        $scope.alertState = 'PW';
                        return false;
                    }

                    cmUserModel.doLogin(
                        $scope.formData.user,
                        cmCrypt.hash($scope.formData.pass)
                    )
                        .then(
                        function(){
                            var storageService = new cmKeyStorageService('appSettings'),
                                skipKeyInfo = storageService.get('skipKeyInfo') || false;

                            if(!$location.$$path.match(/\/purl\/.*/)){
                                if(cmUserModel.loadLocalKeys().length == 0 && skipKeyInfo == false){
                                    $rootScope.goto("/start/keyinfo");
                                } else {
                                    $rootScope.goto("/talks");
                                }
                            }
                            $rootScope.$broadcast('cmLogin:success');
                        },
                        function(error){
                            loader.stop();
                            //$rootScope.$broadcast('cmLogin:error'); // not use in app - BS 21.08.2014

                            if(typeof error == 'object' && 'status' in error){
                                if(error.status){
                                    $scope.alertState = error.status;
                                } else {
                                    $scope.alertState = 'X';
                                }
                            } else {
                                $scope.alertState = 'X';
                            }
                        }
                    );

                    return true;
                };
            }
        }
    }
])
.directive('cmLogin', [
    'cmNotify',
    'cmUserModel',
    'cmKeyStorageService',
    'cmCrypt',
    'cmConfig',
    'cmLoader',
    '$location',
    function (cmNotify, cmUserModel, cmKeyStorageService, cmCrypt, cmConfig, cmLoader,
              $location) {
        return  {
            restrict    :   'AE',
            templateUrl :   'comps/user/drtv-login.html',
            scope       :   {},
            controller  :   function ($scope, $rootScope) {
                $scope.cmEnv = cmConfig.env;
                var loader = new cmLoader($scope);
                $scope.alertState = '';
                $scope.passwordType = 'password';
                $scope.loginData = cmConfig.autologin;

                $scope.formData = {
                    autologin:'none'
                };

                function checkPasswordLength(pw){
                    if(typeof pw != 'string' || (pw.length > 0 && pw.length < 6)){
                        return false;
                    }

                    return true;
                }

                $scope.handlePassword = function(){
                    $scope.passwordType = ($scope.passwordType != 'password')
                        ? 'password'
                        : 'text';
                };

                $scope.checkPasswordLength = function(){
                    if($scope.formData.pass.length > 0 && $scope.formData.pass.length < 6){
                        return true;
                    }

                    return false;
                };

                $scope.changeAutologin = function(){
                    if($scope.formData.autologin != 'none'){
                        $scope.formData.user = $scope.loginData[$scope.formData.autologin].user;
                        $scope.formData.pass = $scope.loginData[$scope.formData.autologin].pass;
                    } else {
                        $scope.formData.user = "";
                        $scope.formData.pass = "";
                    }
                };

                $scope.doLogin = function(){
                    if(loader.isIdle())
                        return false;

                    $scope.alertState = '';
                    loader.start();

                    if(!checkPasswordLength($scope.formData.pass)){
                        loader.stop();
                        $scope.alertState = 'PW';
                        return false;
                    }

                    cmUserModel.doLogin(
                        $scope.formData.user,
                        cmCrypt.hash($scope.formData.pass)
                    )
                    .then(
                        function(){
                            var storageService = new cmKeyStorageService('appSettings'),
                                skipKeyInfo = storageService.get('skipKeyInfo') || false;

                            if(!$location.$$path.match(/\/purl\/.*/)){
                                if(cmUserModel.loadLocalKeys().length == 0 && skipKeyInfo == false){
                                    $rootScope.goto("/start/keyinfo");
                                } else {
                                    $rootScope.goto("/talks");
                                }
                            }
                            $rootScope.$broadcast('cmLogin:success');
                        },
                        function(error){
                            loader.stop();
                            //$rootScope.$broadcast('cmLogin:error'); // not use in app - BS 21.08.2014

                            if(typeof error == 'object' && 'status' in error){
                                if(error.status){
                                    $scope.alertState = error.status;
                                } else {
                                    $scope.alertState = 'X';
                                }
                            } else {
                                $scope.alertState = 'X';
                            }
                        }
                    );

                    return true;
                };
            }
        }
    }
])
.directive('cmUserRights', [
    'cmUserModel',
    function (cmUserModel) {
        return {
            restrict : 'AE',
            link: function(scope, element, attrs){
                function removeElement(){
                    // remove for guest
                    if(cmUserModel.isGuest() !== false && attrs['cmUserRights'] == ''){
                        element.remove();
                    // remove for logged user
                    } else if(attrs['cmUserRights'] == 'showForGuest' && cmUserModel.isGuest() === false) {
                        element.remove();
                    }
                }

                cmUserModel.on('update:finished',function(){
                    removeElement();
                });

                removeElement();
            }
        }
    }
])
.directive('cmIdentityCreate', [
    'cmAuth', 'cmNotify', 'cmUserModel', 'cmLoader',
    '$location', '$q', '$rootScope',
    function(cmAuth, cmNotify, cmUserModel, cmLoader,
             $location, $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/drtv-identity-create.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                //////////////////////
                // TODO: mock workarround json in array
                $scope.formData.phoneNumbers = [
                    {value:''}
                ];
                $scope.formData.emails = [
                    {value:''}
                ];
                //////////////////////

                $scope.validateDisplayName = function(){
                    if($scope.formData.displayName == undefined
                    || $scope.formData.displayName.length == 0
                    ){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        data = {};

                    function checkCameoId() {
                        if ($scope.formData.cameoId && $scope.formData.cameoId != '') {
                            data.cameoId = $scope.formData.cameoId;
                            data.reservationSecret = $scope.reservationSecrets[data.cameoId];
                        }
                    }

                    function checkDisplayName() {
                        if ($scope.formData.displayName && $scope.formData.displayName != '') {
                            data.displayName = $scope.formData.displayName;
                        }
                    }

                    function checkEmail() {
                        if ($scope.formData.emails.length > 0
                            && $scope.formData.emails[0].value != undefined
                            && $scope.formData.emails[0].value != ''
                            ) {
                            data.email = $scope.formData.emails[0].value;
                        }
                    }

                    function checkPhoneNumber() {
                        if ($scope.formData.phoneNumbers.length > 0
                            && $scope.formData.phoneNumbers[0].value != undefined
                            && $scope.formData.phoneNumbers[0].value != ''
                            ) {
                            data.phoneNumber = $scope.formData.phoneNumbers[0].value;
                        }
                    }

                    // check loginName aka cameoId
                    if ($scope.cmForm.cameoId.$valid == false) {
                        if($scope.cmForm.cameoId.$viewValue == undefined
                        || $scope.cmForm.cameoId.$viewValue.toString() == ''
                        ){
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    }

                    checkCameoId();
                    checkDisplayName();
                    checkEmail();
                    checkPhoneNumber();

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.addIdentity = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(data){
                            cmAuth.addIdentity(data).then(
                                function(res){
                                    loader.stop();
                                    cmUserModel.switchToIdentity(res.identity, res.token.token);
                                },
                                function(){
                                    loader.stop();
                                    cmNotify.warn('SETTINGS.PAGES.IDENTITY.CREATE.WARN.FAILED');
                                }
                            );
                        },
                        function(){
                            loader.stop();
                        }
                    )
                };
            }
        }
    }
])
.directive('cmIdentityEdit', [
    'cmUserModel', 'cmNotify', 'cmLoader',
    '$q',
    function(cmUserModel, cmNotify, cmLoader,
             $q){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/drtv-identity-edit.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                function reset(){
                    $scope.identity = angular.extend({},cmUserModel.data.identity);
                    $scope.identity.phoneNumbers = [
                        $scope.identity.phoneNumber || {value:''}
                    ];
                    $scope.identity.emails = [
                        $scope.identity.email || {value:''}
                    ];
                }

                if(('identity' in cmUserModel.data)
                && !('on' in cmUserModel.data.identity)){
                    cmUserModel.on('update:finished', function(){
                        reset();
                        cmUserModel.data.identity.on('update:finished', reset);
                    });
                } else {
                    cmUserModel.data.identity.on('update:finished', reset);
                }

                reset();

                $scope.goToKeys = function(){
                    $scope.goTo('/settings/identity/key/list');
                };

                $scope.validateDisplayName = function(){
                    if($scope.identity.displayName == undefined || $scope.identity.displayName.length == 0){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkDisplayName() {
                        if ($scope.identity.displayName != cmUserModel.data.identity.displayName) {
                            objectChange.displayName = $scope.identity.displayName;
                        }
                    }

                    function checkEmail() {
                        if ($scope.identity.emails.length > 0 && $scope.identity.emails[0].value != undefined && $scope.identity.emails[0].value != '' && $scope.identity.emails[0].value != cmUserModel.data.identity.email) {
                            objectChange.email = $scope.identity.emails[0].value;
                        }
                    }

                    function checkPhoneNumber() {
                        if ($scope.identity.phoneNumbers.length > 0 && $scope.identity.phoneNumbers[0].value != undefined && $scope.identity.phoneNumbers[0].value != '' && $scope.identity.phoneNumbers[0].value != cmUserModel.data.identity.phoneNumber) {
                            objectChange.phoneNumber = $scope.identity.phoneNumbers[0].value;
                        }
                    }

                    checkDisplayName();
                    checkEmail();
                    checkPhoneNumber();

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveIdentity = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm()
                    .then(
                        function(objectChange){
                            cmUserModel.data.identity.update(objectChange);
                            cmUserModel.data.identity.one('update:finished',function(){
                                loader.stop();
                                cmNotify.info('IDENTITY.NOTIFY.UPDATE.SUCCESS',{ttl:3000,displayType:'modal'});
                            });
                        },
                        function(){
                            loader.stop();
                        }
                    )
                };
            }
        }
    }
])
.directive('cmIdentityList', [
    'cmUserModel',
    '$rootScope',
    function(cmUserModel, $rootScope){
        return {
            restrict: 'E',
            scope: {
                identities: "=cmIdentities"
            },
            templateUrl: 'comps/user/identity/drtv-identity-list.html',
            controller: function ($scope) {
                $scope.switchToIdentity = function(identity){
                    cmUserModel.switchToIdentity(identity);
                };

                $scope.bam = function(identity){
                    if(identity.isActive == true){
                        $rootScope.goTo('/settings/identity/edit');
                    } else {
                        $scope.switchToIdentity(identity);
                    }
                };
            }
        }
    }
])
.directive('cmIdentityTag', [
    // no dependencies
    function(){
        return {
            restrict: 'E',
            scope: {
                identity: "=cmData"
            },
            templateUrl: 'comps/user/identity/drtv-identity-tag.html',
            controller: function ($scope) {

            }
        }
    }
])
.directive('cmIdentity',[
    'cmUserModel', 'cmModal',
    '$rootScope', '$timeout',
    function (cmUserModel, cmModal,
              $rootScope, $timeout){
        return {
            restrict: 'AE',
            templateUrl: 'comps/user/identity/drtv-identity.html',
            scope: true,

            controller: function($scope){
                $scope.randModalId = Math.floor((Math.random()*6)+1);

                function setIdentity(){
                    $scope.identity = cmUserModel.data.identity;
                }

                setIdentity();

                cmUserModel.on('update:finished',function(){
                    setIdentity();
                });

                $scope.goToIdentity = function(){
                    $rootScope.goto('/settings/identity/list');
                };
            }
        }
    }
])
.directive('cmIdentityKeyCreate', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    'cmKey',
    'cmJob',
    'cmApi',
    'cmDevice',
    'cmLoader',
    '$window',
    '$rootScope',
    '$timeout',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger,
             cmNotify, cmKey, cmJob, cmApi, cmDevice, cmLoader,
             $window, $rootScope, $timeout){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-create.html',

            controller: function ($scope) {

                var loader = new cmLoader($scope);

                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list', true);
                    return false;
                }

                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                var detect      = cmDevice.detectOSAndBrowser(),
                    startTime   = undefined,
                    elapsedTime = 0,
                    generationTimeout = null,
                    generationTimeoutMinutes = 10;

                $scope.active = 'choose'; // choose, active, store
                //$scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = 2048;
                $scope.keyName = '';

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.getElapsedTime = function(){
                    elapsedTime =   startTime 
                                    ?   Math.max(new Date().getTime() - startTime, 0)
                                    :   elapsedTime;
                    return elapsedTime;
                };

                function reset(){
                    $timeout.cancel(generationTimeout);
                    cmApi.listenToEvents();
                    cmJob.stop();
                }

                /**
                 * generate keypair
                 */
                $scope.generate = function(withoutTimerReset){
                    // generation timeout for very long generation
                    // especially for iphone 4/4s ios7 uiwebview
                    
                    $timeout.cancel(generationTimeout);
                    generationTimeout = $timeout(function(){
                        $scope.cancelGeneration();
                        $scope.generate(true);
                    },generationTimeoutMinutes * 60 * 1000);



                    $scope.active = 'generate';
                    cmJob.start('DRTV.CONFIRM.STANDARD', $scope.cancelGeneration);

                    var size = 2048;
                    if($scope.keySize == 4096){
                        size = 4096;
                    }

                    /**
                     * call cmCrypt to generate KeyPair
                     * with keySize and callback for onGeneration
                     * returns a promise
                     */
                    cmApi.stopListeningToEvents();

                    if(!withoutTimerReset) {
                        startTime = new Date().getTime();
                        elapsedTime = 0;
                    }

                    cmCrypt.generateAsyncKeypair(parseInt(size))
                    .then(
                        function(result){
                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();
                            $scope.keyName  = detect.os+' / '+detect.browser;

                            $scope.active = 'store';
                        },
                        function(reason){
                            $scope.active = 'choose';
                        }
                    ).finally(
                        function(){
                            reset();
                            startTime = undefined
                        }
                    );
                };

                $scope.$on('$destroy',function(){
                    reset();
                });


                $scope.cancel = function(){

                    cmCrypt.cancelGeneration()
                    .then(function(){
                        reset();
                        startTime = undefined


                        if(typeof $rootScope.generateAutomatic != 'undefined'){
                            /**
                             * @TODO siwtch auch, wenn noch keine Talks vorhanden sind
                             */
                            $scope.goTo('/talks');
                        } else {
                            $scope.goBack();
                        }
                        
                    })
                };

                /**
                 * store key pair
                 */
                $scope.store = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    var error = false;

                    if($scope.privKey == '' || !$scope.privKey){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PRIVKEY');
                    }

                    if($scope.pubKey == '' || !$scope.pubKey){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PUBKEY');
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_KEYNAME');
                    }

                    if(error !== true){
                        var key = new cmKey({
                            name: $scope.keyName,
                            privKey: $scope.privKey
                        });

                        cmUserModel
                            .storeKey(key)
                            .syncLocalKeys();

                        cmUserModel
                            .when('key:saved', null, 5000)
                            .then(
                                function(result){
                                    if(cmUserModel.data.identity.keys.some(function(key){
                                        return key.id != result.data.keyId
                                    })){
                                        $scope.goto('/authentication')
                                    } else {
                                        $scope.goTo('/talks');
                                    }
                                }
                            );

                        cmJob.stop();
                        loader.stop();
                    } else {
                        loader.stop();
                    }
                };

                var generateAutomatic = false;
                if(typeof $rootScope.generateAutomatic != 'undefined'){
                    if('generate' in $rootScope.generateAutomatic && $rootScope.generateAutomatic.generate == true){
                        generateAutomatic = true;

                        if('keySize' in $rootScope.generateAutomatic && parseInt($rootScope.generateAutomatic.keySize) == 4096){
                            $scope.keySize = 4096;
                        } else {
                            $scope.keySize = 2048;
                        }

                        $scope.generate();
                    }

                    $rootScope.generateAutomatic = {}
                }
            }
        }
    }
])
.directive('cmIdentityKeyEdit', [
    'cmNotify', 'cmKey', 'cmUtil', 'cmUserModel',
    '$rootScope', '$routeParams',
    function(cmNotify, cmKey, cmUtil, cmUserModel,
             $rootScope, $routeParams){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-edit.html',
            controller: function ($scope) {
                var localKeys   = cmUserModel.loadLocalKeys(),
                    key         = localKeys.find($routeParams.keyId) || cmUserModel.data.identity.keys.find($routeParams.keyId) || {};

                $scope.privKey      = key && key.getPrivateKey();
                $scope.pubKey       = key && key.getPublicKey();
                $scope.keyName      = key && key.name;
                $scope.keySize      = key && key.getSize();
                $scope.fingerprint  = key && key.getFingerprint();

                $scope.isTrusted    = undefined

                cmUserModel.verifyOwnPublicKey(key)
                .then(function(){
                    $scope.isTrusted = true
                })

            }
        }
    }
])

.directive('cmIdentityKeyImport', [
    'cmNotify',
    'cmKey',
    'cmUtil',
    'cmUserModel',
    'cmModal',
    'cmDevice',
    '$window',
    function(cmNotify, cmKey, cmUtil, cmUserModel, cmModal, cmDevice,
             $window){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-import.html',
            controller: function ($scope) {
                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list', true);
                    return false;
                }

                $scope.isValid = false;

                var detect = cmDevice.detectOSAndBrowser();

                $scope.import = function(){
                    var key = (new cmKey()).importData({
                        name: $scope.keyName,
                        privKey: $scope.privKey
                    });

                    if(!key.getPrivateKey() || !key.getPublicKey() || !key.getSize()){
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.IMPORT_FAILED')
                    } else {
                        $scope.isValid = true;
                        $scope.pubKey = key.getPublicKey();
                        $scope.keyName = detect.os+' / '+detect.browser;
                        $scope.keySize = key.getSize();
                    }
                };

                $scope.store = function(){
                    var error = false;

                    if($scope.privKey == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PRIVKEY');
                    }

                    if($scope.pubKey == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PUBKEY');
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_KEYNAME');
                    }

                    if(error !== true){
                        var key = new   cmKey({
                                            name: $scope.keyName,
                                            privKey: $scope.privKey
                                        });

                        cmUserModel
                            .storeKey(key)
                            .syncLocalKeys();

                        cmUserModel
                            .when('key:saved', null, 5000)
                            .then(
                                function(result){
                                    if(cmUserModel.data.identity.keys.some(function(key){
                                        return key.id != result.data.keyId
                                    })){
                                        $scope.goto('/authentication')
                                    } else {
                                        $scope.goTo('/talks');
                                    }
                                }
                            )
                    }
                };
            }
        }
    }
])
.directive('cmIdentityKeyList', [
    'cmUserModel',
    'cmModal',
    'cmKey',
    function(cmUserModel, cmModal, cmKey){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-list.html',
            controller: function ($scope) {
                $scope.privateKeys = [];
                $scope.publicKeys = [];
                $scope.trustedKeys = [];
                $scope.signing = false;
                $scope.isHandshakePossible = false;
                $scope.showNoLocalKeysOnThisDevice = true;
                $scope.showUntrustedPublickeysExists = true;
                $scope.canCreate = true;

                function refresh(){
                    $scope.canCreate    =   !cmUserModel.hasPrivateKey();
                    $scope.privateKeys  =   cmUserModel.loadLocalKeys() || [];
                    $scope.publicKeys   =   cmUserModel.data.identity.keys || [];
                    $scope.trustedKeys  =   []

                    $scope.checking     =   {}

                    $scope.publicKeys.forEach(function(key){
                        $scope.checking[key.id] = true
                        cmUserModel
                        .verifyOwnPublicKey(key)
                        .then(function(){
                            $scope.trustedKeys.push(key)
                        })
                        .finally(function(){
                            $scope.checking[key.id] = false
                        })
                    });

                    $scope.signing      =   cmUserModel.state.is('signing');

                    $scope.isHandshakePossible = ($scope.privateKeys.length > 0);

                    // no key exists
                    $scope.showNoLocalKeysOnThisDevice =
                        $scope.trustedKeys.length == 0;

                    // publickeys doesnt match trustedkeys
                    $scope.showUntrustedPublickeysExists =
                        $scope.trustedKeys.length != $scope.publicKeys.length &&
                        $scope.trustedKeys.length >= 1 &&
                        $scope.publicKeys.length >= 1;
                }

                $scope.remove = function(key){
                    $scope.confirm({
                        title: 'SETTINGS.PAGES.IDENTITY.KEYS.REMOVE_KEY',
                        text:  'SETTINGS.PAGES.IDENTITY.KEYS.REMOVE_KEY_REALLY',
                        html:  '<h3>'+key.name+'</h3>{{'+key.created+' | date:"dd.MM.yy - HH:mm"}}'
                    })
                    .then(function(){
                        cmUserModel.removeKey(key);                        
                    })
                    refresh();
                };

                $scope.isTrustedKey = function(key){
                    return $scope.trustedKeys.indexOf(key) != -1
                };

                $scope.sortByPrivKeys = function(key) {
                    return !($scope.privateKeys.find(key) instanceof cmKey);
                };

                $scope.startAuthentication = function(toKey){
                    cmUserModel.trigger('handshake:start', {key: toKey});
                };

                //Todo: check if refresh has to be called that often
                cmUserModel.state.on('change', refresh);
                cmUserModel.on('key:stored key:removed signatures:saved identity:updated update:finished', refresh);


                refresh()
            }
        }
    }
])
'use strict';

angular.module('comps/validate/drtv-cameo-id.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/validate/drtv-cameo-id.html',
'<label>{{placeholder|cmTranslate}} *</label><div data-qa="form-input" class="cm-input-ctn with-inside-icon" ng-class="{\'cm-input-error\':hasError()}" cm-input-watcher><input tabindex="{{tabindex}}" data-qa="input-cameoId" type="text" id="cameoId" name="cameoId" ng-class="{\'cm-input-error\':hasError()}" ng-model="cameoId" cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-write\': !hasReservationSecret(), \'cm-checkbox-right\':hasReservationSecret() }" data-qa="icon-cameoId-reserved"></i></div><cm-info-bubble class="cm-alert" ng-show="errors.toolong" data-qa="cameoId-info-user-max-letter-count"><i class="fa cm-info"></i>{{\'DRTV.VALIDATE_CAMEOID.INFO.MAX_LETTER_COUNT\'|cmTranslate:{count: max} }}</cm-info-bubble><cm-info-bubble class="cm-alert" ng-show="errors.tooshort" data-qa="cameoId-info-user-min-letter-count"><i class="fa cm-info"></i>{{\'DRTV.VALIDATE_CAMEOID.INFO.MIN_LETTER_COUNT\'|cmTranslate:{count: min} }}</cm-info-bubble><cm-info-bubble class="cm-alert" ng-show="errors.exists" data-qa="cameoId-info-username-exists"><i class="fa cm-info"></i>{{\'DRTV.VALIDATE_CAMEOID.INFO.INPUT.EXISTS\'|cmTranslate}}</cm-info-bubble><cm-info-bubble class="cm-alert" ng-show="errors.empty" data-qa="cameoId-info-username-empty"><i class="fa cm-info"></i>{{\'DRTV.VALIDATE_CAMEOID.INFO.INPUT.EMPTY\'|cmTranslate}}</cm-info-bubble><cm-info-bubble class="cm-alert" ng-show="errors.invalid" data-qa="cameoId-info-username-invalid"><i class="fa cm-info"></i>{{\'DRTV.VALIDATE_CAMEOID.INFO.INPUT.INVALID\'|cmTranslate}}</cm-info-bubble>');
}]);
angular.module('comps/validate/drtv-password.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/validate/drtv-password.html',
'<article class="content"><label>{{\'DRTV.PASSWORD.PASSWORD\'|cmTranslate}} <span ng-show="withStars">*</span></label><div class="cm-input-ctn with-inside-icon" ng-class="{\'cm-input-error\':showPasswordEmptyError}" data-qa="form-input" cm-input-watcher><input tabindex="{{tabindex}}" data-qa="input-password" type="{{passwordType}}" id="password" ng-class="{\'cm-input-error\':showPasswordEmptyError}" name="password" ng-model="pw" ng-keyup="checkPWStrength();confirmPW()" /><i class="fa cm-write"></i></div><div class="pw-progress" ng-model="progress"><div class="progress-bar pw-strength-{{bgColor}}" ng-style="{width:percent}"><span class="sr-only">{{percent}} {{strengthMessage}}</span></div></div><cm-info-bubble class="cm-alert" ng-show="showPasswordLengthError || showPasswordEmptyError" ><div ng-show="showPasswordLengthError" data-qa="register-info-pass-min-letter-count"><i class="fa cm-info"></i>{{\'DRTV.PASSWORD.INFO.MIN_LETTER_COUNT\' | cmTranslate : {count: 6} }}</div><div ng-show="showPasswordEmptyError" data-qa="drtv-password-error-empty"><i class="fa cm-info"></i>{{\'DRTV.PASSWORD.INFO.EMPTY\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small no-padding"><article class="content"><label>{{\'DRTV.PASSWORD.PASSWORD_CONFIRM\'|cmTranslate}} <span ng-show="withStars">*</span></label><div class="cm-input-ctn with-inside-icon" ng-class="{\'cm-input-error\':showPasswordEmptyError}" data-qa="form-input" cm-input-watcher><input tabindex="{{nextTabIndex}}" data-qa="input-passwordConfirm" type="password" id="password_confirm" ng-class="{\'cm-input-error\':showPasswordEmptyError}" ng-model="pwConfirm" ng-keyup="confirmPW()" /><i class="fa" ng-class="{\'cm-write\':!pw,\'cm-checkbox-wrong\':!showConfirmPWStatus,\'cm-checkbox-right\':showConfirmPWStatus}" data-qa="icon-passwordConfirm"></i></div></article>');
}]);
angular.module('cmValidate', [
    'cmCore'
,'comps/validate/drtv-cameo-id.html','comps/validate/drtv-password.html'])
.directive('cmCameoId',[
    'cmAuth',
    '$q', '$rootScope',
    function (cmAuth,
              $q, $rootScope){
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'comps/validate/drtv-cameo-id.html',
            scope: {
                cameoId: '=ngModel',
                formName: '@formName',
                tabindex: '@cmTabindex',
                placeholder: '@placeholder'
            },
            controller: function($scope){

                $scope.min = 6;
                $scope.max = 20;

                $scope.parentForm = $scope.$parent[$scope.formName];

                $scope.$parent.reservationSecrets = $scope.$parent.reservationSecrets || {};

                $scope.userNameAlternatives = [];
                $scope.showUserNameAlternatives = false;
                $scope.pendingAccountCheck = $q.when(true);

                function checkLength(value){
                    if(value.length < $scope.min || value.length > $scope.max){

                        if(value.length < $scope.min){
                            $scope.errors.tooshort = true;
                        }

                        if(value.length > $scope.max){
                            $scope.errors.toolong = true;
                        }

                        return false
                    }

                    return true;
                }

                function checkValue(value){
                    if(value == undefined || value == '' || !checkLength(value)){
                        $scope.parentForm.cameoId.$valid = false;
                        return false;
                    }

                    return true;
                }

                function setDefault(){
                    $scope.errors = {
                        toolong: false,
                        tooshort: false,
                        exists: false,
                        empty: false,
                        invalid: false
                    };
                }

                setDefault();

                function checkAccountName(newValue){
                    var deferred = $q.defer();

                    if(!checkValue(newValue)){
                        if($scope.parentForm.cameoId.$invalid && $scope.parentForm.cameoId.$dirty)
                            $scope.errors.empty = true;

                        deferred.reject();
                        return deferred.promise;
                    }

                    // if input is'nt empty && is valid && reservation secret is'nt exists
                    if(!(newValue in $scope.$parent.reservationSecrets)) {
                        // check cameoId
                        $scope.pendingAccountCheck = cmAuth.checkAccountName(newValue).then(
                            // valid case
                            function (data) {
                                // reservation secret to parent scope
                                $scope.$parent.reservationSecrets[newValue] = data.reservationSecret;

                                $scope.parentForm.cameoId.$valid = true;
                                deferred.resolve();
                            },
                            // invalid or exists
                            function (response) {
                                if (typeof response == "object") {
                                    // invalid case
                                    if (typeof response.data !== 'undefined'
                                        && typeof response.data.error !== 'undefined'
                                        && response.data.error.search('invalid') != -1
                                    ) {
                                        $scope.errors.invalid = true;
                                    }
                                    // show alternatives
                                    if (typeof response.alternative !== 'undefined') {
                                        $scope.errors.exists = true;
                                        /**
                                         * @TODO
                                         * show alternatives
                                         */
                                        $scope.userNameAlternatives = response.alternative;
                                        $scope.showUserNameAlternatives = true;
                                    }
                                }

                                $scope.parentForm.cameoId.$valid = false;
                                deferred.reject();
                            }
                        );
                    } else {
                        $scope.parentForm.cameoId.$valid = true;
                        deferred.resolve();
                    }

                    return deferred.promise;
                }

                $rootScope.$on('cm-login-name:invalid', function(){
                    $scope.parentForm.cameoId.$invalid = true;
                    $scope.parentForm.cameoId.$dirty = true;

                    if(!checkValue($scope.parentForm.cameoId.$viewValue))
                        $scope.errors.empty = true;

                });

                $scope.hasReservationSecret = function(){
                    return $scope.cameoId in $scope.$parent.reservationSecrets;
                };

                $scope.hasError = function(){
                    if($scope.errors.exists
                    || $scope.errors.empty
                    || $scope.errors.invalid
                    || $scope.errors.tooshort
                    || $scope.errors.toolong
                    || ($scope.parentForm.cameoId.$invalid && $scope.parentForm.cameoId.$dirty)
                    ){
                        return true;
                    }
                    return false;
                };

                $scope.$watch('cameoId',function (newValue) {
                    setDefault();

                    checkAccountName(newValue);
                });

                $rootScope.$on('registration:checkAccountName', function(){
                    setDefault();

                    $scope.$parent.reservationSecrets = {};

                    checkAccountName($scope.cameoId).then(
                        function(){
                            $rootScope.$emit('registration:createUser');
                        }, function(){
                            //console.log('check account again fail')
                        }

                    );
                });
            }
        }
    }
])
.directive('cmValidateEmail',[
    function (){
        //http://stackoverflow.com/questions/16863389/angular-js-email-validation-with-unicode-characters
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){
                scope.$watch('model',function (newValue) {
                    var check = true;

                    if(newValue && newValue != ''){
                        // http://stackoverflow.com/a/46181/11236
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        check = re.test(newValue);
                    }

                    if(check !== true){
                        ngModel.$setValidity('email', false);
                    } else {
                        ngModel.$setValidity('email', true);
                    }
                });
            }
        }
    }
])
.directive('cmValidateMixed',[
    'cmAuth',
    function (cmAuth){
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){
                var correctValue;

                scope.$watch('model',function (newValue) {
                    if(newValue && newValue != "" && correctValue == undefined || // value isnt empty and first-check
                        newValue && newValue != "" && correctValue != undefined && newValue != correctValue // value isnt the correct value from BE
                    ){
                        cmAuth.checkMixed(newValue).
                            then(
                            //success
                            function (mixed){
                                correctValue = mixed[Object.keys(mixed)[0]];
                                ngModel.$setValidity('mixed', true);
                                ngModel.$setViewValue(correctValue)
                                ngModel.$render();
                            },
                            //error
                            function (){
                                ngModel.$setValidity('mixed', false);
                            }
                        );
                    } else {
                        ngModel.$setValidity('mixed', true);
                        ngModel.$setPristine();
                    }
                });
            }
        }
    }
])
.directive('cmPassword', [
    'cmCrypt',
    function (cmCrypt) {
        return  {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'comps/validate/drtv-password.html',
            scope: {
                password: '=ngModel',
                tabindex: '@cmTabindex',
                withStars: '@cmWithStars'
            },
            controller: function($scope){

                $scope.withStars = $scope.withStars || true;

                $scope.nextTabIndex = parseInt($scope.tabindex) + 1;

                $scope.showConfirmPWStatus = false;
                $scope.passwordType = 'password';
                $scope.showPassword = false;
                $scope.showPasswordLengthError = false;
                $scope.showPasswordEmptyError = false;

                $scope.$on('cm-password:empty', function(){
                    $scope.showPasswordEmptyError = true;
                });

                $scope.$on('cm-password:reset', function(){
                    $scope.pw = '';
                    $scope.pwConfirm = '';
                    $scope.checkPWStrength();
                });

                $scope.checkPasswordLength = function(pw){
                    if(pw.length > 0 && pw.length < 6){
                        $scope.showPasswordLengthError = true;
                    } else {
                        $scope.showPasswordLengthError = false;
                    }
                };

                $scope.togglePassword = function(){
                    if($scope.showPassword){
                        $scope.showPassword = false;
                        $scope.passwordType = 'password';
                    } else {
                        $scope.showPassword = true;
                        $scope.passwordType = 'text';
                    }
                };

                $scope.checkPWStrength = function(){
                    var pw = $scope.pw;

                    $scope.showPasswordEmptyError = false;

                    if(pw != undefined && pw != ''){
                        $scope.checkPasswordLength(pw);

                        $scope.showStrengthMeter= true;
                        var bits = passchk_fast.passEntropy(pw);

                        if(bits < 28){
                            $scope.bgColor = 'very-weak';
                        } else if(bits < 36){
                            $scope.bgColor = 'week';
                        } else if(bits < 60){
                            $scope.bgColor = 'reasonable-normal';
                        } else if(bits < 128){
                            $scope.bgColor = 'strong';
                        } else {
                            $scope.bgColor = 'very-strong';
                        }

                        $scope.percent = (1+(bits>10 ? 100*Math.pow((Math.log(bits-10)/Math.log(bits-3)), 10) : 0))+'%';
                        //100*Math.max(0,(1-Math.pow(1.4,((bits-10)*-0.08))))
                        //100*bits / Math.max(128, bits)
                    } else {
                        $scope.percent = '0%';
                        $scope.bgColor = 'very-weak';
                    }
                };

                /**
                 * validates both password inputs
                 */
                $scope.confirmPW = function(){
                    if(!$scope.pw || !$scope.pwConfirm)
                        return false;

                    if($scope.pw == $scope.pwConfirm){
                        $scope.showConfirmPWStatus = true;
                        $scope.showPasswordEmptyError = false;
                        setPassword(cmCrypt.hash($scope.pw));
                    } else {
                        $scope.showConfirmPWStatus = false;
                        setPassword('none');
                    }
                };

                /**
                 * Wrapper Function to inject Password in extern Controller
                 * if password (empty || none) it is wrong, else it is right
                 */
                function setPassword(pw){
                    if(angular.isDefined(pw)){
                        $scope.password = pw;
                    }
                }
            }
        }
    }
])
.directive('cmValidatePhone',[
    'cmAuth',
    function (cmAuth){
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){
                var correctValue;
                scope.$watch('model',function (newValue) {
                    if(newValue && newValue != "" && correctValue == undefined || // value isnt empty and first-check
                        newValue && newValue != "" && correctValue != undefined && newValue != correctValue // value isnt the correct value from BE
                    ){
                        cmAuth.checkPhoneNumber(newValue).
                            then(
                            //success
                            function (phoneNumber){
                                correctValue = phoneNumber;
                                ngModel.$setValidity('phone', true);
                                ngModel.$setViewValue(phoneNumber);
                                ngModel.$render();
                            },
                            //error
                            function (){
                                ngModel.$setValidity('phone', false);
                            }
                        );
                    } else {
                        ngModel.$setValidity('phone', true);
                        ngModel.$setPristine();
                    }
                });
            }
        }
    }
])
'use strict';

angular.module('routes/authentication/authentication.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/authentication/authentication.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-authentication key-id = "keyId" identity-id = "identityId"></cm-widget-authentication></section>');
}]);
angular.module('routes/confirm/confirm.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/confirm/confirm.html',
'<button cm-confirm="{{secret}}" ng-click="confirm()">confirm</button>');
}]);
angular.module('routes/contact/create/contact-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/contact/create/contact-create.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/contact/list"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-modal-add-contact id="add-contact" nose-position="2rem"></cm-modal-add-contact><cm-widget-contact-create></cm-widget-contact-create></section>');
}]);
angular.module('routes/contact/edit/contact-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/contact/edit/contact-edit.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/contact/list"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-modal-add-contact id="add-contact" nose-position="6rem"></cm-modal-add-contact><cm-widget-contact-edit cm-data = "contact" ng-if = "contact"></cm-widget-contact-edit></section>');
}]);
angular.module('routes/contact/import/contact-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/contact/import/contact-import.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/contact/list"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-modal-add-contact id="add-contact" nose-position="2rem"></cm-modal-add-contact><cm-widget-contact-import></cm-widget-contact-import></section>');
}]);
angular.module('routes/contact/list/contact-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/contact/list/contact-list.html',
'<section class="theme-a fill-bg"><!-- header --><cm-header cm-rubber-space><cm-identity cm-weight="4"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" data-qa="new-conversation-btn" cm-icon="new-talk"></cm-add-button><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-header-list-search cm-weight="1" ng-model="search"></cm-header-list-search><cm-menu cm-weight="1"></cm-menu></cm-header><cm-default-pages></cm-default-pages><cm-modal-add-contact id="add-contact" nose-position="6rem"></cm-modal-add-contact><cm-widget-contact-list></cm-widget-contact-list></section><!--<div ng-controller="ContactsCtrl"><section ng-switch="route"><cm-overview-contacts class="theme-a" ng-switch-default></cm-overview-contacts><cm-request-list ng-switch-when="requests"></cm-request-list><cm-search ng-switch-when="search"></cm-search></section></div>-->');
}]);
angular.module('routes/contact/request/list/contact-request-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/contact/request/list/contact-request-list.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/contact/list"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-modal-add-contact id="add-contact" nose-position="2rem"></cm-modal-add-contact><cm-widget-contact-request-list></cm-widget-contact-request-list></section><!--<div ng-controller="ContactsCtrl"><section ng-switch="route"><cm-overview-contacts class="theme-a" ng-switch-default></cm-overview-contacts><cm-request-list ng-switch-when="requests"></cm-request-list><cm-search ng-switch-when="search"></cm-search></section></div>-->');
}]);
angular.module('routes/contact/search/contact-search.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/contact/search/contact-search.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/contact/list"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-modal-add-contact id="add-contact" nose-position="2rem"></cm-modal-add-contact><cm-widget-contact-search></cm-widget-contact-search></section>');
}]);
angular.module('routes/conversation/conversation.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/conversation/conversation.html',
'<section class="theme-a"><cm-header cm-rubber-space><div cm-weight="1"><cm-back back-to="/talks" ng-if="conversationId == \'new\'"></cm-back><cm-back back-to="/talks" plain-back="true" ng-if="conversationId != \'new\'"></cm-back></div><cm-identity cm-weight="4"></cm-identity><cm-security-indicator cm-weight = "2" cm-data = "conversation" ng-click = "gotoConversation(conversation.id,\'security\')" ></cm-security-indicator><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-conversation cmData="conversation"></cm-widget-conversation></section>');
}]);
angular.module('routes/conversation/recipients/conversation-recipients.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/conversation/recipients/conversation-recipients.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="conversation/{{conversation.id}}"></cm-back><cm-identity cm-weight="3"></cm-identity><cm-security-indicator cm-weight = "2" cm-data = "conversation" ng-click = "gotoConversation(conversation.id,\'security\')" ></cm-security-indicator><cm-header-list-search cm-weight="1" ng-model="search" cm-options="{scrollTo:true}"></cm-header-list-search><cm-menu cm-weight="1"></cm-menu></cm-header><!--<cm-header cm-rubber-space ng-show="isPurl"><cm-back cm-weight="1" back-to="purl/{{purlId}}"></cm-back><div cm-weight="1"></div><cm-logo cm-weight="4"></cm-logo><cm-security-indicator cm-weight = "2" cm-data = "conversation.securityAspects" cm-leading-icon = "cm-lock" ng-click = "goto(\'purl/\'+purlId+\'/security-settings\')" ></cm-security-indicator></cm-header>--><cm-widget-conversation-recipients cm-data="conversation"></cm-widget-conversation-recipients></section><!--<div ng-controller="ConversationCtrl"><section ng-switch="pageChild1"><cm-conversation cm-data="conversation" ng-switch-default></cm-conversation><cm-recipients cm-data="conversation" ng-switch-when= "recipients"></cm-recipients><cm-security-settings cm-data="conversation" ng-switch-when= "security-settings"></cm-security-settings></section></div>-->');
}]);
angular.module('routes/conversation/security/conversation-security.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/conversation/security/conversation-security.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="conversation/{{conversationId}}"></cm-back><cm-identity cm-weight="4"></cm-identity><cm-security-indicator cm-weight = "2" cm-data = "conversation" ></cm-security-indicator><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-conversation-security cm-data="conversation"></cm-widget-conversation-security></section>');
}]);
angular.module('routes/disclaimer/disclaimer.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/disclaimer/disclaimer.html',
'<div class="page-header"><h2>Disclaimer</h2></div><div class="well well-lg"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</p><p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.</p><p>Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum.</p><p>Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit.</p><p>Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque.</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna</p></div>');
}]);
angular.module('routes/error/error.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/error/error.html',
'<section class="theme-a fill-bg"><cm-header></cm-header><h2 class="border-bottom">{{\'ERROR.HEADER\'|cmTranslate}}</h2><article class="content"><cm-info-bubble class="cm-alert"><pre> {{data_str|strnl2nl}}</pre></cm-info-bubble></article><cm-footer><button class="cm-btn-grey dib w50" ng-click="goto(\'/logout\')"> {{\'ERROR.LOGOUT\'|cmTranslate}}</button><button class="cm-btn-grey dib w50" ng-click="goto(\'/talks\')"> {{\'ERROR.BACK_TO_TALKS\'|cmTranslate}}</button></cm-footer></section>');
}]);
angular.module('routes/filter/filter.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/filter/filter.html',
'<div cm-notify></div><div class="page-header"><h2>filter</h2></div><form class="form-horizontal" role="form" ng-submit="getMessages()" autocomplete="off"><div class="form-group"><label for="filter" class="col-sm-1 control-label">Filter</label><div class="col-sm-5"><textarea class="form-control" id="filter" ng-model="filter"></textarea></div></div><div class="form-group "><div class="col-sm-5 col-sm-offset-1"><select class="form-control" ng-change="setFilter()" ng-options="filter.name for filter in filters" ng-model="filterSelect"></select></div></div><div class="form-group"><div class="col-sm-offset-1 col-sm-5"><button type="submit" class="btn btn-primary btn-sm">get Messages</button><button type="button" class="btn btn-default btn-sm" ng-click="getMessages()">next Messages</button><button type="button" class="btn btn-default btn-sm" ng-click="getMessageCount()">get Message Count</button></div></div><div> Time[ms]: {{totalTime}} <br> <br> Total number of Messages: {{messageCount}} <br> Offset: {{offset}} <br> Messages:<br> <br><ul><li class="message-list" ng-repeat="message in messages"> {{message.messageBody}}<br><b>{{message.created}}</b></li></ul></div></form>');
}]);
angular.module('routes/landingpages/404.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/landingpages/404.html',
'<div><div class="page-header"><h1><i class="fa fa-thumbs-down"></i> 404</h1></div></div>');
}]);
angular.module('routes/landingpages/server_down.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/landingpages/server_down.html',
'Der Sever ist down, alles ist doof.');
}]);
angular.module('routes/login/login.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/login/login.html',
'<section class="theme-b fill-bg"><cm-widget-login></cm-widget-login></section>');
}]);
angular.module('routes/mediawall/mediawall.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/mediawall/mediawall.html',
'<span class="label">Nums: {{ assets.length }} / {{numberOfAssets}}</span><ul><li ng-repeat="asset in assets"> {{ asset.uploaded }} {{ asset.assetId }} {{ asset.type }}</li></ul>');
}]);
angular.module('routes/notifications/notifications.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/notifications/notifications.html',
'<cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/talks"></cm-back><div cm-weight="6"></div><cm-menu cm-weight="1"></cm-menu></cm-header><section class="notification"><header class="inScreen"><i class="fa cm-fix"></i> {{\'NOTIFICATIONS.HEADER\' | cmTranslate}}<button ng-click="ring();">ring!</button><button ng-click="warn();">warn!</button><button ng-click="info();">info!</button><button ng-click="success();">success!</button><button ng-click="error();">error!</button></header><ul><li ng-repeat="notify in notifications"><span class="item clearfix"><span class="title"><span>{{notify.label | cmTranslate}}</span></span></span></li></ul></section>');
}]);
angular.module('routes/profile/profile.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/profile/profile.html',
'<form autocomplete="off"><div><input type="text" placeholder="{{\'PROFILE.E-MAIL\' | cmTranslate}}" value={{mail}}> <span cm-verify="email"></span></div><div><input type="text" placeholder="{{\'PROFILE.MOBILE\' | cmTranslate}}" value={{phoneNumber}}> <span cm-verify="phone-number"></span></div></form>');
}]);
angular.module('routes/purl/purl.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/purl/purl.html',
'<section class="theme-a" ng-show="!showSignIn"><cm-header cm-rubber-space ng-if="!headerGuest"><cm-back cm-weight="1" back-to="/talks" plain-back="true"></cm-back><cm-identity cm-weight="4"></cm-identity><cm-security-indicator cm-weight="2" ng-if = "conversation" cm-data = "conversation" cm-leading-icon = "cm-lock" ng-click = "gotoPurl(purlId, \'security\')" ></cm-security-indicator><cm-menu cm-weight="1"></cm-menu></cm-header><!-- Todo: solve headers differently--><cm-header cm-rubber-space ng-if="headerGuest"><div class="fast-sign-in" ng-click="gotoRegistration()" data-qa="btn-fast-sign-in" cm-weight="2"><i class="fa cm-register"></i><span>{{\'PURL.SIGN_IN\'|cmTranslate}}</span></div><cm-logo cm-weight="4"></cm-logo><cm-security-indicator cm-weight="2" ng-if = "conversation" cm-data = "conversation" cm-leading-icon = "cm-lock" ng-click = "gotoPurl(purlId, \'security\')" ></cm-security-indicator></cm-header><cm-widget-conversation cm-data="conversation"></cm-widget-conversation></section><!--<div><section ng-switch="pageChild1" ng-if="showConversation"><cm-conversation cm-data="conversation" ng-switch-default></cm-conversation><cm-recipients cm-data="conversation" ng-switch-when="recipients"></cm-recipients><cm-security-settings cm-data="conversation" ng-switch-when="security-settings"></cm-security-settings></section></div>-->');
}]);
angular.module('routes/purl/recipients/purl-recipients.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/purl/recipients/purl-recipients.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="purl/{{purlId}}"></cm-back><div cm-weight="1"></div><cm-logo cm-weight="4"></cm-logo><cm-security-indicator cm-weight = "2" cm-data = "conversation" cm-leading-icon = "cm-lock" ng-click = "gotoPurl(purlId,\'security\')" ></cm-security-indicator></cm-header><cm-widget-conversation-recipients cm-data="conversation"></cm-widget-conversation></section>');
}]);
angular.module('routes/purl/security/purl-security.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/purl/security/purl-security.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="purl/{{purlId}}"></cm-back><div cm-weight="1"></div><cm-logo cm-weight="4"></cm-logo><cm-security-indicator ng-if = "conversation" cm-weight = "2" cm-data = "conversation" cm-leading-icon = "cm-lock" ></cm-security-indicator></cm-header><cm-widget-conversation-security cm-data="conversation"></cm-widget-conversation-security></section>');
}]);
angular.module('routes/registration/registration.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/registration/registration.html',
'<section class="theme-b fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/login"></cm-back><cm-logo cm-weight="6"></cm-logo><div cm-weight="1"></div></cm-header><cm-widget-registration></cm-widget-registration></section>');
}]);
angular.module('routes/settings/about/settings-about.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/about/settings-about.html',
'<div class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" cm-icon="new-talk"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-settings-about-us></cm-widget-settings-about-us></div>');
}]);
angular.module('routes/settings/account/settings-account.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/account/settings-account.html',
'<div class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" cm-icon="new-talk"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-settings-account></cm-widget-settings-account></div>');
}]);
angular.module('routes/settings/app/settings-app.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/app/settings-app.html',
'<div class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" cm-icon="new-talk"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-settings-app></cm-widget-settings-app></div>');
}]);
angular.module('routes/settings/identity/create/settings-identity-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/create/settings-identity-create.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings/identity/key/list"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-create></cm-widget-identity-create></section>');
}]);
angular.module('routes/settings/identity/edit/settings-identity-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/edit/settings-identity-edit.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-edit></cm-widget-identity-edit></section>');
}]);
angular.module('routes/settings/identity/key/create/settings-identity-key-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/key/create/settings-identity-key-create.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space ng-if="backBtn"><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-header cm-rubber-space ng-if="!backBtn"><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-key-create></cm-widget-identity-key-create></section>');
}]);
angular.module('routes/settings/identity/key/edit/settings-identity-key-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/key/edit/settings-identity-key-edit.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-key-edit></cm-widget-identity-key-edit></section>');
}]);
angular.module('routes/settings/identity/key/import/settings-identity-key-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/key/import/settings-identity-key-import.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-key-import></cm-widget-identity-key-import></section>');
}]);
angular.module('routes/settings/identity/key/list/settings-identity-key-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/key/list/settings-identity-key-list.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-key-list></cm-widget-identity-key-list></section>');
}]);
angular.module('routes/settings/identity/list/settings-identity-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/identity/list/settings-identity-list.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewIdentity()" data-qa="create-identity-btn" cm-icon="avatar-add"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-identity-list></cm-widget-identity-list></section>');
}]);
angular.module('routes/settings/notify/settings-notify.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/notify/settings-notify.html',
'<div class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/settings"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" cm-icon="new-talk"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-settings-notify></cm-widget-settings-notify></div>');
}]);
angular.module('routes/settings/settings.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/settings/settings.html',
'<div class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/talks"></cm-back><cm-identity cm-weight="5"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" cm-icon="new-talk"></cm-add-button><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-settings-list></cm-widget-settings-list></div>');
}]);
angular.module('routes/start/keyinfo/start-keyinfo.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/start/keyinfo/start-keyinfo.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-identity cm-weight="7"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><div class="cm-header-block"></div><cm-widget-keyinfo></cm-widget-keyinfo></section>');
}]);
angular.module('routes/start/quickstart/start-quickstart.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/start/quickstart/start-quickstart.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space ng-if="startRoute"><cm-identity cm-weight="7"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><div class="cm-header-block" ng-if="startRoute"></div><cm-header cm-rubber-space ng-if="!startRoute"><cm-back cm-weight="1" back-to="/talks"></cm-back><cm-identity cm-weight="6"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><cm-widget-quickstart cm-start-route="startRoute"></cm-widget-quickstart></section>');
}]);
angular.module('routes/start/start.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/start/start.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-identity cm-weight="7"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><div class="cm-header-block"></div><cm-widget-welcome></cm-widget-welcome></section>');
}]);
angular.module('routes/start/welcome/start-welcome.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/start/welcome/start-welcome.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-identity cm-weight="7"></cm-identity><cm-menu cm-weight="1"></cm-menu></cm-header><div class="cm-header-block"></div><cm-widget-welcome></cm-widget-welcome></section>');
}]);
angular.module('routes/systemcheck/systemcheck.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/systemcheck/systemcheck.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/login"></cm-back><cm-logo cm-weight="6"></cm-logo><div cm-weight="1"></div></cm-header><cm-widget-systemcheck></cm-widget-systemcheck></section>');
}]);
angular.module('routes/talks/talks.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/talks/talks.html',
'<section class="theme-a fill-bg"><cm-header cm-rubber-space><cm-identity cm-weight="4"></cm-identity><cm-add-button cm-weight="1" ng-click="createNewConversation()" data-qa="new-conversation-btn" cm-icon="new-talk"></cm-add-button><cm-add-button cm-weight="1" ng-click="openModal(\'add-contact\')" data-qa="add-contact-btn" cm-icon="new-contact"></cm-add-button><cm-header-list-search cm-weight="1" ng-model="search"></cm-header-list-search><cm-menu cm-weight="1"></cm-menu></cm-header><cm-default-pages></cm-default-pages><cm-modal-add-contact id="add-contact" nose-position="6rem"></cm-modal-add-contact><cm-widget-talks></cm-widget-talks></section>');
}]);
angular.module('routes/terms/terms.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/terms/terms.html',
'<section class="theme-b fill-bg"><cm-header cm-rubber-space><cm-back cm-weight="1" back-to="/registration"></cm-back><cm-logo cm-weight="6"></cm-logo><div cm-weight="1"></div></cm-header><cm-widget-terms></cm-widget-terms></section>');
}]);
angular.module('routes/verification/verification.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/verification/verification.html',
'It worked, lading page; verification; <a href="#"> zurück </a>');
}]);
angular.module('routes/version/version.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('routes/version/version.html',
'<div class="well">Version: {{ cmVersion.version }}<br />Last Build: {{ cmVersion.last_build }}</div>');
}]);
angular.module('cmRoutes',['routes/authentication/authentication.html','routes/confirm/confirm.html','routes/contact/create/contact-create.html','routes/contact/edit/contact-edit.html','routes/contact/import/contact-import.html','routes/contact/list/contact-list.html','routes/contact/request/list/contact-request-list.html','routes/contact/search/contact-search.html','routes/conversation/conversation.html','routes/conversation/recipients/conversation-recipients.html','routes/conversation/security/conversation-security.html','routes/disclaimer/disclaimer.html','routes/error/error.html','routes/filter/filter.html','routes/landingpages/404.html','routes/landingpages/server_down.html','routes/login/login.html','routes/mediawall/mediawall.html','routes/notifications/notifications.html','routes/profile/profile.html','routes/purl/purl.html','routes/purl/recipients/purl-recipients.html','routes/purl/security/purl-security.html','routes/registration/registration.html','routes/settings/about/settings-about.html','routes/settings/account/settings-account.html','routes/settings/app/settings-app.html','routes/settings/identity/create/settings-identity-create.html','routes/settings/identity/edit/settings-identity-edit.html','routes/settings/identity/key/create/settings-identity-key-create.html','routes/settings/identity/key/edit/settings-identity-key-edit.html','routes/settings/identity/key/import/settings-identity-key-import.html','routes/settings/identity/key/list/settings-identity-key-list.html','routes/settings/identity/list/settings-identity-list.html','routes/settings/notify/settings-notify.html','routes/settings/settings.html','routes/start/keyinfo/start-keyinfo.html','routes/start/quickstart/start-quickstart.html','routes/start/start.html','routes/start/welcome/start-welcome.html','routes/systemcheck/systemcheck.html','routes/talks/talks.html','routes/terms/terms.html','routes/verification/verification.html','routes/version/version.html'])
.controller('AuthenticationCtrl', [
    '$scope',
    '$routeParams',

    function($scope, $routeParams) {
        $scope.keyId        = $routeParams.keyId
        $scope.identityId   = $routeParams.identityId
    }
])
.controller('ContactEditCtrl',[

    'cmContactsModel',
    '$routeParams', '$scope',

    function(cmContactsModel, $routeParams, $scope){
        $scope.contactId = $routeParams.id

        $scope.contact = cmContactsModel.contacts.find($routeParams.id)

        cmContactsModel.contacts.on('register', function(event, contact){
            if(contact.id == $routeParams.id){
                $scope.contact = contact
            }
        })
    }
])
.controller('ContactRequestListCtrl',[
    '$scope',
    '$routeParams',
    function($scope, $routeParams){
        $scope.route = $routeParams.section || '';
    }
])
.controller('ConversationCtrl', [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    'cmConversationFactory',
    function($rootScope, $scope, $routeParams, $location, cmConversationFactory){

        var force_new       =   $routeParams.conversationId == 'new',
            conversation_id =   force_new ?  undefined : $routeParams.conversationId


        $scope.conversation =   conversation_id
                                ?   cmConversationFactory.create(conversation_id)
                                :   ($rootScope.pendingConversation || cmConversationFactory.new())


        if(!$scope.conversation.state.is('new') && force_new)
            $scope.conversation = cmConversationFactory.create()

        if(!conversation_id){
            $scope.$watchCollection('conversation', function(conversation){
                if(conversation.id)
                    $rootScope.goto('conversation/' + conversation.id)
            })
        }

    }
])
.controller('ConversationRecipientsCtrl', [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    'cmConversationFactory',
    function($rootScope, $scope, $routeParams, $location, cmConversationFactory){

        var force_new       =   $routeParams.conversationId == 'new',
            conversation_id =   force_new ?  undefined : $routeParams.conversationId


        $scope.conversation =   conversation_id
                                ?   cmConversationFactory.create(conversation_id)
                                :   ($rootScope.pendingConversation || cmConversationFactory.new())


        if(!$scope.conversation.state.is('new') && force_new)
            $scope.conversation = cmConversationFactory.create()

    }
])
.controller('ConversationSecurityCtrl', [

    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    'cmConversationFactory',

    function($rootScope, $scope, $routeParams, $location, cmConversationFactory){

        var force_new       =   $routeParams.conversationId == 'new',
            conversation_id =   force_new ?  undefined : $routeParams.conversationId


        $scope.conversation =   conversation_id
                                ?   cmConversationFactory.create(conversation_id)
                                :   ($rootScope.pendingConversation || cmConversationFactory.new())


        if(!$scope.conversation.state.is('new') && force_new)
            $scope.conversation = cmConversationFactory.create()

    }
])
.controller('ErrorCtrl', [
    '$scope',
    '$rootScope',
    '$document',
    function ($scope, $rootScope, $document) {
        // if no errorThrown return to talks
        if(!('errorThrown' in $rootScope))
            $rootScope.goto('/talks');

        // at pending error to scope
        $scope.data_str = JSON.stringify($rootScope.errorThrown, undefined, 2);

        // hide broken page
        var views = $document[0].querySelectorAll('[ng-view]');
        if(views.length > 1)
            angular.element(views[1]).addClass('ng-hide');
    }
])
.controller('FilterCtrl', [
    '$scope',
    '$http',
    '$cookieStore',
    'cmLogger',
    'cmCrypt',
    function ($scope, $http, $cookieStore, cmLogger, cmCrypt) {

        $scope.messages = [];
        $scope.messageCount = 0;
        $scope.filter = "{}";
        $scope.limit = 50;
        $scope.offset = 0;

        $scope.filters = [
            {name: "all", filter: "{}"},
            {name: "filter group (from)", filter: '{"fromGroups":["group1"]}'},
            {name: "filter group (to)", filter: '{"toGroups":["group1"]}'},
            {name: "filter date (start)", filter: '{"startDate":"1391784822"}'},
            {name: "filter date (end)", filter: '{"endDate":"1391784822"}'}
        ];

        $scope.setFilter = function () {
            $scope.filter = $scope.filterSelect.filter
        };

        $scope.getMessages = function () {

            if ($scope.messages.length > 0) {
                $scope.offset = $scope.offset + $scope.limit
            }

            var start = new Date();

            $http({
                    method: "POST",
                    url: app.cameo.restApi + "/message/filter?token=" + $cookieStore.get("token") + "&offset=" + $scope.offset + "&limit=" + $scope.limit,
                    data: $scope.filter
                }
            ).success(function (res) {
                $scope.messages = res.data;

                $scope.totalTime = ((new Date()).getMilliseconds() - start.getMilliseconds())
            }).error(function (res) {
                cmLogger.error("error", res)
            });
        };

        $scope.getMessageCount = function () {
            $http({
                method: "POST",
                url: app.cameo.restApi + "/message/filter/count?token=" + $cookieStore.get("token"),
                data: $scope.filter
            }).success(function (res) {
                $scope.messageCount = res.data;
            }).error(function (res) {
                cmLogger.errorData("error", res)
            });
        };

}])
.controller('NotificationsCtrl', [
    '$scope',
    'cmNotify',
    function($scope, cmNotify){
        $scope.notifications = cmNotify;

        $scope.ring = function(){
            cmNotify.create({
                label:'NOTIFICATIONS.TYPES.FRIEND_REQUEST',
                bell: true
            });
        }

        $scope.warn = function(){
            cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.DISPLAYNAME',{ttl:2000});
        }

        $scope.info = function(){
            cmNotify.info('NOTIFICATIONS.TYPES.FRIEND_REQUEST',{ttl:0, displayType:'modal'});
        }

        $scope.success = function(){
            cmNotify.success('NOTIFICATIONS.TYPES.FRIEND_REQUEST',{ttl:0, displayType:'modal'});
        }

        $scope.error = function(){
            cmNotify.error('DRTV.EXTERN_CONTACT.INFO.SAVE_FAIL',{ttl:2000});
        }
    }
])

.controller('PurlCtrl',[
    'cmModal', 'cmPurlModel', 'cmConversationFactory',
    '$scope', '$rootScope', '$routeParams', 'resolveData',
    function(cmModal, cmPurlModel, cmConversationFactory,
             $scope, $rootScope, $routeParams, resolveData){

        $rootScope.pendingPurl      = null;
        $scope.showSignIn           = false;
        $scope.purlId               = $routeParams.purlId || '';
        $scope.headerGuest          = true;

        /**
         * modal for fast registration
         */
        $scope.openFastRegister = function(){
            cmModal.create({
                    id: 'fast-registration',
                    'class': 'webreader',
                    type: 'alert',
                    //nose: 'bottom-left',
                    'cm-close-btn': false,
                    'cm-footer-label': 'MODAL.WEBREADER.LATER',
                    'cm-footer-icon': 'cm-close'
                },
                '<div class="attention">' +
                    '<i class="fa cm-attention"></i> {{\'MODAL.WEBREADER.NOTICE\'|cmTranslate}}' +
                '</div>'+
                '<a href="#/registration" class="classic-link" data-qa="btn-register-modal">' +
                    '<i class="fa cm-key"></i> {{\'MODAL.WEBREADER.REGISTRATION\'|cmTranslate}}' +
                '</a>'
            );
            cmModal.open('fast-registration')
        };

        $scope.showLogin = function () {
            $scope.showSignIn = true;

            cmModal.create({
                id: 'login',
                'class': 'with-title no-padding theme-b',
                'cm-close-btn': false,
                'cm-close-on-backdrop': false
            },'<div cm-login-modal></div>');
            cmModal.open('login');

            $rootScope.$on('cmLogin:success', function(){
                location.reload();
            });
        };

        //console.log('resolveData', resolveData);
        //console.log('$routeParams.purlId',$routeParams.purlId)

        if(typeof resolveData == 'object'){
            if(typeof resolveData.identity == 'object' && typeof resolveData.conversation == 'object'){
                // identity check internal || external user
                cmPurlModel.handleIdentity(resolveData.identity);

                if(resolveData.identity.userType == 'external'){
                    $rootScope.pendingPurl = $routeParams.purlId;
                } else {
                    $scope.headerGuest = false;
                }

                if(typeof resolveData.token !== 'undefined'){
                    cmPurlModel.handleToken(resolveData.token)
                }

                var conversation_id = cmPurlModel.handleConversation(resolveData.conversation);

                $scope.conversation = cmConversationFactory.create(conversation_id);
            } else if(typeof resolveData.status == 'number' && resolveData.status == 401){
                $rootScope.$broadcast('logout', {goToLogin: false, where: 'purl-ctrl getPurl reject'})
                $scope.showLogin();
            } else {
                $rootScope.goTo('/404');
            }
        }
    }
])
.controller('PurlRecipientCtrl',[

    '$scope',
    '$rootScope',
    '$routeParams',
    'cmModal',
    'cmPurlModel',
    'cmConversationFactory',

    function($scope, $rootScope, $routeParams, cmModal, cmPurlModel, cmConversationFactory){

        $rootScope.pendingPurl      = null;
        $scope.showSignIn           = false;
        $scope.purlId               = $routeParams.purlId || '';

        if($routeParams.purlId){
            cmPurlModel.getPurl($routeParams.purlId).then(
                function(data){
                    // identity check internal || external user
                    cmPurlModel.handleIdentity(data.identity);

                    if(data.identity.userType == 'external'){
                        $scope.showSignIn = true;
                        $rootScope.pendingPurl = $routeParams.purlId;
                    }

                    if(typeof data.token !== 'undefined'){
                        cmPurlModel.handleToken(data.token)
                    }

                    var conversation_id = cmPurlModel.handleConversation(data.conversation);

                    $scope.conversation = cmConversationFactory.create(conversation_id)
                },

                function(response){
                    if(typeof response !== 'undefined' && 'status' in response){
                        if(response.status == 401){
                            $rootScope.$broadcast('logout', {goToLogin: false, where: 'purl-ctrl getPurl reject'})
                            $scope.showLogin();
                        } else if(response.status == 404){
                            $scope.goto('/404');
                        }
                    } else {
                        $scope.goto('/404');
                    }
                }
            );
        }

        /**
         * modal for fast registration
         */
        $scope.openFastRegister = function(){
            cmModal.create({
                    id: 'fast-registration',
                    'class': 'webreader',
                    type: 'alert',
                    //nose: 'bottom-left',
                    'cm-close-btn': false,
                    'cm-footer-label': 'MODAL.WEBREADER.LATER',
                    'cm-footer-icon': 'cm-close'
                },'' +
                    '<div class="attention">' +
                    '<i class="fa cm-attention"></i> {{\'MODAL.WEBREADER.NOTICE\'|cmTranslate}}' +
                    '</div>'+
                    '<a href="#/registration" class="redirect" data-qa="btn-register-modal">' +
                    '<i class="fa cm-key"></i> {{\'MODAL.WEBREADER.REGISTRATION\'|cmTranslate}}' +
                    '</a>'
            );
            cmModal.open('fast-registration')
        };

        $scope.showLogin = function () {
            cmModal.create({
                id: 'login',
                'class': 'with-title no-padding',
                'cm-close-btn': false,
                'cm-close-on-backdrop': false
            },'<div cm-login></div>');
            cmModal.open('login');

            $rootScope.$on('cmLogin:success', function(){
                location.reload();
            });
        };
    }
])
.controller('PurlSecurityCtrl',[

    '$scope',
    '$rootScope',
    '$routeParams',
    'cmModal',
    'cmPurlModel',
    'cmConversationFactory',

    function($scope, $rootScope, $routeParams, cmModal, cmPurlModel, cmConversationFactory){

        $rootScope.pendingPurl      = null;

        $scope.showSignIn           = false;
        $scope.purlId               = $routeParams.purlId || '';

        if($routeParams.purlId){
            cmPurlModel.getPurl($routeParams.purlId).then(
                function(data){
                    // identity check internal || external user
                    cmPurlModel.handleIdentity(data.identity);

                    if(data.identity.userType == 'external'){
                        $scope.showSignIn = true;
                        $rootScope.pendingPurl = $routeParams.purlId;
                    }

                    if(typeof data.token !== 'undefined'){
                        cmPurlModel.handleToken(data.token)
                    }

                    var conversation_id = cmPurlModel.handleConversation(data.conversation);

                    $scope.conversation = cmConversationFactory.create(conversation_id)
                },

                function(response){
                    if(typeof response !== 'undefined' && 'status' in response){
                        if(response.status == 401){
                            $rootScope.$broadcast('logout', {goToLogin: false, where: 'purl-ctrl getPurl reject'})
                            $scope.showLogin();
                        } else if(response.status == 404){
                            $scope.goto('/404');
                        }
                    } else {
                        $scope.goto('/404');
                    }
                }
            );
        }

        /**
         * modal for fast registration
         */
        $scope.openFastRegister = function(){
            cmModal.create({
                    id: 'fast-registration',
                    'class': 'webreader',
                    type: 'alert',
                    //nose: 'bottom-left',
                    'cm-close-btn': false,
                    'cm-footer-label': 'MODAL.WEBREADER.LATER',
                    'cm-footer-icon': 'cm-close'
                },'' +
                    '<div class="attention">' +
                    '<i class="fa cm-attention"></i> {{\'MODAL.WEBREADER.NOTICE\'|cmTranslate}}' +
                    '</div>'+
                    '<a href="#/registration" class="redirect" data-qa="btn-register-modal">' +
                    '<i class="fa cm-key"></i> {{\'MODAL.WEBREADER.REGISTRATION\'|cmTranslate}}' +
                    '</a>'
            );
            cmModal.open('fast-registration')
        };

        $scope.showLogin = function () {
            cmModal.create({
                id: 'login',
                'class': 'with-title no-padding',
                'cm-close-btn': false,
                'cm-close-on-backdrop': false
            },'<div cm-login></div>');
            cmModal.open('login');

            $rootScope.$on('cmLogin:success', function(){
                location.reload();
            });
        };
    }
])
.controller('SettingsIdentityCreateCtrl', [
    // no dependencies
    function() {
        //nothing to here yet
    }
])
.controller('SettingsIdentityKeyCreateCtrl', [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {
        $scope.backBtn = true;
        if(typeof $rootScope.generateAutomatic != 'undefined'){
            $scope.backBtn = false;
        }
    }
])
.controller('SettingsNotifyCtrl', [
    // no dependencies
    function() {
        // nothing to do here
    }
])
.controller('SettingsCtrl', [
    // no dependencies
    function() {
        // nothing to do here
    }
])
.controller('StartQuickstartCtrl', [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {
        $scope.startRoute = false;

        if ($rootScope.urlHistory.length > 1 && $rootScope.urlHistory[$rootScope.urlHistory.length - 2].indexOf('/start') != -1) {
            $scope.startRoute = true;
        }
    }
])
.controller('VersionCtrl',[
    '$scope','cmVersion',
    function($scope, cmVersion){
        $scope.cmVersion = cmVersion;
    }
])
'use strict';

angular.module('widgets/cameo/wdgt-terms.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
angular.module('widgets/contact/wdgt-contact-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
angular.module('widgets/contact/wdgt-contact-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><article class="content edit-identity-head clearfix"><div class="cm-fl mr5"><cm-avatar cm-data="contact.identity" cm-view="{{chooseAvatar?\'unknown\':\'\'}}" ng-show="contact.identity" class="big"></cm-avatar></div><div class="cm-fl w72"><ul class="no-border"><li><section ng-if="!isTrusted && (!hasKeys || !hasLocalKey)" class="cm-disabled"><span class="item clearfix"><i class="fa cm-no-key cm-ci-color"></i> {{\'CONTACT.TRUST.NO_CAMEOKEYS\'|cmTranslate}}</span><section class="icon-list"><i class="fa cm-info"></i></section></section><section ng-if="!isTrusted && hasKeys && hasLocalKey"><span class="item clearfix"><i class="fa cm-key cm-ci-color"></i> {{\'CONTACT.TRUST.HAS_CAMEOKEYS\'|cmTranslate}}</span><section class="icon-list"><i class="fa cm-info"></i></section></section><section ng-if="isTrusted" data-qa="trust-confirmed"><span class="item clearfix"><i class="fa cm-connection-trusted cm-ci-color"></i> {{\'CONTACT.TRUST.OK\'|cmTranslate}}</span><section class="icon-list"><i class="fa cm-info"></i></section></section></li><li class="no-border" data-qa="start-trust-handshake-btn" ng-click="goToAuthentication(contact.identity)" ng-if="!isTrusted && hasKeys && hasLocalKey"><span class="item clearfix"><i class="fa cm-handshake"></i> {{\'CONTACT.TRUST.START\'|cmTranslate}}</span><section class="icon-list"><i class="fa cm-right"></i></section></li></ul></div></article><hr class="margin-small" /><!-- show all talks with this user --><!--<article class="item"><span class="body"><i class="fa cm-talk"></i> Alle Talks mit diesem Kontakt anzeigen</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small" />--><form name="cmForm" novalidate autocomplete="off"><article class="content" ng-if="!showCameoId" data-qa="internal-user"><label>{{\'CONTACT.PLACEHOLDER.CAMEOID\'|cmTranslate}}</label><div class="cm-input-ctn with-inside-icon cm-icon-grey" ng-class="{\'cm-input-disabled\':disabled}"><i class="fa cm-rhino-positive"></i><input data-qa="input-cameoId" disabled type="text" name="cameoId" ng-model="contact.identity.cameoId" /></div></article><hr class="margin-small" ng-if="!showCameoId" /><article class="content"><label>{{\'CONTACT.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-disabled\':disabled}"><input tabindex="1" data-qa="input-displayname" type="text" name="displayName" ng-model="contact.identity.displayName" ng-disabled="disabled" required /></div><cm-info-bubble class="cm-alert" ng-show="cmForm.displayName.$dirty && cmForm.displayName.$invalid"><div ng-show="cmForm.displayName.$error.required"><i class="fa cm-info"></i> {{\'CONTACT.INFO.EMPTY.DISPLAYNAME\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small" /><label class="content">{{\'CONTACT.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><cm-multi-input cm-collection="formData.phoneNumbers" cm-disabled="disabled" class="content"><ng-form name="formPhone"><div class="cm-input-ctn with-chooser" ng-class="{\'cm-input-disabled\':disabled}"><input tabindex="2" data-qa="input-phonenumber" type="text" name="phoneNumber" ng-model="item.value" ng-disabled="disabled" cm-validate-phone cm-adaptive-change /></div><!--<div cm-type-chooser cm-choose-value-to="item" cm-disabled="disabled" ng-class="{\'cm-input-disabled\':disabled}"></div>--><cm-info-bubble class="cm-alert" ng-show="formPhone.phoneNumber.$dirty && formPhone.phoneNumber.$invalid"><div ng-show="formPhone.phoneNumber.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input><hr class="margin-small" /><label class="content">{{\'CONTACT.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><cm-multi-input cm-collection="formData.emails" cm-disabled="disabled" class="content"><ng-form name="formEmail"><div class="cm-input-ctn with-chooser" ng-class="{\'cm-input-disabled\':disabled}"><input tabindex="3" data-qa="input-email" name="email" ng-model="item.value" ng-disabled="disabled" cm-validate-email /></div><!--<div cm-type-chooser cm-choose-value-to="item" ng-class="{\'cm-input-disabled\':disabled}" cm-disabled="disabled"></div>--><cm-info-bubble class="cm-alert" ng-show="formEmail.email.$dirty && formEmail.email.$invalid"><div ng-show="formEmail.email.$invalid"><i class="fa cm-info"></i> {{\'CONTACT.INFO.INVALID.EMAIL\'|cmTranslate}}</div></cm-info-bubble></ng-form></cm-multi-input></form><cm-footer ng-hide="disabled"><button data-qa="btn-create-contact" class="cm-btn-grey" id="registerUserButton" ng-click="saveUser()"> {{\'CONTACT.FOOTER.SAVE\'|cmTranslate}} <i class="fa cm-checkbox-right"></i></button></cm-footer>');
}]);
angular.module('widgets/contact/wdgt-contact-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
angular.module('widgets/contact/wdgt-contact-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
angular.module('widgets/contact/wdgt-contact-request-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
angular.module('widgets/contact/wdgt-contact-search.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
angular.module('widgets/conversation/wdgt-conversation-recipients.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
angular.module('widgets/conversation/wdgt-conversation-security.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
angular.module('widgets/conversation/wdgt-conversation.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
angular.module('widgets/login/wdgt-login.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
angular.module('widgets/registration/wdgt-registration.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('widgets/security/wdgt-authentication.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
angular.module('widgets/settings/identity/key/wdgt-identity-key-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
angular.module('widgets/settings/identity/key/wdgt-identity-key-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
angular.module('widgets/settings/identity/key/wdgt-identity-key-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
angular.module('widgets/settings/identity/key/wdgt-identity-key-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
angular.module('widgets/settings/identity/wdgt-identity-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
angular.module('widgets/settings/identity/wdgt-identity-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
angular.module('widgets/settings/identity/wdgt-identity-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
angular.module('widgets/settings/wdgt-about-us.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
angular.module('widgets/settings/wdgt-notify.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
angular.module('widgets/settings/wdgt-settings-about-us.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
angular.module('widgets/settings/wdgt-settings-account.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
angular.module('widgets/settings/wdgt-settings-app.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
angular.module('widgets/settings/wdgt-settings-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
angular.module('widgets/settings/wdgt-settings-notify.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
angular.module('widgets/start/wdgt-keyinfo.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
angular.module('widgets/start/wdgt-quickstart.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
angular.module('widgets/start/wdgt-welcome.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
angular.module('widgets/systemcheck/wdgt-systemcheck.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
angular.module('widgets/talks/wdgt-talks.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'widgets/cameo/wdgt-terms.html','widgets/contact/wdgt-contact-create.html','widgets/contact/wdgt-contact-edit.html','widgets/contact/wdgt-contact-import.html','widgets/contact/wdgt-contact-list.html','widgets/contact/wdgt-contact-request-list.html','widgets/contact/wdgt-contact-search.html','widgets/conversation/wdgt-conversation-recipients.html','widgets/conversation/wdgt-conversation-security.html','widgets/conversation/wdgt-conversation.html','widgets/login/wdgt-login.html','widgets/registration/wdgt-registration.html','widgets/security/wdgt-authentication.html','widgets/settings/identity/key/wdgt-identity-key-create.html','widgets/settings/identity/key/wdgt-identity-key-edit.html','widgets/settings/identity/key/wdgt-identity-key-import.html','widgets/settings/identity/key/wdgt-identity-key-list.html','widgets/settings/identity/wdgt-identity-create.html','widgets/settings/identity/wdgt-identity-edit.html','widgets/settings/identity/wdgt-identity-list.html','widgets/settings/wdgt-about-us.html','widgets/settings/wdgt-notify.html','widgets/settings/wdgt-settings-about-us.html','widgets/settings/wdgt-settings-account.html','widgets/settings/wdgt-settings-app.html','widgets/settings/wdgt-settings-list.html','widgets/settings/wdgt-settings-notify.html','widgets/start/wdgt-keyinfo.html','widgets/start/wdgt-quickstart.html','widgets/start/wdgt-welcome.html','widgets/systemcheck/wdgt-systemcheck.html','widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactEdit
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


    .directive('cmWidgetContactEdit', [

        '$rootScope',
        '$routeParams',
        '$timeout',
        'cmIdentityFactory',
        'cmUtil',
        'cmNotify',
        'cmUserModel',
        'cmLogger',

        function( $rootScope,$routeParams, $timeout,
                  cmIdentityFactory, cmUtil, cmNotify, cmUserModel, cmLogger){

            return {
                restrict:       'AE',
                scope:          {
                    contact: '=cmData'
                },
                templateUrl:    'widgets/contact/wdgt-contact-edit.html',

                controller: function($scope, $element, $attrs){
                    $scope.cmUtil = cmUtil;

                    $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                    $scope.formData = {
                        phoneNumbers: [{value:''}],
                        emails: [{value:''}]
                    };

                    $scope.chooseAvatar = false;

                    $scope.isTrusted    = undefined;
                    $scope.hasKeys      = undefined;


                    function refresh(){
                        //////////////////////
                        // TODO: mock workarround json in array
                        $scope.formData.phoneNumbers = [
                            $scope.contact.identity.phoneNumber || {value:''}
                        ];
                        $scope.formData.emails = [
                            $scope.contact.identity.email || {value:''}
                        ];
                        //////////////////////

                        $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                        $scope.chooseAvatar = false;

                        $scope.isTrusted    = undefined;
                        $scope.hasKeys      = undefined;

                        $scope.disabled = $scope.contact.contactType == 'internal' ? true : false;

                        if(!$scope.disabled){
                            $scope.showCameoId = true;
                        } else {
                            $scope.showCameoId = false;
                        }

                        $scope.hasKeys = ($scope.contact.identity.keys.length > 0);
                        
                        cmUserModel.verifyTrust($scope.contact.identity)
                        .then(function(){
                            $scope.isTrusted = true;
                        });
                    }
                    
                    refresh();

                    /**
                     * handle every single contact via model
                     */
                    $scope.startConversation = function () {
                        if($scope.contact.contactType != 'pending'){
                            delete $rootScope.pendingConversation;
                            if ($scope.identity) {
                                $rootScope.pendingRecipients = [$scope.identity]
                            } else {
                                cmLogger.error('Unable to find identity on contact. ' + $scope.contact)
                            }
                            $rootScope.goTo('/conversation/new');
                        }
                    };

                    $scope.goToAuthentication = function(identity){
                        if(identity.userType != 'external' && identity.keys.length > 0){
                            $rootScope.goTo('authentication/identity/' + identity.id);
                        }
                    };

                    $scope.saveUser = function(){
                        // declaration
                        var emptyIdentity = {
                                displayName: null,
                                email: null,
                                phoneNumber: null,
                                preferredMessageType: 'default',
                                // TODO: not implemented in BE
                                name: null,
                                surName: null,
                                phoneProvider: null,
                                groups: []
                            },
                        // merge given identity with default
                            identity = angular.extend({}, emptyIdentity, $scope.identity.exportData());

                        // validation
                        //////////////////////
                        // TODO: mock workarround for multiinput from array to single string
                        if($scope.formData.phoneNumbers.length > 0 && $scope.formData.phoneNumbers[0].value != ''){
                            identity.phoneNumber = $scope.formData.phoneNumbers[0].value;
                            identity.preferredMessageType = 'sms';
                        } else {
                            identity.phoneNumber = null;
                        }

                        if($scope.formData.emails.length > 0 && $scope.formData.emails[0].value != ''){
                            identity.email = $scope.formData.emails[0].value;
                            identity.preferredMessageType = 'mail';
                        } else {
                            identity.email = null;
                        }
                        //////////////////////
                        if($scope.cmForm.$invalid){
                            return false;
                        }


                        // everything is fine let's add the contact
                        cmContactsModel
                        .editContact($routeParams.id, identity)
                        .then(
                            function () {
                                cmNotify.info('CONTACT.INFO.SUCCESS.EDIT',{ttl:5000,displayType:'modal'});
                            },
                            function () {
                                cmNotify.error('CONTACT.INFO.ERROR.EDIT',{ttl:5000});
                            }
                        );
                    };

                    $scope.startTrustHandshake = function(){
                        cmHooks.openKeyRequest($scope.identity);
                    };

                    $scope.contact.identity.on('update:finished', refresh)

                    $scope.$on('$destroy', function(){
                        $scope.contact.identity.off('update:finished', refresh)
                    })

                }
            }
        }
    ])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data

                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])