'use strict';

angular.module('cmUi').directive('input', [
    'cmPristine',
    '$rootScope',
    '$timeout',
    function (cmPristine, $rootScope, $timeout) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model #https://docs.angularjs.org/api/ng/type/ngModel.NgModelController

                var initValue = '',
                    timeout;

                function apply(){
                    scope.$apply(function(){
                        setValue();
                    });
                }

                function broadcastPristine(bool){
                    if(bool){
                        cmPristine.set(ngModel, true);
                    } else {
                        cmPristine.set(ngModel, false);
                    }

                }

                function getValue(){
                    return element.val() || '';
                }

                function setValue(){
                    ngModel.$setViewValue(getValue());
                    ngModel.$commitViewValue();
                }

                function handleChange(){
                    if(timeout){
                        $timeout.cancel(timeout);
                    }

                    if(initValue != getValue()){
                        broadcastPristine();
                    } else if(initValue == getValue()){
                        broadcastPristine(true);
                    }

                    if('cmAdaptiveChange' in attrs){
                        timeout = $timeout(function(){
                            apply();
                        },attrs.cmAdaptiveChange || 1000);
                    } else {
                        timeout = $timeout(function (){
                            apply();
                        }, 100)
                    }
                }

                function init(){
                    initValue = getValue();
                    cmPristine.add(ngModel)
                }

                init();

                element
                    .unbind('input')
                    .unbind('keydown')
                    .on('focus', handleChange)
                    //.on('keydown', handleChange)
                    .on('keyup', handleChange)
                    .on('blur', handleChange);


                scope.$on('$destroy', function(){
                    element
                        .off('focus', handleChange)
                        .off('keyup', handleChange)
                        .off('blur', handleChange);

                    cmPristine.remove(ngModel);
                })
            }
        }
    }
]);