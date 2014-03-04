define([
    'angular-mocks',
    'angularAMD',
    'cmContactsCtrl'
], function (angularMocks, angularAMD) {
    'use strict';

    describe('ContactsCtrl', function () {
        var $scope, $rootScope, $ctrl, $modelMock, promQty, promReq;

        angularAMD.inject(function(_$rootScope_, _$controller_, $q) {
            $modelMock = {
                getQuantity: function(){
                    promQty = $q.defer();
                    return promQty.promise;
                },
                getFriendRequests: function(){
                    promReq = $q.defer();
                    return promReq.promise;
                }
            };
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $ctrl = _$controller_('ContactsCtrl', { $scope: $scope, ModelContacts: $modelMock });
        })

        it('should be defined', function () {
            expect($ctrl).toBeDefined()
        })

        it('navigation equal to 4', function () {
            expect($scope.tabs.length).toEqual(4)
        })

        it('default tab is ADD', function () {
            expect($scope.tabs[1].i18n).toBe('ADD')
            expect($scope.tabs[1].default).toBeTruthy()
        })

        it('should have badges as object with contacts toEqual 1337', function(){
            expect($scope.badges.contacts).toEqual(0)
            promQty.resolve(1337);
            $scope.$digest();
            expect($scope.badges.contacts).toEqual(1337)
        })
        // TODO: mock.promise resolve not array.length toEqual 2
        xit('should have badges as object with friendRequests toEqual 2', function(){
            expect($scope.badges.friendRequests).toEqual(0)
            $scope.$apply(function() {
                promReq.resolve(['1516','moep']);
            });
            $scope.$digest();
            expect($scope.badges.friendRequests).toEqual(2)
        })
    })
})