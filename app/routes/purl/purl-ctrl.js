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
        'cmModal',
        'cmPurlModel',
        'cmUserModel',
        'cmUtil',
        'cmConversationFactory',
        function($scope, $rootScope, $routeParams, cmModal, cmPurlModel, cmUserModel, cmUtil, cmConversationFactory){
            $scope.isPurl = true;
            $scope.data = null;
            $scope.showConversation = false;
            $scope.showSignIn = false;
            $rootScope.pendingPurl = null;
            $scope.pageChild1 = $routeParams.pageChild1 || '';
            $scope.purlId = $routeParams.purlId || '';
            $scope.calledWithId = true;

            if(cmUtil.checkKeyExists($routeParams,'purlId') && cmUtil.validateString($routeParams.purlId)){
                cmPurlModel.getPurl($routeParams.purlId).then(
                    function(data){
                        // identity check internal || external user
                        cmPurlModel.handleIdentity(data.identity).then(
                            function(){
                                console.log('moep')
                                if(data.identity.userType == 'external'){
                                    $scope.showSignIn = true;
                                    $rootScope.pendingPurl = $routeParams.purlId;
                                }

                                if(typeof data.token !== 'undefined'){
                                    cmPurlModel.handleToken(data.token)
                                }

                                $scope.conversationId = cmPurlModel.handleConversation(data.conversation);
                                $scope.showConversation = true;

                                $scope.conversation = cmConversationFactory.create($scope.conversationId)
                            }
                        );
                    },
                    function(response){
                        if(typeof response !== 'undefined' && cmUtil.checkKeyExists(response, 'status')){
                            if(response.status == 401){
                                cmUserModel.doLogout(false,'purl-ctrl getPurl reject');
                                $scope.showLogin();
                            } else if(response.status == 404){
                                $scope.goto('/404');
                            }
                        } else {
                            $scope.goto('/404');
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