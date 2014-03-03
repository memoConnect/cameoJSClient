define([
    'routes/registration/registration-ctrl'
], function () {
    'use strict';

    describe('RegistrationCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('RegistrationCtrl', { $scope: $scope });
        })

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        })

        it('navigation equal to 1', function () {
            expect($scope.tabs.length).toEqual(1);
        })
    })
})