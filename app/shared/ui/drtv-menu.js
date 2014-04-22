'use strict';

angular.module('cmUi').directive('cmMenu',[
    '$window',
    '$document',
    '$location',
    'cmUserModel',
    'cmVersion',
    function cmMenu($window, $document, $location, cmUserModel, cmVersion){
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [37, 38, 39, 40];

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        function keydown(e) {
            for (var i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    preventDefault(e);
                    return;
                }
            }
        }

        function wheel(e) {
            preventDefault(e);
        }

        function disableScroll() {
            if ($window.addEventListener) {
                $window.addEventListener('DOMMouseScroll', wheel, false);
            }
            $window.onmousewheel = $document.onmousewheel = wheel;
            $document.onkeydown = keydown;
        }

        function enableScroll() {
            if ($window.removeEventListener) {
                $window.removeEventListener('DOMMouseScroll', wheel, false);
            }
            $window.onmousewheel = $document.onmousewheel = $document.onkeydown = null;
        }

        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'shared/ui/drtv-menu.html',

            controller: function($scope, $element, $rootScope){
                $scope.cmVersion = cmVersion;
                $scope.btns = [
                    {i18n:'MENU.HEADER', icon:'cm-menu', css:'cm-menu-header'},
                    {i18n:'MENU.NOTIFICATIONS', icon:'cm-bell', css:'cm-menu-notify', href:'/notfications'},
                    {i18n:'MENU.REQUESTS', icon:'cm-contacts', css:'cm-menu-notify', href:'/contacts/requests', drtv:'cm-friend-request-counter'},
                    {i18n:'MENU.MESSAGES', icon:'cm-envelope-closed', css:'cm-menu-notify', href:'/talks'},
//                {i18n:'MENU.HINTS', icon:'cm-info', css:'cm-menu-notify', href:'#/notfications/hints'},
//                {i18n:'MENU.ACTIVITY', icon:'cm-person', href:'#/settings'},
                    {i18n:'MENU.SETTINGS', icon:'cm-settings', href:'/settings'}
                ];

                $scope.menuVisible = false;

                $rootScope.$on('logout', function(){
                    //enableScroll();
                });

                $scope.handleMenu = function(){
                    $scope.menuVisible = $scope.menuVisible ? false : true;
                    // kill scroll if visible
                    if($scope.menuVisible){
                        //disableScroll();
                    } else {
                        //enableScroll();
                    }
                };

                $scope.goTo = function(url){
                    if(typeof url !== 'undefined'){
                        $location.path(url);
                    }

                    return false;
                }

                $scope.logout = function(){
                    cmUserModel.doLogout();
                };
            }
        }
    }
]);