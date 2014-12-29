'use strict';

angular.module('cmUi').directive('cmMenu',[
    'cmUserModel', 'cmConfig', 'cmNotify', 'cmUtil',
    '$location', '$window', '$rootScope',
    function (cmUserModel, cmConfig, cmNotify, cmUtil,
              $location, $window, $rootScope){
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/ui/menu/drtv-menu.html',
            controller: function($scope){
                $scope.menu = cmConfig.menu;
                $scope.menuKeys = Object.keys($scope.menu);

                $scope.markHelp = $rootScope.markQuickstart || false;

                $scope.version = cmConfig.version;
                $scope.menuVisible = false;

                $scope.handleMenu = function(){
                    $scope.menuVisible = $scope.menuVisible ? false : true;

                    if($scope.menuVisible)
                        cmNotify.trigger('bell:unring');
                };

                $scope.checkActive = function(url){
                    if(cmUtil.startsWith($location.$$url,'/' + url)){
                        return true;
                    }
                    return false;
                };

                $scope.goTo = function(parentBtn, url, isSub){

                    if(typeof parentBtn.rootScopeCallback == 'string' && typeof $rootScope[parentBtn.rootScopeCallback] == 'function'){
                        $rootScope[parentBtn.rootScopeCallback]();
                        return false;
                    }

                    // for extern and performance
                    if('link' in parentBtn){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = parentBtn.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + parentBtn.link;
                        // http://localhost:8000/app/index.html#/settings
                        } else if($location.$$absUrl.indexOf('index.html#/') != -1) {
                            var arr_location = $location.$$absUrl.split('index.html#/');
                            location.href = arr_location[0] + '/' + parentBtn.link;
                        }

                        return false;
                    }

                    /**
                     * if current location == url, then only close menu
                     */
                    if('/' + url == $location.$$url){
                        $scope.handleMenu();
                        return false;
                    }

                    if(typeof url !== 'undefined'){
                        $scope.goto('/'+url);
                    }

                    return false;
                };

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'drtv-menu logout');
                };

                var destroyWatcher = $rootScope.$on('cmMenu:toggle',function(){
                    $scope.handleMenu();
                });

                $scope.$on('$destroy', function(){
                    destroyWatcher();
                });
            }
        }
    }
]);