var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('settings', function(){

    function openMenu(){
        $("cm-menu .cm-handler").click()
    }

    function closeMenu(){
        //$("cm-menu div[cm-transparent-bg]").click()
    }

    var ptor = util.getPtorInstance()

    it('should be at "#/talks".', function(){
        util.login()
        util.expectCurrentUrl('#/talks')
    })

    it('open menu and submenu is closed', function(){
        openMenu()
        expect($("cm-menu li.has-submenu").isDisplayed()).toBe(true)
        expect($("cm-menu li.has-submenu ul.cm-submenu").isDisplayed()).toBe(false)
    })

    it('open submenu and click in first item and be on /settings/account', function(){
        $("cm-menu li.has-submenu .fa.icon-right").click()
        expect($("cm-menu li.has-submenu ul.cm-submenu").isDisplayed()).toBe(true)
        $$("cm-menu ul.cm-submenu li").get(0).click()
        util.expectCurrentUrl('#/settings/account')
    })

    it('open menu and click on settings and go to /settings', function(){
        openMenu()
        $("cm-menu li.has-submenu .cm-list-parent-label").click()
        util.expectCurrentUrl('#/settings')
    })

    it('open one of overview goes to mainPage /settings/identity and click on subPage button / settings/identity/keys', function(){
        $$("cm-overview-settings ul li").get(1).$("a").click()
        util.expectCurrentUrl('#/settings/identity')
        $$("cm-identity-settings ul li").get(0).$("a").click()
        util.expectCurrentUrl('#/settings/identity/keys')
    })

})