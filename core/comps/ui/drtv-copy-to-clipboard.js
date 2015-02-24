'use strict';

/**
 *
 <ANY
    cm-copy-to-clipboard="path-to-model,PATH.I18N.STRING"
    cm-copy-to-clipboard="message.text,DRTV.MESSAGE.COPIED"
 >
 *
 */

angular.module('cmUi')
.directive('cmCopyToClipboard',[
    'cmClipboard', 'cmDevice',
    '$filter', '$parse', '$window',
    function (cmClipboard, cmDevice,
              $filter, $parse, $window){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // all none devices and none ios device use native selection
                if(!cmDevice.isApp() || cmDevice.isApp() && !cmDevice.isiOS()){
                    element.addClass('is-selectable is-selectable-all');
                    return false;
                }

                var context = attrs.cmCopyToClipboard.split(','),
                    hammer;

                function onLongTap(){
                    var string = $parse(context[0])(scope),
                        i18nToastMsg = $filter('cmTranslate')(context[1]);

                    element.addClass('is-copied');

                    $window.setTimeout(function(){
                        element.removeClass('is-copied');
                    },2000);

                    cmClipboard.copy(string, i18nToastMsg);
                }

                if(typeof Hammer === 'undefined' || !$window.addEventListener) {
                    // fallback to mouse events where appropriate
                    element.bind('dblclick', onLongTap);

                    scope.$on('$destroy', function(){
                        element.off('dblclick', onLongTap);
                    });
                    return;
                }

                if(!(hammer = element.data('hammer'))) {
                    hammer = Hammer(element[0]);
                    element.data('hammer', hammer);
                }

                hammer.on('press', onLongTap);

                scope.$on('$destroy', function(){
                    hammer.off('press', onLongTap);
                });
            }
        }
    }
]);