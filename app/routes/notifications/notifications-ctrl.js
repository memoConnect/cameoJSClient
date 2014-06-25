define([
    'app',
    'ngload!pckCore',
    'ngload!pckUser',
    'ngload!pckContacts'
], function (app) {
    'use strict';

    app.register.controller('NotificationsCtrl', [
        '$scope',
        'cmNotify',
        function($scope, cmNotify){
            $scope.notifications = cmNotify;

            $scope.ring = function(){
                cmNotify.new({
                    label:'NOTIFICATIONS.TYPES.FRIEND_REQUEST',
                    bell: true
                });
            }

            $scope.warn = function(){
                cmNotify.warn('DRTV.EXTERN_CONTACT.INFO.EMPTY.DISPLAYNAME',{ttl:2000, bell:true});
            }

            $scope.info = function(){
                cmNotify.info('NOTIFICATIONS.TYPES.FRIEND_REQUEST',{ttl:2000});
            }

            $scope.error = function(){
                cmNotify.error('DRTV.EXTERN_CONTACT.INFO.SAVE_FAIL',{ttl:2000});
            }
        }
    ]);
});