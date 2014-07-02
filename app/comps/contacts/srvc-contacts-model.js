'use strict';

angular.module('cmContacts').service('cmContactsModel',[
    'cmFactory',
    'cmUserModel',
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmFriendRequestModel',
    'cmStateManagement',
    'cmUtil',
    'cmObject',
    'cmLogger',
    'cmNotify',
    '$q',
    '$rootScope',
    function (cmFactory, cmUserModel, cmContactsAdapter, cmIdentityFactory, cmFriendRequestModel, cmStateManagement, cmUtil, cmObject, cmLogger, cmNotify, $q, $rootScope){
        var self = this,
            events = {};

        this.state = new cmStateManagement(['loading-contacts','loading-groups','loading-requests']);

        this.contacts   = [];
        this.groups     = [];
        this.requests   = new cmFactory(cmFriendRequestModel, 'identity.id');

        cmObject.addEventHandlingTo(this);

        /**
         * Init Object
         */
        function init(){
//            cmLogger.debug('cmContactsModel:init');
            self.getAll();
            self.getGroups();
            self.getFriendRequests();
        }

        /**
         * add to contacts and creates identities
         * @param contact
         * @private
         */

        function _add(contact){
            var check = false,
                i = 0;

            if(typeof contact === 'object' && cmUtil.objLen(contact) > 0){
                while(i < self.contacts.length){

                    if(self.contacts[i].identity.id == contact.identity.id){
                        check = true;
                        break;
                    }
                    i++;
                }

                if(check !== true){
                    self.contacts.push({
                        id: contact.id,
                        contactType: contact.contactType,
                        groups: contact.groups,
                        identity: cmIdentityFactory.create(contact.identity, true)
                    });
                }
            }
        }

        this._clearContacts = function(){
            this.contacts = [];
        };

        /**
         * Model Logic
         */
        this.searchCameoIdentity = function(cameoId){
            return cmContactsAdapter.searchCameoIdentity(cameoId, true);
        };

        this.getAll = function(limit, offset){
//            cmLogger.debug('cmContactsModel:getAll');
            var i = 0;

            if(cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-contacts')){
                    this.trigger('start:load-contacts');
                    self.state.set('loading-contacts');

                    cmContactsAdapter.getAll().then(
                        function(data){
                            while(i < data.length){
                                _add(data[i]);
                                i++;
                            }
                        }
                    ).finally(function(){
                        self.trigger('finish:load-contacts');
                        self.state.unset('loading-contacts');
                    })
                }
            }

            return this;
        };

        this.getOne = function(id){
            return cmContactsAdapter.getOne(id);
        };

        this.getGroups = function(){
//            cmLogger.debug('cmContactsModel:getGroups');

            if(this.groups.length < 1 && cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-groups')) {
                    this.state.set('loading-groups');

                    cmContactsAdapter.getGroups().then(
                        function (data) {
                            self.groups = data;
                        }
                    ).finally(function(){
                        self.state.unset('loading-groups')
                    });
                }
            }

            return this;
        };

        this.getAllFromGroup = function(group,limit,offset){
            return cmContactsAdapter.getAllFromGroup(group,limit,offset);
        };

        /**
         * Friend Request Handling
         */


        this.getFriendRequests = function(){
//            cmLogger.debug('cmContactsModel:getFriendRequests');
            if(cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-requests')){
                    this.state.set('loading-requests');

                    cmContactsAdapter.getFriendRequests().then(
                        function(data) {
//                        cmLogger.debug('cmContactsModel:getFriendRequests:done');
                            var old_length = self.requests.length;

                            angular.forEach(data, function (request_data) {
                                self.requests.create(request_data)
                            });

                            if (old_length < self.requests.length) {
                                self.trigger('friendRequests:loaded');
                            }
                        }
                    ).finally(function(){
                        self.state.unset('loading-requests');
                    })
                }
            }
        };

        this.removeFriendRequest = function(request){

            this.requests.deregister(request)

            /*
//            cmLogger.debug('cmContactsModel:removeFriendRequest');

            var index = this.requests.indexOf(request);
            this.requests.splice(index,1);
            */
           
            return this;
        }

        this.sendFriendRequest = function(id, message){
            return cmContactsAdapter.sendFriendRequest(id, message);
        };



        this.addContact = function(data){
            var defer = $q.defer();

            this.trigger('before-add-contact')

            cmContactsAdapter
                .addContact(data)
                .then(
                function(data){
                    self.trigger('add-contact', data)
                    _add(data);
                    self.trigger('after-add-contact', data)
                    defer.resolve();
                },
                function(){
                    defer.reject();
                }
            );

            return defer.promise;
        };

        this.editContact = function(id, data){
            var defer = $q.defer();
            cmContactsAdapter
                .editContact(id, data)
                .then(
                function(data){
//                _edit(data);
                    defer.resolve();
                },
                function(){
                    defer.reject();
                }
            );

            return defer.promise;
        };

        this.deleteContact = function(id, data){
            var defer = $q.defer();
            cmContactsAdapter
                .deleteContact(data)
                .then(
                function(data){
                    //_delete(data);
                    defer.resolve();
                },
                function(){
                    defer.reject();
                }
            );

            return defer.promise;
        };

        function resetContacts(){
            self.contacts = [];
            self.groups = [];
            self.requests = [];
        }

        $rootScope.$on('logout', function(){
            resetContacts();
        });

        this.on('friendRequests:updated', function(){
            this._clearContacts();
            init();
        });

        this.on('friendRequest:send', function(){
            this._clearContacts();
            init();
        });

        this.on('after-add-contact', function(){
            console.log('after-add-contact');
            this._clearContacts();
            init();
        });

        cmContactsAdapter.on('friendRequest:new', function(event, data){
            if(data.to == cmUserModel.data.identity.id)
                self.requests.create(data.friendRequest);
        });


        this.requests.on('register', function(){
            cmNotify.new({label: 'NOTIFICATIONS.TYPES.FRIEND_REQUEST', bell: true});
        });

        cmUserModel.on('update:finished', function(){
            init();
        });
    }
]);