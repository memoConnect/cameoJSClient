'use strict';

angular.module('cmFiles').directive('cmFiles',[
    'cmFileFactory', 'cmUtil',
    '$q', '$rootScope',
    function (cmFileFactory, cmUtil,
              $q, $rootScope){
        return {
            restrict : 'E',
            controller : function($scope){
                $scope.files = $scope.files || [];

                /**
                 * function called via <input type=file> or
                 * @param blob
                 * @returns {boolean}
                 */
                this.setFile = function(blob){

//                    TODO: Android name=content fix file plugin!!!
//                    console.log(blob)

                    var bool = true;

                    angular.forEach($scope.files, function(value){
                        if(value.name == blob.name && value.size == blob.size){
                            bool = false;
                        }
                    });

                    if(!bool){
                        return false;
                    }

                    var file = cmFileFactory.create(blob,true);
                    $scope.files.push(file);

                    $rootScope.$broadcast('cmFilesFileSetted');
                };

                this.removeFile = function(file){
                    if(cmFileFactory.remove(file)){
                        var index = $scope.files.indexOf(file);
                        $scope.files.splice(index,1);
                        $scope.$broadcast('reset:files');
                    }
                };

                /**
                 * external get files
                 * prepare files and return to caller
                 * @type {Array}
                 */
                $rootScope.$$listeners.cmFilesCheckFiles = [];
                $rootScope.$on('cmFilesCheckFiles', function(event, options){
                    $scope.prepareFilesForUpload(options.passphrase, options.conversationId)
                    .then(
                        function(){
                            if(typeof options.success == 'function'){
                                options.success($scope.files);
                                $scope.resetFiles();
                            }
                        },
                        function(result){
                            if(typeof options.error == 'function'){
                                options.error(result.data.errorCode, result.data.error, result.config.headers);
                            }
                        }
                    )
                });

                /**
                 * prepare all files for upload
                 * encrypt name & chunks
                 * api call to get fileId
                 * @param passphrase
                 * @returns {*}
                 */
                $scope.prepareFilesForUpload = function(passphrase, conversationId){
                    var promises = [];

                    // create all files and get fileIds
                    angular.forEach($scope.files, function(file){
                        promises.push(
                            file
                                .setPassphrase(passphrase)
                                .encryptName()
                                .prepareForUpload(conversationId)
                        )
                    });

                    return $q.all(promises);
                };

                /**
                 * clear files
                 */
                $scope.resetFiles = function(){
                    $scope.files = [];
                    $scope.$broadcast('cmFileChooseResetFiles');
                };
            }
        }
    }
]);