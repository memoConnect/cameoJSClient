'use strict';

xdescribe('Directive cmSearchCameoIdentity', function () {
    var $scope, directive, promise, $ModelContacts;

    beforeEach(module('cmContacts'))
    beforeEach(module('comps/contacts/search-cameo-identity.html'))
    beforeEach(inject(function ($rootScope, $compile, $q) {
        directive = angular.element('<div cm-search-cameo-identity></div>')
        $compile(directive)($rootScope.$new());
        $rootScope.$digest()

        $scope = directive.isolateScope();
    }))

    describe('should',function(){
        it('load template',function(){
            expect(directive.html()).not.toBe('')
        })

        it('have empty array on results',function(){
            expect($scope.results.length).toEqual(0);
        })

        it('mock 3 results',function(){
            $scope.$apply(function() {
                $scope.results = ['huhu','huhu2','huhu3'];
            });
            expect($scope.results.length).toEqual(3);

            expect($('ul.nav-pills li',directive).length).toEqual(3);
        })

        it('have search as function',function(){
            expect(typeof $scope.search).toBe('function')
        })

        it('have sendFriendRequest as function',function(){
            expect(typeof $scope.sendFriendRequest).toBe('function')
        })
    })
})