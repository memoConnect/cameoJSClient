'use strict';

function cmContactsList(cmContactsModel, cmLogger, $rootScope){
    return {
        restrict: 'AE',
        scope: true,
        transclude: true,
        //templateUrl: 'comps/contacts/contacts-list.html',
        template: '<div ng-show="isLoading" class="empty-list">'+
                    '<cm-spinner></cm-spinner>'+
                  '</div>{{loadingSchmu}}'+
                  '<div ng-show="!contacts.length && !isLoading" class="empty-list">'+
                    '<i class="fa cm-info"></i> {{"CONTACTS.LIST_EMPTY"|cmTranslate}}'+
                  '</div>',

        link: function(scope, element, attrs, controller, transclude){
y
            function refresh() { 
                scope.contacts.forEach(function(contact){
                    var child_scope = scope.$new()

                    child_scope[attrs.contactsAs] = contact

                    transclude(child_scope, function(clone){
                        element.append(clone)
                    })
                })
            }

            scope.$watchCollection('contacts', refresh)
        },

        controller: function($scope, $element, $attrs){
            $scope.isLoading = false;

            cmContactsModel.on('finish:load-contacts',function(){
                console.log('finsih')
                $scope.isLoading = false;
            });

            $scope.contacts = cmContactsModel.contacts;
            $scope.contactsQty = cmContactsModel.contacts.length;

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
            }
        }
    }
}