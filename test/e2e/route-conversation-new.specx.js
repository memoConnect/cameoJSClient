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
        var getPurl = false
        var purl

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

                $("[data-qa='inp-list-search']").sendKeys(recipient.login)
                util.waitForElement("[data-qa='btn-select-contact']")
                $("[data-qa='btn-select-contact']").click()
                $("[data-qa='btn-list-search-clear']").click()

                if (recipient.external) {
                    getPurl = true
                }
            }

            $("[data-qa='btn-done']").click()
            util.expectCurrentUrl('/conversation/new')

        })

        it("add message text", function () {
            var text = "moep_message_" + Date.now();
            $("[data-qa='input-answer']").sendKeys(text)
            var message = {
                text: text,
                author: sender.login
            }
            messages.push(message)
        })

        it("show modal when security settings need to be adjusted", function () {

            if (encryptionType == "password" || encryptionType == "passCaptcha" || encryptionType == "none") {
                $("[data-qa='btn-send-answer']").click()
                util.waitAndCloseNotify()
            }
        })

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
                    $("[data-qa='input-password']").sendKeys(protractor.Key.TAB)
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
                    $("[data-qa='input-password']").sendKeys(protractor.Key.TAB)
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

            $("[data-qa='btn-send-answer']").click()

            // get conversation Id
            ptor.wait(function () {
                return ptor.getCurrentUrl().then(function (url) {
                    conversationId = url.split("/").pop()
                    return conversationId != "new"
                })
            }, 5000, 'unable to get conversation id')
        })

        it("get purl for external user (if needed)", function () {
            if (getPurl) {
                ptor.wait(function () {
                    return util.getTestUserNotifications(recipients[0].login).then(function (response) {
                        purl = response['data'][0]['content'].split("/p/")[1]
                        return purl != undefined
                    })
                }, 5000, 'unable to get conversation id')
            }
        })

        var checkMessages = function (recipient) {

            var conversationRoute

            it("login recipient", function () {
                if (recipient.external) {
                    conversationRoute = "/purl/" + purl
                } else {
                    util.login(recipient.login, "password")
                    conversationRoute = "/conversation/" + conversationId
                }
                util.get(conversationRoute)
            })


            it("enter password (if required)", function () {
                if (recipient.hasKey) {
                    $$("cm-modal.active").then(function (modals) {
                        expect(modals.length).toBe(0)
                    })
                } else {
                    switch (encryptionType) {

                        case "password" :
                            // expect password prompt
                            expect($("cm-modal.active .cm-modal-alert").isDisplayed()).toBe(true)
                            $("cm-modal.active").$(".body").$("a").click()
                            util.expectCurrentUrl(conversationRoute + "/security-settings")
                            $("[data-qa='input-password']").sendKeys(password)
                            $("[data-qa='btn-security-done']").click()
                            break;

                        case "passCaptcha" :
                            // expect password prompt
                            expect($("cm-modal.active .cm-modal-alert").isDisplayed()).toBe(true)
                            $("cm-modal.active").$(".body").$("a").click()
                            util.expectCurrentUrl(conversationRoute + "/security-settings")
                            expect(ptor.isElementPresent(by.css("cm-captcha"))).toBe(true)
                            $("[data-qa='input-password']").sendKeys(password)
                            $("[data-qa='btn-security-done']").click()
                            break;
                    }

                }
            })

            it("check security aspects", function () {
                util.waitForElement("cm-icons")
                $('cm-header:not(.ng-hide)').$('cm-icons.positive').$$("i").then(function (icons) {
                    expect(icons.length).toBe(positiveAspects)
                })
                $('cm-header:not(.ng-hide)').$('cm-icons.negative').$$("i").then(function (icons) {
                    expect(icons.length).toBe(negativeAspects)
                })
            })

            it("recipient read message(s)", function () {
                util.expectCurrentUrl(conversationRoute)
                util.waitForElements("cm-message", messages.length)

                $$('cm-message').then(function (elements) {
                    expect(elements.length).toBe(messages.length)
                    for (var j = 1; j < messages.length; j++) {
                        expect(elements[j].getText()).toContain(messages[j].text)
                        if (messages[j].author != recipient) {
                            expect(elements[j].$("[data-qa='message-author']").getText()).toBe(messages[j].author)
                        }
                    }
                })
            })

            it("recipient send response", function () {
                var text = "moep_message_" + Date.now()
                $("[data-qa='input-answer']").sendKeys(text)
                var message = {
                    text: text,
                    author: recipient.login
                }
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

    /*
     Tests start here
     */

    // creates conversation
    var testUserId1 = Math.random().toString(36).substring(2, 9)
    var testUser1 = "testUser23_" + testUserId1
    console.log("user1: " + testUser1)
    // recipient with key
    var testUserId2 = Math.random().toString(36).substring(2, 9)
    var testUser2 = "testUser23_" + testUserId2
    console.log("user2: " + testUser2)
    // recipient without key
    var testUserId3 = Math.random().toString(36).substring(2, 9)
    var testUser3 = "testUser23_" + testUserId3
    console.log("user3: " + testUser3)
    // external User
    var externalUser = "external_moep"

    describe("prepare tests", function () {

        it("create test user 1", function () {
            util.createTestUser(testUserId1)
        })

        it("create test user 2, generate key and send friend request", function () {
            util.createTestUser(testUserId2)
            util.generateKey()
            util.sendFriendRequest(testUser1)
        })

        it("create test user 3 and send friend request", function () {
            util.createTestUser(testUserId3)
            util.sendFriendRequest(testUser1)
        })

        it(" user 1 accept friend request", function () {
            util.login(testUser1, "password")
            util.acceptFriendRequests()
            util.addExternalContact(externalUser)
            util.generateKey()
        })
    })
    var password = Date.now()

    xdescribe("asym key transmission:", function () {

        var recipients = [
            {login: testUser1, hasKey: true},
            {login: testUser2, hasKey: true}
        ]

        checkConversation(recipients, 0, 2, "asym")
    })

    xdescribe("password transmission:", function () {
        var recipients = [
            {login: testUser1, hasKey: true},
            {login: testUser2, hasKey: true},
            {login: testUser3, hasKey: false},
            {login: externalUser, external: true, hasKey: false}
        ]
        checkConversation(recipients, 1, 1, "password")
        it("foo", function () {
            ptor.debugger()
        })

    })

    describe("passCaptcha transmission:", function () {
        var recipients = [
            {login: testUser1, hasKey: true},
            {login: testUser2, hasKey: true},
            {login: testUser3, hasKey: false},
            {login: externalUser, external: true, hasKey: false}
        ]
        checkConversation(recipients, 2, 1, "passCaptcha")
    })

    xdescribe("no encryption:", function () {
        var recipients = [
            {login: testUser1, hasKey: true},
            {login: testUser2, hasKey: true},
            {login: testUser3, hasKey: false},
            {login: externalUser, external: true, hasKey: false}
        ]
        checkConversation(recipients, 3, 0, "none")
    })

    xdescribe("no local private key", function () {

        it("delete key and create local key for user2", function () {
            util.clearLocalStorage()
            util.login(testUser2, "password")
            util.generateKey()
            util.login(testUser1, "password")
        })

        describe("conversation with user that has key", function () {
            var recipients = [
                {login: testUser1, hasKey: false},
                {login: testUser2, hasKey: true}
            ]
            checkConversation(recipients, 1, 1, "password")
        })

        xdescribe("conversation with users without keys", function () {
            var recipients = [
                {login: testUser1, hasKey: false},
                {login: testUser2, hasKey: true},
                {login: testUser3, hasKey: false},
                {login: externalUser, external: true, hasKey: false}
            ]
            checkConversation(recipients, 1, 1, "password")
        })

        xit("should not be able to open asym encrypted conversation", function () {

            util.headerSearchInList("asym_" + date)
            $("cm-conversation-tag").click()
            util.waitForElement("cm-message")
            util.waitAndCloseNotify()

            $$('cm-message').then(function (elements) {
                elements.forEach(function (element) {
                    expect(element.getText()).not.toContain("moep")
                })
            })
        })
    })

    xdescribe("no keys at all", function () {

        it("login and delete key of user 1", function () {
            util.login(testUser1, "password")
            util.click("btn-remove-modal")
            util.click("btn-remove-key")
            $$("[data-qa='key-list-item']").then(function (items) {
                expect(items.length).toBe(0)
            })
        })

        describe("conversation with user that has key", function () {
            var recipients = [
                {login: testUser1, hasKey: false},
                {login: testUser2, hasKey: true}
            ]
            checkConversation(recipients, 1, 1, "password")
        })

        describe("conversation with users without keys", function () {
            var recipients = [
                {login: testUser1, hasKey: false},
                {login: testUser2, hasKey: true},
                {login: testUser3, hasKey: false},
                {login: externalUser, external: true, hasKey: false}
            ]
            checkConversation(recipients, 1, 1, "password")
        })
    })

    describe("delete test users", function () {
        util.deleteTestUser(testUser1)
        util.deleteTestUser(testUser2)
        util.deleteTestUser(testUser3)
    })

})
