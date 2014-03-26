'use strict';

function cmMessageSmall() {
    return {
        restrict: 'AE',
        require: '^cmConversation',
        scope: true,
        templateUrl: 'comps/conversations/message-small.html',
        controller: function ($scope, $element, $attrs) {
            $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

            $scope.message.decrypt($scope.passphrase);

//            if ($scope.message.body.match(/^data:image/)) {
//                $scope.hasCaptcha = true;
//            }
//            if ($scope.message.body.match(/:requestCaptcha/)) {
//                $scope.captchaRequest = true;
//            }
        }
    }
}