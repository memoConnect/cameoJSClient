var config = require("../../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Friendrequests: ', function () {
    var ptor = util.getPtorInstance()
    var user1ToAccept = util.createTestUser()
    var password = 'password'
    var requestMessage = 'moep moep mooooeeeppp?'
    afterEach(function() { util.stopOnError() });

    it('user2', function(){

        util.logout()

        describe('Friendrequests user2 "'+config.loginUser1+'" login and search for user1 "'+user1ToAccept+'"', function(){

            it('search', function(){
                util.login(config.loginUser1,config.passwordUser1)

                util.get('/contact/search')
                util.waitForPageLoad('/contact/search')

                util.waitForElement("[data-qa='inp-search-cameo-ids']")

                $("[data-qa='inp-search-cameo-ids']").sendKeys(user1ToAccept)

                // find user 1
                util.waitForElement("li.contact-search-item")
                $$('li.contact-search-item').then(function(elements) {
                    expect(elements.length).toEqual(1)
                })
                expect($('li.contact-search-item .identityName').getText()).toBe(user1ToAccept)
            })

            it('open modal', function(){
                $("[data-qa='btn-openModal']").click()

                // fill out modal
                expect($('cm-modal.active').isPresent()).toBe(true)
                $("cm-modal.active [data-qa='input-friendrequestMessage']").sendKeys(requestMessage)
                // send request
                $("cm-modal.active [data-qa='btn-sendRequest']").click()
            })

            it('should be now an contacts page', function(){
                //util.expectCurrentUrl('#/contact/list')
                util.waitForPageLoad('/contact/list')
            })

            it('check if request is pending in list', function(){
                util.waitForElement('cm-contact-tag')

                util.headerSearchInList('pending');

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
                util.waitForPageLoad("/start")
            })

            it('accept request', function(){
                // accept request
                util.get('/contact/request/list')
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
            })

            it('check if request converted to contact', function(){
                util.get('/contact/list')

                // search for user2
                util.headerSearchInList(config.displayNameUser1)

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