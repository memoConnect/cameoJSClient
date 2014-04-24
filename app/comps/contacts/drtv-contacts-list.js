'use strict';

angular.module('cmContacts').directive('cmContactsList',[
    'cmContactsModel',
    'cmLogger',
    '$rootScope',
    '$location',
    function (cmContactsModel, cmLogger, $rootScope, $location) {
        return {
            restrict: 'AE',
            scope: true,
            //templateUrl: 'comps/contacts/contacts-list.html',
            //template: ,

            controller: function ($scope, $element, $attrs) {
                $scope.isLoading = false;
                $scope[$attrs.contactsAs] = cmContactsModel.contacts;
                $scope.contactsQty = cmContactsModel.contacts.length;


                cmContactsModel.on('start:load-contacts', function () {
                    $scope.isLoading = true;
                });

                cmContactsModel.on('finish:load-contacts', function () {
                    $scope.isLoading = false;
                });

                //cmContactsModel.getAll();

                /**
                 * handle every single contact via model
                 */
                $scope.startConversation = function (contact) {
                    if(contact.contactType != 'pending'){
                        delete $rootScope.pendingConversation
                        if (contact.identity) {
                            $rootScope.pendingRecipients = [contact.identity]
                        } else {
                            cmLogger.error('Unable to find identity on contact. ' + contact)
                        }
                        $location.path('/conversation');
                    }
                };
                /**
                 * edit contact
                 * @param id
                 */
                $scope.editContact = function (contact) {
                    if(contact.contactType != 'pending') {
                        $location.path('/contact/' + contact.id);
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