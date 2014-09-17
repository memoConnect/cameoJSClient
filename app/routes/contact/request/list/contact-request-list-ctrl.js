define([

    'app',
    'ngload!pckUser',
    'ngload!pckCore',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate',
    'ngload!pckWidgets',

], function(app){
    'use strict';

    app.register.controller('RequestListCtrl',[

        '$scope',
        '$routeParams',
        
        function($scope, $routeParams){
            // set active setion
            $scope.route = $routeParams.section || '';
        }
    ]);
});