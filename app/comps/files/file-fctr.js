function cmFile(cmFilesAdapter, cmLogger, cmCrypt, cmUtil, $q){

    //private methods:

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

    function b64toBlob(byteCharacters, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

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



    function Chunk(file, start, end){

        this.raw = ""

        this.initChain = function(callback) {
            if(this.deferred) return this.deferred
            this.deferred = $q.defer().promise


            var self = this,
                keys  = Object.keys(this)

            keys.forEach(function(key){
                if(key != 'initChain' && typeof self[key] == 'function'){
                    self['_'+key] = self[key]
                    self[key] = function(args){
                        //var args = arguments
                        //deferred.then(function(){
                            return self['_'+key].call(self, args)
                        //})
                    }
                }                
            })

        }
       

        this.importFileSlice = function (file, start, end){
            var slicer  = file.webkitSlice || file.mozSlice || file.slice,
                chunk   = slicer.call(file, start, end)

            if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                    chunk = buf
                });
            }  

            this.blob = chunk     

            return cmUtil.resolvedPromise()
        }


        this.downloadRaw = function(fileId, index){
            var self = this
            return  cmFilesAdapter.getChunk(fileId, index)        
                    .then(function(data){
                        self.raw = data
                    })
        }

        this.decryptRaw = function(passphrase){
            this.raw = cmCrypt.decrypt(passphrase, this.raw)
            return cmUtil.resolvedPromise()
        }


        this.blobToRaw = function(){
            var self     = this,
                reader   = new FileReader(),
                deferred = $q.defer()

         
            reader.onload = function(event){
                self.raw = event.target.result
                deferred.resolve(self.raw)
            }
            reader.readAsDataURL(this.blob);

            return deferred.promise

        }

        this.rawToBlob = function(){
            this.blob = atob(this.raw.replace('data:application/octet-stream;base64,',''))
            return this 
        }

        this.encryptRaw = function(passphrase) {
            if(!this.raw) cmLogger.error('Chunk: raw Data empty.')
            console.log(this.raw)
            this.raw = cmCrypt.encryptWithShortKey(passphrase, this.raw)     //Todo: long Key!
            console.log(this.raw)
            return cmUtil.resolvedPromise()
        }

        this.upload = function(fileId, index) {
            return cmFilesAdapter.addChunk(fileId, index, this.raw)
        }

        //this.initChain()
    }

    //public methods:

    return {

        importFile : function(file, chunkSize){
            this.file    = file           
            chunkSize    = chunkSize || file.size
            this.fileId = undefined

            this.setFileId(null)
            this._chopIntoChunks(chunkSize)
        },

        setFileId : function(fileId){
            this.fileId = fileId
            return cmUtil.resolvedPromise(this.fileId)
        },

        setPassphrase : function(passphrase) {        
            this.passphrase = passphrase
        },

        _chopIntoChunks : function(chunkSize){
            var startByte   = 0,
                endByte     = 0,
                index       = 0

            if(!chunkSize) return null
            
            this.chunks   = []

            while(endByte < this.file.size){           

                startByte   = index*1024*chunkSize
                endByte     = startByte + 1024*chunkSize

                endByte  = (endByte > this.file.size) ? this.file.size : endByte;

                //this.chunks.push(this._chunk(startByte, endByte))
                var chunk = new Chunk()

                chunk.importFileSlice(this.file, startByte, endByte)
                this.chunks.push(chunk)
                
                index ++
            }

        },

        _chunk : function(start, end) {
            var slicer  = this.file.webkitSlice || this.file.mozSlice || this.file.slice,
                chunk   = slicer.call(this.file, start, end)

            if (this.file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                    chunk = buf
                });
            }       

            return chunk
        },


        upload : function() {   
            var self = this      


            return  self._ready()     
                    .then(function(fileId){ 


                        var deferred = $q.defer(),
                            promises = []

                        self.chunks.forEach(function(chunk, index){
                            var deferredChunk = $q.defer()

                            promises.push(deferredChunk.promise)


                            chunk
                            .blobToRaw()
                            .then(function(){
                                chunk.encryptRaw( self.passphrase )
                            })
                            .then(function(){ return chunk.upload(fileId, index) }) 
                            .then(
                                function(){                       
                                    deferredChunk.resolve()
                                    deferred.notify(chunk.raw.length)
                                },

                                function(response){
                                    deferredChunk.reject(response)
                                }
                            )                
                        })

                        $q.all(promises)
                        .then(
                            function(data)      { deferred.resolve(fileId) },
                            function(response)  { deferred.reject(response) }
                        )

                        return deferred.promise

                    })
        },


        _ready : function() {
            var self = this                
                file = {}          

            file.name = cmCrypt.encryptWithShortKey(self.passphrase, self.file.name)
            file.type = self.file.type
            file.size = self.file.size

            return  cmFilesAdapter.prepareFile( file, self.chunks.length )
                    .then(function(fileId){ return self.setFileId(fileId) })

            /*
            return  this._prepareChunk(this.chunks[0]) //TODO: sollte früher oder später nicht mehr nötig sein!
                    .then(function(prepped_chunk){ return cmCrypt.encryptWithShortKey(self.passphrase, prepped_chunk) }) //TODO: weg
                    .then(function(encrypted_chunk){
                        return  cmFilesAdapter.prepareFile({
                                    file:        file,
                                    chunksTotal: self.chunks.length
                                } , encrypted_chunk) //TODO: remove chunk, preparing the file should be possible without sending a chunk                                
                    })
                    .then(function(assetId){ self.setAssetId(assetId) })
            */
        },

        _prepareChunk : function(chunk){
            var reader   = new FileReader(),
                deferred = $q.defer()
         
            reader.onload = function(event){ deferred.resolve(event.target.result) }
            reader.readAsDataURL(chunk);

            return deferred.promise
        },

        _uploadChunks : function() {
            var self     = this,
                deferred = $q.defer(),
                promises = []
                fileId  = this.fileId

            if(!fileId){
                deferred.reject()
                cmLogger.error("this.fileId not found.")
                return deferred.promise
            }

            self.chunks.forEach(function(chunk, index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                self._prepareChunk(chunk)
                .then(function(prepped_chunk){ return cmCrypt.encryptWithShortKey(self.passphrase, prepped_chunk) })
                .then(function(encrypted_chunk){ return cmFilesAdapter.addChunk(filrId, index, encrypted_chunk) }) 
                .then(
                    function(){                       
                        deferredChunk.resolve()
                        deferred.notify(chunk.size)
                    },

                    function(response){
                        deferredChunk.reject(response)
                    }
                )                
            })

            $q.all(promises)
            .then(
                function(data)      { deferred.resolve(fileId) },
                function(response)  { deferred.reject(response) }
            )

            return deferred.promise

        },

        getDetails : function(){
            var self     = this,
                deferred = $q.defer()

            deferred.reject('fileId missing.')

            return (
                this.fileId 
                ?    cmFilesAdapter.getFileInfo(this.fileId)
                    .then(function(details){                        
                        self.file = {}
                        self.file.numberOfChunks = details.maxChunks
                        self.file.name = cmCrypt.decrypt(self.passphrase, details.fileName)
                        self.file.type = details.fileType
                        self.file.size = details.fileSize
                        return self.file
                    })                    
                :   deferred.promise
            )
        },

        download : function(){
            var self     = this,
                promises = [],
                deferred = $q.defer()

            
            if(!self.file){
                return self.getDetails()
                        .then(function(){
                            return self.download()
                        })
            }


            for(var index = 0; index < self.file.numberOfChunks; index++){

                function x(){   //haesslich; aber noch nötig, da sonst deferredChunk überschrieben wird.
                    var deferredChunk = $q.defer()

                    promises.push(deferredChunk.promise)

                    var chunk = new Chunk()

                    chunk
                    .downloadRaw(self.fileId, index)
                    .then(function(){
                        chunk.decryptRaw(self.passphrase)
                    })
                    .then(function(){
                        chunk.rawToBlob()
                        deferredChunk.resolve(chunk.raw)
                        deferred.notify(chunk.raw.length)    
                    })
                } x()
            }


            $q.all(promises)
            .then(
                function(chunks)    { deferred.resolve(chunks) },
                function(response)  { deferred.reject(response) }
            )

            return  deferred.promise
                    .then(function(chunks){
                        self.file.content = ""
                        chunks.forEach(function(chunk){
                            self.file.content += chunk
                        })
                    })              
                    
        },

        save : function(){       
            var self = this           

            this.file && this.file.name && this.file.type
            ?   saveAs(
                    b64toBlob(this.file.content, this.file.type),
                    this.file.name
                )            
            :   this.getDetails()
                .then(function() { self.save() })
        }
    }
}