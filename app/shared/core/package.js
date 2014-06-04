'use strict';

angular.module('cmCore',['pascalprecht.translate','angular-growl','cmUi'])
//This factory provides a generic Factory


.factory('cmFactory',[

    'cmObject',

    function(cmObject) {

        /**
         * generic Factory, has to be setup with a model to create instances from. A model is expected to have .refresh() method, to get data from the backend.
         * @param {object} [config] 
         */

        return function cmFactory(model){

            var self        = new Array()

            self.model      = model

            cmObject.addEventHandlingTo(self)

            /**
             * Function to create an instance of this.model. If an instance with the same id as provided already exist, fetch it instead off creating a new one.
             * @param {string|object}   args        instance id, data set including an instance id or data set without an id
             * @return {model}                      allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             *                                      this instance will be returned – otherwise a new one will be created and if possible populated with data from the backend.
             */
            self.create = function(args){
                var id          =   typeof args == 'object' 
                                    ?   args.id
                                    :   args

                return self.find(id) || self.new(args) //Todo: self.find(id).importData(args)?
            }

            /**
             * Function to find and instance by its id.
             * @param  {string}         id          The id of the instance to find.
             * @return {model|null}                 returns the first instance to match the id or null if none is found 
             */
            self.find = function(id){
                if(!id) return null

                var matches = self.filter(function(instance){ return instance.id == id })

                return matches.length ? matches[0] : null       
            }


            /**
             * Function to create a new model instance. 
             * @param {string|object}   args        instance id, data set including an instance id or data set without an id
             * @return {cmModel}                    returns a new model instance populated with the provided data
             */

            self.new = function(args){
                var data     = typeof args == 'string' ? {id:args} : args,
                    instance = new self.model(data)

                self.register( instance )
                
                return instance
            }

            /**
             * Function to store a model instance for later use, retrievable by its id
             * @param {model}           instance    an instance pof model
             */

            self.register = function(instance){
                if(self.indexOf(instance) == -1){
                    self.push(instance)
                    self.trigger('register', instance)

                    return self.length
                }

                return false
            }

            self.reset = function(){
                while(self.length > 0) self.pop()
                return self
            }

            return self
        }
    }
])
.factory('cmIdentityModel',[
    'cmAuth',
    'cmCrypt',
    'cmObject',
    'cmLogger',
    'cmApi',
    'cmFileFactory',
    '$q',
    function(cmAuth, cmCrypt, cmObject, cmLogger, cmApi, cmFileFactory, $q){
        var Identity = function(identity_data){

            this.id,
            this.displayName,
            this.userKey,
            this.cameoId,
            this.avatarId,
            this.avatar,
            this.email                   = { value: undefined, isVerified: undefined },
            this.phoneNumber             = { value: undefined, isVerified: undefined },
            this.preferredMessageType,
            this.keys                    = [],
            this.userType,
            this.created,
            this.lastUpdated;

            var self = this;

            cmObject.addEventHandlingTo(this)

            //Encrypt passphrase with all available public keys
            //Identities cannot decrypt, Users can
            this.encryptPassphrase = function(passphrase){
                var encrypted_key_list = []

                this.keys.forEach(function(key){

                    var key_2 = new cmCrypt.Key()

                    key_2.setKey(key.getPrivateKey())

                    var encrypted_passphrase = key.encrypt(passphrase)

                    encrypted_key_list.push({
                        keyId:                 key.id,
                        encryptedPassphrase:   encrypted_passphrase
                    })
                })
                return encrypted_key_list
            }

            this.getDisplayName = function(){
                return this.displayName || this.cameoId || this.id;
            };

            /* do we need this?
            this.getKeyById = function(id){
                var needle

                this.keys.forEach(function(key){
                    if(key.id == id) needle = key
                })

                return needle
            }

            */

            /**
             * get and cached avatar of identity
             *
             */
            this.getAvatar = function(){
                if(this.avatarId){
                    var file = cmFileFactory.create(this.avatarId);
                        file.setPassphrase('')
                            .downloadStart();

                    return file;
                }
                return false;
            };

            this.addKey = function(key_data){
                //key_data maybe a string containing a public or Private key, or a key Object (cmCrypt.Key)

                var key,
                    is_object  = (typeof key_data == 'object'),
                    is_string  = (typeof key_data == 'string'),
                    can_update = is_object && "updateKeyList" in key_data

                if( can_update )                key = key_data  //already a Key object
                if( is_object && !can_update)   key = (new cmCrypt.Key()).importData(key_data) //from backend or localstorgae
                if( is_string)                  key = new cmCrypt.Key(key_data) //plain text public or private key

                key
                ?   key.updateKeyList(self.keys)
                :   cmLogger.error('uanable to add key, unknown format: '+key_data)

                return this
            }

            this.getWeakestKeySize = function(){
                var size = undefined
                this.keys.forEach(function(key){
                    size = size != undefined ? Math.min(size, key.getSize()) : key.getSize()
                })
                size = size || 0
                return size
            }

            /**
             * @param identity_data
             */
            this.init = function(identity_data){
                if(typeof identity_data === 'object'){
                    this.id = identity_data.id;
                    this.displayName            = identity_data.displayName
                    this.userKey                = identity_data.userKey
                    this.cameoId                = identity_data.cameoId
                    this.avatarId               = identity_data.avatar
                    this.email                  = identity_data.email
                    this.phoneNumber            = identity_data.phoneNumber
                    this.preferredMessageType   = identity_data.preferredMessageType
                    this.userType               = identity_data.userType
                    this.created                = identity_data.created
                    this.lastUpdated            = identity_data.lastUpdated
                    this.keys                   = []

                    identity_data.publicKeys = identity_data.publicKeys || []
                    identity_data.publicKeys.forEach(function(publicKey_data){
                        self.addKey(publicKey_data)
                    })

                    this.trigger('init:finish', this);

                } else if(typeof identity_data === 'string'){
                    this.id = identity_data;

                    this.trigger('before-load')
                    cmAuth.getIdentity(identity_data).then(
                        function(data){
                            self.trigger('load', data)
                            if(typeof data =='string'){
                                cmLogger('cmAuth.getIdentity() should forward an object, got string instead. ')
                            }else{
                                self.init(data)
                            }
                            self.trigger('after-load', data)
                        }
                    )
                }

                return this;
            }

            this.init(identity_data);
        }

        return Identity;
    }
])
.factory('cmIdentityFactory',[

    '$rootScope',
    'cmIdentityModel',

    function($rootScope, cmIdentityModel){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            /**
             * returns instance of cmIdentityModel
             * @param data id or object
             * @returns {*}
             */

            get: function(data){
                var identity = null,
                    id       = data.id || data

                identity = this.getById(id) 

                if(identity === null){
                    identity = new cmIdentityModel(data);
                    instances.push(identity);
                }

                return identity;
            },

            create: function(data){
                if(typeof data != 'object'){
                    return null  
                } else {
                    return this.get(data)
                }
            },


            //get Message by id
            getById: function(id){
                var identity = null;

                for(var i = 0; i < instances.length; i++){
                    if(
                        typeof instances[i] === 'object' &&
                        instances[i].id == id
                    ){
                        identity = instances[i];
                        break;
                    }
                }

                return identity
            },


            getQty: function(){
                return instances.length;
            }
        }
    }
])
//This factory provides a generic Factory


.factory('cmModel',[

    'cmObject',

    function(cmObject) {

        /**
         * generic Model
         */

        var cmModel = function(){
            this.state = {}

            cmObject
            .addEventHandlingTo(this)
            .addChainHandlingTo(this)

            this.setState = function(key, value){
                var old_value = this.state[state_name],
                    new_value = value

                this.state[state_name] = new_value
                this.trigger('state-change:'+key, {'old_value': old_value, 'new_value': new_value} )

                return this
            }

            /**
             * Function to update model with data from backend. This function is meant to be overwritten.
             */

            this.refresh = function(){
                return this
            }
        }

        return cmModel
    }

])
//This factory provides state management


