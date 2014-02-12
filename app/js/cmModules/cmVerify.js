define([

    'angularAMD',
    'app'

], function () {
    'use strict';

    //E-mail, Phone etc. verification

    var cmVerify = angular.module('cmVerify', ['cmApi']);

    cmVerify.controller('ProfileCtrl', [

        '$scope',

        function ($scope) {
            $scope.mail = 'test@cameo.io';
            $scope.phoneNumber = '+491234567890'
        }
    ]);

    //send a verification request

    cmVerify.directive('cmVerify', [

        'cmApi',
        'cmNotify',

        function (cmApi, cmNotify) {
            return  {
                restrict    :   'AE',
                scope       :   true,
                template	:	'<span><span>{{status}}</span><button ng-click="verify()">{{"VERIFICATION.REQUEST.LABEL"|cmTranslate}}</button></span>',

                controller  :   function($scope, $element, $attrs, cmNotify) {
                                    var item 	= $attrs.cmVerify,
                                        key		= $.camelCase('verify-'+item);

                                    $scope.getStatus = function(){
                                        $scope.status = 'unknown'
                                    };

                                    $scope.verify = function(){
                                        var data = {};

                                        data[key] = true;

                                        cmApi.post('/verify', {data: data})
                                        .then(

                                            function(response){
                                                cmNotify.info('XX Request sent: '+item)
                                            },

                                            function(){
                                                cmNotify.error('XX Unable to send request: '+item)
                                            }
                                        )
                                    };

                                    $scope.getStatus()
                                }
            }
        }
    ]);
});