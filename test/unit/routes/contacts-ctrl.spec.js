define([
    'routes/contacts/contacts-ctrl',
    'angularAMD',
], function (app, angularAMD, tpl) {
    'use strict';

    describe('ContactsCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope;
            ctrl = $controller('ContactsCtrl', { $scope: $scope });
        })

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        })

        it('navigation equal to 4', function () {
            expect($scope.navigation.length).toEqual(4);
        })

        it('activeTab should be ADD', function () {
            expect($scope.activeTab).toBe('ADD');
        })

        it('setActiveTab should be a function', function () {
            expect(typeof $scope.setActiveTab).toBe('function');
        })

        it('activeTab should be WHOOPWHOOP', function () {
            $scope.setActiveTab('WHOOPWHOOP');
            expect($scope.activeTab).toBe('WHOOPWHOOP');
        })
    })
})