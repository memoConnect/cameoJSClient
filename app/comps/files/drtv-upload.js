'use strict';

angular.module('cmFiles').directive('cmUpload',[
    'cmFile',
    function (cmFile){
        return {

            restrict : 'AE',
            scope: true,

            controller : function($scope, $element, $attrs){

                var self = this,
                    file = new cmFile()

                $scope.progress = 0
                $scope.readyForUpload = undefined

                $scope.chunkSize = $scope.$eval($attrs.cmChunkSize)
                $scope.$parent.$watch($attrs.cmChunkSize, function(new_chunk_size){ $scope.chunkSize = new_chunk_size })

                $scope.passphrase = $scope.$parent.$eval($attrs.cmPassphrase)
                $scope.$parent.$watch($attrs.cmPassphrase, function(passphrase){ $scope.passphrase = passphrase })

                $scope.fileId = $scope.$parent.$eval($attrs.ngModel)
                $scope.$parent.$watch($attrs.ngModel, function(ngModel){ $scope.fileId = ngModel })

                $scope.upload = function(){
                    $scope.progress = 0
                    if(!$scope.readyForUpload) return null

                    $scope.readyForUpload.then(function(){
                        file
                            .uploadChunks()
                            .then(null, null, function(progress){ $scope.progress += progress })
                    })
                }

                this.setFile = function(file_handle){

                    $scope.readyForUpload = file
                        .importFile(file_handle)
                        .chopIntoChunks($scope.chunkSize)
                        .then(function(){
                            return file
                                .encryptName($scope.passphrase)
                                .encryptChunks($scope.passphrase)
                                .prepareForUpload()
                        })
                        .then(function(){
                            self.setFileId(file.id)
                        })

                }

                this.setFileId = function(fileId){
                    $scope.$parent[$attrs.ngModel] = fileId
                    $scope.fileId = fileId
                }
            }
        }
    }
]);