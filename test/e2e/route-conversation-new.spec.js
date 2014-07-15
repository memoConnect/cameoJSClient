var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")


describe('Conversation encryption', function () {

    var ptor = util.getPtorInstance()

    /*
     Helper functions
     */


    var checkConversation = function (recipients, negativeAspects, positiveAspects, encryptionType) {

        var conversationId
        var subject = "subject_" + Date.now()
        var messages = []
        var sender = recipients[0]
        var password = Date.now()

        // use first recipient to create conversation
        it("create new conversation", function () {
            util.login(sender.login, "password")
            util.get("/conversation/new")
        })

        it("add recipients to conversation", function () {

            util.get("/conversation/new/recipients")

            $("[data-qa='btn-header-list-search']").click()

            for (var i = 1; i < recipients.length; i++) {
                var recipient = recipients[i]
                $("[data-qa='inp-list-search']").sendKeys(recipient.displayName)
                $("[data-qa='btn-select-contact']").click()
                $("[data-qa='btn-list-search-clear']").click()
            }

            $("[data-qa='btn-done']").click()
            util.expectCurrentUrl('/conversation/new')
        })

        it("the correct number of positive aspects should be displayed", function () {
            $('cm-icons.positive').findElements(by.css("i")).then(function (icons) {
                expect(icons.length).toBe(positiveAspects)
            })
        })
        it("the correct number of negative aspects should be displayed", function () {
            $('cm-icons.negative').findElements(by.css("i")).then(function (icons) {
                expect(icons.length).toBe(negativeAspects)
            })
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
                    expect($("[data-qa='btn-encryption']").findElement(by.css(".cm-checkbox-right")).isDisplayed()).toBe(true)

                    expect($("[data-qa='btn-toggle-captcha']").isDisplayed()).toBe(true)
                    expect($("[data-qa='btn-toggle-captcha']").findElement(by.css("cm-checkbox")).isDisplayed()).toBe(true)

                    expect(ptor.isElementPresent("cm-captcha']")).toBe(false)

                    expect($("[data-qa='input-password']").getText()).toBe("")
                    $("[data-qa='input-password']").sendKeys(password)

                    break;
            }

        })

        it("send initial message", function () {
            util.get("/conversation/new")

            $("[data-qa='input-subject']").sendKeys(subject)

            var initialMessage = "starting_conversation_" + Date.now();
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

//            it("login recipient", function() {
//                if(recipient.hasKey) {
//                    util.login(recipient.login, "password")
//                } else {
//
//                }
//            })

            it("recipient read message(s)", function () {
                util.get("/conversation/" + conversationId)

                util.waitForElements("cm-message", messages.length)

                $$('cm-message').then(function (elements) {
                    expect(elements.length).toBe(messages.length)
                    for (var j = 1; j < messages.length; j++) {
                        expect(elements[j].getText()).toContain(messages[j])
                    }
                })
            })

            it("recipient send response", function () {
                var message = "response_" + Date.now()
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

    it("generate key for second recipient", function () {
        util.login(config.contactUser1Login, "password")
        util.generateKey()
    })

    describe("asym key transmission:", function () {

        var recipients = [
            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: true},
            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true}
        ]
        checkConversation(recipients, 0, 2, "asym")
    })

//    describe("passCaptcha transmission:", function () {
//
//        var recipients = [
//            {login: config.loginUser1, displayName: config.displayNameUser1, hasKey: true},
//            {login: config.contactUser1Login, displayName: config.contactUser1DisplayName, hasKey: true},
//            {login: config.contactUser2Login, displayName: config.contactUser2DisplayName, hasKey: false}
//        ]
//        checkConversation(recipients, 1, 1, "password")
//    })


})
