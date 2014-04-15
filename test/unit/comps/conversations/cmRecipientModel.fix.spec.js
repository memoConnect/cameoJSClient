'use strict';

describe('cmRecipientModel', function(){
    var cmRecipientModel,
        recipient;

    function createRecipient(){
        return new cmRecipientModel({});
    }

    beforeEach(module('cmConversations'));

    beforeEach(inject(function(_cmRecipientModel_){
        cmRecipientModel = _cmRecipientModel_
    }))

    it('should exists', function(){
        expect(cmRecipientModel).toBeDefined()
    })

    describe('public API', function(){
        beforeEach(function(){
            recipient = createRecipient();
        })

        
        /* init removed; cmRecipient returns extended identity object
        it('should have init function', function(){
            expect(recipient.init).toBeDefined()
        })
        */

        it('should have addTo function', function(){
            expect(recipient.addTo).toBeDefined()
        })

        it('should have sendTo function', function(){
            expect(recipient.sendTo).toBeDefined()
        })

        it('should have removeFrom function', function(){
            expect(recipient.removeFrom).toBeDefined()
        })
    })
});