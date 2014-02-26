define([
    'app',
    'cmLogger',
    'mContacts'
], function(app){
    'use strict';

    app.register.directive('cmContactsList',
        function(ModelContacts, cmLogger){
            return {

                restrict: 'AE',
                scope: {},
                templateUrl: 'comps/contacts/contacts-list.html',

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

                    $scope.selectIdentity = function(identityId){
                        $scope.$emit('identity-selected', identityId)
                    }
                }
            }
        }
    );

    return app;
});