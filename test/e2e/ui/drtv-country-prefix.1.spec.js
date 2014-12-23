var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

// start init tests
describe('Country Prefix at phoneNumber', function () {
    var ptor = util.getPtorInstance(),
        testUser

    function testHandlerListAndInput(options) {

        var shortcut,
            numberPrefix

        if(!options.withoutRouting){
            util.get(options.route)
        }
        return util.waitForPageLoad(options.route)
        .then(function() {
            util.scrollToBottom()
            // list is hidden
            expect($('cm-country-prefix-list.is-visible').isPresent()).toBeFalsy()
            // input isnt empty
            if(options.checkInput){
                // handler isnt visible
                expect($('cm-country-prefix-handler').isDisplayed()).toBeFalsy()
                // input is empty
                expect(util.getVal('input-phoneNumber')).toBe(options.checkInput)
                util.clearInput('input-phoneNumber')
                // handler is visible
                expect($('cm-country-prefix-handler').isPresent()).toBeTruthy()
                // default is +49
                expect($('cm-country-prefix-handler').getText()).toBe('de+49')
            // input is empty
            } else {
                // default is +49
                expect($('cm-country-prefix-handler').getText()).toBe('de+49')
                // input is empty
                expect(util.getVal('input-phoneNumber')).toBe('')
            }

            // open country list
            util.click('btn-toggleCountries')
            // list is visible
            expect($('cm-country-prefix-list.is-visible').isPresent()).toBeTruthy()
            // list have more than 0 countries
            $$('cm-country-prefix-list > div').then(function (elements) {
                expect(elements.length).not.toEqual(0)
            })

            // click on body outside the list
            if(options.checkClickOutside){
                $('body').click()
                expect($('cm-country-prefix-list.is-visible').isPresent()).toBeFalsy()
                util.click('btn-toggleCountries')
            }

            // send keys like a search
            if(options.searchWithKeys) {
                shortcut = 'us'
                numberPrefix = '+1'
                $('body').sendKeys(shortcut)
                expect($("[cm-country-prefix-shortcut='"+shortcut+"'].is-active").isPresent()).toBeTruthy()
                $("[cm-country-prefix-shortcut='"+shortcut+"']").click()
            // click on always visible
            } else {
                shortcut = 'bz'
                numberPrefix = '+501'
                $("[cm-country-prefix-shortcut='"+shortcut+"']").click()
            }

            // now handler shows right shortcut and numberPrefix
            expect($('cm-country-prefix-handler').getText()).toBe(shortcut+numberPrefix)
            // list is hidden
            expect($('cm-country-prefix-list.is-visible').isPresent()).toBeFalsy()
            // enter extra phonenumber
            util.setVal('input-phoneNumber','1234567')
            // submit ???
            if(options.qaSubmitButton) {
                // save the number
                util.click(options.qaSubmitButton)
                if (options.checkAfterSubmit) {
                    // after save check input
                    util.waitForLoader(1, 'cm-footer').then(function () {
                        expect(util.getVal('input-phoneNumber')).toBe(numberPrefix + '1234567')
                    })
                }
            }
        })
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
                testHandlerListAndInput({
                    route: '/setup/account',
                    qaSubmitButton: 'btn-next-step',
                    checkAfterSubmit: false
                })
            })

            it('identity', function(){
                testHandlerListAndInput({
                    route: '/setup/identity',
                    searchWithKeys: true,
                    qaSubmitButton: 'btn-next-step',
                    checkAfterSubmit: false
                }).then(function(){
                    util.click('btn-cancel-key-generation')
                })
            })
        })

        describe('contact', function(){
            it('create', function(){
                testHandlerListAndInput({
                    route: '/contact/create',
                    checkClickOutside: true,
                    qaSubmitButton: 'btn-create-contact'
                })
            })

            it('edit', function(){
                util.get('/contact/list')
                util.waitForPageLoad('/contact/list')
                .then(function(){
                    util.headerSearchInList('external')

                    $$('cm-contact-tag').get(0).click()
                    return testHandlerListAndInput({
                        withoutRouting: true,
                        route: 'contact/edit/*',
                        checkInput: '+5011234567',
                        qaSubmitButton: 'btn-saveUser'
                    })
                })
            })
        })

        describe('identity', function(){
            it('create', function(){
                testHandlerListAndInput({
                    route: '/settings/identity/create'
                })
            })

            it('edit', function(){
                testHandlerListAndInput({
                    route: '/settings/identity/edit',
                    checkInput: '+11234567',
                    qaSubmitButton: 'btn-saveIdentity'
                })
            })
        })

        describe('account', function(){
            it('edit', function(){
                testHandlerListAndInput({
                    route: '/settings/account',
                    checkInput: '+5011234567',
                    searchWithKeys: true,
                    qaSubmitButton: 'btn-saveAccount'
                })
            })
        })
    })


    it('should delete testUser', function(){
        util.deleteTestUser(testUser)
    })
})