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
    .directive('cmContactCreate', [
        'cmContactsModel', 'cmIdentityFactory', 'cmUtil', 'cmNotify', 'cmLoader',
        '$q',
        function(cmContactsModel, cmIdentityFactory, cmUtil, cmNotify, cmLoader,
                 $q){

            return {
                restrict:       'AE',
                scope:          true,
                templateUrl:    'comps/contacts/drtv-contact-create.html',

                controller: function($scope, $element, $attrs){
                    $scope.cmUtil = cmUtil;
                    var loader = new cmLoader($scope);

                    $scope.disabled = false;
                    $scope.chooseAvatar = true;
                    $scope.showCameoId = true;

                    function reset(){
                        $scope.formData = {
                            displayName: '',
                            phoneNumber: '',
                            email: ''
                        };
                    }

                    reset();

                    $scope.validateForm = function(){
                        var deferred = $q.defer(),
                            objectChange = {};

                        function checkDisplayName() {
                            var value = $scope.formData.displayName;
                            if (value != undefined && value != '') {
                                objectChange.displayName = value;
                            }
                        }

                        function checkPhoneNumber() {
                            var value = $scope.formData.phoneNumber;
                            if (value != undefined && value != '') {
                                objectChange.phoneNumber = value;
                            }
                        }

                        function checkEmail() {
                            var value = $scope.formData.email;
                            if (value != undefined && value != '') {
                                objectChange.email = value;
                            }
                        }

                        checkDisplayName();
                        checkPhoneNumber();
                        checkEmail();

                        if($scope.cmForm.$valid !== false && Object.keys(objectChange).length > 0){
                            deferred.resolve(objectChange);
                        } else {
                            deferred.reject();
                        }

                        return deferred.promise;
                    };

                    $scope.saveUser = function(){
                        if(loader.isIdle())
                            return false;

                        loader.start();

                        $scope.validateForm().then(
                            function(objectChange) {
                                // everything is fine let's add the contact
                                cmContactsModel
                                    .addContact({
                                        identity: objectChange
                                    })
                                    .then(
                                        function () {
                                            $scope.gotoContactList();
                                        },
                                        function () {
                                            loader.stop();
                                            cmNotify.error('CONTACT.INFO.ERROR.SAVE', {ttl: 5000});
                                        }
                                    );
                            },
                            function(){
                                loader.stop();
                            }
                        )
                    };
                }
            }
        }
    ]);