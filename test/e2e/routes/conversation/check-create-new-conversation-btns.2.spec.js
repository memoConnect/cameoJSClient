var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Check CreateNewConversation Buttons', function () {
    var ptor = util.getPtorInstance(),
        testMessage = 'moep',
        testUser

    describe('create test users: ', function(){
        it('should create user', function(){
            testUser = util.createTestUser(undefined, 'check-create-new-conversation-btns')
            util.expectCurrentUrl('/setup/account')
        })
    })

    describe('check transfer scope at new conversation and url navigation', function(){
        it('should open new conversation and add an answer', function(){
            util.get('/conversation/new')
            util.waitForPageLoad('/conversation/new')

            util.waitForElement("[data-qa='input-answer']")

            util.setVal('input-answer',testMessage)
            expect(util.getVal('input-answer')).toContain(testMessage)
        })

        it('testMessage should exists, if new conversation will leave over url change, and re-enter at the same way', function(){
            util.get('/talks')
            util.waitForPageLoad('/talks')

            util.waitForElement("cm-conversation-tag")

            util.get('/conversation/new')
            util.waitForPageLoad('/conversation/new')

            util.waitForElement("[data-qa='input-answer']")

            expect(util.getVal('input-answer')).toContain(testMessage)
        })
    })

    describe('check  answer at new conversation, with button navigation', function(){
        it('answer input should be empty', function(){
            util.get('/talks')
            util.waitForPageLoad('/talks')

            util.waitAndClickQa("new-conversation-btn")
            util.waitForPageLoad('/conversation/new')

            util.waitForElement("[data-qa='input-answer']")
            expect(util.getVal('input-answer')).toBe('')
        })

        it('answer should be filled again with testMessage', function(){
            util.setVal('input-answer',testMessage)
            expect(util.getVal('input-answer')).toContain(testMessage)
        })

        it('answer should be empty again, after leaving new conversation and re-enter it over new conversation btn in menu', function(){
            util.get('/talks')
            util.waitForPageLoad('/talks')

            util.waitAndClickQa("new-conversation-btn")

            util.waitAndClickQa('btn-open-menu');

            util.waitAndClickQa('menu-btn-new-conversation');
            util.waitForPageLoad('/conversation/new')

            util.waitForElement("[data-qa='input-answer']")
            expect(util.getVal('input-answer')).toBe('')
        })
    })


    describe('remove test user ', function(){
        it('should logout', function(){
            util.logout();
        })

        it('should delete user1', function(){
            util.deleteTestUser(testUser)
        })
    })
})