var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('identity key settings', function(){

    var ptor = util.getPtorInstance()
    var login
    var password = "password"
    var keyName= "Moeps key"

    it('create new user and open identity settings', function(){
        login = util.createTestUser()
        util.get('/settings/identity')
    })

    it('key settings should open when clicking on button', function(){
        $("[data-qa='btn-identity-keys']").click()
        util.waitForPageLoad('/settings/identity/keys')
    })

    it('there should be no keys', function(){
        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(0)
        })
    })

    it('click button to create key', function(){
        $("[data-qa='btn-create-key']").click()
        util.waitForPageLoad('/settings/identity/keys/create')
    })

    it('select key size and generate', function(){
        // there should be two key sizes: 2048 and 4096
        $$("[data-qa='key-size-option']").then(function (elements) {
            expect(elements.length).toBe(2)
            expect(elements[0].getText()).toContain("2048")
            expect(elements[1].getText()).toContain("4096")
        })

        $("[data-qa='btn-generate-key']").click()

    })

    it('page for key generation should be shown', function(){
        util.waitForElement("[data-qa='page-generating-key']")
        expect($("[data-qa='btn-cancel-key-generation']").isDisplayed()).toBe(true)
    })

    //todo: requires bugfix
//    it('cancel generation', function(){
//        $("[data-qa='btn-cancel-key-generation']").click()
//    })

    it('wait for key generation and display key', function(){
        util.waitForElementVisible("[data-qa='page-save-key']", 50000)

        expect($("[data-qa='display-private-key']").getAttribute('value')).toContain("-----BEGIN RSA PRIVATE KEY-----")
        expect($("[data-qa='display-public-key']").getAttribute('value')).toContain("-----BEGIN PUBLIC KEY-----")

        expect($("[data-qa='input-key-name']").getAttribute('value')).toBeTruthy()

        util.clearInput("input-key-name")
        $("[data-qa='input-key-name']").sendKeys(keyName)
        $("[data-qa='btn-save-key']").click()

    })

    it('the new key should be displayed as local', function(){
        util.waitForPageLoad('/settings/identity/keys')

        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(1)
            // key is local
            expect(elements[0].findElement(by.css("[data-qa='key-is-local']")).isDisplayed()).toBe(true)
            // check name
            expect(elements[0].getText()).toContain(keyName)
            // should contain date
            expect(elements[0].getText()).toMatch(/\d\d\.\d\d\.\d\d\s-\s\d\d:\d\d/)
        })
    })

    it('the key should still be there after logout/login', function(){
        util.logout()
        util.login(login, password)
        util.get('/settings/identity/keys')

        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(1)
            // key is local
            expect(elements[0].findElement(by.css("[data-qa='key-is-local']")).isDisplayed()).toBe(true)
            // check name
            expect(elements[0].getText()).toContain(keyName)
            // should contain date
            expect(elements[0].getText()).toMatch(/\d\d\.\d\d\.\d\d\s-\s\d\d:\d\d/)
        })
    })

    it('clear local storage and check that key is not local any more', function(){
        util.clearLocalStorage()
        util.login(login, password)
        util.get('/settings/identity/keys')

        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(1)
            // key is not local
            expect(elements[0].isElementPresent(by.css("[data-qa='key-is-local']"))).toBe(false)
            // check name
            expect(elements[0].getText()).toContain(keyName)
            // should contain date
            expect(elements[0].getText()).toMatch(/\d\d\.\d\d\.\d\d\s-\s\d\d:\d\d/)
        })
    })

    it('delete key', function(){
        $("[data-qa='btn-remove-key']").click()
        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(0)
        })
    })

    it('generate another local key', function(){

        util.generateKey()
        util.waitForPageLoad('/settings/identity/keys')

        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(1)
        })
    })

    it('delete it and confirm that it is deleted after logout/login', function(){

        $("[data-qa='btn-remove-key']").click()

        util.logout()
        util.login(login, password)
        $$("[data-qa='key-list-item']").then(function (elements) {
            expect(elements.length).toBe(0)
        })
    })


    it('delete test user', function(){
        util.deleteTestUser(login)
    })


})