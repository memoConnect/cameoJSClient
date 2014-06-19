cameo_config = {
    restApi: '<%= currentApiUrl %>',
    version: '<%= currentVersion %>',

    commitSize: 50,
    commitInterval: 500,
    useCallStack: true,
    callStackPath: '/callStack',
    useEvents: true,
    eventsPath: '/eventSubscription',
    eventsInterval: '2000',

    token: null,
    supported_languages: ['de_DE', 'en_US'],
    path_to_languages: 'i18n',
    cache_lang_files: false,
    routes: {
        'login': {
            hasCtrl: true,
            isOtherwise: true,
            css: 'no-header no-footer',
            guests: false
        },
        'settings': {
            hasCtrl: true,
            css: 'no-footer',
            routes: [
                '/settings/:mainPage?',
                '/settings/:mainPage/:subPage?'
            ],
            resolveOnBoot: true
        },
        'talks': {
            hasCtrl: true,
            resolveOnBoot: true
        },
        'mediawall': {
            hasCtrl: true
        },
        'conversation': {
            routes:['/conversation/:conversationId?'],
            hasCtrl: true,
            resolveOnBoot: true
        },
        'recipients': {
            hasCtrl: true,
            resolveOnBoot: true
        },
        'registration': {
            hasCtrl: true,
            guests: true
        },
        'purl': {
            routes:['/purl/:idPurl?'],
            hasCtrl: true,
            guests: true
        },
        'profile': {},
        'filter': {
            hasCtrl: true
        },
        'contacts': {
            routes:['/contacts/:section?'],
            hasCtrl: true,
            resolveOnBoot: true
        },
        'contact': {
            routes:['/contact/:id'],
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
        }
    },

    env: {
        autoLogin: ('<%= autoLogin %>' == 'true'),
        loadingBar: ('<%= loadingBar %>' == 'true'),
        isiOS: ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false )
    },

    menu: {
        'menu': {i18n:'MENU.HEADER', icon:'cm-menu', css:'cm-menu-header', onlyLabel:true},
        //'notfications': {i18n:'MENU.NOTIFICATIONS', icon:'cm-bell', css:'cm-menu-notify'},
        'talks': {i18n:'MENU.MESSAGES', icon:'cm-envelope-closed', css:'cm-menu-notify'},
        'contacts': {i18n:'MENU.CONTACTS', icon:'cm-group', css:'cm-menu-notify'},
        'contacts/requests': {i18n:'MENU.REQUESTS', icon:'cm-contacts', css:'cm-menu-notify qa-btn-request-notify', drtv:'cm-friend-request-counter'},
        'settings': {i18n:'MENU.SETTINGS', icon:'cm-settings', subs:{}}
    },

    routeSettings: {
        'account': {i18n:'SETTINGS.ACCOUNT', icon:'cm-person'},
        'identity': {i18n:'SETTINGS.IDENTITY', icon:'cm-person'},
        'notify': {i18n:'SETTINGS.NOTIFY', icon:'cm-bell'},
        'contacts': {i18n:'SETTINGS.CONTACTS', icon:'cm-contacts'},
        'view': {i18n:'SETTINGS.VIEW', icon:'cm-fix'},
        'about': {i18n:'SETTINGS.ABOUT', icon:'cm-rhino-positive'},
        'contracts': {i18n:'SETTINGS.CONTRACTS', icon:'cm-clipboard'}
    }
};
// settings config to menu subs
cameo_config.menu.settings.subs = cameo_config.routeSettings;