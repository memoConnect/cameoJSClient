describe("cmNotify", function() {   
	var notify,
		el,
		scope

	beforeEach(module("cmNotify"))
	beforeEach(inject(function($rootScope, $compile, cmNotify){
		notify 	= cmNotify
		el		= $('<div cm-notify></div>')
		scope	= $rootScope.$new()

		$compile(el)(scope)
		scope.$digest()
	}))

	it('should provide a service "cmNotify".', function(){
		expect(notify).toBeDefined()				
	})

	it('should display warnings.', function(){
		notify.warn('waring_1')
		notify.warn('waring_2')
		notify.warn('waring_3')
		scope.$digest()
		expect(el.find('.growl').children().length).toEqual(3)
	})

	it('should display infos.', function(){
		notify.info('info_1')
		notify.info('info_2')
		notify.info('info_3')
		scope.$digest()
		expect(el.find('.growl').children().length).toEqual(3)
	})

	it('should display success messages.', function(){
		notify.success('info_1')
		notify.success('info_2')
		notify.success('info_3')
		scope.$digest()
		expect(el.find('.growl').children().length).toEqual(3)
	})

	it('should display error messages.', function(){
		notify.error('info_1')
		notify.error('info_2')
		notify.error('info_3')
		scope.$digest()
		expect(el.find('.growl').children().length).toEqual(3)
	})
})