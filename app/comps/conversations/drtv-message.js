'use strict';

angular.module('cmConversations').directive('cmMessage', [
    function () {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/conversations/drtv-message.html',

            link: function(scope, element){
                if(!scope.textOnly) {
                    // add css classes
                    if (scope.message.files.length > 0) {
                        element.addClass('file-view');
                    }
                    if (scope.message.isOwn()) {
                        element.addClass('right');
                    }
                }
            },

            controller: function ($scope, $element, $attrs) {
                if($attrs.truncate !== undefined){
                    $scope.truncate = $attrs.truncate;
                }

                $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

                $scope.textOnly = !!$scope.$eval($attrs.textOnly);

                $scope.is_my_own_message = $scope.message.isOwn();

                /*
                $scope.message.decrypt($scope.passphrase);

                $scope.truncateLength = $scope.$eval($attrs.truncate);

                if ($scope.message.text.match(/^data:image/)) {
                    $scope.hasCaptcha = true;
                }
                if ($scope.message.text.match(/:requestCaptcha/)) {
                    $scope.captchaRequest = true;
                }
                */
            }
        }
    }
]);