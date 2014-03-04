'use strict';

describe('Directive cmSearchCameoIdentity', function () {
    var $scope, directive, promise, $ModelContacts;
    

    beforeEach(module('cmContacts'))

/*
    beforeEach(function(){
        module('cmContacts').service('cmContactsModel',function(){
            return {
                searchCameoIdentity: function(){
                    promise = $q.defer();
                    return promise.promise;
                }
            }
        });
    })
*/    

    beforeEach(inject(function ($rootScope, $compile, $templateCache, $q) {

        $templateCache.put('comps/contacts/search-cameo-identity.html', window.__html__['app/comps/contacts/search-cameo-identity.html']);

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