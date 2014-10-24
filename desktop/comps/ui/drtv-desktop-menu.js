'use strict';

angular.module('cmDesktopUi').directive('cmDesktopMenu',[
    'cmUserModel', 'cmConfig', 'cmNotify', 'cmUtil',
    '$location', '$window',
    function (cmUserModel, cmConfig, cmNotify, cmUtil,
              $location, $window){
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/ui/drtv-desktop-menu.html',
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

                $scope.checkActive = function(urls, ignore){
                    var arrUrl = urls.split(','),
                        found = false,
                        found_ignore = false;

                    if(ignore){
                        console.log('ignore',ignore)
                        console.log('ignore fnc',ignore.split(',').some(function(item){return ($location.$$url.indexOf(item) == -1)}))
                        console.log('$location.$$url',$location.$$url)
                        console.log('$location.$$url.indexOf(contact/request/list) == -1',$location.$$url.indexOf('contact/request/list') == -1)
                        console.log('$location.$$url.indexOf(contact/create) == -1',$location.$$url.indexOf('contact/create') == -1)
                    }

                    arrUrl.forEach(function(url){
                        if(cmUtil.startsWith($location.$$url,'/' + url) && found_ignore == false){
                            if(typeof ignore == 'undefined') {
                                found = true;
                            } else if(ignore.split(',').some(function(item){return ($location.$$url.indexOf(item) == -1)})) {
                                found_ignore = true;
                            } else {
                                found = true;
                            }
                        }
                    });
                    return (found_ignore ? false : found);
                };

                $scope.goTo = function(parentBtn, url, isSub){
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
            }
        }
    }
]);