define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',[
        '$scope',
        'cmContactsModel',
        function($scope, cmContactsModel){
            /**
             * get quantitiy for tab badges
             * @private
             */
            function getBadges(){
                cmContactsModel.getQuantity().then(
                    function(qty){
                        $scope.badges.contacts = qty;
                    },
                    function(){
                        $scope.badges.contacts = 0;
                    }
                );

                cmContactsModel.getFriendRequests().then(
                    function(data){
                        $scope.badges.friendsRequest = data.length;
                    },
                    function(){
                        $scope.badges.friendsRequest = 0;
                    }
                );
            }

            // define for tabs directive
            $scope.badges = {
                contacts: 0,
                friendRequests: 0
            };

            // get badges
//            getBadges();

            $scope.tabs = [
                {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
                {i18n:'ADD',icon:'fa-plus','default':true},
                {i18n:'ALL',icon:'fa-group',badge:'contacts'},
                {i18n:'REQUESTS',icon:'fa-link',badge:'friendRequests'}
            ];
        }
    ]);
});