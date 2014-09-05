'use strict';

angular.module('cmCore').service('cmFileTypes',[
    function(){
        /**
         * e: extension
         * m: mimeType
         * @type {*[]}
         */
        var fileMimeTypes = [
            // image
            {e:'jpg,jpeg,jpe',m:'image/jpeg'},
            {e:'gif',m:'image/gif'},
            {e:'bmp',m:'image/bmp'},
            {e:'png',m:'image/png'},
            {e:'tif,tiff',m:'image/tiff'},
            // video
            {e:'mov',m:'video/quicktime'},
            {e:'mpg,mpa,mp2,mpe,mpeg',m:'video/mpeg'},
            {e:'mp4',m:'video/mp4'},
            {e:'flv',m:'video/x-flv'},
            {e:'avi',m:'video/x-msvideo'},
            // audio
            {e:'mp3',m:'audio/mpeg'},
            {e:'mp3',m:'audio/mp3'},
            {e:'wav',m:'audio/x-wav'},
            {e:'wma',m:'audio/x-ms-wma'},
            {e:'aif,aiff,aifc',m:'audio/x-aiff'},
            {e:'ogg',m:'audio/ogg'},
            {e:'3gpp',m:'video/3gpp'},
            {e:'aac',m:'audio/x-aac'},
            // docs
            {e:'pdf',m:'application/pdf'},
            {e:'txt',m:'text/plain'},
            {e:'xls,xlsx',m:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
            {e:'xls',m:'application/vnd.ms-excel'},
            {e:'doc',m:'application/msword'},
            {e:'docx,doc',m:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
            {e:'pps,ppt',m:'application/vnd.ms-powerpoint'},
            {e:'pptx',m:'application/vnd.openxmlformats-officedocument.presentationml.presentation'},
            // various
            {e:'php',m:'text/php'},
            {e:'css',m:'text/css'},
            {e:'zip',m:'application/zip'},
            {e:'zip',m:'application/x-zip-compressed'},
            {e:'rar',m:'application/x-rar-compressed'},
            {e:'sit',m:'application/x-stuffit'},
            {e:'eps',m:'application/postscript'},
            {e:'xml',m:'application/xml'},
            {e:'html,htm',m:'text/html'},
            {e:'chm',m:'application/vnd.ms-htmlhelp'},
            {e:'ttf',m:'application/x-font-ttf'},
            //{e:'exe',m:'application/octet-stream'},
            {e:'exe',m:'application/x-msdownload'},
            {e:'dmg',m:'application/x-apple-diskimage'},
            {e:'apk',m:'application/vnd.android.package-archive'}
        ],
        unknown = 'unknown';

        return {
            find: function(mime, filename){
                var self = this,
                    detectedExtension = unknown;
                // search for mimetype
                if(mime != undefined) {
                    angular.forEach(fileMimeTypes, function (type) {
                        if (mime != '' && type.m == mime) {
                            detectedExtension = self.getExtension(type.e, filename);
                        }
                    });
                }

                return detectedExtension;
            },

            findMimeType: function(detectedExtension){
                var mimeType = unknown;

                angular.forEach(fileMimeTypes, function (type) {
                    var findMime = type.e.split(',').filter(function(arrayExtension){
                        return arrayExtension == detectedExtension
                    });
                    if(findMime.length == 1)
                        mimeType = type.m;
                });

                return mimeType;
            },

            getMimeTypeViaFilename: function(filename){
                var arr_filename = filename && typeof filename == 'string' ? filename.split('.') : [],
                    extension = arr_filename.length > 1 ? arr_filename[arr_filename.length-1] : '',
                    detectedExtension = unknown,
                    mimeType = unknown;

                if(extension != ''){
                    detectedExtension = this.getExtension(extension, filename);
                    mimeType = this.findMimeType(detectedExtension);
                }

                return {
                    detectedExtension: detectedExtension,
                    mimeType: mimeType
                }
            },

            getExtension: function(extensions, filename){
                var extension = unknown,
                    extensions = extensions && typeof extensions == 'string' ? extensions.split(',') : [],
                    clearFilename = filename && typeof filename == 'string' ? filename.toLowerCase() : undefined;

                // no extensions exists
                if(!extensions || extensions == '')
                    return extension;

                // check filename
                if(clearFilename == undefined // no filename given
                || clearFilename == '' // filen is empty
                || clearFilename.split('.').length == 1 // filename has no extension
                ){
                    extension = extensions[0];
                } else {
                    angular.forEach(extensions, function (inExtension) {
                        if (clearFilename.search(inExtension+'$') != -1) {
                            extension = inExtension;
                        }
                    })
                }

                return extension;
            }
        }
    }
]);