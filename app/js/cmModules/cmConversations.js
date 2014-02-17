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

	var cmConversations = angular.module('cmConversations', ['cmApi', 'cmLogger'])

	cmConversations.provider('cmConversations', function(){
		//config stuff here

		this.$get = [

			'$q',
			'cmApi'

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


	cmConversations.directive('cmConversation',[

		'cmConversation',

		function(cmConversation){
			return {

				restrict: 		'AE',
				transclude: 	true,
				templateUrl:	'/tpl/modules/conversations/cm-conversations',

				controller:		function($scope, $element, $attrs){
									$scope.conversation_id 		= $attrs.cmConversation ||$attrs.data
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

})