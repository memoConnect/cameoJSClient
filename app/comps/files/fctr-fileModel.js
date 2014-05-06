'use strict';

angular.module('cmFiles').factory('cmFileModel', [
    'cmFilesAdapter',
    'cmLogger',
    'cmChunk',
    'cmCrypt',
    'cmObject',
    '$q',
    function (cmFilesAdapter, cmLogger, cmChunk, cmCrypt, cmObject, $q){
        var FileModel = function(fileData){

            cmObject.addEventHandlingTo(this);

            this.state = 'new';

            this.importFile = function(blob){
                this.blob = blob;
                this.id   = undefined;


                this.name = blob.name;
                this.type = blob.type;
                this.size = blob.size;

                return this;
            }

            this.chopIntoChunks = function(chunkSize){
                var self        = this,
                    startByte   = 0,
                    endByte     = 0,
                    index       = 0,
                    promises    = []

                if(!this.blob) {
                    cmLogger.error('Unable to chop file into Chunks; cmFile.file missing. Try calling cmFile.importFile() first.')
                    return null
                }

                self.chunks   = []

                while(endByte < this.blob.size){

                    startByte   = index*1024*chunkSize
                    endByte     = startByte + 1024*chunkSize

                    endByte  = (endByte > this.blob.size) ? this.blob.size : endByte;

                    var chunk = new cmChunk()
                    self.chunks.push(chunk)

                    promises.push(
                        chunk
                            .importFileSlice(self.blob, startByte, endByte)
                            .blobToBinaryString()
                    )

                    index++
                }

                return  $q.all(promises)
            }

            this.encryptName = function(passphrase){
                this.name
                    ?   this.encryptedName = cmCrypt.encryptWithShortKey(passphrase, this.name)
                    :   cmLogger.error('Unable to encrypt filename; cmFile.name missing. Try calling cmFile.importFile() first.')

                return this
            }

            this.encryptChunks = function(passphrase) {
                var self = this

                this.encryptedSize = 0

                this.chunks
                    ?   this.chunks.forEach(function(chunk){
                    chunk.encrypt(passphrase)
                    self.encryptedSize += chunk.encryptedRaw.length
                })
                    :   cmLogger.error('Unable to encrypt chunks; cmFile.chunks missing. Try calling cmFile.chopIntoChunks() first.')

                return this
            }

            this.prepareForUpload = function() {
                var self = this

                return (
                    self.encryptedName && self.chunks
                        ?   cmFilesAdapter.prepareFile({
                        name    : self.encryptedName,
                        size    : self.encryptedSize,
                        type    : self.type,
                        chunks  : self.chunks.length
                    })
                        .then(
                        function(id){
                            return self.id = id
                        }
                    )
                        :   cmLogger.error('Unable to set up file for Download; cmFile.chunks or cmFile.encryptedName missing. Try calling cmFile.chopIntoChunks() and cmFile.encryptName() first.')
                )
            }

            this.uploadChunks = function() {
                var self = this

                if(!this.id){
                    cmLogger.error('Unable to upload chunks; cmFile.id missing. Try calling cmFile.prepareForDownload() first.')
                    return null
                }

                var deferred = $q.defer(),
                    promises = []

                self.chunks.forEach(function(chunk, index){
                    var deferredChunk = $q.defer()

                    promises.push(deferredChunk.promise)

                    chunk
                        .upload(self.id, index)
                        .then(
                        function(){
                            self.trigger('upload:chunk', chunk.encryptedRaw.length / self.encryptedSize);

                            deferredChunk.resolve()
//                            deferred.notify(chunk.encryptedRaw.length / self.encryptedSize)
                        },

                        function(response){
                            deferredChunk.reject(response)
                        }
                    )
                })

                $q.all(promises)
                    .then(
                    function(data)      { self.trigger('upload:finish'); deferred.resolve(self.id) },
                    function(response)  { deferred.reject(response) }
                )

                return deferred.promise
            }

            this.importByFile = function(){
                var self     = this

                return (
                    cmFilesAdapter.getFileInfo(this.id)
                        .then(function(details){
                            self.encryptedName = details.fileName
                            self.type          = details.fileType
                            self.encryptedSize = details.fileSize
                            self.chunkIndices  = details.chunks
                        })
                )
            }

            this.decryptName = function(passphrase) {
                this.encryptedName
                    ?   this.name = cmCrypt.decrypt(passphrase, this.encryptedName)
                    :   cmLogger.error('Unable to decrypt filename; cmFile.encryptedFileName missing. Try calling cmFile.imporByFile) first.')
                return this
            }

            this.downloadChunks = function(){
                var self        = this,
                    promises    = [],
                    deferred    = $q.defer()
                self.chunks = []

                if(!self.chunkIndices || !self.id){
                    cmLogger.error('cmFile.downloadChunks(); cmFile.chunks or cmFile.id missing. Try calling cmFile.importByFile() first.')
                    return null
                }

                self.chunkIndices.forEach(function(index){
                    var deferredChunk = $q.defer()

                    promises.push(deferredChunk.promise)

                    var chunk = new cmChunk()

                    self.chunks[index] = chunk

                    chunk
                        .download(self.id, index)
                        .then(function(){
                            deferredChunk.resolve(chunk)
                            deferred.notify(chunk.encryptedRaw.length / self.encryptedSize)
                        })
                })


                $q.all(promises)
                    .then(
                    function(chunks)    { deferred.resolve(chunks) },
                    function(response)  { deferred.reject(response) }
                )

                return deferred.promise
            }

            this.decryptChunks = function(passphrase){
                var promises =  []

                if(!this.chunks){
                    cmLogger.error('Unable to decrypt chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.')
                    return null
                }

                self.size = 0

                this.chunks.forEach(function(chunk){
                    chunk
                        .decrypt(passphrase)
                        .binaryStringToBlob()

                    self.size += chunk.blob.size
                })

            }

            this.reassembleChunks = function(){
                var self = this,
                    data = []

                if(!this.chunks) cmLogger.error('Unable reassemlbe chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.')

                this.chunks.forEach(function(chunk){
                    data.push(chunk.blob)
                })

                self.blob = Blob(data, {type: self.type})

                return this
            }

            this.promptSaveAs = function(){
                var self = this

                this.name && this.blob
                    ?   saveAs(
                    this.blob,
                    this.name
                )
                    :   cmLogger.error('Unable to prompt saveAs; cmFile.blob is missing, try cmFile.importByFile().')

                return this
            }

            /**
             *
             * @param blob
             * @param chunkSize
             * @returns {FileModel}
             */
            this.init = function(fileData, chunkSize){
                if(typeof fileData !== 'undefined'){
                    if(typeof fileData == 'string'){
                        // todo download
                        this.id = fileData;
                        this.state = 'exists';
                    } else if(typeof fileData == 'object'){
                        this.importFile(fileData);

                        if(!chunkSize){
                            chunkSize = 128;
                        }

                        this.chopIntoChunks(chunkSize);
                    }
                }

                return this;
            }

            this.init(fileData);
        }

        return FileModel;
    }
]);