'use strict';

function cmHeaderMenu(cmUserModel){
    return {
        scope: true,
        template: '<i class="fa cm-menu cm-handler" ng-click="handleMenu()"></i>' +
                  '<div class="cm-menu-layer" ng-show="menuVisible">' +
                    '<div class="cm-nose-wrapper" ng-click="handleMenu()"><i class="fa cm-nose-up"></i></div>' +
                    '<ul class="list-group">' +
                        '<li class="cm-list-group-item" ng-repeat="btn in btns" ng-class="btn.menuClass">' +
                            '<i class="fa" ng-if="btn.icon != undefined" ng-class="btn.icon"></i>' +
                            '<a ng-if="btn.href != undefined" href="{{btn.href}}">{{btn.i18n|cmTranslate}}</a>' +
                            '<span ng-if="btn.click != undefined" ng-click="btn.click">{{btn.i18n|cmTranslate}}</span>' +
                            '<span ng-if="btn.click == undefined && btn.href == undefined">{{btn.i18n|cmTranslate}}</span>' +
                        '</li>' +
                        '<li class="cm-list-group-item">' +
                            '<i class="fa cm-logout"></i>' +
                            '<span ng-click="logout()">{{"MENU.LOGOUT"|cmTranslate}}</span>' +
                        '</li>' +
                    '</ul>' +
                  '</div>' +
                  '<div modal-backdrop ng-show="menuVisible" ng-click="handleMenu()"></div>',
        controller: function($scope){

            $scope.btns = [
                {i18n:'MENU.HEADER',icon:'cm-menu',menuClass:'cm-menu-header'},
                {i18n:'MENU.SETTINGS',icon:'cm-settings',href:'#/settings'},
//                {i18n:'MENU.LOGOUT',icon:'cm-logout',click:'logout()'}
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