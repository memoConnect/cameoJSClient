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
                    label:'FRIEND_REQUEST'
                });
            }
        }
    ]);
});