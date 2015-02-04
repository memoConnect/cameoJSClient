'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:input
 * @description
 * a drtv for all input-tags
 * every input with attr name and ng-model get registred at cmPristine service
 *
 * @restrict A
 * @requires cmPristine
 * @requires $rootScope
 * @requires $timeout
 *
 * @example
 <example module="cmDemo">
 <file name="index.html">
 <article class="content">
     <div class="cm-input-ctn">
        <input type="text" value="whoop whoop" />
     </div>
 </article>

 <article class="content">
     <div class="cm-input-ctn with-inside-icon">
         <input type="text" value="whoop whoop" />
         <i class="fa cm-write"></i>
     </div>
 </article>

 <article class="content">
     <div class="cm-input-ctn with-inside-icons">
         <input type="text" value="whoop whoop" />
         <i class="fa cm-rhino-bubble-glyph"></i>
         <i class="fa cm-write"></i>
     </div>
 </article>

 <article class="content">
     <div class="cm-input-ctn with-inside-left-icon">
         <i class="fa cm-checker"></i>
         <input type="text" value="whoop whoop" />
     </div>
 </article>

 <article class="content">
     <div class="cm-input-ctn with-inside-left-icons">
         <i class="fa cm-checker"></i>
         <i class="fa cm-checkbox-wrong"></i>
         <input type="text" value="whoop whoop" />
     </div>
 </article>

 <article class="content">
     <div class="cm-input-ctn with-inside-left-icon with-inside-icon">
         <i class="fa cm-checker"></i>
         <input type="text" value="whoop whoop" />
         <i class="fa cm-checkbox-wrong"></i>
     </div>
 </article>

 <article class="content">
     <div class="cm-input-ctn with-inside-left-icons with-inside-icons">
         <i class="fa cm-checker"></i>
         <i class="fa cm-checker"></i>
         <input type="text" value="whoop whoop" />
         <i class="fa cm-checkbox-wrong"></i>
         <i class="fa cm-checkbox-wrong"></i>
     </div>
 </article>

 </file>
 </example>
 */

angular.module('cmUi')
.directive('input', [
    'cmPristine',
    '$rootScope', '$timeout',
    function (cmPristine,
              $rootScope, $timeout) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel || 'cmPristineIgnore' in attrs || 'type' in attrs && attrs.type == 'hidden')
                    return; // do nothing if no ng-model

                // old simple style
                //function callback_pristine(){
                //    $rootScope.$broadcast('pristine:false');
                //    $rootScope.$apply();
                //}
                //element.on('keydown',callback_pristine);
                //
                //scope.$on('$destroy',function(){
                //    element.off('click',callback_pristine);
                //});

                var timeout,
                    initValue;

                function broadcastPristine(bool){
                    if(bool){
                        cmPristine.set(ngModel, true);
                    } else {
                        cmPristine.set(ngModel, false);
                    }
                }

                function getValue(){
                    return element.val().trim() || '';
                }

                function setValue(){
                    ngModel.$setViewValue(getValue());
                    ngModel.$commitViewValue();
                }

                function handleChange(event, forceSet){
                    // check defaultValue
                    if(initValue == undefined) {
                        reinit();
                    }

                    // call service if input is pristine
                    if(initValue != getValue()){
                        broadcastPristine();
                    } else if(initValue == getValue()){
                        broadcastPristine(true);
                    }

                    // handle adaptive change
                    if('cmAdaptiveChange' in attrs && !forceSet){
                        $timeout.cancel(timeout);
                        timeout = $timeout(function(){
                            setValue()
                        },attrs.cmAdaptiveChange || 1000);
                    } else {
                        setValue();
                    }
                }

                // register at service
                cmPristine.add(ngModel);

                // on init or after submit
                function reinit(){
                    initValue = getValue();
                }
                cmPristine.on('reinit', reinit);

                // watch on element
                element
                    .unbind('input')
                    .unbind('keydown')
                    .on('focus', handleChange)
                    .on('keyup', handleChange)
                    .on('blur', handleChange);

                if('cmEnter' in attrs){
                    var killWatcher = scope.$on('cmEnter:pressed', function(){
                        handleChange({},true);
                    });
                }

                scope.$on('$destroy', function(){
                    element
                        .off('focus', handleChange)
                        .off('keyup', handleChange)
                        .off('blur', handleChange);

                    cmPristine.remove(ngModel);

                    cmPristine.off('reinit', reinit);

                    if(killWatcher)
                        killWatcher();
                });
            }
        }
    }
]);