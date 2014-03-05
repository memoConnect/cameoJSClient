'use strict';

function cmSpinner(){
    return {
        restrict: 'A',
        template: '<div class="modal-spinner-wrapper" ng-show="loading"><div class="modal-spinner"></div></div>',
        controller: function($scope, $element){
            $scope.loading = false;

            var spinner = new Spinner();
            var loadingContainer = angular.element.find('.modal-spinner')[0];

            $scope.$on('SHOW-SPINNER', function(){
                spinner = spinner.spin();
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