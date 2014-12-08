'use strict';

describe('Directive cmFriendRequestCounter', function () {

    var directive, element, $scope, $httpBackend, cmContactsModel;

    beforeEach(module('cmContacts'))
    beforeEach(module('cmConfig'))

    beforeEach(inject(function(_$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/account').respond({});
        $httpBackend.whenGET('/contacts').respond({});
        $httpBackend.whenGET('/contact-groups').respond({});
        $httpBackend.whenGET('/friendRequests').respond({});
    }))

    beforeEach(inject(function(_cmContactsModel_){
        cmContactsModel = _cmContactsModel_;
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
    });
})