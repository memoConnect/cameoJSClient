/**
 * Created by dutscher on 16.03.14.
 */
'use strict';

function cmHeaderBack($window){
    return {
        scope: true,
        template: '<i class="fa cm-left"></i>'+
                    '<span ng-if="pageTitle">{{pageTitle}}</span>',
        controller: function($scope, $element, $attrs){

            $scope.pageTitle = '';
            if('pageTitle' in $attrs){
                $scope.pageTitle = $scope.$eval($attrs.pageTitle);
            }

            $element.bind('click', function(){
                $window.history.back();
            });
        }
    }
}