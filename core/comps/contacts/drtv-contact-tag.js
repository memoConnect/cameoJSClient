'use strict';

angular.module('cmContacts').directive('cmContactTag',[
    'cmUserModel',
    '$rootScope', '$routeParams', '$timeout',
    function (cmUserModel,
              $rootScope, $routeParams, $timeout){
        return {
            restrict: 'AE',
            scope: {
                contact: "=cmContact"
            },
            templateUrl: 'comps/contacts/drtv-contact-tag.html',
            link: function(scope, element){
                if('id' in $routeParams
                    && scope.contact
                    && scope.contact.id == $routeParams.id){
                    element.addClass('is-active');
                }
            },
            controller: function($scope){
                $scope.editContact = function () {
                    if($scope.contact.contactType != 'pending') {
                        $rootScope.goTo('/contact/' + $scope.contact.id);
                    }
                };
            }
        }
    }
]);