'use strict';

angular.module('cmDesktopUi').directive('cmDesktopMenu',[
    'cmUserModel', 'cmConfig', 'cmNotify', 'cmUtil',
    '$location', '$window', '$rootScope',
    function (cmUserModel, cmConfig, cmNotify, cmUtil,
              $location, $window, $rootScope){
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/ui/drtv-desktop-menu.html',
            controller: function($scope){

                $scope.menu = cmConfig.menu;
                $scope.menuKeys = Object.keys(cmConfig.menu);
                $scope.version = cmConfig.version;
                $scope.menuVisible = false;

                $scope.markQuickstart = $rootScope.markQuickstart || false;

                $scope.checkActive = function(route, urls, ignore){
                    var arrUrl = !urls ? [route] : urls.split(','),
                        isActive = false,
                        foundIgnore = ignore ? ignore.split(',').some(function(item){
                            return $location.$$url.indexOf(item) >= 0
                        }) : false;

                    arrUrl.forEach(function(url){
                        if(cmUtil.startsWith($location.$$url,'/' + url) && !foundIgnore){
                            isActive = true;
                        }
                    });

                    return isActive;
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