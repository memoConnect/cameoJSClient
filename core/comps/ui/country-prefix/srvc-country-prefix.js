'use strict';

angular.module('cmUi')
.service('cmCountryPrefix', [
    'cmObject', 'cmConfig',
    '$http', '$q',
    function(cmObject, cmConfig,
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
                    // if phoneNumber hasn't +49
                    // or undefined
                    // after choose and enter merge country and number together
                    if(!data || data && (data != '' && data.indexOf('+') == -1 || data == '')){
                        scope.prefixHandler.isVisible = true;

                        var correctData = data;
                        // clear leading zero
                        if (correctData && correctData.indexOf('0') == 0) {
                            while (correctData.charAt(0) === '0')
                                correctData = correctData.substr(1);
                        }
                        // set to model or let it blank
                        if(correctData && correctData != '') {
                            scope.ngModelOut = scope.activeCountry.numberPrefix + correctData;
                        } else {
                            scope.ngModelOut = '';
                        }
                    // phoneNumber already has +49 inside
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
                    url: cmConfig.pathToLanguages+'/countryprefix.json',
                    method: 'GET'
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

                if(!self.ready){
                    self.loadPrefixes()
                    .then(function(){
                        deferered.resolve(self.countries);
                    })
                } else {
                    deferered.resolve(self.countries);
                }

                return deferered.promise;
            },
            getOneByShortcut: function(shortcut){
                if(typeof shortcut != 'string')
                    return [];

                return self.countries.filter(function(country){
                    return shortcut && country.shortcut == shortcut;
                });
            },
            getOneByNumberPrefix: function(numberPrefix){
                if(typeof numberPrefix != 'string' && typeof numberPrefix != 'number')
                    return [];

                return self.countries.filter(function(country){
                    return numberPrefix && country.numberPrefix == numberPrefix
                        || numberPrefix && country.numberPrefixRaw == numberPrefix;
                });
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
]);
