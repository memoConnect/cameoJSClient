function cmDownload(cmFile){
    return {

        restrict : 'AE',

        controller : function($scope, $element, $attrs) {

            var self = this

            $scope.assetId = $scope.$parent.$eval($attrs.cmDownload) || $scope.$parent.$eval($attrs.cmData);
            $scope.file = {};
            $scope.fileSize = 10
            
            $scope.$watch($attrs.cmDownload, function(){
                $scope.assetId = $scope.$parent.$eval($attrs.cmDownload)
            })

            $scope.$watch($attrs.cmData, function(){
                $scope.assetId = $scope.$parent.$eval($attrs.cmData)
            })

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

            $scope.download = function(){
                console.dir(self.getFileDetails())
            }

            this.getFileDetails = function(){
                cmFile.getDetails($scope.assetId)
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

            

            

        }
    }
}