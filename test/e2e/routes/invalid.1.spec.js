var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('invalid route', function () {
    var ptor = util.getPtorInstance()

    it("should go to login route", function() {
        util.logout()
        util.get("/foo")
        util.expectCurrentUrl('#/login$')
    })
})
