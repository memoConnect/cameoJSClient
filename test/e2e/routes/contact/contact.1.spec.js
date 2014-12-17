var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

xdescribe('Route Contact: ', function () {
    var ptor = util.getPtorInstance(),
        extUserName = 'moeper_'+ Date.now(),
        extUserTel = '+4912345678',
        extUserMail1 = 'devnull@cameo.io',
        extUserMail2 = 'devnull1@cameo.io',
        testUser

    it('should create a test user', function(){
        testUser = util.createTestUser(undefined,'route contact')
    })

    it('at first goto "#/contact/list".', function(){
        util.get('/contact/list')
        util.expectCurrentUrl('#/contact/list')
    })

    it('should have a contact list.', function(){
        util.waitForElement('cm-contact-list');
        expect($('cm-contact-list').isPresent()).toBe(true)
    })

    it('contacts should exists in list (min Support User)', function(){
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

        it('open modal and click create new contact',function(){
            util.expectCurrentUrl('#/contact/list')

            //$("[data-qa='add-contact-btn']").click()
            util.waitAndClickQa('add-contact-btn');

            //$$('cm-modal.active .content a').last().click()
            util.waitAndClickQa('btn-modal-contact-create');

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
            util.setVal('input-displayname', extUserName)
            util.setVal('input-phoneNumber', extUserTel)
            util.setVal('input-email', extUserMail1)

            $('cm-footer button').click()
            // close notify extern modal
            util.waitForModalOpen()
            util.waitAndClickQa('btn-cancel','cm-modal.active')
        })

        it('search and click to detail',function(){
            util.waitForPageLoad('/contact/list')
            util.waitForElement('cm-contact-tag')

            util.headerSearchInList(extUserName)

            //expect($$('cm-contact-list cm-contact-tag cm-avatar').count()).toBe(1)
            ptor.sleep(50)
            expect($$('cm-contact-tag').count()).toBe(1)
        })

        it('should find external user after logout/login (1)', function(){
            util.login(testUser, 'password');

            util.get('/contact')
            util.waitForPageLoad('/contact')

            util.headerSearchInList(extUserName)
            $$('cm-contact-list cm-contact-tag cm-avatar').first().click()
            util.expectCurrentUrl('#/contact/.*')
        })

        it('should be the same details in contact (1)', function(){
            util.waitForQa('input-displayname');
            util.getVal('input-displayname').then(function(value){
                expect(value).toBe(extUserName)
            })

            util.waitForQa('input-phoneNumber');
            util.getVal('input-phoneNumber').then(function(value){
                expect(value).toBe(extUserTel)
            })

            util.waitForQa('input-email');
            util.getVal('input-email').then(function(value){
                expect(value).toBe(extUserMail1)
            })
        })

        it('should update external User', function(){
            util.clearInput('input-phoneNumber')

            util.clearInput('input-email')
            util.setVal('input-email', extUserMail2)

            $('cm-footer button').click()

            util.waitForQa('btn-pristineBack');
        })

        it('should be the same details in contact after updating', function(){
            util.waitForQa('input-displayname');
            util.getVal('input-displayname').then(function(value){
                expect(value).toBe(extUserName)
            })

            util.waitForQa('input-phoneNumber');
            util.getVal('input-phoneNumber').then(function(value){
                expect(value).toBe('')
            })

            util.waitForQa('input-email');
            util.getVal('input-email').then(function(value){
                expect(value).toBe(extUserMail2)
            })
        })

        it('should find external user after logout/login (2)', function(){
            util.login(testUser, 'password');

            util.get('/contact')
            util.waitForPageLoad('/contact')

            util.headerSearchInList(extUserName)
            $$('cm-contact-list cm-contact-tag cm-avatar').first().click()
            util.expectCurrentUrl('#/contact/.*')
        })

        it('should be the same details in contact (2)', function(){
            util.waitForQa('input-displayname');
            util.getVal('input-displayname').then(function(value){
                expect(value).toBe(extUserName)
            })

            util.waitForQa('input-phoneNumber');
            util.getVal('input-phoneNumber').then(function(value){
                expect(value).toBe('')
            })

            util.waitForQa('input-email');
            util.getVal('input-email').then(function(value){
                expect(value).toBe(extUserMail2)
            })
        })
    })

    it('delete test user', function(){
        util.deleteTestUser(testUser)
    })
})