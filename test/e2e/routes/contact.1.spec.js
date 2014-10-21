var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Route Contact: ', function () {
    var ptor = util.getPtorInstance()

    it('at first goto "#/contact/list".', function(){
        util.login()
        util.get('/contact/list')
        util.expectCurrentUrl('#/contact/list')
    })

    it('should have a contact list.', function(){
        util.waitForElement('cm-contact-list');
        expect($('cm-contact-list').isPresent()).toBe(true)
    })

    it('contacts should exists in list', function(){
        util.waitForElement('cm-contact-tag');
        var tags = $$('cm-contact-list cm-contact-tag')
        tags.count().then(function(count){
            expect(count).not.toEqual(0)
        })
    })

    describe('open internal contact', function(){
        it('search and click to detail',function(){
            util.headerSearchInList('internal')

            $$('cm-contact-list cm-contact-tag cm-avatar').first().click()
            util.expectCurrentUrl('#/contact/.*')
        })

        it('should be an internal cameo user', function(){
            util.waitForElement("[data-qa='internal-user']")

            expect($("[data-qa='internal-user']").isDisplayed()).toBe(true)
        })

        it('all inputs should be disabled', function(){
            var inputs = $$('.cm-contact-inputs input')

            inputs.each(function(input){
                input.isEnabled().then(function(boolean){
                    expect(boolean).toBeFalsy()
                })
            })
        })

        it('click on back button',function(){
            util.clickBackBtn()

            util.waitForPageLoad('/contact/list')
        })
    })

    describe('create external contact', function(){
        var userName = 'moeper_'+ Date.now();

        it('open modal and click create new contact',function(){
            util.expectCurrentUrl('#/contact/list')

            $("[data-qa='add-contact-btn']").click()

            $$('cm-modal.active .content a').last().click()

            util.expectCurrentUrl('#/contact/create')
        })

        it('all inputs should be enabled',function(){
            var inputs = $$('.cm-contact-inputs input')

            inputs.each(function(input){
                input.isEnabled().then(function(boolean){
                    expect(boolean).toBeTruthy()
                })
            })
        })

        it('create external contact', function(){
            $("[data-qa='input-displayname']").sendKeys(userName)
            $("[data-qa='input-phonenumber']").sendKeys('12345')
            $("[data-qa='input-email']").sendKeys('die@gibts.net')

            $('cm-footer button').click()
        })

        it('search and click to detail',function(){
            util.waitForPageLoad('/contact')
            util.waitForElement('cm-contact-tag')

            util.headerSearchInList(userName)

            expect($$('cm-contact-list cm-contact-tag cm-avatar').count()).toBe(1)
        })
    })
})