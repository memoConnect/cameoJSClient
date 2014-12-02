var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")
/**
* @deprected becaus of current gui changes in menu
*/
xdescribe('Settings: ', function(){
    var ptor = util.getPtorInstance()

    function openMenu(){
        $("cm-menu .cm-handler").click()
    }

    function closeMenu(){
        $("cm-menu .cm-nose-wrapper").click()
    }

    it('should be at "#/start".', function(){
        util.login()
        util.expectCurrentUrl('#/start')
    })

    /**
     * @deprected becaus of current gui changes in menu
     */
    xit('open menu and submenu is closed', function(){
        openMenu()
        expect($("cm-menu li.has-submenu").isDisplayed()).toBe(true)
        expect($("cm-menu li.has-submenu ul.cm-submenu").isDisplayed()).toBe(false)
        closeMenu()
    })

    /**
     * @todo in eigenen account test, siehe identity settings
     */
    xit('open submenu and click in first item and be on /settings/account', function(){
        $("cm-menu li.has-submenu .fa.icon-right").click()
        expect($("cm-menu li.has-submenu ul.cm-submenu").isDisplayed()).toBe(true)
        $$("cm-menu ul.cm-submenu li").get(0).click()
        util.expectCurrentUrl('#/settings/account')
    })

    /**
    * @deprected becaus of current gui changes in menu
    */
    xit('open menu and click on settings and go to /settings', function(){
        openMenu()

        $("cm-menu li.has-submenu .cm-list-parent-label").click()
        util.expectCurrentUrl('#/settings')
    })
})