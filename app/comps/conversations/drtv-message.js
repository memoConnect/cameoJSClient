'use strict';

angular.module('cmConversations').directive('cmMessage', [
    function cmMessage() {
        return {
            restrict: 'AE',
            require: '^cmConversation',
            scope: true,
            templateUrl: 'comps/conversations/tpl-message.html',
            controller: function ($scope, $element, $attrs) {
                if($attrs.truncate !== undefined){
                    $scope.truncate = $attrs.truncate;
                }

                $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

                $scope.message.decrypt($scope.passphrase);
                $scope.textOnly = !!$scope.$eval($attrs.textOnly)


    //            $scope.truncateLength = $scope.$eval($attrs.truncate);

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
])