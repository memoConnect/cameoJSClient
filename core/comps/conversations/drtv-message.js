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

                function handleFiles(){
                    if(scope.message.id == '#new_message' && scope.message.state.is('waitForFiles')){
                        setFileView();
                    }

                    if (!scope.textOnly && scope.message.files.length > 0) {
                        setFileView();

                        scope.conversation.getPassphrase()
                        .then(
                            function(passphrase){
                                scope.message.decryptFiles(passphrase);
                            },
                            function(passphrase){
                                if(!scope.message.isEncrypted())
                                    scope.message.decryptFiles(null)
                            }
                        )
                    }
                }


                if(typeof scope.message == 'object' && typeof scope.message.on == 'function'){
                    //Todo: this should be 'one' not 'on', shouldn't it? Andreas

                    scope.message.on('init:files', function(){
                        handleFiles();
                    });
                }

                handleFiles();

            },

            controller: function ($scope, $element, $attrs) {
                $scope.textOnly = !!$scope.$eval($attrs.textOnly);

                $scope.is_my_own_message = ('isOwn' in $scope.message) ? $scope.message.isOwn() : false;

                $scope.isType = function(expectType){
                    if(typeof $scope.message.files !== 'undefined' && $scope.message.files.length > 0 && typeof $scope.message.files[0].type == 'string'){
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
                    if($scope.message.id == undefined){
                        /**
                         * hack for empty messages
                         */                        
                        return false;
                    }

                    if(
                            $scope.message.text != undefined 
                        ||  (
                                    $scope.message.text == undefined 
                                &&  typeof $scope.message.files !== 'undefined' 
                                &&  $scope.message.files.length > 0
                            )
                    ){
                        return false;
                    }
                    return true;
                };
                
                $scope.messageProper = function(){
                    var isInComplete    =   $scope.message.state.is('incomplete'),

                        textAvailable   =       typeof $scope.message.text == 'string'
                                            &&  $scope.message.text.length > 0,

                        encrypted       =       $scope.message.isEncrypted(),

                        filesAvailable  =       typeof $scope.message.fileIds == 'object'
                                            &&  $scope.message.fileIds.length > 0,

                        isSending       =   $scope.message.state.is('sending')

                    if(isInComplete)
                        return false;

                    return filesAvailable || textAvailable || encrypted || isSending;
                }
            }
        }
    }
]);