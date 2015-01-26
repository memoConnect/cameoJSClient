'use strict';

angular.module('cmUi')
.directive('cmDefaultPages',[
    '$location',
    function ($location){
        return {
            restrict: 'AE',
            templateUrl: 'comps/ui/drtv-default-pages.html',
            link: function(scope){
                scope.isTalks = true;
                scope.isContacts = false;

                if($location.$$path.search('contact') != -1){
                    scope.isTalks = false;
                    scope.isContacts = true;
                } else if($location.$$path.search('talks') != -1){
                    scope.isTalks = true;
                    scope.isContacts = false;
                }
            }
        }
    }
]);