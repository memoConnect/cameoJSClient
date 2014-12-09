'use strict';

angular.module('cmCore').directive('cmConnectionHandler',[
    'cmModal', 'cmLogger',
    '$rootScope',
    function (cmModal, cmLogger,
              $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element) {

                var listenedEvents = [
                    'cmConnectionHandler:failed',
                    'cmConnectionHandler:notSecure'
                ];

                function showModal(event, reconnectCallback){
                    // hide spinner and hide app content
                    $rootScope.$broadcast('cmBoot:appSpinner','hide','cmConnectionHandler');
                    element.addClass('ng-hide');
                    // prepare reconnect callback
                    var scope = $rootScope.$new();
                    scope.onFooterClick = function(){
                        reconnectCallback();

                        // TODO: at no routechange the spinner doesn't disappear
                        // $rootScope.$broadcast('cmBoot:appSpinner','show');

                        $rootScope.$broadcast('getBrowserInfo');
                        element.removeClass('ng-hide');
                    };
                    // create and show modal
                    var eventId = (function(){
                        var name = event.name.split(':');
                        return name[1].toUpperCase();
                    })();

                    cmModal.create(
                        {
                            id: 'connection-handler',
                            type: 'alert',
                            'cm-close-btn': false,
                            'cm-close-on-backdrop': false,
                            'cm-footer-label': 'MODAL.CONNECTION_HANDLER.'+eventId+'.FOOTER',
                            'cm-footer-icon': 'cm-change'
                        },
                        '<div class="attention">' +
                            '<i class="fa cm-attention cm-orange"></i> '+
                            '<span ng-bind-html="\'MODAL.CONNECTION_HANDLER.'+eventId+'.TEXT\'|cmTranslate"></span>' +
                        '</div>',
                        'body',
                        scope
                    );
                    cmModal.open('connection-handler');
                }

                var killWatchers = [];
                listenedEvents.forEach(function(eventName){
                    killWatchers.push($rootScope.$on(
                        eventName,
                        function(event, reconnectCallback){

                            if(typeof reconnectCallback != 'function') {
                                cmLogger.warn('cmConnectionHandler called without callback',event);
                                return false;
                            }

                            showModal(event, reconnectCallback);
                        })
                    );
                });

                scope.$on('$destroy', function(){
                    killWatchers.forEach(function(watcher){
                        watcher();
                    });
                });
            }
        }
    }
]);