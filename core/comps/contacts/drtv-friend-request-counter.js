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

                cmContactsModel.requests.on('register', function(){
                    scope.show();
                });
                cmContactsModel.on('friendRequests:loaded', function(){
                    scope.show();
                });
                cmContactsModel.on('friendRequests:updated', function(){
                    scope.show();
                });

                scope.show();
            }
        }
    }
]);