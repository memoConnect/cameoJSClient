'use strict';

// https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin/

angular.module('cmPhonegap')
.service('cmLauncher', [
    '$rootScope', '$window',
    function ($rootScope, $window) {

        var self = {
            params: {},

            parse: function(url){
                var protocolRegexp = '.*://',
                    queryRegexp = '([^?=&]+)(=([^&]*))?';

                url
                    .replace(new RegExp( protocolRegexp, 'g' ),'')
                    .replace(new RegExp( queryRegexp, 'g' ),function( $0, $1, $2, $3 ){
                        self.params[ $1 ] = $3;
                    });

                this.doLaunch();
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

        // do it global
        $window.handleOpenURL = function(url) {
            self.parse(url);
        };

        return self;
    }
]);