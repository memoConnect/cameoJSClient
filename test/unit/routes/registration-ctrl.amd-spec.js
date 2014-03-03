define([
    'app',
    'angularAMD',
    'ngload!routes/registration/registration-ctrl'
], function (app, angularAMD) {
    'use strict';

    describe('RegistrationCtrl', function () {
        var $scope, ctrl;

        angularAMD.processQueue();

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope;
            ctrl = $controller('RegistrationCtrl', { $scope: $scope });
        })

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        })
    })
})