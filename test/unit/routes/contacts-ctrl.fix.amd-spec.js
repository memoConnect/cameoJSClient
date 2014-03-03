define([
    'angular-mocks',
    'angularAMD',
    'cmContactsCtrl'
], function (angularMocks, angularAMD) {
    'use strict';

    describe('ContactsCtrl', function () {
        var $scope, $rootScope, $ctrl, $modelMock;

        beforeEach(function(){
            angularAMD.inject(function(_$rootScope_, _$controller_, $q) {
                $modelMock = {
                    getQuantity: function(){
                        var promise = $q.defer();
                        return promise.promise;
                    },
                    getFriendRequests: function(){
                        var promise = $q.defer();
                        return promise.promise;
                    }
                };
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();
                $ctrl = _$controller_('ContactsCtrl', { $scope: $scope, ModelContacts: $modelMock });
                //$scope.$digest();
            })
        })

        it('should be defined', function () {
            expect($ctrl).toBeDefined();
        })

        it('navigation equal to 4', function () {
            console.log($scope.tabs)
            expect($scope.tabs.length).toEqual(4);
        })

        it('activeTab should be ADD', function () {
            console.log($rootScope)
            expect($rootScope.activeTab).toBe('ADD');
        })
    })
})