'use strict';

function cmContactsList(cmContactsModel, cmLogger, $rootScope){
    return {
        restrict: 'AE',
        scope: true,
        transclude: true,
        //templateUrl: 'comps/contacts/contacts-list.html',
        template: //'<div ng-show="loadingContacts" class="empty-list">'+
                    //'<cm-spinner></cm-spinner>'+
                  //'</div>'+
                  '<div ng-show="!contacts.length" class="empty-list">'+
                    '<i class="fa cm-info"></i> {{"CONTACTS.LIST_EMPTY"|cmTranslate}}'+
                  '</div>',

        link: function(scope, element, attrs, controller, transclude){

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
            cmContactsModel.on('finish:load-contacts',function(){
                $scope.loadingContacts = false;
            });
            cmContactsModel.on('start:load-contacts',function(){
                $scope.loadingContacts = true;
            });


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

            $scope.selectContact = function(identity){
                $rootScope.$broadcast('cmContacts:selected', identity)
            }
        }
    }
}