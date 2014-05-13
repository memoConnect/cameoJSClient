'use strict';

angular.module('cmFiles').factory('cmFileModel', [
    'cmFilesAdapter',
    'cmFileDownload',
    'cmLogger',
    'cmChunk',
    'cmCrypt',
    'cmObject',
    '$q',
    'cmUtil',
    function (cmFilesAdapter, cmFileDownload, cmLogger, cmChunk, cmCrypt, cmObject, $q, cmUtil){

        function roundToTwo(num) {
            return +(Math.round(num + "e+2")  + "e-2");
        }

        var FileModel = function(fileData){

            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = '';

            this.chunks = [];

            this.encryptedSize = 0;
            this.size = 0;

            this.setPassphrase = function(passphrase){
                this.passphrase = passphrase;// TODO: || null;

                return this;
            };

            this.setState = function(state){
                var arr_states = ['new','exists','cached'];
                if(arr_states.indexOf(state) != -1)
                    this.state = state;

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
                            self.size          = details.fileSize;
                            self.chunkIndices  = details.chunks;
                            self.maxChunks     = details.maxChunks;

                            self.trigger('importFile:finish');
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

                return $q.all(promises)
            };

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

                this.encryptedSize += chunk.encryptedRaw.length
                this.size += chunk.blob.size;

                if(index == (this.chunkIndices.length - 1)){
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

            this.decryptStart = function(){
                this.decryptChunks();
            };

            this.reassembleChunks = function(){
                var self = this,
                    data = []

                if(!this.chunks) cmLogger.error('Unable reassemble chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.')

                this.chunks.forEach(function(chunk){
                    data.push(chunk.blob)
                })

                this.blob = new Blob(data, {type: self.type})

//                console.log(cmUtil.bytesToStr(this.blob.size),cmUtil.bytesToStr(this.encryptedSize))

                self.trigger('file:cached');

                return this;
            };

            this.prepareForUpload = function() {
                var self = this;

                return (
                    self.encryptedName && self.chunks
                        ?   cmFilesAdapter.prepareFile({
                                name    : self.encryptedName,
                                size    : self.blob.size,//self.encryptedSize,
                                type    : self.type,
                                chunks  : self.chunks.length
                            })
                            .then(function(id){
                                return self.id = id
                            })
                        :   cmLogger.error('Unable to set up file for Download; cmFile.chunks or cmFile.encryptedName missing. Try calling cmFile.chopIntoChunks() and cmFile.encryptName() first.')
                )
            };

            this._uploadChunk = function(index){
                var chunk = this.chunks[index];

                chunk
                    .encrypt(this.passphrase)
                    .upload(this.id, index)
                    .then(function(){

                        self.trigger('progress:chunk', (index/self.chunks.length));

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
                    .then(
                        function(){
                            self.trigger('progress:chunk', (index/self.chunks.length));

                            if(index == (self.chunkIndices.length - 1)){
                                self.trigger('download:finish', index);
                            } else {
                                self.trigger('download:chunk', index);
                            }
                        },
                        function(){
                            self.trigger('progress:chunk', 1);
                            self.trigger('download:finish', {'error':true});
                            self.trigger('file:cached');
                        }
                );
            };

            this.downloadChunks = function(){
                cmLogger.debug('cmFileModel:downloadChunks');
                if(!this.id && this.state == 'exists'){
                    cmLogger.error('cmFile.downloadChunks();')
                    return null;
                }

                this.importFile().then(
                    function(){
                        self
                            .setState('exists')
                            .trigger('import:finish');

                        /**
                         * start download with first chunk in array
                         */
                        self._downloadChunk(0);
                    }
                );

                return this;
            };

            this.downloadStart = function(){
                cmLogger.debug('cmFileModel:downloadStart');
                if(this.id != '' && this.state == 'exists'){
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
            };

            /**
             * keep the buffer clean when file is cached
             * @returns {FileModel}
             */
            this.clearBuffer = function(){
                if(this.state == 'cached') {
                    this.encryptedName = null;
                    this.passphrase = null;
                    this.chunkIndices = null;
                    this.chunks = null;
                }

                return this;
            };

            /**
             *
             * @param fileData
             * @param chunkSize
             * @returns {FileModel}
             */
            this.init = function(fileData, chunkSize){
                if(typeof fileData !== 'undefined'){
                    if(typeof fileData == 'string'){
                        this
                            .setState('exists')
                            .id = fileData;
                    } else if(typeof fileData == 'object'){
                        this
                            .setState('new')
                            .importBlob(fileData);

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
            this.on('download:chunk', function(event, index){
                self._downloadChunk(index + 1);
                self._decryptChunk(index);
            });

            this.on('download:finish', function(event, index){
//                cmLogger.debug('download:finish');
                if(typeof index == 'number') {
                    self._decryptChunk(index);
                // error on download
                } else if(index.error) {
                    cmLogger.error('chunk not found');
                    self.setState('cached');
                }
            });

            this.on('upload:chunk', function(event, index){
                self._uploadChunk(index + 1);
            });

            this.on('upload:finish', function(){
//                cmLogger.debug('upload:finish');
                self.setState('cached');
            });

            this.on('encrypt:chunk', function(event, index){
//                cmLogger.debug('encrypt:chunk');
                self._encryptChunk(index + 1);
            });

            this.on('decrypt:chunk', function(event, index){
                cmLogger.debug('decrypt:chunk '+index);
//                self._decryptChunk(index + 1);
//                self._downloadChunk(index + 1);
            });

            this.on('decrypt:finish', function(event, index){
//                cmLogger.debug('decrypt:finish');
                self.reassembleChunks();
            });

            this.on('file:cached', function(){
//                cmLogger.debug('file:cached');
                self
                    .setState('cached')
                    .decryptName()
                    .clearBuffer()
            });
        };

        return FileModel;
    }
]);