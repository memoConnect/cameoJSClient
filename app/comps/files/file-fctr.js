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

    function binaryStringtoBlob(byteCharacters, contentType, sliceSize) {
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
            ? this.encryptedRaw = cmCrypt.encryptWithShortKey(passphrase, this.raw)     //Todo: long Key!            
            : cmLogger.error('Unable ro encrypt; chunk.raw is empty.  Try calling chunk.blobToBinaryString() first.')            

            return this                
        }

        this.upload = function(id, index){                    
            return(
                this.encryptedRaw
                ? cmFilesAdapter.addChunk(id, index, this.encryptedRaw)
                : cmLogger.error('Unable to upload; chunk.encryptedRaw is empty. Try calling chunk.encrypt() first.')
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


        //this.initChain()
    }










    //public methods:

    return function(){

        this.importFile = function(file){
            this.file     = file  
            this.id   = undefined
            this.name = file.name
            this.type = file.type
            this.size = file.size
            return this    
        }

        this.chopIntoChunks = function(chunkSize){
            var self        = this,
                startByte   = 0,
                endByte     = 0,
                index       = 0,
                promises    = []

            if(!this.file) {
                cmLogger.error('Unable to chop file into Chunks; cmFile.file missing. Try calling cmFile.importFile() first.')
                return null
            }
            
            self.chunks   = []

            while(endByte < this.file.size){           

                startByte   = index*1024*chunkSize
                endByte     = startByte + 1024*chunkSize

                endByte  = (endByte > this.file.size) ? this.file.size : endByte;

                
                var chunk = new Chunk()
                self.chunks.push(chunk)

                promises.push(
                    chunk
                    .importFileSlice(self.file, startByte, endByte)                
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
            this.chunks
            ?   this.chunks.forEach(function(chunk){
                    chunk.encrypt(passphrase)
                })            
            :   cmLogger.error('Unable to encrypt chunks; cmFile.chunks missing. Try calling cmFile.chopIntoChunks() first.')
            return this
        }


        this.setupForUpload = function() {
            var self = this                       

            return (
                self.encryptedName && self.chunks
                ?   cmFilesAdapter.prepareFile({
                        name    : self.encryptedName,
                        size    : self.size,
                        type    : self.type,
                        chunks  : self.chunks.length
                    })
                    .then(function(id){ return self.id = id })                                
                :   cmLogger.error('Unable to set up file for Download; cmFile.chunks or cmFile.encryptedName missing. Try calling cmFile.chopIntoChunks() and cmFile.encryptName() first.')
            )
        }

        this.uploadChunks = function() {   
            var self = this

            if(!this.id){                 
                cmLogger.error('Unable to upload chunks; cmFile.id missing. Try calling cmFile.setupForDownload() first.')
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
                function(data)      { deferred.resolve(self.id) },
                function(response)  { deferred.reject(response) }
            )

            return deferred.promise
        }

        this.importByFileId = function(id){            
            var self     = this
            
            this.id = id

            return ( 
                cmFilesAdapter.getFileInfo(this.id)
                .then(function(details){                                            
                    self.encryptedName = details.fileName
                    self.type          = details.fileType
                    self.size          = details.fileSize
                    self.chunkIndices  = details.chunks
                    self.id            = id                    
                })                   
            )
        }

        this.decryptName = function(passphrase) {
            this.encryptedName
            ?   this.name = cmCrypt.decrypt(passphrase, this.encryptedName)
            :   cmLogger.error('Unable to decrypt filename; cmFile.encryptedFileName missing. Try calling cmFile.imporByFileId() first.')
            return this
        }

        this.downloadChunks = function(){
            var self        = this,
                promises    = [],
                deferred    = $q.defer()
                self.chunks = []

            if(!self.chunkIndices || !self.id){
                cmLogger.error('cmFile.downloadChunks(); cmFile.chunks or cmFile.id missing. Try calling cmFile.importByFileId() first.')
                return null
            }

            self.chunkIndices.forEach(function(index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                var chunk = new Chunk()

                self.chunks[index] = chunk

                chunk
                .download(self.id, index)
                .then(function(){                    
                    deferredChunk.resolve(chunk)
                    deferred.notify(chunk.size) 
                    console.log(chunk.size) 
                })                
            })


            $q.all(promises)
            .then(                
                function(chunks)    { deferred.resolve(chunks) },
                function(response)  { deferred.reject(response) }
            )

            return  deferred.promise        
        }

        this.decryptChunks = function(passphrase){
            var promises =  []

            if(!this.chunks){
                cmLogger.error('Unable to decrypt chunks; cmFile.chunks missing. Try calling cmFile.downloadChunks() first.')
                return null
            }

            this.chunks.forEach(function(chunk){
                promises.push(
                    chunk
                    .decrypt(passphrase)
                    .binaryStringToBlob()                    
                )
            })

            return $q.all(promises)
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
            :   cmLogger.error('Unable to prompt saveAs; cmFile.blob is missing, try cmFile.importByFileId().')

            return this
        }
    }
}