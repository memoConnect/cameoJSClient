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
         cmUtil,
         cmNotify
        ){
            $scope.cmUtil = cmUtil;

            var isNew = $routeParams.id == 'new' ? true : false;

            if(isNew){
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
                            $scope.identity.phoneNumber || {value:''}
                        ];
                        $scope.identity.emails = [
                            $scope.identity.email || {value:''}
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
                    emails: [],
                    groups: []
                },
                identity = angular.extend({},apiIdentity,$scope.identity);

                // validation
                //////////////////////
                // TODO: mock workarround for multiinput from array to single string
                if(identity.phoneNumbers.length > 0 && identity.phoneNumbers[0].value != ''){
                    identity.phoneNumber = identity.phoneNumbers[0].value;
                    identity.preferredMessageType = 'sms';
                }
                if(identity.emails.length > 0 && identity.emails[0].value != ''){
                    identity.email = identity.emails[0].value;
                    identity.preferredMessageType = 'mail';
                }
                //////////////////////
                if($scope.form.displayName.$invalid){
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
                            cmNotify.error('CONTACT.INFO.ERROR.CREATE',{ttl:5000});
                        }
                    );
                // edit contact
                } else {
                    cmContactsModel
                    .editContact($routeParams.id, identity)
                    .then(
                        function () {
                            cmNotify.success('CONTACT.INFO.SUCCESS.EDIT',{ttl:5000});
                        },
                        function () {
                            cmNotify.error('CONTACT.INFO.ERROR.EDIT',{ttl:5000});
                        }
                    );
                }
            };
        }
    );
});
