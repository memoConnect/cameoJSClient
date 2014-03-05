'use strict';

function cmSpinner(){
    return {
        restrict: 'A',
        template: '<div ng-show="loading"><div class="modal-spinnner"></div></div>',
        controller: function($scope, $element){
            $scope.loading = false;

            var spinner = null;
            var loadingContainer = $element.find('.modal-spinner')[0];

            $scope.$on('SHOW-SPINNER', function(){
                spinner = new Spinner().spin();
                loadingContainer.appendChild(spinner.el);
                $scope.loading = true
            });
            $scope.$on('HIDE-SPINNER', function(){
                spinner.stop();
                $scope.loading = false
            });
        }
    }
};