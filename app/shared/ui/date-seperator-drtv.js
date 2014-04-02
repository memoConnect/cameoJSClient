function cmDateSeperator(){
    return{
        restrict: 'AE',
        transclude: true,
        template: '<div class="date-seperator" cm-rubber-space>'+
                    '<div class="line" cm-weight="1"></div>'+
                    '<div class="date" cm-weight="3" ng-transclude></div>'+
                    '<div class="line" cm-weight="1"></div>'+
                  '</div>'
    }
}