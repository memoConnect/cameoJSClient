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
            $scope.readyForDownload = undefined

            
            $scope.$parent.$watch($attrs.cmDownload,    function(fileId)     { $scope.fileId = $scope.fileId || fileId })
            $scope.$parent.$watch($attrs.cmData,        function(fileId)     { $scope.fileId = $scope.fileId || fileId })
            $scope.$parent.$watch($attrs.cmPassphrase,  function(passphrase) { $scope.passphrase = passphrase }) 
            $scope.$watch('fileId', function(fileId){ self.setup(fileId) }) 


            $scope.download = function(fileId){                
                if(!$scope.readyForDownload) return null                    
                $scope.progress = 0    

                $scope.readyForDownload.then(function(){
                    cmFile
                    .downloadChunks()
                    .then(
                        function(){ return  cmFile.decryptChunks($scope.passphrase) }, 
                        null, 
                        function(progress){ $scope.progress += progress }
                    )
                    .then(function(){
                        cmFile
                        .reassembleChunks()
                        .promptSaveAs()
                    })        
                })
            }

            this.setup = function(fileId){
                $scope.readyForDownload =   cmFile
                                            .importByFileId(fileId)
                                            .then(function(){
                                                cmFile.decryptFilename($scope.passphrase)
                                                $scope.fileName = cmFile.fileName
                                                $scope.fileSize = cmFile.fileSize
                                            })
            }
            
        }
    }
}