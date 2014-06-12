'use strict';

angular.module('cmCore')
.service('cmFilesAdapter', [
    'cmApi',
    function (cmApi){
        return {
            prepareFile: function(config){
                return cmApi.post({
                    path: '/file',
                    data: {},
                    exp_ok: 'id',
                    headers: {
                        "X-File-Name": config.name,
                        "X-File-Size": config.size,
                        "X-File-Type": config.type,
                        "X-Max-Chunks": config.chunks
                    }
                })
            },

            addChunk: function(fileId, index, chunk) {
                return cmApi.postBinary({
                    path: '/file/'+fileId,
//                    data: {chunk: chunk},
                    data: chunk,
                    headers: {
                        "X-Index": index
                    },
                    transformRequest: function(data){return data}
                })
            },

            getFileInfo: function(fileId){
                return cmApi.get({
                    path: '/file/'+fileId
                })
            },
            // TODO: duplicated? see above!
            getFile: function(fileId){
                return cmApi.get({
                    path: '/file/'+fileId
                })
            },

            getChunk: function(fileId, chunkId){
                return cmApi.getBinary({
                    path: '/file/'+fileId+'/'+chunkId
                })
            },

            base64ToBlob: function (b64Data, contentType, sliceSize){
                b64Data = b64Data.replace(new RegExp('^(data:(.*);base64,)','i'),'');
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
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

                var blob = new Blob(byteArrays, {type: contentType});
                return blob;
            }
        }
    }
])
.service('cmFileDownload', [
    'cmLogger',
    '$rootScope',
    function(cmLogger, $rootScope){
        var self = this;

        this.stack = [];
        this.atWork = false;

        $rootScope.$on('logout', function(){
            self.atWork = false;
            self.stack = [];
            self.stop();
        });

        /**
         * add cmFileObject to Stack
         * @param file
         */
        this.add = function(file){
            if(typeof file == 'object'){
                this.stack.push(file);

                if(this.atWork !== true){
                    this.atWork = true;
                    this.run(this.stack.shift());
                }
            }
        };

        /**
         * work on stack queue, start download process in files
         * @param index
         */
        this.run = function(file){
            if(typeof file == 'object' && file.state == 'exists'){
                file.downloadChunks();

                file.on('file:cached', function(){
                    self.run(self.stack.shift());
                });
                file.on('file:crashed', function(){
                    self.run(self.stack.shift());
                });
            } else {
                if(this.stack.length == 0) {
                    this.atWork = false;
                } else {
                    this.run(this.stack.shift());
                }
            }
        };

        /**
         * Stops Downloading
         */
        this.stop = function(){
            cmLogger.debug('cmFileDownload:stop');
        };

        /**
         * Return Stack Quantity
         * @returns {Array}
         */
        this.getQty = function(){
            return this.stack.length;
        };
    }
])
.factory('cmChunk', [
    'cmFilesAdapter',
    'cmLogger',
    'cmCrypt',
    'cmObject',
    '$q',
    function (cmFilesAdapter, cmLogger, cmCrypt, cmObject, $q){

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

        return function Chunk(file, start, end){

            cmObject.addEventHandlingTo(this);

            this.raw = undefined;
            this.blob = undefined;
            this.plain = undefined;
            this.encryptedRaw = undefined;

            this.importFileSlice = function (file, start, end){
                var slicer  = file.webkitSlice || file.mozSlice || file.slice,
                    chunk   = slicer.call(file, start, end)

                if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                    str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                        chunk = buf
                    });
                }

                this.blob = chunk;
                this.size = end-start;

                return this
            };

            this.blobToBase64 = function(){
                var self = this,
                    reader = new window.FileReader(),
                    deferred = $q.defer();

                reader.onload = function(e) {
                    self.raw = e.target.result;
                    deferred.resolve(self.raw)
                };

                this.blob
                    ?   reader.readAsDataURL(this.blob)
                    :   cmLogger.error('Unable ro convert to file; this.blob is empty.');


                return deferred.promise;
            };

            this.blobToBinaryString = function(){
                var self     = this,
                    reader   = new FileReader(),
                    deferred = $q.defer();

                reader.onload = function(event){
                    self.raw = event.target.result.replace('data:application/octet-stream;base64,', '');
                    deferred.resolve(self.raw)
                };

                this.blob
                    ?   reader.readAsBinaryString(this.blob)
                    :   cmLogger.error('Unable ro convert to raw; chunk.blob is empty.  Try calling chunk.importFileSlice() first.');

                return deferred.promise;

            };

            this.encrypt = function(passphrase) {

                console.log('encrypt passphrase', passphrase)
                console.log('encrypt raw', this.raw)

                if(passphrase == null){
                    this.plain = this.raw;
                } else {

                    this.encryptedRaw = cmCrypt.encryptWithShortKey(passphrase, this.raw);  //Todo: long Key!
                }

                console.log('encrypt encryptedRaw', this.encryptedRaw)
//
//                this.raw
//                    ?   this.encryptedRaw = (passphrase == null) ? this.raw : cmCrypt.encryptWithShortKey(passphrase, this.raw)  //Todo: long Key!
//                    :   cmLogger.error('Unable ro encrypt; chunk.raw is empty.  Try calling chunk.blobToBinaryString() first.')

                return this;
            };

            this.upload = function(id, index){

                console.log('upload encryptedRaw', this.encryptedRaw)

                if(this.plain){
                    return cmFilesAdapter.addChunk(id, index, this.plain)
                } else if(this.encryptedRaw){
                    return cmFilesAdapter.addChunk(id, index, this.encryptedRaw)
                } else {
                    cmLogger.error('Unable to upload; chunk.plain or chunk.encryptedRaw is empty. Try calling chunk.encrypt() first.')
                }

//                return(
//                    this.encryptedRaw
//                        ?   cmFilesAdapter.addChunk(id, index, this.encryptedRaw)
//                        :   cmLogger.error('Unable to upload; chunk.encryptedRaw is empty. Try calling chunk.encrypt() first.')
//                )
            };

            this.download = function(id, index){
                var self = this;

                this.raw = undefined;
                this.blob  = undefined;

                return cmFilesAdapter.getChunk(id, index).then(
                    function(data){
                        return self.encryptedRaw = data
                    })
            };

            /**
             * @param passphrase
             * @returns {Chunk}
             */
            this.decrypt = function(passphrase){
                this.encryptedRaw
                    ?   this.raw = cmCrypt.decrypt(passphrase, this.encryptedRaw)
                    :   cmLogger.error('Unable to decrypt; chunk.encryptedRaw is empty. Try calling chunk.download() first.');
                return this;
            };

            this.binaryStringToBlob = function(){
                this.raw
                    ?   this.blob = binaryStringtoBlob(this.raw)
                    :   cmLogger.error('Unable to convert to Blob; chunk.raw is empty. Try calling chunk.decrypt() first.');
                return this;
            };

            this.base64ToBlob = function(){
                this.raw
                    ?   this.blob = cmFilesAdapter.base64ToBlob(this.raw)
                    :   cmLogger.error('Unable to convert to Blob; chunk.raw is empty. Try calling chunk.decrypt() first.');

                return this;
            };
        }
    }
])
.factory('cmFileFactory', [
    'cmFileModel',
    '$rootScope',
    function(cmFileModel, $rootScope){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            create: function(data, explicit){
                var file = null,
                    i = 0;

                if(typeof explicit === 'undefined'){
                    explicit = false;
                }

                if(explicit !== true) {
                    // existing via id
                    if (typeof data == 'string') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
                    //
                    } else if (typeof data == 'object') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data.id) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
                    }
                }
                // create model
                if(file == null){
                    file = new cmFileModel(data);
                    instances.push(file);
                }

                return file;
            },
            remove: function(file){
                var bool = false;

                var index = instances.indexOf(file);
                if(index != -1) {
                    instances.splice(index, 1);
                    delete instances[index];
                    bool = true;
                }

                return bool;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
])
.factory('cmFileModel', [
    'cmFilesAdapter',
    'cmFileDownload',
    'cmLogger',
    'cmChunk',
    'cmCrypt',
    'cmObject',
    '$q',
    'cmModal',
    'cmEnv',
    function (cmFilesAdapter, cmFileDownload, cmLogger, cmChunk, cmCrypt, cmObject, $q, cmModal, cmEnv){

        function roundToTwo(num) {
            return +(Math.round(num + 'e+2') + 'e-2');
        }

        var FileModel = function(fileData){

            var self = this,
                passphrase = undefined;

            cmObject.addEventHandlingTo(this);

            this.state = '';

            this.chunks = [];

            this.name = '';
            this.encryptedName = '';
            this.encryptedSize = 0;
            this.size = 0;

            this.base64 = '';

            this.setPassphrase = function(p){
                passphrase = p;// TODO: || null;

                return this;
            };

            this.setState = function(state){
                var arr_states = ['new','exists','cached','crashed'];
                if(arr_states.indexOf(state) != -1)
                    this.state = state;

                return this;
            };

            // upload for state = new

            this.importBase64 = function(base64){
                if(typeof base64 !== 'undefined'){
                    this.type = base64.replace(new RegExp('^(data:(.*);base64,.*)','i'),'$2');

                    this.blob = cmFilesAdapter.base64ToBlob(base64,this.type);

                    this.chopIntoChunks(128);
                }

                return this;
            };

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

                return cmFilesAdapter.getFileInfo(this.id).then(
                    function(details){
                        self.encryptedName = details.fileName;
                        self.type          = details.fileType;
                        self.size          = details.fileSize;
                        self.chunkIndices  = details.chunks;
                        self.maxChunks     = details.maxChunks;

                        self.trigger('importFile:finish');
                    },
                    function(){
                        self.trigger('file:crashed');
                        self.setState('crashed');
                    }
                );
            };

            this.chopIntoChunks = function(chunkSize){
                var self        = this,
                    startByte   = 0,
                    endByte     = 0,
                    index       = 0,
                    promises    = []

                if(!this.blob) {
                    cmLogger.error('Unable to chop file into Chunks; cmFile.blob missing.')
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
                            .blobToBase64()
                    )

                    index++
                }

                return $q.all(promises)
            };

            this.encryptName = function(){
                if(this.name){
                    this.encryptedName = (passphrase == null) ? this.name : cmCrypt.encryptWithShortKey(passphrase, this.name);
                } else {
                    cmLogger.error('Unable to encrypt filename; cmFile.name missing. Try calling cmFile.importFile() first.');
                }

                return this;
            };

            this.decryptName = function() {
                if(this.encryptedName){
                    this.name = cmCrypt.decrypt(passphrase, this.encryptedName);
                } else {
                    cmLogger.error('Unable to decrypt filename; cmFile.encryptedFileName missing. Try calling cmFile.imporByFile) first.');
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
                    cmLogger.error('Unable to encrypt chunks; cmFile.chunks missing. Try calling cmFile.chopIntoChunks() first.');
                }

                return this;
            };

            this._decryptChunk = function(index){
                var chunk = this.chunks[index];

                chunk
                    .decrypt(passphrase)
                    .base64ToBlob()

                this.encryptedSize += chunk.encryptedRaw.length;
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
                    data = [];

                if(!this.chunks) cmLogger.error('Unable reassemble chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.')

                this.chunks.forEach(function(chunk){
                    data.push(chunk.blob)
                })

                this.blob = new Blob(data, {type: self.type})

                self.trigger('file:cached', this);

                return this;
            };

            this.prepareForUpload = function() {
                var self = this;

                return (
                    self.encryptedName && self.chunks || self.name && self.chunks
                    ?   cmFilesAdapter.prepareFile({
                        name    : self.encryptedName || self.name,
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
                    .encrypt(passphrase)
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
//                cmLogger.debug('cmFileModel:downloadChunks');
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
//                cmLogger.debug('cmFileModel:downloadStart');
                if(this.id != '' && this.state == 'exists'){
                    cmFileDownload.add(this);
                }
            };

            this.promptSaveAs = function(){
                // iOS can't save blob via browser

                var downloadAttrSupported = ( "download" in document.createElement("a") );
                var iOSWorkingMimeTypes = ( this.type.match(/(application\/pdf)/g) ? true : false );

                if(cmEnv.isiOS && !downloadAttrSupported && !iOSWorkingMimeTypes){
                    cmModal.create({
                        id:'saveas',
                        type: 'alert'
                    },'<span>{{\'NOTIFY.SAVE_AS.IOS_NOT_SUPPORT\'|cmTranslate}}</span>');
                    cmModal.open('saveas');
                } else {
                    if(this.name && this.blob){
                        saveAs(this.blob, this.name);
                    } else {
                        cmLogger.error('Unable to prompt saveAs; cmFile.blob is missing, try cmFile.importByFile().');
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
                if(this.state == 'cached') {
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
                    // existing file via fileId
                    if(typeof fileData == 'string'){
                        this
                            .setState('exists')
                            .id = fileData;
                    // fileApi blob prepare upload
                    } else if(typeof fileData == 'object') {
                        this
                            .setState('new')
                            .importBlob(fileData);

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
                self
                    .setState('cached')
                    .decryptName()
                    .clearBuffer()
            });
        };

        return FileModel;
    }
]);