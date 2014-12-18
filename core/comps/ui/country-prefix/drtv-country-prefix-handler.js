'use strict';

angular.module('cmUi')
.directive('cmCountryPrefixHandler',[
    'cmCountryPrefix',
    '$rootScope',
    function (cmCountryPrefix,
              $rootScope){

        return{
            restrict: 'E',
            templateUrl: 'comps/ui/country-prefix/drtv-country-prefix-handler.html',
            controller: function($scope){
                $scope.flag = ':bm:';
                $scope.numberPrefix = '+1441';

                $scope.listVisible = false;

                $scope.toggleList = function(forceClose){
                    $scope.listVisible  = !forceClose && $scope.listVisible || forceClose ? false : true;
                    $scope.$broadcast('cmCountryPrefixList:toggle', $scope.listVisible);
                };

                var killWatcher = $scope.$on('cmCountryPrefixHandler:set', function(event, country){
                    $scope.flag = ':'+country.shortcut+':';
                    $scope.numberPrefix = country.numberPrefix;

                    $scope.toggleList(true);
                });

                $scope.$on('$destroy', function(){
                    killWatcher();
                });
            }
        }
    }
]);