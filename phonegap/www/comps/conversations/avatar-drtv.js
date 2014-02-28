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
], function (app) {
    'use strict';
*/    

    cmConversations.directive('cmAvatar', [
        function () {
            return {
                restrict: 'AE',
                template: '<i class="fa fa-user"></i>', //MOCK
                link: function (scope, element, attrs) {
                    //mocked, get avatar pic an set background of element
                    element.css({
                        "cssFloat": "left",
                        "font-size": "3em",
                        "vertical-align": "top",
                        "padding-right": "0.3em"
                    })
                }
            }
        }
    ]);
/*    
});
*/