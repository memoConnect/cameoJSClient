'use strict';

angular.module('cmRouteSettings').directive('cmAppSettings', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-app-settings.html',
            controller: function ($scope) {

                $scope.settings = {
                    convertEmoji: true,
                    submitOnEnter: false
                };

                $scope.setEmojiSettings = function(){
                    if($scope.settings.convertEmoji !== false){
                        $scope.settings.convertEmoji = false;
                    } else {
                        $scope.settings.convertEmoji = true;
                    }
                };

                $scope.setEnterSettings = function(){
                    if($scope.settings.submitOnEnter !== false){
                        $scope.settings.submitOnEnter = false;
                    } else {
                        $scope.settings.submitOnEnter = true;
                    }
                };

            }
        }
    }
]);