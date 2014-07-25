var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('invalid route', function () {

    var ptor = util.getPtorInstance()
    afterEach(function() { util.stopOnError() });


    it("should go to login route", function() {
        util.logout()
        util.get("/foo")
        util.expectCurrentUrl('#/login$')
    })
})
