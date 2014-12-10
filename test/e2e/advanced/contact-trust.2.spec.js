var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Contact Trust -', function () {
    var ptor = util.getPtorInstance(),
        date = Date().now

    var testUser1Id = Math.random().toString(36).substring(2, 9)
    var testUser1 = "testUser23_" + testUser1Id
    var testUser2Id = Math.random().toString(36).substring(2, 9)
    var testUser2 = "testUser23_" + testUser2Id

    var localStorage1
    var localStorage2

    var eventSubscription
    var eventSubscription2

    var token
    var token2

    var transactionSecret
    var transactionSecret2


    describe('create testuser 1', function(){
        // reset!!
        it('before all test starting clear Localstorage', function(){
            util.clearLocalStorage()
        })

        it('create test user, generate key and export localStorage', function () {
            util.createTestUser(testUser1Id)
            util.generateKey(1)
        })



        it("export localstorage (key1) and get token", function () {
            util.getLocalStorage().then(function (lsexport) {
                localStorage1 = lsexport
            })
            util.getToken().then(function (res) {
                token = res
            })
        })
    })

})