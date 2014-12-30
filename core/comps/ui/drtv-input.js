'use strict';

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

                function handleChange(event){
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
                    if('cmAdaptiveChange' in attrs){
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

                scope.$on('$destroy', function(){
                    element
                        .off('focus', handleChange)
                        .off('keyup', handleChange)
                        .off('blur', handleChange);

                    cmPristine.remove(ngModel);

                    cmPristine.off('reinit', reinit);
                });
            }
        }
    }
]);