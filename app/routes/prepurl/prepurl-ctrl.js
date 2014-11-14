'use strict';

angular.module('cmRoutes')
.controller('PrepurlCtrl', [
    'cmDevice', 'cmConfig',
    '$routeParams', '$rootScope', '$scope', '$timeout',
    function(cmDevice, cmConfig,
             $routeParams, $rootScope, $scope, $timeout) {

        var params = angular.extend({},$routeParams);

        $rootScope.goTo('/purl/' + params.purlId);
        return false;

        // TODO: ???!!!

        $scope.$on('$routeChangeSuccess', function() {
            $scope.launchSrc = '';
            // on mobile browser call app otherwise go to purl
            if (!cmDevice.isApp() && cmDevice.isMobile('PrepurlCtrl')) {
                $timeout(function () {
                    $rootScope.goTo('/purl/'+params.purlId);
                }, 25);
                //window.location =
                $scope.launchSrc = cmConfig.appProtocol + '://?purlId=' + params.purlId;
                //<iframe ng-src="{{launchSrc}}"></iframe>
                // otherwise
            } else {
                $rootScope.goTo('/purl/' + params.purlId);
            }
        });
    }
]);