'use strict';

angular.module('cmConversations').service('cmConversationsModel', [
    'cmConversationsAdapter',
    'cmConversationFactory',
    '$q',
    '$rootScope',
    function(cmConversationsAdapter, cmConversationFactory, $q, $rootScope) {
        var self = this,
            events = {};

        this.isLoading = false;
        this.conversations = [];
        this.quantity = 0;
        this.limit = 10; // 5
        this.offset = 0; //13

        $rootScope.$on('logout', function(){
            self.conversations = [];
        });

        this.on = function(event, callback){
            events[event] = events[event] || [];
            events[event].push(callback);
        }

        this.trigger = function(event, data){
            events[event] = events[event] || [];
            events[event].forEach(function(callback){
                callback(data);
            });
        }

        //Methods:
        this.addConversation = function(conversation, firstItem){
            var i = 0,
                checkConversation = null;

            if(typeof conversation !== 'undefined'){
                if(this.conversations.length == 0){
                    this.conversations.push(conversation);
                } else {
                    while(i < this.conversations.length){
                        if(conversation.id == this.conversations[i].id){
                            checkConversation = this.conversations[i]
                            break;
                        }
                        i++;
                    }

                    if(checkConversation !== null){
                        //checkConversation.update();
                    } else {
                        if(typeof firstItem !== 'undefined' && firstItem !== false){
                            this.conversations.unshift(conversation);
                        } else {
                            this.conversations.push(conversation);
                        }
                    }
                }
            }

            return conversation;
        };

        this.createNewConversation = function (){
            var deferred = $q.defer();
            var conversation = cmConversationFactory.create();

            deferred.resolve(conversation);
            return deferred.promise;
        }

        this.getConversation = function (id) {
            var i = 0,
                check = false,
                conversation = null,
                deferred = $q.defer();

            if(typeof id !== 'undefined'){
                while(i < this.conversations.length){
                    if(id == this.conversations[i].id){
                        check = true;
                        conversation = this.conversations[i];
                        break;
                    }
                    i++;
                }

                if(check !== true){
                    cmConversationsAdapter.getConversation(id).then(
                        function (conversation_data) {
                            conversation = cmConversationFactory.create(conversation_data);
                            self.addConversation(conversation);

                            deferred.resolve(conversation);
                        },

                        function () {
                            deferred.reject();
                        }
                    )
                } else {
                    deferred.resolve(conversation);
                }
            } else {
                cmConversationsAdapter.newConversation().then(
                    function (conversation_data) {
                        conversation = cmConversationFactory.create(conversation_data);
                        self.addConversation(conversation);

                        deferred.resolve(conversation);
                    },

                    function () {
                        deferred.reject();
                    }
                )
            }

            return deferred.promise;
        }

        this.getConversations = function (limit, offset) {
            if(typeof limit === 'undefined'){
                limit = this.limit;
            }

            if(typeof offset === 'undefined'){
                offset = this.offset;
            }

            cmConversationsAdapter.getConversations(limit, offset).then(
                function (data) {
                    self.quantity = data.numberOfConversations;

                    data.conversations.forEach(function (conversation_data) {
                        self.addConversation(cmConversationFactory.create(conversation_data).update(conversation_data))
                    })
                }
            ).finally (function(){
                self.trigger('finish:load');
            })
        }
    }
])