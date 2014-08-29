'use strict';

angular.module('cmUi').directive('cmModalConfirm',[
    'cmLogger',
    '$rootScope',
    function(cmLogger,$rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/ui/drtv-modal-confirm.html',
            controller: function($scope){
                $scope.cancel = function(){
                    //cmLogger.debug('cmModalConfirm.cancel');
                    $rootScope.closeModal($scope.modalId);
                };

                $scope.confirm = function(){
                    //cmLogger.debug('cmModalConfirm.confirm');
                    $rootScope.closeModal($scope.modalId);

                    if(typeof $scope.cancelCallback == 'function'){
                        $scope.cancelCallback();
                    }
                };
            }
        }
    }
]);