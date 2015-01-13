'use strict';

angular.module('cmContacts').directive('cmContactList',[
    'cmContactsModel', 'cmIdentityFactory', 'cmFilter', 'cmLoader', 'cmLogger',
    '$rootScope','$timeout',
    function (cmContactsModel, cmIdentityFactory, cmFilter, cmLoader, cmLogger,
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
            }
        }
    }
]);