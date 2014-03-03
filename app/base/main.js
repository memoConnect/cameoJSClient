var config = {
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

        // global provider without AMD
        'cmApi': 'shared/cmApi',
        'cmUi': 'shared/ui/ui-module',
        'cmLanguage': 'shared/i18n/language',
        'cmLogger': 'shared/cmLogger',
        'cmNotify': 'shared/cmNotify',

        // cameo modules/services
        'cmAuth': 'shared/cmAuth',
        'cmCrypt': 'shared/cmCrypt',
        'cmUtil': 'shared/cmUtil',

        'cmProfile': 'comps/cmProfile',
        //'cmConversations': 'comps/conversation/conversations-module',
        'cmContacts': 'comps/contacts/cmContacts',

        // Models
        'mUser': 'models/user-modl',
        'mContacts': 'comps/contacts/contacts-modl',

        // shared
        'util-base64': 'vendor/util/base64',
        'util-passchk-fast': 'vendor/util/passchk_fast',
        // crypto
        'crypto-sjcl': 'vendor/sjcl/sjcl.min',

        'jquery': 'vendor/jquery/jquery-2.1.0'
//        'bootstrap': 'vendor/bootstrap/bootstrap.min',
    },

    packages: [
        {name: '_v', location: 'vendor'}
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
        'cmLanguage': ['angular-translate'],
        'cmNotify': ['angular-growl']
//        'bootstrap': ['jquery']
    },
    // kick start application

    deps: ['env','app']
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
        'cmAuth',
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





console.dir(config)

require.config(config)

