'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmDateSeperator
 * @description
 * Especially for Timestamp to seperate messages in days.
 *
 * @restrict E
 * @requires cmUi.directive:cmRubberSpace
 *
 * @example
 <example module="cmDemo">
    <file name="style.css">
        cm-date-seperator {display:block}
        cm-date-seperator .date-seperator{position:relative}
        cm-date-seperator .date-seperator div{display:inline-block}
        cm-date-seperator .date{color:#fff;background:#000;text-align:center}
        cm-date-seperator .line{background:#000;height:1px;vertical-align:middle}
    </file>
    <file name="script.js">
        angular.module('cmDemo', ['cmUi'])
        .controller('Ctrl', function ($scope) {
            var now = new Date().getTime();
            $scope.timestamp = now;
        });
    </file>
    <file name="index.html">
        <div ng-controller="Ctrl">
            <cm-date-seperator>{{timestamp-timestamp | date:'dd.MM.yyyy'}}</cm-date-seperator>
            message 1234
            <cm-date-seperator>{{timestamp | date:'dd.MM.yyyy'}}</cm-date-seperator>
            message 5678
            <cm-date-seperator>{{timestamp+timestamp | date:'dd.MM.yyyy'}}</cm-date-seperator>
        </div>
    </file>
 </example>
 */

angular.module('cmUi').directive('cmDateSeperator',[
    'cmUtil',
    function (cmUtil){
        return{
            restrict: 'E',
            scope: {
                timestampCurrent: '=cmTimestamp',
                timestampPrev: '=cmTimestampPrev'
            },
            template: //'{{"current: "+timestampCurrent+" prev: "+timestampPrev}}'+
                      '<div ng-if="compareDate()" class="date-seperator" cm-rubber-space>'+
                        '<div class="line" cm-weight="1"></div>'+
                        '<div class="date" cm-weight="3">'+
                          '<cm-time-converter cm-timestamp="timestampCurrent" cm-special-type="date-seperator"></cm-time-converter>'+
                        '</div>'+
                        '<div class="line" cm-weight="1"></div>'+
                      '</div>',
            controller: function($scope, $element){
                /**
                 * compare date for date-seperator
                 * @param currentDate
                 * @param prevDate
                 * @returns {boolean}
                 */

                $scope.compareDate = function() {
                    return !$scope.timestampPrev || cmUtil.compareDate($scope.timestampCurrent, $scope.timestampPrev);
                };
            }
        }
    }
]);