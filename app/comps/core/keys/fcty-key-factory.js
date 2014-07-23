'use strict';

angular.module('cmCore')
.factory('cmKeyFactory', [

    'cmKey',
    'cmFactory',

    function(cmKey, cmFactory){

        function keyFactory(){

            var self = new cmFactory(cmKey)

            self.encryptPassphrase = function(passphrase, whiteList){
                
                return  self            
                        .map(function(key){
                            if(!whiteList || whiteList.indexOf(key.id) != -1)
                                return  {
                                            keyId:                 key.id,
                                            encryptedPassphrase:   key.encrypt(passphrase)
                                        }
                            
                        })
                        //filter all failed attempts:
                        .filter(function(item){
                            return item && item.encryptedPassphrase
                        })
            }

            self.getWeakestKeySize = function(){
                return this.reduce(function(size, key){                    
                    return size == undefined ? key.getSize() : Math.min(size, key.getSize())
                }, undefined)
            }

            return self
        }

        return keyFactory
    }
])