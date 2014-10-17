var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route Conversation - Check Old Message Decryption ', function() {
    var ptor = util.getPtorInstance()

    var testUser = util.createTestUser()

    var subject = "decryptionTest",
        msg = 'moepchen',
        qty = 15


    function addMessages(qty,msg){
        for(var i = 0; i < qty; i++){
            util.setVal("input-answer", msg)
            util.waitAndClickQa("btn-send-answer")
        }
    }

    describe('create encrytpted conversation with ' + qty + ' messages', function(){
        it('login create & create key', function () {
            util.generateKey(1)
        })

        it("create encrypted conversation", function () {
            util.createEncryptedConversation(subject, msg)
        })

        it('should add ' + qty + ' messages', function(){
            addMessages((qty -1), msg);

            $$('cm-message').then(function (elements) {
                expect(elements.length).toEqual(qty)
            })
        })

        it('user should be logout', function(){
            util.logout()
        })
    })

    describe('check if messages will be decrypted', function(){
        it('user should be at talks after login', function(){
            util.login(testUser,'password');

            util.waitForPageLoad('/talks')
        })

        it('should open conversation', function(){
            util.waitForElements("[data-qa='conversation-list-element']")
            util.headerSearchInList(subject)

            $$("[data-qa='conversation-list-element']").then(function(elements) {
                expect(elements.length).not.toEqual(0)
                elements[0].click()
            })
        })

        it('should be 10 messages', function(){
            $$('cm-message').then(function (elements) {
                expect(elements.length).toEqual(11) // last message (talks overwview) + 10
            })
        })

        it('all message should be encrypted', function(){
            $$('cm-message').then(function (elements) {
                elements.forEach(function(element){
                    expect(element.getText()).toContain(msg)
                })
            })
        })

        it('should be a load more btn', function(){
            expect($("[data-qa='btn-load-more-messages']").isPresent()).toBe(true)
        })

        it('should be ' + qty + ' after click on load more btn', function(){
            $("[data-qa='btn-load-more-messages']").click();

            $$('cm-message').then(function (elements) {
                expect(elements.length).toEqual(qty) // last message (talks overwview) + 10
            })
        })

        it('all message should be encrypted', function(){
            $$('cm-message').then(function (elements) {
                elements.forEach(function(element){
                    expect(element.getText()).toContain(msg)
                })
            })
        })
    })

    it('delete test user', function(){
        util.deleteTestUser(testUser)
    })
})