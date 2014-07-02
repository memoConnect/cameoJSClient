var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Friendrequests', function () {

    var ptor = util.getPtorInstance()
    var user1ToAccept = util.createTestUser()
    var password = 'password'
    var requestMessage = 'moep moep mooooeeeppp?'

    it('user2', function(){

        util.logout()

        describe('Friendrequests user2 login and search for user1', function(){
            util.login(config.loginUser1,config.passwordUser1)
            util.waitForPageLoad('/talks')

            it('search', function(){
                util.get('/contacts/search')
                util.waitForPageLoad('/contacts/search')

                $("[data-qa='input-search']").sendKeys(user1ToAccept)

                // find user 1
                util.waitForElement('cm-contact-tag')
                $$('cm-contact-tag').then(function(elements) {
                    expect(elements.length).toEqual(1)
                })
                expect($('cm-contact-tag .cm-request-brief').getText()).toBe(user1ToAccept)
            })

            it('open modal', function(){
                $("cm-contact-tag [data-qa='btn-openModal']").click()

                // fill out modal
                expect($('cm-modal').isPresent()).toBe(true);
                $("cm-modal [data-qa='input-friendrequestMessage']").sendKeys(requestMessage)
                // send request
                $("cm-modal [data-qa='btn-sendRequest']").click()
            })

            it('check request is removed', function(){
                $$('cm-contact-tag').then(function(elements){
                    expect(elements.length).toEqual(0)
                })
            })

            it('check if request is pending in list', function(){
                util.get('/contacts')
                util.waitForElement('cm-contact-tag')

                $("[data-qa='input-search']").sendKeys('pending')

                $$('cm-contact-tag').then(function(elements){
                    expect(elements.length).not.toEqual(0)
                })
                // multiple
                //expect($("cm-contact-tag cm-request-brief [data-qa='contact-display-name']").getText()).toBe(user1ToAccept)

                util.logout()
            })
        })
    })

    it('user1 accept request', function(){
        describe('Friendrequests again "'+ user1ToAccept + '"', function(){
            it('login and accept', function() {
                util.login(user1ToAccept, password)
                util.waitForPageLoad("/talks")
            })

            /**
             * @deprecated
             */
            xit('check notification', function(){
                // close notify of new friendRequest (might remove this at some point)
                util.waitAndCloseNotify()
                // bell is orange
//                util.waitForElement("i.cm-bell-ring .cm-orange")
//                ptor.sleep(5000)
//                expect($('i.cm-bell-ring .cm-orange').isPresent()).toBe(true)
            })

            it('accept request', function(){
                // accept request
                util.get('/contacts/requests')
                util.waitForElement('cm-contact-tag')

                // should have request in list
                var requestLen = 0

                $$('cm-contact-tag').then(function(elements){
                    requestLen = elements.length
                    expect(requestLen).not.toEqual(0)

                    // open bar
                    $("cm-contact-tag [data-qa='btn-toggleBar']").click()
                    // click accept
                    $("cm-contact-tag [data-qa='btn-acceptRequest']").click()
                    // close notify
                    util.waitAndCloseNotify()
                    // list shouldn't have this request anymore

                    ptor.wait(function () {
                        return $$('cm-contact-tag').then(function(elements) {
                            return elements.length != requestLen
                        })
                    }, 5000, 'waiting for friendrequest to disappear.')
                })
            })

            it('check if request converted to contact', function(){
                util.get('/contacts')
                // search for user2
                $("[data-qa='input-search']").sendKeys(config.displayNameUser1)
                util.waitForElements('cm-contact-tag', 1)
                expect($("[data-qa='contact-display-name']").getText()).toBe(config.displayNameUser1)
                util.logout()
            })

            it('delete test user', function(){
                util.deleteTestUser(user1ToAccept)
            })
        })
    })


})