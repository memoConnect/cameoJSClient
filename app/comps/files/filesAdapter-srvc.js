function cmFilesAdapter(cmApi){
    return {
        sendFile: function(data){            
            return cmApi.post({
                url:    "/file"+(data.assetId ? "/"+data.assetId : ""),
                data:   {
                    chunk: data.chunk
                },
                headers:{
                    "X-File-Name":  data.file.name,
                    "X-File-Size":  data.file.size,
                    "X-File-Type":  data.file.type,
                    "X-Index":      data.index,
                    "X-Max-Chunks": data.chunksTotal,
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