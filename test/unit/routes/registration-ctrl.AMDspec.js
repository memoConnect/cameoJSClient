define([
    'routes/registration/registration-ctrl',
    'angularAMD'
], function (app, angularAMD) {
    'use strict';

    describe('RegistrationCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('RegistrationCtrl', { $scope: $scope });
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });
    });
});