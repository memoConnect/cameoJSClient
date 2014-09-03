define([

    'app',
    'ngload!pckUser',
    'ngload!pckCore',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate',
    'ngload!pckRouteContacts',
    'ngload!pckWidgets',

], function(app){
    'use strict';

    app.register.controller('ContactListCtrl',[

        '$scope',
        '$routeParams',
        
        function($scope, $routeParams){
            // set active setion
            $scope.route = $routeParams.section || '';
        }
    ]);
});