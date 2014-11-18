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
                $scope.showLoader = false;

                $scope.identities = cmUserModel.data.identities || [];
                cmUserModel.on('update:finished', function(){
                    $scope.identities = cmUserModel.data.identities;
                });

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
            }
        }
    }
]);