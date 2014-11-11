'use strict';

angular.module('cmRoutes')
.controller('PrepurlCtrl',
    function(cmDevice, cmConfig,
             $routeParams, $rootScope) {

        // on mobile browser call app otherwise go to purl
        if (!cmDevice.isApp() && cmDevice.isMobile('PrepurlCtrl')) {
            setTimeout(function(){
                $rootScope.goTo('/purl/'+$routeParams.purlId);
            }, 25);
            window.location = cmConfig.appProtocol+'://?purlId='+$routeParams.purlId;
        // otherwise
        } else {
            $rootScope.goTo('/purl/'+$routeParams.purlId);
        }
    }
);