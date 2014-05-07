require.config({
    baseUrl: "",
    // alias libraries paths
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'app': 'base/app',
        'screen': 'base/screen',
        // angular library
        'angular': 'vendor/angular/angular',
        'angular-route': 'vendor/angular/angular-route',
        'angular-resource': 'vendor/angular/angular-resource',
        'angular-cookies': 'vendor/angular/angular-cookies',
        'angular-swipe': 'vendor/angular/angular-swipe',

        'angular-translate': 'vendor/angular-translate/angular-translate',
        'angular-growl': 'vendor/angular-growl/angular-growl',

        'angular-moment-wrap': 'vendor/angular-moment/angular-moment',
        'moment': 'vendor/angular-moment/moment-with-langs',

        // requirejs stuff
        'angularAMD': 'vendor/requirejs/angularAMD',
        'ngload': 'vendor/requirejs/ngload',

        // global provider without AMD
        'cmApi': 'shared/cmApi',
        'cmUi': 'shared/ui/ui-module',
        'cmLanguage': 'shared/cmLanguage',
        'cmLogger': 'shared/cmLogger',
        'cmNotify': 'shared/cmNotify',
        'cmLocalStorage': 'shared/cmLocalStorage',
        'cmUserModel': 'shared/cmUserModel',
        'cmIdentity': 'shared/cmIdentity',
        'cmObject' : 'shared/cmObject',
        'cmJob' : 'shared/cmJob',

        // cameo modules/services
        'cmAuth': 'shared/cmAuth',
        'cmCrypt': 'shared/cmCrypt',
        'cmUtil': 'shared/cmUtil',
//        'cmCron': 'shared/cmCron',

        'cmProfile': 'comps/cmProfile',

        // shared
        'util-spin': 'vendor/util/spin',
        'util-base64': 'vendor/util/base64',
        'util-base64_decode': 'vendor/util/base64_decode',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/crypto/sjcl/sjcl.min',
        'crypto-ats-oka': 'vendor/crypto/ats-oka/ats-oka.min',
        'crypto-jsencrypt': 'vendor/crypto/jsencrypt/jsencrypt.min',

        // packages generated via grunt task 'packages'
        'pckContacts': 'comps/contacts/package',
        'pckUser': 'comps/user/package',
        'pckValidate': 'comps/validate/package',
        'pckUi': 'shared/ui/package',
        'pckConversations': 'comps/conversations/package',
        'pckFiles': 'comps/files/package'
    },

    packages: [
        {name: '_v', location: 'vendor' },
        {name: '_c', location: 'comps'  },
        {name: '_s', location: 'shared' }
//        {name: '_d', location: 'directives'}
    ],
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-swipe': ['angular'],
        'angular-translate': ['angular'],
        'angular-growl': ['angular'],
        'angular-moment-wrap': ['angular','moment'],

        'cmNotify': ['angular-growl'],
        'cmAuth': ['angular', 'util-base64', 'cmCrypt','cmApi'],
        'cmCrypt': [
            'angular',
            'util-base64',
            'cmLogger',
            'crypto-sjcl',
            'crypto-jsencrypt'
        ],
        'cmLocalStorage' : ['angular', 'cmLogger','cmCrypt'],
//        'cmCron' : ['angular'],
        'cmIdentity': ['angular', 'cmAuth'],
        'cmObject': ['angular'],
        'cmJob': ['angular'],
        'cmUserModel': ['angular', 'cmLocalStorage','cmIdentity','cmLogger'],
        'cmApi': ['angular', 'cmLogger'],
        'cmProfile' : ['angular', 'cmApi', 'cmAuth'],
        'cmLogger' : ['angular'],
        'cmLanguage' : [
            'angular',
            'angular-translate',
            'angular-growl',
            'cmNotify',
            'cmLogger'
        ],
        // packages
        'pckContacts': [
            'cmApi',
            'cmLogger',
            'cmUtil',
            'cmIdentity'
        ],
        'pckUser': [
            'cmAuth',
            'cmUserModel',
            'cmCrypt',
            'cmUtil'
        ],
        'pckValidate': [
            'util-passchk-fast'
        ],
        'pckUi': [
            'cmAuth',
            'cmLogger',
            'cmLanguage',
            'cmUserModel',
            'util-spin'
        ],

        'pckConversations': [
            'angular',
            'cmApi',
            'cmLogger',
            'cmNotify',
            'cmCrypt',
            'cmAuth',
            'cmUtil',
//        'cmCron',
            'cmUserModel',
            'cmIdentity',
            'pckContacts',
            'pckFiles',
            'pckUi',
            '_v/captcha/captchagen/captchagen',
            'util-base64'
        ],

        'pckFiles': [
            'cmApi',
            'cmLogger',
            'cmCrypt',
            'cmUtil',
            'cmObject',
            'vendor/filesaver/filesaver',
            'angular-resource',
            'util-base64_decode'
            //'vendor/base64_decode'
        ]
    },
    // kick start application
    deps: ['app']
});