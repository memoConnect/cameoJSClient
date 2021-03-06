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
                specialType: '@cmSpecialType'
            },
            template: //'{{"time: "+time +" date: "+format}}'+
                      '<span ng-if="time > 0" class="is-selectable">{{time | date: format}}</span>',
            controller: function($scope){

                function update(){
                    /**
                     * Set Time
                     */
                    if(typeof $scope.timestamp != 'undefined'){
                        var d = new Date(parseInt($scope.timestamp));
                    } else {
                        var d = new Date()
                    }
                    $scope.time = d;

                    /**
                     * Set default Date Format
                     */
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
                        case 'date-seperator':
                            $scope.format = cmSettings.get('dateFormat');
                            break;
                        default:
                        // date Format does not change
                    }

                    if(typeof $scope.format == 'object'){
                        $scope.format = 'dd.MM.yyyy - HH:mm';
                    }
                }

                $scope.$watch('timestamp',function(){
                    update();
                });

                update();
            }
        }
    }
]);