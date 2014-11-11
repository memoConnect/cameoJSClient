'use strict';

// https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin/

angular.module('cmPhonegap')
.service('cmLauncher', [
    '$rootScope',
    function ($rootScope) {

        var self = {
            params: {},

            init: function(){
                // applauncher plugin call that method
                window.handleOpenURL = function(url) {
                    var protocolRegexp = '.*://',
                        queryRegexp = '([^?=&]+)(=([^&]*))?';

                    url
                        .replace(new RegExp( protocolRegexp, 'g' ),'')
                        .replace(new RegExp( queryRegexp, 'g' ),function( $0, $1, $2, $3 ){
                            self.params[ $1 ] = $3;
                        });

                    console.log('handleOpenURL',self.params)

                    self.doLaunch();
                }
            },

            doLaunch: function(){

                // on launch with params
                if(Object.keys(self.params).length > 0) {

                    console.log('doLaunch',JSON.stringify(self.params))

                    switch (true) {
                        case ('purlId' in self.params):
                            $rootScope.goTo('purl/'+self.params.purlId, true);
                            return false;
                        break;
                    }
                }

            }
        };

        return self;
    }
]);