'use strict';

function cmUpload(cmFilesAdapter){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs){  

            $scope.file = {};
            $scope.fileSize = 0;
            $scope.percentage = 0;
            $scope.progress = 0;
            $scope.chunkSize = $scope.$eval($attrs.cmChunkSize) || 256;
            $scope.chunksTotal = 0;
            $scope.chunksQueue = 0;
            $scope.assetId = 0;


            $scope.$watch($attrs.cmChunkSize, function(new_chunk_size){ console.log(new_chunk_size); $scope.chunkSize = new_chunk_size })


                   
        

            $scope.upload = function(){
                // calculate the number of slices
                $scope.assetId = 0;
                $scope.chunksTotal = Math.ceil($scope.fileSize / ($scope.chunkSize*1024));
                $scope.chunksQueue = $scope.chunksTotal;
                // start sending
                sendChunk(0);
            }


            this.setFile = function(file){
                $scope.file = file
                updateNumbers()  
                $scope.$apply()
            }


            /*** TODO FILTER BAUEN: 
            this.bytesToSize = function(bytes) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return 'n/a';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }
            */

            function updateNumbers(){
                $scope.fileSize = $scope.file.size
                $scope.chunksTotal = Math.ceil($scope.fileSize / ($scope.chunkSize*1024));
                $scope.percentage = 0;
                $scope.progress = 0;
            }

            // step 1 calc start & end byte
            function sendChunk(index){
                var startByte   = index > 0 ? index*($scope.chunkSize*1024) : 0;
                var endByte     = startByte + ($scope.chunkSize*1024);

                if(endByte > $scope.fileSize)
                    endByte = $scope.fileSize;

                if(startByte < $scope.fileSize)
                    sliceChunk(index, startByte, endByte);

                console.log('sendChunks')
            }

            // step 2 slice chunk from blob
            function sliceChunk(index, start, end) {
                var file = $scope.file, chunk;

                if (file.webkitSlice) {
                    chunk = file.webkitSlice(start, end);
                } else if (file.mozSlice) {
                    chunk = file.mozSlice(start, end);
                } else {
                    console.dir(file)
                    chunk = file.slice(start, end);
                }

                if (file.webkitSlice) { // android default browser in version 4.0.4 has webkitSlice instead of slice()
                    str2ab_blobreader(chunk, function(buf) { // we cannot send a blob, because body payload will be empty
                        chunkReadyForUpload(index,buf);
                    });

                    console.log('sliceChunks')
                } else {

                    console.log('sliceChunks')
                    chunkReadyForUpload(index,chunk);
                }
            }

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

            // step 3 read chunk from blob and send to api
            function chunkReadyForUpload(index,chunk){
                var reader = new FileReader();
                reader.onload = function(event){
                    cmFilesAdapter.sendFile({
                        file: $scope.file
                       ,index: index
                       ,chunk: event.target.result
                       ,chunksTotal: $scope.chunksTotal
                       ,assetId: $scope.assetId
                    }).
                    then(
                        function(assetId){
                            $scope.assetId = assetId;
                            
                            chunkUploaded(index+1);
                        }
                    );

                };
                reader.readAsDataURL(chunk);
            }

            // step 4 chunk1 uploaded and upload chunk2
            function chunkUploaded(index){
                $scope.chunksQueue--;
                $scope.progress = index;
                $scope.percentage = Math.round(index/$scope.chunksTotal * 100);
                sendChunks(index);
            }

        }
    }
}