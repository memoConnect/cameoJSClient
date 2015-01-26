var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('help route', function () {
    var ptor = util.getPtorInstance()

    it('should login', function() {
        util.login()
        util.get('/talks')
    })

    it('menu button should be available',function(){
        util.click('btn-open-menu')
        util.waitForElementVisible("[data-qa='btn-menu-help']")
    })

    it('click menu button',function(){
        util.click('btn-menu-help')
        util.waitForPageLoad('/help')
        util.expectCurrentUrl('/help')
    })

    it('two elements should be in list', function(){
        $$('cm-widget-help-list li').then(function(elements){
            expect(elements.length).toEqual(3)
        })
    })

    it('click quickstart guide', function(){
        util.click('btn-help-quickstart')
        util.waitForPageLoad('/start/quickstart')
        util.expectCurrentUrl('/start/quickstart')

        $('cm-back').click()
    })

    it('logout',function(){
        util.logout()
    })
})
