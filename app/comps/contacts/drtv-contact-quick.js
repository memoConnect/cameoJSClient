'use strict';

angular.module('cmContacts')
.directive('cmContactQuick', [

    'cmContactsModel',
    'cmIdentityFactory',
    'cmTranslate',

    function( cmContactsModel, cmIdentityFactory, cmTranslate){

        return {
            restrict:       'E',
            scope:          {
                                select          : "=cmDataSelected",
                                conversation    : "=cmDataConversation"
                            },
            templateUrl:    'comps/contacts/drtv-contact-quick.html',

            controller: function($scope, $element, $attrs){

                $scope.displayName  = ''

                $attrs.$observe("cmInput", function(value){
                    $scope.mixed = value
                })

                $scope.validateDisplayName = function(){
                    if($scope.formData.displayName == undefined
                    || $scope.formData.displayName.length == 0
                    ){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        data = {};


                    function checkDisplayName() {
                        if ($scope.formData.displayName && $scope.formData.displayName != '') {
                            data.displayName = $scope.formData.displayName;
                        }
                    }

                    function checkMixed() {
                        if ($scope.formData.mixed.length > 0
                            && $scope.formData.mixed[0].value != undefined
                            && $scope.formData.mixed[0].value != ''
                            ) {
                            data.mixed = $scope.formData.mixed[0].value;
                        }
                    }

    
                    checkDisplayName();
                    checkMixed()

                    if($scope.cmForm.$valid != false){
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.save = function(){


                    cmContactsModel
                    .addContact({
                        identity: {
                            displayName:    $scope.displayName,
                            mixed:          $scope.mixed
                        } 
                    })
                    .then(function(contact){
                        if($scope.selected)
                            $scope.selected[contact.identity.id] = true;

                        if($scope.conversation)
                            $scope.conversation.addRecipient(contact.identity);        
                    })
                }
            }
        }
    }
])
