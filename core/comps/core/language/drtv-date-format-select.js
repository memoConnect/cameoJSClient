'use strict';

angular.module('cmCore').directive('cmDateFormatSelect', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'AE',
            scope: true,
            template: '<select ng-model="myFormat" ng-options="obj.value as obj.name for obj in dateFormat"></select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmSettings.set('dateFormat', scope.myFormat);
                })
            },

            controller: function($scope){
                $scope.myFormat = cmSettings.get('dateFormat');

                $scope.dateFormat = [
                    {name:"DD.MM.YYYY", value: "dd.MM.yyyy"},
                    {name:"YYYY-MM-DD", value: "yyyy-MM-dd"}
                ];

                $scope.timeFormat = {
                    "24h": "HH:mm",
                    "12h": "h:mm a"
                };
            }
        }
    }
]);