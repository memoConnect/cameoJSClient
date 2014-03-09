function cmFile(cmFilesAdapter, cmLogger, $q){

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

    //public methods:

    return {
        init : function(file, chunkSize){
            this.file    = file
            this.assetId = undefined

            return chunkSize ? this._chopIntoChunks(chunkSize) : null            
        },

        setAssetId : function(assetId){
            this.assetId = assetId
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

                this.chunks.push(this._chunk(startByte, endByte))
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
            return  self._prepare()     
                    .then(function(){ return self._uploadChunks() })
        },


        _prepare : function() {
            var self = this



            return  this._prepareChunk(this.chunks[0])
                    .then(function(prepped_chunk){
                        return  cmFilesAdapter.prepareFile({
                                    file:        self.file,
                                    chunksTotal: self.chunks.length
                                } , prepped_chunk) //TODO: remove chunk, preparing the file should be possible without sending a chunk                                
                    })
                    .then(function(assetId){ self.setAssetId(assetId) })
        },

        _uploadChunks : function() {
            var self     = this,
                deferred = $q.defer(),
                promises = []
                assetId  = this.assetId

            if(!assetId){
                deferred.reject()
                cmLogger.error("this.assetId not found.")
                return deferred.promise
            }

            self.chunks.forEach(function(chunk, index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                self._prepareChunk(chunk)
                .then(function(prepped_chunk){ cmFilesAdapter.addChunk(assetId, index, prepped_chunk) })
                .then(
                    function(){                       
                        deferredChunk.resolve()
                        console.log('_uploadChunks: '+chunk.length)
                        deferred.notify(chunk.length)
                    },

                    function(response){
                        deferredChunk.reject(response)
                    }
                )
                
            })

            $q.all(promises)
            .then(
                function(data)      { deferred.resolve(assetId) },
                function(response)  { deferred.reject(response) }
            )

            return deferred.promise

        },

        _prepareChunk : function(chunk){
            var reader   = new FileReader(),
                deferred = $q.defer()
         
            reader.onload = function(event){ deferred.resolve(event.target.result) }
            reader.readAsDataURL(chunk);

            return deferred.promise
        },

        getDetails : function(){
            return  cmFilesAdapter.getFileInfo(this.assetId)
                    .then(function(data){
                        self.maxChunks = data.maxChunks
                    })
        },

        download : function(){
            var promises = []

            for(var index; i< self.maxChunks; index++){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                cmFilesAdapter.getChunk(self.assetId, index)
                .then(function(chunk){
                    deferredChunk.resolve(chunk)                    
                });
            }

            $q.all(promises)
            .then(function(chunks){
                chunks.forEach(function(chunk){
                    console.dir(chunk)
                })
            })
        },

        /*
        file += atob(chunk.replace('data:application/octet-stream;base64,',''));
                    if(index+1 < $scope.file.maxChunks){
                        getChunk(index+1);
                    } else {
                        saveFile();
                    }
*/
    }
}