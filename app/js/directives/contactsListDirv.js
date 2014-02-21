define([
    'app'
], function(app){
    'use strict';

    app.register.directive('cmContactsList',
    function(ModelContacts, cmLogger){
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'js/directives/contactsList.html',
            controller: function($scope, $element, $attrs){
                $scope.contacts = null;
                $scope.contactsQty = 0;

                /**
                 * Get contacts via model
                 */
                $scope.getContacts = function(){
                    ModelContacts.getAll(10,0).then(
                        function(data){
                            $scope.contacts = data;
                        },
                        function(){
                            $scope.contacts = null;
                        }
                    );
                };

                /**
                 * handle every single contact via model
                 */
                $scope.editContact = function(cameoId){
                    cmLogger.debug('editContact '+cameoId);
                    // TODO: cmApi stuff
                };

                /**
                 * delete contact via model
                 * @param cameoId
                 */
                $scope.deleteContact = function(cameoId){
                    cmLogger.debug('deleteContact '+cameoId);
                    // TODO: cmApi stuff
                };
            }
        }
    });

    return app;
});