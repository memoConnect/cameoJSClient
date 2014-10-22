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
                 * handle every single contact via model
                 */
                $scope.startConversation = function ($event,contact) {
                    $event.stopPropagation();
                    $event.preventDefault();

                    if(contact.contactType != 'pending'){
                        delete $rootScope.pendingConversation
                        if (contact.identity) {
                            $rootScope.pendingRecipients = [contact.identity]
                        } else {
                            cmLogger.error('Unable to find identity on contact. ' + contact)
                        }
                        $rootScope.goTo('/conversation/new');
                    }
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