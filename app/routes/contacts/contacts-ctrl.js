define([
    'app',
    'ngload!pckUi',    
    'ngload!pckContacts'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',function($scope){
        $scope.tabs = [
            {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
            {i18n:'ADD',icon:'fa-plus','default':true},
            {i18n:'ALL',icon:'fa-group',badge:'contacts'},
            {i18n:'REQUESTS',icon:'fa-link',badge:'friendRequests'}
        ];
    });

//    app.register.controller('ContactsCtrl',[
//    '$scope',
//    '$rootScope',
//    '$routeParams',
//    'ModelContacts',
//    function($scope, $rootScope, $routeParams, ModelContacts){
//        /**
//         * get quantitiy for tab badges
//         * @private
//         */
//        function getBadges(){
//            ModelContacts.getQuantity().then(
//                function(qty){
//                    $scope.badges.contacts = qty;
//                },
//                function(){
//                    $scope.badges.contacts = 0;
//                }
//            );
//
//            ModelContacts.getFriendRequests().then(
//                function(data){
//                    $scope.badges.friendsRequest = data.length;
//                },
//                function(){
//                    $scope.badges.friendsRequest = 0;
//                }
//            );
//        }
//
//        // define for tabs directive
//        $scope.badges = {
//            contacts: 0,
//            friendRequests: 0
//        };
//
//        // get badges
//        getBadges();
//
//        $scope.tabs = [
//            {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
//            {i18n:'ADD',icon:'fa-plus','default':true},
//            {i18n:'ALL',icon:'fa-group',badge:'contacts'},
//            {i18n:'REQUESTS',icon:'fa-link',badge:'friendRequests'}
//        ];
//
//    }]);
});