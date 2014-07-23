'use strict';

angular.module('cmCore')
.factory('cmKeyFactory', [

    'cmKey',
    'cmFactory',

    function(cmKey, cmFactory){

        function keyFactory(){

            var self =  new cmFactory(cmKey,
                                function sameByData(instance, data){
                                    return      instance.id == data.id
                                            ||  instance.getPublicKey() == data.privKey
                                },
                                function sameByInstance(instance_1, instance_2){
                                    return      instance_1.id == instance_2.id
                                            ||  instance_1.getPublicKey ==  instance_2.getPublicKey   
                                }
                            )

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
                    return (size == undefined) ? (key.getSize()||0) : Math.min(size||0, key.getSize()||0)
                }, undefined) || 0
            }

            return self
        }

        return keyFactory
    }
])