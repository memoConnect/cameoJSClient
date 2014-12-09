'use strict';

angular.module('cmFiles').service('cmAnswerFiles', [
    'cmObject', 'cmFileFactory',
    '$q',
    function (cmObject, cmFileFactory,
              $q) {

        var self = {
            files: [],
            set: function (blob) {
//             TODO: Android name=content fix file plugin!!!
//                console.log(blob)

                if (!blob)
                    return false;

                var found = this.files.some(function (file) {
                    return (file.name == blob.name && file.size == blob.size);
                });

                if (found) {
                    return false;
                }

                var file = cmFileFactory.create(blob, true);

                this.files.push(file);

                this.trigger('file:setted');

                return true;
            },
            remove: function (file) {
                if (cmFileFactory.remove(file)) {
                    var index = self.files.indexOf(file);
                    self.files.splice(index, 1);
                    this.trigger('file:removed');
                    return true;
                }

                return false;
            },
            reset: function () {
                this.files = [];
                this.trigger('files:resetted');
            },

            getFilesForTransfer: function(){
                var files = this.files;
                this.reset();
                return files;
            },

            setFiles: function(filesArray){
                this.files = filesArray;
            },

            validateChoosenFiles: function (options) {
                var promises = [];

                // create all files and get fileIds
                angular.forEach(this.files, function (file) {
                    promises.push(
                        file
                            .setPassphrase(options.passphrase)
                            .encryptName()
                            .prepareForUpload(options.conversationId)
                    )
                });

                var deferred = $q.defer();

                $q.all(promises)
                .then(
                    function () {
                        deferred.resolve(self.files);
                        self.reset();
                    },
                    function (result) {
                        deferred.reject(result.data.errorCode, result.data.error, result.config.headers);
                    }
                );

                return deferred.promise;
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
]);