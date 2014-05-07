'use strict';

angular.module('cmFiles').factory('cmFileModel', [
    'cmFilesAdapter',
    'cmFileDownload',
    'cmLogger',
    'cmChunk',
    'cmCrypt',
    'cmObject',
    '$q',
    function (cmFilesAdapter, cmFileDownload, cmLogger, cmChunk, cmCrypt, cmObject, $q){

        function roundToTwo(num) {
            return +(Math.round(num + "e+2")  + "e-2");
        }

        var FileModel = function(fileData){

            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = 'new';

            this.chunks = [];

            this.encryptedSize = 0;
            this.size = 0;

            this.setPassphrase = function(passphrase){
                this.passphrase = passphrase;// TODO: || null;
                // console.log('passphrase',typeof passphrase+' '+passphrase,typeof this.passphrase+' '+this.passphrase)
                return this;
            };

            // upload for state = new

            this.importBlob = function(blob){
                this.blob = blob;
                this.id   = undefined;

                this.name = blob.name;
                this.type = blob.type;
                this.size = blob.size;

                return this;
            };

            this.importFile = function(){
                var self = this;

                return (
                    cmFilesAdapter.getFileInfo(this.id)
                        .then(function(details){
                            self.encryptedName = details.fileName;
                            self.type          = details.fileType;
                            self.encryptedSize = details.fileSize;
                            self.chunkIndices  = details.chunks;
                        })
                )
            };

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

            this.encryptName = function(){
                if(this.name){
                    this.encryptedName = cmCrypt.encryptWithShortKey(this.passphrase, this.name);
                } else {
                    cmLogger.error('Unable to encrypt filename; cmFile.name missing. Try calling cmFile.importFile() first.');
                }

                return this;
            };

            this.decryptName = function() {
                if(this.encryptedName){
                    this.name = cmCrypt.decrypt(this.passphrase, this.encryptedName);
                } else {
                    cmLogger.error('Unable to decrypt filename; cmFile.encryptedFileName missing. Try calling cmFile.imporByFile) first.');
                }
                return this;
            };

            this._encryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk.encrypt(this.passphrase);
                this.encryptedSize += chunk.encryptedRaw.length;

                if(index == (this.chunks.length - 1)){
                    this.trigger('encrypt:finish');
                } else {
                    this.trigger('encrypt:chunk', index);
                }
            };

            this.encryptChunks = function() {
                if(this.chunks){
                    this._encryptChunk(0);
                } else {
                    cmLogger.error('Unable to encrypt chunks; cmFile.chunks missing. Try calling cmFile.chopIntoChunks() first.');
                }

                return this;
            };

            this._decryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk
                    .decrypt(this.passphrase)
                    .binaryStringToBlob();

                this.size += chunk.blob.size;

                if(index == (this.chunks.length - 1)){
                    this.trigger('decrypt:finish');
                } else {
                    this.trigger('decrypt:chunk', index);
                }
            };

            this.decryptChunks = function(){
                if(!this.chunks){
                    cmLogger.error('Unable to decrypt chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.');
                    return null
                }

                this._decryptChunk(0);

                return this;
            };

            this.reassembleChunks = function(){
                var self = this,
                    data = []

                if(!this.chunks) cmLogger.error('Unable reassemble chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.')

                this.chunks.forEach(function(chunk){
                    data.push(chunk.blob)
                })

                this.blob = new Blob(data, {type: self.type})

                self.trigger('reassemble:finish');

                return this;
            };

            this.prepareForUpload = function() {
                var self = this;

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
            };

            this._uploadChunk = function(index){
                var chunk = this.chunks[index];

                chunk
                    .upload(self.id, index)
                    .then(function(){

                        var percent = (chunk.encryptedRaw.length / self.encryptedSize);

                        self.trigger('progress:chunk', percent);

                        if(index == (self.chunks.length - 1)){
                            self.trigger('upload:finish');
                        } else {
                            self.trigger('upload:chunk', index);
                        }
                    });
            };

            this.uploadChunks = function() {
                if(!this.id){
                    cmLogger.error('Unable to upload chunks; cmFile.id missing. Try calling cmFile.prepareForDownload() first.')
                    return null;
                }

                /**
                 * start upload with first chunk in array
                 */
                this._uploadChunk(0);

                return this;
            };

            this._downloadChunk = function(index){
                var chunk = new cmChunk();

                this.chunks[index] = chunk;

                chunk
                    .download(self.id, index)
                    .then(function(){

                        var percent = (chunk.encryptedRaw.length / self.encryptedSize);
//                        var percent = ((index+1) / self.chunkIndices.length)*100;
                        self.trigger('progress:chunk', percent);

                        if(index == (self.chunkIndices.length - 1)){
                            self.trigger('download:finish');
                        } else {
                            self.trigger('download:chunk', index);
                        }
                    });
            };

            this.downloadChunks = function(){
                if(!this.chunkIndices || !this.id){
                    cmLogger.error('cmFile.downloadChunks(); cmFile.chunks or cmFile.id missing. Try calling cmFile.importFile() first.')
                    return null;
                }

                /**
                 * start download with first chunk in array
                 */
                this._downloadChunk(0);

                return this;
            };

            this.downloadStart = function(){
                if(this.id != ''){
                    cmFileDownload.add(this);
                }
            };

            this.promptSaveAs = function(){
                var self = this;

                this.name && this.blob
                    ?   saveAs(
                    this.blob,
                    this.name
                )
                    :   cmLogger.error('Unable to prompt saveAs; cmFile.blob is missing, try cmFile.importByFile().')

                return this;
            };

            this.hasBlob = function(){
                if(this.blob !== 'undefined'){
                    return true;
                }

                return false;
            }

            /**
             *
             * @param fileData
             * @param chunkSize
             * @returns {FileModel}
             */
            this.init = function(fileData, chunkSize){
                if(typeof fileData !== 'undefined'){
                    if(typeof fileData == 'string'){
                        // todo download
                        this.id = fileData;

                        this.importFile().then(
                            function(){
                                self.state = 'exists';
                                self.trigger('import:finish');
                            }
                        );

                    } else if(typeof fileData == 'object'){
                        this.importBlob(fileData);

                        if(!chunkSize){
                            chunkSize = 128;
                        }

                        this.chopIntoChunks(chunkSize);
                    }
                }

                return this;
            };

            this.init(fileData);

            /**
             * Event Handling
             */

            this.on('request:blob', function(){
               self.decryptChunks();
            });

            this.on('download:chunk', function(event,index){
               self._downloadChunk(index + 1);
            });

            this.on('download:finish', function(){
                self.state = 'cached';
            });

            this.on('upload:chunk', function(event,index){
                self._uploadChunk(index + 1);
            });

            this.on('upload:finish', function(){
                self.state = 'cached';
            });

            this.on('encrypt:chunk', function(event,index){
                cmLogger.debug('encrypt:chunk');
               self._encryptChunk(index + 1);
            });

            this.on('decrypt:chunk', function(event,index){
                cmLogger.debug('decrypt:chunk');
                self._decryptChunk(index + 1);
            });

            this.on('decrypt:finish', function(event,index){
                self.reassembleChunks();
            });
        };

        return FileModel;
    }
]);