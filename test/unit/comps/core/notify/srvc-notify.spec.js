'use strict';

describe('cmNotify service', function(){

    var cmNotify

    beforeEach(function(){
        module('cmCore')
        inject(function(_cmNotify_){
            cmNotify = _cmNotify_
        })
    })

    it('should be defined', function () {
        expect(cmNotify).toBeDefined()
    })

    describe('method error', function(){
        it('should be defined',function(){
            expect(cmNotify.error)
        })
    })

    describe('method info', function(){
        it('should be defined',function(){
            expect(cmNotify.info)
        })
    })

    describe('method success', function(){
        it('should be defined',function(){
            expect(cmNotify.success)
        })
    })

    describe('method warn', function(){
        it('should be defined',function(){
            expect(cmNotify.warn)
        })
    })

    describe('method ringBimmel', function(){
        it('should be defined',function(){
            expect(cmNotify.ringBimmel)
        })
    })

    describe('method isBimmel', function(){
        it('should be defined',function(){
            expect(cmNotify.isBimmel)
        })

        it('should return false',function(){
            expect(cmNotify.isBimmel()).toBeFalsy()
        })
    })

    describe('method unringBimmel', function(){
        it('should be defined',function(){
            expect(cmNotify.unringBimmel)
        })
    })

    describe('method unringBimmelForce', function(){
        it('should be defined',function(){
            expect(cmNotify.unringBimmelForce)
        })
    })

    describe('test situations',function(){
        it('add markHelp',function(){
            cmNotify.ringBimmel('markHelp')

            expect(cmNotify.isBimmel('markHelp')).toBeTruthy()

            cmNotify.unringBimmel('markHelp')

            expect(cmNotify.isBimmel('markHelp')).toBeFalsy()
        })

        it('add two bimmel handle different situations markHelp and friendRequests',function(){
            cmNotify.ringBimmel('markHelp')
            cmNotify.ringBimmel('friendRequest')

            expect(cmNotify.isBimmel('markHelp')).toBeTruthy()
            expect(cmNotify.isBimmel('friendRequest')).toBeTruthy()
            expect(cmNotify.isBimmel()).toBeTruthy()

            // visited help
            cmNotify.unringBimmel('markHelp')

            expect(cmNotify.isBimmel('markHelp')).toBeFalsy()
            expect(cmNotify.isBimmel('friendRequest')).toBeTruthy()
            expect(cmNotify.isBimmel()).toBeTruthy()

            // accept friendrequest
            cmNotify.unringBimmel('friendRequest')

            expect(cmNotify.isBimmel('friendRequest')).toBeFalsy()
            expect(cmNotify.isBimmel()).toBeFalsy()
        })

        it('unring force because of open menu',function(){
            cmNotify.ringBimmel('markHelp')

            // open menu
            cmNotify.unringBimmelForce()

            expect(cmNotify.isBimmel()).toBeFalsy()
            expect(cmNotify.isBimmel('markHelp')).toBeTruthy()
        })

        it('add two friend request',function(){
            cmNotify.ringBimmel('friendRequest')
            cmNotify.ringBimmel('friendRequest')

            // menu show bimmel
            expect(cmNotify.isBimmel()).toBeTruthy()
            expect(cmNotify.isBimmel('friendRequest')).toBeTruthy()

            // one friendrequest deleted
            cmNotify.unringBimmel('friendRequest')

            // menu already show bimmel
            expect(cmNotify.isBimmel()).toBeTruthy()
            expect(cmNotify.isBimmel('friendRequest')).toBeTruthy()

            // one friendrequest accepted
            cmNotify.unringBimmel('friendRequest')

            // menu already show bimmel
            expect(cmNotify.isBimmel()).toBeFalsy()
            expect(cmNotify.isBimmel('friendRequest')).toBeFalsy()
        })
    })

})