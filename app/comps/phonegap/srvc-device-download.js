'use strict';

angular.module('cmPhonegap').service('cmDeviceDownload', [
    'cmPhonegap', 'cmDevice', 'cmUtil',
    function (cmPhonegap, cmDevice, cmUtil) {

        function errorHandler(){
            var msg = '';

            switch (e.code) {
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

            console.log('cmDeviceDownload Error: ' + msg);
        }

        return {
            isSupported: function(){
                return false && cmDevice.isAndroid();
            },
            saveAs: function(cmFileModel){



                /*
                 LocalFileSystem.PERSISTENT
                 window.TEMPORARY
                */

                window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

                window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                5*1024*1024 /*5MB*/,
                function(fileSystem){
                    console.log('Opened file system: ' + fileSystem.name);

                    var directoryEntry = fileSystem.root,
                        directoryReader = directoryEntry.createReader();

                    directoryReader.readEntries(function(entries){
                        var sOutput = "";
                        for(var i=0; i < entries.length; i++){
                            if(!entries[i].isDirectory){
                                console.log(entries[i].name)
                                //fileSystem.root.getFile(entries[i].name,null,gotFileEntry,errorHandler);
                            }
                        }
                        //displayMessage(sOutput);
                    },errorHandler);

//                    directoryEntry.getFile('file:///example.txt', {create: true, exclusive: true}, function(fileEntry) {
//
//                        // fileEntry.isFile === true
//                        // fileEntry.name == 'log.txt'
//                        // fileEntry.fullPath == '/log.txt'
//                        console.log('file fullpath: '+fileEntry.fullPath)
//                    }, errorHandler);

                },
                errorHandler);

                function gotFileEntry(fileEntry){
                    fileEntry.file(function(file){
                        var reader = new FileReader();
                        reader.onloadend = function(evt){
                            displayMessage(evt.target.result);
                        };
                        reader.readAsText(file);
                    },errorHandler);
                }
            }
        }
    }
]);