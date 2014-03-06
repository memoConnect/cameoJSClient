'use strict';

function cmMessage(cmAuth) {
    return {
        restrict: 'AE',
        require: '^cmConversation',
        scope: true,
        templateUrl: 'comps/conversations/message.html',
        controller: function ($scope, $element, $attrs) {
            $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

            $scope.message.decryptWith($scope.passphrase);

            if ($scope.message.body.match(/^data:image/)) {
                $scope.hasCaptcha = true;
            }
            if ($scope.message.body.match(/:requestCaptcha/)) {
                $scope.captchaRequest = true;
            }

            cmAuth.getIdentity().then(
                function (identity) {
                    $scope.is_my_own_message = ($scope.message.from == identity.id)
                }
            );
        }
    }
}
