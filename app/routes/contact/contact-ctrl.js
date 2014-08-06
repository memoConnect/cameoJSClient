define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate',
    'ngload!pckCore',
    'ngload!pckUser',

], function(app){
    'use strict';

    app.register.controller('ContactCtrl',
        function(
         $scope, $rootScope, $location,$routeParams,
         cmContactsModel, cmIdentityFactory, cmUtil, cmNotify, cmHooks
        ){
            $scope.cmUtil = cmUtil;

            var isNew = $routeParams.id == 'new' ? true : false;

            $scope.formData = {
                phoneNumbers: [{value:''}],
                emails: [{value:''}]
            };

            if(isNew){
                $scope.contact = {};
                $scope.identity = {
                    displayName: '',
                    phoneNumber: '',
                    email: '',
                    exportData: function(){
                        return {
                            displayName: this.displayName,
                            phoneNumber: this.phoneNumber,
                            email: this.email
                        }
                    }
                };
                $scope.disabled = false;
                $scope.chooseAvatar = true;
            } else {
                $scope.chooseAvatar = false;
                cmContactsModel.getOne($routeParams.id).then(
                    function (data) {
                        // set data froom api
                        $scope.contact = data;
                        // get identity model
                        $scope.identity = cmIdentityFactory.create(data.identity,true);

                        //////////////////////
                        // TODO: mock workarround json in array
                        $scope.formData.phoneNumbers = [
                            $scope.identity.phoneNumber || {value:''}
                        ];
                        $scope.formData.emails = [
                            $scope.identity.email || {value:''}
                        ];
                        //////////////////////

                        // cameo user can't edit only extern end local
                        $scope.disabled = data.contactType == 'internal' ? true : false;
                    }
                );
            }

            /**
             * handle every single contact via model
             */
            $scope.startConversation = function () {
                if($scope.contact.contactType != 'pending'){
                    delete $rootScope.pendingConversation
                    if ($scope.identity) {
                        $rootScope.pendingRecipients = [$scope.identity]
                    } else {
                        cmLogger.error('Unable to find identity on contact. ' + $scope.contact)
                    }
                    $location.path('/conversation');
                }
            };

            $scope.saveUser = function(){
                // declaration
                var emptyIdentity = {
                    displayName: null,
                    email: null,
                    phoneNumber: null,
                    preferredMessageType: 'default',
                    // TODO: not implemented in BE
                    name: null,
                    surName: null,
                    phoneProvider: null,
                    groups: []
                },
                // merge given identity with default
                identity = angular.extend({}, emptyIdentity, $scope.identity.exportData());

                // validation
                //////////////////////
                // TODO: mock workarround for multiinput from array to single string
                if($scope.formData.phoneNumbers.length > 0 && $scope.formData.phoneNumbers[0].value != ''){
                    identity.phoneNumber = $scope.formData.phoneNumbers[0].value;
                    identity.preferredMessageType = 'sms';
                } else {
                    identity.phoneNumber = null;
                }
                if($scope.formData.emails.length > 0 && $scope.formData.emails[0].value != ''){
                    identity.email = $scope.formData.emails[0].value;
                    identity.preferredMessageType = 'mail';
                } else {
                    identity.email = null;
                }
                //////////////////////
                if($scope.cmForm.$invalid){
                    return false;
                }

                // everything is fine let's add the contact
                if(isNew) {
                    cmContactsModel
                    .addContact({
                        identity: identity,
                        groups: identity.groups
                    })
                    .then(
                        function () {
                            $location.path('/contacts');
                        },
                        function () {
                            cmNotify.error('CONTACT.INFO.ERROR.SAVE',{ttl:5000});
                        }
                    );
                // edit contact
                } else {
                    cmContactsModel
                    .editContact($routeParams.id, identity)
                    .then(
                        function () {
                            cmNotify.info('CONTACT.INFO.SUCCESS.EDIT',{ttl:5000,displayType:'modal'});
                        },
                        function () {
                            cmNotify.error('CONTACT.INFO.ERROR.EDIT',{ttl:5000});
                        }
                    );
                }
            };

            $scope.startTrustHandshake = function(){
                cmHooks.openKeyRequest($scope.identity)
            }
        }
    );
});
