'use strict';

angular.module('cmFiles').directive('cmUploadAvatar',[
    'cmNotify',
    '$rootScope',
    function(cmNotify,
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
                                    console.log(files[0].id);
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