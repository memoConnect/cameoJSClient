'use strict';

angular.module('cmCore').service('cmFilesAdapter', [
    'cmApi', 'cmLogger', 'cmUtil', 'cmDevice',
    '$q',
    function (cmApi, cmLogger, cmUtil, cmDevice,
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

            blobWrap: function(byteArrays, contentType, method){
                if(byteArrays == undefined || byteArrays == null)
                    return false;

                var blob = undefined;

                try {
                    blob = new Blob([byteArrays[0].buffer], {type: contentType});
                } catch(e){
                    // TypeError old chrome and FF
                    window.BlobBuilder =    window.BlobBuilder ||
                                            window.WebKitBlobBuilder ||
                                            window.MozBlobBuilder ||
                                            window.MSBlobBuilder;

                    // is already a blob!
                    if(byteArrays.toString() == '[object Blob]'){
                        blob = byteArrays;
                    } else if(e.name == 'TypeError' && window.BlobBuilder){
                        var bb = new BlobBuilder();
                        bb.append(byteArrays[0].buffer);
                        blob = bb.getBlob(contentType);
                    } else if(e.name == "InvalidStateError"){
                        // InvalidStateError (tested on FF13 WinXP)
                        blob = new Blob( byteArrays, {type : contentType});
                    } else {
                        cmLogger.debug('We\'re screwed, blob constructor unsupported entirely');
                        console.log(e, byteArrays, 'from method: '+method);
                    }
                }
                return blob;
            },

            blobBuilderWrap: function(){
                if(typeof(BlobBuilder) === 'undefined')
                    return false;

                var blobBuilder = new BlobBuilder();
                return blobBuilder;
            },

            base64ToBinary: function(b64Data){
                if(typeof b64Data != 'string')
                    return '';

                return atob(this.clearBase64(b64Data));
            },

            binaryToBlob: function (binary, contentType){
                if(typeof binary != 'string' || binary == '')
                    return false;

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

            base64ToBlob: function(base64, contentType){
                if(typeof base64 != 'string' || base64 == '')
                    return false;
                // check mimetype from base64
                if(!contentType){
                    var mimeType = this.getMimeTypeOfBase64(base64);
                    if(mimeType != ''){
                        contentType = mimeType;
                    }
                }
                // decode and create blob
                var binary = this.base64ToBinary(base64, contentType),
                    blob = this.binaryToBlob(binary, contentType);
                return blob;
            },

            /**
             * return clear base64 for atob function
             * replace newlines & return
             * replace the "data:;base64," mimetype
             * @param b64Data
             * @returns {String} clearBase64
             */
            //base64Regexp: '^(data:(.{0,100});base64,|data:(.{0,100})base64,)(.*)$',
            base64Regexp: '^(data:(.*?);?base64,)(.*)$',

            clearBase64: function(b64Data){
                if(typeof b64Data != 'string')
                    return '';

                var clearBase64 = b64Data
                .replace(/\r?\n|\r| /g,'')
                .replace(new RegExp(this.base64Regexp,'i'),function(){
                    return arguments[3];// return the cleared base64
                });

                //console.log(clearBase64)

                return clearBase64;
            },

            getMimeTypeOfBase64: function(base64){
                return base64 && typeof base64 == 'string' ? base64.replace(new RegExp(this.base64Regexp,'i'),'$2') : '';
            },

            getBlobUrl: function(blob, useBlobUrl){
                var useFileReader = useBlobUrl ? false : true,
                    revokeFnc = function(){
                        this.src = '';
                        return true;
                    },
                    deferred = $q.defer(),
                    objUrl = {
                        src: '',
                        revoke: revokeFnc
                    };

                // for app android use the localurl
                // TODO: optimize overall useBlobUrl and on Android localURL only at pick file preview
                if(cmDevice.isAndroid() && 'useLocalUri' in blob){
                    deferred.resolve({
                        src: blob.localURL,
                        revoke: revokeFnc
                    });
                } else
                // filereader return base64
                if(useFileReader){
                    var filereader = new FileReader();
                    filereader.onload = function(e){
                        objUrl.src = e.target.result;
                        deferred.resolve(objUrl);
                    };
                    filereader.readAsDataURL(blob);
                // bloburl returns a url to a blob
                } else {
                    var URL = window.URL || window.webkitURL;
                    objUrl = {
                        src: URL.createObjectURL(blob),
                        revoke: function(){
                            URL.revokeObjectURL(this.src);
                            this.src = '';
                            return true;
                        }
                    };
                    deferred.resolve(objUrl);
                }

                return deferred.promise;
            }
        }
    }
]);