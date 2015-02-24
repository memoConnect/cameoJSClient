'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

angular.module('cmContacts')
.directive('cmContactImport', [
    'cmContactsModel', 'cmUtil', 'cmNotify', 'cmLocalContacts', 'cmLoader', 'cmModalContactImport',
    '$rootScope', '$q',
    function(cmContactsModel, cmUtil, cmNotify, cmLocalContacts, cmLoader, cmModalContactImport,
             $rootScope, $q){

        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'comps/contacts/drtv-contact-import.html',

            controller: function($scope, $element, $attrs){
                $scope.cmUtil = cmUtil;
                var loader = new cmLoader($scope);

                function resetErrors(){
                    $scope.error = {
                        displayName: false,
                        selectPhoneNumber: false,
                        selectEmail: false
                    };
                }

                function reset(){
                    resetErrors();

                    $scope.formData = {
                        displayName: '',
                        phoneNumbers: [{value:'',type:''}],
                        emails: [{value:'',type:''}],
                        selected: {
                            phoneNumber: '',
                            email: ''
                        }
                    };
                }

                reset();

                $scope.chooseContact = function(){
                    cmLocalContacts.selectOne().then(
                        function (contact) {
                            reset();
                            if(contact.displayName == '')
                                contact.displayName = undefined;

                            $scope.formData.displayName = contact.displayName || 'name' in contact ? contact.name.formatted : '';

                            if(contact.phoneNumbers != null && contact.phoneNumbers.length > 0) {
                                $scope.formData.phoneNumbers = contact.phoneNumbers;
                            }

                            if(contact.emails != null && contact.emails.length > 0) {
                                $scope.formData.emails = contact.emails;
                            }
                        }
                    )
                };

                $scope.chooseItem = function(item, type){
                    switch(type){
                        case 'phone':
                            if($scope.formData.phoneNumber != item.value)
                                $scope.formData.phoneNumber = item.value;
                            else
                                $scope.formData.phoneNumber = '';
                        break;
                        case 'email':
                            if($scope.formData.email != item.value)
                                $scope.formData.email = item.value;
                            else
                                $scope.formData.email = '';
                        break;
                    }
                };

                $scope.isSelected = function(item, type){
                    return item.value != '' && item.value == $scope.formData[type];
                };

                $scope.validateForm = function(){
                    resetErrors();

                    var deferred = $q.defer(),
                        objectChange = {},
                        isValid = true;

                    function checkDisplayName() {
                        var value = $scope.formData.displayName;
                        if (value == '') {
                            $scope.error.displayName = true;
                            isValid = false;
                        } else {
                            objectChange.displayName = value;
                        }
                    }

                    function checkSelection(){
                        var valuePhone = $scope.formData.phoneNumber,
                            valueEmail = $scope.formData.email;
                        // both is empty
                        if(valuePhone == '' && valueEmail == ''
                        || !valuePhone && !valueEmail){
                            $scope.error.selectPhoneNumber = true;
                            $scope.error.selectEmail = true;
                            isValid = false;
                        } else {
                            if(valuePhone && valuePhone != '')
                                objectChange.phoneNumber = valuePhone;
                            if(valueEmail && valueEmail != '')
                                objectChange.email = valueEmail;
                        }
                    }

                    checkDisplayName();
                    checkSelection();

                    if(isValid !== false && Object.keys(objectChange).length > 0){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.importContact = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(objectChange) {
                            cmContactsModel
                            .addContact({
                                identity: objectChange
                            })
                            .then(
                                function (data) {
                                    loader.stop();
                                    return new cmModalContactImport(data);
                                },
                                function () {
                                    loader.stop();
                                    cmNotify.error('CONTACT.INFO.ERROR.SAVE', {ttl: 5000});
                                    return $q.reject();
                                }
                            )
                            .finally(function(){
                                loader.stop();
                                $scope.gotoContactList();
                            })

                        },
                        function(){
                            loader.stop();
                        }
                    );
                };

                // init
                if(cmLocalContacts.canRead()) {
                    $scope.chooseContact();
                } else {
                    $rootScope.goBack();
                    return false;
                }
            }
        }
    }
]);