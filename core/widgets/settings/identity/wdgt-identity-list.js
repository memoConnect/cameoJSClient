'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
]);