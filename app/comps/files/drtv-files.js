'use strict';

angular.module('cmFiles').directive('cmFiles',[
    'cmFileFactory',
    '$q',
    function (cmFileFactory, $q){
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
                /**
                 * function called via <input type=file>
                 * @param blob
                 * @returns {boolean}
                 */
                this.setFile = function(blob){
                    var bool = true;

                    angular.forEach($scope.files, function(value){
                        if(value.name == blob.name){
                            bool = false;
                        }
                    });

                    if(!bool){
                        return false;
                    }

                    var file = cmFileFactory.create(blob);
                    $scope.files.push(file);
                };
                /**
                 * prepare all files for upload
                 * encrypt name & chunks
                 * api call to get fileId
                 * @param passphrase
                 * @returns {*}
                 */
                $scope.prepareFilesForUpload = function(passphrase){
                    var defered = $q.defer();

                    angular.forEach($scope.files, function(file, index){
                        file
                        .setPassphrase(passphrase)
                        .encryptName()
                        .encryptChunks()
                        .prepareForUpload().then(
                            function(){
                                if(index == ($scope.files.length -1)){
                                    defered.resolve();
                                }
                            }
                        );
                    });

                    return defered.promise;
                }
                /**
                 * function for parent to check if files in queue
                 * @returns {boolean}
                 */
                $scope.hasFiles = function(){
                    return $scope.files.length > 0;
                };
                /**
                 * clear files
                 */
                $scope.resetFiles = function(){
                    $scope.files = [];
                };
            }
        }
    }
]);