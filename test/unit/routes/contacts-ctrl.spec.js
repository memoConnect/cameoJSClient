define([
    'angularAMD',
    'routes/contacts/contacts-ctrl'
], function (angularAMD) {
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
            expect($scope.tabs.length).toEqual(4);
        })
    })
})