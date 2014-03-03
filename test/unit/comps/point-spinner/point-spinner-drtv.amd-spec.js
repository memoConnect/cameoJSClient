define([
    'app',
    'angularAMD',
    'comps/type-chooser/type-chooser.html',
    'ngload!comps/type-chooser/type-chooser-drtv'
], function (app, angularAMD, tpl) {
    'use strict';

    //<div cm-type-chooser choose-to-data="phoneProvider" choose-type="provider"></div>
    //<div cm-type-chooser choose-to-data="phoneProvider"></div>
    //<div cm-type-chooser></div>

    describe('Directive cmTypeChooser', function () {

        describe('default',function(){
            var $scopeDirv, directive;
            angularAMD.inject(function ($rootScope, $compile, $templateCache) {
                $templateCache.put('comps/type-chooser/type-chooser.html', tpl);

                directive = angular.element('<div cm-type-chooser></div>');
                directive = $compile(directive)($rootScope);
                $rootScope.$digest();

                $scopeDirv = directive.scope();
            });

            it('should load template',function(){
                expect(directive.html()).not.toBe('');
            });

            it('types should be 3 at default',function(){
                expect($scopeDirv.buttons.length).toBe(3);
                expect($('.btn-group-justified .btn-group',directive).length).toEqual(3);
            });

            it('should have setActive as function',function(){
                expect(typeof $scopeDirv.setActive).toBe('function')
            });
        });

        describe('check data assigned to root/parentScope',function(){
            var $scopeParent, directive;

            angularAMD.inject(function ($rootScope, $compile) {
                $scopeParent = $rootScope;

                // set parent data
                $scopeParent.data = {
                    huhu: ""
                };

                directive = angular.element('<div cm-type-chooser choose-to-data="huhu"></div>');
                directive = $compile(directive)($scopeParent);
                $scopeParent.$digest();
            });

            it('rootScope needs data',function(){
                expect($scopeParent.data).toBeDefined();
            });

            it('rootScope variable should setted to \'other\' is default',function(){
                expect($scopeParent.data.huhu).toBe('other');
            });

            it('rootScope variable should setted to \'private\' cause of click on first element',function(){
                $('div.btn-group-justified button',directive).get(0).click();
                expect($scopeParent.data.huhu).toBe('private');
            });
        });

        describe('test with choose-type=\'provider\' changed',function(){
            var $scopeParent, directive;

            angularAMD.inject(function ($rootScope, $compile) {
                $scopeParent = $rootScope.$new();

                // set parent data
                $scopeParent.data = {
                    huhu: ""
                };

                directive = angular.element('<div cm-type-chooser choose-to-data="huhu" choose-type="provider"></div>');
                directive = $compile(directive)($scopeParent);
                $scopeParent.$digest();
            });

            it('rootScope needs data',function(){
                expect($scopeParent.data).toBeDefined();
            });

            it('rootScope variable should setted to \'mobile\' is default',function(){
                expect($scopeParent.data.huhu).toBe('mobile');
            });

            it('rootScope variable should setted to \'landline\' cause of click on first element',function(){
                $('div.btn-group-justified button',directive).get(0).click();
                expect($scopeParent.data.huhu).toBe('landline');
            });
        });
    });
});