'use strict';

angular.module('cmCore')
.factory('cmFileModel', [
    'cmFilesAdapter', 'cmFileDownload', 'cmFileTypes', 'cmLogger', 'cmChunk',
    'cmCrypt', 'cmObject', 'cmModal', 'cmEnv', 'cmUtil', 'cmDeviceDownload',
    'cmStateManagement',
    '$q',
    function (cmFilesAdapter, cmFileDownload, cmFileTypes, cmLogger, cmChunk,
              cmCrypt, cmObject, cmModal, cmEnv, cmUtil, cmDeviceDownload,
              cmStateManagement,
              $q){

        function roundToTwo(num) {
            return +(Math.round(num + 'e+2') + 'e-2');
        }

        var FileModel = function(fileData){

            var self = this,
                passphrase = undefined;

            cmObject.addEventHandlingTo(this);

            this.state  = new cmStateManagement(['new','onlyFileId','readyForDownload','cached','crashed','incomplete']);

            this.chunks = [];

            this.name = '';
            this.encryptedName = '';
            this.encryptedSize = 0;
            this.size = 0;

            this.base64 = '';
            this.onCompleteId = undefined;
            this.detectedExtension = undefined;
            this.autoDownload = false;

            this.setPassphrase = function(p){
                passphrase = p;// TODO: || null;
                return this;
            };

            this.isImage = function(){
                return this.type == undefined
                     ? false
                     : this.type.search('^image/') != -1;
            };

            this.isEmbed = function(specificMime){
                return this.type == undefined
                     ? false
                     : this.type.search('^('+(specificMime||'image|video|audio')+')') != -1;
            };

            // message id for backend event message:new
            this.setOnCompleteId = function(id){
                this.onCompleteId = id;

                return this;
            };

            this.importBase64 = function(base64){
                if(base64){
                    this.type = cmFilesAdapter.getMimeTypeOfBase64(base64);
                    this.blob = cmFilesAdapter.binaryToBlob(cmFilesAdapter.base64ToBinary(base64),this.type);
                    this.chopIntoChunks(128);
                }
                return this;
            };

            // for fileApi of browser -> upload
            this.importBlob = function(blob){
                this.blob = blob;
                this.id   = undefined;

                this.name = blob.name;
                this.type = blob.type;
                this.size = blob.size;

                this.detectedExtension = cmFileTypes.find(this.type, this.name);

                // broken mimetype???
                if (this.detectedExtension == 'unknown') {
                    var obj = cmFileTypes.getMimeTypeViaFilename(this.name);
                    if (obj.detectedExtension != 'unknown') {
                        this.detectedExtension = obj.detectedExtension;
                        this.type = obj.mimeType;
                    }
                }

                return this;
            };

            this.importFile = function(){
                var self = this;

                console.log('importFile')

                return cmFilesAdapter.getFile(this.id).then(
                    function(details){
                        self.encryptedName = details.fileName;
                        self.type          = details.fileType;
                        self.size          = details.fileSize;
                        self.chunkIndices  = details.chunks;
                        self.maxChunks     = details.maxChunks;

                        self.decryptName();

                        self.detectedExtension = cmFileTypes.find(self.type, self.name);

                        // is file complete of chunks?
                        if(details.isCompleted) {
                            self.trigger('importFile:finish',self);
                        } else {
                            self.trigger('importFile:incomplete',self);
                        }
                    },
                    function(){
                        self.state.unset('onlyFileId');
                        self.state.set('crashed');
                        self.trigger('file:crashed');
                    }
                );
            };

            this.chopIntoChunks = function(chunkSize){
                var self        = this,
                    startByte   = 0,
                    endByte     = 0,
                    index       = 0,
                    promises    = [];

                if(!this.blob) {
                    cmLogger.debug('Unable to chop file into Chunks; cmFile.blob missing.');
                    return null;
                }

                self.chunks   = [];

                while(endByte < this.blob.size) {

                    startByte = index * 1024 * chunkSize;
                    endByte = startByte + 1024 * chunkSize;

                    endByte = (endByte > this.blob.size) ? this.blob.size : endByte;

                    var chunk = new cmChunk();
                    self.chunks.push(chunk);

                    promises.push(
                        chunk
                            .importFileSlice(self.blob, startByte, endByte)
                            .blobToBase64()
                    );

                    index++;
                }

                return $q.all(promises);
            };

            this.encryptName = function(){
                if(this.name){
                    this.encryptedName = (passphrase == null) ? this.name : cmCrypt.encryptWithShortKey(passphrase, this.name);
                } else {
                    cmLogger.debug('Unable to encrypt filename; cmFile.name missing. Try calling cmFile.importFile() first.');
                }

                return this;
            };

            this.decryptName = function() {
                if(!passphrase){
                    this.name = this.encryptedName;
                } else if(this.encryptedName && passphrase){
                    this.name = cmCrypt.decrypt(passphrase, this.encryptedName);
                } else {
                    cmLogger.debug('Unable to decrypt filename; cmFile.encryptedFileName missing. Try calling cmFile.imporByFile) first.');
                }
                return this;
            };

            this._encryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk.encrypt(passphrase);
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
                    cmLogger.debug('Unable to encrypt chunks; cmFile.chunks missing. Try calling cmFile.chopIntoChunks() first.');
                }

                return this;
            };

            this._decryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk
                    .decrypt(passphrase)

                this.encryptedSize += String(chunk.encryptedRaw).length;
                //this.size += chunk.blob.size;

                if(index == (this.chunkIndices.length - 1)){
                    this.trigger('decrypt:finish');
                } else {
                    this.trigger('decrypt:chunk', index);
                }
            };

            this.decryptChunks = function(){
                if(!this.chunks){
                    cmLogger.debug('Unable to decrypt chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.');
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
                    binary = '',
                    byteArray = [];

                if(!this.chunks)
                    cmLogger.debug('Unable reassemble chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.');

                this.chunks.forEach(function(chunk){
                    try{
                        binary+= cmFilesAdapter.base64ToBinary(chunk.raw);
                    } catch(e){
                        cmLogger.debug(e);
                    }
                });

                this.blob = cmFilesAdapter.binaryToBlob(binary, self.type);

                self.trigger('file:cached', this);

                return this;
            };

            this.prepareForUpload = function(conversationId) {
                var self = this;

                return (
                        self.encryptedName && self.chunks || self.name && self.chunks
                    ?   cmFilesAdapter.prepareFile({
                            conversationId: conversationId,
                            name: self.encryptedName || self.name,
                            size: self.blob.size,//self.encryptedSize,
                            type: self.type,
                            chunks: self.chunks.length
                        })
                        .then(function(id){
                            return self.id = id;
                        })
                    :   cmLogger.debug('Unable to set up file for Download; cmFile.chunks or cmFile.encryptedName missing. Try calling cmFile.chopIntoChunks() and cmFile.encryptName() first.')
                )
            };

            this._uploadChunk = function(index){
                // waiting for chunk sliceing and blob to base64
                this.chunks[index].isReady(function(chunk){
                    chunk
                        .encrypt(passphrase)
                        .upload(self.id, index)
                        .then(function(){
                            self.trigger('progress:chunk', (index/self.chunks.length));

                            if(index == (self.chunks.length - 1)){
                                cmFilesAdapter.setFileComplete(self.id, self.onCompleteId).then(function(){
                                    self.state.set('complete');
                                    self.trigger('upload:finish');
                                });
                            } else {
                                self.trigger('upload:chunk', index);
                            }
                        });
                });
            };

            this.uploadChunks = function() {
                if(!this.id){
                    cmLogger.debug('Unable to upload chunks; cmFile.id missing. Try calling cmFile.prepareForDownload() first.')
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

                if(self.chunks == null) {
                    cmLogger.error('_downloadChunk:'+index+' download failed because of self.chunks = null');
                    self.trigger('progress:chunk', 1);
                    self.trigger('download:finish', {'error':true});
                    self.trigger('file:cached');
                    return false;
                }

                self.chunks[index] = chunk;

                chunk
                    .download(self.id, index)
                    .then(
                    function(){
                        if(self.chunks != null){
                            self.trigger('progress:chunk', (index/self.chunks.length));
                        }

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
//                cmLogger.debug('cmFileModel:downloadChunks');
                // only crashed when fileId is missing
                if(!this.id && this.state.is('onlyFileId')){
//                    cmLogger.debug('cmFile.downloadChunks();')
                    return null;
                }

                this.importFile();

                this.on('importFile:finish',function(){
                    self.state.unset('onlyFileId');
                    self.state.set('readyForDownload');
                    self.trigger('file:readyForDownload');
                    // autoDownload 'passcaptcha has always true'
                    if(self.autoDownload){
                        self.startDownloadChunks();
                    }
                });

                return this;
            };

            this.startDownloadChunks = function(){
                self.state.unset('readyForDownload');
                self._downloadChunk(0);
            };

            this.downloadStart = function(autoDownload){
                //cmLogger.debug('cmFileModel:downloadStart');
                // handle straight autodownload
                this.autoDownload = autoDownload || this.autoDownload;

                if(this.id != '' && this.state.is('onlyFileId')){
                    cmFileDownload.add(this);
                }
            };

            this.downloadStop = function(){
                cmFileDownload.stop(this);
            };

            this.promptSaveAs = function(){
                //console.log('promptSaveAs')

                try {
                    var isFileSaverSupported = !!new Blob;
                } catch (e) {
                    cmLogger.debug('Unable to prompt saveAs; FileSaver is\'nt supported');
                    return false;
                }

                var downloadAttrSupported = ( "download" in document.createElement("a") ),
                    iOSWorkingMimeTypes = ( this.type.match(/(application\/pdf)/g) ? true : false );

                if(cmEnv.isiOS && !downloadAttrSupported && !iOSWorkingMimeTypes){
                    cmModal.create({
                        id:'saveas',
                        type: 'alert'
                    },'<span>{{\'NOTIFICATIONS.TYPES.SAVE_AS.IOS_NOT_SUPPORT\'|cmTranslate}}</span>');
                    cmModal.open('saveas');
                } else {
                    // phonegap download
                    if(cmDeviceDownload.isSupported()) {
                        //console.log('cmDeviceDownload called')
                        cmDeviceDownload.saveAs(this);
                    // browser download
                    } else if(this.blob){
                        //console.log('saveAs called')
                        saveAs(this.blob, this.name != false ? this.name : 'download');
                    } else {
                        cmLogger.debug('Unable to prompt saveAs; cmFile.blob is missing, try cmFile.importByFile().');
                    }
                }
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
                if(this.state.is('cached')) {
                    this.encryptedName = null;
                    this.chunkIndices = null;
                    this.chunks = null;
                    passphrase = undefined;
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
                var self = this;

                if(typeof fileData !== 'undefined'){
                    // download: existing file via fileId
                    if(typeof fileData == 'string'){
                        this.state.set('onlyFileId');
                        this.id = fileData;

                    // upload init via via base64
                    } else if(typeof fileData == 'object') {
                        this.state.set('new');
                        this.importBlob(fileData);

                        if (!chunkSize) {
                            chunkSize = 128;
                        }

                        self.chopIntoChunks(chunkSize);
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
                    //cmLogger.warn('chunk not found');
                    self.state.set('cached');
                }
            });

            this.on('upload:chunk', function(event, index){
                self._uploadChunk(index + 1);
            });

            this.on('upload:finish', function(){
//                cmLogger.debug('upload:finish');
                self.state.set('cached');
            });

            this.on('encrypt:chunk', function(event, index){
//                cmLogger.debug('encrypt:chunk');
                self._encryptChunk(index + 1);
            });

            this.on('decrypt:chunk', function(event, index){
//                cmLogger.debug('decrypt:chunk '+index);
//                self._decryptChunk(index + 1);
//                self._downloadChunk(index + 1);
            });

            this.on('decrypt:finish', function(event, index){
//                cmLogger.debug('decrypt:finish');
                self.reassembleChunks();
            });

            this.on('file:cached', function(){
//                cmLogger.debug('file:cached');
                self.state.set('cached');

                self
                    .decryptName()
                    .clearBuffer()

                self.detectedExtension = cmFileTypes.find(self.type, self.name);
            });
        };

        return FileModel;
    }
]);