'use strict';

angular.module('cmRoutes')
.controller('PrepurlCtrl', [
    'cmDevice', 'cmConfig',
    '$routeParams', '$rootScope', '$scope', '$timeout', '$window',
    function(cmDevice, cmConfig,
             $routeParams, $rootScope, $scope, $timeout, $window) {

        var params = angular.extend({},$routeParams);

        $scope.$on('$routeChangeSuccess', function() {
            $scope.launchSrc = '';
            // on mobile browser call app otherwise go to purl
            //if (!cmDevice.isApp() && cmDevice.isMobile('PrepurlCtrl')) {
                $timeout(function () {
                    $rootScope.goTo('/purl/'+params.purlId);
                }, 25);

            //var popup = $window.open(cmConfig.appProtocol + '://?purlId=' + params.purlId);
            //    popup.blur();
            //    $window.focus();

            window.location = 'intent://scan/#Intent;scheme='+cmConfig.appProtocol+';package='+io.cameo.local.cameo+';end'

                //$scope.launchSrc =
                //<iframe ng-src="{{launchSrc}}"></iframe>
                // otherwise
            //} else {
            //    $rootScope.goTo('/purl/' + params.purlId);
            //}
        });
    }
]);