'use strict';

var cmUserModel;

describe('cmUserModel', function(){
    var model;

    beforeEach(module("cmUserModel"))

    beforeEach(inject(function(_cmUserModel_) {
        model = _cmUserModel_
    }))

    it('should exists', function(){
        expect(model).toBeDefined();
    })

    describe('public API', function(){
        it('should defined isAuth',function(){
            expect(model.isAuth).toBeDefined();
        })

        it('should defined setIdentiy',function(){
            expect(model.setIdentiy).toBeDefined();
        })

        it('should defined isGuest',function(){
            expect(model.isGuest).toBeDefined();
        })

        it('should defined doLogin',function(){
            expect(model.doLogin).toBeDefined();
        })

        it('should defined doLogout',function(){
            expect(model.doLogout).toBeDefined();
        })

        it('should defined storageSave',function(){
            expect(model.storageSave).toBeDefined();
        })

        it('should defined storageGet',function(){
            expect(model.storageGet).toBeDefined();
        })

        it('should defined storageRemove',function(){
            expect(model.storageRemove).toBeDefined();
        })

        it('should defined getToken',function(){
            expect(model.getToken).toBeDefined();
        })

        it('should defined storeToken',function(){
            expect(model.storeToken).toBeDefined();
        })

        it('should defined removeToken',function(){
            expect(model.removeToken).toBeDefined();
        })
    })

    /**
     * Mock cmAuth.getToken for testing
     * TODO cmAuth Mock?!?
     */
    xdescribe('Authentication',function(){
        // TODO: couldn't work while cmAuth handling with token = mocken?
        it('should be true, when user is active and has id',function(){
            model.data.isActive = true;
            model.data.id = 'moep';
            expect(model.isAuth()).toBeTruthy();
        })

        it('should be false, when user is active and has no id',function(){
            model.data.isActive = true;
            expect(model.isAuth()).toBeFalsy();
        })

        it('should be false, when user is inactive and has id',function(){
            model.data.id = 'moep';
            expect(model.isAuth()).toBeFalsy();
        })
    })

});
