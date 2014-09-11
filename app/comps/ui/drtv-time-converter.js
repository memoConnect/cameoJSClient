'use strict';

angular.module('cmUi').directive('cmTimeConverter',[
    'cmUtil',
    function (cmUtil){
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
                $scope.format = 'dd.MM.yyyy HH:mm';
                if(typeof $scope.dateFormat != 'undefined'){
                    $scope.format = $scope.dateFormat;
                }

                switch($scope.specialType){
                    case 'conversation-tag':
                        $scope.format = 'HH:mm';

                        if(cmUtil.compareDate((new Date().getTime()), $scope.time)){
                            $scope.format = 'dd.MM.yyyy';
                        }
                        break;
                    default:
                        // date Format does not change
                }
            }
        }
    }
]);