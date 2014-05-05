'use strict';

angular.module('cmFiles').directive('cmAttachments',[
    'cmFile',
    '$q',
    function (cmFile, $q){
        return {
            restrict : 'E',
            controller : function($scope, $element, $attrs){

//                var self = this,
//                    file = new cmFile()
//
//                $scope.progress = 0
//                $scope.readyForUpload = undefined
//
//                $scope.chunkSize = $scope.$eval($attrs.cmChunkSize)
//                $scope.$parent.$watch($attrs.cmChunkSize, function(new_chunk_size){ $scope.chunkSize = new_chunk_size })
//
//                $scope.passphrase = $scope.$parent.$eval($attrs.cmPassphrase)
//                $scope.$parent.$watch($attrs.cmPassphrase, function(passphrase){ $scope.passphrase = passphrase })
//
//                $scope.fileId = $scope.$parent.$eval($attrs.ngModel)
//                $scope.$parent.$watch($attrs.ngModel, function(ngModel){ $scope.fileId = ngModel })
//
//                $scope.upload = function(){
//                    $scope.progress = 0
//                    if(!$scope.readyForUpload) return null
//
//                    $scope.readyForUpload.then(function(){
//                        file
//                            .uploadChunks()
//                            .then(null, null, function(progress){ $scope.progress += progress })
//                    })
//                }

                $scope.files = [];

                this.setFile = function(fileData){
                    var bool = true;

                    angular.forEach($scope.files, function(value){
                        if(value.name == fileData.name){
                            bool = false;
                        }
                    });

                    if(!bool){
                        return false;
                    }

                    var file = new cmFile(fileData);
                    $scope.files.push(file);

//                    $scope.readyForUpload = file
//                        .importFile(file_handle)
//                        .chopIntoChunks($scope.chunkSize)
//                        .then(function(){
//                            return file
//                                .encryptName($scope.passphrase)
//                                .encryptChunks($scope.passphrase)
//                                .prepareForUpload()
//                        })
//                        .then(function(){
//                            self.setFileId(file.id)
//                        })

                };

                $scope.prepareForUpload = function(passphrase){
                    var defered = $q.defer();

                    angular.forEach($scope.files, function(file, index){
                        file
                        .encryptName(passphrase)
                        .encryptChunks(passphrase)
                        .prepareForUpload().then(
                            function(){
                                if(index == ($scope.files.length -1)){
                                    defered.resolve();
                                }
                            }
                        );
                    });

                    return defered.promise();
                }

                $scope.hasFiles = function(){
                    return $scope.files.length > 0;
                };

                $scope.resetFiles = function(){
                    $scope.files = [];
                };

//                this.setFileId = function(fileId){
//                    $scope.$parent[$attrs.ngModel] = fileId
//                    $scope.fileId = fileId
//                }
            }
        }
    }
]);