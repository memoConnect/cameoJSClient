'use strict';

function cmContactsList(cmContactsModel, cmLogger, $rootScope){
    return {
        restrict: 'AE',
        scope: true,
        //templateUrl: 'comps/contacts/contacts-list.html',
        //template: ,

        controller: function($scope, $element, $attrs){
            $scope.isLoading            = false;
            $scope[$attrs.contactsAs]   = cmContactsModel.contacts;
            $scope.contactsQty          = cmContactsModel.contacts.length;


            cmContactsModel.on('start:load-contacts',function(){
                console.log('load-contacts start')
                $scope.isLoading = true;
            });

            cmContactsModel.on('finish:load-contacts',function(){
                console.log('load-contacts finished')
                $scope.isLoading = false;
            });
            console.log('BEFORE:')
            console.dir(cmContactsModel.contacts)

            //cmContactsModel.getAll();

            cmContactsModel.on('finish:load-contacts', function(){
                console.log('done!')
                console.log(cmContactsModel.contacts.length)
                console.log($scope[$attrs.contactsAs].length)
            });

            /**
             * handle every single contact via model
             */
            $scope.startConversation = function(id){
                cmLogger.debug('editContact '+id);
            };

            /**
             * delete contact via model
             * @param id
             */
            $scope.deleteContact = function(id){
                cmLogger.debug('deleteContact '+id);
            };

            $scope.selectContact = function(identity){
                $rootScope.$broadcast('cmContacts:selected', identity)
            };
        }
    }
}