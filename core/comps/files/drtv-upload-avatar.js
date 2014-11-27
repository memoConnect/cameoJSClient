'use strict';

angular.module('cmFiles').directive('cmUploadAvatar',[
    'cmNotify', 'cmUserModel',
    '$rootScope', '$timeout',
    function(cmNotify, cmUserModel,
             $rootScope, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-upload-avatar.html',

            link: function (scope) {
                scope.imageUpload = false;
                // after add a image
                var watcher = $rootScope.$on('cmFilesFileSetted', function(){
                    $rootScope.$broadcast('cmFilesCheckFiles', {
                        passphrase: undefined,
                        success: function(files) {
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
                        error: function(errorCode, error, header) {
                            var i18n = {};
                            if(errorCode == 'FILE.UPLOAD.QUOTA.EXCEEDED'){
                                i18n = {
                                    totalQuota: error.totalQuota,
                                    quotaLeft: error.quotaLeft,
                                    fileSize: error.fileSize
                                }
                            } else if(errorCode == 'FILE.UPLOAD.FILESIZE.EXCEEDED'){
                                i18n = {
                                    fileSize: header['X-File-Size'],
                                    fileName: header['X-File-Name'],
                                    maxFileSize: error.maxFileSize
                                }
                            }

                            cmNotify.warn(errorCode, {
                                ttl: 0,
                                i18n: i18n
                            });
                        }
                    });
                });
                scope.$on('$destroy',function(){
                    watcher();
                });
            }
        }
    }
]);