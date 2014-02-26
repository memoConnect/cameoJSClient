define([
    'app',
    'angularAMD'
], function (app, angularAMD) {
    'use strict';

    describe('angularAMD', function () {
        it('is created.', function () {
            expect(angularAMD).toBeDefined();
        });

        it('app is defined.', function () {
            expect(app.name).toBe(angularAMD.appname());
        });

        it('app.register should be an object', function () {
            expect(typeof app.register).toBe('object');
        });

        it('app.register.controller should be a function', function () {
            expect(typeof app.register.controller).toBe('function');
        });
    });
});