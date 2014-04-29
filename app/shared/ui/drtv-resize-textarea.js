'use strict';

angular.module('cmUi').directive('cmResizeTextarea',[
    function () {
        return {
            restrict: 'A',
            scope: false,

            link: function (scope, element, attrs) {
                // vars
                var paddingLeft = element.css('paddingLeft'),
                    paddingRight = element.css('paddingRight'),
                    threshold = 15,
                    maxRows = attrs.cmMaxRows || 2,
                    oneRowHeight = 0,
                    unit = 'px',
                    $shadow;

                /**
                 * create shadow of textarea for calcing the rows
                 */
                function createShadow(){
                    $shadow = angular.element('<div></div>').css({
                        position: 'fixed',
                        top: -10000+unit,
                        left: -10000+unit,
                        width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0)+unit,
                        'font-size': element.css('fontSize'),
                        'font-family': element.css('fontFamily'),
                        'line-height': element.css('lineHeight'),
                        'word-wrap': 'break-word'
                    });
                    element.after($shadow);
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


                    // on init get one row height
                    var shadowHeight = $shadow[0].offsetHeight;
                    if(shadowHeight == 0){
                        $shadow.html('&nbsp;');// fill to get one row
                        shadowHeight = $shadow[0].offsetHeight;

                        if(oneRowHeight == 0 ){
                            oneRowHeight = shadowHeight
                        }
                    }

                    // on init get one row height
                    element.attr('cm-rows',Math.round(shadowHeight/oneRowHeight));

                    // if maxrows isn't reached set height
                    if(shadowHeight < (oneRowHeight*2)) {
                        element.css('height', (oneRowHeight*2) + unit);
                    } else if(maxRows*oneRowHeight >= shadowHeight) {
                        element.css('height', shadowHeight + unit);
                    } else {
                        element.css('height', (maxRows*oneRowHeight) + unit);
                    }
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
]);