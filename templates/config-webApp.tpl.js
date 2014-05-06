cameo_config = {
    restApi: '<%= currentApiUrl %>',
    version: '<%= currentVersion %>',

    commitSize: 50,
    commitInterval: 500,
    useCallStack: true,
    callStackPath: '/callStack',
    useEvents: false,
    eventsPath: '/events',
    eventsInterval: '5000',

    token: null,
    supported_languages: ['de_DE', 'en_US'],
    path_to_languages: 'i18n',
    cache_lang_files: false,
    routes: {
        'login': {
            hasCtrl: true,
            isOtherwise: true,
            css: 'no-header no-footer',
            guests: true
        },
        'settings': {
            hasCtrl: true,
            css: 'no-footer'
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
        'recipients': {
            hasCtrl:true
        },
        'registration': {
            hasCtrl: true
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
            hasCtrl: true
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
        autoLogin: ('<%= autoLogin %>' == 'true')
    }
};