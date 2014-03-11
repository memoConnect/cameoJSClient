function cmDownload(cmFile){
    return {

        restrict : 'AE',

        scope: true,

        controller : function($scope, $element, $attrs) {

            var self = this
           
            $scope.file = {};
            $scope.progress = 0            

            
            $scope.$parent.$watch($attrs.cmDownload,    function(fileId)   { self.setFileId(fileId) })
            $scope.$parent.$watch($attrs.cmData,        function(fileId)   { self.setFileId(fileId) })
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

            this.setFileId = function(fileId){                
                cmFile.setFileId(fileId)
                self._updateFileDetails()
            }

            this._updateFileDetails = function(){                
                cmFile.getDetails()
                .then(function(file){
                    $scope.file = file
                })
            }
            
            this.setFileId( $scope.$parent.$eval($attrs.cmDownload) || $scope.$parent.$eval($attrs.cmData) )                 
            cmFile.setPassphrase($scope.$parent.$eval($attrs.cmPassphrase))      

        }
    }
}