.factory('cmStateManagement',[

    'cmObject',

    function(cmObject) {

        /**
         * generic state management
         * @param {Array} [states] An array with allowed states
         */

        function cmStateManagement(model){

            var self        = new Array()

            cmObject
            .addEventHandlingTo(self)

            self.set = function(state){
                if(self.indexOf(state) == -1){
                    self.push(state)
                    self.trigger('change')
                }
            }

            self.unset = function(state){
                if(self.indexOf(state) != -1){
                    self.splice(self.indexOf(state),1)
                    self.trigger('change')
                }
            }

            self.is = function(state){
                return self.indexOf(state) != -1
            }

            return self
        }

        return cmStateManagement
    }
])

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
                this.blob = undefined

                if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                    str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                        chunk = buf
                    });
                }

                this.blob = chunk
                this.size = end-start

                return this
            }

            this.blobToBase64 = function(){
                var self = this,
                    reader = new window.FileReader(),
                    deferred = $q.defer();

                reader.onload = function(e) {
                    self.raw = e.target.result;
                    deferred.resolve(self.raw)
                }

                this.blob
                    ?   reader.readAsDataURL(this.blob)
                    :   cmLogger.error('Unable ro convert to file; this.blob is empty.')


                return deferred.promise;
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
                    ?   this.encryptedRaw = cmCrypt.encryptWithShortKey(passphrase, this.raw)  //Todo: long Key!
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

                return cmFilesAdapter.getChunk(id, index).then(
                    function(data){
                        return self.encryptedRaw = data
                    })
            }

            /**
             * @param passphrase
             * @returns {Chunk}
             */
            this.decrypt = function(passphrase){
                this.encryptedRaw
                    ?   this.raw = cmCrypt.decrypt(passphrase, this.encryptedRaw)
                    :   cmLogger.error('Unable to decrypt; chunk.encryptedRaw is empty. Try calling chunk.download() first.');
                return this
            }

            this.binaryStringToBlob = function(){
                this.raw
                    ?   this.blob = binaryStringtoBlob(this.raw)
                    :   cmLogger.error('Unable to convert to Blob; chunk.raw is empty. Try calling chunk.decrypt() first.')
                return this
            }

            this.base64ToBlob = function(){
                this.raw
                    ?   this.blob = cmFilesAdapter.base64ToBlob(this.raw)
                    :   cmLogger.error('Unable to convert to Blob; chunk.raw is empty. Try calling chunk.decrypt() first.')

                return this
            }
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

            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = '';

            this.chunks = [];

            this.name = '';
            this.encryptedName = '';
            this.encryptedSize = 0;
            this.size = 0;

            this.base64 = '';

            this.setPassphrase = function(passphrase){
                this.passphrase = passphrase;// TODO: || null;

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
])
// Provides:
// filter 'translate', usage: {{'MESSAGE_ID' | translate}}
// controller 'languageCtrl' for language switch
// Example:
// <div ng-controller="LanguageCtrl">
//		<a href="" ng-click="switchLang('en_US')">Englisch</a></li>
//		<a href="" ng-click="switchLang('de_DE')">German</li>
// </div>
// language files: /languages/lang-$langKey.json
// language file format:
//		{
//			"MESSAGE_ID": "Text",
//			"NAMESPACE"	: {
//				"MESSAGE_ID": "Hello {{username}}"
//			}
//		}
// language keys: $LANG_$CULTURE, en_US
// last language is stored in local storage (fallback cookie)
// Todo: new logger, add notify


.service('cmTranslate', [
    '$translate', function($translate){ return $translate }
])
.filter('cmTranslate', [
    'translateFilter', function(translateFilter){ return translateFilter }
])

//Does not work as intended <div cm-translate="LANG.DE_DE"></div> stays empty
.directive('cmTranslate', [
    'translateDirective', function(translateDirective){ return translateDirective[0] }
])

.provider('cmLanguage', [
    '$translateProvider',
    function($translateProvider){

        var supported_languages = [],
            path_to_languages = '',
            cache_lang_files = true;

        this.supportedLanguages = function(languages){
            supported_languages = languages;
            return(this)
        };

        this.pathToLanguages = function(path){
            path_to_languages = path;

            $translateProvider.useStaticFilesLoader({
                prefix: path+'/',
                suffix: '.json' + (cache_lang_files ? '' : '?bust=' + (new Date()).getTime())
            });

            return(this)
        };

        this.useLocalStorage = function(){
            $translateProvider.useLocalStorage();
            return(this)
        };

        this.preferredLanguage = function(lang_key){
            $translateProvider.preferredLanguage(lang_key);
            return(this)
        };

        this.cacheLangFiles = function(bool){
            cache_lang_files = bool;
            return(this)
        };

        this.translations = function(lang_key, data){
            $translateProvider.translations(lang_key, data)
        };

        this.$get = [
            'cmTranslate',
            'cmNotify',
            'cmLogger',
            function(cmTranslate, cmNotify, cmLogger){

                if(supported_languages.length == 0)
                    cmLogger.error('No supported languages found. Try cmLanguageProvider.setSupportedLanguages().', {ttl:5000})

                return {
                    getSupportedLanguages: function(){
                        return supported_languages
                    },

                    getPathToLanguage: function(path){
                        return path_to_languages
                    },

                    getLanguageName: function(lang_key){
                        lang_key = lang_key || cmTranslate.uses();
                        return cmTranslate('LANG.'+lang_key.toUpperCase())
                    },

                    switchLanguage: function(lang_key){
                        var self = this;

                        return cmTranslate.uses(lang_key)
                        .then(
                            function(){
                                cmNotify.info(cmTranslate('LANG.SWITCH.SUCCESS', { lang: self.getLanguageName(lang_key), ttl: 5000 }))
                            },
                            function(){
                                cmNotify.error(cmTranslate('LANG.SWITCH.ERROR', { lang: self.getLanguageName(lang_key), ttl: 5000 }))
                            }
                        )
                    },

                    getCurrentLanguage:  function(){
                        return cmTranslate.uses() || cmTranslate.preferredLanguage()
                    }
                }
            }
        ]
    }
])

.directive('cmLanguageSelect', [
    'cmLanguage',
    function(cmLanguage){
        return {
            restrict: 'AE',
            transclude: true,
            template: '<select ng-model="language" ng-options="getLanguageName(lang_key) for lang_key in languages">'+
                      '<a ng-repeat="key in languages">{{languages}}</a>'+
                      '</select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmLanguage.switchLanguage(scope.language)
                })
            },

            controller: function($scope){
                $scope.languages = cmLanguage.getSupportedLanguages()
                $scope.getLanguageName = cmLanguage.getLanguageName
                $scope.language = cmLanguage.getCurrentLanguage()
            }
        }
    }
])
//notification, growl;     https://github.com/marcorinck/angular-growl
//wrapper
//todo: growl directive wrappen?


.config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
    //intercept messages from Backend:
    /*
     {
     "someOtherData": {...},
     "messages": [
     {"text":"this is a server message", 		"severity": "warn"},
     {"text":"this is another server message", 	"severity": "info"},
     {"text":"and another", 						"severity": "error"}
     ]
     }
     */
    //if the backend respond with the above json 'messages' will be fetched:

    growlProvider.messagesKey("messages");
    growlProvider.messageTextKey("text");
    growlProvider.messageSeverityKey("severity");
    $httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);

    //notifications should disappear after 5 seconds
    //growlProvider.globalTimeToLive(5000);
}])
/**
 * service for cmNotify injection (wrapper for growl)
 *
 * cmNotify.error('LOGIN.INFO.404', {ttl:5000, hideGlobal:true});
 */
.service('cmNotify', [

    '$rootScope',
    'growl',
    '$document',

    function ($rootScope, growl, $document) {

        var notifications = []

        /**
         * hide/show all cm-notify arround a modal
         * @param options
         */

        function handleGlobalVisiblity(options){
            if(options && 'hideGlobal' in options){
                angular
                .element($document[0].querySelector('[cm-notify]'))
                .css('display',options.hideGlobal ? 'none' : null)
            }
        }

        $rootScope.$on('growlMessage', function(event, message){
            notifications.push(message)
            $rootScope.$broadcast('cmNotify:update')
        })


        return {
            warn: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addWarnMessage(msg, options);
            },
            info: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addInfoMessage(msg, options);
            },
            success: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addSuccessMessage(msg, options);
            },
            error: function (msg, options) {
                handleGlobalVisiblity(options);
                growl.addErrorMessage(msg, options);
            },
            getNotifications: function(){
                return notifications
            }
        }
    }
])

// TODO link to drtv's:
// drtv-contact-request-list.js:36

