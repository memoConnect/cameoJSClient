'use strict';

angular.module('cmConversations').directive('cmMessage', [
    function () {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/conversations/drtv-message.html',

            link: function(scope, element){

                function setFileView(){
                    element.addClass('file-view');
                }

                if(!scope.textOnly) {
                    // add css classes
                    if (scope.message.files.length > 0) {
                        setFileView();
                    }
                    if (scope.message.isOwn()) {
                        element.addClass('right');
                    }
                }

                scope.message.on('init:files', function(){
                    if (scope.message.files.length > 0) {
                        setFileView();
                        scope.message.decryptFiles(scope.conversation.getPassphrase());
                    }
                });
            },

            controller: function ($scope, $element, $attrs) {
                /*
                 $scope.message.decrypt($scope.passphrase);

                 $scope.truncateLength = $scope.$eval($attrs.truncate);

                 if ($scope.message.text.match(/^data:image/)) {
                    $scope.hasCaptcha = true;
                 }
                 if ($scope.message.text.match(/:requestCaptcha/)) {
                    $scope.captchaRequest = true;
                 }
                 if($attrs.truncate !== undefined){
                    $scope.truncate = $attrs.truncate;
                 }
                 */

                $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

                $scope.textOnly = !!$scope.$eval($attrs.textOnly);

                $scope.is_my_own_message = $scope.message.isOwn();

                $scope.isType = function(expectType){
                    if($scope.message.files.length > 0 && typeof $scope.message.files[0].type == 'string'){
                        var mimeType = $scope.message.files[0].type;
                        if(expectType == 'image' && mimeType.search('^image') != -1){
                            return true;
                        } else if(expectType == 'file' && mimeType.search('^image') == -1){
                            return true;
                        }
                    } else if(expectType == 'text')
                        return true;
                };

                $scope.displayEncrypted = function(){
                    if($scope.message.text != undefined || $scope.message.text == undefined && $scope.message.files.length > 0){
                        return false;
                    }
                    return true;
                };
            }
        }
    }
]);