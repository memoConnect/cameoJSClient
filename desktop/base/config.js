var cameo_config = {
    restApi: '<%= currentApiUrl %>',
    version: '<%= currentVersion %>',

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

    env: {
        autoLogin: ('<%= autoLogin %>' == 'true'),
        loadingBar: ('<%= loadingBar %>' == 'true'),
        enableDebug: ('<%= enableDebug %>' == 'true'),
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
//// performance page
//if('<%= performancePage %>' == 'true') {
//    cameo_config.menu['performance'] = {i18n: 'SETTINGS.PAGES.PERFORMANCE.TITLE', icon: 'cm-not-connected', link: 'performance.html'};
//}
