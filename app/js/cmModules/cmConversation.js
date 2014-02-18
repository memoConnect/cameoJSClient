define([

    'angularAMD',
    'app',
    'angular-cookies',

    'cmApi',
    'cmCrypt',
    'cmLogger',
    'util-base64',
    'util-passchk-fast'



], function () {
    'use strict';

	var cmConversation = angular.module('cmConversation', ['cmApi', 'cmLogger'])

	cmConversation.provider('cmConversation', function(){
		//config stuff here

		this.$get = [

			'$q',
			'cmApi',

			function($q, cmApi){
				return {
					getConversation: function(id, offset, limit){
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
					}

				}
			}
		]	
	})


	cmConversation.directive('cmConversation',[

		'cmConversation',

		function(cmConversation){
			return {

				restrict: 		'AE',
				templateUrl:	'tpl/modules/conversation/cm-conversation.html',
				scope:			true,

				controller:		function($scope, $element, $attrs){									
									$scope.conversation_id 		= $scope.$eval($attrs.cmConversation || $attrs.conversationId)
									$scope.conversation_offset 	= $attrs.offset
									$scope.conversation_limit 	= $attrs.limit

									cmConversation.getConversation($scope.conversation_id, 0, 10)
									.then(function(conversation){
										$scope.conversation = conversation
									})
									
									 
								}
			}
		}
	])


	cmConversation.directive('cmMessage',[

		function(){
			return {

				restrict: 		'AE',
				scope:			true,
				templateUrl:	'tpl/modules/conversation/cm-message.html',

				controller:		function($scope, $element, $attrs){

									function getMyOwnIdentity(){
										//MOCK
										return "ZVtXkxMmPj4WtLYea8ci"
									}

									$scope.message			 = $scope.$eval($attrs.cmMessage || $attrs.cmData)									
									$scope.is_my_own_message = ($scope.message.fromIdentity == getMyOwnIdentity())
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
									 	"display":			"inline-block",
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
				template:		'<i class="fa fa-paper-clip"></i>', //MOCK
				link:			function(scope, element, attrs){
									 //mocked
									 element.css({
									 	"display":			"inline-block",									 	
									 	"font-size":		"2em",
									 	"vertical-align":	"middle"
									 })
								}

				
			}
		}
	])

})