angular.module('cmConfig',[])
.provider('cmConfig', [
    function(){
        var self = {
            restApi: '<%= currentApiUrl %>',
            version: '<%= currentVersion %>',

            commitSize: 50,
            commitInterval: 500,
            useCallStack: false,
            callStackPath: '/callStack',
            useEvents: true,
            eventsPath: '/eventSubscription',
            eventsInterval: '5000',

            webworkerDefaultGlobalLimit : 2,
            WebworkerDefaultLimitMobile: 2,
            WebworkerDefaultLimitApp: 2,
            WebworkerDefaultLimitDesktop: 2,

            token: null,
            supportedLanguages: ['de_DE', 'en_US'],
            pathToLanguages: 'i18n',
            cacheLangFiles: false,
            errorOnTodoInI18n: ('<%= errorOnTodoInI18n %>' == 'true'),

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
                    hasCtrl: true,
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
                //'settings/identity/key/list': {i18n:'MENU.OWN_KEYS', icon:'cm-key'},
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
                'identity/list': {i18n:'SETTINGS.IDENTITY', icon:'cm-avatar'},
                'identity/key/list': {i18n:'MENU.OWN_KEYS', icon:'cm-key'},
                'notify': {i18n:'SETTINGS.NOTIFY', icon:'cm-bell'},
                'contacts': {i18n:'SETTINGS.CONTACTS', icon:'cm-address-book', disabled:true},
                'app': {i18n:'SETTINGS.APP', icon:'cm-fix'},
                'contracts': {i18n:'SETTINGS.CONTRACTS', icon:'cm-clipboard', disabled:true},
                'about': {i18n:'SETTINGS.PAGES.ABOUT_US.TITLE', icon:'cm-rhino-positive'}
            }
        };
        // performance page
        if('<%= performancePage %>' == 'true') {
            self.menu['performance'] = {i18n: 'SETTINGS.PAGES.PERFORMANCE.TITLE', icon: 'cm-not-connected', link: 'performance.html'};
        }

        this.get = function(key){
            return self[key];
        };

        this.$get = function(){
            return self;
        }
    }
])

.provider('cmEnv', [
    function() {
        var self = {
            autoLogin: ('<%= autoLogin %>' == 'true'),
            loadingBar: ('<%= loadingBar %>' == 'true'),
            enableDebug: ('<%= enableDebug %>' == 'true')
        }

        this.get = function(key){
            return self[key];
        };

        this.$get = function () {
            return self;
        }
    }
])

.constant('cmVersion',{
    version: '<%= currentVersion %>',
    last_build: '-'
});