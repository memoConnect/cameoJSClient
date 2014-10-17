'use strict';
// E-mail, Phone etc. verification
var cmProfile = angular.module('cmProfile', ['cmCore']); //cmAuth should not be needed here

cmProfile.controller('ProfileCtrl', [
    '$scope',
    function ($scope) {
        $scope.mail = 'test@cameo.io';
        $scope.phoneNumber = '+491234567890';
    }
]);

cmProfile.service('cmProfile', [
    'cmApi',
    'cmAuth',	//should not be need here!
    '$q',
    function (cmApi, cmAuth, $q) {
        return {

            //Tells the BE to start the verification process for email, phone or some items
            initiateVerification: function (items) {
                var request = {};

                if (typeof items != 'object')
                    items = [items];

                items.forEach(function (item) {
                    request[$.camelCase('verify-' + item)] = true;
                });

                return cmApi
                .post({
                    url: '/verify',
                    data: request
                });
            },

            //Gets the status of the possibly ongoing verfication process
            getVerificationStatus: function (item) {
                var deferred = $q.defer();

                cmApi
                .get({
                    url: '/identity'
                })
                .then(
                    function (data) {
                        data[item] && data[item].verified
                            ? deferred.resolve(data[item].verified)
                            : deferred.reject(data);
                    },

                    function (data) {
                        cmLogger.error('Unable to get verfication status for' + item + '.');
                        deferred.reject(data);
                    }
                );

                return deferred.promise;
            },

            verify: function (secret) {
                return cmApi
                .get({
                    url: 'verify/' + secret
                })
            }
        }
    }
]);

//send a verification request after click on a button and report status
cmProfile.directive('cmVerify', [
    'cmProfile',
    function (cmProfile) {
        return  {
            restrict: 'AE',
            scope: true,
            template: '<span>'+
                          '<span>{{"VERIFICATION.STATUS."+status.toUpperCase()| cmTranslate}}</span>'+
                          '<button ng-click="initiate()">{{"VERIFICATION.REQUEST.LABEL"|cmTranslate}}</button>'+
                      '</span>',

            controller: function ($scope, $element, $attrs, cmProfile) {
                $scope.item = $attrs.cmVerify;

                $scope.getStatus = function () {
                    return cmProfile.getVerificationStatus($scope.item).then(
                        function (status) {
                            status
                                ? $scope.status = 'verified'
                                : null
                        }
                    )
                };

                $scope.initiate = function () {
                    cmProfile.initiateVerification($scope.item);
                    $scope.status = 'pending';
                    // TODO: use angular interval !!!
                    var interval = setInterval(function () {
                        $scope.getStatus($scope.item).then(
                            function (status) {
                                status
                                    ? clearInterval(interval)
                                    : null
                            }
                        )
                    }, 1000);
                };

                $scope.getStatus()
            }
        }
    }
]);