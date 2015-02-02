'use strict';

angular.module('cmContacts')
.directive('cmFriendRequestCounter', [
    'cmContactsModel', 'cmNotify',
    function (cmContactsModel, cmNotify) {
        return {
            restrict : 'E',
            scope: true,
            link: function(scope, element){
                scope.counter = 0;

                scope.setColor = function(){
                    if(scope.counter > 0){
                        element.parent().parent().addClass('info');
                    } else {
                        element.parent().parent().removeClass('info');
                    }
                };

                scope.show = function(){
                    scope.counter = cmContactsModel.requests.length;

                    if(scope.counter > 0){
                        element.html(' (' + scope.counter +')');
                    } else {
                        element.html('');
                        cmNotify.trigger('bell:unring');
                    }

                    scope.setColor();
                };

                function refresh(){
                    scope.show();
                }

                cmContactsModel.requests.on('register deregister', refresh);
                cmContactsModel.on('friendRequests:loaded friendRequests:updated friendRequests:deleted', refresh);

                refresh();

                scope.$on('$destroy', function(){
                    cmContactsModel.requests.off('register deregister', refresh);
                    cmContactsModel.off('friendRequests:loaded', refresh);
                    cmContactsModel.off('friendRequests:updated', refresh);
                })
            }
        }
    }
]);