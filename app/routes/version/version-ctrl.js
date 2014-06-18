define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('VersionCtrl',[
        '$scope','cmVersion',
        function($scope, cmVersion){
        $scope.cmVersion = cmVersion;
    }]);
});