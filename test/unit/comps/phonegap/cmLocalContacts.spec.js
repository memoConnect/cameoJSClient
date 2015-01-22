'use strict';

var cmLocalContacts

describe('cmLocalContacts default none app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$navigator', function () {
                return 'undefined'
            })
        })
    })
    beforeEach(inject(function (_cmLocalContacts_) {
        cmLocalContacts = _cmLocalContacts_
    }))

    it('should be defined', function () {
        expect(cmLocalContacts).toBeDefined()
    })

    describe('var plugin', function () {
        it('should be defined', function () {
            expect(cmLocalContacts.plugin).toBeDefined()
        })

        it('should return false', function () {
            expect(cmLocalContacts.plugin).toBe(null)
        })
    })

    describe('var emulateDevice',function(){
        it('should be defined',function(){
            expect(cmDevice.emulateDevice).toBeDefined()
        })

        it('should be false on default',function(){
            expect(cmDevice.emulateDevice).toBeFalsy()
        })
    })

    describe('method init', function () {
        it('should be defined', function () {
            expect(cmLocalContacts.init).toBeDefined()
        })
    })

    describe('method canRead', function () {
        it('should be defined', function () {
            expect(cmLocalContacts.canRead).toBeDefined()
        })

        it('should return false', function () {
            expect(cmLocalContacts.canRead()).toBeFalsy()
        })
    })

    describe('method selectOne', function () {
        it('should be defined', function () {
            expect(cmLocalContacts.selectOne).toBeDefined()
        })

        it('should return promise but never resolved', function () {
            var promise = cmLocalContacts.selectOne()
            expect('then' in promise).toBeTruthy()
        })
    })
})

describe('cmLocalContacts is app', function() {
    var mockContact = {
        displayName: 'moep',
        phoneNumbers: [],
        emails: []
        },
        $rootScope

    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$navigator', function () {
                return {
                    contacts: {
                        pickContact: function(onSuccess, onError){
                            onSuccess(mockContact)
                        }
                    }
                }
            })
            $provide.factory('$phonegapCameoConfig', function () {
                return {deviceReady:true}
            })
        })
    })
    beforeEach(inject(function (_cmLocalContacts_, _$rootScope_) {
        cmLocalContacts = _cmLocalContacts_
        $rootScope = _$rootScope_
    }))

    describe('variable plugin', function () {
        it('should be an object', function () {
            expect(cmLocalContacts.plugin).not.toBe(null)
        })
    })

    describe('method canRead', function () {
        it('should return true', function () {
            expect(cmLocalContacts.canRead(true)).toBeTruthy()
        })
    })

    describe('method selectOne', function () {
        it('should return promise with an contact', function () {
            var promise = cmLocalContacts.selectOne()
            expect('then' in promise).toBeTruthy()
            promise.then(function(contact){
                expect(contact.displayName).toBe('moep')
            })
            $rootScope.$apply()
        })
    })
})