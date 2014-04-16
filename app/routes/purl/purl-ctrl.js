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
        '$modal',
        'cmPurlModel',
        'cmUserModel',
        'cmUtil',
        'cmLogger',
        function($scope, $routeParams, $location, $modal, cmPurlModel, cmUserModel, cmUtil, cmLogger){
            $scope.data = null;
            $scope.showConversation = false;
            $scope.isModalVisible = false;

            if(cmUtil.checkKeyExists($routeParams,'idPurl') && cmUtil.validateString($routeParams.idPurl)){

                cmPurlModel.getPurl($routeParams.idPurl).then(
                    function(data){
                        $scope.conversationId  = data.id;
                        $scope.showConversation = true;
                    },
                    function(response){
                        if(typeof response !== 'undefined' && cmUtil.checkKeyExists(response, 'status')){
                            if(response.status == 401){
                                /**
                                 * @todo goto talks and show modal
                                 */
                                cmUserModel.doLogout(false);
                                $scope.showLogin();
                            }
                        } else {
                            $location.path('/404');
                        }
                    }
                );
            }

            $scope.showLogin = function () {
                $scope.isModalVisible = true;
                $scope.hideHeader();

                var modalInstance = $modal.open({
                    windowClass: 'cm-modal-with-title',
                    template: '<div cm-login></div>',
                    controller: function ($rootScope, $scope, $modalInstance) {
                        $rootScope.$on('cmLogin:success', function(){
                            if($modalInstance != undefined){
                                $modalInstance.close();
                                location.reload();
                            }
                        })
                    }
                });

                modalInstance.result
                    .then(
                    function () {

                    },
                    function () {
                        $scope.isModalVisible = false;
                    }
                );
            };


            $scope.hideHeader = function(){
                angular.element(document.querySelector('header')).addClass('ng-hide');
            }
        }
    ]);
});