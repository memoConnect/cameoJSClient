define([
    'angular-mocks',
    'mContacts'
], function () {
    'use strict';

    describe('ModelContacts', function(){
        var model;

        beforeEach(module('mContacts'))

        beforeEach(inject(function(_ModelContacts_) {
            model = _ModelContacts_;
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

           it('should defined getQuantity',function(){
               expect(model.getQuantity).toBeDefined();
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

           it('should defined answerFriendRequest',function(){
               expect(model.answerFriendRequest).toBeDefined();
           })
        })
    })
})
