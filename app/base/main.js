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
        'angular-animate': 'vendor/angular/angular-animate',
        'angular-swipe': 'vendor/angular/angular-swipe',
        'angular-sanitize': 'vendor/angular/angular-sanitize',

        'angular-translate': 'vendor/angular-translate/angular-translate',
        'angular-growl': 'vendor/angular-growl/angular-growl',

        'angular-loading-bar': 'vendor/util/loading-bar',

        'angular-moment-wrap': 'vendor/angular-moment/angular-moment',
        'moment': 'vendor/angular-moment/moment-with-langs',

        // requirejs stuff
        'angularAMD': 'vendor/requirejs/angularAMD',
        'ngload': 'vendor/requirejs/ngload',

        // global provider without AMD
        'cmProfile': 'comps/cmProfile',

        // vendor
        'util-spin': 'vendor/util/spin',
        'util-base64': 'vendor/util/base64',
        'util-base64_decode': 'vendor/util/base64_decode',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/crypto/sjcl/sjcl.min',
        'crypto-jsencrypt': 'vendor/crypto/jsencrypt/jsencrypt.min',

        // packages generated via grunt task 'packages'
        'pckCore': 'comps/core/package',
        'pckContacts': 'comps/contacts/package',
        'pckUser': 'comps/user/package',
        'pckValidate': 'comps/validate/package',
        'pckUi': 'comps/ui/package',
        'pckConversations': 'comps/conversations/package',
        'pckFiles': 'comps/files/package',
        'pckSecurityAspects': 'comps/security_aspects/package'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-animate': ['angular'],
        'angular-swipe': ['angular'],
        'angular-translate': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-growl': ['angular'],
        'angular-moment-wrap': ['angular','moment'],

        'angular-loading-bar': ['angular', 'angular-animate'],

        // packages
        'pckCore': [
            'angular',
            'angular-growl',
            'angular-translate',
            'angular-sanitize',
            'util-base64',
            'crypto-sjcl',
            'crypto-jsencrypt'
        ],
        'pckContacts': [
            'pckCore'
        ],
        'pckSecurityAspects': [
            'angular'
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
            'pckSecurityAspects',
            'vendor/captcha/captchagen/captchagen',
            'util-base64'
        ],
        'pckFiles': [
            'pckCore',
            'vendor/filesaver/filesaver',
//            'vendor/filesaver/saveAs',
            'angular-resource',
            'util-base64_decode'
        ]
    },
    // kick start application
    deps: ['app']
});