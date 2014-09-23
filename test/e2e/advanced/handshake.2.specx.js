var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Authentication requests -', function () {

    var ptor = util.getPtorInstance()
    var date = Date.now()

    afterEach(function () {
        util.stopOnError()
    })

    var testUserId = Math.random().toString(36).substring(2, 9)
    var testUser = "testUser23_" + testUserId
    var testUser2Id = Math.random().toString(36).substring(2, 9)
    var testUser2 = "testUser23_" + testUser2Id

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

    var getAuthEvent = function (index, skip) {
        var s = skip || 0
        var events = []
        var get = function () {
            util.getEvents(token, eventSubscription).then(function (res) {

                console.log("EVENTS:",res)

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

    describe("key1:", function () {

        it("create test user, generate key and export localStorage", function () {
            util.createTestUser(testUserId)
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

        xit("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })

    })

    xdescribe("key3:", function () {

        it("generate key3", function () {
            util.login(testUser, "password")
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
            getAuthEvent(0)
            ptor.wait(function () {
                return authEvents[0] != undefined
            })
        })

        it("abort request", function () {
            util.waitAndClickQa("btn-cancel-authentication")
            util.waitForElementDisappear("[data-qa='transaction-secret-value']")
        })

        it("create encrypted conversation", function () {
            util.createEncryptedConversation(subject3, encryptedMessage3)
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })
    })

    xdescribe("key1 again:", function () {

        it("import key", function () {
            util.setLocalStorage(localStorage1.key, localStorage1.value)
            util.login(testUser, "password")
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
        })

        it("get authentication:start event", function () {
            getAuthEvent(1, 2)
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

        it("should be able to read conversation from key3", function () {
            util.readConversation(subject3, encryptedMessage3)
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })

    })

    xdescribe("key3 again:", function () {

        it("import key3", function () {
            util.setLocalStorage(localStorage3.key, localStorage3.value)
            util.login(testUser, "password")
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

    xdescribe("key2:", function () {

        it("generate key2", function () {
            util.login(testUser, "password", "/start")
            util.generateKey(2, keyName2)
            util.get("/settings/identity/key/list")
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
            util.get("/settings/identity/key/list")
            ptor.debugger()
            util.waitForElements("[data-qa='key-list-item']", 3)
            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, true)
        })

        it("get authentication:start event from key2", function () {
            getAuthEvent(2, 2)
            ptor.wait(function () {
                return authEvents[2] != undefined
            })
        })

        it("delete localstorage", function () {
            util.logout()
            util.clearLocalStorage()
        })
    })

    xdescribe("key1 yet again:", function () {

        it("import key1", function () {
            util.setLocalStorage(localStorage1.key, localStorage1.value)
            util.login(testUser, "password")
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
            util.waitAndClickQa('btn-acceptRequest')
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("all three keys should now be trusted", function () {
            util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
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

    xdescribe("key3 yet again:", function () {

        it("import key3", function () {
            util.setLocalStorage(localStorage3.key, localStorage3.value)
            util.login(testUser, "password")
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

        it("should be able to read conversation from key2", function () {
            util.readConversation(subject2, encryptedMessage2)
        })
    })

    xdescribe("key2 again:", function () {
        it("import key2", function () {
            util.setLocalStorage(localStorage2.key, localStorage2.value)
            util.login(testUser, "password")
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

        it("create testuser2 and generate key", function () {
            util.createTestUser(testUser2Id)
            util.generateKey(4, keyName4)
        })

        it("send friendrequest to testuser1", function () {
            util.sendFriendRequest(testUser)
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

        it("login as testuser1 and accept friendRequest", function () {
            util.login(testUser, "password")
            util.acceptFriendRequests()
        })

        it("testuser2 should not be trusted", function () {
            util.get("/contact/list")
            util.waitForElements("cm-contact-tag", 2)
            util.headerSearchInList(testUser2)
            util.waitAndClick("cm-contact-tag")
            // to make sure that checkmark is not present

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

        it("login as testuser2", function(){
            util.login(testUser, "password")
        })

        // this is a bit dirty, redo this at some point
        var tmpToken
        var tmpEventSubscription

        it("get authentication:start event", function () {
            tmpToken = token
            tmpEventSubscription = eventSubscription
            token = token2
            eventSubscription = eventSubscription2
            getAuthEvent(4)
            ptor.wait(function () {
                return authEvents[4] != undefined
            })
        })

        it("resend event", function(){
            util.remoteBroadcastEvent(token, authEvents[4], authEvents[4].fromIdentityId)
            ptor.debugger()
        })


        it("debug", function(){
            console.log("events", authEvents)
        })


    })

})
