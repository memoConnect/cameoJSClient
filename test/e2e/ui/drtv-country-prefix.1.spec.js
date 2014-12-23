var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

// start init tests
describe('Country Prefix at phoneNumber', function () {
    var ptor = util.getPtorInstance(),
        testUser

    function testHandlerListAndInput(qaSubmitButton){
        expect($('cm-country-prefix-list.is-visible').isDisplayed()).toBeFalsy()

        expect(util.getVal('input-phoneNumber')).toBe('')
        // open country list
        util.click('btn-toggleCountries')
        expect($('cm-country-prefix-list.is-visible').isDisplayed()).toBeTruthy()

        $$('cm-country-prefix-list > div').then(function(elements){
            expect(elements.length).not.toEqual(0)
        })

        //util.setVal('input-phoneNumber',)
    }

    it('should create user', function(){
        util.createTestUser()
        .then(function(loginName){
            testUser = loginName
        })
    })

    describe('check forms', function(){
        describe('setup', function(){
            it('account', function(){
                testHandlerListAndInput('btn-next-step')
            })

            it('identity', function(){
                testHandlerListAndInput('btn-next-step')
            })
        })

        describe('contact', function(){
            it('create', function(){

            })

            it('edit', function(){

            })
        })

        describe('identity', function(){
            it('create', function(){

            })

            it('edit', function(){

            })
        })

        describe('account', function(){
            it('edit', function(){

            })
        })
    })


    it('should delete testUser', function(){
        util.deleteTestUser(testUser)
    })
})