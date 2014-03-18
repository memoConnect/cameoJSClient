function cmContactsModel(cmUserModel, cmContactsAdapter, cmIdentity, cmUtil, $q, $rootScope){
    var self = this;
    var mockContacts = ['derMicha','dasEmpu'];
    var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];
    var mockRequestResults = [{cameoId:'derMicha',requestId:'qwertz1'},{cameoId:'dasEmpu',requestId:'qwerrtz2'},{cameoId:'dutscher',requestId:'qwerrtz3'},{cameoId:'reimerei',requestId:'qwerrtz4'},{cameoId:'rhotp',requestId:'qwerrtz5'}];

    this.contacts = [];
    this.groups = [];

    /**
     * Init Object
     */
    function init(){
        self.getAll().then(
            function(){
                console.info(self.contacts.length);
            }
        );
        self.getGroups();
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
                    identity: cmIdentity.create(contact.identity)
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
        var deferred = $q.defer(),
            i = 0;

        if(this.contacts.length < 1 && cmUserModel.isAuth() !== false){
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
            )
        } else {
            deferred.resolve(self.contacts);
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
        var deferred = $q.defer();

        if(this.groups.length < 1 && cmUserModel.isAuth() !== false){
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

    this.getFriendRequests = function(){
        return cmContactsAdapter.getFriendRequests();
    };

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
        // TODO: add to contacts and send to api
        var defer = $q.defer();
        cmContactsAdapter
        .addContact(data.identity)
        .then(
            function(data){
                _add(data);
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
    }

    $rootScope.$on('logout', function(){
        resetContacts();
    });

    init();
}