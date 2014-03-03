define([
    'app',
    'angularAMD',
    'cmContacts'
], function (app, angularAMD) {
    'use strict';

    describe('cmContacts', function(){
        var cmContacts;

        angularAMD.inject(function(_cmContacts_) {
            cmContacts = _cmContacts_;
        });

        it('should provide an searchCameoIdentity function', function(){
            expect(cmContacts.searchCameoIdentity).toBeDefined();
        });

        it('should provide an getAll function', function(){
            expect(cmContacts.getAll).toBeDefined()
        });

        it('should provide an getOne function', function(){
            expect(cmContacts.getOne).toBeDefined()
        });

        it('should provide an getGroups function', function(){
            expect(cmContacts.getGroups).toBeDefined()
        });

        it('should provide an getAllFromGroup function', function(){
            expect(cmContacts.getAllFromGroup).toBeDefined()
        });

        it('should provide an getFriendRequests function', function(){
            expect(cmContacts.getFriendRequests).toBeDefined()
        });

        it('should provide an sendFriendRequest function', function(){
            expect(cmContacts.sendFriendRequest).toBeDefined()
        });

        it('should provide an answerFriendRequest function', function(){
            expect(cmContacts.answerFriendRequest).toBeDefined()
        });

    })

});