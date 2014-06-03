'use strict';

angular.module('cmUi').directive('cmSpinner',[
    function (){
        return {
            restrict: 'AE',
            template: '<div class="spinner-wrapper" ng-show="loading"><div class="spinner"></div></div>',
            controller: function($scope, $element, $attrs){
                $scope.loading = false;

                var opts = {};
                if($attrs.cmLength)
                    opts.length = $attrs.cmLength;
                if($attrs.cmRadius)
                    opts.radius = $attrs.cmRadius;
                if($attrs.cmColor)
                    opts.color = $attrs.cmColor;
                if($attrs.cmWidth)
                    opts.width = $attrs.cmWidth;

                var spinner = new Spinner(opts);
                var loadingContainer = angular.element($element[0].querySelector('.spinner'))[0];


                $scope.$watch($attrs.ngShow, function(bool){
                    if(bool != false){
                        spinner = spinner.spin();
                        loadingContainer.appendChild(spinner.el);
                        $scope.loading = true
                    } else {
                        spinner.stop();
                        loadingContainer.innerHTML = '';
                        $scope.loading = false
                    }
                });

                $scope.$on('cmSpinner:start', function(){
                    spinner = spinner.spin();
                    loadingContainer.appendChild(spinner.el);
                    $scope.loading = true
                });
                $scope.$on('cmSpinner:stop', function(){
                    spinner.stop();
                    loadingContainer.innerHTML = '';
                    $scope.loading = false
                });
            }
        }
    }
]);