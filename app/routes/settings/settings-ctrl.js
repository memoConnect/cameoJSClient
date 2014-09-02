define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckValidate',
    'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        'cmUtil',
        '$scope', '$rootScope', '$routeParams', '$location',
        function(cmUtil, $scope, $rootScope, $routeParams, $location) {
            $scope.pageTitle = 'SETTINGS.WELCOME';

            $scope.pageParent = $routeParams.pageParent || '';
            $scope.pageChild1 = $routeParams.pageChild1 || '';
            $scope.pageChild2 = $routeParams.pageChild2 || '';

            var isPageChild2AnId = cmUtil.isAlphaNumeric($scope.pageChild2);

            $scope.routeSettings = $scope.pageParent +
                           ($scope.pageChild1 ? '/' + $scope.pageChild1 : '') +
                           (!isPageChild2AnId && $scope.pageChild2 ? '/' + $scope.pageChild2 : '');

            console.log('$scope.routeSettings',$scope.routeSettings)

            if($routeParams.keyId)
                $scope.routeSettings = 'identity/key'

            $scope.createNewConversation = function(){
                delete($rootScope.pendingConversation);
                $location.path('/conversation/');
            };
        }
    ]);
});