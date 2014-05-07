'use strict';

angular.module('cmFiles').service('cmFileDownload', [
    'cmLogger',
    '$rootScope',
    function(cmLogger, $rootScope){
        var self = this;

        this.stack = [];
        this.atWork = false;

        $rootScope.$on('logout', function(){
            self.atWork = false;
            self.stack = [];
            self.stop();
        });

        /**
         * add cmFileObject to Stack
         * @param file
         */
        this.add = function(file){
            if(typeof file == 'object'){
                stack.push(file);

                if(this.atWork !== true){
                    this.atWork = true;
                    this.run(stack.shift());
                }
            }
        };

        /**
         * work on stack queue, start download process in files
         * @param index
         */
        this.run = function(file){
            if(typeof file == 'object'){
                file.downloadChunks();

                file.on('download:finish', function(){
                    if(self.stack.length > 0){
                        self.run(self.stack.shift());
                    }
                });
            } else {
                if(this.stack.length == 0) {
                    this.atWork = false;
                } else {
                    this.run(this.stack.shift());
                }
            }
        };

        /**
         * Stops Downloading
         */
        this.stop = function(){
            cmLogger.debug('cmFileDownload:stop');
        };

        /**
         * Return Stack Quantity
         * @returns {Array}
         */
        this.getQty = function(){
            return stack.length;
        };
    }
]);