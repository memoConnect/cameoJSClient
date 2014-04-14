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
                    function(response){
                        if(typeof response !== 'undefined' && cmUtil.checkKeyExists(response, 'status')){
                            if(response.status == 401){
                                // goto talks and show modal
                                console.log(response)
                            }
                        } else {
                            $location.path('/404');
                        }
                    }
                );

            }
        }
    ]);
});