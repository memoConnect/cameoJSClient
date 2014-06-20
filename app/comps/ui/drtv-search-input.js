'use strict';

angular.module('cmUi').directive('cmSearchInput',[
    function(){
        return {
            restrict: 'E',
            scope: {
                search: '=ngModel'
            },
            template:   '<input type="text" value="" ng-model="search" placeholder="{{placeholder}}" data-qa="input-search">' +
                        '<i class="fa cm-search-cl"></i>',
            link: function(scope, element, attrs){
                scope.placeholder = attrs.placeholder || '';
            }
        }
    }
]);