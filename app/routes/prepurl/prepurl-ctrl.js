'use strict';

angular.module('cmRoutes')
.controller('PrepurlCtrl',
    function(cmDevice, cmEnv,
             $routeParams, $rootScope) {

        // on mobile browser call app otherwise go to purl
        if (!cmDevice.isApp() && cmDevice.isMobile()) {
            setTimeout(function(){
                $rootScope.goTo('/purl/'+$routeParams.purlId);
            }, 25);
            window.location = cmEnv.appProtocol+'://?purlId='+$routeParams.purlId;
        // otherwise
        } else {
            $rootScope.goTo('/purl/'+$routeParams.purlId);
        }
    }
);