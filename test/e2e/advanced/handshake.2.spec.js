var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Authentication requests -', function () {
    var ptor = util.getPtorInstance(),
        date = Date().now

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

    function checkKeyTrust (keyName, isTrusted) {
        ptor.getCurrentUrl().then(function(url){
            if(!url.match("/settings/identity/key/list"))
                util.get("/settings/identity/key/list")
                util.waitForPageLoad('settings/identity/key/list')
        })

        ptor.wait(function(){
            return $$("[data-qa='key-list-item']")
                .map(function(key){
                    return key.getText()
                        .then(function(text){
                            return text
                        })
                })
                .then(function(result){
                    return result.some(function(text){
                        var result = (new RegExp(keyName)).test(text)
                            && (new RegExp(isTrusted ? "\\btrusted\\b" : "\\buntrusted\\b")).test(text)
                        return result
                    })
                })
        }, config.waitForTimeout, 'for Key "'+keyName+'" to be ' + (isTrusted ? 'trusted' : 'untrusted') + ' .')

    }

    function getAuthEvent (token, eventSubscription, index, skip) {
        var s = skip || 0
        var events = []

        function get(){
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

    function checkContactTrust(userName, trustState){
        util.get('/contact/list')
        util.expectCurrentUrl('/contact/list')

        util.headerSearchInList(userName)

        switch(trustState){
            case 'no-key':
                $$("cm-contact-trust [data-qa='no-key'] .cm-checkbox").then(function(elements){
                    expect(elements.length).toEqual(2)
                })
                break;
            case 'untrusted-key':
                // check list
                var trustDrtv = $("cm-contact-trust [data-qa='untrusted-key']")
                trustDrtv.$$('.cm-checkbox-bg').then(function(elements){
                    expect(elements.length).toEqual(1)
                })
                trustDrtv.$$('.cm-checkbox').then(function(elements){
                    expect(elements.length).toEqual(1)
                })
                // check detail
                util.waitAndClick("cm-contact-tag")
                expect($("[data-qa='start-trust-handshake-btn']").isElementPresent(by.css(".cm-checkbox-right"))).toBe(false)
                break;
            case 'trusted-key':
                // check list
                util.waitForElements("cm-contact-trust [data-qa='trusted-key'] .cm-checkbox-bg",2)
                $$("cm-contact-trust [data-qa='trusted-key'] .cm-checkbox-bg").then(function(elements){
                    expect(elements.length).toEqual(2)
                })
                // check detail
                util.waitAndClick("cm-contact-tag")
                ptor.wait(function(){
                    return $$("[data-qa='trusted-key']").then(function(items){
                        return items.length > 0
                    })
                }, config.waitForTimeout, '[data-qa="trusted-key"]')
                break;
        }
    }

    describe("key1 -", function () {
        // reset!!
        it('before all test starting clear Localstorage', function(){
            util.get('/login')
            util.clearLocalStorage()
        })

        describe("create test user, generate key and check keytrust", function () {
            it('should create testUser', function(){
                util.createTestUser(testUser1Id)
            })
            it('should generate Key', function(){
                util.generateKey(1, keyName1)
                ptor.sleep(2000)
            })
            it('should check Key Trust', function(){
                checkKeyTrust(keyName1, true)
            })
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
        })

    })

    describe("key3 -", function () {

        it('before all test starting clear Localstorage', function(){
            util.clearLocalStorage()
        })

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
            util.waitAndClick("cm-modal.active [data-qa='btn-acceptIncomingRequest']")
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
            util.get('/settings/identity/key/list')
            util.waitForPageLoad('/settings/identity/key/list')

            util.waitForElements("[data-qa='key-list-item']", 2)

            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName3, true)

            ptor.sleep(1000)
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
            util.waitForEventSubscription()

            util.get("/settings/identity/key/list")

            util.waitForElements("[data-qa='key-list-item']", 2)
            checkKeyTrust(keyName1, false)
            checkKeyTrust(keyName3, true)
            ptor.sleep(1000)
        })

        it("send authentication:start event from key1", function () {
            util.broadcastEvent(token, authEvents[1])
        })

        it("a modal asking for authentication start should open", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        })

        it("enter transaction secret and submit", function () {
            util.setVal("inp-transactSecret", transactionSecret)
            util.waitAndClick("cm-modal.active [data-qa='btn-acceptIncomingRequest']")
            util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            ptor.sleep(5000)
        })

        it("both keys should now be trusted", function () {
            //util.get("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 2)

            checkKeyTrust(keyName1, true)
            checkKeyTrust(keyName3, true)

            ptor.sleep(1000)
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
            util.login(testUser1, "password")
            util.generateKey(2, keyName2)
            util.waitForPageLoad("/authentication")
            util.get("/settings/identity/key/list")
            util.waitForPageLoad("/settings/identity/key/list")
            util.waitForElements("[data-qa='key-list-item']", 3)
            checkKeyTrust(keyName1, false)
            checkKeyTrust(keyName2, true)
            checkKeyTrust(keyName3, false)

            ptor.sleep(1000)

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
            event.data.toKeyId = keyId2
            util.broadcastEvent(token, event)
        })

        it("a modal asking for authentication start should open", function () {
            util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")

        })

        it("enter transaction secret and submit", function () {
            util.setVal("inp-transactSecret", transactionSecret)
            util.waitAndClick("cm-modal.active [data-qa='btn-acceptIncomingRequest']")
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
            getAuthEvent(token, eventSubscription, 2, 3)
            ptor.wait(function () {
                return authEvents[2].data.fromKeyId == keyId2
            })
        })

        it("should not be able to read conversation from key1", function () {
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
            util.waitAndClick("cm-modal.active [data-qa='btn-acceptIncomingRequest']")
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
            // ptor.wait(function () {
            //     return $("cm-identity-key-list").getText().then(function (text) {
            //         return text.indexOf("untrusted") == -1
            //     })
            // })

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

            it("check support no key and untrusted 'oo!", function(){
                checkContactTrust('support','no-key')
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

            it("testuser2 should not be trusted 'xo!", function () {
                checkContactTrust(testUser2,'untrusted-key')
            })
        })

        describe("testuser 2 again -", function () {
            it("login as testUser2", function () {
                util.login(testUser2, "password")
            })

            it("testuser1 should not be trusted 'xo!'", function () {
                checkContactTrust(testUser1,'untrusted-key')
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
                util.waitAndClick("cm-modal.active [data-qa='btn-acceptIncomingRequest']")
                util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            })

            it("testuser2 should now be trusted 'xx'", function () {
                checkContactTrust(testUser2,'trusted-key')
            })

            it("get authentication:start event send to testUser2", function () {
                getAuthEvent(token2, eventSubscription2, 5, 0)
                ptor.wait(function () {
                    return authEvents[5] != undefined
                }, config.waitForTimeout, 'authentication:start isnt fired')
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
                util.waitAndClick("cm-modal.active [data-qa='btn-acceptIncomingRequest']")
                util.waitForElementDisappear("cm-modal.active [data-qa='inp-transactSecret']")
            })

            it("testuser1 should now be trusted 'xx'", function () {
                checkContactTrust(testUser1,'trusted-key')
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

            it("testuser2 should still be trusted 'xx'", function () {
                checkContactTrust(testUser2,'trusted-key')
            })
        })
    })

    /*** check if message signatures are authentic now: ***/
    describe('Message Signing with trusted keys: ', function(){

        describe("user 2 gets key 4", function(){
            it("login and import key4", function(){
                util.login(testUser2, "password")
                util.generateKey(4, keyName4)
            })
        })

        describe("user 1 sends signed messages:", function(){

            it("create new conversation", function () {
                util.login(testUser1, "password")
                util.setLocalStorage(localStorage1.key, localStorage1.value)
                util.get("/conversation/new")
            })

            it("add subject", function () {
                subject = "Signatures_" + date + Math.random()
                $("[data-qa='input-subject']").sendKeys(subject)
            })

            it("add recipients to conversation", function () {

                util.get("/conversation/new/recipients")

                $("[data-qa='btn-header-list-search']").click()

                $("[data-qa='inp-list-search']").sendKeys(testUser2)
                util.waitForElement(".contact-list [data-qa='btn-select-contact']")
                $(".contact-list [data-qa='btn-select-contact']").click()
                $("[data-qa='btn-list-search-clear']").click()

                $("[data-qa='btn-done']").click()
                util.expectCurrentUrl('/conversation/new')
            })

            it("submit message", function () {
                var text = "moep_message_" + Math.floor(Math.random() * 1000000);
                $("[data-qa='input-answer']").sendKeys(text)

                $("[data-qa='btn-send-answer']").click()
                    .then(function(){
                        return util.getConversation(subject)
                    })


                // get conversation Id
                ptor.wait(function () {
                    return ptor.getCurrentUrl().then(function (url) {
                        conversationId = url.split("/").pop()
                        return conversationId != "new"
                    })
                }, config.waitForTimeout, 'unable to get conversation id')
            })

        })

        describe("user 2 reads signed message:", function(){

            it("open conversation", function(){
                util.login(testUser2, "password")
                util.get(/conversation/+conversationId)
            })

            it("read message from user 1", function(){

                var message

                ptor.wait(function(){

                    return  $('cm-message')
                        .then(function(el){
                            message = el
                            return  el.$("[data-qa='message-author']")
                        })
                        .then(function(child){
                            return child.getText()
                        })
                        .then(function(author){
                            return author == testUser1
                        })
                }, config.waitForTimeout)
                    .then(function(){
                        ptor.wait(function(){
                            return message.$("[data-qa = 'signed']").isPresent()
                        }, config.waitForTimeout, 'message not signed.')
                            .then(function(){
                                return ptor.wait(function(){
                                    return message.$("[data-qa = 'authentic']").isPresent()
                                }, config.waitForTimeout, 'signature is not authenic.')
                            })
                            .then(function(){
                                expect(message.$("[data-qa = 'valid']").isPresent()).toBe(false)
                                expect(message.$("[data-qa = 'unverifiable']").isPresent()).toBe(false)
                                expect(message.$("[data-qa = 'defective']").isPresent()).toBe(false)
                            })
                    })
            })
        })

    })


    it("delete test users", function(){
        util.deleteTestUser(testUser1)
        util.deleteTestUser(testUser2)
    })
})
