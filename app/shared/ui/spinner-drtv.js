'use strict';

function cmSpinner(){
    return {
        restrict: 'A',
        template: '<div ng-show="loading"></div>',
        controller: function($scope, $element){
            $scope.loading = false;

            var spinner = null;
            var loadingContainer = angular.element('<div></div>')
                                    .addClass('modal-spinner')
                                    [0];

            $scope.$on('SHOW-SPINNER', function(){
                spinner = new Spinner().spin();
                loadingContainer.appendChild(spinner.el);
                $scope.loading = true
            });
            $scope.$on('HIDE-SPINNER', function(){
                spinner.stop();
                loadingContainer.innerHTML = '';
                $scope.loading = false
            });
        }
    }
};