function cmDownload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs) {

            var self = this

            $scope.assetId = $scope.$parent.$eval($attrs.cmDownload) || $scope.$parent.$eval($attrs.cmData);
            $scope.file = {};
            $scope.fileSize = 1
            $scope.progress = 0

            
            $scope.$parent.$watch($attrs.cmDownload, function(assetId) { self.setAssetId(assetId) })
            $scope.$parent.$watch($attrs.cmData, function(assetId) { self.setAssetId(assetId) })

            
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
                cmFile.download()                
            }

            this.setAssetId = function(assetId){
                $scope.assetId = assetId
                self._updateFileDetails()
            }

            this._updateFileDetails = function(){
                $scope.assetId
                ?   cmFile.getDetails($scope.assetId)
                    .then(function(details){
                        console.log(details)
                        $scope.fileSize = details.fileSize
                        $scope.fileName = details.fileName
                        $scope.fileType = details.fileType                        
                    })
                :   null
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
            
            this._updateFileDetails()            

        }
    }
}