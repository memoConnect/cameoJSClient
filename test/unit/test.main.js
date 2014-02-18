var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\.spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/js/',

    paths: {
        'app': 'base/app',
        // angular library
        'angular': 'vendor/angular/angular',
        'angular-mocks': '../../test/lib/angular/angular-mocks',
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
        'jasmine-jquery': '../../test/lib/jasmine-jquery/jasmine-jquery',

        // utils
        'util-base64': 'vendor/util/base64',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/sjcl/main.min',

        // cmModules
        'cmApi': 'cmModules/cmApi',
        'cmAuth': 'cmModules/cmAuth',
        'cmCrypt': 'cmModules/cmCrypt',
        'cmLanguage': 'cmModules/cmLanguage',
        'cmLogger': 'cmModules/cmLogger',
        'cmNotify': 'cmModules/cmNotify',
        'cmProfile': 'cmModules/cmProfile',
        'cmContacts': 'cmModules/cmContacts',

        // shared
        'util': 'shared/util'
    },

    packages: [
        {name: '_b', location: ''},
        {name: '_v', location: 'vendor'},
        {name: '_s', location: 'service'},
        {name: '_c', location: 'controller'},
        {name: '_d', location: 'directive'}
    ],

    shim: {
        'app': ['angularAMD'],

        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular'],
        'angular-translate-storage-cookie': ['angular'],
        'angular-translate-storage-local': ['angular'],
        'angular-growl': ['angular'],
        'cmLanguage': ['angular-translate'],

        'angular-mocks': ['angular'],

        'login_ctrl': ['app']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});