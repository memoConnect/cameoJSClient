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

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char        
        var bufView = new Uint16Array(buf);


        for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
        }
        return buf;
     }


    function Chunk(file, start, end){

        this.bytes = ""

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

            this.bytes = undefined
            this.blob  = undefined

            if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                    chunk = buf
                });
            }  

            this.blob = chunk
            

            return cmUtil.resolvedPromise()
        }

        this.blobToBytes = function(){
            var self     = this,
                reader   = new FileReader(),
                deferred = $q.defer()

         
            reader.onload = function(event){
                self.bytes = event.target.result
                deferred.resolve(self.bytes)
            }

            this.blob
            ?   reader.readAsBinaryString(this.blob)
            :   cmLogger.error('Unable ro convert to bytes; chunk.blob is empty.')      

            return deferred.promise

        }

        this.encryptBytes = function(passphrase) {   
        console.log(this.bytes)         
            return(
                this.bytes
                ? this.encryptedBytes = cmCrypt.encryptWithShortKey(passphrase, this.bytes)     //Todo: long Key!            
                : cmLogger.error('Unable ro encrypt; chunk.bytes is empty.')            
            )
                
        }

        this.uploadBytes = function(fileId, index){
            return (
                this.encryptedBytes
                ? cmFilesAdapter.addChunk(fileId, index, this.encryptedBytes)
                : cmLogger.error('Unable to upload; chunk.encryptedBytes is empty.')
            )
        }

        this.downloadBytes = function(fileId, index){
            var self = this

            this.bytes = undefined
            this.blob  = undefined

            return  cmFilesAdapter.getChunk(fileId, index)        
                    .then(function(data){                        
                        return self.encryptedBytes = data
                    })
        }

        this.decryptBytes = function(passphrase){            
            this.encryptedBytes
            ?   this.bytes = cmCrypt.decrypt(passphrase, this.encryptedBytes)            
            :   cmLogger.error('Unable to decrypt; chunk.encryptedBytes is empty.')                
            
            return this
        }

        this.bytesToBlob = function(){    
            this.bytes
            ?   this.blob = new Blob([this.bytes], {type : 'application/octet-binary'})
            :   cmLogger.error('Unable to convert to Blob; chunk.bytes is empty.')         
            
            return this
        }        

        this.getSize = function() {
            return this.bytes.length
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
                            .blobToBytes()
                            .then(function(){
                                chunk.encryptBytes( self.passphrase )
                            })
                            .then(function(){ return chunk.uploadBytes(fileId, index) }) 
                            .then(
                                function(){                       
                                    deferredChunk.resolve()
                                    deferred.notify(chunk.getSize())
                                    console.log(chunk.getSize())
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
                        deferred.notify(chunk.getSize())
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
                        self.file.name          = cmCrypt.decrypt(self.passphrase, details.fileName)
                        self.file.type          = details.fileType
                        self.file.size          = details.fileSize
                        self.file.chunkIndices  = details.chunks

                        return self.file
                    })                    
                :   deferred.promise
            )
        },

        download : function(){
            var self     = this,
                promises = [],
                deferred = $q.defer()
                self.chunks = []

            
            if(!self.file || !self.file.chunkIndices){
                cmLogger('Unable to download chunks; cmFile.file missing or incomplete.')
                return null
            }


            self.file.chunkIndices.forEach(function(index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                var chunk = new Chunk()

                self.chunks[index] = chunk

                chunk
                .downloadBytes(self.fileId, index)
                .then(function(){
                    chunk
                    .decryptBytes(self.passphrase)
                    .bytesToBlob()

                    deferredChunk.resolve(chunk)
                    deferred.notify(chunk.getSize())  
                })                
            })


            $q.all(promises)
            .then(
                function(chunks)    { deferred.resolve(chunks); },
                function(response)  { deferred.reject(response) }
            )

            return  deferred.promise
                    .then(function(){
                        var data = []

                        self.chunks.forEach(function(chunk){                                    
                            data.push(chunk.blob)                            
                        })

                        console.dir(data)

                        self.blob = new Blob(data, {type: self.file.type})
                        
                    })              
                    
        },

        save : function(){       
            var self = this   

            console.dir(self.blob)        

            this.file && this.file.name && this.file.type
            ?   saveAs(
                    this.blob,
                    this.file.name
                )            
            :   this.getDetails()
                .then(function() { self.save() })
        }
    }
}