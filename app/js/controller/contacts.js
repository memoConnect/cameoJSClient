define([
    'app'
], function(app){
   'use strict';

    app.register.controller('ContactsCtrl',[
        '$scope',
        '$location',
        'cmNotify',
        'cmLogger',
        function($scope,$location,cmNotify,cmLogger){

        }]);

    app.register.directive('cmSearchCameoId',
        function(cmApi,cmLogger){
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'tpl/directives/cm-search-cameo-id.html',
                controller: function($scope, $element, $attrs){
                    var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];
                    $scope.results = [];

                    $scope.showResults = false;
                    $scope.showNoResults = false;

                    $scope.search = function(){
                       $scope.showResults = true;
                       $scope.results = mockResults;
                    };

                    $scope.sendFriendshipRequest = function(){
                        cmLogger.log('sendFriendshipRequest');
                    };
                }
            }
        });
});