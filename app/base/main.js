var config = {
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

        // cameo modules/services
        'cmAuth': 'shared/cmAuth',
        'cmCrypt': 'shared/cmCrypt',
        'cmUtil': 'shared/cmUtil',
//        'cmCron': 'shared/cmCron',

        'cmProfile': 'comps/cmProfile',
        //'cmConversations': 'comps/conversation/conversations-module',
        //'cmContacts': 'comps/contacts/cmContacts',

        // shared
        'util-spin': 'vendor/util/spin',
        'util-base64': 'vendor/util/base64',
        'util-base64_decode': 'vendor/util/base64_decode',
        'util-passchk-fast': 'vendor/util/passchk_fast',

        // crypto
        'crypto-sjcl': 'vendor/crypto/sjcl/sjcl.min',
        'crypto-ats-oka': 'vendor/crypto/ats-oka/ats-oka.min',
        'crypto-jsencrypt': 'vendor/crypto/jsencrypt/jsencrypt.min',

        // ui
        'ui-bootstrap': 'vendor/ui-bootstrap/ui-bootstrap.0.10.0',
        'ui-bootstrap-tpls': 'vendor/ui-bootstrap/ui-bootstrap-tpls.0.10.0',

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

        'ui-bootstrap': ['angular'],
        'ui-bootstrap-tpls': ['angular'],

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
            'util-spin',
            'ui-bootstrap'
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
            'vendor/filesaver/filesaver',
            'angular-resource',
            'util-base64_decode'
            //'vendor/base64_decode'
        ]

//        'bootstrap': ['jquery']
    },
    // kick start application
    deps: ['app']
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

//addPackage('pckFiles',{
//    root: 'comps/files/files-module',
//    deps: [
//        'cmApi',
//        'cmLogger',
//        'cmCrypt',
//        'cmUtil',
//        'vendor/filesaver/filesaver',
//        'angular-resource',
//        'util-base64_decode'
//        //'vendor/base64_decode'
//    ],
//    resources : [
//        'comps/files/filesAdapter-srvc',
//        'comps/files/chunk-fctr',
//        'comps/files/file-fctr',
//        'comps/files/file-input-drtv',
//        'comps/files/upload-drtv',
//        'comps/files/download-drtv',
//        'comps/files/file-size-fltr'
//    ]
//})

//addPackage('pckUser',{
//    root: 'comps/user/user-module',
//    deps: [
//        'angular',
//        'cmAuth',
//        'cmUserModel',
//        'cmCrypt',
//        'cmUtil'
//    ],
//    resources : [
//        'comps/user/login-drtv',
//        'comps/user/key-pair-drtv',
//        'comps/user/user-rights-drtv'
//    ]
//})

//addPackage('pckConversations',{
//    root: 'comps/conversations/conversations-module',
//    deps: [
//        'angular',
//        'cmApi',
//        'cmLogger',
//        'cmNotify',
//        'cmCrypt',
//        'cmAuth',
//        'cmUtil',
////        'cmCron',
//        'cmUserModel',
//        'cmIdentity',
//        'pckContacts',
//        'pckFiles',
//        'pckUi',
//        '_v/captcha/captchagen/captchagen',
//        'util-base64'
//    ],
//    resources : [
//        'comps/conversations/conversationsAdapter-srvc',
//        'comps/conversations/conversationsModel-srvc',
//
//        'comps/conversations/purlModel-srvc',
//
//        'comps/conversations/conversationFactory-srvc',
//        'comps/conversations/conversationModel-srvc',
//
//        'comps/conversations/messageFactory-srvc',
//        'comps/conversations/messageModel-srvc',
//
//        'comps/conversations/recipientModel-srvc',
//
//        'comps/conversations/conversation-tag-drtv',
//        'comps/conversations/safety-level-drtv',
//        'comps/conversations/recipient-counter-drtv',
//
//        'comps/conversations/conversation-controls-drtv',
//        'comps/conversations/attachments-drtv',
//        'comps/conversations/captcha-drtv',
//        'comps/conversations/conversation-drtv',
//        'comps/conversations/password-input-drtv',
//
//        'comps/conversations/message-drtv',
//    ]
//})

//addPackage('pckContacts',{
//    root: 'comps/contacts/contacts-module',
//    deps: [
//        'angular',
//        'cmApi',
//        'cmLogger',
//        'cmUtil',
//        'cmIdentity',
////        'cmCron'
//    ],
//    resources : [
//        'comps/contacts/contactsModel-srvc',
//        'comps/contacts/contactsAdapter-srvc',
//
//        'comps/contacts/contacts-filter-controls-drtv',
//        'comps/contacts/contacts-list-drtv',
//        'comps/contacts/contact-tag-drtv',
//        'comps/contacts/contact-brief-drtv',
//        'comps/contacts/key-level-drtv',
//        'comps/contacts/search-cameo-identity-drtv',
//        'comps/contacts/type-chooser-drtv',
//
//        'comps/contacts/add-external-contact-drtv',
//        'comps/contacts/contact-request-list-drtv',
//    ]
//})

//addPackage('pckValidate',{
//    root: 'comps/validate/validate-module',
//    deps: [
//        'util-passchk-fast'
//    ],
//    resources : [
//        'comps/validate/email-drtv',
//        'comps/validate/password-drtv',
//        'comps/validate/phone-drtv'
//    ]
//})

//addPackage('pckUi',{
//    root: 'shared/ui/ui-module',
//    deps: [
//        'angular',
//        'cmAuth',
//        'cmLogger',
//        'cmLanguage',
//        'cmUserModel',
//        'util-spin',
//        'ui-bootstrap'
//    ],
//    resources : [
//        'shared/ui/package'
//    ]
//})

require.config(config);