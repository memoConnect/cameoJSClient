'use strict';

angular.module('cmDesktopConversations').directive('cmAnswerTextarea',[
    'cmEnv',
    function (cmEnv){
        return {
            restrict: 'E',
            scope: {
                text: '=cmData'
            },
            templateUrl: 'comps/conversations/drtv-answer-textarea.html',
            link: function (scope, element) {
                if(cmEnv.isNotMobile)                    
                    element.find('textarea')[0].focus();
            }
        }
    }
])
