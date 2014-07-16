var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('transfer formdata', function () {
    var ptor = util.getPtorInstance()

    it('registration', function(){
        util.get('/registration')
        // fill out form
        util.setVal('input-loginName','moeper')
        util.setVal('input-password','moep12345')
        util.setVal('input-passwordConfirm','moep12345')
        util.setVal('input-displayName','moepDisp')
        util.setVal('input-email','moep@moep.de')
        util.setVal('input-phone','123456')
        $("[data-qa='icon-checkbox-agb']").click()

        // do the transfer
        $("[data-qa='link-terms']").click()
        $(".back-wrap").click()

        // check if transfer succeed
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

    it('new conversation', function(){
        var msg = 'oida wird dit hier mitjenommen?';
        util.get('/login')
        util.login()

        util.get('/conversation/new')

        // fill out form
        util.setVal('input-answer',msg)

        // do the transfer
        util.disableEncryption();

        // check if transfer succeed
        expect(util.getVal('input-answer')).toBe(msg)


    })
})