var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route Contact: ', function () {
    var ptor = util.getPtorInstance(),
        extUserName = 'moeper_'+ Date.now(),
        extUserTel = '+4912345678',
        extUserMail1 = 'devnull@cameo.io',
        extUserMail2 = 'devnull1@cameo.io',
        testUser

    it('should create a test user', function(){
        util.createTestUser(undefined,'route contact')
        .then(function(loginName){
            testUser = loginName
        })
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

        it('open create new contact',function(){
            util.waitAndClickQa('add-contact-btn')
            .then(function(){
                return util.waitForPageLoad('/contact/create')
            })
        })

        it('all inputs should be enabled',function(){
            var inputs = $$('.cm-contact-inputs input')

            inputs.each(function(input){
                input.isEnabled().then(function(boolean){
                    expect(boolean).toBeTruthy()
                })
            })
        })

        it('should create external contact', function(){
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
            .then(function(){
                return util.waitForElement('cm-contact-tag')
            })
            .then(function(){
                return util.headerSearchInList(extUserName)
            })
            .then(function(){
                return  ptor.wait(function(){
                            return $$('cm-contact-tag').then(function(elements){ return elements.length == 1})
                        })
            }).then(function(){
                    util.closeHeaderSearch()
            })


        })

        it('should find external user after logout/login (1)', function(){
            util.login(testUser, 'password')

            .then(function(){
                util.get('/contact')
                return util.waitForPageLoad('/contact')
            })
            .then(function(){
                util.headerSearchInList(extUserName)
                return $$('cm-contact-list cm-contact-tag cm-avatar').first().click()
            })
            .then(function(){
                return util.waitForPageLoad('/contact/.*')
            })

        })

        it('should be the same details in contact (1)', function(){
            util.waitForQa('input-displayname')
            .then(function(){
                return util.getVal('input-displayname')
            })
            .then(function(value){
                expect(value).toBe(extUserName)
                return util.waitForQa('input-phoneNumber');
            })
            .then(function(){
                return util.getVal('input-phoneNumber')    
            })
            .then(function(value){
                expect(value).toBe(extUserTel)
                return util.waitForQa('input-email');
            })
            .then(function(){
                return util.getVal('input-email')
            })
            .then(function(value){
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

    describe('search btn should be link to contact search', function(){
        it('open create new contact',function(){
            util.get('/contact/list')
            util.expectCurrentUrl('#/contact/list')

            util.waitAndClickQa('add-contact-btn')
                .then(function(){
                    return util.waitForPageLoad('/contact/create')
                })
        })

        it('search btn should be displayed', function(){
            expect($("[data-qa='btn-identity-search']").isDisplayed()).toBe(true)
        })

        it('on lick on search btn, route should change to contact/search', function(){
            util.waitAndClickQa('btn-identity-search')
            .then(function(){
                return util.waitForPageLoad('/contact/search')
            })
        })

    })

    it('delete test user', function(){
        util.deleteTestUser(testUser)
    })
})