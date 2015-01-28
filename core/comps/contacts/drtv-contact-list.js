'use strict';

angular.module('cmContacts').directive('cmContactList',[
    'cmContactsModel', 'cmIdentityFactory', 'cmFilter',
    'cmLoader', 'cmLogger', 'cmModal', 'cmNotify', 'cmContactsAdapter',
    '$rootScope', '$timeout',
    function (cmContactsModel, cmIdentityFactory, cmFilter,
              cmLoader, cmLogger, cmModal, cmNotify, cmContactsAdapter,
              $rootScope, $timeout) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'comps/contacts/drtv-contact-list.html',

            controller: function ($scope, $element, $attrs) {
                $scope.isLoading    = false;

                $scope.contacts     = cmContactsModel.contacts;
                $scope.contactsQty  = cmContactsModel.contacts.length;

                cmContactsModel.on('start:load-contacts', function () {
                    $scope.isLoading = true;
                });

                cmContactsModel.on('finish:load-contacts', function () {
                    $scope.isLoading = false;
                });

                /**
                 * contact server search
                 */
                var loader = new cmLoader($scope);

                $scope.activateSearch = false;
                $scope.searchCameoId = {};
                $scope.results = [];

                $scope.timeout = null;

                $scope.toogleSearch = function(){
                    if($scope.activateSearch){
                        $scope.activateSearch = false;
                        $scope.results = [];
                    } else {
                        $scope.activateSearch = true;
                        $scope.sendSearch(cmFilter.get());
                    }
                };

                $scope.sendSearch = function(search){
                    if(typeof search != 'string' || search.length < 3){
                        return false;
                    }

                    loader.start();

                    if($scope.timeout != null) $timeout.cancel($scope.timeout);

                    $scope.timeout = $timeout(function(){
                        cmContactsModel.searchCameoIdentity(search).then(
                            function(data){
                                var tmp = [];
                                angular.forEach(data, function(value){
                                    tmp.push(cmIdentityFactory.create(value, true));
                                });
                                $scope.results = tmp;
                            }
                        ).finally(
                            function(){
                                loader.stop();
                            }
                        );
                    },500);

                    return true;
                };

                var filter = cmFilter.get();
                if(typeof filter == 'string' && filter != ''){
                    $scope.toogleSearch();
                }

                function onClearFilter(){
                    $scope.activateSearch = false;
                    $scope.results = [];
                }

                cmFilter.onClear('contact-list',onClearFilter);

                var filterListener = $scope.$watch('search', function(newValue){
                    if($scope.activateSearch){
                        $scope.sendSearch(newValue);
                    }
                });

                $scope.$on('$destroy', function(){
                    filterListener();
                    onClearFilter();
                });

                /**
                 * Send friendship via model to api
                 * @param id
                 */
                $scope.sendRequest = function(contact){
                    if(angular.isDefined(contact.id)){
                        cmContactsModel
                            .sendFriendRequest(contact.id, contact.message)
                            .then(
                            function(){
                                // clear from list
                                var index = $scope.results.indexOf(contact);
                                $scope.results.splice(index,1);
                                // notify
//                                cmNotify.success('CONTACTS.INFO.REQUEST.SENDED', {displayType:'modal', ttl:3000});
                                cmContactsModel.trigger('friendRequest:sent');
                                cmModal.closeAll();
                            },
                            function(){
                                cmNotify.error('CONTACTS.INFO.REQUEST.FAILED', {displayType:'modal'});
                            }
                        )
                    }
                };

                $scope.deleteFriendRequest = function(contact, withoutModal){
                    return (function(){
                        return withoutModal
                        ? $q.when()
                        : cmModal.confirm({
                            title: 'CONTACT.MODAL.DELETE_FRIENDREQUEST.HEADER',
                            text: 'CONTACT.MODAL.DELETE_FRIENDREQUEST.TEXT'
                        })
                    }()).then(function(){
                        cmContactsModel
                            .deleteFriendRequest(contact)
                    });
                }
            }
        }
    }
]);