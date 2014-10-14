'use strict';

angular.module('cmRoutes').controller('ContactEditCtrl',[
    '$routeParams', '$scope',
    function($routeParams, $scope){
        $scope.contactId = $routeParams.id
    }
]);