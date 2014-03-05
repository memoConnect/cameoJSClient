'use strict';

// <div cm-nav-tabs></div>
describe('Directive cmNavTabs', function () {
    var el,
        $rootScope,
        $scope,
        $compile,
        $routeParams,
        tabMock = [
            {i18n:'1'},
            {i18n:'MOEP','default':true},
            {i18n:'3'},
            {i18n:'WHOOP'}
        ],
        routeMock = {}

    beforeEach(function(){
        module('cmUi')
        module(function($provide) {
            $provide.value('$routeParams', routeMock);
        })
    })
    beforeEach(inject(function(_$rootScope_, _$compile_, $templateCache){
        $templateCache.put('shared/ui/nav-tabs.html', window.__html__['app/shared/ui/nav-tabs.html'])

        el = angular.element('<div cm-nav-tabs></div>')
        $rootScope = _$rootScope_.$new()
        $compile = _$compile_

        $compile(el)($rootScope)
        $rootScope.$digest()
        $scope = el.scope()
    }))

    describe('default', function(){
        it('should load template', function(){
            expect(el.html()).not.toBe('')
        })

        it('should have setActive as a function', function(){
            expect(typeof $scope.setActiveTab).toBe('function')
        })

        it('should have activeTab as a string', function(){
            expect($scope.activeTab).toBe('')
        })
    })

    describe('route has tab variable', function(){
        beforeEach(function(){
            routeMock = {tab: 'whoop'}
        })

        it('routeParams digest...', function(){
            expect(routeMock.tab).toBe('whoop')
        })

        it('activeTab should be whoop.toUpperCase == WHOOP', function(){
            expect($scope.activeTab).toBe('WHOOP')
        })
    })

    xdescribe('set tabs without tab variable',function(){
        var drtv = createDrtv(false);
        drtv.$scope.tabs = tabMock;
        drtv.$rootScope.tabs = tabMock;
        drtv.$routeParams = {};
        drtv.$scope.$apply();
        drtv.$rootScope.$apply();
        drtv.digest();

        describe('directive scope', function(){
            it('should have rootScope tabs equal 4', function(){
                expect(drtv.$scope.tabs.length).toEqual(4);
            })

            it('activeTab should be MOEP', function(){
                expect(drtv.$scope.activeTab).toBe('MOEP');
            })
        })

        describe('root scope', function(){
            it('tabs equal 4', function(){
                expect(drtv.$rootScope.tabs.length).toEqual(4);
            })

            it('activeTab should be MOEP', function(){
                expect(drtv.$rootScope.activeTab).toBe('MOEP');
            })
        })
    })
})