/**
 * directive for <div cm-notify>
 */
.directive('cmNotify', function () {
    return {
        priority: 10000,
        template: '<div growl></div>'
    }
})

.directive('cmNotifySignal', [
    '$rootScope',
    'cmNotify',
    function ($rootScope, cmNotify) {
return {
            restrict: 'AE',
            template: '<i class="fa" ng-class="{\'cm-bell-ring cm-orange\': unreadNotifications, \'cm-bell\' : !unreadNotifications}"></i>',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.unreadNotifications = cmNotify.getNotifications().length > 0

                $scope.$on('cmNotify:update', function(event){
                    $scope.unreadNotifications = cmNotify.getNotifications().length > 0
                })
            }
            
        }
    }
])
//This Module handels api calls

.provider('cmApi',[

//Service to handle all api calls

    function($injector){
        var rest_api    = "",
            call_stack_disabled = true,
            call_stack_path = "",
            commit_size = 10,
            commit_interval = 2000,
            events_disabled = true,
            events_path = "",
            events_interval = 5000

        this.restApiUrl = function(url){
            rest_api = url;
            return this
        }

        this.useCallStack = function (on){
            call_stack_disabled = !on
            return this
        }

        this.callStackPath = function(path){
            call_stack_path = path
            return this
        }

        this.commitSize = function(size){
            commit_size = size
            return this
        }

        this.commitInterval = function(interval){
            commit_interval = interval 
            return this
        }

        this.useEvents = function (on){
            events_disabled = !on
            return this
        }

        this.eventsPath = function(path){
            events_path = path
            return this
        }

        this.eventsInterval = function(interval){
            events_interval = interval 
            return this
        }


        this.$get = [

            'cmLogger',
            'cmObject',
            '$http',
            '$httpBackend',
            '$injector',
            '$q',
            '$interval',
            '$cacheFactory',
            '$rootScope',

            function(cmLogger, cmObject, $http, $httpBackend, $injector, $q, $interval, $cacheFactory, $rootScope){
                /***
                All api calls require a config object:

                ie.: api.get(config)

                config works almost like in $http(config)

                most important keys are:
                    path:	api path to call i.e. '/account/check',
                            will give an error message if passed something different from a path (like 'http://dev.cameo.io/...')
                            in that case your call will most likely fail brutally

                    data:	data to send, any plain object

                    exp_ko: key you expect in response body if your request was granted(see below)
                    exp_ok: key you expect in response body if your request was denied (see below)


                Authentication and error handling is dealt with automatically.


                example: (!!check tests in cmApi.spec.js!!)

                cmApi.get({
                    path:     '/pony',
                    exp_ok:  'pony',
                })''


                ---> response:  {
                                    "res" : 'OK',
                                    "data": {
                                                "pony" : "my_new_pony"
                                            }
                                }

                .then(
                    function(pony){         <--- gets called because response.res == 'OK', pony will equal 'my_pony'
                        yay(pony)
                    },

                    function(alternative, res){
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have already been handled alesewhere
                    }
                )


                ---> response:  {
                                    "res" : 'OK',
                                    "data": {
                                                "dog" : "my_new_dog"
                                            }
                                }

                .then(
                    function(pony){
                        yay(pony)
                    },
                    function(alternative,res){	<--- gets called because response is invalid, "pony" was expected, yet "dog" was delivered
                                                     alternative will be undefined
                                                     res however holds all the response
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have been handled already elesewhere
                    }
                )




                ---> response:	{
                                    "res" : 'KO',
                                    "data": {
                                                "alternative" : "kitty"
                                            }
                                }

                .then(
                    function(pony){
                        yay(pony)
                    },
                    function(data, res){ <--- gets called because response.res == 'KO', data will be {'alternative': 'kitty'},
                                              because there was no specific key expected for KO.
                                              res however holds all the response
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have been handled already elesewhere
                    }
                )




                ---> response:	{
                                    "res" : 'XXX',
                                    "data": {
                                                "kitty" : "grumpy cat"
                                            }
                                }

                .then(
                    function(pony){
                        yay(pony)
                    },
                    function(alternative,res){ <--- gets called because response is invalid for neither response.res == 'OK' nor response.res == 'KO',
                                                    alternative will be undefined
                                                    res however holds all the response
                        alternative
                        ? meh(alternative)
                        : error(alternative) //yet error should have been handled already elesewhere
                    }
                )



                */
               
                //check if the sever's response complies with the api conventions
                function compliesWithApiConventions(body, exp_ok, exp_ko){
                    var valid =    body
                                    //response must have a res key that equals 'OK' or 'KO':
                                && (body.res == 'OK' || body.res == 'KO')
                                    //if your request was granted and something was expected in return, it must be present:
                                && (body.res == "OK" && exp_ok ? exp_ok in body.data : true)
                                    //if your request was denied and something was expected in return, it must be present:
                                && (body.res == "KO" && exp_ko ? exp_ko in body.data : true)

                    if(!valid) cmLogger.error('Api response invalid; '+(exp_ok||exp_ko ? 'expected: ':'') + (exp_ok||'') +', '+(exp_ko||''), body)

                    return(valid)
                }
               
               function handleSuccess(response, deferred){
                    //$http call was successfull
                    
                    var config  = response.config,
                        body    = response.data

                    compliesWithApiConventions(body, config.exp_ok, config.exp_ko)
                    ?   //response valid, check if OK:
                        //if a certain key was expected, resolve promise resp. reject the promise with the according values
                        //if nothing was expected, just resolve or reject with value of 'data' in the response body if present or all the data
                        //reponse should now look similar to this:
                        /*
                            "res":  "OK",
                            "data": {
                                        "some_key":             "some_value",
                                        "some expected_key":    "some_other value"
                                    }

                        */
                        body.res =='OK'
                        ? deferred.resolve( config.exp_ok ? body.data[config.exp_ok] : body.data || response)
                        : deferred.reject(  config.exp_ko ? body.data[config.exp_ko] : body.data || response)

                    :   //response invalid, call through:
                        deferred.reject(undefined, response)
                }
            

                function handleError(response, deferred){        
                    cmLogger.error('Api call failed: \n '+response.config.method+' '+response.config.path, response)
//                    window.location.href='#/server_down' //@ Todo
                    //error messages should come trough backend
                    deferred.reject(response)
                }

                function prepareConfig(config, method, token, twoFactorToken){
                    
                    config.url      =   config.url ||
                                        (
                                            rest_api +      // base url API
                                            config.path     // path to specific method
                                        )
                    config.method   =   method || config.method 
                    config.headers  =   angular.extend(token           ? {'Authorization': token} : {}, config.headers || {})   //add authorization token to the header
                    config.headers  =   angular.extend(twoFactorToken  ? {'X-TwoFactorToken': twoFactorToken} : {}, config.headers || {})   //add two factor authorization token to the header

                }


                var api = function(method, config){
                    var deferred	=	$q.defer(),

                        //get authentification token from cmAuth if present
                        token 		    = 	$injector.has('cmAuth')
                                            ?	$injector.get('cmAuth').getToken()
                                            :	undefined,

                        //get twoFactorAuth token from cmAuth if present
                        twoFactorToken	= 	$injector.has('cmAuth')
                                            ?	$injector.get('cmAuth').getTwoFactorToken()
                                            :	undefined


                    prepareConfig(config, method, token, twoFactorToken)

                    $http(config).then(
                        function(response){ handleSuccess(response, deferred) },
                        function(response){ handleError(response, deferred) }
                    )

                    return deferred.promise
                }

                /**
                 * Shortcuts for api()
                 * @param {Object}  config  config object as used by api()
                 * @param {Boolean}         force direct api call not using the callstack   
                 */

                api.get		= function(config, force){ return (force || call_stack_disabled) ? api('GET',	 config) : api.stack('GET',    config) }
                api.post	= function(config, force){ return (force || call_stack_disabled) ? api('POST',   config) : api.stack('POST',   config) }
                api.delete	= function(config, force){ return (force || call_stack_disabled) ? api('DELETE', config) : api.stack('DELETE', config) }
                api.head	= function(config, force){ return (force || call_stack_disabled) ? api('HEAD',   config) : api.stack('HEAD',   config) }
                api.put		= function(config, force){ return (force || call_stack_disabled) ? api('PUT',    config) : api.stack('PUT',    config) }
                api.jsonp	= function(config, force){ return (force || call_stack_disabled) ? api('JSONP',  config) : api.stack('JSONP',  config) }


                // binary mock
                api.getBinary = function(config){
                    var deferred = $q.defer(),
                        token = $injector.has('cmAuth') ? $injector.get('cmAuth').getToken() : undefined;

                    prepareConfig(config, 'GET', token);
                    // assume binary as blob
//                    config.responseType = 'blob';

                    $http(config).then(
                        function(response){
                            deferred.resolve(response.data)
                        },
                        function(response){
                            deferred.reject(response)
                        }
                    );

                    return deferred.promise
                };

                api.postBinary = function(config){
                    var deferred = $q.defer(),
                        token = $injector.has('cmAuth') ? $injector.get('cmAuth').getToken() : undefined;
                    prepareConfig(config, 'POST', token);

                    $http(config).then(
                        function(response){
                            deferred.resolve(response.data)
                        },
                        function(response){
                            deferred.reject(response)
                        }
                    );

                    return deferred.promise
                };


                //CALL STACK:

                api.call_stack = api.call_stack || []
                api.call_stack_cache = $cacheFactory('call_stack_cache')


                //Puts a requests on the call stack
                api.stack = function(method, config){

                    if(call_stack_disabled){
                        cmLogger.error('unable to call ".stack()", callstack disabled.')
                        return null
                    }


                    prepareConfig(config, method)

                    var deferred = $q.defer()

                    api.call_stack.push({
                        deferred : deferred,
                        config   : config
                    })

                    return deferred.promise
                }


                // Commits all requests on callstack to the API
                api.commit = function(){

                    //dont do anything, if call stack is empty:
                    if(api.call_stack.length == 0) return null        

                    var items_to_commit = [],
                        configs         = []

                    //pick items from callstack to commit:
                    api.call_stack.forEach(function(item, index){
                        if(items_to_commit.length < commit_size){
                            items_to_commit.push(item)
                            delete api.call_stack[index]
                        }
                    })

                    //remove undefined elements from call_stack:
                    var index = api.call_stack.length
                    while(index--){ if(!api.call_stack[index]) api.call_stack.splice(index,1) }

                    //prepare request configs:
                    items_to_commit.forEach(function(item, index){ configs.push(item.config) })

                    //post requests to call stack api:
                    api.post({
                        path: call_stack_path,
                        data: { requests: configs },
                        exp_ok : 'responses' 
                    }, true)
                    .then(function(responses){

                        responses.forEach(function(request, index){

                            var response =  {
                                                data   : responses[index].body,
                                                status : responses[index].status,
                                                config : items_to_commit[index].config,
                                            },

                                deferred = items_to_commit[index].deferred

                            200 <= response.status && response.status < 300
                            ?   handleSuccess(response, deferred)
                            :   handleError(response, deferred)
               
                        })                        
                    })

                }

                if(!call_stack_disabled && commit_interval) $interval(function(){ api.commit() }, commit_interval, false)



                //API EVENTS:
                
                cmObject.addEventHandlingTo(api)

                api.subscriptionId = undefined

                api.subscribeToEventStream = function(){
                    return  api.post({
                                path: events_path,
                                exp_ok: 'id',
                                data:{
                                    secret: 'b4plIJMNITRDeJ9vl0JG' //only working on dev
                                }
                            }, true)
                            .then(function(id){
                                api.subscriptionId = id
                            })
                }

                api.getEvents = function(force){
                    if(!api.subscriptionId){

                        //if no subscriptionId is present, get one and try again later:
                        api.subscribeToEventStream()
                        .then(function(){ api.getEvents() })

                    }else{
                        api.get({
                            path: events_path + '/' + api.subscriptionId,
                            exp_ok: 'events'
                        }, force)
                        .then(function(events){
                            events.forEach(function(event){
                                api.trigger(event.name, event.data)
                            })
                        })
                    }
                }

                api.listenToEvents = function(){
                    //Dont listen to Events twice: 
                    api.stopListeningToEvents()
                    //Start listening:
                    if(!events_disabled && events_interval) api._events_promise = $interval(function(){ api.getEvents(false) }, events_interval, false)
                }

                api.stopListeningToEvents = function(){
                    if(api._events_promise) $interval.cancel(api._events_promise)
                }                 

                if(!events_disabled && events_interval){
                    $rootScope.$on('login',     function(){ api.listenToEvents() })
                    $rootScope.$on('logout',    function(){ api.stopListeningToEvents() })
                }

                return api
            }
        ]
    }
])
.provider('cmLogger', [
    '$logProvider',
    function($logProvider){
        var debug_enabled = true;

        this.debugEnabled = function(flag){
            $logProvider.debugEnabled(flag);
            debug_enabled = flag;
        };

        this.$get = [
            '$log',
            function($log){
            /**
            * Format date as a string
            */
            function getTimestampAsString() {
                var d = (new Date()+'').split(' ');
                return [d[3], d[1], d[2], d[4]].join(' ');
            }

            function prefix(type, msg) {
                return getTimestampAsString() + " [cmLogger-"+type.toUpperCase()+"]> "  + msg;
            }

            function log_object(obj) {
                console.groupCollapsed(obj);
                console.dir(obj);
                console.groupEnd();
            }

            return {
                universal: function(type, loggerMessage, object) {
                    $log[type](prefix(type, loggerMessage))
                    if(object) log_object(object)
                },

                 /**
                 * simple info log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                info: function(loggerMessage, object){ this.universal('info', loggerMessage, object) },
                /**
                 * simple warn log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                warn: function(loggerMessage, object){ this.universal('warn', loggerMessage, object) },
                /**
                 * simple error log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                error: function(loggerMessage, object){ this.universal('error', loggerMessage, object) },
                /**
                 * simple debug log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                debug: function(loggerMessage, object){
                    if(!debug_enabled) return(undefined)
                    this.universal('debug', loggerMessage, object)
                }
            }
        }];
    }
])

.service('cmAuth', [

    'cmApi',
    
    function(cmApi){
        return {

            // ask the api for a new authentication token:
            requestToken: function(login, pass){
                var auth = _Base64.encode(login + ":" + pass);

                return cmApi.get({
                    path: '/token',
                    headers: { 'Authorization': 'Basic '+auth } ,
                    exp_ok: 'token'
                }, true)
            },

            // delete Token
            removeToken: function(){
                return localStorage.removeItem('token');
            },

            // store the token in a cookie:
            storeToken: function(token){
                return localStorage.setItem('token', token);
            },

            // retrieve thr token from a cookie
            getToken: function(){
                return localStorage.getItem('token');
            },

            createUser: function(data){
                return cmApi.post({
                    path: '/account',
                    data: data
                })
            },

            checkAccountName: function(name, reservationSecret){
                return cmApi.post({
                    path: '/account/check',
                    data: {
                        loginName: name,
                        reservationSecret: reservationSecret
                    }
    //                exp_ok: 'reservationSecret',
    //                exp_ko: 'alternative'
                })
            },

            checkPhoneNumber: function(number){
                return cmApi.post({
                    path: '/services/checkPhoneNumber',
                    data: { phoneNumber:number },
                    exp_ok: 'phoneNumber'
                })
            },

            getIdentity: function(id){
                return cmApi.get({
                    path: '/identity'+ (id ? '/'+id : '')
                })
            },

            savePublicKey: function(data){
                return cmApi.post({
                    path: '/identity/publicKey',
                    data: {
                        name: data.name,
                        key: data.key,
                        keySize: parseInt(data.keySize)
                    }
                })
            },

            // two factor authentication
            requestTwoFactorKey: function() {
                return cmApi.get({
                    path: '/twoFactorAuth'
                }, true)
            },

            // ask the api for a new authentication token:
            requestTwoFactorToken: function(key){
                return cmApi.post({
                    path: '/twoFactorAuth/confirm',
                    data: { key: key },
                    exp_ok: "token"
                }, true)
            },

            // delete Token
            removeTwoFactorToken: function(){
                return localStorage.removeItem('twoFactorToken');
            },

            // store the token in a cookie:
            storeTwoFactorToken: function(twoFactorToken){
                return localStorage.setItem('twoFactorToken', twoFactorToken);
            },

            // retrieve thr token from a cookie
            getTwoFactorToken: function(){
                return localStorage.getItem('twoFactorToken');
            }

        }
    }])
.service('cmCron', [
    function(){
        this.jobs           =  {};
        this.interval       = null;
        this.intervalSec    = 5;

        this.init = function(){
            this.startInterval();
        };

        this.add = function(identifier,job){
            var defaults = {"instance":{}, "task":angular.noop, "callback": angular.noop, "isRunning":false, "isActive":true, "seconds":0, "lastRun":0};

            if(identifier != undefined && identifier != ""){

//                var jobs = $.map(this.jobs, function(element,index) {return index});
                var jobs = Object.keys(this.jobs);

                if(jobs.length == 0 || (jobs.length > 0 && jobs.indexOf(identifier) == -1)){
                    this.jobs[identifier] = angular.extend({},defaults,job);

                    this.init();
                    this.process(identifier);
                } else if(jobs.length > 0 && jobs.indexOf(identifier) != -1){
                    this.jobs[identifier].instance = job.instance;
                    this.jobs[identifier].task = job.task;
                    this.jobs[identifier].isActive = true;
                    this.process(identifier);
                }
            }
        };

        this.kill = function(identifier){
            if(identifier != "" && this.jobs[identifier] != undefined){
                delete this.jobs[identifier];
            }
        };

        this.stop = function(identifier){
            if(identifier != "" && this.jobs[identifier] != undefined){
                this.jobs[identifier].isActive = false;
            }
        };

        this.startInterval = function(){
            if(this.interval == null){
                this.interval = window.setInterval(this.process,(this.intervalSec * 1000));
            }
        };

        this.stopInterval = function(){
            if(this.interval != null){
                window.clearInterval(this.interval);
                this.interval = null;
            }
        };

        this.process = function(identifier){
            if(identifier != undefined && identifier != ""){
                this._process(this.jobs[identifier]);
            } else {
                var self = this;
                angular.forEach(this.jobs, function(job){
                    self._process(job);
                });
            }
        };

        this._process = function(job){
            console.dir(job.instance)
            if(job.isActive == true && job.isRunning == false){
                job.isRunning = true;

                job.task(function(){
                    console.log('hier')
//                    job.callback(arguments[0]);

                    job.isRunning = false;
                    job.lastRun = new Date().getTime()/1000;
                });
            }
        }
    }
])
.service('cmCrypt',[
    'cmLogger',
    '$q',
    '$rootScope',
    function (cmLogger, $q, $rootScope) {
        // private vars
        var async = {
            interval: null,
            promise: null,
            crypt: null
        };

        return {
            /**
             * this method calculates a secure hash
             * @param secretString String that should be hashed
             */
            hash: function (secretString) {
                if (null == secretString)
                    return "";

                return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(secretString))
            },

            /**
             * this methods encodes a string base64
             * @param string
             * @returns {*}
             */
            base64Encode: function(string){
                return _Base64.encode(string);
            },

            /**
             * this method decodes a string base64
             * @param string
             * @returns {*}
             */
            base64Decode: function(string){
                return _Base64.decode(string);
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with max len of 10 chars
             * @param secretString a string that should be enrypted
             * @returns base64 encoded encrypted string
             */
            encryptWithShortKey: function (secretKey, secretString) {
                var parameters = { cipher: "aes", ks: 256, iter: 4096 };

                if(secretKey == '' || secretKey == undefined ){
                    return secretString;
                }

                if (null == secretString)
                    return "";
                if (secretKey.length > 10)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },
            /**
             * this method encrypts strings
             * @param secretKey a secret key with min len of 60 chars
             * @param secretString a string that should be encrypted
             * @returns base64 encoded encrypted string
             */
            encrypt: function (secretKey, secretString) {
                var parameters = {cipher: "aes", ks: 256, iter: 500 };

                if(secretKey == '' || secretKey == undefined){
                    return secretString;
                }

                if (null == secretString)
                    return "";

                if (secretKey.length < 60)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be decrypted
             * @returns decrypted string
             */
            decrypt: function (secretKey, secretString) {

                if(secretString != '' && typeof secretString == 'object'){
                    secretString = JSON.stringify(secretString)
                }

                if(secretKey == '' || secretKey == undefined){
                    return secretString;
                }

                if (null == secretString)
                    return false;

                var decryptedString;

                try {
                    decryptedString = sjcl.decrypt(secretKey, secretString)
                } catch (e) {
//                    cmLogger.warn('Unable to decrypt.', e)
//                    console.warn(e)
                }

                return decryptedString || false
            },


            Key : function (data){
                //Wrapper for RSA Keys
                var self = this,
                    crypt

                if(typeof data == "object" && "updateKeyList" in data) return data //data is already a Key object
                    
                if(        
                       typeof data == "object"               
                    && "getPublicKey"   in data
                    && "getPrivateKey"  in data
                    && "encrypt"        in data
                    && "decrypt"        in data
                ){                    
                    crypt = data    //data is already a JSEncrypt object
                }else{                
                    crypt = new JSEncrypt()
                    crypt.setKey(data)
                }

                this.setId = function(id){
                    this.id = id
                    return this
                }

                this.setName = function(name){
                    this.name = name
                    return this
                }

                //set either public or private key
                this.setKey = function(key){
                    crypt.setKey(key)
                    return this
                }

                this.getPublicKey = function(){
                    var public_key
                    try{
                        public_key = crypt.getPublicKey()
                    }catch(e){}

                    return public_key
                }

                this.getPrivateKey = function(){
                    var private_key
                    try{
                        private_key = crypt.getPrivateKey()
                    }catch(e){}

                    return private_key
                }

                this.encrypt = function(secret){
                    return crypt.encrypt(secret)
                }

                this.decrypt = function(encrypted_secret){
                    return crypt.decrypt(encrypted_secret)
                }

                this.getSize = function(){
                    var size

                    try{
                        size = crypt.key.n.bitLength()
                    }catch(e){}

                    return size
                }

                this.exportData = function(){
                    var data        = {},
                        private_key = this.getPrivateKey(),
                        public_key  = this.getPublicKey(),
                        size        = this.getSize()

                    if(this.id)     data.id         = this.id
                    if(this.name)   data.name       = this.name
                    if(public_key)  data.pubKey     = public_key    
                    if(private_key) data.privKey    = private_key
                    if(size)        data.size       = size

                    return data
                }

                this.importData = function(data){
                    var public_key = this.getPublicKey()

                    data.pubKey = data.pubKey   ? data.pubKey.replace(/\n/g,'') : undefined
                    public_key  = public_key    ? public_key.replace(/\n/g,'')  : undefined
                    

                    if(data.name)   this.setName(data.name)
                    if(data.id)     this.setId(data.id)

                    if( data.pubKey && (data.pubKey != public_key) ){
                        this.setKey(data.pubKey)
                    }

                    if( data.key && (data.key != public_key) ){                      
                        this.setKey(data.key)
                    }

                    if(data.privKey) this.setKey(data.privKey)

                    return this
                }

                this.updateKeyList = function(key_list){
                    var check = false

                    key_list.forEach(function(key){
                        if(
                               (key.id && (key.id == self.id)) 
                            || key.getPublicKey() == self.getPublicKey()
                        ){ 
                            angular.extend(key, self)
                            check = true
                        }
                    })

                    if(!check) key_list.push(self)
                }

                this.updateKeyDataList = function(key_data_list){
                    var check = false

                    key_data_list.forEach(function(key_data){                        
                        if(
                               (key_data.id && (key_data.id == self.id)) 
                            || key_data.pubKey == self.getPublicKey()
                        ){
                            angular.extend(key_data, self.exportData())
                            check = true
                        }                        
                    })



                    if(!check) key_data_list.push(this.exportData())
                }
            },

            /**
             * return the bit size of possible keygeneration
             * @returns {string[]}
             */
            getKeySizes: function(){
                return ['512','1024','2048','4096'];
            },

            /**
             * start async process
             * @param keylen
             * @param $scopeState
             * @returns {Promise.promise|*|webdriver.promise.Deferred.promise}
             */
            generateAsyncKeypair: function(keySize, onGeneration){
                if ( keySize == undefined ||
                    typeof keySize != 'number' ||
                    async.interval != null ) {
                    return false;
                }

                cmLogger.debug('jsencrypt generateAsync '+keySize);

                // Create the encryption object.
                var self = this,
                    time = -((new Date()).getTime()),
                    counts = 0;
                // init vars
                async.crypt = new JSEncrypt({default_key_size: keySize}),
                async.promise = $q.defer();
                async.interval = setInterval(function () {
                    counts++;
                    if(typeof onGeneration == "function"){
                        onGeneration(counts, (time + ((new Date()).getTime())))
                    }
                }, 500);
                // start keypair generation
                async.crypt.getKey(function () {
                    self.cancelGeneration(true);

                    async.promise.resolve({
                        timeElapsed: (time + ((new Date()).getTime())),
                        counts: counts,
                        key : new self.Key(async.crypt)
                        //privKey: async.crypt.getPrivateKey(),
                        //pubKey: async.crypt.getPublicKey()
                    })

                    $rootScope.$apply() 
                });

                return async.promise.promise;
            },
            /**
             * cancel key generation process / simple clearInterval
             * if interval is pending
             * @returns {boolean}
             */
            cancelGeneration: function(withReject){
                if ( async.interval != null ) {
                    cmLogger.debug('jsencrypt cancelGeneration');
                    // clear interval
                    var id = async.interval;
                    async.interval = null;
                    clearInterval( id );
                    // clear promise and library vars if param withReject is true
                    if(withReject == undefined && async.promise != undefined){
                        async.promise.reject();
                        async.promise = null;
                        async.crypt = null;
                    }
                    return true;
                }
                return false;
            },

            generatePassphrase: function(){ //@Todo!!
                var bad_random_passphrase = _Base64.encode((Math.random()*(new Date()).getTime()).toString())
                return bad_random_passphrase.slice(bad_random_passphrase.length-10, bad_random_passphrase.length)
            }
        }
    }]
)
.service('cmJob', [
    '$rootScope',
    '$window',
    '$location',
    'cmLogger',
    'cmTranslate',
    function($rootScope, $window, $location, cmLogger, cmTranslate){

        var jobIsActive = false,
            jobFunction = null;

        return {
            isActive: function(){
                return jobIsActive;
            },
            start: function(message){
                cmLogger.debug('job start '+message)
                jobIsActive = true;

                $window.onbeforeunload = function () {
                    return cmTranslate(message||'JOB.IN_PROGRESS')
                };

                jobFunction = $rootScope.$on('$locationChangeStart', function(event, next) {
                    event.preventDefault();
                    var answer = confirm(cmTranslate(message||'JOB.IN_PROGRESS'))
                    if (answer) {
                        $location.url($location.url(next).hash());
                        $rootScope.$apply();
                    }
                });
            },
            stop: function(){
                cmLogger.debug('job stop')
                jobIsActive = false;

                $window.onbeforeunload = null;

                jobFunction();
            }
        }
    }
])
.service('LocalStorageAdapter', [
function(){
    return {
        /**
         * check usability in browser
         * @returns {boolean}
         */
        check: function(){
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e){
                return false;
            }
        },
        /**
         * returns a value from a key
         * @param key
         * @returns {*}
         */
        get: function (key) {
            try {
                return localStorage.getItem(key);
            } catch (e){
                return "";
            }
        },
        /**
         * http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
         * returns an array of all keys
         * @returns {*}
         */
        getAllKeys: function(){
            try {
                return Object.keys(localStorage);
            } catch (e) {
                return false;
            }
        },
        /**
         * set/update keys
         * @param key
         * @param data
         * @returns {boolean}
         */
        save: function (key, data) {
            try {
                localStorage.setItem(key, data);
                return true;
            } catch (e){
                return false;
            }
        },
        /**
         * remove key
         * @param key
         * @returns {boolean}
         */
        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e){
                return false;
            }
        },
        /**
         * remove all keys
         * @returns {boolean}
         */
        clearAll : function () {
            try {
                localStorage.clear();
                return true;
            } catch (e){
                return false;
            }
        }
    }
}]).
factory('LocalStorageService',['LocalStorageAdapter', 'cmCrypt','$rootScope', function(LocalStorageAdapter, cmCrypt, $rootScope){
    var LocalStorageService = function(){
        var self = this,
            useable = false,
            useableCheck = false,
            cryptKey = "",
            storageKey = "CAMEO_LOCAL_STORAGE_IDENTITY",
            storageValue = {};

        function getStorageValue(){
            var value = LocalStorageAdapter.get(storageKey);
            if(value == null){
                return {}
            } else {
//                return JSON.parse(cmCrypt.decrypt(cryptKey,value));
                return JSON.parse(cmCrypt.decrypt(cryptKey,cmCrypt.base64Decode(value)));
            }
        }

        function saveStorageValue(value){
            try {
//                LocalStorageAdapter.save(storageKey, cmCrypt.encrypt(cryptKey,JSON.stringify(value)));
                LocalStorageAdapter.save(storageKey, cmCrypt.base64Encode(cmCrypt.encrypt(cryptKey,JSON.stringify(value))));
                return true;
            } catch(e){
                //
            }

            return false;
        }

        /**
         * init
         */
        this.init = function(data){
            if(this.check()){
                cryptKey = cmCrypt.hash(data.id + data.key);
                storageKey = cmCrypt.hash(data.id);

                this.instanceId = data.id;
                this.instanceKey = data.key;
            }
        }
        /**
         * adapter function for check local storage
         * @returns {boolean}
         */
        this.check = function(){
            if(useableCheck !== true){
                useable = LocalStorageAdapter.check();
                useableCheck = true;
            }

            return useable;
        };
        /**
         * get key
         * @param key
         * @returns {*}
         */
        this.get = function (key) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue[key] != undefined){
                    return storageValue[key];
                }
            }

            return undefined;
        };
        /**
         * get all keys from identity storage
         * @returns {*}
         */
        this.getAllKeys = function(){
            if(this.check() !== false){
                var keys = [];
                storageValue = getStorageValue();

                for(var k in storageValue){
                    keys.push(k);
                }

                return keys;
            }

            return [];
        },
        /**
         *  set and update key in identity storage
         *  @returns {boolean}
         */
        this.save = function (key, data) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue == null){
                    storageValue = {};
                }
                storageValue[key] = data;

                saveStorageValue(storageValue);
                return true;
            }

            return false;
        };
        /**
         * remove on key from identity storage
         * @param key
         * @returns {boolean}
         */
        this.remove = function (key) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue[key] != undefined){
                    try {
                        delete(storageValue[key]);
                        saveStorageValue(storageValue);
                        return true;
                    } catch (e){
                        //
                    }
                }
            }

            return false;
        };
        /**
         * remove all from identity storage
         * @returns {boolean}
         */
        this.clearAll = function () {
            if(this.check() !== false){
                storageValue = {};
                LocalStorageAdapter.remove(storageKey);
                return true;
            }

            return false;
        }

        $rootScope.$on('logout', function(){
            self.instanceId = "";
            self.instanceKey = "";
            self.storageValue = {};
            self.cryptKey = "";
        });

    }

    return LocalStorageService;
}]).
factory('cmLocalStorage',['$rootScope','LocalStorageService', function($rootScope, LocalStorageService){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        /**
         * returns instances of LocalStorageService
         * @param id
         * @returns {*}
         */
        create: function(id, key){
            if(typeof id !== 'undefined' && id != '' && typeof key !== 'undefined' && key != ''){
                var storage = null;

                for(var i = 0; i < instances.length; i++){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == id){

                        storage = instances[i].instance;
                        break;
                    }
                }

                if(storage === null){
                    storage = new LocalStorageService();
                    storage.init({id:id,key:key});

                    instances.push({id:id,instance:storage});
                }

                return storage;
            }

            return null;
        },
        getQty: function(){
          return instances.length;
        }
    }

}])
//This service provides extra funcionality for core objects


