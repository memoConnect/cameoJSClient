'use strict';

angular.module('cmWidgets').directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
]);