'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmCountryPrefixHandler
 * @description
 * a toggle handler for country prefix choosing
 *
 * @restrict A
 * @requires cmCountryPrefix
 *
 * @example
 <example module="cmDemo">
     <file name="script.js">
         angular
         .module('cmDemo', ['cmUi'])
         .controller('Ctrl', function ($scope){

                $scope.phoneNumberUndefined = undefined;
                $scope.phoneNumberUndefinedOut = undefined;
                $scope.phoneNumberEmpty = '';
                $scope.phoneNumberEmptyOut = '';
                $scope.phoneNumberFull = '+4900000000';
                $scope.phoneNumberFullOut = '+4900000000';

         });
     </file>
     <file name="index.html">
     <div ng-controller="Ctrl">
         <cm-form-phonenumber
             ng-model="phoneNumberUndefiend"
             ng-model-out="phoneNumberUndefinedOut"
             cm-tabindex="1"
             cm-label="phoneNumber model undefined"
         ></cm-form-phonenumber>
         {{'phoneNumberUndefined: '+phoneNumberUndefinedOut}}

         <cm-form-phonenumber
             ng-model="phoneNumberEmpty"
             ng-model-out="phoneNumberEmptyOut"
             cm-tabindex="2"
             cm-label="phoneNumber model empty"
         ></cm-form-phonenumber>
         {{'phoneNumberEmpty: '+phoneNumberEmptyOut}}

         <cm-form-phonenumber
             ng-model="phoneNumberFull"
             ng-model-out="phoneNumberFullOut"
             cm-tabindex="3"
             cm-label="phoneNumber model data"
         ></cm-form-phonenumber>
         {{'phoneNumberFull: '+phoneNumberFullOut}}
     </file>
 </example>
 */

angular.module('cmUi')
.directive('cmCountryPrefixHandler',[
    'cmCountryPrefix',
    function (cmCountryPrefix){

        return{
            restrict: 'E',
            templateUrl: 'comps/ui/country-prefix/drtv-country-prefix-handler.html',
            controller: function($scope){
                $scope.activeCountry = {};

                cmCountryPrefix.getDefaultCountry().then(function(country){
                    $scope.activeCountry = country
                });

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