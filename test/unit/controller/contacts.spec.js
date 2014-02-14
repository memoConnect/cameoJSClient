define(['_c/contacts', 'angularAMD'], function (app, angularAMD) {
    'use strict';

    describe('ContactsCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('ContactsCtrl', { $scope: $scope });
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });

    });
})