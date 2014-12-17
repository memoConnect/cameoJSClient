'use strict';

angular.module('cmUi')
.directive('cmCountryPhonePrefix',[
    'cmCountryPhonePrefix', 'flags',
    function (cmCountryPhonePrefix, flags){

        cmCountryPhonePrefix
        .loadPrefixes()
        .then(function(prefixes){
            console.log(flags.items,prefixes)
        });

        return{
            restrict: 'E',
            link: function(scope, element){

            }
        }
    }
])
.service('cmCountryPhonePrefix', [
    '$http',
    function($http){
        var self = {
            prefixes: [],
            loadPrefixes: function(){

                if(self.prefixes.length > 0){
                    return false;
                }

                return $http({
                    url:'i18n/countryphoneprefix.json',
                    method:'GET'
                }).then(
                    function(response){
                        console.log(response)

                        var structure = "country,numberPrefix"

                        self.prefixes = response.data;

                        return response.data;
                    },
                    function(response){

                    }
                );
            }
        };
        return self;
    }
]);
