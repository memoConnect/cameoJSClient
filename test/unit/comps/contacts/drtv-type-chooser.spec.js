'use strict';

describe('Directive cmTypeChooser', function () {
    var el,
        scope

    beforeEach(module('cmContacts'))
    beforeEach(module('comps/contacts/drtv-type-chooser.html'))
    beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new()
            el = angular.element('<div cm-type-chooser></div>')
            el = $compile(el)(scope)
            scope.$digest()
        }))

    describe('default',function(){

        it('should load template',function(){
           expect(el.html()).not.toBe('')
        })

        it('types should be 3 at default',function(){
            expect(el.scope().buttons.length).toBe(3)
            expect($('.btn-group-justified .btn-group',el).length).toEqual(3)
        })

        it('should have setActive as function',function(){
            expect(typeof el.scope().setActive).toBe('function')
        })
    })

    describe('check data assigned to root/parentScope',function(){

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope

            // set parent data
            scope.data = {
                huhu: ""
            }

            el = angular.element('<div cm-type-chooser choose-to-data="huhu"></div>')
            el = $compile(el)(scope)
            scope.$digest()
        }))

        it('rootScope needs data',function(){
            expect(scope.data).toBeDefined()
        })

        it('rootScope variable should be set to \'private\' is default',function(){
            expect(scope.data.huhu).toBe('private')
        })

        it('rootScope variable should be set to \'other\' cause of click on first element',function(){
            $('div.btn-group-justified button', el).get(2).click()
            expect(scope.data.huhu).toBe('other')
        })
    })

    describe('test with choose-type=\'provider\' changed',function(){

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new()

            // set parent data
            scope.data = {
                huhu: ""
            }

            el = angular.element('<div cm-type-chooser choose-to-data="huhu" choose-type="provider"></div>')
            el = $compile(el)(scope)
            scope.$digest()
        }))

        it('rootScope needs data',function(){
            expect(scope.data).toBeDefined()
        })

        it('rootScope variable should setted to \'mobile\' is default',function(){
            expect(scope.data.huhu).toBe('mobile')
        })

        it('rootScope variable should setted to \'landline\' cause of click on first element',function(){
            $('div.btn-group-justified button', el).get(0).click();
            expect(scope.data.huhu).toBe('landline')
        })
    })

    describe('test with cm-disabled & cm-choose-value-to', function(){

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new()

            scope.moep = {}

            el = angular.element('<div cm-type-chooser cm-disabled="true" cm-choose-value-to="moep"></div>')
            el = $compile(el)(scope)
            scope.$digest()
        }))

        it('scope variable should set to \'private\' is default',function(){
            expect(scope.moep.type).toBe('private')
        })

        it('if click on other elements then nothing happens',function(){
            $('div.btn-group-justified button', el).get(0).click()
            expect(scope.moep.type).toBe('private')
            $('div.btn-group-justified button', el).get(1).click()
            expect(scope.moep.type).toBe('private')
            $('div.btn-group-justified button', el).get(2).click()
            expect(scope.moep.type).toBe('private')
        })

    })
})