define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate',
    'ngload!pckCore',
    'ngload!pckUser',
    'ngload!pckWidgets'

], function(app){
    'use strict';

    app.register.controller('ContactEditCtrl',
        '$routeParams', '$scope',
        function($routeParams, $scope){
            //nothing to do here yet

            $scope.contactId = $routeParams.id
        }
    );
});
