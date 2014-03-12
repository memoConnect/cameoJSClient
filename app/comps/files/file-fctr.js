function cmFile(cmFilesAdapter, cmLogger, cmCrypt, $q){

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
        var buf = new ArrayBuffer(str.length*2); // 2 raw for each char        
        var bufView = new Uint16Array(buf);


        for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
        }
        return buf;
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

            this.raw = undefined
            this.blob  = undefined

            if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                    chunk = buf
                });
            }  

            this.blob = chunk
            

            return this
        }

        this.blobToBase64 = function(){
            var self     = this,
                reader   = new FileReader(),
                deferred = $q.defer()

         
            reader.onload = function(event){
                self.raw = event.target.result
                deferred.resolve(self.raw)
            }

            this.blob
            ?   reader.readAsDataURL(this.blob)
            :   cmLogger.error('Unable ro convert to raw; chunk.blob is empty.')      

            return deferred.promise

        }

        this.encrypt = function(passphrase) {    
            return(
                this.raw
                ? this.encryptedRaw = cmCrypt.encryptWithShortKey(passphrase, this.raw)     //Todo: long Key!            
                : cmLogger.error('Unable ro encrypt; chunk.raw is empty.')            
            )
                
        }

        this.upload = function(fileId, index){
            return (
                this.encryptedRaw
                ? cmFilesAdapter.addChunk(fileId, index, this.encryptedRaw)
                : cmLogger.error('Unable to upload; chunk.encryptedRaw is empty.')
            )
        }

        this.download = function(fileId, index){
            var self = this

            this.raw = undefined
            this.blob  = undefined

            return  cmFilesAdapter.getChunk(fileId, index)        
                    .then(function(data){                        
                        return self.encryptedRaw = data
                    })
        }

        this.decrypt = function(passphrase){            
            this.encryptedRaw
            ?   this.raw = cmCrypt.decrypt(passphrase, this.encryptedRaw)            
            :   cmLogger.error('Unable to decrypt; chunk.encryptedRaw is empty.')                
            
            return this
        }

        this.base64ToBlob = function(){    
            this.raw
            ?   this.blob = b64toBlob(this.raw)
            :   cmLogger.error('Unable to convert to Blob; chunk.raw is empty.')         
            
            return this
        }        

        this.getSize = function() {
            return this.raw.length
        }


        //this.initChain()
    }

    //public methods:

    return {

        importFile : function(file){
            this.file    = file  
            this.file.id = undefined
            return this    
        },

        chopIntoChunks : function(chunkSize){
            var startByte   = 0,
                endByte     = 0,
                index       = 0
            
            this.chunks   = []

            while(endByte < this.file.size){           

                startByte   = index*1024*chunkSize
                endByte     = startByte + 1024*chunkSize

                endByte  = (endByte > this.file.size) ? this.file.size : endByte;

                var chunk = new Chunk()

                chunk.importFileSlice(this.file, startByte, endByte)                

                this.chunks.push(chunk)

                index++
            }

            return this
        },


        encryptChunks : function(passphrase) {
            this.chunks.forEach(function(chunk){
                chunk
                .blobToBase64()
                .then(function(){
                    chunk.encrypt(passphrase)
                })
            })
            return this
        },

        encryptFilename : function(passphrase){
            this.file.encryptedName = cmCrypt.encryptWithShortKey(passphrase, this.file.name)
            return this
        },

        setupForUpload : function() {
            var self = this                
                file = {}          

            file.name = self.file.encryptedName || cmLogger.error('cmFile.setupforUpload: Filename not encrypted.')
            file.type = self.file.type
            file.size = self.file.size

            return  cmFilesAdapter.prepareFile( file, self.chunks.length )
                    .then(function(fileId){ return self.file.id = fileId })                                
        },

        uploadChunks : function() {   
            var self = this

            if(!this.file.id){ return self.setupForUpload().then(function(){ return self.uploadChunks() })}

            var deferred = $q.defer(),
                promises = []

            self.chunks.forEach(function(chunk, index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                chunk
                .upload(self.file.id, index)
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
                function(data)      { deferred.resolve(self.file.id) },
                function(response)  { deferred.reject(response) }
            )

            return deferred.promise
        },

        importByFileId : function(fileId){            
            var self     = this

            this.file    = {}
            this.file.id = fileId

            return ( 
                cmFilesAdapter.getFileInfo(this.file.id)
                .then(function(details){                        
                    self.file = {}
                    self.file.encryptedName = details.fileName
                    self.file.type          = details.fileType
                    self.file.size          = details.fileSize
                    self.file.chunkIndices  = details.chunks
                    self.file.id            = fileId

                    return self.file
                })                   
            )
        },

        decryptFilename : function(passphrase) {
            this.file.name = cmCrypt.decrypt(passphrase, this.file.encryptedName)
            return this
        },

        downloadChunks : function(){
            var self        = this,
                promises    = [],
                deferred    = $q.defer()
                self.chunks = []

            if(!self.file || !self.file.chunkIndices || !self.file.id){
                cmLogger.error('cmFile.downloadChunks(); File not ready, please call cmFile.importFileId() first.')
                return null
            }

            self.file.chunkIndices.forEach(function(index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                var chunk = new Chunk()

                self.chunks[index] = chunk

                chunk
                .download(self.file.id, index)
                .then(function(){
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
        },

        decryptChunks : function(passphrase){
            this.chunks.forEach(function(chunk){
                chunk
                .decrypt(self.passphrase)
                .base64ToBlob()
            })
            return this
        },

        reassembleChunks : function(){
            var data = []

            self.chunks.forEach(function(chunk){                                    
                data.push(chunk.blob)                    
            })

            self.blob = new Blob(data, {type: self.file.type})                        

            return this
        },

        promotSaveAs : function(){       
            var self = this   

            this.file && this.file.name && this.file.type
            ?   saveAs(
                    this.blob,
                    this.file.name
                )            
            :   this.getDetails()
                .then(function() { self.save() })

            return this
        }
    }
}