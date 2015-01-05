'use strict';

// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md
// https://github.com/apache/cordova-plugin-device/blob/d7b0855ef8eaa6731485a8e529b3607a3c65e7f2/doc/index.md

/*
 Camera = {
 "DestinationType":{
     "DATA_URL":0, //base64
     "FILE_URI":1,
     "NATIVE_URI":2
 },
 "EncodingType":{
     "JPEG":0,
     "PNG":1
 },
 "MediaType":{
     "PICTURE":0,
     "VIDEO":1,
     "ALLMEDIA":2
 },
 "PictureSourceType":{
     "PHOTOLIBRARY":0,
     "CAMERA":1,
     "SAVEDPHOTOALBUM":2
 },
 "PopoverArrowDirection":{
     "ARROW_UP":1,
     "ARROW_DOWN":2,
     "ARROW_LEFT":4,
     "ARROW_RIGHT":8,
     "ARROW_ANY":15
 },
 "Direction":{
     "BACK":0,
     "FRONT":1
 }
 }*/

angular.module('cmPhonegap')
.service('cmCamera', [
    'cmPhonegap', 'cmFilesAdapter', 'cmFileTypes',
    '$navigator', '$window', '$phonegapCameoConfig',
    function (cmPhonegap, cmFilesAdapter, cmFileTypes,
              $navigator, $window, $phonegapCameoConfig) {

        function FileError(e){
            var msg;
            switch (e.code) {
                case FileError.ABORT_ERR:
                    msg = 'ABORT_ERR';
                    break;
                case FileError.NOT_READABLE_ERR:
                    msg = 'NOT_READABLE_ERR';
                    break;
                case FileError.ENCODING_ERR:
                    msg = 'ENCODING_ERR';
                    break;
                case FileError.NO_MODIFICATION_ALLOWED_ERR:
                    msg = 'NO_MODIFICATION_ALLOWED_ERR';
                    break;
                case FileError.SYNTAX_ERR:
                    msg = 'SYNTAX_ERR';
                    break;
                case FileError.TYPE_MISMATCH_ERR:
                    msg = 'TYPE_MISMATCH_ERR';
                    break;
                case FileError.PATH_EXISTS_ERR:
                    msg = 'PATH_EXISTS_ERR';
                    break;
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'QUOTA_EXCEEDED_ERR';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'NOT_FOUND_ERR';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'SECURITY_ERR';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'INVALID_MODIFICATION_ERR';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'INVALID_STATE_ERR';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            };
            console.log('errror readEntries '+msg)
        }

        var CameraVars = {
            "DestinationType":{
                "DATA_URL":0, //base64
                "FILE_URI":1,
                "NATIVE_URI":2
            },
            "EncodingType":{
                "JPEG":0,
                "PNG":1
            },
            "MediaType":{
                "PICTURE":0,
                "VIDEO":1,
                "ALLMEDIA":2
            },
            "PictureSourceType":{
                "PHOTOLIBRARY":0,
                "CAMERA":1,
                "SAVEDPHOTOALBUM":2
            },
            "PopoverArrowDirection":{
                "ARROW_UP":1,
                "ARROW_DOWN":2,
                "ARROW_LEFT":4,
                "ARROW_RIGHT":8,
                "ARROW_ANY":15
            },
            "Direction":{
                "BACK":0,
                "FRONT":1
            }
        };

        var self = {
            plugin: null,

            init: function () {
                if ($phonegapCameoConfig == 'undefined'){
                    return false;
                }

                cmPhonegap.isReady(function () {
                    if($navigator == 'undefined'
                    || !('camera' in $navigator)) {
                        //cmLogger.info('CAMERA PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $navigator.camera;
                });

                return true;
            },

            existsPlugin: function () {
                return this.plugin != null;
            },

            getDateForName: function(){
                var date = new Date();
                return date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate();
            },

            takePhoto: function (callback, useFrontCamera) {
                if (!this.existsPlugin()) {
                    return false;
                }

                if (callback == undefined)
                    callback = function () {
                    };

                this.plugin.getPicture(
                    function (base64) {
                        var blob = cmFilesAdapter.base64ToBlob(base64, 'image/jpeg');

                        blob.name = 'cmPicture_'+self.getDateForName()+'.jpg';
                        callback(blob);
                    },
                    null,
                    {
                        sourceType: CameraVars.PictureSourceType.CAMERA,
                        quality: 60,
                        encodingType: CameraVars.EncodingType.JPEG,
                        destinationType: CameraVars.DestinationType.DATA_URL,
                        mediaType: CameraVars.MediaType.PICTURE,
                        cameraDirection: CameraVars.Direction[useFrontCamera ? 'FRONT' : 'BACK'],
                        saveToPhotoAlbum: true,
                        correctOrientation: true
                    }
                );

                return true;
            },
            chooseFile: function (callback) {
                if (!this.existsPlugin()) {
                    return false;
                }

                if (callback == undefined)
                    callback = function () {
                    };

                this.plugin.getPicture(
                    function (fileUri) {
                        if (!('resolveLocalFileSystemURL' in $window))
                            return false;

                        // uri to blob
                        $window.resolveLocalFileSystemURL(fileUri, function (fileEntry) {
                            // TODO: get displayname (filename) of file (exp.: data.extension)
//                            console.log('resolveLocalFileSystemURL')
//                            console.log(fileEntry.fullPath)
//                            fileEntry.getParent(function(parent){
//                                console.log('getparent biatsch '+parent.name)
//                                var reader = parent.createReader();
//                                reader.readEntries(function(entries){
//                                    console.log('readEntries of '+entries.length)
//                                    console.log(cmUtil.prettify(arguments))
//                                }, FileError);
//                            }, FileError)

                            fileEntry.file(function (blob) {

                                if(blob.name == 'content') {
                                    var extension = cmFileTypes.find(blob.type);
                                    blob.name = 'cmFile_' + self.getDateForName() + '.'+extension;
                                }

                                callback(blob);
                            }, FileError);
                        });
                    },
                    null,
                    {
                        sourceType: CameraVars.PictureSourceType.PHOTOLIBRARY,
                        destinationType: CameraVars.DestinationType.FILE_URI,
                        mediaType: CameraVars.MediaType.ALLMEDIA
                    }
                );

                return true;
            }
        };

        self.init();

    return self;
    }
]);