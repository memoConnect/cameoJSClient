'use strict';

function cmMessage(cmUserModel) {
    return {
        restrict: 'AE',
        require: '^cmConversation',
        scope: true,
        templateUrl: 'comps/conversations/message.html',
        controller: function ($scope, $element, $attrs) {
            $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

            $scope.message.decrypt($scope.passphrase);

            /*
            if ($scope.message.text.match(/^data:image/)) {
                $scope.hasCaptcha = true;
            }
            if ($scope.message.text.match(/:requestCaptcha/)) {
                $scope.captchaRequest = true;
            }


            $scope.checkAsset = function(){
                if ($scope.message.text.match(/^:asset,/)) {                             

                    $scope.assetId = $scope.message.text.replace(/^:asset,/,'')                                
                    
                    $scope.hasAsset = true;
                }else{
                    $scope.hasAsset = false
                }
            }

            $scope.$watchCollection('message', function(message){                
                $scope.checkAsset()
            })
            */

            $scope.is_my_own_message = $scope.message.isOwn();
        }
    }
}
