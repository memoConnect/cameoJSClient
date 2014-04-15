define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate'
], function(app){
    'use strict';

    app.register.controller('ContactCtrl',
        function(
         $scope,
         $location,
         $routeParams,
         cmContactsModel,
         cmIdentityFactory,
         cmUtil
        ){
            $scope.cmUtil = cmUtil;

            if($routeParams.id == 'new'){
                $scope.contact = {};
                $scope.identity = {
                    phoneNumbers: [{value:""}],
                    emails: [{value:""}]
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
                        $scope.identity = cmIdentityFactory.create(data.identity);

                        //////////////////////
                        // TODO: mock workarround json in array
                        $scope.identity.phoneNumbers = [
                            $scope.identity.phoneNumber
                        ];
                        $scope.identity.emails = [
                            $scope.identity.email
                        ];
                        //////////////////////

                        // cameo user can't edit only extern end local
                        $scope.disabled = data.contactType == 'internal' ? true : false;
                    }
                );
            }

            $scope.saveUser = function(){
                // declaration
                var apiIdentity = {
                    displayName: null,
                    email: null,
                    phoneNumber: null,
                    preferredMessageType: 'default',
                    // TODO: not implemented in BE
                    name: null,
                    surName: null,
                    phoneProvider: null,
                    phoneNumbers: [],
                    emails: []
                },
                identity = angular.extend({},apiIdentity,$scope.identity);

                // validation
                // TODO: mock workarround for multiinput from array to single string
                if(identity.phoneNumbers.length > 0 && identity.phoneNumbers[0].value != ''){
                    identity.phoneNumber = identity.phoneNumbers[0].value;
                    identity.preferredMessageType = 'sms';
                }
                if(identity.emails.length > 0 && identity.emails[0].value != ''){
                    identity.email = identity.emails[0].value;
                    identity.preferredMessageType = 'mail';
                }

                // everything is fine let's add the contact
                cmContactsModel
                .addContact({
                    identity: identity,
                    groups: []
                })
                .then(
                    function(){
                        $location.path('/contacts');
                    },
                    function(){
                        cmNotify.error('CONTACT.EXTERN_CONTACT.INFO.SAVE_FAIL', {ttl: 5000});
                    }
                );
            };
        }
    );
});
