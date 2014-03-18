/**
 * Created by dutscher on 14.03.14.
 */
'use strict';

function cmFooter($location, cmTranslate){
    return {
        restrict: 'AE',
        transclude: true,

        /*
        template: '<div class="btn-group btn-group-justified">' +
                    '<a class="btn" href="#{{btn.href}}" ng-repeat="btn in btns" ng-class="{active:btn.isActive}">' +
                        '{{btn.i18n|cmTranslate}}' +
                    '</a>' +
                  '</div>'
        */
        
        link : function(scope, element, attrs, controller, transclude){

            var children = [],
                appContainer = angular.element(document.getElementById('cm-app'))


            //get child elements from transclusion:
            transclude(function(clone){
              angular.forEach(clone, function(el){
                if(el.nodeType == 1) children.push(angular.element(el))
              })
            })
            
            
            //if nothing comes through transclusion add default elements:
            if(children.length == 0 ) {
                scope.btns.forEach(function(btn){
                    children.push(
                      angular.element('<a>'+cmTranslate(btn.i18n)+'</a>')
                      .attr('href', '#'+btn.href)
                      .toggleClass('active', btn.isActive ? true : false)
                    )
                })
            }


            //append children with proper widths:
            children.forEach(function(child){
                if(!child.hasClass('full-width')) child.css('width', 100/children.length+'%')
                element.append(child)
            }) 
            
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