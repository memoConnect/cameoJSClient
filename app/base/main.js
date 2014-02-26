require.config({
    baseUrl: "",
    // alias libraries paths
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'app': 'base/app',
        'env': 'base/env',
        // angular library
        'angular': 'vendor/angular/angular',
        'angular-route': 'vendor/angular/angular-route',
        'angular-resource': 'vendor/angular/angular-resource',
        'angular-cookies': 'vendor/angular/angular-cookies',

        'angular-translate': 'vendor/angular-translate/angular-translate',
        'angular-translate-loader-static-files': 'vendor/angular-translate/angular-translate-loader-static-files',
        'angular-translate-storage-cookie': 'vendor/angular-translate/angular-translate-storage-cookie',
        'angular-translate-storage-local': 'vendor/angular-translate/angular-translate-storage-local',

        'angular-growl': 'vendor/angular-growl/angular-growl',

        // requirejs stuff
        'angularAMD': 'vendor/requirejs/angularAMD',
        'ngload': 'vendor/requirejs/ngload',

        // utils
        'util-base64': 'vendor/util/base64',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/sjcl/main.min',

        // global provider without AMD
        'cmApi': 'shared/api/api',
        'cmLanguage': 'shared/i18n/language',
        'cmLogger': 'shared/logger/cmLogger',
        'cmNotify': 'shared/notify/notify',

        // ??? modules
        'cmAuth': 'shared/auth/auth',
        'cmCrypt': 'shared/crypt/crypt',

        'cmProfile': 'comps/cmProfile',
        'cmConversations': 'comps/conversation/cmConversations',
        'cmContacts': 'comps/contacts/cmContacts',

        // Models
        'mUser': 'models/user-modl',
        'mContacts': 'models/contacts-modl',

        // shared
        'util': 'shared/util',

        'jquery': 'vendor/jquery/jquery-2.1.0'
//        'bootstrap': 'vendor/bootstrap/bootstrap.min',
    },
    packages: [
        {name: '_v', location: 'vendor'},
//        {name: '_s', location: 'service'},
//        {name: '_d', location: 'directives'}
    ],
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular'],
        'angular-translate-storage-cookie': ['angular'],
        'angular-translate-storage-local': ['angular'],
        'angular-growl': ['angular'],
        'cmLanguage': ['angular-translate']
//        'bootstrap': ['jquery']
    },
    // kick start application
    deps: ['app','env']
});