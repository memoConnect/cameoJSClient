'use strict';

angular.module('cmRoutes').controller('ContactEditCtrl',[

    'cmContactsModel',
    '$routeParams', '$scope',

    function(cmContactsModel, $routeParams, $scope){
        $scope.contactId = $routeParams.id;

        $scope.contact = cmContactsModel.contacts.find($routeParams.id);

        cmContactsModel.contacts.on('register', function(event, contact){
            if(contact.id == $routeParams.id){
                $scope.contact = contact
            }
        })
    }
]);