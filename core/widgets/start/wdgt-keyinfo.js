'use strict';

angular.module('cmWidgets').directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
]);