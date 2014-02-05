'use strict';

//Authentications Module

var cmAuth = angular.module(cmAuth, ['cmAPI'])

cmAuth.factory('cmAuth',[

	'cmAPI',

	function(cmAPI){
	    return {
	        Token: function(auth){
	            return	cmAPI.get({
	                		url: cameo.restApi+'/token',
	                		headers: {
	                    		'Authorization': 'Basic '+auth
	                		}
	            		})
	        }

	       ,createUser: function(data){
	            return	cmAPI.post({
	               			url: cameo.restApi+'/account',
	               			data: data
	            		})
	        }
	    }
	}

]);