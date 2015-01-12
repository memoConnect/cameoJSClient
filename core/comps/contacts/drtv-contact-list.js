'use strict';

angular.module('cmContacts').directive('cmContactList',[
    'cmContactsModel', 'cmIdentityFactory', 'cmFilter', 'cmLogger',
    '$rootScope','$timeout',
    function (cmContactsModel, cmIdentityFactory, cmFilter, cmLogger,
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

                $scope.searchCameoId = {};
                $scope.results = [];

                $scope.timeout = null;
                $scope.sendSearch = function(search){
                    if(typeof search != 'string' || search.length < 3){
                        return false;
                    }

                    if($scope.timeout != null) $timeout.cancel($scope.timeout);

                    $scope.timeout = $timeout(function(){
                        cmContactsModel.searchCameoIdentity(search)
                            .then(
                            function(data){
                                var tmp = [];
                                angular.forEach(data, function(value){
                                    tmp.push(cmIdentityFactory.create(value, true));
                                });
                                $scope.results = tmp;
                            }
                        );
                    },500);

                    return true;
                };

                var filter = cmFilter.get();
                if(typeof filter == 'string' && filter != ''){
                    $scope.sendSearch(filter);
                }

                var filterListener = $scope.$watch('search', function(newValue){
                    $scope.sendSearch(newValue);
                });

                $scope.$on('$destroy', function(){
                    filterListener();
                });
            }
        }
    }
]);