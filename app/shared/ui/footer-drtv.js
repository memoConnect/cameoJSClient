'use strict';

function cmFooter($location, cmTranslate){
    return {
        restrict: 'AE',        
        link : function(scope, element){
            //if element has no chrildren add default elements:
            if(element.children().length == 0 ) {
                scope.btns.forEach(function(btn){
                    var el = angular.element('<a>'+cmTranslate(btn.i18n)+'</a>');
                        el.toggleClass('active', btn.isActive ? true : false);
                        if(btn.href != '')
                            el.attr('href', '#'+btn.href);
                        else
                            el.addClass('deactivated');
                    element.append(el);
                })
            }
        },
        controller: function($scope){
            $scope.btns = [
                {i18n:'DIRV.FOOTER.TALKS',    href:'/talks'},
                {i18n:'DIRV.FOOTER.CONTACTS', href:'/contacts'},
                {i18n:'DIRV.FOOTER.MEDIA',    href:''}
            ];

            angular.forEach($scope.btns,function(btn){
                btn.isActive = $location.$$path.search(btn.href) != -1;
            });
        }
    }
}