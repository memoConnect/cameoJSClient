define([
    'app',
    'cmUtil',
    'ngload!pckUser',
    'ngload!pckConversations'
], function(app){
    'use strict';

    app.register.controller('PurlCtrl',[
        '$scope',
        '$rootScope',
        '$routeParams',
        '$location',
        'cmModal',
        'cmPurlModel',
        'cmUserModel',
        'cmUtil',
        function($scope, $rootScope, $routeParams, $location, cmModal, cmPurlModel, cmUserModel, cmUtil){
            $scope.data = null;
            $scope.showConversation = false;

            if(cmUtil.checkKeyExists($routeParams,'idPurl') && cmUtil.validateString($routeParams.idPurl)){
                cmPurlModel.getPurl($routeParams.idPurl).then(
                    function(data){
                        // identity check internal || external user
                        cmPurlModel.handleIdentity(data.identity);

                        if(typeof data.token !== 'undefined'){
                            cmPurlModel.handleToken(data.token)
                        }

                        $scope.conversationId = cmPurlModel.handleConversation(data.conversation);
                        $scope.showConversation = true;
                    },
                    function(response){
                        if(typeof response !== 'undefined' && cmUtil.checkKeyExists(response, 'status')){
                            if(response.status == 401){
                                cmUserModel.doLogout(false);
                                $scope.showLogin();
                            } else if(response.status == 404){
                                $location.path('/404');
                            }
                        } else {
                            $location.path('/404');
                        }
                    }
                );
            }

            $scope.showLogin = function () {
                $scope.hideHeader();

                cmModal.create({
                    id: 'login',
                    'class': 'with-title no-padding',
                    'cm-close-btn': false
                },'<div cm-login></div>');
                cmModal.open('login');

                $rootScope.$on('cmLogin:success', function(){
                    location.reload();
                });
            };

            $scope.hideHeader = function(){
                angular.element(document.querySelector('header')).addClass('ng-hide');
            }
        }
    ]);
});