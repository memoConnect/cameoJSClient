'use strict';

angular.module('cmConversations').service('cmConversationsModel', [

    'cmConversationsAdapter',
    'cmConversationFactory',    
    'cmSecurityAspectsConversation',
    'cmObject',
    '$q',
    '$rootScope',

    function(cmConversationsAdapter, cmConversationFactory, cmSecurityAspectsConversation, cmObject, $q, $rootScope) {
        var self = this,
            events = {};

        this.isLoading      = false;
        this.conversations  = [];
        this.quantity       = 0;
        this.limit          = 10; // 5
        this.offset         = 0; //13

        this.securityAspects = new cmSecurityAspectsConversation(this)

        $rootScope.$on('logout', function(){
            self.conversations = [];
        });


        cmObject.addEventHandlingTo(this)



        //Methods:
        
        this._init = function(){
            cmConversationsAdapter
            .on('message:new', function(event, data){
                self.getConversation(data.conversationId).then(function(conversation){
                    conversation.trigger('message:new', data.message) 
                })
            })
        }

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
                deferred = $q.defer()

            if(id){

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
                            self.addConversation(conversation)

                            deferred.resolve(conversation)
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
                        self.addConversation(cmConversationFactory.create(conversation_data))//.importData(conversation_data)
                    })
                }
            ).finally (function(){
                self.trigger('finish:load');
            })
        }
        this._init()
    }
])