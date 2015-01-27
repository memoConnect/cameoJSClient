var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Delete Conversation Spec: ',function() {
    var ptor = util.getPtorInstance(),
        testUser1,
        testUser2,
        subject = "conversation-moep",
        message = "moepmoep"

    it('should create testUser1', function () {
        util.createTestUser(undefined, 'delete conversation #1')
            .then(function (loginName) {
                testUser1 = loginName
            })
    })

    describe('Test with one Recipient', function () {

        it('should create Conversation', function () {
            util.createUnencryptedConversation(subject, message)
        })

        it('should exist conversation menu', function () {
            util.waitForQa('menu-conversation')
        })

        it('should open conversation menu and show delete button', function () {
            util.waitAndClickQa('menu-conversation')

            util.waitForQa('menu-delete-conversation')
        })

        it('should delete conversation', function () {
            util.waitAndClickQa('menu-delete-conversation')
            util.waitForModalOpen()
            util.confirmModal()

            util.waitForPageLoad('/talks')
        })

        it('should not find conversation', function () {
            util.headerSearchInList(subject);

            util.waitForQa('ctn-talks-not-found')
        })

        it('should logout', function(){
            util.logout();
        })

    })

    describe('Test with two Recipients', function(){
        it('should create testUser2', function () {
            util.createTestUser(undefined, 'delete conversation #2')
                .then(function (loginName) {
                    testUser2 = loginName
                })
        })

        it('should send friend request to testUser1', function(){
            util.sendFriendRequest(testUser1)
        })

        it('testUser2 should logout', function(){
            util.logout()
        })

        it('testUser1 should login', function(){
            util.login(testUser1,'password');
        })

        it('testUser1 should accept friend request', function(){
            util.acceptFriendRequests()
        })

        it('should create conversation for both users', function(){
            util.createUnencryptedConversation(subject, message, testUser2)
        })

        it('testUser1 should logout', function(){
            util.logout()
        })

        it('testUser2 should login', function(){
            util.login(testUser2,'password');
        })

        it('testUser2 should read Conversation', function(){
            util.readConversation(subject)
        })

        it('should exist conversation menu', function () {
            util.waitForQa('menu-conversation')
        })

        it('should open conversation menu and show delete button', function () {
            util.waitAndClickQa('menu-conversation')

            util.waitForQa('menu-delete-conversation')
        })

        it('should delete conversation', function () {
            util.waitAndClickQa('menu-delete-conversation')
            util.waitForModalOpen()
            util.confirmModal()

            util.waitForPageLoad('/talks')
        })

        it('should not find conversation', function () {
            util.headerSearchInList(subject);

            util.waitForQa('ctn-talks-not-found')
        })

        it('testUser2 should logout', function(){
            util.logout()
        })

        it('testUser1 should login', function(){
            util.login(testUser2,'password');
        })

        it('testUser1 should read Conversation', function(){
            util.readConversation(subject)
        })

        it('conversation should not have any other recipients', function(){

        })
    })

    it('should delete testUsers  ', function(){
        util.deleteTestUser(testUser1)
        util.deleteTestUser(testUser2)
    })
})