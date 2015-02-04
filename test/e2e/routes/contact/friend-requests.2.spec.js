var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Friendrequests: ', function () {
    var ptor = util.getPtorInstance()
    var user1ToAccept
    var user2ToDelete
    var password = 'password'
    var requestMessage = 'moep moep mooooeeeppp?'

    afterEach(function() { util.stopOnError() });

    it('register user1', function(){
        util.createTestUser(undefined,'password reset')
        .then(function(loginName){
            user1ToAccept = loginName
            return util.logout()
        })
    })

    it('register user2', function(){
        util.createTestUser(undefined,'friendship')
            .then(function(loginName){
                user2ToDelete = loginName
                return util.logout()
            })
    })

    describe('delete friendrequest', function(){

        it('login and accept', function() {
            util.login(user1ToAccept, password)
        })

        it('send request',function(){

            util.get('/contact/list')
            util.waitForPageLoad('/contact/list')
            .then(function(){
                return util.headerSearchInList(user2ToDelete)
            }).then(function(){
                // activate search on server
                return util.waitAndClickQa('btn-search')
            }).then(function(){
                // click on result
                return util.waitAndClickQa('contact-search-item')
            }).then(function(){
                // send request
                return util.waitAndClickQa('btn-sendRequest','cm-modal.active')
            }).then(function(){
                // delete request
                return util.waitAndClickQa('btn-delete-friendrequest')
            }).then(function(){
                // confirm delete request
                return util.waitAndClickQa('btn-confirm','cm-modal.active')
            }).then(function(){
                // contact list should be empty
                return $$('li[data-qa="contact-search-item"]')
            }).then(function(elements) {
                expect(elements.length).toEqual(0)
            })
        })
    })

    describe('Friendrequests user2 "'+config.loginUser1+'" login and search for user1', function(){

        it('search', function(){
            util.login(config.loginUser1,config.passwordUser1)

            util.get('/contact/list')
            util.waitForPageLoad('/contact/list')

            util.headerSearchInList(user1ToAccept)

            util.waitAndClickQa('btn-search')

            util.waitForQa('contact-search-item').then(function(){
                $$('li[data-qa="contact-search-item"]').then(function(elements) {
                    expect(elements.length).toEqual(1)
                })
                expect($('li[data-qa="contact-search-item"]').getText()).toBe(user1ToAccept)
            })
        })

        it('open modal', function(){
            util.waitAndClickQa('contact-search-item')

            // fill out modal
            expect($('cm-modal.active').isPresent()).toBe(true)
            $("cm-modal.active [data-qa='input-friendrequestMessage']").sendKeys(requestMessage)
            // send request
            $("cm-modal.active [data-qa='btn-sendRequest']").click()
        })

        it('check if request is pending in list', function(){
            util.setVal('inp-list-search','pending',true)

            util.waitForElement('cm-contact-tag')

            $$('cm-contact-tag').then(function(elements){
                expect(elements.length).not.toEqual(0)
            })

            util.closeHeaderSearch()
        })
    })

    describe('Friendrequests user1 again', function(){
        it('login and accept', function() {
            util.login(user1ToAccept, password)
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

            util.waitForPageLoad('/contact/list')
            .then(function(){
                // search for user2
                util.headerSearchInList(config.displayNameUser1)

                util.waitForElements('cm-contact-tag', 1)
                expect($("[data-qa='contact-display-name']").getText()).toBe(config.displayNameUser1)
            })
            .then(function(){
                util.closeHeaderSearch()
                .then(function(){
                    util.logout()
                })
            })
        })

        it('delete test user', function(){
            util.deleteTestUser(user1ToAccept)
            util.deleteTestUser(user2ToDelete)
        })
    })

})