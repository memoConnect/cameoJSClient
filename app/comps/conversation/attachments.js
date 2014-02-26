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

    app.register.directive('cmAttachments', [
        function () {
            return {
                restrict: 'AE',
                template: '<i class="fa fa-paperclip"></i>', //MOCK

                link: function (scope, element, attrs) {
                    //mocked
                    element.css({
                        "font-size": "2em",
                        "vertical-align": "middle"
                    })
                }
            }
        }
    ]);
});