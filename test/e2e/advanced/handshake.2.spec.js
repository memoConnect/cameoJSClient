var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Authentication requests -', function () {
    var ptor = util.getPtorInstance()

    var testUser1Id = Math.random().toString(36).substring(2, 9)
    var testUser1 = "testUser23_" + testUser1Id
    var testUser2Id = Math.random().toString(36).substring(2, 9)
    var testUser2 = "testUser23_" + testUser2Id

    var identityId
    var identityId2

    var keyName1 = "moeps key 1"
    var keyName2 = "moeps key 2"
    var keyName3 = "moeps key 3"
    var keyName4 = "moeps key 4"

    var subject1 = "subject1"
    var subject2 = "subject2"
    var subject3 = "subject3"

    var encryptedMessage1 = "moep die moep die moep"
    var encryptedMessage2 = "moeps die moeps die moeps"
    var encryptedMessage3 = "foo baa foo baa foo baa foo baa"

    var keyId2

    var localStorage1
    var localStorage2
    var localStorage3

    var eventSubscription
    var eventSubscription2

    var token
    var token2

    var transactionSecret
    var transactionSecret2

    var authEvents = []
    var cancelEvent = {
        name: "authenticationRequest:cancel",
        data: {}
    }

    var checkKeyTrust = function (keyName, isTrusted) {
        $$("[data-qa='key-list-item']").then(function (keys) {
            keys.forEach(function (key) {
                key.getText().then(function (text) {
                    if (text.search(keyName) > -1) {
                        if (isTrusted) {
                            expect(text).toContain("trusted")
                            expect(text).not.toContain("untrusted")
                        } else {
                            expect(text).toContain("untrusted")
                        }
                    }
                })
            })
        })
    }

    var getAuthEvent = function (token, eventSubscription, index, skip) {
        var s = skip || 0
        var events = []
        var get = function () {
            util.getEvents(token, eventSubscription).then(function (res) {

                var e = res.data.events.filter(function (event) {
                    return event.name == "authenticationRequest:start"
                })

                if (e.length > 0) {
                    events.push.apply(events, e)
                }

                if (events.length <= s) {
                    get()
                } else {
                    delete events[s].data.toKeyId
                    authEvents[index] = events[s]
                }
            })
        }
        get()
    }

    describe("key1 -", function () {

        it("create test user, generate key and export localStorage", function () {
            util.createTestUser(testUser1Id)
            util.generateKey(1, keyName1)
            checkKeyTrust(keyName1, true)
        })

        it("create encrypted conversation", function () {
            util.createEncryptedConversation(subject1, encryptedMessage1)
        })

        it("export localstorage (key1) and get token", function () {
            util.getLocalStorage().then(function (lsexport) {
                localStorage1 = lsexport
            })
            util.getToken().then(function (res) {
                token = res
            })
        })

        it("get event subscription", function () {
            util.getEventSubscription(token).then(function (res) {
                eventSubscription = res
            })
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })

    })

    describe("key3 -", function () {

        it("generate key3", function () {
            util.login(testUser1, "password")
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 1)
            util.generateKey(3, keyName3)
            util.getLocalStorage().then(function (lsexport) {
                localStorage3 = lsexport
            })
        })

        it("a modal asking for authentication should open", function () {
            util.waitForEventSubscription()
            util.waitAndClickQa('btn-start-authentication')
        })

        it("get transaction secret", function () {
            util.waitForElement("[data-qa='transaction-secret-value']")
            $("[data-qa='transaction-secret-value']").getText().then(function (text) {
                transactionSecret = text
            })
        })

        it("get authentication:start event", function () {
            getAuthEvent(token, eventSubscription, 0)
            ptor.wait(function () {
                return authEvents[0] != undefined
            })
        })

        it("get identityId from event", function () {
            identityId = authEvents[0].fromIdentityId
        })

        it("abort request", function () {
            util.waitAndClickQa("btn-cancel-authentication")
            util.waitForElementDisappear("[data-qa='transaction-secret-value']")
        })

        it("create encrypted conversation", function () {
            util.createEncryptedConversation(subject3, encryptedMessage3)
        })

        it("should not be able to read conversation from key1", function () {
            util.readConversation(subject1, "- encrypted -")
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })
    })

    describe("key1 again -", function () {

        it("import key", function () {
            util.setLocalStorage(localStorage1.key, localStorage1.value)
            util.login(testUser1, "password")
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 2)
            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName3, false)
            util.waitForEventSubscription()
        })

        it("send authentication:start event", function () {
            util.broadcastEvent(token, authEvents[0])
        })

        it("a modal asking for authentication start should open", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("send cancel event", function () {
            util.broadcastEvent(token, cancelEvent)
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            util.waitAndClick("cm-modal.active [data-qa='cm-modal-close-btn']")
        })

        it("resend authentication:start event", function () {
            util.broadcastEvent(token, authEvents[0])
        })

        it("the modal asking for authentication start should open again", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("enter transaction secret and submit", function () {
            util.setVal("inp-transactSecret", transactionSecret)
            util.waitAndClick("cm-modal.active [data-qa='btn-acceptRequest']")
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            ptor.sleep(5000)
        })

        it("get authentication:start event", function () {
            getAuthEvent(token, eventSubscription, 1, 2)
            ptor.wait(function () {
                return authEvents[1] != undefined
            })
        })

        it("both keys should now be trusted", function () {
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 2)
            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName3, true)
        })

        it("should not be able to read conversation from key3", function () {
            util.readConversation(subject3, encryptedMessage3)
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })

    })

    describe("key3 again -", function () {

        it("import key3", function () {
            util.setLocalStorage(localStorage3.key, localStorage3.value)
            util.login(testUser1, "password")
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 2)
            checkKeyTrust(keyName1, false)
            checkKeyTrust(keyName3, true)
            util.waitForEventSubscription()
        })

        it("send authentication:start event from key1", function () {
            util.broadcastEvent(token, authEvents[1])
        })

        it("a modal asking for authentication start should open", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("enter transaction secret and submit", function () {
            util.setVal("inp-transactSecret", transactionSecret)
            util.waitAndClickQa('btn-acceptRequest')
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("both keys should now be trusted", function () {
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 2)
            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName3, true)
        })

        it("should be able to read conversation from key1", function () {
            util.readConversation(subject1, encryptedMessage1)
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })

    })

    describe("key2 -", function () {

        it("generate key2", function () {
            util.login(testUser1, "password", "/start")
            util.generateKey(2, keyName2)
            util.waitForPageLoad("/authentication")
            util.get("/settings/identity/key/list")
            util.waitForPageLoad("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
            checkKeyTrust(keyName1, false)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, false)
            util.getLocalStorage().then(function (lsexport) {
                localStorage2 = lsexport
            })
            util.waitForEventSubscription()
        })

        it("get keyId of key2", function () {
            $$("[data-qa='key-list-item']").then(function (keys) {
                keys[0].click()
                util.waitForElement("[data-qa='input-public-key']")

                $("[data-qa='fingerprint-public-key']").getText().then(function (text) {
                    keyId2 = text
                })
            })

            ptor.wait(function () {
                return keyId2 != undefined
            })
        })

        it("create encrypted conversation", function () {
            util.createEncryptedConversation(subject2, encryptedMessage2)
            util.get("/settings/identity/key/list")
        })

        it("send authentication:start event from key1", function () {
            var event = authEvents[1]
            event.toKeyId = keyId2
            util.broadcastEvent(token, event)
        })

        it("a modal asking for authentication start should open", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("enter transaction secret and submit", function () {
            util.setVal("inp-transactSecret", transactionSecret)
            util.waitAndClickQa('btn-acceptRequest')
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("all three keys should now be trusted", function () {
            util.waitForElements("[data-qa='key-list-item']", 3)

            ptor.wait(function () {
                return $("cm-identity-key-list").getText().then(function (text) {
                    return text.indexOf("untrusted") == -1
                })
            })

            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, true)
        })

        it("get authentication:start event from key2", function () {
            getAuthEvent(token, eventSubscription, 2, 2)
            ptor.wait(function () {
                return authEvents[2] != undefined
            })
        })

        it("should be not able to read conversation from key1", function () {
            util.readConversation(subject1 , "- encrypted -")
        })

        it("should be not able to read conversation from key3", function () {
            util.readConversation(subject3, "- encrypted -")
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })
    })

    describe("key1 yet again -", function () {

        it("import key1", function () {
            util.setLocalStorage(localStorage1.key, localStorage1.value)
            util.login(testUser1, "password")
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName2, false)
            checkKeyTrust(keyName3, true)
            util.waitForEventSubscription()
        })

        it("send authentication:start event from key2", function () {
            util.broadcastEvent(token, authEvents[2])
        })

        it("a modal asking for authentication start should open", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("enter transaction secret and submit", function () {
            util.setVal("inp-transactSecret", transactionSecret)
            ptor.debugger()
            util.waitAndClickQa('btn-acceptRequest')
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("all three keys should now be trusted", function () {
            util.waitForElements("[data-qa='key-list-item']", 3)

            ptor.wait(function () {
                return $("cm-identity-key-list").getText().then(function (text) {
                    return text.indexOf("untrusted") == -1
                })
            })

            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, true)
        })

        it("should be able to read conversation from key2", function () {
            util.readConversation(subject2, encryptedMessage2)
        })

        it("should be able to read conversation from key3", function () {
            util.readConversation(subject3, encryptedMessage3)
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })
    })

    describe("key3 yet again -", function () {

        it("import key3", function () {
            util.setLocalStorage(localStorage3.key, localStorage3.value)
            util.login(testUser1, "password")
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
        })

        it("all three keys should now be trusted", function () {
            ptor.wait(function () {
                return $("cm-identity-key-list").getText().then(function (text) {
                    return text.indexOf("untrusted") == -1
                })
            })

            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, true)
        })

        it("should be able to read conversation from key1", function () {
            util.readConversation(subject1, encryptedMessage1)
        })

        it("should be able to read conversation from key2", function () {
            util.readConversation(subject2, encryptedMessage2)
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })
    })

    describe("key2 again -", function () {
        it("import key2", function () {
            util.setLocalStorage(localStorage2.key, localStorage2.value)
            util.login(testUser1, "password")
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
        })

        it("all three keys should now be trusted", function () {
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, true)
        })

        it("should be able to read conversation from key1", function () {
            util.readConversation(subject1, encryptedMessage1)
        })

        it("should be able to read conversation from key3", function () {
            util.readConversation(subject3, encryptedMessage3)
        })
    })

    describe("trust other user -", function () {

        describe("testuser 2 -", function () {

            it("create testuser2 and generate key", function () {
                util.createTestUser(testUser2Id)
                util.generateKey(4, keyName4)
            })

            it("send friendrequest to testuser1", function () {
                util.sendFriendRequest(testUser1)
            })

            it("get token", function () {
                util.getToken().then(function (res) {
                    token2 = res
                })
            })

            it("get event subscription", function () {
                util.getEventSubscription(token2).then(function (res) {
                    eventSubscription2 = res
                })
            })
        })

        describe("testuser 1 -", function () {


            it("login as testuser1 and accept friendRequest", function () {
                util.login(testUser1, "password")
                util.acceptFriendRequests()
            })

            it("testuser2 should not be trusted", function () {
                util.get("/contact/list")
                util.waitForElements("cm-contact-tag", 2)
                util.headerSearchInList(testUser2)
                util.waitAndClick("cm-contact-tag")
                expect($("[data-qa='start-trust-handshake-btn']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(false)
            })
        })

        describe("testuser 2 again -", function () {


            it("login as testUser2", function () {
                util.login(testUser2, "password")
            })

            it("testuser1 should not be trusted", function () {
                util.get("/contact/list")
                util.waitForElements("cm-contact-tag", 2)
                util.headerSearchInList(testUser1)
                util.waitAndClick("cm-contact-tag")
                expect($("[data-qa='start-trust-handshake-btn']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(false)
            })

            it("start handshake", function () {
                util.waitAndClickQa("start-trust-handshake-btn")
                util.waitAndClickQa("btn-start-authentication")
            })

            it("get transaction secret", function () {
                util.waitForElement("[data-qa='transaction-secret-value']")
                $("[data-qa='transaction-secret-value']").getText().then(function (text) {
                    transactionSecret2 = text
                })
            })

            it("get authentication:start event send to testUser1", function () {
                getAuthEvent(token, eventSubscription, 4, 2)
                ptor.wait(function () {
                    return authEvents[4] != undefined
                })
            })

            it("get identityId of testUser2 from event", function () {
                identityId2 = authEvents[4].fromIdentityId
            })
        })

        describe("testuser 1 again -", function () {
            it("login as testUser1", function () {
                util.login(testUser1, "password")
                util.waitForEventSubscription()
            })

            it("resend authentication:start event from testUser2 to testUser1", function () {
                util.remoteBroadcastEvent(token2, authEvents[4], identityId)
            })

            it("a modal asking for the transaction secret should open", function () {
                util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
            })

            it("enter transaction secret and submit", function () {
                util.setVal("inp-transactSecret", transactionSecret2)
                util.waitAndClick("cm-modal.active [data-qa='btn-acceptRequest']")
                util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            })

            it("testuser2 should now be trusted", function () {
                util.get("/contact/list")
                util.waitForElements("cm-contact-tag", 2)
                util.headerSearchInList(testUser2)
                util.waitAndClick("cm-contact-tag")
                expect($("[data-qa='trust-confirmed']").isDisplayed()).toBe(true)
            })

            it("get authentication:start event send to testUser2", function () {
                getAuthEvent(token2, eventSubscription2, 5, 0)
                ptor.wait(function () {
                    return authEvents[5] != undefined
                })
            })
        })

        describe("testuser 2 yet again -", function () {

            it("login as testUser2", function () {
                util.login(testUser2, "password")
                util.waitForEventSubscription()
            })

            it("resend authentication:start event from testUser2 to testUser1", function () {
                util.remoteBroadcastEvent(token, authEvents[5], identityId2)
            })

            it("a modal asking for the transaction secret should open", function () {
                util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
            })

            it("enter transaction secret and submit", function () {
                util.setVal("inp-transactSecret", transactionSecret2)
                util.waitAndClick("cm-modal.active [data-qa='btn-acceptRequest']")
                util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            })

            it("testuser1 should now be trusted", function () {
                util.get("/contact/list")
                util.waitForPageLoad("/contact/list")
                util.waitForElements("cm-contact-tag", 2)
                util.headerSearchInList(testUser1)
                util.waitAndClick("cm-contact-tag")
                //expect($("[data-qa='start-trust-handshake-btn']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                expect($("[data-qa='trust-confirmed']").isDisplayed()).toBe(true)
            })
        })

        describe("testuser1 with a different key -", function(){

            it("delete localstorage", function () {
                util.logout()
                util.clearLocalStorage()
            })

            it("import key3 and login as testUser1", function () {
                util.setLocalStorage(localStorage3.key, localStorage3.value)
                util.login(testUser1, "password")
                util.get("/settings/identity/key/list")
                util.waitForElements("[data-qa='key-list-item']", 3)
                checkKeyTrust(keyName1, true)
                checkKeyTrust(keyName2, true)
                checkKeyTrust(keyName3, true)
                util.waitForEventSubscription()
            })

            it("testuser2 should still be trusted", function () {
                util.get("/contact/list")
                util.waitForElements("cm-contact-tag", 2)
                util.headerSearchInList(testUser2)
                util.waitAndClick("cm-contact-tag")
                //expect($("[data-qa='start-trust-handshake-btn']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(true)
                expect($("[data-qa='trust-confirmed']").isDisplayed()).toBe(true)
            })
        })
    })

    it("delete test users", function(){
        util.deleteTestUser(testUser1)
        util.deleteTestUser(testUser2)
    })
})