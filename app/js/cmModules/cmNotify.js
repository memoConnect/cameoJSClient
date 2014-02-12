define([

    'angularAMD',
    'app'

], function () {
    'use strict';

    //notification, growl;     https://github.com/marcorinck/angular-growl
    //wrapper
    //todo: growl directive wrappen?

    var cmNotify = angular.module('cmNotify', ['angular-growl']);

    cmNotify.config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
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
    }]);

    cmNotify.service('cmNotify', [
        'growl',
        function (growl) {
            return {
                warn: function (msg, options) {
                    growl.addWarnMessage(msg, options);
                },
                info: function (msg, options) {
                    growl.addInfoMessage(msg, options);
                },
                success: function (msg, options) {
                    growl.addSuccessMessage(msg, options);
                },
                error: function (msg, options) {
                    growl.addErrorMessage(msg, options);
                }
            }
        }
    ]);

    cmNotify.directive('cmNotify', function () {
        return {
            priority: 10000,
            template: '<div growl></div>'
        }
    });

    return cmNotify;
});
