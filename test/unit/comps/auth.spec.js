define([
    'angularAMD',
    'cmAuth',
    'angular-mocks'
], function (angularAMD) {
    'use strict';

    describe('cmAuth', function(){

        var cmAuth;

        angularAMD.inject(function (_cmAuth_) {
            cmAuth = _cmAuth_;
//            console.log(angular.mock)
            // method, url, post, callback, headers, timeout, withCredentials, responseType
        });

//        beforeEach(module('cmAuth'))

        it('should provide a service for authentication tasks', function(){
            expect(cmAuth).toBeDefined()
        })

        describe('service', function(){
            var $httpBackend;

//            beforeEach(inject(function(_$httpBackend_){
//                $httpBackend = _$httpBackend_
//            }))

//            afterEach(function(){
//                $httpBackend.verifyNoOutstandingExpectation()
//                $httpBackend.verifyNoOutstandingRequest()
//            })

            it('should provide a function to request authentication tokens.', function(){
//                $httpBackend.expectPOST('/token').respond(200)
                var promise = cmAuth.requestToken();

                expect(typeof promise.then).toBe('function')

                promise.then(
                    function(data){
                        expect(data).toBe('object')
                    },
                    function(arg1, data){
                        expect(arg1).toBeUndefined()
                        expect(data).toBeUndefined()
                    }
                );
//                $httpBackend.flush()
            })

            it('should provide one function to store and one function get tokens.', function(){
                cmAuth.storeToken('test')
                expect(cmAuth.getToken()).toBe('test')
            })

            it('should provide a function to request user account creation.', function(){
//                $httpBackend.expectPOST('/account').respond(200)
                var promise = cmAuth.createUser();

                expect(typeof promise.then).toBe('function')

                promise.then(
                    function(data){
                        expect(data).toBe('object')
                    },
                    function(arg1, data){
                        expect(arg1).toBeUndefined()
                        expect(data).toBeUndefined()
                    }
                );
//                $httpBackend.flush()
            })

            it('should provide a function to check if user name already exists.', function(){
//                $httpBackend.expectPOST('/account/check').respond(200)
                var promise = cmAuth.checkAccountName();

                expect(typeof promise.then).toBe('function')

                promise.then(
                    function(data){
                        expect(data).toBe('object')
                    },
                    function(arg1, data){
                        expect(arg1).toBeUndefined()
                        expect(data).toBeUndefined()
                    }
                );
//                $httpBackend.flush()
            })

            it('should provide a function to check if a phone number is valid.', function(){
//                $httpBackend.expectPOST('/services/checkPhoneNumber').respond(200)
                var promise = cmAuth.checkPhoneNumber();

                expect(typeof promise.then).toBe('function')

                promise.then(
                    function(data){
                        expect(data).toBe('object')
                    },
                    function(arg1, data){
                        expect(arg1).toBeUndefined()
                        expect(data).toBeUndefined()
                    }
                );
//                $httpBackend.flush()
            })
        })

        //TODO: test for directives are not yet done

    })
});