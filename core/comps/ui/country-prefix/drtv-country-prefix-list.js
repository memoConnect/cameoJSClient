'use strict';

angular.module('cmUi')
.directive('cmCountryPrefixList',[
    'cmCountryPrefix',
    function (cmCountryPrefix){

        return{
            restrict: 'E',
            templateUrl: 'comps/ui/country-prefix/drtv-country-prefix-list.html',
            controller: function($scope){

                $scope.listVisible = false;
                $scope.countries = [];
                // init
                cmCountryPrefix.getCountries().then(function(countries){
                    $scope.countries = countries;
                });

                $scope.chooseCountry = function(country){
                    $scope.$broadcast('cmCountryPrefixHandler:set', country);
                };

                // event handling
                var killWatcher = $scope.$on('cmCountryPrefixList:toggle', function(event, visibility){
                    $scope.listVisible = visibility;
                });

                $scope.$on('$destroy', function(){
                    killWatcher();
                });
            }
        }
    }
]);