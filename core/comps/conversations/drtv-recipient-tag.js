'use strict';

angular.module('cmConversations').directive('cmRecipientTag',[
    'cmContactsModel',
    '$rootScope',
    function (cmContactsModel,$rootScope){
        return {
            restrict: 'AE',
            scope: {
                identity: "=cmData"
            },
            templateUrl: 'comps/conversations/drtv-recipient-tag.html'
        }
    }
]);