var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Contact', function () {

    var ptor = util.getPtorInstance();

    it('at first goto "#/contacts".', function(){
        util.login()
        util.get('/contacts')
        util.expectCurrentUrl('#/contacts')
    })

    it('should have a contact list.', function(){
//        util.waitForSpinner();
        util.waitForElement('cm-contacts-list');
        expect($('cm-contacts-list').isPresent()).toBe(true)
    })

    it('contacts should exists in list', function(){
        util.waitForElement('cm-contact-tag');
        var tags = $$('cm-contacts-list cm-contact-tag')
        tags.count().then(function(count){
            expect(count).not.toEqual(0)
        })
    })

    describe('open internal contact', function(){
        it('search and click to detail',function(){
            $("[data-qa='input-search']").sendKeys('internal')

            $$('cm-contacts-list cm-contact-tag cm-avatar').first().click()
            util.expectCurrentUrl('#/contact/.*')
        })

        it('should be an internal cameo user', function(){
            util.waitForElement('cm-contact-type')
            expect($('cm-contact-type').getAttribute('class')).toBe('internal')
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
            $('cm-back').click()
            util.expectCurrentUrl('#/contacts')
        })
    })

    describe('create external contact', function(){
        it('open modal and click create new contact',function(){
            util.expectCurrentUrl('#/contacts')

            $('[data-qa="add-contact-btn"]').click()

            $$('.modal-content a').last().click()

            util.expectCurrentUrl('#/contact/new')
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
            $("[data-qa='input-displayname']").sendKeys('moeper')
            $("[data-qa='input-phonenumber']").sendKeys('12345')
            $("[data-qa='input-email']").sendKeys('die@gibts.net')

            $('cm-footer button').click()

            util.waitForPageLoad('/contacts')
        })

        it('search and click to detail',function(){
            $("[data-qa='input-search']").sendKeys('moeper')

            expect($$('cm-contacts-list cm-contact-tag cm-avatar').count()).not.toBe(0)
        })
    })
})