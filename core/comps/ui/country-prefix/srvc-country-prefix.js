'use strict';

angular.module('cmUi')
.service('cmCountryPrefix', [
    'cmObject',
    '$http', '$q',
    function(cmObject,
             $http, $q){
        var self = {
            countries: [],
            ready: false,
            handleView: function(scope){

                scope.prefixHandler = {
                    isVisible: false
                };

                // check if already have a prefix
                scope.$watch('ngModel', function(data){
                    if(!data || data && (data != '' && data.indexOf('+') == -1 || data == '')){
                        scope.prefixHandler.isVisible = true;
                    } else {
                        scope.prefixHandler.isVisible = false;
                    }
                });

            },
            loadPrefixes: function(){
                if(self.countries.length > 0){
                    return false;
                }

                // load
                return $http({
                    url:'i18n/countryprefix.json',
                    method:'GET'
                }).then(
                    function(response){
                        if(typeof response.data == 'object') {

                            response.data.forEach(function(rawCountry) {
                                var country = rawCountry.split(',');

                                self.countries.push({
                                    shortcut:country[0],
                                    numberPrefix:'+'+country[1]
                                });
                            });

                            self.ready = true;
                            self.trigger('cmCountryPrefix:loaded');
                        }
                    },
                    function(response){

                    }
                );
            },
            getCountries: function(){
                var deferered = $q.defer();

                if(self.ready){
                    self.on('cmCountryPrefix:loaded', function(){
                        deferered.resolve(self.countries);
                    });
                } else {
                    deferered.resolve(self.countries);
                }

                return deferered.promise;
            }
        };

        cmObject.addEventHandlingTo(self);

        self.loadPrefixes();

        return self;
    }
]);
