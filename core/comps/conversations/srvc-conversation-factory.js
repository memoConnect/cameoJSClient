'use strict';

/**
 * @ngdoc object
 * @name cmConversationFactory
 * @description
 * Handles Conversation Instances<br />
 * create new instances and check if instances still exists
 *
 * @requires cmConversationsAdapter
 * @requires cmFactory
 * @requires cmStateManagement
 * @requires cmConversationModel
 * @requires $rootScope
 *
 */
angular.module('cmConversations').service('cmConversationFactory', [

    '$rootScope',
    'cmUserModel',
    'cmConversationsAdapter',
    'cmFactory',
    'cmStateManagement',
    'cmConversationModel',
    'cmLogger',
    '$q',

    function($rootScope, cmUserModel, cmConversationsAdapter, cmFactory, cmStateManagement, cmConversationModel, cmLogger, $q) {
        var self = cmFactory(cmConversationModel);

        var _quantity   = 0,
            _limit      = 10,
            _offset     = 0;

        self.state = new cmStateManagement(['loading']);

        self.getList = function(limit, offset){
//            cmLogger.debug('cmConversationFactory.getList');
            if(cmUserModel.isGuest() || self.state.is('loading'))
                return false;

            // for spinner show only once
            if(!self.state.is('first-load')) {
                self.state.set('first-load');
                self.state.set('initial-loading');
            }
            self.state.set('loading');

            if(typeof limit === 'undefined'){
                limit = _limit;
            }

            if(typeof offset === 'undefined'){
                offset = _offset;
            }

            cmConversationsAdapter.getConversations(limit, offset).then(
                function (data) {
                    _quantity = data.numberOfConversations;

                    data.conversations.forEach(function (conversation_data) {
                        self.create(conversation_data);
                    });
                }
            ).finally(
                function(){
                    self.state.unset('loading');
                    if(self.state.is('initial-loading')){
                        self.state.unset('initial-loading');
                    }
                }
            )
        };

        self.getLimit = function(){
            return _limit;
        };

        self.search = function(search, limit, offset){
            if(cmUserModel.isGuest() || self.state.is('loading'))
                return false;

            var deferred = $q.defer();

            self.state.set('loading');

            cmConversationsAdapter.searchConversations(search,limit, offset).then(
                function(data) {
                    /**
                     * @todo
                     * _quantity = data.numberOfConversations;
                     */

                    data.conversations.forEach(function (conversation_data) {
                        self.create(conversation_data);
                    });

                    deferred.resolve(data);
                },
                function(){
                    deferred.reject('search errror');
                }
            ).finally(
                function(){
                    self.state.unset('loading');
                }
            );

            return deferred.promise;
        };

        /**
         * @ngdoc method
         * @methodOf cmConversationFactory
         *
         * @name getQuantity
         * @description
         * Returns Number of all Conversations
         * Quantity is first set in getList()
         *
         * @returns {Number} quantity Number of all Conversations
         */
        self.getQuantity = function(){
            return _quantity;
        };

        /**
         * EventHandling
         */
        $rootScope.$on('logout', function(){ self.reset('cmConversations') });

        $rootScope.$on('identity:switched', function(){
            cmUserModel.one('update:finished', function(){
                self.reset('cmConversations');
            })
        });

        $rootScope.$on('login', function(){
            cmUserModel.one('update:finished', function(){
                self.reset('cmConversations');
            })
        });

        cmUserModel.on('update:finished', function(){
            self.getList();
        });

        cmConversationsAdapter.on('message:new', function(event,data){
            var instance = self.find(data.conversationId);

            if(instance){
                self
                    .create(data.conversationId)
                    .trigger('message:new', data)
            }
        });

        cmConversationsAdapter.on('conversation:new', function(event,data){
            self.create(data)
        });

        cmConversationsAdapter.on('conversation:update', function(event, data){
            //cmLogger.debug('cmConversationFactory.on:conversation:update');
            self.create(data, true)
        });

        cmConversationsAdapter.on('conversation:deleted', function(event, data){
            //cmLogger.debug('cmConversationFactory.on:conversation:deleted');
            var instance = self.find(data.id);

            if(instance){
                self.deregister(instance);
            }
        });

        /**
         * @TODO CallbackQueue? Fingerprint check! Performance!
         */
        cmConversationsAdapter.on('passphrases:updated', function(event, data){
            //cmLogger.debug('cmConversationFactory.on:passphrase:updated');

            if(typeof data == 'object') {
                if ('keyId' in data && typeof data.keyId == 'string' && data.keyId.length > 0) {
                    var localKeys = cmUserModel.loadLocalKeys();
                    var checkKeyId = false;

                    localKeys.forEach(function (key) {
                        if (key.id == data.keyId) {
                            checkKeyId = true;
                        }
                    });

                    if (checkKeyId) {
                        self.forEach(function (conversation) {
                            conversation.load();
                        });
                    }
                }
            }
        });

        cmConversationsAdapter.on('subscriptionId:changed', function(){
            self.forEach(function (conversation) {
                //conversation.update();
                conversation.loadLatestMessages();
            });
        });

        self.on('notFound', function(event, data){
            self.deregister(data);
        });

        return self;
    }
]);