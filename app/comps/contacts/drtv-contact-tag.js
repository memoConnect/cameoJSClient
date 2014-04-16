'use strict';

angular.module('cmContacts').directive('cmContactTag',[
    '$location',
    function ($location){
        return {
            restrict: 'AE',
            require: '^cmContactsList',
            priority: 2,
        }
    }
]);