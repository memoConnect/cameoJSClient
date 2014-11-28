'use strict';

angular.module('cmContacts').directive('cmContactTag',[
    'cmUserModel',
    '$rootScope', '$routeParams',
    function (cmUserModel,
              $rootScope, $routeParams){
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
                $scope.isTrusted = function(contact){
                    return      contact.identity
                            &&  cmUserModel.verifyTrust(contact.identity)
                };
                /**
                 * edit contact
                 * @param id
                 */
                $scope.editContact = function (contact) {
                    if(contact.contactType != 'pending') {
                        $rootScope.goTo('/contact/' + contact.id);
                    }
                };
                /**
                 * delete contact via model
                 * @param id
                 */
                $scope.deleteContact = function (contact) {
                    cmLogger.debug('deleteContact ' + contact.id);
                };
            }
        }
    }
]);