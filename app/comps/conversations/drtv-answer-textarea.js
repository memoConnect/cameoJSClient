'use strict';

angular.module('cmAppConversations').directive('cmAnswerTextarea',[
    'cmDevice',
    function (cmDevice){
        return {
            restrict: 'E',
            scope: {
                text: '=cmData'
            },
            templateUrl: 'comps/conversations/drtv-answer-textarea.html',
            link: function (scope, element) {
                if(cmDevice.isDesktop('cmAnswerTextarea'))
                    element.find('textarea')[0].focus();
            }
        }
    }
])
