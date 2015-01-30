'use strict';

angular.module('cmContacts').service('cmContactsModel',[
    'cmFactory', 'cmUserModel', 'cmContactModel', 'cmContactsAdapter', 'cmIdentityFactory',
    'cmFriendRequestModel', 'cmStateManagement', 'cmUtil', 'cmObject', 'cmLogger',
    'cmNotify', 'cmBrowserNotifications',
    '$q', '$rootScope',
    function (cmFactory, cmUserModel, cmContactModel, cmContactsAdapter, cmIdentityFactory,
              cmFriendRequestModel, cmStateManagement, cmUtil, cmObject, cmLogger,
              cmNotify, cmBrowserNotifications,
              $q, $rootScope){
        var self = this,
            events = {};

        this.state          =   new cmStateManagement(['loading-contacts','loading-groups','loading-requests']);

        this.contacts       =   new cmFactory(cmContactModel,
                                    function sameByData(instance, data){
                                        return data && data.id != '' &&
                                              (data.id == instance.id ||
                                               data.identity &&
                                               data.identity.id &&
                                               instance &&
                                               instance.identity &&
                                               instance.identity.id &&
                                               data.identity.id == instance.identity.id)
                                    },
                                    function sameByInstance(instance_1, instance_2){
                                        return      instance_1
                                        &&  instance_1.identity
                                        &&  instance_1.identity.id
                                        &&  instance_2
                                        &&  instance_2.identity
                                        &&  instance_2.identity.id
                                        &&  instance_1.identity.id == instance_2.identity.id
                                    });

        // TODO: groups must be in factory style with models
        this.groups         =   [];//new cmFactory(function(){return this;});
        this.requests       =   new cmFactory(cmFriendRequestModel, 
                                    function sameByData(instance, data){
                                        return      data 
                                                &&  data.identity 
                                                &&  data.identity.id 
                                                &&  instance
                                                &&  instance.identity
                                                &&  instance.identity.id
                                                &&  data.identity.id == instance.identity.id
                                    },
                                    function sameByInstance(instance_1, instance_2){
                                        return      instance_1
                                                &&  instance_1.identity
                                                &&  instance_1.identity.id
                                                &&  instance_2
                                                &&  instance_2.identity
                                                &&  instance_2.identity.id
                                                &&  instance_1.identity.id == instance_2.identity.id
                                    });

        this.findByIdentity =   function(identity){
                                    return this.contacts.filter(function(contact){
                                        return contact.identity == identity
                                    })[0]
                                }

        this.findByIdentityId = function(identityId){
            return this.contacts.filter(function(contact){
                return contact.identity.id == identityId
            })[0]
        };
  
        cmObject.addEventHandlingTo(this);

        /**
         * Init Object
         */
        function init(){
//            cmLogger.debug('cmContactsModel:init');
            self.getAll();
            //self.getGroups();
            self.getFriendRequests();
        }

        /**
         * Reset Object
         */
        function reset(){
            //cmLogger.debug('cmContactsModel:reset');
            self.contacts.reset('cmContactsModel.contacts');
            self.groups = [];
            self.requests.reset('cmContactsModel.request');
        }

        /**
         * add to contacts and creates identities
         * @param contact
         * @private
         */

        function _add(contact, forceImport){
            return self.contacts.create(contact, forceImport)
        }

        this._clearContacts = function(){
            this.contacts.reset()
        };

        /**
         * Model Logic
         */
        this.searchCameoIdentity = function(cameoId){
            return cmContactsAdapter.searchCameoIdentity(cameoId, true);
        };

        this.getAll = function(limit, offset, forceImport){
//            cmLogger.debug('cmContactsModel:getAll');
            var i = 0;

            if(cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                if(!this.state.is('loading-contacts')){
                    this.trigger('start:load-contacts');
                    self.state.set('loading-contacts');

                    cmContactsAdapter.getAll().then(
                        function(data){
                            while(i < data.length){
                                _add(data[i], forceImport);
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

            return this;
        };

        this.sendFriendRequest = function(id, message){
            return cmContactsAdapter.sendFriendRequest(id, message);
        };

        this.deleteFriendRequest = function(contact){
            return cmContactsAdapter
                .deleteFriendRequest(contact.identity.id)
                .then(function(){
                    self.contacts.deregister(contact);
                });
        };

        this.addContact = function(data){
            var defer = $q.defer();

            this.trigger('before-add-contact');

            return  cmContactsAdapter
                    .addContact(data)
                    .then(function(data){
                        self.trigger('add-contact', data);
                        var contact = _add(data);
                        self.trigger('after-add-contact', data);
                        return contact;
                    });
        };

        /**
         * @deprecated
         */
        this.editContact = function(id, data){
            cmLogger.debug('cmContactsModel.editContact is deprecated! - Use now cmContactModel.save()');

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

        /**
         * event handling
         */
        $rootScope.$on('logout', function(){
            reset();
        });

        $rootScope.$on('login', function(){
            reset();
        });

        $rootScope.$on('identity:switched', function(){
            reset();
        });

        this.on('friendRequests:updated friendRequest:sent after-add-contact', function(){
            this._clearContacts();
            init();
        });

        cmContactsAdapter.on('friendRequest:new', function(event, data){
            if(data.to == cmUserModel.data.identity.id){
                var request = self.requests.create(data.friendRequest);

                cmBrowserNotifications.showFriendRequest(request.identity);
            }
        });

        cmContactsAdapter.on('friendRequest:accepted', function(event, data){
            // Friend request sent by the current user was accepted:
            if(data.from == cmUserModel.data.identity.id){
                self.contacts.create(data.contact, true);
            }

            // Friend request accepted by the current user (on a different device):
            if(data.to == cmUserModel.data.identity.id){
                self.requests.forEach(function(request){
                    if(request.identity.id == data.from) {
                        self.requests.deregister(request);
                        self.contacts.create(data.contact, true);
                    }
                });
            }
        });

        cmContactsAdapter.on('friendRequest:rejected', function(event, data){
            if(data.to == cmUserModel.data.identity.id){
                self.requests.forEach(function(request){
                    if(request.identity.id == data.from)
                        self.requests.deregister(request)
                });

                cmNotify.trigger('bell:unring');
            }

            if(data.from == cmUserModel.data.identity.id){
                self.contacts.forEach(function(contact){
                    if(contact.identity.id == data.to)
                        self.contacts.deregister(contact)
                });
            }
        });

        this.requests.on('register', function(){
            cmNotify.create({label: 'NOTIFICATIONS.TYPES.FRIEND_REQUEST', bell:true});
        });

        this.contacts.on('deleted:finished', function(event, data){
            self.contacts.deregister(data);
            $rootScope.goto('/contact/list');
        });

        cmContactsAdapter.on('identity:updated', function(event, data){
            if(typeof data.id != 'undefined') {
                var contact = self.contacts.filter(function (contact) {
                    return contact.identity.id == data.id
                })[0];

                if (typeof contact == 'object' && 'identity' in contact && typeof contact.identity.importData == 'function') {
                    contact.identity.importData(data);
                }
            }
        });

        cmContactsAdapter.on('contact:update', function(event, data){
            self.contacts.create(data, true);
        });

        cmContactsAdapter.on('contact:deleted', function(event, data){
            self.contacts.deregister(data);
        });

        cmContactsAdapter.on('subscriptionId:changed', function(){
            self.getAll(true);
            self.getFriendRequests();
        });

        cmUserModel.on('update:finished', function(){
            init();
        });
    }
]);