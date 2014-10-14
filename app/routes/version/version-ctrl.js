'use strict';

angular.module('cmRoutes').controller('VersionCtrl',[
    '$scope','cmVersion',
    function($scope, cmVersion){
        $scope.cmVersion = cmVersion;
    }
]);