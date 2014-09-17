'use strict';

angular.module('cmUi').directive('cmTimeConverter',[
    'cmSettings',
    'cmUtil',
    function (cmSettings, cmUtil){
        return {
            restrict: 'AE',
            scope: {
                timestamp: '=cmTimestamp',
                dateFormat: '=cmDateFormat',
                specialType: '=cmSpecialType'
            },
            template: '<span>{{time | date: format}}</span>',
            controller: function($scope){
                /**
                 * Set Time
                 */
                if(typeof $scope.timestamp != 'undefined'){
                    var d = new Date($scope.timestamp);
                } else {
                    var d = new Date()
                }
                $scope.time = d;

                /**
                 * Set default Date Format
                 */
                //$scope.format = 'dd.MM.yyyy HH:mm';
                $scope.format = cmSettings.get('dateFormat') + ' ' + cmSettings.get('timeFormat');
                if(typeof $scope.dateFormat != 'undefined'){
                    $scope.format = $scope.dateFormat;
                }

                switch($scope.specialType){
                    case 'conversation-tag':
                        $scope.format = cmSettings.get('timeFormat');

                        if(cmUtil.compareDate((new Date().getTime()), $scope.time)){
                            $scope.format = cmSettings.get('dateFormat');
                        }
                        break;
                    default:
                        // date Format does not change
                }
            }
        }
    }
]);