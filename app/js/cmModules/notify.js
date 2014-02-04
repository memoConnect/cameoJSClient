'use strict';

//notification, growl;     https://github.com/marcorinck/angular-growl
//wrapper
//todo: growl directive wrappen?

var cmNotify = angular.module('cmNotify', ['angular-growl'])

cmNotify.config(['growlProvider', function(growlProvider) {
	//notifications should disappear after 5 seconds
    growlProvider.globalTimeToLive(5000);
}]);

cmNotify.config(['growlProvider', '$httpProvider', function(growlProvider, $httpProvider) {
	//intercept messages from Backend:
	/*
		{
			"someOtherData": {...},
			"messages": [
			    {"text":"this is a server message", "severity": "warn"},
			    {"text":"this is another server message", "severity": "info"},
			    {"text":"and another", "severity": "error"}
			]
		}
	*/
	//if the backend respond with the above json 'messages' will be fetched:

	growlProvider.messagesKey("message");
    growlProvider.messageTextKey("text");
    growlProvider.messageSeverityKey("severity");
    $httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);
}]);

cmNotify.service('cmNotify', [
	'growl',
	function(growl){
		return {
			warn:		function(msg){
							growl.addWarnMessage(msg);
						},
			info:		function(msg){
							growl.addInfoMessage(msg);
						},
			success:	function(msg){
							growl.addSuccessMessage(msg);
						},
			error:		function(msg){
							growl.addErrorMessage(msg);
						}
		}
	}
])

//does not work:
cmNotify.directive('cmNotify', ['growlDirective', function(growlDirective){ return growlDirective }])