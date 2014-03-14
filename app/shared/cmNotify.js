'use strict';

//notification, growl;     https://github.com/marcorinck/angular-growl
//wrapper
//todo: growl directive wrappen?

angular.module('cmNotify', ['angular-growl'])

.config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
    //intercept messages from Backend:
    /*
     {
     "someOtherData": {...},
     "messages": [
     {"text":"this is a server message", 		"severity": "warn"},
     {"text":"this is another server message", 	"severity": "info"},
     {"text":"and another", 						"severity": "error"}
     ]
     }
     */
    //if the backend respond with the above json 'messages' will be fetched:

    growlProvider.messagesKey("messages");
    growlProvider.messageTextKey("text");
    growlProvider.messageSeverityKey("severity");
    $httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);

    //notifications should disappear after 5 seconds
    //growlProvider.globalTimeToLive(5000);
}])
/**
 * service for cmNotify injection (wrapper for growl)
 *
 * cmNotify.error('LOGIN.INFO.404', {ttl:5000, hideGlobal:true});
 */
.service('cmNotify', [
    'growl',
    '$document',
    function (growl, $document) {

        function handleGlobalVisiblity(options){
            if(options && 'hideGlobal' in options){
                angular
                .element($document[0].querySelector('[cm-notify]'))
                .css('display',options.hideGlobal ? 'none' : null)
            }
        }

        return {
            warn: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addWarnMessage(msg, options);
            },
            info: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addInfoMessage(msg, options);
            },
            success: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addSuccessMessage(msg, options);
            },
            error: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addErrorMessage(msg, options);
            }
        }
    }
])
/**
 * directive for <div cm-notify>
 */
.directive('cmNotify', function () {
    return {
        priority: 10000,
        template: '<div growl></div>'
    }
});