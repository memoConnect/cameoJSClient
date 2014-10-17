'use strict';

angular.module('cmCore')
.factory('cmKeyFactory', [
    'cmKey',
    'cmFactory',
    'cmObject',
    'cmLogger',
    '$rootScope',
    '$q',
    function(cmKey, cmFactory, cmObject, cmLogger, $rootScope, $q){

        function keyFactory(){

            var self =  new cmFactory(cmKey,
                                function sameByData(instance, data){
                                    return      instance.id == data.id
                                            ||  instance.getPublicKey() == data.pubKey
                                },
                                function sameByInstance(instance_1, instance_2){
                                    return      instance_1.id == instance_2.id
                                            ||  instance_1.getPublicKey() ==  instance_2.getPublicKey()
                                }
                            );

            self.encryptPassphrase = function(passphrase, whiteList){
                
                return  $q.all(
                            self
                            .filter(function(key){
                                return  !whiteList || whiteList.indexOf(key.id) != -1
                            })
                            .map(function(key){
                                return  key
                                        .encrypt(passphrase)
                                        .then(function(result){
                                            return  {
                                                        keyId:                 key.id,
                                                        encryptedPassphrase:   result
                                                    }
                                        })
                            })
                         
                        )
            };

            self.getWeakestKeySize = function(){
                return this.reduce(function(size, key){
                    return (size == undefined) ? (key.getSize()||0) : Math.min(size||0, key.getSize()||0)
                }, undefined) || 0
            };

            /**
             * [getTransitivelyTrustedKeys description]
             * @param  {Array} trustedKeys Array of cmKey instances known to be trusted
             * @return {Array}             Array of cmKey instances within a chain of trust connecting them to the initially trusted keys. 
             */
            self.getTransitivelyTrustedKeys = function(initially_trusted_keys, trust_callback, trusted_keys_iteration){
                // cmLogger.debug('cmKeyFactory.getTransitivelyTrustedKeys');

                var trustedKeys = trusted_keys_iteration || initially_trusted_keys || []

                if(!trust_callback){
                    cmLogger.debug('cmKey.getTransitivelyTrustedKeys: trust_callback missing.')
                    return $q.reject()
                }       

                return  $q.all(self.map(function(key){
                            var is_trusted =    trustedKeys.indexOf(key) != -1                           
                                                ?   $q.when(key)
                                                :   trustedKeys.reduce(function(previous_try, trusted_key){
                                                        return  previous_try
                                                                .catch(function(){
                                                                    return  $q.when(trust_callback(trusted_key, key))
                                                                            .then(function(call_back_result){
                                                                                return  call_back_result
                                                                                        ?   $q.when(key)
                                                                                        :   $q.reject('callback return value was falsely.')
                                                                            })
                                                                })
                                                    }, $q.reject('missing trusted keys.'))

                            return  is_trusted
                                    .catch(function(reason){
                                        return $q.when(undefined)
                                    })
                        }))
                        .then(function(list){
                            var extended_key_list = list.filter(function(item){ return !!item})
                            return  trusted_keys_iteration && (extended_key_list.length === trusted_keys_iteration.length)
                                    ?   $q.when(extended_key_list)
                                    :   self.getTransitivelyTrustedKeys(null, trust_callback, extended_key_list)
                        })
            };

            $rootScope.$on('logout', function(){ self.reset() });
            $rootScope.$on('identity:switched', function(){ self.reset() });

            //self.on('fingerprintCheck:failed', function(event, value){
            //    console.log(event)
            //});

            return self
        }

        return keyFactory
    }
])