'use strict';

angular.module('cmUi').service('cmFileTypes',[
    function(){
        /**
         * e: extension
         * m: mimeType
         * @type {*[]}
         */
        var fileMimeTypes = [
            // image
            {e:['jpg','jpeg','jpe'],m:'image/jpeg'},
            {e:'gif',m:'image/gif'},
            {e:'bmp',m:'image/bmp'},
            {e:'png',m:'image/png'},
            {e:['tif','tiff'],m:'image/tiff'},
            // video
            {e:'mov',m:'video/quicktime'},
            {e:['mpg','mpa','mp2','mpe','mpeg'],m:'video/mpeg'},
            {e:'mp4',m:'video/mp4'},
            {e:'flv',m:'video/x-flv'},
            {e:'avi',m:'video/x-msvideo'},
            // audio
            {e:'mp3',m:'audio/mpeg'},
            {e:'mp3',m:'audio/mp3'},
            {e:'wav',m:'audio/x-wav'},
            {e:'wma',m:'audio/x-ms-wma'},
            {e:['aif','aiff','aifc'],m:'audio/x-aiff'},
            {e:'ogg',m:'audio/ogg'},
            // docs
            {e:'pdf',m:'application/pdf'},
            {e:'txt',m:'text/plain'},
            {e:['xls','xlsx'],m:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
            {e:'xls',m:'application/vnd.ms-excel'},
            {e:'doc',m:'application/msword'},
            {e:['docx','doc'],m:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
            {e:['pps','ppt'],m:'application/vnd.ms-powerpoint'},
            // various
            {e:'php',m:''},
            {e:'css',m:'te/css'},
            {e:'zip',m:'application/zip'},
            {e:'rar',m:'application/x-rar-compressed'},
            {e:'sit',m:'application/x-stuffit'},
            {e:'eps',m:'application/postscript'},
            {e:'xml',m:'application/xml'},
            {e:['html','htm'],m:'text/html'},
            {e:'chm',m:'application/vnd.ms-htmlhelp'},
            {e:'ttf',m:'application/x-font-ttf'},
            {e:'exe',m:'application/octet-stream'},
            {e:'dmg',m:'application/x-apple-diskimage'}
        ];

        return {
            find: function(mime, filename){

                console.log(mime, filename)

                var self = this,
                    file = 'unknown';
                // search for mimetype
                angular.forEach(fileMimeTypes, function (type) {
                    if (mime != '' && type.m == mime) {
                        file = self.getExtension(type.e, filename);
                    }
                })

                return file;
            },

            getExtension: function(extensions, filename){
                var file = 'unknown';

                // only one extension
                if (typeof extensions == 'string')
                    file = extensions;
                // more extensions exists
                else if(typeof extensions == 'array'){
                    angular.forEach(extensions, function (extension) {
                        if (filename.search(extension) != -1){
                            file = extension;
                        }
                    })
                }

                return file;
            }
        }
    }
]);