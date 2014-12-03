'use strict';

angular.module('cmContacts')
.factory('cmContactModel', [
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmObject',
    'cmStateManagement',
    'cmUtil',
    'cmLogger',
    'cmSecurityAspectsContact',
    '$q',
    function(cmContactsAdapter, cmIdentityFactory, cmObject, cmStateManagement, cmUtil, cmLogger, cmSecurityAspectsContact,$q){
        function ContactModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state              = new cmStateManagement(['loading']);
            this.securityAspects    = new cmSecurityAspectsContact(this);


            this.id            = undefined;
            this.contactType   = undefined;
            this.group         = [];
            this.identity      = cmIdentityFactory.new();

            function init(data){
                //cmLogger.debug('cmContactModel:init');

                // via id
                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.update();
                    // via data.id
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;
                    if(cmUtil.objLen(data) < 2){
                        self.update();
                    } else {
                        self.importData(data);
                    }
                } else {
                    //todo
                }
            }

            this.importData = function(data) {
                //cmLogger.debug('cmContactModel.importData');

                if(typeof data !== 'object'){
                    cmLogger.debug('cmContactModel:import:failed - no data!');
                    return this;
                }

                this.id = data.id || this.id;
                this.contactType = data.contactType || this.contactType;
                this.groups = data.groups || this.groups;
                this.identity = data.identity ? cmIdentityFactory.create(data.identity, true) : this.identity;

                this.trigger('update:finished');
            };

            this.setContactType = function(type){
                this.contactType = type;
                return this;
            };

            this.update = function(){
                //cmLogger.debug('cmContactModel.update');

                if(this.id && !this.state.is('loading')){
                    this.state.set('loading');

                    cmContactsAdapter.getOne(this.id).then(
                        function(data){
                            self.importData(data);
                        },
                        function(){
                            cmLogger.debug('cmContactModel.update fail!');
                        }
                    ).finally(
                        function(){
                            self.state.unset('loading');
                        }
                    );
                }
            };

            this.save = function(objectChange){
                //cmLogger.debug('cmContactModel.save');

                var defer = $q.defer();

                if(this.id){
                    cmContactsAdapter.editContact(this.id, objectChange).then(
                        function(){
                            self.identity.importData(objectChange);
                            defer.resolve();
                        },
                        function(){
                            defer.reject();
                        }
                    );
                } else {
                    cmLogger.debug('cmContactModel.save fails - no contact id!');
                    defer.reject();
                }

                return defer.promise;
            };

            init(data);

        }

        return ContactModel;
    }
]);