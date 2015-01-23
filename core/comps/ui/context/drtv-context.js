'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmContext
 * @description
 * directive for an tag that should have a tap (click) function for example goto detail
 * and have a longtap (press) function for a action like remove or something like that
 *
 * @params model (object) reference to object
 * @params type (string) type constant
 * @params tap (function) callback for tap (click) e.x. tap:setState('goto /talks/'+conversation.id)
 * @params longTap (function) callback for longtap (press) e.x. longTap:setState('longTab '+$context.type)}
 *
 * @restrict A
 * @requires $parse
 * @requires $window
 * @requires Hammer
 *
 * @example
 <example module="cmDemo">
    <file name="style.css">
        .whoop{padding:10px;background:#fff}
    </file>
    <file name="script.js">
         angular
         .module('cmDemo', ['cmUi'])
         .controller('Ctrl', function ($scope){
            $scope.conversation = {id:1123};

            $scope.state = '';
            $scope.setState = function(log){
                $scope.state += log +'\n';
            }
        })

    </file>
         <file name="index.html">
             <div ng-controller="Ctrl">
                 <div cm-context="{
                      model:conversation,
                      type:'cmContextTest conversation',
                      tap:setState('goto /conversation/'+conversation.id),
                      longTap:setState('longTab '+$context.type)
                    }" class="whoop">
                 cmContextTest conversation
                 </div>

                 <div cm-context="{model:conversation,type:'cmContextTest talks',tap:setState('goto /talks/'+conversation.id),longTap:setState('longTab '+$context.type)}" class="whoop">
                 cmContextTest talks
                 </div>

                 <pre>{{state}}</pre>
             </div>
         </file>
     </example>

*/

angular.module('cmUi')
.directive('cmContext',[
    'cmContextFactory',
    '$parse', '$window',
    function (cmContextFactory,
        $parse, $window){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var contextData = attrs.cmContext,
                    hammer;

                function getContext(){
                    return {
                        model: getOption('model')(scope),
                        type: getOption('type')()
                    }
                }

                function getOption(type){
                    var matches = contextData.match('('+type+'):([0-9a-zA-Z\\(\\)/"\'+\\.$ ]+,{.+\\)|[0-9a-zA-Z\\(\\)/"\'+\\.$ ]+)'),
                        value = undefined;

                    if(matches && matches.length > 2)
                        value = $parse(matches[2]);


                    return value || undefined;
                }

                function onTap(event){
                    event.preventDefault();
                    var context = getContext(),
                        callback = getOption('tap');

                    scope.$apply(function(){
                        if(typeof callback != 'undefined'){
                            callback(scope, {$event: event, $context: context});
                        }
                    });
                }

                function onLongTap(event){
                    event.preventDefault();
                    var context = getContext(),
                        callback = getOption('longTap');

                    scope.handleLongTap(context);

                    scope.$apply(function(){
                        if(typeof callback != 'undefined'){
                            callback(scope, {$event: event, $context: context});
                        }
                    });
                }

                if (typeof Hammer === 'undefined' || !$window.addEventListener) {
                    // fallback to mouse events where appropriate
                    element.bind('click', onTap);
                    element.bind('dblclick', onLongTap);

                    scope.$on('$destroy', function(){
                        element.off('click', onTap);
                        element.off('dblclick', onLongTap);
                    });
                    return;
                }

                if (!(hammer = element.data('hammer'))) {
                    hammer = Hammer(element[0]);
                    element.data('hammer', hammer);
                }

                hammer.on('tap', onTap);
                hammer.on('press', onLongTap);

                scope.$on('$destroy', function(){
                    hammer.off('tap', onTap);
                    hammer.off('press', onLongTap);
                });
            },
            controller: function($scope){
                $scope.handleLongTap = function(context){
                    console.log('handleLongTap',context)
                    /**
                     * @todo
                     * context sauber an factory übergeben
                     *
                     * zweiten longtap auf element überprüfen,
                     * wenn instance schon vorhanden, dann aus factory entfernen
                     */
                    cmContextFactory.create();
                }
            }
        }
    }
]);