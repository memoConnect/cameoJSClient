'use strict';

function cmHeaderMenu(cmUserModel){
    return {
        scope: true,
        templateUrl: 'shared/ui/header-menu.html',
        controller: function($scope){

            $scope.btns = [
                {i18n:'MENU.HEADER',icon:'cm-menu',menuClass:'cm-menu-header'},
                {i18n:'MENU.NOTIFICATIONS',icon:'cm-bell',menuClass:'cm-menu-notify',href:'#/notfications'},
                {i18n:'MENU.FRIENDREQUESTS',icon:'cm-contacts',menuClass:'cm-menu-notify',href:'#/contacts/request'},
                {i18n:'MENU.MESSAGES',icon:'cm-envelope-closed',menuClass:'cm-menu-notify',href:'#/talks'},
                {i18n:'MENU.HINTS',icon:'cm-info',menuClass:'cm-menu-notify',href:'#/notfications/hints'},
                {i18n:'MENU.ACTIVITY',icon:'cm-person',href:'#/settings'},
                {i18n:'MENU.SETTINGS',icon:'cm-settings',href:'#/settings'},
            ];

            $scope.menuVisible = false;

            $scope.handleMenu = function(){
                $scope.menuVisible = $scope.menuVisible ? false : true;
            };

            $scope.logout = function(){
                cmUserModel.doLogout();
            };

        }
    }
}