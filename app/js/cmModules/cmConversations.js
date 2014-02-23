define([

    'angularAMD',
    'app',
    'angular-cookies',

    'cmApi',
    'cmCrypt',
    'cmLogger',
    'cmContacts',
    'util-base64',
    'util-passchk-fast',    
   '_v/captchagen/captchagen',


], function () {
    'use strict';

	var cmConversations = angular.module('cmConversations', ['cmApi', 'cmLogger', 'cmCrypt', 'cmContacts'])

	cmConversations.provider('cmConversationsAdapter', function(){
		//config stuff here

		this.$get = [

			'$q',
			'cmApi',

			function($q, cmApi){
				return {

					newConversation: function(subject) {
						return	cmApi.post({
									url: 	'/conversation',
									data:	{
												subject: subject
											}
								})
					},

					getConversations: function(offset, limit) {						
						return	cmApi.get({
									url: 	'/conversations',
									data:	{
												offset:	offset,
												limit:	limit
											},
									//exp_ok:	'messages'
								})		
					},

					getConversation: function(id, offset, limit) {
						return 	cmApi.get({
									url: 	'/conversation/'+id,
									data:	{
												offset:	offset,
												limit:	limit
											}
								})						
					},

					addRecipient: function(id, recipient_id){
						return	cmApi.post({
									url:	'/conversation/%1/recipient'.replace(/%1/, id),
									data:	{
												recipients: [recipient_id]
											}
								})
					},

					removeRecipient: function(id, recipient_id){
						return	cmApi.delete({
									url:	'/conversation/%1/recipient/%2'.replace(/%1/, id).replace(/%2/, recipient_id)
								})	
					},

					sendMessage: function(id, messageBody){
						return	cmApi.post({
									url:	"/conversation/%1/message".replace(/%1/, id),
									data: 	{
												messageBody: messageBody
											}							
								})
					}

				}
			}
		]	
	})


	cmConversations.service('cmConversationsModel', [

		'cmConversationsAdapter',
		'cmCrypt',
		'$q',
		'cmAuth',

		function(cmConversationsAdapter, cmCrypt, $q, cmAuth){

			//self:
			var conversations = []



			//Methods:

			conversations.createConversation = function(subject) {			
				var deferred = $q.defer()

				cmConversationsAdapter.newConversation(subject)
				.then( function(conversation_data){
					var conversation = new Conversation(conversation_data)

					conversations.push(conversation)
					deferred.resolve(conversation)					
				})

				return  deferred.promise
			}

			//nicht schön:
			conversations.getConversation = function(id) {				
				var deferred = $q.defer()

				cmConversationsAdapter.getConversation(id)
				.then(

					function(conversation_data){
						deferred.resolve(new Conversation(conversation_data))
					},

					function(){ deferred.reject() }
				)

				return	deferred.promise
			}

			conversations.init = function() {				
				cmConversationsAdapter.getConversations()
				.then( function(data) {						
					data.forEach(function(conversation_data){						
						conversations.push(new Conversation(conversation_data))
					})
				})
			}





			//Classes:

			function Conversation(data) {

				//Attributes:
				this.id 		= ''
				this.subject 	= ''
				this.messages 	= []
				this.recipients = []
				this.passphrase = ''
				this.count		= 0

				var self = this


				this.init = function(conversation_data) {				
					this.id 		= conversation_data.id
					this.subject 	= conversation_data.subject
					this.count		= conversation_data.numberOfMessages

					// register all messages as Message objects
					if(conversation_data.messages){
						conversation_data.messages.forEach(function(message_data){
							self.addMessage(new Message(message_data))
						})
					}

					// register all recipients as Recipient objects
					if(conversation_data.recipients){
						conversation_data.recipients.forEach(function(recipient_data){
							self.addRecipient(new Recipient(recipient_data))
						})
					}
				}

				this.addMessage = function(message){					
					this.messages.push(message)
					if(this.passphrase) message.decryptWith(this.passphrase)
					return this
				}				

				this.addRecipient = function(recipient){
					this.recipients.push(recipient)										
					return this
				}

				this.removeRecipient = function(recipient) {
					var i = this.recipients.length

					while(i){ i--
						if(this.recipients[i] == recipient) this.recipients.splice(i,1)
					}
					return this
				}

				this.newMessage = function(message_data) {
					var message_data = (typeof message_data == 'string' ? {messageBody : message_data} : message_data )
					return new Message( message_data )
				}

				this.newRecipient = function(identity_data) {										
					var identity_data = (typeof identity_data == 'string' ? {id : identity_data} : identity_data )					
					return new Recipient( identity_data )
				}

				this.setPassphrase = function(passphrase) {
					this.passphrase = passphrase
					return this
				}

				this.decrypt = function() {
					if(this.passphrase){
						this.messages.forEach(function(message){
							message.decryptWith(self.passphrase)
						})
					}
				}

				this.update = function() {
					cmConversationsAdapter.getConversation(this.id)
					.then(
						function(data){
							console.dir(data)
						}
					)
				}
				
				this.init(data)			
			}




			function Message(message_data) {

				//Attributes:
				this.id 			= ''
				this.body 			= ''
				this.decryptedBody 	= ''
				this.from 			= ''
				this.status 		= ''
				this.lastUpdated 	= ''
				this.created 		= ''
				this.lastMessage 	= ''

				var self = this

				this.encryptWith = function(passphrase) {
					this.body = cmCrypt.encryptWithShortKey(passphrase, this.body) 					
					return this
				}

				this.decryptWith = function(passphrase) {
					this.decryptedBody = cmCrypt.decrypt(passphrase, this.body)
					return this
				}

				this.sendTo = function (conversation) {
					return	cmConversationsAdapter.sendMessage(conversation.id, this.body)
							.then(function(message_data){
								conversation.addMessage(new Message(message_data))
							})
				}

				this.init = function(message_data) {
					this.id 			= message_data.id
					this.body 			= message_data.messageBody
					this.decryptedBody 	= message_data.messageBody
					this.from 			= message_data.fromIdentity
					this.status 		= message_data.messageStatus
					this.lastUpdated 	= message_data.lastUpdated
					this.created 		= message_data.created     
					this.lastMessage 	= message_data.lastMessage
				}

				this.init(message_data)
			}



			function Recipient(itdentity_data) {
				this.id 			= ''
				this.displayName	= ''

				var self = this

				this.addTo = function(conversation) {					
					return 	cmConversationsAdapter.addRecipient(conversation.id, this.id)
							.then(function(){ conversation.addRecipient(self) })					
				}

				this.removeFrom = function(conversation) {
					return	cmConversationsAdapter.removeRecipient(conversation.id, this.id)
							.then(function(){ conversation.removeRecipient(self) })					
				}

				this.init = function(identity_data) {					
					this.id 			= identity_data.id
					this.displayName	= identity_data.displayName || identity_data.cameoId || identity_data.id
				}

				this.init(itdentity_data)				
			}





			conversations.init()

			return conversations
		}
	])

	


	cmConversations.directive('cmConversation',[

		'cmConversationsModel',
		'cmCrypt',
		'cmLogger',

		function(cmConversationsModel, cmCrypt, cmLogger){
			return {

				restrict: 		'AE',
				templateUrl:	'tpl/modules/conversation/cm-conversation.html',
				scope:			true,

				controller:		function($scope, $element, $attrs){	
									var conversation_id 		= $scope.$eval($attrs.cmConversations) || $scope.$eval($attrs.conversationId),
										conversation_subject 	= $scope.$eval($attrs.cmSubject),
										conversation_offset 	= $attrs.offset,
										conversation_limit 		= $attrs.limit

									conversation_id
									?	cmConversationsModel.getConversation(conversation_id, conversation_offset, conversation_limit)
										.then(function(conversation){											
											$scope.init(conversation)
										})

									:	cmConversationsModel.createConversation(conversation_subject)
										.then(function(conversation){
											$scope.init(conversation)
										})

									
									$scope.init = function(conversation){

										$scope.conversation 	= conversation
										$scope.my_message_text 	= ""
										$scope.passphrase 		= ""
										$scope.show_contacts 	= false

										$scope.$watch("passphrase", function(new_passphrase){
											$scope.conversation.setPassphrase(new_passphrase)
											$scope.conversation.decrypt()
										})

										$scope.$on('identity-selected', function(event, identity_data){
											identity_data
											?	$scope.conversation
												.newRecipient(identity_data)
												.addTo($scope.conversation)
											:	null
										})										

										$scope.conversation.update()
									}	


									$scope.sendMessage = function(){
										$scope.my_message_text
										?	$scope.conversation										
											.newMessage($scope.my_message_text)
											.encryptWith($scope.passphrase) 
											.sendTo($scope.conversation)
										:	null

										$scope.my_message_text = ""
									}

									$scope.generatePassphrase = function(){
										var date = new Date()
										$scope.passphrase = Base64.encode(cmCrypt.hash(Math.random()*date.getTime())).substr(5, 10)
									}
									
									/*
									var conversation_id 		= $scope.$eval($attrs.cmConversations || $attrs.conversationId),
										conversation_subject	= $scope.$eval($attrs.cmSubject),
										

									$scope.sendMessage = function(message){
										
										var encrypted_message_text = cmCrypt.encryptWithShortKey($scope.passphrase, $scope.my_message_text) 

										cmConversations.sendMessage($scope.conversation.id, encrypted_message_text)
										.then(function(message){
											$scope.decryptMessage(message)
											$scope.conversation.messages.push(message)
											$scope.my_message_text = ""
										})
									}

									$scope.addRecipient = function(recipient){
										cmConversations.addRecipient($scope.conversation.id, recipient.id)
										.then(function(){
											//Das sollte besser gleich in cmConversations passieren
											$scope.conversation.recipients.push({
												//VORLÄUFIG!:
												id: recipient.id,
												displayName: recipient.cameoId
											}) 
										})
									}

									$scope.removeRecipient = function(recipient){
										cmConversations.removeRecipient($scope.conversation.id, recipient.id)
										.then(function(){
											var index

											$scope.conversation.recipients.forEach(function(rec, i){
												if(rec.id == recipient.id) index = i
											})

											$scope.conversation.recipients.splice(index,1)
										})
									}

																	

									*/
									 
								}
			}
		}
	])



	cmConversations.directive('cmMessage',[

		'cmAuth',

		function(cmAuth){
			return {

				restrict: 		'AE',
				require:		'^cmConversation',
				scope:			true,
				templateUrl:	'tpl/modules/conversation/cm-message.html',

				controller:		function($scope, $element, $attrs){

									$scope.message = $scope.$eval($attrs.cmData) || $scope.$eval($attrs.cmMessage)									

									$scope.message.decryptWith($scope.passphrase)							

									cmAuth.getIdentity()
									.then(function(identity){
										$scope.is_my_own_message = ($scope.message.from == identity.id)
									})
								}
			}
		}
	])

	cmConversations.directive('cmAvatar',[

		function(){
			return {
		
				restrict:	'AE',
				template:	'<i class="fa fa-user"></i>', //MOCK

				link:		function(scope, element, attrs){
								 //mocked, get avatar pic an set background of element
								 element.css({
								 	"cssFloat":			"left",
								 	"font-size":		"3em",
								 	"vertical-align":	"top",
								 	"padding-right":	"0.3em"
								 })
							}

				
			}
		}
	])


	cmConversations.directive('cmAttachments',[

		function(){
			return {

				restrict: 		'AE',
				template:		'<i class="fa fa-paperclip"></i>', //MOCK

				link:			function(scope, element, attrs){
									 //mocked
									 element.css({								 	
									 	"font-size":		"2em",
									 	"vertical-align":	"middle"
									 })
								}

				
			}
		}
	])

	cmConversations.directive('cmMessageInput',[

		function(){
			return {

				restrict: 		'A',
				require:		'^cmConversation',
				scope:			false,

				link:			function(scope, element, attrs){									

									element.css({
										"overflow": 	"hidden",
										"resize":		"none"
									})

									function resize(){
										var ta = element[0]

										while (
											ta.rows > 1 &&
											ta.scrollHeight < ta.offsetHeight
										){
											ta.rows--
										}
										var h = 0;
										while (ta.scrollHeight > ta.offsetHeight && h!==ta.offsetHeight)
										{
											h = ta.offsetHeight
											ta.rows++
										}
										ta.rows++
									}

									element.on('keyup redo undo change', function(){										
										resize()										
									})


									resize()
								}
				
			}
		}
	])




	cmConversations.directive('cmPassphrase',[

		function() {
			return {

				restrict: 		'A',
				require:		'ngModel',
				scope:			false,

				link:			function(scope, element, attrs, ngModelCtrl){									
									//inputs with this directive will not update the scope on simple keydown-events

									var status = angular.element('<i></i>').addClass('fa'),
										timeout

									element.after(status)

									element
									.unbind('input')
									.unbind('keydown')
									.on('keydown', function(){
										window.clearTimeout(timeout)

										timeout = window.setTimeout(function(){
											scope.$apply(function() {							                    
							                    scope.refresh()
							                })
										},500)
									})

									scope.refresh = function(){
										element.val()
										?	status.addClass('fa-lock').removeClass('fa-unlock')
										:	status.addClass('fa-unlock').removeClass('fa-lock')	

										ngModelCtrl.$setViewValue(element.val())
									}

									scope.refresh()
									scope.$watch('passphrase', scope.refresh)
								}

			}
		}
	])



	cmConversations.directive('cmCaptcha',[

		function(){
			return {

				restrict: 		'AE',
				require:		'^cmConversation',			
				template:		'<canvas id="canvas" width="100" height="37"></canvas>', //MOCK

				controller:		function($scope, $element, $attrs){
   
						            var captcha;

						            $scope.captchaDim = "700x150";
						            $scope.captchaFont = "sans";

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

						            $scope.create();        
								}

				
			}
		}
	])



})