'use strict';

angular.module('cmCore').directive('cmTimeFormatSelect', [
    'cmSettings',
    'cmUserModel',
    function(cmSettings, cmUserModel){
        return {
            restrict: 'AE',
            scope: true,
            template: '<select ng-model="myFormat" ng-options="obj.value as obj.name for obj in timeFormat"></select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmSettings.set('timeFormat', scope.myFormat);
                });
            },

            controller: function($scope){
                $scope.timeFormat = [
                    {name:"24h", value: "HH:mm"},
                    {name:"12h", value: "h:mm a"}
                ];

                function update(){
                    $scope.myFormat = cmSettings.get('timeFormat');
                }

                update();

                cmUserModel.on('update:finished', update)
            }
        }
    }
]);