define([
    'app',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckValidate',
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

            $scope.pageParent = $routeParams.pageParent || '';
            $scope.pageChild1 = $routeParams.pageChild1 || '';
            $scope.pageChild2 = $routeParams.pageChild2 || '';

            $scope.route = $scope.pageParent +
                           ($scope.pageChild1 ? '/' + $scope.pageChild1 : '') +
                           ($scope.pageChild2 ? '/' + $scope.pageChild2 : '');

            $scope.createNewConversation = function(){
                delete($rootScope.pendingConversation);
                $location.path('/conversation/');
            };
        }
    ]);
});