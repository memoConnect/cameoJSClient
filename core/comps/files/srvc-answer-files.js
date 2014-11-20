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
                console.log(blob)

                if (!blob)
                    return false;

                var found = this.files.some(function (file) {
                    console.log(
                        file.name,
                        blob.name,
                        file.size,
                        blob.size,
                        (file.name == blob.name && file.size == blob.size)
                    )
                    return (file.name == blob.name && file.size == blob.size);
                });

                console.log(found)

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

                return $q.all(promises)
                    .then(
                    function () {
                        return $q.resolve(self.files);
                    },
                    function (result) {
                        return $q.reject(result.data.errorCode, result.data.error, result.config.headers);
                    }
                ).finally(
                    function () {
                        self.reset();
                    }
                )
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
]);