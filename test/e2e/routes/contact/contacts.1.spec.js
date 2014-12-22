var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route: Contact/List', function () {
    var ptor = util.getPtorInstance()

    it('should be found at "#/contact/list".', function(){
        util.login()
        .then(function(){
            util.get('/contact/list')
            return util.waitForPageLoad('/contact/list')
        })
    })

    it('should have a header.', function(){
        util.waitForElement('cm-header')
    })

    it('should have a button to add new a contact.', function(){
        //Todo: Funktionalität testen:
        util.waitForElement("[data-qa='add-contact-btn']")
    })

    //Todo:Filter

    it('should have a contact list.', function(){
        util.waitForElement('cm-contact-list')
    })

    describe('contact list', function(){
        it('should have an avatar.', function(){
            util.waitForElement('cm-contact-list cm-contact-tag:not(.cm-disabled)')
            .then(function(){
                return  $('cm-contact-list cm-contact-tag:not(.cm-disabled)').click()
            })
            .then(function(){
                return  util.waitForPageLoad(/\/contact\/edit\/[a-zA-Z0-9]+$/, true)
            })
        })

        it('should have contact type indicator.', function(){
            util.get('/contact/list') 
            util.waitForElement('cm-contact-list cm-contact-type')
        })

        it('should have a button to compose a new message.', function(){
            util.waitForElement("cm-contact-list [data-qa='start-new-conversation-btn']")
        })
    })
})