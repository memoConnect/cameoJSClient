'use strict';

function cmUpload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs){  

            var self = this

            $scope.file = {}           
            $scope.chunksTotal = 0 
            $scope.progress = 0           
                        

            $scope.$watch($attrs.cmChunkSize, function(new_chunk_size){
                self.setChunkSize(new_chunk_size)                 
            })          

            $scope.$watch($attrs.cmPassphrase, function(passphrase){ cmFile.setPassphrase(passphrase) })        

            $scope.upload = function(){
                $scope.progress = 0
                cmFile.upload().then(
                    function(assetId){ //success
                        self.setAssetId(assetId)
                    }, 
                    null, //error
                    function(progress){ //notify
                        $scope.progress += progress                        
                    }
                )
            }



            this.setChunkSize = function(chunkSize) {
                $scope.chunkSize = chunkSize    
                cmFile.init($scope.file, $scope.chunkSize)
            }

            this.setFile = function(file){
                $scope.file = file                
                cmFile.init($scope.file, $scope.chunkSize)
            }

            this.setAssetId = function(assetId) {
                $scope.assetId = assetId
                $scope.$parent[$attrs.ngModel] = assetId
            }         

            this.setAssetId($scope.$parent.$eval($attrs.ngModel))
            cmFile.setPassphrase($scope.$parent.$eval($attrs.cmPassphrase))
        }
    }
}