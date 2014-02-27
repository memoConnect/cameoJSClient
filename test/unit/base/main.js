var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

//console.log("\nkarma loaded "+Object.keys(window.__karma__.files).length+" files:\n"+Object.keys(window.__karma__.files).join('\n')+"\n")
//console.log(""+tests.length+" specs:\n"+tests.join('\n')+"\n");

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/',

    paths: {
        'app': 'base/app',// means /base/app/base/app.js
        'env': 'base/env',
        // angular library
        'angular': 'vendor/angular/angular',
        'angular-mocks': '../test/lib/angular/angular-mocks',
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

        'jquery': 'vendor/jquery/jquery-2.1.0',
        'jasmine-jquery': '../test/lib/jasmine-jquery/jasmine-jquery',

        // utils
        'util-base64': 'vendor/util/base64',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/sjcl/main.min',

        // cmModules
        'cmApi': 'shared/api/api',
        'cmAuth': 'shared/auth/auth',
        'cmCrypt': 'shared/crypt/crypt',
        'cmLanguage': 'shared/i18n/language',
        'cmLogger': 'shared/logger/cmLogger',
        'cmNotify': 'shared/notify/notify',

        'cmProfile': 'comps/cmProfile',
        'cmConversations': 'comps/conversation/cmConversations',
        'cmContacts': 'comps/contacts/cmContacts',

        // Model
        'mContacts': 'models/contacts-modl',
        'mUser': 'models/user-modl',

		// shared
        'util': 'shared/util'
    },

    packages: [
        {name: '_b', location: ''},
        {name: '_v', location: 'vendor'}
    ],

    shim: {
        'angular-mocks': ['angular'],
        'angularAMD': ['angular'],

        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular'],
        'angular-translate-storage-cookie': ['angular'],
        'angular-translate-storage-local': ['angular'],
        'angular-growl': ['angular'],
        'cmLanguage': ['angular-translate']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});