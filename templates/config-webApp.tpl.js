cameo_config = {
    restApi: '<%= currentApiUrl %>',
    version: '<%= currentVersion %>',

    token: null,
    supported_languages: ['de_DE', 'en_US'],
    path_to_languages: 'i18n',
    cache_lang_files: false,
    routes: {
        'login': {
            hasCtrl: true,
            isOtherwise: true,
            css: 'no-header no-footer'
        },
        'start': {
            hasCtrl: true
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
        'server_down' : {
            templateUrl: 'routes/landingpages/server_down.html'
        },
        'terms': {
            css: 'no-footer'
        },
        'disclaimer': {},
        '404': {
            templateUrl:'routes/landingpages/404.html'
        },
        'version': {
            hasCtrl: true
        }
    }
};