function cmFile(cmFilesAdapter, $q){

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

    //public methods:

    return {
        init : function(file, chunkSize){
            this.file    = file
            this.assetId = 0

            this._chopIntoChunks(chunkSize)
        },

        _chopIntoChunks : function(chunkSize){
            var startByte   = 0,
                endByte     = 0,
                index       = 0
            
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

            var reader = new FileReader();
            
            reader.onload = function(event){ chunk = event.target.result }
            reader.readAsDataURL(chunk);

            return chunk
        },

        upload : function() { 
            return  this._prepare()     
                    .then(this._uploadChunks)
        },

        _prepare : function() {
            var self = this

            return  cmFilesAdapter.prepareFile({
                        file:        self.file,
                        chunksTotal: self.chunks.length
                    } ,this.chunks[0]) //TODO: remove chunk
                    .then(function(assetId){ self.assetId = assetId })
        },

        _uploadChunks : function() {
            var self     = this,
                deferred = $q.defer(),
                promises = []

            this.chunks.forEach(function(chunk, index){
                var deferredChunk = $q.defer()

                promises.push(deferredChunk.promise)

                cmFilesAdapter.addChunk(self.assetId, index, chunk)
                .then(

                    function(data){
                        self.assetId = data.assetId;
                        deferredChunk.resolve(data)
                        deferred.notify(1/self.chunks.length*100)
                    },

                    function(response){
                        deferredChunk.reject(response)
                    }
                )
            })

            $q.all(promises)
            .then(
                function(data)      { deferred.resolve(data) },
                function(response)  { deferred.reject(response) }
            )

            return deferred.promise

        },

    }
}