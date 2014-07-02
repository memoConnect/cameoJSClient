'use strict';

angular.module('cmConversations').directive('cmMessage', [
    function () {
        return {
            restrict: 'AE',
            scope: {
                message: '=cmData',
                conversation: '=cmDataConversation'
            },
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
                $scope.textOnly = !!$scope.$eval($attrs.textOnly);

                $scope.is_my_own_message = ('isOwn' in $scope.message) ? $scope.message.isOwn() : false;

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
                    if($scope.message.text != undefined || ($scope.message.text == undefined && $scope.message.files.length > 0)){
                        return false;
                    }
                    return true;
                };
            }
        }
    }
]);