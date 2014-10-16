'use strict';

angular.module('cmContacts')
.directive('cmContactQuick', [

    'cmContactsModel',
    'cmIdentityFactory',
    'cmTranslate',
    'cmLoader',
    '$q',

    function(cmContactsModel, cmIdentityFactory, cmTranslate, cmLoader,
             $q){

        return {
            restrict:       'E',
            scope:          {
                                select          : "=cmDataSelected",
                                conversation    : "=cmDataConversation"
                            },
            templateUrl:    'comps/contacts/drtv-contact-quick.html',

            controller: function($scope, $element, $attrs){
                var loader = new cmLoader($scope);

                $scope.displayName = '';

                $attrs.$observe("cmInput", function(value){
                    $scope.mixed = value;
                });

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        data = {};

                    function checkDisplayName() {
                        if ($scope.displayName && $scope.displayName != '') {
                            data.displayName = $scope.displayName;
                        }
                    }

                    function checkMixed() {
                        if ($scope.mixed.length > 0
                            && $scope.mixed[0].value != undefined
                            && $scope.mixed[0].value != ''
                            ) {
                            data.mixed = $scope.mixed[0].value;
                        }
                    }

    
                    checkDisplayName();
                    checkMixed();

                    if($scope.cmForm.$valid != false){
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.save = function(){
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm()
                    .then(
                        function(){
                            return cmContactsModel
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

                                        // reset
                                        $scope.displayName = '';
                                        $scope.mixed = '';
                                        loader.stop();
                                    }, function(){
                                        loader.stop();
                                    });
                        },
                        function(){
                            $scope.cmForm.mixed.$invalid = true;
                            loader.stop();
                        }
                    );
                };
            }
        }
    }
]);