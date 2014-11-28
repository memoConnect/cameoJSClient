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
                                        $timeout(function(){
                                            cmUserModel.data.identity.one('avatar:loaded',function(){
                                                scope.imageUpload = false;
                                            });
                                        });
                                    });
                                });
                            }
                        },
                        function(errorCode, error, header) {
                            cmNotify.warn(errorCode, {
                                ttl: 0,
                                i18n: cmErrorCodes.toI18n(errorCode, {
                                    error: error,
                                    header: header
                                })
                            });
                        }
                    )
                };

                scope.imageUpload = false;

                cmAnswerFiles.on('file:setted', callback_file_setted);

                scope.$on('$destroy',function(){
                    cmAnswerFiles.off('save:aborted', callback_file_setted);
                });
            }
        }
    }
]);