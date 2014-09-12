'use strict';

angular.module('cmContacts').directive('cmContactList',[
    'cmContactsModel', 'cmLogger',
    '$rootScope',
    function (cmContactsModel, cmLogger,
              $rootScope) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/contacts/drtv-contact-list.html',

            controller: function ($scope, $element, $attrs) {
                $scope.isLoading    = false;

                $scope.contacts     = cmContactsModel.contacts;
                $scope.contactsQty  = cmContactsModel.contacts.length;


                cmContactsModel.on('start:load-contacts', function () {
                    $scope.isLoading = true;
                });

                cmContactsModel.on('finish:load-contacts', function () {
                    $scope.isLoading = false;
                });

                /**
                 * edit contact
                 * @param id
                 */
                $scope.editContact = function (contact) {
                    if(contact.contactType != 'pending') {
                        $rootScope.goTo('/contact/edit/' + contact.id);
                    }
                };
            }
        }
    }
]);