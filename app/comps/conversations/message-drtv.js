'use strict';

function cmMessage(cmUserModel) {
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

            $scope.is_my_own_message = ($scope.message.from == cmUserModel.data.id);
        }
    }
}
