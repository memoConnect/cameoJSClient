'use strict';

angular.module('cmRoutes').controller('ErrorCtrl', [
    '$scope',
    '$rootScope',
    '$document',
    function ($scope, $rootScope, $document) {
        // if no errorThrown return to talks
        if(!('errorThrown' in $rootScope))
            $rootScope.goto('/talks');

        // at pending error to scope
        $scope.data_str = JSON.stringify($rootScope.errorThrown, undefined, 2);

        // hide broken page
        var views = $document[0].querySelectorAll('[ng-view]');
        if(views.length > 1)
            angular.element(views[1]).addClass('ng-hide');
    }
]);