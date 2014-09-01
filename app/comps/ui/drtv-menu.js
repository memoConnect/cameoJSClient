'use strict';

angular.module('cmUi').directive('cmMenu',[
    'cmUserModel',
    'cmConfig',
    'cmNotify',
    function (cmUserModel, cmConfig, cmNotify){
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/ui/drtv-menu.html',
            controller: function($scope){

                $scope.Object = Object;
                $scope.menu = cmConfig.menu;

                $scope.version = cmConfig.version;

                $scope.menuVisible = false;

                $scope.handleMenu = function(){
                    $scope.menuVisible = $scope.menuVisible ? false : true;

                    if($scope.menuVisible)
                        cmNotify.trigger('bell:unring');
                };

                $scope.toggleSubs = function(parent){
                    parent.subsVisible = parent.subsVisible ? false : true;
                };

                $scope.goTo = function(parentBtn, url, isSub){
                    /**
                     * if current location == url, then only close menu
                     */
                    if('/' + url == $location.$$url){
                        $scope.handleMenu();
                        return false;
                    }

                    if(parentBtn.onlyLabel && isSub == undefined)
                        return false;

                    if(isSub != undefined)
                        $scope.toggleSubs(parentBtn)

                    if(typeof url !== 'undefined'){
                        $scope.goto('/'+url);
                    }

                    return false;
                };

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'drtv-menu logout');
                };
            }
        }
    }
]);