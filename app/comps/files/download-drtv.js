function cmDownload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs) {

            var self = this
           
            $scope.file = {};
            $scope.progress = 0     
            $scope.passphrase = undefined
            $scope.fileId = undefined
            $scope.readyForUpload = undefined

            
            $scope.$parent.$watch($attrs.cmDownload,    function(fileId)     { $scope.fileId = $scope.fileId || fileId })
            $scope.$parent.$watch($attrs.cmData,        function(fileId)     { $scope.fileId = $scope.fileId || fileId })
            $scope.$parent.$watch($attrs.cmPassphrase,  function(passphrase) { $scope.passphrase = passphrase }) 
            $scope.$watch('fileId', function(fileId){ self.setup(fileId) }) 


            $scope.download = function(fileId){
                $scope.progress = 0
                if(!$scope.readyForUpload) return self.setup(fileId).then(function(){ return $scope.download(fileId) })

                return  cmFile.downloadChunks()
                        .then(
                            function(){
                                cmFile
                                .decryptChunks($scope.passphrase)
                                .reassembleChunks()
                                .promptSaveAs()
                            },
                            null,
                            function(progress){ $scope.progress += progress }
                        )           
            }

            this.setup = function(fileId){
                return  cmFile
                        .importByFileId(fileId)
                        .then(function(){
                            cmFile.decryptFilename($scope.passphrase)
                            $scope.file = cmFile.file
                            $scope.readyForUpload = true
                        })
            }
            
        }
    }
}