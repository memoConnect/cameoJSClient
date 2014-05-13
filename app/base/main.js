require.config({
    baseUrl: "",
    // alias libraries paths
    urlArgs: "bust=" + (new Date()).getTime(),
    waitTimeout: 0,
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
        'cmProfile': 'comps/cmProfile',

        // shared
        'util-spin': 'vendor/util/spin',
        'util-base64': 'vendor/util/base64',
        'util-base64_decode': 'vendor/util/base64_decode',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/crypto/sjcl/sjcl.min',
        'crypto-jsencrypt': 'vendor/crypto/jsencrypt/jsencrypt.min',

        // packages generated via grunt task 'packages'
        'pckCore': 'shared/core/package',
        'pckContacts': 'comps/contacts/package',
        'pckUser': 'comps/user/package',
        'pckValidate': 'comps/validate/package',
        'pckUi': 'shared/ui/package',
        'pckConversations': 'comps/conversations/package',
        'pckFiles': 'comps/files/package'
    },

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

        // packages
        'pckCore': [
            'angular',
            'angular-growl',
            'angular-translate',
            'util-base64',
            'crypto-sjcl',
            'crypto-jsencrypt'
        ],
        'pckContacts': [
            'pckCore'
        ],
        'pckUser': [
            'pckCore'
        ],
        'pckValidate': [
            'util-passchk-fast'
        ],
        'pckUi': [
            'pckCore',
            'util-spin'
        ],
        'pckConversations': [
            'angular',
            'pckCore',
            'pckContacts',
            'pckFiles',
            'pckUi',
            'vendor/captcha/captchagen/captchagen',
            'util-base64'
        ],
        'pckFiles': [
            'pckCore',
            'vendor/filesaver/filesaver',
            'angular-resource',
            'util-base64_decode'
        ]
    },
    // kick start application
    deps: ['app']
});