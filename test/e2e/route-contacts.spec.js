var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Contacts', function () {

    var ptor;


    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    util.setPtorInstance(ptor)

    


    beforeEach(function () {

    });


    it('should be found at "#/contacts".', function(){
        util.login()
        
        util.get('/contacts')
        ptor.getCurrentUrl().then(function(url){
            expect(url).toMatch(/\#\/contacts$/)
        })
    })

    it('should have a header.', function(){
        expect($('cm-header').isPresent()).toBe(true)
    })

    it('should have a footer.', function(){
        expect($('cm-footer').isPresent()).toBe(true)
    })

    //Tofo:Filter

    it('should have a contact list.', function(){
        expect($('cm-contacts-list').isPresent()).toBe(true)
    })

})

