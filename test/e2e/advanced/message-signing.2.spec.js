var util = require("../cmUtil.js")
var config = require("../config/specs.js")

describe('Message signing -', function () {

    var ptor    = util.getPtorInstance(),
        date    = Date.now()

        testUserId1 = Math.random().toString(36).substring(2, 9),
        testUser1   = "testUser23_" + testUserId1,

        testUserId2 = Math.random().toString(36).substring(2, 9)
        testUser2   = "testUser23_" + testUserId2,

        conversationId  = undefined,
        subject         = undefined

    describe("prepare tests -", function () {

        it("create test user 1", function () {
            util.createTestUser(testUserId1)
            util.generateKey(7)
        })

        it("create test user 2, generate key and send friend request", function () {
            util.createTestUser(testUserId2)
            .then(function(){
                return  util.generateKey(8)
            })
            .then(function(){
                return  util.sendFriendRequest(testUser1)
            })
        })

        it("user 1 accept friend request", function () {
            util.login(testUser1, "password")
            .then(function(){
                return  util.acceptFriendRequests()
            })
        })
    })

    describe("user 1 sends signed messages:", function(){

        it("create new conversation", function () {
            util.login(testUser1, "password")
            .then(function(){
                return  util.get("/conversation/new")
            })
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
            .then(function(){
                $(".contact-list [data-qa='btn-select-contact']").click()
                $("[data-qa='btn-list-search-clear']").click()

                $("[data-qa='btn-done']").click()
                util.expectCurrentUrl('/conversation/new')
            })
        })

        it("submit message", function () {
            var text = "moep_message_" + Math.floor(Math.random() * 1000000);
            $("[data-qa='input-answer']").sendKeys(text)

            $("[data-qa='btn-send-answer']").click()
            .then(function(){
                return util.getConversation(subject)
            })
            .then(function(){
                // get conversation Id
                return  ptor.wait(function () {
                            return ptor.getCurrentUrl().then(function (url) {
                                conversationId = url.split("/").pop()
                                return conversationId != "new"
                            })
                        }, 5000, 'unable to get conversation id')
            })

        })

    })

    describe("user 2 reads signed message:", function(){
        it("open conversation", function(){
            util.login(testUser2, "password")
            .then(function(){
                util.get('/conversation/'+conversationId)
                return util.waitForPageLoad('/conversation/'+conversationId)
            })
        })

        it("read message from user 1", function(){

            var message

            ptor.wait(function(){
                return  util.waitForElement('cm-message')
                        .then(function(){
                            return $('cm-message')
                        })
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
            }).then(function(){
                ptor.wait(function(){
                    return message.$("[data-qa='signed']").isPresent()
                }, config.waitForTimeout, 'message not signed.')
                .then(function(){
                    return ptor.wait(function(){
                        return message.$("[data-qa='valid']").isPresent()
                    }, config.waitForTimeout, 'signature is not valid.')
                })
                .then(function(){
                    expect(message.$("[data-qa = 'authentic']").isPresent()).toBe(false)
                    expect(message.$("[data-qa = 'unverifiable']").isPresent()).toBe(false)
                    expect(message.$("[data-qa = 'defective']").isPresent()).toBe(false)
                })
            })
        })
    })

    describe("user1 breaks signatures:", function(){
        it('delete keys', function(){
            util.login(testUser1, "password")
            .then(function(){
                return util.deleteKeys()
            })
        })
    })

    describe("user2 tries to read message with broken signature", function(){
        it("open conversation", function(){
            util.login(testUser2, "password")
            .then(function(){
                return util.get(/conversation/+conversationId)
            })
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
            }).then(function(){
                ptor.wait(function(){
                    return message.$("[data-qa = 'unverifiable']").isPresent()
                }, config.waitForTimeout, 'message signature not marked as unverifiable.')
                .then(function(){
                    expect(message.$("[data-qa = 'authentic']").isPresent()).toBe(false)
                    expect(message.$("[data-qa = 'valid']").isPresent()).toBe(false)
                    expect(message.$("[data-qa = 'defective']").isPresent()).toBe(false)
                })
            })
        })

    })

    describe("delete test users -", function () {
        it("delete test users", function () {
            util.deleteTestUser(testUser1)
            util.deleteTestUser(testUser2)
        })
    })
})