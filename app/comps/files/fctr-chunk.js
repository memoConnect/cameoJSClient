'use strict';

angular.module('cmFiles').factory('cmChunk', [
    'cmFilesAdapter',
    'cmLogger',
    'cmCrypt',
    '$q',
    function (cmFilesAdapter, cmLogger, cmCrypt, $q){

        function str2ab_blobreader(str, callback) {

            var blob;
            var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
            if (typeof(BlobBuilder) !== 'undefined') {
                var bb = new BlobBuilder();
                bb.append(str);
                blob = bb.getBlob();
            } else {
                blob = new Blob([str]);
            }
            var f = new FileReader();
            f.onload = function(e) {
                callback(e.target.result)
            };
            f.readAsArrayBuffer(blob);
        }

        function binaryStringtoBlob(byteCharacters, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize   = sliceSize   || 512;

            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            return new Blob(byteArrays, {type: contentType});
        }







        return  function Chunk(file, start, end){

            this.importFileSlice = function (file, start, end){
                var slicer  = file.webkitSlice || file.mozSlice || file.slice,
                    chunk   = slicer.call(file, start, end)

                this.raw = undefined
                this.blob  = undefined

                if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                    str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                        chunk = buf
                    });
                }

                this.blob = chunk
                this.size = end-start

                return this
            }

            this.blobToBinaryString = function(){
                var self     = this,
                    reader   = new FileReader(),
                    deferred = $q.defer()


                reader.onload = function(event){
                    self.raw = event.target.result.replace('data:application/octet-stream;base64,', '')
                    deferred.resolve(self.raw)
                }

                this.blob
                    ?   reader.readAsBinaryString(this.blob)
                    :   cmLogger.error('Unable ro convert to raw; chunk.blob is empty.  Try calling chunk.importFileSlice() first.')

                return deferred.promise

            }

            this.encrypt = function(passphrase) {

                this.raw
                    ?   this.encryptedRaw = cmCrypt.encryptWithShortKey(passphrase, this.raw)     //Todo: long Key!
                    :   cmLogger.error('Unable ro encrypt; chunk.raw is empty.  Try calling chunk.blobToBinaryString() first.')

                return this
            }

            this.upload = function(id, index){
                return(
                    this.encryptedRaw
                        ?   cmFilesAdapter.addChunk(id, index, this.encryptedRaw)
                        :   cmLogger.error('Unable to upload; chunk.encryptedRaw is empty. Try calling chunk.encrypt() first.')
                    )
            }

            this.download = function(id, index){
                var self = this

                this.raw = undefined
                this.blob  = undefined

                return  cmFilesAdapter.getChunk(id, index)
                    .then(function(data){
                        return self.encryptedRaw = data
                    })
            }

            this.decrypt = function(passphrase){
                this.encryptedRaw
                    ?   this.raw = cmCrypt.decrypt(passphrase, this.encryptedRaw)
                    :   cmLogger.error('Unable to decrypt; chunk.encryptedRaw is empty. Try calling chunk.download() first.')

                return this
            }

            this.binaryStringToBlob = function(){
                this.raw
                    ?   this.blob = binaryStringtoBlob(this.raw)
                    :   cmLogger.error('Unable to convert to Blob; chunk.raw is empty. Try calling chunk.decrypt() first.')
                return this
            }
        }
    }
]);