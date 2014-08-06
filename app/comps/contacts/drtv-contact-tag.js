'use strict';

angular.module('cmContacts').directive('cmContactTag',[

    'cmUserModel',

    function (cmUserModel){
        return {
            restrict: 'AE',
            require: '^cmContactsList',
            priority: 2
        }
    }
]);