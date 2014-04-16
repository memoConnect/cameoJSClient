angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts',
    'cmUtil',
//    'cmCron',
    'cmIdentity',
    'cmObject',
    'cmUserModel',
    'cmNotify',
    'ui.bootstrap'
])
.directive('cmAttachments', [
    function () {
        return {
            restrict: 'AE',
            template: '<i class="fa fa-paperclip"></i>', //MOCK

            link: function (scope, element, attrs) {
                //mocked
                element.css({
                    "font-size": "2em",
                    "vertical-align": "middle"
                })
            }
        }
    }
])
.directive('cmCaptcha',[
    function (){
        return {
            restrict: 		'AE',
            require:		'^cmConversation',
            template:		'<canvas id="canvas" width="100" height="37" class="img-rounded"></canvas>', //MOCK

            controller:		function($scope, $element, $attrs){

                var captcha;

                $scope.captchaDim = "700x150"
                $scope.captchaFont = "sans"
                $scope.captchaImageData = ''

                $scope.create = function(){
                    var dim = $scope.captchaDim.split("x");
                    captcha = new Captchagen({
                        width: dim[0]
                        ,height: dim[1]
                        ,text: $scope.passphrase
                        ,font: $scope.captchaFont
                    });
                    captcha.generate();

                    $scope.pass = captcha.text();
                };

                $scope.refreshCaptcha = function(){
                    captcha.refresh($scope.passphrase);
                }

                $scope.$watch('passphrase', $scope.refreshCaptcha)

                $scope.create();


            }
        }
    }
])
.directive('cmConversationControls', [
    'cmUserModel',
    'cmNotify',
    '$location',
    '$rootScope',
    function(cmUserModel, cmNotify, $location, $rootScope){
        return{
            restrict : 'AE',
            templateUrl : 'comps/conversations/tpl-conversation-controls.html',
            scope : {
                conversation :"=cmData"
            },
            require: '^cmConversation',

            link: function($scope, $element, $attrs, cmConversation){
                $scope.isNew = cmConversation.isNew();

                $scope.setLevel = function(level){
                    if(cmUserModel.isGuest() !== true){
                        if(level == 'unsafe'){
                            $scope.conversation.setPassphrase('')
                            $scope.conversation.setKeyTransmission('symmetric')
                        }

                        if(level == 'safe'){
                            $scope.conversation.setPassphrase()
                            $scope.conversation.setKeyTransmission('symmetric')
                        }

                        if(level == 'safer'){
                            $scope.conversation.setPassphrase()
                            $scope.conversation.setKeyTransmission('asymmetric')
                        }

                        $scope.safetyLevel = level;
                    }
                }

                $scope.bodyVisible = $scope.isNew;
                $scope.safetyLevel = 'safer'

                $scope.handle = function(){
                    if($scope.bodyVisible)
                        $scope.bodyVisible = false;
                    else
                        $scope.bodyVisible = true;
                };

                $scope.manageRecipients = function(){
                    $location.path('/recipients')
                }

            }
        }
    }
])
.directive('cmConversationTag',[
    function (){
        return {

            restrict : 'AE',
            scope: {
                conversation : "=cmData"
            },
            templateUrl : 'comps/conversations/tpl-conversation-tag.html',
            priority: 0
        }
    }
])
.directive('cmConversation', [
    'cmConversationsModel',
    'cmMessageFactory',
    'cmUserModel',
    'cmRecipientModel',
    'cmCrypt',
//    'cmCron',
    'cmLogger',
    'cmNotify',
    '$location',
    '$rootScope',
    function (cmConversationsModel, cmMessageFactory, cmUserModel, cmRecipientModel, cmCrypt, cmLogger, cmNotify, $location, $rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'comps/conversations/tpl-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                var conversation_id      = $scope.$eval($attrs.cmConversations) || $scope.$eval($attrs.conversationId),
                    conversation_subject = $scope.$eval($attrs.cmSubject),
                    conversation_offset  = $attrs.offset,
                    conversation_limit   = $attrs.limit



                $scope.init = function (conversation) {

                    $rootScope.pendingConversation = conversation

                    // reload detail of conversation
                    $scope.conversation = conversation.update();

                    $scope.my_message_text  = ""
                    $scope.password         = ""
                    $scope.show_contacts    = false
                    //$scope.passphrase_valid = $scope.conversation.passphraseValid()

                    /*
                    if($scope.conversation.passphrase != '' && $scope.passphrase_valid !== false){
                        $scope.passphrase = $scope.conversation.passphrase;
                        $scope.conversation.decrypt();
                    } else {
                        $scope.$watch("passphrase", function (new_passphrase) {
                            $scope.conversation.setPassphrase(new_passphrase)
                            $scope.passphrase_valid = $scope.conversation.passphraseValid()
                            if ($scope.passphrase_valid) $scope.conversation.decrypt()
                        })
                    }
                    */

                    $scope.$watch("conversation.subject", function (new_subject) {
                        $scope.conversation.updateSubject(new_subject||'')
                    })


                    //cron
    //                if($scope.new_conversation !== true){
    //                    cmCron.add('Conversation-'+conversation.id,{instance: conversation,task:function(conversation){self.update()}});
    //                }
                }

                $scope.sendMessage = function () {

                    var passphrase_valid    = !!$scope.conversation.passphraseValid(),
                        message_empty       = !$scope.my_message_text,
                        recipients_missing  = $scope.conversation.recipients.length <= 0 //@todo mocked

                    if(!message_empty && passphrase_valid && !recipients_missing){
                        if($scope.conversation.id == ''){
                            $scope.conversation.save().then(
                                function(){
                                    $scope.sendMessage();
                                }
                            );
                        } else {
                            cmMessageFactory.create( {body: $scope.my_message_text} )
                                .encrypt($scope.conversation.passphrase)
                                .addTo($scope.conversation)
                                .sendTo($scope.conversation.id)
                                .then(function(){
                                    $scope.conversation.numberOfMessages++;
                                    $scope.my_message_text = "";

                                    if($scope.new_conversation !== false){
                                        cmConversationsModel.addConversation($scope.conversation, true);
                                        $location.path('/conversation/' + $scope.conversation.id);
                                    }
                                })
                        }
                     }

                    if (!passphrase_valid)    cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID')
                    if (message_empty)        cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY')
                    if (recipients_missing)   cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING')
                }

                $scope.sendAsset = function () {
                    var passphrase_valid = !!$scope.conversation.passphraseValid(),
                        recipients_missing = $scope.conversation.recipients.length <= 1,
                        assetId_missing = !$scope.assetId

                    passphrase_valid && !assetId_missing && !recipients_missing
                        ?   $scope.conversation
                            .newMessage(':asset,'+$scope.assetId, $scope.conversation.passphrase)
                            .sendTo($scope.conversation)
                            .then(function () {
                                if ($scope.new_conversation) $location.url('/conversation/' + $scope.conversation.id)
                                $scope.assetId = undefined
                            })
                        :   null

                    if (!passphrase_valid)    cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID')
                    if (assetId_missing)      cmNotify.warn('CONVERSATION.WARN.ASSET_ID_MISSING')
                    if (recipients_missing)   cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING')
                }


                $scope.sendCaptcha = function () {
                    var passphrase_valid = !!$scope.conversation.passphraseValid(),
                        captchaImageData = $element.find('canvas')[0].toDataURL("image/png")

                    captchaImageData && passphrase_valid
                        ?   $scope.conversation
                            .newMessage(captchaImageData)
                            .sendTo($scope.conversation)
                        : null

                    if (!passphrase_valid)    cmNotify.warn('CONVERSTAION.WARN.PASSPHRASE_INVALID')
                }

                $scope.requestCaptcha = function () {
                    $scope.conversation
                        .newMessage(":requestCaptcha")
                        .sendTo($scope.conversation)
                }

                this.isNew = function(){
                    return $scope.new_conversation;
                }

                $scope.compareDate = function(current, prev){
                    if(typeof current !== 'undefined' && typeof prev !== 'undefined'){
                        if( (new Date(current)).getDate() > (new Date(prev)).getDate() ){
                            return true;
                        }
                    } else if(typeof current !== 'undefined' && typeof prev === 'undefined') {
                        return true;
                    }
                    return false;
                }

                $scope.new_conversation = !conversation_id && !$rootScope.pendingConversation;

                if(conversation_id){
                    cmConversationsModel.getConversation(conversation_id).then(
                        function (conversation) {
                            $scope.init(conversation)
                            $scope.conversation.decryptPassphrase()
                            $scope.conversation.decrypt()
                        }
                    )
                } else if($rootScope.pendingConversation){
                    $scope.init($rootScope.pendingConversation)
                } else {
                    cmConversationsModel.createNewConversation().then(
                        function(newConversation){
                            newConversation.addRecipient(cmUserModel.data.identity);
                            $scope.init(newConversation);
                            $scope.conversation.setPassphrase()
                        }
                    );
                }


            }
        }
    }
])
.directive('cmMessage', [
    function cmMessage() {
        return {
            restrict: 'AE',
            require: '^cmConversation',
            scope: true,
            templateUrl: 'comps/conversations/tpl-message.html',
            controller: function ($scope, $element, $attrs) {
                if($attrs.truncate !== undefined){
                    $scope.truncate = $attrs.truncate;
                }

                $scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage);

                $scope.message.decrypt($scope.passphrase);
                $scope.textOnly = !!$scope.$eval($attrs.textOnly)


    //            $scope.truncateLength = $scope.$eval($attrs.truncate);

                /*
                if ($scope.message.text.match(/^data:image/)) {
                    $scope.hasCaptcha = true;
                }
                if ($scope.message.text.match(/:requestCaptcha/)) {
                    $scope.captchaRequest = true;
                }


                $scope.checkAsset = function(){
                    if ($scope.message.text.match(/^:asset,/)) {

                        $scope.assetId = $scope.message.text.replace(/^:asset,/,'')

                        $scope.hasAsset = true;
                    }else{
                        $scope.hasAsset = false
                    }
                }

                $scope.$watchCollection('message', function(message){
                    $scope.checkAsset()
                })
                */

                $scope.is_my_own_message = $scope.message.isOwn();
            }
        }
    }
])
.directive('cmPasswordInput',[
    function () {
        return {
            restrict: 		'A',
            scope:			false,

            link:			function(scope, element, attrs, ngModelCtrl){

                var status = angular.element('<i></i>').addClass('fa'),
                    timeout

                element.after(status)

                scope.refresh= function(){
                    element.val()
                        ?	status.addClass('fa-lock').removeClass('fa-unlock')
                        :	status.addClass('fa-unlock').removeClass('fa-lock')
                }

                scope.refresh()
                scope.$watch('passphrase', scope.refresh)
            }

        }
    }
])
.directive('cmRecipientCounter',[
    function(){
        return {
            restrict : 'AE',
            transclude: true,
            template : '<i class="fa cm-group background"></i><div class="foreground" ng-transclude></div>'
        }
    }
])
.directive('cmSafetyLevel',[
    function cmSafetyLevel(){
        return {
            restrict: 'AE',
            template: '',

            link: function(scope, element, attrs){

                function draw(x){
                    for(var i = 0; i < x; i++){
                        element.append('<i class="fa cm-lock"></i>')
                    }
                    if(x == 0) element.append('<i class="fa cm-unlock"></i>')
                }

                scope.$watch(attrs.level, function(x){
                    draw(x)
                })
            }
        }
    }
])
.factory('cmConversationFactory',[
    '$rootScope',
    'cmConversationModel',
    function ($rootScope, cmConversationModel){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            create: function(data){
                var i = 0,
                    conversation = null;

                if(typeof data !== 'undefined'){
                    while(i < instances.length){
                        if(typeof instances[i] === 'object' &&
                            instances[i].id == data.id){

                            conversation = instances[i];
                            break;
                        }
                        i++;
                    }

                    if(conversation === null){
                        conversation = new cmConversationModel(data);
                        instances.push(conversation);
                    }

                } else {
                    conversation = new cmConversationModel();
                    instances.push(conversation);
                }

                return conversation;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
])
.factory('cmConversationModel',[
    'cmConversationsAdapter',
    'cmMessageFactory',
    'cmIdentityFactory',
    'cmCrypt',
    'cmUserModel',
    'cmRecipientModel',
    'cmNotify',
    'cmObject',
    '$q',
    '$rootScope',
    function (cmConversationsAdapter, cmMessageFactory, cmIdentityFactory, cmCrypt, cmUserModel, cmRecipientModel, cmNotify, cmObject, $q, $rootScope){
        var ConversationModel = function(data){
            //Attributes:
            this.id = '',
            this.subject = '',
            this.messages = [],
            this.recipients = [],
            this.passphrase = '',
            this.created = '',
            this.lastUpdated = '',
            this.numberOfMessages = 0,
            this.encryptedPassphraseList = [];
            this.keyTransmission = 'asymmetric' || 'symmetric'
            var self = this;


            cmObject.addEventHandlingTo(this)

            $rootScope.$on('logout', function(){
                self.messages = [];
                self.recipients = [];
            });

            /**
             * Conversation Handling
             */

            this.init = function (conversation_data) {

                if(typeof conversation_data !== 'undefined'){
                    this.id                 = conversation_data.id;
                    this.subject            = conversation_data.subject;
                    this.numberOfMessages   = conversation_data.numberOfMessages;
                    this.lastUpdated        = conversation_data.lastUpdated;


                    this.encryptedPassphraseList = this.encryptedPassphraseList.concat(conversation_data.encryptedPassphraseList || [])

                    // register all recipients as Recipient objects
                    if (conversation_data.recipients) {
                        conversation_data.recipients.forEach(function (item) {
    //                        new cmRecipientModel(cmIdentityFactory.create(item.identityId)).addTo(self);
                            self.addRecipient(new cmRecipientModel(cmIdentityFactory.create(item.identityId)));
                        })
                    }

                    // register all messages as Message objects
                    if (conversation_data.messages) {
                        conversation_data.messages.forEach(function (message_data) {
                            self.addMessage(cmMessageFactory.create(message_data));
                        })
                    }
                }
            }

            this.sync = function(){
                //cmConversationsAdapter.addRecipient(this.id, identity.id)
            }

            this.save = function(){

                var deferred = $q.defer();


                if(this.id == ''){
                    if(!this.checkKeyTransmission()){
                        deferred.reject()
                        return deferred.promise
                    }

                    cmConversationsAdapter.newConversation((this.subject || '')).then(
                        function (conversation_data) {
                            self.init(conversation_data);

                            var i = 0;
                            while(i < self.recipients.length){
                                cmConversationsAdapter.addRecipient(self.id, self.recipients[i].id);
                                i++;
                            }

                            if(self.passphrase && self.checkKeyTransmission()){
                                self.encryptPassphrase()
                                self.saveEncryptedPassphraseList()
                                self.passphrase
                            }

                            deferred.resolve();
                        },

                        function(){
                            deferred.reject();
                        }
                    )
                } else {
                    deferred.resolve();
                }

                return deferred.promise;
            }

            this.update = function(){
                if(this.id != ''){
                    cmConversationsAdapter.getConversationSummary(this.id).then(
                        function(data){
                            if(self.messages.length < data.numberOfMessages){
                                var offset = 0;
                                var clearAllMessages = true;
                                if(self.messages.length > 1){
                                    offset = self.messages.length;
                                    clearAllMessages = false;
                                }
                                var limit = data.numberOfMessages - offset;

                                self.updateMessages(limit, offset, clearAllMessages);
                            }
                        }
                    )
                }

                return this;
            }

            /**
             * @TODO with timestamp
             * @returns {string}
             */
            this.getLastUpdate = function(){
                return this.lastUpdated;
            }

            /**
             * Message Handling
             */

            /**
             * add Message to Conversation
             * @param message
             * @returns {cmConversationModel.ConversationModel}
             */
            this.addMessage = function (message) {
                if(this.messages.length == 0){
                    this.messages.push(message); // kunstgriff, eine neue conversation, hat erstmal nur eine message, da is der id abgleich egal
                }else {
                    var i = 0;
                    var check = false;
                    while(i < this.messages.length){
                        if(message.id == this.messages[i].id){
                            check = true;
                            break;
                        }
                        i++;
                    }

                    if(check !== true){
                        this.messages.push(message);
                    }
                }

                message.decrypt(this.passphrase);

                return this
            };

            this.getLastMessage = function(){
                if(this.messages.length > 0){
                    return this.messages[(this.messages.length - 1)];
                }
                return null
            }

            this.updateMessages = function(limit, offset, clearMessages){
                cmConversationsAdapter.getConversation(this.id, limit, offset).then(
                    function(data){
                        if(typeof clearMessages !== 'undefined' && clearMessages !== false){
                            self.messages = [];
                        }

                        data.messages.forEach(function(message_data) {
                            self.addMessage(cmMessageFactory.create(message_data));
                        });
                    }
                )
            }

            /**
             * Recipient Handling
             */

            this.getRecipientList = function(){
                var list = []

                this.recipients.forEach(function(recipient){
                    list.push(recipient.getDisplayName())
                })

                return list.join(', ')
            }

            this.hasRecipient = function(identity){
                var check = false;

                this.recipients.forEach(function(recipient){
                    check = check || (identity.id == recipient.id)
                })

                return check
            }

            this.addRecipient = function (identity) {
                this.trigger('before-add-recipient', identity)

                if(identity && !this.hasRecipient(identity)){
                    this.recipients.push(cmRecipientModel(identity));
                }else{
                    console.warn('Recipient already present.') //@ Todo
                }

                this.trigger('after-add-recipient', identity)
                return this;
            };

            this.removeRecipient = function (identity) {
                this.trigger('before-remove-recipient', identity)

                var i = this.recipients.length;

                while (i) {
                    i--;
                    if (this.recipients[i] == identity){
                        this.recipients.splice(i, 1);
                        //identity.removeFrom ... that's the api call
                    }
                }

                this.trigger('after-remove-recipient', identity)
                return this;
            };

            /**
             * Subject Handling
             */

            this.updateSubject = function (subject) {
                if(this.id != ''){
                    cmConversationsAdapter.updateSubject(this.id, subject)
                        .then(function(){
                            self.subject = subject
                        })
                } else {
                    this.subject = subject;
                }
            };

            this.getSubjectLine = function(){
                var lastMessage = this.getLastMessage();
                return     this.subject
                        || (lastMessage ? lastMessage.from.getDisplayName() : false)
                        || this.getRecipientList()
            }

            /**
             * Crypt Handling
             */

            this.checkKeyTransmission = function(){
                var result = true

                if(this.keyTransmission == 'asymmetric' && this.getWeakestKeySize() == 0){
                    cmNotify.warn('CONVERSATION.WARN.PUBLIC_KEY_MISSING')
                    result = false
                }


                if(this.keyTransmission == 'asymmetric' && !cmUserModel.hasPrivateKey()){
                    cmNotify.warn('CONVERSATION.WARN.PRIVATE_KEY_MISSING')
                    result = false
                }

                if(this.keyTransmission == 'symmetric' && this.passphrase && !this.password){
                    cmNotify.warn('CONVERSATION.WARN.PASSWORD_MISSING')
                    result = false
                }

                console.log('check, passphrase: "'+this.passphrase+'"')

                return result
            }


            this.setKeyTransmission = function(mode){
                var old_mode = this.keyTransmission

                this.keyTransmission = mode

                if(this.checkKeyTransmission()){
                    return true
                } else {
                    //this.keyTransmission = old_mode
                    return false
                }

                //this.decryptPassphrase()
                //this.decrypt()
             }

            this.encryptPassphrase = function(){
                this.encryptedPassphraseList = [];

                if(!this.checkKeyTransmission()) return this

                if(this.keyTransmission == 'asymmetric'){
                    this.recipients.forEach(function(recipient){
                        var key_list = recipient.encryptPassphrase(self.passphrase)
                        self.encryptedPassphraseList = self.encryptedPassphraseList.concat(key_list)
                    })
                }

                if(this.keyTransmission == 'symmetric'){
                    self.encryptedPassphraseList = [{keyId: '_passwd', encryptedPassphrase: cmCrypt.encryptWithShortKey(self.password, self.passphrase)}]
                    console.log('gleich: '+ cmCrypt.decrypt(self.password, self.encryptedPassphraseList[0].encryptedPassphrase))
                }

                return this
            }

            this.saveEncryptedPassphraseList = function(){
                if(
                       this.encryptedPassphraseList
                    && this.encryptedPassphraseList.length !=0
                ){
                    cmConversationsAdapter.updateEncryptedPassphraseList(this.id, this.encryptedPassphraseList)
                }
            }

            this.decryptPassphrase = function(){
                this.passphrase = ''
                this.encryptedPassphraseList.forEach(function(item){
                    if(!self.passphrase){
                        self.passphrase = cmUserModel.decryptPassphrase(item.encryptedPassphrase) ||''
                        if(item.keyId=="_passwd"){
                            self.passphrase = cmCrypt.decrypt(self.password, item.encryptedPassphrase) || ''
                        }
                    }
                })

                return this
            }

            this.setPassphrase = function (passphrase) {
                this.passphrase = passphrase
                if(passphrase == undefined) self.passphrase = self.passphrase || cmCrypt.generatePassphrase()
                return this;
            }

            this.decrypt = function () {
                this.decryptPassphrase()
                var success = true
                if (this.passphrase) {
                    this.messages.forEach(function (message) {
                        success = success && message.decrypt(self.passphrase); //@TODO
                    })
                }
                return success
            };

            this.passphraseValid = function () {
                return !this.messages[0] || this.messages[0].decrypt(this.passphrase)
            };

            this.getWeakestKeySize = function(){
                var size = undefined
                this.recipients.forEach(function(recipient){

                    size = size != undefined ? Math.min(recipient.getWeakestKeySize(), size) : recipient.getWeakestKeySize()
                })

                size = size || 0
                return size
            }

            this.getSafetyLevel = function(){
                var level = 0;

                if(this.encryptedPassphraseList.length >= 1 && this.encryptedPassphraseList[0].keyId != "_passwd"){
                    level = 2
                }else{
                    if(this.encryptedPassphraseList.length == 1 && this.encryptedPassphraseList[0].keyId == "_passwd"){
                        level = 1
                    }else{
                        level = 0
                    }
                }


                return level
            }


            this.init(data);

        }

        return ConversationModel;
    }
])
.service('cmConversationsAdapter', [
    'cmApi',
    'cmUtil',
    function (cmApi, cmUtil){
        return {

            newConversation: function(subject) {
                return	cmApi.post({
                    url: 	'/conversation',
                    data:	{
                                subject: subject
                            }
                })
            },

            updateConversation: function(conversation){
                return cmApi.put({
                    url: '/conversation/' + conversation.id,
                    data: conversation
                });
            },

            getConversations: function(limit, offset) {
                return	cmApi.get({
                    url: '/conversations' + cmUtil.handleLimitOffset(limit,offset)
                })
            },

            getConversation: function(id, limit, offset) {
                return 	cmApi.get({
                    url: 	'/conversation/'+ id + cmUtil.handleLimitOffset(limit,offset)
                })
            },

            getConversationSummary: function(id){
                return cmApi.get({
                    url: '/conversation/' + id + '/summary'
                })
            },

            getPurl: function(id){
                return cmApi.get({
                    url:'/purl/' + id
                })
            },

            addRecipient: function(id_converation, id_identity_recipient){
                return	cmApi.post({
                            url:	'/conversation/%1/recipient'.replace(/%1/, id_converation),
                            data:	{
                                        recipients: [id_identity_recipient]
                                    }
                        })
            },

            removeRecipient: function(id, recipient_id){
                return	cmApi.delete({
                            url:	'/conversation/%1/recipient/%2'.replace(/%1/, id).replace(/%2/, recipient_id)
                        })
            },

            updateSubject: function(id, subject){
                return  cmApi.put({
                            url:    '/conversation/%1'.replace(/%1/, id),
                            data:   {
                                        subject: subject
                                    }
                        })
            },

            sendMessage: function(id, message){
                return	cmApi.post({
                            url:	"/conversation/%1/message".replace(/%1/, id),
                            data: 	message
                        })
            },

            updateEncryptedPassphraseList: function(id, encryptedPassphraseList){
                return  cmApi.post({
                            url:    "/conversation/%1/encryptedPassphraseList".replace(/%1/, id),
                            data:   {encryptedPassphraseList : encryptedPassphraseList}
                        })
            },

            getEncryptedPassphraseList: function(id){
                return  cmApi.get({
                            url:    "/conversation/%1/encryptedPassphraseList".replace(/%1/, id)
                        })
            }
        }
    }
])
.service('cmConversationsModel', [
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
                        //                checkConversation.update();
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
                        self.addConversation(cmConversationFactory.create(conversation_data).update())
                    })
                }
            ).finally (function(){
                self.trigger('finish:load');
            })
        }
    }
])
.factory('cmMessageFactory',[
    '$rootScope',
    'cmMessageModel',
    function ($rootScope, cmMessageModel){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            create: function(data){
                if(typeof data !== 'undefined'){
                    var message = null;

                    if(data.id){
                        for(var i = 0; i < instances.length; i++){
                            if(typeof instances[i] === 'object' &&
                                instances[i].id == data.id){

                                message = instances[i];
                                break;
                            }
                        }
                    }

                    if(message === null){
                        message = new cmMessageModel(data);
                        instances.push(message);
                    }

                    return message;
                }

                return null;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
])
.factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmUserModel',
    function (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmUserModel){

        var Message = function(data){
            //Attributes:
            var self = this;

            //secret data:
            this.secret =   ['text', 'fileIds'],

            //public data
            this.public =   []


            this.encrypt = function (passphrase) {

                //merge secret_data into json string:

                var secret_data = {}

                this.secret.forEach(function(key){
                    if(self[key]) secret_data[key] = self[key]
                })

                var secret_JSON = JSON.stringify(secret_data)

                this.encryptedData = cmCrypt.encryptWithShortKey(passphrase, secret_JSON) //@ TODO!!!!

                return this;
            }

            this.decrypt = function (passphrase) {
                var decrypted_data = JSON.parse(cmCrypt.decrypt(passphrase, this.encryptedData))

                //expose data on message Object
                angular.extend(self, decrypted_data) // watch out: this only work for simple properties, "from" will break

                return !!decrypted_data
            }

            /**
             * add to local conversation object
             * @param conversation
             * @returns {cmMessageModel.Message}
             */
            this.addTo = function(conversation){
                conversation.addMessage(self);

                return this;
            }

            /**
             * send message to backend object
             * @param conversation
             * @returns {*|Promise|!Promise.<RESULT>}
             */
            this.sendTo = function (conversationId) {
                return  cmConversationsAdapter.sendMessage(conversationId, { body: this.encryptedData })
                        .then(function (message_data) {
                            self.init(message_data)
                        })
            }

            this.isOwn = function(){
                return (cmUserModel.data.id == this.from.id)
            }

            this.init = function (message_data) {
                this.secret.decryptedData = undefined;

                if(message_data.dummy && message_data.dummy !== false){
                    this.from = cmIdentityFactory.createDummy();

                } else {
                    this.id         = message_data.id;
                    this.from       = (!message_data.fromIdentity) ? cmUserModel.data.identity : cmIdentityFactory.create(message_data.fromIdentity);
                    this.created    = message_data.created;
                    this.text       = this.text || message_data.body;
                    this.fileIds    = message_data.fileIds;

                    this.encryptedData = message_data.body;
                }

                this.decrypt('');
            }

            this.init(data);
        };

        return Message;
    }
])
.service('cmPurlModel',[
    'cmConversationsAdapter',
    'cmConversationsModel',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    '$q',
    '$rootScope',
    function(cmConversationsAdapter, cmConversationsModel, cmConversationFactory, cmUserModel, cmAuth, $q, $rootScope) {
        var self = this;

        this.purls = [];

        $rootScope.$on('logout', function(){
            self.purls = [];
        });

        function handleConversation(conversation_data){
            var conversation = cmConversationFactory.create(conversation_data);
            cmConversationsModel.addConversation(conversation);

            return conversation;
        }

        /**
         * @TODO add Function to cmUserModel to handle Guests and add Identities
         * @param identity
         */
        function handleIdentity(identity_data){
            if(identity_data.id != cmUserModel.data.id){
                cmUserModel.setIdentity(identity_data);
            }
        }

        /**
         * @param token
         */
        function handleToken(token){
            if(typeof token !== 'undefined'){
                cmUserModel.storeToken(token);
            }
        }

        this.getPurl = function(id){
            var deferred = $q.defer();

            if(typeof id !== 'undefined'){
                cmConversationsAdapter.getPurl(id).then(
                    function (data) {
                        handleIdentity(data.identity);
                        handleToken(data.token);

                        deferred.resolve(handleConversation(data.conversation));
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                )
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
])
.factory('cmRecipientModel',[
    'cmConversationsAdapter',
    'cmUserModel',
    function (cmConversationsAdapter, cmUserModel){
        var RecipientModel = function(identity){
            var self = identity;

            self.addTo = function(conversation){
                conversation.addRecipient(self);
                return self;
            }

            self.sendTo = function(conversationId){
                if(conversationId != ''){
                    cmConversationsAdapter.addRecipient(conversationId, self.id);
                }

                return self;
            }

            self.removeFrom = function(conversationId){
                if(conversationId != ''){
                    cmConversationsAdapter.removeRecipient(conversationId, self.id);
                }

                return self;
            }

            return identity
        }

        return RecipientModel;
    }
])
angular.module('comps/conversations/tpl-conversation-controls.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/tpl-conversation-controls.html',
'<div class="control"><div cm-transparent-bg ng-show="bodyVisible" ng-click="handle()"></div><div ng-show="bodyVisible" class="body"><div class="cm-form-group" ng-show="isNew"><div class="cm-form-control with-inputter"><input type="text" ng-model="conversation.subject" placeholder="{{\'CONVERSATION.PLACEHOLDER.NO_SUBJECT\'|cmTranslate}}" cm-adaptive-change /></div></div><div class="body-group"><div class="recipients-list"><cm-avatar cm-data="recipient" cm-with-name="true" cm-view="hide-owner" ng-repeat="recipient in conversation.recipients"></cm-avatar><div ng-click ="manageRecipients()" ng-if="conversation.recipients.length == 1" class="add-recipients" cm-user-rights><cm-avatar cm-view="unknown"></cm-avatar> {{\'CONVERSATION.PLACEHOLDER.ADD_RECIPIENTS\'|cmTranslate}}<cm-edge><i class="fa cm-edge-add"></i></cm-edge></div><div ng-click = "manageRecipients()" ng-if="conversation.recipients.length > 1" class="add-recipients" cm-user-rights><cm-edge ><i class="fa cm-edge-add"></i></cm-edge></div></div></div><div class="body-group"><div class="safety-levels" cm-rubber-space><div cm-weight="3"></div><div cm-weight="2"><div class="cm-safety-level level-safer" ng-class="{active:(safetyLevel==\'safer\')}" ng-click="setLevel(\'safer\')"><i class="fa cm-lock"></i><i class="fa cm-lock"></i></div></div><div cm-weight="1"></div><div cm-weight="2"><div class="cm-safety-level level-safe" ng-class="{active:(safetyLevel==\'safe\')}" ng-click="setLevel(\'safe\')"><i class="fa cm-lock"></i></div></div><div cm-weight="1"></div><div cm-weight="2"><div class="cm-safety-level level-unsafe" ng-class="{active:(safetyLevel==\'unsafe\')}" ng-click="setLevel(\'unsafe\')"><i class="fa cm-unlock"></i></div></div><div cm-weight="3"></div></div><div class="cm-center"><i class="fa cm-info"></i> {{\'CONVERSATION.PLACEHOLDER.INFO\'|cmTranslate}}</div><div ng-if="safetyLevel ==\'safe\'"><div class="cm-form-group" ><div class="cm-form-control with-inputter"><input type="text" ng-model="conversation.password" placeholder="{{ \'CONVERSATION.PLACEHOLDER.PASSWORD\'|cmTranslate}}" cm-adaptive-change/></div></div><div style="text-align:center; cursor:pointer" ng-click="conversation.decryptPassphrase(); conversation.decrypt()"><i class="fa cm-key fa-2x"></i></div></div><div style="text-align:center; cursor:pointer"><a href="#/settings"> {{\'CONVERSATION.LABEL.KEY_GENERATION\'}}</a></div></div><button ng-click="handle()" class="cm-btn" ng-if="!isNew">{{\'CONVERSATION.CONTROL.CLOSE\'|cmTranslate}} <i class="fa cm-close cm-lg-icon"></i></button><button ng-click="handle()" class="cm-btn" ng-if="isNew">{{\'CONVERSATION.CONTROL.SAVE\'|cmTranslate}} <i class="fa cm-checker cm-lg-icon"></i></button></div><div class="bar" cm-rubber-space ng-click="handle()"><div cm-weight="1" class="grip-left"><i class="fa cm-grip"></i></div><div cm-weight="8"> {{conversation.subject||\'CONVERSATION.PLACEHOLDER.NO_SUBJECT\'|cmTranslate}}<cm-safety-level level="conversation.getSafetyLevel()"></cm-safety-level><cm-recipient-counter>{{conversation.recipients.length||0}}</cm-recipient-counter></div><div cm-weight="1"></div></div></div><!--<cm-overlay id="add-recipients"><div ng-click="$emit(\'cmOverlay:hide\', \'add-recipients\')"><i class="fa cm-close fa-2x pull-right"></i><br /><div class="clearfix"></div></div><cm-contacts-list contacts-as="contact"><cm-contact-tag cm-data="contact" ng-click="selectContact(contact.identity); selected = true"><span class="separator"></span><i class="fa fa-3x" ng-class="{\'cm-checkbox\': !selected, \'cm-checkbox-right\': selected}" ng-click="editContact(contact.identity.id)"></i></cm-contact-tag></cm-contacts-list></cm-overlay>-->');
}]);
angular.module('comps/conversations/tpl-conversation-tag.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/tpl-conversation-tag.html',
'<cm-avatar cm-data="conversation.getLastMessage().from"></cm-avatar><div class="details" cm-weight="3"><div class="subject"> {{conversation.getSubjectLine()}}</div><cm-message ng-if = "conversation.getLastMessage()" cm-data = "conversation.getLastMessage()" text-only = "true" ></cm-message></div><div class="meta" cm-weight = "1"><div class="top"><cm-safety-level level="conversation.getSafetyLevel()"></cm-safety-level><span class="last-updated small"> {{conversation.getLastUpdate() | date:\'HH:mm\'}}</span></div><div class="bottom"><cm-recipient-counter>{{conversation.recipients.length||0}}</cm-recipient-counter><span class="message-count" ng-class="{\'cm-unread\' : conversation.numberOfMessages > 0}"> ({{conversation.numberOfMessages||0}}) </span></div></div>');
}]);
angular.module('comps/conversations/tpl-conversation.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/tpl-conversation.html',
'<cm-conversation-controls cm-data="conversation"></cm-conversation-controls><div id="scrollerTop"></div><div ng-repeat="message in conversation.messages" cm-scroll-to="#scrollerBottom"><cm-date-seperator ng-if="(compareDate(message.created,conversation.messages[$index - 1].created))">{{message.created | date:\'dd.MM.yyyy\'}}</cm-date-seperator><cm-message cm-data = "message" class = "{{ message.isOwn() ? \'right\' : \'\'}}" ></cm-message></div><div id="scrollerBottom"></div><div class="answer clearfix"><i class="fa cm-plus attachments with-cursor" cm-user-rights></i><div class="message" ng-class="{\'large\':cmIsGuest}"><textarea cm-resize-textarea cm-max-rows="4" ng-model="my_message_text"></textarea><i class="fa cm-smile-negative with-cursor"></i><div class="inputter"></div></div><i class="fa cm-post arrow with-cursor" ng-click="sendMessage()"></i></div><!--<section><div class="cm-tools"><iclass = "fa fa-plus-square" style = "cursor:pointer"ng-click = "show_contacts = !show_contacts"ng-hide = "show_contacts"></i><iclass = "fa fa-minus-square" style = "cursor:pointer"ng-click = "show_contacts = !show_contacts"ng-show = "show_contacts"></i>{{\'CONVERSATION.TAG.RECIPIENTS\' |cmTranslate}}:<span ng-repeat = "recipient in conversation.recipients">{{recipient.identity.getDisplayName()}}<iclass= "fa fa-times-circle"style= "cursor:pointer"ng-click= "recipient.removeFrom(conversation)"></i> {{$last? \'\' : \',\'}}</span> <cm-contacts-list ng-show ="show_contacts"></cm-contacts-list></div><div>{{\'CONVERSATION.TAG.SUBJECT\' |cmTranslate}}:<input type="text" ng-model = "conversation.subject" ng-if ="new_conversation " cm-adaptive-change><span ng-if ="!new_conversation && conversation.subject "> {{conversation.subject}} </span></div><div>{{"CONVERSATION.TAG.PASSPHRASE"|cmTranslate}}:<input type ="{{revealPassword ? \'text\' : \'password\'}}" ng-model="passphrase" cm-password-input cm-adaptive-change><i class = "fa" style = "cursor:pointer" ng-class = "{\'fa-eye\':revealPassword,\'fa-eye-slash\': !revealPassword}" ng-click = "revealPassword = !revealPassword" ></i><iclass ="fa fa-key"style ="cursor: pointer"ng-click ="generatePassphrase()"></i><iclass ="fa fa-circle"style ="color: {{passphrase_valid ? \'green\' : \'red\'}}"></i><br/><iclass = "fa fa-th-large"style = "cursor: pointer"ng-click = "show_captcha = !show_captcha"ng-hide = "new_conversation"></i><br/><divng-show = "show_captcha"><cm-captcha ></cm-captcha><br/><i class="fa fa-refresh" style ="cursor:pointer" ng-click="refreshCaptcha()"></i><button ng-click = "requestCaptcha()"> {{"CONVERSATION.LABEL.REQUEST_CAPTCHA" | cmTranslate}}</button><button ng-click = "sendCaptcha()"> {{"CONVERSATION.LABEL.SEND_CAPTCHA" | cmTranslate}}</button></div></div><br/><div class="cm-messages"><h4>{{\'CONVERSATION.TAG.MESSAGES\' |cmTranslate}}:</h4><cm-message ng-repeat= "message in conversation.messages"cm-data = "message" ></cm-message></div><button ng-disabled = "mode && mode ==\'asset\'"ng-click= "mode = \'asset\'"><i class="fa fa-paperclip"></i></button><button ng-disabled = "!mode || mode == \'message\'" ng-click= "mode = \'message\'"><i class="fa fa-keyboard-o"></i></button><div ng-show = "!mode || mode ==\'message\'"><textarea cm-message-input ng-model="my_message_text"></textarea><button ng-click="sendMessage()">{{"CONVERSATION.LABEL.SEND" | cmTranslate}}</button> <br/></div><cm-emoticons></cm-emoticons><div ng-show = "mode && mode == \'asset\'"><input type = "text" ng-model ="assetId"> <button ng-click="sendAsset()">{{"CONVERSATION.LABEL.SEND" | cmTranslate}}</button><cm-upload cm-chunk-size = "10" ng-model = "assetId" cm-passphrase="passphrase"><cm-file-input></cm-file-input>{{progress*100 | cmDigits : 2 }}%<progressbar value="progress" max="1">{{progress*100 | cmDigits : 2 }}%</progressbar><button ng-click="upload()"><i class="fa fa-upload"></i></button></cm-upload></div><br/><br/><br/><br/><br/></section>-->');
}]);
angular.module('comps/conversations/tpl-message.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('comps/conversations/tpl-message.html',
'<article class="clearfix" ng-if="!textOnly"><div ng-if="!is_my_own_message" class="avatar cm-fl"><cm-avatar cm-data="message.from"></cm-avatar></div><div class="message {{ is_my_own_message ? \'right\' : \'left\'}} cm-fl"><span class="nose {{ is_my_own_message ? \'right\' : \'left\'}}"><i class="fa {{ is_my_own_message ? \'cm-nose-right\' : \'cm-nose-left\'}}"></i></span><!--<img ng-if = "hasCaptcha" src ="{{hasCaptcha ? message.body :\'\'}}" class="img-responsive img-rounded"/>--><!--<pre ng-if = "captchaRequest">{{\'CONVERSATION.TEXT.REQUEST_CAPTCHA\' | cmTranslate}}</pre>--><!--<cm-download ng-if = "hasAsset" cm-data = "assetId" cm-passphrase = "passphrase" ><button ng-click="download()"> {{fileId}}<br/> {{fileName}} ({{fileSize | cmFileSize}}) <br/><progress value="{{progress}}" max =""></progress><br/> {{progress*100 | cmDigits : 2}}%</button></cm-download>--><!--<pre ng-if ="!(hasCaptcha || captchaRequest || hasAsset)" style ="text-align:left">{{ message.decryptedBody }}</pre>--><span class="text" ng-if="useTruncate">{{ message.text | truncate : 5 }}</span><span class="text">{{ message.text}}</span><div class="author" ng-if="!is_my_own_message"><span class="from grey">{{ message.from.getDisplayName() }}</span></div><div class="assets clearfix"><span class="date green cm-fl">{{ message.created | date:\'HH:mm\'}}</span><span class="envelope green cm-fl"><i class="fa cm-envelope-open"></i></span><span class="security green cm-fl"><cm-safety-level level ="conversation.getSafetyLevel()"></cm-safety-level></span></div></div><!--<footer>--><!--<cm-attachments></cm-attachments> &lt;!&ndash;{{ message.created }}&ndash;&gt;--><!--</footer>--></article>{{textOnly ? message.text : \'\'}}');
}]);