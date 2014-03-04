define([
    'angularAMD',
    'comps/navs/nav-tabs.html',
    'comps/navs/nav-tabs-drtv'
], function (angularAMD, tpl) {
    'use strict';

    var inject = angularAMD.inject;

    // <div cm-nav-tabs></div>
    describe('Directive cmNavTabs', function () {

        function createDrtv(selfDigest){
            var element, $rootScope, $routeParams;

            inject(function (_$rootScope_, $compile, $templateCache, _$routeParams_) {
                $templateCache.put('comps/navs/nav-tabs.html', tpl);

                $rootScope = _$rootScope_.$new();
                $routeParams = _$routeParams_;
                $routeParams.tab = '';

                element = angular.element('<div cm-nav-tabs></div>');
                element = $compile(element)($rootScope);
                if(selfDigest == undefined)
                    $rootScope.$digest();
            })

            return {
                $scope: element.scope(),
                $rootScope: $rootScope,
                $routeParams: $routeParams,
                element: element,
                digest: function(){
                    $rootScope.$digest();
                }
            }
        }

        var tabMock = [
            {i18n:'1'},
            {i18n:'MOEP','default':true},
            {i18n:'3'},
            {i18n:'WHOOP'}
        ];

        afterEach(function(){
            inject(function(_$routeParams_){
                _$routeParams_.tab = undefined;
            })
        });

        describe('default', function(){
            var drtv = createDrtv();

            it('should load template', function(){
                expect(drtv.element.html()).not.toBe('');
            })

            it('should have setActive as a function', function(){
                expect(typeof drtv.$scope.setActiveTab).toBe('function')
            })

            it('should have activeTab as a string', function(){
                expect(drtv.$scope.activeTab).toBe('')
            })
        })

        describe('route has tab variable', function(){
            var drtv = createDrtv(false);
            drtv.$rootScope.tabs = tabMock;
            drtv.$routeParams.tab = 'whoop';
            drtv.$rootScope.$apply();
            drtv.digest();

            it('activeTab should be whoop.toUpperCase == WHOOP', function(){
                expect(drtv.$scope.activeTab).toBe('WHOOP');
            })
        })

        describe('set tabs without tab variable',function(){
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
})