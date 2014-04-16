var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Contacts', function () {

    var ptor;


    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    util.setPtorInstance(ptor)

    util.login()

    


    beforeEach(function () {

    });


    it('should be found at "#/contacts".', function(){
        util.get('/contacts')
        ptor.getCurrentUrl().then(function(url){
            expect(url).toMatch(/\#\/contacts$/)
        })
    })

    it('should have a header.', function(){
        $('cm-header').then(function(element){
            expect(element.isPresent()).toBeTrue()
        })
    })

})

