'use strict';

//notification, growl;     https://github.com/marcorinck/angular-growl
//wrapper
//todo: growl directive wrappen?

angular.module('cmCore')
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
    '$rootScope',
    'growl',
    '$document',
    function ($rootScope, growl, $document) {

        var notifications = [];

        /**
         * hide/show all cm-notify arround a modal
         * @param options
         */

        function handleGlobalVisiblity(options){
            if(options && 'hideGlobal' in options){
                angular
                .element($document[0].querySelector('[cm-notify]'))
                .css('display',options.hideGlobal ? 'none' : null)
            }
        }

        // watch push and delete
        $rootScope.$on('growlMessage', function(event, message, isDeleteEvent){
            if(isDeleteEvent != undefined)
                notifications = message
            else
                notifications.push(message)
            $rootScope.$broadcast('cmNotify:update')
        });

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
            },
            getNotifications: function(){
                return notifications
            }
        }
    }
])

// TODO link to drtv's:
// drtv-contact-request-list.js:36

/**
 * directive for <div cm-notify>
 */
.directive('cmNotify', function () {
    return {
        priority: 10000,
        template: '<div growl></div>'
    }
})

.directive('cmNotifySignal', [
    '$rootScope',
    'cmNotify',
    function ($rootScope, cmNotify) {
        return {
            restrict: 'E',
            template: '<i class="fa" ng-class="{\'cm-notification-on cm-orange\': unreadNotifications, \'cm-notification\' : !unreadNotifications}" ng-hide="!unreadNotifications"></i>',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.unreadNotifications = cmNotify.getNotifications().length > 0;

                console.log('controller')

                $scope.$on('cmNotify:update', function(event){
                    console.log('notfiy signal event');
                    $scope.unreadNotifications = cmNotify.getNotifications().length > 0;
                });
            }
        }
    }
]);