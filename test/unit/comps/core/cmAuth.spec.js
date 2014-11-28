'use strict';

describe('cmAuth', function () {
    var cmAuth, cmApi, $httpBackend

    beforeEach(module('cmCore',[
        'cmApiProvider',
        function(cmApiProvider){
            cmApiProvider
                .setWithoutApiUrl()
        }
    ]))
    beforeEach(inject(function (_cmAuth_, _cmApi_, _$httpBackend_) {
        cmAuth  = _cmAuth_
        cmApi   = _cmApi_ 
        $httpBackend = _$httpBackend_
    }));

    it('should provide a service for authentication tasks', function () {
        expect(cmAuth).toBeDefined()
    })

    describe('service', function () {
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation()
            $httpBackend.verifyNoOutstandingRequest()
        })

        it('should provide a function to request authentication tokens.', function () {
            $httpBackend.expectGET('/token').respond(200, {res: 'OK', data: {token: 'moep'}});
            var promise = cmAuth.requestToken();
            promise.then(
                function (token) {
                    expect(token).toBe('moep');
                }
            )
            $httpBackend.flush()
        })

        it('should provide one function to store and one function get tokens.', function () {
            cmAuth.storeToken('moep')
            expect(cmAuth.getToken()).toBe('moep')
        })

        it('should provide one function that deletes tokens.', function () {
            cmAuth.storeToken('moep')
            cmAuth.removeToken('moep')
            expect(cmAuth.getToken()).toBe(null)
        })

        it('should provide a function to request user account creation.', function () {
            $httpBackend.expectPOST('/account').respond(200, {
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
                function (data) {
                    expect(typeof data).toBe('object')
                }
            );
            $httpBackend.flush()
        });

        it('should provide a function to check if user name already exists.', function () {
            $httpBackend.expectPOST('/account/check').respond(200, {
                "res": "OK",
                "data": {
                    "loginName": "testtest",
                    "reservationSecret": "VaXdx3xAAzk3cTXvdDlC"
                }
            });
            var promise = cmAuth.checkAccountName();

            promise.then(
                function (response) {
                    expect(response.reservationSecret).toBe('VaXdx3xAAzk3cTXvdDlC')
                }
            );
            $httpBackend.flush()
        });

        describe("twoFactorAuthentication", function () {

            it("request twoFactorKey", function () {
                // store a normal token
                var normalToken = "moepDieMoep"
                cmAuth.storeToken(normalToken)

                $httpBackend.expectGET('/twoFactorAuth',function (headers) {
                    return headers.Authorization === normalToken;
                }).respond(200, {
                    "res": "OK"
                });

                var success

                cmAuth.requestTwoFactorKey()
                .then(function (res) { success = true })

                $httpBackend.flush()

                expect(success).toBe(true)
            });

            it("confirm twoFactorKey and return twoFactorToken", function () {
                // store a normal token
                var normalToken = "moepDieMoep"
                var twoFactorKey = "mmoep"
                var twoFactorToken = "superMoep"

                cmAuth.storeToken(normalToken)

                $httpBackend.expectPOST(
                    '/twoFactorAuth/confirm',
                    { key: twoFactorKey },
                    function (headers) {return headers.Authorization === normalToken;}
                ).respond(200, {
                    "res": "OK",
                    "data": {
                        "token": twoFactorToken
                    }
                });

                var promise = cmAuth.requestTwoFactorToken(twoFactorKey)
                promise.then(
                    function (data) {
                        expect(data).toBe(twoFactorToken)
                    }
                );
                $httpBackend.flush()
            })

            it("store and return twoFactorToken",function() {
                var twoFactorToken = "superMoep"
                cmAuth.storeTwoFactorToken(twoFactorToken)
                expect(cmAuth.getTwoFactorToken()).toBe(twoFactorToken)
            })

            it("delete twoFactorToken", function() {
                var twoFactorToken = "superMoep"
                cmAuth.storeTwoFactorToken(twoFactorToken)
                cmAuth.removeTwoFactorToken()
                expect(cmAuth.getTwoFactorToken()).toBe(null)
            })
        })
    })

})