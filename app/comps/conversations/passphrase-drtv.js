/*
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
*/    
    'use strict';


    function cmPassphrase() {
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
/*
});
*/