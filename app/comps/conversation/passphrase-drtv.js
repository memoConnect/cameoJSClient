define([
    'app',

    'cmApi',
    'cmAuth',
    'cmCrypt',
    'cmLogger',
    'cmContacts',
    'util-base64',
    'util-passchk-fast',
    '_v/captcha/captchagen/captchagen'
], function(app){
    'use strict';

    app.register.directive('cmPassphrase',[

        function() {
            return {

                restrict: 		'A',
                require:		'ngModel',
                scope:			false,

                link:			function(scope, element, attrs, ngModelCtrl){
                    //inputs with this directive will not update the scope on simple keydown-events

                    var status = angular.element('<i></i>').addClass('fa'),
                        timeout

                    element.after(status)

                    element
                        .unbind('input')
                        .unbind('keydown')
                        .on('keydown', function(){
                            window.clearTimeout(timeout)

                            timeout = window.setTimeout(function(){
                                scope.$apply(function() {
                                    scope.refresh()
                                })
                            },500)
                        })

                    scope.refresh = function(){
                        element.val()
                            ?	status.addClass('fa-lock').removeClass('fa-unlock')
                            :	status.addClass('fa-unlock').removeClass('fa-lock')

                        ngModelCtrl.$setViewValue(element.val())
                    }

                    scope.refresh()
                    scope.$watch('passphrase', scope.refresh)
                }

            }
        }
    ]);
});