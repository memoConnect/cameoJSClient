'use strict';

angular.module('cmConversations').directive('cmPasswordInput',[
    function () {
        return {
            restrict: 		'A',
            scope:			false,

            link:			function(scope, element, attrs, ngModelCtrl){

                var status = angular.element('<i></i>').addClass('fa'),
                    timeout

                element.after(status)

                scope.refresh= function(){
                    element.val()
                        ?	status.addClass('fa-lock').removeClass('fa-unlock')
                        :	status.addClass('fa-unlock').removeClass('fa-lock')
                }

                scope.refresh()
                scope.$watch('passphrase', scope.refresh)
            }

        }
    }
])