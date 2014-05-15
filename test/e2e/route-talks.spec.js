var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('talks', function () {

    var ptor = util.getPtorInstance()

    it('should be at "#/talks".', function () {
        util.login()
        util.get('/talks')
        util.expectCurrentUrl('#/talks')
    })

    it('should have a header.', function () {
        expect($('cm-header').isPresent()).toBe(true)
    })

    it('should have a footer.', function () {
        expect($('cm-footer').isPresent()).toBe(true)
    })

    it('load 10 elements', function () {
        util.waitForSpinner()

        $$('[data-qa=conversation-list-element]').then(function (elements) {
            expect(elements.length).toBe(10)
        })
    })

    // disabled untill spinner is implemented for load more
//    it('load 10 more elements on load more', function(){
//
//        $("[data-qa=load-more-btn]").sendKeys(protractor.Key.END)
//        $('[data-qa=load-more-btn]').click()
//
//        util.waitForSpinner()
//
//        $$('[data-qa=conversation-list-element]').then(function(elements){
//            expect(elements.length).toBeGreaterThan(10)
//        })
//    })

    it('should open conversation when clicked', function () {

        $("body").sendKeys(protractor.Key.HOME)

        $$("[data-qa='conversation-list-element']").then(function (elements) {
            elements[0].click()
            util.waitForPageLoad("/conversation/.*")
        })
    })

    it('should go back to talks from conversation view', function () {
        $("cm-back .back-wrap").click()
        util.waitForPageLoad("/talks")
    })

    it('should open a new conversation on button click', function () {
        util.waitForSpinner()
        $("body").sendKeys(protractor.Key.HOME)
        // wait for browser to scroll, todo: find a better way to do this
        $("[cm-edge]").click()
        util.waitForPageLoad("/conversation/")
    })
})
