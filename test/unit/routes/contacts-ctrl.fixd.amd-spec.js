define([
    'angularAMD',
    'ngload!routes/contacts/contacts-ctrl'
], function (angularAMD) {
    'use strict';

    xdescribe('ContactsCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
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