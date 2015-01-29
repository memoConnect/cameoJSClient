'use strict';

angular.module('cmCore')
    .service('cmReKeying', [
        'cmUserModel', 'cmApi', 'cmAuth', 'cmObject', 'cmStateManagement', 'cmUtil', 'cmLogger', 'cmKey', 'cmModal',
        '$rootScope', '$q',
        function(cmUserModel, cmApi, cmAuth, cmObject, cmStateManagement, cmUtil, cmLogger, cmKey, cmModal,
                 $rootScope, $q)
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

                                            rekeying_processes.push( cmAuth.getBulkPassphrases(localKey.id, key.id).then(
                                                function(list){
                                                    if(list.length == 0){
                                                        return $q.when();
                                                    }

                                                    //re and encrypt passphrasees one by one, dont try to de and encrypt them all simultaniuosly:
                                                    return list.reduce(function(previous_run, item){
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
                                                            return  cmAuth.saveBulkPassphrases(key.id, newList)
                                                        }
                                                    )
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
                                                            return $q.when();
                                                        }
                                                    )
                                                        .catch(
                                                        function(){
                                                            return $q.when();
                                                        }
                                                    )
                                                },
                                                function(){
                                                    cmLogger.debug('cmUserModel.bulkReKeying - Request Error - getBulkPassphrases');
                                                    return $q.when();
                                                }
                                            ))
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
                var modal_scope = $rootScope.$new(),
                    modal_id = 'bulk-re-keying';

                modal_scope.working = true;

                cmModal.create({
                    id: modal_id,
                    type: 'plain',
                    class: 'no-padding',
                    'cm-title': 'DRTV.BULK_REKEYING.HEADER',
                    'cm-close-btn': false,
                    'cm-close-on-backdrop': false
                },'<cm-re-keying-modal></cm-rekeying-modal>', null, modal_scope);

                cmModal.open(modal_id);

                this.one('bulkrekeying:finished', function(){
                    var modal = cmModal.instances[modal_id];

                    if(modal && modal.isActive()){
                        cmModal.close(modal_id)
                    }
                });
            }
        }
    ]);