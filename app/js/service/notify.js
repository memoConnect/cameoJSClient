'use strict';

//notification, growl;     https://github.com/marcorinck/angular-growl
//wrapper
//todo: growl directive wrappen?

app.factory('cmNotify',[
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