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
						return 	cmApi.get({
									url: 	'/conversation/'+id,
									data:	{
												offset:	offset,
												limit:	limit
											},
									exp_ok:	'messages'
								})
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
				templateUrl:	'tpl/modules/conversation/cm-message.html',

				controller:		function($scope, $element, $attrs){
									$scope.message		= $attrs.data									 
								}
			}
		}
	])

})