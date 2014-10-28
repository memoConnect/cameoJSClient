'use strict';

angular.module('cmWidgets').directive('cmWidgetWelcome', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
]);