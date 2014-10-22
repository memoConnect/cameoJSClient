'use strict';

angular.module('cmRoutes').controller('NotificationsCtrl', [
    '$scope',
    'cmNotify',
    function($scope, cmNotify){
        $scope.notifications = cmNotify;

        $scope.ring = function(){
            cmNotify.create({
                label:'NOTIFICATIONS.TYPES.FRIEND_REQUEST',
                bell: true
            });
        }

        $scope.warn = function(){
            cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.DISPLAYNAME',{ttl:2000});
        }

        $scope.info = function(){
            cmNotify.info('NOTIFICATIONS.TYPES.FRIEND_REQUEST',{ttl:0, displayType:'modal'});
        }

        $scope.success = function(){
            cmNotify.success('NOTIFICATIONS.TYPES.FRIEND_REQUEST',{ttl:0, displayType:'modal'});
        }

        $scope.error = function(){
            cmNotify.error('DRTV.EXTERN_CONTACT.INFO.SAVE_FAIL',{ttl:2000});
        }
    }
]);