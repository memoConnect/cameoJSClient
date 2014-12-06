'use strict';

// https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin/

angular.module('cmPhonegap')
.service('cmLauncher', [
    '$rootScope', '$window',
    function ($rootScope, $window) {

        var self = {
            params: {},

            init: function(){
                // triggered at phonegapCameoConfig 'resources/phonegap/config.js'
                angular.element($window).on('launchApp',function(event) {
                    var url = event.detail.url,
                        protocolRegexp = '.*://',
                        queryRegexp = '([^?=&]+)(=([^&]*))?';

                    url
                        .replace(new RegExp( protocolRegexp, 'g' ),'')
                        .replace(new RegExp( queryRegexp, 'g' ),function( $0, $1, $2, $3 ){
                            self.params[ $1 ] = $3;
                        });

                    self.doLaunch();
                });
            },

            doLaunch: function(){
                console.log('doLaunch',self.params)
                // on launch with params
                if(Object.keys(self.params).length > 0) {
                    switch (true) {
                        case ('purlId' in self.params):
                            $rootScope.goTo('purl/'+self.params.purlId, true);
                        break;
                    }
                }
            }
        };

        return self;
    }
]);