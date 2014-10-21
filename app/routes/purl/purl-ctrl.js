'use strict';

angular.module('cmRoutes')
.controller('PurlCtrl',[
    'cmModal', 'cmPurlModel', 'cmConversationFactory',
    '$scope', '$rootScope', '$routeParams', 'resolveData',
    function(cmModal, cmPurlModel, cmConversationFactory,
             $scope, $rootScope, $routeParams, resolveData){

        $rootScope.pendingPurl      = null;
        $scope.showSignIn           = false;
        $scope.purlId               = $routeParams.purlId || '';
        $scope.headerGuest          = true;

        /**
         * modal for fast registration
         */
        $scope.showLogin = function () {
            $scope.showSignIn = true;

            cmModal.create({
                id: 'login',
                'class': 'with-title no-padding theme-b',
                'cm-close-btn': false,
                'cm-close-on-backdrop': false
            },'<div cm-login-modal></div>');
            cmModal.open('login');

            $rootScope.$on('cmLogin:success', function(){
                location.reload();
            });
        };

        //console.log('resolveData', resolveData);
        //console.log('$routeParams.purlId',$routeParams.purlId)

        if(typeof resolveData == 'object'){
            if(typeof resolveData.identity == 'object' && typeof resolveData.conversation == 'object'){
                // identity check internal || external user
                cmPurlModel.handleIdentity(resolveData.identity);

                if(resolveData.identity.userType == 'external'){
                    $rootScope.pendingPurl = $routeParams.purlId;
                } else {
                    $scope.headerGuest = false;
                }

                if(typeof resolveData.token !== 'undefined'){
                    cmPurlModel.handleToken(resolveData.token)
                }

                var conversation_id = cmPurlModel.handleConversation(resolveData.conversation);

                $scope.conversation = cmConversationFactory.create(conversation_id);
            } else if(typeof resolveData.status == 'number' && resolveData.status == 401){
                $rootScope.$broadcast('logout', {goToLogin: false, where: 'purl-ctrl getPurl reject'})
                $scope.showLogin();
            } else {
                $rootScope.goTo('/404');
            }
        }
    }
]);