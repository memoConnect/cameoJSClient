/**
 * Created by dutscher on 14.03.14.
 */
'use strict';

function cmFooter($location){
    return {
        restrict: 'A',
        template: '<div class="btn-group btn-group-justified">' +
                    '<a class="btn" href="#{{btn.href}}" ng-repeat="btn in btns" ng-class="{active:btn.isActive}">' +
                        '{{btn.i18n|cmTranslate}}' +
                    '</a>' +
                  '</div>',
        controller: function($scope){
            /**
             * default buttons
             * @type {*[]}
             */
            $scope.btns = [
                {i18n:'DIRV.FOOTER.TALKS',href:'/talks'},
                {i18n:'DIRV.FOOTER.CONTACTS',href:'/contacts'},
                {i18n:'DIRV.FOOTER.MEDIA',href:'/mediawall'}
            ];
            /**
             * set via location the active button
             */
            angular.forEach($scope.btns,function(btn){
                if($location.$$path.search(btn.href) != -1){
                    btn.isActive = true;
                }
            });
        }
    }
}