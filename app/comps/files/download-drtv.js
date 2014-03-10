function cmDownload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs) {

            var self = this
           
            $scope.file = {};
            $scope.progress = 0            

            
            $scope.$parent.$watch($attrs.cmDownload,    function(assetId)   { self.setAssetId(assetId) })
            $scope.$parent.$watch($attrs.cmData,        function(assetId)   { self.setAssetId(assetId) })
            $scope.$parent.$watch($attrs.cmPassphrase,  function(passphrase){ cmFile.setPassphrase(passphrase) })  

    

            $scope.download = function(){
                $scope.progress = 0

                cmFile.download()
                .then(
                    function(){ cmFile.save() },
                    null,
                    function(progress){ $scope.progress += progress }
                )                
            }

            this.setAssetId = function(assetId){                
                cmFile.setAssetId(assetId)
                self._updateFileDetails()
            }

            this._updateFileDetails = function(){                
                cmFile.getDetails()
                .then(function(file){
                    $scope.file = file
                })
            }
            
            this.setAssetId( $scope.$parent.$eval($attrs.cmDownload) || $scope.$parent.$eval($attrs.cmData) )                 
            cmFile.setPassphrase($scope.$parent.$eval($attrs.cmPassphrase))      

        }
    }
}