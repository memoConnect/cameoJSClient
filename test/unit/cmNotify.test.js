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
/*
	it('should display warnings.', function(){
		notify.warn('waring_1')
		console.dir(el.find('.growl'))
		expect(el.find('.growl').children().length).toEqual(3)
	})
*/

})