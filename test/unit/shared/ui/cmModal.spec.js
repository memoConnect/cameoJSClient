describe('cmModal', function(){

    describe('service', function(){

        var cmModal, $rootScope, modal_element

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

            modal_element = cmModal.create({
                                id:         "my_modal",
                                my_attr:    "my_test_attribute"
                            }, "<my-test-tag></my-test-tag>")

            $rootScope.$apply()

            expect(modal_element.attr('id')).toBe('my_modal')
            expect(modal_element.attr('my_attr')).toBe('my_test_attribute')
            expect(modal_element.find('my-test-tag').length).toBe(1)

            expect(cmModal.instances['my_modal']).toBeDefined()

            expect(angular.element('body').find('cm-modal').length).toBe(1)

            var dublicate = angular.element('<cm-modal id="dublicate"></cm-modal>')[0]
            
            angular.element('body').append(dublicate)

            expect(dublicate).toBeDefined()

            modal_element = cmModal.create({
                id:         "dublicate",
                my_attr:    "my_test_attribute"
            }, "<my-test-tag></my-test-tag>")

            expect(angular.element(dublicate).parent().length).toBe(0)

        })

        it('should provide a function "open" to open an existing modal.', function(){
            expect(typeof cmModal.open).toBe('function')

            cmModal.open('my_modal')
            expect(modal_element.hasClass('active')).toBe(true)
        })

        it('should provide a function "close" to close an existing modal.', function(){
            expect(typeof cmModal.close).toBe('function')

            cmModal.close('my_modal')
            expect(modal_element.hasClass('active')).toBe(false)
        })

        it('should provide a function "closeAll" to close all existing modals.', function(){

            expect(typeof cmModal.closeAll).toBe('function')

            cmModal.create({
                                id:         "my_modal_1",
                                my_attr:    "my_test_attribute"
                            }, "<my-test-tag></my-test-tag>")

            cmModal.create({
                                id:         "my_modal_2",
                                my_attr:    "my_test_attribute"
                            }, "<my-test-tag></my-test-tag>")

            cmModal.open('my_modal_1')
            cmModal.open('my_modal_2')

        })

        
    })

    describe('directive', function(){

    })
})