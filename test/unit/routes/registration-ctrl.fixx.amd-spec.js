define([
    'app',
    'angularAMD',
    'routes/registration/registration-ctrl'
], function (app, angularAMD) {
    'use strict';

    define([
        'ngload!cmAuth',
        'ngload!cmNotify',
        'ngload!cmLogger'
    ], function () {

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
})