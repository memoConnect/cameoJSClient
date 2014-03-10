function cmFilesAdapter(cmApi){



    return {
        prepareFile: function(data, chunk){        
            return cmApi.post({
                url :    "/file",
                data : {
                    chunk: chunk
                },
                exp_ok : 'id',
                headers : {
                    "X-File-Name":  data.file.name,
                    "X-File-Size":  data.file.size,
                    "X-File-Type":  data.file.type,
                    "X-Max-Chunks": data.chunksTotal,
                    "X-Index": 0
                }
            })
        }, 

        addChunk: function(assetId, index, chunk) {         
            return cmApi.post({
                url:    "/file/"+assetId,
                data:   {
                    chunk: chunk
                },          
                headers:{
                    "X-Index":      index
                }
            })

        },

        getFileInfo: function(assetId){
            return cmApi.get({
                url: "/file/"+assetId,
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