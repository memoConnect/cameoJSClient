require.config({
    baseUrl: "",
    urlArgs: "bust=" + '1408123048031',
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

        'angular-loading-bar': 'vendor/util/loading-bar',

        'angular-moment-wrap': 'vendor/angular-moment/angular-moment',
        'moment': 'vendor/angular-moment/moment-with-langs',
        'emoji': 'vendor/emoji/emoji',
        'fastclick': 'vendor/util/fastclick',

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
        'crypto-jsencrypt': 'vendor/crypto/jsencrypt/jsencrypt',
        'crypto-sha256': 'vendor/crypto/jsencrypt/sha256',
        'crypto-pgp': 'vendor/crypto/openpgp/openpgp',

        // packages generated via grunt task 'packages'
        'pckCore': 'packages/comps/core/package',
        'pckContacts': 'packages/comps/contacts/package',
        'pckUser': 'packages/comps/user/package',
        'pckValidate': 'packages/comps/validate/package',
        'pckUi': 'packages/comps/ui/package',
        'pckConversations': 'packages/comps/conversations/package',
        'pckFiles': 'packages/comps/files/package',
        'pckSecurityAspects': 'packages/comps/security_aspects/package',

        'pckRouteConversation': 'packages/routes/conversation/comps/package',
        'pckRouteSettings': 'packages/routes/settings/comps/package',
        'pckRouteContacts': 'packages/routes/contacts/comps/package',
        'pckRouteStart': 'packages/routes/start/comps/package'

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
        'angular-moment-wrap': ['angular','moment'],

        'angular-loading-bar': ['angular', 'angular-animate'],
        'emoji': ['angular'],

        // packages
        'pckCore': [
            'angular',
            'angular-translate',
            'angular-sanitize',
            'util-base64',
            'crypto-sjcl',
            'crypto-jsencrypt',
            'crypto-sha256'
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
            'util-spin',
            'emoji'
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
            'angular-resource',
            'util-base64_decode'
        ],
        'pckRouteSettings': [
            'pckCore'
        ],
        'pckRouteContacts': [
            'pckCore',
            'pckContacts'
        ],
        'pckRouteStart': [
            'pckCore',
            'pckUi',
            'pckUser'
        ]
    },
    // kick start application
    deps: ['app']
});