'use strict';

function cmUpload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs){  

            var self = this

            $scope.file = {}
            $scope.progress = 0           
                        
            $scope.chunkSize = $scope.$eval($attrs.cmChunkSize)
            $scope.$parent.$watch($attrs.cmChunkSize, function(new_chunk_size){ $scope.chunkSize = new_chunk_size })          

            $scope.passphrase = $scope.$parent.$eval($attrs.cmPassphrase)
            $scope.$parent.$watch($attrs.cmPassphrase, function(passphrase){ $scope.passphrase = passphrase })  

            $scope.fileId = $scope.$parent.$eval($attrs.ngModel)
            $scope.$parent.$watch($attrs.ngModel, function(ngModel){ $scope.fileId = ngModel })       

            $scope.upload = function(){
                $scope.progress = 0

                cmFile
                .uploadChunks()
                .then(null, null, function(progress){ $scope.progress += progress })
            }

            this.setFile = function(file){
                $scope.file = file 

                cmFile
                .importFile($scope.file)
                .chopIntoChunks($scope.chunkSize)
                .encryptFilename($scope.passphrase)
                .encryptChunks($scope.passphrase)
                .setupForUpload()
                .then(function(){
                    self.setFileId(cmFile.file.id)                    
                })

            }

            this.setFileId = function(fileId){
                $scope.$parent[$attrs.ngModel] = fileId
                $scope.fileId = fileId
            }

            
        }       
    }
}