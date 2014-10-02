var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Route Talks:', function () {
    "use strict";

    var ptor = util.getPtorInstance()
    afterEach(function() { util.stopOnError() });

    it('should be at "#/start".', function () {
        util.login()
        util.expectCurrentUrl('#/start')

    })

    it('should go to talks', function(){
        util.get('/talks')
        util.expectCurrentUrl('#/talks')
    })

    it('should have a header.', function () {
        expect($('cm-header').isPresent()).toBe(true)
    })

    it('load more then 0 elements (conversations)', function () {
        util.waitForElement('[data-qa=conversation-list-element]')

        $$('[data-qa=conversation-list-element]').then(function (elements) {
            expect(elements.length).not.toBe(0)
        })
    })

    it('should open conversation when clicked', function () {
        util.scrollToTop()

        $$("[data-qa='conversation-list-element']").then(function (elements) {
            elements[0].click()
            util.waitForPageLoad("/conversation/.*")
        })
    })

    it('should go back to talks from conversation view', function () {
        util.clickBackBtn()
        util.waitForPageLoad("/talks")
    })

    it('should open a new conversation on button click', function () {
        //util.waitForLoader()
        util.scrollToTop()
        // wait for browser to scroll, todo: find a better way to do this
        $("[data-qa='new-conversation-btn']").click()
        util.waitForPageLoad("/conversation/new")
    })
})
