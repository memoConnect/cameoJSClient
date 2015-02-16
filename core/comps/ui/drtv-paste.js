angular.module('cmUi')
.directive('cmPaste',[
    '$timeout',
    function ($timeout){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                function onPaste(event){
                    $timeout(function(){
                        ngModelCtrl.$setViewValue(event.target.value);
                        ngModelCtrl.$commitViewValue();
                        ngModelCtrl.$render();
                    });
                }

                element.on('paste',onPaste);
                scope.$on('$destroy', function(){
                    element.off('paste',onPaste);
                });
            }
        }
    }
]);