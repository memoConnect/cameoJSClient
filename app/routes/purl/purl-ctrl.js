define([
    'app',
    'ngload!pckFiles',
    'ngload!pckUser',
    'ngload!pckContacts',
    'ngload!pckConversations',
    'ngload!pckRouteConversation'
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
            $scope.showSignIn = false;
            $rootScope.pendingPurl = null;

            if(cmUtil.checkKeyExists($routeParams,'idPurl') && cmUtil.validateString($routeParams.idPurl)){
                cmPurlModel.getPurl($routeParams.idPurl).then(
                    function(data){
                        // identity check internal || external user
                        cmPurlModel.handleIdentity(data.identity);
                        if(data.identity.userType == 'external'){
                            $scope.showSignIn = true;
                            $rootScope.pendingPurl = $routeParams.idPurl;
                        }

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

            /**
             * header btn for fast registration
             */
            $scope.goToRegister = function(){
                $location.path('/registration');
            };
            /**
             * modal for fast registration
             */
            $scope.openFastRegister = function(){
                cmModal.create({
                        id: 'fast-registration',
                        'class': 'webreader',
                        type: 'alert',
                        //nose: 'bottom-left',
                        'cm-close-btn': false,
                        'cm-footer-label': 'MODAL.WEBREADER.LATER',
                        'cm-footer-icon': 'cm-close'
                    },'' +
                        '<div class="attention">' +
                        '<i class="fa cm-attention cm-lg-icon"></i> {{\'MODAL.WEBREADER.NOTICE\'|cmTranslate}}' +
                        '</div>'+
                        '<a href="#/registration" class="redirect" data-qa="btn-register-modal">' +
                        '<i class="fa cm-key cm-lg-icon"></i> {{\'MODAL.WEBREADER.REGISTRATION\'|cmTranslate}}' +
                        '</a>'
                );
                cmModal.open('fast-registration')
            };

            $scope.showLogin = function () {
                cmModal.create({
                    id: 'login',
                    'class': 'with-title no-padding',
                    'cm-close-btn': false,
                    'cm-close-on-backdrop': false
                },'<div cm-login></div>');
                cmModal.open('login');

                $rootScope.$on('cmLogin:success', function(){
                    location.reload();
                });
            };
        }
    ]);
});