define([
    'app',
    'mUser'
], function(app){
    'use strict';

    app.register.controller('PurlCtrl',[
        '$scope',
        '$routeParams',
        'ModelUser',
        function($scope, $routeParams,ModelUser){
            console.log($routeParams)
        }
    ]);
});