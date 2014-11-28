'use strict';

angular.module('cmRoutes')
.controller('PurlCtrl',[
    'cmUserModel', 'cmModal', 'cmPurlModel', 'cmConversationFactory', 'cmDevice',
    '$scope', '$rootScope', '$routeParams', 'resolveData',
    function(cmUserModel, cmModal, cmPurlModel, cmConversationFactory, cmDevice,
             $scope, $rootScope, $routeParams, resolveData){

        $rootScope.pendingPurl      = null;
        $scope.showSignIn           = false;
        $scope.purlId               = $routeParams.purlId || '';
        $scope.headerGuest          = true;

        $scope.appParams = 'purlId=' + $routeParams.purlId;
        $scope.isMobile = cmDevice.isMobile() && !cmDevice.isApp();

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
                $rootScope.showLogin();
                $scope.showSignIn = true;
            } else {
                $rootScope.goTo('/404');
            }
        }
    }
]);