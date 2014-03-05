'use strict';

function cmSpinner(){
    return {
        restrict: 'A',
        template: '<div ng-show="loading"><div class="modal-spinner"></div></div>',
        controller: function($scope, $element){
            $scope.loading = false;

            var spinner = null;
            var loadingContainer = angular.element($element[0].querySelector('.modal-spinner'))[0];

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