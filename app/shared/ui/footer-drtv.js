/**
 * Created by dutscher on 14.03.14.
 */
'use strict';

function cmFooter($location, cmTranslate){
    return {
        restrict: 'AE',        
        
        link : function(scope, element, attrs, controller){

//          console.dir(element.children())

            //if element has no chrildren add default elements:
            if(element.children().length == 0 ) {
                scope.btns.forEach(function(btn){
                    element.append(
                        angular.element('<a>'+cmTranslate(btn.i18n)+'</a>')
                        .attr('href', '#'+btn.href)
                        .toggleClass('active', btn.isActive ? true : false)
                    )
                })
            }
            
        },
        

        controller: function($scope, $element, $attrs, $transclude){
            $scope.btns = [
                {i18n:'DIRV.FOOTER.TALKS',    href:'/talks'},
                {i18n:'DIRV.FOOTER.CONTACTS', href:'/contacts'},
                {i18n:'DIRV.FOOTER.MEDIA',    href:'/mediawall'}
            ];

            angular.forEach($scope.btns,function(btn){
                btn.isActive = $location.$$path.search(btn.href) != -1
            })
        }
    }
}