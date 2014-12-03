var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

console.log('test removed - check old message decryption')
xdescribe('Route Conversation - Check Old Message Decryption: ', function() {
    var ptor = util.getPtorInstance(),
        testUser

    var subject = "decryptionTest",
        msg = 'moepchen',
        qty = 15


    function addMessages(qty,msg){
        for(var i = 0; i < qty; i++){
            util.setValQuick("input-answer", msg)
            util.setVal("input-answer", " ")

            ptor.wait(function(){
                return util.getVal('input-answer').then(function(val){
                    return val == msg + ' ';
                })
            })

            util.waitAndClickQa("btn-send-answer")
            util.waitForElements("cm-message", (i + 2))
        }
    }

    it('should create a test user', function(){
       testUser = util.createTestUser(undefined,'check-old-message-decryption')
    })


    describe('create encrytpted conversation with ' + qty + ' messages - ', function(){
        it('login create & create key', function () {
            util.generateKey(1)
        })

        it("create encrypted conversation", function () {
            util.createEncryptedConversation(subject, msg)
        })

        it('should add ' + (qty - 1) + ' messages', function(){
            addMessages((qty - 1), msg);

            $$('cm-message').then(function (elements) {
                expect(elements.length).toEqual(qty)
            })
        })

        it('user should be logout', function(){
            util.logout()
        })
    })

    describe('check if messages will be decrypted - ', function(){
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
            util.waitForElements("cm-message", qty)

            $$('cm-message').then(function (elements) {
                elements.forEach(function(element){
                    expect(element.getText()).toContain(msg)
                    //ptor.wait(function () {
                    //    return (element.getText().indexOf(msg) != -1)
                    //})
                })
            })
        })
    })

    it('delete test user', function(){
        util.deleteTestUser(testUser)
    })
})