'use strict';

angular.module('cmCore')
.service('cmFileDownload', [
    'cmLogger',
    '$rootScope',
    function(cmLogger, $rootScope){
        var self = this;

        this.stack = [];
        this.atWork = false;

        function reset(){
            self.atWork = false;
            self.stack = [];
            self.stop();
        }

        $rootScope.$on('logout', function(){
            reset();
        });

        $rootScope.$on('identity:switched', function(){
            reset();
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
            if(typeof file == 'object' && file.state.is('onlyFileId')){
                file.downloadChunks();

                file.on('file:readyForDownload file:crashed file:cached importFile:incomplete', function(){
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
        this.stop = function(file){
            var index = this.stack.indexOf(file);
            if(index > -1){
                this.stack.splice(index, 1);
            }
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