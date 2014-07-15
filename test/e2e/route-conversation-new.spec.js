var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")


describe('Conversation encryption', function () {

    var ptor = util.getPtorInstance()
    var date = Date.now()

    /*
     Helper functions
     */
    var checkConversation = function (recipients, negativeAspects, positiveAspects, encryptionType) {

        var conversationId
        var messages = []
        var sender = recipients[0]

        // use first recipient to create conversation
        it("create new conversation", function () {
            util.login(sender.login, "password")
            util.get("/conversation/new")
        })

        it("add subject", function () {
            $("[data-qa='input-subject']").sendKeys(encryptionType + "_" + date)
        })

        it("add recipients to conversation", function () {

            util.get("/conversation/new/recipients")

            $("[data-qa='btn-header-list-search']").click()

            for (var i = 1; i < recipients.length; i++) {
                var recipient = recipients[i]
                $("[data-qa='inp-list-search']").sendKeys(recipient.displayName)
                util.waitForElement("[data-qa='btn-select-contact']")
                $("[data-qa='btn-select-contact']").click()
                $("[data-qa='btn-list-search-clear']").click()
            }

            $("[data-qa='btn-done']").click()
            util.expectCurrentUrl('/conversation/new')

        })

        // todo check warnings
        it("set encryption settings", function () {
            util.get("/conversation/new/security-settings")

            switch (encryptionType) {
                case "asym" :
                    expect($("[data-qa='btn-encryption']").isDisplayed()).toBe(true)
                    expect($("[data-qa='btn-encryption']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                    expect(ptor.isElementPresent(by.css("[data-qa='btn-toggle-captcha']"))).toBe(false)
                    expect(ptor.isElementPresent(by.css("cm-captcha"))).toBe(false)
                    break;

                case "password" :
                    expect($("[data-qa='btn-encryption']").isDisplayed()).toBe(true)
                    expect($("[data-qa='btn-encryption']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                    expect($("[data-qa='btn-toggle-captcha']").isDisplayed()).toBe(true)
                    expect($("[data-qa='btn-toggle-captcha']").isElementPresent(by.css(".cm-checkbox"))).toBe(true)
                    expect(ptor.isElementPresent(by.css("cm-captcha"))).toBe(false)
                    expect($("[data-qa='input-password']").getAttribute('value')).toBe("")
                    $("[data-qa='input-password']").sendKeys(password)
                    break;

                case "passCaptcha" :
                    expect($("[data-qa='btn-encryption']").isDisplayed()).toBe(true)
                    expect($("[data-qa='btn-encryption']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                    $("[data-qa='btn-toggle-captcha']").click()
                    expect($("[data-qa='btn-toggle-captcha']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                    expect(ptor.isElementPresent(by.css("cm-captcha"))).toBe(true)
                    expect($("[data-qa='input-password']").getAttribute('value')).not.toBe("")
                    util.clearInput('input-password')
                    $("[data-qa='input-password']").sendKeys(password)
                    break;

                case "none" :
                    expect($("[data-qa='btn-encryption']").isDisplayed()).toBe(true)
                    expect($("[data-qa='btn-encryption']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                    $("[data-qa='btn-encryption']").click()
                    expect(ptor.isElementPresent(by.css("[data-qa='btn-toggle-captcha']"))).toBe(false)
                    expect(ptor.isElementPresent(by.css("cm-captcha"))).toBe(false)
                    break;

            }
            $("[data-qa='btn-security-done']").click()
        })

        it("check security aspects", function () {
            util.expectCurrentUrl("/conversation/new")
            $('cm-header:not(.ng-hide)').$('cm-icons.positive').$$("i").then(function (icons) {
                expect(icons.length).toBe(positiveAspects)
            })
            $('cm-header:not(.ng-hide)').$('cm-icons.negative').$$("i").then(function (icons) {
                expect(icons.length).toBe(negativeAspects)
            })
        })

        it("send initial message", function () {
            var initialMessage = "moep_message_" + Date.now();
            $("[data-qa='input-answer']").sendKeys(initialMessage)
            messages.push(initialMessage)

            $("[data-qa='btn-send-answer']").click()

            // get conversation Id
            ptor.wait(function () {
                return ptor.getCurrentUrl().then(function (url) {
                    conversationId = url.split("/").pop()
                    return conversationId != "new"
                })
            }, 5000, 'unable to get conversation id')

        })

        var checkMessages = function (recipient) {

            it("login recipient", function () {
                util.login(recipient.login, "password")
                util.get("/conversation/" + conversationId)
            })


            it("enter password (if required)", function () {
                if (!recipient.hasKey) {
                    switch (encryptionType) {
                        case "password" :
                            // expect password promt
                            expect($(".cm-modal-alert").isDisplayed()).toBe(true)
                            $("cm-modal").$(".body").$("a").click()

                            util.expectCurrentUrl("/conversation/" + conversationId + "/security-settings")
                            $("[data-qa='input-password']").sendKeys(password)
                            $("[data-qa='btn-security-done']").click()
                            break;

                        case "passCaptcha" :
                            // expect password promt
                            expect($(".cm-modal-alert").isDisplayed()).toBe(true)
                            $("cm-modal").$(".body").$("a").click()

                            util.expectCurrentUrl("/conversation/" + conversationId + "/security-settings")
                            expect(ptor.isElementPresent(by.css("cm-captcha"))).toBe(true)
                            $("[data-qa='input-password']").sendKeys(password)
                            $("[data-qa='btn-security-done']").click()
                            break;
                    }

                }
            })

            it("check security aspects", function () {
                $('cm-header:not(.ng-hide)').$('cm-icons.positive').$$("i").then(function (icons) {
                    expect(icons.length).toBe(positiveAspects)
                })
                $('cm-header:not(.ng-hide)').$('cm-icons.negative').$$("i").then(function (icons) {
                    expect(icons.length).toBe(negativeAspects)
                })
            })

            it("recipient read message(s)", function () {
                util.expectCurrentUrl("/conversation/" + conversationId)
                util.waitForElements("cm-message", messages.length)

                $$('cm-message').then(function (elements) {
                    expect(elements.length).toBe(messages.length)
                    for (var j = 1; j < messages.length; j++) {
                        expect(elements[j].getText()).toContain(messages[j])
                    }
                })
            })

            it("recipient send response", function () {
                var message = "moep_message_" + Date.now()
                $("[data-qa='input-answer']").sendKeys(message)
                messages.push(message)
                $("[data-qa='btn-send-answer']").click()
            })
        }

        // login as all other recipients and send a message
        recipients.forEach(function (recipient, index) {
            if (index > 0) {
                checkMessages(recipient, messages)
            }
        })

        describe("sender should be able to read all messages", function () {
            checkMessages(recipients[0], messages)
        })
    }


    // generate key for both users
    it("generate key for first recipient", function () {
        util.login(config.loginUser1, "password")
        util.generateKey()
    })

//    it("generate key for second recipient", function () {
//        util.login(config.contactUser1Login, "password")
//        util.generateKey()
//    })

    var password = Date.now()

//    describe("asym key transmission:", function () {
//
//        var recipients = [
//            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: true},
//            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true}
//        ]
//        checkConversation(recipients, 0, 2, "asym")
//    })

    describe("password transmission:", function () {
        var recipients = [
            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: true},
//            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true},
            {login: config.contact2User1Login, displayName: config.contact2User1DisplayName, hasKey: false}
        ]
        checkConversation(recipients, 1, 1, "password")
    })

//    describe("passCaptcha transmission:", function () {
//        var recipients = [
//            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: true},
////            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true},
//            {login: config.contact2User1Login, displayName: config.contact2User1DisplayName, hasKey: false}
//        ]
//        checkConversation(recipients, 2, 1, "passCaptcha")
//    })

//    describe("no encryption:", function () {
//        var recipients = [
//            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: true},
////            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true},
//            {login: config.contact2User1Login, displayName: config.contact2User1DisplayName, hasKey: false}
//        ]
//        checkConversation(recipients, 3, 0, "none")
//    })

//    it("delete keys", function () {
//        util.clearLocalStorage()
//    })
//    it("generate key for second recipient", function () {
//        util.login(config.contactUser1Login, "password")
//        util.generateKey()
//    })
//
//    describe("without local key:", function () {
//        var recipients = [
//            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: false},
//            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true}
////            {login: config.contact2User1Login, displayName: config.contact2User1DisplayName, hasKey: false}
//        ]
//        checkConversation(recipients, 1, 1, "password")
//    })

//    describe("")

//    describe("after key deletion", function () {
//
//        it("delete key and login", function () {
//            util.clearLocalStorage()
//            util.login(config.loginUser1, "password")
//        })
//
//        it("should not be able to open asym encrypted conversation", function () {
//
//            util.headerSearchInList("asym_" + date)
//            $("cm-conversation-tag").click()
//
//            util.waitForElement("cm-message")
//            expect($("cm-modal").isDisplayed()).toBe(true)
//            $("[data-qa='cm-modal-close-btn']").click()
//            $$('cm-message').then(function (elements) {
//                elements.forEach(function (element) {
//                    expect(element.getText()).not.toContain("moep")
//                })
//            })
//        })
//    })

})
