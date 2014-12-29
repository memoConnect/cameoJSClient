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
                if (!ngModel || 'cmPristineIgnore' in attrs)
                    return; // do nothing if no ng-model

                var initValue = '',
                    timeout;

                function broadcastPristine(){
                    if(ngModel.$pristine){
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

                function handleChange(){
                    if(timeout){
                        $timeout.cancel(timeout);
                    }

                    broadcastPristine();

                    if('cmAdaptiveChange' in attrs){
                        timeout = $timeout(function(){
                            setValue()
                        },attrs.cmAdaptiveChange || 1000);
                    } else {
                        setValue();
                    }
                }

                function init(){
                    initValue = getValue();
                    cmPristine.add(ngModel)
                }

                init();

                element
                    .on('focus', handleChange)
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