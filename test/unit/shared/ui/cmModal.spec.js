describe('cmModal', function(){

    describe('service', function(){

        var cmModal, $rootScope
        beforeEach(module('cmUi'))
        beforeEach(inject(function(_cmModal_, _$rootScope_){
            cmModal     = _cmModal_
            $rootScope  = _$rootScope_
        }))

        it('should provide a function "register" to register scopes as modals.', function(){
            expect(typeof cmModal.register).toBe('function')

            var scope = $rootScope.$new()

            cmModal.register('my_id', scope)

            expect(cmModal.instances['my_id']).toBe(scope)
        })        

        it('should provide a function "create" to create a new modal.', function(){
            expect(typeof cmModal.create).toBe('function')

            var el = cmModal.create({
                id:         "my_modal",
                my_attr:    "my_test_attribute"
            }, "<my-test-tag></my-test-tag>")

            $rootScope.$apply()

            expect(el.attr('id')).toBe('my_modal')
            expect(el.attr('my_attr')).toBe('my_test_attribute')
            expect(el.find('my-test-tag').length).toBe(1)

            expect(cmModal.instances['my_modal']).toBeDefined()

            expect(angular.element('body').find('cm-modal').length).toBe(1)

            var dublicate = angular.element('<cm-modal id="dublicate"></cm-modal>')[0]
            
            angular.element('body').append(dublicate)

            expect(dublicate).toBeDefined()

            cmModal.create({
                id:         "dublicate",
                my_attr:    "my_test_attribute"
            }, "<my-test-tag></my-test-tag>")

            expect(angular.element(dublicate).parent().length).toBe(0)

        })

        it('should provide functiony "open" and "close" to open resp. close an existing modal.', function(){
            expect(typeof cmModal.open).toBe('function')

            var el = cmModal.create({ id:"my_modal" }, 'Hello World')

            $rootScope.$apply()

            expect(el.hasClass('active')).toBe(false)

            cmModal.open('my_modal')

            expect(el.hasClass('active')).toBe(true)

            cmModal.close('my_modal')

            expect(el.hasClass('active')).toBe(false)
        })

        it('should provide a function "closeAll" to close all existing modals.', function(){

            expect(typeof cmModal.closeAll).toBe('function')

            var el_1 = cmModal.create({ id:"my_modal_1" }, 'Hello World')
                el_2 = cmModal.create({ id:"my_modal_2" }, 'Hello User')
            

            $rootScope.$apply()

            cmModal.open('my_modal_1'),
            cmModal.open('my_modal_2')

            expect(el_1.hasClass('active')).toBe(true)
            expect(el_2.hasClass('active')).toBe(true)

            cmModal.closeAll()

            expect(el_1.hasClass('active')).toBe(false)
            expect(el_2.hasClass('active')).toBe(false)

        })

        
    })

    describe('directive', function(){

    })
})