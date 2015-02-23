var config = require("../config/specs.js")
var util = require("../cmUtil.js")

// start init tests
describe('Context selection ', function () {
    var ptor = util.getPtorInstance()

    it('should create user', function(){
        util.createTestUser()
        .then(function(loginName){
            testUser = loginName
        })
    })

    describe('test conversations', function(){

        it('create 2 conversations', function(){
            util.createUnencryptedConversation('talk1','message1', undefined, true)
            .then(function(){
                return util.createUnencryptedConversation('talk2', 'message2', undefined, true)
            })
        })

        it('select 2 talks of 3 and check bar', function(){
            util.get('/talks')
            util.waitForPageLoad('/talks')
            .then(function(){
                expect($('cm-context-bar').isDisplayed()).toBeFalsy()

                return util.tap('cm-conversation-tag')
            }).then(function(){
                expect($('cm-context-bar').isDisplayed()).toBeTruthy()
                expect(util.getHtml('ctn-context-counter')).toBe('1')

                return util.click('btn-context-close')
            }).then(function(){
                expect($('cm-context-bar').isDisplayed()).toBeFalsy()
            })
        })

        it('delete a selected talk', function(){
            expect($('cm-context-bar').isDisplayed()).toBeFalsy()

            $$('cm-conversation-tag')
            .then(function(elements){
                expect(elements.length).toEqual(3)
                return util.tap('cm-conversation-tag')
            }).then(function(){
                expect($('cm-context-bar').isDisplayed()).toBeTruthy()
                expect(util.getHtml('ctn-context-counter')).toBe('1')

                util.click('btn-context-delete')
                util.click('btn-confirm')
                return util.waitForLoader(1,'cm-context-bar')
            }).then(function(){
                return $$('cm-conversation-tag');
            }).then(function(elements){
                expect(elements.length).toEqual(2)
            })
        })
    })

    describe('test contacts', function() {
        it('select support contact and check bar', function () {
            expect($('cm-context-bar').isDisplayed()).toBeFalsy()

            util.get('contact/list')
            util.waitForPageLoad('contact/list')
            .then(function () {
                return util.tap('cm-contact-tag')
            }).then(function() {
                expect($('cm-context-bar').isDisplayed()).toBeTruthy()
                expect(util.getHtml('ctn-context-counter')).toBe('1')

                return util.click('btn-context-close')
            }).then(function() {
                expect($('cm-context-bar').isDisplayed()).toBeFalsy()
            })
        })

        it('delete contact', function(){
            expect($('cm-context-bar').isDisplayed()).toBeFalsy()

            $$('cm-contact-tag')
            .then(function(elements){
                expect(elements.length).toEqual(1)
                return util.tap('cm-contact-tag')
            }).then(function(){
                expect($('cm-context-bar').isDisplayed()).toBeTruthy()
                expect(util.getHtml('ctn-context-counter')).toBe('1')

                util.click('btn-context-delete')
                util.click('btn-confirm')
                return util.waitForLoader(1,'cm-context-bar')
            }).then(function(){
                return $$('cm-contact-tag');
            }).then(function(elements){
                expect(elements.length).toEqual(0)
            })
        })
    })

    it('should delete testUser', function(){
        util.deleteTestUser(testUser)
    })
})