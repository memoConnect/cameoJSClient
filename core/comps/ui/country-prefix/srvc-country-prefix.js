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

                // add to ngModelOut the prefix
                scope.$on('cmCountryPrefixHandler:set',function(event, country){
                    if(country && scope.ngModel && scope.ngModel != '') {
                        scope.ngModelOut = country.numberPrefix + scope.ngModel;
                    } else {
                        scope.ngModelOut = '';
                    }
                });

                // check if already have a prefix
                scope.$watch('ngModel', function(data){
                    // check if country chooser is visible
                    // if phoneNumber hasn't +00
                    // or undefined
                    // after choose and enter merge country and number together
                    if(!data || data && (data != '' && data.indexOf('+') == -1 || data == '')){
                        scope.prefixHandler.isVisible = true;
                        if(data && data != '') {
                            scope.ngModelOut = scope.activeCountry.numberPrefix + data;
                        } else {
                            scope.ngModelOut = '';
                        }
                    // phoneNumber already has +00 inside
                    } else {
                        scope.prefixHandler.isVisible = false;
                        scope.ngModelOut = data;
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
                                    numberPrefix:'+'+country[1],
                                    numberPrefixRaw:country[1]
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
            getDefaultCountry: function(){
                var deferered = $q.defer();

                deferered.resolve({
                    shortcut: 'de',
                    numberPrefix: '+49'
                });

                return deferered.promise;
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
            },
            getOneByShortcut: function(shortcut){
                return self.countries.filter(function(country){
                    return shortcut && country.shortcut == shortcut;
                });
            }
        };

        cmObject.addEventHandlingTo(self);

        self.loadPrefixes();

        return self;
    }
]);
