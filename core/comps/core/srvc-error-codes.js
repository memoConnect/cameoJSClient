'use strict';

angular.module('cmCore')
.service('cmErrorCodes', [
    function(){

        var self = {
            toI18n: function(errorCode, data){
                var i18n = {};
                switch(true){
                    case (errorCode == 'FILE.UPLOAD.QUOTA.EXCEEDED'):
                        i18n = {
                            totalQuota: data.error.totalQuota,
                            quotaLeft: data.error.quotaLeft,
                            fileSize: data.error.fileSize
                        };
                    break;
                    case (errorCode == 'FILE.UPLOAD.FILESIZE.EXCEEDED'):
                        i18n = {
                            fileSize: data.header['X-File-Size'],
                            fileName: data.header['X-File-Name'],
                            maxFileSize: data.error.maxFileSize
                        };
                    break;
                }
            return i18n;
            }
        };

        return self;
    }
]);