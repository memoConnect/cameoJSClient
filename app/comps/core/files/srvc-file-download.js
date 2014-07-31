'use strict';

angular.module('cmCore')
.service('cmFileDownload', [
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
                this.stack.push(file);

                if(this.atWork !== true){
                    this.atWork = true;
                    this.run(this.stack.shift());
                }
            }
        };

        /**
         * work on stack queue, start download process in files
         * @param index
         */
        this.run = function(file){
            if(typeof file == 'object' && file.state == 'exists'){
                file.downloadChunks();

                file.on('file:cached', function(){
                    self.run(self.stack.shift());
                });
                file.on('file:crashed', function(){
                    self.run(self.stack.shift());
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

        this.remove = function(file){
            console.log('cmFileDownload.remove',file)

        };

        /**
         * Return Stack Quantity
         * @returns {Array}
         */
        this.getQty = function(){
            return this.stack.length;
        };
    }
]);