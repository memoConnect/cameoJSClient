'use strict';

angular.module('cmDesktopConversations').directive('cmAnswer',[
    'cmDevice',
    function (cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-answer.html',
            link: function (scope, element) {
                if(cmDevice.isDesktop('cmAnswer'))
                    element.find('textarea')[0].focus();
            }
        }
    }
])
