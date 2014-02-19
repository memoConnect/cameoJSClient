define([
    '_c/contacts', 'angularAMD', 'tpl/searchCameoId'
], function (app, angularAMD, tpl) {
    'use strict';

    describe('ContactsCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope;
            ctrl = $controller('ContactsCtrl', { $scope: $scope });
        })

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        })

        it('navigation equal to 4', function () {
            expect($scope.navigation.length).toEqual(4);
        })

        it('activeTab should be ADD', function () {
            expect($scope.activeTab).toBe('ADD');
        })

        it('setActiveTab should be a function', function () {
            expect(typeof $scope.setActiveTab).toBe('function');
        })

        it('activeTab should be WHOOPWHOOP', function () {
            $scope.setActiveTab('WHOOPWHOOP');
            expect($scope.activeTab).toBe('WHOOPWHOOP');
        })
    })

    xdescribe('Directive cmSearchCameoId', function () {
        var $scope, directive
        // karma-ng-html2js-preprocessor-requirejs edit with loadOnlyHtml
        angularAMD.inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put('tpl/modules/contacts/cm-search-cameo-id.html', tpl)

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