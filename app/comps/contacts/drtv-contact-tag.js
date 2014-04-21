'use strict';

angular.module('cmContacts').directive('cmContactTag',[
    function (){
        return {
            restrict: 'AE',
            require: '^cmContactsList',
            priority: 2
        }
    }
]);