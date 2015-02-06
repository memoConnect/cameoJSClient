var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Test Settings enableUnreadMessages: ', function(){
    var ptor = util.getPtorInstance(),
        password = 'password',
        user1,
        user2,
        newSubject = "wicked_test_subject_" + Date.now(),
        messageText = "wicked_test_message_text_" + Date.now();


    function hasClass(element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    describe('create test users: ', function(){
        it('should create user1', function(){
            util.createTestUser(undefined, 'setttings enableUnreadMessages#1')        
            .then(function(loginName){
                user1 = loginName
            })
        })

        it('should create user2', function(){
            util.createTestUser(undefined, 'setttings enableUnreadMessages#2')
            .then(function(loginName){
                user2 = loginName
            })
        })
    })

    describe('create friendship: ', function(){

        /* copied from friend-requests.2.spec.js */
        it('user2 should find user1 and initialize friend request', function(){
            util.sendFriendRequest(user1)

            util.logout()
        })

        /* copied from friend-requests.2.spec.js */
        it('user1 should see and accept the friend request', function(){
            util.login(user1, password)
            util.waitForPageLoad()

            util.get('/contact/request/list')
            util.waitForPageLoad('/contact/request/list')

            util.waitForElement("[data-qa='contact-list-element']")

            // should have request in list
            var requestLen = 0

            $$("[data-qa='contact-list-element']").then(function(elements){
                requestLen = elements.length
                expect(requestLen).not.toEqual(0)
                // click accept
                $("[data-qa='btn-acceptRequest']").click()
                // close notify
//                    util.waitAndCloseNotify()
                // list shouldn't have this request anymore
                ptor.wait(function () {
                    return $$('contact-list-element').then(function(elements) {
                        return elements.length != requestLen
                    })
                }, 5000, 'waiting for friendrequest to disappear.')
            })

            util.get('/contact/list')
            util.waitForPageLoad('/contact/list')

            util.headerSearchInList(user2)

            util.waitForElements('cm-contact-tag', 1)
            expect($("[data-qa='contact-display-name']").getText()).toBe(user2)
        })
    })

    describe('set enableUnreadMessages to true in Settings: ', function(){
        it('user1 should go to settings', function(){
            util.get('/settings/app')
            util.waitForPageLoad('/settings/app')
        })

        it('there should be the option enableUnreadMessages', function(){
            util.waitForQa('ctn-settings-enable-unread-messages');
            util.waitForQa('checkbox-enable-unread-messages');
        })

        it('user1 should have active enableUnreadMessages', function(){
            var e = $("[data-qa='checkbox-enable-unread-messages']")

            if(!hasClass(e,'cm-radio-1')){
                util.click('ctn-settings-enable-unread-messages')
            }

            expect($("[data-qa='checkbox-enable-unread-messages']").getAttribute('class')).toContain('cm-radio-1')
        })
    })

    describe('user1 creates a conversation with user 2: ', function(){

        /* copied from conversation.1.spec.js */
        it('should create a new conversation', function(){
            util.get('/conversation/new')
            util.waitForPageLoad("/conversation/new")

            util.disableEncryption()

            util.waitAndClickQa('btn-add-recipients')
            util.waitForPageLoad("/conversation/new/recipients")

            util.headerSearchInList(user2)
            util.waitForElement("[data-qa='contact-display-name']")

            util.waitAndClickQa('btn-select-contact')

            util.waitAndClickQa('btn-done')
            util.waitForPageLoad("/conversation/new")

            util.setVal('input-subject',newSubject)
            util.setVal('input-answer',messageText)

            util.waitAndClickQa('btn-send-answer')

            util.waitForElements('cm-message',1)
            expect($('cm-message').getText()).toContain(messageText)
        })

        it('user2 should read conversation and send two answer messages', function(){
            util.login(user2, password)
            util.waitForPageLoad()

            util.getConversation(newSubject);

            util.setVal('input-answer',messageText)
            util.waitAndClickQa('btn-send-answer')

            util.waitForElements('cm-message',2)

            util.setVal('input-answer',messageText)
            util.waitAndClickQa('btn-send-answer')

            util.waitForElements('cm-message',3)
        })
    })

    describe('user1 checks enableUnreadMessages settings: ', function(){
        it('user1 should see unreadMessages at talks route', function(){
            util.login(user1, password)
            util.waitForPageLoad()

            util.get("/talks")
            util.waitForPageLoad("/talks")

            util.headerSearchInList(newSubject)

            util.waitForElement("[data-qa='ctn-unread-messages']")
            expect($("[data-qa='ctn-unread-messages']").isPresent()).toBe(true)
            expect($("[data-qa='ctn-unread-messages']").getText()).toContain(2)
        })

        it('user1 should deactivate unreadMessages at settings', function(){
            util.get('/settings/app')
            util.waitForPageLoad('/settings/app')

            util.waitAndClickQa('checkbox-enable-unread-messages')

            expect($("[data-qa='checkbox-enable-unread-messages']").getAttribute('class')).not.toContain('cm-radio-1')
            expect($("[data-qa='checkbox-enable-unread-messages']").getAttribute('class')).toContain('cm-radio-0')
        })

        it('user1 should not see unreadMessages at talks route', function(){
            util.get("/talks")
            util.waitForPageLoad("/talks")

            util.headerSearchInList(newSubject)

            expect($("[data-qa='ctn-unread-messages']").isPresent()).toBe(false)
        })

        it('user1 should see unreadMessages after activating in settings', function(){
            util.get('/settings/app')
            util.waitForPageLoad('/settings/app')

            util.waitAndClickQa('checkbox-enable-unread-messages')

            expect($("[data-qa='checkbox-enable-unread-messages']").getAttribute('class')).toContain('cm-radio-1')
            expect($("[data-qa='checkbox-enable-unread-messages']").getAttribute('class')).not.toContain('cm-radio-0')
        })

        it('user1 should see zero unread messages, after opening the conversation, and returning to talks', function(){
            util.get("/talks")
            util.waitForPageLoad("/talks")

            util.headerSearchInList(newSubject)

            util.waitForElement("[data-qa='ctn-unread-messages']")
            expect($("[data-qa='ctn-unread-messages']").isPresent()).toBe(true)
            expect($("[data-qa='ctn-unread-messages']").getText()).toContain(2)



            $('cm-conversation-tag').click()
            util.waitForPageLoad("/conversation/*")
            util.waitForElements('cm-message',3)

            util.get("/talks")
            util.waitForPageLoad("/talks")

            util.headerSearchInList(newSubject)

            util.waitForElement("[data-qa='ctn-unread-messages']")
            expect($("[data-qa='ctn-unread-messages']").isPresent()).toBe(true)
            expect($("[data-qa='ctn-unread-messages']").getText()).toContain(0)

            util.closeHeaderSearch();
        })
    })

    describe('remove test users: ', function(){
        it('should logout', function(){
            util.logout();
        })

        it('should delete user1', function(){
            util.deleteTestUser(user1)
        })

        it('should delete user2', function(){
            util.deleteTestUser(user2)
        })
    })
});