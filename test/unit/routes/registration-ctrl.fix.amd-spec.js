define([
    'angularAMD',
    'routes/registration/registration-ctrl'
], function (angularAMD) {
    'use strict';

    describe('RegistrationCtrl', function () {
        var $scope, $rootScope, $ctrl, $modelMock, promCheck;

        angularAMD.inject(function(_$rootScope_, _$controller_, $q) {
            $modelMock = {
                checkAccountName: function(){
                    promCheck = $q.defer();
                    return promCheck.promise;
                }
            };
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $ctrl = _$controller_('RegistrationCtrl', { $scope: $scope, cmAuth: $modelMock });
        })

        it('should be defined', function () {
            expect($ctrl).toBeDefined();
        })

        it('navigation equal to 1', function () {
            expect($scope.tabs.length).toEqual(1);
        })

        it('scope var showUserNameAlternatives should falsy',function(){
            expect($scope.showUserNameAlternatives).toBeFalsy();
        })
    })
})