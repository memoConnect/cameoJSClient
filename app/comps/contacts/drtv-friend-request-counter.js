'use strict';

angular.module('cmContacts').directive('cmFriendRequestCounter', [
    'cmUserModel',
    'cmContactsModel',
    'cmEnv',
    function (cmUserModel, cmContactsModel, cmEnv) {
        return {
            restrict : 'AE',
            scope: true,
            link: function(scope, element, attrs){
                scope.counter = cmContactsModel.requests;

                console.log('Counter FR ' + scope.counter)

                element.html(scope.counter);
            }
        }
    }
]);