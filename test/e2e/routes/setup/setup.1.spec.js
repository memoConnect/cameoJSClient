var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Setup Routes: ', function () {
    var ptor = util.getPtorInstance(),
        testUser

    var phoneNumber = '+1234567890',
        email = 'devnull@cameo.io',
        displayName = 'Muchte'


    function hasClass(element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    describe('create testUser', function(){

        it('should create testUser', function(){
            testUser = util.createTestUser(undefined, 'setup routes')
        })
    })

    describe('check setup account route: ', function(){

        it('should be setup/account route', function(){
            util.expectCurrentUrl('/setup/account');
        })

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

        describe('check toggle information: ', function(){

            describe('check headline: ', function(){

                it('there should exist headline information ctn', function(){
                    expect($("[data-qa='ctn-toggle-headline']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle headline info', function(){
                    $("[data-qa='ctn-toggle-headline']").click();
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(false);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toggle-headline']").click();
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(false);
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
                util.waitAndClickQa('btn-next-step');
                util.waitForPageLoad('/setup/identity')
            })
        })
    })

    describe('check setup identity route: ', function(){

        it('should be setup/identity route', function(){
            util.expectCurrentUrl('/setup/identity');
        })

        describe('check form: ', function(){

            it('there should be one upload avatar', function(){
                $$("cm-upload-avatar").then(function (elements) {
                    expect(elements.length).toBe(1)
                })
            })

            it('there should be one avatar', function(){
                $$("cm-avatar").then(function (elements) {
                    expect(elements.length).toBe(1)
                })
            })

            it('there should be displayName input', function(){
                $$("input[data-qa='input-displayname']").then(function (elements) {
                    expect(elements.length).toBe(1)
                })
            })

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

        describe('check toggle information: ', function(){

            describe('check headline: ', function(){

                it('there should exist headline information ctn', function(){
                    expect($("[data-qa='ctn-toggle-headline']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle headline info', function(){
                    $("[data-qa='ctn-toggle-headline']").click();
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(false);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toggle-headline']").click();
                    expect($("[data-qa='info-headline-small']").isDisplayed()).toBe(true);
                    expect($("[data-qa='info-headline']").isDisplayed()).toBe(false);
                })
            })

            describe('check avatar: ', function(){

                it('there should exist avatar information ctn', function(){
                    expect($("[data-qa='ctn-toggle-avatar-info']").isDisplayed()).toBe(true);
                    expect($("[data-qa='ctn-avatar-info']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle headline info', function(){
                    $("[data-qa='ctn-toggle-avatar-info']").click();
                    expect($("[data-qa='ctn-avatar-info']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toggle-avatar-info']").click();
                    expect($("[data-qa='ctn-avatar-info']").isDisplayed()).toBe(false);
                })
            })

            describe('check cameoid: ', function(){

                it('there should exist cameoid information ctn', function(){
                    expect($("[data-qa='ctn-toggle-cameoid-info']").isDisplayed()).toBe(true);
                    expect($("[data-qa='ctn-cameoid-info']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle headline info', function(){
                    $("[data-qa='ctn-toggle-cameoid-info']").click();
                    expect($("[data-qa='ctn-cameoid-info']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toggle-cameoid-info']").click();
                    expect($("[data-qa='ctn-cameoid-info']").isDisplayed()).toBe(false);
                })
            })

            describe('check displayname: ', function(){

                it('there should exist displayname information ctn', function(){
                    expect($("[data-qa='ctn-toggle-displayname-info']").isDisplayed()).toBe(true);
                    expect($("[data-qa='ctn-displayname-info']").isDisplayed()).toBe(false);
                })

                it('should be changed displayed info, after click on toogle headline info', function(){
                    $("[data-qa='ctn-toggle-displayname-info']").click();
                    expect($("[data-qa='ctn-displayname-info']").isDisplayed()).toBe(true);

                    $("[data-qa='ctn-toggle-displayname-info']").click();
                    expect($("[data-qa='ctn-displayname-info']").isDisplayed()).toBe(false);
                })
            })
        })

        describe('save account data', function(){
            it('should be set displayname value', function(){
                expect($("[data-qa='input-displayname']").isDisplayed()).toBe(true);
                $("[data-qa='input-displayname']").sendKeys(displayName)
            })

            it('should be set phonenumber value', function(){
                expect($("[data-qa='input-phoneNumber']").isDisplayed()).toBe(true);
                $("[data-qa='input-phoneNumber']").sendKeys(phoneNumber)
            })

            it('should be set email value', function(){
                expect($("[data-qa='input-email']").isDisplayed()).toBe(true);
                $("[data-qa='input-email']").sendKeys(email)
            })

            it('should be save data and go to next step', function(){
                util.waitAndClickQa('btn-next-step');
                util.waitForPageLoad('/settings/identity/key/create')
            })
        })
    })

    describe('check settings identity key create: ', function(){

        it('should be settings/identity/key/create route', function(){
            util.expectCurrentUrl('/settings/identity/key/create');
        })

        it('a key should be created and saved', function(){
            /**
             * see identity-keys.1.spec.js Line 60
             */
            var expectedTimeout = util.setKeygenerationTimeout(jasmine);
            util.waitForElementVisible("[data-qa='page-save-key']",expectedTimeout)
            util.waitAndClickQa('btn-save-key')
        })
    })

    describe('check information which was set in setup ', function(){

        it('should be talks route', function(){
            util.waitForPageLoad('/talks')
            util.expectCurrentUrl('/talks')
        })

        describe('check bell', function(){
            it('bell should ring', function(){
                var signal = $("cm-notify-signal i")

                $$("cm-notify-signal").then(function (elements) {
                    expect(elements.length).toBe(1)
                })

                expect(hasClass(signal,'cm-orange')).toBe(true)

            })
        })

        describe('check account data', function(){
            it('should go to account settings', function(){
                util.get('/settings/account')
                util.expectCurrentUrl('/settings/account')
            })

            it('phonenumber should be equal', function(){
                expect(util.getVal('input-phoneNumber')).toBe(phoneNumber)
            })

            it('email should be equal', function(){
                expect(util.getVal('input-email')).toBe(email)
            })
        })

        describe('check identity data', function(){
            it('should go to account settings', function(){
                util.get('settings/identity/edit')
                util.expectCurrentUrl('settings/identity/edit')
            })

            it('display name should be equal', function(){
                expect(util.getVal('input-displayname')).toBe(displayName)
            })

            it('phonenumber should be equal', function(){
                expect(util.getVal('input-phoneNumber')).toBe(phoneNumber)
            })

            it('email should be equal', function(){
                expect(util.getVal('input-email')).toBe(email)
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