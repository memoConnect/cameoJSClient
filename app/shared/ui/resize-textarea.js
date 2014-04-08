'use strict';

function cmResizeTextarea() {
    return {
        restrict: 'A',
        scope: false,

        link: function (scope, element, attrs) {
            // vars
            var minHeight = element[0].offsetHeight,
                paddingLeft = element.css('paddingLeft'),
                paddingRight = element.css('paddingRight'),
                threshold = 10,
                maxRows = attrs.cmMaxRows || 2,
                oneRowHeight = 0,
                $shadow;

            /**
             * create shadow of textarea for calcing the rows
             */
            function createShadow(){
                $shadow = angular.element('<div></div>').css({
                    position: 'fixed',
                    top: -10000,
                    left: -10000,
                    width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
                    fontSize: element.css('fontSize'),
                    fontFamily: element.css('fontFamily'),
                    lineHeight: element.css('lineHeight'),
                    resize: 'none'
                });

                angular.element(document.body).append($shadow);
            }

            /**
             * update for textarea input
             */
            function update(){
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i++) {
                        r += string;
                    }
                    return r;
                }

                var val = element.val().replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
                $shadow.html(val);
                // calc new height for textarea
                var newHeight = Math.max($shadow[0].offsetHeight + threshold , minHeight);
                // default are two rows of a textarea that we are divide through 2
                if(oneRowHeight == 0){
                    oneRowHeight = newHeight/2
                }
                // if maxrows isn't reached set height
                if(maxRows*oneRowHeight > newHeight)
                    element.css('height', newHeight+'px');
            }

            /**
             * at cursor position inserter
             * @param el
             * @param text
             */
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

            // style textarea
            element.css({
                "overflow": "hidden",
                "resize": "none"
            });

            // event binding
            element.on('keyup redo undo keypress change', update);
            element.on('keydown', function(event){
                if (event.which == 9) {
                    insertTextAtCursor(this, '\t');
                    return(false)
                }
                return true;
            });

            // init
            createShadow();
            update();
        }
    }
}