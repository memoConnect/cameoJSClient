
    'use strict';

    //<div cm-type-chooser choose-to-data="phoneProvider" choose-type="provider"></div>
    //<div cm-type-chooser choose-to-data="phoneProvider"></div>
    //<div cm-type-chooser></div>

    describe('Directive cmTypeChooser', function () {
        var el,
            scope


        beforeEach(module('cmContacts'))
        beforeEach(inject(function ($rootScope, $compile, $templateCache) {
                $templateCache.put('comps/contacts/type-chooser.html', window.__html__['app/comps/contacts/type-chooser.html']);
                                    
                scope = $rootScope.$new()
                el = angular.element('<div cm-type-chooser></div>');
                el = $compile(el)(scope);
                scope.$digest();
            }));

        describe('default',function(){

            it('should load template',function(){
               expect(el.html()).not.toBe('');
            });

            it('types should be 3 at default',function(){
                expect(el.scope().buttons.length).toBe(3);
                expect($('.btn-group-justified .btn-group',el).length).toEqual(3);
            });

            it('should have setActive as function',function(){
                expect(typeof el.scope().setActive).toBe('function')
            });
        });

        describe('check data assigned to root/parentScope',function(){

            beforeEach(inject(function ($rootScope, $compile) {
                scope = $rootScope;

                // set parent data
                scope.data = {
                    huhu: ""
                };

                el = angular.element('<div cm-type-chooser choose-to-data="huhu"></div>');
                el = $compile(el)(scope);
                scope.$digest();
            }));

            it('rootScope needs data',function(){
                expect(scope.data).toBeDefined();
            });

            it('rootScope variable should be set to \'other\' is default',function(){
                expect(scope.data.huhu).toBe('other');
            });

            it('rootScope variable should be set to \'private\' cause of click on first element',function(){
                $('div.btn-group-justified button', el).get(0).click();
                expect(scope.data.huhu).toBe('private');
            });
        });

        describe('test with choose-type=\'provider\' changed',function(){

            beforeEach(inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();

                // set parent data
                scope.data = {
                    huhu: ""
                };

                el = angular.element('<div cm-type-chooser choose-to-data="huhu" choose-type="provider"></div>');
                el = $compile(el)(scope);
                scope.$digest();
            }));

            it('rootScope needs data',function(){
                expect(scope.data).toBeDefined();
            });

            it('rootScope variable should setted to \'mobile\' is default',function(){
                expect(scope.data.huhu).toBe('mobile');
            });

            it('rootScope variable should setted to \'landline\' cause of click on first element',function(){
                $('div.btn-group-justified button', el).get(0).click();
                expect(scope.data.huhu).toBe('landline');
            });
        });
    })