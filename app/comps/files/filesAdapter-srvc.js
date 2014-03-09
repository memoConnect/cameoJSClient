function cmFilesAdapter(cmApi){



    return {
        prepareFile: function(data, chunk){    
            console.log(chunk)        
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
                url:    "/file/"+data.assetId,
                data:   {
                    chunk: chunk
                },
                exp_ok: 'id',                
                headers:{
                    "X-Index":      index
                }
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