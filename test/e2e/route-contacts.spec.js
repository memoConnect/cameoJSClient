var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Contacts', function () {
    var ptor = util.getPtorInstance()

    it('should be found at "#/contacts".', function(){
        util
        .login()
        .get('/contacts')
        .expectCurrentUrl('#/contacts')
    })

    it('should have a header.', function(){
        util.waitForElement('cm-header')
    })

    it('should have a footer.', function(){
        util.waitForElement('cm-footer')
    })

    it('should have a button to add new a contact.', function(){
        //Todo: Funktionalität testen:
        util.waitForElement('[data-qa="add-contact-btn"]')
    })

    //Todo:Filter

    it('should have a contact list.', function(){
        util.waitForElement('cm-contacts-list')
    })

    describe('contact list', function(){
        
        it('should have an avatar.', function(){
            util.waitForElement('cm-contacts-list cm-avatar')            
            $('cm-contacts-list cm-avatar').click()
            util.waitForPageLoad(/\/contact\/[a-zA-Z0-9]+$/)       
        })


        it('should have key security indicator.', function(){
            util.get('/contacts')
            util.waitForElement('cm-contacts-list cm-key-level')
        })


        it('should have brief contact details.', function(){
            util.waitForElement('cm-contacts-list cm-contact-brief')
            $('cm-contacts-list cm-contact-brief').click()
            util.waitForPageLoad(/\/contact\/[a-zA-Z0-9]+$/)
        })


        it('should have contact type indicator.', function(){
            util.get('/contacts') 
            util.waitForElement('cm-contacts-list cm-contact-type')
        })


        it('should have a seperator.', function(){
            util.waitForElement('cm-contacts-list .separator')           
        })


        it('should have a button to compose a new message.', function(){
            util.waitForElement('cm-contacts-list [data-qa="start-new-conversation-btn"]')  
        })


    })


})