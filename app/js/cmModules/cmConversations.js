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
											},
									exp_ok:	'messages'
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

		function(cmConversationsAdapter){

			//self:
			var conversations = []


			//Classes:

			function Conversation(data) {

				//Attributes:
				this.id = ''
				this.subject = ''
				this.messages = []
				this.recipients = []


				this.init = function(conversation_data) {				
					this.id = conversation_data.id
					this.subject = conversation_data.subject

					// register all messages as Message objects
					if(conversation_data.messages){
						conversation_data.messages.forEach(function(message_data){
							this.messages.push(new Message(message_data))
						})
					}

					// register all recipients as Recipient objects
					if(conversation_data.recipients){
						conversation_data.recipients.forEach(function(recipient_data){
							this.messages.push(new Identity(recipient_data))
						})
					}
				}

				
				typeof data == 'object'
				?	this.init(data)
				:	conversations.newConversation()
					.then( function(data) {
						this.init(data)
					})								
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


				this.init = function() {
					this.id = message_data.id
					this.body = message_data.messageBody
					this.decryptedBody = message_data.messageBody
					this.from = message_data.fromIdentity
					this.status = message_data.messageStatus
					this.lastUpdated = message_data.lastUpdated
					this.created = message_data.created     
					this.lastMessage = message_data.lastMessage
				}
			}

			function Identity(identity_id) {
				return(identity_id)
			}


			//Methods:

			conversations.newConversation = function(subject){
				return cmConversationsAdapter.newConversation(subject)
			}

			conversations.init = function() {
				cmConversationsAdapter.getConversations()
				.then( function(data) {
					data.forEach(function(conversation_data){
						conversations.push(new Conversation(conversation_data))
					})
				})
			}

			conversations.init()

			return(conversations)
		}
	])

	


	cmConversations.directive('cmConversations',[

		'cmConversations',
		'cmCrypt',

		function(cmConversations, cmCrypt){
			return {

				restrict: 		'AE',
				templateUrl:	'tpl/modules/conversation/cm-conversation.html',
				scope:			true,

				controller:		function($scope, $element, $attrs){									
									var conversation_id 		= $scope.$eval($attrs.cmConversations || $attrs.conversationId),
										conversation_subject	= $scope.$eval($attrs.cmSubject),
										conversation_offset 	= $attrs.offset,
										conversation_limit 		= $attrs.limit



									$scope.my_message_text = ""
									$scope.passphrase = ""
									$scope.show_contacts = false


									conversation_id
									?	cmConversations.getConversation($scope.conversation_id, 0, 10)
										.then(function(conversation){
											$scope.init(conversation)
										})

									:	cmConversations.newConversation($scope.conversation_subject)
										.then(function(conversation){
											$scope.init(conversation)
										})


									$scope.init = function(conversation){

										$scope.conversation = conversation

										$scope.$watch("passphrase", function(new_passphrase){
											$scope.decryptAllMessages()
										})

										$scope.$on('identity-selected', function(event, identity){
											$scope.addRecipient(identity)
										})
									}	

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

									$scope.decryptAllMessages = function() {										
										$scope.conversation.messages.forEach(function(message){
											$scope.decryptMessage(message)
										})
									}

									$scope.decryptMessage = function(message) {
										message.decryptedBody = cmCrypt.decrypt($scope.passphrase, message.messageBody)
									}

									$scope.getRandomPassphrase = function(){
										var date = new Date()
										$scope.passphrase = Base64.encode(cmCrypt.hash(Math.random()*date.getTime())).substr(5, 12)
									}
									 
								}
			}
		}
	])



	cmConversations.directive('cmMessage',[

		'cmAuth',
		'cmConversations',

		function(cmAuth){
			return {

				restrict: 		'AE',
				require:		'^cmConversation',
				scope:			true,
				templateUrl:	'tpl/modules/conversation/cm-message.html',

				controller:		function($scope, $element, $attrs){

									$scope.message			 = $scope.$eval($attrs.cmMessage || $attrs.cmData)

									//console.dir($conversationCtrl)

									$scope.decrypt = function(text) {
										cmConversations.decrypt(text)
									}

									cmAuth.getIdentity()
									.then(function(identity){
										$scope.is_my_own_message = ($scope.message.fromIdentity == identity.id)
									})
								}
			}
		}
	])



	cmConversations.directive('cmAvatar',[

		function(){
			return {
		
				restrict: 		'AE',
				template:		'<i class="fa fa-user"></i>', //MOCK

				link:			function(scope, element, attrs){
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