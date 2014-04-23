'use strict';

angular.module('cmContacts').service('cmContactsModel',[
    'cmUserModel',
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmFriendRequestModel',
    'cmUtil',
    'cmObject',
    'cmLogger',
    'cmNotify',
    '$q',
    '$rootScope',
    function (cmUserModel, cmContactsAdapter, cmIdentityFactory, cmFriendRequestModel, cmUtil, cmObject, cmLogger, cmNotify, $q, $rootScope){
        var self = this,
            events = {};

        this.contacts = [];
        this.groups = [];
        this.requests = [];

        cmObject.addEventHandlingTo(this)

        /**
         * Init Object
         */
        function init(){
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
                    if(self.contacts[i].id == contact.id){
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
                        identity: cmIdentityFactory.create(contact.identity)
                    });
                }
            }
        }

        /**
         * Model Logic
         */
        this.searchCameoIdentity = function(cameoId){
            return cmContactsAdapter.searchCameoIdentity(cameoId);
        };

        this.getAll = function(limit, offset){
            cmLogger.debug('cmContactsModel:getAll');

            var deferred = $q.defer(),
                i = 0;
            if(this.contacts.length < 1 && cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                this.trigger('start:load-contacts');
                this.loading = true;

                cmContactsAdapter.getAll().then(
                    function(data){
                        while(i < data.length){
                            _add(data[i]);
                            i++;
                        }
                        deferred.resolve(self.contacts);
                    },
                    function(){
                        deferred.reject();
                    }
                ).finally(function(){
                        self.trigger('finish:load-contacts');
                    })
            } else {
                deferred.resolve(self.contacts);
                self.trigger('finish:load-contacts');
            }

            return deferred.promise;
        };

        this.getQuantity = function(){
            var deferred = $q.defer();

            if(this.contacts.length < 1 && cmUserModel.isAuth() !== false){
                this.getAll().then(
                    function(data){
                        deferred.resolve(data.length);
                    },
                    function(){
                        deferred.reject();
                    }
                )
            } else {
                deferred.resolve(self.contacts.length);
            }

            return deferred.promise;
        };

        this.getOne = function(id){
            return cmContactsAdapter.getOne(id);
        };

        this.getGroups = function(){
            cmLogger.debug('cmContactsModel:getGroups');

            var deferred = $q.defer();

            if(this.groups.length < 1 && cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                cmContactsAdapter.getGroups().then(
                    function(data){
                        self.groups = data;
                        deferred.resolve(self.groups);
                    },
                    function(){
                        deferred.reject();
                    }
                );
            } else {
                deferred.resolve(self.groups);
            }

            return deferred.promise;
        };

        this.getAllFromGroup = function(group,limit,offset){
            return cmContactsAdapter.getAllFromGroup(group,limit,offset);
        };

        /**
         * Friend Request Handling
         */

        /**
         * add Friend Request to Model
         * @param identity_data
         * @private
         */
        this._addFriendRequest = function(request_data){
            var i = 0,
                check = false;

            while(i < this.requests.length){
                if(this.requests[i].identity.id == identity_data.id){
                    check = true;
                    break;
                }
                i++;
            }

            if(check !== true){
                this.requests.push(new cmFriendRequestModel({identity: cmIdentityFactory.create(request_data.identity.id), message:request_data.message || '', created:request_data.created || ''}));
            }
        };

        this.getFriendRequests = function(){
            cmLogger.debug('cmContactsModel:getFriendRequests');
            if(cmUserModel.isAuth() !== false && cmUserModel.isGuest() !== true){
                cmContactsAdapter.getFriendRequests().then(
                    function(data){
                        cmLogger.debug('cmContactsModel:getFriendRequests:done');
                        var old_length = self.requests.length;

                        angular.forEach(data, function(value){
                            self._addFriendRequest(value);
                        });

                        if(old_length < self.requests.length){
                            self.trigger('friendRequests:loaded');
                            cmNotify.info('new Friend Requests', {ttl:1000})
                        }
                    }
                )
            }
        };

        this.removeFriendRequest = function(request){
            cmLogger.debug('cmContactsModel:removeFriendRequest');

            var index = this.requests.indexOf(request);
            this.requests.splice(request,1);

            return this;
        }

        this.sendFriendRequest = function(id){
            return cmContactsAdapter.sendFriendRequest(id);
        };

        this.answerFriendRequest = function(id, type){
            return cmContactsAdapter.answerFriendRequest(id, type);
        };

        this.checkDisplayName = function(displayName){
            var defer = $q.defer();
            // TODO: check displayName in local contacts
            if(displayName != 'WummsBrumms'){
                defer.resolve();
            } else {
                defer.reject();
            }

            return defer.promise;
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

        init();

        cmUserModel.on('init', function(){
           init();
        });

        this.on('friendRequests:updated', function(){
            init();
        });
    }
]);