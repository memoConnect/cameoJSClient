'use strict';

angular.module('cmConversations').directive('cmCaptcha',[
    function (){
        return {
            restrict: 		'AE',
            require:		'^cmConversation',
            template:		'<canvas id="canvas" width="100" height="37"></canvas>', //MOCK

            controller:		function($scope, $element, $attrs){

                var captcha;

                $scope.captchaDim = "405x150";
                $scope.captchaFont = "sans";
                $scope.captchaImageData = '';

                $scope.create = function(){
                    var dim = $scope.captchaDim.split("x");
                    captcha = new Captchagen({
                        width: dim[0]
                        ,height: dim[1]
                        ,text: $scope.passphrase
                        ,font: $scope.captchaFont
                    });
                    captcha.generate();

                    $scope.pass = captcha.text();
                };

                $scope.refreshCaptcha = function(){
                    captcha.refresh($scope.passphrase);
                };

                $scope.$watch('passphrase', $scope.refreshCaptcha)

                $scope.create();
            }
        }
    }
]);