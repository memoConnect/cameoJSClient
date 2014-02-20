define([

    'angularAMD',
    'app',
    'angular-cookies',

    'cmApi',
    'cmCrypt',
    'cmLogger',
    'cmContacts',
    'util-base64',
    'util-passchk-fast'



], function () {
    'use strict';

	var cmConversation = angular.module('cmConversation', ['cmApi', 'cmLogger', 'cmCrypt', 'cmContacts'])

	cmConversation.provider('cmConversation', function(){
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

					getConversation: function(id, offset, limit) {
						/*
						return 	cmApi.get({
									url: 	'/conversation/'+id,
									data:	{
												offset:	offset,
												limit:	limit
											},
									exp_ok:	'messages'
								})
						*/

						//Mock:
						var deferred = $q.defer()

						deferred.resolve({
						    "id": "WvbpPu2X8btdAOpA4IRF",
						    "messages": [
						      {
						        "id": "vwUmVfjkn5lXXwXGvxzS",
						        "messageBody": "text",
						        "fromIdentity": "ZVtXkxMmPj4WtLYea8cix",
						        "messageStatus": [
						          {
						            "identityId": "s29FpU4TFhxXOdRGfzLk",
						            "status": "queued",
						            "message": "default"
						          },
						          {
						            "identityId": "V8SXRiE4o1lfN2WmGf0S",
						            "status": "queued",
						            "message": "sms"
						          },
						          {
						            "identityId": "j07EKjJiGOXdfx2wqs0N",
						            "status": "queued",
						            "message": "default"
						          }
						        ],
						        "created": "22.01.2014 16:34:55"
						      },
						      {
						        "id": "6ftwTSBMiQfmlOphLND3",
						        "messageBody": "text2",
						        "fromIdentity": "ZVtXkxMmPj4WtLYea8ci",
						        "messageStatus": [
						          {
						            "identityId": "s29FpU4TFhxXOdRGfzLk",
						            "status": "queued",
						            "message": "default"
						          },
						          {
						            "identityId": "V8SXRiE4o1lfN2WmGf0S",
						            "status": "queued",
						            "message": "sms"
						          },
						          {
						            "identityId": "j07EKjJiGOXdfx2wqs0N",
						            "status": "queued",
						            "message": "default"
						          }
						        ],
						        "created": "22.01.2014 16:34:55"
						      },
						      {
						        "id": "O5uz1fBnuWFRwnqOCGuN",
						        "messageBody": "text3",
						        "fromIdentity": "ZVtXkxMmPj4WtLYea8cix",
						        "messageStatus": [
						          {
						            "identityId": "s29FpU4TFhxXOdRGfzLk",
						            "status": "queued",
						            "message": "default"
						          },
						          {
						            "identityId": "V8SXRiE4o1lfN2WmGf0S",
						            "status": "queued",
						            "message": "sms"
						          },
						          {
						            "identityId": "j07EKjJiGOXdfx2wqs0N",
						            "status": "queued",
						            "message": "default"
						          }
						        ],
						        "created": "22.01.2014 16:34:55"
						      }
						    ],
						    "numberOfMessages": 3,
						    "created": "22.01.2014 16:34:55",
						    "lastUpdated": "22.01.2014 16:34:55",
						    "recipients": [
						      {
						        "id": "s29FpU4TFhxXOdRGfzLk",
						        "displayName": "NoName"
						      },
						      {
						        "id": "V8SXRiE4o1lfN2WmGf0S",
						        "displayName": "Ulrich"
						      },
						      {
						        "id": "j07EKjJiGOXdfx2wqs0N",
						        "displayName": "Aaron"
						      }
						    ]
						})

						return deferred.promise
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



	cmConversation.directive('cmConversation',[

		'cmConversation',
		'cmCrypt',

		function(cmConversation, cmCrypt){
			return {

				restrict: 		'AE',
				templateUrl:	'tpl/modules/conversation/cm-conversation.html',
				scope:			true,

				controller:		function($scope, $element, $attrs){									
									var conversation_id 		= $scope.$eval($attrs.cmConversation || $attrs.conversationId),
										conversation_subject	= $scope.$eval($attrs.cmSubject),
										conversation_offset 	= $attrs.offset,
										conversation_limit 		= $attrs.limit



									$scope.my_message_text = ""
									$scope.passphrase = ""
									$scope.show_contacts = false


									conversation_id
									?	cmConversation.getConversation($scope.conversation_id, 0, 10)
										.then(function(conversation){
											$scope.init(conversation)
										})

									:	cmConversation.newConversation($scope.conversation_subject)
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

										cmConversation.sendMessage($scope.conversation.id, encrypted_message_text)
										.then(function(message){
											$scope.decryptMessage(message)
											$scope.conversation.messages.push(message)
											$scope.my_message_text = ""
										})
									}

									$scope.addRecipient = function(recipient){
										cmConversation.addRecipient($scope.conversation.id, recipient.id)
										.then(function(){
											//Das sollte besser gleich in cmConversation passieren
											$scope.conversation.recipients.push({
												//VORLÄUFIG!:
												id: recipient.id,
												displayName: recipient.cameoId
											}) 
										})
									}

									$scope.removeRecipient = function(recipient){
										cmConversation.removeRecipient($scope.conversation.id, recipient.id)
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
									 
								}
			}
		}
	])



	cmConversation.directive('cmMessage',[

		'cmAuth',
		'cmConversation',

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
										cmConversation.decrypt(text)
									}

									cmAuth.getIdentity()
									.then(function(identity){
										$scope.is_my_own_message = ($scope.message.fromIdentity == identity.id)
									})
								}
			}
		}
	])



	cmConversation.directive('cmAvatar',[

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


	cmConversation.directive('cmAttachments',[

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

	cmConversation.directive('cmMessageInput',[

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

	cmConversation.directive('cmPassphrase',[

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
							                    ngModelCtrl.$setViewValue(element.val())
							                    scope.refresh()
							                })
										},500)
									})

									scope.refresh = function(){
										element.val()
										?	status.addClass('fa-lock').removeClass('fa-unlock')
										:	status.addClass('fa-unlock').removeClass('fa-lock')	
									}

									scope.refresh()
								}

			}
		}
	])


})