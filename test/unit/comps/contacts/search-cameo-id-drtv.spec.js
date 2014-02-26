define([
    'angularAMD',
    'ngload!comps/contacts/search-cameo-id-drtv',
    'comps/contacts/search-cameo-id.html'
], function (angularAMD, app, tpl) {
    'use strict';

    describe('Directive cmSearchCameoId', function () {
        var $scope, directive;

        angularAMD.inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put('comps/contacts/search-cameo-id.html', tpl);

            directive = angular.element('<div cm-search-cameo-id></div>')
            directive = $compile(directive)($rootScope);
            $rootScope.$digest()

            $scope = directive.isolateScope();
        })

        it('should load template',function(){
            expect(directive.html()).not.toBe('')
        })

        it('results should be an empty array',function(){
            expect($scope.results.length).toEqual(0);
        })

        it('results should after mock one not an empty array',function(){
            $scope.$apply(function() {
                $scope.results = ['huhu','huhu2'];
            });
            expect($scope.results.length).toEqual(2);

            expect($('ul.nav-pills li',directive).length).toEqual(2);
        })

        it('should have search as function',function(){
            expect(typeof $scope.search).toBe('function')
        })

        it('should have sendFriendRequest as function',function(){
            expect(typeof $scope.sendFriendRequest).toBe('function')
        })
    })
})