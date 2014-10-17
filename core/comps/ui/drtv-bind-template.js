'use strict';

angular.module('cmUi')
.directive('cmBindTemplate',[

    '$compile',

    function cmBindTemplate($compile){
        return {
            restrict:       'A',

            link:       function(scope, element, attrs){

                            if(attrs.replace){
                                element.replaceWith( $compile(scope.$eval(attrs.cmBindTemplate))(scope) )
                            }else{
                                element.append($compile('<div>'+ scope.$eval(attrs.cmBindTemplate) +'</div>')(scope) )
                            }

                        }
        }
    }
])