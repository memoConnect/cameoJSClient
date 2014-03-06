function cmDownload(cmFilesAdapter){
    return {

        controller : function($scope, $element, $attrs) {

            $scope.assetId = 0;
            $scope.file = {};

            $scope.$on("SendFileCtrl.assetIdChanged",function(event, assetId){
                $scope.assetId = assetId;
            });

            var file = "";

            $scope.getFile = function(){
                file = "";

                cmFilesAdapter.getFile($scope.assetId)
                .then(function(json){
                    $scope.file = json;
                    // pull first chunk
                    getChunk(0);
                });
            }

            function getChunk(index){
                cmFilesAdapter.getChunk($scope.assetId, index)
                .then(function(chunk){
                    file += atob(chunk.replace('data:application/octet-stream;base64,',''));
                    if(index+1 < $scope.file.maxChunks){
                        getChunk(index+1);
                    } else {
                        saveFile();
                    }
                });
            }

            function saveFile(){
                saveAs(
                    b64toBlob(file, $scope.file.fileType)
                   ,$scope.file.fileName
                );
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

        }
    }
}