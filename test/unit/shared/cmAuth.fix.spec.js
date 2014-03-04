'use strict';

describe('cmAuth', function(){
    var cmAuth, $httpBackend;

    beforeEach(module('cmAuth'))
    beforeEach(inject(function(_cmAuth_, _$httpBackend_){
        cmAuth = _cmAuth_;
        $httpBackend = _$httpBackend_
    }));

    it('should provide a service for authentication tasks', function(){
        expect(cmAuth).toBeDefined()
    })

    describe('service', function(){
        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation()
            $httpBackend.verifyNoOutstandingRequest()
        })

        it('should provide a function to request authentication tokens.', function(){
            $httpBackend.expectGET('/token').respond(200, {res:'OK',data:{token:'moep'}});
            var promise = cmAuth.requestToken();
            promise.then(
                function(token){
                    expect(token).toBe('moep');
                }
            )
            $httpBackend.flush()
        })

        it('should provide one function to store and one function get tokens.', function(){
            cmAuth.storeToken('test')
            expect(cmAuth.getToken()).toBe('test')
        })

        it('should provide a function to request user account creation.', function(){
            $httpBackend.expectPOST('/account').respond(200,{
                "res": "OK",
                "data": {
                    "loginName": "test",
                    "identities": [
                        "ZVtXkxMmPj4WtLYea8ci"
                    ],
                    "phoneNumber": "12335",
                    "email": "mail",
                    "created": "22.01.2014 16:34:54",
                    "lastUpdated": "22.01.2014 16:34:54"
                }}
            );

            var promise = cmAuth.createUser();
            promise.then(
                function(data){
                    expect(typeof data).toBe('object')
                }
            );
            $httpBackend.flush()
        });

        it('should provide a function to check if user name already exists.', function(){
            $httpBackend.expectPOST('/account/check').respond(200,{
                "res": "OK",
                "data": {
                    "loginName": "testtest",
                    "reservationSecret": "VaXdx3xAAzk3cTXvdDlC"
                }
            });
            var promise = cmAuth.checkAccountName();

            promise.then(
                function(reservationSecret){
                    expect(reservationSecret).toBe('VaXdx3xAAzk3cTXvdDlC')
                }
            );
            $httpBackend.flush()
        });
    })
})