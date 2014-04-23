'use strict';

angular.module('cmContacts').directive('cmFriendRequestCounter', [
    'cmContactsModel',
    'cmEnv',
    function (cmContactsModel, cmEnv) {
        return {
            restrict : 'AE',
            scope: true,
            link: function(scope, element, attrs){
                scope.counter = 0;

                function setColor(){
                    if(scope.counter > 0){
                        element.parent().parent().addClass('info')
                    } else {
                        element.parent().parent().removeClass('info')
                    }
                }

                function show(){
                    scope.counter = cmContactsModel.requests.length;

                    if(scope.counter > 0){
                        element.html(' (' + scope.counter +')');
                    } else {
                        element.html('');
                    }

                    setColor();
                }

                cmContactsModel.on('friendRequests:loaded', function(){
                    show();
                });
                cmContactsModel.on('friendRequests:updated', function(){
                    show();
                });

                show();
            }
        }
    }
]);