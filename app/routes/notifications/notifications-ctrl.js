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

            cmNotify.create({
                id:'FRIEND_REQUEST'
            });
        }
    ]);
});