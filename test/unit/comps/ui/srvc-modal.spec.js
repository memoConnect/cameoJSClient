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

        it('should provide functions "open" and "close" to open resp. close an existing modal.', function(){
            expect(typeof cmModal.open).toBe('function')

            var el = cmModal.create({
                id:"my_modal",
                'class': 'with-title no-padding',
                'cm-close-btn': false
            }, 'Hello World')

            expect(el.hasClass('with-title')).toBe(true)
            expect(el.hasClass('no-padding')).toBe(true)

            //modal should not yet be registered, it will be registered on next digest:
            expect(cmModal.instances['my_modal']).toBeUndefined()

            $rootScope.$apply()

            expect(cmModal.instances['my_modal']).toBeDefined()

            expect(el.hasClass('active')).toBe(false)

            cmModal.open('my_modal')

            expect(el.hasClass('active')).toBe(true)

            cmModal.close('my_modal')

            expect(el.hasClass('active')).toBe(false)

        })

        it('should be able to call .open() prior to registration, execution should be delayed until registration.', function(){

            //modal should be opened upon registration, which will occur later
            cmModal.open('delayed_modal')

            expect(cmModal.instances['delayed_modal']).toBeUndefined()

            var el = cmModal.create({ id: 'delayed_modal' }, 'I am delayed.')

            //will trigger registration:
            $rootScope.$apply()

            expect(cmModal.instances['delayed_modal']).toBeDefined()

            //modal should open right after registration:
            expect(el.hasClass('active')).toBe(true)
        })

        it('should provide a function "closeAll" to close all existing modals.', function(){
            expect(typeof cmModal.closeAll).toBe('function')

            var el_1 = cmModal.create({ id:"my_modal_1" }, 'Hello World')

            $rootScope.$apply()

            cmModal.open('my_modal_1')

            expect(el_1.hasClass('active')).toBe(true)

            cmModal.closeAll()

            expect(el_1.hasClass('active')).toBe(false)
        })
    })

    //Todo; actually this is already covered implicitly by the service tests above
    /*
     * <cm-modal cm-data-as="moep"></cm-modal>
     * <cm-modal cm-close-btn="boolean"></cm-modal>
     * <cm-modal cm-title="'CAMEO.WELCOME'"></cm-modal>
     * */
    describe('directive', function(){

        beforeEach(module('cmUi'))

        function create_drtv(html){
            var $el
            inject(function (_$rootScope_, $compile) {
                $scope = _$rootScope_.$new()
                $el = angular.element(html)
                $compile($el)($scope)
                $scope.$digest()
            })
        return $el;
        }

        //<cm-modal></cm-modal>
        it('default should be empty', function(){
            var modal = create_drtv('<cm-modal></cm-modal>')
            expect(modal.find('ng-transclude').text()).toBe('')
        })

        //<cm-modal id="moep"></cm-modal>
        it('with id and external trigger should be openable', function(){
            var trigger = create_drtv('<div ng-click="openModal(\'moep\')"></div>')
            var modal = create_drtv('<cm-modal id="moep">moeper</cm-modal>')

            expect(modal.find('ng-transclude').text()).toBe('moeper')
            // click trigger to open modal
            trigger.click()
            expect(modal.hasClass('active')).toBe(true)
            // click on close button to leave
            modal.find('.close').click()
            expect(modal.hasClass('active')).toBe(false)
        })

        //<cm-modal id="moep" cm-data-as="moeper">{{moeper.any}}</cm-modal>
        it('external data', function(){
            var trigger1 = create_drtv('<div ng-click="openModal(\'moep\',{variable:\'jau\'})"></div>')
            var trigger2 = create_drtv('<div ng-click="openModal(\'moep\',{variable:\'no\'})"></div>')
            var modal = create_drtv('<cm-modal id="moep" cm-data-as="moeper">{{moeper.variable}}</cm-modal>')

            trigger1.click()
            expect(modal.find('ng-transclude').text()).toBe('jau')

            trigger2.click()
            expect(modal.find('ng-transclude').text()).toBe('no')
        })

        // <cm-modal cm-close-btn="boolean"></cm-modal>
        it('handle close button', function(){
            var modal1 = create_drtv('<cm-modal cm-close-btn="false"></cm-modal>')
            var modal2 = create_drtv('<cm-modal cm-close-btn="true"></cm-modal>')

            expect(modal1.find('.close').hasClass('ng-hide')).toBe(true)
            expect(modal2.find('.close').hasClass('ng-hide')).toBe(false)
        })
     })
})