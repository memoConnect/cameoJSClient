'use strict';

angular.module('cmAppConversations').directive('cmAnswer',[
    'cmDevice', 'cmKeyboard',
    '$rootScope',
    function (cmDevice, cmKeyboard,
              $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-answer.html',
            link: function (scope, element) {
                if(cmDevice.isDesktop('cmAnswer'))
                    element.find('textarea')[0].focus();

                var textarea = element[0].querySelector('#answer-textarea')

                function clickWatcher(){
                    cmKeyboard.one('cmKeyboard:visible', function(){
                        $rootScope.$emit('scroll:to');
                    });

                    cmKeyboard.one('cmKeyboard:hidden', function(){
                        $rootScope.$emit('scroll:to');
                    });
                }

                if(cmDevice.isApp()){
                    angular.element(textarea)
                        .on('click', clickWatcher);

                    scope.$on('$destroy', function () {
                        angular.element(textarea)
                            .off('click', clickWatcher);
                    });
                }
            }
        }
    }
]);