.service('cmObject', [

    '$q',

    function($q){
        var self = this

        /**
         * Function to add basic event handling to any object, to bubbling up or down provided
         * @param {Object} obj any objevct to extend with event ahndlung capabilities
         */

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}


            /**
             * Function to call a callback bound to an event. This function is not meant to me called from outside the object.
             * @param  {Function} cb    callback function
             * @param  {Object}   event event data to be passed to the callback function
             * @param  {Object}   data  extra data to be passed to the callback function
             * @return {boolean}  returns if the callback should be called on the next occurance of event or not         
             */
            
            function _call(cb, event, data){
                var cb_result    = cb.fn.apply(obj, [event, data]),     //call the callback on the base object
                    limit_set    = typeof cb.limit == "number",         //check if the number of calls should be limited
                    cb_complete  = limit_set                            //check if the call should count as successful (and thus recude the number number of future calls)
                                   ?    cb_result == true || cb_result == undefined //if there is no return value treat the call as successful (default)
                                   :    cb_result == true               //if there is no limit set, the number of calls is unlimited anyway
                    
                 
                if(limit_set && cb_complete) cb.limit-- //reduce number of future calls of callback for event

                var call_again   = limit_set            
                                   ?    cb.limit > 0
                                   :    !cb_complete

                return call_again
            }


            /**
             * Function to trigger callback bound to an event
             * @param  {string} event_name Name of the event to trigger
             * @param  {Object} data       Data to be passsed to the callback function
             * @return {Object}            returns the base object for chaining
             */
            
            obj.trigger = function(event_name, data){         
                var event = { target : obj }

                obj._callbacks[event_name] = obj._callbacks[event_name] || []   //create the according callback array, if neccessary

                obj._callbacks[event_name].forEach(function(callback_obj, index){
                    // call callback function and delete if need be, see ._call()
                    if(!_call(callback_obj, event, data)) delete obj._callbacks[event_name][index]
                })

                return obj
            }



            /**
             * Function to bind a call back to event(s).
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Function to call, when the event is triggered. Should return wether the call was successfull or not.
             * @param  {number}   [limit]     Number of times the callback should be (succsessfully) called. If not provided, there is no limit to the number of calls.
             * @return {Object}               returns the object for chaining.
             */
            
            obj.on = function(event_names, callback, limit){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 

                event_names.forEach(function(event_name){
                    obj._callbacks[event_name] = obj._callbacks[event_name] || [] //create according callback array, if neccessary
                    obj._callbacks[event_name].push({       // add callback object with callback function an limit for number of calls
                        'fn' : callback,
                        'limit': limit || false
                    })
                })

                return obj
            }

            /**
             * Function to remove binding of a callback function to an event.
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Funcation that has been bound to an event.
             * @return {Object}               returns the object for chaining.
             */
            obj.off = function(event_names, callback){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 
                
                event_names.forEach(function(event_name){
                    if(!callback) obj._callbacks[event_name] = []

                    obj._callbacks[event_name].forEach(function(callback_obj, index){
                        if(callback_obj.fn == callback) delete obj._callbacks[event_name][index]
                    })
                })

                return obj
            }

            obj.one = function(event_names, callback){
                obj.on(event_names, callback, 1)
            }

            return this 
        }


        this.addChainHandlingTo = function(obj){
            obj._chains = {}

            function Chain(obj){
                var deferred     = $q.defer(),
                    self         = this,
                    last_promise = deferred.promise


                angular.forEach(obj, function(value, key){                    
                    if(typeof obj[key] != 'function')  return null

                    self[key] = function(){
                        var args = Array.prototype.slice.call(arguments, 0)

                        last_promise = last_promise.then(function(result){                                
                            return obj[key].apply(obj, args.length > 0 ? args : [result])                                 
                        })

                        return self
                    }
                })

                self.then = function(){                    
                    last_promise = last_promise.then.apply(last_promise, Array.prototype.slice.call(arguments, 0))
                    return self
                }

                deferred.resolve()

                return self
            }


            obj.$chain = function(name){
                name  = name || 'default'

                obj._chains[name] = obj._chains[name] || new Chain(obj)
                
                return obj._chains[name]
            }

            return this 
        }
        
    }
])

