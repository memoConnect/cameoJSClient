/*
define([
    'app',

    'cmApi',
    'cmAuth',
    'cmCrypt',
    'cmLogger',
    'cmContacts',
    'util-base64',
    'util-passchk-fast',
    '_v/captcha/captchagen/captchagen'
], function (app) {
*/    
'use strict';


function cmConversationsModel (cmConversationsAdapter, cmCrypt, $q, cmAuth) {

    //self:    

    var conversations  = []

    //Methods:

    conversations.createConversation = function (subject) {
        var deferred = $q.defer()

        cmConversationsAdapter.newConversation(subject)
            .then(function (conversation_data) {
                var conversation = new Conversation(conversation_data)

                conversations.push(conversation)
                deferred.resolve(conversation)
            })

        return  deferred.promise
    }

    //nicht schön:
    conversations.getConversation = function (id) {
        var deferred = $q.defer()

        cmConversationsAdapter.getConversation(id)
            .then(

            function (conversation_data) {
                deferred.resolve(new Conversation(conversation_data))
            },

            function () {
                deferred.reject()
            }
        )

        return  deferred.promise
    }

    conversations.init = function () {
        cmConversationsAdapter.getConversations()
            .then(function (data) {
                data.forEach(function (conversation_data) {
                    var conversation = new Conversation(conversation_data)                    
                    conversations.push(conversation)
                    if(conversation.count >0 ) conversation.update()
                })
            })
    }

    //Classes:
    function Conversation(data) {

        //Attributes:
        this.id = ''
        this.subject = ''
        this.messages = []
        this.recipients = []
        this.passphrase = ''
        this.count = 0
        this.lastMessage = undefined

        var self = this


        this.init = function (conversation_data) {
            this.id             = conversation_data.id
            this.subject        = conversation_data.subject
            this.count          = conversation_data.numberOfMessages

            // register all messages as Message objects
            if (conversation_data.messages) {
                conversation_data.messages.forEach(function (message_data) {
                    self.addMessage(new Message(message_data))
                })
            }

            this.lastMessage = this.messages[this.messages.length-1]

            // register all recipients as Recipient objects
            if (conversation_data.recipients) {
                conversation_data.recipients.forEach(function (recipient_data) {
                    if (typeof recipient_data == 'string') {
                        cmAuth.getIdentity(recipient_data)
                            .then(function (identity) {
                                self.addRecipient(new Recipient(identity))
                            })
                    } else {
                        self.addRecipient(new Recipient(recipient_data))
                    }
                })
            }
        }

        this.addMessage = function (message) {
            this.messages.push(message)
            if (this.passphrase) message.decryptWith(this.passphrase)
            return this
        }

        this.addRecipient = function (recipient) {
            this.recipients.push(recipient)
            return this
        }

        this.removeRecipient = function (recipient) {
            var i = this.recipients.length

            while (i) {
                i--
                if (this.recipients[i] == recipient) this.recipients.splice(i, 1)
            }
            return this
        }

        this.updateSubject = function (subject) {
            cmConversationsAdapter.updateSubject(this.id, subject)
            .then(function(){
                self.subject = subject                
            })
        }

        this.newMessage = function (message_data) {
            var message_data = (typeof message_data == 'string' ? {messageBody: message_data} : message_data )
            return new Message(message_data)
        }

        this.newRecipient = function (identity_data) {
            var identity_data = (typeof identity_data == 'string' ? {id: identity_data} : identity_data )
            return new Recipient(identity_data)
        }

        this.setPassphrase = function (passphrase) {
            this.passphrase = passphrase
            return this
        }

        this.decrypt = function () {
            if (this.passphrase) {
                this.messages.forEach(function (message) {
                    message.decryptWith(self.passphrase)
                })
            }
        }

        this.passphraseValid = function () {
            return !this.messages[0] || this.messages[0].decryptWith(this.passphrase)
        }


        this.update = function () {            
            cmConversationsAdapter.getConversation(this.id)
            .then(function(data){
                self.init(data)       
            })   

            return this         
        }

        this.init(data)        
    }


    function Message(message_data) {

        //Attributes:
        this.id = ''
        this.body = ''
        this.decryptedBody = ''
        this.from = ''
        this.status = ''
        this.lastUpdated = ''
        this.created = ''
        this.lastMessage = ''

        var self = this

        this.encryptWith = function (passphrase) {
            this.body = cmCrypt.encryptWithShortKey(passphrase, this.body)
            return this
        }

        this.decryptWith = function (passphrase) {
            var decrypted_text = cmCrypt.decrypt(passphrase, this.body)
            this.decryptedBody = decrypted_text || this.body
            return !!decrypted_text
        }

        this.sendTo = function (conversation) {
            return    cmConversationsAdapter.sendMessage(conversation.id, this.body)
                .then(function (message_data) {
                    conversation.addMessage(new Message(message_data))
                })
        }

        this.init = function (message_data) {
            this.id = message_data.id
            this.body = message_data.messageBody
            this.decryptedBody = message_data.messageBody
            this.from = message_data.fromIdentity
            this.status = message_data.messageStatus
            this.lastUpdated = message_data.lastUpdated
            this.created = message_data.created
            this.lastMessage = message_data.lastMessage
        }

        this.init(message_data)
    }

    function Recipient(itdentity_data) {
        this.id = ''
        this.displayName = ''

        var self = this

        this.addTo = function (conversation) {
            return  cmConversationsAdapter.addRecipient(conversation.id, this.id)
                    .then(function () {
                        conversation.addRecipient(self)
                    })
        }

        this.removeFrom = function (conversation) {
            return    cmConversationsAdapter.removeRecipient(conversation.id, this.id)
                .then(function () {
                    conversation.removeRecipient(self)
                })
        }

        this.init = function (identity_data) {
            this.id = identity_data.id
            this.displayName = identity_data.displayName || identity_data.cameoId || identity_data.id
        }

        this.init(itdentity_data)
    }

    conversations.init()

    return conversations
}


/*
});
*/