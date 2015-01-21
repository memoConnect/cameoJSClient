'use strict';

angular.module('cmCore')
.service('cmReKeying', [
    'cmUserModel', 'cmApi', 'cmAuth', 'cmObject', 'cmStateManagement', 'cmUtil', 'cmLogger', 'cmKey',
    '$q',
    function(cmUserModel, cmApi, cmAuth, cmObject, cmStateManagement, cmUtil, cmLogger, cmKey,
             $q)
    {
        var self = this;

        cmObject.addEventHandlingTo(this);

        this.state = new cmStateManagement(['rekeying']);

        this.process = function(localKeyId){
            if(!this.state.is('rekeying')){
                this.state.set('rekeying');

                if(typeof localKeyId == 'string' && cmUtil.validateString(localKeyId)){
                    var localKey    = cmUserModel.loadLocalKeys().find(localKeyId);

                    if(localKey instanceof cmKey){

                        cmUserModel.data.identity.getTrustedKeys().then(
                            function(trusted_keys){

                                if(trusted_keys.length > 0){
                                    self.showModal()
                                }

                                var rekeying_processes = [];

                                trusted_keys.forEach(function(key){
                                    if(key.id != localKey.id){

                                        var defered = $q.defer();

                                        rekeying_processes.push(defered.promise);

                                        cmAuth.getBulkPassphrases(localKey.id, key.id).then(
                                            function(list){
                                                if(list.length == 0){
                                                    defered.reject();
                                                    return [];
                                                }

                                                //re and encrypt passphrasees one by one, dont try to de and encrypt them all simultaniuosly:
                                                list.reduce(function(previous_run, item){
                                                    return  previous_run
                                                    .then(function(list_so_far){
                                                        return  cmUserModel.decryptPassphrase(item.aePassphrase, localKey.id)
                                                            .then(function(passphrase){
                                                                return key.encrypt(passphrase)
                                                            })
                                                            .then(function(encrypted_passphrase){
                                                                return  list_so_far.concat([{
                                                                    conversationId: item.conversationId,
                                                                    aePassphrase:   encrypted_passphrase
                                                                }])
                                                            })

                                                    })
                                                }, $q.when([]))
                                                .then(
                                                    function(newList){
                                                    console.warn('Save Schmutz!')
                                                    return  cmAuth.saveBulkPassphrases(key.id, newList)
                                                })
                                                .then(
                                                    function(){
                                                        return  cmApi.broadcast({
                                                            name: 'rekeying:finished',
                                                            data:{
                                                                keyId: key.id
                                                            }
                                                        });
                                                    },
                                                    function(){
                                                        cmLogger.debug('cmUserModel.bulkReKeying - Request Error - saveBulkPassphrases');
                                                        return $q.reject();
                                                    }
                                                )
                                                .then(
                                                    function(){
                                                        defered.resolve();
                                                    },
                                                    function(){
                                                        defered.reject();
                                                    }
                                                )
                                            },
                                            function(){
                                                cmLogger.debug('cmUserModel.bulkReKeying - Request Error - getBulkPassphrases');
                                                defered.reject();
                                            }
                                        )
                                    }
                                });

                                $q.all(rekeying_processes).finally(
                                    function(){
                                        self.trigger('bulkrekeying:finished');
                                        self.state.unset('rekeying');
                                    }
                                );
                            }
                        );
                    }
                } else {
                    cmLogger.debug('cmUserModel.bulkReKeying - Parameter Error - getBulkPassphrases');
                    this.trigger('bulkrekeying:aborted');
                    this.state.unset('rekeying');
                }
            }
        };

        this.showModal = function(){
            cmLogger.warn('cmReKeying.showModal');

            this.one('bulkrekeying:finished', function(){
                cmLogger.warn('close rekeying modal!')
            });
        }
    }
]);