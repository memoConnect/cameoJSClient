var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Contacts', function () {
    var ptor = util.getPtorInstance()

    it('should be found at "#/contacts".', function(){
        util
        .login()
        .get('/contacts')
        .expectCurrentUrl('#/contacts')
        .waitForSpinner()
    })

    it('should have a header.', function(){
        expect($('cm-header').isPresent()).toBe(true)
    })

    it('should have a footer.', function(){
        expect($('cm-footer').isPresent()).toBe(true)
    })

    it('should have a button to add new a contact.', function(){
        //Todo: Funktionalität testen:
        expect($('[data-qa="add-contact-btn"]').isPresent()).toBe(true)
    })

    //Todo:Filter

    it('should have a contact list.', function(){
        expect($('cm-contacts-list').isPresent()).toBe(true)
    })

    describe('contact list', function(){
        
        it('should have an avatar.', function(){
            var element = $('cm-contacts-list cm-avatar')
            expect(element.isPresent()).toBe(true)
            
            element.click()
            util.waitForPageLoad(/\/contact\/[a-zA-Z0-9]+$/)       
        })


        it('should have key security indicator.', function(){
            util.get('/contacts')
            util.waitForSpinner()
            expect($('cm-contacts-list cm-key-level').isPresent()).toBe(true)           
        })


        it('should have brief contact details.', function(){
            var element = $('cm-contacts-list cm-contact-brief')
            expect(element.isPresent()).toBe(true)
            
            element.click()
            util.waitForPageLoad(/\/contact\/[a-zA-Z0-9]+$/)
        })


        it('should have contact type indicator.', function(){
            util.get('/contacts') 
            util.waitForSpinner()
            expect($('cm-contacts-list cm-contact-type').isPresent()).toBe(true)   
        })


        it('should have a seperator.', function(){
            expect($('cm-contacts-list .separator').isPresent()).toBe(true)            
        })


        it('should have a button to compose a new message.', function(){
            expect($('cm-contacts-list [data-qa="start-new-conversation-btn"]').isPresent()).toBe(true)            
        })


    })


})