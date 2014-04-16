var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('invalid route', function () {

    var ptor;
    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    util.setPtorInstance(ptor)

    util.logout()
    util.get("#/foo")

    ptor.getCurrentUrl().then(function(url){
        expect(url).toMatch(/\#\/login$/)
    })

})
