'use strict';

angular.module('cmContacts')
.directive('cmFriendRequestCounter', [
    'cmContactsModel',
    function (cmContactsModel) {
        return {
            restrict : 'AE',
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
                    }

                    scope.setColor();
                };

                scope.show();

                function event_callback(){
                    scope.show();
                }

                cmContactsModel.requests.on('register deregister friendRequests:loaded friendRequests:updated', event_callback);

                scope.$on('$destroy', function(){
                    cmContactsModel.requests.off('register deregister friendRequests:loaded friendRequests:updated', event_callback);
                })
            }
        }
    }
]);