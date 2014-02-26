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

    app.register.directive('cmMessageInput', [
        function () {
            return {

                restrict: 'A',
                require: '^cmConversation',
                scope: false,

                link: function (scope, element, attrs) {

                    element.css({
                        "overflow": "hidden",
                        "resize": "none"
                    })

                    function resize() {
                        var ta = element[0]

                        while (
                            ta.rows > 1 &&
                                ta.scrollHeight < ta.offsetHeight
                            ) {
                            ta.rows--
                        }
                        var h = 0;
                        while (ta.scrollHeight > ta.offsetHeight && h !== ta.offsetHeight) {
                            h = ta.offsetHeight
                            ta.rows++
                        }
                        ta.rows++
                    }

                    element.on('keyup redo undo change', function () {
                        resize()
                    })

                    function insertTextAtCursor(el, text) {
                        var val = el.value, endIndex, range;
                        if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
                            endIndex = el.selectionEnd;
                            el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
                            el.selectionStart = el.selectionEnd = endIndex + text.length;
                        } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
                            el.focus();
                            range = document.selection.createRange();
                            range.collapse(false);
                            range.text = text;
                            range.select();
                        }
                    }

                    element.on('keydown', function (event) {
                        if (event.which == 9) {
                            insertTextAtCursor(this, '\t')
                            return(false)
                        }
                    })


                    resize()
                }

            }
        }
    ])
});