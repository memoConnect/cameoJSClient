var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Filter Spec', function(){
    var ptor = util.getPtorInstance(),
        testuser

    it('should create user1', function(){

        util.createTestUser(undefined, 'avatar upload')
            .then(function(loginName){
                testUser = loginName
            })
    })



    it('should logout', function(){
        util.logout();
    })

    it('should delete testUser', function(){
        util.deleteTestUser(testUser)
    })
})