.service('cmUserModel',[

    'cmAuth',
    'cmLocalStorage', 
    'cmIdentityFactory', 
    'cmCrypt',
    'cmObject',
    'cmNotify',
    'cmLogger',
    '$rootScope', 
    '$q', 
    '$location',

    function(cmAuth, cmLocalStorage, cmIdentityFactory, cmCrypt, cmObject, cmNotify, cmLogger, $rootScope, $q, $location){
        var self = this,
            isAuth = false,
            initialize = ''; // empty, run, done ! important for isAuth check

        var dataModel = {
            isActive: false,
            id: '',
            userKey: '',
            displayName: '',
            cameoId: 'loading...',
            email: {},
            phoneNumber: {},
            preferredMessageType: 'default',
            created: '',
            lastUpdated: '',
            userType: '',
            storage: {},
            identity: {}
        };

        cmObject.addEventHandlingTo(this);

        this.data = angular.extend({}, dataModel);

        this.comesFromRegistration = false;

        this.init = function(identity_data){
            cmLogger.debug('cmUserModel:init');
            this.loadIdentity(identity_data).then(
                function(identity){
                    if(typeof identity_data == 'object'){
                        identity.init(identity_data);
                    }

                    self.data = angular.extend(self.data,identity);

                    self.data.identity = identity;
                    self.data.identity.isAppOwner = true;

                    isAuth = true;
                    self.initStorage();
                    self.syncLocalKeys();

                    cmLogger.debug('cmUserModel:init:ready');
                    self.trigger('init');// deprecated
                    self.trigger('init:finish');
                },
                function(response){
                    cmLogger.debug('cmUserModel:init:reject');
                    if(typeof response == 'object' && response.status == 401){
                        cmLogger.debug('cmUserModel:init:reject:401');
                        self.doLogout();
                    }
                }
            )

            return this;
        };

        this.loadIdentity = function(identity_data){
            var deferred = $q.defer();

            if(typeof identity_data !== 'undefined'){
                deferred.resolve(cmIdentityFactory.get(identity_data));
            } else {
                if(this.getToken() !== false){
                    cmAuth.getIdentity().then(
                        function(data){
                            deferred.resolve(cmIdentityFactory.create(data));
                        },

                        function(response){
                            var response = response || {};

                            deferred.reject(response);
                        }
                    );
                } else {
                    deferred.reject();
                }
            }

            return deferred.promise;
        };

        /**
         * Returns current active Identity
         * @returns {data.identity|*}
         */
        this.getIdentity = function(){
            return this.data.identity;
        }

        this.setIdentity = function(identity_data){
            cmLogger.debug('cmUserModel:setIdentity');
            this.init(identity_data);
        };

        /**
         * @todo more better logic pls^^
         * @returns {*}
         */
        this.isAuth = function(){
//            if(this.getToken() !== false){
//                // do identity request for checking token
//                if(isAuth !== true){
//                    // check ob identity loading runs
//                    if(initialize == 'done'){
//
//                    }
//                }
//            }

            return this.getToken();
        };

        this.setAuth = function(){
            isAuth = true
        }

        this.isGuest = function(){
            if(this.data.userType == 'external'){
                return true;
            }

            return false;
        };

        this.doLogin = function(user, pass){
            cmLogger.debug('cmUserModel:doLogin');

            var deferred = $q.defer();

            cmAuth.requestToken(user, pass).then(
                function(token){
                    cmAuth.storeToken(token);

                    self.init();
                    $rootScope.$broadcast('login');
                    deferred.resolve();
                },
                function(state, response){
                    deferred.reject(state, response);
                }
            );

            return deferred.promise;
        };

        this.doLogout = function(goToLogin){
            cmLogger.debug('cmUserModel:doLogout');

            isAuth = false;
            this.removeToken();
            $rootScope.$broadcast('logout');

            if(typeof goToLogin === 'undefined' || goToLogin !== false){
                $location.path("/login");
            }
        };

        /**
         * Key Handling
         */

        /**
         * @todo in die identität
         * @param key
         */
        this.addKey = function(key){
            key.updateKeyList(this.data.identity.keys)
            /*
            var i = 0,
                check = false;

            while(i < this.data.keys.length){
                if(key.id == this.data.keys[i].id){
                    check = true;
                    angular.extend(this.data.keys[i], key);
                    break;
                }
                i++;
            }

            if(check !== true){
                this.data.keys.push({
                    id: key.id,
                    keySize: key.keySize,
                    name: key.name,
                    key: key.pubKey, // @todo pubKey
                    privKey: key.privKey
                });
            }
            */
            return this
        }

        /**
         * @todo check ob Key schon vorhanden ist?!?
         * @param key
         * @returns {*}
         */
        this.saveKey = function(key){
            /*
            var deferred = $q.defer(),
                i = 0,
                check = false;
            */
            var key_list      =  this.loadLocalKeys() || [],
                key_data_list = []

            key_list.forEach(function(local_key){
                var data = local_key.exportData()
                key_data_list.push(data)                
            })

            key.updateKeyDataList(key_data_list)

            this.storageSave('rsa', key_data_list)

            cmNotify.info('NOTIFY.KEYS.STORE_NEW',{ttl:1000}); //TODO
            /*
            if(
                   typeof tmpKeys !== undefined 
                && typeof tmpKeys !== 'undefined' 
                && typeof tmpKeys !== 'string'
                && tmpKeys != null
            ){                
                if(tmpKeys.length > 0){
                    while(i < tmpKeys.length){
                        if(key_data.pubKey&& (key_data.pubKey == tmpKeys[i].pubKey)){
                            check = true;
                            angular.extend(tmpKeys[i],key_data);
                            break;
                        }
                        i++;
                    }

                    if(check !== true){
                        tmpKeys.push(key_data);
                    }

                    this.storageSave('rsa',tmpKeys);

                    deferred.resolve();
                } else {
                    this.storageSave('rsa',[key_data]);

                    deferred.resolve();
                }
            } else {
                this.storageSave('rsa',[key_data]);

                deferred.resolve();
            }
            

            return deferred.promise;
            */
            return this
        };

        this.loadLocalKeys = function(){
            var stored_keys = this.storageGet('rsa') || [],
                keys        = []            

            stored_keys.forEach(function(stored_key){                
                var data = (new cmCrypt.Key()).importData(stored_key)
                keys.push( data )                
            })
            
            return keys;
        }

        this.hasPrivateKey = function(){
            var keys = this.loadLocalKeys(),
                result = false

            keys.forEach(function(key){         
                result = result || !!key.getPrivateKey()
            })

            return result
        }

        this.clearLocalKeys = function(){
            this.storageSave('rsa', [])
        }

        this.syncLocalKeys = function(){

            /**
             * check local Keys from Storage
             */
            var localKeys = this.loadLocalKeys() || []

            localKeys.forEach(function(local_key){
                if(typeof local_key.id === 'undefined' || local_key.id == ''){
                    cmAuth.savePublicKey({
                        name:    local_key.name, 
                        key:     local_key.getPublicKey(),
                        keySize: 0 //@Todo
                    })
                    .then(function(data){
                        var key = new cmCrypt.Key()                        

                        key.importData(data)

                        self
                        .saveKey(key)
                        .addKey(key)
                    })
                } else {
                    self.addKey(local_key);
                }
            });

            return this;
        };

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys = this.loadLocalKeys() || [],
                decrypted_passphrase

            keys.forEach(function(key){ 
                if(!decrypted_passphrase && (key.id == keyId || !keyId)){
                    decrypted_passphrase = key.decrypt(encrypted_passphrase)                    
                }
            })
            return decrypted_passphrase
        }

        /**
         * Token Functions
         * @TODO handle Token with identity
         */
        this.getToken = function(){
            var token = cmAuth.getToken();
            if(token !== undefined && token !== 'undefined' && token !== null){
                return token;
            }

            return false;
        };

        this.storeToken = function(t){
            cmAuth.storeToken(t);
        };

        this.removeToken = function(){
            cmLogger.debug('cmUserModel:removeToken');
            cmAuth.removeToken();
        };

        /**
         * LocalStorage Functions
         */
        this.initStorage = function(){
            this.data.storage = cmLocalStorage.create(this.data.id,this.data.userKey);
        }

        /**
         * save to identity storage
         * @param key
         * @param value
         */
        this.storageSave = function(key, value){
            if(isAuth !== false && this.data.storage !== null){
                this.data.storage.save(key, value);
            }
        };
        /**
         *  get from identity storage
         * @param key
         */
        this.storageGet = function(key){            
            if(isAuth !== false && this.data.storage !== null){
                return this.data.storage.get(key);
            }

            return null;
        };
        /**
         * remove from identity storage
         * @param key
         */
        this.storageRemove = function(key){
            if(isAuth !== false && this.data.storage !== null){
                this.data.storage.remove(key);
            }
        };
        /**
         * clear identity storage
         */
        this.resetUser = function(){
            cmLogger.debug('cmUserModel:resetUser');
            this.data = angular.extend({}, dataModel);
        }

        $rootScope.$on('logout', function(){
            self.resetUser();
        });

        this.init();
    }
])

