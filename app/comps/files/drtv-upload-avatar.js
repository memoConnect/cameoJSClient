'use strict';

angular.module('cmFiles').directive('cmUploadAvatar',[
    'cmNotify', 'cmUserModel',
    '$rootScope',
    function(cmNotify, cmUserModel,
             $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-upload-avatar.html',

            link: function (scope, element) {
                // after add a image
                var watcher = $rootScope.$on('cmFiles:fileSetted', function(){
                    $rootScope.$broadcast('checkFiles', {
                        passphrase: undefined,
                        success: function(files) {
                            if (files.length > 0) {
                                files[0].uploadChunks();
                                files[0].one('upload:finish',function(){
                                    console.log('upload:finish');

                                    cmUserModel
                                    .data.identity
                                    .update({
                                        avatar: files[0].id
                                    });

                                    cmUserModel.data.identity.one('update:finished',function(){
                                        console.log('smth other todo??')
                                    });
                                });
                            }
                        },
                        error: function(error, header) {
                            cmNotify.warn('CONVERSATION.WARN.FILESIZE_REACHED', {
                                ttl: 0,
                                i18n: {
                                    maxFileSize: error,
                                    fileSize: header['X-File-Size'],
                                    fileName: header['X-File-Name']
                                }
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