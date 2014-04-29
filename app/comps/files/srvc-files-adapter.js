angular.module('cmFiles').service('cmFilesAdapter', [
    'cmApi',
    function (cmApi){
        return {
            prepareFile: function(config){
                return cmApi.post({
                    path :    "/file",
                    data: {},
                    exp_ok : 'id',
                    headers : {
                        "X-File-Name":  config.name,
                        "X-File-Size":  config.size,
                        "X-File-Type":  config.type,
                        "X-Max-Chunks": config.chunks
                    }
                })
            },

            addChunk: function(fileId, index, chunk) {
                return cmApi.post({
                    path:    "/file/"+fileId,
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
                    path: "/file/"+fileId
                })
            },

            getFile: function(assetId){
                return cmApi.get({
                    path: "/file/"+assetId
                })
            },

            getChunk: function(assetId, chunkId){
                return cmApi.get({
                    path: "/file/"+assetId+"/"+chunkId,
                    exp_ok: 'chunk'
                })
            }
        }
    }
]);