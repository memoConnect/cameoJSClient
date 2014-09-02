'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/identity/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')

                $scope.canCreate = !cmUserModel.hasPrivateKey();
            }
        }
    }
]);