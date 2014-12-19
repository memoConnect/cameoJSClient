'use strict';

angular.module('cmUi')
.directive('cmCountryPrefixHandler',[
    'cmCountryPrefix',
    function (cmCountryPrefix){

        return{
            restrict: 'E',
            templateUrl: 'comps/ui/country-prefix/drtv-country-prefix-handler.html',
            controller: function($scope, $element){

                $scope.activeCountry = {
                    shortcut: 'de',
                    numberPrefix: '+49'
                };

                $scope.listVisible = false;

                $scope.toggleList = function(forceClose){
                    $scope.listVisible  = !forceClose && $scope.listVisible || forceClose ? false : true;
                    $scope.$broadcast('cmCountryPrefixList:toggle', $scope.listVisible, $scope.activeCountry);
                };

                // event handling
                var killWatcher = $scope.$on('cmCountryPrefixHandler:set', function(event, country){
                    if(country)
                        $scope.activeCountry = country;
                    $scope.toggleList(true);
                });

                $scope.$on('$destroy', function(){
                    killWatcher();
                });
            }
        }
    }
]);