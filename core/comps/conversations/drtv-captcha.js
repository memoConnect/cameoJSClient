'use strict';

angular.module('cmConversations').directive('cmCaptcha',[
    'cmCrypt', function (cmCrypt){
        return {
            restrict: 'AE',
            scope: true,
            require: '^cmConversation',
            template: '<canvas id="canvas"></canvas>', //MOCK

            controller:	function($scope, $element, $attrs){
                var captcha;

                $scope.captchaDim = $element[0].offsetWidth + 'x' + $element[0].offsetHeight;
                $scope.captchaFont = "sans";
                $scope.captchaImageData = '';

                $scope.create = function(){
                    var dim = $scope.captchaDim.split("x");
                    captcha = new Captchagen({
                        width: dim[0]
                        ,height: dim[1]
                        ,text: $scope.conversation.password || cmCrypt.generatePassword(6)
                        ,font: $scope.captchaFont
                    });
                    captcha.generate();

                    $scope.conversation.password = captcha.text();
                    $scope.conversation.tmpPassCaptcha = captcha.uri();
                };

                $scope.refreshCaptcha = function(){
                    captcha.refresh($scope.conversation.password);
                    $scope.conversation.tmpPassCaptcha = captcha.uri();
                };

                $scope.create();

                $scope.$watch('conversation.password', $scope.refreshCaptcha);
                $scope.$on('captcha:refresh',$scope.refreshCaptcha);
            }
        }
    }
]);