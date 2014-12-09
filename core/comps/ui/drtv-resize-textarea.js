'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmResizeTextarea
 * @description
 * Max col controleld textarea that resize on user input
 *
 * @restrict A
 * @element textarea
 * @requires $timeout
 *
 * @example
 <example module="cmDemo">
    <file name="style.css">
     textarea[cm-resize-textarea] {
      resize: none;
      word-wrap: break-word;
      transition: 0.05s;
      -moz-transition: 0.05s;
      -webkit-transition: 0.05s;
      -o-transition: 0.05s;
      background-image: none;
      border: solid 0.1rem #cccccc !important;
    }
    </file>
     <file name="script.js">
        angular.module('cmDemo', ['cmUi'])
        .controller('Ctrl', function ($scope) {
            $scope.model = 'moep moep';
            $scope.modelLong = 'moep moep mopeppppppppppppppppppppppppppppppefpepfp ppfepfpepfpefpp dp sdpfpsdpfpsd fpspdfp';
        });
     </file>
     <file name="index.html">
         <div ng-controller="Ctrl">
            default:<br />
            <textarea cm-resize-textarea ng-model="model"></textarea>
            <br />
            max rows 4:<br />
            <textarea cm-resize-textarea ng-model="modelLong" cm-max-rows="4"></textarea>
         </div>
     </file>
 </example>
 */

angular.module('cmUi').directive('cmResizeTextarea',[
    '$timeout',
    '$rootScope',
    function ($timeout, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // vars
                var paddingLeft, paddingRight,
                    maxRows = attrs.cmMaxRows || 2,
                    shadowRowHeight = 0,
                    textAreaRowHeight = 0,
                    diffRowHeight = 0,
                    unit = 'px',
                    shadow = null;

                /**
                 * create shadow of textarea for calcing the rows
                 */
                function createShadow(){

                    var paddginLeft = element.css('paddingLeft'),
                        paddingRight = element.css('paddingRight'),
                        width = element[0].offsetWidth;

                    if(width == 0)
                        width = parseInt(element.css('width'));

                    shadow = angular.element('<div class="textarea-shadow"></div>').css({
                        position: 'fixed',
                        top: -10000+unit,
                        left: -10000+unit,
//                        top: 0,
//                        left: 0,
                        width: width - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0)+unit,
                        'font-size': element.css('fontSize'),
                        'font-family': element.css('fontFamily'),
                        'line-height': element.css('lineHeight'),
                        'word-wrap': 'break-word'
                    });
                    element.after(shadow);
                }

                /**
                 * update for textarea input
                 */
                function update(){

                    if(shadow === null)
                        createShadow();
                    if (shadow === null)
                        return;

                    // replace function for white spaces
                    var times = function(string, number){
                        for (var i = 0, r = ''; i < number; i++) r += string;
                        return r;
                    };
                    // set textarea value to shadow
                    var val = element.val().replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/&/g, '&amp;')
                        .replace(/\n$/, '<br/>&nbsp;')
                        .replace(/\n/g, '<br/>')
                        .replace(/\s{2,}/g, function(space) {
                            return times('&nbsp;', space.length - 1) + ' '
                        });

                    shadow.html(val);

                    // on init get one row height
                    var shadowHeight = shadow[0].offsetHeight,
                        hasNewLines = scope.text ? scope.text.split(/\r\n|\r|\n/g) : [];

                    // on init get one row height
                    if(shadowHeight > 0 && shadowRowHeight == 0 && hasNewLines.length > 0){
                        shadowRowHeight = shadowHeight / hasNewLines.length;
                    } else if(shadowHeight > 0 && shadowRowHeight == 0){
                        shadowRowHeight = shadowHeight;
                        diffRowHeight = textAreaRowHeight-shadowHeight;
                    }

                    // handle textarea height
                    if(shadowRowHeight > 0) {
                        // one line
                        if (shadowHeight < shadowRowHeight) {
                            element.css('height', (shadowRowHeight + diffRowHeight) + unit);
                            element.attr('rows', 1);
                            element.css('overflow', 'hidden');
                        // under max rows
                        } else if (maxRows * shadowRowHeight >= shadowHeight) {
                            element.css('height', (shadowHeight + diffRowHeight) + unit);
                            element.css('overflow', 'hidden');
                            element.attr('rows', Math.round(shadowHeight/shadowRowHeight));
                        // max rows
                        } else {
                            element.css('height', (maxRows * shadowRowHeight + diffRowHeight) + unit);
                            element.css('overflow', 'auto');
                            element.attr('rows', maxRows);
                        }

                        $rootScope.$broadcast('textArea:resize',element.css('height'));
                    }
                }

                /**
                 * at cursor position inserter
                 * @param el
                 * @param text
                 */
                function insertTextAtCursor(el, text) {
                    var val = el.value, endIndex, range;
                    if (typeof el.selectionStart != 'undefined' && typeof el.selectionEnd != 'undefined') {
                        endIndex = el.selectionEnd;
                        el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
                        el.selectionStart = el.selectionEnd = endIndex + text.length;
                    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
                        el.focus();
                        range = document.selection.createRange();
                        range.collapse(false);
                        range.text = text;
                        range.select();
                    }
                }

                // style textarea
                element
                    .css({
                        'overflow': 'hidden',
                        'resize': 'none'
                    })
                    .attr('rows',1);

                // find one row height for rows setting
                textAreaRowHeight = parseInt(element.css('height')||0);
                if(textAreaRowHeight == 0)
                    textAreaRowHeight = element[0].offsetHeight;

                // event binding
                element.on('keyup', update);
                element.on('redo', update);
                element.on('undo', update);
                element.on('keypress', update);
                element.on('change', update);
                element.on('keydown', function(e){
                    // on tab
                    if (e.keyCode == 9) {
                        insertTextAtCursor(this, '\t');
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    return true;
                });

                // watch on ngModel for extern changes
                var timeoutWatch = null;
                scope.$watch(attrs.ngModel,function(newValue){
                    if(newValue == ''){
                        if(timeoutWatch != null)
                            $timeout.remove(timeoutWatch);
                        timeoutWatch = $timeout(function(){
                            update();
                            timeoutWatch = null;
                        },50);
                    }
                });

                // init first row hack
                element.val('&nbsp;');
                update();
                // clear because one row calced
                element.val('');
                update();
            }
        }
    }
]);