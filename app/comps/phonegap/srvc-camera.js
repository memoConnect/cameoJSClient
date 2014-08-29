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

angular.module('cmPhonegap').service('cmCamera', [
    'cmFilesAdapter',
    function (cmFilesAdapter) {
        return {
            existsPlugin: function(){
                if(navigator.camera == undefined) {
                    alert('CAMERA PLUGIN IS MISSING');
                    return false;
                }
                return true;
            },
            takePhoto: function (callback){
                if(!this.existsPlugin()){
                    return false;
                }

                if(callback == undefined)
                    callback = function(){}

                navigator.camera.getPicture(
                    function(base64){
                        //console.log(base64)
                        var blob = cmFilesAdapter.base64ToBlob(base64,'image/jpeg');
                        blob.name = 'NewCameoPicture.jpg';
                        callback(blob);
                    },
                    null,
                    {
                        sourceType: Camera.PictureSourceType.CAMERA,
                        quality: 60,
                        encodingType: Camera.EncodingType.JPEG,
                        destinationType: Camera.DestinationType.DATA_URL,
                        mediaType: Camera.MediaType.PICTURE
                    }
                );
            },
            chooseFile: function(callback){
                if(!this.existsPlugin()) {
                    return false;
                }

                if(callback == undefined)
                    callback = function(){}

                navigator.camera.getPicture(
                    function(fileUri){
                        console.log(JSON.stringify(arguments))
                        console.log(fileUri)
                        console.log(window.resolveLocalFileSystemURL)

                        window.resolveLocalFileSystemURL(fileUri, function(file){
                            console.log('whoop')
                            console.log(JSON.stringify(file))
                        }, function(){
                            console.log('meeep')
                        });

//                        var blob = cmFilesAdapter.base64ToBlob(base64,'image/jpeg');
//                        blob.name = 'NewCameoPicture.jpg';
//                        callback(blob);
                    },
                    null,
                    {
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: Camera.DestinationType.FILE_URI,
                        mediaType: Camera.MediaType.ALLMEDIA
                    }
                );
            }
        }
    }]
);