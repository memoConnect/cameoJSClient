var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

console.log("\nkarma loaded "+Object.keys(window.__karma__.files).length+" files:\n"+Object.keys(window.__karma__.files).join('\n')+"\n")
//console.log(""+tests.length+" specs:\n"+tests.join('\n')+"\n");
//console.log(""+tests.length);

var config = {
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
        'ngload': '../test/lib/requirejs/ngload',

        'jquery': '../test/lib/jquery/jquery-2.1.0',
        'jasmine-jquery': '../test/lib/jasmine-jquery/jasmine-jquery',

        // cmModules / services
        'cmApi': 'shared/cmApi',
        'cmAuth': 'shared/cmAuth',
        'cmCrypt': 'shared/cmCrypt',
        'cmLanguage': 'shared/i18n/language',
        'cmLogger': 'shared/cmLogger',
        'cmNotify': 'shared/cmNotify',
        'cmLocalStorage': 'shared/cmLocalStorage',
        'cmUtil': 'shared/cmUtil',

        'cmProfile': 'comps/cmProfile',
        'cmConversations': 'comps/conversation/cmConversations',
        'cmContacts': 'comps/contacts/cmContacts',
        'cmContactsCtrl': 'routes/contacts/contacts-ctrl',

        // Model
        'mContacts': 'comps/contacts/contacts-modl',
        'mUser': 'models/user-modl',

        // utils
        'util-base64': 'vendor/util/base64',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/sjcl/sjcl.min'
    },

    packages: [
        {name: '_b', location: ''},
        {name: '_v', location: 'vendor'}
    ],

    shim: {
        'angular-mocks': ['angular'],
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],

        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular'],
        'angular-translate-storage-cookie': ['angular'],
        'angular-translate-storage-local': ['angular'],
        'angular-growl': ['angular'],
        'cmLanguage': ['angular-translate'],
        'cmNotify': ['angular-growl']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
}



function addPackage(package_name, package) {
    config.paths[package_name] = package.root
    config.shim[package_name]  = config.shim[package_name] || []

    package.resources.forEach(function(value, index){
        config.paths[package_name+'-'+index] = package.resources[index]
        config.shim[package_name+'-'+index] = package.deps        
        config.shim[package_name].push(package_name+'-'+index)        
    })
}



addPackage('pckConversations',{
    root: 'comps/conversations/conversations-module',
    deps: [
        'angular',
        'cmApi', 
        'cmLogger', 
        'cmCrypt', 
        //'cmAuth',
        'cmContacts',
        '_v/captcha/captchagen/captchagen'
    ],    
    resources : [
       'comps/conversations/conversationsAdapter-srvc',
       'comps/conversations/conversationsModel-srvc',
       'comps/conversations/attachments-drtv',
       'comps/conversations/avatar-drtv',
       'comps/conversations/captcha-drtv',
       'comps/conversations/conversation-drtv',
       'comps/conversations/conversation-input-drtv',
       'comps/conversations/passphrase-drtv',
       'comps/conversations/message-drtv' 
    ]
})


addPackage('pckUi',{
    root: 'shared/ui/ui-module',
    deps: [
        'angular'        
    ],    
    resources : [
        'shared/ui/adaptive-change-drtv'  
    ]
})



require.config(config)
