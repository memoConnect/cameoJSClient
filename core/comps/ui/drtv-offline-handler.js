'use strict';

angular.module('cmUi').directive('cmOfflineHandler',[
    'cmModal',
    '$rootScope',
    function (cmModal, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $rootScope.$on('connection:failed', function(event, reconnectCallback){
                    $rootScope.$broadcast('appSpinner','hide');
                    element.addClass('ng-hide');

                    var scope = $rootScope.$new();
                        scope.onFooterClick = function(){
                            reconnectCallback();
                            $rootScope.$broadcast('appSpinner','show');
                            $rootScope.$broadcast('getBrowserInfo');
                            element.removeClass('ng-hide');
                        };

                    cmModal.create({
                        id: 'offline-handler',
                        type: 'alert',
                        'cm-close-btn': false,
                        'cm-close-on-backdrop': false,
                        'cm-footer-label': 'MODAL.OFFLINE_HANDLER.FOOTER',
                        'cm-footer-icon': 'cm-change'
                    },
                    '<div class="attention">' +
                        '<i class="fa cm-attention cm-orange"></i> <span ng-bind-html="\'MODAL.OFFLINE_HANDLER.MESSAGE\'|cmTranslate"></span>' +
                    '</div>',
                    'body',
                    scope);
                    cmModal.open('offline-handler')
                });
            }
        }
    }
]);