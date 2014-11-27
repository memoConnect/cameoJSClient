var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")
var path = require('path')

describe('transfer scope data registration', function () {
    var ptor = util.getPtorInstance()

    it('fill out registration with validation timeout', function () {
        util.logout()
        util.get('/registration')
        util.expectCurrentUrl('/registration')

        util.setVal('input-cameoId', 'moeper')
        util.setVal('input-password', 'moep12345')
        util.setVal('input-passwordConfirm', 'moep12345')
        util.setVal('input-displayName', 'moepDisp')
        util.setVal('input-email', 'moep@moep.de')
        util.setVal('input-phone', '+49123456')

        util.scrollToBottom()
        util.click("icon-checkbox-agb")
    })

    it('goto terms (do the transfer)', function () {
        util.click("link-terms")
        util.expectCurrentUrl('/terms')


        util.waitForElement(".back-wrap")
        $(".back-wrap").click()
    })

    it('check if transfer succeed', function () {
        expect(util.getVal('input-cameoId')).toBe('moeper')
        expect(util.getVal('input-password')).toBe('')
        expect(util.getVal('input-passwordConfirm')).toBe('')
        expect(util.getVal('input-displayName')).toBe('moepDisp')
        expect(util.getVal('input-email')).toBe('moep@moep.de')
        expect(util.getVal('input-phone')).toBe('+49123456')

        expect($("[data-qa='icon-checkbox-agb']").getAttribute('class')).toContain('cm-checkbox-right')

        // try to reg user but without password error message are shown
        util.click("btn-createUser")

        expect($("[data-qa='drtv-password-error-empty']").isDisplayed()).toBe(true)
    })
})

describe('transfer scope data conversation', function () {
    var ptor = util.getPtorInstance()

    var msg = 'oida wird dit hier mitjenommen?',
        msg2 = 'juhu buhu',
        smallImageJPG = path.resolve(__dirname, '../data/file-upload-image-24KB.jpg')

    it('login', function () {
        util.login()
    })

    it('open new conversation and fill out', function () {
        util.get('/conversation/new')
        util.setVal('input-answer', msg)
        $("[data-qa='btn-file-choose']").sendKeys(smallImageJPG)
    })

    it('disabled encryption (do the transfer) and check if transfer succeed', function () {
        util.disableEncryption();
        expect(util.getVal('input-answer')).toBe(msg)
        $$("cm-files-preview .file-image").then(function(elements){
            expect(elements.length).toEqual(1)
        })
    })

    it('send message & create conversation', function () {
        util.waitForElement("[data-qa='btn-send-answer']")
        $("[data-qa='btn-send-answer']").click()
        util.waitAndClickQa('btn-confirm','cm-modal.active')

        util.waitForElements('cm-message', 1)

        ptor.wait(function () {
            return util.getVal('input-answer').then(function (val) {
                return val == ""
            })
        })
    })

    it('fill out in created conversation', function () {
        util.setVal('input-answer', msg2)
    })

    it('check new conversation if empty message', function () {
        util.get('/talks')
        util.expectCurrentUrl('/talks')

        $("[data-qa='new-conversation-btn']").click()
        util.expectCurrentUrl('/conversation/new')

        expect(util.getVal('input-answer')).toBe('')
    })
})