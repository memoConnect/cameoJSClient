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
                                console.warn('set spinner')
                                scope.imageUpload = true;
                                files[0].uploadChunks();
                                files[0].one('upload:finish',function(){
                                    console.warn('upload finished, update usermodel')
                                    cmUserModel
                                        .data.identity
                                        .update({
                                            avatar: files[0].id
                                        });

                                    cmUserModel.data.identity.one('update:finished', function(){
                                        console.warn('usermodel finished')

                                        cmUserModel.data.identity.one('avatar:loaded',function(){
                                            console.warn('avatar:loaded')
                                            $timeout(function(){
                                                    console.warn('timeout scope.imageUpload = false;')

                                                    scope.imageUpload = false;
                                                    $rootScope.$broadcast('cmUploadAvatar:success');
                                            },50);
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
                    cmAnswerFiles.off('file:setted', callback_file_setted);
                });
            }
        }
    }
]);