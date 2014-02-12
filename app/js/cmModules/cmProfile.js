'use strict';

//E-mail, Phone etc. verification


var cmProfile = angular.module('cmProfile', ['cmApi', 'cmAuth']) //cmAuth should not be needed here


cmProfile.controller('ProfileCtrl', [

    '$scope',

    function ($scope) {
        $scope.mail = 'test@cameo.io'
        $scope.phoneNumber = '+491234567890'
    }
]);

cmProfile.service('cmProfile', [

	'cmApi',
	'cmAuth',	//should not be need here!
	'$q',

	function(cmApi, cmAuth, $q) {
		return {

			//Tells the BE to start the verification process for email, phone or some items		
			initiateVerification: function(items){
				var request = {}

				if(typeof items != 'object') items = [items]

				items.forEach(function(item){
					request[$.camelCase('verify-'+item)] = true
				})		

				return	cmApi.post({
							url:	'/verify',
							data: 	request
						})
			},		

			//Gets the status of the possibly ongoing verfication process
			getVerificationStatus: function(items){
				if(typeof items == 'string') items = [items]

				return cmApi.get({
							url:	'/identity',
							exp_ok:	'token'
						})
			},

			verify: function(secret){
				return	cmApi.get({
							url: 	'verify/'+secret
						})
			}
		}
	}
])


//send a verification request after click on a button and report status
cmProfile.directive('cmVerify', [

	'cmProfile',

	function (cmProfile) {
	    return  {
	        restrict    :   'AE',
	        scope       :   true,
	        template	:	'<span><span>{{"VERIFICATION.STATUS."+status.toUpperCase()| cmTranslate}}</span><button ng-click="verify()">{{"VERIFICATION.REQUEST.LABEL"|cmTranslate}}</button></span>',     

	        controller  :   function($scope, $element, $attrs, cmProfile) {	        	
	        					$scope.getStatus = function(){
	        						$scope.status = 'unknown'

	        						return	cmProfile.getVerificationStatus($attrs.cmVerify).then(
			        							function(status){
			        								status 
			        								? $scope.status = 'verified'
			        								: null
			        							}
			        						)	        						
	        					}

	        					$scope.verify = function(){
	        						cmProfile.initiateVerification($attrs.cmVerify)
	        						$scope.status = 'pending'

	        						var interval = setInterval (function(){
	        							$scope.getStatus().then(
	        								function(status){
	        									status 
	        									? clearInterval(interval)
	        									: null
	        								}
	        							)
	        						}, 1000)
	        					}

	        					$scope.getStatus()
	        				}
	    }
	}
]);
