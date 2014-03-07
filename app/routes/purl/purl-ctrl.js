define([
    'app',
    'cmApi',
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
        'cmUserModel',
        'cmApi',
        'cmLogger',
        'cmUtil',
        function($scope, $routeParams, $location, ModelUser, cmApi, cmLogger, cmUtil){
            $scope.data = null;

            if(cmUtil.checkKeyExists($routeParams,'idPurl') && cmUtil.validateString($routeParams.idPurl)){
                cmApi.get({url:'/purl/'+$routeParams.idPurl}).then(
                    function(data){
                        $scope.data = data;
                    },
                    function(){
                        cmLogger.error('cant get PURL Message');
                        $location.path('/404');
                    }
                );
            }
        }
    ]);
});