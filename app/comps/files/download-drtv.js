function cmDownload(cmFile){
    return {

        restrict : 'AE',
        scope: true,

        controller: function($scope, $element, $attrs, cmFile) {

            var self = this,
                file = new cmFile()
        
            $scope.progress = 0     
            $scope.passphrase = undefined
            $scope.fileId = undefined
            $scope.readyForDownload = undefined

            
            $scope.$parent.$watch($attrs.cmDownload,    function(fileId)     { $scope.fileId = $scope.fileId || fileId })
            $scope.$parent.$watch($attrs.cmData,        function(fileId)     { $scope.fileId = $scope.fileId || fileId })
            $scope.$parent.$watch($attrs.cmPassphrase,  function(passphrase) { $scope.passphrase = passphrase }) 

            $scope.$watch('fileId', function(fileId){ self.setup(fileId) }) 
           
            $scope.download = function(){                
                if(!$scope.readyForDownload) return null                    
                $scope.progress = 0    

                $scope.readyForDownload.then(function(){
                    file
                    .downloadChunks()
                    .then(
                        function(){ file.decryptChunks($scope.passphrase) }, 
                        null, 
                        function(progress){ $scope.progress += progress }
                    )
                    .then(function(){
                        file
                        .reassembleChunks()
                        .promptSaveAs()
                    })        
                })
            }

            this.setup = function(fileId){                
                $scope.readyForDownload =   file
                                            .importByFileId(fileId)
                                            .then(function(){
                                                file.decryptName($scope.passphrase)
                                                $scope.fileName = file.name
                                                $scope.fileSize = file.size                                                
                                            })
            }
            
        }
    }
}