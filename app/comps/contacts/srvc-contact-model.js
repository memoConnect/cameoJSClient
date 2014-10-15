'use strict';

angular.module('cmContacts')
.factory('cmContactModel', [
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmUtil',
    'cmLogger',
    function(cmContactsAdapter, cmIdentityFactory, cmUtil, cmLogger){
        function ContactModel(data){
            var self = this;

            this.id            = undefined;
            this.contactType   = undefined;
            this.group         = [];
            this.identity      = cmIdentityFactory.new();

            function init(data){
                cmLogger.debug('cmContactModel:init');

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
                cmLogger.debug('cmContactModel.importData');

                if(typeof data !== 'object'){
                    cmLogger.debug('cmContactModel:import:failed - no data!');
                    return this;
                }

                this.id = data.id || this.id;
                this.contactType = data.contactType || this.contactType;
                this.groups = data.groups || this.groups;
                this.identity = data.identity ? cmIdentityFactory.create(data.identity, true) : this.identity;
            };

            this.setContactType = function(type){
                this.contactType = type;
                return this;
            };

            this.update = function(){
                cmLogger.debug('cmContactModel.update');

                if(this.id){
                    cmContactsAdapter.getOne(this.id).then(
                        function(data){
                            self.importData(data);
                        },
                        function(){
                            cmLogger.debug('cmContactModel.update fail!');
                        }
                    );
                }
            };

            init(data)
        }

        return ContactModel;
    }
]);