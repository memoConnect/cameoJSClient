define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',[
        '$scope', '$routeParams',
        function($scope, $routeParams){
            // set active setion
            $scope.activeSection = $routeParams.section || 'list';
        }
    ]);
});