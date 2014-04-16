var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Contacts', function () {

    var ptor;

    util.login()

    ptor.get('#/contacts')
    util.waitForPageLoad()



    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
        util.setPtorInstance(ptor)
    });



})

