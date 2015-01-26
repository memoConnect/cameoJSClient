'use strict';

describe('cmContactsModel', function(){
    var model;

    beforeEach(module('cmContacts'))

    beforeEach(module('cmConfig'))

    beforeEach(inject(function(_cmContactsModel_) {
        model = _cmContactsModel_;
    }))

    it('should exists', function(){
        expect(model).toBeDefined();
    })

    describe('public API', function(){
       it('should defined searchCameoIdentity',function(){
           expect(model.searchCameoIdentity).toBeDefined();
       })

       it('should defined getAll',function(){
           expect(model.getAll).toBeDefined();
       })

       it('should defined getOne',function(){
           expect(model.getOne).toBeDefined();
       })

       it('should defined getGroups',function(){
           expect(model.getGroups).toBeDefined();
       })

       it('should defined getAllFromGroup',function(){
           expect(model.getAllFromGroup).toBeDefined();
       })

       it('should defined getFriendRequests',function(){
           expect(model.getFriendRequests).toBeDefined();
       })

       it('should defined sendFriendRequest',function(){
           expect(model.sendFriendRequest).toBeDefined();
       })
    })
})