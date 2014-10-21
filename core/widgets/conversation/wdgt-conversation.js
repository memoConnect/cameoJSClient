'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */

angular.module('cmWidgets')
.directive('cmWidgetConversation', [
    'cmModal',
    function (cmModal){
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: {
               conversation: '=cmData'
            },
            controller: function ($scope) {

                $scope.openFastRegister = function(){
                    cmModal.create({
                            id: 'fast-registration',
                            'class': 'webreader',
                            type: 'alert',
                            //nose: 'bottom-left',
                            'cm-close-btn': false,
                            'cm-footer-label': 'MODAL.WEBREADER.LATER',
                            'cm-footer-icon': 'cm-close'
                        },
                            '<div class="attention">' +
                            '<i class="fa cm-attention"></i> {{\'MODAL.WEBREADER.NOTICE\'|cmTranslate}}' +
                            '</div>'+
                            '<a href="#/registration" class="classic-link" data-qa="btn-register-modal">' +
                            '<i class="fa cm-key"></i> {{\'MODAL.WEBREADER.REGISTRATION\'|cmTranslate}}' +
                            '</a>'
                    );
                    cmModal.open('fast-registration');
                };
                
            }
        }
    }
]);