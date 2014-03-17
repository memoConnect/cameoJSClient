'use strict';

function cmHeaderMenu(cmUserModel){
    return {
        scope: true,
        template: '<i class="fa cm-menu" ng-click="handleMenu()"></i>' +
                  '<div class="cm-menu-layer" ng-show="menuVisible">' +
                    '<div class="cm-nose-wrapper" ng-click="handleMenu()"><i class="fa cm-nose-up"></i></div>' +
                    '<ul class="list-group">' +
                        '<li class="cm-list-group-item cm-menu-header"><a><i class="fa cm-menu"></i>{{"MENU.HEADER"|cmTranslate}}</a></li>' +
                        '<li class="cm-list-group-item"><a ng-click="logout()"><i class="fa cm-logout"></i>{{"MENU.LOGOUT"|cmTranslate}}</a></li>' +
                    '</ul>' +
                  '</div>',
        controller: function($scope){
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