'use strict';

angular.module('cmUi')
.directive('cmCountryPhonePrefix',[
    'cmCountryPhonePrefix', 'flags',
    function (cmCountryPhonePrefix, flags){

        return{
            restrict: 'E',
            template: '<div ng-repeat="country in countries">' +
                        '<span ng-bind-html="::\':\'+country.shortcut+\':\'|flags"></span>'+
                        '+{{country.numberPrefix}}'+
                      '</div>',
            controller: function($scope){

                $scope.countries = [];

                function init(){
                    $scope.countries = cmCountryPhonePrefix.countries;
                }

                if(!cmCountryPhonePrefix.ready) {
                    cmCountryPhonePrefix.on('cmCountryPhonePrefix:loaded', init);

                    $scope.$on('$destroy', function () {
                        cmCountryPhonePrefix.off('cmCountryPhonePrefix:loaded', init);
                    });
                } else {
                    init();
                }
            }
        }
    }
])
.service('cmCountryPhonePrefix', [
    'cmObject',
    '$http',
    function(cmObject,
             $http){
        var self = {
            countries: [],
            ready: false,
            loadPrefixes: function(){
                if(self.countries.length > 0){
                    return false;
                }

                // load
                return $http({
                    url:'i18n/countryphoneprefix.json',
                    method:'GET'
                }).then(
                    function(response){
                        if(typeof response.data == 'object') {

                            response.data.forEach(function(rawCountry) {
                                var country = rawCountry.split(',');

                                self.countries.push({
                                    shortcut:country[0],
                                    numberPrefix:country[1]
                                });
                            });

                            self.ready = true;
                            self.trigger('cmCountryPhonePrefix:loaded');
                        }
                    },
                    function(response){

                    }
                );
            }
        };

        cmObject.addEventHandlingTo(self);

        self.loadPrefixes();

        return self;
    }
]);
