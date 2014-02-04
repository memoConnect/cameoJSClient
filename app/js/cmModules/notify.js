'use strict';

//notification, growl;     https://github.com/marcorinck/angular-growl
//wrapper
//todo: growl directive wrappen?

var cmNotify = angular.module('cmNotify', ['angular-growl'])

cmNotify.config(['growlProvider', function(growlProvider) {
	//notifications should disappear after 5 seconds
    growlProvider.globalTimeToLive(5000);
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