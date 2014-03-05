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
        'cmLocalStorage': 'shared/cmLocalStorage',

        // cameo modules/services
        'cmAuth': 'shared/cmAuth',
        'cmCrypt': 'shared/cmCrypt',
        'cmUtil': 'shared/cmUtil',

        'cmProfile': 'comps/cmProfile',
        //'cmConversations': 'comps/conversation/conversations-module',
        //'cmContacts': 'comps/contacts/cmContacts',

        // shared
        'util-spin': 'vendor/util/spin',
        'util-base64': 'vendor/util/base64',
        'util-base64_decode': 'vendor/util/base64_decode',
        'util-passchk-fast': 'vendor/util/passchk_fast',
        // crypto
        'crypto-sjcl': 'vendor/sjcl/sjcl.min',

        'jquery': 'vendor/jquery/jquery-2.1.0'
    },

    packages: [
        {name: '_v', location: 'vendor' },
        {name: '_c', location: 'comps'  },
        {name: '_s', location: 'shared' },
//        {name: '_d', location: 'directives'}
    ],
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-translate': ['angular'],
        'angular-growl': ['angular'],
        'cmNotify': ['angular-growl'],
        'cmAuth': ['angular', 'util-base64', 'cmCrypt', 'cmApi'],
        'cmCrypt': ['angular', 'util-base64', 'crypto-sjcl', 'cmLogger'],
        'cmLocalStorage' : ['angular', 'cmLogger','cmCrypt'],
        'cmApi': ['angular', 'cmLogger'],
        'cmProfile' : ['jquery', 'angular', 'cmApi', 'cmAuth'],
        'cmLogger' : ['angular'],
        'angular-translate-loader-static-files': ['angular','angular-translate'],
        'angular-translate-storage-cookie': ['angular','angular-translate'],
        'angular-translate-storage-local': ['angular','angular-translate', 'angular-translate-storage-cookie'],
        'cmLanguage' : [
            'angular', 
            'angular-translate-loader-static-files',
            'angular-translate-storage-cookie', 
            'angular-translate-storage-local', 
            'angular-growl',
            'cmNotify',
            'cmLogger'
        ]

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


addPackage('pckFiles',{
    root: 'comps/files/files-module',
    deps: [
        'cmApi',
        'vendor/filesaver/filesaver',
        'angular-resource',
        'util-base64_decode'
        //'vendor/base64_decode'
    ],
    resources : [
        'comps/files/filesAdapter-srvc',
        'comps/files/send-ctrl',
        'comps/files/get-ctrl',
        'comps/files/file-read-drtv',
        'comps/files/upload-drtv'
    ]
})

addPackage('pckConversations',{
    root: 'comps/conversations/conversations-module',
    deps: [
        'angular',
        'cmApi', 
        'cmLogger', 
        'cmCrypt', 
        'cmAuth',
        'pckContacts',
        'vendor/captcha/captchagen/captchagen'
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

addPackage('pckContacts',{
    root: 'comps/contacts/contacts-module',
    deps: [
        'angular',
        'cmApi', 
        'cmLogger', 
        'cmUtil',
        'pckUser' 
    ],    
    resources : [
        'comps/contacts/add-external-contact-drtv',
        'comps/contacts/contact-request-list-drtv',
        'comps/contacts/contacts-list-drtv',
        'comps/contacts/contactsModel-srvc',
        'comps/contacts/contactsAdapter-srvc',
        'comps/contacts/search-cameo-identity-drtv',    
        'comps/contacts/type-chooser-drtv'
    ]
})

addPackage('pckUser',{
    root: 'comps/user/user-module',
    deps: [
        'angular',
        'cmAuth',
        'cmLocalStorage'
    ],    
    resources : [
        'comps/user/userModel-srvc',
        'comps/user/login-drtv'
    ]
})

addPackage('pckValidate',{
    root: 'comps/validate/validate-module',
    deps: [   
    ],    
    resources : [
        'comps/validate/email-drtv',
        'comps/validate/password-drtv',
        'comps/validate/phone-drtv'
    ]
})

addPackage('pckUi',{
    root: 'shared/ui/ui-module',
    deps: [
        'angular',    
        'cmAuth',
        'cmLogger',
        'util-spin'
    ],    
    resources : [
        'shared/ui/adaptive-change-drtv',  
        'shared/ui/nav-tabs-drtv',
        'shared/ui/point-spinner-drtv',
        'shared/ui/spinner-drtv'
    ]
})

require.config(config)
