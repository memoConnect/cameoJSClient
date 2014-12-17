var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Setup Routes: ', function () {
    var ptor = util.getPtorInstance(),
        testUser

    var phoneNumber = '+1234567890',
        email = 'devnull@cameo.io',
        displayName = 'Muchte'

    describe('create testUser', function(){
        it('should create testUser', function(){
            testUser = util.createTestUser(undefined, 'setup routes')
        })
    })

    describe('check setup account route: ', function(){
        describe('check form: ', function(){
            it('there should be one "cm-form-phonenumber"', function(){
                $$("cm-form-phonenumber").then(function (elements) {
                    expect(elements.length).toBe(1)
                })
            })

            it('there should be one "cm-form-email"', function(){
                $$("cm-form-email").then(function (elements) {
                    expect(elements.length).toBe(1)
                })
            })

            it('there should be one footer', function(){
                $$("cm-footer").then(function (elements) {
                    expect(elements.length).toBe(1)
                })
            })
        })

        describe('check toogle informations: ', function(){
            describe('check headline: ', function(){
                it('there should exist headline information ctn', function(){
                    expect($("[data-qa='ctn-toggle-headline']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle headline info', function(){
                    $("[data-qa='ctn-toogle-headline']").click();
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(false);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toogle-headline']").click();
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(false);
                })
            })

            describe('check phoneNumber: ', function(){
                it('there should exist phonenumber information ctn', function(){
                    expect($("[data-qa='ctn-toggle-phone']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-phone-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-phone']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle phonenumber info', function(){
                    $("[data-qa='ctn-toogle-phone']").click();
                    expect($("[data-qa='info-phone-small']").isDisplayed()).toBe(false);
                    expect($("[data-qa='info-phone']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toogle-phone']").click();
                    expect($("[data-qa='info-phone-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-phone']").isDisplayed()).toBe(false);
                })
            })

            describe('check email: ', function(){
                it('there should exist email information ctn', function(){
                    expect($("[data-qa='ctn-toggle-phone']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-phone-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-phone']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle email info', function(){
                    $("[data-qa='ctn-toogle-email']").click();
                    expect($("[data-qa='info-email-small']").isDisplayed()).toBe(false);
                    expect($("[data-qa='info-email']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toogle-email']").click();
                    expect($("[data-qa='info-email-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-email']").isDisplayed()).toBe(false);
                })
            })
        })

        describe('save account data', function(){
            it('should be set phonenumber value', function(){
                expect($("[data-qa='input-phoneNumber']").isDisplayed()).toBe(true);
                $("[data-qa='input-phoneNumber']").sendKeys(phoneNumber)
            })

            it('should be set email value', function(){
                expect($("[data-qa='input-email']").isDisplayed()).toBe(true);
                $("[data-qa='input-email']").sendKeys(email)
            })

            it('should be save data and go to next step', function(){
                util.waitAndClickQa('ctn-toogle-email');
            })
        })
    })

    describe('remove testUser', function(){
        it('should logout', function(){
            util.logout();
        })

        it('should delete testUser', function(){
            util.deleteTestUser(testUser)
        })
    })
})