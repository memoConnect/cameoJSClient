define([
    'app',
    'cmLogger',
    'cmUtil',
    'ngload!pckUser',
    'ngload!pckConversations'
], function(app){
    'use strict';

    app.register.controller('PurlCtrl',[
        '$scope',
        '$routeParams',
        '$location',
        'cmPurlModel',
        'cmUserModel',
        'cmUtil',
        'cmLogger',
        function($scope, $routeParams, $location, cmPurlModel, cmUserModel, cmUtil, cmLogger){
            $scope.data = null;
            $scope.showConversation = false;

            if(cmUtil.checkKeyExists($routeParams,'idPurl') && cmUtil.validateString($routeParams.idPurl)){

                cmPurlModel.getPurl($routeParams.idPurl).then(
                    function(data){
                        $scope.conversationId  = data.id;
                        $scope.showConversation = true;
                    },
                    function(){
                        $location.path('/404');
                    }
                );

            }
        }
    ]);
});