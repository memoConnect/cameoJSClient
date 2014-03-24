'use strict';

function cmContactsList(cmContactsModel, cmLogger){
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'comps/contacts/contacts-list.html',

        controller: function($scope, $element, $attrs){
            $scope.contacts    = cmContactsModel.contacts;
            $scope.contactsQty = cmContactsModel.contacts.length;

            /**
             * handle every single contact via model
             */
            $scope.editContact = function(id){
                cmLogger.debug('editContact '+id);
            };

            /**
             * delete contact via model
             * @param id
             */
            $scope.deleteContact = function(id){
                cmLogger.debug('deleteContact '+id);
            };

            $scope.selectContact = function(id){
//                $scope.$emit('identity-selected', id)
            }
        }
    }
}