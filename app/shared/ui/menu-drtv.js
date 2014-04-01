'use strict';

function cmMenu($window, $document, cmUserModel){
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
        templateUrl: 'shared/ui/menu.html',

        controller: function($scope, $element, $rootScope){
            $scope.btns = [
                {i18n:'MENU.HEADER',        icon:'cm-menu',             menuClass:'cm-menu-header'  },
                {i18n:'MENU.NOTIFICATIONS', icon:'cm-bell',             menuClass:'cm-menu-notify', href:'#/notfications'},
                {i18n:'MENU.FRIENDREQUESTS',icon:'cm-contacts',         menuClass:'cm-menu-notify', href:'#/contacts/request'},
                {i18n:'MENU.MESSAGES',      icon:'cm-envelope-closed',  menuClass:'cm-menu-notify', href:'#/talks'},
                {i18n:'MENU.HINTS',         icon:'cm-info',             menuClass:'cm-menu-notify', href:'#/notfications/hints'},
                {i18n:'MENU.ACTIVITY',      icon:'cm-person',                                       href:'#/settings'},
                {i18n:'MENU.SETTINGS',      icon:'cm-settings',                                     href:'#/settings'}
            ];

            $scope.menuVisible = false;

            // click outside or handler
            $element.on('click', function() {
                $scope.handleMenu();
                $scope.$apply();
            });
            // click menu points
            $element.find('ul').on('click',function(e){
                e.stopPropagation();
            });

            $rootScope.$on('logout', function(){
                enableScroll();
            });

            $scope.handleMenu = function(){
                $scope.menuVisible = $scope.menuVisible ? false : true;
                // kill scroll if visible
                if($scope.menuVisible){
                    disableScroll();
                } else {
                    enableScroll();
                }
            };

            $scope.logout = function(){
                cmUserModel.doLogout();
            };
        }
    }
}