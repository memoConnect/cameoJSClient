'use strict';

angular.module('cmRoutes').controller('TalksCtrl', [
    '$scope',
    'cmContextFactory',
    function($scope,cmContextFactory) {
        $scope.testContextMenu = function(){
            console.log('testContextMenu')

           cmContextFactory.create('moep')
        }
    }
]);