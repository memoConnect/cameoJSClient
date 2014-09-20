'use strict';

angular.module('cmRoutes').controller('ContactEditCtrl',[
    '$routeParams', '$scope',
    function($routeParams, $scope){
        //nothing to do here yet

        $scope.contactId = $routeParams.id
    }
]);