'use strict';

angular.module('cmCore').directive('cmDateFormatSelect', [
    'cmSettings',
    'cmUserModel',
    function(cmSettings,cmUserModel){
        return {
            restrict: 'AE',
            scope: true,
            template:   '<select ng-model="myFormat">'+
                            '<option ng-repeat="item in dateFormat" value="{{item.value}}" ng-selected="myFormat == item.value">{{item.name}}</option>'+
                        '</select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmSettings.set('dateFormat', scope.myFormat);
                })
            },

            controller: function($scope){
                $scope.dateFormat = [
                    {name:"DD.MM.YYYY", value: "dd.MM.yyyy"},
                    {name:"YYYY-MM-DD", value: "yyyy-MM-dd"}
                ];

                function update(){
                    $scope.myFormat = cmSettings.get('dateFormat');
                }

                update();

                cmUserModel.on('update:finished', update)
            }
        }
    }
]);