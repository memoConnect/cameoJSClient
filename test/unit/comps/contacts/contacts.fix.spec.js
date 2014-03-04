/*
define([
    'angular-mocks',
    'cmContactsModel'
], function () {
*/    
'use strict';

describe('cmContactsModel', function(){
    var cmContactsModel;

    beforeEach(module('cmContacts'))
    beforeEach(inject(function(_cmContactsModel_) {
        cmContactsModel = _cmContactsModel_;
    }))

    it('should provide an searchCameoIdentity function', function(){
        expect(cmContactsModel.searchCameoIdentity).toBeDefined();
    })

    it('should provide an getAll function', function(){
        expect(cmContactsModel.getAll).toBeDefined()
    })

    it('should provide an getOne function', function(){
        expect(cmContactsModel.getOne).toBeDefined()
    })

    it('should provide an getGroups function', function(){
        expect(cmContactsModel.getGroups).toBeDefined()
    })

    it('should provide an getAllFromGroup function', function(){
        expect(cmContactsModel.getAllFromGroup).toBeDefined()
    })

    it('should provide an getFriendRequests function', function(){
        expect(cmContactsModel.getFriendRequests).toBeDefined()
    })

    it('should provide an sendFriendRequest function', function(){
        expect(cmContactsModel.sendFriendRequest).toBeDefined()
    })

    it('should provide an answerFriendRequest function', function(){
        expect(cmContactsModel.answerFriendRequest).toBeDefined()
    })

})
/*
});
*/