.service('cmUtil', [
    '$q', 
    function($q){
        /**
         * Checks if Key exists in an Object or Array
         * @param object
         * @param key
         * @returns {boolean}
         */
        this.checkKeyExists = function(object, key){
            if(angular.isDefined(object) && (typeof object === 'object' || typeof object === 'array') && angular.isDefined(key) && key != ''){
                var arr = Object.keys(object);

                if(arr.indexOf(key) !== -1){
                    return true;
                }
            }

            return false;
        };

        /**
         * Creates a String for Limit-Offset Handling in Api-Calls
         * @param limit
         * @param offset
         * @returns {string}
         */
        this.handleLimitOffset = function(limit,offset){
            var s = '';

            if(angular.isDefined(limit) && this.validateInt(limit) !== false){
                s = '?limit=' + parseInt(limit);
            } else {
                //default limit
            }

            if(s != '' && angular.isDefined(offset) && this.validateInt(offset) !== false){
                s += '&offset=' + parseInt(offset);
            }

            return s;
        };

        /**
         * Validate Numbers
         * @param val
         * @returns {boolean}
         */
        this.validateInt = function(val){
            var reg = /^\d+$/;

            return reg.test(val);
        };

        /**
         * Validate Strings without Special Characters and Whitespaces
         * @param val
         * @returns {boolean}
         */
        this.validateString = function(val){
            var reg = /^[a-zA-Z0-9]{1,}$/;

            return reg.test(val);
        };

        /**
         * convert json to more row string
         * @param json
         * @returns well formated string
         */
        this.prettify = function(json){
            return JSON.stringify(json, undefined, 2);
        };

        /**
         * return key length of an object
         * @param obj
         * @returns {Number}
         */
        this.objLen = function(obj){
            if(obj == undefined)
                obj = {};
            return Object.keys(obj).length;
        };

        /**
         * convert first letter of string to Uppercase
         * @param string
         * @returns {string}
         */
        this.ucFirst = function(string){
            if(string == undefined || typeof string != 'string')
                string = '';

            string += '';
            var f = string.charAt(0).toUpperCase();
            return f + string.substr(1);
        };

        /**
         * converts bytes to human readable string
         * @param bytes
         * @returns {string}
         */
        this.bytesToStr = function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0 || typeof bytes != 'number') return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };

        /**
         * return a int between the range of min and max
         * @param min
         * @param max
         * @returns {int}
         */
        this.getRandomInt = function (min, max) {
            if(min == undefined || typeof min != 'number')
                return 0;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        /**
         * convert milliseconds to human readable string
         * @param milliseconds
         * @returns {string}
         */
        this.millisecondsToStr = function(milliseconds) {
            // TIP: to find current time in milliseconds, use:
            // var current_time_milliseconds = new Date().getTime();

            // This function does not deal with leap years, however,
            // it should not be an issue because the output is aproximated.
            function numberEnding (number) {
                return ""//(number > 1) ? '\'s' : '';
            }

            if(typeof milliseconds != 'number')
                return 'n/a';

            var temp = milliseconds / 1000;
            var years = Math.floor(temp / 31536000);
            if (years) {
                return years + 'y' + numberEnding(years);
            }
            var days = Math.floor((temp %= 31536000) / 86400);
            if (days) {
                return days + 'd' + numberEnding(days);
            }
            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours) {
                return hours + 'h' + numberEnding(hours);
            }
            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes) {
                return minutes + 'm' + numberEnding(minutes);
            }
            var seconds = temp % 60;
            if (seconds) {
                return seconds + 's' + numberEnding(seconds);
            }
            return '< s'; //'just now' //or other string you like;
        }

        this.getType = function(x){
            if(typeof x == "string") return("String")

            var regex  = /\[object (.*)\]/,
                results = regex.exec(x.toString())

            return (results && results.length > 1) ? results[1] : "";
        }
    }
])