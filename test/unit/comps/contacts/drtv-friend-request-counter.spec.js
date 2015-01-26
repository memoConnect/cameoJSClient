'use strict';

describe('Directive cmFriendRequestCounter', function () {

    var directive, element, $scope, $httpBackend, cmContactsModel, cmContactsAdapter, cmUserModel;

    beforeEach(module('cmCore'))
    beforeEach(module('cmContacts'))
    beforeEach(module('cmConfig'))

    beforeEach(inject(function(_$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/account').respond({});
        $httpBackend.whenGET('/contacts').respond({});
        $httpBackend.whenGET('/contact-groups').respond({});
        $httpBackend.whenGET('/friendRequests').respond({});
    }))

    beforeEach(inject(function(_cmContactsModel_, _cmContactsAdapter_, _cmUserModel_){
        cmContactsModel = _cmContactsModel_;
        cmContactsAdapter = _cmContactsAdapter_;
        cmUserModel = _cmUserModel_;
    }))

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new()
        directive = angular.element('<cm-friend-request-counter></cm-friend-request-counter>')
        element = _$compile_(directive)($scope);
        $scope.$digest()
    }))

    describe('without "pending" requests', function(){
        it('should be empty if 0 friend requests', function(){
            expect(element.html()).toBe('');
        });
    })

    describe('with "pending" requests', function(){
        it('should not empty if friend requests exists', function(){
            cmContactsModel.requests = [{id:1},{id:2}];
            cmContactsModel.trigger('friendRequests:updated');

            expect(element.html()).not.toBe('');
            expect(element.html()).toBe(' (2)');
        })

        it('should change displayed number, after friendRequest:rejected event over cmContactsAdapater', function(){
            cmUserModel.data.identity.id = 'moep';
            var mockRequestNew = {"friendRequest":{identity:{id:1}},to:'moep'}
            var mockRequestReject = {"from":1,to: 'moep'}

            cmContactsAdapter.trigger('friendRequest:new', mockRequestNew)

            expect(element.html()).not.toBe('');
            expect(element.html()).toBe(' (1)');

            cmContactsAdapter.trigger('friendRequest:rejected', mockRequestReject)
            expect(element.html()).toBe('');
        })
    });
})