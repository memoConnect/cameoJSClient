function cmFilesAdapter(cmApi){



    return {
        prepareFile: function(file, numberOfChunks){        
            return cmApi.post({
                url :    "/file",
                data: {},
                exp_ok : 'id',
                headers : {
                    "X-File-Name":  file.name,
                    "X-File-Size":  file.size,
                    "X-File-Type":  file.type,
                    "X-Max-Chunks": numberOfChunks,
                    "X-Index": 0
                }
            })
        }, 

        addChunk: function(fileId, index, chunk) {         
            return cmApi.post({
                url:    "/file/"+fileId,
                data:   {
                    chunk: chunk
                },          
                headers:{
                    "X-Index":      index
                }
            })

        },

        getFileInfo: function(fileId){
            return cmApi.get({
                url: "/file/"+fileId,
            })
        },

        getFile: function(assetId){
            return cmApi.get({
                url: "/file/"+assetId,
            })
        },

        getChunk: function(assetId, chunkId){
            return cmApi.get({
                url: "/file/"+assetId+"/"+chunkId,
                exp_ok: 'chunk'
            })
        }


    }
}