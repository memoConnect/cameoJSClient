'use strict';

angular.module('cmFiles').directive('cmUploadAvatar',[
    'cmNotify', 'cmUserModel', 'cmAnswerFiles', 'cmErrorCodes',
    '$rootScope', '$timeout',
    function(cmNotify, cmUserModel, cmAnswerFiles, cmErrorCodes,
             $rootScope, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-upload-avatar.html',

            link: function (scope) {

                var callback_file_setted = function(){
                    cmAnswerFiles.validateChoosenFiles({
                        passphrase: undefined
                    }).then(
                        function(files){
                            if (files.length > 0) {
                                scope.imageUpload = true;
                                files[0].uploadChunks();
                                files[0].one('upload:finish',function(){
                                    cmUserModel
                                        .data.identity
                                        .update({
                                            avatar: files[0].id
                                        });

                                    cmUserModel.data.identity.one('update:finished', function(){
                                        cmUserModel.data.identity.one('avatar:loaded',function(){
                                            $timeout(function(){
                                                scope.imageUpload = false;
                                                $rootScope.$broadcast('cmUploadAvatar:success');
                                            },50);
                                        });
                                    });
                                });
                            }
                        },
                        function(error) {
                            cmNotify.warn(error.codes[0], {
                                ttl: 0,
                                i18n: cmErrorCodes.toI18n(error.codes[0], {
                                    error: error.data,
                                    headers: error.headers
                                })
                            });
                        }
                    )
                };

                scope.imageUpload = false;

                cmAnswerFiles.on('file:setted', callback_file_setted);

                scope.$on('$destroy',function(){
                    cmAnswerFiles.off('file:setted', callback_file_setted);
                });
            }
        }
    }
]);