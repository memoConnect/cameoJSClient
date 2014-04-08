'use strict';

function cmIdentity(cmUserModel){
    return {
        restrict: 'AE',
        template: '<cm-avatar cm-data="identity"></cm-avatar> {{identity.getDisplayName()}}',
        scope: true,
        controller: function($scope, $element, $attrs){
            $scope.identity = cmUserModel.data.identity;
        }
    }
}