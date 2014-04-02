define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('VersionCtrl',['$scope',function($scope){
        $scope.version = cameo_config.version;
    }]);
});