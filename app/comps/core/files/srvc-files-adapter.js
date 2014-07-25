'use strict';

angular.module('cmCore').service('cmFilesAdapter', [
    'cmApi', 'cmLogger',
    '$q',
    function (cmApi, cmLogger,
              $q){
        return {
            prepareFile: function(config){
                return cmApi.post({
                    path: '/file',
                    exp_ok: 'id',
                    headers: {
                        "X-File-Name": config.name,
                        "X-File-Size": config.size,
                        "X-File-Type": config.type,
                        "X-Max-Chunks": config.chunks
                    }
                });
            },

            addChunk: function(fileId, index, chunk) {
                return cmApi.postBinary({
                    path: '/file/'+fileId,
                    data: chunk,
                    headers: {
                        "X-Index": index
                    },
                    transformRequest: function(data){return data}
                });
            },

            setFileComplete: function(fileId, messageId){
                var data = 'null';
                if(messageId != undefined){
                    data = {
                        messageId: messageId
                    }
                }
                return cmApi.post({
                    path: '/file/'+fileId+'/completed',
                    data: data
                });
            },

            getFile: function(fileId){
                return cmApi.get({
                    path: '/file/'+fileId
                });
            },

            getChunk: function(fileId, chunkId){
                return cmApi.getBinary({
                    path: '/file/'+fileId+'/'+chunkId
                });
            },

            blobWrap: function(data, contentType, method){
                var blob = undefined;

                try {
                    blob = new Blob([data[0].buffer], {type: contentType});
                } catch(e){
                    // TypeError old chrome and FF
                    window.BlobBuilder =    window.BlobBuilder ||
                                            window.WebKitBlobBuilder ||
                                            window.MozBlobBuilder ||
                                            window.MSBlobBuilder;

                    // is already a blob!
                    if(data.toString() == '[object Blob]'){
                        blob = data;
                    } else if(e.name == 'TypeError' && window.BlobBuilder){
                        var bb = new BlobBuilder();
                        bb.append(data[0].buffer);
                        blob = bb.getBlob(contentType);
                    } else if(e.name == "InvalidStateError"){
                        // InvalidStateError (tested on FF13 WinXP)
                        blob = new Blob( data, {type : contentType});
                    } else {
                        cmLogger.debug('We\'re screwed, blob constructor unsupported entirely');
                        console.log(e, data, 'from method: '+method);
                    }
                }
                return blob;
            },

            blobBuilderWrap: function(){
                var blobBuilder = new BlobBuilder();
                return blobBuilder;
            },

            binaryToBlob: function (binary, contentType){
                var byteArrays = [],
                    binary = binary || '',
                    contentType = contentType || '',
                    sliceSize = binary.length;

                for (var offset = 0; offset < binary.length; offset += sliceSize) {
                    var slice = binary.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = this.blobWrap(byteArrays, contentType, 'binaryToBlob');
                return blob;
            },

            /**
             * return clear base64 for atob function
             * replace newlines & return
             * replace the "data:;base64," mimetype
             * @param b64Data
             * @returns {String} clearBase64
             */
            clearBase64: function(b64Data){
                if(typeof b64Data != 'string')
                    return '';

                return b64Data
                .replace(/\r?\n|\r/g,'')
                .replace(new RegExp('^(data:.{0,100};base64,)(.*)$','i'),function(){
                    return arguments[2];// return the cleared base64
                });
            },

            base64ToBinary: function(b64Data){
                if(typeof b64Data != 'string')
                    return '';

                return atob(this.clearBase64(b64Data));
            },

            getBlobUrl: function(blob){
                var useFileReader = true,
                    deferred = $q.defer(),
                    objUrl = {
                        src: '',
                        revoke: function(){
                            return true;
                        }
                    };

                if(useFileReader){
                    // filereader
                    var filereader = new FileReader();
                    filereader.onload = function(e){
                        objUrl.src = e.target.result;
                        deferred.resolve(objUrl);
                    };
                    filereader.readAsDataURL(blob);
                } else {
                    // URL type
                    var URL = window.URL || window.webkitURL;
                    objUrl = {
                        src: URL.createObjectURL(blob),
                        revoke: function(){
                            URL.revokeObjectURL(this.url);
                        }
                    };
                    deferred.resolve(objUrl);
                }

                return deferred.promise;
            }
        }
    }
]);