'use strict';

angular.module('cmContacts').directive('cmContactSearchTag',[
    'cmUserModel',
    '$rootScope', '$routeParams', '$timeout',
    function (cmUserModel,
              $rootScope, $routeParams, $timeout){
        return {
            restrict: 'AE',
            scope: {
                contact: "=cmContact"
            },
            templateUrl: 'comps/contacts/drtv-contact-search-tag.html'
        }
    }
]);