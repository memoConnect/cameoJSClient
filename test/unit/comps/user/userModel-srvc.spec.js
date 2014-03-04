'use strict';

describe('cmUser', function(){
    var $model, $httpBackend ;

    beforeEach(module('cmUser'))
    beforeEach(inject(function(_cmUserModel_, _$httpBackend_) {
        $model = _cmUserModel_;
        $httpBackend = _$httpBackend_;
    }))

    it('should exists', function(){
        expect($model).toBeDefined();
    })

    describe('public API', function(){
        it('should defined isAuth',function(){
            expect($model.isAuth).toBeDefined();
        })

        it('should defined doLogin',function(){
            expect($model.doLogin).toBeDefined();
        })

        it('should defined doLogout',function(){
            expect($model.doLogout).toBeDefined();
        })
    })

    /**
     * Mock cmAuth.getToken for testing
     * TODO cmAuth Mock?!?
     */
    xdescribe('Authentication',function(){
        // TODO: couldn't work while cmAuth handling with token = mocken?
        it('should be true, when user is active and has id',function(){
            $model.data.isActive = true;
            $model.data.id = 'moep';
            expect($model.isAuth()).toBeTruthy();
        })

        it('should be false, when user is active and has no id',function(){
            $model.data.isActive = true;
            expect($model.isAuth()).toBeFalsy();
        })

        it('should be false, when user is inactive and has id',function(){
            $model.data.id = 'moep';
            expect($model.isAuth()).toBeFalsy();
        })
    })
})