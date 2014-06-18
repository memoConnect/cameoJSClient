'use strict';

angular.module('cmUi').directive('cmMenu',[
    '$location',
    'cmUserModel',
    'cmConfig',
    function ($location, cmUserModel, cmConfig){
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/ui/drtv-menu.html',

            controller: function($scope){

                $scope.Object = Object;
                $scope.menu = cmConfig.menu;

                $scope.menuVisible = false;

                $scope.handleMenu = function(){
                    $scope.menuVisible = $scope.menuVisible ? false : true;
                };

                $scope.toggleSubs = function(parent){
                    parent.subsVisible = parent.subsVisible ? false : true;
                };

                $scope.goTo = function(parentBtn, url, isSub){
                    if(parentBtn.isOnlyLabel && isSub == undefined)
                        return false;

                    if(isSub != undefined)
                        $scope.toggleSubs(parentBtn)

                    if(typeof url !== 'undefined'){
                        $location.path('/'+url);
                    }

                    return false;
                };

                $scope.logout = function(){
                    cmUserModel.doLogout();
                };
            }
        }
    }
]);