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

    var keyName1 = "moeps key 1"
    var keyName2 = "moeps key 2"
    var keyName3 = "moeps key 3"

    var keyId2

    var localStorage1
    var localStorage2
    var localStorage3

    var eventSubscription

    var token

    var transactionSecret

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

        var get = function(){
            util.getEvents(token, eventSubscription).then(function (res) {
                var e = res.data.events.filter(function (event) {
                    return event.name == "authenticationRequest:start"
                })

                if(e.length > 0) {
                    events.push.apply(events, e)

                }

                if(events.length <= s) {
                    get()
                } else {
                    delete events[s].data.toKeyId
                    authEvents[index] = events[s]
                    console.log("extracted event", authEvents[index].data.fromKeyId)
                }
            })
        }

        get()
    }

    it("create test user, generate key1 and export localStorage", function () {
        util.createTestUser(testUserId)
        util.generateKey(1, keyName1)
        checkKeyTrust(keyName1, true)
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

    it("delete first key from local storage and generate key3", function () {
        util.logout()
        util.clearLocalStorage()
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

    it("delete localstorage and import key1", function () {
        util.logout()
        util.clearLocalStorage()
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

        util.waitAndClickQa('btn-start-rekeying')
    })

    it("get authentication:start event from key3", function () {
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

    it("delete localstorage and import key3", function () {
        util.logout()
        util.clearLocalStorage()
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

    it("delete local storage and generate key2", function () {
        util.logout()
        util.clearLocalStorage()
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

    it("get keyId of key2", function(){

        ptor.debugger()

        $$("[data-qa='key-list-item']").then(function (keys) {
            keys[0].click()
            util.waitForElement("[data-qa='input-public-key']")

            $("[data-qa='fingerprint-public-key']").getText().then(function (text) {
                keyId2 = text
            })
            //
//            keys.forEach(function(key){
//               key.getText().then(function(text){
//                   if (text.search(keyName1) != -1) {
//                       ptor.debugger()
//                       key.click()
//                       util.waitForElement("[data-qa='input-public-key']")
//                       keyId2 = util.getVal("input-public-key")
//                   }
//               })
//            })
        })

        ptor.wait(function(){
            return keyId2 != undefined
        })
    })

    it("send authentication:start event from key1", function () {
        var event = authEvents[1]
        event.toKeyId = keyId2
        util.broadcastEvent(token, event)
    })

//    it("send authentication:start event from key3", function () {
//        util.broadcastEvent(token, authEvents[0])
//    })

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

    it("delete localstorage and import key1", function () {
        util.logout()
        util.clearLocalStorage()
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

    it("delete localstorage and import key3, all three keys should be trusted", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage3.key, localStorage3.value)
        util.login(testUser, "password")
        util.get("/settings/identity/key/list")
        util.waitForElements("[data-qa='key-list-item']", 3)
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, true)
    })

//
//    it("start another key-request", function () {
//        util.waitForElement("cm-modal.active [data-qa='btn-start']")
//        util.click("btn-start")
//    })
//
//    var requestId
//    it("get authenticationRequestId", function () {
//        util.getEvents(token, eventSubscription).then(function (res) {
//            var keyRequest2 = res.data.events.filter(function (event) {
//                return event.name == "authenticationRequest:key-request"
//            })[0]
//            requestId = keyRequest2.data.id
//        })
//    })
//
//    it("send key-response with new authenticationRequestId", function () {
//        keyResponse.data.id = requestId
//        util.broadcastEvent(token, keyResponse)
//    })
//
//    it("a modal displaying the transaction secret should be displayed", function () {
//        util.waitForElementHidden("cm-modal.active cm-spinner")
//        $("cm-modal.active [data-qa='btn-start']").click()
//        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
//        expect($("cm-modal.active [data-qa='transaction-secret-value']").getText()).toBeTruthy()
//        $("cm-modal.active .backdrop").click()
//    })
//
//    it("start new authentication request", function () {
//        $$("[data-qa='key-list-item']").then(function (keys) {
//            keys.forEach(function (key) {
//                key.getText().then(function (text) {
//                    if (text.search(keyName1) > -1) {
//                        key.$("[data-qa='btn-start-handshake']").click()
//                    }
//                })
//            })
//        })
//        util.waitForElement("cm-modal.active [data-qa='btn-start']")
//        $("cm-modal.active [data-qa='btn-start']").click()
//        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
//        $("cm-modal.active [data-qa='transaction-secret-value']").getText().then(function (text) {
//            transactionSecret = text
//        })
//    })
//
//    it("get start event", function () {
//        util.getEvents(token, eventSubscription).then(function (res) {
//            startEvent = res.data.events.filter(function (event) {
//                return event.name == "authenticationRequest:start"
//            })[1]
//        })
//    })
//
//    it("delete localstorage and import key1", function () {
//        util.logout()
//        util.clearLocalStorage()
//        util.setLocalStorage(localStorage1.key, localStorage1.value)
//        util.login(testUser, "password")
//        util.get("/settings/identity/keys")
//        checkKeyTrust(keyName1, true)
//        checkKeyTrust(keyName2, false)
//        checkKeyTrust(keyName3, false)
//        util.waitForEventSubscription()
//    })
//
//    it("send start event", function () {
//        util.broadcastEvent(token, startEvent)
//    })
//
//    it("a modal asking for the transaction secret should open", function () {
//        util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
//
//    })
//
//    it("enter wrong transaction secret", function () {
//        util.setVal("inp-transactSecret", "moep!")
//        $("cm-modal.active [data-qa='btn-acceptRequest']").click()
//        expect($("[data-qa='warn-wrong-input']").isDisplayed()).toBe(true)
//    })
//
//    it("enter the right transaction secret", function () {
//        util.clearInput("inp-transactSecret")
//        util.setVal("inp-transactSecret", transactionSecret)
//        $("cm-modal.active [data-qa='btn-acceptRequest']").click()
//        util.waitForElementHidden("[data-qa='warn-wrong-input']")
//        util.waitForElementDisappear("cm-modal.active")
//    })
//
//    it("key2 should now be trusted", function () {
//        util.waitForElements("[data-qa='key-list-item']", 3)
//        checkKeyTrust(keyName1, true)
//        checkKeyTrust(keyName2, true)
//        checkKeyTrust(keyName3, false)
//    })
//
//    it("get verified event", function () {
//        util.getEvents(token, eventSubscription).then(function (res) {
//            verifiedEvent = res.data.events.filter(function (event) {
//                return event.name == "authenticationRequest:verified"
//            })[0]
//        })
//    })
//
//    it("delete localstorage and import key2", function () {
//        util.logout()
//        util.clearLocalStorage()
//        util.setLocalStorage(localStorage2.key, localStorage2.value)
//        util.login(testUser, "password")
//        util.get("/settings/identity/keys")
//        checkKeyTrust(keyName1, false)
//        checkKeyTrust(keyName2, true)
//        checkKeyTrust(keyName3, false)
//        util.waitForEventSubscription()
//    })
//
//    it("start another authorization request", function() {
//        $$("[data-qa='key-list-item']").then(function (keys) {
//            keys.forEach(function (key) {
//                key.getText().then(function (text) {
//                    if (text.search(keyName1) > -1) {
//                        key.$("[data-qa='btn-start-handshake']").click()
//                    }
//                })
//            })
//        })
//        util.waitForElement("cm-modal.active [data-qa='btn-start']")
//        $("cm-modal.active [data-qa='btn-start']").click()
//        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
//    })
//
//    it("get authentication request id", function () {
//        util.getEvents(token, eventSubscription).then(function (res) {
//            var keyRequest2 = res.data.events.filter(function (event) {
//                return event.name == "authenticationRequest:start"
//            })[0]
//            requestId = keyRequest2.data.id
//        })
//    })
//
//    it("send verified request", function(){
//        verifiedEvent.data.id = requestId
//        console.log(verifiedEvent)
//        util.broadcastEvent(token, verifiedEvent)
//    })
//
//    it("key1 should now be trusted", function(){
//        util.waitForElementDisappear("cm-modal.active")
//        util.waitForElements("[data-qa='key-list-item']", 3)
//        checkKeyTrust(keyName1, true)
//        checkKeyTrust(keyName2, true)
//        checkKeyTrust(keyName3, false)
//    })
//
//    it("start authentication request for key3", function(){
//        $$("[data-qa='key-list-item']").then(function (keys) {
//            keys.forEach(function (key) {
//                key.getText().then(function (text) {
//                    if (text.search(keyName3) > -1) {
//                        key.$("[data-qa='btn-start-handshake']").click()
//                    }
//                })
//            })
//        })
//        util.waitForElement("cm-modal.active [data-qa='btn-start']")
//        $("cm-modal.active [data-qa='btn-start']").click()
//        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
//        $("cm-modal.active [data-qa='transaction-secret-value']").getText().then(function (text) {
//            transactionSecret = text
//        })
//    })
//
//    it("get start event", function () {
//        util.getEvents(token, eventSubscription).then(function (res) {
//            startEvent = res.data.events.filter(function (event) {
//                return event.name == "authenticationRequest:start"
//            })[0]
//        })
//    })
//
//    it("delete localstorage and import key3", function () {
//        util.logout()
//        util.clearLocalStorage()
//        util.setLocalStorage(localStorage3.key, localStorage3.value)
//        util.login(testUser, "password")
//        util.get("/settings/identity/keys")
//        checkKeyTrust(keyName1, false)
//        checkKeyTrust(keyName2, false)
//        checkKeyTrust(keyName3, true)
//        util.waitForEventSubscription()
//    })
//
//    it("send start event", function () {
//        util.broadcastEvent(token, startEvent)
//    })
//
//    it("enter transaction secret", function () {
//        util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
//        util.setVal("inp-transactSecret", transactionSecret)
//        $("cm-modal.active [data-qa='btn-acceptRequest']").click()
//        util.waitForElementDisappear("cm-modal.active")
//    })
//
//    it("all keys should now be trusted via transitive trust", function () {
//        util.waitForElements("[data-qa='key-list-item']", 3)
//        checkKeyTrust(keyName1, true)
//        checkKeyTrust(keyName2, true)
//        checkKeyTrust(keyName3, true)
//        ptor.debugger()
//    })
//
//    it("delete localstorage and import key1, all three keys should be truested", function () {
//        util.logout()
//        util.clearLocalStorage()
//        util.setLocalStorage(localStorage1.key, localStorage1.value)
//        util.login(testUser, "password")
//        util.get("/settings/identity/keys")
//        checkKeyTrust(keyName1, true)
//        checkKeyTrust(keyName2, true)
//        checkKeyTrust(keyName3, true)
//        ptor.debugger()
//    })
//
//    it("delete localstorage and import key2, all three keys should be truested", function () {
//        util.logout()
//        util.clearLocalStorage()
//        util.setLocalStorage(localStorage2.key, localStorage2.value)
//        util.login(testUser, "password")
//        util.get("/settings/identity/keys")
//        checkKeyTrust(keyName1, true)
//        checkKeyTrust(keyName2, true)
//        checkKeyTrust(keyName3, true)
//        ptor.debugger()
//    })
})
