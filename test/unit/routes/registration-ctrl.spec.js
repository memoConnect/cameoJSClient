define([
    'angularAMD',
    'ngload!routes/registration/registration-ctrl'
], function (angularAMD) {
    'use strict';

    describe('RegistrationCtrl', function () {
        var $scope, ctrl;

        angularAMD.processQueue();

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('RegistrationCtrl', { $scope: $scope });
        })

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        })
    })
})