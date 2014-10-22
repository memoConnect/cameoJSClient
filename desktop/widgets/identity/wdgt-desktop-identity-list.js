'use strict';

/**
 * @ngdoc directive
 * @name cmDesktopWidgets.directive:cmDesktopWidgetIdentityListe
 * @description
 * Identity List with switch possibility
 *
 * @restrict E
 * @example
 */
angular.module('cmDesktopWidgets').directive('cmDesktopWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/identity/wdgt-desktop-identity-list.html',
            controller: function ($scope) {
                $scope.identities = cmUserModel.data.identities;

                function refresh(){
                    console.log('identities', $scope.identities)
                }

                refresh();

                cmUserModel.on('update:finished', refresh);

                $scope.switchToIdentity = function(identity){
                    cmUserModel.switchToIdentity(identity);
                };

                $scope.bam = function(identity){
                    if(identity.isActive == true){
                        $scope.goTo('/settings/identity/edit');
                    } else {
                        $scope.switchToIdentity(identity);
                    }
                };

                $scope.$on('$destroy', function(){
                    cmUserModel.off('update:finished', refresh)
                })
            }
        }
    }
]);