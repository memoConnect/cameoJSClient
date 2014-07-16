var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")
var ptor = util.getPtorInstance()

describe('transfer formdata registration',function(){
    it('fill out registration',function() {
        util.get('/registration')
        util.expectCurrentUrl('/registration')

        util.waitForElement('[data-qa="input-loginName')
        util.waitForElement('[data-qa="input-password"]')
        util.waitForElement('[data-qa="input-passwordConfirm"]')
        util.waitForElement('[data-qa="input-displayName"]')
        util.waitForElement('[data-qa="input-email"]')
        util.waitForElement('[data-qa="input-phone"]')

        util.waitForElement("[data-qa='icon-checkbox-agb']")

        util.setVal('input-loginName', 'moeper')
        util.setVal('input-password', 'moep12345')
        util.setVal('input-passwordConfirm', 'moep12345')
        util.setVal('input-displayName', 'moepDisp')
        util.setVal('input-email', 'moep@moep.de')
        util.setVal('input-phone', '123456')


        $("body").sendKeys(protractor.Key.END) 

        ptor.wait(function(){
            console.log(util.getVal('input-phone'))
            return util.getVal('input-phone') == '+49123456'
        })

        $("[data-qa='icon-checkbox-agb']").click()
    })

    it('goto terms (do the transfer)',function() {
        $("[data-qa='link-terms']").click()
        $(".back-wrap").click()
    })

    it('check if transfer succeed',function(){
        expect(util.getVal('input-loginName')).toBe('moeper')
        expect(util.getVal('input-password')).toBe('')
        expect(util.getVal('input-passwordConfirm')).toBe('')
        expect(util.getVal('input-displayName')).toBe('moepDisp')
        expect(util.getVal('input-email')).toBe('moep@moep.de')
        expect(util.getVal('input-phone')).toBe('+49123456')

        expect($("[data-qa='icon-checkbox-agb']").getAttribute('class')).toContain('cm-checkbox-right')

        // try to reg user but without password error message are shown
        $("[data-qa='btn-createUser']").click()

        expect($("[data-qa='drtv-password-error-emtpy']").isDisplayed()).toBe(true)
    })
})

describe('transfer formdata conversation',function(){
    var msg = 'oida wird dit hier mitjenommen?',
        msg2 = 'juhu buhu'

    it('login', function() {
        util.get('/login')
        util.login()
    })

    it('open new conversation and fill out',function(){
        util.get('/conversation/new')
        util.setVal('input-answer',msg)
    })

    it('disabled encryption (do the transfer) and check if transfer succeed',function(){
        util.disableEncryption();
        expect(util.getVal('input-answer')).toBe(msg)
    })

    it('send message & create conversation',function(){
        $("[data-qa='btn-send-answer']").click()
        util.waitAndCloseNotify('checkbox-dont-ask-me-again', true)
        $("[data-qa='btn-send-answer']").click()

        util.waitForElements('cm-message',1)
        expect(util.getVal('input-answer')).toBe('')
    })

    it('fill out in created conversation',function(){
        util.setVal('input-answer',msg2)
    })

    it('check new conversation if empty message',function(){
        util.get('/talks')
        util.expectCurrentUrl('/talks')

        $("[data-qa='new-conversation-btn']").click()
        util.expectCurrentUrl('/conversation/new')

        expect(util.getVal('input-answer')).toBe('')
    })
})