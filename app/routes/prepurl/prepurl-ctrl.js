'use strict';

angular.module('cmRoutes')
.controller('PrepurlCtrl', [
    'cmDevice', 'cmConfig',
    '$routeParams', '$rootScope', '$scope', '$timeout', '$window',
    function(cmDevice, cmConfig,
             $routeParams, $rootScope, $scope, $timeout, $window) {

        var params = angular.extend({},$routeParams),
            deviceInfo = cmDevice.detectOSAndBrowser(),
            playStoreScan = 'intent://scan/#Intent;scheme='+cmConfig.appProtocol+';package=io.cameo.local.cameo;end',
            url = cmConfig.appProtocol + '://?purlId=' + params.purlId;

        function launchCustomProtocol(callback) {
            var success = false,
                body = angular.element(document.querySelector('body'));

            console.log('launchCustomProtocol',deviceInfo.browser)

            if (deviceInfo.browser == 'Internet Explorer') {
                var myWindow = window.open('', '', 'width=0,height=0');
                myWindow.document.write('<iframe src="' + url + '"></iframe>');

                setTimeout(function () {
                    try {
                        myWindow.location.href;
                        success = true;
                    } catch (ex) {
                        console.log(ex);
                    }

                    if (success) {
                        myWindow.setTimeout('window.close()', 100);
                    } else {
                        myWindow.close();
                    }

                    callback(success);
                }, 100);
            } else if (deviceInfo.browser === 'Mozilla Firefox') {
                try {
                    var iframe = angular.element('<iframe />');
                    iframe.css({'display': 'none'});
                    body.append(iframe);
                    iframe[0].contentWindow.location.href = url;

                    success = true;
                } catch (ex) {
                    console.log(ex)
                    success = false;
                }
                callback(success);
            } else if (deviceInfo.browser === 'Google Chrome') {

                try {
                    var iframe = angular.element('<iframe />');
                    iframe.css({'display': 'none'});
                    body.append(iframe);
                    iframe.on('load', function(){
                        success = false;
                    });

                    iframe.attr('src',url);

                    success = true;
                } catch (ex) {
                    console.log(ex)
                    success = false;
                }

                callback(success);

            } else if (deviceInfo.browser === 'Safari') {
                setTimeout(function() {
                    if (!document.webkitHidden)
                        callback(true);
                }, 25);

                window.location = url;
            }

            // opera
            //iframe.contentWindow.location = 'randomprotocolstring://test/';
            //window.setTimeout(function () {
            //    try {
            //        alert(ifr.contentWindow.location);
            //    } catch (e) { window.location = '/download/'; }
            //}, 0);
        }

        $scope.$on('$routeChangeSuccess', function() {
            $scope.launchSrc = '';
            // on mobile browser call app otherwise go to purl
            //if (!cmDevice.isApp() && cmDevice.isMobile('PrepurlCtrl')) {
                launchCustomProtocol(function(success){
                    console.log('launchCustomProtocol.callback',success)
                    $rootScope.goTo('/purl/' + params.purlId);
                });
            //va
            //} else {
            //    $rootScope.goTo('/purl/' + params.purlId);
            //}
        });
    }
]);