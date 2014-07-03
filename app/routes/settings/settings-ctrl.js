define([
    'app',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        '$rootScope',
        '$routeParams',
        '$location',
        function($scope, $rootScope, $routeParams, $location) {
            $scope.pageTitle = 'SETTINGS.WELCOME';

            $rootScope.$on('pageTitle:change',function(event, newTitle){
                $scope.pageTitle = newTitle;
            });

            $scope.mainPage = $routeParams.mainPage || '';
            $scope.subPage = $routeParams.subPage || '';

            $scope.route = $scope.mainPage+'/'+$scope.subPage;

            $scope.createNewConversation = function(){
                delete($rootScope.pendingConversation);
                $location.path('/conversation/');
            };
        }
    ]);
});