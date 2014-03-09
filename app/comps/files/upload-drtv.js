'use strict';

function cmUpload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs){  

            var self = this

            $scope.file = {};            
            $scope.percentage = 0;                        
            $scope.chunksTotal = 0;            
                        

            $scope.$watch($attrs.cmChunkSize, function(new_chunk_size){
                self.setChunkSize(new_chunk_size)                 
            })          

        

            $scope.upload = function(){
                var self = this
                cmFile.upload().then(
                    function(assetId){ //success
                        self.setAssetId(assetId)
                        $scope.percentage = 100
                    }, 
                    null, //error
                    function(percentage){ //notify
                        $scope.percentage += percentage
                        $scope.percentage = Math.min($scope.percentage, 100)
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

        }
    }
}